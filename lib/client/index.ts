import dayjs from "dayjs";

export const prettyDateFormat1 = "M/DD/YYYY";
export const formatDatePretty1 = (dateObj) => {
  return dayjs(dateObj).format(prettyDateFormat1);
};
export const prettyDateFormat2 = "MM/DD/YYYY";
export const formatDatePretty2 = (dateObj) => {
  return dayjs(dateObj).format(prettyDateFormat1);
};
export const formatContractFileDate = (dateObj, numOfDays) => {
  return dayjs(dateObj).subtract(numOfDays, "day").format(prettyDateFormat1);
};
