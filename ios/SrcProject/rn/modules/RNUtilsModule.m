
#import "RNUtilsModule.h"
#import "UIKIT/UIDevice.h"
#import "UIKIT/UIScreen.h"
#import "UIKIT/UIApplication.h"
//#import "AdSupport/ASIdentifierManager.h"
#import "../utils/RNUtils.h"
#import "AppDelegate.h"
#import "RCTBundleURLProvider.h"
#import "RCTRootView.h"


@implementation RNUtilsModule

RCT_EXPORT_MODULE();

#pragma mark +++++++++++++++++++++++++++++++++++++++
#pragma mark demoGo
RCT_EXPORT_METHOD(demoGo:(NSArray *) params)
{
    NSLog(@"demoGo=%@",params);
}
#pragma mark +++++++++++++++++++++++++++++++++++++++
#pragma mark demoSynCallback
RCT_EXPORT_METHOD(demoSynCallback:(NSArray *) params callback:(RCTResponseSenderBlock)callback)
{
    NSLog(@"demoSynCallback=%@",params);
    callback(@[@[@"value1",@"value2"]]);
}
#pragma mark +++++++++++++++++++++++++++++++++++++++
#pragma mark demoAsynCallback
RCT_EXPORT_METHOD(demoAsynCallback:(NSArray *) params)
{
    NSLog(@"demoAsynCallback=%@",params);
}
#pragma mark +++++++++++++++++++++++++++++++++++++++
#pragma mark 获取APP系统信息
RCT_EXPORT_METHOD(getAppInfo:(NSArray *) params callback:(RCTResponseSenderBlock)callback)
{
    NSLog(@"getAppInfo=%@",params);
    //
    NSMutableDictionary * appInfo = [[NSMutableDictionary alloc] init];
    //
//    NSString *identifierForVendor = [[UIDevice currentDevice].identifierForVendor UUIDString];
//    NSString *identifierForAdvertising = [[ASIdentifierManager sharedManager].advertisingIdentifier UUIDString];
//    NSDictionary * UUIDDic = @{@"UUID_01":identifierForVendor,@"UUID_02":identifierForAdvertising};
//    [appInfo addEntriesFromDictionary:UUIDDic];
    //
    NSDictionary *infoDictionary = [[NSBundle mainBundle] infoDictionary];
    NSString * appV = [infoDictionary objectForKey:@"CFBundleShortVersionString"];
    NSUserDefaults * userDefaults = [NSUserDefaults standardUserDefaults];
    NSString * appBundleV = [userDefaults objectForKey:@"appBundleVersion"];
    NSString * appUpgrade = [userDefaults objectForKey:@"appUpgrade"];
    NSString * appUpgradeVersion = [userDefaults objectForKey:@"appUpgradeVersion"];
    NSString * appUpgradeMust = [userDefaults objectForKey:@"appUpgradeMust"];
    NSString * appUpgradeDesp = [userDefaults objectForKey:@"appUpgradeDesp"];
    if (appBundleV == nil) {
        appBundleV = appV;
    }
    if (appUpgrade == nil) {
        appUpgrade = @"0";
    }
    if (appUpgradeVersion == nil) {
        appUpgradeVersion = @"";
    }
    if (appUpgradeMust == nil) {
        appUpgradeMust = @"0";
    }
    if (appUpgradeDesp == nil) {
        appUpgradeDesp = @"";
    }
    NSDictionary * versionDic = @{@"appV":appV,@"appBundleV":appBundleV
                                  ,@"appUpgrade":appUpgrade,@"appUpgradeVersion":appUpgradeVersion
                                  ,@"appUpgradeMust":appUpgradeMust,@"appUpgradeDesp":appUpgradeDesp};
    [appInfo addEntriesFromDictionary:versionDic];
    //
    //手机别名： 用户定义的名称
    NSString* userPhoneName = [[UIDevice currentDevice] name];
    [appInfo setValue:userPhoneName forKey:@"userPhoneName"];
    //设备名称
    NSString* deviceName = [[UIDevice currentDevice] systemName];
    [appInfo setValue:deviceName forKey:@"deviceName"];
    //手机系统版本
    NSString* phoneVersion = [[UIDevice currentDevice] systemVersion];
    [appInfo setValue:phoneVersion forKey:@"phoneVersion"];
    //手机型号
    NSString* phoneModel = [[UIDevice currentDevice] model];
    [appInfo setValue:phoneModel forKey:@"phoneModel"];
    //地方型号  （国际化区域名称）
    NSString* localPhoneModel = [[UIDevice currentDevice] localizedModel];
    [appInfo setValue:localPhoneModel forKey:@"localPhoneModel"];
    // 当前应用名称
    NSString *appCurName = [infoDictionary objectForKey:@"CFBundleDisplayName"];
    [appInfo setValue:appCurName forKey:@"appCurName"];
    //
    callback(@[@[appInfo]]);
}
#pragma mark +++++++++++++++++++++++++++++++++++++++
#pragma mark writeTextFile
RCT_EXPORT_METHOD(writeTextFile:(NSArray *) params callback:(RCTResponseSenderBlock)callback)
{
    NSLog(@"writeTextFile=%@",params);
    // 获取沙盒主目录路径
    NSString *homeDir = NSHomeDirectory();
    NSString *TextFilesDir = [[homeDir stringByAppendingPathComponent:@"Documents"] stringByAppendingPathComponent:@"TextFiles"];
    NSString *fileName=[TextFilesDir stringByAppendingPathComponent:params[0]];
    NSString * fileContent = params[1];
    [fileContent writeToFile:fileName atomically:YES encoding:NSUTF8StringEncoding error:nil];
    NSLog(@"写入文件：%@",fileName);
    callback(@[@[@"SUCCESS"]]);
}
#pragma mark +++++++++++++++++++++++++++++++++++++++
#pragma mark getTextFile
RCT_EXPORT_METHOD(getTextFile:(NSArray *) params callback:(RCTResponseSenderBlock)callback)
{
    NSLog(@"getTextFile=%@",params);
    callback(@[@[@"value1",@"value2"]]);
}


