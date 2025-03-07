export const APP_NAME      = "Doorman";
export const IS_LIVE       = true;
const API_URL              = IS_LIVE ? "https://www.applisoft.in/doorman_api" : "";
export const AppConfig     = {
    IS_LIVE                 : IS_LIVE,
    API_URL                 : API_URL,
    LANGUAGE                : 'en',
    EMAIL_REGEX             : '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$',
    COUNTRY_NAME            : 'US',
    CURRENCY_SYMBOL         : '$',
    SECURITY_TOKEN          : 'NBgO9GQx5oJNb8lSeqUX-doorman-@2022',
    MOBILE_REGEX            : '^(\([0-9]{3}\) |[0-9]{3} - )[0-9]{3} - [0-9]{4}$',
    API_ERROR            	: 'Something is wrong with processing your data. Please try again.',
    LOADER_TEXT            	: 'Please wait...',
    PUSH_SENDER_ID          :'920607308700'
};

