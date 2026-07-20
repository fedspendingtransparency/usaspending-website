import { n as __esmMin, o as __toESM } from "./rolldown-runtime-D1cXj70v.js";
import { Br as so, Dr as Xa, Ea as require_immutable, Ei as calculatePercentage, Ga as useLocation, Gn as init_queryParams, Ha as Link, Ii as init_moneyFormatter, Kr as FontAwesomeIcon, La as init_useQueryParams, Ni as formatNumber, Nr as init_index_es, O as require_dayjs_min, Ra as useQueryParams, T as init_fiscalYearHelper, Un as combineQueryParams, Ur as vs, Va as init_development, Vr as ss, Wn as getQueryParamString, cr as init_socialShare, fn as init_modalActions, g as allFiscalYears, go as require_jsx_runtime, gr as $s, io as useSelector, ki as formatMoney, n as init_Loading, no as init_es, oo as useDispatch, or as getBaseUrl, p as require_isSameOrBefore, pn as showModal, qa as useNavigate, qr as init_dist, sr as handleShareOptionClick, t as LoadingWrapper, wr as Qs, xr as Ka } from "./index.js-Dk2VDaPz.js";
import { n as init_PageWrapper, t as PageWrapper } from "./PageWrapper-Dqa3KwTb.js";
import { n as init_ShareIcon508, t as ShareIcon508 } from "./ShareIcon508-QphjVgqd.js";
import { _ as cssOrderClassByPeriodId, c as getFederalBudget, d as init_aboutTheDataHelper, f as isPeriodSelectable, g as usePagination, p as isPeriodVisible, s as getAllAgenciesEmail, v as init_timeFilters, x as periodsPerQuarter, y as lastPeriods } from "./aboutTheDataHelper-C-4K4CA_.js";
import { c as getLatestPeriod, d as init_accountHelper, f as require_utc } from "./account-DzCFQMYa.js";
import { n as useLatestAccountData, r as useValidTimeBasedQueryParams, t as init_WithLatestFy } from "./WithLatestFy-BlSLn_6t.js";
import { n as replaceString, t as init_replaceString } from "./replaceString-BjdNP_oA.js";
import { n as init_H2PageHeader, t as H2PageHeader } from "./H2PageHeader-Bpp68zbf.js";
import { _ as init_modals, a as parsePeriods$1, c as CellWithModal, d as init_AboutTheDataModal, g as init_agencyReporting, h as getTotalBudgetaryResources, i as init_AgencyTableMapping, l as init_CellWithModal, m as getSubmissionPublicationDates, n as agenciesTableColumns, o as CoreReportingRow, p as getAgenciesReportingData, s as init_CoreReportingRow, t as require_aboutTheData, u as AboutTheDataModal, v as modalClassNames, y as modalTitles } from "./aboutTheData-Pt47WP_f.js";
import { useCallback, useEffect, useRef, useState } from "react";
import PropTypes, { oneOfType } from "prop-types";
import { isNull, throttle } from "lodash-es";
//#region src/js/components/agencySubmissionStats/DrilldownCell.jsx
var import_jsx_runtime$4, propTypes$1, DrilldownCell;
var init_DrilldownCell = __esmMin((() => {
	init_development();
	init_dist();
	init_replaceString();
	import_jsx_runtime$4 = require_jsx_runtime();
	propTypes$1 = {
		id: PropTypes.string,
		data: oneOfType([PropTypes.string, PropTypes.object]),
		searchTerm: PropTypes.string
	};
	DrilldownCell = ({ data, id, searchTerm }) => /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
		className: "action-cell",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
			className: "action-cell__text",
			children: searchTerm ? replaceString(data, searchTerm, "matched-str") : data
		}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(Link, {
			to: `/submission-statistics/agency/${id}`,
			className: "action-cell__button",
			title: "View all submissions for this agency",
			children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(FontAwesomeIcon, { icon: "angle-double-down" })
		})]
	});
	DrilldownCell.propTypes = propTypes$1;
}));
//#endregion
//#region src/js/redux/actions/agencySubmissionStats/index.js
var setTableData, setTableSort, setTotals, setSearchTerm, setSearchResults;
var init_agencySubmissionStats = __esmMin((() => {
	setTableData = (activeTable, payload, append = false) => {
		if (activeTable === "publications") return {
			type: "SET_ABOUT_THE_DATA_ALL_PUBLICATIONS",
			payload,
			append
		};
		return {
			type: "SET_ABOUT_THE_DATA_ALL_SUBMISSIONS",
			payload,
			append
		};
	};
	setTableSort = (activeTable, field, direction) => {
		if (activeTable === "publications") return {
			type: "SET_ABOUT_THE_DATA_ALL_PUBLICATIONS_SORT",
			payload: [field, direction]
		};
		return {
			type: "SET_ABOUT_THE_DATA_ALL_SUBMISSIONS_SORT",
			payload: [field, direction]
		};
	};
	setTotals = (payload) => ({
		type: "SET_ABOUT_THE_DATA_TOTALS",
		payload
	});
	setSearchTerm = (term) => ({
		type: "SET_ABOUT_THE_DATA_SEARCH_TERM",
		payload: term
	});
	setSearchResults = (results, table = "submissions") => {
		if (table === "submissions") return {
			type: "SET_ABOUT_THE_DATA_SEARCH_RESULTS_SUBMISSIONS",
			payload: results
		};
		return {
			type: "SET_ABOUT_THE_DATA_SEARCH_RESULTS_PUBLICATIONS",
			payload: results
		};
	};
}));
//#endregion
//#region src/js/models/v2/agencySubmissionStats/BaseAgencyRow.js
var BaseAgencyRow;
var init_BaseAgencyRow = __esmMin((() => {
	init_moneyFormatter();
	init_CoreReportingRow();
	BaseAgencyRow = Object.create(CoreReportingRow);
	BaseAgencyRow.populate = function populate(data) {
		this.populateCore(data);
		this.code = data.toptier_code || "";
		this._name = data.agency_name || "";
		this._abbreviation = data.abbreviation || "";
		this.name = this._name && this._abbreviation ? `${this._name} (${this._abbreviation})` : this._name;
		this.certified = data.recent_publication_date_certified || false;
		this._federalTotal = data?.federalTotal?.total_budgetary_resources;
		this.percentageOfTotalFederalBudget = calculatePercentage(this._budgetAuthority, this._federalTotal, "--", 2, { absoluteMin: "< 0.01%" });
	};
}));
//#endregion
//#region src/js/models/v2/agencySubmissionStats/PublicationOverviewRow.js
var dayjs$1, PublicationOverviewRow;
var init_PublicationOverviewRow = __esmMin((() => {
	init_moneyFormatter();
	dayjs$1 = require_dayjs_min();
	PublicationOverviewRow = {
		populate(data, federalTotal) {
			this._name = data.agency_name || "";
			this._abbreviation = data.abbreviation || "";
			this.code = data.toptier_code || "";
			this._budgetAuthority = data.current_total_budget_authority_amount;
			this._federalTotal = federalTotal;
			this.periods = data.periods.map(({ submission_dates: { publication_date: p, certification_date: c }, quarterly: isQuarterly, period }) => {
				if (p === "--") return {
					isQuarterly,
					publicationDate: p,
					certificationDate: c,
					period
				};
				return {
					publicationDate: p ? dayjs$1(p).format("MM/DD/YYYY") : null,
					certificationDate: c ? dayjs$1(c).format("MM/DD/YYYY") : null,
					isQuarterly,
					period
				};
			});
		},
		get name() {
			return this._name && this._abbreviation ? `${this._name} (${this._abbreviation})` : this._name;
		},
		get budgetAuthority() {
			return formatMoney(this._budgetAuthority);
		},
		get discrepancyCount() {
			return formatNumber(this._discrepancyCount);
		},
		get publicationDate() {
			if (this._publicationDate) return dayjs$1(this._publicationDate).format("MM/DD/YYYY");
			return "";
		},
		get total() {
			return formatMoney(this._total);
		},
		get percentageOfTotalFederalBudget() {
			return calculatePercentage(this._budgetAuthority, this._federalTotal, "--", 2, { absoluteMin: "< 0.01%" });
		}
	};
}));
//#endregion
//#region src/js/containers/agencySubmissionStats/AgenciesContainer.jsx
var import_jsx_runtime$3, propTypes, AgenciesContainer;
var init_AgenciesContainer = __esmMin((() => {
	init_index_es();
	init_es();
	init_DrilldownCell();
	init_CellWithModal();
	init_agencySubmissionStats();
	init_agencyReporting();
	init_aboutTheDataHelper();
	init_accountHelper();
	init_BaseAgencyRow();
	init_PublicationOverviewRow();
	init_AgencyTableMapping();
	import_jsx_runtime$3 = require_jsx_runtime();
	propTypes = {
		openModal: PropTypes.func.isRequired,
		activeTab: PropTypes.oneOf(["publications", "submissions"]).isRequired,
		selectedFy: PropTypes.string,
		selectedPeriod: PropTypes.string
	};
	AgenciesContainer = ({ activeTab, openModal, selectedFy, selectedPeriod }) => {
		const { allSubmissions, allPublications, publicationsSort, submissionsSort, federalTotals, submissionPeriods, searchTerm, submissionsSearchResults, publicationsSearchResults } = useSelector((state) => ({
			...state.aboutTheData,
			submissionPeriods: state.account.submissionPeriods
		}));
		const dispatch = useDispatch();
		const publicationsReq = useRef(null);
		const submissionsReq = useRef(null);
		const totalsReq = useRef(null);
		const tableRef = useRef(null);
		const pageRef = useRef({
			publications: null,
			submissions: null
		});
		const { current: { publications: prevPublicationsPg, submissions: prevSubmissionsPg } } = pageRef;
		const [[{ page: submissionsPage, totalItems: totalSubmissionItems, limit: submissionsLimit }, changeSubmissionsPg, changeSubmissionsLimit, changeSubmissionsTotal], [{ page: publicationsPage, totalItems: totalPublicationItems, limit: publicationsLimit }, changePublicationsPg, changePublicationsLimit, changePublicationsTotal]] = [usePagination(), usePagination()];
		const [{ vertical: isVerticalSticky, horizontal: isHorizontalSticky }, setIsSticky] = useState({
			vertical: false,
			horizontal: false
		});
		const [[, areSubmissionsLoading, arePublicationsLoading], setLoading] = useState([
			true,
			true,
			true
		]);
		const [error, setError] = useState(null);
		const verticalStickyClass = isVerticalSticky ? "sticky-y-table" : "";
		const horizontalStickyClass = isHorizontalSticky ? "sticky-x-table" : "";
		const handleScroll = throttle(() => {
			const { scrollLeft: horizontal, scrollTop: vertical } = tableRef.current;
			if (vertical && !isVerticalSticky || !vertical && isVerticalSticky || horizontal && !isHorizontalSticky || !horizontal && isHorizontalSticky) setIsSticky({
				vertical,
				horizontal
			});
		}, 100);
		const handleUpdateSort = (field, direction) => {
			dispatch(setTableSort(activeTab, field, direction));
		};
		const fetchTableData = useCallback((goToFirstPage = false) => {
			if (activeTab === "submissions") {
				const newPage = goToFirstPage ? 1 : submissionsPage;
				if (!isPeriodSelectable(submissionPeriods.toJS().filter(({ submission_fiscal_year: y }) => `${y}` === selectedFy), selectedPeriod)) return Promise.resolve();
				setLoading([
					false,
					true,
					false
				]);
				submissionsReq.current = getAgenciesReportingData(selectedFy, selectedPeriod, submissionsSort[0], submissionsSort[1], newPage, submissionsLimit, searchTerm);
				return submissionsReq.current.promise.then(({ data: { results, page_metadata: { total: totalItems } } }) => {
					const parsedResults = results.map((d) => {
						const row = Object.create(BaseAgencyRow);
						const federalTotal = federalTotals.find(({ fiscal_year: y, fiscal_period: p }) => y === parseInt(selectedFy, 10) && p === parseInt(selectedPeriod, 10));
						row.populate({
							...d,
							federalTotal
						});
						return row;
					});
					if (searchTerm) dispatch(setSearchResults(parsedResults, activeTab));
					else dispatch(setTableData(activeTab, parsedResults));
					changeSubmissionsTotal(totalItems);
					setLoading([
						false,
						false,
						false
					]);
					setError(false);
				}).catch((e) => {
					console.error("Error: ", e);
					setLoading([
						false,
						false,
						false
					]);
					setError(true);
				});
			}
			const newPage = goToFirstPage ? 1 : publicationsPage;
			setLoading([
				false,
				false,
				true
			]);
			const latestPeriod = getLatestPeriod(submissionPeriods.toJS(), selectedFy);
			const federalTotal = getFederalBudget(federalTotals, latestPeriod);
			publicationsReq.current = getSubmissionPublicationDates(selectedFy, publicationsSort[0], publicationsSort[1], newPage, publicationsLimit, searchTerm);
			return publicationsReq.current.promise.then(({ data: { results, page_metadata: { total: totalItems } } }) => {
				const parsedResults = results.map((d) => {
					const row = Object.create(PublicationOverviewRow);
					row.populate(d, federalTotal);
					return row;
				});
				changePublicationsTotal(totalItems);
				if (searchTerm) dispatch(setSearchResults(parsedResults, activeTab));
				else dispatch(setTableData(activeTab, parsedResults));
				setLoading([
					false,
					false,
					false
				]);
				setError(false);
				publicationsReq.current = null;
			}).catch((e) => {
				console.error("Error: ", e);
				setLoading([
					false,
					false,
					false
				]);
				setError(true);
				publicationsReq.current = null;
			});
		});
		const fetchTotals = useCallback(() => {
			if (selectedFy && selectedPeriod && !federalTotals.length) {
				if (totalsReq.current) totalsReq.current.cancel();
				if (submissionsReq.current) submissionsReq.current.cancel();
				setLoading([
					true,
					areSubmissionsLoading,
					arePublicationsLoading
				]);
				totalsReq.current = getTotalBudgetaryResources();
				return totalsReq.current.promise.then(({ data: { results } }) => {
					dispatch(setTotals(results));
					totalsReq.current = null;
					return results;
				}).catch((e) => {
					console.error("Error: ", e);
					setLoading([
						false,
						false,
						false
					]);
					setError(true);
					totalsReq.current = null;
					return [];
				});
			}
			return Promise.resolve([]);
		});
		const renderDates = (results = []) => results.map(({ name, code, percentageOfTotalFederalBudget, periods }) => [
			/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(DrilldownCell, {
				data: name,
				id: code,
				searchTerm
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
				className: "generic-cell-content",
				children: percentageOfTotalFederalBudget
			}),
			...parsePeriods$1(periods)
		]);
		const renderDetails = (results = []) => results.map(({ name: agencyName, code, _mostRecentPublicationDate, mostRecentPublicationDate, _discrepancyCount, discrepancyCount: GtasNotInFileA, _obligationDifference, obligationDifference, _gtasObligationTotal, percentageOfTotalFederalBudget, _unlinkedContracts, unlinkedContracts, _unlinkedAssistance, unlinkedAssistance }) => [
			/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(DrilldownCell, {
				data: agencyName,
				id: code,
				searchTerm
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
				className: "generic-cell-content",
				children: percentageOfTotalFederalBudget
			}),
			!_mostRecentPublicationDate ? /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
				className: "generic-cell-content",
				children: mostRecentPublicationDate
			}) : /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(CellWithModal, {
				data: mostRecentPublicationDate,
				openModal,
				modalType: "publicationDates",
				agencyData: {
					agencyName,
					agencyCode: code,
					fiscalYear: selectedFy,
					fiscalPeriod: selectedPeriod?.id
				}
			}),
			isNull(_discrepancyCount) ? /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
				className: "generic-cell-content",
				children: GtasNotInFileA
			}) : /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(CellWithModal, {
				data: GtasNotInFileA,
				openModal,
				modalType: "missingAccountBalance",
				agencyData: {
					agencyName,
					gtasObligationTotal: _gtasObligationTotal,
					agencyCode: code,
					fiscalYear: selectedFy,
					fiscalPeriod: selectedPeriod?.id
				}
			}),
			isNull(_obligationDifference) ? /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
				className: "generic-cell-content",
				children: obligationDifference
			}) : /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(CellWithModal, {
				data: obligationDifference,
				openModal,
				modalType: "reportingDifferences",
				agencyData: {
					agencyName,
					agencyCode: code,
					fiscalYear: selectedFy,
					fiscalPeriod: selectedPeriod?.id
				}
			}),
			isNull(_unlinkedContracts) ? /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
				className: "generic-cell-content",
				children: unlinkedContracts
			}) : /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(CellWithModal, {
				data: unlinkedContracts,
				openModal,
				modalType: "unlinkedData",
				agencyData: {
					agencyName,
					agencyCode: code,
					fiscalYear: selectedFy,
					fiscalPeriod: selectedPeriod?.id,
					type: "Contract"
				}
			}),
			isNull(_unlinkedAssistance) ? /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
				className: "generic-cell-content",
				children: unlinkedAssistance
			}) : /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(CellWithModal, {
				data: unlinkedAssistance,
				openModal,
				modalType: "unlinkedData",
				agencyData: {
					agencyName,
					agencyCode: code,
					fiscalYear: selectedFy,
					fiscalPeriod: selectedPeriod?.id,
					type: "Assistance"
				}
			})
		]);
		const handlePageChange = (page) => {
			if (activeTab === "submissions") changeSubmissionsPg(page);
			else changePublicationsPg(page);
		};
		const handleLimitChange = (limit) => {
			if (activeTab === "submissions") changeSubmissionsLimit(limit);
			else changePublicationsLimit(limit);
		};
		useEffect(() => {
			pageRef.current = {
				publications: publicationsPage,
				submissions: submissionsPage
			};
		}, [submissionsPage, publicationsPage]);
		useEffect(() => () => {
			if (publicationsReq.current) publicationsReq.current.cancel();
			if (submissionsReq.current) submissionsReq.current.cancel();
			if (totalsReq.current) totalsReq.current.cancel();
			dispatch(setSearchTerm(""));
		}, []);
		useEffect(() => {
			if (selectedFy && selectedPeriod) fetchTableData();
		}, [
			activeTab,
			submissionsPage,
			publicationsPage
		]);
		useEffect(() => {
			const shouldResetPg = prevSubmissionsPg && prevPublicationsPg && selectedFy && selectedPeriod;
			if (selectedFy && selectedPeriod && !federalTotals.length) fetchTotals();
			else if (activeTab === "submissions" && submissionsPage === 1 && shouldResetPg) fetchTableData(true);
			else if (activeTab === "submissions" && shouldResetPg) changeSubmissionsPg(1);
			else if (activeTab === "publications" && publicationsPage === 1 && shouldResetPg) fetchTableData(true);
			else if (activeTab === "publications" && shouldResetPg) changePublicationsPg(1);
		}, [
			federalTotals,
			selectedFy,
			selectedPeriod,
			submissionsSort,
			submissionsLimit,
			publicationsSort,
			publicationsLimit,
			searchTerm
		]);
		return /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)(import_jsx_runtime$3.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
			className: `table-container table-container_${activeTab}`,
			ref: tableRef,
			onScroll: handleScroll,
			children: [activeTab === "submissions" && /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(ss, {
				rows: searchTerm ? renderDetails(submissionsSearchResults) : renderDetails(allSubmissions),
				classNames: `${verticalStickyClass} ${horizontalStickyClass} ${areSubmissionsLoading ? "table-loading" : ""}`,
				columns: agenciesTableColumns[activeTab],
				updateSort: handleUpdateSort,
				currentSort: {
					field: submissionsSort[0],
					direction: submissionsSort[1]
				},
				error,
				loading: areSubmissionsLoading
			}), activeTab === "publications" && /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(ss, {
				rows: searchTerm ? renderDates(publicationsSearchResults, selectedFy) : renderDates(allPublications, selectedFy),
				classNames: `${verticalStickyClass} ${horizontalStickyClass} ${arePublicationsLoading ? "table-loading" : ""}`,
				columns: agenciesTableColumns[activeTab](selectedFy),
				updateSort: handleUpdateSort,
				currentSort: {
					field: publicationsSort[0],
					direction: publicationsSort[1]
				},
				error,
				loading: arePublicationsLoading
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Ka, {
			resultsText: true,
			limitSelector: true,
			changeLimit: handleLimitChange,
			changePage: handlePageChange,
			currentPage: activeTab === "submissions" ? submissionsPage : publicationsPage,
			pageSize: activeTab === "submissions" ? submissionsLimit : publicationsLimit,
			totalItems: activeTab === "submissions" ? totalSubmissionItems : totalPublicationItems
		})] });
	};
	AgenciesContainer.propTypes = propTypes;
}));
//#endregion
//#region src/js/components/agencySubmissionStats/PeriodComponent.jsx
var import_jsx_runtime$2, PeriodComponent;
var init_PeriodComponent = __esmMin((() => {
	import_jsx_runtime$2 = require_jsx_runtime();
	PeriodComponent = ({ title, classNames, isEnabled = true }) => {
		const isLastPeriod = title.includes("Q");
		const classNamesWithState = isEnabled ? classNames.join(" ") : classNames.concat(["disabled"]).join(" ");
		if (isLastPeriod) {
			const quarterAndTitle = title.split(" ");
			return /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
				className: classNamesWithState,
				children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", { children: quarterAndTitle[0] }), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", { children: quarterAndTitle[1] })]
			});
		}
		return /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
			className: classNamesWithState,
			children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", { children: title })
		});
	};
	PeriodComponent.propTypes = {
		title: PropTypes.string.isRequired,
		classNames: PropTypes.arrayOf(PropTypes.string),
		isEnabled: PropTypes.bool
	};
}));
//#endregion
//#region src/js/components/agencySubmissionStats/TimeFilters.jsx
var import_immutable, import_jsx_runtime$1, dayjs, utc, isSameOrBefore, sortPeriods, parsePeriods, TimePeriodFilters;
var init_TimeFilters = __esmMin((() => {
	init_es();
	init_index_es();
	init_dist();
	import_immutable = /* @__PURE__ */ __toESM(require_immutable(), 1);
	init_fiscalYearHelper();
	init_aboutTheDataHelper();
	init_agencySubmissionStats();
	init_timeFilters();
	init_PeriodComponent();
	import_jsx_runtime$1 = require_jsx_runtime();
	dayjs = require_dayjs_min();
	utc = require_utc();
	isSameOrBefore = require_isSameOrBefore();
	dayjs.extend(isSameOrBefore);
	dayjs.extend(utc);
	sortPeriods = ({ type: a }, { type: b }) => {
		if (!a || !b) return 0;
		if (a.includes("quarter-selected")) return -1;
		if (b.includes("quarter-selected")) return 1;
		return 0;
	};
	parsePeriods = (year, periods) => {
		const allPeriodsAvailableInFy = periods.filter((p) => p.submission_fiscal_year === parseInt(year, 10)).filter((p) => dayjs.utc(p.submission_reveal_date).isSameOrBefore(dayjs()));
		return periodsPerQuarter.reduce((acc, periodsInQuarter) => acc.concat(periodsInQuarter.map((period, i, src) => {
			const isIndividuallySelectablePeriod = isPeriodSelectable(allPeriodsAvailableInFy, period.id);
			const isPeriodVisibleViaQuarterSelection = isPeriodVisible(allPeriodsAvailableInFy, period.id);
			const isEnabled = isPeriodVisibleViaQuarterSelection && (lastPeriods.includes(period.id) || isIndividuallySelectablePeriod);
			const classNames = src.length - 1 === i ? [
				"period",
				"last",
				cssOrderClassByPeriodId[period.id]
			] : ["period", cssOrderClassByPeriodId[period.id]];
			if (!isIndividuallySelectablePeriod && isPeriodVisibleViaQuarterSelection) classNames.push(`not-individually-selectable-p${period.id}`);
			else if (parseInt(year, 10) === 2020 && parseInt(period.id, 10) <= 6 && isEnabled) classNames.push(`quarter-selected-${period.id}`);
			else if (parseInt(year, 10) < 2020 && isEnabled) classNames.push(`quarter-selected-${period.id}`);
			return {
				...period,
				type: classNames[classNames.length - 1],
				classNames: classNames.join(" "),
				isEnabled,
				component: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(PeriodComponent, {
					isEnabled,
					classNames: i === 0 ? classNames.concat(["first"]) : classNames,
					title: period.title
				})
			};
		})), []);
	};
	TimePeriodFilters = ({ activeTab, selectedPeriod, selectedFy, onTimeFilterSelection, submissionPeriods, latestFy }) => {
		const dispatch = useDispatch();
		const handleTimeChange = (fy, period = null) => {
			if (period) onTimeFilterSelection({
				fy,
				period
			});
			else onTimeFilterSelection({ fy });
		};
		const generatePeriodDropdown = (fy, periods) => parsePeriods(fy, periods.toJS()).map((p) => ({
			...p,
			component: p.component,
			value: `${p.id}`,
			isEnabled: p.isEnabled,
			onClick: p.isEnabled ? (period) => handleTimeChange(selectedFy, period) : () => null
		}));
		const handleSearch = (term) => {
			dispatch(setSearchTerm(term));
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
			className: "table-controls__time-and-search",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
					className: "filter-container fy-picker",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
						className: "filter__title fy-picker__title",
						children: "FISCAL YEAR"
					}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Xa, {
						backgroundColor: "#ffffff",
						icon: "",
						isFixedWidth: true,
						className: "fy-picker",
						sortFn: sortPeriods,
						selectedOption: selectedFy ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("span", { children: ["FY ", selectedFy] }) : /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
							"data-testid": "fy-loading",
							className: "fy-loading",
							children: ["FY ", /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(FontAwesomeIcon, {
								icon: "spinner",
								size: "sm",
								alt: "FY Loading ...",
								spin: true
							})]
						}),
						options: latestFy ? allFiscalYears(2017, latestFy).map((year) => ({
							name: `FY ${year}`,
							value: `${year}`,
							onClick: handleTimeChange
						})) : [{
							name: "Loading fiscal years...",
							value: null,
							onClick: () => {}
						}]
					})]
				}),
				activeTab === "submissions" && /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
					className: "filter-container period-picker",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
						className: "filter__title period-picker__title",
						children: "PERIOD"
					}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Xa, {
						backgroundColor: "#ffffff",
						icon: "",
						className: "period-picker",
						sortFn: sortPeriods,
						selectedOption: selectedPeriod ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", { children: selectedPeriod.title }) : /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
							className: "period-loading",
							children: ["P ", /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(FontAwesomeIcon, {
								icon: "spinner",
								size: "sm",
								alt: "Toggle menu",
								spin: true
							})]
						}),
						options: generatePeriodDropdown(selectedFy, submissionPeriods)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
					className: "filter-container",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
						className: "filter__title search-bar",
						children: "AGENCY NAME"
					}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(so, { onSearch: handleSearch })]
				})
			]
		});
	};
	TimePeriodFilters.propTypes = {
		selectedPeriod: PropTypes.shape({
			id: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
			className: PropTypes.string
		}),
		latestPeriod: PropTypes.number,
		latestFy: PropTypes.number,
		selectedFy: PropTypes.string,
		urlPeriod: PropTypes.string,
		urlFy: PropTypes.string,
		activeTab: PropTypes.string.isRequired,
		onTimeFilterSelection: PropTypes.func,
		submissionPeriods: PropTypes.instanceOf(import_immutable.List),
		dataAsOf: PropTypes.object
	};
}));
//#endregion
//#region src/js/components/agencySubmissionStats/AboutTheDataPage.jsx
/**
* AboutTheDataPage.jsx
* Created by Lizzie Salita 11/25/20
*/
var import_jsx_runtime, AboutTheDataPage;
//#endregion
__esmMin((() => {
	init_index_es();
	init_es();
	init_development();
	init_aboutTheDataHelper();
	init_socialShare();
	init_AboutTheDataModal();
	init_Loading();
	init_PageWrapper();
	init_ShareIcon508();
	init_AgenciesContainer();
	init_WithLatestFy();
	init_queryParams();
	init_modals();
	init_TimeFilters();
	init_modalActions();
	init_useQueryParams();
	init_H2PageHeader();
	import_jsx_runtime = require_jsx_runtime();
	require_aboutTheData();
	AboutTheDataPage = () => {
		const { search } = useLocation();
		const navigate = useNavigate();
		const params = useQueryParams();
		const { fy: urlFy, period: urlPeriod, tab: activeTab } = params;
		const [, submissionPeriods, { year: latestFy, period: latestPeriod }] = useLatestAccountData();
		const [selectedFy, selectedPeriod, setTime] = useValidTimeBasedQueryParams(urlFy, urlPeriod);
		const [showModalLocal, setShowModalLocal] = useState("");
		const [modalData, setModalData] = useState(null);
		const dispatch = useDispatch();
		const handleShareDispatch = (url) => {
			dispatch(showModal(url));
		};
		useEffect(() => {
			if (!activeTab) {
				const paramsWithTab = combineQueryParams(params, { tab: "submissions" });
				navigate({
					pathname: ``,
					search: `${getQueryParamString(paramsWithTab)}`
				}, { replace: true });
			}
		}, [
			activeTab,
			navigate,
			params
		]);
		const modalClick = (modalType, agencyData) => {
			setModalData(agencyData);
			setShowModalLocal(modalType);
		};
		const closeModal = () => {
			setShowModalLocal("");
			setModalData(null);
		};
		const handleSwitchTab = (tab) => {
			navigate({ search: `?${new URLSearchParams({
				fy: urlFy,
				period: urlPeriod,
				tab
			}).toString()}` });
		};
		const slug = `submission-statistics/${search}`;
		const handleShare = (name) => {
			handleShareOptionClick(name, slug, getAllAgenciesEmail(urlFy, urlPeriod, activeTab), handleShareDispatch);
		};
		const subtitle = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "sub-header",
				children: "In accordance with the 2014 DATA Act, federal agencies submit financial data on a quarterly and/or monthly basis to USAspending.gov. The table below shows information about the status and content of these submissions. It will be updated as agencies publish/certify new submissions or republish/recertify existing submissions."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "sub-header",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "sub-header-span",
					children: "Statistics by Submission Period "
				}), "- Please note that if you select the first or second period of a quarter, you will only see data from agencies that upload monthly. Only by selecting the last period of each quarter (i.e., P03, P06, P09, P12) will you see data for all agencies, including quarterly-submitting agencies."]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "sub-header",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "sub-header-span",
					children: "Updates by Fiscal Year "
				}), "- The columns for the last period of each quarter (i.e., P03, P06, P09, P12) do show data for all agencies."]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "sub-header",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "sub-header-span",
					children: "Please Note: "
				}), "Fiscal years start in October (Period 1), and starting in FY 2022 (i.e., October 2021), all agencies will report monthly data to USAspending.gov."]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "sub-header",
				children: ["For more information about the data in this table, visit", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					className: "sub-header-link",
					to: "/submission-statistics/data-sources",
					children: " the Data Sources and Methodology page."
				})]
			})
		] });
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageWrapper, {
			pageName: "Agency Submission Statistics",
			classNames: "about-the-data about-the-data_agencies-page",
			title: "Agency Submission Statistics",
			toolBarComponents: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareIcon508, {
				url: getBaseUrl(slug),
				onShareOptionClick: handleShare
			})],
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				id: "main-content",
				className: "main-content",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Qs, {
					className: "agency-submission-stat-row",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)($s, {
						width: 12,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2PageHeader, {
							title: "About These Statistics",
							subtitle,
							className: "heading-container"
						})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Qs, {
					className: "agency-submission-stat-row",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)($s, {
						width: 12,
						className: "agency-submission-stat-col",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingWrapper, {
							isLoading: !activeTab,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "table-controls",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(vs, {
										active: activeTab,
										switchTab: handleSwitchTab,
										types: [{
											internal: "submissions",
											label: "Statistics by Submission Period"
										}, {
											internal: "publications",
											label: "Updates by Fiscal Year"
										}]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimePeriodFilters, {
										submissionPeriods,
										latestFy,
										latestPeriod,
										activeTab,
										onTimeFilterSelection: setTime,
										selectedPeriod,
										selectedFy,
										urlPeriod,
										urlFy
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgenciesContainer, {
									openModal: modalClick,
									activeTab,
									selectedFy,
									selectedPeriod: selectedPeriod ? selectedPeriod.id : ""
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AboutTheDataModal, {
									id: "usa-dt-modal__agency-submission-statistics",
									mounted: !!showModalLocal.length,
									type: showModalLocal,
									className: modalClassNames[showModalLocal],
									title: modalTitles(modalData?.type)[showModalLocal],
									agencyData: {
										...modalData,
										fiscalYear: parseInt(selectedFy, 10),
										fiscalPeriod: parseInt(selectedPeriod?.id, 10) || 0
									},
									closeModal
								})
							] })
						})
					})
				})]
			})
		});
	};
}))();
export { AboutTheDataPage as default };
