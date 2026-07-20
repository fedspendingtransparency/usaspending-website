import { n as __esmMin } from "./rolldown-runtime-D1cXj70v.js";
import { Fn as init_stickyHeaderHelper, Fr as init_dist, In as useDynamicStickyClass, Jn as getBaseUrl, Mn as getQueryParamString, Nn as init_queryParams, Oa as init_development, Pa as useNavigate, Pr as FontAwesomeIcon, Ta as useQueryParams, Ua as init_es, Xn as init_socialShare, Yn as handleShareOptionClick, en as init_modalActions, fr as Qs, ir as $s, jn as combineQueryParams, ka as Link, nr as api, qa as useDispatch, ro as require_jsx_runtime, rr as init_js_cookie, tn as showModal, wa as init_useQueryParams, xr as init_index_es } from "./index.js-CgeUxZJy.js";
import { D as init_metaTagHelper, p as covidDataSourcesMetaTags } from "./HeaderContainer-DuB8bISr.js";
import { i as init_InPageNav, n as init_PageWrapper, r as InPageNav, t as PageWrapper } from "./PageWrapper-BZX48lf-.js";
import { n as init_BannerPageHeader, t as BannerPageHeader } from "./BannerPageHeader-BC5NwUDM.js";
import { n as init_ShareIcon508 } from "./ShareIcon508-C8ifp7Wx.js";
import { t as require_data_sources } from "./data-sources-lJsQNQOT.js";
import { n as init_ShareDownloadButtonGroup, t as ShareDownloadButtonGroup } from "./ShareDownloadButtonGroup-9ELwV16I.js";
import { n as useDefCodes, t as init_WithDefCodes } from "./WithDefCodes-rdyZ-NLw.js";
import { i as init_covid19Helper, n as getStickyBreakPointForCovidBanner, t as createJumpToSectionForSidebar } from "./covid19Helper-BCNoljBR.js";
import { useEffect, useRef, useState } from "react";
import { uniqueId } from "lodash-es";
//#region src/js/components/covid19/DataSourcesAndMethodologiesPage.jsx
/**
* Created by Marco Mendoza
* 07/23/2020
*/
var import_jsx_runtime, getEmailSocialShareData, sections, getDefCValues, renderDefCodes, jumpToSection, DataSourcesAndMethodologiesPage;
//#endregion
__esmMin((() => {
	init_js_cookie();
	init_dist();
	init_development();
	init_es();
	init_metaTagHelper();
	init_socialShare();
	init_stickyHeaderHelper();
	init_covid19Helper();
	init_queryParams();
	init_WithDefCodes();
	init_PageWrapper();
	init_ShareIcon508();
	init_BannerPageHeader();
	init_InPageNav();
	init_index_es();
	init_ShareDownloadButtonGroup();
	init_modalActions();
	init_useQueryParams();
	import_jsx_runtime = require_jsx_runtime();
	getEmailSocialShareData = {
		subject: "COVID-19 Spending: Data Sources and Methodology",
		body: "View COVID-19 Spending: Data Sources and Methodology on USAspending.gov: https://www.usaspending.gov/disaster/covid-19/data-sources"
	};
	sections = [
		{
			label: "What COVID-19 spending does USAspending track?",
			section: "covered_funds"
		},
		{
			label: "Datasets",
			section: "datasets"
		},
		{
			label: "Download Instructions",
			section: "download_instructions"
		},
		{
			label: "Disaster Emergency Fund Code (DEFC)",
			section: "defc"
		},
		{
			label: "Loan Spending",
			section: "loan_spending"
		},
		{
			label: "Overview Section",
			section: "overview"
		},
		{
			label: "Total Spending Section",
			section: "total_spending"
		},
		{
			label: "Linked and Unlinked Award Data",
			section: "linked_and_unlinked"
		},
		{
			label: "Award Spending Sections",
			section: "award_spending"
		}
	];
	require_data_sources();
	getDefCValues = (errorMsg, isLoading, codes) => {
		if (isLoading) return "Loading...";
		if (errorMsg) return "There was an error fetching DEFC values";
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: codes.reduce((acc, c, i, arr) => {
			if (i === arr.length - 1) return `${acc} and "${c.code}"`;
			return `${acc}"${c.code}", `;
		}, "") });
	};
	renderDefCodes = (errorMsg, isLoading, codes) => {
		if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Loading..." });
		if (errorMsg) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "There was an error fetching DEFC values." });
		return codes.map(({ code, public_law: pl, title }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
				"DEFC \"",
				code,
				"\""
			] }),
			":",
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: pl.includes("Non-emergency") ? "Not designated as emergency" : "Designated as emergency" }, uniqueId()), pl.split("|").map((str, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
				str,
				", ",
				title.split("|")[i]
			] }, uniqueId()))] })
		] }, uniqueId()));
	};
	jumpToSection = createJumpToSectionForSidebar("data-sources", sections.reduce((acc, obj) => ({
		...acc,
		[obj.section]: { title: obj.label }
	}), {}));
	DataSourcesAndMethodologiesPage = () => {
		const history = useNavigate();
		const query = useQueryParams();
		const dispatch = useDispatch();
		const [errorMsg, isLoading, defCodes] = useDefCodes();
		const [activeSection, setActiveSection] = useState(sections[0]);
		const dataDisclaimerBannerRef = useRef(null);
		const [dataDisclaimerBanner, setDataDisclaimerBanner] = useState(api.get("usaspending_data_disclaimer"));
		const [isBannerSticky, , , setBannerStickyOnScroll] = useDynamicStickyClass(dataDisclaimerBannerRef, getStickyBreakPointForCovidBanner(api.get("usaspending_covid_homepage")));
		const [covidDefCodes, setCovidDefCodes] = useState();
		useEffect(() => {
			setCovidDefCodes(defCodes.filter((c) => c.disaster === "covid_19"));
		}, [defCodes]);
		useEffect(() => {
			window.addEventListener("scroll", setBannerStickyOnScroll);
			return () => {
				window.removeEventListener("scroll", setBannerStickyOnScroll);
			};
		});
		const handleCloseBanner = () => {
			api.set("usaspending_data_disclaimer", "hide", {
				secure: true,
				expires: 7
			});
			setDataDisclaimerBanner("hide");
		};
		const jumpToDataSourcesSection = (section) => {
			const matchedSection = sections.find((obj) => obj.section === section);
			if (!matchedSection) return;
			setActiveSection(matchedSection);
			jumpToSection(section);
			if (!window.location.href.includes(`section=${section}`)) {
				const newQueryParams = combineQueryParams(query, { section: `${section}` });
				history({ path: `${getQueryParamString(newQueryParams)}` }, { replace: true });
			}
		};
		const handleShareDispatch = (url) => {
			dispatch(showModal(url));
		};
		const handleShare = (name) => {
			handleShareOptionClick(name, "disaster/covid-19/data-sources", getEmailSocialShareData, handleShareDispatch);
		};
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageWrapper, {
			pageName: "data-sources",
			classNames: "usa-da-dsm-page",
			ref: dataDisclaimerBannerRef,
			title: "COVID-19 Spending",
			metaTagProps: covidDataSourcesMetaTags,
			noHeader: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				dataDisclaimerBanner !== "hide" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `info-banner data-disclaimer${isBannerSticky ? " sticky-banner" : ""}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "info-top" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "info-banner__content",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "info-banner__content--title",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FontAwesomeIcon, {
									size: "lg",
									icon: "exclamation-triangle",
									color: "#FDB81E"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Known Data Limitations" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FontAwesomeIcon, {
									onClick: handleCloseBanner,
									size: "lg",
									icon: "times"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							"USAspending is working with federal agencies to address known limitations in COVID-19 spending data. See ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								target: "_blank",
								href: "data/data-limitations.pdf",
								rel: "noopener noreferrer",
								children: "a full description"
							}),
							" of this issue."
						] })]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BannerPageHeader, {
					title: "COVID-19 Data Sources & Methodology",
					faIcon: "virus-covid",
					primaryColor: "#39215E",
					overrideIconColor: "#FFF",
					titleOnly: true,
					showIconHighlight: false
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InPageNav, {
					sections,
					activeSection,
					pageName: "data-sources",
					detectActiveSection: true,
					jumpToSection: jumpToDataSourcesSection
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					id: "main-content",
					className: "main-content",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "about-content-wrapper",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Qs, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)($s, {
							width: 10,
							className: "back-link",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/disaster/covid-19",
								rel: "noopener noreferrer",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FontAwesomeIcon, { icon: "arrow-left" }), "Back to the COVID-19 Spending profile"]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)($s, {
							width: 2,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareDownloadButtonGroup, {
								url: getBaseUrl("disaster/covid-19/data-sources"),
								hideDownload: true,
								onShareClick: handleShare
							})
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "about-content",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "about-section-wrapper",
									id: "data-sources-covered_funds",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "about-section-title",
										children: "What COVID-19 spending does USAspending track?"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "about-section-content",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Congress introduced and defined the concept of \"covered funds\" in the CARES Act to make it clear which supplemental appropriation spending related to the coronavirus response they wanted to be tracked, audited, and published for transparency and accountability purposes. The act (as amended) defines covered funds as follows:" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
												className: "about-section-content_custom-list",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["(6) the term \"covered funds\" means any funds, including loans, that are made available in any form to any non-Federal entity, not including an individual, under—", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
													className: "about-section-content_custom-list",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "(A) the Coronavirus Aid, Relief, and Economic Security Act (divisions A and B);" }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "(B) the Coronavirus Preparedness and Response Supplemental Appropriations Act, 2020 (Public Law 116–123);" }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "(C) the Families First Coronavirus Response Act (Public Law 116–127);" }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "(D) the Paycheck Protection Program and Health Care Enhancement Act (Public Law 116–139); or" }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "(E) divisions M and N of the Consolidated Appropriations Act, 2021;" })
													]
												})] })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
												"Given the above, OMB centered their guidance in M-20-21 on the covered funds concept and elected to use the DEFC as the means to track these covered funds in USAspending. New DEFC (see below) were issued to track each component of covered funds, consistent with the original and continued purpose of the DEFC to track ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Disaster" }),
												", ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Emergency" }),
												", and ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Wildfire Suppression " }),
												"spending under BBEDCA; covered funds that fell outside of the BBEDCA categories (and the specific statutory language that triggers their use) were captured in a\xA0",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Non-emergency" }),
												" DEFC, O."
											] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "One result of the covered funds concept and M-20-21 is that some spending that is clearly associated with the coronavirus response is not tracked as ‘COVID-19 spending’ on our site. Examples include:" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Any spending funded from general appropriations (rather than the supplemental appropriations that constitute \"covered funds\"). Examples include any contracts with a National Interest Action code (NIA) of \"P20C\" (indicating a COVID-19 related purpose) that are funded by general appropriations only and not ‘covered funds’ and that therefore do not appear on this page. The NIA is assigned by contracting officers based on spending purpose and has nothing to do with funding; in contrast, the CARES Act and M-20-21 are concerned with tracking spending from specific funding sources and not based on purpose alone. The NIA has no direct bearing on whether a contract is considered ‘COVID-19 spending’ on our site." }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Any spending from entities that were appropriated covered funds from Congress but that do not report to USAspending under the DATA Act. M-20-21 was an expansion of existing DATA Act reporting requirements but did not change the population of federal agencies or other entities subject to those requirements. Examples include any component of the legislative and judicial branches (though GAO does voluntarily report)." }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Any spending from the Consolidated Appropriations Act, 2021 (PL 116-260) outside of Division M and N. Per the covered funds definition, Congress only intended these two divisions to be tracked under the requirements of the CARES Act. An example that is arguably ‘coronavirus-related’; but is not tracked and displayed as such on USAspending is the $635,000,000 appropriated in Division A \"for necessary expenses for salary and related costs associated with Agriculture Quarantine and Inspection Services [...] to offset the loss resulting from the coronavirus pandemic of quarantine and inspection fees.\"" })
											] })
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "about-section-wrapper",
									id: "data-sources-datasets",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
											className: "about-section-title",
											children: "Datasets"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "about-section-content",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The following list contains the data sources that power the displays and calculations on our COVID-19 Spending profile page and associated API endpoints. The first two datasets are directly submitted to USAspending by federal agencies; the rest are regularly pulled from external source systems. Data on the COVID-19 Spending page will generally be refreshed at the end of each month, with each update adding the prior month's activity." })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "about-subtitle",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
												href: "https://tfx.treasury.gov/data-transparency/gsdm",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Data Accountability Broker Submission (DABS, also known as \"Broker\")" })
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "about-section-content",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Responsible party:" }), " federal agency budget and financial reporting officers"] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Frequency of updates:" }), " monthly"] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Details:" }),
													" The Broker contains financial data sourced from agency financial systems. This information is submitted directly by federal agencies to the Broker on a monthly basis and is packaged with related award and subaward data by the Broker and certified by a Senior Accountable Official. Directly submitted financial data files cover: 1) Treasury Account Symbol (TAS) balances (in Broker File A); 2) breakdowns of TAS-level spending by several dimensions (in Broker File B); and 3) a further breakdown of the award component of that spending by each federal award (in Broker File C). The latter two of these files are used on this page; visit our ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
														to: "/download_center/custom_account_data",
														children: "Custom Account Data"
													}),
													" page to download them: \"Account Breakdown by Program Activity & Object Class\" (for File B) and \"Account Breakdown by Award\" (for File C)."
												] })
											] })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "about-subtitle",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
												href: "https://tfx.treasury.gov/data-transparency/gsdm",
												children: "Financial Assistance Broker Submission (FABS)"
											}) })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "about-section-content",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Responsible party:" }), " federal assistance officers"] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Frequency of updates:" }), " twice monthly"] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Details:" }), " FABS contains financial data sourced from agency financial assistance systems and focuses on federal financial assistance awards. This information is submitted directly by federal agencies to the Broker twice a month. Data about financial assistance awards on the COVID-19 Spending profile page (except for obligation and outlay dollar amounts) is sourced from FABS."] })
											] })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "about-subtitle",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Government wide Treasury Account Symbol Adjusted Trial Balance System (GTAS)" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "about-section-content",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Responsible party:" }), " federal agency budget and financial reporting officers"] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Frequency of updates:" }), " monthly"] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Details:" }), " A data extract from GTAS is used to power the governmentwide spending totals in the first two sections of the page (\"Overview\" and \"Total Spending by Budget Category\"). Certain DABS data are cross-validated against GTAS in the Broker submission process, including all of the Treasury Account Balance (File A) data."] })
											] })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "about-subtitle",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Treasury Central Accounting Reporting System (CARS)" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "about-section-content",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Responsible party:" }), " federal agency budget and financial reporting officers"] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Frequency of updates:" }), " up to daily"] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Details:" }), " CARS provides metadata concerning Treasury Accounts and Federal Accounts."] })
											] })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "about-subtitle",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Federal Procurement Data System (FPDS)" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "about-section-content",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Responsible party:" }), " federal procurement officers"] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Frequency of updates:" }), " up to daily"] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Details:" }), " FPDS is a government database for collecting contract data. Data about contract awards on the COVID-19 Spending profile page (except for obligation and outlay dollar amounts) is sourced from FPDS."] })
											] })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "about-subtitle",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
												"System for Award Management (",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
													target: "_blank",
													rel: "noopener noreferrer",
													href: "https://sam.gov/",
													children: "SAM.gov"
												}),
												")"
											] })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "about-section-content",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Responsible party:" }), " prime recipients of federal awards"] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Frequency of updates:" }), " monthly"] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Details:" }),
													" ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
														target: "_blank",
														rel: "noopener noreferrer",
														href: "https://sam.gov/",
														children: "SAM.gov"
													}),
													" is a government database for collecting subcontract and subgrant information. It is not used in the COVID-19 Spending profile page's display, but is used to add subaward information to the page's download (specifically, all subawards associated with prime awards that were funded by COVID-19 supplemental appropriations)."
												] })
											] })
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "about-section-wrapper",
									id: "data-sources-download_instructions",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "about-section-title",
										children: "Download Instructions"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "about-section-content",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Use the COVID-19 Spending profile page \"Download\" button to find the data needed to recreate our COVID-19 calculations." }) }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "This download includes 8 types of files:" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Account Balances (sourced from GTAS)" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Account Breakdown (sourced from Broker File B)" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
													"Contract Prime Award Summaries (sourced from FPDS, with some derived fields compiled from Broker File C; ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "linked data only*" }),
													")"
												] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
													"Assistance Prime Award Summaries (sourced from FABS, with several derived fields compiled from Broker File C; ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "linked data only*" }),
													")"
												] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
													"Contract Subawards (sourced from ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
														target: "_blank",
														rel: "noopener noreferrer",
														href: "https://sam.gov/",
														children: "SAM.gov"
													}),
													")"
												] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
													"Assistance Subawards (sourced from ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
														target: "_blank",
														rel: "noopener noreferrer",
														href: "https://sam.gov/",
														children: "SAM.gov"
													}),
													")"
												] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "COVID-19_download_readme.txt" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Data_Dictionary_Crosswalk.xlsx" })
											] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "* See \"Linked and Unlinked Award Data\" below for information about linked awards" }) }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
												"This download covers all data that is used on the COVID-19 Spending profile page, with the exception of granular Broker File C data, which is not included due to size considerations. While the \"Award Summaries\" files in this download will be sufficient for most users, the File C data has two main uses: 1) it provides access to both ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "linked and unlinked" }),
												" data used in award spending totals on this page (the \"Award Summaries\" files in the profile page download only contain ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "linked" }),
												" data — see \"Linked and Unlinked Award Data\" below for more information); 2) it provides a higher degree of granularity in breaking down award spending by several financial data dimensions (including the specific amount each award was funded by each Object Class, Program Activity, Disaster Emergency Fund Code (DEFC), and Treasury Account)."
											] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
												"Broker File C data can be downloaded from the ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
													to: "/download_center/custom_account_data",
													children: "Custom Account Data"
												}),
												" page in the following manner:"
											] }) }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["Go to the ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
													to: "/download_center/custom_account_data",
													children: "Custom Account Data download page"
												})] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Select \"All\" for Budget Function" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Select \"All\" for Agency" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Select \"Treasury Account\" for Account Level" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "For File Type: Select \"Account Breakdown by Award\"" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Select the latest period of FY20" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Click \"Download\"" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "If it is after FY20, repeat this process for each FY after FY20 until you have reached the current FY (one file per FY)" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
													"Filter for rows with DEFC values ",
													getDefCValues(errorMsg, isLoading, covidDefCodes),
													" in the downloaded file"
												] })
											] })
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "about-section-wrapper",
									id: "data-sources-defc",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "about-section-title",
										children: "Disaster Emergency Fund Code (DEFC)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "about-section-content",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
												"In accordance with the Office of Management and Budget (OMB)",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
													target: "_blank",
													rel: "noopener noreferrer",
													href: "https://www.whitehouse.gov/wp-content/uploads/2020/04/Implementation-Guidance-for-Supplemental-Funding-Provided-in-Response.pdf",
													children: "Memorandum M-20-21"
												}),
												", ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "COVID-19 supplemental appropriations are identified by a Disaster Emergency Fund Code (DEFC)" }),
												". The COVID-19 Spending profile page download is pre-filtered to include only spending data associated with COVID-19 DEFC values. If you use the ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
													to: "/download_center/custom_account_data",
													children: "Custom Account Data"
												}),
												" page to download Broker File C data, be sure to filter for rows with DEFC values ",
												getDefCValues(errorMsg, isLoading, covidDefCodes),
												" in the downloaded file."
											] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
												"Note that the ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "National Interest Action (NIA)" }),
												" code is also used to track COVID-19 spending. However, it only applies to procurement actions (i.e., contracts) and is not necessarily tied to COVID-19 supplemental appropriations. Thus, awards with the COVID-19 NIA value may not have a COVID-19 DEFC value, and vice versa."
											] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The relevant codes for COVID-19 response funding and their associated legislation are as follows:" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: renderDefCodes(errorMsg, isLoading, covidDefCodes) })
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "about-section-wrapper",
									id: "data-sources-loan_spending",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "about-section-title",
										children: "Loan Spending"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "about-section-content",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Loan Spending is more complicated than spending for other federal awards like contracts or grants. Loan spending has two components: 1) Face Value of Loans, which is the amount that agencies have directly issued (for direct loans) or facilitated by compensating the lender if the borrower defaults (for loan guarantees); and 2) Loan Subsidy Cost, which is the calculated net present value of the loan or loan guarantee to the government, taking into account the size of the loan (i.e., its face value), interest rate, and the modeled risk of the recipient failing to pay back the loan in part or full." }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
											"From a budget perspective, Face Value of Loans is not considered federal spending, since it does not in itself represent a long-term cost to the government. As a result, ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Face Value of Loans is not included in any obligation or outlay figure" }),
											". However, ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: ["Loan Subsidy Cost does have direct budgetary impact and is factored into obligations and outlays when ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "it is positive" })] }),
											". Subsidy costs can be positive (indicating that the government is likely to lose money on the loan) or negative (indicating that the government is likely to make money on the loan). Loan Subsidy Cost should never be larger in absolute value terms than the Face Value of Loans itself. Administrative costs of running the loan or loan guarantee program itself are excluded from Loan Subsidy Cost calculations."
										] })]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "about-section-wrapper",
									id: "data-sources-overview",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "about-section-title",
										children: "Overview Section"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "about-section-content",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
												"All calculations in this section can be recreated from the “Disaster and Emergency Funding Tracking SF-133 Report on Budget Execution & Budgetary Resources” Files on",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
													target: "_blank",
													rel: "noopener noreferrer",
													href: "https://portal.max.gov/portal/document/SF133/Budget/FACTS II - SF 133 Report on Budget Execution and Budgetary Resources.html",
													children: "this"
												}),
												"page."
											] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Total Budgetary Resources" }), " calculation:"] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
													"Locate the Disaster and Emergency Funding Tracking SF-133 Report on Budget Execution & Budgetary Resources on",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
														target: "_blank",
														rel: "noopener noreferrer",
														href: "https://portal.max.gov/portal/document/SF133/Budget/FACTS II - SF 133 Report on Budget Execution and Budgetary Resources.html",
														children: "this"
													}),
													"page for all Fiscal Years back to FY20"
												] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Calculate SUM[Total Budgetary Resources – (Unobligated Balance Brought Forward + Adjustment to Unobligated Balance Brought Forward + Recoveries of Prior Year Unpaid Obligations + Recoveries of Prior Year Paid Obligations + Anticipated Recoveries of Prior Year Unpaid and Paid Obligations)]" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["The calculation mapped to the Line Items in the SF-133 is:", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "SUM[1910 – (1000 + 1020 + 1021 + 1033 + 1061)]" }) })] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Note: SUM[] should be read as “the sum of this calculation for COVID-19 DEFC across P12 of every closed fiscal year back to FY20, plus the sum of this calculation for COVID-19 DEFC from the latest accounting period of the current fiscal year" })
											] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Total Remaining Balance" }), " calculation:"] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Total Budgetary Resources – Total Obligations" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["The calculation mapped to the Line Items in the SF-133 is:", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "SUM[1910 – (1000 + 1020 + 1021 + 1033 + 1061)] - SUM[2190 – (1020 + 1021 + 1033)]" }) })] })] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Total Obligations" }), " calculation:"] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
													"Locate the Disaster and Emergency Funding Tracking SF-133 Report on Budget Execution & Budgetary Resources on",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
														target: "_blank",
														rel: "noopener noreferrer",
														href: "https://portal.max.gov/portal/document/SF133/Budget/FACTS II - SF 133 Report on Budget Execution and Budgetary Resources.html",
														children: "this"
													}),
													"page for all Fiscal Years back to FY20"
												] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "SUM[New Obligations and Upward Adjustments – (Adjustment to Unobligated Balance Brought Forward + Recoveries of Prior Year Unpaid Obligations + Recoveries of Prior Year Paid Obligations)]" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["The calculation mapped to the Line Items in the SF-133 is:", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "SUM[2190 – (1020 + 1021 + 1033)]" }) })] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Note: SUM[] should be read as “the sum of this calculation for COVID-19 DEFC across P12 of every closed fiscal year back to FY20, plus the sum of this calculation for COVID-19 DEFC from the latest accounting period of the current fiscal year." })
											] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Total Outlays" }), " calculation:"] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
													"Locate the Disaster and Emergency Funding Tracking SF-133 Report on Budget Execution & Budgetary Resources on",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
														target: "_blank",
														rel: "noopener noreferrer",
														href: "https://portal.max.gov/portal/document/SF133/Budget/FACTS II - SF 133 Report on Budget Execution and Budgetary Resources.html",
														children: "this"
													}),
													"page for all Fiscal Years back to FY20"
												] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "SUM[Gross Outlays + Recoveries of Prior Year Paid Obligations ]" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["The calculation mapped to the Line Items in the SF-133 is:", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "SUM[3020 + 1033]" }) })] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Note: SUM[] should be read as “the sum of this calculation for COVID-19 DEFC across P12 of every closed fiscal year back to FY20, plus the sum of this calculation for COVID-19 DEFC from the latest accounting period of the current fiscal year.”" })
											] })
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "about-section-wrapper",
									id: "data-sources-total_spending",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "about-section-title",
										children: "Total Spending Section"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "about-section-content",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
												"All high-level, boxed calculations in this section can be recreated using the \"Disaster and Emergency Funding Tracking SF-133 Report on Budget Execution & Budgetary Resources\" Files on",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
													target: "_blank",
													rel: "noopener noreferrer",
													href: "https://portal.max.gov/portal/document/SF133/Budget/FACTS II - SF 133 Report on Budget Execution and Budgetary Resources.html",
													children: "this"
												}),
												"page and the \"Account Breakdown\" files in the COVID-19 Spending profile page download. ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "These four amounts remain constant regardless of any spending type selection in the dropdown." })
											] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "When the “Total Spending” dropdown is selected in this section, you will see a row for “unreported” data as the last row of the table. The “unreported” data row displays the difference between the high-level, boxed figure above the table versus the sum of all the rows in the table itself. The reason why a difference exists between the high-level figure and the sum of the table rows is because these data come from different systems with different reporting requirements, timing, and practical execution by submitting agencies. As mentioned at the beginning of this section, the high-level figures come from SF-133, whereas the table rows come from agency-submitted data to USAspending.gov (specifically File B)." }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Number of Agencies" }), " calculation:"] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["In \"Account Breakdown\" file:", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Count of distinct agencies as determined by Agency Identifier (AID)" }) })] }) }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Number of Federal Accounts" }), " calculation:"] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["In \"Account Breakdown\" file:", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Count of distinct Federal Accounts" }) })] }) }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Number of Object Classes" }), " calculation:"] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["In \"Account Breakdown\" file:", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Count of distinct Object Classes" }) })] }) }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Total Budgetary Resources, Total Obligations, and Total Outlays calculations:" }) }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Refer to the calculations in the “Overview Section” above; these amounts are calculated in the exact same way as in that section." }) })
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "about-section-wrapper",
									id: "data-sources-linked_and_unlinked",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "about-section-content",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
												className: "about-section-title",
												children: "Linked and Unlinked Award Data"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
												"In order to understand the data surfaced in the \"Award Spending\" sections (detailed below), it is important to understand the concept of ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "linking between Broker File C and FPDS/FABS award data" }),
												". Broker File C serves as a bridge between data sourced from agency financial systems (i.e., the data in Broker File C itself) and award data sourced from FPDS and FABS. The actual link between these two datasets is an ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "award ID" }),
												" (also known as ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "\"award unique key\"" }),
												"). For various reasons, not every award ID in Broker File C has a corresponding award ID in FPDS or FABS data, which makes them unmatchable. If a Broker File C row cannot be matched to FPDS or FABS, we call it \"unlinked\". Unlinked Broker File C data cannot be supplemented by metadata from FPDS or FABS (including recipient information, CFDA program, and funding agency)."
											] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
												"The rule of thumb for all award sections is to ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "use complete Broker File C data where possible" }),
												" (containing both linked and unlinked awards); ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "where not possible, only linked data will be used" }),
												" (representing a subset of the authoritative award spending total based on both linked and unlinked data in Broker File C)."
											] }) }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
												"Note that even for sections that only display linked award data, ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Broker File C is always the basis for any obligated or outlayed dollar amount displayed for award data" }),
												"."
											] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
												"As mentioned in the \"Download Instructions\" section above, ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "linked" }),
												" data is compiled in the COVID-19 Spending profile page download. For ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "linked and unlinked" }),
												" data, use the ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
													to: "/download_center/custom_account_data",
													children: "Custom Account Data"
												}),
												" page."
											] })
										]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "about-section-wrapper",
									id: "data-sources-award_spending",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "about-section-title",
										children: "Award Spending Sections"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "about-section-content",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "There are several sections devoted to Award Spending. Each \"Award Spending\" section contains four high-level, boxed calculations. Unlike the \"Total Spending by Budget Category\" section, these boxed calculations update based on filters chosen (here, award types)." }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
												"The first of these calculations is a count of an award attribute (such as the count of CFDA programs) that uses ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "linked" }),
												" data. Records without an award ID (award unique key) that links across the two datasets will not be counted in these calculations."
											] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
												"The remaining three calculations use ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "linked" }),
												" data when a particular award type is selected (i.e., any selection besides \"All Awards\"). When \"All Awards\" is selected, they draw on all Broker File C award data (i.e., ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "linked and unlinked" }),
												" data) because no linked data points are required."
											] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
												"Across all \"Award Spending\" sections, ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "the charts and tables below these four calculations all rely on linked data" }),
												". We use linked data here because the award attributes displayed can only be found by linking the two datasets."
											] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The \"Recipient Location\" tab is based on \"Recipient Location\" data. There is currently no \"Primary Place of Performance\" data used on the profile page, though it is available in the \"Award Summaries\" files in the profile page download. Recipient Location is the legal business address of the recipient; Primary Place of Performance refers to where the work of an award is performed as determined by federal award reporting officers." }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Note that CFDA Programs apply only to financial assistance awards; the CFDA section of the profile page therefore excludes all contract data. If you are looking for CFDA information in the profile page download, see the \"Assistance Prime Award Summaries\" file." }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Number of Recipients" }), " calculations:"] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["Count of unique recipients (by Recipient name) for every award ID (award unique key) tagged with a COVID-19 DEFC value. Filter by any award type as desired.", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "The count of recipients in this section represents the number of distinct recipient names in the dataset. Because some names are anonymized or indicate that the associated award was aggregated from many individual recipients/awards to protect personally identifiable information (PII), the true count of recipients is likely significantly higher. Names that indicate anonymized or aggregated recipients include: Multiple Recipients, Multiple Foreign Recipients, Miscellaneous Foreign Awardees, Private Individual, Individual Recipient, and Redacted Due to PII." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Note also that these are only direct recipients: often federal awards are given to state, local, or tribal governments and then further redistributed to individual citizens by those governments; in our dataset, only the award to the state, local, or tribal government is noted (though subgrants are tracked in some cases and can be viewed in the \"Assistance Subawards\" download)." })] })] }) }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Number of Agencies" }), " calculations:"] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["Count of unique agencies based on Funding Agency Code in the FABS and FPDS data for every award ID (award unique key) tagged with a COVID-19 DEFC value. Filter by any award type as desired.", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
												"In contrast to the Number of Agencies in the \"Total Spending by Budget Category\" section, this count of agencies uses only ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "linked" }),
												" data (from FABS/FPDS) rather than ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "linked and unlinked" }),
												" data (from Broker File C)."
											] }) })] }) }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Number of CFDA Programs" }), " calculations:"] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Count of all distinct CFDA Programs (number or title) for every award ID (award unique key) tagged with a COVID-19 DEFC. Filter by any award type as desired." }) }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Award Obligations" }), " calculations:"] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
												"For ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Award Spending (including Loan Spending)" }),
												", sum together:",
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Either Transaction Obligated Amount (TOA, for linked and unlinked data) or Obligated Amount Funded by COVID-19 Supplementals (for linked data only) for every award ID (award unique key) tagged with a COVID-19 DEFC." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Filter by any award type as desired." })] })
											] }) }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Award Outlays" }), " calculations:"] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
												"For ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Award Spending (including Loan Spending)" }),
												", sum together:",
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Outlayed Amount Funded by COVID-19 Supplementals for every award ID (award unique key) tagged with a COVID-19 DEFC [for Linked Awards only]." }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Gross Outlay Amount, Downward Adjustments of Prior Year Prepaid Advanced Undelivered Orders and Obligation Refunds Collected, and Downward Adjustments of Prior Year Paid Delivered Orders and Obligations Refunds Collected for every award ID (award unique key) tagged with a COVID-19 DEFC [for Linked and Unlinked Awards]." }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Filter by any award type as desired." })
												] })
											] }) }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Number of Awards" }), " calculation:"] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Count of all distinct award IDs (award unique keys) tagged with a COVID-19 DEFC. Filter by any award type as desired." }) })
										]
									})]
								})
							]
						})]
					})
				})
			] })
		});
	};
}))();
export { DataSourcesAndMethodologiesPage as default };
