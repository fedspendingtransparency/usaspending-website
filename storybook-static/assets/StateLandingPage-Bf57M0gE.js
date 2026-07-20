import { n as __esmMin, t as __commonJSMin } from "./rolldown-runtime-D1cXj70v.js";
import { Ha as Link, Hn as isCancel, Ii as init_moneyFormatter, Nr as init_index_es, Va as init_development, Vn as init_axios, cr as init_socialShare, fn as init_modalActions, go as require_jsx_runtime, gr as $s, ki as formatMoney, no as init_es, oo as useDispatch, or as getBaseUrl, pn as showModal, sr as handleShareOptionClick, wr as Qs } from "./index.js-Dk2VDaPz.js";
import { D as init_metaTagHelper, P as stateLandingPageMetaTags } from "./HeaderContainer-CiRwnRgy.js";
import { n as init_PageWrapper, t as PageWrapper } from "./PageWrapper-Dqa3KwTb.js";
import { n as init_ShareIcon508, t as ShareIcon508 } from "./ShareIcon508-QphjVgqd.js";
import { n as replaceString, t as init_replaceString } from "./replaceString-BjdNP_oA.js";
import { n as init_H2PageHeader, t as H2PageHeader } from "./H2PageHeader-Bpp68zbf.js";
import { t as require_commonjs } from "./commonjs-CBrKYqL5.js";
import { n as init_LandingSearchBar, t as LandingSearchBar } from "./LandingSearchBar-Dj32OQrM.js";
import { n as init_StateLandingTableSorter, t as StateLandingTableSorter } from "./StateLandingTableSorter-bWot3PUJ.js";
import { l as init_state, r as init_stateHelper, s as fetchStateList, t as URLifyStateName } from "./stateHelper-B8yf19r3.js";
import { a as stateNameByFipsId, n as init_stateNames } from "./stateNames-BSGQPQGh.js";
import React from "react";
import PropTypes from "prop-types";
import { orderBy } from "lodash-es";
//#region src/js/models/v2/state/BaseStateLandingItem.js
var BaseStateLandingItem;
var init_BaseStateLandingItem = __esmMin((() => {
	init_moneyFormatter();
	BaseStateLandingItem = {
		populate(data) {
			this._name = data.name || "";
			this.fips = data.fips || "";
			this.code = data.code || "";
			this.type = data.type || "";
			this._amount = data.amount || 0;
		},
		get name() {
			return this.code ? `${this._name} (${this.code})` : this._name;
		},
		get amount() {
			return formatMoney(this._amount);
		},
		percentage(total) {
			const decimal = this._amount / total;
			if (isNaN(decimal)) return "--%";
			return `${Math.round(decimal * 1e4) / 100}%`;
		}
	};
}));
//#endregion
//#region src/js/components/stateLanding/table/StateLinkCell.jsx
/**
* StateLinkCell.jsx
* Created by Lizzie Salita 6/11/18
**/
var import_jsx_runtime$4, propTypes$2, StateLinkCell;
var init_StateLinkCell = __esmMin((() => {
	init_replaceString();
	init_development();
	init_stateHelper();
	init_stateNames();
	import_jsx_runtime$4 = require_jsx_runtime();
	propTypes$2 = {
		name: PropTypes.string,
		fips: PropTypes.string,
		searchString: PropTypes.string
	};
	StateLinkCell = class extends React.Component {
		render() {
			let name = this.props.name;
			if (this.props.searchString !== "") name = replaceString(this.props.name, this.props.searchString, "state-list__matched");
			return /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("td", {
				className: "state-list__body-cell",
				children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(Link, {
					to: `/state/${URLifyStateName(stateNameByFipsId[this.props.fips])}`,
					children: name
				})
			});
		}
	};
	StateLinkCell.propTypes = propTypes$2;
}));
//#endregion
//#region src/js/components/stateLanding/table/StateLandingTable.jsx
var import_jsx_runtime$3, propTypes$1, StateLandingTable;
var init_StateLandingTable = __esmMin((() => {
	init_StateLandingTableSorter();
	init_StateLinkCell();
	import_jsx_runtime$3 = require_jsx_runtime();
	propTypes$1 = {
		loading: PropTypes.bool,
		error: PropTypes.bool,
		total: PropTypes.number,
		results: PropTypes.array,
		setSort: PropTypes.func,
		sortField: PropTypes.string,
		sortDirection: PropTypes.string,
		searchString: PropTypes.string
	};
	StateLandingTable = (props) => {
		const hideBody = props.loading || props.error || props.results.length === 0 ? "state-list__body_hide" : "";
		const body = props.results.map((row) => /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("tr", {
			className: "state-list__body-row",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(StateLinkCell, {
					fips: row.fips,
					name: row.name,
					searchString: props.searchString
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("td", {
					className: "state-list__body-cell state-list__body-cell_right",
					children: row.amount
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("td", {
					className: "state-list__body-cell state-list__body-cell_right",
					children: row.percentage(props.total)
				})
			]
		}, row.fips));
		let message = null;
		if (props.error) message = /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
			className: "state-list__message",
			children: "An error occurred while loading this table."
		});
		else if (props.loading) message = /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
			className: "state-list__message",
			children: "Loading..."
		});
		else if (props.results.length === 0) if (props.searchString) message = /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
			className: "state-list__message",
			children: [
				"No results found for “",
				/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
					className: "state-list__message_highlight",
					children: props.searchString
				}),
				"”."
			]
		});
		else message = /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
			className: "state-list__message",
			children: "No results found."
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
			className: "state-landing__results",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("table", {
				className: "state-list",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("thead", {
					className: "state-list__head",
					children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("tr", {
						className: "state-list__head-row",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("th", {
								className: "state-list__head-cell",
								children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
									className: "header-cell",
									children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
										className: "header-cell__text",
										children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
											className: "header-cell__title",
											children: "State or Territory Name"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(StateLandingTableSorter, {
										field: "name",
										label: "state",
										active: {
											field: props.sortField,
											direction: props.sortDirection
										},
										setSort: props.setSort
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("th", {
								className: "state-list__head-cell",
								children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
									className: "header-cell header-cell_right",
									children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
										className: "header-cell__text",
										children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
											className: "header-cell__title header-cell__title_right",
											children: ["Awarded Amount", /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
												className: "header-cell__subtitle",
												children: "from the latest Fiscal Year"
											})]
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(StateLandingTableSorter, {
										field: "_amount",
										label: "awarded amount",
										active: {
											field: props.sortField,
											direction: props.sortDirection
										},
										setSort: props.setSort
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("th", {
								className: "state-list__head-cell",
								children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
									className: "header-cell  header-cell_right",
									children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
										className: "header-cell__text",
										children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
											className: "header-cell__title header-cell__title_right",
											children: ["Percent of Total", /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
												className: "header-cell__subtitle",
												children: "based on all state profiles"
											})]
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(StateLandingTableSorter, {
										field: "_amount",
										label: "percent of total",
										active: {
											field: props.sortField,
											direction: props.sortDirection
										},
										setSort: props.setSort
									})]
								})
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("tbody", {
					className: `state-list__body ${hideBody}`,
					children: body
				})]
			}), message]
		});
	};
	StateLandingTable.propTypes = propTypes$1;
}));
//#endregion
//#region src/js/components/stateLanding/StateLandingContent.jsx
/**
* StateLandingContent.jsx
* Created by Kevin Li 5/23/18
*/
var import_jsx_runtime$2, propTypes, StateLandingContent;
var init_StateLandingContent = __esmMin((() => {
	init_LandingSearchBar();
	init_StateLandingTable();
	import_jsx_runtime$2 = require_jsx_runtime();
	propTypes = {
		setSearchString: PropTypes.func,
		resultsText: PropTypes.string
	};
	StateLandingContent = class extends React.Component {
		render() {
			return /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(LandingSearchBar, {
					onSubmit: this.props.setSearchString,
					placeholder: "Search by State / Territory Name or Abbreviation",
					buttonAltText: "Search States"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
					className: "results-count",
					children: this.props.resultsText
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(StateLandingTable, { ...this.props })
			] });
		}
	};
	StateLandingContent.propTypes = propTypes;
}));
//#endregion
//#region src/js/containers/stateLanding/StateLandingContainer.jsx
/**
* StateLandingContainer.jsx
* Created by Kevin Li 5/23/18
*/
var import_commonjs, import_jsx_runtime$1, StateLandingContainer;
var init_StateLandingContainer = __esmMin((() => {
	init_axios();
	import_commonjs = require_commonjs();
	init_state();
	init_BaseStateLandingItem();
	init_StateLandingContent();
	import_jsx_runtime$1 = require_jsx_runtime();
	StateLandingContainer = class extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				loading: false,
				error: false,
				total: 0,
				searchString: "",
				sortField: "name",
				sortDirection: "asc",
				fullData: [],
				results: []
			};
			this.request = null;
		}
		componentDidMount() {
			this.loadData();
		}
		setSearchString = (input) => {
			this.setState({ searchString: input }, () => {
				this.performSearch();
			});
		};
		setSort = (field, direction) => {
			this.setState({
				sortField: field,
				sortDirection: direction
			}, () => {
				this.performSearch();
			});
		};
		loadData() {
			if (this.request) this.request.cancel();
			this.setState({
				loading: true,
				error: false
			});
			this.request = fetchStateList();
			this.request.promise.then((res) => {
				this.parseData(res.data);
			}).catch((err) => {
				if (!isCancel(err)) {
					this.setState({
						loading: false,
						error: true
					});
					console.error(err);
				}
			});
		}
		parseData(data) {
			let total = 0;
			const parsed = data.map((state) => {
				const item = Object.create(BaseStateLandingItem);
				item.populate(state);
				total += state.amount;
				return item;
			});
			this.setState({
				total,
				loading: false,
				error: false,
				fullData: parsed
			}, () => {
				this.performSearch();
			});
		}
		performSearch() {
			const search = new import_commonjs.Search("fips");
			search.addIndex("name");
			search.addIndex("code");
			search.addDocuments(this.state.fullData);
			let results = this.state.fullData;
			if (this.state.searchString) results = search.search(this.state.searchString);
			const sortedResults = orderBy(results, [this.state.sortField], [this.state.sortDirection]);
			let orderedResults = sortedResults;
			if (this.state.sortField === "name") {
				const states = sortedResults.filter((result) => result.type === "state" || result.type === "district");
				const territories = sortedResults.filter((result) => result.type === "territory");
				orderedResults = states.concat(territories);
				if (this.state.sortDirection === "desc") orderedResults = territories.concat(states);
			}
			this.setState({ results: orderedResults });
		}
		render() {
			const resultsCount = this.state.results.length;
			let resultsText = `${resultsCount} results`;
			if (resultsCount === 1) resultsText = `${resultsCount} result`;
			return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(StateLandingContent, {
				setSearchString: this.setSearchString,
				setSort: this.setSort,
				resultsText,
				...this.state
			});
		}
	};
}));
//#endregion
//#region src/_scss/pages/stateLanding/stateLandingPage.scss
var require_stateLandingPage = /* @__PURE__ */ __commonJSMin((() => {}));
//#endregion
//#region src/js/components/stateLanding/StateLandingPage.jsx
var import_jsx_runtime, slug, emailSubject, StateLandingPage;
//#endregion
__esmMin((() => {
	init_index_es();
	init_es();
	init_PageWrapper();
	init_ShareIcon508();
	init_metaTagHelper();
	init_socialShare();
	init_StateLandingContainer();
	init_modalActions();
	init_H2PageHeader();
	import_jsx_runtime = require_jsx_runtime();
	require_stateLandingPage();
	slug = "state";
	emailSubject = "USAspending.gov State Profiles";
	StateLandingPage = () => {
		const dispatch = useDispatch();
		const handleShareDispatch = (url) => {
			dispatch(showModal(url));
		};
		const handleShare = (name) => {
			handleShareOptionClick(name, slug, {
				subject: emailSubject,
				body: `View all of the State Profiles on USAspending.gov: ${getBaseUrl(slug)}`
			}, handleShareDispatch);
		};
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageWrapper, {
			pageName: "State Profiles",
			classNames: "usa-da-state-landing",
			title: "State Profiles",
			metaTagProps: stateLandingPageMetaTags,
			toolBarComponents: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareIcon508, {
				onShareOptionClick: handleShare,
				url: getBaseUrl(slug)
			})],
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				id: "main-content",
				className: "main-content",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Qs, {
					className: "content__row landing-page",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)($s, {
						className: "content__col",
						width: "fill",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(H2PageHeader, {
							title: "Find a State Profile.",
							subtitle: "Find insights into the awards that fall within a particular U.S. state or territory with the tools and data breakdowns found in our State Profile pages."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StateLandingContainer, {})]
					})
				})
			})
		});
	};
}))();
export { StateLandingPage as default };
