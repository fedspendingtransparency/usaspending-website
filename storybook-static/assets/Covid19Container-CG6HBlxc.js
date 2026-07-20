import { n as __esmMin, t as __commonJSMin } from "./rolldown-runtime-D1cXj70v.js";
import { $n as Analytics, Ar as tc, Ei as CheckboxTreeSelections, Fr as init_dist, G as init_bulkDownloadActions, Ga as useSelector, Hn as getEmailSocialShareData, J as setDownloadExpectedFile, Jn as getBaseUrl, Kn as slug, Mn as getQueryParamString, Nn as init_queryParams, Oa as init_development, Oi as init_searchFiltersReducer, Pa as useNavigate, Pr as FontAwesomeIcon, Sr as lc, Ta as useQueryParams, Tr as rc, Tt as init_searchFilterActions, Ua as init_es, Wn as init_covid19, X as setDownloadPending, Xn as init_socialShare, Y as setDownloadExpectedUrl, Yn as handleShareOptionClick, _i as formatMoney, _t as resetAppliedFilters, d as requestFullDownload, en as init_modalActions, er as init_Analytics, fr as Qs, ga as init_IsMobileContext, gt as init_appliedFilterActions, ht as applyStagedFilters, ir as $s, jn as combineQueryParams, ka as Link, ki as initialState, l as init_downloadHelper, mt as init_GlobalModalContainer, n as init_Loading, or as Es, pt as GlobalModalContainer, q as setDownloadCollapsed, qa as useDispatch, ro as require_jsx_runtime, t as LoadingWrapper, tn as showModal, vt as setAppliedFilterCompletion, wa as init_useQueryParams, wi as init_moneyFormatter, wt as clearAllFilters, xr as init_index_es } from "./index.js-CgeUxZJy.js";
import { D as init_metaTagHelper, L as HelmetExport, R as init_Helmet, m as covidPageMetaTags } from "./HeaderContainer-DuB8bISr.js";
import { i as init_InPageNav, n as init_PageWrapper, r as InPageNav, t as PageWrapper } from "./PageWrapper-BZX48lf-.js";
import { n as init_BannerPageHeader, t as BannerPageHeader } from "./BannerPageHeader-BC5NwUDM.js";
import { n as init_ShareIcon508 } from "./ShareIcon508-C8ifp7Wx.js";
import { n as useAgencySlugs, t as init_useAgencySlugs } from "./useAgencySlugs-CKoWB5QX.js";
import { n as init_DownloadButton508, t as DownloadIconButton508 } from "./DownloadButton508-B7Wr-YjM.js";
import { n as init_ShareDownloadButtonGroup, t as ShareDownloadButtonGroup } from "./ShareDownloadButtonGroup-9ELwV16I.js";
import { C as fetchAwardAmounts, P as init_disaster, b as setOverview, g as resetOverview, h as init_covid19Actions, j as fetchOverview, n as useDefCodes, t as init_WithDefCodes, v as setDefcParams, x as setTotals } from "./WithDefCodes-rdyZ-NLw.js";
import { a as jumpToSection, i as init_covid19Helper, o as componentByCovid19Section, s as init_covid19$1 } from "./covid19Helper-BCNoljBR.js";
import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { find, isEqual, snakeCase, throttle } from "lodash-es";
//#region src/js/models/v2/covid19/BaseOverview.js
var BaseOverview;
var init_BaseOverview = __esmMin((() => {
	init_moneyFormatter();
	BaseOverview = {
		populate(data) {
			data.funding.forEach((code) => {
				this[`_defCode_${code.def_code}_funding`] = code.amount;
			});
			this._totalBudgetAuthority = data.total_budget_authority || null;
			this._totalBudgetAuthorityForBar = this._totalBudgetAuthority + (data.additional ? data.additional.total_budget_authority : 0);
			this._awardObligations = data.spending.award_obligations || null;
			this._awardOutlays = data.spending.award_outlays || null;
			this._totalObligations = data.spending.total_obligations || null;
			this._totalObligationsForBar = this._totalObligations + (data.additional ? data.additional.spending.total_obligations : 0);
			this._totalOutlays = data.spending.total_outlays || null;
			this._totalOutlaysForBar = this._totalOutlays + (data.additional ? data.additional.spending.total_outlays : 0);
			this._otherObligations = data.spending.total_obligations - data.spending.award_obligations;
			this._awardObligationsNotOutlayed = data.spending.award_obligations - data.spending.award_outlays;
			this._remainingBalance = data.total_budget_authority - data.spending.total_obligations;
			this._nonAwardOutLays = data.spending.total_outlays - data.spending.award_outlays;
			this._nonAwardNotOutlayed = data.spending.total_obligations - data.spending.award_obligations - (data.spending.total_outlays - data.spending.award_outlays);
		},
		get totalBudgetAuthority() {
			return this._totalBudgetAuthority ? formatMoney(this._totalBudgetAuthority) : null;
		},
		get awardObligations() {
			return this._awardObligations ? formatMoney(this._awardObligations) : null;
		},
		get awardOutlays() {
			return this._awardOutlays ? formatMoney(this._awardOutlays) : null;
		},
		get totalObligations() {
			return this._totalObligations ? formatMoney(this._totalObligations) : null;
		},
		get totalOutlays() {
			return this._totalOutlays ? formatMoney(this._totalOutlays) : null;
		},
		get otherObligations() {
			return this._otherObligations ? formatMoney(this._otherObligations) : null;
		},
		get awardObligationsNotOutlayed() {
			return this._awardObligationsNotOutlayed ? formatMoney(this._awardObligationsNotOutlayed) : null;
		},
		get remainingBalance() {
			return this._remainingBalance ? formatMoney(this._remainingBalance) : null;
		},
		get nonAwardOutLays() {
			return this._nonAwardOutLays ? formatMoney(this._nonAwardOutLays) : null;
		},
		get nonAwardNotOutlayed() {
			return this._nonAwardNotOutlayed ? formatMoney(this._nonAwardNotOutlayed) : null;
		}
	};
}));
//#endregion
//#region src/js/components/covid19/Covid19Section.jsx
var import_jsx_runtime$8, propTypes$6, Covid19Section;
var init_Covid19Section = __esmMin((() => {
	init_dist();
	init_index_es();
	import_jsx_runtime$8 = require_jsx_runtime();
	propTypes$6 = {
		section: PropTypes.string,
		icon: PropTypes.string,
		children: PropTypes.element,
		headerText: PropTypes.element,
		title: PropTypes.string,
		tooltip: PropTypes.element,
		tooltipProps: PropTypes.object
	};
	Covid19Section = ({ section, icon, headerText, children, title, tooltip = null, tooltipProps }) => {
		if (section === "award_question") return /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("section", {
			id: `covid19-${snakeCase(section)}`,
			className: `body__section ${snakeCase(section)}`,
			children
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(Es, {
			id: `covid19-${snakeCase(section)}`,
			classNames: `body__section ${snakeCase(section)}`,
			icon: icon ? /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(FontAwesomeIcon, {
				size: "2x",
				icon
			}) : null,
			title,
			titleTooltip: {
				component: tooltip,
				props: tooltipProps
			},
			overLine: section?.overLine,
			description: headerText,
			children
		});
	};
	Covid19Section.propTypes = propTypes$6;
}));
//#endregion
//#region src/js/components/covid19/Heading.jsx
/**
* Heading.jsx
* Created by Jonathan Hill 06/10/20
*/
var import_jsx_runtime$7, propTypes$5, Heading;
var init_Heading = __esmMin((() => {
	init_es();
	init_downloadHelper();
	init_bulkDownloadActions();
	init_Analytics();
	init_covid19Helper();
	init_index_es();
	init_ShareDownloadButtonGroup();
	import_jsx_runtime$7 = require_jsx_runtime();
	propTypes$5 = {
		publicLaw: PropTypes.string,
		url: PropTypes.string,
		onShareClick: PropTypes.func
	};
	Heading = ({ publicLaw, url, onShareClick }) => {
		const jumpToDataSources = () => {
			jumpToSection("data_sources_and_methodology");
		};
		const dispatch = useDispatch();
		const downloadInFlight = useSelector((state) => state.bulkDownload.download.pendingDownload);
		const downloadRequest = useRef(null);
		const { defcParams } = useSelector((state) => state.covid19);
		const downloadData = async () => {
			dispatch(setDownloadCollapsed(true));
			if (downloadRequest.current) downloadRequest.cancel();
			downloadRequest.current = requestFullDownload({ filters: { def_codes: defcParams } }, "disaster");
			try {
				const { data } = await downloadRequest.current.promise;
				dispatch(setDownloadExpectedUrl(data.file_url));
				dispatch(setDownloadExpectedFile(data.file_name));
				dispatch(setDownloadPending(true));
				downloadRequest.current = null;
			} catch (err) {
				console.error(err);
				downloadRequest.current = null;
			}
			Analytics.event({
				event: "covid_19_download",
				category: "COVID-19 - Profile",
				action: "download",
				gtm: true
			});
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)(Qs, {
			className: `heading__container 
            ${publicLaw === "american-rescue-plan" ? "information-body-arp" : "information-body"}`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)($s, {
				width: 10,
				className: "aligned-heading",
				children: publicLaw === "american-rescue-plan" ? /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
					className: "heading__description",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("p", { children: "In March 2021, the U.S. Congress appropriated additional funds in response to the COVID-19 pandemic through the American Rescue Plan Act of 2021. See how much has been spent, how spending is categorized, who received funding, and more." }), /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("p", { children: [
						"Visit our ",
						/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("button", {
							className: "usa-button-link",
							onClick: jumpToDataSources,
							children: " Data Sources & Methodology "
						}),
						" section to learn more about the underlying data, downloading the data, and resources about COVID-19 from other agencies."
					] })]
				}) : /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
					className: "heading__description",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("p", { children: "In early 2020, the U.S. Congress appropriated funds in response to the COVID-19 pandemic. These funds were made possible through the Coronavirus Aid, Relief, and Economic Security (CARES) Act and other supplemental legislation. In March of 2021, additional funds were appropriated through the American Rescue Plan Act." }), /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("p", { children: [
						"Visit our ",
						/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("button", {
							className: "usa-button-link",
							onClick: jumpToDataSources,
							children: "Data Sources & Methodology"
						}),
						" section to learn more about the underlying data, downloading the data, and resources about COVID-19 from other agencies."
					] })]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)($s, {
				width: 2,
				children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(ShareDownloadButtonGroup, {
					url,
					showDownloadBtn: true,
					onDownloadClick: downloadData,
					downloadInFlight,
					downloadIcon: "file-download",
					onShareClick,
					className: "blue-share"
				})
			})]
		});
	};
	Heading.propTypes = propTypes$5;
}));
//#endregion
//#region src/js/containers/covid19/DownloadButtonContainer.jsx
/**
* DownloadButtonContainer.jsx
* Created by Lizzie Salita 7/9/20
*/
var import_jsx_runtime$6, propTypes$4, DownloadButtonContainer;
var init_DownloadButtonContainer = __esmMin((() => {
	init_es();
	init_DownloadButton508();
	init_downloadHelper();
	init_bulkDownloadActions();
	init_Analytics();
	import_jsx_runtime$6 = require_jsx_runtime();
	propTypes$4 = {
		icon: PropTypes.string,
		className: PropTypes.string
	};
	DownloadButtonContainer = ({ icon = "download", className = "" }) => {
		const dispatch = useDispatch();
		const downloadInFlight = useSelector((state) => state.bulkDownload.download.pendingDownload);
		const downloadRequest = useRef(null);
		const { defcParams } = useSelector((state) => state.covid19);
		const downloadData = async () => {
			dispatch(setDownloadCollapsed(true));
			if (downloadRequest.current) downloadRequest.cancel();
			downloadRequest.current = requestFullDownload({ filters: { def_codes: defcParams } }, "disaster");
			try {
				const { data } = await downloadRequest.current.promise;
				dispatch(setDownloadExpectedUrl(data.file_url));
				dispatch(setDownloadExpectedFile(data.file_name));
				dispatch(setDownloadPending(true));
				downloadRequest.current = null;
			} catch (err) {
				console.error(err);
				downloadRequest.current = null;
			}
			Analytics.event({
				event: "covid_19_download",
				category: "COVID-19 - Profile",
				action: "download",
				gtm: true
			});
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(DownloadIconButton508, {
			downloadInFlight,
			onClick: downloadData,
			downloadIcon: icon,
			className
		});
	};
	DownloadButtonContainer.propTypes = propTypes$4;
}));
//#endregion
//#region src/js/components/covid19/DataSourcesAndMethodology.jsx
var import_jsx_runtime$5, propTypes$3, DataSourcesAndMethodology;
var init_DataSourcesAndMethodology = __esmMin((() => {
	init_development();
	import_jsx_runtime$5 = require_jsx_runtime();
	propTypes$3 = { publicLaw: PropTypes.string };
	DataSourcesAndMethodology = ({ publicLaw }) => /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
		className: "dsm__container",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("h4", { children: "Data Sources & Methodology" }),
			/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("hr", {}),
			/* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
				className: "dsm__topSection",
				children: [
					publicLaw === "american-rescue-plan" ? /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("p", { children: "Government spending funded by COVID-19 supplemental appropriations is tracked through the use of Disaster Emergency Fund Codes (DEFC). This page brings together agency financial and award data submitted monthly, covering activity beginning March 11, 2021. The data in all tables and visualizations are aggregates of all records tagged with, or otherwise identified as, COVID-19 DEFC V spending." }) : /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("p", { children: "Government spending funded by COVID-19 supplemental appropriations is tracked through the use of Disaster Emergency Fund Codes (DEFC). This page brings together agency financial and award data submitted monthly, covering activity beginning April 1, 2020. The data in all tables and visualizations are aggregates of all records tagged with an appropriate COVID-19 DEFC." }),
					/* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("p", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("strong", { children: "Download Data: " }),
						"The data downloads will include all data displayed on this page (as well as many additional data elements), with the exception of a few aspects one would need the more granular Account Breakdown by Award data (File C) to reproduce. If you wish to download this more granular data, visit the",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(Link, {
							to: "/download_center/custom_account_data",
							children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("strong", { children: "Custom Account Data" })
						}),
						" download page."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(Link, {
						to: "/disaster/covid-19/data-sources",
						children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("strong", { children: "Learn more about our data sources and calculation methods" })
					}), ", including details about our COVID-19 download options."] }),
					publicLaw === "american-rescue-plan" ? /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {}) : /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("p", { children: [
						"USAspending is working with federal agencies to address known limitations in COVID-19 spending data. See a ",
						/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("a", {
							target: "_blank",
							href: "data/data-limitations.pdf",
							rel: "noopener noreferrer",
							children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("strong", { children: "full description" })
						}),
						" of this issue."
					] })
				]
			})
		]
	});
	DataSourcesAndMethodology.propTypes = propTypes$3;
}));
//#endregion
//#region src/js/components/covid19/OtherResources.jsx
var import_jsx_runtime$4, propTypes$2, OtherResources;
var init_OtherResources = __esmMin((() => {
	init_development();
	init_dist();
	import_jsx_runtime$4 = require_jsx_runtime();
	propTypes$2 = { handleExternalLinkClick: PropTypes.func };
	OtherResources = ({ handleExternalLinkClick }) => {
		const handleClick = (e) => {
			e.preventDefault();
			handleExternalLinkClick(e.target.href);
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
			className: "resources__container",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("h4", { children: "Other Resources" }),
				/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("hr", {}),
				/* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
					className: "other-resources__link__container",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("ul", {
						className: "otherResources__list",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("a", {
								href: "https://www.pandemicoversight.gov/",
								onClick: handleClick,
								children: "Pandemic Response Accountability Committee (PRAC)"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("a", {
								href: "https://www.pandemicoversight.gov/media/file/american-rescue-plan-act-infographicpdf",
								onClick: handleClick,
								children: "American Rescue Plan Act Infographic (PRAC)"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("a", {
								href: "https://www.federalreserve.gov/covid-19.htm",
								onClick: handleClick,
								children: "Federal Reserve Board"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("a", {
								href: "https://www.usda.gov/coronavirus",
								onClick: handleClick,
								children: "Department of Agriculture"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("a", {
								href: "https://www.defense.gov/Explore/Spotlight/Coronavirus/",
								onClick: handleClick,
								children: "Department of Defense"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("a", {
								href: "https://www.ed.gov/coronavirus",
								onClick: handleClick,
								children: "Department of Education"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("a", {
								href: "https://www.dhs.gov/coronavirus/overview-dhs-response",
								onClick: handleClick,
								children: "Department of Homeland Security"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("a", {
								href: "https://oui.doleta.gov/unemploy/docs/cares_act_funding_state.html",
								onClick: handleClick,
								children: "Department of Labor"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("a", {
								href: "https://www.transportation.gov/coronavirus",
								onClick: handleClick,
								children: "Department of Transportation"
							}) })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("ul", {
						className: "otherResources__list",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("a", {
								href: "https://home.treasury.gov/policy-issues/coronavirus",
								onClick: handleClick,
								children: "Department of the Treasury"
							}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("ul", {
								className: "indent-link",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("a", {
										href: "https://www.irs.gov/statistics/soi-tax-stats-coronavirus-aid-relief-and-economic-security-act-cares-act-statistics",
										onClick: handleClick,
										children: "Internal Revenue Service"
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("a", {
										className: "usda-external-link indent-link",
										href: "https://home.treasury.gov/system/files/136/ERA-Subawards-USASpending-File.xlsx",
										children: ["ERA -Subawards (Excel)\xA0", /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(FontAwesomeIcon, { icon: "fa-regular fa-file-excel" })]
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("a", {
										className: "usda-external-link indent-link",
										href: "https://home.treasury.gov/system/files/136/SLFRF-Subaward-USASpending-File.xlsx",
										children: ["SLFRF Subaward (Excel)\xA0", /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(FontAwesomeIcon, { icon: "fa-regular fa-file-excel" })]
									}) })
								]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("a", {
								href: "https://www.publichealth.va.gov/n-coronavirus/",
								onClick: handleClick,
								children: "Department of Veterans Affairs"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("a", {
								href: "https://www.hhs.gov/coronavirus",
								onClick: handleClick,
								children: "Department of Health & Human Services"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("a", {
								href: "https://www.sba.gov/funding-programs/loans/covid-19-relief-options",
								onClick: handleClick,
								children: "Small Business Administration"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(Link, {
								to: "/disaster/covid-19/the-opportunity-project",
								children: "The Opportunity Project"
							}) })
						]
					})]
				})
			]
		});
	};
	OtherResources.propTypes = propTypes$2;
}));
//#endregion
//#region src/js/components/covid19/Covid19LinkCardsSection.jsx
var import_jsx_runtime$3, FooterCovid19LinkCardsSection;
var init_Covid19LinkCardsSection = __esmMin((() => {
	init_es();
	init_searchFilterActions();
	init_appliedFilterActions();
	init_searchFiltersReducer();
	init_Analytics();
	init_index_es();
	init_dist();
	import_jsx_runtime$3 = require_jsx_runtime();
	FooterCovid19LinkCardsSection = () => {
		const dispatch = useDispatch();
		const defCodes = useSelector((state) => state.covid19.defCodes, isEqual);
		const addDefCodesToAdvancedSearchFilter = () => {
			dispatch(setAppliedFilterCompletion(false));
			dispatch(applyStagedFilters(Object.assign({}, initialState, { defCodes: new CheckboxTreeSelections({
				require: defCodes.map((code) => code.code),
				exclude: [],
				counts: [{
					value: "COVID-19",
					count: defCodes.length,
					label: "COVID-19 Response"
				}]
			}) })));
		};
		const clickedSearch = () => {
			dispatch(clearAllFilters());
			dispatch(resetAppliedFilters());
			addDefCodesToAdvancedSearchFilter();
			Analytics.event({
				event: "covid-advanced-search-click",
				category: "COVID-19 - More Information",
				action: "advanced search click"
			});
		};
		const clickedCustomAcctData = () => {
			Analytics.event({
				event: "covid-custom-account-click",
				category: "COVID-19 - More Information",
				action: "custom account data click"
			});
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
			className: "more-information__container",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("h4", { children: "More Information About COVID-19 Federal Awards" }), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Qs, {
				className: "covid__card-row",
				hasGutter: true,
				gutterSize: "sm",
				children: [{
					icon: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
						className: "covid__icon-container",
						children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(FontAwesomeIcon, {
							icon: "filter-list",
							color: "#454545",
							size: "lg"
						})
					}),
					headline: "Advanced Search",
					text: "Search individual awards funded through COVID-19 response & keep an eye out for purple COVID-19 badges found  throughout the site.",
					buttonText: /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)(import_jsx_runtime$3.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", { children: "View advanced search\xA0\xA0" }), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(FontAwesomeIcon, { icon: "arrow-right" })] }),
					buttonLink: "/search",
					action: clickedSearch
				}, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
						className: "covid__icon-container",
						children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(FontAwesomeIcon, {
							icon: "file-arrow-down",
							color: "#454545",
							size: "lg"
						})
					}),
					headline: "Custom Account Data",
					text: "Download for COVID-19 award spending data with a higher degree of granularity.",
					buttonText: /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)(import_jsx_runtime$3.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", { children: "View custom account data\xA0\xA0" }), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(FontAwesomeIcon, { icon: "arrow-right" })] }),
					buttonLink: "/download_center/custom_account_data",
					action: clickedCustomAcctData
				}].map((card) => /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)($s, {
					className: "covid__card-col",
					mobile: 12,
					tablet: 6,
					desktop: 6,
					children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)(tc, { children: [card.icon, /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(rc, {
						headline: card.headline,
						text: card.text,
						children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(lc, {
							variant: "text",
							backgroundColor: "light",
							textAlignment: "left",
							text: card.buttonText,
							link: card.buttonLink,
							action: card.action
						})
					})] })
				}, card.headline))
			})]
		});
	};
}));
//#endregion
//#region src/js/components/covid19/Covid19BottomSection.jsx
var import_jsx_runtime$2, propTypes$1, Covid19BottomSection;
var init_Covid19BottomSection = __esmMin((() => {
	init_DataSourcesAndMethodology();
	init_OtherResources();
	init_Covid19LinkCardsSection();
	import_jsx_runtime$2 = require_jsx_runtime();
	propTypes$1 = {
		handleExternalLinkClick: PropTypes.func,
		publicLaw: PropTypes.string
	};
	Covid19BottomSection = ({ handleExternalLinkClick, publicLaw }) => /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
		className: "bottom-section",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("section", {
			className: "body__section",
			id: "covid19-data_sources_and_methodology",
			children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(DataSourcesAndMethodology, {
				handleExternalLinkClick,
				publicLaw
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("section", {
			className: "body__section",
			id: "covid19-other_resources",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(OtherResources, {
				handleExternalLinkClick,
				publicLaw
			}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(FooterCovid19LinkCardsSection, {})]
		})]
	});
	Covid19BottomSection.propTypes = propTypes$1;
}));
//#endregion
//#region src/_scss/pages/covid19/index.scss
var require_covid19 = /* @__PURE__ */ __commonJSMin((() => {}));
//#endregion
//#region src/js/components/covid19/Covid19Page.jsx
/**
* Covid19Page.jsx
* Created by Jonathan Hill 06/02/20
*/
var import_jsx_runtime$1, propTypes, covid19Sections, Covid19Page;
var init_Covid19Page = __esmMin((() => {
	init_es();
	init_development();
	init_index_es();
	init_Helmet();
	init_IsMobileContext();
	init_PageWrapper();
	init_Covid19Section();
	init_Heading();
	init_BannerPageHeader();
	init_Loading();
	init_ShareIcon508();
	init_GlobalModalContainer();
	init_socialShare();
	init_metaTagHelper();
	init_covid19();
	init_queryParams();
	init_modalActions();
	init_covid19$1();
	init_DownloadButtonContainer();
	init_Analytics();
	init_InPageNav();
	init_useQueryParams();
	init_Covid19BottomSection();
	import_jsx_runtime$1 = require_jsx_runtime();
	require_covid19();
	propTypes = { loading: PropTypes.bool };
	covid19Sections = [
		{
			section: "overview",
			label: "Overview"
		},
		{
			section: "total_spending_by_budget_categories",
			label: "Total Spending by Budget Category"
		},
		{
			section: "award_spending_by_recipient",
			label: "Award Spending by Recipient"
		},
		{
			section: "award_spending_by_agency",
			label: "Award Spending by Sub-Agency"
		},
		{
			section: "award_spending_by_assistance_listing",
			label: "Award Spending by Assistance Listing"
		},
		{
			section: "data_sources_and_methodology",
			label: "Data Sources & Methodology"
		},
		{
			section: "other_resources",
			label: "Other Resources"
		}
	];
	Covid19Page = ({ loading }) => {
		const query = useQueryParams();
		const history = useNavigate();
		const [activeSection, setActiveSection] = useState(query.section || "overview");
		const dispatch = useDispatch();
		const { isRecipientMapLoaded } = useSelector((state) => state.covid19);
		const jumpToSection = (section = "") => {
			const sectionObj = find(covid19Sections, ["section", section]);
			if (!sectionObj) return;
			const sectionDom = document.querySelector(`#covid19-${sectionObj.section}`);
			if (!sectionDom) return;
			const newQueryParams = combineQueryParams(query, { section: `${section}` });
			history({ path: `${getQueryParamString(newQueryParams)}` }, { replace: true });
			setActiveSection(section);
			const sectionTop = sectionDom.offsetTop;
			let top = sectionTop + 380;
			if (section === "data_sources_and_methodology" || section === "other_resources") top = sectionTop - 75;
			window.scrollTo({
				top,
				left: 0,
				behavior: "smooth"
			});
			Analytics.event({
				event: "covid_profile",
				category: "COVID-19 - Profile",
				action: `${section} - click`
			});
		};
		useEffect(() => {
			if (isRecipientMapLoaded && query.section) jumpToSection(query.section);
		}, [isRecipientMapLoaded, query.section]);
		useEffect(throttle(() => {
			let isMounted = true;
			if (isMounted) {
				const urlSection = query.section;
				if (urlSection) {
					setActiveSection(urlSection);
					jumpToSection(urlSection);
				}
			}
			return () => {
				isMounted = false;
			};
		}, 100), [history, query.section]);
		const handleExternalLinkClick = (url) => {
			dispatch(showModal(url));
		};
		const handleShare = (name) => {
			handleShareOptionClick(name, slug, getEmailSocialShareData, handleExternalLinkClick);
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(PageWrapper, {
			pageName: "covid19",
			classNames: "usa-da-covid19-page",
			metaTagProps: covidPageMetaTags,
			title: "COVID-19 Spending",
			noHeader: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)(LoadingWrapper, {
				isLoading: loading,
				children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(HelmetExport, { children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("link", {
					href: "https://api.mapbox.com/mapbox-gl-js/v2.11.1/mapbox-gl.css",
					rel: "stylesheet",
					crossOrigin: "anonymous",
					integrity: "sha384-JnF4GvwrnLggHxx0ORCeHombtPxfqigY/GeEvbdv0Uy5qrCAuAyN3AulKRA+VAPr"
				}) }), /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("main", {
					id: "main-content",
					className: "main-content",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(BannerPageHeader, {
							kicker: "PROFILES",
							title: "Federal Response to COVID-19",
							body: "Learn about total spending and award spending in response to COVID-19",
							faIcon: "virus-covid",
							primaryColor: "#39215E",
							secondaryColor: "#783CB9"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(InPageNav, {
							sections: covid19Sections,
							loading,
							activeSection,
							pageName: "covid19",
							detectActiveSection: true,
							jumpToSection,
							rootMargin: `-80px 0px 0px 0px`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Qs, {
							className: "body covid-content__row",
							children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)($s, {
								className: "covid-content__col",
								width: "fill",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Heading, {
										publicLaw: query.publicLaw,
										url: getBaseUrl(slug),
										onShareOptionClick: handleShare
									}),
									Object.keys(componentByCovid19Section()).filter((section) => componentByCovid19Section()[section].showInMainSection).map((section) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Covid19Section, {
										section,
										publicLaw: query.publicLaw,
										icon: componentByCovid19Section()[section].icon,
										headerText: componentByCovid19Section()[section].headerText,
										title: componentByCovid19Section()[section].title,
										tooltipProps: componentByCovid19Section()[section].tooltipProps,
										tooltip: componentByCovid19Section()[section].tooltip,
										children: componentByCovid19Section(query.publicLaw, handleExternalLinkClick)[section].component
									}, section)),
									/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(GlobalModalContainer, {})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Covid19BottomSection, { handleExternalLinkClick })
					]
				})]
			})
		});
	};
	Covid19Page.propTypes = propTypes;
}));
//#endregion
//#region src/js/containers/covid19/Covid19Container.jsx
/**
* Covid19Container.jsx
* Created by Jonathan Hill 06/02/20
*/
var import_jsx_runtime, Covid19Container;
//#endregion
__esmMin((() => {
	init_es();
	init_BaseOverview();
	init_disaster();
	init_WithDefCodes();
	init_covid19Actions();
	init_Covid19Page();
	init_useAgencySlugs();
	import_jsx_runtime = require_jsx_runtime();
	require_covid19();
	Covid19Container = () => {
		const [, areDefCodesLoading, defCodes] = useDefCodes();
		const { defcParams } = useSelector((state) => state.covid19);
		const [, , , slugsLoading] = useAgencySlugs();
		const overviewRequest = useRef(null);
		const [overviewLoading, setOverviewLoading] = useState(true);
		const awardAmountRequest = useRef(null);
		const [amountsLoading, setAmountsLoading] = useState(true);
		const dispatch = useDispatch();
		useEffect(() => {
			if (!areDefCodesLoading) dispatch(setDefcParams(defCodes.filter((c) => c.disaster === "covid_19").map((code) => code.code)));
		}, [
			areDefCodesLoading,
			defCodes,
			dispatch
		]);
		useEffect(() => {
			dispatch(resetOverview());
			const getOverviewData = async () => {
				const overviewDefc = defcParams || defCodes.filter((c) => c.disaster === "covid_19").map((code) => code.code);
				overviewRequest.current = fetchOverview(overviewDefc);
				try {
					const { data } = await overviewRequest.current.promise;
					const newOverview = Object.create(BaseOverview);
					newOverview.populate(data);
					dispatch(setOverview(newOverview));
					setOverviewLoading(false);
				} catch (e) {
					console.error(" Error Overview : ", e.message);
					setOverviewLoading(false);
				}
			};
			const getAllAwardTypesAmount = async () => {
				awardAmountRequest.current = fetchAwardAmounts({ filter: { def_codes: defcParams } });
				try {
					const { data } = await awardAmountRequest.current.promise;
					const totals = {
						obligation: data.obligation,
						outlay: data.outlay,
						awardCount: data.award_count,
						faceValueOfLoan: data.face_value_of_loan
					};
					dispatch(setTotals("", totals));
					setAmountsLoading(false);
				} catch (e) {
					console.error(" Error Amounts : ", e.message);
					setAmountsLoading(false);
				}
			};
			if (defcParams && defcParams.length) {
				getOverviewData();
				getAllAwardTypesAmount();
				overviewRequest.current = null;
				awardAmountRequest.current = null;
			}
			return () => {
				if (overviewRequest.current) overviewRequest.cancel();
				if (awardAmountRequest.current) awardAmountRequest.cancel();
			};
		}, [
			defCodes,
			defcParams,
			dispatch
		]);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Covid19Page, { loading: areDefCodesLoading || slugsLoading || overviewLoading || amountsLoading });
	};
}))();
export { Covid19Container as default };