#pragma mark +++++++++++++++++++++++++++++++++++++++
#pragma mark screenSetBrightness
RCT_EXPORT_METHOD(screenSetBrightness:(NSArray *) params)
{
    NSLog(@"screenSetBrightness=%@",params);
    //
    NSString * valueStr = params[0];
    [[UIScreen mainScreen]setBrightness:[valueStr floatValue]];
}
#pragma mark +++++++++++++++++++++++++++++++++++++++
#pragma mark appUpgrade
RCT_EXPORT_METHOD(appUpgrade:(NSArray *) params)
{
    NSLog(@"appUpgrade=%@",params);
    NSString * url = params[0];
    [[UIApplication sharedApplication]openURL:[NSURL URLWithString:url]];
}
#pragma mark +++++++++++++++++++++++++++++++++++++++
#pragma mark appBundleUpgrade
RCT_EXPORT_METHOD(appBundleUpgrade:(NSArray *) params)
{
    NSLog(@"appBundleUpgrade=%@",params);
    //
    [RNUtils  handleAppUpgradeWithSuccess:^{
      NSLog(@"");
      //
      [self performSelectorOnMainThread:@selector(reloadRootView) withObject:nil waitUntilDone:NO];
    }];
}

-(void) reloadRootView{
    UIWindow * window = [[UIApplication sharedApplication] keyWindow];
    NSURL *jsCodeLocation;
    // 获取沙盒主目录路径
    NSString *homeDir = NSHomeDirectory();
    NSString *documentDir = [homeDir stringByAppendingPathComponent:@"Documents"];
    NSString *fileName=[documentDir stringByAppendingPathComponent:@"main.jsbundle"];
    NSLog(@"%@",fileName);
    jsCodeLocation = [[NSURL alloc] initFileURLWithPath:fileName isDirectory:NO];//生产上使用
    RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                        moduleName:@"ReadingProject"
                                                 initialProperties:nil
                                                     launchOptions:nil];
    rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
    
    UIViewController *rootViewController = [UIViewController new];
    rootViewController.view = rootView;
    window.rootViewController = rootViewController;
    [window makeKeyAndVisible];
}
@end
