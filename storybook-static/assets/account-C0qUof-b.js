import { n as __esmMin, t as __commonJSMin } from "./rolldown-runtime-D1cXj70v.js";
import { $t as init_apiRequest, O as require_dayjs_min, Qt as apiRequest, p as require_isSameOrBefore } from "./index.js-CgeUxZJy.js";
//#region node_modules/dayjs/plugin/utc.js
var require_utc = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(t, i) {
		"object" == typeof exports && "undefined" != typeof module ? module.exports = i() : "function" == typeof define && define.amd ? define(i) : (t = "undefined" != typeof globalThis ? globalThis : t || self).dayjs_plugin_utc = i();
	})(exports, (function() {
		"use strict";
		var t = "minute", i = /[+-]\d\d(?::?\d\d)?/g, e = /([+-]|\d\d)/g;
		return function(s, f, n) {
			var u = f.prototype;
			n.utc = function(t) {
				return new f({
					date: t,
					utc: !0,
					args: arguments
				});
			}, u.utc = function(i) {
				var e = n(this.toDate(), {
					locale: this.$L,
					utc: !0
				});
				return i ? e.add(this.utcOffset(), t) : e;
			}, u.local = function() {
				return n(this.toDate(), {
					locale: this.$L,
					utc: !1
				});
			};
			var o = u.parse;
			u.parse = function(t) {
				t.utc && (this.$u = !0), this.$utils().u(t.$offset) || (this.$offset = t.$offset), o.call(this, t);
			};
			var r = u.init;
			u.init = function() {
				if (this.$u) {
					var t = this.$d;
					this.$y = t.getUTCFullYear(), this.$M = t.getUTCMonth(), this.$D = t.getUTCDate(), this.$W = t.getUTCDay(), this.$H = t.getUTCHours(), this.$m = t.getUTCMinutes(), this.$s = t.getUTCSeconds(), this.$ms = t.getUTCMilliseconds();
				} else r.call(this);
			};
			var a = u.utcOffset;
			u.utcOffset = function(s, f) {
				var n = this.$utils().u;
				if (n(s)) return this.$u ? 0 : n(this.$offset) ? a.call(this) : this.$offset;
				if ("string" == typeof s && (s = function(t) {
					void 0 === t && (t = "");
					var s = t.match(i);
					if (!s) return null;
					var f = ("" + s[0]).match(e) || [
						"-",
						0,
						0
					], n = f[0], u = 60 * +f[1] + +f[2];
					return 0 === u ? 0 : "+" === n ? u : -u;
				}(s), null === s)) return this;
				var u = Math.abs(s) <= 16 ? 60 * s : s, o = this;
				if (f) return o.$offset = u, o.$u = 0 === s, o;
				if (0 !== s) {
					var r = this.$u ? this.toDate().getTimezoneOffset() : -1 * this.utcOffset();
					(o = this.local().add(u + r, t)).$offset = u, o.$x.$localOffset = r;
				} else o = this.utc();
				return o;
			};
			var h = u.format;
			u.format = function(t) {
				var i = t || (this.$u ? "YYYY-MM-DDTHH:mm:ss[Z]" : "");
				return h.call(this, i);
			}, u.valueOf = function() {
				var t = this.$utils().u(this.$offset) ? 0 : this.$offset + (this.$x.$localOffset || this.$d.getTimezoneOffset());
				return this.$d.valueOf() - 6e4 * t;
			}, u.isUTC = function() {
				return !!this.$u;
			}, u.toISOString = function() {
				return this.toDate().toISOString();
			}, u.toString = function() {
				return this.toDate().toUTCString();
			};
			var l = u.toDate;
			u.toDate = function(t) {
				return "s" === t && this.$offset ? n(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate() : l.call(this);
			};
			var c = u.diff;
			u.diff = function(t, i, e) {
				if (t && this.$u === t.$u) return c.call(this, t, i, e);
				var s = this.local(), f = n(t).local();
				return c.call(s, f, i, e);
			};
		};
	}));
}));
//#endregion
//#region src/js/helpers/accountHelper.js
var dayjs, utc, isSameOrBefore, getSubmissionDeadlines, getLatestPeriod, getLatestPeriodAsDayjs;
var init_accountHelper = __esmMin((() => {
	dayjs = require_dayjs_min();
	utc = require_utc();
	isSameOrBefore = require_isSameOrBefore();
	dayjs.extend(isSameOrBefore);
	dayjs.extend(utc);
	getSubmissionDeadlines = (fiscalYear, fiscalPeriod, submissionPeriods) => {
		if (!submissionPeriods.length) return null;
		const submissionPeriod = submissionPeriods.find((submission) => submission.submission_fiscal_year === fiscalYear && submission.submission_fiscal_month === fiscalPeriod);
		if (!submissionPeriod) return null;
		return {
			submissionDueDate: submissionPeriod.submission_due_date,
			certificationDueDate: submissionPeriod.certification_due_date
		};
	};
	getLatestPeriod = (availablePeriods, fy = null) => {
		if (availablePeriods.length) return availablePeriods.filter((s) => {
			if (fy) return s.submission_fiscal_year === parseInt(fy, 10);
			return true;
		}).map((s) => ({
			revealDate: dayjs.utc(s.submission_reveal_date),
			asOfDate: dayjs.utc(s.period_end_date),
			period: s.submission_fiscal_month,
			year: s.submission_fiscal_year,
			quarter: s.submission_fiscal_quarter
		})).sort(({ revealDate: a }, { revealDate: b }) => b.valueOf() - a.valueOf()).find(({ revealDate: s }) => dayjs(s).isSameOrBefore(dayjs()));
		return {
			revealDate: null,
			asOfDate: null,
			period: null,
			year: null,
			quarter: null
		};
	};
	getLatestPeriodAsDayjs = (availablePeriods) => {
		if (availablePeriods.length) return getLatestPeriod(availablePeriods).asOfDate;
		return {
			revealDate: null,
			asOfDate: null,
			period: null,
			year: null,
			quarter: null
		};
	};
}));
//#endregion
//#region src/js/apis/account.js
var fetchFederalAccount, fetchFederalAccountFYSnapshot, fetchTasCategoryTotals, fetchTasBalanceTotals, fetchAvailableObjectClasses, fetchAllSubmissionDates;
var init_account = __esmMin((() => {
	init_apiRequest();
	fetchFederalAccount = (accountNumber) => apiRequest({ url: `v2/federal_accounts/${accountNumber}/` });
	fetchFederalAccountFYSnapshot = (id, fy) => apiRequest({ url: `v2/federal_accounts/${id}/fiscal_year_snapshot/${fy}` });
	fetchTasCategoryTotals = (data) => apiRequest({
		url: "v1/tas/categories/total/",
		method: "post",
		data
	});
	fetchTasBalanceTotals = (data) => apiRequest({
		url: "v1/tas/balances/total/",
		method: "post",
		data
	});
	fetchAvailableObjectClasses = (federalAccountId) => apiRequest({ url: `v2/federal_accounts/${federalAccountId}/available_object_classes` });
	fetchAllSubmissionDates = (cached = false) => apiRequest({ url: cached ? "v2/references/submission_periods/?use_cache=true" : "v2/references/submission_periods/" });
}));
//#endregion
export { fetchTasBalanceTotals as a, getLatestPeriod as c, init_accountHelper as d, require_utc as f, fetchFederalAccountFYSnapshot as i, getLatestPeriodAsDayjs as l, fetchAvailableObjectClasses as n, fetchTasCategoryTotals as o, fetchFederalAccount as r, init_account as s, fetchAllSubmissionDates as t, getSubmissionDeadlines as u };
