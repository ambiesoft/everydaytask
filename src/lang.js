
let isJA = navigator.language && navigator.language.substring(0, 2) == "ja";

function getString(str) {
    switch (str) {
        case 'str_check_everyday_task':
            if (isJA) return "毎日のタスクをチェック";
            else return "Manage everyday's tasks";
            break;
        case 'str_login_by_google':
            if (isJA) return "Googleでログイン";
            else return "Login by Google";
            break;
        case 'str_please_login':
            if (isJA) return "ログインしてください";
            else return "Please login"
        case 'str_logoff':
            if (isJA) return "ログオフ";
            else return "Logoff";
        default:
            console.error(`No language resource for "${str}"`);
    }
}
const str_check_everyday_task = getString("str_check_everyday_task");
const str_login_by_google = getString("str_login_by_google");
const str_please_login = getString("str_please_login");
const str_logoff = getString("str_logoff");

function initLanguage() {
    setI18NLanguage("str_check_everyday_task");
    setI18NLanguage("str_login_by_google");
    setI18NLanguage("str_please_login");
    setI18NLanguage("str_logoff");
}

function setI18NLanguage(str) {
    document.querySelector(`[str="${str}"]`).innerText = eval(str);
}