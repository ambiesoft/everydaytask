function isEqual(a, b, c) {
    let message = c + "=> ";
    if (a === b)
        message += "OK";
    else {
        message += "NG";
        message += "\n";
        message += "  left is " + a;
        message += "\n";
        message += "  right is " + b;
    }
    message += "\n";
    document.getElementById("testout").innerText += message;
}
function test_getLogDate() {
    let date;
    date = getLogDate(2022, 2, 3, "4:5:6");
    isEqual(date.getFullYear(), 2022, "Year must be 2022");
    isEqual(date.getMonth() + 1, 2, "Month must be 2");
    isEqual(date.getDate(), 3, "date must be 3");
    isEqual(date.getHours(), 4, "Hour must be 4");
    isEqual(date.getMinutes(), 5, "Minute must be 5");
    isEqual(date.getSeconds(), 6, "Minute must be 6");

    date = getLogDate(2022, 2, 3, "4:05:06");
    isEqual(date.getFullYear(), 2022, "Year must be 2022");
    isEqual(date.getMonth() + 1, 2, "Month must be 2");
    isEqual(date.getDate(), 3, "date must be 3");
    isEqual(date.getHours(), 4, "Hour must be 4");
    isEqual(date.getMinutes(), 5, "Minute must be 5");
    isEqual(date.getSeconds(), 6, "Minute must be 6");
}
function test_isNowBeforeStartTime() {
    isEqual(isNowBeforeStartTime({
        starttime: "8:00",
        endtime: "10:00",
    }, new Date("2000/1/1 7:59")),
        true,
        "7:59 is before 8:00");

    isEqual(isNowBeforeStartTime({
        starttime: "8:00",
        endtime: "10:00",
    }, new Date("2000/1/1 8:00")),
        false,
        "8:00 is not before 8:00");

    isEqual(isNowBeforeStartTime({
        starttime: "8:00",
        endtime: "10:00",
    }, new Date("2000/1/1 8:01")),
        false,
        "8:01 is not before 8:00");
}
window.onload = () => {
    test_getLogDate();
    test_isNowBeforeStartTime();
}