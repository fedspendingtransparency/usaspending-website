import { n as __esmMin } from "./rolldown-runtime-D1cXj70v.js";
import { O as require_dayjs_min, T as init_fiscalYearHelper, y as currentFiscalYear } from "./index.js-CgeUxZJy.js";
//#region src/js/helpers/monthHelper.js
var dayjs, monthConversion, convertNumToMonth, convertNumToShortMonth, convertMonthToFY, convertPeriodToDate;
var init_monthHelper = __esmMin((() => {
	init_fiscalYearHelper();
	dayjs = require_dayjs_min();
	monthConversion = (m) => dayjs().month(isNaN(parseInt(m, 10)) ? 1 : parseInt(m, 10)).subtract(4, "months");
	convertNumToMonth = (m) => monthConversion(m).format("MMMM");
	convertNumToShortMonth = (m) => monthConversion(m).format("MMM");
	convertMonthToFY = (m, y) => {
		const parsedMonth = isNaN(parseInt(m, 10)) ? 1 : parseInt(m, 10);
		const parsedYear = isNaN(parseInt(y, 10)) ? currentFiscalYear() : parseInt(y, 10);
		if (parsedMonth <= 3) return parsedYear - 1;
		return parsedYear;
	};
	convertPeriodToDate = (period, fy) => {
		const parsedPeriod = isNaN(parseInt(period, 10)) ? 1 : parseInt(period, 10);
		const parsedFy = isNaN(parseInt(fy, 10)) ? currentFiscalYear() : parseInt(fy, 10);
		return `${convertNumToMonth(period)} ${parsedPeriod <= 3 ? parsedFy - 1 : parsedFy}`;
	};
}));
//#endregion
export { init_monthHelper as i, convertNumToShortMonth as n, convertPeriodToDate as r, convertMonthToFY as t };
