const APP_NAME = "EverydayTask";

const CLIENT_ID = '335012850826-gvrev3vnd53u401ne1coqtrepudrmjje.apps.googleusercontent.com';
// const API_KEY = 'AIzaSyBwo4I6oVCzFCW3X10Dch0AIJeTLR0VmK8';
const DISCOVERY_DOC_SCRIPT = 'https://script.googleapis.com/$discovery/rest?version=v1';
const DISCOVERY_DOC_SHEETS = 'https://sheets.googleapis.com/$discovery/rest?version=v4';
const DISCOVERY_DOC_DRIVE = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';

// https://developers.google.com/identity/protocols/oauth2/scopes
// const SCOPES = 'https://www.googleapis.com/auth/script.projects https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/spreadsheets';
const SCOPES = 'https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/script.storage https://www.googleapis.com/auth/drive.appdata';

const STARTDATEOBJ = new Date();
const STARTYEAR = STARTDATEOBJ.getFullYear();
const STARTMONTH = STARTDATEOBJ.getMonth() + 1; // 0-base
const STARTDATE = STARTDATEOBJ.getDate();
const STARTHOURS = STARTDATEOBJ.getHours().toString().padStart(2, '0');
const STARTMINUTES = STARTDATEOBJ.getMinutes().toString().padStart(2, '0');
const STARTSECONDS = STARTDATEOBJ.getSeconds().toString().padStart(2, '0');

const SPREAD_NAME = "EverydayTask - Ambiesoft.com";
const UNCHECKMARK = "☐";
const CHECKMARK = "☑️";

const TASK_COLUMN_ID = "ID";
const TASK_COLUMN_TASK = "Task";
const TASK_COLUMN_ACTION = "Action";
const TASK_COLUMN_STATE = "State";
const TASK_COLUMN_MEMO = "Memo";
const TASK_COLUMN_CREATED = "Created";
const TASK_COLUMN_STARTTIME = "Start Time";
const TASK_COLUMN_ENDTIME = "End Time";

const TASK_COLUMNS = [
    TASK_COLUMN_ID,
    TASK_COLUMN_TASK,
    TASK_COLUMN_ACTION,
    TASK_COLUMN_STATE,
    TASK_COLUMN_MEMO,
    TASK_COLUMN_CREATED,
    TASK_COLUMN_STARTTIME,
    TASK_COLUMN_ENDTIME,
]

const COOKIE_SETTING_SHOWMEMO_AS_TOOLTIP = "ShowMemoAsToolTip";
const COOKIE_SETTING_AUTO_LOGIN = "AutoLogin";
const COOKIE_SETTING_DISPLAY_FAVICON = "DisplayFavicon";

const SETID_TO_COOKIE = [
    {
        id: "settings_showmemo",
        cookie: COOKIE_SETTING_SHOWMEMO_AS_TOOLTIP,
    },
    {
        id: "settings_autologin",
        cookie: COOKIE_SETTING_AUTO_LOGIN,
    },
    {
        id: "settings_showfavicon",
        cookie: COOKIE_SETTING_DISPLAY_FAVICON,
    },
]