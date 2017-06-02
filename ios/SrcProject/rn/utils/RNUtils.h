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
+(void) log:(NSString *)fileName widthMsg:(NSString *)msg widthLevel:(NSString *)level;
@end
