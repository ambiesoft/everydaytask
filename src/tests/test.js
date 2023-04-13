var okCount = 0;
var ngCount = 0;

function appendText(message) {
    message += "\n";
    let html = message.replace(/ /g, '&nbsp;').replace(/\n/g, "<br>");
    document.getElementById("testout").innerHTML += html;
}
function isEqual(a, b, c, here) {
    let hereMessage = "";
    if (here) {
        hereMessage += `${here.fileName}:${here.lineNumber}`;
    }

    let message = c + " => ";
    if (a === b) {
        okCount++;
        message += "OK";
        // if (hereMessage)
        //     message += " " + hereMessage;
    } else {
        ngCount++;
        message += "NG";
        if (hereMessage)
            message += " " + hereMessage;
        message += "\n";
        message += "  left is " + a;
        message += "\n";
        message += "  right is " + b;
    }
    appendText(message);
}
function isTrue(a, m, here) {
    isEqual(!!a, true, m, here);
}
function isFalse(a, m, here) {
    isEqual(!a, true, m, here);
}
function appendHeadText(message) {
    const line = "-----------------";
    appendText(line + message + line);
}
function showTestResults() {
    appendHeadText("Results");
    let message = `OK = ${okCount}, NG = ${ngCount}`;
    appendText(message);
}
function toHere(error) {
    if (error.stack) {
        const matchResult = error.stack.match(/(?:at\s+)(\S+\s)?\((.+):(\d+):(\d+)\)/);
        if (matchResult) {
            const [, , fileName, lineNumber, columnNumber] = matchResult;
            return {
                fileName,
                lineNumber: parseInt(lineNumber),
                columnNumber: parseInt(columnNumber),
            };
        }
    }
    return null;
}

