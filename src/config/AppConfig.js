export const conf = window._env_ || process.env;
export const AppConfig = {
    BASE_URL: conf.VUE_APP_BASE_URL,
    BASE_URL_CHANGEPASS: conf.VUE_APP_BASE_URL_CHANGEPASS,
    FRESH_DESK_URL:  conf.VUE_APP_FRESH_DESK_URL
}
export default AppConfig;
