//
//  RNUtils.m
//  ReadingProject
//
//  Created by weichuang on 16/4/6.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "RNUtils.h"
#import <UIKit/UIKit.h>
#import "UIKIT/UIDevice.h"
#import "UIKIT/UIAlertView.h"
#import <AFNetworking/AFNetworking.h>
#import "SSZipArchive.h"
#import <AFNetworking/AFNetworking.h>


@implementation RNUtils
NSString * const SERVER_ROOT_PATH = @"http://www.weichuanghome.com:28080/today/";
//NSString * const SERVER_ROOT_PATH = @"http://112.126.73.237/reading/";
//NSString * const SERVER_ROOT_PATH = @"http://localhost:8080/reading/";


+(void) getDataWithUrlStr:(NSString*) urlStr withParam:(NSString*) parmStr withSuccess:(RequestSuccessBlock)success{
  
  AFHTTPSessionManager *manager = [AFHTTPSessionManager manager];
  // 超时时间
  manager.requestSerializer.timeoutInterval = 30;
  
  // 声明上传的是json格式的参数，需要你和后台约定好，不然会出现后台无法获取到你上传的参数问题
  manager.requestSerializer = [AFHTTPRequestSerializer serializer]; // 上传普通格式
  //    manager.requestSerializer = [AFJSONRequestSerializer serializer]; // 上传JSON格式
  
  // 声明获取到的数据格式
  manager.responseSerializer = [AFHTTPResponseSerializer serializer]; // AFN不会解析,数据是data，需要自己解析
  //    manager.responseSerializer = [AFJSONResponseSerializer serializer]; // AFN会JSON解析返回的数据
  // 个人建议还是自己解析的比较好，有时接口返回的数据不合格会报3840错误，大致是AFN无法解析返回来的数据
  [manager POST:[[urlStr stringByAppendingString:@"?"] stringByAppendingString:parmStr] parameters:nil progress:nil success:^(NSURLSessionDataTask *task, id responseObject) {
    NSLog(@"成功");
    NSDictionary * responseDictinoary = [NSJSONSerialization JSONObjectWithData:responseObject options:NSJSONReadingMutableLeaves error:nil];
    if ([[responseDictinoary objectForKey:@"RES_RESULT"] isEqualToString:@"SUCCESS"]) {
      NSDictionary *RES_DATA =  [responseDictinoary objectForKey:@"RES_DATA"];
      NSLog(@"RES_DATA=%@",RES_DATA);
      success(RES_DATA,YES);
    }else{
      success(nil,NO);
    }
  } failure:^(NSURLSessionDataTask *task, NSError *error) {
    NSLog(@"失败");
    NSLog(@"Error: %@", error);
  }];
  
}
+(BOOL) handleAppUpgradeWithSuccess:(DefaultSuccessBlock)success{
    //获取当前app版本
    NSDictionary *infoDictionary = [[NSBundle mainBundle] infoDictionary];
    NSString * appV = [infoDictionary objectForKey:@"CFBundleShortVersionString"];
    NSUserDefaults * userDefaults = [NSUserDefaults standardUserDefaults];
    NSString * appBundleV = [userDefaults objectForKey:@"appBundleVersion"];
    if (appBundleV == nil) {
        appBundleV = @"0.0.0";
        [userDefaults setObject:appBundleV forKey:@"appBundleVersion"];
        [userDefaults synchronize];
    }
    NSLog(@"appV=%@,appBundleV=%@",appV,appBundleV);
  //
  NSString * param_checkVersions = [[[@"appV=" stringByAppendingString:appV] stringByAppendingString:@"&appBundleV="] stringByAppendingString:appBundleV];
  [RNUtils getDataWithUrlStr:[SERVER_ROOT_PATH stringByAppendingString:@"app/json/checkVersions"] withParam:param_checkVersions withSuccess:^(NSDictionary *RES_DATA, BOOL isSuccess) {
    NSString *appUpgrade =  [RES_DATA objectForKey:@"appUpgrade"];
    [userDefaults setObject:appUpgrade forKey:@"appUpgrade"];
    [userDefaults synchronize];
    if ([appUpgrade isEqualToString:@"1"]) {//客户端升级
      NSLog(@"客户端升级");
      NSString *appUpgradeVersion =  [RES_DATA objectForKey:@"appUpgradeVersion"];
      NSString *appUpgradeMust =  [RES_DATA objectForKey:@"appUpgradeMust"];
      NSString *appUpgradeDesp =  [RES_DATA objectForKey:@"appUpgradeDesp"];
      [userDefaults setObject:appUpgradeVersion forKey:@"appUpgradeVersion"];
      [userDefaults setObject:appUpgradeMust forKey:@"appUpgradeMust"];
      [userDefaults setObject:appUpgradeDesp forKey:@"appUpgradeDesp"];
      [userDefaults synchronize];
    }else{
      NSString *appBundleUpgrade =  [RES_DATA objectForKey:@"appBundleUpgrade"];
      if ([appBundleUpgrade isEqualToString:@"1"]) {//app bundle升级
        NSLog(@"app bundle升级");
        NSString *appBundleUpgradeVersion =  [RES_DATA objectForKey:@"appBundleUpgradeVersion"];
//        NSDictionary * params_jsbundle = [[NSDictionary alloc] init];
//        [params_jsbundle setValue:@"1" forKey:@"type"];
//        [params_jsbundle setValue:@"ios" forKey:@"os"];
//        [params_jsbundle setValue:appBundleV forKey:@"appBundleV"];
        NSString *params_jsbundle = [@"type=1&os=ios&appBundleV=" stringByAppendingString:appBundleUpgradeVersion];
        [RNUtils downloadFileWithUrlStr:[SERVER_ROOT_PATH stringByAppendingString:@"app/byte/downloadFile"] withParam: params_jsbundle withSuccess:^() {
          // 获取沙盒主目录路径
          NSString *homeDir = NSHomeDirectory();
          NSString *documentDir = [homeDir stringByAppendingPathComponent:@"Documents"];
          NSString *fileName_assets=[documentDir stringByAppendingPathComponent:@"assets.zip"];
          //
          NSString *params_assets = [@"type=2&os=ios&appBundleV=" stringByAppendingString:appBundleUpgradeVersion];
          [RNUtils downloadFileWithUrlStr:[SERVER_ROOT_PATH stringByAppendingString:@"app/byte/downloadFile"] withParam:params_assets withSuccess:^() {
            //
            [SSZipArchive unzipFileAtPath:fileName_assets toDestination:documentDir];
            //app bundle升级完成 更新app bundle版本
            [userDefaults setObject:appBundleUpgradeVersion forKey:@"appBundleVersion"];
            [userDefaults synchronize];
            //
            success();
          }];
        }];
      }else{
        NSLog(@"无需升级");
      }
    }
  }];
  return NO;
}

