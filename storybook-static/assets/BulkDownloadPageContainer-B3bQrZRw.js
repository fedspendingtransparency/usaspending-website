import { n as __esmMin, t as __commonJSMin } from "./rolldown-runtime-D1cXj70v.js";
import { $a as init_GlobalConstants, B as requestBudgetSubfunctionList, Bn as init_Icons, Ca as init_awardType, Da as IsMobileContext, F as requestAccountsDownload, G as init_bulkDownloadActions, Ha as Link, Hn as isCancel, I as requestAgenciesList, K as setDefCodes, Ka as useMatch, Kr as FontAwesomeIcon, L as requestArchiveFiles, Mn as Glossary, N as areDefCodesDisabled, Nr as init_index_es, O as require_dayjs_min, Oa as init_IsMobileContext, On as ExclamationCircle, P as init_bulkDownloadHelper, Pn as InfoCircle, Qa as globalConstants, R as requestAwardsDownload, S as earliestFiscalYear, T as init_fiscalYearHelper, U as bulkAwardTypeChange, V as requestFederalAccountList, Va as init_development, Vn as init_axios, W as bulkDownloadActions_exports, Z as toggleAwardTypeChange, an as init_url, do as init_modern, dr as Analytics, fr as init_Analytics, g as allFiscalYears, go as require_jsx_runtime, gr as $s, io as useSelector, lo as bindActionCreators, no as init_es, nt as downloadOptions, on as sanitizeUrl, oo as useDispatch, po as useQuery, qa as useNavigate, qr as init_dist, rt as init_megaMenuOptions, so as connect_default, uo as init_redux, v as convertFYToDateRange, wr as Qs, xa as bulkDownloadAwardTypeGroups, y as currentFiscalYear, z as requestBudgetFunctionList } from "./index.js-Dk2VDaPz.js";
import { A as metadataDownloadPageMetaTags, D as init_metaTagHelper, _ as downloadAccountPageMetaTags, v as downloadArchivePageMetaTags, y as downloadAwardPageMetaTags } from "./HeaderContainer-CiRwnRgy.js";
import { n as init_PageWrapper, t as PageWrapper } from "./PageWrapper-Dqa3KwTb.js";
import { n as init_ComboBox, t as ComboBox } from "./ComboBox-DLdH1114.js";
import { n as dodNote, r as init_Note, t as Note } from "./Note-B_ZkRToa.js";
import { a as fetchLocationList, c as init_mapHelper, n as useDefCodes, t as init_WithDefCodes } from "./WithDefCodes-BotSvVWk.js";
import { n as init_PrimaryCheckboxType, r as require_isSameOrAfter, t as PrimaryCheckboxType } from "./PrimaryCheckboxType-BCayu9Ef.js";
import { a as handlePotentialStrings, i as init_dateHelper, n as init_QuarterPickerWithFY, o as init_explorerQuarters, r as getPeriodTitle, t as QuarterPickerWithFY } from "./QuarterPickerWithFY-8o9S5KZi.js";
import { a as init_defCodes, o as AccordionCheckbox, r as defcDataByType, s as init_AccordionCheckbox } from "./defCodes-BFXHH3fy.js";
import { n as init_BulkDownloadModalContainer, t as BulkDownloadModalContainer_default } from "./BulkDownloadModalContainer-DSM_vx7z.js";
import React, { memo, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import { camelCase, startCase, throttle, uniqueId } from "lodash-es";
//#region src/js/dataMapping/bulkDownload/bulkDownloadOptions.js
var dayjs$4, awardDownloadOptions, accountDownloadOptions;
var init_bulkDownloadOptions = __esmMin((() => {
	init_awardType();
	dayjs$4 = require_dayjs_min();
	awardDownloadOptions = {
		awardLevels: [{
			id: "prime-awards",
			lookupName: "primeAwards",
			name: "Prime Awards",
			filters: [
				"contracts",
				"idvs",
				"grants",
				"direct_payments",
				"loans",
				"insurance",
				"other"
			]
		}, {
			id: "sub-awards",
			lookupName: "subAwards",
			name: "Sub-Awards",
			filters: ["sub_contracts", "sub_grants"]
		}],
		awardTypeLookups: {
			contracts: {
				label: "Contracts",
				apiValues: bulkDownloadAwardTypeGroups.contracts
			},
			direct_payments: {
				label: "Direct Payments",
				apiValues: bulkDownloadAwardTypeGroups.direct_payments
			},
			grants: {
				label: "Grants",
				apiValues: bulkDownloadAwardTypeGroups.grants
			},
			idvs: {
				label: "Contract IDVs",
				apiValues: bulkDownloadAwardTypeGroups.idvs
			},
			loans: {
				label: "Loans",
				apiValues: bulkDownloadAwardTypeGroups.loans
			},
			insurance: {
				label: "Insurance",
				apiValues: bulkDownloadAwardTypeGroups.insurance
			},
			other: {
				label: "Other Financial Assistance",
				apiValues: bulkDownloadAwardTypeGroups.other
			},
			sub_grants: {
				label: "Sub-Grants",
				apiValues: ["grant"]
			},
			sub_contracts: {
				label: "Sub-Contracts",
				apiValues: ["procurement"]
			}
		},
		dateTypes: [{
			name: "action_date",
			label: "Action Date",
			description: "When an award action is issued or signed by an agency in its award system"
		}, {
			name: "last_modified_date",
			label: "Last Modified Date",
			description: "When the details of a reported award action were last updated"
		}],
		agencyTypes: [{
			name: "awarding_agency",
			label: "Awarding Agency",
			apiName: "awarding",
			apiScopeName: "awarding_agency_scope",
			description: "Issues and administers the award, usually paying for funding out of its own budget"
		}, {
			name: "funding_agency",
			label: "Funding Agency",
			apiName: "funding",
			apiScopeName: "funding_agency_scope",
			description: "Pays for the majority of funds for an award out of its budget"
		}],
		locationTypes: [{
			name: "recipient_location",
			label: "Recipient Location",
			apiName: "recipient_locations",
			apiScopeName: "recipient_scope",
			description: "Legal business address of the recipient"
		}, {
			name: "place_of_performance",
			label: "Place of Performance",
			apiName: "place_of_performance_locations",
			apiScopeName: "place_of_performance_scope",
			description: "Principal place of business, where the majority of the work is performed"
		}],
		fileFormats: [
			{
				name: "csv",
				label: "CSV",
				disabled: false
			},
			{
				name: "tsv",
				label: "TSV",
				disabled: false
			},
			{
				name: "pstxt",
				label: "TXT (Pipe Delimited)",
				disabled: false
			}
		],
		timePeriodTypes: [{
			name: "time_period",
			label: "Time Period",
			description: "Pre-selected periods of time, including government fiscal year (FY)"
		}, {
			name: "date_picker",
			label: "Date Picker",
			description: "Date ranges may span up to one year"
		}],
		dateRangeButtons: [
			{
				label: "yesterday",
				startDate: dayjs$4().subtract(1, "day").format("YYYY-MM-DD"),
				endDate: dayjs$4().subtract(1, "day").format("YYYY-MM-DD")
			},
			{
				label: "last 7 days",
				startDate: dayjs$4().subtract(1, "week").format("YYYY-MM-DD"),
				endDate: dayjs$4().format("YYYY-MM-DD")
			},
			{
				label: "last 15 days",
				startDate: dayjs$4().subtract(15, "day").format("YYYY-MM-DD"),
				endDate: dayjs$4().format("YYYY-MM-DD")
			},
			{
				label: "last 30 days",
				startDate: dayjs$4().subtract(30, "day").format("YYYY-MM-DD"),
				endDate: dayjs$4().format("YYYY-MM-DD")
			},
			{
				label: "last 60 days",
				startDate: dayjs$4().subtract(60, "day").format("YYYY-MM-DD"),
				endDate: dayjs$4().format("YYYY-MM-DD")
			},
			{
				label: "this month",
				startDate: dayjs$4().startOf("month").format("YYYY-MM-DD"),
				endDate: dayjs$4().format("YYYY-MM-DD")
			},
			{
				label: "last 3 months",
				startDate: dayjs$4().subtract(3, "month").format("YYYY-MM-DD"),
				endDate: dayjs$4().format("YYYY-MM-DD")
			},
			{
				label: "last 6 months",
				startDate: dayjs$4().subtract(6, "month").format("YYYY-MM-DD"),
				endDate: dayjs$4().format("YYYY-MM-DD")
			},
			{
				label: "this year",
				startDate: dayjs$4().startOf("year").format("YYYY-MM-DD"),
				endDate: dayjs$4().format("YYYY-MM-DD")
			},
			{
				label: "last year",
				startDate: dayjs$4().subtract(1, "year").startOf("year").format("YYYY-MM-DD"),
				endDate: dayjs$4().subtract(1, "year").endOf("year").format("YYYY-MM-DD")
			}
		]
	};
	accountDownloadOptions = {
		accountLevels: [{
			name: "federalAccount",
			label: "Federal Account",
			apiName: "federal_account",
			description: "Aggregate of Treasury Accounts"
		}, {
			name: "treasuryAccount",
			label: "Treasury Account",
			apiName: "treasury_account",
			description: "Includes Period of Availability"
		}],
		submissionTypes: [
			{
				name: "accountBalances",
				label: "Account Balances (File\xA0A)",
				apiName: "account_balances",
				file: "File A"
			},
			{
				name: "accountBreakdown",
				label: "Account Breakdown by Program Activity & Object Class (File\xA0B)",
				apiName: "object_class_program_activity",
				file: "File B"
			},
			{
				name: "accountBreakdownByAward",
				label: "Account Breakdown by Award* (File\xA0C)",
				apiName: "award_financial",
				file: "File C"
			}
		],
		fileFormats: [
			{
				name: "csv",
				label: "CSV",
				disabled: false
			},
			{
				name: "tsv",
				label: "TSV",
				disabled: true
			},
			{
				name: "xml",
				label: "XML",
				disabled: true
			}
		]
	};
}));
//#endregion
//#region src/js/components/bulkDownload/MetadataDownload.jsx
var import_jsx_runtime$36, downloadLocation, MetadataDownload;
var init_MetadataDownload = __esmMin((() => {
	init_GlobalConstants();
	init_dist();
	import_jsx_runtime$36 = require_jsx_runtime();
	downloadLocation = `${globalConstants.FILES_SERVER_BASE_URL}/docs/USAspending-data-catalog.json`;
	MetadataDownload = () => /* @__PURE__ */ (0, import_jsx_runtime$36.jsxs)("div", {
		className: "metadata-dl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$36.jsx)("h2", {
				className: "metadata__title",
				children: "Dataset Metadata"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$36.jsx)("p", {
				className: "metadata__intro",
				children: "This JSON file contains metadata for all datasets that are published on USAspending.gov, including information such as dataset description, file format, publishing agency, and keywords."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$36.jsx)("div", {
				className: "metadata-download-button",
				children: /* @__PURE__ */ (0, import_jsx_runtime$36.jsx)("a", {
					target: "_blank",
					href: downloadLocation,
					rel: "noopener noreferrer",
					"aria-label": "Dataset Metadata",
					children: /* @__PURE__ */ (0, import_jsx_runtime$36.jsxs)("button", {
						className: "full-menu__item--button",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$36.jsx)(FontAwesomeIcon, { icon: "file-code" }), "Download the Metadata JSON File"]
					})
				})
			})
		]
	});
}));
//#endregion
//#region src/js/components/bulkDownload/FilterSelectionTitle.jsx
var import_jsx_runtime$35, propTypes$29, titleData, FilterSectionTitle;
var init_FilterSelectionTitle = __esmMin((() => {
	init_dist();
	import_jsx_runtime$35 = require_jsx_runtime();
	propTypes$29 = { type: PropTypes.string };
	titleData = {
		awardType: {
			icon: "file-certificate",
			preSpan: "Select the",
			span: "Award Types",
			postSpan: "to include.",
			showRequired: true,
			background: "#f7f2ff",
			fill: "#54278f",
			addClassName: ""
		},
		agency: {
			icon: "building-columns",
			preSpan: "Select an awarding or funding",
			span: "Agency",
			postSpan: "and sub-agency.",
			showRequired: false,
			background: "#e5faff",
			fill: "#0e4f5c",
			addClassName: ""
		},
		location: {
			icon: "location-dot",
			preSpan: "Select a",
			span: "Location",
			postSpan: ".",
			showRequired: false,
			background: "#fef2e4",
			fill: "#e66f0e",
			addClassName: "no-right-margin"
		},
		date: {
			icon: "file-signature",
			preSpan: "Select a",
			span: "Date Type",
			postSpan: ".",
			showRequired: false,
			background: "#e3f5e1",
			fill: "#216e1f",
			addClassName: "no-right-margin"
		},
		dateRange: {
			icon: "calendar-days",
			preSpan: "Select a",
			span: "Date Range",
			postSpan: ".",
			showRequired: false,
			background: "#e8f5ff",
			fill: "#112f4e",
			addClassName: "no-right-margin"
		},
		file: {
			icon: "file-csv",
			preSpan: "Select a",
			span: "File Format",
			postSpan: ".",
			showRequired: false,
			background: "#fff5c2",
			fill: "#422d19",
			addClassName: "no-right-margin"
		},
		budget: {
			icon: "list",
			preSpan: "Select a",
			span: "Budget Function",
			postSpan: /* @__PURE__ */ (0, import_jsx_runtime$35.jsxs)(import_jsx_runtime$35.Fragment, { children: [
				" and/or ",
				/* @__PURE__ */ (0, import_jsx_runtime$35.jsx)("span", {
					className: `download-filter__title_em no-right-margin`,
					style: { backgroundColor: "#F7F2FF" },
					children: "Agency"
				}),
				"."
			] }),
			showRequired: true,
			background: "#F7F2FF",
			fill: "#54278F",
			addClassName: ""
		},
		account: {
			icon: "money-check-dollar",
			preSpan: "Select a",
			span: "Account Level",
			postSpan: ".",
			showRequired: false,
			background: "#E5FAFF",
			fill: "#0E4F5C",
			addClassName: "no-right-margin"
		},
		fileType: {
			icon: "folder",
			preSpan: "Select a",
			span: "File Type",
			postSpan: ".",
			showRequired: true,
			background: "#FEF2E4",
			fill: "#E66F0E",
			addClassName: "no-right-margin"
		},
		defc: {
			icon: "hand-holding-medical",
			preSpan: "Filter by",
			span: "Disaster Emergency Fund Codes (DEFCs)",
			postSpan: ".",
			showRequired: false,
			background: "#E3F5E1",
			fill: "#216E1F",
			addClassName: "no-right-margin"
		},
		fy: {
			icon: "calendar",
			preSpan: "Select a",
			span: "Fiscal Year",
			postSpan: /* @__PURE__ */ (0, import_jsx_runtime$35.jsxs)(import_jsx_runtime$35.Fragment, { children: [
				" and ",
				/* @__PURE__ */ (0, import_jsx_runtime$35.jsx)("span", {
					className: `download-filter__title_em no-right-margin`,
					style: { backgroundColor: "#E8F5FF" },
					children: "Period"
				}),
				"."
			] }),
			showRequired: false,
			background: "#E8F5FF",
			fill: "#0B4778",
			addClassName: ""
		},
		agencyFy: {
			icon: "building-columns",
			preSpan: "Select an ",
			span: "Agency",
			postSpan: /* @__PURE__ */ (0, import_jsx_runtime$35.jsxs)(import_jsx_runtime$35.Fragment, { children: [
				"and",
				/* @__PURE__ */ (0, import_jsx_runtime$35.jsx)("span", {
					className: `download-filter__title_em no-right-margin`,
					style: { backgroundColor: "#E5FAFF" },
					children: "Fiscal Year"
				}),
				"\xA0to filter the table below."
			] }),
			showRequired: false,
			background: "#E5FAFF",
			fill: "#0E4F5C",
			addClassName: ""
		}
	};
	FilterSectionTitle = ({ type }) => {
		const { icon, preSpan, span, postSpan, showRequired, addClassName, background, fill } = titleData[type];
		return /* @__PURE__ */ (0, import_jsx_runtime$35.jsx)("div", {
			className: "download-filter__title-wrapper",
			children: /* @__PURE__ */ (0, import_jsx_runtime$35.jsxs)("h4", {
				className: "download-filter__title",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$35.jsx)("div", {
						className: "title-icon",
						style: { backgroundColor: background },
						children: /* @__PURE__ */ (0, import_jsx_runtime$35.jsx)(FontAwesomeIcon, {
							icon,
							color: fill
						})
					}),
					preSpan,
					/* @__PURE__ */ (0, import_jsx_runtime$35.jsx)("span", {
						className: `download-filter__title_em ${addClassName}`,
						style: { backgroundColor: background },
						children: span
					}),
					postSpan,
					showRequired && /* @__PURE__ */ (0, import_jsx_runtime$35.jsx)("span", {
						className: "required",
						children: "\xA0(Required)\xA0"
					})
				]
			})
		});
	};
	FilterSectionTitle.propTypes = propTypes$29;
}));
//#endregion
//#region src/js/components/bulkDownload/awards/filters/AwardLevelAndTypeFilter.jsx
/**
* AwardLevelAndTypeFilter.jsx
* Created by Seth Stoudenmier 03/01/20
*/
var import_jsx_runtime$34, awardTypeLabels, AwardLevelAndTypeFilter;
var init_AwardLevelAndTypeFilter = __esmMin((() => {
	init_es();
	init_bulkDownloadOptions();
	init_bulkDownloadActions();
	init_PrimaryCheckboxType();
	init_FilterSelectionTitle();
	import_jsx_runtime$34 = require_jsx_runtime();
	awardTypeLabels = Object.assign({}, ...Object.entries(awardDownloadOptions.awardTypeLookups).map(([key, value]) => ({ [key]: value.label })));
	AwardLevelAndTypeFilter = memo(function AwardLevelAndTypeFilter() {
		const currentAwardTypes = useSelector((state) => state.bulkDownload.awards.awardTypes);
		const dispatch = useDispatch();
		const bulkTypeChange = (selection) => dispatch(bulkAwardTypeChange(selection));
		const toggleCheckboxType = (selection) => dispatch(toggleAwardTypeChange(selection));
		const awardLevelCheckboxes = awardDownloadOptions.awardLevels.map(({ id, name, lookupName, filters }) => {
			const selectedAwardTypes = currentAwardTypes[lookupName];
			return /* @__PURE__ */ (0, import_jsx_runtime$34.jsx)(PrimaryCheckboxType, {
				id,
				name,
				lookupName,
				filters,
				filterType: "BulkDownload",
				types: awardTypeLabels,
				arrowState: "expanded",
				selectedCheckboxes: selectedAwardTypes,
				isCollapsable: false,
				bulkTypeChange,
				toggleCheckboxType
			}, `award-type__${id}`);
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$34.jsxs)("div", {
			className: "download-filter",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$34.jsx)(FilterSectionTitle, { type: "awardType" }), /* @__PURE__ */ (0, import_jsx_runtime$34.jsx)("div", {
				className: "checkbox-type-filter",
				children: /* @__PURE__ */ (0, import_jsx_runtime$34.jsx)("div", {
					className: "filter-item-wrap",
					children: /* @__PURE__ */ (0, import_jsx_runtime$34.jsx)("ul", {
						className: "download-filter__unordered-list",
						children: awardLevelCheckboxes
					})
				})
			})]
		});
	});
}));
//#endregion
//#region src/js/components/sharedComponents/BulkDownloadRadioButton.jsx
var import_jsx_runtime$33, propTypes$28, BulkDownloadRadioButton;
var init_BulkDownloadRadioButton = __esmMin((() => {
	import_jsx_runtime$33 = require_jsx_runtime();
	propTypes$28 = {
		name: PropTypes.string,
		value: PropTypes.string,
		checked: PropTypes.bool,
		onChange: PropTypes.func,
		label: PropTypes.string,
		description: PropTypes.string,
		disabled: PropTypes.bool
	};
	BulkDownloadRadioButton = ({ name, value, checked, onChange = () => {}, label, description = false, disabled = false }) => {
		const onKeyDown = (e) => {
			if (e.keyCode === 13) e.preventDefault();
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$33.jsx)("div", {
			className: "radio",
			children: /* @__PURE__ */ (0, import_jsx_runtime$33.jsxs)("label", {
				className: "radio-label",
				htmlFor: name,
				children: [/* @__PURE__ */ (0, import_jsx_runtime$33.jsx)("input", {
					type: "radio",
					"aria-label": value,
					value,
					name,
					onKeyDown,
					checked,
					onChange,
					disabled
				}), description ? /* @__PURE__ */ (0, import_jsx_runtime$33.jsxs)("div", {
					className: "radio-container",
					children: [label, /* @__PURE__ */ (0, import_jsx_runtime$33.jsx)("div", {
						className: "radio-description",
						children: description
					})]
				}) : label]
			})
		});
	};
	BulkDownloadRadioButton.propTypes = propTypes$28;
}));
//#endregion
//#region src/js/components/bulkDownload/awards/filters/AgencyFilter.jsx
/**
* AgencyFilter.jsx
* Created by Lizzie Salita 11/2/17
*/
var import_jsx_runtime$32, propTypes$27, AgencyFilter;
var init_AgencyFilter = __esmMin((() => {
	init_es();
	init_bulkDownloadOptions();
	init_FilterSelectionTitle();
	init_ComboBox();
	init_BulkDownloadRadioButton();
	import_jsx_runtime$32 = require_jsx_runtime();
	propTypes$27 = {
		agencies: PropTypes.object,
		subAgencies: PropTypes.array,
		setSubAgencyList: PropTypes.func,
		updateFilter: PropTypes.func
	};
	AgencyFilter = memo(function AgencyFilter({ agencies, subAgencies, setSubAgencyList, updateFilter }) {
		const currentAgencyType = useSelector((state) => state.bulkDownload.awards.agencyType);
		const onChange = (e) => updateFilter("agencyType", e.target.value);
		const handleAgencySelect = (e) => {
			e.preventDefault();
			const target = e.target;
			updateFilter("agency", {
				id: target.value,
				name: target.name
			});
			if (target.value === "all") setSubAgencyList("");
			else setSubAgencyList(target.value);
		};
		const handleSubAgencySelect = (e) => {
			e.preventDefault();
			const target = e.target;
			updateFilter("subAgency", { name: target.value });
		};
		const agencyTypesList = awardDownloadOptions.agencyTypes.map(({ name, label, description }) => /* @__PURE__ */ (0, import_jsx_runtime$32.jsx)(BulkDownloadRadioButton, {
			name: "agencyType",
			value: name,
			checked: currentAgencyType === name,
			onChange,
			label,
			description
		}, name));
		let agenciesArray = [{
			name: "All",
			toptier_agency_id: "all",
			toptier_code: "all"
		}];
		Object.entries(agencies).forEach(([key, value]) => {
			const title = {
				name: key === "cfoAgencies" ? "CFO AGENCIES" : "OTHER AGENCIES",
				toptier_agency_id: key,
				toptier_code: null
			};
			agenciesArray = [
				...agenciesArray,
				title,
				...value
			];
		});
		const agenciesOptions = agenciesArray.map(({ name, toptier_agency_id: id, toptier_code: code }) => ({
			text: name,
			value: code ? id.toString() : `${id}-disabled`
		}));
		const subAgenciesOptions = subAgencies.map(({ subtier_agency_name: name }) => ({
			text: name,
			value: name
		}));
		return /* @__PURE__ */ (0, import_jsx_runtime$32.jsxs)("div", {
			className: "download-filter",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)(FilterSectionTitle, { type: "agency" }), /* @__PURE__ */ (0, import_jsx_runtime$32.jsxs)("div", {
				className: "download-filter__content agency",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)("div", {
						className: "input-container",
						children: agencyTypesList
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$32.jsxs)("div", {
						className: "combo-box-container",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)(ComboBox, {
							optionsArray: agenciesOptions,
							onSelect: handleAgencySelect,
							label: /* @__PURE__ */ (0, import_jsx_runtime$32.jsxs)(import_jsx_runtime$32.Fragment, { children: [
								currentAgencyType === "awarding_agency" ? "Awarding " : "Funding ",
								"Agency",
								/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)("span", { children: " (Required)" })
							] }),
							placeholder: "Select agency",
							disabled: agenciesOptions.length === 3
						}), /* @__PURE__ */ (0, import_jsx_runtime$32.jsx)(ComboBox, {
							optionsArray: subAgenciesOptions,
							onSelect: handleSubAgencySelect,
							label: "Sub-agency",
							placeholder: "Select sub-agency",
							disabled: subAgenciesOptions.length === 0
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$32.jsxs)("p", {
						className: "download-filter__content-note",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)("span", {
							className: "download-filter__content-note_bold",
							children: "Note: "
						}), "Prior to FY19, Financial Assistance awards (grants, direct payments, loans, insurance, and other financial assistance) only sporadically include Funding Agency data."]
					})
				]
			})]
		});
	});
	AgencyFilter.propTypes = propTypes$27;
}));
//#endregion
//#region src/js/components/bulkDownload/awards/filters/LocationFilter.jsx
/**
* LocationFilter.jsx
* Created by Lizzie Salita 3/23/18
*/
var import_jsx_runtime$31, countryOptions, getCountryOption, locationTypes, propTypes$26, LocationFilter;
var init_LocationFilter = __esmMin((() => {
	init_es();
	init_bulkDownloadOptions();
	init_FilterSelectionTitle();
	init_ComboBox();
	init_BulkDownloadRadioButton();
	import_jsx_runtime$31 = require_jsx_runtime();
	countryOptions = [
		{
			value: "all",
			text: "All Countries"
		},
		{
			value: "USA",
			text: "United States"
		},
		{
			value: "FOREIGN",
			text: "All Foreign Countries"
		}
	];
	getCountryOption = (v) => {
		switch (v) {
			case "USA": return {
				code: countryOptions[1].value,
				name: countryOptions[1].text
			};
			case "FOREIGN": return {
				code: countryOptions[2].value,
				name: countryOptions[2].text
			};
			default: return {
				code: countryOptions[0].value,
				name: countryOptions[0].text
			};
		}
	};
	({locationTypes} = awardDownloadOptions);
	propTypes$26 = {
		states: PropTypes.array,
		updateFilter: PropTypes.func
	};
	LocationFilter = memo(function LocationFilter({ states, updateFilter }) {
		const location = useSelector((state) => state.bulkDownload.awards.location);
		const locationType = useSelector((state) => state.bulkDownload.awards.locationType);
		const onChange = (e) => {
			const target = e.target;
			updateFilter("locationType", target.value);
		};
		const updateCountry = useCallback((e) => {
			updateFilter("location", {
				country: getCountryOption(e.target.value),
				state: {
					code: "",
					name: ""
				}
			});
		}, [updateFilter]);
		const onCountryClearSelect = () => updateFilter("location", "");
		const updateState = (e) => {
			const getState = (v) => {
				switch (v) {
					case "": return [{
						code: "",
						name: ""
					}];
					case "all": return [{
						code: "all",
						name: "All"
					}];
					default: return states.filter(({ code }) => code === e.target.value);
				}
			};
			updateFilter("location", Object.assign({}, location, { state: getState(e.target.value)[0] }));
		};
		const onStateClearSelect = () => updateState({ target: { value: "" } });
		const stateOptions = useMemo(() => {
			const tempArr = states.slice();
			tempArr.unshift({
				code: "all",
				name: "All"
			});
			return tempArr.map(({ code, name }) => ({
				value: code,
				text: name
			}));
		}, [states]);
		const locationTypesArray = locationTypes.map(({ name, label, description }) => /* @__PURE__ */ (0, import_jsx_runtime$31.jsx)(BulkDownloadRadioButton, {
			name: "locationType",
			value: name,
			checked: locationType === name,
			onChange,
			label,
			description
		}, name));
		useEffect(() => updateCountry({ target: { value: "all" } }), [updateCountry]);
		return /* @__PURE__ */ (0, import_jsx_runtime$31.jsxs)("div", {
			className: "download-filter",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$31.jsx)(FilterSectionTitle, { type: "location" }), /* @__PURE__ */ (0, import_jsx_runtime$31.jsxs)("div", {
				className: "download-filter__content location",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$31.jsx)("div", {
					className: "input-container",
					children: locationTypesArray
				}), /* @__PURE__ */ (0, import_jsx_runtime$31.jsxs)("div", {
					className: "combo-box-container",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$31.jsx)(ComboBox, {
						optionsArray: countryOptions,
						onSelect: updateCountry,
						label: "Country",
						placeholder: "Select a Country",
						defaultValue: "All Countries",
						onClearSelect: onCountryClearSelect
					}), /* @__PURE__ */ (0, import_jsx_runtime$31.jsx)(ComboBox, {
						optionsArray: stateOptions,
						onSelect: updateState,
						label: "State",
						placeholder: "Select a State",
						disabled: location.country?.code !== "USA",
						onClearSelect: onStateClearSelect
					})]
				})]
			})]
		});
	});
	LocationFilter.propTypes = propTypes$26;
}));
//#endregion
//#region src/js/components/bulkDownload/awards/filters/DateTypeFilter.jsx
/**
* DateTypeFilter.jsx
* Created by Lizzie Salita 11/2/17
*/
var import_jsx_runtime$30, propTypes$25, DateTypeFilter;
var init_DateTypeFilter = __esmMin((() => {
	init_es();
	init_bulkDownloadOptions();
	init_FilterSelectionTitle();
	init_BulkDownloadRadioButton();
	import_jsx_runtime$30 = require_jsx_runtime();
	propTypes$25 = { updateFilter: PropTypes.func };
	DateTypeFilter = memo(function DateTypeFilter({ updateFilter }) {
		const currentDateType = useSelector((state) => state.bulkDownload.awards.dateType);
		const onChange = (e) => {
			const target = e.target;
			updateFilter("dateType", target.value);
		};
		const dateTypes = awardDownloadOptions.dateTypes.map(({ name, label, description }) => /* @__PURE__ */ (0, import_jsx_runtime$30.jsx)(BulkDownloadRadioButton, {
			name: "dateType",
			value: name,
			checked: currentDateType === name,
			onChange,
			label,
			description
		}, name));
		return /* @__PURE__ */ (0, import_jsx_runtime$30.jsxs)("div", {
			className: "download-filter",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)(FilterSectionTitle, { type: "date" }), /* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("div", {
				className: "download-filter__content date-type",
				children: dateTypes
			})]
		});
	});
	DateTypeFilter.propTypes = propTypes$25;
}));
//#endregion
//#region src/js/components/bulkDownload/awards/filters/dateRange/CustomDatePicker.jsx
/**
* CustomDatePicker.jsx
* Created by JD House 5/22/2026
**/
var import_jsx_runtime$29, dayjs$3, propTypes$24, dayNames, buildCalendarDays, autoFormatInput, parseInputDate, CustomDatePicker;
var init_CustomDatePicker = __esmMin((() => {
	init_dist();
	init_Icons();
	import_jsx_runtime$29 = require_jsx_runtime();
	dayjs$3 = require_dayjs_min();
	propTypes$24 = {
		value: PropTypes.string,
		type: PropTypes.string,
		onDateChange: PropTypes.func,
		title: PropTypes.string,
		min: PropTypes.string,
		error: PropTypes.object
	};
	dayNames = [
		"S",
		"M",
		"T",
		"W",
		"Th",
		"F",
		"S"
	];
	buildCalendarDays = (viewDate) => {
		const startOfMonth = viewDate.startOf("month");
		const endOfMonth = viewDate.endOf("month");
		const daysInMonth = viewDate.daysInMonth();
		const firstDayOfWeek = startOfMonth.day();
		const days = [];
		for (let i = firstDayOfWeek - 1; i >= 0; i--) days.push({
			date: startOfMonth.subtract(i + 1, "day"),
			outside: true
		});
		for (let d = 0; d < daysInMonth; d++) days.push({
			date: startOfMonth.add(d, "day"),
			outside: false
		});
		const trailing = 42 - days.length;
		for (let t = 1; t <= trailing; t++) days.push({
			date: endOfMonth.add(t, "day"),
			outside: true
		});
		return days;
	};
	autoFormatInput = (text) => {
		const digits = text.replace(/\D/g, "");
		let formatted = digits.substring(0, 2);
		if (digits.length >= 3) formatted = `${formatted}/${digits.substring(2, 4)}`;
		if (digits.length >= 5) formatted = `${formatted}/${digits.substring(4, 8)}`;
		return formatted;
	};
	parseInputDate = (value) => {
		const digits = value.replace(/\D/g, "");
		if (digits.length !== 8) return null;
		const parsed = dayjs$3(`${digits.substring(4, 8)}-${digits.substring(0, 2)}-${digits.substring(2, 4)}`);
		return parsed.isValid() ? parsed : null;
	};
	CustomDatePicker = memo(function CustomDatePicker({ value, type = "startDate", onDateChange, title, min, error = {
		active: false,
		type: null
	} }) {
		const [inputValue, setInputValue] = useState("");
		const [isOpen, setIsOpen] = useState(false);
		const [viewDate, setViewDate] = useState(dayjs$3().startOf("month"));
		const [selectedDate, setSelectedDate] = useState("");
		const [showError, setShowError] = useState(false);
		const pickerRef = useRef(null);
		const calendarDays = buildCalendarDays(viewDate);
		const toggleMonth = useCallback((forward) => {
			if (forward) setViewDate((prev) => prev.add(1, "month"));
			else setViewDate((prev) => prev.subtract(1, "month"));
		}, []);
		const toggleYear = useCallback((forward) => {
			if (forward) setViewDate((prev) => prev.add(1, "year"));
			else setViewDate((prev) => prev.subtract(1, "year"));
		}, []);
		const selectDay = useCallback((date) => {
			setSelectedDate(date);
			setInputValue(date.format("MM/DD/YYYY"));
			setViewDate(date.startOf("month"));
			setIsOpen(false);
			onDateChange(date, type);
			setIsOpen(false);
		}, [onDateChange, type]);
		const handleInputChange = (e) => {
			if (e.target.value === "") onDateChange(e.target.value, type);
			const formatted = autoFormatInput(e.target.value);
			setInputValue(formatted);
			const parsed = parseInputDate(formatted);
			if (parsed) {
				setSelectedDate(parsed);
				setViewDate(parsed.startOf("month"));
				onDateChange(e.target.value, type);
			}
		};
		useEffect(() => {
			const handleOutsideClick = (e) => {
				if (pickerRef.current && !pickerRef.current.contains(e.target)) setIsOpen(false);
			};
			if (isOpen) document.addEventListener("click", handleOutsideClick);
			return () => {
				document.removeEventListener("click", handleOutsideClick);
			};
		}, [pickerRef, isOpen]);
		useEffect(() => {
			if (value) {
				const dayValue = dayjs$3(value);
				setInputValue(dayValue.format("MM/DD/YYYY"));
				setViewDate(dayValue.startOf("month"));
				setSelectedDate(dayValue);
			}
		}, [value]);
		const datepickerHeader = () => /* @__PURE__ */ (0, import_jsx_runtime$29.jsxs)(import_jsx_runtime$29.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime$29.jsx)(FontAwesomeIcon, {
				className: "custom-datepicker__header-icon",
				onClick: (e) => {
					e.preventDefault();
					toggleYear(false);
				},
				icon: "chevrons-left"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$29.jsx)(FontAwesomeIcon, {
				className: "custom-datepicker__header-icon",
				onClick: (e) => {
					e.preventDefault();
					toggleMonth(false);
				},
				icon: "chevron-left"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$29.jsx)("h3", { children: viewDate.format("MMM YYYY") }),
			/* @__PURE__ */ (0, import_jsx_runtime$29.jsx)(FontAwesomeIcon, {
				className: "custom-datepicker__header-icon",
				onClick: (e) => {
					e.preventDefault();
					toggleMonth(true);
				},
				icon: "chevron-right"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$29.jsx)(FontAwesomeIcon, {
				className: "custom-datepicker__header-icon",
				onClick: (e) => {
					e.preventDefault();
					toggleYear(true);
				},
				icon: "chevrons-right"
			})
		] });
		useEffect(() => {
			setShowError(error?.active && type.startsWith(error?.type));
		}, [error]);
		return /* @__PURE__ */ (0, import_jsx_runtime$29.jsx)("div", {
			className: "custom-datepicker",
			ref: pickerRef,
			children: /* @__PURE__ */ (0, import_jsx_runtime$29.jsxs)("label", {
				className: "custom-datepicker__label",
				htmlFor: `${type}-input-field`,
				children: [
					title,
					/* @__PURE__ */ (0, import_jsx_runtime$29.jsxs)("div", {
						className: `custom-datepicker__input-container
                     ${showError ? "input-error" : ""}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime$29.jsx)("input", {
							className: "custom-datepicker__input-field",
							id: `${type}-input-field`,
							name: `${type}-input-field`,
							type: "text",
							placeholder: "mm/dd/yyyy",
							"aria-label": `${type}-input-field`,
							value: inputValue,
							min,
							onChange: handleInputChange,
							onClick: () => setIsOpen(!isOpen)
						}), /* @__PURE__ */ (0, import_jsx_runtime$29.jsx)(FontAwesomeIcon, {
							icon: "calendar",
							className: "custom-datepicker__icon"
						})]
					}),
					isOpen && /* @__PURE__ */ (0, import_jsx_runtime$29.jsxs)("div", {
						className: "custom-datepicker__popup",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$29.jsx)("div", {
							className: "custom-datepicker__header",
							children: datepickerHeader()
						}), /* @__PURE__ */ (0, import_jsx_runtime$29.jsxs)("div", {
							className: "custom-datepicker__grid",
							children: [dayNames.map((name) => /* @__PURE__ */ (0, import_jsx_runtime$29.jsx)("div", {
								className: "custom-datepicker__day-name",
								children: name
							}, uniqueId())), calendarDays.map(({ date, outside }) => {
								const outsideClass = outside ? " outside" : "";
								const selectedClass = date.isSame(selectedDate) ? " isSelected" : "";
								return /* @__PURE__ */ (0, import_jsx_runtime$29.jsx)("button", {
									"aria-label": `datepicker-date-${date.date()}`,
									className: `custom-datepicker__date
                                        ${outsideClass}
                                        ${selectedClass}`,
									onClick: () => selectDay(dayjs$3(date)),
									children: date.date()
								}, uniqueId());
							})]
						})]
					}),
					showError && /* @__PURE__ */ (0, import_jsx_runtime$29.jsxs)("div", {
						className: "date-error",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$29.jsx)(ExclamationCircle, { alt: "An error occurred" }), error.message]
					})
				]
			})
		});
	});
	CustomDatePicker.propTypes = propTypes$24;
}));
//#endregion
//#region src/js/components/bulkDownload/awards/filters/dateRange/DownloadDateRange.jsx
/**
* DownloadDateRange.jsx
* Created by Lizzie Salita 11/1/17
**/
var import_jsx_runtime$28, propTypes$23, DownloadDateRange;
var init_DownloadDateRange = __esmMin((() => {
	init_CustomDatePicker();
	import_jsx_runtime$28 = require_jsx_runtime();
	propTypes$23 = {
		startDate: PropTypes.object,
		endDate: PropTypes.object,
		onDateChange: PropTypes.func,
		error: PropTypes.object
	};
	DownloadDateRange = memo(function DownloadDateRange({ startDate = "01/01/2016", endDate = "12/31/2016", onDateChange, error = { active: false } }) {
		return /* @__PURE__ */ (0, import_jsx_runtime$28.jsxs)("div", {
			className: "datepicker-container",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$28.jsx)(CustomDatePicker, {
				value: startDate,
				type: "startDateBulk",
				onDateChange,
				title: /* @__PURE__ */ (0, import_jsx_runtime$28.jsxs)(import_jsx_runtime$28.Fragment, { children: ["Start Date ", /* @__PURE__ */ (0, import_jsx_runtime$28.jsx)("span", {
					className: "required",
					children: " (Required)"
				})] }),
				min: "2000-10-01",
				error
			}), /* @__PURE__ */ (0, import_jsx_runtime$28.jsx)(CustomDatePicker, {
				value: endDate,
				type: "endDateBulk",
				title: /* @__PURE__ */ (0, import_jsx_runtime$28.jsxs)(import_jsx_runtime$28.Fragment, { children: ["End Date ", /* @__PURE__ */ (0, import_jsx_runtime$28.jsx)("span", {
					className: "required",
					children: " (Required)"
				})] }),
				onDateChange,
				min: "2000-10-01",
				error
			})]
		});
	});
	DownloadDateRange.propTypes = propTypes$23;
}));
//#endregion
//#region src/js/components/bulkDownload/awards/filters/dateRange/TimePeriodFilter.jsx
/**
* TimePeriodFilter.jsx
* Created by Lizzie Salita 11/1/17
**/
var import_jsx_runtime$27, dayjs$2, isSameOrAfter, propTypes$22, errorTypes, TimePeriodFilter;
var init_TimePeriodFilter = __esmMin((() => {
	init_ComboBox();
	init_FilterSelectionTitle();
	init_fiscalYearHelper();
	init_bulkDownloadOptions();
	init_DownloadDateRange();
	init_BulkDownloadRadioButton();
	import_jsx_runtime$27 = require_jsx_runtime();
	dayjs$2 = require_dayjs_min();
	isSameOrAfter = require_isSameOrAfter();
	dayjs$2.extend(isSameOrAfter);
	propTypes$22 = {
		filterTimePeriodStart: PropTypes.string,
		filterTimePeriodEnd: PropTypes.string,
		updateStartDate: PropTypes.func,
		updateEndDate: PropTypes.func,
		setValidDates: PropTypes.func
	};
	errorTypes = {
		order: {
			title: "Invalid Dates",
			message: "The end date cannot be earlier than the start date.",
			type: "end",
			active: true
		},
		range: {
			title: "Invalid Date Range",
			message: "Date range cannot span more than one year.",
			type: "end",
			active: true
		},
		invalid: {
			title: "Invalid Date",
			message: "Invalid date",
			active: true
		},
		incomplete: {
			title: "Incomplete",
			message: "Date range must have a start date and end date.",
			type: null,
			active: true
		},
		empty: {
			title: "",
			message: "",
			type: null,
			active: false
		}
	};
	TimePeriodFilter = ({ filterTimePeriodStart, filterTimePeriodEnd, updateStartDate, updateEndDate, setValidDates }) => {
		const [startDateBulkUI, setStartDateBulkUI] = useState(filterTimePeriodStart);
		const [endDateBulkUI, setEndDateBulkUI] = useState(filterTimePeriodEnd);
		const [error, setError] = useState(errorTypes.empty);
		const [currentTimeType, setCurrentTimeType] = useState("time_period");
		let defaultValue = "";
		const validateDates = useCallback(() => {
			const start = dayjs$2.isDayjs(startDateBulkUI) ? startDateBulkUI : dayjs$2(startDateBulkUI);
			const end = dayjs$2.isDayjs(endDateBulkUI) ? endDateBulkUI : dayjs$2(endDateBulkUI);
			const yearBeforeEnd = dayjs$2(endDateBulkUI).subtract(1, "y");
			if (start.isValid() && end.isValid()) if (!end.isSameOrAfter(start)) setError(errorTypes.order);
			else if (!start.isSameOrAfter(yearBeforeEnd)) setError(errorTypes.range);
			else {
				setError(errorTypes.empty);
				updateStartDate(start.format("YYYY-MM-DD"));
				updateEndDate(end.format("YYYY-MM-DD"));
				setValidDates(true);
			}
			else if (start.isValid() || end.isValid()) {
				let errorMessage = errorTypes.incomplete;
				if (start.isValid()) {
					const startValue = start.format("YYYY-MM-DD");
					errorMessage = {
						...errorMessage,
						type: "end"
					};
					updateStartDate(startValue);
					setValidDates(false);
					setError(errorMessage);
				} else {
					const endValue = end.format("YYYY-MM-DD");
					errorMessage = {
						...errorMessage,
						type: "start"
					};
					setError(errorMessage);
					updateEndDate(endValue);
					setValidDates(false);
				}
			} else {
				updateStartDate("");
				updateEndDate("");
				setValidDates(false);
			}
		}, [
			endDateBulkUI,
			setValidDates,
			startDateBulkUI,
			updateEndDate,
			updateStartDate
		]);
		const handleDateUpdate = (start = "", end = "") => {
			setStartDateBulkUI(start);
			setEndDateBulkUI(end);
			if (start === "" && end === "") {
				updateStartDate("");
				updateEndDate("");
				setValidDates(false);
			}
		};
		const handleComboDateChange = (e) => {
			e.preventDefault();
			const value = e.target.value;
			if (value) {
				const [start, end] = value.split(" - ").map((date) => dayjs$2(date.trim()));
				handleDateUpdate(start, end);
			}
		};
		const handleDateChange = (date, dateType) => {
			let value = dayjs$2(date);
			let errorMessage = errorTypes.invalid;
			if (!date) value = null;
			if (dateType === "startDateBulk") if (value?.isValid()) setStartDateBulkUI(value);
			else if (date === "") {
				setStartDateBulkUI("");
				updateStartDate("");
				setValidDates(false);
			} else {
				errorMessage = {
					...errorMessage,
					type: "start"
				};
				setError(errorMessage);
				setValidDates(false);
			}
			if (dateType === "endDateBulk") if (value?.isValid()) setEndDateBulkUI(value);
			else if (date === "") {
				setEndDateBulkUI("");
				updateEndDate("");
				setValidDates(false);
			} else {
				errorMessage = {
					...errorMessage,
					type: "end"
				};
				setError(errorMessage);
				setValidDates(false);
			}
		};
		const periodOptions = awardDownloadOptions.dateRangeButtons.map((range) => ({
			text: range.label,
			value: `${range.startDate} - ${range.endDate}`
		}));
		for (const year of allFiscalYears(2001)) {
			const fyDateRange = convertFYToDateRange(year);
			periodOptions.push({
				text: `FY ${year}`,
				value: `${fyDateRange[0]} - ${fyDateRange[1]}`
			});
		}
		if (startDateBulkUI && endDateBulkUI) {
			const searchValue = `${dayjs$2.isDayjs(startDateBulkUI) ? startDateBulkUI.format("YYYY-MM-DD") : startDateBulkUI} - ${dayjs$2.isDayjs(endDateBulkUI) ? endDateBulkUI.format("YYYY-MM-DD") : endDateBulkUI}`;
			const persistedOption = periodOptions.find((option) => option.value === searchValue);
			if (persistedOption) defaultValue = persistedOption.text;
		}
		useEffect(() => {
			setStartDateBulkUI(filterTimePeriodStart);
		}, [filterTimePeriodStart]);
		useEffect(() => {
			setEndDateBulkUI(filterTimePeriodEnd);
		}, [filterTimePeriodEnd]);
		useEffect(() => {
			if (startDateBulkUI === filterTimePeriodStart && endDateBulkUI === filterTimePeriodEnd) return;
			validateDates();
		}, [
			startDateBulkUI,
			endDateBulkUI,
			validateDates
		]);
		const timePeriodTypeList = awardDownloadOptions.timePeriodTypes.map(({ name, label, description }) => /* @__PURE__ */ (0, import_jsx_runtime$27.jsx)(BulkDownloadRadioButton, {
			name: "periodType",
			value: name,
			checked: currentTimeType === name,
			onChange: () => setCurrentTimeType(name),
			label,
			description
		}, name));
		return /* @__PURE__ */ (0, import_jsx_runtime$27.jsxs)("div", {
			className: "download-filter",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$27.jsx)(FilterSectionTitle, { type: "dateRange" }), /* @__PURE__ */ (0, import_jsx_runtime$27.jsxs)("div", {
				className: "download-filter__content time-period",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$27.jsx)("div", {
						className: "input-container",
						children: timePeriodTypeList
					}),
					currentTimeType === "time_period" ? /* @__PURE__ */ (0, import_jsx_runtime$27.jsx)("div", {
						className: "combo-box-container",
						children: /* @__PURE__ */ (0, import_jsx_runtime$27.jsx)(ComboBox, {
							optionsArray: periodOptions,
							onSelect: handleComboDateChange,
							onClearSelect: handleDateUpdate,
							formName: "time-period-combo",
							label: /* @__PURE__ */ (0, import_jsx_runtime$27.jsxs)(import_jsx_runtime$27.Fragment, { children: ["Time Period ", /* @__PURE__ */ (0, import_jsx_runtime$27.jsx)("span", {
								className: "required",
								children: "(Required)"
							})] }),
							placeholder: "Select time period",
							defaultValue
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime$27.jsx)(DownloadDateRange, {
						datePlaceholder: "",
						startDate: startDateBulkUI,
						endDate: endDateBulkUI,
						onDateChange: handleDateChange,
						error
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$27.jsxs)("p", {
						className: "download-filter__content-note",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$27.jsx)("span", {
							className: "download-filter__content-note_bold",
							children: "Note: "
						}), "Data is available for download from 10/01/2000 (FY 2001) - present."]
					})
				]
			})]
		});
	};
	TimePeriodFilter.propTypes = propTypes$22;
}));
//#endregion
//#region src/js/components/bulkDownload/awards/filters/FileFormatFilter.jsx
/**
* FileFormatFilter.jsx
* Created by Lizzie Salita 11/3/17
*/
var import_jsx_runtime$26, propTypes$21, FileFormatFilter;
var init_FileFormatFilter = __esmMin((() => {
	init_es();
	init_bulkDownloadOptions();
	init_FilterSelectionTitle();
	init_BulkDownloadRadioButton();
	import_jsx_runtime$26 = require_jsx_runtime();
	propTypes$21 = { updateFilter: PropTypes.func };
	FileFormatFilter = memo(function FileFormatFilter({ updateFilter }) {
		const currentFileFormat = useSelector((state) => state.bulkDownload.awards.fileFormat);
		const onChange = (e) => {
			const target = e.target;
			updateFilter("fileFormat", target.value);
		};
		const fileFormats = awardDownloadOptions.fileFormats.map(({ name, label, disabled }) => /* @__PURE__ */ (0, import_jsx_runtime$26.jsx)(BulkDownloadRadioButton, {
			name: "fileFormat",
			value: name,
			checked: currentFileFormat === name,
			onChange,
			label,
			disabled
		}, name));
		return /* @__PURE__ */ (0, import_jsx_runtime$26.jsxs)("div", {
			className: "download-filter",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$26.jsx)(FilterSectionTitle, { type: "file" }), /* @__PURE__ */ (0, import_jsx_runtime$26.jsx)("div", {
				className: "download-filter__content file-type",
				children: fileFormats
			})]
		});
	});
	FileFormatFilter.propTypes = propTypes$21;
}));
//#endregion
//#region src/js/components/bulkDownload/awards/DownloadTooltip.jsx
/**
* DownloadTooltip.jsx
* Created by Lizzie Salita 3/26/18
*/
var import_jsx_runtime$25, propTypes$20, DownloadTooltip;
var init_DownloadTooltip = __esmMin((() => {
	init_Icons();
	import_jsx_runtime$25 = require_jsx_runtime();
	propTypes$20 = {
		filters: PropTypes.object,
		validDates: PropTypes.bool,
		dataType: PropTypes.string
	};
	DownloadTooltip = class extends React.Component {
		constructor(props) {
			super(props);
			this.generateAwardsRequiredFields = this.generateAwardsRequiredFields.bind(this);
			this.generateAccountsRequiredFields = this.generateAccountsRequiredFields.bind(this);
		}
		generateAwardsRequiredFields() {
			const filters = this.props.filters;
			const requiredFields = [];
			if (!filters.awardTypes.primeAwards.size > 0 && !filters.awardTypes.subAwards.size > 0) requiredFields.push("Award Type");
			if (!this.props.validDates || !filters.dateType) requiredFields.push("Date Range");
			if (!filters.agency.id) requiredFields.push("Agency");
			if (!filters.location) requiredFields.push("Recipient Location");
			if (!filters.fileFormat) requiredFields.push("File Format");
			return requiredFields.map((field) => /* @__PURE__ */ (0, import_jsx_runtime$25.jsx)("li", { children: field }, field));
		}
		generateAccountsRequiredFields() {
			const filters = this.props.filters;
			const requiredFields = [];
			if (!filters.agency.id && !filters.budgetFunction.code) requiredFields.push("Budget Function or Agency");
			if (!filters.submissionType) requiredFields.push("File Type");
			if (!filters.fy || !filters.quarter) requiredFields.push("Time Period");
			return requiredFields.map((field) => /* @__PURE__ */ (0, import_jsx_runtime$25.jsx)("li", { children: field }, field));
		}
		render() {
			let missingFields = null;
			if (this.props.dataType === "awards") missingFields = this.generateAwardsRequiredFields();
			else if (this.props.dataType === "accounts") missingFields = this.generateAccountsRequiredFields();
			return /* @__PURE__ */ (0, import_jsx_runtime$25.jsx)("div", {
				className: "download-tooltip",
				id: "download-disabled-tooltip",
				role: "tooltip",
				children: /* @__PURE__ */ (0, import_jsx_runtime$25.jsxs)("div", {
					className: "download-tooltip__interior",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$25.jsx)("div", { className: "tooltip-pointer" }), /* @__PURE__ */ (0, import_jsx_runtime$25.jsxs)("div", {
						className: "download-tooltip__content",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$25.jsx)("div", {
							className: "download-tooltip__icon",
							children: /* @__PURE__ */ (0, import_jsx_runtime$25.jsx)(InfoCircle, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime$25.jsxs)("div", {
							className: "download-tooltip__message",
							children: ["The following fields are required:", /* @__PURE__ */ (0, import_jsx_runtime$25.jsx)("ul", {
								className: "download-tooltip__list",
								children: missingFields
							})]
						})]
					})]
				})
			});
		}
	};
	DownloadTooltip.propTypes = propTypes$20;
}));
//#endregion
//#region src/js/components/bulkDownload/awards/SubmitButton.jsx
/**
* SubmitButton.jsx
* Created by Lizzie Salita 3/26/18
*/
var import_jsx_runtime$24, propTypes$19, SubmitButton;
var init_SubmitButton = __esmMin((() => {
	init_DownloadTooltip();
	import_jsx_runtime$24 = require_jsx_runtime();
	propTypes$19 = {
		validForm: PropTypes.bool,
		filters: PropTypes.object,
		validDates: PropTypes.bool,
		dataType: PropTypes.string,
		handleSubmit: PropTypes.func
	};
	SubmitButton = class extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				showHover: false,
				offsetTop: 0,
				offsetRight: 0
			};
			this.onMouseEnter = this.onMouseEnter.bind(this);
			this.onMouseLeave = this.onMouseLeave.bind(this);
			this.onClick = this.onClick.bind(this);
			this.measureOffset = throttle(this.measureOffset.bind(this), 16);
		}
		componentDidMount() {
			this.measureOffset();
			window.addEventListener("scroll", this.measureOffset);
			window.addEventListener("resize", this.measureOffset);
		}
		componentWillUnmount() {
			window.removeEventListener("scroll", this.measureOffset);
			window.removeEventListener("resize", this.measureOffset);
		}
		onMouseEnter() {
			this.setState({ showHover: true });
		}
		onMouseLeave() {
			this.setState({ showHover: false });
		}
		onClick(e) {
			e.preventDefault();
			this.props.handleSubmit();
		}
		measureOffset() {
			const targetElement = this.referenceDiv;
			const offsetTop = targetElement.offsetTop - 15;
			const offsetRight = window.innerWidth - targetElement.offsetLeft - targetElement.clientWidth - 290;
			this.setState({
				offsetTop,
				offsetRight
			});
		}
		render() {
			let tooltip = null;
			if (!this.props.validForm && this.state.showHover) tooltip = /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)("div", {
				className: "download-tooltip-spacer",
				style: {
					top: this.state.offsetTop,
					right: this.state.offsetRight
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)(DownloadTooltip, {
					filters: this.props.filters,
					validDates: this.props.validDates,
					dataType: this.props.dataType
				})
			});
			let submitButton = /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)("div", {
				className: "submit-button submit-button_disabled",
				onMouseEnter: this.onMouseEnter,
				onMouseLeave: this.onMouseLeave,
				onFocus: this.onMouseEnter,
				onBlur: this.onMouseLeave,
				children: /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)("button", {
					disabled: true,
					children: "Download"
				})
			});
			if (this.props.validForm && this.props.validDates) submitButton = /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)("div", {
				className: "submit-button",
				children: /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)("input", {
					type: "submit",
					value: "Download",
					onClick: this.props.handleSubmit
				})
			});
			return /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)("div", {
				className: "submit-wrapper",
				children: /* @__PURE__ */ (0, import_jsx_runtime$24.jsxs)("div", {
					ref: (div) => {
						this.referenceDiv = div;
					},
					children: [submitButton, tooltip]
				})
			});
		}
	};
	SubmitButton.propTypes = propTypes$19;
}));
//#endregion
//#region src/js/components/bulkDownload/awards/AwardsUserSelections.jsx
var import_jsx_runtime$23, dayjs$1, AwardsUserSelections;
var init_AwardsUserSelections = __esmMin((() => {
	init_bulkDownloadOptions();
	init_es();
	init_dist();
	import_jsx_runtime$23 = require_jsx_runtime();
	dayjs$1 = require_dayjs_min();
	AwardsUserSelections = () => {
		const awards = useSelector((state) => state.bulkDownload.awards);
		const generateAwardTypeString = () => {
			const options = Object.assign({}, ...Object.entries(awardDownloadOptions.awardTypeLookups).map(([key, value]) => ({ [key]: value.label })));
			const selectionsArray = Object.values(awards.awardTypes).reduce((acc, curr) => acc.concat(curr.toArray()), []).map((awardType) => options[awardType]);
			let selectionsString = "";
			if (selectionsArray.length !== 0) {
				for (let i = 0; i < selectionsArray.length; i++) if (i === 0) selectionsString = `${selectionsArray[i]}`;
				else selectionsString = `${selectionsString}, ${selectionsArray[i]}`;
				return /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("div", {
					className: "selection__content",
					children: selectionsString
				});
			}
			return /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("div", {
				className: "selection__content selection__content-required",
				children: "Required"
			});
		};
		const generateDateTypeString = () => {
			if (awards.dateType !== "") return /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("div", {
				className: "selection__content",
				children: awardDownloadOptions.dateTypes.find((option) => option.name === awards.dateType).label
			});
			return /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("div", {
				className: "selection__content selection__content-required",
				children: "Required"
			});
		};
		const generateFileFormatString = () => {
			if (awards.fileFormat !== "") return /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("div", {
				className: "selection__content",
				children: awardDownloadOptions.fileFormats.find((option) => option.name === awards.fileFormat).label
			});
			return /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("div", {
				className: "selection__content selection__content-required",
				children: "required"
			});
		};
		const generateAgencyString = () => {
			if (awards.agency.name !== "Select an Agency") return /* @__PURE__ */ (0, import_jsx_runtime$23.jsxs)("div", {
				className: "selection__content",
				children: [
					awardDownloadOptions.agencyTypes.find((option) => option.name === awards.agencyType).label,
					": ",
					awards.agency.name
				]
			});
			return /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("div", {
				className: "selection__content selection__content-required",
				children: "Required"
			});
		};
		const generateSubAgencyString = () => {
			if (awards.subAgency.name !== "Select a Sub-Agency") return /* @__PURE__ */ (0, import_jsx_runtime$23.jsxs)("div", {
				className: "selection__content",
				children: ["Sub-agency: ", awards.subAgency.name]
			});
			return null;
		};
		const generateLocationString = () => {
			const locationType = awardDownloadOptions.locationTypes.find((option) => option.name === awards.locationType).label;
			if (awards.location?.country?.code && awards.location?.country?.code !== "all") {
				if (awards.location.state.code && awards.location.state.code !== "all") return /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("div", {
					className: "selection__content",
					children: `${locationType}: ${awards.location.state.name}, ${awards.location.country.name}`
				});
				return /* @__PURE__ */ (0, import_jsx_runtime$23.jsxs)("div", {
					className: "selection__content",
					children: [
						locationType,
						": ",
						awards.location.country.name
					]
				});
			}
			return /* @__PURE__ */ (0, import_jsx_runtime$23.jsxs)("div", {
				className: "selection__content",
				children: [locationType, ": All countries"]
			});
		};
		const generateDateRangeString = () => {
			let startDate = awards.dateRange.startDate;
			let endDate = awards.dateRange.endDate;
			if (startDate !== "") startDate = dayjs$1(awards.dateRange.startDate).format("MM/DD/YYYY");
			if (endDate !== "") endDate = dayjs$1(awards.dateRange.endDate).format("MM/DD/YYYY");
			if (startDate || endDate) return /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("div", {
				className: "selection__content",
				children: `${startDate} - ${endDate}`
			});
			return /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("div", {
				className: "selection__content selection__content-required",
				children: "Required"
			});
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$23.jsxs)("div", {
			className: "download-user-selections",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("div", { className: "header-bar" }),
				/* @__PURE__ */ (0, import_jsx_runtime$23.jsxs)("div", {
					className: "download-user-selections__title-wrapper",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$23.jsxs)("h3", {
						className: "download-user-selections__title",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$23.jsx)(FontAwesomeIcon, {
							icon: "file-arrow-down",
							className: "title-icon"
						}), "Download Summary"]
					}), /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("h5", {
						className: "download-user-selections__subtitle",
						children: "Your selected options are..."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$23.jsxs)("div", {
					className: "selection",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("div", {
						className: "selection__heading",
						children: "Award Types"
					}), generateAwardTypeString()]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$23.jsxs)("div", {
					className: "selection",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("div", {
							className: "selection__heading",
							children: "Agency"
						}),
						generateAgencyString(),
						generateSubAgencyString()
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$23.jsxs)("div", {
					className: "selection",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("div", {
						className: "selection__heading",
						children: "Location"
					}), generateLocationString()]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$23.jsxs)("div", {
					className: "selection",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("div", {
						className: "selection__heading",
						children: "Date Type"
					}), generateDateTypeString()]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$23.jsxs)("div", {
					className: "selection",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("div", {
						className: "selection__heading",
						children: "Date Range"
					}), generateDateRangeString()]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$23.jsxs)("div", {
					className: "selection",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("div", {
						className: "selection__heading",
						children: "File Format"
					}), generateFileFormatString()]
				})
			]
		});
	};
}));
//#endregion
//#region src/js/components/bulkDownload/awards/AwardDataContent.jsx
/**
* AwardDataContent.jsx
* Created by Lizzie Salita 10/30/17
*/
var import_jsx_runtime$22, propTypes$18, AwardDataContent;
var init_AwardDataContent = __esmMin((() => {
	init_development();
	init_Icons();
	init_Note();
	init_IsMobileContext();
	init_AwardLevelAndTypeFilter();
	init_AgencyFilter();
	init_LocationFilter();
	init_DateTypeFilter();
	init_TimePeriodFilter();
	init_FileFormatFilter();
	init_SubmitButton();
	init_AwardsUserSelections();
	import_jsx_runtime$22 = require_jsx_runtime();
	propTypes$18 = {
		awards: PropTypes.object,
		updateFilter: PropTypes.func,
		updateStartDate: PropTypes.func,
		updateEndDate: PropTypes.func,
		clearAwardFilters: PropTypes.func,
		agencies: PropTypes.object,
		subAgencies: PropTypes.array,
		setSubAgencyList: PropTypes.func,
		states: PropTypes.array,
		clickedDownload: PropTypes.func
	};
	AwardDataContent = ({ awards, updateFilter, updateStartDate, updateEndDate, clearAwardFilters, agencies, subAgencies, setSubAgencyList, states, clickedDownload }) => {
		const { isTablet } = useContext(IsMobileContext);
		const [validDates, setValidDates] = useState(false);
		const [validForm, setValidForm] = useState(false);
		const handleSubmit = (e) => {
			e.preventDefault();
			clickedDownload();
		};
		const resetForm = () => {
			clearAwardFilters();
			setValidDates(false);
		};
		const onKeyDown = (e) => {
			if (e.keyCode === 13) {
				e.preventDefault();
				resetForm();
			}
		};
		const validateForm = useCallback((award, dates) => {
			const primeAwards = award.awardTypes.primeAwards.size > 0;
			const subAwards = award.awardTypes.subAwards.size > 0;
			const form = (primeAwards || subAwards) && dates && award.dateType !== "" && award.agency.id !== "" && award.location !== "" && award.fileFormat !== "";
			setValidForm(form);
		}, []);
		useEffect(() => {
			validateForm(awards, validDates);
		}, [
			awards,
			validDates,
			validateForm
		]);
		useEffect(() => () => clearAwardFilters(), []);
		return /* @__PURE__ */ (0, import_jsx_runtime$22.jsxs)("div", {
			className: "download-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$22.jsxs)("div", {
				className: "download-center__filters",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$22.jsxs)("div", {
					className: "download-center-title-wrapper",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("h2", {
						className: "download-center__title",
						children: "A faster way to download yearly award data by agency."
					}), /* @__PURE__ */ (0, import_jsx_runtime$22.jsxs)("p", { children: [
						"Award downloads for entire fiscal years are available for each major agency on our\xA0",
						/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)(Link, {
							to: "/download_center/award_data_archive",
							children: "Award Data Archive"
						}),
						"\xA0page."
					] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime$22.jsxs)("form", {
					className: "download-center-form",
					onSubmit: handleSubmit,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)(AwardLevelAndTypeFilter, {}),
						/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)(AgencyFilter, {
							agencies,
							subAgencies,
							updateFilter,
							setSubAgencyList,
							valid: awards.agency.id !== ""
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)(LocationFilter, {
							states,
							updateFilter
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)(DateTypeFilter, { updateFilter }),
						/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)(TimePeriodFilter, {
							updateStartDate,
							updateEndDate,
							valid: awards.dateRange.startDate !== "" || awards.dateRange.endDate !== "",
							setValidDates,
							filterTimePeriodStart: awards.dateRange.startDate,
							filterTimePeriodEnd: awards.dateRange.endDate
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)(FileFormatFilter, { updateFilter }),
						isTablet && /* @__PURE__ */ (0, import_jsx_runtime$22.jsx)(AwardsUserSelections, {}),
						/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)(SubmitButton, {
							filters: awards,
							validForm,
							validDates,
							dataType: "awards"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("div", {
							className: "download-center__reset-container",
							children: /* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("button", {
								className: "download-center__reset",
								onClick: resetForm,
								onKeyDown,
								children: "Reset form and start over"
							})
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime$22.jsxs)("div", {
				className: "download-info",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("h3", {
						className: "download-info__title",
						children: "About Award Data"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$22.jsxs)("div", {
						className: "download-info__section",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("h4", {
							className: "download-info__section-heading",
							children: "What is award data?"
						}), /* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("p", { children: "Award data contains all the details of our prime award and sub-award records." })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$22.jsxs)("div", {
						className: "download-info__section",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("h4", {
							className: "download-info__section-heading",
							children: "Why would I be interested in this data?"
						}), /* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("p", { children: "Downloading this data gives you access to every attribute of any particular award, including data that may not be surfaced on this site." })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$22.jsxs)("div", {
						className: "download-info__section",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("h4", {
							className: "download-info__section-heading",
							children: "How do I use this form?"
						}), /* @__PURE__ */ (0, import_jsx_runtime$22.jsxs)("p", { children: [
							"This form allows you to select specific awards by type; agency and sub-agency; location; and date range. Select an option in each section and click the “Download” button at the bottom.",
							/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("b", { children: " Please note that most fields are required." }),
							" You'll only be able to start the download when all required sections are properly filled in."
						] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("div", {
						className: "download-info__section",
						children: /* @__PURE__ */ (0, import_jsx_runtime$22.jsx)(Note, { message: dodNote })
					})
				]
			})]
		});
	};
	AwardDataContent.propTypes = propTypes$18;
}));
//#endregion
//#region src/js/containers/bulkDownload/awards/AwardDataContainer.jsx
/**
* AwardDataContainer.jsx
* Created by Lizzie Salita 10/30/17
*/
var import_jsx_runtime$21, propTypes$17, AwardDataContainer, AwardDataContainer_default;
var init_AwardDataContainer = __esmMin((() => {
	init_redux();
	init_es();
	init_bulkDownloadHelper();
	init_bulkDownloadActions();
	init_mapHelper();
	init_AwardDataContent();
	import_jsx_runtime$21 = require_jsx_runtime();
	propTypes$17 = {
		updateDownloadFilter: PropTypes.func,
		clearDownloadFilters: PropTypes.func,
		updateAwardDateRange: PropTypes.func,
		bulkDownload: PropTypes.object,
		clickedDownload: PropTypes.func
	};
	AwardDataContainer = class extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				inFlight: true,
				agencies: {
					cfoAgencies: [],
					otherAgencies: []
				},
				subAgencies: [],
				states: []
			};
			this.agencyListRequest = null;
			this.statesRequest = null;
			this.updateFilter = this.updateFilter.bind(this);
			this.updateStartDate = this.updateStartDate.bind(this);
			this.updateEndDate = this.updateEndDate.bind(this);
			this.clearAwardFilters = this.clearAwardFilters.bind(this);
			this.setAgencyList = this.setAgencyList.bind(this);
			this.setSubAgencyList = this.setSubAgencyList.bind(this);
			this.loadStates = this.loadStates.bind(this);
		}
		componentDidMount() {
			this.setAgencyList();
			this.loadStates();
		}
		componentWillUnmount() {
			if (this.agencyListRequest) this.agencyListRequest.cancel();
			if (this.statesRequest) this.statesRequest.cancel();
		}
		setAgencyList() {
			this.setState({ inFlight: true });
			if (this.agencyListRequest) this.agencyListRequest.cancel();
			this.agencyListRequest = requestAgenciesList({
				type: "award_agencies",
				agency: 0
			});
			this.agencyListRequest.promise.then((res) => {
				const cfoAgencies = res.data.agencies.cfo_agencies;
				const otherAgencies = res.data.agencies.other_agencies;
				this.setState({ agencies: {
					cfoAgencies,
					otherAgencies
				} });
			}).catch((err) => {
				console.log(err);
				this.agencyListRequest = null;
			});
		}
		setSubAgencyList(id) {
			if (id !== "") {
				this.setState({ inFlight: true });
				if (this.agencyListRequest) this.agencyListRequest.cancel();
				this.agencyListRequest = requestAgenciesList({
					type: "award_agencies",
					agency: parseInt(id, 10)
				});
				this.agencyListRequest.promise.then((res) => {
					const subAgencies = res.data.sub_agencies;
					this.setState({ subAgencies }, () => {
						this.resetSubAgency();
					});
				}).catch((err) => {
					console.log(err);
					this.agencyListRequest = null;
				});
			} else this.setState({ subAgencies: [] }, () => {
				this.resetSubAgency();
			});
		}
		loadStates() {
			this.setState({ inFlight: true });
			if (this.statesRequest) this.statesRequest.cancel();
			this.statesRequest = fetchLocationList("states");
			this.statesRequest.promise.then((res) => {
				this.setState({ states: res.data.states });
			}).catch((err) => {
				console.log(err);
				this.statesRequest = null;
			});
		}
		resetSubAgency() {
			this.updateFilter("subAgency", {
				id: "",
				name: "Select a Sub-Agency"
			});
		}
		updateFilter(name, value) {
			this.props.updateDownloadFilter({
				dataType: "awards",
				name,
				value
			});
		}
		updateStartDate(date) {
			this.props.updateAwardDateRange({
				date,
				dateType: "startDate"
			});
		}
		updateEndDate(date) {
			this.props.updateAwardDateRange({
				date,
				dateType: "endDate"
			});
		}
		clearAwardFilters() {
			this.props.clearDownloadFilters("awards");
		}
		render() {
			return /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(AwardDataContent, {
				awards: this.props.bulkDownload.awards,
				updateFilter: this.updateFilter,
				updateStartDate: this.updateStartDate,
				updateEndDate: this.updateEndDate,
				clearAwardFilters: this.clearAwardFilters,
				agencies: this.state.agencies,
				subAgencies: this.state.subAgencies,
				setSubAgencyList: this.setSubAgencyList,
				states: this.state.states,
				clickedDownload: this.props.clickedDownload
			});
		}
	};
	AwardDataContainer.propTypes = propTypes$17;
	AwardDataContainer_default = connect_default((state) => ({ bulkDownload: state.bulkDownload }), (dispatch) => bindActionCreators(bulkDownloadActions_exports, dispatch))(AwardDataContainer);
}));
//#endregion
//#region src/js/components/bulkDownload/accounts/filters/AccountLevelFilter.jsx
var import_jsx_runtime$20, propTypes$16, AccountLevelFilter;
var init_AccountLevelFilter = __esmMin((() => {
	init_FilterSelectionTitle();
	import_jsx_runtime$20 = require_jsx_runtime();
	propTypes$16 = {
		accountLevels: PropTypes.array,
		currentAccountLevel: PropTypes.string,
		updateFilter: PropTypes.func
	};
	AccountLevelFilter = ({ accountLevels, currentAccountLevel, updateFilter }) => {
		const onChange = (e) => {
			const target = e.target;
			updateFilter("accountLevel", target.value);
		};
		const accountLvls = accountLevels.map((level) => /* @__PURE__ */ (0, import_jsx_runtime$20.jsxs)("div", {
			className: "radio",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("input", {
				type: "radio",
				"aria-label": level.name,
				value: level.name,
				name: "account-level",
				checked: currentAccountLevel === level.name,
				onChange
			}), /* @__PURE__ */ (0, import_jsx_runtime$20.jsxs)("label", {
				className: "radio-label",
				htmlFor: "account-level",
				children: [
					level.label,
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime$20.jsxs)("span", {
						className: "radio-label__subtext",
						children: [" ", level.description]
					})
				]
			})]
		}, level.name));
		return /* @__PURE__ */ (0, import_jsx_runtime$20.jsxs)("div", {
			className: "download-filter",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$20.jsx)(FilterSectionTitle, { type: "account" }), /* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("div", {
				className: "download-filter__content",
				children: accountLvls
			})]
		});
	};
	AccountLevelFilter.propTypes = propTypes$16;
}));
//#endregion
//#region src/js/components/bulkDownload/accounts/filters/SubmissionTypeFilter.jsx
var import_jsx_runtime$19, propTypes$15, SubmissionTypeFilter;
var init_SubmissionTypeFilter = __esmMin((() => {
	init_development();
	init_FilterSelectionTitle();
	import_jsx_runtime$19 = require_jsx_runtime();
	propTypes$15 = {
		submissionTypes: PropTypes.array,
		currentSubmissionTypes: PropTypes.array,
		updateFilter: PropTypes.func
	};
	SubmissionTypeFilter = ({ submissionTypes, currentSubmissionTypes, updateFilter }) => {
		const onChange = (e) => {
			const target = e.target;
			updateFilter("submissionTypes", target.value);
		};
		const submissions = submissionTypes.map((type) => /* @__PURE__ */ (0, import_jsx_runtime$19.jsxs)("div", {
			className: "checkbox",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$19.jsx)("input", {
				type: "checkbox",
				"aria-label": type.name,
				value: type.name,
				name: "submission-type",
				checked: currentSubmissionTypes.includes(type.name),
				onChange
			}), /* @__PURE__ */ (0, import_jsx_runtime$19.jsx)("label", {
				className: "checkbox-label",
				htmlFor: "submission-type",
				children: type.label
			})]
		}, type.name));
		return /* @__PURE__ */ (0, import_jsx_runtime$19.jsxs)("div", {
			className: "download-filter",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$19.jsx)(FilterSectionTitle, { type: "fileType" }), /* @__PURE__ */ (0, import_jsx_runtime$19.jsxs)("div", {
				className: "download-filter__content",
				children: [
					submissions,
					/* @__PURE__ */ (0, import_jsx_runtime$19.jsxs)("p", {
						className: "download-filter__content-note",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$19.jsx)("span", {
							className: "download-filter__content-note_bold",
							children: "*Note: "
						}), "To facilitate processing of these files for download, File C award records are separated into three buckets: contract awards (with linked awards between File C and File D1), financial assistance awards (with linked awards between File C and File D2), and unlinked awards (with awards in File C that are not linked to any award in Files D1 or D2). Each bucket will include one or more files, depending on the size of your download request."]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$19.jsxs)("p", {
						className: "download-filter__content-note",
						children: [
							"Files with unlinked awards will include the same columns as files with linked awards; however, the columns that involve data from Files D1 and D2 will be blank in the files with unlinked awards. In addition, please note that files with unlinked awards will include award records with obligation activity or outlay activity, in order to show all agency File C award records that are unlinked to Files D1 or D2. (Note that in the",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime$19.jsx)(Link, {
								className: "usa-bold-link",
								to: "/submission-statistics",
								children: "Agency Submission Statistics page"
							}),
							", the counts of unlinked awards in File C use only awards with obligation activity.)"
						]
					})
				]
			})]
		});
	};
	SubmissionTypeFilter.propTypes = propTypes$15;
}));
//#endregion
//#region src/js/components/bulkDownload/accounts/filters/FiscalYearFilter.jsx
/**
* FiscalYearFilter.jsx
* Created by Lizzie Salita 4/24/18
*/
var import_jsx_runtime$18, propTypes$14, FiscalYearFilter;
var init_FiscalYearFilter = __esmMin((() => {
	init_es();
	init_explorerQuarters();
	init_QuarterPickerWithFY();
	init_FilterSelectionTitle();
	import_jsx_runtime$18 = require_jsx_runtime();
	propTypes$14 = { updateFilter: PropTypes.func };
	FiscalYearFilter = ({ updateFilter }) => {
		const fy = useSelector((state) => state.bulkDownload.accounts.fy);
		const period = useSelector((state) => state.bulkDownload.accounts.period);
		const quarter = useSelector((state) => state.bulkDownload.accounts.quarter);
		const noteOne = /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)(import_jsx_runtime$18.Fragment, { children: [
			"The data included in the Custom Account Download was first collected in the second quarter of fiscal year 2017, per the",
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("a", {
				target: "_blank",
				rel: "noopener noreferrer",
				href: "https://www.congress.gov/113/plaws/publ101/PLAW-113publ101.pdf",
				children: "Digital Accountability and Transparency Act of 2014 (DATA Act)"
			}),
			". Financial data will not be available prior to that timeframe."
		] });
		const noteTwo = "Account Balances and Account Breakdown by Program Activity & Object Class files contain cumulative financial balances at the account and agency levels, as of the end of the quarter selected. The Account Breakdown by Award file contains every transaction reported at the account and agency levels, for the fiscal year through the end of the quarter selected.";
		const latestSelectedTimeInterval = period || quarter;
		const quarterPickerSelection = useCallback((selectedOption) => {
			if (parseInt(fy, 10) >= 2020) {
				updateFilter("period", `${selectedOption}`);
				updateFilter("quarter", null);
			} else {
				updateFilter("quarter", `${selectedOption}`);
				updateFilter("period", null);
			}
		}, [fy, updateFilter]);
		const pickedYear = useCallback((year, period = null) => {
			updateFilter("fy", `${year}`);
			if (handlePotentialStrings(year) >= 2020) {
				updateFilter("period", period);
				updateFilter("quarter", null);
			} else {
				updateFilter("quarter", `4`);
				updateFilter("period", null);
			}
		}, [updateFilter]);
		return /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
			className: "download-filter",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(FilterSectionTitle, { type: "fy" }), /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
				className: "download-filter__content new",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("p", {
						className: "download-filter__content-description",
						children: [
							"The government",
							/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("span", { children: " Fiscal Year (FY) " }),
							"from October 1 through September 30 of the following year.",
							/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("span", { children: " Period " }),
							"refers to an individual month within the FY, as agencies have a monthly reporting requirement."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(QuarterPickerWithFY, {
						selectedFy: fy,
						handlePickedYear: pickedYear,
						handleQuarterPickerSelection: quarterPickerSelection,
						latestSelectedTimeInterval,
						updateFilter,
						newPicker: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("p", {
						className: "download-filter__content-note",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("span", {
							className: "download-filter__content-note_bold",
							children: "Note: "
						}), noteOne]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("p", {
						className: "download-filter__content-note",
						children: noteTwo
					})
				]
			})]
		});
	};
	FiscalYearFilter.propTypes = propTypes$14;
}));
//#endregion
//#region src/js/components/bulkDownload/accounts/AccountUserSelections.jsx
var import_jsx_runtime$17, AccountUserSelections;
var init_AccountUserSelections = __esmMin((() => {
	init_es();
	init_dateHelper();
	init_bulkDownloadOptions();
	init_dist();
	import_jsx_runtime$17 = require_jsx_runtime();
	AccountUserSelections = () => {
		const accounts = useSelector((state) => state.bulkDownload.accounts);
		const generateDefCodesString = () => {
			const { submissionTypes, defCodes } = accounts;
			if (defCodes.length && !(submissionTypes.length === 1 && submissionTypes.includes("accountBalances"))) return /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("div", {
				className: "selection__content",
				children: accounts.defCodes.toString()
			});
			return /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("div", {
				className: "selection__content",
				children: "None selected"
			});
		};
		const generateAccountLevelString = () => {
			if (accounts.accountLevel) return /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("div", {
				className: "selection__content",
				children: accountDownloadOptions.accountLevels.find((option) => option.name === accounts.accountLevel).label
			});
			return /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("div", {
				className: "selection__content selection__content-required",
				children: "Account not selected"
			});
		};
		const generateBudgetAgencyFunctionString = () => {
			let selectedFilterValues = [];
			if (accounts.budgetFunction.title !== "Select a Budget Function") selectedFilterValues.push({
				title: "Budget Function",
				value: accounts.budgetFunction.title
			});
			if (accounts.budgetSubfunction.title !== "Select a Budget Sub-Function") selectedFilterValues.push({
				title: "Budget Sub-function",
				value: accounts.budgetSubfunction.title
			});
			if (accounts.agency.name !== "Select an Agency") selectedFilterValues.push({
				title: "Agency",
				value: accounts.agency.name
			});
			if (accounts.federalAccount.name !== "Select a Federal Account") selectedFilterValues.push({
				title: "Federal Account",
				value: accounts.federalAccount.name
			});
			if (selectedFilterValues.length > 0) return /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)(import_jsx_runtime$17.Fragment, { children: selectedFilterValues.map((filter) => /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("div", {
				className: "selection__content",
				children: `${filter.title}: ${filter.value}`
			}, filter.title)) });
			return /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("div", {
				className: "selection__content selection__content-required",
				children: "Required"
			});
		};
		const generateSubmissionTypeString = () => {
			if (accounts.submissionTypes.length > 0) return /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("div", {
				className: "selection__content",
				children: accountDownloadOptions.submissionTypes.filter((option) => accounts.submissionTypes.includes(option.name)).reduce((acc, option, i, array) => {
					if (i === 0 && array.length === 1) return `${option.label}`;
					if (i === array.length - 1) return `${acc}${option.label}`;
					return `${acc}${option.label}, `;
				}, "")
			});
			return /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("div", {
				className: "selection__content selection__content-required",
				children: "Required"
			});
		};
		const generateFyString = () => {
			const { fy, quarter, period } = accounts;
			const timePeriodSelection = quarter ? `(Q${quarter})` : `(P${period})`;
			if (fy) return /* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)("div", {
				className: "selection__content",
				children: [
					"FY ",
					fy,
					" - ",
					getPeriodTitle(period?.toString()),
					" ",
					timePeriodSelection
				]
			});
			return /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("div", {
				className: "selection__content selection__content-required",
				children: "Required"
			});
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)("div", {
			className: "download-user-selections",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("div", { className: "header-bar" }),
				/* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)("div", {
					className: "download-user-selections__title-wrapper",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)("h3", {
						className: "download-user-selections__title",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)(FontAwesomeIcon, {
							icon: "file-arrow-down",
							className: "title-icon"
						}), "Download Summary"]
					}), /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("h5", {
						className: "download-user-selections__subtitle",
						children: "Your selected options are..."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)("div", {
					className: "selection",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("div", {
						className: "selection__heading",
						children: "Budget Function"
					}), /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("div", {
						className: "selection__content",
						children: generateBudgetAgencyFunctionString()
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)("div", {
					className: "selection",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("div", {
						className: "selection__heading",
						children: "Account Level"
					}), /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("div", {
						className: "selection__content",
						children: generateAccountLevelString()
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)("div", {
					className: "selection",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("div", {
						className: "selection__heading",
						children: "File Type"
					}), /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("div", {
						className: "selection__content",
						children: generateSubmissionTypeString()
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)("div", {
					className: "selection",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("div", {
						className: "selection__heading",
						children: "Disaster Emergency Fund Codes (DEFCs)"
					}), /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("div", {
						className: "selection__content",
						children: generateDefCodesString()
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)("div", {
					className: "selection",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("div", {
						className: "selection__heading",
						children: "Fiscal Year and Quarter"
					}), /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("div", {
						className: "selection__content",
						children: generateFyString()
					})]
				})
			]
		});
	};
}));
//#endregion
//#region src/js/components/bulkDownload/DEFCheckboxTreeDownloadLabel.jsx
var import_jsx_runtime$16, parseAcronym, DEFCheckboxTreeDownloadLabel;
var init_DEFCheckboxTreeDownloadLabel = __esmMin((() => {
	import_jsx_runtime$16 = require_jsx_runtime();
	parseAcronym = (str) => {
		const parsedStr = str.replace("P.L.", "Public Law");
		if (parsedStr.includes("P.L.")) return parseAcronym(parsedStr);
		return parsedStr;
	};
	DEFCheckboxTreeDownloadLabel = ({ label, subLabel, value }) => {
		if (label.includes("|")) {
			const labels = label.split("|");
			const subLabels = subLabel.split("|");
			return /* @__PURE__ */ (0, import_jsx_runtime$16.jsx)("div", {
				className: "checkbox-tree-label",
				children: /* @__PURE__ */ (0, import_jsx_runtime$16.jsxs)("div", {
					className: "checkbox-tree-label__value-container",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$16.jsxs)("div", {
						className: "checkbox-tree-label__value-container-value",
						children: [value, /* @__PURE__ */ (0, import_jsx_runtime$16.jsx)("span", {
							className: "checkbox-tree-label__value-container-spacer",
							children: " - "
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime$16.jsx)("div", {
						className: "multi-label-level",
						children: labels.map((lbl, i) => /* @__PURE__ */ (0, import_jsx_runtime$16.jsxs)(import_jsx_runtime$16.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$16.jsx)("span", {
							className: "checkbox-tree-label__value-container-label",
							children: lbl
						}), /* @__PURE__ */ (0, import_jsx_runtime$16.jsx)("div", {
							className: "checkbox-tree-label__value-container-sub-label",
							children: /* @__PURE__ */ (0, import_jsx_runtime$16.jsx)("span", { children: parseAcronym(subLabels[i]) })
						})] }))
					}, value)]
				})
			});
		}
		return /* @__PURE__ */ (0, import_jsx_runtime$16.jsx)("div", {
			className: "checkbox-tree-label",
			children: /* @__PURE__ */ (0, import_jsx_runtime$16.jsx)("div", {
				className: "checkbox-tree-label__value-container",
				children: /* @__PURE__ */ (0, import_jsx_runtime$16.jsxs)("div", {
					className: "checkbox-tree-label__value-container-value",
					children: [
						value,
						/* @__PURE__ */ (0, import_jsx_runtime$16.jsx)("span", {
							className: "checkbox-tree-label__value-container-label",
							children: ` - ${label}`
						}),
						subLabel && /* @__PURE__ */ (0, import_jsx_runtime$16.jsx)("div", {
							className: "checkbox-tree-label__value-container-sub-label",
							children: /* @__PURE__ */ (0, import_jsx_runtime$16.jsx)("span", { children: parseAcronym(subLabel) })
						})
					]
				})
			})
		});
	};
	DEFCheckboxTreeDownloadLabel.propTypes = {
		label: PropTypes.string,
		subLabel: PropTypes.string,
		value: PropTypes.string
	};
}));
//#endregion
//#region src/js/components/bulkDownload/DEFCheckboxTreeDownload.jsx
var import_jsx_runtime$15, DEFCheckboxTreeDownload;
var init_DEFCheckboxTreeDownload = __esmMin((() => {
	init_es();
	init_WithDefCodes();
	init_bulkDownloadActions();
	init_dist();
	init_AccordionCheckbox();
	init_defCodes();
	init_DEFCheckboxTreeDownloadLabel();
	import_jsx_runtime$15 = require_jsx_runtime();
	DEFCheckboxTreeDownload = ({ type, isDisabled = false }) => {
		const [defSearchString, setDefSearchString] = useState("");
		const [errorMsg, isLoading, validDefCodes] = useDefCodes();
		const { defCodes } = useSelector((state) => state.bulkDownload[type]);
		const dispatch = useDispatch();
		const titlesByCode = (codes) => codes.reduce((obj, item) => {
			obj[item.code] = item.title;
			return obj;
		}, {});
		const detailsDisplay = (codes) => codes.reduce((obj, item) => {
			obj[item.code] = /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)(DEFCheckboxTreeDownloadLabel, {
				label: item.title,
				subLabel: item.public_law,
				value: item.code,
				defSearchString
			});
			return obj;
		}, {});
		const toggleDefc = (selection) => {
			const value = selection.value;
			let newCheck = /* @__PURE__ */ new Set([...defCodes]);
			if (newCheck?.size > 0) {
				if (newCheck.has(value)) newCheck = (/* @__PURE__ */ new Set([...newCheck])).filter((dc) => dc !== value);
				else newCheck = /* @__PURE__ */ new Set([...newCheck, value]);
				dispatch(setDefCodes(type, [...newCheck]));
			} else dispatch(setDefCodes(type, selection.value));
		};
		const bulkChangeDefc = (selection) => {
			const types = selection.types;
			let newCheck = /* @__PURE__ */ new Set([...defCodes]);
			if (newCheck?.size > 0) {
				if (types.every((t) => newCheck.has(t))) newCheck = (/* @__PURE__ */ new Set([...newCheck])).filter((dc) => !types.includes(dc));
				else newCheck = /* @__PURE__ */ new Set([...newCheck, ...types]);
				dispatch(setDefCodes(type, [...newCheck]));
			} else dispatch(setDefCodes(type, types));
		};
		const loadingIndicator = /* @__PURE__ */ (0, import_jsx_runtime$15.jsxs)("div", {
			className: "defc-filter-message-container",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$15.jsx)(FontAwesomeIcon, {
				icon: "spinner",
				spin: true
			}), /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("div", {
				className: "defc-filter-message-container__text",
				children: "Loading your data..."
			})]
		});
		useEffect(() => {
			detailsDisplay(validDefCodes);
		}, [validDefCodes]);
		useEffect(() => {
			if (isDisabled && defCodes.length) dispatch(setDefCodes(type, []));
		}, [
			defCodes,
			dispatch,
			isDisabled,
			type
		]);
		return /* @__PURE__ */ (0, import_jsx_runtime$15.jsxs)("div", {
			className: "def-code-filter-download",
			children: [isLoading && loadingIndicator, validDefCodes?.length > 0 && !isLoading && !errorMsg && /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)(AccordionCheckbox, {
				filterCategoryMapping: defcDataByType(validDefCodes),
				filters: titlesByCode(validDefCodes),
				customLabels: detailsDisplay(validDefCodes),
				selectedFilters: new Set(defCodes),
				singleFilterChange: toggleDefc,
				bulkFilterChange: bulkChangeDefc,
				setDefSearchString,
				showSearch: false,
				isDisabled
			})]
		});
	};
	DEFCheckboxTreeDownload.propTypes = {
		isDisabled: PropTypes.bool,
		type: PropTypes.string.isRequired
	};
}));
//#endregion
//#region src/js/components/bulkDownload/accounts/filters/DefCodeFilter.jsx
var import_jsx_runtime$14, DefCodeFilter;
var init_DefCodeFilter = __esmMin((() => {
	init_DEFCheckboxTreeDownload();
	init_FilterSelectionTitle();
	import_jsx_runtime$14 = require_jsx_runtime();
	DefCodeFilter = ({ type, isDisabled = false }) => /* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)("div", {
		className: "download-filter def-code-filter",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(FilterSectionTitle, { type: "defc" }), /* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)("div", {
			className: "download-filter__content",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)(DEFCheckboxTreeDownload, {
				type,
				isDisabled
			}), type === "accounts" ? /* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)("p", {
				className: "download-filter__content-note",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("span", {
					className: "download-filter__content-note_bold",
					children: "Note:"
				}), " COVID-19 Spending account data is only available starting FY2020 P07. The DEFC is not applicable to Account Balance data. If you selected Account Balances under file type above, the DEFC column will not appear in the download."]
			}) : /* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)("p", {
				className: "download-filter__content-note",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("span", {
					className: "download-filter__content-note_bold",
					children: "Note:"
				}), " COVID-19 Spending data is only available for award and sub-award actions with an Action Date on or after 4/1/2020."]
			})]
		})]
	});
	DefCodeFilter.propTypes = {
		isDisabled: PropTypes.bool,
		type: PropTypes.string.isRequired
	};
}));
//#endregion
//#region src/js/components/bulkDownload/accounts/filters/BudgetAgencyGroup.jsx
/**
* BudgetAgencyGroup.jsx
* Created by JD House 5/28/2026
*/
var import_jsx_runtime$13, propTypes$13, BudgetAgencyGroup;
var init_BudgetAgencyGroup = __esmMin((() => {
	init_development();
	init_ComboBox();
	init_FilterSelectionTitle();
	import_jsx_runtime$13 = require_jsx_runtime();
	propTypes$13 = {
		budgetFunctions: PropTypes.array,
		budgetSubfunctions: PropTypes.array,
		agencies: PropTypes.array,
		federalAccounts: PropTypes.array,
		setBudgetSubfunctionList: PropTypes.func,
		setFederalAccountList: PropTypes.func,
		updateFilter: PropTypes.func,
		accounts: PropTypes.object
	};
	BudgetAgencyGroup = memo(function BudgetAgencyGroup({ budgetFunctions, budgetSubfunctions, agencies, federalAccounts, setBudgetSubfunctionList, setFederalAccountList, updateFilter, accounts }) {
		const [hasSelectedBudgetFunction, setHasSelectedBudgetFunction] = useState(false);
		const [hasSelectedAgency, setHasSelectedAgency] = useState(false);
		const { budgetFunction, budgetSubfunction, agency, federalAccount } = accounts;
		const budgetOptions = budgetFunctions.map((option) => ({
			text: option.budget_function_title,
			id: option.budget_function_code,
			value: option.budget_function_code
		}));
		budgetOptions.unshift({
			text: "All",
			id: "all",
			value: "all"
		});
		const handleBudgetSelect = (e) => {
			e.preventDefault();
			const target = e.target;
			updateFilter("budgetFunction", {
				code: target.value,
				title: target.name
			});
			setHasSelectedBudgetFunction(true);
			if (agency.id === "") updateFilter("agency", {
				id: "all",
				name: "All"
			});
			if (target.value === "all") setBudgetSubfunctionList("");
			else {
				setBudgetSubfunctionList(target.value);
				updateFilter("budgetSubfunction", {
					code: "all",
					title: "All"
				});
			}
		};
		const subBudgetOptions = budgetSubfunctions.map((option) => ({
			text: `${option.budget_subfunction_title} - ${option.budget_subfunction_code}`,
			id: option.budget_subfunction_code,
			value: option.budget_subfunction_code
		}));
		subBudgetOptions.unshift({
			text: "All",
			id: "all",
			value: "all"
		});
		const handleBudgetSubfunctionSelect = (e) => {
			e.preventDefault();
			const target = e.target;
			updateFilter("budgetSubfunction", {
				code: target.value,
				title: target.name
			});
		};
		let agenciesArray = [{
			name: "All",
			toptier_agency_id: "all",
			toptier_code: "all"
		}];
		Object.entries(agencies).forEach(([key, value]) => {
			const title = {
				name: key === "cfoAgencies" ? "CFO AGENCIES" : "OTHER AGENCIES",
				toptier_agency_id: key,
				toptier_code: null
			};
			agenciesArray = [
				...agenciesArray,
				title,
				...value
			];
		});
		const agenciesOptions = agenciesArray.map(({ name, toptier_agency_id: id, toptier_code: code }) => ({
			text: name,
			value: code ? id.toString() : `${id}-disabled`,
			fedCode: code
		}));
		const handleAgencySelect = (e) => {
			e.preventDefault();
			const target = e.target;
			const fedCode = agenciesOptions.find((a) => a.value === target.value).fedCode;
			updateFilter("agency", {
				id: target.value,
				name: target.name
			});
			setHasSelectedAgency(true);
			if (budgetFunction.code === "") updateFilter("budgetFunction", {
				code: "all",
				title: "All"
			});
			if (target.value === "all") setFederalAccountList("");
			else {
				setFederalAccountList(fedCode);
				updateFilter("federalAccount", {
					id: "all",
					name: "All"
				});
			}
		};
		const federalAccountOptions = federalAccounts.map(({ account_name: name, account_number: number, account_id: id }) => ({
			text: `${number} - ${name}`,
			id,
			value: `${id.toString()}`
		}));
		federalAccountOptions.unshift({
			text: "All",
			id: "all",
			value: "all"
		});
		const handleFederalAccountSelect = (e) => {
			e.preventDefault();
			const target = e.target;
			updateFilter("federalAccount", {
				id: target.value,
				name: target.name
			});
		};
		const handleClear = (type) => {
			switch (type) {
				case "budgetFunction":
					setBudgetSubfunctionList("");
					updateFilter("budgetFunction", {
						code: "",
						title: "Select a Budget Function"
					});
					if (!hasSelectedAgency || agency.id === "all") updateFilter("agency", {
						id: "",
						name: "Select an Agency"
					});
					break;
				case "budgetSubfunction":
					updateFilter("budgetSubfunction", {
						code: "",
						title: "Select a Budget Sub-Function"
					});
					break;
				case "agency":
					setFederalAccountList("");
					updateFilter("agency", {
						id: "",
						name: "Select an Agency"
					});
					if (!hasSelectedBudgetFunction || budgetFunction.code === "all") updateFilter("budgetFunction", {
						code: "",
						title: "Select a Budget Function"
					});
					break;
				case "federalAccount":
					updateFilter("federalAccount", {
						id: "",
						name: "Select a Federal Account"
					});
					break;
				default: return null;
			}
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("div", {
			className: "download-filter",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("div", {
				className: "budget-agency-heading__container",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(FilterSectionTitle, { type: "budget" }),
					/* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("p", {
						className: "download-filter__subtitle",
						children: [
							"The federal budget is divided into categories known as\xA0",
							/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(Link, {
								to: "/download_center/custom_account_data?glossary=budget-function",
								children: "budget functions"
							}),
							". Select Budget Function and/or Budget Sub-function to view spending by these categories."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("p", {
						className: "download-filter__subtitle",
						children: [
							"The federal budget can also be divided by government\xA0",
							/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(Link, {
								to: "/download_center/custom_account_data?glossary=agency",
								children: "agency"
							}),
							". Select Agency to view spending distributed to a particular agency."
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("div", {
				className: "download-filter__content budget-function",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("div", {
					className: "combo-box-container",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(ComboBox, {
						optionsArray: budgetOptions,
						onSelect: handleBudgetSelect,
						label: "Budget Function",
						formName: "download-filter__budget-function",
						onClearSelect: () => handleClear("budgetFunction"),
						defaultValue: budgetFunction.code ? budgetFunction.title : "",
						filterInput: budgetFunction.code !== "all",
						placeholder: "Select budget Function"
					}), /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(ComboBox, {
						optionsArray: subBudgetOptions,
						onSelect: handleBudgetSubfunctionSelect,
						label: "Budget Sub-Function",
						formName: "download-filter__budget-sub-function",
						placeholder: "Select budget sub-function",
						onClearSelect: () => handleClear("budgetSubfunction"),
						defaultValue: budgetSubfunction?.code ? budgetSubfunction.title : "",
						filterInput: budgetSubfunction?.code !== "all",
						disabled: subBudgetOptions.length <= 1
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("div", {
					className: "combo-box-container",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(ComboBox, {
						optionsArray: agenciesOptions,
						onSelect: handleAgencySelect,
						label: "Agency",
						formName: "download-filter__agency",
						onClearSelect: () => handleClear("agency"),
						defaultValue: agency.id ? agency.name : "",
						filterInput: agency.id !== "all",
						placeholder: "Select agency"
					}), /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(ComboBox, {
						optionsArray: federalAccountOptions,
						onSelect: handleFederalAccountSelect,
						label: "Federal Account",
						formName: "download-filter__federal-account",
						placeholder: "Select federal account",
						onClearSelect: () => handleClear("federalAccount"),
						defaultValue: federalAccount?.id ? federalAccount.name : "",
						filterInput: federalAccount?.id !== "all",
						disabled: federalAccountOptions.length <= 1
					})]
				})]
			})]
		});
	});
	BudgetAgencyGroup.propTypes = propTypes$13;
}));
//#endregion
//#region src/js/components/bulkDownload/accounts/AccountDataContent.jsx
/**
* AccountDataContent.jsx
* Created by Lizzie Salita 4/23/18
*/
var import_jsx_runtime$12, propTypes$12, AccountDataContent;
var init_AccountDataContent = __esmMin((() => {
	init_development();
	init_GlobalConstants();
	init_bulkDownloadHelper();
	init_bulkDownloadOptions();
	init_Icons();
	init_IsMobileContext();
	init_AccountLevelFilter();
	init_SubmissionTypeFilter();
	init_FiscalYearFilter();
	init_AccountUserSelections();
	init_DefCodeFilter();
	init_SubmitButton();
	init_BudgetAgencyGroup();
	import_jsx_runtime$12 = require_jsx_runtime();
	propTypes$12 = {
		accounts: PropTypes.object,
		updateFilter: PropTypes.func,
		clearAccountFilters: PropTypes.func,
		agencies: PropTypes.object,
		federalAccounts: PropTypes.array,
		clickedDownload: PropTypes.func,
		setFederalAccountList: PropTypes.func,
		budgetFunctions: PropTypes.array,
		setBudgetSubfunctionList: PropTypes.func,
		budgetSubfunctions: PropTypes.array
	};
	AccountDataContent = ({ accounts, updateFilter, clearAccountFilters, agencies, federalAccounts, clickedDownload, setFederalAccountList, budgetFunctions, setBudgetSubfunctionList, budgetSubfunctions }) => {
		const { isTablet } = useContext(IsMobileContext);
		const [validForm, setValidForm] = useState(false);
		const onKeyDown = (e) => {
			if (e.keyCode === 13) {
				e.preventDefault();
				clearAccountFilters();
			}
		};
		useEffect(() => {
			setValidForm(accounts.budgetFunction.code !== "" && accounts.agency.id !== "" && accounts.submissionTypes.length !== 0 && accounts.fy !== "" && (accounts.quarter !== "" || accounts.period !== ""));
		}, [accounts]);
		useEffect(() => () => clearAccountFilters, []);
		return /* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)("div", {
			className: "download-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)("div", {
				className: "download-center__filters",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)("div", {
					className: "download-center-title-wrapper",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("h2", {
						className: "download-center__title",
						children: "Download spending data, including non-award spending."
					}), /* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)("p", { children: [
						"To download award transaction data for each major agency by fiscal year, visit\xA0",
						/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(Link, {
							to: "/download_center/award_data_archive",
							children: "Award Data Archive page"
						}),
						"."
					] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)("div", {
					className: "download-center-form",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(BudgetAgencyGroup, {
							budgetFunctions,
							budgetSubfunctions,
							agencies,
							federalAccounts,
							setBudgetSubfunctionList,
							setFederalAccountList,
							updateFilter,
							valid: accounts.budgetFunction.code !== "" || accounts.agency.id !== "",
							accounts
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(AccountLevelFilter, {
							accountLevels: accountDownloadOptions.accountLevels,
							currentAccountLevel: accounts.accountLevel,
							updateFilter,
							valid: accounts.accountLevel !== ""
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(SubmissionTypeFilter, {
							submissionTypes: accountDownloadOptions.submissionTypes,
							currentSubmissionTypes: accounts.submissionTypes,
							updateFilter,
							valid: accounts.submissionTypes.length !== 0
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(DefCodeFilter, {
							type: "accounts",
							isDisabled: areDefCodesDisabled(accounts.submissionTypes)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(FiscalYearFilter, { updateFilter }),
						isTablet && /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(AccountUserSelections, {}),
						/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(SubmitButton, {
							handleSubmit: clickedDownload,
							validForm,
							filters: accounts,
							validDates: true,
							dataType: "accounts"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("div", {
							className: "download-center__reset-container",
							children: /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("button", {
								className: "download-center__reset",
								onClick: clearAccountFilters,
								onKeyDown,
								children: "Reset form and start over"
							})
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)("div", {
				className: "download-info",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("h3", {
						className: "download-info__title",
						children: "About Account Data"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)("div", {
						className: "download-info__section",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("h4", {
								className: "download-info__section-heading",
								children: "What is account data?"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("p", { children: "Account data covers all spending data, including non-award spending." }),
							/* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)("p", { children: [
								"The data is available on two different levels, ",
								/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("strong", { children: "federal account" }),
								"\xA0",
								/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(Link, {
									to: "/download_center/custom_account_data?glossary=federal-account",
									children: /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(Glossary, {})
								}),
								"and ",
								/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("strong", { children: "treasury account" }),
								"\xA0",
								/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(Link, {
									to: "/download_center/custom_account_data?glossary=treasury-account-symbol-tas",
									children: /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(Glossary, {})
								}),
								". Federal account data is essentially a “roll-up” of multiple treasury account data."
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)("p", { children: [
								"The files available are categorized by type, according to the scope of spending they cover. More information on the different file types can be found in our ",
								/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("a", {
									className: "usa-bold-link",
									href: `${globalConstants.FILES_SERVER_BASE_URL}/docs/Custom+Account+Data+Dictionary.xlsx`,
									children: "Custom Account Data Dictionary"
								}),
								"."
							] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)("div", {
						className: "download-info__section",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("h4", {
							className: "download-info__section-heading",
							children: "Why is this data useful?"
						}), /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("p", { children: "Account data contains the most encompassing amounts of spending throughout U.S. government agencies.  Unlike award data, account data include spending that is not tied to awards, such as operational costs and employee salaries." })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)("div", {
						className: "download-info__section",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("h4", {
								className: "download-info__section-heading",
								children: "How do I use this form?"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("p", { children: "This form allows you to download account data in a range of quarters within a specific fiscal year." }),
							/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("p", { children: "Select an option in each section and click the “Download” button at the bottom." }),
							/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("p", { children: "Heads up: all fields are required. You’ll only be able to start the download when all sections are properly filled." })
						]
					})
				]
			})]
		});
	};
	AccountDataContent.propTypes = propTypes$12;
}));
//#endregion
//#region src/js/containers/bulkDownload/accounts/AccountDataContainer.jsx
/**
* AccountDataContainer.jsx
* Created by Lizzie Salita 4/23/18
*/
var import_jsx_runtime$11, propTypes$11, AccountDataContainer, AccountDataContainer_default;
var init_AccountDataContainer = __esmMin((() => {
	init_redux();
	init_es();
	init_bulkDownloadHelper();
	init_bulkDownloadActions();
	init_AccountDataContent();
	import_jsx_runtime$11 = require_jsx_runtime();
	propTypes$11 = {
		updateDownloadFilter: PropTypes.func,
		clearDownloadFilters: PropTypes.func,
		bulkDownload: PropTypes.object,
		clickedDownload: PropTypes.func,
		setDefCodes: PropTypes.func
	};
	AccountDataContainer = class extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				agencies: {
					cfoAgencies: [],
					otherAgencies: []
				},
				federalAccounts: [],
				budgetFunctions: [],
				budgetSubfunctions: []
			};
			this.agencyListRequest = null;
			this.federalAccountListRequest = null;
			this.budgetFunctionListRequest = null;
			this.budgetSubfunctionListRequest = null;
			this.updateFilter = this.updateFilter.bind(this);
			this.clearAccountFilters = this.clearAccountFilters.bind(this);
			this.setAgencyList = this.setAgencyList.bind(this);
			this.setFederalAccountList = this.setFederalAccountList.bind(this);
			this.setBudgetFunctionList = this.setBudgetFunctionList.bind(this);
			this.setBudgetSubfunctionList = this.setBudgetSubfunctionList.bind(this);
		}
		componentDidMount() {
			this.setAgencyList();
			this.setBudgetFunctionList();
		}
		setAgencyList() {
			if (this.agencyListRequest) this.agencyListRequest.cancel();
			this.agencyListRequest = requestAgenciesList({
				type: "account_agencies",
				agency: 0
			});
			this.agencyListRequest.promise.then((res) => {
				const cfoAgencies = res.data.agencies.cfo_agencies;
				const otherAgencies = res.data.agencies.other_agencies;
				this.setState({ agencies: {
					cfoAgencies,
					otherAgencies
				} });
			}).catch((err) => {
				console.log(err);
				this.agencyListRequest = null;
			});
		}
		async setFederalAccountList(agencyCode, page = 1) {
			if (agencyCode !== "") {
				if (this.federalAccountListRequest) this.federalAccountListRequest.cancel();
				this.federalAccountListRequest = requestFederalAccountList(agencyCode, page);
				try {
					const { data } = await this.federalAccountListRequest.promise;
					this.setState({ federalAccounts: page > 1 ? [...this.state.federalAccounts, ...data.results] : data.results });
					if (data.hasNext) this.setFederalAccountList(agencyCode, page + 1);
				} catch (e) {
					console.log(e);
					this.federalAccountListRequest = null;
				}
			} else this.setState({ federalAccounts: [] }, () => {
				this.resetFederalAccount();
			});
		}
		setBudgetFunctionList() {
			if (this.budgetFunctionListRequest) this.budgetFunctionListRequest.cancel();
			this.budgetFunctionListRequest = requestBudgetFunctionList();
			this.budgetFunctionListRequest.promise.then((res) => {
				const budgetFunctions = res.data.results;
				this.setState({ budgetFunctions });
			}).catch((err) => {
				console.log(err);
				this.budgetFunctionListRequest = null;
			});
		}
		setBudgetSubfunctionList(budgetFunction) {
			if (budgetFunction !== "") {
				if (this.budgetSubfunctionListRequest) this.budgetSubfunctionListRequest.cancel();
				this.budgetSubfunctionListRequest = requestBudgetSubfunctionList({ budget_function: budgetFunction });
				this.budgetSubfunctionListRequest.promise.then((res) => {
					const budgetSubfunctions = res.data.results;
					this.setState({ budgetSubfunctions });
				}).catch((err) => {
					console.log(err);
					this.budgetSubfunctionListRequest = null;
				});
			} else this.setState({ budgetSubfunctions: [] }, () => {
				this.resetBudgetSubfunction();
			});
		}
		updateFilter(name, value) {
			this.props.updateDownloadFilter({
				dataType: "accounts",
				name,
				value
			});
		}
		resetFederalAccount() {
			this.updateFilter("federalAccount", {
				id: "",
				name: "Select a Federal Account"
			});
		}
		clearAccountFilters() {
			this.props.clearDownloadFilters("accounts");
		}
		resetBudgetSubfunction() {
			this.updateFilter("budgetSubfunction", {
				code: "",
				title: "Select a Budget Sub-Function"
			});
		}
		render() {
			return /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(AccountDataContent, {
				setDefCodes: this.props.setDefCodes,
				accounts: this.props.bulkDownload.accounts,
				federalAccounts: this.state.federalAccounts,
				setFederalAccountList: this.setFederalAccountList,
				updateFilter: this.updateFilter,
				clearAccountFilters: this.clearAccountFilters,
				agencies: this.state.agencies,
				budgetFunctions: this.state.budgetFunctions,
				budgetSubfunctions: this.state.budgetSubfunctions,
				setBudgetSubfunctionList: this.setBudgetSubfunctionList,
				clickedDownload: this.props.clickedDownload
			});
		}
	};
	AccountDataContainer.propTypes = propTypes$11;
	AccountDataContainer_default = connect_default((state) => ({ bulkDownload: state.bulkDownload }), (dispatch) => bindActionCreators(bulkDownloadActions_exports, dispatch))(AccountDataContainer);
}));
//#endregion
//#region src/js/components/bulkDownload/archive/filters/AwardTypeToggle.jsx
var import_jsx_runtime$10, propTypes$10, AwardTypeToggle;
var init_AwardTypeToggle = __esmMin((() => {
	import_jsx_runtime$10 = require_jsx_runtime();
	propTypes$10 = {
		filters: PropTypes.object,
		updateFilter: PropTypes.func
	};
	AwardTypeToggle = ({ updateFilter, filters }) => {
		const onClick = (e) => {
			e.preventDefault();
			const target = e.target;
			updateFilter("type", {
				name: target.value,
				display: target.name
			});
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("div", {
			className: "award-type__container",
			children: ["View Award Type:", /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("div", {
				className: "award-type__buttons",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("button", {
					className: `view-button${filters.type.name === "contracts" ? " active" : ""}`,
					value: "contracts",
					title: "Contracts",
					"aria-label": "Contracts",
					name: "Contracts",
					onClick,
					children: "Contracts"
				}), /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("button", {
					className: `view-button${filters.type.name === "assistance" ? " active" : ""}`,
					value: "assistance",
					title: "Financial Assistance",
					"aria-label": "Financial Assistance",
					name: "Financial Assistance",
					onClick,
					children: "Financial Assistance"
				})]
			})]
		});
	};
	AwardTypeToggle.propTypes = propTypes$10;
}));
//#endregion
//#region src/js/components/bulkDownload/archive/filters/AgencyComboBox.jsx
var import_jsx_runtime$9, propTypes$9, AgencyComboBox;
var init_AgencyComboBox = __esmMin((() => {
	init_ComboBox();
	import_jsx_runtime$9 = require_jsx_runtime();
	propTypes$9 = {
		updateFilter: PropTypes.func,
		agencies: PropTypes.object
	};
	AgencyComboBox = ({ updateFilter, agencies }) => {
		let agenciesArray = [{
			name: "All",
			toptier_agency_id: "all",
			toptier_code: "all"
		}];
		Object.entries(agencies).forEach(([key, value]) => {
			const title = {
				name: key === "cfoAgencies" ? "CFO AGENCIES" : "OTHER AGENCIES",
				toptier_agency_id: key,
				toptier_code: null
			};
			agenciesArray = [
				...agenciesArray,
				title,
				...value
			];
		});
		const optionsArray = agenciesArray.map(({ name, toptier_agency_id: id, toptier_code: code }) => ({
			text: name,
			value: code ? id.toString() : `${id}-disabled`,
			fedCode: code
		}));
		const onSelect = (e) => {
			e.preventDefault();
			const target = e.target;
			updateFilter("agency", {
				id: target.value,
				name: target.name
			});
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(ComboBox, {
			optionsArray,
			onSelect,
			label: "Agency",
			placeholder: "Select an Agency",
			defaultValue: "All"
		});
	};
	AgencyComboBox.propTypes = propTypes$9;
}));
//#endregion
//#region src/js/components/bulkDownload/archive/filters/FYComboBox.jsx
var import_jsx_runtime$8, currentFY$1, fyOptions, propTypes$8, FYComboBox;
var init_FYComboBox = __esmMin((() => {
	init_fiscalYearHelper();
	init_ComboBox();
	import_jsx_runtime$8 = require_jsx_runtime();
	currentFY$1 = currentFiscalYear();
	fyOptions = [];
	for (let year = currentFY$1; year >= earliestFiscalYear; year--) fyOptions.push({
		value: year,
		text: `FY ${year}`
	});
	propTypes$8 = { updateFilter: PropTypes.func };
	FYComboBox = ({ updateFilter }) => {
		const onSelect = (e) => {
			e.preventDefault();
			const target = e.target;
			updateFilter("fy", target.value);
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(ComboBox, {
			optionsArray: fyOptions,
			onSelect,
			label: "Fiscal Year (FY)",
			placeholder: "Select a Fiscal Year",
			defaultValue: `FY ${currentFY$1}`
		});
	};
	FYComboBox.propTypes = propTypes$8;
}));
//#endregion
//#region src/js/components/bulkDownload/archive/AwardDataArchiveForm.jsx
var import_jsx_runtime$7, propTypes$7, AwardDataArchiveForm;
var init_AwardDataArchiveForm = __esmMin((() => {
	init_FilterSelectionTitle();
	init_AwardTypeToggle();
	init_AgencyComboBox();
	init_FYComboBox();
	import_jsx_runtime$7 = require_jsx_runtime();
	propTypes$7 = {
		filters: PropTypes.object,
		updateFilter: PropTypes.func,
		agencies: PropTypes.object
	};
	AwardDataArchiveForm = ({ filters, updateFilter, agencies }) => /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)(import_jsx_runtime$7.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(FilterSectionTitle, { type: "agencyFy" }), /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("form", {
		className: "archive-form",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
			className: "award-data-archive-form",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(AgencyComboBox, {
				agencies,
				updateFilter
			}), /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(FYComboBox, { updateFilter })]
		}), /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(AwardTypeToggle, {
			filters,
			updateFilter
		})]
	})] });
	AwardDataArchiveForm.propTypes = propTypes$7;
}));
//#endregion
//#region src/js/components/bulkDownload/archive/table/TableRow.jsx
/**
* TableRow.jsx
* Created by Lizzie Salita 12/15/17
**/
var import_jsx_runtime$6, propTypes$6, fileFieldsForAnalytics, archiveFileDownloadGACategory, getArchiveFileName, TableRow;
var init_TableRow = __esmMin((() => {
	init_Analytics();
	import_jsx_runtime$6 = require_jsx_runtime();
	propTypes$6 = {
		columns: PropTypes.array.isRequired,
		file: PropTypes.object,
		rowIndex: PropTypes.number.isRequired
	};
	fileFieldsForAnalytics = [
		"fy",
		"agency",
		"date"
	];
	archiveFileDownloadGACategory = "Download Center - Archive Download";
	getArchiveFileName = (file) => fileFieldsForAnalytics.reduce((acc, key, i, arr) => {
		const selection = file[key] !== "N/A" ? file[key] : `AllFYs`;
		if (i === 0) return `${selection}_`;
		if (i === arr.length - 1) return `${acc}_${selection}`;
		return `${acc}_${selection}_`;
	}, "");
	TableRow = class extends React.PureComponent {
		constructor(props) {
			super(props);
			this.logArchiveDownload = this.logArchiveDownload.bind(this);
		}
		logArchiveDownload(e, file = this.props.file) {
			Analytics.event({
				event: "archive_bulk_download",
				category: archiveFileDownloadGACategory,
				action: "File Download",
				label: `File Name: ${getArchiveFileName(file)}`,
				gtm: true
			});
			fileFieldsForAnalytics.forEach((key) => {
				const label = file[key] !== "N/A" ? file[key] : `AllFYs`;
				Analytics.event({
					event: "archive_fields_for_download",
					category: archiveFileDownloadGACategory,
					action: `${startCase(key)} Download Criterion`,
					label,
					gtm: true
				});
			});
		}
		render() {
			let rowClass = "row-even";
			if (this.props.rowIndex % 2 === 0) rowClass = "row-odd";
			return /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("tr", { children: this.props.columns.map((column) => {
				if (column.columnName === "fileName") return /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("td", {
					className: rowClass,
					children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("a", {
						href: this.props.file.url,
						target: "_blank",
						rel: "noopener noreferrer",
						onClick: this.logArchiveDownload,
						children: this.props.file.fileName
					})
				}, `${column.columnName}-${this.props.file.url}`);
				return /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("td", {
					className: rowClass,
					children: this.props.file[column.columnName]
				}, `${column.columnName}-${this.props.file.url}`);
			}) });
		}
	};
	TableRow.propTypes = propTypes$6;
}));
//#endregion
//#region src/js/components/bulkDownload/archive/table/AwardDataArchiveTable.jsx
var import_jsx_runtime$5, propTypes$5, AwardDataArchiveTable;
var init_AwardDataArchiveTable = __esmMin((() => {
	init_TableRow();
	import_jsx_runtime$5 = require_jsx_runtime();
	propTypes$5 = {
		results: PropTypes.array,
		columns: PropTypes.array
	};
	AwardDataArchiveTable = ({ results, columns }) => {
		let noResultsClass = "";
		if (results.length === 0) noResultsClass = " no-results";
		const headers = columns.map((column) => /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("th", { children: column.displayName }, column.columnName));
		const rows = results.map((file, index) => /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(TableRow, {
			file,
			rowIndex: index,
			columns
		}, file.url));
		return /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
			className: `award-data-archive-table${noResultsClass}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("table", { children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("tr", { children: headers }) }), /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("tbody", { children: rows })] })
		});
	};
	AwardDataArchiveTable.propTypes = propTypes$5;
}));
//#endregion
//#region src/js/components/bulkDownload/archive/AwardDataArchiveUserSelections.jsx
var import_jsx_runtime$4, propTypes$4, AwardDataArchiveUserSelections;
var init_AwardDataArchiveUserSelections = __esmMin((() => {
	init_dist();
	import_jsx_runtime$4 = require_jsx_runtime();
	propTypes$4 = {
		results: PropTypes.array,
		filters: PropTypes.object
	};
	AwardDataArchiveUserSelections = ({ results, filters }) => {
		const { agency, type, fy } = filters;
		const generateFyString = () => {
			if (fy) return /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
				className: "selection__content",
				children: ["FY ", fy]
			});
			return /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
				className: "selection__content selection__content-required",
				children: "required"
			});
		};
		const generateAgencyString = () => {
			if (agency.name !== "Select an Agency") return /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
				className: "selection__content",
				children: agency.name
			});
			return /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
				className: "selection__content selection__content-required",
				children: "required"
			});
		};
		const generateAwardTypeString = () => {
			if (type.name !== "Select an Award Type") return /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
				className: "selection__content",
				children: type.display
			});
			return /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
				className: "selection__content selection__content-required",
				children: "required"
			});
		};
		const generateArchiveFiles = () => {
			if (results.length > 0) return /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
				className: "selection__content",
				children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("ul", { children: results.map(({ fileName }) => /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("li", { children: fileName }, fileName)) })
			});
			return /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
				className: "selection__content selection__content-required",
				children: "required"
			});
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
			className: "download-user-selections",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", { className: "header-bar" }),
				/* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
					className: "download-user-selections__title-wrapper",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("h3", {
						className: "download-user-selections__title",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(FontAwesomeIcon, {
							icon: "file-arrow-down",
							className: "title-icon"
						}), "Download Summary"]
					}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("h5", {
						className: "download-user-selections__subtitle",
						children: "Your selected options are..."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
					className: "download-user-selections__left-col",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
							className: "selection",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
								className: "selection__heading",
								children: "Agency"
							}), generateAgencyString()]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
							className: "selection",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
								className: "selection__heading",
								children: "Fiscal Year"
							}), generateFyString()]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
							className: "selection",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
								className: "selection__heading",
								children: "Award Type:"
							}), generateAwardTypeString()]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
							className: "selection",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
								className: "selection__heading",
								children: "Archive File(s):"
							}), generateArchiveFiles()]
						})
					]
				})
			]
		});
	};
	AwardDataArchiveUserSelections.propTypes = propTypes$4;
}));
//#endregion
//#region src/js/components/bulkDownload/archive/AwardDataArchiveContent.jsx
/**
* AwardDataArchiveContent.jsx
* Created by Lizzie Salita 12/12/17
*/
var import_jsx_runtime$3, propTypes$3, AwardDataArchiveContent;
var init_AwardDataArchiveContent = __esmMin((() => {
	init_IsMobileContext();
	init_AwardDataArchiveForm();
	init_AwardDataArchiveTable();
	init_AwardDataArchiveUserSelections();
	import_jsx_runtime$3 = require_jsx_runtime();
	propTypes$3 = {
		filters: PropTypes.object,
		updateFilter: PropTypes.func,
		agencies: PropTypes.object,
		results: PropTypes.array,
		columns: PropTypes.array
	};
	AwardDataArchiveContent = ({ filters, updateFilter, agencies, results, columns }) => {
		const { isTablet } = useContext(IsMobileContext);
		return /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
			className: "award-data-archive-content",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("h2", { children: "Download major agencies’ award transaction data for full fiscal years." }),
				/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("p", { children: "A great way to get a view into broad spending trends and, best of all, the files are already prepared — you can access them instantaneously." }),
				/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("p", { children: "New files are uploaded by the 15th of each month. Check the 'Data As Of' column to see the last time files were generated. There are two downloadable archive file types:" }),
				/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("ul", { children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("b", { children: " Full files" }), " - data for the fiscal year up until the date the file was prepared"] }), /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("b", { children: "Delta files" }), " - only new, modified, and deleted data since the date the last month's files were generated. The `correction_delete_ind` column in the delta files indicates whether a record has been modified (C), deleted (D), or added (blank)."] })] }),
				/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(AwardDataArchiveForm, {
					filters,
					updateFilter,
					agencies
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(AwardDataArchiveTable, {
					columns,
					results
				}),
				isTablet && /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(AwardDataArchiveUserSelections, {
					filters,
					results
				})
			]
		});
	};
	AwardDataArchiveContent.propTypes = propTypes$3;
}));
//#endregion
//#region src/js/hooks/useRequestAgenciesList.jsx
var useRequestAgenciesList;
var init_useRequestAgenciesList = __esmMin((() => {
	init_modern();
	init_bulkDownloadHelper();
	useRequestAgenciesList = (type, agency = 0) => {
		const { data, isSuccess, isLoading, error } = useQuery({
			queryKey: [
				"requestAgenciesList",
				type,
				agency
			],
			queryFn: () => requestAgenciesList({
				type,
				agency
			}).promise,
			staleTime: Infinity
		});
		return {
			data,
			isSuccess,
			isLoading,
			error
		};
	};
}));
//#endregion
//#region src/js/containers/bulkDownload/archive/useRequestArchiveFiles.jsx
var useRequestArchiveFiles;
var init_useRequestArchiveFiles = __esmMin((() => {
	init_modern();
	init_bulkDownloadHelper();
	useRequestArchiveFiles = (id, fy, type) => {
		const { data } = useQuery({
			queryKey: [
				"requestArchiveFiles",
				id,
				fy,
				type
			],
			queryFn: () => requestArchiveFiles({
				agency: id,
				fiscal_year: fy,
				type
			}).promise,
			staleTime: Infinity,
			refetchOnWindowFocus: false
		});
		return data?.data?.monthly_files || [];
	};
}));
//#endregion
//#region src/js/containers/bulkDownload/archive/AwardDataArchiveContainer.jsx
/**
* AwardDataArchiveContainer.jsx
* Created by Lizzie Salita 12/14/17
*/
var import_jsx_runtime$2, dayjs, columns, propTypes$2, AwardDataArchiveContainer;
var init_AwardDataArchiveContainer = __esmMin((() => {
	init_bulkDownloadHelper();
	init_AwardDataArchiveContent();
	init_useRequestAgenciesList();
	init_url();
	init_useRequestArchiveFiles();
	import_jsx_runtime$2 = require_jsx_runtime();
	dayjs = require_dayjs_min();
	columns = [
		{
			columnName: "agency",
			displayName: "Agency"
		},
		{
			columnName: "fileName",
			displayName: "Archive File"
		},
		{
			columnName: "fy",
			displayName: "Fiscal Year"
		},
		{
			columnName: "date",
			displayName: "Data As Of"
		}
	];
	propTypes$2 = {
		filters: PropTypes.object,
		setFilters: PropTypes.func,
		results: PropTypes.array,
		setResults: PropTypes.func
	};
	AwardDataArchiveContainer = memo(function AwardDataArchiveContainer({ filters, setFilters, results, setResults }) {
		const { data: agencyData } = useRequestAgenciesList("award_agencies");
		const agencies = {
			cfoAgencies: agencyData?.data.agencies.cfo_agencies || [],
			otherAgencies: agencyData?.data.agencies.other_agencies || []
		};
		const updateFilter = (name, value) => setFilters((prevState) => ({
			...prevState,
			[name]: value
		}));
		const parseResults = useCallback((data) => {
			const res = [];
			data.forEach((item) => {
				let formattedAgency = item.agency_name;
				if (item.agency_acronym) formattedAgency = `${item.agency_name} (${item.agency_acronym})`;
				const formattedDate = dayjs(item.updated_date, "YYYY-MM-DD").format("MM/DD/YYYY");
				let formattedFY;
				if (item.fiscal_year === null) formattedFY = "N/A";
				else formattedFY = `FY ${item.fiscal_year}`;
				const file = {
					agency: formattedAgency,
					fileName: item.file_name,
					url: sanitizeUrl(item.url) || "not available",
					fy: formattedFY,
					date: formattedDate
				};
				res.push(file);
			});
			setResults(res);
		}, [setResults]);
		const requestData = useRequestArchiveFiles(filters.agency.id, parseInt(filters.fy, 10), filters.type.name);
		useEffect(() => {
			if (requestData.length !== 0) parseResults(requestData);
		}, [requestData, parseResults]);
		return /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(AwardDataArchiveContent, {
			filters,
			updateFilter,
			agencies,
			columns,
			results
		});
	});
	AwardDataArchiveContainer.propTypes = propTypes$2;
}));
//#endregion
//#region src/js/components/bulkDownload/BulkDownloadPage.jsx
/**
* BulkDownloadPage.jsx
* Created by Lizzie Salita 10/30/17
*/
var import_jsx_runtime$1, propTypes$1, currentFY, metaTagsByDataType, BulkDownloadPage;
var init_BulkDownloadPage = __esmMin((() => {
	init_IsMobileContext();
	init_metaTagHelper();
	init_index_es();
	init_PageWrapper();
	init_MetadataDownload();
	init_AwardDataContainer();
	init_AccountDataContainer();
	init_AwardDataArchiveContainer();
	init_BulkDownloadModalContainer();
	init_AwardsUserSelections();
	init_AccountUserSelections();
	init_AwardDataArchiveUserSelections();
	init_fiscalYearHelper();
	import_jsx_runtime$1 = require_jsx_runtime();
	propTypes$1 = {
		dataType: PropTypes.string,
		bulkDownload: PropTypes.object,
		startAwardDownload: PropTypes.func,
		startAccountDownload: PropTypes.func
	};
	currentFY = currentFiscalYear();
	metaTagsByDataType = {
		awards: downloadAwardPageMetaTags,
		accounts: downloadAccountPageMetaTags,
		award_data_archive: downloadArchivePageMetaTags,
		dataset_metadata: metadataDownloadPageMetaTags
	};
	BulkDownloadPage = ({ dataType, bulkDownload, startAwardDownload, startAccountDownload }) => {
		const { isTablet } = useContext(IsMobileContext);
		const [showModal, setShowModal] = useState(false);
		const [filters, setFilters] = useState({
			agency: {
				id: "all",
				name: "All"
			},
			type: {
				name: "contracts",
				display: "Contracts"
			},
			fy: `${currentFY}`
		});
		const [results, setResults] = useState([]);
		const hideModal = () => setShowModal(false);
		useEffect(() => {
			if (showModal && bulkDownload.download.expectedUrl === "" && !bulkDownload.download.showCollapsedProgress) hideModal();
		}, [
			bulkDownload.download.expectedUrl,
			bulkDownload.download.showCollapsedProgress,
			showModal
		]);
		const clickedDownload = () => {
			if (dataType === "awards") startAwardDownload();
			else if (dataType === "accounts") startAccountDownload();
			setShowModal(true);
		};
		let downloadDataContent;
		let userSelections;
		let title;
		switch (dataType) {
			case "award_data_archive":
				downloadDataContent = /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(AwardDataArchiveContainer, {
					filters,
					setFilters,
					results,
					setResults
				});
				userSelections = /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(AwardDataArchiveUserSelections, {
					filters,
					results
				});
				title = "Award Data Archive";
				break;
			case "accounts":
				downloadDataContent = /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(AccountDataContainer_default, { clickedDownload });
				userSelections = /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(AccountUserSelections, {});
				title = "Custom Account Data";
				break;
			case "dataset_metadata":
				downloadDataContent = /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(MetadataDownload, {});
				break;
			default:
				downloadDataContent = /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(AwardDataContainer_default, { clickedDownload });
				userSelections = /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(AwardsUserSelections, {});
				title = "Custom Award Data";
		}
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(PageWrapper, {
			pageName: title,
			classNames: "usa-da-bulk-download-page",
			title,
			metaTagProps: dataType in metaTagsByDataType ? metaTagsByDataType[dataType] : {},
			children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("main", {
				id: "main-content",
				children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)(Qs, { children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)($s, {
					width: isTablet || !userSelections ? 12 : 8,
					className: "bulk-download",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
						className: "bulk-download__data",
						children: downloadDataContent
					}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(BulkDownloadModalContainer_default, {
						mounted: showModal,
						hideModal
					})]
				}), userSelections && !isTablet && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)($s, {
					width: 4,
					className: "bulk-download",
					children: userSelections
				})] })
			})
		});
	};
	BulkDownloadPage.propTypes = propTypes$1;
}));
//#endregion
//#region src/js/containers/bulkDownload/helpers/downloadAnalytics.js
/**
* downloadAnalytics.js
* Created by Kevin Li 2/8/18
*/
var categoryPrefix, logDownloadType, convertDateRange, logSingleDownloadField, selectedValueByFilterType, logDownloadFields, logAwardDownload, logAccountDownload;
var init_downloadAnalytics = __esmMin((() => {
	init_Analytics();
	categoryPrefix = "Download Center - Download";
	logDownloadType = (type) => {
		Analytics.event({
			event: "download_center_type",
			category: `${categoryPrefix} Type`,
			action: type,
			gtm: true
		});
	};
	convertDateRange = (dates) => {
		if (dates.startDate && dates.endDate) return `${dates.startDate} - ${dates.endDate}`;
		else if (dates.startDate) return `${dates.startDate} - present`;
		else if (dates.endDate) return `... - ${dates.endDate}`;
		return null;
	};
	logSingleDownloadField = (type, name, value) => {
		Analytics.event({
			event: "download_center_field",
			category: `${categoryPrefix} - ${type}`,
			action: name,
			label: value,
			gtm: true
		});
	};
	selectedValueByFilterType = {
		awardLevels: (obj) => Object.keys(obj).map((key) => startCase(key)).find((key) => obj[camelCase(key)] === true),
		awardTypes: (obj) => Object.keys(obj).filter((key) => obj[key] === true).map((key) => startCase(key)).join(", "),
		agency: (obj) => startCase(obj.name),
		subAgency: (obj) => obj.id !== "" ? startCase(obj.name) : "",
		location: (obj) => obj.state.code !== "" ? `${obj.country.name}, ${obj.state.name}` : obj.country.name,
		dateType: (string) => startCase(string),
		dateRange: (obj) => convertDateRange(obj),
		fileFormat: (string) => string.toLowerCase(),
		accountLevel: (string) => startCase(string),
		budgetFunction: (obj) => startCase(obj.title),
		budgetSubfunction: (obj) => obj.code ? startCase(obj.title) : "",
		federalAccount: (obj) => obj.id ? startCase(obj.name) : "",
		submissionType: (string) => startCase(string),
		timePeriod: (string) => string
	};
	logDownloadFields = (type, filterObj) => {
		Object.keys(filterObj).filter((key) => Object.keys(selectedValueByFilterType).includes(key)).forEach((filter) => {
			const selectedValueObj = filterObj[filter];
			const accessorFn = selectedValueByFilterType[filter];
			const selectedValue = accessorFn(selectedValueObj);
			logSingleDownloadField(type, startCase(filter), selectedValue);
		});
	};
	logAwardDownload = (redux) => {
		logDownloadType("award");
		logDownloadFields("award", redux);
	};
	logAccountDownload = (redux) => {
		logDownloadType("account");
		logDownloadFields("account", {
			...redux,
			timePeriod: `${redux.fy} - Q${redux.quarter}`
		});
	};
}));
//#endregion
//#region src/_scss/pages/bulkDownload/bulkDownloadPage.scss
var require_bulkDownloadPage = /* @__PURE__ */ __commonJSMin((() => {}));
//#endregion
//#region src/js/containers/bulkDownload/BulkDownloadPageContainer.jsx
/**
* BulkDownloadPageContainer.jsx
* Created by Lizzie Salita 10/30/17
*/
var import_jsx_runtime, propTypes, BulkDownloadPageContainer, BulkDownloadPageContainer_default;
//#endregion
__esmMin((() => {
	init_redux();
	init_es();
	init_axios();
	init_development();
	init_bulkDownloadOptions();
	init_BulkDownloadPage();
	init_bulkDownloadActions();
	init_bulkDownloadHelper();
	init_megaMenuOptions();
	init_downloadAnalytics();
	import_jsx_runtime = require_jsx_runtime();
	require_bulkDownloadPage();
	propTypes = {
		bulkDownload: PropTypes.object,
		setDataType: PropTypes.func,
		setDownloadPending: PropTypes.func,
		setDownloadExpectedFile: PropTypes.func,
		setDownloadExpectedUrl: PropTypes.func
	};
	BulkDownloadPageContainer = (props) => {
		let request = null;
		const history = useNavigate();
		const { type } = useMatch(`/download_center/:type`).params;
		const requestDownload = (params, requestType) => {
			if (request) request.cancel();
			const bulkParams = params;
			for (const filterType in bulkParams.filters) if (Array.isArray(bulkParams.filters[filterType]) && !bulkParams.filters[filterType].length) delete bulkParams.filters[filterType];
			if (requestType === "awards") {
				if (bulkParams.filters.sub_agency && bulkParams.filters.sub_agency.toLowerCase() === "select a sub-agency") delete bulkParams.filters.sub_agency;
				request = requestAwardsDownload(bulkParams);
			} else if (requestType === "accounts") request = requestAccountsDownload(bulkParams);
			request.promise.then((res) => {
				props.setDownloadExpectedUrl(res.data.file_url);
				props.setDownloadExpectedFile(res.data.file_name);
				props.setDownloadPending(true);
			}).catch((err) => {
				if (!isCancel(err)) {
					console.log(err);
					if (err.response) console.log(err.response.data.message);
					else console.log(err.message);
				}
			});
		};
		const validateDataType = (typeParam) => {
			if (typeParam) {
				const dataType = downloadOptions.find((optionType) => optionType.url === `/download_center/${typeParam}`);
				if (dataType) props.setDataType(dataType.type);
				else history("/error", { replace: true });
			} else history("/download_center/custom_award_data", { replace: true });
		};
		const startAwardDownload = () => {
			const formState = props.bulkDownload.awards;
			const primeAwardTypes = formState.awardTypes.primeAwards.toArray().reduce((acc, curr) => acc.concat(awardDownloadOptions.awardTypeLookups[curr].apiValues), []);
			const subAwardTypes = formState.awardTypes.subAwards.toArray().reduce((acc, curr) => acc.concat(awardDownloadOptions.awardTypeLookups[curr].apiValues), []);
			const locations = { country: formState.location.country.code };
			if (formState.location.state.code && formState.location.state.code !== "all") locations.state = formState.location.state.code;
			let startDate = "";
			if (formState.dateRange.startDate) startDate = formState.dateRange.startDate;
			let endDate = "";
			if (formState.dateRange.endDate) endDate = formState.dateRange.endDate;
			const params = {
				filters: {
					prime_award_types: primeAwardTypes,
					sub_award_types: subAwardTypes,
					sub_agency: formState.subAgency.name,
					date_type: formState.dateType,
					date_range: {
						start_date: startDate,
						end_date: endDate
					},
					def_codes: formState.defCodes
				},
				file_format: formState.fileFormat
			};
			if (formState.location.country.code && formState.location.country.code !== "all") {
				const locationType = awardDownloadOptions.locationTypes.find((location) => location.name === formState.locationType);
				if (formState.location.country.code === "FOREIGN") params.filters[locationType.apiScopeName] = "foreign";
				else params.filters[locationType.apiName] = [locations];
			}
			const agencyParams = {
				type: formState.agencyType === "awarding_agency" ? "awarding" : "funding",
				tier: "toptier",
				name: formState.agency.name
			};
			if (formState.subAgency.name && formState.subAgency.name !== "Select a Sub-Agency") {
				agencyParams.name = formState.subAgency.name;
				agencyParams.tier = "subtier";
				agencyParams.toptier_name = formState.agency.name;
			}
			params.filters.agencies = [agencyParams];
			requestDownload(params, "awards");
			logAwardDownload(props.bulkDownload.awards);
		};
		const startAccountDownload = () => {
			const formState = props.bulkDownload.accounts;
			const accountLevel = accountDownloadOptions.accountLevels.find((account) => account.name === formState.accountLevel);
			const submissionTypes = accountDownloadOptions.submissionTypes.filter((submissionType) => formState.submissionTypes.includes(submissionType.name)).map((submissionType) => submissionType.apiName);
			const params = {
				account_level: accountLevel.apiName,
				filters: {
					budget_function: formState.budgetFunction.code,
					agency: formState.agency.id,
					submission_types: submissionTypes,
					fy: formState.fy,
					def_codes: formState.defCodes
				},
				file_format: "csv"
			};
			if (formState.federalAccount.id !== "" && formState.federalAccount.id !== "all") params.filters.federal_account = formState.federalAccount.id;
			if (formState.budgetSubfunction.code !== "" && formState.budgetSubfunction.code !== "all") params.filters.budget_subfunction = formState.budgetSubfunction.code;
			if (formState.period !== 0 && !formState.period) params.filters.quarter = formState.quarter;
			else params.filters.period = formState.period;
			requestDownload(params, "accounts");
			logAccountDownload(props.bulkDownload.accounts);
		};
		useEffect(() => {
			validateDataType(type);
		}, [type]);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BulkDownloadPage, {
			bulkDownload: props.bulkDownload,
			dataType: props.bulkDownload.dataType,
			startAwardDownload,
			startAccountDownload,
			dataTypes: downloadOptions
		});
	};
	BulkDownloadPageContainer.propTypes = propTypes;
	BulkDownloadPageContainer_default = connect_default((state) => ({ bulkDownload: state.bulkDownload }), (dispatch) => bindActionCreators(bulkDownloadActions_exports, dispatch))(BulkDownloadPageContainer);
}))();
export { BulkDownloadPageContainer_default as default };