function test_test() {
    appendHeadText("test_test")
    isEqual(1, 1, '1 is 1', toHere(new Error()));
    isEqual(1, 10, '1 is 10', toHere(new Error()));
}
function test_getLogDate() {
    appendHeadText("test_getLogDate")
    let date;
    date = getLogDate(2022, 2, 3, "4:5:6");
    isEqual(date.getFullYear(), 2022, "Year must be 2022", toHere(new Error()));
    isEqual(date.getMonth() + 1, 2, "Month must be 2", toHere(new Error()));
    isEqual(date.getDate(), 3, "date must be 3", toHere(new Error()));
    isEqual(date.getHours(), 4, "Hour must be 4", toHere(new Error()));
    isEqual(date.getMinutes(), 5, "Minute must be 5", toHere(new Error()));
    isEqual(date.getSeconds(), 6, "Minute must be 6", toHere(new Error()));

    date = getLogDate(2022, 2, 3, "4:05:06");
    isEqual(date.getFullYear(), 2022, "Year must be 2022", toHere(new Error()));
    isEqual(date.getMonth() + 1, 2, "Month must be 2", toHere(new Error()));
    isEqual(date.getDate(), 3, "date must be 3", toHere(new Error()));
    isEqual(date.getHours(), 4, "Hour must be 4", toHere(new Error()));
    isEqual(date.getMinutes(), 5, "Minute must be 5", toHere(new Error()));
    isEqual(date.getSeconds(), 6, "Minute must be 6", toHere(new Error()));
}
function test_isNowBeforeStartTime() {
    appendHeadText("test_isNowBeforeStartTime")
    isEqual(isNowBeforeStartTime({
        starttime: "8:00",
        endtime: "10:00",
    }, new Date("2000/1/1 7:59")),
        true,
        "7:59 is before 8:00", toHere(new Error()));

    isEqual(isNowBeforeStartTime({
        starttime: "8:00",
        endtime: "10:00",
    }, new Date("2000/1/1 8:00")),
        false,
        "8:00 is not before 8:00", toHere(new Error()));

    isEqual(isNowBeforeStartTime({
        starttime: "8:00",
        endtime: "10:00",
    }, new Date("2000/1/1 8:01")),
        false,
        "8:01 is not before 8:00", toHere(new Error()));
}
function test_getTaskToday() {
    appendHeadText("test_getTaskToday")
    let [start, end] = getTaskToday(new Date("2000/1/1 8:00"), {
        starttime: "7:59",
        endtime: "10:00",
    });
    isEqual(start.getFullYear(), end.getFullYear(), 'same year', toHere(new Error()));
    isEqual(start.getMonth(), end.getMonth(), 'same month', toHere(new Error()));
    isEqual(start.getDate(), end.getDate(), 'same date', toHere(new Error()));

    isEqual(start.getHours(), 7, 'starthour must be 7', toHere(new Error()));
    isEqual(start.getMinutes(), 59, 'starminute must be 59', toHere(new Error()));

    isEqual(end.getHours(), 10, 'starthour must be 10', toHere(new Error()));
    isEqual(end.getMinutes(), 0, 'starminute must be 0', toHere(new Error()));
}
function test_getTaskYesterday() {
    appendHeadText("test_getTaskYesterday")
    {
        let [start, end] = getTaskYesterday(new Date("2000/1/1 8:00"), {
            starttime: "7:59",
            endtime: "10:00",
        });
        isEqual(start.getFullYear(), end.getFullYear(), 'same year', toHere(new Error()));
        isEqual(start.getMonth(), end.getMonth(), 'same month', toHere(new Error()));
        isEqual(start.getDate(), end.getDate(), 'same date', toHere(new Error()));

        isEqual(start.getHours(), 7, 'starthour must be 7', toHere(new Error()));
        isEqual(start.getMinutes(), 59, 'starminute must be 59', toHere(new Error()));

        isEqual(end.getHours(), 10, 'starthour must be 10', toHere(new Error()));
        isEqual(end.getMinutes(), 0, 'starminute must be 0', toHere(new Error()));
    }
    {
        let [start, end] = getTaskYesterday(new Date("2000/1/1 8:00"), {
            starttime: "8:00",
            endtime: "31:59",
        });
        isEqual(start.getFullYear(), 1999, 'last year', toHere(new Error()));
        isEqual(start.getMonth() + 1, 12, 'last month', toHere(new Error()));
        isEqual(start.getDate(), 31, 'last date', toHere(new Error()));
        isEqual(start.getHours(), 8, 'starthour must be 8', toHere(new Error()));
        isEqual(start.getMinutes(), 0, 'starminute must be 0', toHere(new Error()));

        isEqual(end.getFullYear(), 2000, 'end year goes to 2000', toHere(new Error()));
        isEqual(end.getMonth() + 1, 1, 'end month goes up to 1', toHere(new Error()));
        isEqual(end.getDate(), 1, 'enddate goes up to 1', toHere(new Error()));
        isEqual(end.getHours(), 7, 'endhour goes rounded to 7', toHere(new Error()));
        isEqual(end.getMinutes(), 59, 'endminutes is 59', toHere(new Error()));
    }
}
function test_getTaskTodayYesterdayCompare() {
    appendHeadText("test_getTaskTodayYesterdayCompare")
    let [tstart, tend] = getTaskToday(new Date("2000/1/1 8:00"), {
        starttime: "7:59",
        endtime: "10:00",
    });
    let [ystart, yend] = getTaskYesterday(new Date("2000/1/1 8:00"), {
        starttime: "7:59",
        endtime: "10:00",
    });

    {
        const diffInMs = tstart.getTime() - ystart.getTime();
        const diffInHours = diffInMs / (1000 * 60 * 60);
        isEqual(diffInHours, 24, 'diff between yesterday and today must be 24 hours', toHere(new Error()));
    }
    {
        const diffInMs = tend.getTime() - yend.getTime();
        const diffInHours = diffInMs / (1000 * 60 * 60);
        isEqual(diffInHours, 24, 'diff between yesterday and today must be 24 hours', toHere(new Error()));
    }
}
function test_checkTaskTime() {
    appendHeadText("test_checkTaskTime")
    isTrue(checkTaskTime({
    }), 'empty time must be OK', toHere(new Error()));
    isTrue(checkTaskTime({
        starttime: "0:0",
    }), 'empty endtime must be OK', toHere(new Error()));
    isTrue(checkTaskTime({
        endtime: "10:00",
    }), 'empty stattime must be OK', toHere(new Error()));
    isTrue(checkTaskTime({
        starttime: "0:0",
        endtime: "10:00",
    }), '0:0 must be OK', toHere(new Error()));
    isTrue(checkTaskTime({
        starttime: "0:00",
        endtime: "10:00",
    }), '0:00 must be OK', toHere(new Error()));
    isTrue(checkTaskTime({
        starttime: "01:0",
        endtime: "10:00",
    }), '01:0 must be OK', toHere(new Error()));
    isTrue(checkTaskTime({
        starttime: "01:01",
        endtime: "10:00",
    }), '01:01 must be OK', toHere(new Error()));
    isTrue(checkTaskTime({
        starttime: "12:12",
        endtime: "15:00",
    }), '12:12 must be OK', toHere(new Error()));
    isTrue(checkTaskTime({
        starttime: "23:59",
        endtime: "30:00",
    }), '0:0 must be OK', toHere(new Error()));
    isTrue(checkTaskTime({
        starttime: "24:00",
        endtime: "25:00",
    }), '24:00 must NOT be OK', toHere(new Error()));
    isTrue(checkTaskTime({
        starttime: "10:00 AM",
        endtime: "25:00",
    }), '24:00 must NOT be OK', toHere(new Error()));

    isFalse(checkTaskTime({
        starttime: "22:60",
        endtime: "23:30",
    }), '22:60 must NOT be OK', toHere(new Error()));
    isFalse(checkTaskTime({
        starttime: "10:00",
        endtime: "9:30",
    }), 'starttime must be smaller', toHere(new Error()));
    isFalse(checkTaskTime({
        starttime: "-1:00",
        endtime: "9:30",
    }), 'Minus must NOT be OK', toHere(new Error()));
    isFalse(checkTaskTime({
        starttime: "1:00",
        endtime: "1:00",
    }), 'same date must NOT be OK', toHere(new Error()));

}
window.onload = () => {
    // test_test();
    test_getLogDate();
    test_isNowBeforeStartTime();
    test_getTaskToday();
    test_getTaskYesterday();
    test_getTaskTodayYesterdayCompare();
    test_checkTaskTime();
    showTestResults();
}