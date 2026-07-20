import { n as __esmMin } from "./rolldown-runtime-D1cXj70v.js";
import { Er as Wo, Ha as Link, Hn as isCancel, Ii as init_moneyFormatter, Ja as useParams, Kr as FontAwesomeIcon, Mr as fo, Nr as init_index_es, Pi as formatNumberWithPrecision, Va as init_development, Vn as init_axios, Vr as ss, cr as init_socialShare, fn as init_modalActions, go as require_jsx_runtime, gr as $s, no as init_es, oo as useDispatch, or as getBaseUrl, pn as showModal, qr as init_dist, sr as handleShareOptionClick, wr as Qs, xr as Ka } from "./index.js-Dk2VDaPz.js";
import { D as init_metaTagHelper, l as agencyPageMetaTags } from "./HeaderContainer-CiRwnRgy.js";
import { n as init_PageWrapper, t as PageWrapper } from "./PageWrapper-Dqa3KwTb.js";
import { n as init_ShareIcon508, t as ShareIcon508 } from "./ShareIcon508-QphjVgqd.js";
import { d as init_aboutTheDataHelper, o as getAgencyDetailEmail, u as getPeriodWithTitleById } from "./aboutTheDataHelper-C-4K4CA_.js";
import { _ as init_modals, c as CellWithModal, d as init_AboutTheDataModal, f as fetchAgency, g as init_agencyReporting, i as init_AgencyTableMapping, l as init_CellWithModal, o as CoreReportingRow, r as agencyDetailsColumns, s as init_CoreReportingRow, t as require_aboutTheData, u as AboutTheDataModal, v as modalClassNames, y as modalTitles } from "./aboutTheData-Pt47WP_f.js";
import { M as init_agency, n as useAgencySlugs, t as init_useAgencySlugs, x as fetchAgencyOverview } from "./useAgencySlugs-BEIzOo-6.js";
import { r as init_Note, t as Note } from "./Note-B_ZkRToa.js";
import { n as init_BaseAgencyOverview, t as BaseAgencyOverview } from "./BaseAgencyOverview-55ClLqcf.js";
import { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { isNull, throttle } from "lodash-es";
//#region src/js/models/v2/agencySubmissionStats/BaseReportingPeriodRow.js
/**
* BaseReportingPeriodRow.js
* Created by Lizzie Salita 12/8/20
*/
var BaseReportingPeriodRow;
var init_BaseReportingPeriodRow = __esmMin((() => {
	init_moneyFormatter();
	init_aboutTheDataHelper();
	init_CoreReportingRow();
	BaseReportingPeriodRow = Object.create(CoreReportingRow);
	BaseReportingPeriodRow.populate = function populate(data) {
		this.populateCore(data);
		this.fiscalYear = parseInt(data.fiscal_year, 10) || 0;
		this.fiscalPeriod = parseInt(data.fiscal_period, 10) || 0;
		this.reportingPeriod = `FY ${this.fiscalYear}: ${getPeriodWithTitleById(`${this.fiscalPeriod}`).title}`;
		this._percentOfBudget = data.percent_of_total_budgetary_resources;
		this.percentOfBudget = isNull(this._percentOfBudget) ? "--" : `${formatNumberWithPrecision(this._percentOfBudget, 2)}%`;
	};
}));
//#endregion
//#region src/js/containers/agencySubmissionStats/AgencyDetailsContainer.jsx
/**
* AgencyDetailsContainer.jsx
*/
var import_jsx_runtime$2, propTypes, AgencyDetailsContainer;
var init_AgencyDetailsContainer = __esmMin((() => {
	init_axios();
	init_index_es();
	init_agencyReporting();
	init_BaseReportingPeriodRow();
	init_CellWithModal();
	init_AgencyTableMapping();
	import_jsx_runtime$2 = require_jsx_runtime();
	propTypes = {
		agencyName: PropTypes.string,
		modalClick: PropTypes.func,
		agencyCode: PropTypes.string
	};
	AgencyDetailsContainer = ({ modalClick, agencyName, agencyCode }) => {
		const [sortStatus, updateSort] = useState({
			field: "fiscal_year",
			direction: "desc"
		});
		const [{ vertical: isVertialSticky, horizontal: isHorizontalSticky }, setIsSticky] = useState({
			vertical: false,
			horizontal: false
		});
		const [rows, setRows] = useState([]);
		const [loading, setLoading] = useState(true);
		const [error, setError] = useState(false);
		const [errorMessage, setErrorMessage] = useState("");
		const [currentPage, changeCurrentPage] = useState(1);
		const [pageSize, changePageSize] = useState(10);
		const [totalItems, setTotalItems] = useState(0);
		const tableRef = useRef(null);
		const tableRequest = useRef(null);
		const prevPageRef = useRef(null);
		const { current: prevPage } = prevPageRef;
		const handleScroll = throttle(() => {
			const { scrollLeft: horizontal, scrollTop: vertical } = tableRef.current;
			setIsSticky({
				vertical,
				horizontal
			});
		}, 100);
		const handleUpdateSort = (field, direction) => {
			updateSort({
				field,
				direction
			});
		};
		const verticalStickyClass = isVertialSticky ? "sticky-y-table" : "";
		const horizontalStickyClass = isHorizontalSticky ? "sticky-x-table" : "";
		const parseRows = (results) => results.map((row) => {
			const rowData = Object.create(BaseReportingPeriodRow);
			rowData.populate(row);
			return [
				/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
					className: "generic-cell-content",
					children: rowData.reportingPeriod
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
					className: "generic-cell-content",
					children: rowData.percentOfBudget
				}),
				!rowData._mostRecentPublicationDate ? /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
					className: "generic-cell-content",
					children: rowData.mostRecentPublicationDate
				}) : /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(CellWithModal, {
					data: rowData.mostRecentPublicationDate,
					openModal: modalClick,
					modalType: "publicationDates",
					agencyData: {
						fiscalYear: rowData.fiscalYear,
						fiscalPeriod: rowData.fiscalPeriod,
						agencyName,
						agencyCode
					}
				}),
				isNull(rowData._discrepancyCount) ? /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
					className: "generic-cell-content",
					children: rowData.discrepancyCount
				}) : /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(CellWithModal, {
					data: rowData.discrepancyCount,
					openModal: modalClick,
					modalType: "missingAccountBalance",
					agencyData: {
						fiscalYear: rowData.fiscalYear,
						fiscalPeriod: rowData.fiscalPeriod,
						agencyName,
						agencyCode,
						gtasObligationTotal: rowData._gtasObligationTotal
					}
				}),
				isNull(rowData._obligationDifference) ? /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
					className: "generic-cell-content",
					children: rowData.obligationDifference
				}) : /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(CellWithModal, {
					data: rowData.obligationDifference,
					openModal: modalClick,
					modalType: "reportingDifferences",
					agencyData: {
						fiscalYear: rowData.fiscalYear,
						fiscalPeriod: rowData.fiscalPeriod,
						agencyName,
						agencyCode
					}
				}),
				isNull(rowData._unlinkedContracts) ? /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
					className: "generic-cell-content",
					children: rowData.unlinkedContracts
				}) : /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(CellWithModal, {
					data: rowData.unlinkedContracts,
					openModal: modalClick,
					modalType: "unlinkedData",
					agencyData: {
						agencyName,
						agencyCode,
						fiscalYear: rowData.fiscalYear,
						fiscalPeriod: rowData.fiscalPeriod,
						type: "Contract"
					}
				}),
				isNull(rowData._unlinkedAssistance) ? /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
					className: "generic-cell-content",
					children: rowData.unlinkedAssistance
				}) : /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(CellWithModal, {
					data: rowData.unlinkedAssistance,
					openModal: modalClick,
					modalType: "unlinkedData",
					agencyData: {
						agencyName,
						agencyCode,
						fiscalYear: rowData.fiscalYear,
						fiscalPeriod: rowData.fiscalPeriod,
						type: "Assistance"
					}
				})
			];
		});
		const fetchTableData = useCallback(() => {
			if (tableRequest.current) tableRequest.current.cancel();
			setError(false);
			setLoading(true);
			const params = {
				limit: pageSize,
				page: currentPage,
				sort: sortStatus.field,
				order: sortStatus.direction
			};
			tableRequest.current = fetchAgency(agencyCode, params);
			tableRequest.current.promise.then((res) => {
				setRows(parseRows(res.data.results));
				setTotalItems(res.data.page_metadata.total);
				setLoading(false);
			}).catch((err) => {
				if (!isCancel(err)) {
					setError(true);
					setErrorMessage(err);
					setLoading(false);
					tableRequest.current = null;
					console.error(err);
				}
			});
		});
		useEffect(() => {
			prevPageRef.current = currentPage;
		}, [currentPage]);
		useEffect(() => {
			if (currentPage === 1 && !prevPage) fetchTableData();
			else if (currentPage === 1 && currentPage === prevPage) fetchTableData();
			else if (currentPage !== 1 && currentPage === prevPage) changeCurrentPage(1);
		}, [
			currentPage,
			agencyCode,
			sortStatus,
			pageSize
		]);
		useEffect(() => {
			if (prevPage !== currentPage && prevPage) fetchTableData();
		}, [currentPage]);
		return /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)(import_jsx_runtime$2.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
			className: "table-container",
			ref: tableRef,
			onScroll: handleScroll,
			children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(ss, {
				rows,
				classNames: `${verticalStickyClass} ${horizontalStickyClass}`,
				columns: agencyDetailsColumns,
				updateSort: handleUpdateSort,
				currentSort: sortStatus,
				loading,
				error,
				errorMessage
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Ka, {
			currentPage,
			changePage: changeCurrentPage,
			changeLimit: changePageSize,
			limitSelector: true,
			resultsText: true,
			pageSize,
			totalItems
		})] });
	};
	AgencyDetailsContainer.propTypes = propTypes;
}));
//#endregion
//#region src/js/components/agencySubmissionStats/componentMapping/agencyNotes.jsx
var import_jsx_runtime$1, opicNote, agencyNotes;
var init_agencyNotes = __esmMin((() => {
	import_jsx_runtime$1 = require_jsx_runtime();
	opicNote = /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)(import_jsx_runtime$1.Fragment, { children: [
		"On January 2nd, 2020, OPIC was replaced by DFC (source:\xA0",
		/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("a", {
			target: "_blank",
			rel: "noopener noreferrer",
			href: "https://www.dfc.gov/media/press-releases/us-international-development-finance-corporation-begins-operations",
			children: "https://www.dfc.gov/media/press-releases/us-international-development-finance-corporation-begins-operations"
		}),
		"). In addition to absorbing OPIC, DFC also combined aspects of USAID,  including chiefly its Development Credit Authority (DCA) (source:\xA0",
		/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("a", {
			target: "_blank",
			rel: "noopener noreferrer",
			href: "https://www.congress.gov/115/plaws/publ254/PLAW-115publ254.pdf",
			children: "https://www.congress.gov/115/plaws/publ254/PLAW-115publ254.pdf"
		}),
		"\xA0pg 29). For DATA Act reporting purposes, DFC continued to report as OPIC until its last submission in FY20Q4, and began to include the full set of DFC TAS in FY20Q3. DFC's first submission as DFC was in FY21Q1."
	] });
	agencyNotes = {
		"097": "Department of Defense procurement data is subject to a 90 day delay.",
		"071": opicNote,
		"077": opicNote,
		519: "The Vietnam education foundation shut down in 2018. Its last DATA Act submission was in FY18Q4."
	};
}));
//#endregion
//#region src/js/components/agencySubmissionStats/AgencyDetailsPage.jsx
/**
* AgencyDetailsPage.jsx
*/
var import_jsx_runtime, AgencyDetailsPage;
//#endregion
__esmMin((() => {
	init_development();
	init_dist();
	init_index_es();
	init_es();
	init_agency();
	init_metaTagHelper();
	init_aboutTheDataHelper();
	init_socialShare();
	init_Note();
	init_PageWrapper();
	init_ShareIcon508();
	init_AgencyDetailsContainer();
	init_modals();
	init_BaseAgencyOverview();
	init_agencyNotes();
	init_AboutTheDataModal();
	init_modalActions();
	init_useAgencySlugs();
	import_jsx_runtime = require_jsx_runtime();
	require_aboutTheData();
	AgencyDetailsPage = () => {
		const { agencyCode } = useParams();
		const [, topTierCodes] = useAgencySlugs();
		const [loading, setLoading] = useState(true);
		const [error, setError] = useState(false);
		const [errorMessage, setErrorMessage] = useState("");
		const [agencyOverview, setAgencyOverview] = useState(null);
		const [showModalLocal, setShowModal] = useState("");
		const [modalData, setModalData] = useState(null);
		const overviewRequest = useRef(null);
		const dispatch = useDispatch();
		const handleShareDispatch = (url) => {
			dispatch(showModal(url));
		};
		let slug = "";
		if (agencyOverview && agencyOverview.toptierCode) slug = topTierCodes[agencyOverview.toptierCode];
		const modalClick = (modalType, agencyData) => {
			setModalData(agencyData);
			setShowModal(modalType);
		};
		const closeModal = () => {
			setShowModal("");
			setModalData(null);
		};
		const getOverviewData = async () => {
			if (!loading) setLoading(true);
			if (error) {
				setError(false);
				setErrorMessage("");
			}
			if (overviewRequest.current) overviewRequest.current.cancel();
			try {
				overviewRequest.current = fetchAgencyOverview(agencyCode);
				const { data } = await overviewRequest.current.promise;
				const agency = Object.create(BaseAgencyOverview);
				agency.populate(data);
				setAgencyOverview(agency);
				setLoading(false);
				overviewRequest.current = null;
			} catch (err) {
				console.error(err);
				setError(true);
				setErrorMessage(err.message);
				setLoading(false);
				overviewRequest.current = null;
			}
		};
		useEffect(() => {
			if (overviewRequest.current) overviewRequest.current.cancel();
		}, []);
		useEffect(() => {
			getOverviewData();
		}, [agencyCode]);
		const message = agencyNotes[agencyCode] || "";
		const handleShare = (name) => {
			handleShareOptionClick(name, `submission-statistics/agency/${agencyCode}`, getAgencyDetailEmail(agencyOverview?.name, agencyCode), handleShareDispatch);
		};
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageWrapper, {
			pageName: "Agency Profile",
			classNames: "about-the-data about-the-data_agency-details-page",
			metaTagProps: agencyOverview ? agencyPageMetaTags(agencyOverview) : {},
			overLine: "Agency Profile",
			title: agencyOverview?.name,
			toolBarComponents: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareIcon508, {
				url: getBaseUrl(`submission-statistics/agency/${agencyCode}`),
				onShareOptionClick: handleShare
			})],
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				id: "main-content",
				className: "main-content",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Qs, {
					className: "agency-submission-stat-row",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)($s, {
						className: "agency-submission-stat-col",
						children: [
							loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wo, {}),
							error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(fo, { description: errorMessage }),
							!loading && !error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "heading-container",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "back-link",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
												to: {
													pathname: "/submission-statistics",
													search: `?${new URLSearchParams({ tab: "submissions" }).toString()}`
												},
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FontAwesomeIcon, { icon: "angle-left" }), "\xA0Back to All Agencies"]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
											className: "header",
											children: agencyOverview?.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "agency-info",
											children: [agencyOverview?.website && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "agency-info__group",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", { children: "Agency Contact Information" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "more-info-note",
														children: "Contact this Agency with questions about their submissions"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "agency-info__website",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
															target: "_blank",
															rel: "noopener noreferrer",
															href: agencyOverview.website,
															children: agencyOverview.website
														})
													})
												]
											}), agencyOverview?.id && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "agency-info__group",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", { children: "Agency Profile Page" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "more-info-note",
														children: "Learn more about this Agency's spending"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "agency-info__website",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
															to: `/agency/${slug}`,
															children: agencyOverview.name
														})
													})
												]
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgencyDetailsContainer, {
									agencyName: agencyOverview?.name,
									modalClick,
									agencyCode
								}),
								message && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Note, { message })
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AboutTheDataModal, {
								id: "usa-dt-modal__agency-submission-statistics",
								mounted: !!showModalLocal.length,
								type: showModalLocal,
								className: modalClassNames[showModalLocal],
								title: modalTitles(modalData?.type)[showModalLocal],
								agencyData: modalData,
								closeModal
							})
						]
					})
				})
			})
		});
	};
}))();
export { AgencyDetailsPage as default };
