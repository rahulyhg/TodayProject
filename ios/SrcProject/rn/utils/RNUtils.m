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

@implementation RNUtils
NSString * const SERVER_ROOT_PATH = @"http://www.weichuanghome.com:28080/today/";
//NSString * const SERVER_ROOT_PATH = @"http://112.126.73.237/reading/";
//NSString * const SERVER_ROOT_PATH = @"http://localhost:8080/reading/";


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

@end
