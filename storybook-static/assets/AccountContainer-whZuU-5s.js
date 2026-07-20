import { n as __esmMin, o as __toESM, r as __exportAll, t as __commonJSMin } from "./rolldown-runtime-D1cXj70v.js";
import { $t as init_apiRequest, An as isCancel, Et as searchFilterActions_exports, Fr as init_dist, Ja as connect_default, Jn as getBaseUrl, Mr as ws, Na as useMatch, O as require_dayjs_min, Oa as init_development, On as init_Icons, Pr as FontAwesomeIcon, Qt as apiRequest, S as earliestFiscalYear, T as init_fiscalYearHelper, Tt as init_searchFilterActions, Ua as init_es, Xa as bindActionCreators, Xn as init_socialShare, Yn as handleShareOptionClick, Za as init_redux, _i as formatMoney, an as AngleLeft, br as fo, da as init_awardType, en as init_modalActions, fr as Qs, g as allFiscalYears, gi as calculateUnits, gn as ExclamationCircle, hi as calculateUnitForSingleValue, hn as Close, i as init_Footer, in as AngleDown, ir as $s, kn as init_axios, ma as require_immutable, mr as Wo, oa as awardTypeGroups, on as AngleRight, qa as useDispatch, r as Footer_default, ro as require_jsx_runtime, sn as AngleUp, sr as Go, tn as showModal, v as convertFYToDateRange, vi as formatMoneyWithPrecision, vr as ds, wi as init_moneyFormatter, x as earliestFederalAccountYear, xr as init_index_es, y as currentFiscalYear, ya as init_mobileBreakpoints, yn as Filter } from "./index.js-CgeUxZJy.js";
import { C as federalAccountPageMetaTags, D as init_metaTagHelper, n as init_HeaderContainer, t as HeaderContainer_default } from "./HeaderContainer-DuB8bISr.js";
import { n as init_PageWrapper, t as PageWrapper } from "./PageWrapper-BZX48lf-.js";
import { n as init_ShareIcon508, t as ShareIcon508 } from "./ShareIcon508-C8ifp7Wx.js";
import { D as accountActions_exports, O as init_accountActions } from "./aboutTheDataHelper-BhyHMJca.js";
import { a as fetchTasBalanceTotals$1, i as fetchFederalAccountFYSnapshot, n as fetchAvailableObjectClasses, o as fetchTasCategoryTotals$1, r as fetchFederalAccount, s as init_account } from "./account-C0qUof-b.js";
import { i as withLatestFy, t as init_WithLatestFy } from "./WithLatestFy-D_VFY3b6.js";
import { d as SUBMISSION_PERIOD_PROPS, f as init_propTypes, u as LATEST_PERIOD_PROPS } from "./propTypes-XCgVPU6o.js";
import { n as dodNote, r as init_Note, t as Note } from "./Note-Bun-FT8t.js";
import { n as init_GlossaryLink, t as GlossaryLink } from "./GlossaryLink-Dzf78LU9.js";
import { $ as number_default, B as linear, K as init_src, at as band, t as init_src$1 } from "./src-BVb2vAbu.js";
import { C as performSpendingByAwardTabCountSearch, S as performSpendingByAwardSearch, y as init_searchHelper } from "./searchHelper-D0TEuy-H.js";
import { n as init_ProfileBackLink, t as ProfileBackLink } from "./ProfileBackLink-Bi5rIoQ4.js";
import { a as ResultsTableSection, c as defaultColumns, d as awardTableColumnTypes, f as init_awardTableColumnTypes, g as init_TimePeriod, h as TimePeriod, l as defaultSort, m as init_SpendingByCategoriesChart, n as subTypes, o as init_ResultsTableSection, p as SpendingByCategoriesChart, r as tableTypes, t as init_table, u as init_awardTableColumns } from "./table-DKa2wUHi.js";
import { n as init_PrimaryCheckboxType, t as PrimaryCheckboxType } from "./PrimaryCheckboxType-DdkGKl1b.js";
import { n as init_BarChartLegend, t as BarChartLegend } from "./BarChartLegend-ChLsfTE4.js";
import { n as measureTableHeader, t as init_textMeasurement } from "./textMeasurement-Bf9kYCr1.js";
import { n as init_Error, t as Error } from "./Error-NjAxAGy3.js";
import React, { createElement, useCallback, useEffect, useRef, useState } from "react";
import PropTypes, { arrayOf, oneOfType } from "prop-types";
import { concat, find, flowRight, isEqual, isObject, keyBy, map, max, min, orderBy, sortBy, throttle, uniqueId } from "lodash-es";
//#region src/js/redux/actions/account/accountFilterActions.js
var accountFilterActions_exports = /* @__PURE__ */ __exportAll({
	bulkObjectClassesChange: () => bulkObjectClassesChange,
	resetAccountFilters: () => resetAccountFilters,
	resetObjectClass: () => resetObjectClass,
	resetProgramActivity: () => resetProgramActivity,
	resetTimeFilters: () => resetTimeFilters,
	setAvailableObjectClasses: () => setAvailableObjectClasses,
	setAvailableProgramActivities: () => setAvailableProgramActivities,
	toggleObjectClass: () => toggleObjectClass,
	toggleProgramActivity: () => toggleProgramActivity,
	updateTimePeriod: () => updateTimePeriod
});
var updateTimePeriod, resetTimeFilters, toggleObjectClass, setAvailableObjectClasses, bulkObjectClassesChange, resetObjectClass, setAvailableProgramActivities, toggleProgramActivity, resetProgramActivity, resetAccountFilters;
var init_accountFilterActions = __esmMin((() => {
	updateTimePeriod = (state) => ({
		type: "UPDATE_ACCOUNT_FILTER_TIME",
		dateType: state.dateType,
		fy: state.fy,
		start: state.startDate,
		end: state.endDate
	});
	resetTimeFilters = () => ({ type: "RESET_ACCOUNT_FILTER_TIME" });
	toggleObjectClass = (state) => ({
		type: "TOGGLE_ACCOUNT_OBJECT_CLASS",
		item: state
	});
	setAvailableObjectClasses = (state) => ({
		type: "SET_ACCOUNT_AVAILABLE_OBJECT_CLASSES",
		objectClass: state.values,
		objectClassDefinitions: state.definitions,
		objectClassChildren: state.children
	});
	bulkObjectClassesChange = (state) => ({
		type: "BULK_ACCOUNT_TOGGLE_OBJECT_CLASSES",
		objectClasses: state.types,
		direction: state.direction
	});
	resetObjectClass = () => ({ type: "RESET_ACCOUNT_OBJECT_CLASS" });
	setAvailableProgramActivities = (state) => ({
		type: "SET_AVAILABLE_PROGRAM_ACTIVITIES",
		programActivities: state
	});
	toggleProgramActivity = (state) => ({
		type: "TOGGLE_ACCOUNT_PROGRAM_ACTIVITY",
		item: state
	});
	resetProgramActivity = () => ({ type: "RESET_ACCOUNT_PROGRAM_ACTIVITY" });
	resetAccountFilters = () => ({ type: "RESET_ACCOUNT_FILTERS" });
}));
//#endregion
//#region src/js/models/v1/results/GenericRecord.js
/**
* GenericRecord.js
* Created by Kevin Li 11/16/16
**/
var GenericRecord;
var init_GenericRecord = __esmMin((() => {
	GenericRecord = class {
		constructor(recordType, fieldNames, data, excludedFields = /* @__PURE__ */ new Set()) {
			const providedData = isObject(data);
			fieldNames.forEach((field) => {
				this[field] = null;
				if (providedData && {}.hasOwnProperty.call(data, field)) {
					if (!excludedFields.has(field)) this[field] = data[field];
				}
			});
			const objectIdentifier = uniqueId();
			this._jsid = `${recordType}-${objectIdentifier}`;
		}
	};
}));
//#endregion
//#region src/js/models/v1/account/FederalAccount.js
var recordType, fields, defaultValues, formatData, FederalAccount;
var init_FederalAccount = __esmMin((() => {
	init_GenericRecord();
	recordType = "contract-transaction";
	fields = [
		"id",
		"title",
		"agency_identifier",
		"main_account_code",
		"totals",
		"parent_agency_toptier_code"
	];
	defaultValues = [
		null,
		"",
		"",
		"",
		{
			available: false,
			obligated: 0,
			unobligated: 0,
			budgetAuthority: 0,
			outlay: 0,
			balanceBroughtForward: 0,
			otherBudgetaryResources: 0,
			appropriations: 0
		},
		""
	];
	formatData = (data) => {
		const formattedData = Object.assign({}, data);
		formattedData.title = data.account_title;
		fields.forEach((field, i) => {
			if (!{}.hasOwnProperty.call(formattedData, field)) formattedData[field] = defaultValues[i];
		});
		return formattedData;
	};
	FederalAccount = class extends GenericRecord {
		constructor(data) {
			const formattedData = formatData(data);
			super(recordType, fields, formattedData);
		}
	};
}));
//#endregion
//#region src/js/dataMapping/accounts/accountFields.js
var balanceFields, categoryLabelFields, balanceFieldsFiltered, balanceFieldsNonfiltered, fiscalYearSnapshotFields;
var init_accountFields = __esmMin((() => {
	balanceFields = {
		outlay: "gross_outlay_amount_by_tas_cpe",
		budgetAuthority: "total_budgetary_resources_amount_cpe",
		obligated: "obligations_incurred_total_by_tas_cpe",
		unobligated: "unobligated_balance_cpe",
		balanceBroughtForward1: "budget_authority_unobligated_balance_brought_forward_fyb",
		balanceBroughtForward2: "adjustments_to_unobligated_balance_brought_forward_cpe",
		otherBudgetaryResources: "other_budgetary_resources_amount_cpe",
		appropriations: "budget_authority_appropriated_amount_cpe"
	};
	categoryLabelFields = {
		programActivity: "program_activity__program_activity_name",
		objectClass: "object_class__object_class_name",
		tas: "treasury_account__tas_rendering_label"
	};
	balanceFieldsFiltered = {
		obligatedFiltered: "obligations_incurred_by_program_object_class_cpe",
		outlay: "gross_outlay_amount_by_program_object_class_cpe"
	};
	balanceFieldsNonfiltered = {
		budgetAuthority: "total_budgetary_resources_amount_cpe",
		unobligated: "unobligated_balance_cpe"
	};
	fiscalYearSnapshotFields = {
		outlay: "outlay",
		budget_authority: "budgetAuthority",
		obligated: "obligated",
		unobligated: "unobligated",
		balance_brought_forward: "balanceBroughtForward",
		other_budgetary_resources: "otherBudgetaryResources",
		appropriations: "appropriations"
	};
}));
//#endregion
//#region src/js/components/account/visualizations/sankey/components/SankeyMessage.jsx
/**
* SankeyMessage.jsx
* Created by Kevin Li 4/18/17
*/
var import_jsx_runtime$55, propTypes$52, SankeyMessage;
var init_SankeyMessage = __esmMin((() => {
	import_jsx_runtime$55 = require_jsx_runtime();
	propTypes$52 = { message: PropTypes.string };
	SankeyMessage = class extends React.Component {
		render() {
			return /* @__PURE__ */ (0, import_jsx_runtime$55.jsx)("div", {
				className: "sankey-message",
				children: this.props.message
			});
		}
	};
	SankeyMessage.propTypes = propTypes$52;
}));
//#endregion
//#region src/js/components/account/visualizations/sankey/components/SankeyBar.jsx
var import_jsx_runtime$54, propTypes$51, SankeyBar;
var init_SankeyBar = __esmMin((() => {
	import_jsx_runtime$54 = require_jsx_runtime();
	propTypes$51 = {
		width: PropTypes.number,
		height: PropTypes.number,
		x: PropTypes.number,
		y: PropTypes.number,
		description: PropTypes.string,
		color: PropTypes.string
	};
	SankeyBar = ({ width, height, x, y, description = "", color }) => {
		if (height <= 0 || width <= 0) return null;
		return /* @__PURE__ */ (0, import_jsx_runtime$54.jsxs)("g", {
			transform: `translate(${x},${y})`,
			"aria-label": description,
			children: [/* @__PURE__ */ (0, import_jsx_runtime$54.jsx)("desc", { children: description }), /* @__PURE__ */ (0, import_jsx_runtime$54.jsx)("rect", {
				fill: color,
				x: "0",
				y: "0",
				width,
				height
			})]
		});
	};
	SankeyBar.propTypes = propTypes$51;
}));
//#endregion
//#region src/js/components/account/visualizations/sankey/components/SankeyFlow.jsx
/**
* SankeyFlow.jsx
* Created by Kevin Li 3/27/17
*/
var import_jsx_runtime$53, propTypes$50, SankeyFlow;
var init_SankeyFlow = __esmMin((() => {
	init_src();
	import_jsx_runtime$53 = require_jsx_runtime();
	propTypes$50 = {
		startY: PropTypes.number,
		endY: PropTypes.number,
		height: PropTypes.number,
		length: PropTypes.number,
		description: PropTypes.string,
		style: PropTypes.object
	};
	SankeyFlow = ({ startY, endY, height, length, description = "", style }) => {
		const [path, setPath] = useState("");
		const calculatePath = () => {
			let pathLocal = "";
			pathLocal += `M0,${startY}L2,${startY}`;
			const curve = number_default(2, length);
			pathLocal += `C${curve(.5)},${startY}`;
			pathLocal += ` ${curve(.5)},${endY}`;
			pathLocal += ` ${length},${endY}L${length + 4},${endY}`;
			pathLocal += ` L${length + 4},${endY + height}`;
			pathLocal += `L${length},${endY + height}`;
			pathLocal += `C${curve(.5)},${endY + height}`;
			pathLocal += ` ${curve(.5)},${startY + height}`;
			pathLocal += ` 2,${startY + height}`;
			pathLocal += `L0,${startY + height}`;
			pathLocal += "Z";
			setPath(pathLocal);
		};
		useEffect(() => {
			calculatePath();
		});
		if (height <= 0) return null;
		return /* @__PURE__ */ (0, import_jsx_runtime$53.jsxs)("g", {
			transform: "translate(-2,0)",
			"aria-label": description,
			children: [/* @__PURE__ */ (0, import_jsx_runtime$53.jsx)("desc", { children: description }), /* @__PURE__ */ (0, import_jsx_runtime$53.jsx)("path", {
				className: "flow-path",
				d: path,
				style
			})]
		});
	};
	SankeyFlow.propTypes = propTypes$50;
}));
//#endregion
//#region src/js/components/account/visualizations/sankey/components/ItemLabel.jsx
var import_jsx_runtime$52, propTypes$49, ItemLabel;
var init_ItemLabel = __esmMin((() => {
	import_jsx_runtime$52 = require_jsx_runtime();
	propTypes$49 = {
		x: PropTypes.number,
		y: PropTypes.number,
		hide: PropTypes.bool,
		title: PropTypes.string,
		value: PropTypes.string
	};
	ItemLabel = ({ x = 0, y = 0, hide = false, title, value }) => {
		if (hide) return null;
		return /* @__PURE__ */ (0, import_jsx_runtime$52.jsxs)("g", {
			className: "item-label",
			transform: `translate(${x},${y})`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime$52.jsx)("text", {
				className: "title",
				x: 0,
				y: 0,
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime$52.jsx)("text", {
				className: "value",
				x: 0,
				y: 16,
				children: value
			})]
		});
	};
	ItemLabel.propTypes = propTypes$49;
}));
//#endregion
//#region src/js/components/account/visualizations/sankey/components/DirectionLabel.jsx
var import_jsx_runtime$51, propTypes$48, DirectionLabel;
var init_DirectionLabel = __esmMin((() => {
	import_jsx_runtime$51 = require_jsx_runtime();
	propTypes$48 = {
		x: PropTypes.number,
		y: PropTypes.number,
		paddingX: PropTypes.number,
		title: PropTypes.string,
		children: PropTypes.element
	};
	DirectionLabel = ({ x = 0, y = 0, paddingX, title, children }) => /* @__PURE__ */ (0, import_jsx_runtime$51.jsxs)("g", {
		className: "direction-label",
		transform: `translate(${x},${y})`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime$51.jsx)("text", {
			className: "title",
			x: 0,
			y: 0,
			"aria-label": title,
			children: title.toUpperCase()
		}), /* @__PURE__ */ (0, import_jsx_runtime$51.jsx)("g", {
			className: "direction-icon",
			transform: `translate(${paddingX},-10) scale(0.016 0.016)`,
			children
		})]
	});
	DirectionLabel.propTypes = propTypes$48;
}));
//#endregion
//#region src/js/components/account/visualizations/sankey/components/SankeyDisclosures.jsx
/**
* SankeyDisclosures.jsx
* Created by Kevin Li 4/18/17
*/
var import_jsx_runtime$50, propTypes$47, SankeyDisclosures;
var init_SankeyDisclosures = __esmMin((() => {
	import_jsx_runtime$50 = require_jsx_runtime();
	propTypes$47 = { items: PropTypes.array };
	SankeyDisclosures = class extends React.Component {
		render() {
			const items = this.props.items.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime$50.jsxs)("li", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime$50.jsxs)("b", { children: [item.label, ":"] }),
				" ",
				item.value
			] }, index));
			return /* @__PURE__ */ (0, import_jsx_runtime$50.jsxs)("div", {
				className: "sankey-disclosures",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$50.jsx)("div", {
					className: "disclosure-title",
					children: "Not Shown:"
				}), /* @__PURE__ */ (0, import_jsx_runtime$50.jsx)("ul", {
					className: "disclosure-list",
					children: items
				})]
			});
		}
	};
	SankeyDisclosures.propTypes = propTypes$47;
}));
//#endregion
//#region src/js/components/account/visualizations/sankey/SankeyVisualizationHorizontal.jsx
/**
* SankeyVisualizationHorizontal.jsx
* Created by Kevin li 3/27/17
*/
var import_jsx_runtime$49, propTypes$46, SankeyVisualizationHorizontal;
var init_SankeyVisualizationHorizontal = __esmMin((() => {
	init_moneyFormatter();
	init_SankeyBar();
	init_SankeyFlow();
	init_ItemLabel();
	init_DirectionLabel();
	init_SankeyDisclosures();
	import_jsx_runtime$49 = require_jsx_runtime();
	propTypes$46 = {
		width: PropTypes.number,
		height: PropTypes.number,
		amounts: PropTypes.object
	};
	SankeyVisualizationHorizontal = class extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				center: {
					width: 0,
					height: 0,
					x: 0,
					y: 0,
					description: ""
				},
				right: {
					width: 0,
					x: 0,
					obligated: {
						height: 0,
						description: "",
						label: ""
					},
					unobligated: {
						height: 0,
						y: 0,
						description: "",
						label: ""
					},
					flow: {
						length: 0,
						x: 0
					}
				},
				left: {
					width: 0,
					x: 0,
					bbf: {
						height: 0,
						description: "",
						label: ""
					},
					other: {
						height: 0,
						y: 0,
						description: "",
						label: ""
					},
					appropriations: {
						height: 0,
						y: 0,
						description: "",
						label: ""
					},
					flow: {
						length: 0,
						x: 0
					}
				},
				hidden: [],
				labels: {
					inX: 0,
					outX: 0
				}
			};
		}
		componentDidMount() {
			this.generateChart(this.props);
		}
		componentDidUpdate(prevProps) {
			if (!isEqual(prevProps, this.props)) this.generateChart(this.props);
		}
		generateLabel(amount, total) {
			return `${formatMoney(amount)} (${Math.round(amount / total * 1e3) / 10}%)`;
		}
		generateChart(props) {
			const barWidth = props.width / 6;
			const flowLength = props.width / 4;
			const graphHeight = props.height - 40;
			const hidden = [];
			const budgetAuthority = props.amounts.budgetAuthority;
			const centerHeight = graphHeight * (2 / 3);
			const centerY = (graphHeight - centerHeight) / 2;
			const centerX = (props.width - barWidth) / 2;
			const center = {
				width: barWidth,
				height: centerHeight,
				x: centerX,
				y: centerY,
				description: `Total Budgetary Resources: \
${formatMoney(props.amounts.budgetAuthority)}`
			};
			const bbf = props.amounts.in.bbf;
			const bbfHeight = bbf / budgetAuthority * centerHeight;
			const bbfString = formatMoney(bbf);
			const bbfLabel = this.generateLabel(bbf, budgetAuthority);
			const appropriations = props.amounts.in.appropriations;
			const appropHeight = appropriations / budgetAuthority * centerHeight;
			const appropString = formatMoney(appropriations);
			const appropLabel = this.generateLabel(appropriations, budgetAuthority);
			const appropY = graphHeight - appropHeight;
			const other = props.amounts.in.other;
			const otherHeight = other / budgetAuthority * centerHeight;
			const otherString = formatMoney(other);
			const otherLabel = this.generateLabel(other, budgetAuthority);
			let otherY = (bbfHeight + appropY) / 2 - otherHeight / 2;
			if (appropHeight <= 0) otherY = graphHeight - otherHeight;
			else if (bbfHeight <= 0) otherY = 0;
			if (props.amounts.in.bbf < 0) hidden.push({
				value: formatMoney(props.amounts.in.bbf),
				label: "Balance Brought Forward"
			});
			if (props.amounts.in.other < 0) hidden.push({
				value: formatMoney(props.amounts.in.other),
				label: "Other Budgetary Resources"
			});
			if (props.amounts.in.appropriations < 0) hidden.push({
				value: formatMoney(props.amounts.in.appropriations),
				label: "New Appropriations"
			});
			const left = {
				width: barWidth,
				x: 0,
				bbf: {
					height: bbfHeight,
					description: `Balance Brought Forward: ${bbfString}`,
					label: bbfLabel
				},
				other: {
					height: otherHeight,
					y: otherY,
					description: `Other Budgetary Resouces: ${otherString}`,
					label: otherLabel
				},
				appropriations: {
					height: appropHeight,
					y: appropY,
					description: `New Appropriations: ${appropString}`,
					label: appropLabel
				},
				flow: {
					length: flowLength,
					x: barWidth
				}
			};
			const obligatedHeight = props.amounts.out.obligated / props.amounts.budgetAuthority * centerHeight;
			const unobligatedHeight = props.amounts.out.unobligated / props.amounts.budgetAuthority * centerHeight;
			const obligatedString = formatMoney(props.amounts.out.obligated);
			const unobligatedString = formatMoney(props.amounts.out.unobligated);
			const obligatedLabel = this.generateLabel(props.amounts.out.obligated, budgetAuthority);
			const unobligatedLabel = this.generateLabel(props.amounts.out.unobligated, budgetAuthority);
			if (props.amounts.out.obligated < 0) hidden.push({
				value: formatMoney(props.amounts.out.obligated),
				label: "Obligations Incurred"
			});
			if (props.amounts.out.unobligated < 0) hidden.push({
				value: formatMoney(props.amounts.out.unobligated),
				label: "Unobligated Balance"
			});
			const right = {
				width: barWidth,
				x: props.width - barWidth,
				obligated: {
					height: obligatedHeight,
					description: `Obligations Incurred: ${obligatedString}`,
					label: obligatedLabel
				},
				unobligated: {
					height: unobligatedHeight,
					y: graphHeight - unobligatedHeight,
					description: `Unobligated Balance: ${unobligatedString}`,
					label: unobligatedLabel
				},
				flow: {
					length: flowLength,
					x: centerX + barWidth
				}
			};
			const inX = center.x - left.flow.length / 2 - 45;
			const outX = right.x - right.flow.length / 2 - 55;
			this.setState({
				center,
				left,
				right,
				hidden,
				labels: {
					inX,
					outX
				}
			});
		}
		render() {
			let disclosures = null;
			if (this.state.hidden.length > 0) disclosures = /* @__PURE__ */ (0, import_jsx_runtime$49.jsx)(SankeyDisclosures, { items: this.state.hidden });
			return /* @__PURE__ */ (0, import_jsx_runtime$49.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime$49.jsxs)("svg", {
				className: "sankey",
				width: this.props.width,
				height: this.props.height + 2,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$49.jsxs)("g", {
						className: "left-flows",
						transform: `translate(${this.state.left.flow.x}, 40)`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$49.jsx)(SankeyFlow, {
								startY: 0,
								endY: this.state.center.y,
								height: this.state.left.bbf.height,
								length: this.state.left.flow.length,
								description: `Flow of money into total budgetary resources from balance \
brought forward`,
								style: { fill: "#bfcfd4" }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$49.jsx)(SankeyFlow, {
								startY: this.state.left.other.y,
								endY: this.state.center.y + this.state.left.bbf.height,
								height: this.state.left.other.height,
								length: this.state.left.flow.length,
								description: `Flow of money into total budgetary resources from other \
budgetary resources`,
								style: { fill: "#bfcfd4" }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$49.jsx)(SankeyFlow, {
								startY: this.state.left.appropriations.y,
								endY: this.state.center.y + this.state.center.height - this.state.left.appropriations.height,
								height: this.state.left.appropriations.height,
								length: this.state.left.flow.length,
								description: `Flow of money into total budgetary resources from new \
appropriations`,
								style: { fill: "#bfcfd4" }
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$49.jsxs)("g", {
						className: "left-col",
						transform: "translate(0,40)",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$49.jsx)(ItemLabel, {
								y: -25,
								title: "Balance Brought Forward",
								value: this.state.left.bbf.label,
								hide: this.state.left.bbf.height <= 0
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$49.jsx)(SankeyBar, {
								color: "#597785",
								x: 0,
								y: 0,
								width: this.state.left.width,
								height: this.state.left.bbf.height,
								description: this.state.left.bbf.description
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$49.jsx)(ItemLabel, {
								y: this.state.left.other.y - 25,
								title: "Other Budgetary Resources",
								value: this.state.left.other.label,
								hide: this.state.left.other.height <= 0
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$49.jsx)(SankeyBar, {
								color: "#597785",
								x: 0,
								y: this.state.left.other.y,
								width: this.state.left.width,
								height: this.state.left.other.height,
								description: this.state.left.other.description
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$49.jsx)(ItemLabel, {
								y: this.state.left.appropriations.y - 25,
								title: "New Appropriations",
								value: this.state.left.appropriations.label,
								hide: this.state.left.appropriations.height <= 0
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$49.jsx)(SankeyBar, {
								color: "#597785",
								x: 0,
								y: this.state.left.appropriations.y,
								width: this.state.left.width,
								height: this.state.left.appropriations.height,
								description: this.state.left.appropriations.description
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$49.jsxs)("g", {
						className: "right-flows",
						transform: `translate(${this.state.right.flow.x}, 40)`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime$49.jsx)(SankeyFlow, {
							startY: this.state.center.y,
							endY: 0,
							height: this.state.right.obligated.height,
							length: this.state.right.flow.length,
							description: `Flow of money out of total budgetary resources to \
obligations incurred`,
							style: { fill: "#bfcfd4" }
						}), /* @__PURE__ */ (0, import_jsx_runtime$49.jsx)(SankeyFlow, {
							startY: this.state.center.y + this.state.right.obligated.height,
							endY: this.state.right.unobligated.y,
							height: this.state.right.unobligated.height,
							length: this.state.right.flow.length,
							description: `Flow of money out of total budgetary resources to \
unobligated balance`,
							style: {
								fill: "#E1E7E9",
								stroke: "#597785",
								strokeWidth: "1",
								strokeDasharray: "5"
							}
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$49.jsx)(DirectionLabel, {
						x: this.state.labels.inX,
						y: 16,
						paddingX: 85,
						title: "Money In",
						children: /* @__PURE__ */ (0, import_jsx_runtime$49.jsx)("path", { d: "M143.5 434.8L304 257 143.8 77.3 143.4 6l225.2 250.5L144 506" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$49.jsxs)("g", {
						className: "center-col",
						transform: `translate(${this.state.center.x}, 40)`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime$49.jsx)(ItemLabel, {
							y: this.state.center.y - 25,
							title: "Total Budgetary Resources",
							value: `\
${formatMoney(this.props.amounts.budgetAuthority)} (100%)`
						}), /* @__PURE__ */ (0, import_jsx_runtime$49.jsx)(SankeyBar, {
							color: "#597785",
							x: 0,
							y: this.state.center.y,
							width: this.state.center.width,
							height: this.state.center.height,
							description: this.state.center.description
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$49.jsx)(DirectionLabel, {
						x: this.state.labels.outX,
						y: 16,
						paddingX: 100,
						title: "Money Out",
						children: /* @__PURE__ */ (0, import_jsx_runtime$49.jsx)("path", { d: "M143.5 434.8L304 257 143.8 77.3 143.4 6l225.2 250.5L144 506" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$49.jsxs)("g", {
						className: "right-col",
						transform: `translate(${this.state.right.x}, 40)`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$49.jsx)(ItemLabel, {
								y: -25,
								title: "Obligations Incurred",
								value: this.state.right.obligated.label,
								hide: this.state.right.obligated.height <= 0
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$49.jsx)(SankeyBar, {
								color: "#083546",
								x: 0,
								y: 0,
								width: this.state.right.width,
								height: this.state.right.obligated.height,
								description: this.state.right.obligated.description
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$49.jsx)(ItemLabel, {
								y: this.state.right.unobligated.y - 25,
								title: "Unobligated Balance",
								value: this.state.right.unobligated.label,
								hide: this.state.right.unobligated.height <= 0
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$49.jsx)(SankeyBar, {
								color: "#083546",
								x: 0,
								y: this.state.right.unobligated.y,
								width: this.state.right.width,
								height: this.state.right.unobligated.height,
								description: this.state.right.unobligated.description
							})
						]
					})
				]
			}), disclosures] });
		}
	};
	SankeyVisualizationHorizontal.propTypes = propTypes$46;
}));
//#endregion
//#region src/js/components/account/visualizations/sankey/components/SankeyFlowVertical.jsx
/**
* SankeyFlowVertical.jsx
* Created by Kevin Li 3/27/17
*/
var import_jsx_runtime$48, propTypes$45, SankeyFlowVertical;
var init_SankeyFlowVertical = __esmMin((() => {
	init_src();
	import_jsx_runtime$48 = require_jsx_runtime();
	propTypes$45 = {
		startX: PropTypes.number,
		endX: PropTypes.number,
		width: PropTypes.number,
		length: PropTypes.number,
		description: PropTypes.string,
		style: PropTypes.object
	};
	SankeyFlowVertical = ({ startX, endX, width, length, description = "", style }) => {
		const [path, setPath] = useState("");
		const calculatePath = () => {
			let pathLocal = "";
			pathLocal += `M${startX},-2L${startX},0`;
			const curve = number_default(2, length);
			pathLocal += `C${startX},${curve(.5)}`;
			pathLocal += ` ${endX},${curve(.5)}`;
			pathLocal += ` ${endX},${length}L${endX},${length + 2}`;
			pathLocal += ` L${endX + width},${length + 2}`;
			pathLocal += `L${endX + width},${length}`;
			pathLocal += `C${endX + width},${curve(.5)}`;
			pathLocal += ` ${startX + width},${curve(.5)}`;
			pathLocal += ` ${startX + width},0`;
			pathLocal += `L${startX + width},-2`;
			pathLocal += "Z";
			setPath(pathLocal);
		};
		useEffect(() => {
			calculatePath();
		}, [width]);
		if (width <= 0) return null;
		return /* @__PURE__ */ (0, import_jsx_runtime$48.jsxs)("g", {
			transform: "translate(0,0)",
			"aria-label": description,
			children: [/* @__PURE__ */ (0, import_jsx_runtime$48.jsx)("desc", { children: description }), /* @__PURE__ */ (0, import_jsx_runtime$48.jsx)("path", {
				className: "flow-path",
				d: path,
				style
			})]
		});
	};
	SankeyFlowVertical.propTypes = propTypes$45;
}));
//#endregion
//#region src/js/components/account/visualizations/sankey/components/ItemLegend.jsx
var import_jsx_runtime$47, propTypes$44, ItemLegend;
var init_ItemLegend = __esmMin((() => {
	import_jsx_runtime$47 = require_jsx_runtime();
	propTypes$44 = {
		color: PropTypes.string,
		x: PropTypes.number,
		y: PropTypes.number,
		hide: PropTypes.bool,
		title: PropTypes.string,
		value: PropTypes.string
	};
	ItemLegend = ({ color = "#000000", x = 0, y = 0, hide = false, title, value }) => {
		if (hide) return null;
		return /* @__PURE__ */ (0, import_jsx_runtime$47.jsxs)("g", {
			className: "item-label",
			transform: `translate(${x},${y})`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$47.jsx)("circle", {
					r: "5",
					fill: color
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$47.jsx)("text", {
					className: "title",
					x: 20,
					y: 0,
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$47.jsx)("text", {
					className: "value",
					x: 20,
					y: 16,
					children: value
				})
			]
		});
	};
	ItemLegend.propTypes = propTypes$44;
}));
//#endregion
//#region src/js/components/account/visualizations/sankey/SankeyVisualizationVertical.jsx
/**
* SankeyVisualizationHorizontal.jsx
* Created by Kevin li 3/27/17
*/
var import_jsx_runtime$46, propTypes$43, SankeyVisualizationVertical;
var init_SankeyVisualizationVertical = __esmMin((() => {
	init_moneyFormatter();
	init_SankeyBar();
	init_SankeyFlowVertical();
	init_ItemLegend();
	init_DirectionLabel();
	init_SankeyDisclosures();
	import_jsx_runtime$46 = require_jsx_runtime();
	propTypes$43 = {
		width: PropTypes.number,
		amounts: PropTypes.object
	};
	SankeyVisualizationVertical = class extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				graphHeight: 0,
				graphWidth: 0,
				graphTop: 0,
				graphBottom: 0,
				center: {
					width: 0,
					height: 0,
					x: 0,
					y: 0,
					description: ""
				},
				bottom: {
					height: 0,
					x: 0,
					y: 0,
					obligated: {
						x: 0,
						width: 0,
						description: "",
						label: ""
					},
					unobligated: {
						x: 0,
						width: 0,
						description: "",
						label: ""
					},
					flow: {
						length: 0,
						x: 0,
						y: 0
					}
				},
				top: {
					height: 0,
					x: 0,
					y: 0,
					bbf: {
						x: 0,
						width: 0,
						description: "",
						label: ""
					},
					other: {
						width: 0,
						x: 0,
						description: "",
						label: ""
					},
					appropriations: {
						width: 0,
						x: 0,
						description: "",
						label: ""
					},
					flow: {
						length: 0,
						x: 0,
						y: 0
					}
				},
				hidden: [],
				labelHeight: 0,
				legend: {
					x: 0,
					y: 0,
					appropriations: {
						x: 0,
						y: 0
					},
					other: {
						x: 0,
						y: 0
					},
					bbf: {
						x: 0,
						y: 0
					},
					budgetAuthority: {
						x: 0,
						y: 0
					},
					obligated: {
						x: 0,
						y: 0
					},
					unobligated: {
						x: 0,
						y: 0
					}
				}
			};
		}
		componentDidMount() {
			this.generateChart(this.props);
		}
		componentDidUpdate(prevProps) {
			if (prevProps.width !== this.props.width || !isEqual(prevProps.amounts, this.props.amounts)) this.generateChart(this.props);
		}
		generateLabel(amount, total) {
			return `${formatMoney(amount)} (${Math.round(amount / total * 1e3) / 10}%)`;
		}
		generateChart(props) {
			const hidden = [];
			let labelCount = 1;
			if (props.amounts.in.bbf >= 0) labelCount += 1;
			if (props.amounts.in.appropriations >= 0) labelCount += 1;
			if (props.amounts.in.other >= 0) labelCount += 1;
			if (props.amounts.out.obligated >= 0) labelCount += 1;
			if (props.amounts.out.unobligated >= 0) labelCount += 1;
			const barHeight = 35;
			const labelHeight = 40;
			const flowHeight = barHeight * 3;
			const leftMargin = 0;
			const graphTop = 0;
			const graphBottom = (labelCount + .5) * labelHeight;
			const graphHeight = 315 + graphBottom;
			const graphWidth = this.props.width - 80;
			const budgetAuthority = props.amounts.budgetAuthority;
			const centerWidth = graphWidth * (2 / 3);
			const center = {
				x: graphWidth / 6 + leftMargin,
				y: 140,
				width: centerWidth,
				height: barHeight,
				description: `Total Budgetary Resources: \
${formatMoney(props.amounts.budgetAuthority)}`
			};
			const appropriations = props.amounts.in.appropriations;
			const appropWidth = appropriations / budgetAuthority * centerWidth;
			const appropString = formatMoney(appropriations);
			const appropLabel = this.generateLabel(appropriations, budgetAuthority);
			const bbf = props.amounts.in.bbf;
			const bbfWidth = bbf / budgetAuthority * centerWidth;
			const bbfX = graphWidth - bbfWidth;
			const bbfString = formatMoney(bbf);
			const bbfLabel = this.generateLabel(bbf, budgetAuthority);
			const other = props.amounts.in.other;
			const otherWidth = other / budgetAuthority * centerWidth;
			let otherX = bbfX - (bbfX - appropWidth) / 2 - otherWidth / 2;
			const otherString = formatMoney(other);
			const otherLabel = this.generateLabel(other, budgetAuthority);
			if (bbfWidth <= 0) otherX = graphWidth - otherWidth;
			else if (appropWidth <= 0) otherX = 0;
			if (props.amounts.in.bbf < 0) hidden.push({
				value: formatMoney(props.amounts.in.bbf),
				label: "Balance Brought Forward"
			});
			if (props.amounts.in.other < 0) hidden.push({
				value: formatMoney(props.amounts.in.other),
				label: "Other Budgetary Resources"
			});
			if (props.amounts.in.appropriations < 0) hidden.push({
				value: formatMoney(props.amounts.in.appropriations),
				label: "New Appropriations"
			});
			const top = {
				height: barHeight,
				x: leftMargin,
				y: graphTop,
				appropriations: {
					x: 0,
					width: appropWidth,
					description: `New Appropriations: ${appropString}`,
					label: appropLabel
				},
				other: {
					x: otherX,
					width: otherWidth,
					description: `Other Budgetary Resources: ${otherString}`,
					label: otherLabel
				},
				bbf: {
					x: bbfX,
					width: bbfWidth,
					description: `Balance Brought Forward: ${bbfString}`,
					label: bbfLabel
				},
				flow: {
					x: leftMargin,
					y: 35,
					length: flowHeight
				}
			};
			const obligated = props.amounts.out.obligated;
			const obligatedWidth = obligated / budgetAuthority * centerWidth;
			const obligatedString = formatMoney(obligated);
			const obligatedLabel = this.generateLabel(obligated, budgetAuthority);
			const unobligated = props.amounts.out.unobligated;
			const unobligatedWidth = unobligated / budgetAuthority * centerWidth;
			const unobligatedX = graphWidth - unobligatedWidth;
			const unobligatedString = formatMoney(unobligated);
			const unobligatedLabel = this.generateLabel(unobligated, budgetAuthority);
			if (props.amounts.out.obligated < 0) hidden.push({
				value: formatMoney(props.amounts.out.obligated),
				label: "Obligations Incurred"
			});
			if (props.amounts.out.unobligated < 0) hidden.push({
				value: formatMoney(props.amounts.out.unobligated),
				label: "Unobligated Balance"
			});
			const bottom = {
				height: barHeight,
				y: center.y + barHeight + flowHeight,
				x: leftMargin,
				obligated: {
					x: 0,
					width: obligatedWidth,
					description: `Obligations Incurred: ${obligatedString}`,
					label: obligatedLabel
				},
				unobligated: {
					x: unobligatedX,
					width: unobligatedWidth,
					description: `Unobligated Balance: ${unobligatedString}`,
					label: unobligatedLabel
				},
				flow: {
					x: leftMargin,
					y: center.y + barHeight,
					length: flowHeight
				}
			};
			let validLabels = 1;
			const appropriationsLabelY = labelHeight / 2;
			if (props.amounts.in.appropriations >= 0) validLabels += 1;
			const otherLabelY = (validLabels - 1 + .5) * labelHeight;
			if (props.amounts.in.other >= 0) validLabels += 1;
			const bbfLabelY = (validLabels - 1 + .5) * labelHeight;
			if (props.amounts.in.bbf >= 0) validLabels += 1;
			const baLabelY = (validLabels - 1 + .5) * labelHeight;
			validLabels += 1;
			const obligatedLabelY = (validLabels - 1 + .5) * labelHeight;
			if (props.amounts.out.obligated >= 0) validLabels += 1;
			const unobligatedLabelY = (validLabels - 1 + .5) * labelHeight;
			const legend = {
				x: leftMargin,
				y: graphHeight - graphBottom,
				appropriations: {
					x: 10,
					y: appropriationsLabelY
				},
				other: {
					x: 10,
					y: otherLabelY
				},
				bbf: {
					x: 10,
					y: bbfLabelY
				},
				budgetAuthority: {
					x: 10,
					y: baLabelY
				},
				obligated: {
					x: 10,
					y: obligatedLabelY
				},
				unobligated: {
					x: 10,
					y: unobligatedLabelY
				}
			};
			this.setState({
				top,
				center,
				bottom,
				hidden,
				graphHeight,
				graphWidth,
				graphTop,
				graphBottom,
				legend,
				labelHeight: labelHeight / 2
			});
		}
		render() {
			let disclosures = null;
			if (this.state.hidden.length > 0) disclosures = /* @__PURE__ */ (0, import_jsx_runtime$46.jsx)(SankeyDisclosures, { items: this.state.hidden });
			return /* @__PURE__ */ (0, import_jsx_runtime$46.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime$46.jsxs)("svg", {
				className: "sankey",
				width: this.props.width,
				height: this.state.graphHeight,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$46.jsxs)("g", {
						className: "top-flows",
						transform: `translate(0,${this.state.top.flow.y})`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$46.jsx)(SankeyFlowVertical, {
								startX: this.state.top.appropriations.x + this.state.top.flow.x,
								endX: this.state.center.x,
								width: this.state.top.appropriations.width,
								length: this.state.top.flow.length,
								description: `Flow of money into total budgetary resources from new \
appropriations`,
								style: { fill: "#bfcfd4" }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$46.jsx)(SankeyFlowVertical, {
								startX: this.state.top.other.x + this.state.top.flow.x,
								endX: this.state.center.x + this.state.top.appropriations.width,
								width: this.state.top.other.width,
								length: this.state.top.flow.length,
								description: `Flow of money into total budgetary resources from other \
budgetary resouces`,
								style: { fill: "#bfcfd4" }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$46.jsx)(SankeyFlowVertical, {
								startX: this.state.top.bbf.x + this.state.top.flow.x,
								endX: this.state.center.x + this.state.center.width - this.state.top.bbf.width,
								width: this.state.top.bbf.width,
								length: this.state.top.flow.length,
								description: `Flow of money into total budgetary resources from balance \
brought forward`,
								style: { fill: "#bfcfd4" }
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$46.jsxs)("g", {
						className: "bottom-flow",
						transform: `translate(0,\
${this.state.center.y + this.state.center.height})`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime$46.jsx)(SankeyFlowVertical, {
							startX: this.state.center.x,
							endX: this.state.bottom.obligated.x + this.state.bottom.flow.x,
							width: this.state.bottom.obligated.width,
							length: this.state.bottom.flow.length,
							description: `Flow of money out of total budgetary resources to \
obligations incurred`,
							style: { fill: "#bfcfd4" }
						}), /* @__PURE__ */ (0, import_jsx_runtime$46.jsx)(SankeyFlowVertical, {
							startX: this.state.center.x + this.state.bottom.obligated.width,
							endX: this.state.bottom.unobligated.x + this.state.bottom.flow.x,
							width: this.state.bottom.unobligated.width,
							length: this.state.bottom.flow.length,
							description: `Flow of money out of total budgetary resources to \
unobligated balance`,
							style: {
								fill: "#E1E7E9",
								stroke: "#597785",
								strokeWidth: "1",
								strokeDasharray: "5"
							}
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$46.jsxs)("g", {
						className: "legend",
						transform: `translate(${this.state.legend.x},${this.state.legend.y})`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$46.jsx)("g", {
								transform: `translate(${this.state.legend.appropriations.x},\
${this.state.legend.appropriations.y})`,
								children: /* @__PURE__ */ (0, import_jsx_runtime$46.jsx)(ItemLegend, {
									color: "#135259",
									y: this.state.labelHeight,
									title: "New Appropriations",
									value: this.state.top.appropriations.label,
									hide: this.props.amounts.in.appropriations < 0
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$46.jsx)("g", {
								transform: `translate(${this.state.legend.other.x},\
${this.state.legend.other.y})`,
								children: /* @__PURE__ */ (0, import_jsx_runtime$46.jsx)(ItemLegend, {
									color: "#136f69",
									y: this.state.labelHeight,
									title: "Other Budgetary Resources",
									value: this.state.top.other.label,
									hide: this.props.amounts.in.other < 0
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$46.jsx)("g", {
								transform: `translate(${this.state.legend.bbf.x},\
${this.state.legend.bbf.y})`,
								children: /* @__PURE__ */ (0, import_jsx_runtime$46.jsx)(ItemLegend, {
									color: "#218e74",
									y: this.state.labelHeight,
									title: "Balance Brought Forward",
									value: this.state.top.bbf.label,
									hide: this.props.amounts.in.bbf < 0
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$46.jsx)("g", {
								transform: `translate(${this.state.legend.budgetAuthority.x},\
${this.state.legend.budgetAuthority.y})`,
								children: /* @__PURE__ */ (0, import_jsx_runtime$46.jsx)(ItemLegend, {
									color: "#3d9851",
									y: this.state.labelHeight,
									title: "Total Budgetary Resources",
									value: `\
${formatMoney(this.props.amounts.budgetAuthority)} (100%)`
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$46.jsx)("g", {
								transform: `translate(${this.state.legend.obligated.x},\
${this.state.legend.obligated.y})`,
								children: /* @__PURE__ */ (0, import_jsx_runtime$46.jsx)(ItemLegend, {
									color: "#6d8996",
									y: this.state.labelHeight,
									title: "Obligations Incurred",
									value: this.state.bottom.obligated.label,
									hide: this.props.amounts.out.obligated < 0
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$46.jsx)("g", {
								transform: `translate(${this.state.legend.unobligated.x},\
${this.state.legend.unobligated.y})`,
								children: /* @__PURE__ */ (0, import_jsx_runtime$46.jsx)(ItemLegend, {
									color: "#97b5be",
									y: this.state.labelHeight,
									title: "Unobligated Balance",
									value: this.state.bottom.unobligated.label,
									hide: this.props.amounts.out.unobligated < 0
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$46.jsxs)("g", {
						className: "top-row",
						transform: `translate(${this.state.top.x},${this.state.top.y})`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$46.jsx)(SankeyBar, {
								color: "#135259",
								x: this.state.top.appropriations.x,
								y: 0,
								width: this.state.top.appropriations.width,
								height: this.state.top.height,
								description: this.state.top.appropriations.description
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$46.jsx)(SankeyBar, {
								color: "#136f69",
								x: this.state.top.other.x,
								y: 0,
								width: this.state.top.other.width,
								height: this.state.top.height,
								description: this.state.top.other.description
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$46.jsx)(SankeyBar, {
								color: "#218e74",
								x: this.state.top.bbf.x,
								y: 0,
								width: this.state.top.bbf.width,
								height: this.state.top.height,
								description: this.state.top.bbf.description
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$46.jsx)("g", {
						className: "middle-row",
						transform: `translate(${this.state.center.x},${this.state.center.y})`,
						children: /* @__PURE__ */ (0, import_jsx_runtime$46.jsx)(SankeyBar, {
							color: "#3d9851",
							x: 0,
							y: 0,
							width: this.state.center.width,
							height: this.state.center.height,
							description: this.state.center.description
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$46.jsx)("g", {
						transform: `translate(${this.props.width - 75},\
${this.state.top.height + this.state.top.flow.length / 2}) scale(0.7,0.7)`,
						children: /* @__PURE__ */ (0, import_jsx_runtime$46.jsx)(DirectionLabel, {
							x: 0,
							y: 0,
							paddingX: 85,
							title: "Money In",
							children: /* @__PURE__ */ (0, import_jsx_runtime$46.jsx)("path", { d: `M77.2 143L255 303.7l179.7-160.2 71.3-.4-250.5 \
225.4L6 143.7` })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$46.jsx)("g", {
						transform: `translate(${this.props.width - 75},\
${this.state.center.y + this.state.center.height + this.state.bottom.flow.length / 2}) \
scale(0.7,0.7)`,
						children: /* @__PURE__ */ (0, import_jsx_runtime$46.jsx)(DirectionLabel, {
							x: 0,
							y: 0,
							paddingX: 100,
							title: "Money Out",
							children: /* @__PURE__ */ (0, import_jsx_runtime$46.jsx)("path", { d: `M77.2 143L255 303.7l179.7-160.2 71.3-.4-250.5 225.4L6 \
143.7` })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$46.jsxs)("g", {
						className: "bottom-row",
						transform: `translate(${this.state.bottom.x},${this.state.bottom.y})`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime$46.jsx)(SankeyBar, {
							color: "#6d8996",
							x: this.state.bottom.obligated.x,
							y: 0,
							width: this.state.bottom.obligated.width,
							height: this.state.bottom.height,
							description: this.state.bottom.obligated.description
						}), /* @__PURE__ */ (0, import_jsx_runtime$46.jsx)(SankeyBar, {
							color: "#97b5be",
							x: this.state.bottom.unobligated.x,
							y: 0,
							width: this.state.bottom.unobligated.width,
							height: this.state.bottom.height,
							description: this.state.bottom.unobligated.description
						})]
					})
				]
			}), disclosures] });
		}
	};
	SankeyVisualizationVertical.propTypes = propTypes$43;
}));
//#endregion
//#region src/js/components/account/visualizations/sankey/SankeyVisualization.jsx
/**
* SankeyVisualization.jsx
* Created by Kevin Li 4/18/17
*/
var import_jsx_runtime$45, propTypes$42, SankeyVisualization;
var init_SankeyVisualization = __esmMin((() => {
	init_SankeyMessage();
	init_SankeyVisualizationHorizontal();
	init_SankeyVisualizationVertical();
	import_jsx_runtime$45 = require_jsx_runtime();
	propTypes$42 = {
		width: PropTypes.number,
		fyAvailable: PropTypes.bool
	};
	SankeyVisualization = class extends React.Component {
		determineOutput() {
			if (!this.props.fyAvailable) return /* @__PURE__ */ (0, import_jsx_runtime$45.jsx)(SankeyMessage, { message: "No data available for the current fiscal year." });
			if (this.props.width < 720) return /* @__PURE__ */ (0, import_jsx_runtime$45.jsx)(SankeyVisualizationVertical, { ...this.props });
			return /* @__PURE__ */ (0, import_jsx_runtime$45.jsx)(SankeyVisualizationHorizontal, { ...this.props });
		}
		render() {
			return this.determineOutput();
		}
	};
	SankeyVisualization.propTypes = propTypes$42;
}));
//#endregion
//#region src/js/components/account/AccountOverview.jsx
/**
* AccountOverview.jsx
* Created by 3/20/17
*/
var import_jsx_runtime$44, propTypes$41, AccountOverview;
var init_AccountOverview = __esmMin((() => {
	init_index_es();
	init_moneyFormatter();
	init_SankeyVisualization();
	import_jsx_runtime$44 = require_jsx_runtime();
	propTypes$41 = {
		account: PropTypes.object,
		currentFiscalYear: PropTypes.string
	};
	AccountOverview = ({ account, currentFiscalYear }) => {
		const [windowWidth, setWindowWidth] = useState(0);
		const [visualizationWidth, setVisualizationWidth] = useState(0);
		const [fyAvailable, setFyAvailable] = useState(false);
		const [amounts, setAmounts] = useState({
			budgetAuthority: 0,
			out: {
				obligated: 0,
				unobligated: 0
			},
			in: {
				bbf: 0,
				other: 0,
				appropriations: 0
			}
		});
		const [summary, setSummary] = useState({
			flow: "",
			toDate: ""
		});
		const sankeyHr = useRef();
		const handleWindowResize = () => {
			const currentWindowWidth = window.innerWidth;
			if (windowWidth !== currentWindowWidth) {
				setWindowWidth(currentWindowWidth);
				setVisualizationWidth(Math.min(1200, sankeyHr.current.offsetWidth));
			}
		};
		const generateSummary = (accountData) => {
			const fiscalYearAvailable = accountData.totals.available;
			const newSummary = {
				flow: `No data is available for the current fiscal year (FY ${currentFiscalYear}).`,
				toDate: ""
			};
			let newAmounts = {};
			if (!fiscalYearAvailable) {
				newAmounts = {
					budgetAuthority: 0,
					out: {
						obligated: 0,
						unobligated: 0
					}
				};
				setSummary(newSummary);
				setAmounts(newAmounts);
				setFyAvailable(fiscalYearAvailable);
				return;
			}
			const authorityValue = accountData.totals.budgetAuthority || 0;
			const obligatedValue = accountData.totals.obligated || 0;
			const balanceBroughtForwardValue = accountData.totals.balanceBroughtForward || 0;
			const otherValue = accountData.totals.otherBudgetaryResources || 0;
			const appropriationsValue = accountData.totals.appropriations || 0;
			const authUnits = calculateUnitForSingleValue(authorityValue);
			const authority = `${formatMoney(authorityValue / authUnits.unit)}\
${authUnits.unitLabel}`;
			const obUnits = calculateUnitForSingleValue(obligatedValue);
			let percentObligated = "N/A";
			if (authorityValue !== 0) percentObligated = Math.round(obligatedValue / authorityValue * 1e3) / 10;
			const amountObligated = `${formatMoney(obligatedValue / obUnits.unit)}\
${obUnits.unitLabel}`;
			const bbfUnits = calculateUnitForSingleValue(balanceBroughtForwardValue);
			const bbfString = `${formatMoney(balanceBroughtForwardValue / bbfUnits.unit)}\
${bbfUnits.unitLabel}`;
			const appropUnits = calculateUnitForSingleValue(appropriationsValue);
			const appropString = `${formatMoney(appropriationsValue / appropUnits.unit)}\
${appropUnits.unitLabel}`;
			const otherUnits = calculateUnitForSingleValue(otherValue);
			newSummary.flow = `For this current fiscal year, this agency has been granted authority to spend \
${authority} out of this federal account. They carried over a balance of ${bbfString} from last \
year, were given ${appropString} in new appropriations, and have authority to use ${`${formatMoney(otherValue / otherUnits.unit)}\
${otherUnits.unitLabel}`} \
of other budgetary resources.`;
			newSummary.toDate = `To date, ${percentObligated}% (${amountObligated}) of the total \
${authority} has been obligated.`;
			newAmounts = {
				budgetAuthority: authorityValue,
				out: {
					obligated: obligatedValue,
					unobligated: parseFloat(accountData.totals.unobligated)
				},
				in: {
					bbf: balanceBroughtForwardValue,
					other: otherValue,
					appropriations: appropriationsValue
				}
			};
			setSummary(newSummary);
			setAmounts(newAmounts);
			setFyAvailable(fiscalYearAvailable);
		};
		useEffect(() => {
			generateSummary(account);
			handleWindowResize();
			window.addEventListener("resize", handleWindowResize);
			return () => window.removeEventListener("resize", handleWindowResize);
		}, []);
		useEffect(() => {
			generateSummary(account);
		}, [account]);
		return /* @__PURE__ */ (0, import_jsx_runtime$44.jsxs)("div", {
			className: "account-overview",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$44.jsx)(ws, {
					title: account.title,
					titleTooltip: { component: false },
					descTooltip: { component: false }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$44.jsx)(ws, {
					title: currentFiscalYear ? `FY ${currentFiscalYear} Snapshot` : "FY",
					titleTooltip: { component: false },
					descTooltip: { component: false }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$44.jsx)("hr", {
					className: "results-divider",
					ref: (div) => {
						sankeyHr.current = div;
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$44.jsxs)("div", {
					className: "account-overview__content",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$44.jsx)("p", { children: summary.flow }), /* @__PURE__ */ (0, import_jsx_runtime$44.jsx)("p", { children: summary.toDate })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$44.jsx)("div", {
					className: "sankey-wrapper",
					children: /* @__PURE__ */ (0, import_jsx_runtime$44.jsx)(SankeyVisualization, {
						fyAvailable,
						amounts,
						width: visualizationWidth,
						height: 340
					})
				})
			]
		});
	};
	AccountOverview.propTypes = propTypes$41;
}));
//#endregion
//#region src/js/components/sharedComponents/ComingSoonLabel.jsx
/**
* ComingSoonLabel.jsx
* Created by Marco Mendoza 03/03/2017
**/
var import_jsx_runtime$43, ComingSoonLabel;
var init_ComingSoonLabel = __esmMin((() => {
	init_Icons();
	import_jsx_runtime$43 = require_jsx_runtime();
	ComingSoonLabel = class extends React.Component {
		render() {
			return /* @__PURE__ */ (0, import_jsx_runtime$43.jsxs)("div", {
				className: "coming-soon-container",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$43.jsx)("div", {
					className: "coming-soon-icon",
					children: /* @__PURE__ */ (0, import_jsx_runtime$43.jsx)(ExclamationCircle, {})
				}), /* @__PURE__ */ (0, import_jsx_runtime$43.jsx)("span", {
					className: "coming-soon-label",
					children: "Coming Soon"
				})]
			});
		}
	};
}));
//#endregion
//#region src/js/components/sharedComponents/filterSidebar/FilterExpandButton.jsx
var import_jsx_runtime$42, propTypes$40, ariaDescription, FilterExpandButton;
var init_FilterExpandButton = __esmMin((() => {
	init_dist();
	init_index_es();
	init_GlossaryLink();
	import_jsx_runtime$42 = require_jsx_runtime();
	propTypes$40 = {
		toggleFilter: PropTypes.func,
		arrowState: PropTypes.string,
		name: PropTypes.string,
		tooltip: PropTypes.element,
		disabled: PropTypes.bool,
		accessory: PropTypes.func,
		glossarySlug: PropTypes.string
	};
	ariaDescription = "accessory-view";
	FilterExpandButton = (props) => {
		const icon = props.arrowState === "expanded" ? /* @__PURE__ */ (0, import_jsx_runtime$42.jsx)(FontAwesomeIcon, { icon: "angle-down" }) : /* @__PURE__ */ (0, import_jsx_runtime$42.jsx)(FontAwesomeIcon, { icon: "angle-right" });
		return /* @__PURE__ */ (0, import_jsx_runtime$42.jsxs)("div", {
			className: "filter-toggle",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$42.jsxs)("button", {
					className: "filter-toggle__button",
					onClick: props.toggleFilter,
					disabled: props.disabled,
					title: props.name,
					"aria-label": props.name,
					"aria-expanded": props.arrowState === "expanded",
					"aria-describedby": props.accessory ? ariaDescription : "",
					children: [
						icon,
						props.name,
						props.tooltip && /* @__PURE__ */ (0, import_jsx_runtime$42.jsx)(ds, {
							icon: "info",
							tooltipComponent: props.tooltip
						})
					]
				}),
				props.glossarySlug && /* @__PURE__ */ (0, import_jsx_runtime$42.jsx)("div", {
					className: "filter-toggle__glossary",
					children: /* @__PURE__ */ (0, import_jsx_runtime$42.jsx)(GlossaryLink, { term: props.glossarySlug })
				}),
				props.accessory && /* @__PURE__ */ (0, import_jsx_runtime$42.jsx)("div", {
					className: "filter-toggle__accessory",
					tabIndex: "-1",
					id: "accessory-view",
					children: /* @__PURE__ */ (0, import_jsx_runtime$42.jsx)(props.accessory, {})
				})
			]
		});
	};
	FilterExpandButton.propTypes = propTypes$40;
}));
//#endregion
//#region src/js/components/sharedComponents/filterSidebar/FilterOption.jsx
/**
* FilterOption.jsx
* Created by Kevin Li 3/20/17
*/
var import_jsx_runtime$41, propTypes$39, FilterOption;
var init_FilterOption = __esmMin((() => {
	init_ComingSoonLabel();
	init_FilterExpandButton();
	import_jsx_runtime$41 = require_jsx_runtime();
	propTypes$39 = {
		name: PropTypes.string,
		tooltip: PropTypes.element,
		component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
		disabled: PropTypes.bool,
		defaultExpand: PropTypes.bool,
		accessory: PropTypes.func,
		glossarySlug: PropTypes.string
	};
	FilterOption = ({ name, tooltip, component, disabled, defaultExpand = true, accessory, glossarySlug }) => {
		const [isDirty, setIsDirty] = useState(false);
		const [showFilter, setShowFilter] = useState(false);
		const [arrowState, setArrowState] = useState("collapsed");
		const comingSoonModule = /* @__PURE__ */ (0, import_jsx_runtime$41.jsx)(ComingSoonLabel, {});
		let disabledStatus = false;
		let comingSoon;
		let searchOption;
		let statusClass = "";
		if (disabled) {
			disabledStatus = true;
			comingSoon = comingSoonModule;
			searchOption = null;
			statusClass = " coming-soon";
		} else searchOption = /* @__PURE__ */ (0, import_jsx_runtime$41.jsx)(component, {});
		if (showFilter !== true) searchOption = null;
		const setArrowAndFilterState = () => {
			if (defaultExpand) {
				setArrowState("expanded");
				setShowFilter(true);
			}
		};
		const checkIfAutoExpanded = () => {
			if (defaultExpand) {
				setIsDirty(true);
				setShowFilter(true);
				setArrowState("expanded");
			} else {
				setShowFilter(false);
				setArrowState("collapsed");
			}
		};
		const toggleFilter = (e) => {
			e.preventDefault();
			if (e.target.tagName !== "svg" && e.target.tagName !== "path") {
				const newShowState = !showFilter;
				let newArrowState = "collapsed";
				if (newShowState) newArrowState = "expanded";
				setIsDirty(true);
				setShowFilter(newShowState);
				setArrowState(newArrowState);
			}
		};
		useEffect(() => {
			setArrowAndFilterState();
		}, []);
		useEffect(() => {
			if (!isDirty) checkIfAutoExpanded();
		}, [defaultExpand]);
		return /* @__PURE__ */ (0, import_jsx_runtime$41.jsxs)("div", {
			className: `search-option${statusClass}`,
			role: "group",
			"aria-label": name,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$41.jsx)(FilterExpandButton, {
					accessory,
					hidden: showFilter,
					toggleFilter,
					arrowState,
					name,
					tooltip,
					disabled: disabledStatus,
					glossarySlug
				}),
				searchOption,
				comingSoon
			]
		});
	};
	FilterOption.propTypes = propTypes$39;
}));
//#endregion
//#region src/js/components/sharedComponents/filterSidebar/FilterSidebar.jsx
var import_jsx_runtime$40, propTypes$38, FilterSidebar;
var init_FilterSidebar = __esmMin((() => {
	init_FilterOption();
	import_jsx_runtime$40 = require_jsx_runtime();
	propTypes$38 = {
		options: arrayOf(PropTypes.shape({
			title: PropTypes.string.isRequired,
			tooltip: PropTypes.element
		})),
		components: arrayOf(oneOfType([PropTypes.func, PropTypes.object])),
		expanded: arrayOf(PropTypes.bool),
		accessories: arrayOf(PropTypes.func),
		glossaryEntries: arrayOf(PropTypes.string)
	};
	FilterSidebar = ({ options = [], components = [], expanded = [], accessories = [], glossaryEntries = [] }) => {
		return /* @__PURE__ */ (0, import_jsx_runtime$40.jsx)("div", {
			className: "search-filters-wrapper",
			children: options.map((obj) => ({
				title: obj.title,
				tooltip: obj.tooltip || null
			})).map(({ title, tooltip }, i) => {
				const component = components[i];
				const accessory = accessories[i];
				const glossarySlug = glossaryEntries[i];
				return /* @__PURE__ */ (0, import_jsx_runtime$40.jsx)(FilterOption, {
					name: title,
					tooltip,
					component,
					accessory,
					defaultExpand: expanded[i],
					disabled: component === null,
					glossarySlug
				}, title);
			})
		});
	};
	FilterSidebar.propTypes = propTypes$38;
}));
//#endregion
//#region src/js/containers/account/filters/AccountTimePeriodContainer.jsx
/**
* AccountTimePeriodContainer.jsx
* Created by Kevin Li 11/21/16
**/
var import_immutable$3, import_jsx_runtime$39, startYear, propTypes$37, AccountTimePeriodContainer, AccountTimePeriodContainer_default;
var init_AccountTimePeriodContainer = __esmMin((() => {
	init_fiscalYearHelper();
	init_redux();
	init_es();
	import_immutable$3 = /* @__PURE__ */ __toESM(require_immutable(), 1);
	init_searchFilterActions();
	init_propTypes();
	init_accountFilterActions();
	init_WithLatestFy();
	init_TimePeriod();
	import_jsx_runtime$39 = require_jsx_runtime();
	startYear = earliestFederalAccountYear;
	propTypes$37 = {
		updateLatestFy: PropTypes.func,
		updateTimePeriod: PropTypes.func,
		filterTimePeriodType: PropTypes.string,
		filterTimePeriodFY: PropTypes.instanceOf(import_immutable$3.default.Set),
		filterTimePeriodStart: PropTypes.string,
		filterTimePeriodEnd: PropTypes.string,
		submissionPeriods: SUBMISSION_PERIOD_PROPS,
		latestPeriod: LATEST_PERIOD_PROPS
	};
	AccountTimePeriodContainer = class extends React.Component {
		constructor(props) {
			super(props);
			this.state = { timePeriods: [] };
			this.updateFilter = this.updateFilter.bind(this);
			this.changeTab = this.changeTab.bind(this);
		}
		componentDidMount() {
			if (this.props.latestPeriod.year) this.generateTimePeriods();
			this.updateFilter({ fy: /* @__PURE__ */ new Set([currentFiscalYear().toString()]) });
		}
		componentDidUpdate(prevProps) {
			if (!prevProps.latestPeriod.year && this.props.latestPeriod.year) this.generateTimePeriods();
		}
		generateTimePeriods() {
			this.setState({ timePeriods: allFiscalYears(startYear, this.props.latestPeriod.year).map((int) => String(int)) });
		}
		changeTab(tab) {
			this.updateFilter({ dateType: tab });
		}
		updateFilter(params) {
			const currentFilters = {
				dateType: this.props.filterTimePeriodType,
				fy: this.props.filterTimePeriodFY,
				startDate: this.props.filterTimePeriodStart,
				endDate: this.props.filterTimePeriodEnd
			};
			const newFilters = Object.assign({}, currentFilters, params);
			this.props.updateTimePeriod(newFilters);
		}
		render() {
			return /* @__PURE__ */ (0, import_jsx_runtime$39.jsx)(TimePeriod, {
				...this.props,
				...searchFilterActions_exports,
				latestFy: this.props.latestPeriod.year,
				activeTab: this.props.filterTimePeriodType,
				timePeriods: this.state.timePeriods,
				updateFilter: this.updateFilter,
				changeTab: this.changeTab,
				federalAccountPage: true,
				disableDateRange: true
			});
		}
	};
	AccountTimePeriodContainer.propTypes = propTypes$37;
	AccountTimePeriodContainer_default = flowRight(withLatestFy, connect_default((state) => ({
		filterTimePeriodType: state.account.filters.dateType,
		filterTimePeriodFY: state.account.filters.fy,
		filterTimePeriodStart: state.account.filters.startDate,
		filterTimePeriodEnd: state.account.filters.endDate
	}), (dispatch) => ({ ...bindActionCreators(accountFilterActions_exports, dispatch) })))(AccountTimePeriodContainer);
}));
//#endregion
//#region src/js/components/account/filters/objectClass/ObjectClassFilter.jsx
/**
* ObjectClassFilter.jsx
* Created by Kevin Li 3/30/17
*/
var import_immutable$2, import_jsx_runtime$38, propTypes$36, ObjectClassFilter;
var init_ObjectClassFilter = __esmMin((() => {
	import_immutable$2 = /* @__PURE__ */ __toESM(require_immutable(), 1);
	init_PrimaryCheckboxType();
	import_jsx_runtime$38 = require_jsx_runtime();
	propTypes$36 = {
		availableObjectClasses: PropTypes.array,
		selectedCodes: PropTypes.instanceOf(import_immutable$2.OrderedSet),
		updateFilter: PropTypes.func,
		updateMajorFilter: PropTypes.func
	};
	ObjectClassFilter = class extends React.Component {
		constructor(props) {
			super(props);
			this.toggleValue = this.toggleValue.bind(this);
		}
		toggleValue(code) {
			this.props.updateFilter(code);
		}
		render() {
			return /* @__PURE__ */ (0, import_jsx_runtime$38.jsx)("div", {
				className: "account-object-class-filter search-filter",
				children: /* @__PURE__ */ (0, import_jsx_runtime$38.jsx)("div", {
					className: "checkbox-type-filter search-filter",
					children: /* @__PURE__ */ (0, import_jsx_runtime$38.jsx)("ul", {
						className: "object-classes checkbox-types",
						children: this.props.availableObjectClasses.map((major) => {
							const label = major.name;
							const id = `${major.id}`;
							const childFilters = [];
							const childValues = {};
							major.minor_object_class.forEach((minor) => {
								childFilters.push(`${minor.id}`);
								childValues[minor.id] = minor.name;
							});
							return /* @__PURE__ */ (0, import_jsx_runtime$38.jsx)(PrimaryCheckboxType, {
								name: label,
								value: id,
								types: childValues,
								filters: childFilters,
								filterType: "Major Object Class",
								selectedCheckboxes: this.props.selectedCodes,
								toggleCheckboxType: this.toggleValue,
								bulkTypeChange: this.props.updateMajorFilter
							}, id);
						})
					})
				})
			});
		}
	};
	ObjectClassFilter.propTypes = propTypes$36;
}));
//#endregion
//#region src/js/containers/account/filters/AccountObjectClassContainer.jsx
/**
* AccountObjectClassContainer.jsx
* Created by Kevin Li 3/30/17
*/
var import_jsx_runtime$37, propTypes$35, AccountObjectClassContainer, AccountObjectClassContainer_default;
var init_AccountObjectClassContainer = __esmMin((() => {
	init_redux();
	init_es();
	init_axios();
	init_accountFilterActions();
	init_account();
	init_ObjectClassFilter();
	import_jsx_runtime$37 = require_jsx_runtime();
	propTypes$35 = {
		accountId: PropTypes.number,
		toggleObjectClass: PropTypes.func,
		setAvailableObjectClasses: PropTypes.func,
		bulkObjectClassesChange: PropTypes.func
	};
	AccountObjectClassContainer = class extends React.Component {
		constructor(props) {
			super(props);
			this.state = { available: [] };
			this.availableRequest = null;
			this.updateFilter = this.updateFilter.bind(this);
			this.updateMajorFilter = this.updateMajorFilter.bind(this);
		}
		componentDidMount() {
			this.loadAvailableOCs(this.props.accountId);
		}
		componentDidUpdate(prevProps) {
			if (prevProps.accountId !== this.props.accountId) this.loadAvailableOCs(this.props.accountId);
		}
		loadAvailableOCs(id) {
			if (this.availableRequest) this.availableRequest.cancel();
			this.setState({
				loading: true,
				error: false
			});
			this.availableRequest = fetchAvailableObjectClasses(id);
			this.availableRequest.promise.then((res) => {
				this.parseAvailableOCs(res.data.results);
				this.setState({
					loading: false,
					error: false
				});
			}).catch((err) => {
				if (!isCancel(err)) {
					this.availableRequest = null;
					console.log(err);
					this.setState({
						loading: false,
						error: true
					});
				}
			});
		}
		parseAvailableOCs(data) {
			const definitions = {};
			const children = {};
			data.forEach((major) => {
				definitions[`${major.id}`] = major.name;
				const childIds = [];
				major.minor_object_class.forEach((minor) => {
					definitions[`${minor.id}`] = minor.name;
					childIds.push(`${minor.id}`);
				});
				children[`${major.id}`] = childIds;
			});
			this.props.setAvailableObjectClasses({
				definitions,
				children,
				values: data
			});
		}
		updateFilter(code) {
			this.props.toggleObjectClass(code.value);
		}
		updateMajorFilter(action) {
			this.props.bulkObjectClassesChange(action);
		}
		render() {
			return /* @__PURE__ */ (0, import_jsx_runtime$37.jsx)(ObjectClassFilter, {
				...this.props,
				updateMajorFilter: this.updateMajorFilter,
				updateFilter: this.updateFilter
			});
		}
	};
	AccountObjectClassContainer.propTypes = propTypes$35;
	AccountObjectClassContainer_default = connect_default((state) => ({
		accountId: state.account.account.id,
		selectedCodes: state.account.filters.objectClass,
		availableObjectClasses: state.account.filterOptions.objectClass
	}), (dispatch) => bindActionCreators(accountFilterActions_exports, dispatch))(AccountObjectClassContainer);
}));
//#endregion
//#region src/js/models/v1/account/queries/queryBuilders/_programActivityTranslator.js
/**
* _programActivityTranslator.js
* Created by Kevin Li 2/27/18
* This is EXTREMELY TEMPORARY - DO NOT DEPEND ON THIS
*/
var exchangeTemplate, _frontendAPIExchange, _resetExchange, _exchangeForAPIValue, _convertToFrontendFilter, _translateFrontendIDToPrimaryKeys;
var init__programActivityTranslator = __esmMin((() => {
	exchangeTemplate = {
		labelsToFrontend: {},
		frontendToAPI: {}
	};
	_frontendAPIExchange = JSON.parse(JSON.stringify(exchangeTemplate));
	_resetExchange = () => {
		_frontendAPIExchange = JSON.parse(JSON.stringify(exchangeTemplate));
	};
	_exchangeForAPIValue = (frontendId) => _frontendAPIExchange.frontendToAPI[frontendId] || [];
	_convertToFrontendFilter = (filter) => {
		const label = `${filter.code} - ${filter.name}`;
		const frontendId = _frontendAPIExchange.labelsToFrontend[label];
		if (frontendId) {
			_frontendAPIExchange.frontendToAPI[frontendId].push(filter.id);
			return null;
		}
		const generatedId = `pa-${uniqueId()}`;
		_frontendAPIExchange.labelsToFrontend[label] = generatedId;
		_frontendAPIExchange.frontendToAPI[generatedId] = [filter.id];
		return Object.assign({}, filter, { id: generatedId });
	};
	_translateFrontendIDToPrimaryKeys = (frontendIds) => frontendIds.reduce((ids, frontendId) => {
		const apiIDs = _exchangeForAPIValue(frontendId);
		if (apiIDs) return ids.concat(apiIDs);
		return ids;
	}, []);
}));
//#endregion
//#region src/js/components/account/filters/programActivity/ProgramActivityFilter.jsx
/**
* ProgramActivityFilter.jsx
* Created by michaelbray on 4/14/17.
*/
var import_immutable$1, import_jsx_runtime$36, propTypes$34, defaultState, ProgramActivityFilter;
var init_ProgramActivityFilter = __esmMin((() => {
	import_immutable$1 = /* @__PURE__ */ __toESM(require_immutable(), 1);
	init_Icons();
	init_PrimaryCheckboxType();
	import_jsx_runtime$36 = require_jsx_runtime();
	propTypes$34 = {
		selectedProgramActivities: PropTypes.instanceOf(import_immutable$1.OrderedSet),
		availableProgramActivities: PropTypes.array,
		updateFilter: PropTypes.func,
		noResults: PropTypes.bool,
		inFlight: PropTypes.bool
	};
	defaultState = {
		shown: 10,
		shownType: "more"
	};
	ProgramActivityFilter = class extends React.Component {
		constructor(props) {
			super(props);
			this.state = defaultState;
			this.toggleValue = this.toggleValue.bind(this);
			this.toggleShownAmount = this.toggleShownAmount.bind(this);
		}
		toggleShownAmount() {
			const programActivities = this.props.availableProgramActivities;
			let updatedState = defaultState;
			if (this.state.shownType === "more") updatedState = {
				shown: Object.keys(programActivities).length,
				shownType: "fewer"
			};
			this.setState(updatedState);
		}
		toggleValue(value) {
			this.props.updateFilter(value.value);
		}
		generateProgramActivityItems(programActivities) {
			const activities = [];
			sortBy(programActivities, [(pa) => parseInt(pa.code, 10)]).forEach((programActivity) => {
				if (activities.length < this.state.shown) {
					const label = `${programActivity.code} - ${programActivity.name}`;
					if (activities.length <= this.state.shown && programActivity.name !== null && programActivity.name !== "") activities.push(/* @__PURE__ */ createElement(PrimaryCheckboxType, {
						...this.props,
						name: label,
						value: programActivity.id,
						key: programActivity.id,
						types: keyBy(this.props.availableProgramActivities, "id"),
						filterType: "Object Class",
						selectedCheckboxes: this.props.selectedProgramActivities,
						toggleCheckboxType: this.toggleValue
					}));
				}
			});
			if (activities.length === 0 && this.props.noResults) activities.push("There are no Program Activities for this Federal Account.");
			return activities;
		}
		generateToggleButton() {
			const programActivities = this.props.availableProgramActivities;
			let toggleButton = null;
			if (programActivities && Object.keys(programActivities).length > 10) {
				const remaining = Object.keys(programActivities).length - this.state.shown;
				let shownStatement = `${remaining} ${this.state.shownType}`;
				let arrow = /* @__PURE__ */ (0, import_jsx_runtime$36.jsx)(AngleDown, { alt: `See ${shownStatement}` });
				if (remaining === 0) {
					shownStatement = this.state.shownType;
					arrow = /* @__PURE__ */ (0, import_jsx_runtime$36.jsx)(AngleUp, { alt: `See ${shownStatement}` });
				}
				toggleButton = /* @__PURE__ */ (0, import_jsx_runtime$36.jsxs)("button", {
					className: "see-more account-program-activity-toggle-button",
					onClick: this.toggleShownAmount,
					title: `See ${shownStatement}`,
					children: [
						"See ",
						shownStatement,
						"\xA0 ",
						arrow
					]
				});
			}
			return toggleButton;
		}
		render() {
			let items = this.generateProgramActivityItems(this.props.availableProgramActivities);
			const toggleButton = this.generateToggleButton();
			if (this.props.inFlight) items = /* @__PURE__ */ (0, import_jsx_runtime$36.jsx)("div", {
				className: "account-program-activity-loading",
				children: "Loading data..."
			});
			return /* @__PURE__ */ (0, import_jsx_runtime$36.jsx)("div", {
				className: "account-program-activity-filter search-filter",
				children: /* @__PURE__ */ (0, import_jsx_runtime$36.jsxs)("div", {
					className: "checkbox-type-filter search-filter",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$36.jsx)("ul", {
						className: "program-activities checkbox-types",
						children: items
					}), toggleButton]
				})
			});
		}
	};
	ProgramActivityFilter.propTypes = propTypes$34;
}));
//#endregion
//#region src/js/containers/account/filters/AccountProgramActivityContainer.jsx
/**
* AccountProgramActivityContainer.jsx
* Created by michaelbray on 4/14/17.
*/
var import_jsx_runtime$35, propTypes$33, AccountProgramActivityContainer, AccountProgramActivityContainer_default;
var init_AccountProgramActivityContainer = __esmMin((() => {
	init_redux();
	init_es();
	init_axios();
	init_accountFilterActions();
	init_account();
	init__programActivityTranslator();
	init_ProgramActivityFilter();
	import_jsx_runtime$35 = require_jsx_runtime();
	propTypes$33 = {
		setAvailableProgramActivities: PropTypes.func,
		toggleProgramActivity: PropTypes.func,
		resetProgramActivity: PropTypes.func,
		account: PropTypes.object
	};
	AccountProgramActivityContainer = class extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				noResults: false,
				inFlight: false
			};
			this.updateFilter = this.updateFilter.bind(this);
		}
		componentDidMount() {
			this.props.resetProgramActivity();
			this.populateProgramActivities();
		}
		componentDidUpdate(prevProps) {
			if (!isEqual(prevProps.account, this.props.account)) {
				this.props.resetProgramActivity();
				this.populateProgramActivities();
			}
		}
		updateFilter(code) {
			this.props.toggleProgramActivity(code);
		}
		populateProgramActivities() {
			if (this.searchRequest) this.searchRequest.cancel();
			const apiSearchParams = {
				group: [
					"program_activity__program_activity_name",
					"program_activity__program_activity_code",
					"program_activity__id"
				],
				field: "ussgl480100_undelivered_orders_obligations_unpaid_fyb",
				aggregate: "count",
				filters: [{
					field: "treasury_account__federal_account",
					operation: "equals",
					value: this.props.account.id
				}]
			};
			this.searchRequest = fetchTasCategoryTotals$1(apiSearchParams);
			this.setState({ inFlight: true });
			this.searchRequest.promise.then((res) => {
				this.searchRequest = null;
				this.setState({ inFlight: false });
				this.parseResultData(res.data.results);
			}).catch((err) => {
				this.searchRequest = null;
				this.setState({ inFlight: false });
				if (!isCancel(err)) {
					console.log(err);
					this.setState({ noResults: true });
				}
			});
		}
		parseResultData(data) {
			_resetExchange();
			const programActivities = data.reduce((parsed, activity) => {
				const code = activity.program_activity__program_activity_code;
				const name = activity.program_activity__program_activity_name;
				const id = activity.program_activity__id;
				const filter = _convertToFrontendFilter({
					id,
					code,
					name
				});
				if (filter) parsed.push(filter);
				return parsed;
			}, []);
			let noResults = false;
			if (programActivities.length === 0) noResults = true;
			this.setState({ noResults });
			this.props.setAvailableProgramActivities(programActivities);
		}
		render() {
			return /* @__PURE__ */ (0, import_jsx_runtime$35.jsx)(ProgramActivityFilter, {
				...this.props,
				...this.state,
				updateFilter: this.updateFilter
			});
		}
	};
	AccountProgramActivityContainer.propTypes = propTypes$33;
	AccountProgramActivityContainer_default = connect_default((state) => ({
		availableProgramActivities: state.account.filterOptions.programActivity,
		selectedProgramActivities: state.account.filters.programActivity,
		account: state.account.account
	}), (dispatch) => bindActionCreators(accountFilterActions_exports, dispatch))(AccountProgramActivityContainer);
}));
//#endregion
//#region src/js/components/account/SearchSidebar.jsx
/**
* SearchSidebar.jsx
* Created by Kevin Li 3/20/17
*/
var import_jsx_runtime$34, filters, SearchSidebar;
var init_SearchSidebar = __esmMin((() => {
	init_Icons();
	init_FilterSidebar();
	init_AccountTimePeriodContainer();
	init_AccountObjectClassContainer();
	init_AccountProgramActivityContainer();
	import_jsx_runtime$34 = require_jsx_runtime();
	filters = {
		options: [
			{ title: "Time Period" },
			{ title: "Object Class" },
			{ title: "Program Activity" }
		],
		components: [
			AccountTimePeriodContainer_default,
			AccountObjectClassContainer_default,
			AccountProgramActivityContainer_default,
			null
		]
	};
	SearchSidebar = class extends React.Component {
		render() {
			return /* @__PURE__ */ (0, import_jsx_runtime$34.jsxs)("div", {
				className: "search-sidebar",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$34.jsxs)("div", {
					className: "sidebar-header",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$34.jsx)("span", {
						className: "filter-icon",
						children: /* @__PURE__ */ (0, import_jsx_runtime$34.jsx)(Filter, {})
					}), /* @__PURE__ */ (0, import_jsx_runtime$34.jsx)("h6", { children: "Filter by:" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime$34.jsx)(FilterSidebar, { ...filters })]
			});
		}
	};
}));
//#endregion
//#region src/js/components/account/topFilterBar/LegacyTopFilterBar.jsx
/**
* LegacyTopFilterBar.jsx
* Created by Kevin Li 12/13/16
*
* TopFilterBar is a React component that creates the sticky filter bar at the top of the search
* results page. It receives parsed filter groups from its parent Redux container.
*
* @extends React.Component
**/
var import_jsx_runtime$33, propTypes$32, LegacyTopFilterBar;
var init_LegacyTopFilterBar = __esmMin((() => {
	init_Icons();
	import_jsx_runtime$33 = require_jsx_runtime();
	propTypes$32 = {
		filters: PropTypes.array,
		filterCount: PropTypes.number,
		clearAllFilters: PropTypes.func,
		groupGenerator: PropTypes.func,
		compressed: PropTypes.bool
	};
	LegacyTopFilterBar = class extends React.Component {
		constructor(props) {
			super(props);
			this.pressedClearAll = this.pressedClearAll.bind(this);
		}
		pressedClearAll() {
			this.props.clearAllFilters();
		}
		render() {
			const filters = this.props.filters.map((filter) => this.props.groupGenerator({
				filter,
				redux: this.props,
				compressed: this.props.compressed
			}));
			let filterBarHeader = `${this.props.filterCount} Current Filter`;
			if (this.props.filterCount !== 1) filterBarHeader += "s";
			filterBarHeader += ":";
			let hideCompressed = "";
			if (this.props.compressed) hideCompressed = "hide";
			return /* @__PURE__ */ (0, import_jsx_runtime$33.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime$33.jsxs)("div", {
				className: "search-top-filter-bar",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$33.jsxs)("div", {
					className: "search-top-filter-header",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$33.jsx)("div", {
						className: "header-title",
						children: filterBarHeader
					}), /* @__PURE__ */ (0, import_jsx_runtime$33.jsx)("div", {
						className: `search-clear-wrapper ${hideCompressed}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime$33.jsxs)("button", {
							className: "search-clear-button",
							"aria-label": "Clear all filters",
							title: "Clear all filters",
							onClick: this.pressedClearAll,
							children: [/* @__PURE__ */ (0, import_jsx_runtime$33.jsx)("span", {
								className: "button-label",
								children: "Clear all filters"
							}), /* @__PURE__ */ (0, import_jsx_runtime$33.jsx)("span", {
								className: "close-icon",
								children: /* @__PURE__ */ (0, import_jsx_runtime$33.jsx)(Close, { alt: "Clear all filters" })
							})]
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime$33.jsx)("div", {
					className: "search-top-filters",
					children: /* @__PURE__ */ (0, import_jsx_runtime$33.jsx)("div", {
						className: "search-top-filters-content",
						children: filters
					})
				})]
			}) });
		}
	};
	LegacyTopFilterBar.propTypes = propTypes$32;
}));
//#endregion
//#region src/js/components/account/topFilterBar/LegacyTopFilterItem.jsx
var import_jsx_runtime$32, propTypes$31, LegacyTopFilterItem;
var init_LegacyTopFilterItem = __esmMin((() => {
	init_Icons();
	import_jsx_runtime$32 = require_jsx_runtime();
	propTypes$31 = {
		title: PropTypes.string.isRequired,
		value: PropTypes.any,
		removeFilter: PropTypes.func,
		compressed: PropTypes.bool
	};
	LegacyTopFilterItem = ({ title = "Filter", compressed = false, removeFilter, value }) => {
		const clickedButton = () => {
			if (compressed) return;
			removeFilter(value);
		};
		const accessibleLabel = `Remove filter for ${title}`;
		let hideCompressed = "";
		if (compressed) hideCompressed = "hide";
		return /* @__PURE__ */ (0, import_jsx_runtime$32.jsx)("div", {
			className: "filter-item-container",
			children: /* @__PURE__ */ (0, import_jsx_runtime$32.jsxs)("button", {
				className: "filter-item",
				"aria-label": accessibleLabel,
				title: accessibleLabel,
				onClick: clickedButton,
				disabled: compressed,
				children: [/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)("div", {
					className: "filter-item-title",
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime$32.jsx)("div", {
					className: `filter-item-remove-container ${hideCompressed}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime$32.jsxs)("div", {
						className: "filter-remove",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$32.jsx)("span", {
							className: "sr-only",
							children: accessibleLabel
						}), /* @__PURE__ */ (0, import_jsx_runtime$32.jsx)("span", {
							className: "close-icon",
							children: /* @__PURE__ */ (0, import_jsx_runtime$32.jsx)(Close, { alt: accessibleLabel })
						})]
					})
				})]
			})
		});
	};
	LegacyTopFilterItem.propTypes = propTypes$31;
}));
//#endregion
//#region src/js/components/account/topFilterBar/filterGroups/LegacyBaseTopFilterGroup.jsx
var import_jsx_runtime$31, propTypes$30, LegacyBaseTopFilterGroup;
var init_LegacyBaseTopFilterGroup = __esmMin((() => {
	init_Icons();
	init_LegacyTopFilterItem();
	import_jsx_runtime$31 = require_jsx_runtime();
	propTypes$30 = {
		filter: PropTypes.object,
		tags: PropTypes.array,
		clearFilterGroup: PropTypes.func,
		compressed: PropTypes.bool
	};
	LegacyBaseTopFilterGroup = ({ tags = [], compressed = false, filter, clearFilterGroup }) => {
		let hideCompressed = "";
		let showClose = "";
		if (compressed) hideCompressed = "hide";
		const mappedTags = tags.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime$31.jsx)(LegacyTopFilterItem, {
			title: tag.title,
			value: tag.value,
			code: filter.code,
			removeFilter: tag.removeFilter,
			compressed
		}, `top-tag-${filter.code}-${tag.value}`));
		if (mappedTags.length < 2) showClose = " hide";
		return /* @__PURE__ */ (0, import_jsx_runtime$31.jsx)("div", {
			className: "filter-group-container",
			children: /* @__PURE__ */ (0, import_jsx_runtime$31.jsxs)("div", {
				className: "filter-group",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$31.jsxs)("div", {
					className: `filter-group-top ${hideCompressed}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime$31.jsxs)("div", {
						className: "filter-name",
						children: [filter.name, ":"]
					}), /* @__PURE__ */ (0, import_jsx_runtime$31.jsx)("div", {
						className: `filter-group-close${showClose}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime$31.jsx)("button", {
							title: `Clear all ${filter.name} filters`,
							"aria-label": `Clear all ${filter.name} filters`,
							onClick: clearFilterGroup,
							children: /* @__PURE__ */ (0, import_jsx_runtime$31.jsx)("span", {
								className: "close-icon",
								children: /* @__PURE__ */ (0, import_jsx_runtime$31.jsx)(Close, { alt: `Clear all ${filter.name} filters` })
							})
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime$31.jsx)("div", {
					className: "filter-group-bottom",
					children: /* @__PURE__ */ (0, import_jsx_runtime$31.jsx)("div", {
						className: "filter-values",
						children: mappedTags
					})
				})]
			})
		});
	};
	LegacyBaseTopFilterGroup.propTypes = propTypes$30;
}));
//#endregion
//#region src/js/components/account/topFilterBar/filterGroups/TimePeriodFYFilterGroup.jsx
/**
* TimePeriodFYGroup.jsx
* Created by Kevin Li 1/24/17
*/
var import_jsx_runtime$30, propTypes$29, TimePeriodFYFilterGroup;
var init_TimePeriodFYFilterGroup = __esmMin((() => {
	init_fiscalYearHelper();
	init_LegacyBaseTopFilterGroup();
	import_jsx_runtime$30 = require_jsx_runtime();
	propTypes$29 = {
		filter: PropTypes.object,
		redux: PropTypes.object,
		latestFy: PropTypes.object
	};
	TimePeriodFYFilterGroup = class extends React.Component {
		constructor(props) {
			super(props);
			this.removeFilter = this.removeFilter.bind(this);
			this.clearGroup = this.clearGroup.bind(this);
		}
		removeFilter(value) {
			const timePeriodFilter = {
				dateType: this.props.redux.reduxFilters.dateType,
				fy: this.props.redux.reduxFilters.fy,
				start: this.props.redux.reduxFilters.startDate,
				end: this.props.redux.reduxFilters.endDate
			};
			timePeriodFilter.dateType = "fy";
			timePeriodFilter.fy = this.props.redux.reduxFilters.fy.delete(value);
			this.props.redux.updateTimePeriod(timePeriodFilter);
		}
		clearGroup() {
			this.props.redux.resetTimeFilters();
		}
		generateTags() {
			const tags = [];
			const selectedValues = this.props.filter.values;
			const allFY = this.props.latestFy ? this.props.latestFy.year() - earliestFiscalYear + 1 : 0;
			if (selectedValues.length === allFY) {
				const tag = {
					value: "all",
					title: "All Fiscal Years",
					removeFilter: this.clearGroup
				};
				tags.push(tag);
			} else selectedValues.forEach((value) => {
				const tag = {
					value,
					title: `FY ${value}`,
					removeFilter: this.removeFilter
				};
				tags.push(tag);
			});
			return tags;
		}
		render() {
			return /* @__PURE__ */ (0, import_jsx_runtime$30.jsx)(LegacyBaseTopFilterGroup, {
				tags: this.generateTags(),
				filter: this.props.filter,
				clearFilterGroup: this.clearGroup
			});
		}
	};
	TimePeriodFYFilterGroup.propTypes = propTypes$29;
}));
//#endregion
//#region src/js/components/account/topFilterBar/filterGroups/TimePeriodDRFilterGroup.jsx
/**
* TimePeriodDRFilterGroup.jsx
* Created by Kevin Li 1/24/17
*/
var import_jsx_runtime$29, propTypes$28, TimePeriodDRFilterGroup;
var init_TimePeriodDRFilterGroup = __esmMin((() => {
	init_LegacyBaseTopFilterGroup();
	import_jsx_runtime$29 = require_jsx_runtime();
	propTypes$28 = {
		filter: PropTypes.object,
		redux: PropTypes.object
	};
	TimePeriodDRFilterGroup = class extends React.Component {
		constructor(props) {
			super(props);
			this.removeTimePeriod = this.removeTimePeriod.bind(this);
			this.clearGroup = this.clearGroup.bind(this);
		}
		removeTimePeriod() {
			const timePeriodFilter = {
				dateType: this.props.redux.reduxFilters.dateType,
				fy: this.props.redux.reduxFilters.fy,
				start: null,
				end: null
			};
			this.props.redux.updateTimePeriod(timePeriodFilter);
		}
		clearGroup() {
			this.props.redux.resetTimeFilters();
		}
		generateTags() {
			const tags = [];
			const tag = {
				value: "dr",
				title: this.props.filter.values[0],
				removeFilter: this.removeTimePeriod
			};
			tags.push(tag);
			return tags;
		}
		render() {
			return /* @__PURE__ */ (0, import_jsx_runtime$29.jsx)(LegacyBaseTopFilterGroup, {
				tags: this.generateTags(),
				filter: this.props.filter,
				clearFilterGroup: this.clearGroup
			});
		}
	};
	TimePeriodDRFilterGroup.propTypes = propTypes$28;
}));
//#endregion
//#region src/js/components/account/topFilterBar/filterGroups/ObjectClassFilterGroup.jsx
/**
* ObjectClassFilterGroup.jsx
* Created by Kevin Li 3/31/17
*/
var import_jsx_runtime$28, propTypes$27, ObjectClassFilterGroup;
var init_ObjectClassFilterGroup = __esmMin((() => {
	init_LegacyBaseTopFilterGroup();
	import_jsx_runtime$28 = require_jsx_runtime();
	propTypes$27 = {
		filter: PropTypes.object,
		redux: PropTypes.object
	};
	ObjectClassFilterGroup = class extends React.Component {
		constructor(props) {
			super(props);
			this.removeFilter = this.removeFilter.bind(this);
			this.clearGroup = this.clearGroup.bind(this);
		}
		removeFilter(value) {
			this.props.redux.toggleObjectClass(value);
		}
		clearGroup() {
			this.props.redux.resetObjectClass();
		}
		generateTags() {
			const tags = [];
			this.props.filter.values.forEach((value) => {
				const tag = {
					value,
					title: this.props.redux.filterOptions.objectClassDefinitions[value],
					removeFilter: this.removeFilter
				};
				tags.push(tag);
			});
			return tags;
		}
		render() {
			return /* @__PURE__ */ (0, import_jsx_runtime$28.jsx)(LegacyBaseTopFilterGroup, {
				tags: this.generateTags(),
				filter: this.props.filter,
				clearFilterGroup: this.clearGroup
			});
		}
	};
	ObjectClassFilterGroup.propTypes = propTypes$27;
}));
//#endregion
//#region src/js/components/account/topFilterBar/filterGroups/ProgramActivityFilterGroup.jsx
/**
* ProgramActivityFilterGroup.jsx
* Created by michaelbray on 4/17/17.
*/
var import_jsx_runtime$27, propTypes$26, ProgramActivityFilterGroup;
var init_ProgramActivityFilterGroup = __esmMin((() => {
	init_LegacyBaseTopFilterGroup();
	import_jsx_runtime$27 = require_jsx_runtime();
	propTypes$26 = {
		filter: PropTypes.object,
		redux: PropTypes.object
	};
	ProgramActivityFilterGroup = class extends React.Component {
		constructor(props) {
			super(props);
			this.removeFilter = this.removeFilter.bind(this);
			this.clearGroup = this.clearGroup.bind(this);
		}
		removeFilter(value) {
			this.props.redux.toggleProgramActivity(value);
		}
		clearGroup() {
			this.props.redux.resetProgramActivity();
		}
		generateTags() {
			const tags = [];
			const selectedValues = this.props.filter.values;
			const availableProgramActivities = this.props.redux.filterOptions.programActivity;
			selectedValues.forEach((value) => {
				const programActivity = find(availableProgramActivities, { id: `${value}` });
				let label = value;
				if (programActivity) label = programActivity.name;
				const tag = {
					value,
					title: label,
					removeFilter: this.removeFilter
				};
				tags.push(tag);
			});
			return tags;
		}
		render() {
			return /* @__PURE__ */ (0, import_jsx_runtime$27.jsx)(LegacyBaseTopFilterGroup, {
				tags: this.generateTags(),
				filter: this.props.filter,
				clearFilterGroup: this.clearGroup
			});
		}
	};
	ProgramActivityFilterGroup.propTypes = propTypes$26;
}));
//#endregion
//#region src/js/components/account/topFilterBar/filterGroups/AccountTopFilterGroupGenerator.jsx
var import_jsx_runtime$26, topFilterGroupGenerator;
var init_AccountTopFilterGroupGenerator = __esmMin((() => {
	init_TimePeriodFYFilterGroup();
	init_TimePeriodDRFilterGroup();
	init_ObjectClassFilterGroup();
	init_ProgramActivityFilterGroup();
	import_jsx_runtime$26 = require_jsx_runtime();
	topFilterGroupGenerator = (config = {
		filter: { code: "" },
		data: null
	}) => {
		const groupKey = `top-filter-group-${config.filter.code}`;
		switch (config.filter.code) {
			case "timePeriodFY": return /* @__PURE__ */ (0, import_jsx_runtime$26.jsx)(TimePeriodFYFilterGroup, { ...config }, groupKey);
			case "timePeriodDR": return /* @__PURE__ */ (0, import_jsx_runtime$26.jsx)(TimePeriodDRFilterGroup, { ...config }, groupKey);
			case "objectClass": return /* @__PURE__ */ (0, import_jsx_runtime$26.jsx)(ObjectClassFilterGroup, { ...config }, groupKey);
			case "programActivity": return /* @__PURE__ */ (0, import_jsx_runtime$26.jsx)(ProgramActivityFilterGroup, { ...config }, groupKey);
			default: return null;
		}
	};
}));
//#endregion
//#region src/js/containers/account/topFilterBar/AccountTopFilterBarContainer.jsx
/**
* AccountTopFilterBarContainer.jsx
* Created by Kevin Li 3/23/17
**/
var import_jsx_runtime$25, dayjs, propTypes$25, AccountTopFilterBarContainer, AccountTopFilterBarContainer_default;
var init_AccountTopFilterBarContainer = __esmMin((() => {
	init_redux();
	init_es();
	init_LegacyTopFilterBar();
	init_AccountTopFilterGroupGenerator();
	init_accountFilterActions();
	import_jsx_runtime$25 = require_jsx_runtime();
	dayjs = require_dayjs_min();
	propTypes$25 = {
		reduxFilters: PropTypes.object,
		resetAccountFilters: PropTypes.func
	};
	AccountTopFilterBarContainer = class extends React.Component {
		constructor(props) {
			super(props);
			this.state = { filters: [] };
			this.clearAllFilters = this.clearAllFilters.bind(this);
		}
		componentDidMount() {
			this.prepareFilters(this.props.reduxFilters);
		}
		componentDidUpdate(prevProps) {
			if (!Object.is(prevProps.reduxFilters, this.props.reduxFilters)) this.prepareFilters(this.props.reduxFilters);
		}
		/**
		* Convert the Redux filter data into JS objects
		*/
		prepareFilters(props) {
			const filters = [];
			const timeFilters = this.prepareTimeFilter(props);
			if (timeFilters) filters.push(timeFilters);
			const objectClass = this.prepareObjectClass(props);
			if (objectClass) filters.push(objectClass);
			const programActivity = this.prepareProgramActivity(props);
			if (programActivity) filters.push(programActivity);
			this.setState({ filters });
		}
		/**
		* Logic for parsing the current Redux time filter into a JS object that can be parsed by the
		* top filter bar
		*/
		prepareTimeFilter(props) {
			let selected = false;
			const filter = {};
			if (props?.dateType === "fy") {
				if (props.fy.count() > 0) {
					selected = true;
					filter.code = "timePeriodFY";
					filter.name = "Time Period";
					filter.values = orderBy(props.fy.toArray(), [], ["desc"]);
				}
			} else if (props?.dateType === "dr") {
				if (props.startDate && props.endDate) {
					selected = true;
					filter.code = "timePeriodDR";
					filter.name = "Time Period";
					filter.values = [`${dayjs(props.startDate, "YYYY-MM-DD").format("MM/DD/YYYY")} to ${dayjs(props.endDate, "YYYY-MM-DD").format("MM/DD/YYYY")}`];
				}
			}
			if (selected) return filter;
			return null;
		}
		prepareObjectClass(props) {
			let selected = false;
			const filter = {
				code: "objectClass",
				name: "Object Class",
				values: props.objectClass.toArray()
			};
			if (props.objectClass.count() > 0) selected = true;
			if (selected) return filter;
			return null;
		}
		prepareProgramActivity(props) {
			let selected = false;
			const filter = {
				code: "programActivity",
				name: "Program Activity",
				values: props.programActivity.toArray()
			};
			if (props.programActivity.count() > 0) selected = true;
			if (selected) return filter;
			return null;
		}
		clearAllFilters() {
			this.props.resetAccountFilters();
		}
		render() {
			let output = null;
			if (this.state.filters.length > 0) {
				let count = 0;
				this.state.filters.forEach((filter) => {
					count += filter.values.length;
				});
				output = /* @__PURE__ */ (0, import_jsx_runtime$25.jsx)(LegacyTopFilterBar, {
					...this.props,
					filterCount: count,
					clearAllFilters: this.clearAllFilters,
					filters: this.state.filters,
					groupGenerator: topFilterGroupGenerator
				});
			}
			return output;
		}
	};
	AccountTopFilterBarContainer.propTypes = propTypes$25;
	AccountTopFilterBarContainer_default = connect_default((state) => ({
		reduxFilters: state.account.filters,
		filterOptions: state.account.filterOptions
	}), (dispatch) => bindActionCreators(accountFilterActions_exports, dispatch))(AccountTopFilterBarContainer);
}));
//#endregion
//#region src/js/components/account/visualizations/time/AccountTimeVisualizationPeriodButton.jsx
/**
* AccountTimeVisualizationPeriodButton.jsx
* Created by Lizzie Salita 04/04/17
*/
var import_jsx_runtime$24, propTypes$24, AccountTimeVisualizationPeriodButton;
var init_AccountTimeVisualizationPeriodButton = __esmMin((() => {
	import_jsx_runtime$24 = require_jsx_runtime();
	propTypes$24 = {
		active: PropTypes.bool,
		value: PropTypes.string,
		label: PropTypes.string,
		changePeriod: PropTypes.func
	};
	AccountTimeVisualizationPeriodButton = class extends React.Component {
		constructor(props) {
			super(props);
			this.clickedButton = this.clickedButton.bind(this);
		}
		clickedButton() {
			this.props.changePeriod(this.props.value);
		}
		render() {
			let activeClass = "";
			if (this.props.active) activeClass = " active";
			let description = `Show results by ${this.props.label.toLowerCase()}`;
			if (this.props.active) description += " (currently selected)";
			return /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)("button", {
				className: `period-button${activeClass}`,
				value: this.props.value,
				title: description,
				"aria-label": description,
				onClick: this.clickedButton,
				children: this.props.label
			});
		}
	};
	AccountTimeVisualizationPeriodButton.propTypes = propTypes$24;
}));
//#endregion
//#region src/js/components/sharedComponents/timeChart/TimeVisualizationChartMessage.jsx
/**
* TimeVisualizationChartMessage.jsx
* Created by Kevin Li 1/26/17
*/
var import_jsx_runtime$23, propTypes$23, TimeVisualizationChartMessage;
var init_TimeVisualizationChartMessage = __esmMin((() => {
	import_jsx_runtime$23 = require_jsx_runtime();
	propTypes$23 = { message: PropTypes.string };
	TimeVisualizationChartMessage = class extends React.Component {
		render() {
			return /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("div", {
				className: "results-visualization-message",
				children: this.props.message
			});
		}
	};
	TimeVisualizationChartMessage.propTypes = propTypes$23;
}));
//#endregion
//#region src/js/components/account/visualizations/time/chart/calculations.js
/**
* calculations.js
* Created by Kevin Li 7/26/17
*/
var buildYRange;
var init_calculations = __esmMin((() => {
	buildYRange = (allY) => {
		const yRange = [];
		let yMin = min(allY);
		if (yMin > 0) yMin = 0;
		yRange.push(yMin);
		const rawMax = max(allY);
		if (rawMax > 0) yRange.push(rawMax);
		else if (rawMax < 0) yRange.push(0);
		else if (rawMax === 0) yRange.push(1e3);
		return yRange;
	};
}));
//#endregion
//#region src/js/components/account/visualizations/time/chart/BarChartYAxisItem.jsx
var import_jsx_runtime$22, propTypes$22, BarChartYAxisItem;
var init_BarChartYAxisItem = __esmMin((() => {
	import_jsx_runtime$22 = require_jsx_runtime();
	propTypes$22 = {
		label: PropTypes.object,
		gridLine: PropTypes.object,
		x: PropTypes.number,
		y: PropTypes.number
	};
	BarChartYAxisItem = (props) => /* @__PURE__ */ (0, import_jsx_runtime$22.jsxs)("g", {
		className: "axis-item y-axis",
		transform: `translate(0,${props.y})`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("text", {
			transform: `translate(${props.label.x},${props.label.y})`,
			textAnchor: "end",
			children: props.label.text
		}), /* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("line", {
			className: "grid-line",
			x1: props.gridLine.x1,
			x2: props.gridLine.x2,
			y1: props.gridLine.y1,
			y2: props.gridLine.y2
		})]
	});
	BarChartYAxisItem.propTypes = propTypes$22;
}));
//#endregion
//#region src/js/components/account/visualizations/time/chart/BarChartYAxis.jsx
/**
* BarChartYAxis.jsx
* Created by Kevin Li 7/26/17
*/
var import_jsx_runtime$21, propTypes$21, BarChartYAxis;
var init_BarChartYAxis = __esmMin((() => {
	init_BarChartYAxisItem();
	import_jsx_runtime$21 = require_jsx_runtime();
	propTypes$21 = {
		title: PropTypes.string,
		description: PropTypes.string,
		items: PropTypes.array,
		line: PropTypes.object,
		x: PropTypes.number,
		y: PropTypes.number
	};
	BarChartYAxis = class extends React.Component {
		render() {
			const labels = this.props.items.map((item) => /* @__PURE__ */ createElement(BarChartYAxisItem, {
				...item,
				key: item.label.value
			}));
			return /* @__PURE__ */ (0, import_jsx_runtime$21.jsxs)("g", {
				className: "bar-axis",
				transform: `translate(${this.props.x},${this.props.y})`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("title", { children: this.props.title }),
					/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("desc", { children: this.props.description }),
					/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("g", { children: /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("line", {
						className: "y-axis",
						x1: this.props.line.x1,
						x2: this.props.line.x2,
						y1: this.props.line.y1,
						y2: this.props.line.y2
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("g", {
						className: "axis-labels",
						children: labels
					})
				]
			});
		}
	};
	BarChartYAxis.propTypes = propTypes$21;
}));
//#endregion
//#region src/js/components/account/visualizations/time/chart/BarChartXAxisItem.jsx
var import_jsx_runtime$20, propTypes$20, BarChartXAxisItem;
var init_BarChartXAxisItem = __esmMin((() => {
	import_jsx_runtime$20 = require_jsx_runtime();
	propTypes$20 = {
		label: PropTypes.string,
		x: PropTypes.number,
		y: PropTypes.number
	};
	BarChartXAxisItem = (props) => /* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("g", {
		className: "axis-item y-axis",
		transform: `translate(${props.x},${props.y})`,
		children: /* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("text", {
			textAnchor: "middle",
			children: props.label
		})
	});
	BarChartXAxisItem.propTypes = propTypes$20;
}));
//#endregion
//#region src/js/components/account/visualizations/time/chart/BarChartXAxis.jsx
/**
* BarChartXAxis.jsx
* Created by Kevin Li 7/26/17
*/
var import_jsx_runtime$19, propTypes$19, BarChartXAxis;
var init_BarChartXAxis = __esmMin((() => {
	init_BarChartXAxisItem();
	import_jsx_runtime$19 = require_jsx_runtime();
	propTypes$19 = {
		title: PropTypes.string,
		description: PropTypes.string,
		items: PropTypes.array,
		line: PropTypes.object,
		lineGroup: PropTypes.object,
		labelGroup: PropTypes.object
	};
	BarChartXAxis = class extends React.Component {
		render() {
			const labels = this.props.items.map((item) => /* @__PURE__ */ createElement(BarChartXAxisItem, {
				...item,
				key: item.value
			}));
			return /* @__PURE__ */ (0, import_jsx_runtime$19.jsxs)("g", {
				className: "bar-axis",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$19.jsx)("title", { children: this.props.title }),
					/* @__PURE__ */ (0, import_jsx_runtime$19.jsx)("desc", { children: this.props.description }),
					/* @__PURE__ */ (0, import_jsx_runtime$19.jsx)("g", {
						transform: `translate(${this.props.lineGroup.x}, ${this.props.lineGroup.y})`,
						children: /* @__PURE__ */ (0, import_jsx_runtime$19.jsx)("line", {
							className: "y-axis",
							x1: this.props.line.x1,
							x2: this.props.line.x2,
							y1: this.props.line.y1,
							y2: this.props.line.y2
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$19.jsx)("g", {
						className: "axis-labels",
						transform: `translate(${this.props.labelGroup.x},${this.props.labelGroup.y})`,
						children: labels
					})
				]
			});
		}
	};
	BarChartXAxis.propTypes = propTypes$19;
}));
//#endregion
//#region src/js/components/account/visualizations/time/chart/StackedBar.jsx
var import_jsx_runtime$18, propTypes$18, StackedBar;
var init_StackedBar = __esmMin((() => {
	init_moneyFormatter();
	import_jsx_runtime$18 = require_jsx_runtime();
	propTypes$18 = {
		xValue: PropTypes.string,
		description: PropTypes.string,
		value: PropTypes.number,
		x: PropTypes.number,
		y: PropTypes.number,
		width: PropTypes.number,
		height: PropTypes.number,
		color: PropTypes.string
	};
	StackedBar = (props) => /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("desc", { children: `${props.description} in ${props.xValue}: ${formatMoney(props.value)}` }), /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("rect", {
		className: "stacked-bar-item",
		x: props.x,
		y: props.y,
		width: props.width,
		height: props.height,
		fill: props.color
	})] });
	StackedBar.propTypes = propTypes$18;
}));
//#endregion
//#region src/js/components/account/visualizations/time/chart/OutlayLine.jsx
var import_jsx_runtime$17, propTypes$17, triangleX, OutlayLine;
var init_OutlayLine = __esmMin((() => {
	init_moneyFormatter();
	import_jsx_runtime$17 = require_jsx_runtime();
	propTypes$17 = {
		xValue: PropTypes.string,
		description: PropTypes.string,
		value: PropTypes.number,
		x: PropTypes.number,
		y: PropTypes.number,
		width: PropTypes.number,
		color: PropTypes.string
	};
	triangleX = Math.sqrt(75);
	OutlayLine = (props) => /* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)("g", {
		transform: `translate(${props.x},${props.y})`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("desc", { children: `${props.description} in ${props.xValue}: ${formatMoney(props.value)}` }),
			/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("line", {
				className: "outlay-line",
				x1: 0,
				x2: props.width,
				y1: 0,
				y2: 0,
				strokeWidth: 2,
				stroke: props.color
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("g", {
				transform: `translate(${props.width + 5},0)`,
				children: /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("polygon", {
					className: "outlay-triangle",
					fill: props.color,
					points: `0,0 ${triangleX},-5 ${triangleX},5`
				})
			})
		]
	});
	OutlayLine.propTypes = propTypes$17;
}));
//#endregion
//#region src/js/components/account/visualizations/time/chart/StackedBarGroup.jsx
/**
* StackedBarGroup.jsx
* Created by Kevin Li 7/26/17
*/
var import_jsx_runtime$16, propTypes$16, StackedBarGroup;
var init_StackedBarGroup = __esmMin((() => {
	init_StackedBar();
	init_OutlayLine();
	import_jsx_runtime$16 = require_jsx_runtime();
	propTypes$16 = {
		xPos: PropTypes.number,
		stack: PropTypes.array,
		hitzone: PropTypes.object,
		tooltip: PropTypes.object,
		showTooltip: PropTypes.func,
		hideTooltip: PropTypes.func,
		toggleTooltip: PropTypes.func
	};
	StackedBarGroup = class extends React.Component {
		constructor(props) {
			super(props);
			this.mouseEntered = this.mouseEntered.bind(this);
			this.mouseExited = this.mouseExited.bind(this);
			this.barTouched = this.barTouched.bind(this);
		}
		mouseEntered() {
			this.props.showTooltip(this.props.tooltip);
		}
		mouseExited() {
			this.props.hideTooltip();
		}
		barTouched() {
			this.props.toggleTooltip(this.props.tooltip);
		}
		render() {
			const items = this.props.stack.map((item) => {
				if (item.type === "bar") return /* @__PURE__ */ createElement(StackedBar, {
					...item,
					key: `${item.name}-${item.xValue}`
				});
				return /* @__PURE__ */ createElement(OutlayLine, {
					...item,
					key: `${item.name}-${item.xValue}`
				});
			});
			return /* @__PURE__ */ (0, import_jsx_runtime$16.jsxs)("g", {
				className: "bar-group",
				transform: `translate(${this.props.xPos},0)`,
				children: [items, /* @__PURE__ */ (0, import_jsx_runtime$16.jsx)("rect", {
					className: "hit-zone",
					fill: "rgba(0,0,0,0)",
					x: 0,
					y: 0,
					width: this.props.hitzone.width,
					height: this.props.hitzone.height,
					onMouseEnter: this.mouseEntered,
					onMouseLeave: this.mouseExited,
					onTouchStart: this.barTouched
				})]
			});
		}
	};
	StackedBarGroup.propTypes = propTypes$16;
}));
//#endregion
//#region src/js/components/account/visualizations/time/chart/BarChartStacked.jsx
/**
* BarChartStacked.jsx
* Created by Kevin Li 7/26/17
*/
var import_jsx_runtime$15, propTypes$15, BarChartStacked;
var init_BarChartStacked = __esmMin((() => {
	init_src$1();
	init_moneyFormatter();
	init_BarChartLegend();
	init_calculations();
	init_BarChartYAxis();
	init_BarChartXAxis();
	init_StackedBarGroup();
	import_jsx_runtime$15 = require_jsx_runtime();
	propTypes$15 = {
		height: PropTypes.number,
		width: PropTypes.number,
		data: PropTypes.object,
		padding: PropTypes.object,
		legend: PropTypes.array,
		showTooltip: PropTypes.func,
		hideTooltip: PropTypes.func,
		toggleTooltip: PropTypes.func
	};
	BarChartStacked = ({ height, width, data, padding = {
		left: 70,
		bottom: 50
	}, legend, showTooltip, hideTooltip, toggleTooltip }) => {
		const [chartReady, setChartReady] = useState(false);
		const [virtualChart, setVirtualChart] = useState({});
		const buildVirtualYAxis = (values) => {
			const yAxis = {
				items: [],
				line: {
					x1: 0,
					x2: 0,
					y1: 0,
					y2: values.graphHeight
				},
				group: {
					x: values.padding.left,
					y: 0
				},
				title: "Y-Axis"
			};
			const tickPoints = values.yScale.ticks(7);
			const units = calculateUnits(values.allY);
			tickPoints.forEach((y) => {
				let labelText = formatMoneyWithPrecision(y / units.unit, units.precision);
				if (y === 0) labelText = "$0";
				else labelText += units.unitLabel;
				const item = {
					label: {
						text: labelText,
						x: -10,
						y: 6,
						value: y
					},
					gridLine: {
						x1: 0,
						x2: values.graphWidth,
						y1: 0,
						y2: 0,
						value: y
					},
					x: values.padding.left,
					y: values.yScale(y)
				};
				yAxis.items.push(item);
			});
			yAxis.description = `The Y-axis of the chart, showing a range of values from \
${yAxis.items[0].label.text} to ${yAxis.items[yAxis.items.length - 1].label.text}.`;
			return yAxis;
		};
		const buildVirtualXAxis = (values) => {
			const xAxis = {
				items: [],
				line: {
					x1: 0,
					x2: values.graphWidth,
					y1: 0,
					y2: 0
				},
				lineGroup: {
					x: values.padding.left,
					y: values.yScale(0)
				},
				labelGroup: {
					x: values.padding.left,
					y: values.graphHeight + 15
				},
				title: "X-Axis"
			};
			const barWidth = values.xScale.bandwidth();
			values.xSeries.forEach((x) => {
				const item = {
					label: x,
					value: x,
					y: 0,
					x: values.xScale(x) + barWidth / 2
				};
				xAxis.items.push(item);
			});
			xAxis.description = `The X-axis of the chart, showing a range of values from \
${xAxis.items[0].label} to ${xAxis.items[xAxis.items.length - 1].label}.`;
			return xAxis;
		};
		const buildVirtualBody = (values) => {
			const body = {
				items: [],
				group: {
					x: values.padding.left,
					y: 0
				}
			};
			const barWidth = Math.min(values.xScale.bandwidth() - 40, 120);
			const zeroY = values.yScale(0);
			values.xSeries.forEach((x, index) => {
				const y = values.ySeries[index];
				let xPos = values.xScale(x) + 20;
				if (barWidth === 120) xPos = values.xScale(x) + values.xScale.bandwidth() / 2 - 120 / 2;
				const item = {
					xPos,
					xValue: x,
					stack: [],
					hitzone: {
						width: barWidth,
						height: values.graphHeight
					},
					tooltip: {
						values: [],
						xValue: x,
						position: {
							x: xPos + barWidth / 2 + values.padding.left,
							y: 0
						}
					}
				};
				const tooltip = [];
				let maxY = 0;
				values.stacks.forEach((stack) => {
					const dataLocal = y[stack.name];
					let yPos = values.yScale(dataLocal.top);
					let heightLocal = 0;
					if (stack.type === "bar") {
						heightLocal = values.yScale(dataLocal.bottom) - yPos;
						if (dataLocal.top < 0 && dataLocal.bottom >= 0) {
							yPos = zeroY;
							heightLocal = values.yScale(dataLocal.top) - zeroY;
						} else if (dataLocal.top < 0) {
							yPos = values.yScale(Math.max(dataLocal.bottom, dataLocal.top));
							heightLocal = values.yScale(Math.min(dataLocal.bottom, dataLocal.top)) - yPos;
						}
					}
					const element = Object.assign({}, stack, {
						height: heightLocal,
						width: barWidth,
						x: 0,
						y: yPos,
						xValue: x,
						value: dataLocal.value,
						description: dataLocal.description
					});
					item.stack.push(element);
					tooltip.push({
						label: dataLocal.description,
						value: formatMoney(dataLocal.value),
						type: stack.name
					});
					if (yPos > maxY) maxY = yPos;
				});
				item.stack.reverse();
				item.tooltip.values = tooltip;
				item.tooltip.position.y = maxY / 2;
				body.items.push(item);
			});
			return body;
		};
		const buildVirtualChart = () => {
			const values = {
				width,
				height,
				allY: data.allY,
				xSeries: data.xSeries,
				ySeries: data.ySeries,
				stacks: data.stacks
			};
			values.graphHeight = values.height - padding.bottom;
			values.graphWidth = values.width - padding.left;
			values.padding = padding;
			const yRange = buildYRange(values.allY);
			values.xScale = band().domain(values.xSeries).range([0, values.graphWidth]).round(true);
			values.yScale = linear().domain(yRange).range([values.graphHeight, 0]).clamp(true);
			const chart = {
				yAxis: buildVirtualYAxis(values),
				xAxis: buildVirtualXAxis(values),
				body: buildVirtualBody(values)
			};
			setVirtualChart(chart);
			setChartReady(true);
		};
		const body = virtualChart.body?.items.map((item) => /* @__PURE__ */ createElement(StackedBarGroup, {
			...item,
			key: item.xValue,
			showTooltip,
			hideTooltip,
			toggleTooltip
		}));
		useEffect(() => {
			buildVirtualChart();
		}, [
			data,
			width,
			height
		]);
		if (!chartReady) return null;
		return /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime$15.jsxs)("svg", {
			className: "bar-graph",
			width,
			height: height + 40,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$15.jsx)(BarChartYAxis, {
					...virtualChart.yAxis,
					x: virtualChart.yAxis.group.x,
					y: virtualChart.yAxis.group.y
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$15.jsx)(BarChartXAxis, { ...virtualChart.xAxis }),
				/* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("g", {
					className: "bar-data",
					transform: `translate(${virtualChart.body.group.x},\
${virtualChart.body.group.y})`,
					children: body
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("g", {
					className: "legend-container",
					transform: `translate(${padding.left},
                    ${height - 20})`,
					children: /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)(BarChartLegend, { legend })
				})
			]
		}) });
	};
	BarChartStacked.propTypes = propTypes$15;
}));
//#endregion
//#region src/js/components/account/visualizations/time/TooltipItem.jsx
var import_jsx_runtime$14, propTypes$14, TooltipItem;
var init_TooltipItem = __esmMin((() => {
	import_jsx_runtime$14 = require_jsx_runtime();
	propTypes$14 = {
		value: PropTypes.string,
		label: PropTypes.string
	};
	TooltipItem = (props) => /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)("div", {
		className: "tooltip-item",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("div", {
			className: "item-value",
			children: props.value
		}), /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("div", {
			className: "item-label",
			children: props.label
		})]
	}) });
	TooltipItem.propTypes = propTypes$14;
}));
//#endregion
//#region src/js/components/account/visualizations/time/TimeTooltip.jsx
/**
* Tooltip.jsx
* Created by Kevin Li 7/27/17
*/
var import_jsx_runtime$13, propTypes$13, TimeTooltip;
var init_TimeTooltip = __esmMin((() => {
	init_TooltipItem();
	import_jsx_runtime$13 = require_jsx_runtime();
	propTypes$13 = {
		xValue: PropTypes.string,
		values: PropTypes.array,
		position: PropTypes.object
	};
	TimeTooltip = class extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				windowWidth: 0,
				tooltipWidth: 0,
				xOffset: 0
			};
			this.measureDOM = this.measureDOM.bind(this);
		}
		componentDidMount() {
			this.measureDOM();
			window.addEventListener("resize", this.measureDOM);
		}
		componentWillUnmount() {
			window.removeEventListener("resize", this.measureDOM);
		}
		measureDOM() {
			const windowWidth = window.innerWidth;
			const tooltipWidth = this.div.offsetWidth;
			const xOffset = this.div.getBoundingClientRect().left;
			this.setState({
				windowWidth,
				tooltipWidth,
				xOffset
			}, this.positionTooltip);
		}
		positionTooltip() {
			const tooltipWidth = this.state.tooltipWidth;
			const distanceFromRight = this.state.windowWidth - (this.state.xOffset + this.props.position.x + tooltipWidth);
			let direction = "left";
			if (distanceFromRight <= 20) direction = "right";
			let offset = 9;
			if (direction === "right") offset = -9 - tooltipWidth;
			let yOffset = 75;
			if (direction === "right") yOffset = 65;
			this.div.style.transform = `translate(${this.props.position.x + offset}px,${this.props.position.y + yOffset}px)`;
			this.div.className = `tooltip ${direction}`;
			this.pointerDiv.className = `tooltip-pointer ${direction}`;
		}
		render() {
			const items = this.props.values.map((item) => /* @__PURE__ */ createElement(TooltipItem, {
				...item,
				key: item.type
			}));
			return /* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("div", {
				className: "tooltip",
				ref: (div) => {
					this.div = div;
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("div", {
						className: "tooltip-pointer",
						ref: (div) => {
							this.pointerDiv = div;
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("div", {
						className: "tooltip-title",
						children: this.props.xValue
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("div", {
						className: "tooltip-body",
						children: /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("ul", {
							className: "tooltip-items",
							children: items
						})
					})
				]
			});
		}
	};
	TimeTooltip.propTypes = propTypes$13;
}));
//#endregion
//#region src/js/components/account/visualizations/time/TimeVisualization.jsx
/**
* TimeVisualization.jsx
* Created by Kevin Li 3/21/17
*/
var import_jsx_runtime$12, propTypes$12, TimeVisualization;
var init_TimeVisualization = __esmMin((() => {
	init_TimeVisualizationChartMessage();
	init_BarChartStacked();
	init_TimeTooltip();
	import_jsx_runtime$12 = require_jsx_runtime();
	propTypes$12 = {
		width: PropTypes.number,
		height: PropTypes.number,
		data: PropTypes.object,
		loading: PropTypes.bool,
		hasFilteredObligated: PropTypes.bool
	};
	TimeVisualization = ({ width = 0, height = 280, data, loading, hasFilteredObligated }) => {
		const [showTooltip, setShowTooltip] = useState(false);
		const [tooltipData, setTooltipData] = useState(null);
		let chart = /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(TimeVisualizationChartMessage, { message: "No data to display" });
		let legend = [];
		let tooltip = null;
		const showTooltipLocal = (localData) => {
			setShowTooltip(true);
			setTooltipData(localData);
		};
		const hideTooltip = () => {
			setShowTooltip(false);
		};
		const toggleTooltip = (localData) => {
			if (showTooltip) hideTooltip();
			else showTooltipLocal(localData);
		};
		if (hasFilteredObligated) legend = [
			{
				color: "#fba302",
				label: "Outlay",
				offset: 0
			},
			{
				color: "#2c4452",
				label: "Obligations Incurred (Filtered)",
				offset: 84
			},
			{
				color: "#5c7480",
				label: "Obligations Incurred (Other)",
				offset: 262
			},
			{
				color: "#a0bac4",
				label: "Unobligated Balance",
				offset: 450
			}
		];
		else legend = [
			{
				color: "#fba302",
				label: "Outlay",
				offset: 0,
				mobileOffset: 0
			},
			{
				color: "#5c7480",
				label: "Obligations Incurred",
				offset: 84,
				mobileOffset: 24
			},
			{
				color: "#a0bac4",
				label: "Unobligated Balance",
				offset: 220,
				mobileOffset: 48
			}
		];
		if (loading) chart = /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(TimeVisualizationChartMessage, { message: "Loading data..." });
		else if (data.xSeries.length > 0) chart = /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(BarChartStacked, {
			width,
			height,
			data,
			legend,
			showTooltip: showTooltipLocal,
			hideTooltip,
			toggleTooltip
		});
		if (showTooltip) tooltip = /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(TimeTooltip, { ...tooltipData });
		return /* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)("div", {
			className: "results-visualization-time-container",
			children: [tooltip, chart]
		});
	};
	TimeVisualization.propTypes = propTypes$12;
}));
//#endregion
//#region src/js/components/account/visualizations/time/AccountTimeVisualizationSection.jsx
/**
* AccountTimeVisualizationSection.jsx
* Created by Kevin Li 3/21/17
*/
var import_jsx_runtime$11, propTypes$11, AccountTimeVisualizationSection;
var init_AccountTimeVisualizationSection = __esmMin((() => {
	init_index_es();
	init_AccountTimeVisualizationPeriodButton();
	init_TimeVisualization();
	import_jsx_runtime$11 = require_jsx_runtime();
	propTypes$11 = {
		data: PropTypes.object,
		loading: PropTypes.bool,
		visualizationPeriod: PropTypes.string,
		changePeriod: PropTypes.func,
		hasFilteredObligated: PropTypes.bool
	};
	AccountTimeVisualizationSection = ({ data, loading, visualizationPeriod, changePeriod, hasFilteredObligated }) => {
		const [windowWidth, setWindowWidth] = useState(0);
		const [visualizationWidth, setVisualizationWidth] = useState(0);
		const sectionHr = useRef(null);
		const handleWindowResize = throttle(() => {
			const windowWidthLocal = window.innerWidth;
			if (windowWidthLocal !== windowWidth) {
				setWindowWidth(windowWidthLocal);
				setVisualizationWidth(sectionHr.current.offsetWidth);
			}
		}, 50);
		useEffect(() => {
			handleWindowResize();
			window.addEventListener("resize", handleWindowResize);
			return () => {
				window.removeEventListener("resize", handleWindowResize);
			};
		}, []);
		return /* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("div", {
			className: "results-visualization-time-section",
			id: "results-section-time",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(ws, {
					title: "Spending Over Time",
					titleTooltip: { component: false },
					descTooltip: { component: false }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("hr", {
					className: "results-divider",
					ref: (hr) => {
						sectionHr.current = hr;
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("div", {
					className: "visualization-top",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("div", {
						className: "visualization-description",
						children: /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("div", {
							className: "content",
							children: "Spot trends in spending by years or quarters. Filter your chosen results (at left) and watch this graph update automatically."
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("div", {
						className: "visualization-period",
						children: /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("div", {
							className: "content",
							children: /* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("ul", { children: [/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(AccountTimeVisualizationPeriodButton, {
								value: "year",
								label: "Years",
								active: visualizationPeriod === "year",
								changePeriod
							}) }), /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(AccountTimeVisualizationPeriodButton, {
								value: "quarter",
								label: "Quarters",
								active: visualizationPeriod === "quarter",
								changePeriod
							}) })] })
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(TimeVisualization, {
					loading,
					data,
					width: visualizationWidth,
					hasFilteredObligated
				})
			]
		});
	};
	AccountTimeVisualizationSection.propTypes = propTypes$11;
}));
//#endregion
//#region src/js/helpers/accountQuartersHelper.js
var fetchTasCategoryTotals, fetchTasBalanceTotals;
var init_accountQuartersHelper = __esmMin((() => {
	init_apiRequest();
	fetchTasCategoryTotals = (data) => apiRequest({
		url: "v1/tas/categories/quarters/total/",
		method: "post",
		data
	});
	fetchTasBalanceTotals = (data) => apiRequest({
		url: "v1/tas/balances/quarters/total/",
		method: "post",
		data
	});
}));
//#endregion
//#region src/js/models/v1/account/queries/queryBuilders/TimePeriodQuery.js
var startDateField, endDateField, reportingYearField, startDateFieldAward, endDateFieldAward, buildFYQuery, buildDateRangeQuery, buildFYAwardQuery, buildTimePeriodQuery, buildAwardTimePeriodQuery;
var init_TimePeriodQuery = __esmMin((() => {
	startDateField = "reporting_period_start";
	endDateField = "reporting_period_end";
	reportingYearField = "submission__reporting_fiscal_year";
	startDateFieldAward = "period_of_performance_start_date";
	endDateFieldAward = "period_of_performance_current_end_date";
	buildFYQuery = (range) => {
		return {
			field: reportingYearField,
			operation: "in",
			value: range
		};
	};
	buildDateRangeQuery = (range) => ({
		field: [startDateField, endDateField],
		operation: "range_intersect",
		value: range
	});
	buildFYAwardQuery = (range) => {
		const fyFilters = [];
		range.forEach((fy) => {
			const fyQuery = {
				field: [startDateFieldAward, endDateFieldAward],
				operation: "range_intersect",
				value: fy,
				value_format: "fy"
			};
			fyFilters.push(fyQuery);
		});
		return {
			combine_method: "OR",
			filters: fyFilters
		};
	};
	buildTimePeriodQuery = (type, range) => {
		if (type === "fy") return buildFYQuery(range);
		return buildDateRangeQuery(range);
	};
	buildAwardTimePeriodQuery = (type, range) => buildFYAwardQuery(range);
}));
//#endregion
//#region src/js/models/v1/account/queries/queryBuilders/ObjectClassQuery.js
var objectClassField, spendingOverTimeField$1, spendingByCategoryField$1, awardField$1, commonQuery$1, buildBalancesObjectClassQuery, buildCategoriesObjectClassQuery, buildAwardsObjectClassQuery;
var init_ObjectClassQuery = __esmMin((() => {
	objectClassField = "object_class__object_class";
	spendingOverTimeField$1 = `treasury_account_identifier__program_balances__${objectClassField}`;
	spendingByCategoryField$1 = objectClassField;
	awardField$1 = `financial_set__${objectClassField}`;
	commonQuery$1 = (field, values) => ({
		field,
		operation: "in",
		value: values
	});
	buildBalancesObjectClassQuery = (values) => commonQuery$1(spendingOverTimeField$1, values);
	buildCategoriesObjectClassQuery = (values) => commonQuery$1(spendingByCategoryField$1, values);
	buildAwardsObjectClassQuery = (values) => commonQuery$1(awardField$1, values);
}));
//#endregion
//#region src/js/models/v1/account/queries/queryBuilders/ProgramActivityQuery.js
var programActivityField, spendingOverTimeField, spendingByCategoryField, awardField, commonQuery, buildBalancesProgramActivityQuery, buildCategoriesProgramActivityQuery, buildAwardsProgramActivityQuery;
var init_ProgramActivityQuery = __esmMin((() => {
	init__programActivityTranslator();
	programActivityField = "program_activity__id";
	spendingOverTimeField = `treasury_account_identifier__program_balances__${programActivityField}`;
	spendingByCategoryField = programActivityField;
	awardField = `financial_set__${programActivityField}`;
	commonQuery = (field, values) => ({
		field,
		operation: "in",
		value: values
	});
	buildBalancesProgramActivityQuery = (values) => commonQuery(spendingOverTimeField, _translateFrontendIDToPrimaryKeys(values));
	buildCategoriesProgramActivityQuery = (values) => commonQuery(spendingByCategoryField, _translateFrontendIDToPrimaryKeys(values));
	buildAwardsProgramActivityQuery = (values) => commonQuery(awardField, _translateFrontendIDToPrimaryKeys(values));
}));
//#endregion
//#region src/js/models/v1/account/queries/AccountSearchOperation.js
/**
* AccountSearchOperation.js
* Created by Kevin Li 3/24/17
*/
var AccountSearchOperation;
var init_AccountSearchOperation = __esmMin((() => {
	init_TimePeriodQuery();
	init_ObjectClassQuery();
	init_ProgramActivityQuery();
	AccountSearchOperation = class {
		constructor(id = null) {
			this.accountId = null;
			if (id) this.accountId = id;
			this.dateType = "fy";
			this.fy = [];
			this.dateRange = [];
			this.objectClass = [];
			this.programActivity = [];
		}
		fromState(state) {
			this.dateType = state.dateType;
			if (this.dateType === "fy") {
				this.fy = state.fy.toArray();
				this.dateRange = [];
			} else {
				if (state.startDate && state.endDate) this.dateRange = [state.startDate, state.endDate];
				this.fy = [];
			}
			if (state.objectClass.count() > 0) this.objectClass = state.objectClass.toArray();
			else this.objectClass = [];
			if (state.programActivity.count() > 0) this.programActivity = state.programActivity.toArray();
			else this.programActivity = [];
		}
		commonParams() {
			const filters = [];
			if (this.fy.length > 0 || this.dateRange.length === 2) {
				let range = this.fy;
				if (this.dateType === "dr") range = this.dateRange;
				const timeFilter = buildTimePeriodQuery(this.dateType, range);
				filters.push(timeFilter);
			}
			return filters;
		}
		uniqueParams() {
			const filters = [];
			if (this.accountId) filters.push({
				field: "treasury_account__federal_account",
				operation: "equals",
				value: this.accountId
			});
			if (this.objectClass.length > 0) filters.push(buildCategoriesObjectClassQuery(this.objectClass));
			if (this.programActivity.length > 0) filters.push(buildCategoriesProgramActivityQuery(this.programActivity));
			return filters;
		}
		toParams() {
			return concat(this.commonParams(), this.uniqueParams());
		}
	};
}));
//#endregion
//#region src/js/models/v1/account/queries/AccountSearchBalanceOperation.js
var AccountSearchBalanceOperation;
var init_AccountSearchBalanceOperation = __esmMin((() => {
	init_AccountSearchOperation();
	init_ObjectClassQuery();
	init_ProgramActivityQuery();
	AccountSearchBalanceOperation = class extends AccountSearchOperation {
		uniqueParams() {
			const filters = [];
			if (this.accountId) filters.push({
				field: "treasury_account_identifier__federal_account_id",
				operation: "equals",
				value: this.accountId
			});
			if (this.objectClass.length > 0) filters.push(buildBalancesObjectClassQuery(this.objectClass));
			if (this.programActivity.length > 0) filters.push(buildBalancesProgramActivityQuery(this.programActivity));
			return filters;
		}
	};
}));
//#endregion
//#region src/js/models/v1/account/queries/AccountSearchCategoryOperation.js
var AccountSearchCategoryOperation;
var init_AccountSearchCategoryOperation = __esmMin((() => {
	init_AccountSearchOperation();
	init_ObjectClassQuery();
	init_ProgramActivityQuery();
	AccountSearchCategoryOperation = class extends AccountSearchOperation {
		uniqueParams() {
			const filters = [];
			if (this.accountId) filters.push({
				field: "treasury_account__federal_account_id",
				operation: "equals",
				value: this.accountId
			});
			if (this.objectClass.length > 0) {
				const ocFilter = buildCategoriesObjectClassQuery(this.objectClass);
				filters.push(ocFilter);
			}
			if (this.programActivity.length > 0) {
				const paFilter = buildCategoriesProgramActivityQuery(this.programActivity);
				filters.push(paFilter);
			}
			return filters;
		}
	};
}));
//#endregion
//#region src/js/containers/account/visualizations/AccountTimeVisualizationContainer.jsx
/**
* AccountTimeVisualizationContainer.jsx
* Created by Kevin Li 3/20/17
*/
var import_immutable, import_jsx_runtime$10, propTypes$10, VisData, AccountTimeVisualizationSectionContainer, AccountTimeVisualizationContainer_default;
var init_AccountTimeVisualizationContainer = __esmMin((() => {
	init_redux();
	init_es();
	init_axios();
	import_immutable = /* @__PURE__ */ __toESM(require_immutable(), 1);
	init_AccountTimeVisualizationSection();
	init_account();
	init_accountQuartersHelper();
	init_accountFilterActions();
	init_AccountSearchBalanceOperation();
	init_AccountSearchCategoryOperation();
	init_accountFields();
	import_jsx_runtime$10 = require_jsx_runtime();
	propTypes$10 = {
		reduxFilters: PropTypes.object,
		account: PropTypes.object
	};
	VisData = (0, import_immutable.Record)({
		xSeries: [],
		ySeries: [],
		allY: [],
		stacks: []
	});
	AccountTimeVisualizationSectionContainer = ({ reduxFilters, account }) => {
		const [loading, setLoading] = useState(true);
		const [data, setData] = useState(new VisData());
		const [visualizationPeriod, setVisualizationPeriod] = useState("quarter");
		const [hasFilteredObligated, setHasFilteredObligated] = useState(false);
		const baRef = useRef(null);
		const balanceRequests = useRef([]);
		const setUpdateStateAndFetch = () => {
			setHasFilteredObligated(reduxFilters.objectClass.count() > 0 || reduxFilters.programActivity.count() > 0);
		};
		const changePeriod = (period) => {
			if (visualizationPeriod !== period) setVisualizationPeriod(period);
		};
		const parseBalances = (res) => {
			const xSeries = [];
			const ySeries = [];
			const allY = [];
			const yData = {};
			const groupLabels = [];
			res.forEach((balance, balanceIndex) => {
				const type = balanceRequests.current[balanceIndex].type;
				balance.data.results.forEach((group) => {
					let groupLabel = `${group.item}`;
					if (visualizationPeriod === "quarter") groupLabel = `${group.item} Q${group.submission__reporting_fiscal_quarter}`;
					if (!yData[groupLabel]) {
						groupLabels.push(groupLabel);
						if (hasFilteredObligated) yData[groupLabel] = {
							obligatedFiltered: 0,
							outlay: 0,
							budgetAuthority: 0,
							unobligated: 0
						};
						else yData[groupLabel] = {
							obligated: 0,
							outlay: 0,
							budgetAuthority: 0,
							unobligated: 0
						};
					}
					yData[groupLabel][type] = parseFloat(group.aggregate);
				});
			});
			groupLabels.sort();
			if (baRef.current === null) baRef.current = Object.fromEntries(groupLabels.map((key) => [key.replace(/\s/g, ""), 0]));
			groupLabels.forEach((group) => {
				xSeries.push(`${group}`);
				if (hasFilteredObligated) {
					const unobligated = yData[group].unobligated;
					const obligatedFiltered = yData[group].obligatedFiltered;
					const outlay = yData[group].outlay;
					let totalObligations = yData[group].obligatedFiltered;
					if (baRef.current?.[group.replace(/\s/g, "")]) totalObligations = baRef.current[group.replace(/\s/g, "")].totalObligations;
					const obligatedOther = totalObligations - obligatedFiltered;
					const period = {
						obligatedFiltered: {
							bottom: 0,
							top: obligatedFiltered,
							value: obligatedFiltered,
							description: "Obligations Incurred (Filtered)"
						},
						obligatedOther: {
							bottom: obligatedFiltered,
							top: totalObligations,
							value: obligatedOther,
							description: "Obligations Incurred (Other)"
						},
						unobligated: {
							bottom: totalObligations,
							top: totalObligations + unobligated,
							value: unobligated,
							description: "Unobligated Balance"
						},
						outlay: {
							bottom: outlay,
							top: outlay,
							value: outlay,
							description: "Outlay"
						}
					};
					ySeries.push(period);
					allY.push(obligatedFiltered);
				} else {
					const period = {
						obligated: {
							bottom: 0,
							top: yData[group].obligated,
							value: yData[group].obligated,
							description: "Obligations Incurred"
						},
						unobligated: {
							bottom: yData[group].obligated,
							top: yData[group].unobligated + yData[group].obligated,
							value: yData[group].unobligated,
							description: "Unobligated Balance"
						},
						outlay: {
							bottom: yData[group].outlay,
							top: yData[group].outlay,
							value: yData[group].outlay,
							description: "Outlay"
						}
					};
					if (baRef.current?.[group.replace(/\s/g, "")]) baRef.current[group.replace(/\s/g, "")] = {
						budgetAuthority: yData[group].budgetAuthority,
						totalObligations: yData[group].obligated
					};
					else baRef.current = {
						...baRef.current,
						[group.replace(/\s/g, "")]: {
							budgetAuthority: yData[group].budgetAuthority,
							totalObligations: yData[group].obligated
						}
					};
					ySeries.push(period);
					allY.push(yData[group].obligated);
				}
				let baToPush = yData[group].budgetAuthority;
				if (baRef.current) baToPush = baRef.current[group.replace(/\s/g, "")].budgetAuthority;
				allY.push(yData[group].outlay);
				allY.push(baToPush);
				allY.push(yData[group].unobligated);
			});
			let stacks = [
				{
					name: "outlay",
					type: "line",
					color: "#fba302"
				},
				{
					name: "obligated",
					type: "bar",
					color: "#5c7480"
				},
				{
					name: "unobligated",
					type: "bar",
					color: "#a0bac4"
				}
			];
			if (hasFilteredObligated) stacks = [
				{
					name: "outlay",
					type: "line",
					color: "#fba302"
				},
				{
					name: "obligatedFiltered",
					type: "bar",
					color: "#2c4452"
				},
				{
					name: "obligatedOther",
					type: "bar",
					color: "#5c7480"
				},
				{
					name: "unobligated",
					type: "bar",
					color: "#a0bac4"
				}
			];
			const visualizationData = new VisData({
				xSeries,
				ySeries,
				allY,
				stacks
			});
			setData(visualizationData);
			setLoading(false);
		};
		const fetchData = () => {
			if (balanceRequests.current.length > 0) {
				balanceRequests.current.forEach((request) => {
					request.cancel();
				});
				balanceRequests.current = [];
			}
			setLoading(true);
			const searchOperation = new AccountSearchBalanceOperation(account.id);
			searchOperation.fromState(reduxFilters);
			const balanceFilters = searchOperation.toParams();
			let filters = balanceFilters;
			const requests = [];
			const promises = [];
			const categorySearchOperation = new AccountSearchCategoryOperation(account.id);
			categorySearchOperation.fromState(reduxFilters);
			const categoryFilters = categorySearchOperation.toParams();
			if (visualizationPeriod === "quarter") if (hasFilteredObligated) {
				Object.keys(balanceFieldsFiltered).forEach((balanceType) => {
					filters = categoryFilters;
					const request = fetchTasCategoryTotals({
						filters,
						group: ["submission__reporting_fiscal_year", "submission__reporting_fiscal_quarter"],
						field: balanceFieldsFiltered[balanceType],
						aggregate: "sum",
						order: ["submission__reporting_fiscal_year"],
						auditTrail: `Spending over Time (quarters) - obligated filter - ${balanceType}`
					});
					request.type = balanceType;
					requests.push(request);
					promises.push(request.promise);
				});
				Object.keys(balanceFieldsNonfiltered).forEach((balanceType) => {
					filters = balanceFilters;
					const request = fetchTasBalanceTotals({
						filters,
						group: ["submission__reporting_fiscal_year", "submission__reporting_fiscal_quarter"],
						field: balanceFieldsNonfiltered[balanceType],
						aggregate: "sum",
						order: ["submission__reporting_fiscal_year"],
						auditTrail: `Spending over Time (quarters) - obligated filter - ${balanceType}`
					});
					request.type = balanceType;
					requests.push(request);
					promises.push(request.promise);
				});
			} else Object.keys(balanceFields).forEach((balanceType) => {
				const request = fetchTasBalanceTotals({
					filters,
					group: ["submission__reporting_fiscal_year", "submission__reporting_fiscal_quarter"],
					field: balanceFields[balanceType],
					aggregate: "sum",
					order: ["submission__reporting_fiscal_year"],
					auditTrail: `Spending over Time (quarters) - non-obligated filter - ${balanceType}`
				});
				request.type = balanceType;
				requests.push(request);
				promises.push(request.promise);
			});
			else if (visualizationPeriod === "year") if (hasFilteredObligated) {
				Object.keys(balanceFieldsFiltered).forEach((balanceType) => {
					filters = categoryFilters;
					const request = fetchTasCategoryTotals$1({
						filters,
						group: ["submission__reporting_fiscal_year", "submission__reporting_fiscal_quarter"],
						field: balanceFieldsFiltered[balanceType],
						aggregate: "",
						order: ["submission__reporting_fiscal_year", "submission__reporting_fiscal_quarter"],
						auditTrail: `Spending over Time (years) - obligated filter - ${balanceType}`
					});
					request.type = balanceType;
					requests.push(request);
					promises.push(request.promise);
				});
				Object.keys(balanceFieldsNonfiltered).forEach((balanceType) => {
					filters = balanceFilters;
					const request = fetchTasBalanceTotals$1({
						filters,
						group: ["submission__reporting_fiscal_year", "submission__reporting_fiscal_quarter"],
						field: balanceFieldsNonfiltered[balanceType],
						aggregate: "",
						order: ["submission__reporting_fiscal_year", "submission__reporting_fiscal_quarter"],
						auditTrail: `Spending over Time (years) - obligated filter - ${balanceType}`
					});
					request.type = balanceType;
					requests.push(request);
					promises.push(request.promise);
				});
			} else Object.keys(balanceFields).forEach((balanceType) => {
				const request = fetchTasBalanceTotals$1({
					filters,
					group: ["submission__reporting_fiscal_year", "submission__reporting_fiscal_quarter"],
					field: balanceFields[balanceType],
					aggregate: "",
					order: ["submission__reporting_fiscal_year", "submission__reporting_fiscal_quarter"],
					auditTrail: `Spending over Time (years) - non-obligated filter - ${balanceType}`
				});
				request.type = balanceType;
				requests.push(request);
				promises.push(request.promise);
			});
			balanceRequests.current = requests;
			Promise.all(promises).then((res) => {
				parseBalances(res);
				setLoading(false);
			}).catch((err) => {
				if (!isCancel(err)) {
					setLoading(false);
					console.log(err);
				}
			});
		};
		useEffect(() => {
			setUpdateStateAndFetch();
		}, [reduxFilters, account.id]);
		useEffect(() => {
			fetchData();
		}, [
			hasFilteredObligated,
			visualizationPeriod,
			reduxFilters
		]);
		return /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(AccountTimeVisualizationSection, {
			data,
			loading,
			visualizationPeriod,
			changePeriod,
			hasFilteredObligated
		});
	};
	AccountTimeVisualizationSectionContainer.propTypes = propTypes$10;
	AccountTimeVisualizationContainer_default = connect_default((state) => ({
		reduxFilters: state.account.filters,
		account: state.account.account
	}), (dispatch) => bindActionCreators(accountFilterActions_exports, dispatch))(AccountTimeVisualizationSectionContainer);
}));
//#endregion
//#region src/js/components/account/visualizations/rank/RankVisualization.jsx
var import_jsx_runtime$9, propTypes$9, RankVisualization;
var init_RankVisualization = __esmMin((() => {
	init_index_es();
	init_SpendingByCategoriesChart();
	import_jsx_runtime$9 = require_jsx_runtime();
	propTypes$9 = {
		labelSeries: PropTypes.array,
		dataSeries: PropTypes.array,
		linkSeries: PropTypes.array,
		descriptions: PropTypes.array,
		loading: PropTypes.bool,
		error: PropTypes.bool,
		industryCodeError: PropTypes.bool,
		recipientError: PropTypes.bool
	};
	RankVisualization = ({ labelSeries = [], dataSeries = [], linkSeries = [], descriptions = [], loading = true, error = false, industryCodeError, recipientError }) => {
		let chart = /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(Go, {});
		if (loading) chart = /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(Wo, {});
		else if (error) {
			chart = /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(fo, { description: "An error has occurred." });
			if (industryCodeError) chart = /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(fo, { description: "Industry codes are unavailable for Sub-Awards." });
			else if (recipientError) chart = /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(fo, { description: "Paging to 10,000 records and above is not available for Spending by Recipient." });
		} else if (dataSeries.length > 0) chart = /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(SpendingByCategoriesChart, {
			dataSeries,
			labelSeries,
			descriptions,
			linkSeries
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("section", {
			className: "results-visualization-rank-container",
			"aria-label": "Spending by Category",
			children: chart
		});
	};
	RankVisualization.propTypes = propTypes$9;
}));
//#endregion
//#region src/js/components/account/visualizations/rank/RankVisualizationScopeButton.jsx
var import_jsx_runtime$8, propTypes$8, RankVisualizationScopeButton;
var init_RankVisualizationScopeButton = __esmMin((() => {
	import_jsx_runtime$8 = require_jsx_runtime();
	propTypes$8 = {
		active: PropTypes.bool,
		value: PropTypes.string,
		label: PropTypes.string,
		disabled: PropTypes.bool,
		changeScope: PropTypes.func
	};
	RankVisualizationScopeButton = ({ active, value, label, disabled = false, changeScope }) => {
		let activeClass = "";
		let description = `Rank results by ${label.toLowerCase()}`;
		if (active) activeClass = "active";
		if (active) description += " (currently selected)";
		const clickedButton = () => {
			changeScope(value);
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("button", {
			className: `visualization-scope__button ${activeClass}`,
			value,
			title: description,
			"aria-label": description,
			onClick: clickedButton,
			disabled,
			children: label
		});
	};
	RankVisualizationScopeButton.propTypes = propTypes$8;
}));
//#endregion
//#region src/js/components/account/visualizations/rank/AccountRankVisualizationSection.jsx
/**
* AccountRankVisualizationSection.jsx
* Created by Kevin Li 3/22/17
*/
var import_jsx_runtime$7, propTypes$7, AccountRankVisualizationSection;
var init_AccountRankVisualizationSection = __esmMin((() => {
	init_index_es();
	init_Icons();
	init_RankVisualization();
	init_RankVisualizationScopeButton();
	import_jsx_runtime$7 = require_jsx_runtime();
	propTypes$7 = {
		labelSeries: PropTypes.array,
		dataSeries: PropTypes.array,
		descriptions: PropTypes.array,
		categoryScope: PropTypes.string,
		hasNextPage: PropTypes.bool,
		hasPreviousPage: PropTypes.bool,
		loading: PropTypes.bool,
		error: PropTypes.bool,
		changeScope: PropTypes.func,
		nextPage: PropTypes.func,
		previousPage: PropTypes.func
	};
	AccountRankVisualizationSection = ({ labelSeries, dataSeries, descriptions, categoryScope, hasNextPage, hasPreviousPage, loading, error, changeScope, nextPage, previousPage }) => {
		const [windowWidth, setWindowWidth] = useState(0);
		const [visualizationWidth, setVisualizationWidth] = useState(0);
		const [labelWidth, setLabelWidth] = useState(0);
		const sectionHr = useRef(null);
		const disableNext = !hasNextPage;
		const disablePrev = !hasPreviousPage;
		let hidePager = "";
		if (disableNext && disablePrev || loading) hidePager = "hide";
		const handleWindowResize = throttle(() => {
			const windowWidthLocal = window.innerWidth;
			if (windowWidthLocal !== windowWidth) {
				setWindowWidth(windowWidthLocal);
				setVisualizationWidth(sectionHr.current.offsetWidth);
				setLabelWidth(min([sectionHr.current.offsetWidth / 3, 270]));
			}
		}, 50);
		useEffect(() => {
			handleWindowResize();
			window.addEventListener("resize", handleWindowResize);
			return () => {
				window.removeEventListener("resize", handleWindowResize);
			};
		}, []);
		return /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
			className: "results-visualization-rank-section",
			id: "results-section-rank",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(ws, {
					title: "Spending by Category",
					titleTooltip: { component: false },
					descTooltip: { component: false }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("hr", {
					className: "results-divider",
					ref: (hr) => {
						sectionHr.current = hr;
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
					className: "visualization-top",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
						className: "visualization-description",
						children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
							className: "content",
							children: "View a list of the top categories from highest to lowest. Filter your results more (at left) and watch this graph update automatically."
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
						className: "visualization-period",
						children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
							className: "content",
							children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("ul", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(RankVisualizationScopeButton, {
									value: "programActivity",
									label: "Program Activity",
									active: categoryScope === "programActivity",
									changeScope
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(RankVisualizationScopeButton, {
									value: "objectClass",
									label: "Object Class",
									active: categoryScope === "objectClass",
									changeScope
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(RankVisualizationScopeButton, {
									value: "tas",
									label: "Treasury Account Symbol (TAS)",
									active: categoryScope === "tas",
									changeScope
								}) })
							] })
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(RankVisualization, {
					labelSeries,
					dataSeries,
					descriptions,
					loading,
					error,
					width: visualizationWidth,
					labelWidth
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
					className: `visualization-pager-container ${hidePager}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("button", {
						className: "visualization-pager",
						title: "Show previous five",
						"aria-label": "Show previous five",
						disabled: disablePrev,
						onClick: previousPage,
						children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
							className: "pager-content",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
								className: "icon",
								children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(AngleLeft, { alt: "Show previous five" })
							}), /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
								className: "pager-label",
								children: "Show previous five"
							})]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("button", {
						className: "visualization-pager",
						title: "Show next five",
						"aria-label": "Show next five",
						disabled: disableNext,
						onClick: nextPage,
						children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
							className: "pager-content",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
								className: "pager-label next",
								children: "Show next five"
							}), /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
								className: "icon",
								children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(AngleRight, { alt: "Show next five" })
							})]
						})
					})]
				})
			]
		});
	};
	AccountRankVisualizationSection.propTypes = propTypes$7;
}));
//#endregion
//#region src/js/containers/account/visualizations/AccountRankVisualizationContainer.jsx
/**
* AccountRankVisualizationContainer.jsx
* Created by Kevin Li 2/9/17
*/
var import_jsx_runtime$6, propTypes$6, AccountRankVisualizationContainer, AccountRankVisualizationContainer_default;
var init_AccountRankVisualizationContainer = __esmMin((() => {
	init_redux();
	init_es();
	init_axios();
	init_accountFields();
	init_AccountRankVisualizationSection();
	init_accountFilterActions();
	init_account();
	init_moneyFormatter();
	init_AccountSearchOperation();
	import_jsx_runtime$6 = require_jsx_runtime();
	propTypes$6 = {
		reduxFilters: PropTypes.object,
		account: PropTypes.object
	};
	AccountRankVisualizationContainer = ({ reduxFilters, account }) => {
		const [loading, setLoading] = useState(true);
		const [error, setError] = useState(false);
		const [labelSeries, setLabelSeries] = useState([]);
		const [dataSeries, setDataSeries] = useState([]);
		const [descriptions, setDescriptions] = useState([]);
		const [page, setPage] = useState(1);
		const [hasNextPage, setHasNextPage] = useState(false);
		const [hasPreviousPage, setHasPreviousPage] = useState(false);
		const [categoryScope, setCategoryScope] = useState("programActivity");
		const apiRequest = useRef(null);
		const changeScope = (scope) => {
			setCategoryScope(scope);
			setPage(1);
			setHasNextPage(false);
		};
		const newSearch = () => {
			setPage(1);
			setHasNextPage(false);
		};
		const nextPage = () => {
			if (!hasNextPage) return;
			setPage(page + 1);
		};
		const previousPage = () => {
			const prevPage = max([1, page - 1]);
			setPage(prevPage);
		};
		const parseData = (data) => {
			const labelSeriesLocal = [];
			const dataSeriesLocal = [];
			const descriptionsLocal = [];
			const labelField = categoryLabelFields[categoryScope];
			data.results.forEach((item) => {
				const adjustedValue = parseFloat(item.aggregate);
				labelSeriesLocal.push(item[labelField]);
				dataSeriesLocal.push(parseFloat(adjustedValue));
				const description = `Obligated balance for ${item[labelField]}: \
${formatMoney(adjustedValue)}`;
				descriptionsLocal.push(description);
			});
			setLabelSeries(labelSeriesLocal);
			setDataSeries(dataSeriesLocal);
			setDescriptions(descriptionsLocal);
			setLoading(false);
			setHasNextPage(data.page_metadata.has_next_page);
			setHasPreviousPage(data.page_metadata.has_previous_page);
		};
		const fetchData = () => {
			if (apiRequest.current) apiRequest.current.cancel();
			setLoading(true);
			const searchOperation = new AccountSearchOperation(account.id);
			apiRequest.current = fetchTasCategoryTotals$1({
				group: categoryLabelFields[categoryScope],
				field: "obligations_incurred_by_program_object_class_cpe",
				aggregate: "sum",
				order: ["-aggregate"],
				filters: searchOperation.toParams(),
				page,
				limit: 5,
				auditTrail: `Rank vis - ${categoryScope}`
			});
			apiRequest.current.promise.then((res) => {
				apiRequest.current = null;
				setError(false);
				setLoading(false);
				parseData(res.data);
			}).catch((err) => {
				if (!isCancel(err)) {
					setError(true);
					setLoading(false);
					apiRequest.current = null;
				}
			});
		};
		useEffect(() => {
			newSearch();
		}, [reduxFilters, account.id]);
		useEffect(() => {
			fetchData();
		}, [page, categoryScope]);
		return /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(AccountRankVisualizationSection, {
			labelSeries,
			dataSeries,
			descriptions,
			categoryScope,
			hasNextPage,
			hasPreviousPage,
			loading,
			error,
			changeScope,
			nextPage,
			previousPage
		});
	};
	AccountRankVisualizationContainer.propTypes = propTypes$6;
	AccountRankVisualizationContainer_default = connect_default((state) => ({
		reduxFilters: state.account.filters,
		account: state.account.account
	}), (dispatch) => bindActionCreators(accountFilterActions_exports, dispatch))(AccountRankVisualizationContainer);
}));
//#endregion
//#region src/js/dataMapping/search/filterFields.js
var filterFields_exports = /* @__PURE__ */ __exportAll({
	accountAwardsFields: () => accountAwardsFields,
	awardFields: () => awardFields,
	tasCategoriesFields: () => tasCategoriesFields,
	transactionFields: () => transactionFields
});
var awardFields, tasCategoriesFields, transactionFields, accountAwardsFields;
var init_filterFields = __esmMin((() => {
	awardFields = {
		startDate: "period_of_performance_start_date",
		endDate: "period_of_performance_current_end_date",
		keyword: "description",
		locationScope: "place_of_performance__location_country_code",
		location: "place_of_performance__location_id",
		awardType: "type",
		awardId: "id",
		awardAmount: "total_obligation",
		recipientId: "recipient__legal_entity_id",
		recipientLocationScope: "recipient__location__location_country_code",
		recipientLocation: "recipient__location__location_id",
		recipientName: "recipient__recipient_name",
		recipientType: "recipient__business_categories",
		fundingAgency: {
			toptier: "funding_agency__toptier_agency__name",
			subtier: "funding_agency__subtier_agency__name"
		},
		awardingAgency: {
			toptier: "awarding_agency__toptier_agency__name",
			subtier: "awarding_agency__subtier_agency__name"
		},
		objectClass: "financial_set__object_class__object_class",
		budgetFunctionTitle: "financial_set__treasury_account__budget_function_title",
		budgetSubfunctionTitle: "financial_set__treasury_account__budget_subfunction_title",
		federalAccount: "financial_set__treasury_account__federal_account_id",
		cfdaNumber: "latest_transaction__assistance_data__cfda__program_number",
		cfdaTitle: "latest_transaction__assistance_data__cfda__program_title",
		naics: "latest_transaction__contract_data__naics",
		naicsDescription: "latest_transaction__contract_data__naics_description",
		psc: "latest_transaction__contract_data__product_or_service_code",
		pricingType: "latest_transaction__contract_data__type_of_contract_pricing",
		setAside: "latest_transaction__contract_data__type_set_aside",
		extentCompeted: "latest_transaction__contract_data__extent_competed"
	};
	tasCategoriesFields = {
		startDate: "reporting_period_start",
		endDate: "reporting_period_end",
		budgetFunctionTitle: "treasury_account__budget_function_title",
		budgetSubfunctionTitle: "treasury_account__budget_subfunction_title",
		objectClass: "object_class__object_class",
		fundingAgency: "treasury_account__agency_id",
		fundingAgencyFREC: "treasury_account__fr_entity_code",
		federalAccount: "treasury_account__federal_account_id"
	};
	transactionFields = {
		date: "action_date",
		locationScope: "place_of_performance__location_country_code",
		location: "place_of_performance__location_id",
		fundingAgencyCGAC: "award__financial_set__treasury_account__agency_id",
		fundingAgency: {
			toptier: "funding_agency__toptier_agency__name",
			subtier: "funding_agency__subtier_agency__name"
		},
		awardingAgency: {
			toptier: "awarding_agency__toptier_agency__name",
			subtier: "awarding_agency__subtier_agency__name"
		},
		recipientId: "recipient__legal_entity_id",
		recipientLocationScope: "recipient__location__location_country_code",
		recipientLocation: "recipient__location__location_id",
		recipientName: "recipient__recipient_name",
		recipientType: "recipient__business_categories",
		awardType: "type",
		awardId: "award_id",
		awardAmount: "federal_action_obligation",
		objectClass: "award__financial_set__object_class__object_class",
		budgetFunctionTitle: "award__financial_set__treasury_account__budget_function_title",
		budgetSubfunctionTitle: "award__financial_set__treasury_account__budget_subfunction_title",
		federalAccount: "award__financial_set__treasury_account__federal_account_id",
		cfdaNumber: "assistance_data__cfda__program_number",
		cfdaTitle: "assistance_data__cfda__program_title",
		naics: "contract_data__naics",
		naicsDescription: "contract_data__naics_description",
		psc: "contract_data__product_or_service_code"
	};
	accountAwardsFields = {
		startDate: "award__period_of_performance_start_date",
		endDate: "award__period_of_performance_current_end_date",
		locationScope: "award__place_of_performance__location_country_code",
		location: "award__place_of_performance__location_id",
		awardType: "award__type",
		awardId: "award__id",
		awardAmount: "award__total_obligation",
		recipientId: "award__recipient__legal_entity_id",
		recipientLocationScope: "award__recipient__location__location_country_code",
		recipientLocation: "award__recipient__location__location_id",
		recipientName: "award__recipient__recipient_name",
		recipientType: "award__recipient__business_categories",
		fundingAgency: {
			toptier: "award__funding_agency__toptier_agency__name",
			subtier: "award__funding_agency__subtier_agency__name"
		},
		awardingAgency: {
			toptier: "award__awarding_agency__toptier_agency__name",
			subtier: "award__awarding_agency__subtier_agency__name"
		},
		objectClass: "object_class__object_class",
		budgetFunctionTitle: "treasury_account__budget_function_title",
		budgetSubfunctionTitle: "treasury_account__budget_subfunction_title",
		federalAccount: "treasury_account__federal_account_id",
		cfdaNumber: "award__transaction__assistance_data__cfda__program_number",
		cfdaTitle: "award__transaction__assistance_data__cfda__program_title",
		naics: "award__transaction__contract_data__naics",
		naicsDescription: "award__transaction__contract_data__naics_description",
		psc: "award__transaction__contract_data__product_or_service_code",
		pricingType: "award__latest_transaction__contract_data__type_of_contract_pricing",
		setAside: "award__latest_transaction__contract_data__type_set_aside",
		extentCompeted: "award__latest_transaction__contract_data__extent_competed"
	};
}));
//#endregion
//#region src/js/models/v1/search/queryBuilders/AwardTypeQuery.js
var buildFieldQuery, buildQuery;
var init_AwardTypeQuery = __esmMin((() => {
	init_filterFields();
	buildFieldQuery = (field, values) => ({
		field,
		operation: "in",
		value: values
	});
	buildQuery = (awardType, searchContext = "award") => {
		let awardQuery = {};
		const fieldName = filterFields_exports[`${searchContext}Fields`].awardType;
		awardQuery = buildFieldQuery(fieldName, awardType);
		return awardQuery;
	};
}));
//#endregion
//#region src/js/models/v1/account/queries/AccountAwardSearchOperation.js
/**
* AccountAwardSearchOperation.js
* Created by Kevin Li 4/13/17
*/
var AccountAwardSearchOperation;
var init_AccountAwardSearchOperation = __esmMin((() => {
	init_AwardTypeQuery();
	init_fiscalYearHelper();
	init_TimePeriodQuery();
	init_ObjectClassQuery();
	init_ProgramActivityQuery();
	AccountAwardSearchOperation = class {
		constructor(id = null) {
			this.accountId = null;
			if (id) this.accountId = id;
			this.dateType = "fy";
			this.fy = [];
			this.dateRange = [];
			this.objectClass = [];
			this.programActivity = [];
			this.awardType = [];
		}
		fromState(state) {
			this.dateType = state.dateType;
			if (this.dateType === "fy") {
				this.fy = state.fy.toArray();
				this.dateRange = [];
			} else {
				this.dateRange = [state.startDate, state.endDate];
				this.fy = [];
			}
			this.objectClass = state.objectClass.toArray();
			this.programActivity = state.programActivity.toArray();
		}
		commonParams() {
			const filters = [];
			let dateRange = this.fy;
			if (this.dateType === "dr") dateRange = this.dateRange;
			if (dateRange.length > 0) filters.push(buildAwardTimePeriodQuery(this.dateType, dateRange));
			if (this.objectClass.length > 0) filters.push(buildAwardsObjectClassQuery(this.objectClass));
			if (this.programActivity.length > 0) filters.push(buildAwardsProgramActivityQuery(this.programActivity));
			if (this.awardType.length > 0) {
				const typeFilter = buildQuery(this.awardType);
				filters.push(typeFilter);
			}
			filters.push({
				field: "financial_set__treasury_account__federal_account",
				operation: "equals",
				value: this.accountId
			});
			return filters;
		}
		uniqueParams() {
			return [];
		}
		toParams() {
			return concat(this.commonParams(), this.uniqueParams());
		}
		timePeriodFormatted(fiscalYears) {
			let timePeriod = fiscalYears.sort();
			if (!timePeriod.length) return null;
			const [startDate, endDate] = convertFYToDateRange(timePeriod[0]);
			if (timePeriod.length === 3) timePeriod = [{
				start_date: startDate,
				end_date: convertFYToDateRange(timePeriod[2])[1]
			}];
			else if (timePeriod.length === 2) {
				const numberedTimePeriod = timePeriod.map((fy) => parseInt(fy, 10));
				if (numberedTimePeriod[1] - numberedTimePeriod[0] === 1) timePeriod = [{
					start_date: startDate,
					end_date: convertFYToDateRange(timePeriod[1])[1]
				}];
				else timePeriod = [{
					start_date: startDate,
					end_date: endDate
				}, {
					start_date: convertFYToDateRange(timePeriod[1])[0],
					end_date: convertFYToDateRange(timePeriod[1])[1]
				}];
			} else timePeriod = [{
				start_date: convertFYToDateRange(timePeriod[0])[0],
				end_date: convertFYToDateRange(timePeriod[0])[1]
			}];
			return timePeriod;
		}
		spendingByAwardTableParams({ account, filters }) {
			const tasCodes = [{
				aid: account.agency_identifier,
				main: account.main_account_code
			}];
			const timePeriod = this.timePeriodFormatted(filters.fy.toArray());
			const objectClass = filters.objectClass.toArray();
			const programActivity = map(buildAwardsProgramActivityQuery(this.programActivity).value, (pa) => parseInt(pa, 10));
			const awardTableParams = {
				filters: { tas_codes: tasCodes },
				spending_level: "awards"
			};
			if (timePeriod) awardTableParams.filters.time_period = timePeriod;
			if (objectClass.length) awardTableParams.filters.object_class = objectClass;
			if (programActivity.length) awardTableParams.filters.program_activity = programActivity;
			return awardTableParams;
		}
	};
}));
//#endregion
//#region src/js/containers/account/awards/AccountAwardsContainer.jsx
/**
* AccountAwardsContainer.jsx
* Created by Kevin Li 4/13/17
*/
var import_jsx_runtime$5, propTypes$5, AccountAwardsContainer, AccountAwardsContainer_default;
var init_AccountAwardsContainer = __esmMin((() => {
	init_es();
	init_axios();
	init_index_es();
	init_textMeasurement();
	init_awardTableColumnTypes();
	init_awardType();
	init_searchHelper();
	init_awardTableColumns();
	init_AccountAwardSearchOperation();
	init_ResultsTableSection();
	init_table();
	import_jsx_runtime$5 = require_jsx_runtime();
	propTypes$5 = {
		account: PropTypes.object,
		filters: PropTypes.object,
		spendingLevel: PropTypes.string
	};
	AccountAwardsContainer = ({ account, filters, spendingLevel = "awards" }) => {
		const [tableInstance, setTableInstance] = useState(`${uniqueId()}`);
		const [columns, setColumns] = useState({});
		const [sort, setSort] = useState({
			field: "Award Amount",
			direction: "desc"
		});
		const [counts, setCounts] = useState({});
		const [tableType, setTableType] = useState("contracts");
		const [inFlight, setInFlight] = useState(true);
		const [lastPage, setLastPage] = useState(true);
		const [page, setPage] = useState(1);
		const [results, setResults] = useState([]);
		const [error, setError] = useState(false);
		const [total, setTotal] = useState(0);
		const [resultLimit, setResultLimit] = useState(10);
		const [isLoadingNextPage, setLoadNextPage] = useState(false);
		const [searchParams, setSearchParams] = useState(new AccountAwardSearchOperation());
		const tabCountRequest = useRef(null);
		const searchRequest = useRef(null);
		const performSearch = useCallback((newSearch = false) => {
			if (searchRequest.current) searchRequest.current.cancel();
			const searchOperation = new AccountAwardSearchOperation(account.id);
			searchOperation.fromState(filters);
			searchOperation.awardType = awardTypeGroups[tableType];
			const newParams = searchOperation.spendingByAwardTableParams({
				account,
				filters
			});
			setInFlight(true);
			setError(false);
			let pageNumber = page;
			if (newSearch) pageNumber = 1;
			newParams.filters.award_type_codes = awardTypeGroups[tableType];
			const requestFields = [];
			columns[tableType].visibleOrder.forEach((field) => {
				if (!requestFields.includes(field)) requestFields.push(field);
			});
			requestFields.push("recipient_id");
			newParams.fields = requestFields;
			newParams.limit = resultLimit;
			newParams.order = sort.direction;
			newParams.page = pageNumber;
			newParams.sort = sort.field;
			searchRequest.current = performSpendingByAwardSearch(newParams);
			searchRequest.current.promise.then((res) => {
				const newState = {
					inFlight: false,
					accountAwardsPage: true
				};
				newState.results = res.data.results.map((result) => ({
					...result,
					generated_internal_id: encodeURIComponent(result.generated_internal_id)
				}));
				if (newSearch) setTotal(newState.results.length);
				searchRequest.current = null;
				newState.page = res.data.page_metadata.page;
				newState.lastPage = !res.data.page_metadata.hasNext;
				setInFlight(newState.inFlight);
				setTableInstance(newState.tableInstance);
				setResults(newState.results);
				setPage(newState.page);
				setLastPage(newState.lastPage);
			}).catch((err) => {
				if (!isCancel(err)) {
					setInFlight(false);
					setError(true);
					searchRequest.current = null;
					console.log(err);
				}
			});
		});
		const updateFilters = () => {
			const newSearch = new AccountAwardSearchOperation();
			newSearch.fromState(filters);
			setSearchParams(newSearch);
			setPage(1);
			performSearch(true);
		};
		const switchTab = (tab) => {
			const newState = { tableType: tab };
			const currentSortField = sort.field;
			const availableFields = columns[tab].data;
			if (!Object.prototype.hasOwnProperty.call(availableFields, currentSortField)) {
				const field = defaultSort(tab);
				const fieldType = awardTableColumnTypes[field];
				let direction = "desc";
				if (fieldType === "number") direction = "asc";
				newState.sort = {
					field,
					direction
				};
			}
			setTableType(tab);
			if (newState.sort) setSort(Object.assign(newState.sort));
		};
		const parseTabCounts = (data) => {
			const awardCounts = data.results;
			let firstAvailable = "";
			let i = 0;
			const availableTabs = spendingLevel === "subawards" ? subTypes : tableTypes;
			while (firstAvailable === "" && i < availableTabs.length) {
				const tableTypeTemp = availableTabs[i].internal;
				if (awardCounts[tableTypeTemp] > 0) firstAvailable = tableTypeTemp;
				i += 1;
			}
			if (firstAvailable === "") firstAvailable = availableTabs[0].internal;
			setCounts(Object.assign({}, counts, awardCounts));
			switchTab(firstAvailable);
			updateFilters();
		};
		const pickDefaultTab = () => {
			if (tabCountRequest.current) tabCountRequest.current.cancel();
			setInFlight(true);
			const searchOperation = new AccountAwardSearchOperation(account.id);
			searchOperation.fromState(filters);
			searchOperation.awardType = awardTypeGroups[tableType];
			const filtersLocal = { ...searchOperation.spendingByAwardTableParams({
				account,
				filters
			}).filters };
			tabCountRequest.current = performSpendingByAwardTabCountSearch({ filters: filtersLocal });
			tabCountRequest.current.promise.then((res) => {
				parseTabCounts(res.data);
				tabCountRequest.current = null;
			}).catch((err) => {
				if (!isCancel(err)) {
					setInFlight(false);
					setError(true);
					tabCountRequest.current = null;
					console.log(err);
				}
			});
		};
		const createColumn = (col) => {
			const direction = "desc";
			const width = col.customWidth || measureTableHeader(col.displayName || col.title);
			return {
				columnName: col.title,
				displayName: col.displayName || col.title,
				subtitle: col.subtitle || "",
				width,
				background: col.background || "",
				defaultDirection: direction,
				right: col.right || false
			};
		};
		const loadColumns = () => {
			const columnsTemp = tableTypes.concat(subTypes).reduce((cols, type) => {
				const visibleColumns = defaultColumns(type.internal).map((data) => data.title);
				const parsedColumns = defaultColumns(type.internal).reduce((parsedCols, data) => Object.assign({}, parsedCols, { [data.title]: createColumn(data) }), {});
				return Object.assign(cols, { [type.internal]: {
					visibleOrder: visibleColumns,
					data: parsedColumns
				} });
			}, {});
			setColumns(Object.assign(columns, columnsTemp));
		};
		const loadNextPage = () => {
			if (inFlight) return;
			if (!lastPage) {
				setPage(page + 1);
				setLoadNextPage(true);
			}
		};
		const updateSort = (field, direction) => {
			setSort(Object.assign({
				field,
				direction
			}));
			performSearch(true);
		};
		useEffect(() => {
			loadColumns();
		}, []);
		useEffect(() => {
			pickDefaultTab();
		}, [filters]);
		useEffect(() => {
			if (isLoadingNextPage) {
				performSearch();
				setLoadNextPage(false);
			}
		}, [isLoadingNextPage]);
		useEffect(() => {
			performSearch();
		}, [
			tableType,
			resultLimit,
			page
		]);
		if (Object.keys(columns).length === 0) return null;
		const tabsWithCounts = tableTypes.map((type) => ({
			...type,
			count: counts[type.internal],
			disabled: inFlight || counts[type.internal] === 0
		}));
		return /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)(import_jsx_runtime$5.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(ws, {
				title: "Spending by Prime Award",
				titleTooltip: { component: false },
				descTooltip: { component: false }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("hr", { className: "results-divider" }),
			/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(ResultsTableSection, {
				error,
				inFlight,
				results,
				columns: columns[tableType],
				sort,
				tableTypes: tabsWithCounts,
				currentType: tableType,
				tableInstance,
				switchTab,
				updateSort,
				loadNextPage,
				spendingLevel,
				page,
				setPage,
				total,
				resultsLimit: resultLimit,
				setResultLimit,
				resultsCount: counts[tableType],
				federalAccountPage: true
			})
		] });
	};
	AccountAwardsContainer.propTypes = propTypes$5;
	AccountAwardsContainer_default = connect_default((state) => ({
		account: state.account.account,
		filters: state.account.filters
	}))(AccountAwardsContainer);
}));
//#endregion
//#region src/js/components/account/SearchResults.jsx
/**
* SearchResults.jsx
* Created by Kevin Li 3/20/17
**/
var import_jsx_runtime$4, propTypes$4, SearchResults;
var init_SearchResults = __esmMin((() => {
	init_AccountTopFilterBarContainer();
	init_mobileBreakpoints();
	init_AccountTimeVisualizationContainer();
	init_AccountRankVisualizationContainer();
	init_Note();
	init_AccountAwardsContainer();
	import_jsx_runtime$4 = require_jsx_runtime();
	propTypes$4 = { showNote: PropTypes.bool };
	SearchResults = class extends React.Component {
		constructor(props) {
			super(props);
			this.state = { windowWidth: 0 };
			this.handleWindowResize = this.handleWindowResize.bind(this);
		}
		componentDidMount() {
			this.handleWindowResize();
			window.addEventListener("resize", this.handleWindowResize);
		}
		componentWillUnmount() {
			window.removeEventListener("resize", this.handleWindowResize);
		}
		handleWindowResize() {
			const windowWidth = window.innerWidth;
			if (this.state.windowWidth !== windowWidth) this.setState({ windowWidth });
		}
		render() {
			return /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
				className: "search-results-wrapper",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(AccountTopFilterBarContainer_default, { ...this.props }), /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
					className: "search-results",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(AccountTimeVisualizationContainer_default, {}),
						/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
							style: this.state.windowWidth < 768 ? { height: "1000px" } : { height: "auto" },
							children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(AccountRankVisualizationContainer_default, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(AccountAwardsContainer_default, {}),
						this.props.showNote && /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(Note, { message: dodNote })
					]
				})]
			});
		}
	};
	SearchResults.propTypes = propTypes$4;
}));
//#endregion
//#region src/js/components/account/Account.jsx
var import_jsx_runtime$3, propTypes$3, Account;
var init_Account = __esmMin((() => {
	init_index_es();
	init_es();
	init_metaTagHelper();
	init_socialShare();
	init_PageWrapper();
	init_ShareIcon508();
	init_ProfileBackLink();
	init_AccountOverview();
	init_SearchSidebar();
	init_SearchResults();
	init_modalActions();
	import_jsx_runtime$3 = require_jsx_runtime();
	propTypes$3 = {
		account: PropTypes.object,
		currentFiscalYear: PropTypes.string
	};
	Account = ({ account, currentFiscalYear }) => {
		const accountSymbol = `${account.agency_identifier}-${account.main_account_code}`;
		const fedAccountSlug = `federal_account/${accountSymbol}`;
		const dispatch = useDispatch();
		const handleShareDispatch = (url) => {
			dispatch(showModal(url));
		};
		const handleShare = (name, slug) => {
			handleShareOptionClick(name, slug, {
				subject: `USAspending.gov Federal Account Profile: ${account.title}`,
				body: `View the spending activity of this federal account on USAspending.gov: ${getBaseUrl(slug)}`
			}, handleShareDispatch);
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(PageWrapper, {
			pageName: "Federal Account Profile",
			classNames: "usa-da-account-page",
			title: `Federal Account Symbol: ${accountSymbol}`,
			metaTagProps: account ? federalAccountPageMetaTags(account) : {},
			toolBarComponents: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(ShareIcon508, {
				url: getBaseUrl(fedAccountSlug),
				onShareOptionClick: (name) => handleShare(name, fedAccountSlug)
			})],
			children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("main", {
				id: "main-content",
				className: "main-content",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(ProfileBackLink, {
					label: "Back to Federal Account Profile Page",
					url: "/federal_account"
				}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Qs, {
					className: "fed-account-content__row",
					children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)($s, {
						className: "fed-account-content__col",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(AccountOverview, {
							account,
							currentFiscalYear
						}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
							className: "filter-results",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(SearchSidebar, {}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(SearchResults, { showNote: account.parent_agency_toptier_code === "097" })]
						})]
					})
				})]
			})
		});
	};
	Account.propTypes = propTypes$3;
}));
//#endregion
//#region src/js/components/account/InvalidAccount.jsx
/**
* InvalidAccount.jsx
* Created by Kevin Li 3/24/17
*/
var import_jsx_runtime$2, propTypes$2, InvalidAccount;
var init_InvalidAccount = __esmMin((() => {
	init_Footer();
	init_HeaderContainer();
	init_Error();
	import_jsx_runtime$2 = require_jsx_runtime();
	propTypes$2 = { account: PropTypes.object };
	InvalidAccount = class extends React.Component {
		render() {
			return /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
				className: "usa-da-account-page",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(HeaderContainer_default, {}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("main", {
						id: "main-content",
						className: "main-content",
						children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
							className: "wrapper",
							children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Error, {
								title: "Invalid Federal Account",
								message: "The federal account ID provided is invalid.\n                            Please check the ID and try again."
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Footer_default, { pageName: "Invalid Account" })
				]
			});
		}
	};
	InvalidAccount.propTypes = propTypes$2;
}));
//#endregion
//#region src/js/components/account/LoadingAccount.jsx
/**
* LoadingAccount.jsx
* Created by Kevin Li 3/24/17
*/
var import_jsx_runtime$1, propTypes$1, LoadingAccount;
var init_LoadingAccount = __esmMin((() => {
	init_Footer();
	init_HeaderContainer();
	init_Error();
	import_jsx_runtime$1 = require_jsx_runtime();
	propTypes$1 = { account: PropTypes.object };
	LoadingAccount = class extends React.Component {
		render() {
			return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
				className: "usa-da-account-page",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(HeaderContainer_default, {}),
					/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("main", {
						id: "main-content",
						className: "main-content",
						children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
							className: "wrapper",
							children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Error, {
								title: "Loading...",
								message: ""
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Footer_default, { pageName: "Loading Account" })
				]
			});
		}
	};
	LoadingAccount.propTypes = propTypes$1;
}));
//#endregion
//#region src/_scss/pages/account/accountPage.scss
var require_accountPage = /* @__PURE__ */ __commonJSMin((() => {}));
//#endregion
//#region src/js/containers/account/AccountContainer.jsx
/**
* AccountContainer.jsx
* Created by Kevin Li 3/17/17
*/
var import_jsx_runtime, propTypes, combinedActions, AccountContainer, AccountContainer_default;
//#endregion
__esmMin((() => {
	init_redux();
	init_es();
	init_axios();
	init_development();
	init_propTypes();
	init_account();
	init_accountActions();
	init_accountFilterActions();
	init_FederalAccount();
	init_accountFields();
	init_WithLatestFy();
	init_Account();
	init_InvalidAccount();
	init_LoadingAccount();
	import_jsx_runtime = require_jsx_runtime();
	require_accountPage();
	propTypes = {
		account: PropTypes.object,
		setSelectedAccount: PropTypes.func,
		submissionPeriods: SUBMISSION_PERIOD_PROPS,
		latestPeriod: LATEST_PERIOD_PROPS,
		isFetchLatestFyLoading: PropTypes.bool
	};
	combinedActions = Object.assign({}, accountActions_exports, accountFilterActions_exports);
	AccountContainer = (props) => {
		const [loading, setLoading] = useState(true);
		const [validAccount, setValidAccount] = useState(true);
		const { accountNumber } = useMatch("/federal_account/:accountNumber").params;
		let accountRequest = null;
		let fiscalYearSnapshotRequest = null;
		const parseFYSnapshot = (data) => {
			const balances = { available: false };
			if (Object.keys(data).length > 0 && data.results) {
				Object.keys(fiscalYearSnapshotFields).forEach((key) => {
					balances[fiscalYearSnapshotFields[key]] = data.results[key];
				});
				balances.available = true;
			}
			const account = Object.assign({}, props.account);
			account.totals = balances;
			props.setSelectedAccount(account);
		};
		const loadFiscalYearSnapshot = (id) => {
			if (fiscalYearSnapshotRequest) fiscalYearSnapshotRequest.cancel();
			fiscalYearSnapshotRequest = fetchFederalAccountFYSnapshot(id, props.latestPeriod.year);
			fiscalYearSnapshotRequest.promise.then((res) => {
				fiscalYearSnapshotRequest = null;
				parseFYSnapshot(res.data);
				setLoading(false);
			}).catch((err) => {
				fiscalYearSnapshotRequest = null;
				if (!isCancel(err)) {
					setLoading(false);
					console.log(err);
				}
			});
		};
		const parseAccount = (data) => {
			const account = new FederalAccount(data);
			props.setSelectedAccount(account);
			if (props.latestPeriod.year) loadFiscalYearSnapshot(props.account.id);
		};
		const loadData = () => {
			if (accountRequest) accountRequest.cancel();
			setLoading(true);
			accountRequest = fetchFederalAccount(accountNumber);
			accountRequest.promise.then((res) => {
				accountRequest = null;
				parseAccount(res.data);
				setValidAccount(true);
			}).catch((err) => {
				accountRequest = null;
				if (!isCancel(err)) {
					setLoading(false);
					setValidAccount(false);
					console.log(err);
				}
			});
		};
		useEffect(() => {
			loadData();
		}, [accountNumber]);
		useEffect(() => {
			if (props.latestPeriod?.year && props.account?.id) loadFiscalYearSnapshot(props.account.id);
		}, [props.latestPeriod?.year, props.account?.id]);
		const renderAccount = () => {
			let output = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingAccount, {});
			if (!loading && !validAccount) output = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InvalidAccount, {});
			else if (!loading && !props.isFetchLatestFyLoading) output = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Account, {
				...props,
				currentFiscalYear: `${props.latestPeriod.year}`
			});
			return output;
		};
		return renderAccount();
	};
	AccountContainer.propTypes = propTypes;
	AccountContainer_default = flowRight(withLatestFy, connect_default((state) => ({
		account: state.account.account,
		tas: state.account.tas
	}), (dispatch) => bindActionCreators(combinedActions, dispatch)))(AccountContainer);
}))();
export { AccountContainer_default as default };
