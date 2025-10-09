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
  const currentMonth = date.getMonth() + 1;
  const currentDate = date.getDate();
  return (
    currentYear == STARTYEAR &&
    currentMonth == STARTMONTH &&
    currentDate == STARTDATE
  );
}
