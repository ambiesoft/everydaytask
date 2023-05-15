
// https://stackoverflow.com/a/4673436
// First, checks if it isn't implemented yet.
if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined'
                ? args[number]
                : match
                ;
        });
    };
}

const isJA = navigator.language && navigator.language.substring(0, 2) == "ja";

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
        case 'str_please_login_again_to_authorize':
            if (isJA) return "権限取得のために再ログインしてください";
            else return "Please login to authrize."
        case 'str_please_login_loggingin':
            if (isJA) return "自動ログインしています・・・";
            else return "Now logging in..."
        case 'str_logoff':
            if (isJA) return "ログオフ";
            else return "Logoff";
        case 'str_get_tasks':
            if (isJA) return "タスク取得";
            else return "Get Tasks";
        case 'str_add_task':
            if (isJA) return "タスク追加";
            else return "Add Task";
        case 'str_edit_task':
            if (isJA) return "タスク編集";
            else return "Edit Tasks";
        case 'str_no_tasks':
            if (isJA) return "タスクがありません";
            else return "No Tasks";
        case 'str_how_to_use':
            if (isJA) return "利用方法";
            else return "How to use";
        case 'str_privacy':
            if (isJA) return "プライバシー";
            else return "Privacy";
        case 'str_contact':
            if (isJA) return "コンタクト";
            else return "Contact";
        case 'str_settings':
            if (isJA) return "設定";
            else return "Settings";
        case 'str_confirm_delete_task':
            if (isJA) return "タスク「{0}」を削除しますか？";
            else return "Are you sure to delete task '{0}'?";
        case 'str_confirm_delete_lastcheck':
            if (isJA) return "タスク「{0}」の最後のチェックを削除しますか？";
            else return "Are you sure to delete the last check of task '{0}'?";
        default:
            console.error(`No language resource for "${str}"`);
    }
}

// strings for elements
const str_check_everyday_task = getString("str_check_everyday_task");
const str_login_by_google = getString("str_login_by_google");
const str_please_login = getString("str_please_login");
const str_please_login_again_to_authorize = getString("str_please_login_again_to_authorize");
const str_please_login_loggingin = getString("str_please_login_loggingin");
const str_logoff = getString("str_logoff");
const str_get_tasks = getString("str_get_tasks");
const str_add_task = getString("str_add_task");
const str_edit_task = getString("str_edit_task");
const str_no_tasks = getString("str_no_tasks");
const str_how_to_use = getString("str_how_to_use");
const str_privacy = getString("str_privacy");
const str_contact = getString("str_contact");
const str_settings = getString("str_settings");

// strings for runtime
const str_confirm_delete_task = getString("str_confirm_delete_task");
const str_confirm_delete_lastcheck = getString("str_confirm_delete_lastcheck");

document.addEventListener('DOMContentLoaded', function () {
    console.log("DOMContentLoaded");
    setI18NLanguage("str_check_everyday_task");
    setI18NLanguage("str_login_by_google");
    setI18NLanguage("str_please_login");
    setI18NLanguage("str_please_login_again_to_authorize");
    setI18NLanguage("str_logoff");
    setI18NLanguage("str_get_tasks");
    setI18NLanguage("str_add_task");
    setI18NLanguage("str_edit_task");
    setI18NLanguage("str_no_tasks");
    setI18NLanguage("str_how_to_use");
    setI18NLanguage("str_privacy");
    setI18NLanguage("str_contact");
    setI18NLanguage("str_settings");
});

function setI18NLanguage(str) {
    document.querySelectorAll(`[str="${str}"]`).forEach((e) => { e.innerText = eval(str); });
}