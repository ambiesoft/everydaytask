const APP_NAME = "EverydayTask";

const CLIENT_ID = '335012850826-gvrev3vnd53u401ne1coqtrepudrmjje.apps.googleusercontent.com';
// const API_KEY = 'AIzaSyBwo4I6oVCzFCW3X10Dch0AIJeTLR0VmK8';
const DISCOVERY_DOC_SCRIPT = 'https://script.googleapis.com/$discovery/rest?version=v1';
const DISCOVERY_DOC_SHEETS = 'https://sheets.googleapis.com/$discovery/rest?version=v4';
const DISCOVERY_DOC_DRIVE = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';

// https://developers.google.com/identity/protocols/oauth2/scopes
// const SCOPES = 'https://www.googleapis.com/auth/script.projects https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/spreadsheets';
const SCOPES = 'https://www.googleapis.com/auth/spreadsheets.currentonly https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/script.storage https://www.googleapis.com/auth/drive.appdata';

const STARTDATEOBJ = new Date();
const STARTYEAR = STARTDATEOBJ.getFullYear(); // 年を取得
const STARTMONTH = STARTDATEOBJ.getMonth() + 1; // 月を取得（0-11の範囲で返されるため、1を加算）
const STARTDATE = STARTDATEOBJ.getDate(); // 日を取得
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
const TASK_COLUMN_STARTTIME = "Start Time";
const TASK_COLUMN_ENDTIME = "End Time";
const TASK_COLUMN_RESERVED01 = "Reserved01";
const TASK_COLUMN_RESERVED02 = "Reserved02";
const TASK_COLUMN_RESERVED03 = "Reserved03";
const TASK_COLUMN_RESERVED04 = "Reserved04";
const TASK_COLUMN_RESERVED05 = "Reserved05";
const TASK_COLUMN_RESERVED06 = "Reserved06";
const TASK_COLUMN_RESERVED07 = "Reserved07";
const TASK_COLUMN_RESERVED08 = "Reserved08";
const TASK_COLUMN_RESERVED09 = "Reserved09";
const TASK_COLUMN_RESERVED10 = "Reserved10";

const TASK_COLUMNS = [
    TASK_COLUMN_ID,
    TASK_COLUMN_TASK,
    TASK_COLUMN_ACTION,
    TASK_COLUMN_STATE,
    TASK_COLUMN_MEMO,
    TASK_COLUMN_STARTTIME,
    TASK_COLUMN_ENDTIME,
    TASK_COLUMN_RESERVED01,
    TASK_COLUMN_RESERVED02,
    TASK_COLUMN_RESERVED03,
    TASK_COLUMN_RESERVED04,
    TASK_COLUMN_RESERVED05,
    TASK_COLUMN_RESERVED06,
    TASK_COLUMN_RESERVED07,
    TASK_COLUMN_RESERVED08,
    TASK_COLUMN_RESERVED09,
    TASK_COLUMN_RESERVED10,
]
