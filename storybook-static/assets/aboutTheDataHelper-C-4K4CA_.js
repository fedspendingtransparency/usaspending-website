import { n as __esmMin, r as __exportAll } from "./rolldown-runtime-D1cXj70v.js";
import { Ai as formatMoneyWithPrecision, Ei as calculatePercentage, Ii as init_moneyFormatter, Ni as formatNumber, ki as formatMoney } from "./index.js-Dk2VDaPz.js";
import { useState } from "react";
//#region src/js/redux/actions/account/accountActions.js
var accountActions_exports = /* @__PURE__ */ __exportAll({
	resetAccount: () => resetAccount,
	setSelectedAccount: () => setSelectedAccount,
	setSubmissionPeriods: () => setSubmissionPeriods
});
var setSelectedAccount, resetAccount, setSubmissionPeriods;
var init_accountActions = __esmMin((() => {
	setSelectedAccount = (state) => ({
		type: "SET_SELECTED_ACCOUNT",
		account: state
	});
	resetAccount = () => ({ type: "RESET_ACCOUNT" });
	setSubmissionPeriods = (submissionPeriods) => ({
		type: "SET_SUBMISSION_PERIODS",
		submissionPeriods
	});
}));
//#endregion
//#region node_modules/date-fns/node_modules/@babel/runtime/helpers/esm/typeof.js
function _typeof(o) {
	"@babel/helpers - typeof";
	return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof(o);
}
var init_typeof = __esmMin((() => {}));
//#endregion
//#region node_modules/date-fns/esm/_lib/toInteger/index.js
function toInteger(dirtyNumber) {
	if (dirtyNumber === null || dirtyNumber === true || dirtyNumber === false) return NaN;
	var number = Number(dirtyNumber);
	if (isNaN(number)) return number;
	return number < 0 ? Math.ceil(number) : Math.floor(number);
}
var init_toInteger = __esmMin((() => {}));
//#endregion
//#region node_modules/date-fns/esm/_lib/requiredArgs/index.js
function requiredArgs(required, args) {
	if (args.length < required) throw new TypeError(required + " argument" + (required > 1 ? "s" : "") + " required, but only " + args.length + " present");
}
var init_requiredArgs = __esmMin((() => {}));
//#endregion
//#region node_modules/date-fns/esm/toDate/index.js
/**
* @name toDate
* @category Common Helpers
* @summary Convert the given argument to an instance of Date.
*
* @description
* Convert the given argument to an instance of Date.
*
* If the argument is an instance of Date, the function returns its clone.
*
* If the argument is a number, it is treated as a timestamp.
*
* If the argument is none of the above, the function returns Invalid Date.
*
* **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
*
* @param {Date|Number} argument - the value to convert
* @returns {Date} the parsed date in the local time zone
* @throws {TypeError} 1 argument required
*
* @example
* // Clone the date:
* const result = toDate(new Date(2014, 1, 11, 11, 30, 30))
* //=> Tue Feb 11 2014 11:30:30
*
* @example
* // Convert the timestamp to date:
* const result = toDate(1392098430000)
* //=> Tue Feb 11 2014 11:30:30
*/
function toDate(argument) {
	requiredArgs(1, arguments);
	var argStr = Object.prototype.toString.call(argument);
	if (argument instanceof Date || _typeof(argument) === "object" && argStr === "[object Date]") return new Date(argument.getTime());
	else if (typeof argument === "number" || argStr === "[object Number]") return new Date(argument);
	else {
		if ((typeof argument === "string" || argStr === "[object String]") && typeof console !== "undefined") {
			console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments");
			console.warn((/* @__PURE__ */ new Error()).stack);
		}
		return /* @__PURE__ */ new Date(NaN);
	}
}
var init_toDate = __esmMin((() => {
	init_typeof();
	init_requiredArgs();
}));
//#endregion
//#region node_modules/date-fns/esm/addMilliseconds/index.js
/**
* @name addMilliseconds
* @category Millisecond Helpers
* @summary Add the specified number of milliseconds to the given date.
*
* @description
* Add the specified number of milliseconds to the given date.
*
* @param {Date|Number} date - the date to be changed
* @param {Number} amount - the amount of milliseconds to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
* @returns {Date} the new date with the milliseconds added
* @throws {TypeError} 2 arguments required
*
* @example
* // Add 750 milliseconds to 10 July 2014 12:45:30.000:
* const result = addMilliseconds(new Date(2014, 6, 10, 12, 45, 30, 0), 750)
* //=> Thu Jul 10 2014 12:45:30.750
*/
function addMilliseconds(dirtyDate, dirtyAmount) {
	requiredArgs(2, arguments);
	var timestamp = toDate(dirtyDate).getTime();
	var amount = toInteger(dirtyAmount);
	return new Date(timestamp + amount);
}
var init_addMilliseconds = __esmMin((() => {
	init_toInteger();
	init_toDate();
	init_requiredArgs();
}));
//#endregion
//#region node_modules/date-fns/esm/_lib/defaultOptions/index.js
function getDefaultOptions() {
	return defaultOptions;
}
var defaultOptions;
var init_defaultOptions = __esmMin((() => {
	defaultOptions = {};
}));
//#endregion
//#region node_modules/date-fns/esm/_lib/getTimezoneOffsetInMilliseconds/index.js
/**
* Google Chrome as of 67.0.3396.87 introduced timezones with offset that includes seconds.
* They usually appear for dates that denote time before the timezones were introduced
* (e.g. for 'Europe/Prague' timezone the offset is GMT+00:57:44 before 1 October 1891
* and GMT+01:00:00 after that date)
*
* Date#getTimezoneOffset returns the offset in minutes and would return 57 for the example above,
* which would lead to incorrect calculations.
*
* This function returns the timezone offset in milliseconds that takes seconds in account.
*/
function getTimezoneOffsetInMilliseconds(date) {
	var utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
	utcDate.setUTCFullYear(date.getFullYear());
	return date.getTime() - utcDate.getTime();
}
var init_getTimezoneOffsetInMilliseconds = __esmMin((() => {}));
var init_constants = __esmMin((() => {
	Math.pow(10, 8) * 24 * 60 * 60 * 1e3;
}));
//#endregion
//#region node_modules/date-fns/esm/isDate/index.js
/**
* @name isDate
* @category Common Helpers
* @summary Is the given value a date?
*
* @description
* Returns true if the given value is an instance of Date. The function works for dates transferred across iframes.
*
* @param {*} value - the value to check
* @returns {boolean} true if the given value is a date
* @throws {TypeError} 1 arguments required
*
* @example
* // For a valid date:
* const result = isDate(new Date())
* //=> true
*
* @example
* // For an invalid date:
* const result = isDate(new Date(NaN))
* //=> true
*
* @example
* // For some value:
* const result = isDate('2014-02-31')
* //=> false
*
* @example
* // For an object:
* const result = isDate({})
* //=> false
*/
function isDate(value) {
	requiredArgs(1, arguments);
	return value instanceof Date || _typeof(value) === "object" && Object.prototype.toString.call(value) === "[object Date]";
}
var init_isDate = __esmMin((() => {
	init_typeof();
	init_requiredArgs();
}));
//#endregion
//#region node_modules/date-fns/esm/isValid/index.js
/**
* @name isValid
* @category Common Helpers
* @summary Is the given date valid?
*
* @description
* Returns false if argument is Invalid Date and true otherwise.
* Argument is converted to Date using `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
* Invalid Date is a Date, whose time value is NaN.
*
* Time value of Date: http://es5.github.io/#x15.9.1.1
*
* @param {*} date - the date to check
* @returns {Boolean} the date is valid
* @throws {TypeError} 1 argument required
*
* @example
* // For the valid date:
* const result = isValid(new Date(2014, 1, 31))
* //=> true
*
* @example
* // For the value, convertable into a date:
* const result = isValid(1393804800000)
* //=> true
*
* @example
* // For the invalid date:
* const result = isValid(new Date(''))
* //=> false
*/
function isValid(dirtyDate) {
	requiredArgs(1, arguments);
	if (!isDate(dirtyDate) && typeof dirtyDate !== "number") return false;
	var date = toDate(dirtyDate);
	return !isNaN(Number(date));
}
var init_isValid = __esmMin((() => {
	init_isDate();
	init_toDate();
	init_requiredArgs();
}));
//#endregion
//#region node_modules/date-fns/esm/subMilliseconds/index.js
/**
* @name subMilliseconds
* @category Millisecond Helpers
* @summary Subtract the specified number of milliseconds from the given date.
*
* @description
* Subtract the specified number of milliseconds from the given date.
*
* @param {Date|Number} date - the date to be changed
* @param {Number} amount - the amount of milliseconds to be subtracted. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
* @returns {Date} the new date with the milliseconds subtracted
* @throws {TypeError} 2 arguments required
*
* @example
* // Subtract 750 milliseconds from 10 July 2014 12:45:30.000:
* const result = subMilliseconds(new Date(2014, 6, 10, 12, 45, 30, 0), 750)
* //=> Thu Jul 10 2014 12:45:29.250
*/
function subMilliseconds(dirtyDate, dirtyAmount) {
	requiredArgs(2, arguments);
	return addMilliseconds(dirtyDate, -toInteger(dirtyAmount));
}
var init_subMilliseconds = __esmMin((() => {
	init_addMilliseconds();
	init_requiredArgs();
	init_toInteger();
}));
//#endregion
//#region node_modules/date-fns/esm/_lib/getUTCDayOfYear/index.js
function getUTCDayOfYear(dirtyDate) {
	requiredArgs(1, arguments);
	var date = toDate(dirtyDate);
	var timestamp = date.getTime();
	date.setUTCMonth(0, 1);
	date.setUTCHours(0, 0, 0, 0);
	var difference = timestamp - date.getTime();
	return Math.floor(difference / MILLISECONDS_IN_DAY) + 1;
}
var MILLISECONDS_IN_DAY;
var init_getUTCDayOfYear = __esmMin((() => {
	init_toDate();
	init_requiredArgs();
	MILLISECONDS_IN_DAY = 864e5;
}));
//#endregion
//#region node_modules/date-fns/esm/_lib/startOfUTCISOWeek/index.js
function startOfUTCISOWeek(dirtyDate) {
	requiredArgs(1, arguments);
	var weekStartsOn = 1;
	var date = toDate(dirtyDate);
	var day = date.getUTCDay();
	var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
	date.setUTCDate(date.getUTCDate() - diff);
	date.setUTCHours(0, 0, 0, 0);
	return date;
}
var init_startOfUTCISOWeek = __esmMin((() => {
	init_toDate();
	init_requiredArgs();
}));
//#endregion
//#region node_modules/date-fns/esm/_lib/getUTCISOWeekYear/index.js
function getUTCISOWeekYear(dirtyDate) {
	requiredArgs(1, arguments);
	var date = toDate(dirtyDate);
	var year = date.getUTCFullYear();
	var fourthOfJanuaryOfNextYear = /* @__PURE__ */ new Date(0);
	fourthOfJanuaryOfNextYear.setUTCFullYear(year + 1, 0, 4);
	fourthOfJanuaryOfNextYear.setUTCHours(0, 0, 0, 0);
	var startOfNextYear = startOfUTCISOWeek(fourthOfJanuaryOfNextYear);
	var fourthOfJanuaryOfThisYear = /* @__PURE__ */ new Date(0);
	fourthOfJanuaryOfThisYear.setUTCFullYear(year, 0, 4);
	fourthOfJanuaryOfThisYear.setUTCHours(0, 0, 0, 0);
	var startOfThisYear = startOfUTCISOWeek(fourthOfJanuaryOfThisYear);
	if (date.getTime() >= startOfNextYear.getTime()) return year + 1;
	else if (date.getTime() >= startOfThisYear.getTime()) return year;
	else return year - 1;
}
var init_getUTCISOWeekYear = __esmMin((() => {
	init_toDate();
	init_requiredArgs();
	init_startOfUTCISOWeek();
}));
//#endregion
//#region node_modules/date-fns/esm/_lib/startOfUTCISOWeekYear/index.js
function startOfUTCISOWeekYear(dirtyDate) {
	requiredArgs(1, arguments);
	var year = getUTCISOWeekYear(dirtyDate);
	var fourthOfJanuary = /* @__PURE__ */ new Date(0);
	fourthOfJanuary.setUTCFullYear(year, 0, 4);
	fourthOfJanuary.setUTCHours(0, 0, 0, 0);
	return startOfUTCISOWeek(fourthOfJanuary);
}
var init_startOfUTCISOWeekYear = __esmMin((() => {
	init_getUTCISOWeekYear();
	init_startOfUTCISOWeek();
	init_requiredArgs();
}));
//#endregion
//#region node_modules/date-fns/esm/_lib/getUTCISOWeek/index.js
function getUTCISOWeek(dirtyDate) {
	requiredArgs(1, arguments);
	var date = toDate(dirtyDate);
	var diff = startOfUTCISOWeek(date).getTime() - startOfUTCISOWeekYear(date).getTime();
	return Math.round(diff / MILLISECONDS_IN_WEEK$1) + 1;
}
var MILLISECONDS_IN_WEEK$1;
var init_getUTCISOWeek = __esmMin((() => {
	init_toDate();
	init_startOfUTCISOWeek();
	init_startOfUTCISOWeekYear();
	init_requiredArgs();
	MILLISECONDS_IN_WEEK$1 = 6048e5;
}));
//#endregion
//#region node_modules/date-fns/esm/_lib/startOfUTCWeek/index.js
function startOfUTCWeek(dirtyDate, options) {
	var _ref, _ref2, _ref3, _options$weekStartsOn, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
	requiredArgs(1, arguments);
	var defaultOptions = getDefaultOptions();
	var weekStartsOn = toInteger((_ref = (_ref2 = (_ref3 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.weekStartsOn) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions.weekStartsOn) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.weekStartsOn) !== null && _ref !== void 0 ? _ref : 0);
	if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
	var date = toDate(dirtyDate);
	var day = date.getUTCDay();
	var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
	date.setUTCDate(date.getUTCDate() - diff);
	date.setUTCHours(0, 0, 0, 0);
	return date;
}
var init_startOfUTCWeek = __esmMin((() => {
	init_toDate();
	init_requiredArgs();
	init_toInteger();
	init_defaultOptions();
}));
//#endregion
//#region node_modules/date-fns/esm/_lib/getUTCWeekYear/index.js
function getUTCWeekYear(dirtyDate, options) {
	var _ref, _ref2, _ref3, _options$firstWeekCon, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
	requiredArgs(1, arguments);
	var date = toDate(dirtyDate);
	var year = date.getUTCFullYear();
	var defaultOptions = getDefaultOptions();
	var firstWeekContainsDate = toInteger((_ref = (_ref2 = (_ref3 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref !== void 0 ? _ref : 1);
	if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");
	var firstWeekOfNextYear = /* @__PURE__ */ new Date(0);
	firstWeekOfNextYear.setUTCFullYear(year + 1, 0, firstWeekContainsDate);
	firstWeekOfNextYear.setUTCHours(0, 0, 0, 0);
	var startOfNextYear = startOfUTCWeek(firstWeekOfNextYear, options);
	var firstWeekOfThisYear = /* @__PURE__ */ new Date(0);
	firstWeekOfThisYear.setUTCFullYear(year, 0, firstWeekContainsDate);
	firstWeekOfThisYear.setUTCHours(0, 0, 0, 0);
	var startOfThisYear = startOfUTCWeek(firstWeekOfThisYear, options);
	if (date.getTime() >= startOfNextYear.getTime()) return year + 1;
	else if (date.getTime() >= startOfThisYear.getTime()) return year;
	else return year - 1;
}
var init_getUTCWeekYear = __esmMin((() => {
	init_toDate();
	init_requiredArgs();
	init_startOfUTCWeek();
	init_toInteger();
	init_defaultOptions();
}));
//#endregion
//#region node_modules/date-fns/esm/_lib/startOfUTCWeekYear/index.js
function startOfUTCWeekYear(dirtyDate, options) {
	var _ref, _ref2, _ref3, _options$firstWeekCon, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
	requiredArgs(1, arguments);
	var defaultOptions = getDefaultOptions();
	var firstWeekContainsDate = toInteger((_ref = (_ref2 = (_ref3 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref !== void 0 ? _ref : 1);
	var year = getUTCWeekYear(dirtyDate, options);
	var firstWeek = /* @__PURE__ */ new Date(0);
	firstWeek.setUTCFullYear(year, 0, firstWeekContainsDate);
	firstWeek.setUTCHours(0, 0, 0, 0);
	return startOfUTCWeek(firstWeek, options);
}
var init_startOfUTCWeekYear = __esmMin((() => {
	init_getUTCWeekYear();
	init_requiredArgs();
	init_startOfUTCWeek();
	init_toInteger();
	init_defaultOptions();
}));
//#endregion
//#region node_modules/date-fns/esm/_lib/getUTCWeek/index.js
function getUTCWeek(dirtyDate, options) {
	requiredArgs(1, arguments);
	var date = toDate(dirtyDate);
	var diff = startOfUTCWeek(date, options).getTime() - startOfUTCWeekYear(date, options).getTime();
	return Math.round(diff / MILLISECONDS_IN_WEEK) + 1;
}
var MILLISECONDS_IN_WEEK;
var init_getUTCWeek = __esmMin((() => {
	init_toDate();
	init_startOfUTCWeek();
	init_startOfUTCWeekYear();
	init_requiredArgs();
	MILLISECONDS_IN_WEEK = 6048e5;
}));
//#endregion
//#region node_modules/date-fns/esm/_lib/addLeadingZeros/index.js
function addLeadingZeros(number, targetLength) {
	var sign = number < 0 ? "-" : "";
	var output = Math.abs(number).toString();
	while (output.length < targetLength) output = "0" + output;
	return sign + output;
}
var init_addLeadingZeros = __esmMin((() => {}));
//#endregion
//#region node_modules/date-fns/esm/_lib/format/lightFormatters/index.js
var formatters$1;
var init_lightFormatters = __esmMin((() => {
	init_addLeadingZeros();
	formatters$1 = {
		y: function y(date, token) {
			var signedYear = date.getUTCFullYear();
			var year = signedYear > 0 ? signedYear : 1 - signedYear;
			return addLeadingZeros(token === "yy" ? year % 100 : year, token.length);
		},
		M: function M(date, token) {
			var month = date.getUTCMonth();
			return token === "M" ? String(month + 1) : addLeadingZeros(month + 1, 2);
		},
		d: function d(date, token) {
			return addLeadingZeros(date.getUTCDate(), token.length);
		},
		a: function a(date, token) {
			var dayPeriodEnumValue = date.getUTCHours() / 12 >= 1 ? "pm" : "am";
			switch (token) {
				case "a":
				case "aa": return dayPeriodEnumValue.toUpperCase();
				case "aaa": return dayPeriodEnumValue;
				case "aaaaa": return dayPeriodEnumValue[0];
				default: return dayPeriodEnumValue === "am" ? "a.m." : "p.m.";
			}
		},
		h: function h(date, token) {
			return addLeadingZeros(date.getUTCHours() % 12 || 12, token.length);
		},
		H: function H(date, token) {
			return addLeadingZeros(date.getUTCHours(), token.length);
		},
		m: function m(date, token) {
			return addLeadingZeros(date.getUTCMinutes(), token.length);
		},
		s: function s(date, token) {
			return addLeadingZeros(date.getUTCSeconds(), token.length);
		},
		S: function S(date, token) {
			var numberOfDigits = token.length;
			var milliseconds = date.getUTCMilliseconds();
			return addLeadingZeros(Math.floor(milliseconds * Math.pow(10, numberOfDigits - 3)), token.length);
		}
	};
}));
//#endregion
//#region node_modules/date-fns/esm/_lib/format/formatters/index.js
function formatTimezoneShort(offset, dirtyDelimiter) {
	var sign = offset > 0 ? "-" : "+";
	var absOffset = Math.abs(offset);
	var hours = Math.floor(absOffset / 60);
	var minutes = absOffset % 60;
	if (minutes === 0) return sign + String(hours);
	var delimiter = dirtyDelimiter || "";
	return sign + String(hours) + delimiter + addLeadingZeros(minutes, 2);
}
function formatTimezoneWithOptionalMinutes(offset, dirtyDelimiter) {
	if (offset % 60 === 0) return (offset > 0 ? "-" : "+") + addLeadingZeros(Math.abs(offset) / 60, 2);
	return formatTimezone(offset, dirtyDelimiter);
}
function formatTimezone(offset, dirtyDelimiter) {
	var delimiter = dirtyDelimiter || "";
	var sign = offset > 0 ? "-" : "+";
	var absOffset = Math.abs(offset);
	var hours = addLeadingZeros(Math.floor(absOffset / 60), 2);
	var minutes = addLeadingZeros(absOffset % 60, 2);
	return sign + hours + delimiter + minutes;
}
var dayPeriodEnum, formatters;
var init_formatters = __esmMin((() => {
	init_getUTCDayOfYear();
	init_getUTCISOWeek();
	init_getUTCISOWeekYear();
	init_getUTCWeek();
	init_getUTCWeekYear();
	init_addLeadingZeros();
	init_lightFormatters();
	dayPeriodEnum = {
		am: "am",
		pm: "pm",
		midnight: "midnight",
		noon: "noon",
		morning: "morning",
		afternoon: "afternoon",
		evening: "evening",
		night: "night"
	};
	formatters = {
		G: function G(date, token, localize) {
			var era = date.getUTCFullYear() > 0 ? 1 : 0;
			switch (token) {
				case "G":
				case "GG":
				case "GGG": return localize.era(era, { width: "abbreviated" });
				case "GGGGG": return localize.era(era, { width: "narrow" });
				default: return localize.era(era, { width: "wide" });
			}
		},
		y: function y(date, token, localize) {
			if (token === "yo") {
				var signedYear = date.getUTCFullYear();
				var year = signedYear > 0 ? signedYear : 1 - signedYear;
				return localize.ordinalNumber(year, { unit: "year" });
			}
			return formatters$1.y(date, token);
		},
		Y: function Y(date, token, localize, options) {
			var signedWeekYear = getUTCWeekYear(date, options);
			var weekYear = signedWeekYear > 0 ? signedWeekYear : 1 - signedWeekYear;
			if (token === "YY") return addLeadingZeros(weekYear % 100, 2);
			if (token === "Yo") return localize.ordinalNumber(weekYear, { unit: "year" });
			return addLeadingZeros(weekYear, token.length);
		},
		R: function R(date, token) {
			return addLeadingZeros(getUTCISOWeekYear(date), token.length);
		},
		u: function u(date, token) {
			return addLeadingZeros(date.getUTCFullYear(), token.length);
		},
		Q: function Q(date, token, localize) {
			var quarter = Math.ceil((date.getUTCMonth() + 1) / 3);
			switch (token) {
				case "Q": return String(quarter);
				case "QQ": return addLeadingZeros(quarter, 2);
				case "Qo": return localize.ordinalNumber(quarter, { unit: "quarter" });
				case "QQQ": return localize.quarter(quarter, {
					width: "abbreviated",
					context: "formatting"
				});
				case "QQQQQ": return localize.quarter(quarter, {
					width: "narrow",
					context: "formatting"
				});
				default: return localize.quarter(quarter, {
					width: "wide",
					context: "formatting"
				});
			}
		},
		q: function q(date, token, localize) {
			var quarter = Math.ceil((date.getUTCMonth() + 1) / 3);
			switch (token) {
				case "q": return String(quarter);
				case "qq": return addLeadingZeros(quarter, 2);
				case "qo": return localize.ordinalNumber(quarter, { unit: "quarter" });
				case "qqq": return localize.quarter(quarter, {
					width: "abbreviated",
					context: "standalone"
				});
				case "qqqqq": return localize.quarter(quarter, {
					width: "narrow",
					context: "standalone"
				});
				default: return localize.quarter(quarter, {
					width: "wide",
					context: "standalone"
				});
			}
		},
		M: function M(date, token, localize) {
			var month = date.getUTCMonth();
			switch (token) {
				case "M":
				case "MM": return formatters$1.M(date, token);
				case "Mo": return localize.ordinalNumber(month + 1, { unit: "month" });
				case "MMM": return localize.month(month, {
					width: "abbreviated",
					context: "formatting"
				});
				case "MMMMM": return localize.month(month, {
					width: "narrow",
					context: "formatting"
				});
				default: return localize.month(month, {
					width: "wide",
					context: "formatting"
				});
			}
		},
		L: function L(date, token, localize) {
			var month = date.getUTCMonth();
			switch (token) {
				case "L": return String(month + 1);
				case "LL": return addLeadingZeros(month + 1, 2);
				case "Lo": return localize.ordinalNumber(month + 1, { unit: "month" });
				case "LLL": return localize.month(month, {
					width: "abbreviated",
					context: "standalone"
				});
				case "LLLLL": return localize.month(month, {
					width: "narrow",
					context: "standalone"
				});
				default: return localize.month(month, {
					width: "wide",
					context: "standalone"
				});
			}
		},
		w: function w(date, token, localize, options) {
			var week = getUTCWeek(date, options);
			if (token === "wo") return localize.ordinalNumber(week, { unit: "week" });
			return addLeadingZeros(week, token.length);
		},
		I: function I(date, token, localize) {
			var isoWeek = getUTCISOWeek(date);
			if (token === "Io") return localize.ordinalNumber(isoWeek, { unit: "week" });
			return addLeadingZeros(isoWeek, token.length);
		},
		d: function d(date, token, localize) {
			if (token === "do") return localize.ordinalNumber(date.getUTCDate(), { unit: "date" });
			return formatters$1.d(date, token);
		},
		D: function D(date, token, localize) {
			var dayOfYear = getUTCDayOfYear(date);
			if (token === "Do") return localize.ordinalNumber(dayOfYear, { unit: "dayOfYear" });
			return addLeadingZeros(dayOfYear, token.length);
		},
		E: function E(date, token, localize) {
			var dayOfWeek = date.getUTCDay();
			switch (token) {
				case "E":
				case "EE":
				case "EEE": return localize.day(dayOfWeek, {
					width: "abbreviated",
					context: "formatting"
				});
				case "EEEEE": return localize.day(dayOfWeek, {
					width: "narrow",
					context: "formatting"
				});
				case "EEEEEE": return localize.day(dayOfWeek, {
					width: "short",
					context: "formatting"
				});
				default: return localize.day(dayOfWeek, {
					width: "wide",
					context: "formatting"
				});
			}
		},
		e: function e(date, token, localize, options) {
			var dayOfWeek = date.getUTCDay();
			var localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
			switch (token) {
				case "e": return String(localDayOfWeek);
				case "ee": return addLeadingZeros(localDayOfWeek, 2);
				case "eo": return localize.ordinalNumber(localDayOfWeek, { unit: "day" });
				case "eee": return localize.day(dayOfWeek, {
					width: "abbreviated",
					context: "formatting"
				});
				case "eeeee": return localize.day(dayOfWeek, {
					width: "narrow",
					context: "formatting"
				});
				case "eeeeee": return localize.day(dayOfWeek, {
					width: "short",
					context: "formatting"
				});
				default: return localize.day(dayOfWeek, {
					width: "wide",
					context: "formatting"
				});
			}
		},
		c: function c(date, token, localize, options) {
			var dayOfWeek = date.getUTCDay();
			var localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
			switch (token) {
				case "c": return String(localDayOfWeek);
				case "cc": return addLeadingZeros(localDayOfWeek, token.length);
				case "co": return localize.ordinalNumber(localDayOfWeek, { unit: "day" });
				case "ccc": return localize.day(dayOfWeek, {
					width: "abbreviated",
					context: "standalone"
				});
				case "ccccc": return localize.day(dayOfWeek, {
					width: "narrow",
					context: "standalone"
				});
				case "cccccc": return localize.day(dayOfWeek, {
					width: "short",
					context: "standalone"
				});
				default: return localize.day(dayOfWeek, {
					width: "wide",
					context: "standalone"
				});
			}
		},
		i: function i(date, token, localize) {
			var dayOfWeek = date.getUTCDay();
			var isoDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
			switch (token) {
				case "i": return String(isoDayOfWeek);
				case "ii": return addLeadingZeros(isoDayOfWeek, token.length);
				case "io": return localize.ordinalNumber(isoDayOfWeek, { unit: "day" });
				case "iii": return localize.day(dayOfWeek, {
					width: "abbreviated",
					context: "formatting"
				});
				case "iiiii": return localize.day(dayOfWeek, {
					width: "narrow",
					context: "formatting"
				});
				case "iiiiii": return localize.day(dayOfWeek, {
					width: "short",
					context: "formatting"
				});
				default: return localize.day(dayOfWeek, {
					width: "wide",
					context: "formatting"
				});
			}
		},
		a: function a(date, token, localize) {
			var dayPeriodEnumValue = date.getUTCHours() / 12 >= 1 ? "pm" : "am";
			switch (token) {
				case "a":
				case "aa": return localize.dayPeriod(dayPeriodEnumValue, {
					width: "abbreviated",
					context: "formatting"
				});
				case "aaa": return localize.dayPeriod(dayPeriodEnumValue, {
					width: "abbreviated",
					context: "formatting"
				}).toLowerCase();
				case "aaaaa": return localize.dayPeriod(dayPeriodEnumValue, {
					width: "narrow",
					context: "formatting"
				});
				default: return localize.dayPeriod(dayPeriodEnumValue, {
					width: "wide",
					context: "formatting"
				});
			}
		},
		b: function b(date, token, localize) {
			var hours = date.getUTCHours();
			var dayPeriodEnumValue;
			if (hours === 12) dayPeriodEnumValue = dayPeriodEnum.noon;
			else if (hours === 0) dayPeriodEnumValue = dayPeriodEnum.midnight;
			else dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
			switch (token) {
				case "b":
				case "bb": return localize.dayPeriod(dayPeriodEnumValue, {
					width: "abbreviated",
					context: "formatting"
				});
				case "bbb": return localize.dayPeriod(dayPeriodEnumValue, {
					width: "abbreviated",
					context: "formatting"
				}).toLowerCase();
				case "bbbbb": return localize.dayPeriod(dayPeriodEnumValue, {
					width: "narrow",
					context: "formatting"
				});
				default: return localize.dayPeriod(dayPeriodEnumValue, {
					width: "wide",
					context: "formatting"
				});
			}
		},
		B: function B(date, token, localize) {
			var hours = date.getUTCHours();
			var dayPeriodEnumValue;
			if (hours >= 17) dayPeriodEnumValue = dayPeriodEnum.evening;
			else if (hours >= 12) dayPeriodEnumValue = dayPeriodEnum.afternoon;
			else if (hours >= 4) dayPeriodEnumValue = dayPeriodEnum.morning;
			else dayPeriodEnumValue = dayPeriodEnum.night;
			switch (token) {
				case "B":
				case "BB":
				case "BBB": return localize.dayPeriod(dayPeriodEnumValue, {
					width: "abbreviated",
					context: "formatting"
				});
				case "BBBBB": return localize.dayPeriod(dayPeriodEnumValue, {
					width: "narrow",
					context: "formatting"
				});
				default: return localize.dayPeriod(dayPeriodEnumValue, {
					width: "wide",
					context: "formatting"
				});
			}
		},
		h: function h(date, token, localize) {
			if (token === "ho") {
				var hours = date.getUTCHours() % 12;
				if (hours === 0) hours = 12;
				return localize.ordinalNumber(hours, { unit: "hour" });
			}
			return formatters$1.h(date, token);
		},
		H: function H(date, token, localize) {
			if (token === "Ho") return localize.ordinalNumber(date.getUTCHours(), { unit: "hour" });
			return formatters$1.H(date, token);
		},
		K: function K(date, token, localize) {
			var hours = date.getUTCHours() % 12;
			if (token === "Ko") return localize.ordinalNumber(hours, { unit: "hour" });
			return addLeadingZeros(hours, token.length);
		},
		k: function k(date, token, localize) {
			var hours = date.getUTCHours();
			if (hours === 0) hours = 24;
			if (token === "ko") return localize.ordinalNumber(hours, { unit: "hour" });
			return addLeadingZeros(hours, token.length);
		},
		m: function m(date, token, localize) {
			if (token === "mo") return localize.ordinalNumber(date.getUTCMinutes(), { unit: "minute" });
			return formatters$1.m(date, token);
		},
		s: function s(date, token, localize) {
			if (token === "so") return localize.ordinalNumber(date.getUTCSeconds(), { unit: "second" });
			return formatters$1.s(date, token);
		},
		S: function S(date, token) {
			return formatters$1.S(date, token);
		},
		X: function X(date, token, _localize, options) {
			var timezoneOffset = (options._originalDate || date).getTimezoneOffset();
			if (timezoneOffset === 0) return "Z";
			switch (token) {
				case "X": return formatTimezoneWithOptionalMinutes(timezoneOffset);
				case "XXXX":
				case "XX": return formatTimezone(timezoneOffset);
				default: return formatTimezone(timezoneOffset, ":");
			}
		},
		x: function x(date, token, _localize, options) {
			var timezoneOffset = (options._originalDate || date).getTimezoneOffset();
			switch (token) {
				case "x": return formatTimezoneWithOptionalMinutes(timezoneOffset);
				case "xxxx":
				case "xx": return formatTimezone(timezoneOffset);
				default: return formatTimezone(timezoneOffset, ":");
			}
		},
		O: function O(date, token, _localize, options) {
			var timezoneOffset = (options._originalDate || date).getTimezoneOffset();
			switch (token) {
				case "O":
				case "OO":
				case "OOO": return "GMT" + formatTimezoneShort(timezoneOffset, ":");
				default: return "GMT" + formatTimezone(timezoneOffset, ":");
			}
		},
		z: function z(date, token, _localize, options) {
			var timezoneOffset = (options._originalDate || date).getTimezoneOffset();
			switch (token) {
				case "z":
				case "zz":
				case "zzz": return "GMT" + formatTimezoneShort(timezoneOffset, ":");
				default: return "GMT" + formatTimezone(timezoneOffset, ":");
			}
		},
		t: function t(date, token, _localize, options) {
			var originalDate = options._originalDate || date;
			return addLeadingZeros(Math.floor(originalDate.getTime() / 1e3), token.length);
		},
		T: function T(date, token, _localize, options) {
			return addLeadingZeros((options._originalDate || date).getTime(), token.length);
		}
	};
}));
//#endregion
//#region node_modules/date-fns/esm/_lib/format/longFormatters/index.js
var dateLongFormatter, timeLongFormatter, longFormatters;
var init_longFormatters = __esmMin((() => {
	dateLongFormatter = function dateLongFormatter(pattern, formatLong) {
		switch (pattern) {
			case "P": return formatLong.date({ width: "short" });
			case "PP": return formatLong.date({ width: "medium" });
			case "PPP": return formatLong.date({ width: "long" });
			default: return formatLong.date({ width: "full" });
		}
	};
	timeLongFormatter = function timeLongFormatter(pattern, formatLong) {
		switch (pattern) {
			case "p": return formatLong.time({ width: "short" });
			case "pp": return formatLong.time({ width: "medium" });
			case "ppp": return formatLong.time({ width: "long" });
			default: return formatLong.time({ width: "full" });
		}
	};
	longFormatters = {
		p: timeLongFormatter,
		P: function dateTimeLongFormatter(pattern, formatLong) {
			var matchResult = pattern.match(/(P+)(p+)?/) || [];
			var datePattern = matchResult[1];
			var timePattern = matchResult[2];
			if (!timePattern) return dateLongFormatter(pattern, formatLong);
			var dateTimeFormat;
			switch (datePattern) {
				case "P":
					dateTimeFormat = formatLong.dateTime({ width: "short" });
					break;
				case "PP":
					dateTimeFormat = formatLong.dateTime({ width: "medium" });
					break;
				case "PPP":
					dateTimeFormat = formatLong.dateTime({ width: "long" });
					break;
				default:
					dateTimeFormat = formatLong.dateTime({ width: "full" });
					break;
			}
			return dateTimeFormat.replace("{{date}}", dateLongFormatter(datePattern, formatLong)).replace("{{time}}", timeLongFormatter(timePattern, formatLong));
		}
	};
}));
//#endregion
//#region node_modules/date-fns/esm/_lib/protectedTokens/index.js
function isProtectedDayOfYearToken(token) {
	return protectedDayOfYearTokens.indexOf(token) !== -1;
}
function isProtectedWeekYearToken(token) {
	return protectedWeekYearTokens.indexOf(token) !== -1;
}
function throwProtectedError(token, format, input) {
	if (token === "YYYY") throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(format, "`) for formatting years to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
	else if (token === "YY") throw new RangeError("Use `yy` instead of `YY` (in `".concat(format, "`) for formatting years to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
	else if (token === "D") throw new RangeError("Use `d` instead of `D` (in `".concat(format, "`) for formatting days of the month to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
	else if (token === "DD") throw new RangeError("Use `dd` instead of `DD` (in `".concat(format, "`) for formatting days of the month to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
}
var protectedDayOfYearTokens, protectedWeekYearTokens;
var init_protectedTokens = __esmMin((() => {
	protectedDayOfYearTokens = ["D", "DD"];
	protectedWeekYearTokens = ["YY", "YYYY"];
}));
//#endregion
//#region node_modules/date-fns/esm/locale/en-US/_lib/formatDistance/index.js
var formatDistanceLocale, formatDistance;
var init_formatDistance = __esmMin((() => {
	formatDistanceLocale = {
		lessThanXSeconds: {
			one: "less than a second",
			other: "less than {{count}} seconds"
		},
		xSeconds: {
			one: "1 second",
			other: "{{count}} seconds"
		},
		halfAMinute: "half a minute",
		lessThanXMinutes: {
			one: "less than a minute",
			other: "less than {{count}} minutes"
		},
		xMinutes: {
			one: "1 minute",
			other: "{{count}} minutes"
		},
		aboutXHours: {
			one: "about 1 hour",
			other: "about {{count}} hours"
		},
		xHours: {
			one: "1 hour",
			other: "{{count}} hours"
		},
		xDays: {
			one: "1 day",
			other: "{{count}} days"
		},
		aboutXWeeks: {
			one: "about 1 week",
			other: "about {{count}} weeks"
		},
		xWeeks: {
			one: "1 week",
			other: "{{count}} weeks"
		},
		aboutXMonths: {
			one: "about 1 month",
			other: "about {{count}} months"
		},
		xMonths: {
			one: "1 month",
			other: "{{count}} months"
		},
		aboutXYears: {
			one: "about 1 year",
			other: "about {{count}} years"
		},
		xYears: {
			one: "1 year",
			other: "{{count}} years"
		},
		overXYears: {
			one: "over 1 year",
			other: "over {{count}} years"
		},
		almostXYears: {
			one: "almost 1 year",
			other: "almost {{count}} years"
		}
	};
	formatDistance = function formatDistance(token, count, options) {
		var result;
		var tokenValue = formatDistanceLocale[token];
		if (typeof tokenValue === "string") result = tokenValue;
		else if (count === 1) result = tokenValue.one;
		else result = tokenValue.other.replace("{{count}}", count.toString());
		if (options !== null && options !== void 0 && options.addSuffix) if (options.comparison && options.comparison > 0) return "in " + result;
		else return result + " ago";
		return result;
	};
}));
//#endregion
//#region node_modules/date-fns/esm/locale/_lib/buildFormatLongFn/index.js
function buildFormatLongFn(args) {
	return function() {
		var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
		var width = options.width ? String(options.width) : args.defaultWidth;
		return args.formats[width] || args.formats[args.defaultWidth];
	};
}
var init_buildFormatLongFn = __esmMin((() => {}));
//#endregion
//#region node_modules/date-fns/esm/locale/en-US/_lib/formatLong/index.js
var formatLong;
var init_formatLong = __esmMin((() => {
	init_buildFormatLongFn();
	formatLong = {
		date: buildFormatLongFn({
			formats: {
				full: "EEEE, MMMM do, y",
				long: "MMMM do, y",
				medium: "MMM d, y",
				short: "MM/dd/yyyy"
			},
			defaultWidth: "full"
		}),
		time: buildFormatLongFn({
			formats: {
				full: "h:mm:ss a zzzz",
				long: "h:mm:ss a z",
				medium: "h:mm:ss a",
				short: "h:mm a"
			},
			defaultWidth: "full"
		}),
		dateTime: buildFormatLongFn({
			formats: {
				full: "{{date}} 'at' {{time}}",
				long: "{{date}} 'at' {{time}}",
				medium: "{{date}}, {{time}}",
				short: "{{date}}, {{time}}"
			},
			defaultWidth: "full"
		})
	};
}));
//#endregion
//#region node_modules/date-fns/esm/locale/en-US/_lib/formatRelative/index.js
var formatRelativeLocale, formatRelative;
var init_formatRelative = __esmMin((() => {
	formatRelativeLocale = {
		lastWeek: "'last' eeee 'at' p",
		yesterday: "'yesterday at' p",
		today: "'today at' p",
		tomorrow: "'tomorrow at' p",
		nextWeek: "eeee 'at' p",
		other: "P"
	};
	formatRelative = function formatRelative(token, _date, _baseDate, _options) {
		return formatRelativeLocale[token];
	};
}));
//#endregion
//#region node_modules/date-fns/esm/locale/_lib/buildLocalizeFn/index.js
function buildLocalizeFn(args) {
	return function(dirtyIndex, options) {
		var context = options !== null && options !== void 0 && options.context ? String(options.context) : "standalone";
		var valuesArray;
		if (context === "formatting" && args.formattingValues) {
			var defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
			var width = options !== null && options !== void 0 && options.width ? String(options.width) : defaultWidth;
			valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];
		} else {
			var _defaultWidth = args.defaultWidth;
			var _width = options !== null && options !== void 0 && options.width ? String(options.width) : args.defaultWidth;
			valuesArray = args.values[_width] || args.values[_defaultWidth];
		}
		var index = args.argumentCallback ? args.argumentCallback(dirtyIndex) : dirtyIndex;
		return valuesArray[index];
	};
}
var init_buildLocalizeFn = __esmMin((() => {}));
//#endregion
//#region node_modules/date-fns/esm/locale/en-US/_lib/localize/index.js
var localize;
var init_localize = __esmMin((() => {
	init_buildLocalizeFn();
	localize = {
		ordinalNumber: function ordinalNumber(dirtyNumber, _options) {
			var number = Number(dirtyNumber);
			var rem100 = number % 100;
			if (rem100 > 20 || rem100 < 10) switch (rem100 % 10) {
				case 1: return number + "st";
				case 2: return number + "nd";
				case 3: return number + "rd";
			}
			return number + "th";
		},
		era: buildLocalizeFn({
			values: {
				narrow: ["B", "A"],
				abbreviated: ["BC", "AD"],
				wide: ["Before Christ", "Anno Domini"]
			},
			defaultWidth: "wide"
		}),
		quarter: buildLocalizeFn({
			values: {
				narrow: [
					"1",
					"2",
					"3",
					"4"
				],
				abbreviated: [
					"Q1",
					"Q2",
					"Q3",
					"Q4"
				],
				wide: [
					"1st quarter",
					"2nd quarter",
					"3rd quarter",
					"4th quarter"
				]
			},
			defaultWidth: "wide",
			argumentCallback: function argumentCallback(quarter) {
				return quarter - 1;
			}
		}),
		month: buildLocalizeFn({
			values: {
				narrow: [
					"J",
					"F",
					"M",
					"A",
					"M",
					"J",
					"J",
					"A",
					"S",
					"O",
					"N",
					"D"
				],
				abbreviated: [
					"Jan",
					"Feb",
					"Mar",
					"Apr",
					"May",
					"Jun",
					"Jul",
					"Aug",
					"Sep",
					"Oct",
					"Nov",
					"Dec"
				],
				wide: [
					"January",
					"February",
					"March",
					"April",
					"May",
					"June",
					"July",
					"August",
					"September",
					"October",
					"November",
					"December"
				]
			},
			defaultWidth: "wide"
		}),
		day: buildLocalizeFn({
			values: {
				narrow: [
					"S",
					"M",
					"T",
					"W",
					"T",
					"F",
					"S"
				],
				short: [
					"Su",
					"Mo",
					"Tu",
					"We",
					"Th",
					"Fr",
					"Sa"
				],
				abbreviated: [
					"Sun",
					"Mon",
					"Tue",
					"Wed",
					"Thu",
					"Fri",
					"Sat"
				],
				wide: [
					"Sunday",
					"Monday",
					"Tuesday",
					"Wednesday",
					"Thursday",
					"Friday",
					"Saturday"
				]
			},
			defaultWidth: "wide"
		}),
		dayPeriod: buildLocalizeFn({
			values: {
				narrow: {
					am: "a",
					pm: "p",
					midnight: "mi",
					noon: "n",
					morning: "morning",
					afternoon: "afternoon",
					evening: "evening",
					night: "night"
				},
				abbreviated: {
					am: "AM",
					pm: "PM",
					midnight: "midnight",
					noon: "noon",
					morning: "morning",
					afternoon: "afternoon",
					evening: "evening",
					night: "night"
				},
				wide: {
					am: "a.m.",
					pm: "p.m.",
					midnight: "midnight",
					noon: "noon",
					morning: "morning",
					afternoon: "afternoon",
					evening: "evening",
					night: "night"
				}
			},
			defaultWidth: "wide",
			formattingValues: {
				narrow: {
					am: "a",
					pm: "p",
					midnight: "mi",
					noon: "n",
					morning: "in the morning",
					afternoon: "in the afternoon",
					evening: "in the evening",
					night: "at night"
				},
				abbreviated: {
					am: "AM",
					pm: "PM",
					midnight: "midnight",
					noon: "noon",
					morning: "in the morning",
					afternoon: "in the afternoon",
					evening: "in the evening",
					night: "at night"
				},
				wide: {
					am: "a.m.",
					pm: "p.m.",
					midnight: "midnight",
					noon: "noon",
					morning: "in the morning",
					afternoon: "in the afternoon",
					evening: "in the evening",
					night: "at night"
				}
			},
			defaultFormattingWidth: "wide"
		})
	};
}));
//#endregion
//#region node_modules/date-fns/esm/locale/_lib/buildMatchFn/index.js
function buildMatchFn(args) {
	return function(string) {
		var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
		var width = options.width;
		var matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth];
		var matchResult = string.match(matchPattern);
		if (!matchResult) return null;
		var matchedString = matchResult[0];
		var parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth];
		var key = Array.isArray(parsePatterns) ? findIndex(parsePatterns, function(pattern) {
			return pattern.test(matchedString);
		}) : findKey(parsePatterns, function(pattern) {
			return pattern.test(matchedString);
		});
		var value = args.valueCallback ? args.valueCallback(key) : key;
		value = options.valueCallback ? options.valueCallback(value) : value;
		var rest = string.slice(matchedString.length);
		return {
			value,
			rest
		};
	};
}
function findKey(object, predicate) {
	for (var key in object) if (object.hasOwnProperty(key) && predicate(object[key])) return key;
}
function findIndex(array, predicate) {
	for (var key = 0; key < array.length; key++) if (predicate(array[key])) return key;
}
var init_buildMatchFn = __esmMin((() => {}));
//#endregion
//#region node_modules/date-fns/esm/locale/_lib/buildMatchPatternFn/index.js
function buildMatchPatternFn(args) {
	return function(string) {
		var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
		var matchResult = string.match(args.matchPattern);
		if (!matchResult) return null;
		var matchedString = matchResult[0];
		var parseResult = string.match(args.parsePattern);
		if (!parseResult) return null;
		var value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];
		value = options.valueCallback ? options.valueCallback(value) : value;
		var rest = string.slice(matchedString.length);
		return {
			value,
			rest
		};
	};
}
var init_buildMatchPatternFn = __esmMin((() => {}));
//#endregion
//#region node_modules/date-fns/esm/locale/en-US/_lib/match/index.js
var match;
var init_match = __esmMin((() => {
	init_buildMatchFn();
	init_buildMatchPatternFn();
	match = {
		ordinalNumber: buildMatchPatternFn({
			matchPattern: /^(\d+)(th|st|nd|rd)?/i,
			parsePattern: /\d+/i,
			valueCallback: function valueCallback(value) {
				return parseInt(value, 10);
			}
		}),
		era: buildMatchFn({
			matchPatterns: {
				narrow: /^(b|a)/i,
				abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
				wide: /^(before christ|before common era|anno domini|common era)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: [/^b/i, /^(a|c)/i] },
			defaultParseWidth: "any"
		}),
		quarter: buildMatchFn({
			matchPatterns: {
				narrow: /^[1234]/i,
				abbreviated: /^q[1234]/i,
				wide: /^[1234](th|st|nd|rd)? quarter/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: [
				/1/i,
				/2/i,
				/3/i,
				/4/i
			] },
			defaultParseWidth: "any",
			valueCallback: function valueCallback(index) {
				return index + 1;
			}
		}),
		month: buildMatchFn({
			matchPatterns: {
				narrow: /^[jfmasond]/i,
				abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
				wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				narrow: [
					/^j/i,
					/^f/i,
					/^m/i,
					/^a/i,
					/^m/i,
					/^j/i,
					/^j/i,
					/^a/i,
					/^s/i,
					/^o/i,
					/^n/i,
					/^d/i
				],
				any: [
					/^ja/i,
					/^f/i,
					/^mar/i,
					/^ap/i,
					/^may/i,
					/^jun/i,
					/^jul/i,
					/^au/i,
					/^s/i,
					/^o/i,
					/^n/i,
					/^d/i
				]
			},
			defaultParseWidth: "any"
		}),
		day: buildMatchFn({
			matchPatterns: {
				narrow: /^[smtwf]/i,
				short: /^(su|mo|tu|we|th|fr|sa)/i,
				abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
				wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				narrow: [
					/^s/i,
					/^m/i,
					/^t/i,
					/^w/i,
					/^t/i,
					/^f/i,
					/^s/i
				],
				any: [
					/^su/i,
					/^m/i,
					/^tu/i,
					/^w/i,
					/^th/i,
					/^f/i,
					/^sa/i
				]
			},
			defaultParseWidth: "any"
		}),
		dayPeriod: buildMatchFn({
			matchPatterns: {
				narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
				any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
			},
			defaultMatchWidth: "any",
			parsePatterns: { any: {
				am: /^a/i,
				pm: /^p/i,
				midnight: /^mi/i,
				noon: /^no/i,
				morning: /morning/i,
				afternoon: /afternoon/i,
				evening: /evening/i,
				night: /night/i
			} },
			defaultParseWidth: "any"
		})
	};
}));
//#endregion
//#region node_modules/date-fns/esm/locale/en-US/index.js
var locale;
var init_en_US = __esmMin((() => {
	init_formatDistance();
	init_formatLong();
	init_formatRelative();
	init_localize();
	init_match();
	locale = {
		code: "en-US",
		formatDistance,
		formatLong,
		formatRelative,
		localize,
		match,
		options: {
			weekStartsOn: 0,
			firstWeekContainsDate: 1
		}
	};
}));
//#endregion
//#region node_modules/date-fns/esm/_lib/defaultLocale/index.js
var defaultLocale_default;
var init_defaultLocale = __esmMin((() => {
	init_en_US();
	defaultLocale_default = locale;
}));
//#endregion
//#region node_modules/date-fns/esm/format/index.js
/**
* @name format
* @category Common Helpers
* @summary Format the date.
*
* @description
* Return the formatted date string in the given format. The result may vary by locale.
*
* > ⚠️ Please note that the `format` tokens differ from Moment.js and other libraries.
* > See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
*
* The characters wrapped between two single quotes characters (') are escaped.
* Two single quotes in a row, whether inside or outside a quoted sequence, represent a 'real' single quote.
* (see the last example)
*
* Format of the string is based on Unicode Technical Standard #35:
* https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
* with a few additions (see note 7 below the table).
*
* Accepted patterns:
* | Unit                            | Pattern | Result examples                   | Notes |
* |---------------------------------|---------|-----------------------------------|-------|
* | Era                             | G..GGG  | AD, BC                            |       |
* |                                 | GGGG    | Anno Domini, Before Christ        | 2     |
* |                                 | GGGGG   | A, B                              |       |
* | Calendar year                   | y       | 44, 1, 1900, 2017                 | 5     |
* |                                 | yo      | 44th, 1st, 0th, 17th              | 5,7   |
* |                                 | yy      | 44, 01, 00, 17                    | 5     |
* |                                 | yyy     | 044, 001, 1900, 2017              | 5     |
* |                                 | yyyy    | 0044, 0001, 1900, 2017            | 5     |
* |                                 | yyyyy   | ...                               | 3,5   |
* | Local week-numbering year       | Y       | 44, 1, 1900, 2017                 | 5     |
* |                                 | Yo      | 44th, 1st, 1900th, 2017th         | 5,7   |
* |                                 | YY      | 44, 01, 00, 17                    | 5,8   |
* |                                 | YYY     | 044, 001, 1900, 2017              | 5     |
* |                                 | YYYY    | 0044, 0001, 1900, 2017            | 5,8   |
* |                                 | YYYYY   | ...                               | 3,5   |
* | ISO week-numbering year         | R       | -43, 0, 1, 1900, 2017             | 5,7   |
* |                                 | RR      | -43, 00, 01, 1900, 2017           | 5,7   |
* |                                 | RRR     | -043, 000, 001, 1900, 2017        | 5,7   |
* |                                 | RRRR    | -0043, 0000, 0001, 1900, 2017     | 5,7   |
* |                                 | RRRRR   | ...                               | 3,5,7 |
* | Extended year                   | u       | -43, 0, 1, 1900, 2017             | 5     |
* |                                 | uu      | -43, 01, 1900, 2017               | 5     |
* |                                 | uuu     | -043, 001, 1900, 2017             | 5     |
* |                                 | uuuu    | -0043, 0001, 1900, 2017           | 5     |
* |                                 | uuuuu   | ...                               | 3,5   |
* | Quarter (formatting)            | Q       | 1, 2, 3, 4                        |       |
* |                                 | Qo      | 1st, 2nd, 3rd, 4th                | 7     |
* |                                 | QQ      | 01, 02, 03, 04                    |       |
* |                                 | QQQ     | Q1, Q2, Q3, Q4                    |       |
* |                                 | QQQQ    | 1st quarter, 2nd quarter, ...     | 2     |
* |                                 | QQQQQ   | 1, 2, 3, 4                        | 4     |
* | Quarter (stand-alone)           | q       | 1, 2, 3, 4                        |       |
* |                                 | qo      | 1st, 2nd, 3rd, 4th                | 7     |
* |                                 | qq      | 01, 02, 03, 04                    |       |
* |                                 | qqq     | Q1, Q2, Q3, Q4                    |       |
* |                                 | qqqq    | 1st quarter, 2nd quarter, ...     | 2     |
* |                                 | qqqqq   | 1, 2, 3, 4                        | 4     |
* | Month (formatting)              | M       | 1, 2, ..., 12                     |       |
* |                                 | Mo      | 1st, 2nd, ..., 12th               | 7     |
* |                                 | MM      | 01, 02, ..., 12                   |       |
* |                                 | MMM     | Jan, Feb, ..., Dec                |       |
* |                                 | MMMM    | January, February, ..., December  | 2     |
* |                                 | MMMMM   | J, F, ..., D                      |       |
* | Month (stand-alone)             | L       | 1, 2, ..., 12                     |       |
* |                                 | Lo      | 1st, 2nd, ..., 12th               | 7     |
* |                                 | LL      | 01, 02, ..., 12                   |       |
* |                                 | LLL     | Jan, Feb, ..., Dec                |       |
* |                                 | LLLL    | January, February, ..., December  | 2     |
* |                                 | LLLLL   | J, F, ..., D                      |       |
* | Local week of year              | w       | 1, 2, ..., 53                     |       |
* |                                 | wo      | 1st, 2nd, ..., 53th               | 7     |
* |                                 | ww      | 01, 02, ..., 53                   |       |
* | ISO week of year                | I       | 1, 2, ..., 53                     | 7     |
* |                                 | Io      | 1st, 2nd, ..., 53th               | 7     |
* |                                 | II      | 01, 02, ..., 53                   | 7     |
* | Day of month                    | d       | 1, 2, ..., 31                     |       |
* |                                 | do      | 1st, 2nd, ..., 31st               | 7     |
* |                                 | dd      | 01, 02, ..., 31                   |       |
* | Day of year                     | D       | 1, 2, ..., 365, 366               | 9     |
* |                                 | Do      | 1st, 2nd, ..., 365th, 366th       | 7     |
* |                                 | DD      | 01, 02, ..., 365, 366             | 9     |
* |                                 | DDD     | 001, 002, ..., 365, 366           |       |
* |                                 | DDDD    | ...                               | 3     |
* | Day of week (formatting)        | E..EEE  | Mon, Tue, Wed, ..., Sun           |       |
* |                                 | EEEE    | Monday, Tuesday, ..., Sunday      | 2     |
* |                                 | EEEEE   | M, T, W, T, F, S, S               |       |
* |                                 | EEEEEE  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
* | ISO day of week (formatting)    | i       | 1, 2, 3, ..., 7                   | 7     |
* |                                 | io      | 1st, 2nd, ..., 7th                | 7     |
* |                                 | ii      | 01, 02, ..., 07                   | 7     |
* |                                 | iii     | Mon, Tue, Wed, ..., Sun           | 7     |
* |                                 | iiii    | Monday, Tuesday, ..., Sunday      | 2,7   |
* |                                 | iiiii   | M, T, W, T, F, S, S               | 7     |
* |                                 | iiiiii  | Mo, Tu, We, Th, Fr, Sa, Su        | 7     |
* | Local day of week (formatting)  | e       | 2, 3, 4, ..., 1                   |       |
* |                                 | eo      | 2nd, 3rd, ..., 1st                | 7     |
* |                                 | ee      | 02, 03, ..., 01                   |       |
* |                                 | eee     | Mon, Tue, Wed, ..., Sun           |       |
* |                                 | eeee    | Monday, Tuesday, ..., Sunday      | 2     |
* |                                 | eeeee   | M, T, W, T, F, S, S               |       |
* |                                 | eeeeee  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
* | Local day of week (stand-alone) | c       | 2, 3, 4, ..., 1                   |       |
* |                                 | co      | 2nd, 3rd, ..., 1st                | 7     |
* |                                 | cc      | 02, 03, ..., 01                   |       |
* |                                 | ccc     | Mon, Tue, Wed, ..., Sun           |       |
* |                                 | cccc    | Monday, Tuesday, ..., Sunday      | 2     |
* |                                 | ccccc   | M, T, W, T, F, S, S               |       |
* |                                 | cccccc  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
* | AM, PM                          | a..aa   | AM, PM                            |       |
* |                                 | aaa     | am, pm                            |       |
* |                                 | aaaa    | a.m., p.m.                        | 2     |
* |                                 | aaaaa   | a, p                              |       |
* | AM, PM, noon, midnight          | b..bb   | AM, PM, noon, midnight            |       |
* |                                 | bbb     | am, pm, noon, midnight            |       |
* |                                 | bbbb    | a.m., p.m., noon, midnight        | 2     |
* |                                 | bbbbb   | a, p, n, mi                       |       |
* | Flexible day period             | B..BBB  | at night, in the morning, ...     |       |
* |                                 | BBBB    | at night, in the morning, ...     | 2     |
* |                                 | BBBBB   | at night, in the morning, ...     |       |
* | Hour [1-12]                     | h       | 1, 2, ..., 11, 12                 |       |
* |                                 | ho      | 1st, 2nd, ..., 11th, 12th         | 7     |
* |                                 | hh      | 01, 02, ..., 11, 12               |       |
* | Hour [0-23]                     | H       | 0, 1, 2, ..., 23                  |       |
* |                                 | Ho      | 0th, 1st, 2nd, ..., 23rd          | 7     |
* |                                 | HH      | 00, 01, 02, ..., 23               |       |
* | Hour [0-11]                     | K       | 1, 2, ..., 11, 0                  |       |
* |                                 | Ko      | 1st, 2nd, ..., 11th, 0th          | 7     |
* |                                 | KK      | 01, 02, ..., 11, 00               |       |
* | Hour [1-24]                     | k       | 24, 1, 2, ..., 23                 |       |
* |                                 | ko      | 24th, 1st, 2nd, ..., 23rd         | 7     |
* |                                 | kk      | 24, 01, 02, ..., 23               |       |
* | Minute                          | m       | 0, 1, ..., 59                     |       |
* |                                 | mo      | 0th, 1st, ..., 59th               | 7     |
* |                                 | mm      | 00, 01, ..., 59                   |       |
* | Second                          | s       | 0, 1, ..., 59                     |       |
* |                                 | so      | 0th, 1st, ..., 59th               | 7     |
* |                                 | ss      | 00, 01, ..., 59                   |       |
* | Fraction of second              | S       | 0, 1, ..., 9                      |       |
* |                                 | SS      | 00, 01, ..., 99                   |       |
* |                                 | SSS     | 000, 001, ..., 999                |       |
* |                                 | SSSS    | ...                               | 3     |
* | Timezone (ISO-8601 w/ Z)        | X       | -08, +0530, Z                     |       |
* |                                 | XX      | -0800, +0530, Z                   |       |
* |                                 | XXX     | -08:00, +05:30, Z                 |       |
* |                                 | XXXX    | -0800, +0530, Z, +123456          | 2     |
* |                                 | XXXXX   | -08:00, +05:30, Z, +12:34:56      |       |
* | Timezone (ISO-8601 w/o Z)       | x       | -08, +0530, +00                   |       |
* |                                 | xx      | -0800, +0530, +0000               |       |
* |                                 | xxx     | -08:00, +05:30, +00:00            | 2     |
* |                                 | xxxx    | -0800, +0530, +0000, +123456      |       |
* |                                 | xxxxx   | -08:00, +05:30, +00:00, +12:34:56 |       |
* | Timezone (GMT)                  | O...OOO | GMT-8, GMT+5:30, GMT+0            |       |
* |                                 | OOOO    | GMT-08:00, GMT+05:30, GMT+00:00   | 2     |
* | Timezone (specific non-locat.)  | z...zzz | GMT-8, GMT+5:30, GMT+0            | 6     |
* |                                 | zzzz    | GMT-08:00, GMT+05:30, GMT+00:00   | 2,6   |
* | Seconds timestamp               | t       | 512969520                         | 7     |
* |                                 | tt      | ...                               | 3,7   |
* | Milliseconds timestamp          | T       | 512969520900                      | 7     |
* |                                 | TT      | ...                               | 3,7   |
* | Long localized date             | P       | 04/29/1453                        | 7     |
* |                                 | PP      | Apr 29, 1453                      | 7     |
* |                                 | PPP     | April 29th, 1453                  | 7     |
* |                                 | PPPP    | Friday, April 29th, 1453          | 2,7   |
* | Long localized time             | p       | 12:00 AM                          | 7     |
* |                                 | pp      | 12:00:00 AM                       | 7     |
* |                                 | ppp     | 12:00:00 AM GMT+2                 | 7     |
* |                                 | pppp    | 12:00:00 AM GMT+02:00             | 2,7   |
* | Combination of date and time    | Pp      | 04/29/1453, 12:00 AM              | 7     |
* |                                 | PPpp    | Apr 29, 1453, 12:00:00 AM         | 7     |
* |                                 | PPPppp  | April 29th, 1453 at ...           | 7     |
* |                                 | PPPPpppp| Friday, April 29th, 1453 at ...   | 2,7   |
* Notes:
* 1. "Formatting" units (e.g. formatting quarter) in the default en-US locale
*    are the same as "stand-alone" units, but are different in some languages.
*    "Formatting" units are declined according to the rules of the language
*    in the context of a date. "Stand-alone" units are always nominative singular:
*
*    `format(new Date(2017, 10, 6), 'do LLLL', {locale: cs}) //=> '6. listopad'`
*
*    `format(new Date(2017, 10, 6), 'do MMMM', {locale: cs}) //=> '6. listopadu'`
*
* 2. Any sequence of the identical letters is a pattern, unless it is escaped by
*    the single quote characters (see below).
*    If the sequence is longer than listed in table (e.g. `EEEEEEEEEEE`)
*    the output will be the same as default pattern for this unit, usually
*    the longest one (in case of ISO weekdays, `EEEE`). Default patterns for units
*    are marked with "2" in the last column of the table.
*
*    `format(new Date(2017, 10, 6), 'MMM') //=> 'Nov'`
*
*    `format(new Date(2017, 10, 6), 'MMMM') //=> 'November'`
*
*    `format(new Date(2017, 10, 6), 'MMMMM') //=> 'N'`
*
*    `format(new Date(2017, 10, 6), 'MMMMMM') //=> 'November'`
*
*    `format(new Date(2017, 10, 6), 'MMMMMMM') //=> 'November'`
*
* 3. Some patterns could be unlimited length (such as `yyyyyyyy`).
*    The output will be padded with zeros to match the length of the pattern.
*
*    `format(new Date(2017, 10, 6), 'yyyyyyyy') //=> '00002017'`
*
* 4. `QQQQQ` and `qqqqq` could be not strictly numerical in some locales.
*    These tokens represent the shortest form of the quarter.
*
* 5. The main difference between `y` and `u` patterns are B.C. years:
*
*    | Year | `y` | `u` |
*    |------|-----|-----|
*    | AC 1 |   1 |   1 |
*    | BC 1 |   1 |   0 |
*    | BC 2 |   2 |  -1 |
*
*    Also `yy` always returns the last two digits of a year,
*    while `uu` pads single digit years to 2 characters and returns other years unchanged:
*
*    | Year | `yy` | `uu` |
*    |------|------|------|
*    | 1    |   01 |   01 |
*    | 14   |   14 |   14 |
*    | 376  |   76 |  376 |
*    | 1453 |   53 | 1453 |
*
*    The same difference is true for local and ISO week-numbering years (`Y` and `R`),
*    except local week-numbering years are dependent on `options.weekStartsOn`
*    and `options.firstWeekContainsDate` (compare [getISOWeekYear]{@link https://date-fns.org/docs/getISOWeekYear}
*    and [getWeekYear]{@link https://date-fns.org/docs/getWeekYear}).
*
* 6. Specific non-location timezones are currently unavailable in `date-fns`,
*    so right now these tokens fall back to GMT timezones.
*
* 7. These patterns are not in the Unicode Technical Standard #35:
*    - `i`: ISO day of week
*    - `I`: ISO week of year
*    - `R`: ISO week-numbering year
*    - `t`: seconds timestamp
*    - `T`: milliseconds timestamp
*    - `o`: ordinal number modifier
*    - `P`: long localized date
*    - `p`: long localized time
*
* 8. `YY` and `YYYY` tokens represent week-numbering years but they are often confused with years.
*    You should enable `options.useAdditionalWeekYearTokens` to use them. See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
*
* 9. `D` and `DD` tokens represent days of the year but they are often confused with days of the month.
*    You should enable `options.useAdditionalDayOfYearTokens` to use them. See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
*
* @param {Date|Number} date - the original date
* @param {String} format - the string of tokens
* @param {Object} [options] - an object with options.
* @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
* @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
* @param {Number} [options.firstWeekContainsDate=1] - the day of January, which is
* @param {Boolean} [options.useAdditionalWeekYearTokens=false] - if true, allows usage of the week-numbering year tokens `YY` and `YYYY`;
*   see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
* @param {Boolean} [options.useAdditionalDayOfYearTokens=false] - if true, allows usage of the day of year tokens `D` and `DD`;
*   see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
* @returns {String} the formatted date string
* @throws {TypeError} 2 arguments required
* @throws {RangeError} `date` must not be Invalid Date
* @throws {RangeError} `options.locale` must contain `localize` property
* @throws {RangeError} `options.locale` must contain `formatLong` property
* @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
* @throws {RangeError} `options.firstWeekContainsDate` must be between 1 and 7
* @throws {RangeError} use `yyyy` instead of `YYYY` for formatting years using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
* @throws {RangeError} use `yy` instead of `YY` for formatting years using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
* @throws {RangeError} use `d` instead of `D` for formatting days of the month using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
* @throws {RangeError} use `dd` instead of `DD` for formatting days of the month using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
* @throws {RangeError} format string contains an unescaped latin alphabet character
*
* @example
* // Represent 11 February 2014 in middle-endian format:
* const result = format(new Date(2014, 1, 11), 'MM/dd/yyyy')
* //=> '02/11/2014'
*
* @example
* // Represent 2 July 2014 in Esperanto:
* import { eoLocale } from 'date-fns/locale/eo'
* const result = format(new Date(2014, 6, 2), "do 'de' MMMM yyyy", {
*   locale: eoLocale
* })
* //=> '2-a de julio 2014'
*
* @example
* // Escape string by single quote characters:
* const result = format(new Date(2014, 6, 2, 15), "h 'o''clock'")
* //=> "3 o'clock"
*/
function format(dirtyDate, dirtyFormatStr, options) {
	var _ref, _options$locale, _ref2, _ref3, _ref4, _options$firstWeekCon, _options$locale2, _options$locale2$opti, _defaultOptions$local, _defaultOptions$local2, _ref5, _ref6, _ref7, _options$weekStartsOn, _options$locale3, _options$locale3$opti, _defaultOptions$local3, _defaultOptions$local4;
	requiredArgs(2, arguments);
	var formatStr = String(dirtyFormatStr);
	var defaultOptions = getDefaultOptions();
	var locale = (_ref = (_options$locale = options === null || options === void 0 ? void 0 : options.locale) !== null && _options$locale !== void 0 ? _options$locale : defaultOptions.locale) !== null && _ref !== void 0 ? _ref : defaultLocale_default;
	var firstWeekContainsDate = toInteger((_ref2 = (_ref3 = (_ref4 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale2 = options.locale) === null || _options$locale2 === void 0 ? void 0 : (_options$locale2$opti = _options$locale2.options) === null || _options$locale2$opti === void 0 ? void 0 : _options$locale2$opti.firstWeekContainsDate) !== null && _ref4 !== void 0 ? _ref4 : defaultOptions.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : (_defaultOptions$local = defaultOptions.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : 1);
	if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");
	var weekStartsOn = toInteger((_ref5 = (_ref6 = (_ref7 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale3 = options.locale) === null || _options$locale3 === void 0 ? void 0 : (_options$locale3$opti = _options$locale3.options) === null || _options$locale3$opti === void 0 ? void 0 : _options$locale3$opti.weekStartsOn) !== null && _ref7 !== void 0 ? _ref7 : defaultOptions.weekStartsOn) !== null && _ref6 !== void 0 ? _ref6 : (_defaultOptions$local3 = defaultOptions.locale) === null || _defaultOptions$local3 === void 0 ? void 0 : (_defaultOptions$local4 = _defaultOptions$local3.options) === null || _defaultOptions$local4 === void 0 ? void 0 : _defaultOptions$local4.weekStartsOn) !== null && _ref5 !== void 0 ? _ref5 : 0);
	if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
	if (!locale.localize) throw new RangeError("locale must contain localize property");
	if (!locale.formatLong) throw new RangeError("locale must contain formatLong property");
	var originalDate = toDate(dirtyDate);
	if (!isValid(originalDate)) throw new RangeError("Invalid time value");
	var utcDate = subMilliseconds(originalDate, getTimezoneOffsetInMilliseconds(originalDate));
	var formatterOptions = {
		firstWeekContainsDate,
		weekStartsOn,
		locale,
		_originalDate: originalDate
	};
	return formatStr.match(longFormattingTokensRegExp).map(function(substring) {
		var firstCharacter = substring[0];
		if (firstCharacter === "p" || firstCharacter === "P") {
			var longFormatter = longFormatters[firstCharacter];
			return longFormatter(substring, locale.formatLong);
		}
		return substring;
	}).join("").match(formattingTokensRegExp).map(function(substring) {
		if (substring === "''") return "'";
		var firstCharacter = substring[0];
		if (firstCharacter === "'") return cleanEscapedString(substring);
		var formatter = formatters[firstCharacter];
		if (formatter) {
			if (!(options !== null && options !== void 0 && options.useAdditionalWeekYearTokens) && isProtectedWeekYearToken(substring)) throwProtectedError(substring, dirtyFormatStr, String(dirtyDate));
			if (!(options !== null && options !== void 0 && options.useAdditionalDayOfYearTokens) && isProtectedDayOfYearToken(substring)) throwProtectedError(substring, dirtyFormatStr, String(dirtyDate));
			return formatter(utcDate, substring, locale.localize, formatterOptions);
		}
		if (firstCharacter.match(unescapedLatinCharacterRegExp)) throw new RangeError("Format string contains an unescaped latin alphabet character `" + firstCharacter + "`");
		return substring;
	}).join("");
}
function cleanEscapedString(input) {
	var matched = input.match(escapedStringRegExp);
	if (!matched) return input;
	return matched[1].replace(doubleQuoteRegExp, "'");
}
var formattingTokensRegExp, longFormattingTokensRegExp, escapedStringRegExp, doubleQuoteRegExp, unescapedLatinCharacterRegExp;
var init_format = __esmMin((() => {
	init_isValid();
	init_subMilliseconds();
	init_toDate();
	init_formatters();
	init_longFormatters();
	init_getTimezoneOffsetInMilliseconds();
	init_protectedTokens();
	init_toInteger();
	init_requiredArgs();
	init_defaultOptions();
	init_defaultLocale();
	formattingTokensRegExp = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;
	longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
	escapedStringRegExp = /^'([^]*?)'?$/;
	doubleQuoteRegExp = /''/g;
	unescapedLatinCharacterRegExp = /[a-zA-Z]/;
}));
//#endregion
//#region node_modules/date-fns/esm/getYear/index.js
/**
* @name getYear
* @category Year Helpers
* @summary Get the year of the given date.
*
* @description
* Get the year of the given date.
*
* @param {Date|Number} date - the given date
* @returns {Number} the year
* @throws {TypeError} 1 argument required
*
* @example
* // Which year is 2 July 2014?
* const result = getYear(new Date(2014, 6, 2))
* //=> 2014
*/
function getYear(dirtyDate) {
	requiredArgs(1, arguments);
	return toDate(dirtyDate).getFullYear();
}
var init_getYear = __esmMin((() => {
	init_toDate();
	init_requiredArgs();
}));
//#endregion
//#region node_modules/date-fns/esm/index.js
var init_esm = __esmMin((() => {
	init_toInteger();
	init_toDate();
	init_requiredArgs();
	init_addMilliseconds();
	init_defaultOptions();
	init_getTimezoneOffsetInMilliseconds();
	init_constants();
	init_isValid();
	init_format();
	init_defaultLocale();
	init_addLeadingZeros();
	init_subMilliseconds();
	init_getYear();
	init_isDate();
	init_longFormatters();
	init_protectedTokens();
	init_getUTCWeekYear();
	init_startOfUTCWeek();
	init_startOfUTCISOWeek();
	init_getUTCWeek();
	init_getUTCISOWeek();
	init_lightFormatters();
	init_constants();
}));
//#endregion
//#region src/js/dataMapping/agencySubmissionStats/timeFilters.js
var lastPeriods, cssOrderClassByPeriodId, periodsPerQuarter, periodToQuarterMapping;
var init_timeFilters = __esmMin((() => {
	lastPeriods = [
		"3",
		"6",
		"9",
		"12"
	];
	cssOrderClassByPeriodId = {
		1: "order-1",
		2: "order-1",
		3: "order-2",
		4: "order-3",
		5: "order-4",
		6: "order-5",
		7: "order-6",
		8: "order-7",
		9: "order-8",
		10: "order-9",
		11: "order-10",
		12: "order-11"
	};
	periodsPerQuarter = [
		[{
			title: "P01 - P02",
			id: "2",
			className: "double-period"
		}, {
			title: "Q1 P03",
			id: "3",
			className: "last-period-per-quarter"
		}],
		[
			{
				title: "P04",
				id: "4"
			},
			{
				title: "P05",
				id: "5"
			},
			{
				title: "Q2 P06",
				id: "6",
				className: "last-period-per-quarter"
			}
		],
		[
			{
				title: "P07",
				id: "7"
			},
			{
				title: "P08",
				id: "8"
			},
			{
				title: "Q3 P09",
				id: "9",
				className: "last-period-per-quarter"
			}
		],
		[
			{
				title: "P10",
				id: "10"
			},
			{
				title: "P11",
				id: "11"
			},
			{
				title: "Q4 P12",
				id: "12",
				className: "last-period-per-quarter"
			}
		]
	];
	periodToQuarterMapping = {
		1: "1",
		2: "1",
		3: "1",
		4: "2",
		5: "2",
		6: "2",
		7: "3",
		8: "3",
		9: "3",
		10: "4",
		11: "4",
		12: "4"
	};
}));
//#endregion
//#region src/js/helpers/aboutTheDataHelper.js
/**
* aboutTheDataHelper.js
* Created by Jonathan Hill 11/20/20
*/
var getSelectedPeriodTitle, getPeriodWithTitleById, isPeriodVisible, isPeriodSelectable, getLastPeriodWithinQuarterByPeriod, defaultState, usePagination, formatPublicationDates, formatMissingAccountBalancesData, formatReportingDifferencesData, convertDatesToMilliseconds, formatUnlinkedDataRows, showQuarterText, renderDeadline, getAgencyDetailEmail, getAllAgenciesEmail, getFederalBudget;
var init_aboutTheDataHelper = __esmMin((() => {
	init_esm();
	init_moneyFormatter();
	init_timeFilters();
	getSelectedPeriodTitle = (str) => str.includes("Q") ? `${str.split(" ")[0]} / ${str.split(" ")[1]}` : str;
	getPeriodWithTitleById = (urlPeriod, latestPeriod) => {
		if (parseInt(urlPeriod, 10) > 12) return getPeriodWithTitleById(`${latestPeriod.period}`);
		const period = periodsPerQuarter.find((arr) => arr.some(({ id }) => {
			if (urlPeriod === "1" || urlPeriod === "2") return id === "2";
			return id === urlPeriod;
		})).filter(({ id }) => {
			if (urlPeriod === "1" || urlPeriod === "2") return id === "2";
			return id === urlPeriod;
		})[0];
		if (period) return {
			...period,
			title: getSelectedPeriodTitle(period.title)
		};
		return getPeriodWithTitleById(`${latestPeriod.period}`);
	};
	isPeriodVisible = (availablePeriodsInFy, periodId) => availablePeriodsInFy.some((p) => p.submission_fiscal_month >= parseInt(periodId, 10) && parseInt(periodId, 10) > 0);
	isPeriodSelectable = (availablePeriodsInFy, periodId) => availablePeriodsInFy.filter((p) => parseInt(periodId, 10) === p.submission_fiscal_month).length > 0;
	getLastPeriodWithinQuarterByPeriod = (periodId) => lastPeriods[Math.ceil(parseInt(periodId, 10) / 3) - 1] || "1";
	defaultState = {
		page: 1,
		limit: 10,
		totalItems: 0
	};
	usePagination = (initialState = defaultState) => {
		const [state, updatePagination] = useState(initialState);
		const { page, limit, totalItems } = state;
		return [
			{
				page,
				limit,
				totalItems
			},
			(newPg) => updatePagination({
				...state,
				page: newPg
			}),
			(newLimit) => updatePagination({
				...state,
				limit: newLimit
			}),
			(newTotal) => updatePagination({
				...state,
				totalItems: newTotal
			})
		];
	};
	formatPublicationDates = (dates) => dates.map((date) => {
		let publicationDate = "--";
		let certificationDate = "--";
		if (date.publication_date) publicationDate = format(new Date(date.publication_date), "MM/dd/yyyy");
		if (date.certification_date) certificationDate = format(new Date(date.certification_date), "MM/dd/yyyy");
		return [publicationDate, certificationDate];
	});
	formatMissingAccountBalancesData = (data) => {
		const weHaveTotalData = data.gtasObligationTotal && data.gtasObligationTotal > 0;
		return data.results.map((tasData) => {
			let amount = "--";
			let percent = "--";
			if (typeof tasData.amount === "number" && weHaveTotalData) percent = calculatePercentage(tasData.amount, data.gtasObligationTotal, null, 2);
			if (typeof tasData.amount === "number") amount = formatMoney(tasData.amount);
			return [
				tasData.tas,
				amount,
				percent
			];
		});
	};
	formatReportingDifferencesData = (data) => data.results.map(({ tas = "", file_a_obligation: fileAObligation = null, file_b_obligation: fileBObligation = null, difference = null }) => [
		tas || "--",
		fileAObligation || fileAObligation === 0 ? formatMoneyWithPrecision(fileAObligation, 2) : "--",
		fileBObligation || fileBObligation === 0 ? formatMoneyWithPrecision(fileBObligation, 2) : "--",
		difference ? formatMoneyWithPrecision(difference, 2) : "--"
	]);
	convertDatesToMilliseconds = (data) => data.map((datesObj) => {
		const publicationDate = !datesObj.publication_date ? /* @__PURE__ */ new Date(0) : new Date(datesObj.publication_date);
		const certificationDate = !datesObj.certification_date ? /* @__PURE__ */ new Date(0) : new Date(datesObj.certification_date);
		return {
			publication_date: publicationDate.getTime(),
			certification_date: certificationDate.getTime()
		};
	});
	formatUnlinkedDataRows = (data, type) => [[
		{
			displayName: "Count",
			title: "",
			rowSpan: "0"
		},
		formatNumber(data.unlinked_file_d_award_count),
		formatNumber(data.unlinked_file_c_award_count),
		formatNumber(data.unlinked_file_c_award_count + data.unlinked_file_d_award_count)
	], [
		{
			displayName: `as a Percentage of All ${type} Awards`,
			title: "",
			rowSpan: "0"
		},
		calculatePercentage(data.unlinked_file_d_award_count, data.total_linked_award_count + data.unlinked_file_c_award_count + data.unlinked_file_d_award_count, null, 2),
		calculatePercentage(data.unlinked_file_c_award_count, data.total_linked_award_count + data.unlinked_file_c_award_count + data.unlinked_file_d_award_count, null, 2),
		calculatePercentage(data.unlinked_file_c_award_count + data.unlinked_file_d_award_count, data.total_linked_award_count + data.unlinked_file_c_award_count + data.unlinked_file_d_award_count, null, 2)
	]];
	showQuarterText = (period) => [
		3,
		6,
		9,
		12
	].includes(period);
	renderDeadline = (title, deadlines) => {
		if (title === "publication_date" && deadlines?.submissionDueDate) return format(new Date(deadlines.submissionDueDate), "MM/dd/yyyy");
		if (title !== "publication_date" && deadlines?.certificationDueDate) return format(new Date(deadlines.certificationDueDate), "MM/dd/yyyy");
		return "--";
	};
	getAgencyDetailEmail = (agencyName, agencyCode) => ({
		subject: `Agency Submission Statistics | ${agencyName}`,
		body: `View agency submission details for ${agencyName} on USAspending: https://www.usaspending.gov/submission-statistics/agency/${agencyCode}`
	});
	getAllAgenciesEmail = (fy, period, tab) => {
		const params = new URLSearchParams({
			fy,
			period,
			tab
		}).toString();
		return {
			subject: "Agency Submission Statistics | USAspending.gov",
			body: `View agency submission details on USAspending: ${`https://www.usaspending.gov/submission-statistics/?${encodeURIComponent(params)}`}`
		};
	};
	getFederalBudget = (federalTotals, latestPeriod) => {
		return federalTotals.find(({ fiscal_period: p, fiscal_year: y }) => p === latestPeriod.period && y === latestPeriod.year)?.total_budgetary_resources;
	};
}));
//#endregion
export { getYear as C, accountActions_exports as D, init_format as E, init_accountActions as O, init_esm as S, format as T, cssOrderClassByPeriodId as _, formatUnlinkedDataRows as a, periodToQuarterMapping as b, getFederalBudget as c, init_aboutTheDataHelper as d, isPeriodSelectable as f, usePagination as g, showQuarterText as h, formatReportingDifferencesData as i, setSubmissionPeriods as k, getLastPeriodWithinQuarterByPeriod as l, renderDeadline as m, formatMissingAccountBalancesData as n, getAgencyDetailEmail as o, isPeriodVisible as p, formatPublicationDates as r, getAllAgenciesEmail as s, convertDatesToMilliseconds as t, getPeriodWithTitleById as u, init_timeFilters as v, init_getYear as w, periodsPerQuarter as x, lastPeriods as y };
