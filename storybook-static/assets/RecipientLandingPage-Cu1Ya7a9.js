import { n as __esmMin, t as __commonJSMin } from "./rolldown-runtime-D1cXj70v.js";
import { $a as init_GlobalConstants, Bn as init_Icons, Dn as Close, Ha as Link, Hn as isCancel, Ii as init_moneyFormatter, Nr as init_index_es, Pn as InfoCircle, Qa as globalConstants, Rn as Search, Ur as vs, Va as init_development, Vn as init_axios, at as init_index_esm, cr as init_socialShare, dn as init_apiRequest, fn as init_modalActions, go as require_jsx_runtime, gr as $s, it as Q, ki as formatMoney, no as init_es, oo as useDispatch, or as getBaseUrl, ot as le, pn as showModal, sr as handleShareOptionClick, un as apiRequest, wr as Qs, xr as Ka } from "./index.js-Dk2VDaPz.js";
import { D as init_metaTagHelper, M as recipientLandingPageMetaTags } from "./HeaderContainer-CiRwnRgy.js";
import { n as init_PageWrapper, t as PageWrapper } from "./PageWrapper-Dqa3KwTb.js";
import { n as init_ShareIcon508, t as ShareIcon508 } from "./ShareIcon508-QphjVgqd.js";
import { i as init_ResultsTableLoadingMessage, n as init_ResultsTableErrorMessage, r as ResultsTableLoadingMessage, t as ResultsTableErrorMessage } from "./ResultsTableErrorMessage-Cv27hSfO.js";
import { n as init_H2PageHeader, t as H2PageHeader } from "./H2PageHeader-Bpp68zbf.js";
import { n as init_StateLandingTableSorter, t as StateLandingTableSorter } from "./StateLandingTableSorter-bWot3PUJ.js";
import React from "react";
import PropTypes from "prop-types";
import { inRange, throttle } from "lodash-es";
//#region src/js/helpers/recipientLandingHelper.js
var fetchAllRecipients;
var init_recipientLandingHelper = __esmMin((() => {
	init_apiRequest();
	fetchAllRecipients = (data) => apiRequest({
		url: "v2/recipient/",
		method: "post",
		data
	});
}));
//#endregion
//#region src/js/components/recipientLanding/table/RecipientLinkCell.jsx
/**
* RecipientLinkCell.jsx
* Created by David Trinh 7/3/18
**/
var import_jsx_runtime$10, propTypes$7, RecipientLinkCell;
var init_RecipientLinkCell = __esmMin((() => {
	init_development();
	import_jsx_runtime$10 = require_jsx_runtime();
	propTypes$7 = {
		name: PropTypes.string,
		id: PropTypes.string,
		type: PropTypes.string,
		searchString: PropTypes.string
	};
	RecipientLinkCell = class extends React.Component {
		render() {
			let labelType = "";
			if (this.props.type === "P") labelType = "recipient-landing__icon recipient-landing__icon_parent";
			else if (this.props.type === "R") labelType = "recipient-landing__icon recipient-landing__icon_recipient";
			else labelType = "recipient-landing__icon recipient-landing__icon_child";
			return /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("td", {
				className: "recipient-list__body-cell",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("span", {
					className: labelType,
					children: this.props.type
				}), /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(Link, {
					to: `/recipient/${this.props.id}/latest`,
					children: this.props.name
				})]
			});
		}
	};
	RecipientLinkCell.propTypes = propTypes$7;
}));
//#endregion
//#region src/js/components/recipientLanding/table/RecipientLandingTable.jsx
var import_jsx_runtime$9, propTypes$6, RecipientLandingTable;
var init_RecipientLandingTable = __esmMin((() => {
	init_GlobalConstants();
	init_StateLandingTableSorter();
	init_RecipientLinkCell();
	import_jsx_runtime$9 = require_jsx_runtime();
	propTypes$6 = {
		loading: PropTypes.bool,
		error: PropTypes.bool,
		results: PropTypes.array,
		setSort: PropTypes.func,
		sortField: PropTypes.string,
		order: PropTypes.object,
		searchString: PropTypes.string,
		inFlight: PropTypes.bool
	};
	RecipientLandingTable = (props) => {
		const hideBody = props.loading || props.error || props.results.length === 0 ? "recipient-list__body_hide" : "";
		const body = props.results.map((row) => /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("tr", {
			className: "recipient-list__body-row",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(RecipientLinkCell, {
					id: row.id,
					type: row.recipientLevel,
					name: row.name,
					searchString: props.searchString
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("td", {
					className: "recipient-list__body-cell recipient-list__body-cell_left",
					children: row.uei
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("td", {
					className: "recipient-list__body-cell recipient-list__body-cell_left",
					children: row.duns
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("td", {
					className: "recipient-list__body-cell recipient-list__body-cell_center",
					children: row.amount
				})
			]
		}, row.id));
		let message = null;
		if (!props.inFlight && !props.error && props.results.length === 0) if (props.searchString) message = /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("div", {
			className: "recipient-list__message",
			children: [
				"No results found for “",
				/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("span", {
					className: "recipient-list__message_highlight",
					children: props.searchString
				}),
				"”."
			]
		});
		else message = /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("div", {
			className: "recipient-list__message",
			children: "No results found."
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("div", {
			className: "recipient-landing__results",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("table", {
				className: "recipient-list",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("thead", {
					className: "recipient-list__head",
					children: /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("tr", {
						className: "recipient-list__head-row",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("th", {
								className: "recipient-list__head-cell",
								children: /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("div", {
									className: "header-cell",
									children: [/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("div", {
										className: "header-cell__text",
										children: /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("div", {
											className: "header-cell__title",
											children: "Recipient Name"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(StateLandingTableSorter, {
										field: "name",
										label: "recipient",
										active: {
											field: props.order.field,
											direction: props.order.direction
										},
										setSort: props.setSort
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("th", {
								className: "recipient-list__head-cell",
								children: /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("div", {
									className: "header-cell ",
									children: [/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("div", {
										className: "header-cell__text",
										children: /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("div", {
											className: "header-cell__title header-cell__title_cap",
											children: "UEI"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(StateLandingTableSorter, {
										field: "uei",
										label: "uei",
										active: {
											field: props.order.field,
											direction: props.order.direction
										},
										setSort: props.setSort
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("th", {
								className: "recipient-list__head-cell",
								children: /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("div", {
									className: "header-cell ",
									children: [/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("div", {
										className: "header-cell__text",
										children: /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("div", {
											className: "header-cell__title",
											children: [globalConstants.DUNS_LABEL, /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("span", {
												className: "header-cell__title_cap",
												children: "DUNS"
											})]
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(StateLandingTableSorter, {
										field: "duns",
										label: "duns",
										active: {
											field: props.order.field,
											direction: props.order.direction
										},
										setSort: props.setSort
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("th", {
								className: "recipient-list__head-cell",
								children: /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("div", {
									className: "header-cell  header-cell_right",
									children: [/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("div", {
										className: "header-cell__text",
										children: /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("div", {
											className: "header-cell__title header-cell__title_center",
											children: ["Awarded Amount", /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("div", {
												className: "header-cell__subtitle",
												children: "(from trailing 12 months of transactions)"
											})]
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(StateLandingTableSorter, {
										field: "amount",
										label: "awarded amount",
										active: {
											field: props.order.field,
											direction: props.order.direction
										},
										setSort: props.setSort
									})]
								})
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("tbody", {
					className: `recipient-list__body ${hideBody}`,
					children: body
				})]
			}), message]
		});
	};
	RecipientLandingTable.propTypes = propTypes$6;
}));
//#endregion
//#region src/js/components/recipientLanding/RecipientLandingResultsSection.jsx
/**
* RecipientLandingResultsSection.jsx
* Created by David Trinh 7/3/18
*/
var import_jsx_runtime$8, propTypes$5, RecipientLandingResultsSection;
var init_RecipientLandingResultsSection = __esmMin((() => {
	init_index_esm();
	init_ResultsTableLoadingMessage();
	init_ResultsTableErrorMessage();
	init_RecipientLandingTable();
	import_jsx_runtime$8 = require_jsx_runtime();
	propTypes$5 = {
		inFlight: PropTypes.bool,
		error: PropTypes.bool,
		results: PropTypes.array,
		columns: PropTypes.array,
		searchString: PropTypes.string,
		order: PropTypes.object,
		updateSort: PropTypes.func
	};
	RecipientLandingResultsSection = class extends React.Component {
		render() {
			return /* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)("div", {
				className: "results-table-section",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(Q, { children: (this.props.inFlight || this.props.error) && /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(le, {
					classNames: "table-message-fade",
					timeout: {
						exit: 225,
						enter: 195
					},
					exit: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)("div", { children: [this.props.inFlight && /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("div", {
						className: "results-table-message-container",
						children: /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(ResultsTableLoadingMessage, {})
					}), this.props.error && /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("div", {
						className: "results-table-message-container full",
						children: /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(ResultsTableErrorMessage, {})
					})] })
				}) }), /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(RecipientLandingTable, { ...this.props })]
			});
		}
	};
	RecipientLandingResultsSection.propTypes = propTypes$5;
}));
//#endregion
//#region src/js/components/recipientLanding/RecipientLandingTooltip.jsx
/**
* RecipientLandingTooltip.jsx
* Created by David Trinh on 7/11/18.
*/
var import_jsx_runtime$7, propTypes$4, tooltipPadding, RecipientLandingTooltip;
var init_RecipientLandingTooltip = __esmMin((() => {
	init_Icons();
	import_jsx_runtime$7 = require_jsx_runtime();
	propTypes$4 = {
		closeTooltip: PropTypes.func,
		message: PropTypes.string,
		placement: PropTypes.string,
		showInfoTooltip: PropTypes.bool
	};
	tooltipPadding = 12;
	RecipientLandingTooltip = class extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				windowWidth: 0,
				iconTop: 0,
				iconLeft: 0
			};
			this.handleWindowResize = throttle(this.handleWindowResize.bind(this), 50);
			this.setWrapperRef = this.setWrapperRef.bind(this);
			this.handleClickOutside = this.handleClickOutside.bind(this);
		}
		componentDidMount() {
			this.handleWindowResize();
			window.addEventListener("resize", this.handleWindowResize);
			document.addEventListener("mousedown", this.handleClickOutside);
		}
		componentWillUnmount() {
			window.removeEventListener("resize", this.handleWindowResize);
			document.removeEventListener("mousedown", this.handleClickOutside);
		}
		getPosition() {
			const icon = document.getElementById(this.props.placement);
			return {
				iconTop: icon.offsetTop,
				iconLeft: icon.offsetLeft + icon.offsetWidth - tooltipPadding
			};
		}
		setWrapperRef(node) {
			this.wrapperRef = node;
		}
		handleClickOutside(event) {
			if (this.props.showInfoTooltip && this.wrapperRef && !this.wrapperRef.contains(event.target)) this.props.closeTooltip();
		}
		handleWindowResize() {
			const windowWidth = window.innerWidth;
			if (this.state.windowWidth !== windowWidth) {
				const position = this.getPosition();
				this.setState({
					windowWidth,
					iconTop: position.iconTop,
					iconLeft: position.iconLeft
				});
			}
		}
		render() {
			return /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
				ref: this.setWrapperRef,
				className: "homepage-hero-tooltip",
				onMouseLeave: this.props.closeTooltip,
				style: {
					top: this.state.iconTop,
					left: this.state.iconLeft
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
					className: "homepage-hero-tooltip__info_icon",
					children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(InfoCircle, {})
				}), /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
					className: "homepage-hero-tooltip__text_holder",
					children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
						className: "homepage-hero-tooltip__tooltip_text",
						children: this.props.message
					})
				})]
			});
		}
	};
	RecipientLandingTooltip.propTypes = propTypes$4;
}));
//#endregion
//#region src/js/components/recipientLanding/RecipientInformation.jsx
/**
* RecipientInformation.jsx
* Created by David Trinh 7/11/18
*/
var import_jsx_runtime$6, propTypes$3, RecipientInformation;
var init_RecipientInformation = __esmMin((() => {
	init_Icons();
	init_RecipientLandingTooltip();
	import_jsx_runtime$6 = require_jsx_runtime();
	propTypes$3 = {
		message: PropTypes.string,
		placement: PropTypes.string
	};
	RecipientInformation = class extends React.Component {
		constructor(props) {
			super(props);
			this.state = { showInfoTooltip: false };
			this.showTooltip = this.showTooltip.bind(this);
			this.closeTooltip = this.closeTooltip.bind(this);
		}
		showTooltip() {
			this.setState({ showInfoTooltip: true });
		}
		closeTooltip() {
			this.setState({ showInfoTooltip: false });
		}
		render() {
			let tooltip = null;
			if (this.state.showInfoTooltip) tooltip = /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(RecipientLandingTooltip, {
				showInfoTooltip: this.state.showInfoTooltip,
				placement: this.props.placement,
				closeTooltip: this.closeTooltip,
				message: this.props.message
			});
			return /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("button", {
				onBlur: this.closeTooltip,
				className: "recipient-labels__icon-info",
				onFocus: this.showTooltip,
				onMouseEnter: this.showTooltip,
				onClick: this.showTooltip,
				children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(InfoCircle, { alt: "Information" })
			}), tooltip] });
		}
	};
	RecipientInformation.propTypes = propTypes$3;
}));
//#endregion
//#region src/js/components/recipientLanding/RecipientLabels.jsx
/**
* RecipientLabels.jsx
* Created by David Trinh 7/11/18
*/
var import_jsx_runtime$5, RecipientLabels;
var init_RecipientLabels = __esmMin((() => {
	init_RecipientInformation();
	import_jsx_runtime$5 = require_jsx_runtime();
	RecipientLabels = class extends React.Component {
		render() {
			const parentMessage = "One or more recipients listed this entity as their parent organization.";
			const parentIconPlacement = "recipient-labels__icon-parent";
			const childMessage = "This recipient has a parent organization listed.";
			const childIconPlacement = "recipient-labels__icon-child";
			const recipientMessage = "This recipient does not have a parent organization listed.";
			const recipientIconPlacement = "recipient-labels__icon-recipient";
			return /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
				className: "recipient-labels",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
						className: "recipient-labels-wrapper",
						id: parentIconPlacement,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("span", {
								className: "recipient-landing__icon recipient-landing__icon_parent",
								children: "P"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("span", {
								className: "recipient-labels__text",
								children: "Parent Recipient"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(RecipientInformation, {
								message: parentMessage,
								placement: parentIconPlacement
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
						className: "recipient-labels-wrapper",
						id: childIconPlacement,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("span", {
								className: "recipient-landing__icon recipient-landing__icon_child",
								children: "C"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("span", {
								className: "recipient-labels__text",
								children: "Child Recipient"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(RecipientInformation, {
								message: childMessage,
								placement: childIconPlacement
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
						className: "recipient-labels-wrapper",
						id: recipientIconPlacement,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("span", {
								className: "recipient-landing__icon recipient-landing__icon_recipient",
								children: "R"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("span", {
								className: "recipient-labels__text",
								children: "Recipient"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(RecipientInformation, {
								message: recipientMessage,
								placement: recipientIconPlacement
							})
						]
					})
				]
			});
		}
	};
}));
//#endregion
//#region src/js/components/recipientLanding/RecipientLandingTabs.jsx
/**
* RecipientLandingTabs.jsx
* Created by David Trinh 8/3/18
*/
var import_jsx_runtime$4, propTypes$2, tabTypes, RecipientLandingTabs;
var init_RecipientLandingTabs = __esmMin((() => {
	init_index_es();
	import_jsx_runtime$4 = require_jsx_runtime();
	propTypes$2 = { setTab: PropTypes.func };
	tabTypes = [
		{
			internal: "all",
			label: "All Awards"
		},
		{
			internal: "contracts",
			label: "Contracts"
		},
		{
			internal: "grants",
			label: "Grants"
		},
		{
			internal: "direct_payments",
			label: "Direct Payments"
		},
		{
			internal: "loans",
			label: "Loans"
		},
		{
			internal: "other_financial_assistance",
			label: "Other Financial Assistance"
		}
	];
	RecipientLandingTabs = class extends React.Component {
		constructor(props) {
			super(props);
			this.state = { active: "all" };
			this.switchTab = this.switchTab.bind(this);
		}
		switchTab(tab) {
			this.setState({ active: tab }, () => {
				this.props.setTab(tab);
			});
		}
		render() {
			return /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(vs, {
				types: tabTypes,
				active: this.state.active,
				switchTab: this.switchTab
			});
		}
	};
	RecipientLandingTabs.propTypes = propTypes$2;
}));
//#endregion
//#region src/js/components/recipientLanding/RecipientLandingSearchBar.jsx
/**
* RecipientLandingSearchBar.jsx
* Created by David Trinh 7/11/18
*/
var import_jsx_runtime$3, propTypes$1, RecipientLandingSearchBar;
var init_RecipientLandingSearchBar = __esmMin((() => {
	init_GlobalConstants();
	init_Icons();
	import_jsx_runtime$3 = require_jsx_runtime();
	propTypes$1 = { setRecipientSearchString: PropTypes.func.isRequired };
	RecipientLandingSearchBar = class extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				recipient: "",
				hasSubmit: false
			};
			this.onChange = this.onChange.bind(this);
			this.handleClick = this.handleClick.bind(this);
		}
		onChange(e) {
			this.setState({
				[e.target.name]: e.target.value,
				hasSubmit: false
			});
		}
		onSubmit(e) {
			e.preventDefault();
			this.setState({ hasSubmit: true });
			this.props.setRecipientSearchString(this.state.recipient);
		}
		resetSearch(e) {
			e.preventDefault();
			this.setState({
				hasSubmit: false,
				recipient: ""
			});
			this.props.setRecipientSearchString("");
		}
		handleClick(e) {
			if (this.state.hasSubmit) this.resetSearch(e);
			else this.onSubmit(e);
		}
		render() {
			let icon = /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Search, { alt: `Search Recipients or ${globalConstants.DUNS_LABEL} DUNS` });
			if (this.state.hasSubmit) icon = /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Close, { alt: "Reset recipient search" });
			return /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
				className: "search-section",
				children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("form", {
					className: "search-section__form",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("input", {
						className: "search-section__input",
						"aria-label": "Search Input",
						type: "text",
						name: "recipient",
						value: this.state.recipient,
						onChange: this.onChange,
						placeholder: `Recipient Name, UEI, or ${globalConstants.DUNS_LABEL}DUNS`
					}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("button", {
						"aria-label": "Search",
						className: "search-section__button",
						onClick: this.handleClick,
						children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
							className: "search-section__button-icon",
							children: icon
						})
					})]
				})
			});
		}
	};
	RecipientLandingSearchBar.propTypes = propTypes$1;
}));
//#endregion
//#region src/js/components/recipientLanding/RecipientLandingContent.jsx
var import_jsx_runtime$2, propTypes, RecipientLandingContent;
var init_RecipientLandingContent = __esmMin((() => {
	init_index_es();
	init_RecipientLandingResultsSection();
	init_RecipientLabels();
	init_RecipientLandingTabs();
	init_RecipientLandingSearchBar();
	init_H2PageHeader();
	import_jsx_runtime$2 = require_jsx_runtime();
	propTypes = {
		results: PropTypes.array,
		searchString: PropTypes.string,
		inFlight: PropTypes.bool,
		error: PropTypes.bool,
		setRecipientSearchString: PropTypes.func,
		onChangePage: PropTypes.func,
		pageNumber: PropTypes.number,
		totalItems: PropTypes.number,
		pageSize: PropTypes.number,
		order: PropTypes.object,
		setSort: PropTypes.func,
		setTab: PropTypes.func
	};
	RecipientLandingContent = ({ results, searchString, inFlight, error, setRecipientSearchString, onChangePage, pageNumber, totalItems, pageSize, order, setSort, setTab }) => {
		return /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Qs, {
			className: "content__row landing-page",
			children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)($s, {
				className: "content__col",
				width: "fill",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(H2PageHeader, {
						title: "Find a Recipient Profile.",
						subtitle: "Recipients are any entity that has received federal money in the form of contracts, grants, loans, or other financial assistance.  Our Recipient Profiles offer insights into a specific recipient, including award trends over time and top 5 rankings from a variety of categories."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(RecipientLandingSearchBar, { setRecipientSearchString }),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
						className: "landing-page__info",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(RecipientLabels, {}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Ka, {
							resultsText: true,
							changePage: onChangePage,
							currentPage: pageNumber,
							totalItems,
							pageSize
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(RecipientLandingTabs, { setTab }),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(RecipientLandingResultsSection, {
						results,
						inFlight,
						error,
						searchString,
						order,
						setSort
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Ka, {
						resultsText: true,
						changePage: onChangePage,
						currentPage: pageNumber,
						totalItems,
						pageSize
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
						className: "landing-page__disclaimer",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", {
								className: "landing-page__note",
								children: "Note: "
							}),
							"Profiles are not included for the following recipient names because they would represent aggregations of many individuals instead of specific legal entities:",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", {
								className: "landing-page__entities",
								children: "Multiple Recipients, Multiple Foreign Recipients, Miscellaneous Foreign Awardees, Private Individual, Individual Recipient, and Redacted Due to PII"
							}),
							"."
						]
					})
				]
			})
		});
	};
	RecipientLandingContent.propTypes = propTypes;
}));
//#endregion
//#region src/js/models/v2/recipient/BaseRecipientLandingRow.js
var BaseRecipientLandingRow;
var init_BaseRecipientLandingRow = __esmMin((() => {
	init_moneyFormatter();
	BaseRecipientLandingRow = {
		populate(data) {
			this.recipientLevel = data.recipient_level || "";
			this.name = data.name || "Not provided in source system";
			this.duns = data.duns || "DUNS not provided";
			this.uei = data.uei || "UEI not provided";
			this.id = data.id || "";
			this._amount = data.amount || 0;
		},
		get amount() {
			return formatMoney(this._amount);
		}
	};
}));
//#endregion
//#region src/js/containers/recipientLanding/RecipientLandingContainer.jsx
/**
* RecipientLandingContainer.jsx
* Created by David Trinh 7/2/18
*/
var import_jsx_runtime$1, RecipientLandingContainer;
var init_RecipientLandingContainer = __esmMin((() => {
	init_axios();
	init_recipientLandingHelper();
	init_RecipientLandingContent();
	init_BaseRecipientLandingRow();
	import_jsx_runtime$1 = require_jsx_runtime();
	RecipientLandingContainer = class extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				pageNumber: 1,
				order: {
					field: "amount",
					direction: "desc"
				},
				awardType: "all",
				inFlight: false,
				error: false,
				searchString: "",
				results: [],
				totalItems: 0,
				pageSize: 50
			};
			this.recipientsRequest = null;
			this.setRecipientSearchString = this.setRecipientSearchString.bind(this);
			this.onChangePage = this.onChangePage.bind(this);
			this.setSort = this.setSort.bind(this);
			this.setTab = this.setTab.bind(this);
		}
		componentDidMount() {
			this.fetchRecipients();
		}
		componentWillUnmount() {
			if (this.recipientsRequest) this.recipientsRequest.cancel();
		}
		onChangePage(pageNumber) {
			if (inRange(pageNumber, 1, Math.ceil(this.state.totalItems / this.state.pageSize) + 1)) this.setState({ pageNumber }, () => {
				this.fetchRecipients();
			});
		}
		setRecipientSearchString(searchString) {
			this.setState({
				searchString,
				pageNumber: 1
			}, () => {
				this.fetchRecipients();
			});
		}
		setSort(field, direction) {
			this.setState({
				order: {
					field,
					direction
				},
				pageNumber: 1
			}, () => {
				this.fetchRecipients();
			});
		}
		setTab(awardType) {
			this.setState({
				pageNumber: 1,
				awardType
			}, () => {
				this.fetchRecipients();
			});
		}
		fetchRecipients() {
			if (this.recipientsRequest) this.recipientsRequest.cancel();
			this.setState({
				inFlight: true,
				error: false
			});
			const params = {
				order: this.state.order.direction,
				sort: this.state.order.field,
				page: this.state.pageNumber,
				limit: this.state.pageSize,
				award_type: this.state.awardType
			};
			if (this.state.searchString !== "") params.keyword = this.state.searchString;
			this.recipientsRequest = fetchAllRecipients(params);
			this.recipientsRequest.promise.then((res) => {
				this.setState({ inFlight: false });
				this.parseRecipients(res.data);
			}).catch((err) => {
				this.recipientsRequest = null;
				if (!isCancel(err)) {
					this.setState({
						inFlight: false,
						error: true
					});
					console.log(err);
				}
			});
		}
		parseRecipients(data) {
			const recipients = [];
			data.results.forEach((item) => {
				const recipient = Object.create(BaseRecipientLandingRow);
				recipient.populate(item);
				if (recipient.duns !== "DUNS not provided" || recipient.name !== "Not provided in source system") recipients.push(recipient);
			});
			this.setState({
				totalItems: data.page_metadata.total,
				results: recipients
			});
		}
		render() {
			return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(RecipientLandingContent, {
				results: this.state.results,
				inFlight: this.state.inFlight,
				error: this.state.error,
				order: this.state.order,
				setSort: this.setSort,
				setTab: this.setTab,
				searchString: this.state.searchString,
				setRecipientSearchString: this.setRecipientSearchString,
				onChangePage: this.onChangePage,
				pageNumber: this.state.pageNumber,
				totalItems: this.state.totalItems,
				pageSize: this.state.pageSize
			});
		}
	};
}));
//#endregion
//#region src/_scss/pages/recipientLanding/recipientLandingPage.scss
var require_recipientLandingPage = /* @__PURE__ */ __commonJSMin((() => {}));
//#endregion
//#region src/js/components/recipientLanding/RecipientLandingPage.jsx
var import_jsx_runtime, slug, emailSubject, RecipientLandingPage;
//#endregion
__esmMin((() => {
	init_es();
	init_metaTagHelper();
	init_socialShare();
	init_RecipientLandingContainer();
	init_PageWrapper();
	init_ShareIcon508();
	init_modalActions();
	import_jsx_runtime = require_jsx_runtime();
	require_recipientLandingPage();
	slug = "recipient";
	emailSubject = "USAspending.gov Recipient Profiles";
	RecipientLandingPage = () => {
		const dispatch = useDispatch();
		const handleShareDispatch = (url) => {
			dispatch(showModal(url));
		};
		const handleShare = (name) => {
			handleShareOptionClick(name, slug, {
				subject: emailSubject,
				body: `View all of the Recipient Profiles on USAspending.gov: ${getBaseUrl(slug)}`
			}, handleShareDispatch);
		};
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageWrapper, {
			pageName: "Recipient Profiles",
			classNames: "usa-da-recipient-landing",
			title: "Recipient Profiles",
			metaTagProps: recipientLandingPageMetaTags,
			toolBarComponents: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareIcon508, {
				onShareOptionClick: handleShare,
				url: getBaseUrl(slug)
			}, "page-wrapper__share-icon")],
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				id: "main-content",
				className: "main-content",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecipientLandingContainer, {})
			})
		});
	};
}))();
export { RecipientLandingPage as default };
