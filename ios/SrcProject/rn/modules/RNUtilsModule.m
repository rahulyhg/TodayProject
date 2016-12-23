
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
  if ([[UIApplication sharedApplication]currentUserNotificationSettings].types!=UIUserNotificationTypeNone) {
    NSLog(@"取得通知授权");
    [appInfo setValue:@"1" forKey:@"isOpenNotification"];
  }else{
    NSLog(@"未取得通知授权");
    [appInfo setValue:@"0" forKey:@"isOpenNotification"];
  }
  //
  NSString *homeDir = NSHomeDirectory();
  NSString *DocumentsDir = [homeDir stringByAppendingPathComponent:@"Documents"];
  NSLog(@"%@",DocumentsDir);
  [appInfo setValue:DocumentsDir forKey:@"DocumentsPath"];
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
#pragma mark +++++++++++++++++++++++++++++++++++++++
#pragma mark appNotification
RCT_EXPORT_METHOD(appNotification:(NSArray *) params)
{
  NSLog(@"appNotification=%@",params);
  NSString * onOrOff = params[0];
  NSString * time = params[1];
  NSString * alertBody = params[2];
  if([onOrOff isEqualToString:@"1"]){
    NSLog(@"打开appNotification");
    //
    UILocalNotification * notification=[[UILocalNotification alloc] init];
    NSDateFormatter *formattr=[[NSDateFormatter alloc] init];
    //格式化时间
    [formattr setDateFormat:@"HH:mm"];
    NSDate *fireDate=[formattr dateFromString:[NSString stringWithFormat:@"%@",time]];
    //使用本地时区
    notification.timeZone = [NSTimeZone defaultTimeZone];
    notification.fireDate = fireDate;
    //
    //
    notification.repeatInterval = kCFCalendarUnitDay;//设置重复间隔
    notification.soundName=UILocalNotificationDefaultSoundName;//通知提示音 使用默认的
    //
    notification.alertBody = alertBody;//设置提醒的文字内容
    notification.alertAction=@"今天做了啥";//
//    notification.applicationIconBadgeNumber++;//设置应用程序右上角的提醒个数
    //
    //  NSMutableDictionary *aUserInfo = [[NSMutableDictionary alloc] init];
    //  aUserInfo[kLocalNotificationID] = @"LocalNotificationID";
    //  notification.userInfo = aUserInfo;
    
    [[UIApplication sharedApplication] scheduleLocalNotification:notification];
    //  [[UIApplication sharedApplication] presentLocalNotificationNow:notification];
  }else{
    [[UIApplication sharedApplication] cancelAllLocalNotifications];
  }
}
#pragma mark +++++++++++++++++++++++++++++++++++++++
#pragma mark gotoAppSystemSetting
RCT_EXPORT_METHOD(gotoAppSystemSetting:(NSArray *) params)
{
  NSLog(@"gotoAppSystemSetting=%@",params);
  NSURL * url = [NSURL URLWithString:UIApplicationOpenSettingsURLString];
  if([[UIApplication sharedApplication] canOpenURL:url]) {
    NSURL*url =[NSURL URLWithString:UIApplicationOpenSettingsURLString];
    [[UIApplication sharedApplication] openURL:url];
  }
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
