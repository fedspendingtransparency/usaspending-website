import { n as __esmMin } from "./rolldown-runtime-D1cXj70v.js";
import { $a as init_GlobalConstants, Ai as formatMoneyWithPrecision, Ar as ds, Bi as init_searchFiltersReducer, Di as calculateUnitForSingleValue, Hn as isCancel, Ii as init_moneyFormatter, Li as unitValues, Nr as init_index_es, Qa as globalConstants, Vi as initialState, Vn as init_axios, Vr as ss, go as require_jsx_runtime } from "./index.js-Dk2VDaPz.js";
import { N as init_InfoTooltipContent, i as CondensedCDTooltip } from "./InfoTooltipContent-BmV8PlBe.js";
import { _ as generateUrlHash, y as init_searchHelper } from "./searchHelper-C3Qi4x1J.js";
import { a as stateNameByFipsId, i as stateFIPSByAbbreviation, n as init_stateNames } from "./stateNames-BSGQPQGh.js";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
//#region src/js/dataMapping/topCategories.js
var categories, categoryTitles, recipientCategories;
var init_topCategories = __esmMin((() => {
	categories = {
		all: [
			"awarding_agency",
			"recipient",
			"awards",
			"defc",
			"cfda",
			"naics",
			"county",
			"district"
		],
		contracts: [
			"awarding_agency",
			"awarding_subagency",
			"recipient",
			"awards",
			"defc",
			"naics",
			"county",
			"district"
		],
		grants: [
			"awarding_agency",
			"awarding_subagency",
			"recipient",
			"awards",
			"defc",
			"cfda",
			"county",
			"district"
		],
		direct_payments: [
			"awarding_agency",
			"awarding_subagency",
			"recipient",
			"awards",
			"defc",
			"cfda",
			"county",
			"district"
		],
		loans: [
			"awarding_agency",
			"awarding_subagency",
			"recipient",
			"awards",
			"defc",
			"cfda",
			"county",
			"district"
		],
		other: [
			"awarding_agency",
			"awarding_subagency",
			"recipient",
			"awards",
			"defc",
			"cfda",
			"county",
			"district"
		]
	};
	categoryTitles = {
		awarding_agency: "Awarding Agencies",
		awarding_subagency: "Awarding Sub-Agencies",
		recipient: "Recipients",
		awards: "Awards",
		defc: "Disaster Emergency Fund Codes (DEFCs)",
		cfda: "Assistance Listings (CFDA Programs)",
		naics: "NAICS Codes",
		county: "Counties",
		district: "Congressional Districts",
		federal_account: "Federal Accounts",
		psc: "Product Service Codes",
		country: "Countries",
		state_territory: "U.S. States or Territories"
	};
	recipientCategories = [
		"awarding_agency",
		"awarding_subagency",
		"federal_account",
		"cfda",
		"naics",
		"psc",
		"country",
		"state_territory"
	];
}));
//#endregion
//#region src/js/models/v2/state/BaseStateCategoryResult.jsx
var import_jsx_runtime$1, defaultNameTemplate, BaseStateCategoryResult;
var init_BaseStateCategoryResult = __esmMin((() => {
	init_moneyFormatter();
	import_jsx_runtime$1 = require_jsx_runtime();
	defaultNameTemplate = (code, name) => {
		if (code) return `${code} - ${name}`;
		return name;
	};
	BaseStateCategoryResult = {
		populate(data, index) {
			this.id = data.id;
			this.index = index;
			this._name = data.name || "--";
			this._code = data.code || "";
			this._slug = data.agency_slug;
			this._amount = data.amount || 0;
			this._category = data.category || "";
			this.agency_name = data.agency_name || "--";
			this.agency_id = data.agency_id;
			this.agency_code = data.agency_code || "--";
			this.agency_slug = data.agency_slug;
			this.subagency_slug = data.subagency_slug;
			this._nameTemplate = defaultNameTemplate;
		},
		set nameTemplate(template) {
			this._nameTemplate = template;
		},
		get amount() {
			if (this._amount >= unitValues.MILLION) {
				const units = calculateUnitForSingleValue(this._amount);
				return `${formatMoneyWithPrecision(this._amount / units.unit, 2)}${units.unitLabel}`;
			}
			return formatMoneyWithPrecision(this._amount, 0);
		},
		get combinedName() {
			return this._nameTemplate(this._code, this._name, this._slug);
		},
		get name() {
			return `${this.index}. ${this.combinedName}`;
		},
		get linkedName() {
			if (this._category === "awards") return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("a", {
				href: `/award/${this._slug}`,
				children: this.name
			});
			return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("a", {
				href: `/agency/${this._slug}`,
				children: this.name
			});
		}
	};
}));
//#endregion
//#region src/js/components/sharedComponents/TopFive.jsx
/**
* TopFive.jsx
* Created by Kevin Li 5/15/18
*/
var import_jsx_runtime, propTypes, TopFive;
var init_TopFive = __esmMin((() => {
	init_index_es();
	init_axios();
	init_topCategories();
	init_searchFiltersReducer();
	init_InfoTooltipContent();
	init_stateNames();
	init_GlobalConstants();
	init_searchHelper();
	import_jsx_runtime = require_jsx_runtime();
	propTypes = {
		category: PropTypes.string,
		results: PropTypes.array,
		total: PropTypes.number,
		loading: PropTypes.bool,
		error: PropTypes.bool,
		dataParams: PropTypes.object,
		agencyData: PropTypes.object
	};
	TopFive = (props) => {
		const [linkData, setLinkData] = useState();
		const { agencySlugs, slugsLoading, slugsError } = props.agencyData;
		const columns = [
			{
				title: "name",
				displayName: "Name"
			},
			{
				title: "amount",
				displayName: ["Obligations"]
			},
			{
				title: "percent",
				displayName: ["% of Total"]
			},
			{
				title: "link",
				displayName: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["View in ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					style: { whiteSpace: "nowrap" },
					children: "Award Search"
				})] })]
			}
		];
		if (props.dataParams.filters?.recipient_id) columns.pop();
		const getSelectedLink = (e, data) => {
			e.preventDefault();
			e.stopPropagation();
			setLinkData(data);
		};
		const tableRows = props.results?.map((result) => {
			const percentValue = result._amount / props.total * 100;
			const percent = !isNaN(percentValue) && isFinite(percentValue) ? `${Math.round(percentValue * 100) / 100}%` : "--";
			const linkText = props.category === "awards" ? "View this award" : "View awards";
			const rowArray = [
				result._slug ? result.linkedName : result.name,
				result.amount,
				percent,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					role: "button",
					tabIndex: 0,
					"aria-label": "View awards",
					onKeyDown: (e) => {
						if (e.key === "Enter") getSelectedLink(e, result.name);
					},
					onClick: (e) => getSelectedLink(e, result),
					children: linkText
				})
			];
			if (props.dataParams.filters?.recipient_id) rowArray.pop();
			return rowArray;
		});
		const createLink = () => {
			const params = props.dataParams;
			const filter = params.filters?.place_of_performance_locations ? params.filters?.place_of_performance_locations[0] : params.filters?.recipient_id;
			let fips;
			let stateName;
			let categoryFilter;
			let locationFilter;
			if (params.filters?.place_of_performance_locations) {
				fips = stateFIPSByAbbreviation[filter.state];
				stateName = stateNameByFipsId[fips];
				locationFilter = { selectedLocations: { [`${filter.country}_${filter.state}`]: {
					identifier: `${filter.country}_${filter.state}`,
					filter: {
						country: filter.country,
						state: filter.state
					},
					display: {
						entity: "State",
						standalone: stateName,
						title: stateName
					}
				} } };
			}
			if (params.category === "awarding_agency") categoryFilter = { selectedAwardingAgencies: { [`${linkData.id}_toptier`]: {
				id: linkData.id,
				toptier_flag: true,
				toptier_agency: {
					toptier_code: agencySlugs[linkData.slug],
					abbreviation: linkData._code,
					name: linkData._name
				},
				subtier_agency: {
					abbreviation: linkData._code,
					name: linkData._name
				},
				agencyType: "toptier"
			} } };
			else if (params.category === "awarding_subagency") categoryFilter = { selectedAwardingAgencies: { [`${linkData.id}_toptier`]: {
				id: linkData.id,
				toptier_flag: false,
				toptier_agency: {
					toptier_code: agencySlugs[linkData.agency_slug],
					abbreviation: linkData.agency_abbreviation,
					name: linkData.agency_name
				},
				subtier_agency: {
					abbreviation: linkData._code,
					name: linkData._name
				},
				agencyType: "subtier"
			} } };
			else if (params.category === "defc") categoryFilter = { defCodes: {
				require: [linkData._code],
				exclude: [],
				counts: [{
					label: linkData._name,
					value: linkData._code,
					count: 1
				}]
			} };
			else if (params.category === "recipient") categoryFilter = { selectedRecipients: [linkData._name] };
			else if (params.category === "county") locationFilter = { selectedLocations: { [`${filter.country}_${filter.state}_${linkData._code}`]: {
				identifier: `${filter.country}_${filter.state}_${linkData._code}`,
				filter: {
					country: filter.country,
					state: filter.state,
					county: linkData._code
				},
				display: {
					entity: "County",
					standalone: `${linkData._name}, ${filter.state}`,
					title: linkData._name
				}
			} } };
			else if (params.category === "district") locationFilter = { selectedLocations: { [`${filter.country}_${filter.state}_${linkData._code}`]: {
				identifier: `${filter.country}_${filter.state}_${linkData._code}`,
				filter: {
					country: filter.country,
					state: filter.state,
					district_current: linkData._code
				},
				display: {
					entity: "Current congressional district",
					standalone: `${linkData._name}, ${filter.state}`,
					title: linkData._name
				}
			} } };
			else if (params.category === "cfda") categoryFilter = { selectedCFDA: { [linkData._code]: {
				program_number: linkData._code,
				program_title: linkData._name,
				identifier: linkData._code
			} } };
			else if (params.category === "naics") categoryFilter = { naicsCodes: {
				require: [linkData._code],
				exclude: [],
				counts: [{
					label: linkData._name,
					value: linkData._code,
					count: 1
				}]
			} };
			else if (params.category === "awards") categoryFilter = { selectedAwardIDs: { [linkData._name]: linkData._name } };
			else if (params.category === "federal_account") categoryFilter = { tasCodes: {
				require: [[linkData._code]],
				exclude: [],
				counts: [{
					label: linkData._name,
					value: linkData._code,
					count: 2
				}]
			} };
			else if (params.category === "country") locationFilter = { selectedLocations: { [`${linkData._code}`]: {
				identifier: `${linkData._code}`,
				filter: { country: linkData._code },
				display: {
					entity: "Country",
					standalone: `${linkData._name}`,
					title: linkData._name
				}
			} } };
			else if (params.category === "state_territory") locationFilter = { selectedLocations: { [`USA_${linkData._code}`]: {
				identifier: `USA_${linkData._code}`,
				filter: {
					country: "USA",
					state: linkData._code
				},
				display: {
					entity: "State or Territory",
					standalone: `${linkData._name}`,
					title: linkData._name
				}
			} } };
			let awardTypeFilter;
			if (params.filters.award_type_codes?.length > 0) awardTypeFilter = { awardType: params.filters.award_type_codes };
			if (params.filters?.recipient_id) categoryFilter = {
				...categoryFilter,
				selectedRecipients: [params.filters?.recipient_name]
			};
			const timePeriodFilter = [{
				start_date: params.filters.time_period[0].start_date,
				end_date: params.filters.time_period[0].end_date
			}];
			let tempHash = generateUrlHash({
				filters: {
					...initialState,
					...categoryFilter,
					...locationFilter,
					timePeriodType: "dr",
					time_period: timePeriodFilter,
					...awardTypeFilter
				},
				version: globalConstants.REQUEST_VERSION
			});
			tempHash.promise.then((results) => {
				const hashData = results.data;
				window.open(`/search?hash=${encodeURIComponent(hashData.hash)}`, "_blank");
			}).catch((error) => {
				if (isCancel(error)) {} else if (error.response) {
					tempHash = null;
					console.log(error);
				} else {
					tempHash = null;
					console.log(error);
				}
			});
		};
		useEffect(() => {
			if (agencySlugs && linkData) createLink();
		}, [
			agencySlugs,
			linkData,
			slugsLoading,
			slugsError
		]);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "category-table",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "category-table__title",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					className: "category-table__title-icon",
					src: `img/state-categories/${props.category}.png`,
					"aria-hidden": "true",
					alt: ""
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "category-table__title-name",
					children: props.category === "district" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [categoryTitles[props.category], /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds, {
						className: "congressional-district__tt",
						icon: "info",
						tooltipPosition: "bottom",
						tooltipComponent: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CondensedCDTooltip, { title: "Congressional Districts" })
					})] }) : categoryTitles[props.category]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ss, {
				classNames: "topfive-table__table",
				columns,
				rows: tableRows,
				loading: props.loading,
				error: props.error
			})]
		});
	};
	TopFive.propTypes = propTypes;
}));
//#endregion
export { categories as a, init_BaseStateCategoryResult as i, init_TopFive as n, init_topCategories as o, BaseStateCategoryResult as r, recipientCategories as s, TopFive as t };
