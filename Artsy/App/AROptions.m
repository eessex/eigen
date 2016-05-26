#import "AROptions.h"

NSString *const AROptionsLoadingScreenAlpha = @"Loading screens are transparent";
NSString *const AROptionsUseVCR = @"Use offline recording";
NSString *const AROptionsSettingsMenu = @"Enable user settings";
NSString *const AROptionsTappingPartnerSendsToPartner = @"Partner name in feed goes to partner";
NSString *const AROptionsShowAnalyticsOnScreen = @"AROptionsShowAnalyticsOnScreen";
NSString *const AROptionsEnableNativeLiveAuctions = @"Enable native live auctions";
NSString *const AROptionsEnableReactArtist = @"Enable React Artist view";


@implementation AROptions

+ (NSArray *)labsOptions
{
    return @[
        AROptionsUseVCR,
        AROptionsSettingsMenu,
        AROptionsTappingPartnerSendsToPartner,
        AROptionsEnableNativeLiveAuctions,
        AROptionsEnableReactArtist,
    ];
}

+ (NSArray *)labsOptionsThatRequireRestart
{
    return @[
         AROptionsEnableNativeLiveAuctions,
         AROptionsEnableReactArtist,
    ];
}

+ (BOOL)boolForOption:(NSString *)option
{
    return [[NSUserDefaults standardUserDefaults] boolForKey:option];
}

+ (void)setBool:(BOOL)value forOption:(NSString *)option
{
    [[NSUserDefaults standardUserDefaults] setBool:value forKey:option];
    [[NSUserDefaults standardUserDefaults] synchronize];
}

@end
