import { n as __esmMin } from "./rolldown-runtime-D1cXj70v.js";
import { Ha as Link, Va as init_development, at as init_index_esm, go as require_jsx_runtime, it as Q, ot as le } from "./index.js-Dk2VDaPz.js";
import { n as init_GlossaryLink, t as GlossaryLink } from "./GlossaryLink-CffoixM2.js";
import { a as ExplorerWrapperPage, n as icons, o as init_ExplorerWrapperPage, r as init_dropdownScopes } from "./dropdownScopes-CJjKNlsM.js";
import { useState } from "react";
import PropTypes from "prop-types";
//#region src/js/components/explorer/landing/ExplorerLandingOption.jsx
var import_jsx_runtime$1, propTypes, ExplorerLandingOption;
var init_ExplorerLandingOption = __esmMin((() => {
	init_development();
	init_dropdownScopes();
	init_GlossaryLink();
	import_jsx_runtime$1 = require_jsx_runtime();
	propTypes = {
		icon: PropTypes.string,
		title: PropTypes.string,
		description: PropTypes.string,
		url: PropTypes.string,
		term: PropTypes.string,
		onClick: PropTypes.func
	};
	ExplorerLandingOption = ({ icon, title, description, url, term, onClick }) => {
		const IconType = icons[icon];
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
			className: "landing-option",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
					className: "landing-option__icon",
					children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(IconType, { alt: title })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("h2", {
					className: "landing-option__title",
					children: [title, /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(GlossaryLink, { term })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
					className: "landing-option__description",
					children: description
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Link, {
					className: "landing-option__button",
					to: url,
					onClick,
					children: "Start"
				})
			]
		});
	};
	ExplorerLandingOption.propTypes = propTypes;
}));
//#endregion
//#region src/js/components/explorer/landing/ExplorerLanding.jsx
/**
* ExplorerLanding.jsx
* Created by Kevin Li 8/16/17
*/
var import_jsx_runtime, ExplorerDescription, explorerLandingDescription, ExplorerLanding;
//#endregion
__esmMin((() => {
	init_index_esm();
	init_ExplorerWrapperPage();
	init_ExplorerLandingOption();
	init_GlossaryLink();
	import_jsx_runtime = require_jsx_runtime();
	ExplorerDescription = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "explorer-description__content",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"Drawing on agencies' financial data, this tool provides an interactive way to explore federal spending (known as Obligations  ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlossaryLink, {
					term: "obligation",
					alt: "Definition of Obligation"
				}),
				") from top to bottom. Use this tool to get a better sense of how Congress distributes funding to agencies and how agencies spend that funding on activities that fulfill their missions — in short, how this funding powers the work that agencies are known for."
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"Use three different entry points — Budget Function ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlossaryLink, {
					term: "budget-function",
					alt: "Definition of Budget Function"
				}),
				", Agency ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlossaryLink, {
					term: "agency",
					alt: "Definition of Agency"
				}),
				", and Object Class ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlossaryLink, {
					term: "object-class",
					alt: "Definition of Object Class"
				}),
				"— to see how federal spending breaks down along different themes. Explore by Budget Function if you're most interested in the broad categories of federal spending; by Agency if you're focused on specific agencies' work; and by Object Class if you'd like to frame spending in terms of the types of goods and services the government buys."
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"The data powering the Spending Explorer is reported through a newly implemented law (the Digital Accountability and Transparency Act of 2014 (",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "https://www.gpo.gov/fdsys/pkg/PLAW-113publ101/html/PLAW-113publ101.htm",
					target: "_blank",
					rel: "noopener noreferrer",
					children: "DATA Act"
				}),
				")) that requires agencies to link their financial data, in addition to the award data that agencies were already reporting under the Federal Funding Accountability and Transparency Act of 2006 (FFATA). This data was first collected in the second quarter of fiscal year 2017. The data displayed on the site may not be complete or match official publications (e.g., the President's Budget, Agency Financial Reports), due to agencies' different reporting schedules and the fact that some data elements aren't required to be reported. Notably, the Department of Defense (DoD) doesn't report their financial data using the same schedule as other major agencies; the DATA Act gives them an exemption that allows them to report later.  That said, we publish all the data agencies submit to provide as comprehensive a view as possible, and we expect available data to become more complete in the future."
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"Now, for the first time ever, agency financial data is connected to award data in a way that's easy (and fun) to explore. If you have suggestions on how we can improve the Spending Explorer, share your thoughts on the ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "https://fiscalservice.force.com/usaspending/s/",
					target: "_blank",
					rel: "noopener noreferrer",
					children: "Community page"
				}),
				"."
			] })
		]
	});
	explorerLandingDescription = {
		title: "The Spending Explorer makes it easy to understand the big picture of federal spending.",
		budget_function: "See spending divided by a high level categorization based on purpose.",
		agency: "See spending divided by all U.S. government agencies.",
		object_class: "See spending grouped by the types of items and services purchased by the federal government."
	};
	ExplorerLanding = () => {
		const [expanded, setExpanded] = useState(false);
		const [showAboutTheDataIcon, setShowAboutTheDataIcon] = useState(false);
		const onOptionClick = () => {
			setShowAboutTheDataIcon(!showAboutTheDataIcon);
		};
		const onToggleClick = () => {
			setExpanded(!expanded);
		};
		const expandLabel = expanded ? "Hide" : "Learn More";
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExplorerWrapperPage, {
			showShareIcon: true,
			showAboutTheDataIcon: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "explorer-landing",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "explorer-landing__intro",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "explorer-landing__title",
						children: "Explore the spending landscape."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "explorer-landing__detail",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "explorer-landing__detail-content explorer-description",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "explorer-description__title",
									children: explorerLandingDescription.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "explorer-description__animations",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Q, { children: expanded && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(le, {
										classNames: "explorer-description-slide",
										timeout: 195,
										exit: true,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExplorerDescription, {})
									}) })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "explorer-description__expand",
									onClick: onToggleClick,
									children: expandLabel
								})
							]
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "explorer-landing__options",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExplorerLandingOption, {
							icon: "budget_function",
							title: "Budget Function",
							description: explorerLandingDescription.budget_function,
							url: "/explorer/budget_function",
							term: "budget-function",
							onClick: onOptionClick
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExplorerLandingOption, {
							icon: "agency",
							title: "Agency",
							description: explorerLandingDescription.agency,
							url: "/explorer/agency",
							term: "agency",
							onClick: onOptionClick
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExplorerLandingOption, {
							icon: "object_class",
							title: "Object Class",
							description: explorerLandingDescription.object_class,
							url: "/explorer/object_class",
							term: "object-class",
							onClick: onOptionClick
						})
					]
				})]
			})
		});
	};
}))();
export { ExplorerLanding as default };
