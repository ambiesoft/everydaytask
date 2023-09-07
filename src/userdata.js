var userData = {
  spreadID: '',
  spreadURL: '',
  taskSheetID: '',
  todaySheetID: '',
  todaySheetYear: -1,
  todaySheetMonth: -1,
};
function getTaskSheetUrl() {
  return `${userData.spreadURL}#gid=${userData.taskSheetID}`;
}
function isCorrectDate(date) {
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth() + 1; // 月を取得（0-11の範囲で返されるため、1を加算）
  const currentDate = date.getDate(); // 日を取得
  return (
    currentYear == STARTYEAR &&
    currentMonth == STARTMONTH &&
    currentDate == STARTDATE
  );
}
