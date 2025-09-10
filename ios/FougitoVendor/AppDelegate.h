//#import <React/RCTBridgeDelegate.h>
//#import <UIKit/UIKit.h>
//#import <UserNotifications/UNUserNotificationCenter.h>
//
//@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate, UNUserNotificationCenterDelegate>
//
//@property (nonatomic, strong) UIWindow *window;
//
//@end


#import <RCTAppDelegate.h>
#import <UIKit/UIKit.h>
#import <UserNotifications/UNUserNotificationCenter.h>


@interface AppDelegate : RCTAppDelegate <UNUserNotificationCenterDelegate>

@end
