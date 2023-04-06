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

