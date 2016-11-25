//
//  RNUtils.h
//  ReadingProject
//
//  Created by weichuang on 16/4/6.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
@interface RNUtils: NSObject <UIAlertViewDelegate>
typedef void (^DefaultSuccessBlock)(); // 默认成功block
typedef void (^RequestSuccessBlock)(NSDictionary *RES_DATA, BOOL isSuccess); // 访问成功block
typedef void (^AFNErrorBlock)(NSError *error); // 访问失败block
+(BOOL) handleAppUpgradeWithSuccess:(DefaultSuccessBlock)success;
@end