+(void) downloadFileWithUrlStr:(NSString*) urlStr withParam:(NSString*) params withSuccess:(void(^)())success{
  // 1.创建管理者对象
  AFHTTPSessionManager *manager = [AFHTTPSessionManager manager];
  // 2.设置请求的URL地址
  NSURL *url = [NSURL URLWithString:[urlStr stringByAppendingString:[@"?" stringByAppendingString:params]]];
  // 3.创建请求对象
  NSURLRequest *request = [NSURLRequest requestWithURL:url];
  // 4.下载任务
  NSURLSessionDownloadTask *task = [manager downloadTaskWithRequest:request progress:^(NSProgress * _Nonnull downloadProgress) {
    // 下载进度
    NSLog(@"当前下载进度为:%lf", 1.0 * downloadProgress.completedUnitCount / downloadProgress.totalUnitCount);
  } destination:^NSURL * _Nonnull(NSURL * _Nonnull targetPath, NSURLResponse * _Nonnull response) {
    // 下载地址
    NSString *path = [[NSHomeDirectory() stringByAppendingPathComponent:@"Documents"] stringByAppendingPathComponent:response.suggestedFilename];//下载文件的存储目录
    return [NSURL fileURLWithPath:path];
  } completionHandler:^(NSURLResponse * _Nonnull response, NSURL * _Nullable filePath, NSError * _Nullable error) {
    // 下载完成调用的方法
    NSLog(@"%@",filePath);
    success();
  }];
  // 5.启动下载任务
  [task resume];
}


+(NSDictionary *) getSystemInfo{
    NSDictionary *infoDictionary = [[NSBundle mainBundle] infoDictionary];
    // 当前应用名称
    NSString *appCurName = [infoDictionary objectForKey:@"CFBundleDisplayName"];
    NSLog(@"当前应用名称：%@",appCurName);
    // 当前应用软件版本  比如：1.0.1
    NSString *appCurVersion = [infoDictionary objectForKey:@"CFBundleShortVersionString"];
    NSLog(@"当前应用软件版本:%@",appCurVersion);
    // 当前应用版本号码   int类型
    NSString *appCurVersionNum = [infoDictionary objectForKey:@"CFBundleVersion"];
    NSLog(@"当前应用版本号码：%@",appCurVersionNum);
    return infoDictionary;
}

+ (void)confirmWithTitle:(NSString *) title withMsg:(NSString *) msg{
    UIAlertView *alter = [[UIAlertView alloc] initWithTitle:title message:msg delegate:self cancelButtonTitle:@"暂不更新" otherButtonTitles:@"立即更新", nil];
    [alter show];
}
@end
