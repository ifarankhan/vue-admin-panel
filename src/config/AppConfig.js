export const conf = window._env_ || process.env;
export const AppConfig = {
    BASE_URL: conf.VUE_APP_BASE_URL,
}
export default AppConfig;
