var userData = {
    spreadID: "",
    spreadURL: "",
    taskSheetID: "",
    todaySheetID: "",
    todaySheetYear: -1,
    todaySheetMonth: -1,
}
function getTaskSheetUrl() {
    return `${userData.spreadURL}#gid=${userData.taskSheetID}`
}