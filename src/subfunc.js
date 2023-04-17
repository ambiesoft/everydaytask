function getLastError() {
    return lastError;
}
function setLastError(err) {
    lastError = err;
}
function isValidURL(url) {
    const urlRegExp = /^(?:http(?:s)?:\/\/(?:www\.)?)?[^\s.]+\.[^\s]{2,}$/i;
    return urlRegExp.test(url);
}

function isPositiveInteger(num) {
    if (Array.isArray(num))
        return false;
    if (! /^[0-9]+$/.test(num))
        return false;

    return Number(num) > 0;
}

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
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
    if (!task.getStartTime())
        return false;

    const [hour, minute] = task.getStartTime().match(/\d+/g).map(Number);
    let cmp = new Date(now);
    cmp.setHours(hour);
    cmp.setMinutes(minute);
    cmp.setSeconds(0);

    return now < cmp;
}
function isNowShouldBeYesterday(task, now) {
    if (!task.getStartTime())
        return false;

    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);

    const [hour, minute] = task.getStartTime().match(/\d+/g).map(Number);
}
function getTaskYesterday(now, task) {
    let [s, e] = getTaskToday(now, task);
    s.setDate(s.getDate() - 1);
    e.setDate(e.getDate() - 1);
    return [s, e];
}
function getHourAndMinute(time) {
    return time.match(/(-?\d{1,2}):(-?\d{1,2})/).slice(1).map(Number);
}
function getTaskToday(now, task) {
    let starthour = 0;
    let startminute = 0;
    let endhour = 24;
    let endminute = 0;

    if (task.getStartTime()) {
        [starthour, startminute] = getHourAndMinute(task.getStartTime());
    }
    if (task.getEndTime()) {
        [endhour, endminute] = getHourAndMinute(task.getEndTime());
    }
    let taskStart = new Date(now);
    taskStart.setHours(starthour);
    taskStart.setMinutes(startminute);
    taskStart.setSeconds(0);
    taskStart.setMilliseconds(0);

    let taskEnd = new Date(now);
    taskEnd.setHours(endhour);
    taskEnd.setMinutes(endminute);
    taskEnd.setSeconds(0);
    taskEnd.setMilliseconds(0);

    return [taskStart, taskEnd];
}
function checkTaskTime(task) {
    try {
        if (!checkTaskTime2(task.getStartTime()))
            return false;
        if (!checkTaskTime2(task.getEndTime()))
            return false;

        let starthour = 0;
        let startminute = 0;
        let endhour = 48;
        let endminute = 0;

        if (task.getStartTime()) {
            [starthour, startminute] = getHourAndMinute(task.getStartTime());
        }
        if (task.getEndTime()) {
            [endhour, endminute] = getHourAndMinute(task.getEndTime());
        }
        if (24 < starthour) {
            setLastError(`start hour must be lesser than 24`);
            return false;
        }
        if (startminute < 0) {
            setLastError(`start minutes must not be minus`);
            return false;
        }
        if (59 < startminute) {
            setLastError(`start minutes must be lesser than or equal to 59`);
            return false;
        }
        if (48 < endhour) {
            setLastError(`end hour must must be lesser than or equal to 48`);
            return false;
        }
        if (48 == endhour && endminute != 0) {
            setLastError(`if end hour is 48, end minutes must be 0`);
            return false;
        }
        if (endminute < 0) {
            setLastError(`end minites must not be minus`);
            return false;
        }
        if (59 < endminute) {
            setLastError(`end minutes must be lesser than or equal to 59`);
            return false;
        }

        let taskStart = new Date();
        taskStart.setHours(starthour);
        taskStart.setMinutes(startminute);
        taskStart.setSeconds(0);
        taskStart.setMilliseconds(0);

        let taskEnd = new Date();
        taskEnd.setHours(endhour);
        taskEnd.setMinutes(endminute);
        taskEnd.setSeconds(0);
        taskEnd.setMilliseconds(0);

        if (taskEnd <= taskStart) {
            setLastError(`start time must be lesser than end time`);
            return false;
        }

        return true;
    } catch {
        return false;
    }
}

function checkTaskTime2(time) {
    let ret;
    if (time) {
        ret = getHourAndMinute(time);
        if (!ret) {
            setLastError(`Illegal time format in '${time}'`);
            return false;
        }
        if (ret.length != 2) {
            setLastError(`Illegal time format in '${time}'`);
            return false;
        }
        if (!(0 <= ret[0] && ret[0] <= 48)) {
            setLastError(`Hour must be between 0 and 48. '${time}'`);
            return false;
        }
        if (!(0 <= ret[0] && ret[0] <= 59)) {
            setLastError(`Minutes must be between 0 and 59. '${time}'`);
            return false;
        }
    }
    return true;
}

function getNextAlphabet(char) {
    if (char === 'Z') {
        return 'A';
    } else if (char === 'z') {
        return 'a';
    } else if (/^[a-zA-Z]$/.test(char)) {
        return String.fromCharCode(char.charCodeAt(0) + 1);
    } else {
        return 'A';
    }
}
function getAlpahFromColumnIndex(index) {
    index--;
    let a = "A";
    for (let i = 0; i < index; ++i) {
        a = getNextAlphabet(a);
    }
    return a;
}

function getColumnIndexFromColumnName(colArray, colName) {
    for (let i = 0; i < colArray.length; ++i) {
        if (colArray[i] == colName) {
            return i;
        }
    }
    return -1;
}

function getMissingRows(rows) {
    return TASK_COLUMNS.filter(item => !rows.includes(item));
}

