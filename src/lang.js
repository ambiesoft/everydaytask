
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
        case 'str_delete_last_check':
            if (isJA) return "最後のチェックを削除";
            else return "Delete the last Check";
        case 'str_change':
            if (isJA) return "変更";
            else return "Change";
        case 'str_delete':
            if (isJA) return "削除";
            else return "Delete";
        case 'str_howtoHtml':
            if (isJA) {
                return `<h2>概要</h2>
                <p class="setumei">このアプリは毎日決まってやるべきタスクを登録しておき、その達成状況を把握するためのアプリです。</p>
                <h2 class="midashi">Googleでログイン</h2>
                <p class="setumei">このアプリを使うためにはGoogleのアカウントを所有している必要があります。タスクのデータはあなたのGoogleドライブにスプレッドシートとして保存されます。</p>
                <h2 class="midashi">タスクのチェック</h2>
                <p class="setumei">
                チェックボタンをクリックするとタスクがチェックされます。タスクのアクションにURLが指定されていればそれが開かれます。URLは複数指定することもできます。タスクを編集し、スペースや改行でURLを区切ってください。
                </p>
                <h2 class="midashi">タスクの編集</h2>
                <p class="setumei">タスクは「EverydayTask - Ambiesoft.com」という名前のスプレッドシートで保存されています。このスプレッドシートのTasksシートを編集することでタスクを編集できます。このシートは以下のようなコラムで構成されています。</p>
                <ul>
                  <li>
                    <h4 class="midashi">ID</h4>
                    <p class="setumei">タスクの識別子です。一度決まった値は変更しないでください。1以上の整数です。IDに文字列separatorを指定し、Taskに文字列を指定するとタスクの区切りをつくることができます。</p>
                  </li>
                  <li>
                    <h4 class="midashi">Task</h4>
                    <p class="setumei">タスクの名前です。</p>
                  </li>
                  <li>
                    <h4 class="midashi">Action</h4>
                    <p class="setumei">タスクのチェックボタンをクリックしたときに開くURLです。スペースや改行で区切って複数指定できます。</p>
                  </li>
                  <li>
                    <h4 class="midashi">Memo</h4>
                    <p class="setumei">メモです。好きな値を設定できます。設定を変更してこの値をポップアップすることもできます。</p>
                  </li>
                  <li>
                    <h4 class="midashi">Start Time, End Time</h4>
                    <p class="setumei">タスクをチェックできる有効な時間間隔です。0:00から48:00まで指定できますが、その間隔は最大で24時間です。</p>
                  </li>
                </ul>
                `;
            } else {
                return `<h2>Summary</h2>
                <p class="setumei">This application is for registering tasks to be done on a daily basis and keeping track of their accomplishment.</p>
                <h2 class="midashi">Sign in with Google</h2>
                <p class="setumei">You must own a Google account to use this application. The task data will be saved as a spreadsheet on your Google Drive.</p>
                <h2 class="midashi">Check Tasks</h2>
                <p class="setumei">
                Clicking the check button will check the task. If a URL is specified in the task's action, it will be opened. Edit the task and separate the URLs with a space or a new line.
                </p>
                <h2 class="midashi">Edit Tasks</h2>
                <p class="setumei">Tasks are stored in a spreadsheet named "EverydayTask - Ambiesoft.com". You can edit a task by editing the Tasks sheet in this spreadsheet. This sheet consists of the following columns:</p>
                <ul>
                  <li>
                    <h4 class="midashi">ID</h4>
                    <p class="setumei">The identifier of the task. Do not change the value once it is determined. ID is an integer greater than or equal to 1. You can create a task separator by specifying a string separator for ID and a string for Task.</p>
                  </li>
                  <li>
                    <h4 class="midashi">Task</h4>
                    <p class="setumei">The name of the task.</p>
                  </li>
                  <li>
                    <h4 class="midashi">Action</h4>
                    <p class="setumei">The URL to be opened when the check button of the task is clicked. You can specify multiple URLs separated by spaces or line breaks.</p>
                  </li>
                  <li>
                    <h4 class="midashi">Memo</h4>
                    <p class="setumei">Memo. You can set any value you like. You can also change the setting to populate this value.</p>
                  </li>
                  <li>
                    <h4 class="midashi">Start Time, End Time</h4>
                    <p class="setumei">The valid time interval at which tasks can be checked, from 0:00 to 48:00, with a maximum interval of 24 hours.</p>
                  </li>
                </ul>
                `;
            }
        case 'str_privacyHtml':
            if (isJA) {
                return `<p>このアプリはデータ保存と認証にGoogleを使用しており、Google以外のサーバーにはデータは保存されません。</p>`;
            } else {
                return `<p>This app uses Google for data storage and authentication and does not store data on non-Google servers.</p>`;
            }
        case 'str_contactHtml':
            if (isJA) {
                return `<p><a href="https://ambiesoft.github.io/webjumper/?target=bbs" target="_blank">BBS</a>または<a href="mailto:ambiesoft.trueff@gmail.com">メール</a>でお問い合わせください。</p>`;
            } else {
                return `<p>Please contact us via <a href="https://ambiesoft.github.io/webjumper/?target=bbs" target="_blank">BBS</a> or <a href="mailto:ambiesoft.trueff@gmail.com">email</a>.</p>`;
            }
        case 'str_settingsHtml':
            if (isJA) {
                return `<h2>設定</h2>
                <ul class="settings_list">
                  <li><input id="settings_showmemo" type="checkbox" onchange="onSettingsChange_ShowMemo(this)">メモをツールチップで表示</li>
                  <li><input id="settings_autologin" type="checkbox"
                      onchange="onSettingsChange_AutoLogin(this)">自動でログインする（ポップアップの許可が必要になる場合があります）
                  </li>
                  <li><input id="settings_showfavicon" type="checkbox" onchange="onSettingsChange_Favicon(this)">Faviconを表示</li>
                  <li><input id="settings_reverseUrlOpen" type="checkbox" onchange="onSettingsChange_ReverseUrlOpen(this)">アクションのURLを開く順番を逆にする</li>
                </ul>
                `;
            } else {
                return `<h2>Options</h2>
                <ul class="settings_list">
                            <li><input id="settings_showmemo" type="checkbox" onchange="onSettingsChange_ShowMemo(this)">Display Memo as tooltips</li>
                            <li><input id="settings_autologin" type="checkbox"
                                onchange="onSettingsChange_AutoLogin(this)">Automatic login (may require pop-up permission)
                            </li>
                            <li><input id="settings_showfavicon" type="checkbox" onchange="onSettingsChange_Favicon(this)">Display Favicon</li>
                            <li><input id="settings_reverseUrlOpen" type="checkbox" onchange="onSettingsChange_ReverseUrlOpen(this)">Reverse the order of opening URLs in the action</li>
                          </ul>
                `;
            }

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
const str_delete_last_check = getString("str_delete_last_check");
const str_change = getString("str_change");
const str_delete = getString("str_delete");

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