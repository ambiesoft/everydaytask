function isValidURL(url) {
    const urlRegExp = /^(?:http(?:s)?:\/\/(?:www\.)?)?[^\s.]+\.[^\s]{2,}$/i;
    return urlRegExp.test(url);
}

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

function isInToday(first, last) {
    // STARTDATE:ページが開かれたDate, Extract only Year, month and date

    let [iFirstHour, iFirstMinute] = first.match(/\d+/g).map(Number);
    let [iLastHour, iLastMinute] = last.match(/\d+/g).map(Number);

    let iFirstAdded = 0;
    if (iFirstHour > 23) {
        iFirstAdded += 1;
        iFirstHour -= 24;
    }
    let iLastAdded = 0;
    if (iLastHour > 23) {
        iLastAdded += 1;
        iLastHour -= 24;
    }

    const now = new Date();
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();

    const firstSec = (iFirstAdded * 24 * 3600) + (iFirstHour * 3600) + (iFirstMinute * 60);
    const lastSec = (iLastAdded * 24 * 3600) + (iLastHour * 3600) + (iLastMinute * 60) + 60;
    const currentSec = (currentHours * 3600) + (currentMinutes * 60);
    if (firstSec <= currentSec) {
        if (currentSec < lastSec) {
            // last < current
            return true;
        }
    }
    return false;
}

var depid_head = "AKfycbznJza6mTsxZhaa-uUnN9PIzo5eTNIRhsFZWPmo5f2L";
var depid_anygoogleaccount = "AKfycbxsom08ZDe1KuNH0yZNyGsTpySYQPLl_9AgeTZ-Ee-mT7pXNeorGL8LbYPXY8RnuV8KDQ";
var depid_anyone = "AKfycbxyG52BkbMZd-EneXxwaLpC-8KUj2QQsi0B1kW3zpLYKlQTciFGiFeCK_vTeUR4Q0j5aA";
var depid_tanin = "AKfycbw1uH-oQ8FO4RmdXzRdykkFUdcBPMce4EJ1xcRTd1qG8T-S5kE";

function runRemoteScript(callback, func, parameters) {
    if (!ensureToken()) {
        return;
    }
    let url = `https://script.googleapis.com/v1/scripts/${depid_head}:run`;
    // let data = "key=AIzaSyBwo4I6oVCzFCW3X10Dch0AIJeTLR0VmK8";
    let postdata = {
        "function": func,
        "parameters": parameters,
        // "sessionState": string,
        // "devMode": true,
    };
    token = gapi.client.getToken();
    console.log(token)

    fetch(url, {
        method: 'POST',
        redirect: "follow",
        headers: {
            // 'Accept': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded'
            'Content-Type': 'application/json',
            'Authorization': token.token_type + ' ' + token.access_token,
        },
        body: JSON.stringify(postdata),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            callback(data);
        })
        .catch(error => console.error(error));
}
function getDuplicateValues(arr) {
    var duplicateValues = [];
    for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
            if (arr[i] === arr[j] && !duplicateValues.includes(arr[i])) {
                duplicateValues.push(arr[i]);
            }
        }
    }
    return duplicateValues;
}

function getLogDate(year, month, day, timeString) {
    let ret = new Date();
    ret.setFullYear(parseInt(year));
    ret.setMonth(parseInt(month) - 1);
    ret.setDate(parseInt(day));

    const [hour, minute, sec] = timeString.match(/\d+/g).map(Number);
    ret.setHours(parseInt(hour));
    ret.setMinutes(parseInt(minute));
    if (sec)
        ret.setSeconds(sec);
    ret.setMilliseconds(0);

    return ret;
}
function isNowBeforeStartTime(task, now) {
    if (!task.starttime)
        return false;

    const [hour, minute] = task.starttime.match(/\d+/g).map(Number);
    let cmp = new Date(now);
    cmp.setHours(hour);
    cmp.setMinutes(minute);
    cmp.setSeconds(0);

    return now < cmp;
}
function getTaskYesterday(now, task) {
    let [s, e] = getTaskToday(now, task);
    s.setDate(s.getDate() - 1);
    e.setDate(e.getDate() - 1);
    return [s, e];
}
function getTaskToday(now, task) {
    let starthour = 0;
    let startminute = 0;
    let endhour = 23;
    let endminute = 59;

    if (task.starttime) {
        [starthour, startminute] = task.starttime.match(/\d+/g).map(Number);
    }
    if (task.endtime) {
        [endhour, endminute] = task.endtime.match(/\d+/g).map(Number);
    }
    let taskStart = new Date(now);
    taskStart.setHours(starthour);
    taskStart.setMinutes(startminute);
    taskStart.setSeconds(0);
    taskStart.setMilliseconds(0);

    let taskEnd = new Date(now);
    taskEnd.setHours(endhour);
    taskEnd.setMinutes(endminute);
    taskEnd.setSeconds(59);
    taskEnd.setMilliseconds(0);

    return [taskStart, taskEnd];
}