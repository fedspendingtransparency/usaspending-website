import { n as __esmMin } from "./rolldown-runtime-D1cXj70v.js";
import { Gn as init_queryParams, Hn as isCancel, La as init_useQueryParams, Ra as useQueryParams, Un as combineQueryParams, Va as init_development, Vn as init_axios, Wn as getQueryParamString, go as require_jsx_runtime, io as useSelector, no as init_es, oo as useDispatch, qa as useNavigate } from "./index.js-Dk2VDaPz.js";
import { O as init_accountActions, d as init_aboutTheDataHelper, f as isPeriodSelectable, k as setSubmissionPeriods, l as getLastPeriodWithinQuarterByPeriod, p as isPeriodVisible, u as getPeriodWithTitleById } from "./aboutTheDataHelper-C-4K4CA_.js";
import { c as getLatestPeriod, d as init_accountHelper, l as getLatestPeriodAsDayjs, s as init_account, t as fetchAllSubmissionDates } from "./account-DzCFQMYa.js";
import { useCallback, useEffect, useRef, useState } from "react";
import { get } from "lodash-es";
//#region src/js/containers/account/WithLatestFy.jsx
var import_jsx_runtime, useLatestAccountData, useValidTimeBasedQueryParams, withLatestFy;
var init_WithLatestFy = __esmMin((() => {
	init_development();
	init_axios();
	init_es();
	init_accountActions();
	init_accountHelper();
	init_account();
	init_aboutTheDataHelper();
	init_queryParams();
	init_useQueryParams();
	import_jsx_runtime = require_jsx_runtime();
	useLatestAccountData = () => {
		const dispatch = useDispatch();
		const [isLoading, setIsLoading] = useState(true);
		const [errorMsg, setErrorMsg] = useState("");
		const { submissionPeriods } = useSelector((state) => state.account);
		const [{ latestMoment, latestPeriod }, setLatestData] = useState({
			latestPeriod: getLatestPeriod([]),
			latestMoment: null
		});
		const request = useRef();
		useEffect(() => {
			if (submissionPeriods.size && isLoading) setIsLoading(false);
			if (!submissionPeriods.size) {
				setIsLoading(true);
				setErrorMsg("");
				request.current = fetchAllSubmissionDates();
				request.current.promise.then(({ data: { available_periods: periods } }) => {
					dispatch(setSubmissionPeriods(periods));
					getLatestPeriodAsDayjs(periods);
					setLatestData({
						latestMoment: getLatestPeriodAsDayjs(periods),
						latestPeriod: getLatestPeriod(periods)
					});
					setIsLoading(false);
					request.current = null;
				}).catch((e) => {
					if (!isCancel(e)) {
						console.error("Error fetching active periods: ", e);
						setErrorMsg(get(e, "message", "Error fetching active periods. Please refresh your browser."));
						request.current = null;
					}
				});
			} else if (!latestMoment || !latestPeriod) setLatestData({
				latestMoment: getLatestPeriodAsDayjs(submissionPeriods.toJS()),
				latestPeriod: getLatestPeriod(submissionPeriods.toJS())
			});
			return () => {
				if (request.current) {
					console.info("cancelling request, fetchAllSubmissionDates");
					request.current.cancel();
				}
			};
		}, [dispatch, submissionPeriods]);
		return [
			latestMoment,
			submissionPeriods,
			latestPeriod,
			isLoading,
			errorMsg
		];
	};
	useValidTimeBasedQueryParams = (currentUrlFy, currentUrlPeriod = null, requiredParams = ["fy", "period"]) => {
		const history = useNavigate();
		const existingParams = useQueryParams();
		if (existingParams.fy && existingParams.fy != parseInt(existingParams.fy, 10)) existingParams.fy = null;
		if (existingParams.period && existingParams.period != parseInt(existingParams.period, 10)) existingParams.period = null;
		const [, submissionPeriods, latestSubmission] = useLatestAccountData();
		const { year: latestFy, period: latestPeriod } = latestSubmission;
		const [{ period, fy }, setYearAndPeriod] = useState({
			period: "",
			fy: ""
		});
		const updateUrl = (newParamsAsObj) => {
			const newQueryParams = combineQueryParams(existingParams, newParamsAsObj);
			setYearAndPeriod(newParamsAsObj);
			history(`${getQueryParamString(newQueryParams)}`, { replace: true });
		};
		const handleTimeChange = useCallback((y, p = null) => {
			if (y && p) updateUrl({
				fy: `${y}`,
				period: `${p}`
			});
			else if (y) updateUrl({ fy: `${y}` });
			else if (p) updateUrl({ period: `${p}` });
		});
		useEffect(() => {
			const isDataReadyForLatest = submissionPeriods.size && latestFy && latestPeriod;
			const periodAndFyRequired = requiredParams.includes("fy") && requiredParams.includes("period");
			if (isDataReadyForLatest && requiredParams.some((p) => !existingParams[p])) {
				if (periodAndFyRequired && !existingParams.fy && existingParams.period) handleTimeChange(latestFy);
				else if (periodAndFyRequired && existingParams.fy && !existingParams.period) handleTimeChange(null, latestPeriod);
				else if (periodAndFyRequired && !existingParams.fy && !existingParams.period) handleTimeChange(latestFy, latestPeriod);
				else if (isDataReadyForLatest && requiredParams.includes("fy") && !existingParams.fy) handleTimeChange(latestFy);
				else if (isDataReadyForLatest && requiredParams.includes("period") && !existingParams.period) handleTimeChange(null, latestPeriod);
			}
		}, [
			history,
			latestFy,
			latestPeriod,
			submissionPeriods.size,
			currentUrlFy,
			currentUrlPeriod
		]);
		useEffect(() => {
			if (submissionPeriods.size && latestFy && latestPeriod && requiredParams.every((p) => existingParams[p])) {
				const availablePeriodsInFy = submissionPeriods.toJS().filter(({ submission_fiscal_year: y }) => parseInt(currentUrlFy, 10) === y);
				if (availablePeriodsInFy.length && currentUrlPeriod) {
					const validPeriod = isPeriodVisible(availablePeriodsInFy, currentUrlPeriod) ? currentUrlPeriod : `${latestPeriod}`;
					const selectablePeriod = isPeriodSelectable(availablePeriodsInFy, validPeriod) ? validPeriod : getLastPeriodWithinQuarterByPeriod(validPeriod);
					handleTimeChange(currentUrlFy, selectablePeriod);
				} else if (currentUrlPeriod) handleTimeChange(latestFy, latestPeriod);
				else if (availablePeriodsInFy.length) handleTimeChange(currentUrlFy);
				else handleTimeChange(latestFy);
			}
		}, [
			submissionPeriods,
			currentUrlFy,
			currentUrlPeriod,
			latestPeriod,
			latestFy
		]);
		if (requiredParams.length === 1 && requiredParams[0] === "fy") return [fy, updateUrl];
		return [
			fy,
			period && latestPeriod ? getPeriodWithTitleById(period, latestPeriod) : period,
			updateUrl
		];
	};
	withLatestFy = (WrappedComponent, format = null) => (props) => {
		const [latestPeriodAsMoment, submissionPeriods, latestPeriod, isLoading, errorMsg] = useLatestAccountData();
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WrappedComponent, {
			...props,
			isFetchLatestFyLoading: isLoading,
			fetchLatestFyError: errorMsg,
			latestSubmissionDate: latestPeriodAsMoment && format ? latestPeriodAsMoment.format(format) : latestPeriodAsMoment,
			submissionPeriods: submissionPeriods.toJS(),
			latestPeriod
		});
	};
}));
//#endregion
export { withLatestFy as i, useLatestAccountData as n, useValidTimeBasedQueryParams as r, init_WithLatestFy as t };
