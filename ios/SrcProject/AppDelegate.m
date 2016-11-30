/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"
#import "rn/utils/RNUtils.h"
#import "RCTBundleURLProvider.h"
#import "RCTRootView.h"
#import <AFNetworking/AFNetworking.h>
//#import "GDTTrack.h"
//#import "GDTSplashAd.h"
//#import "GDTMobInterstitial.h"


@implementation AppDelegate

//@synthesize splash = _splash;

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [self handleJsLocation];
  //
  @try {
    NSLog(@"self.rootView");
    self.rootView = [[RCTRootView alloc] initWithBundleURL:self.jsCodeLocation
                                                moduleName:@"ReadingProject"
                                         initialProperties:nil
                                             launchOptions:nil];
    //
    self.rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
    NSLog(@"self.rootView end");
  }
  @catch (NSException *exception) {
    NSLog(@"%@",exception);
  }
  ////
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  self.rootViewController = [UIViewController new];
  //
  self.rootViewController.view = self.rootView;
  //
  self.window.rootViewController = self.rootViewController;
  [self.window makeKeyAndVisible];
  //
//  [self showKaipingAd];
  //
  //如果已经得到授权，就直接添加本地通知，否则申请询问授权
  if ([[UIApplication sharedApplication]currentUserNotificationSettings].types!=UIUserNotificationTypeNone) {
    NSLog(@"取得通知授权");
  }else{
    NSLog(@"未取得通知授权");
    [[UIApplication sharedApplication]registerUserNotificationSettings:[UIUserNotificationSettings settingsForTypes:UIUserNotificationTypeAlert|UIUserNotificationTypeBadge|UIUserNotificationTypeSound  categories:nil]];
  }
  //
  return YES;
}
//-(void) showKaipingAd{
//  //开屏广告初始化并展示代码
//  if ([[UIDevice currentDevice] userInterfaceIdiom] == UIUserInterfaceIdiomPhone) {
//    @try {
//      GDTSplashAd *splashAd = [[GDTSplashAd alloc] initWithAppkey:@"1105662936" placementId:@"4080111488181477"];
//      splashAd.delegate = self;//设置代理1ez
//      //针对不同设备尺寸设置不同的默认图片，拉取广告等待时间会展示该默认图片。
//      UIImage * image = [UIImage imageNamed:@"LaunchImage"];
//      image = [self scaleToSize:image size:[[UIScreen mainScreen] bounds].size];
//      splashAd.backgroundColor = [UIColor colorWithPatternImage:image];
//      splashAd.fetchDelay = 2;
//      //［可选］拉取并展示全屏开屏广告
//      [splashAd loadAdAndShowInWindow:self.window];
//      self.splash = splashAd;
//    }
//    @catch (NSException *exception) {
//      NSLog(@"%@",exception);
//    }
//    @finally {
//      // 结果处理
//    }
//  }
//}

- (UIImage *)scaleToSize:(UIImage *)img size:(CGSize)size{
  // 创建一个bitmap的context
  // 并把它设置成为当前正在使用的context
  UIGraphicsBeginImageContext(size);
  // 绘制改变大小的图片
  [img drawInRect:CGRectMake(0, 0, size.width, size.height)];
  // 从当前context中创建一个改变大小后的图片
  UIImage* scaledImage = UIGraphicsGetImageFromCurrentImageContext();
  // 使当前的context出堆栈
  UIGraphicsEndImageContext();
  // 返回新的改变大小后的图片
  return scaledImage;
}
-(void) handleJsLocation{
  @try {
    NSLog(@"handleJsLocation");
    //获取当前app版本
    NSDictionary *infoDictionary = [[NSBundle mainBundle] infoDictionary];
    NSString * appV = [infoDictionary objectForKey:@"CFBundleShortVersionString"];
    NSUserDefaults * userDefaults = [NSUserDefaults standardUserDefaults];
    NSString * appBundleV = [userDefaults objectForKey:@"appBundleVersion"];
    //  [userDefaults setObject:@"127.0.0.1" forKey:@"RCT_jsLocation"];
    //  [userDefaults synchronize];
    if (appBundleV == nil || [self versionBigWithBigVersion:appV withSmallVersion:appBundleV]){
      NSLog(@"appBundleV=0.0.0");
      appBundleV = appV;
      [userDefaults setObject:appBundleV forKey:@"appBundleVersion"];
      [userDefaults synchronize];
    }
    if ([appBundleV isEqualToString:appV]) {
      NSLog(@"没有升级过内部版本");
      self.jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];
      //      self.jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
      //    self.jsCodeLocation = [NSURL URLWithString:@"http://127.0.0.1:8081/index.ios.bundle?platform=ios&dev=false"];
    }else{
      NSLog(@"已升级过内部版本%@",appBundleV);
      // 获取沙盒主目录路径
      NSString *homeDir = NSHomeDirectory();
      NSString *documentDir = [homeDir stringByAppendingPathComponent:@"Documents"];
      NSString *fileName=[documentDir stringByAppendingPathComponent:@"main.jsbundle"];
      NSLog(@"%@",fileName);
      self.jsCodeLocation = [[NSURL alloc] initFileURLWithPath:fileName isDirectory:NO];//生产上使用
    }
  }
  @catch (NSException *exception) {
    [self performSelector:@selector(handleJsLocation) withObject:nil afterDelay:0.5f];
  }
}

-(BOOL) versionBigWithBigVersion:(NSString *) bigVersion withSmallVersion:(NSString *)smallVersion{
  BOOL isBig = NO;
  //
  NSArray * bigArray = [bigVersion componentsSeparatedByString:@"."];
  int bigInt = [bigArray[0] intValue] * 100 + [bigArray[1] intValue] * 100 + [bigArray[2] intValue] * 100;
  //
  NSArray * smallArray = [smallVersion componentsSeparatedByString:@"."];
  int smallInt = [smallArray[0] intValue] * 100 + [smallArray[1] intValue] * 100 + [smallArray[2] intValue] * 100;
  if(bigInt>smallInt){
    isBig = YES;
  }
  //
  return isBig;
}
-(void)applicationWillEnterForeground:(UIApplication *)application{
  [[UIApplication sharedApplication]setApplicationIconBadgeNumber:0];//进入前台取消应用消息图标
}
@end
