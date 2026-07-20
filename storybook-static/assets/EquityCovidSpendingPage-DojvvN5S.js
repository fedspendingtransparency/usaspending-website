import { n as __esmMin, t as __commonJSMin } from "./rolldown-runtime-D1cXj70v.js";
import { Ha as Link, Kr as FontAwesomeIcon, Nr as init_index_es, Va as init_development, cr as init_socialShare, dr as Analytics, et as ExternalLink, fn as init_modalActions, fr as init_Analytics, go as require_jsx_runtime, gr as $s, ja as init_mobileBreakpoints, no as init_es, oo as useDispatch, or as getBaseUrl, pn as showModal, qr as init_dist, sr as handleShareOptionClick, tt as init_ExternalLink, wr as Qs } from "./index.js-Dk2VDaPz.js";
import { D as init_metaTagHelper, b as equityPageMetaTags } from "./HeaderContainer-CiRwnRgy.js";
import { n as init_PageWrapper, t as PageWrapper } from "./PageWrapper-Dqa3KwTb.js";
import { n as init_ShareIcon508, t as ShareIcon508 } from "./ShareIcon508-QphjVgqd.js";
import { n as init_ReadMore, t as ReadMore } from "./ReadMore-BnLVane6.js";
import "react";
import PropTypes, { oneOfType } from "prop-types";
//#region src/js/components/dataDives/shared/MainCard.jsx
var import_jsx_runtime$5, propTypes$4, MainCard;
var init_MainCard = __esmMin((() => {
	init_index_es();
	import_jsx_runtime$5 = require_jsx_runtime();
	propTypes$4 = {
		image: PropTypes.object,
		heading: oneOfType([PropTypes.element, PropTypes.string]),
		text: oneOfType([
			PropTypes.element,
			PropTypes.string,
			PropTypes.object
		]),
		button: PropTypes.object,
		imageColor: PropTypes.string,
		className: PropTypes.string
	};
	MainCard = ({ image, heading, text, button, imageColor, className }) => /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)(Qs, {
		className: "equity-main-card-content",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)($s, {
			width: 6,
			desktop: 12,
			tablet: 12,
			mobile: 12,
			className: "equityMainCard__image-wrapper",
			children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", {
				className: "equityMainCard__image-background",
				style: { backgroundColor: imageColor },
				children: image
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
			className: `equityMainCard__content-wrapper ${className}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)($s, {
					width: 6,
					desktop: 12,
					tablet: 12,
					mobile: 12,
					className: "equityMainCard__heading-wrapper",
					children: heading
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)($s, {
					width: 6,
					desktop: 12,
					tablet: 12,
					mobile: 12,
					className: "equityMainCard__text-wrapper",
					children: text
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)($s, {
					width: 6,
					desktop: 12,
					tablet: 12,
					mobile: 12,
					className: "equityMainCard__button-wrapper",
					children: button
				})
			]
		})]
	});
	MainCard.propTypes = propTypes$4;
}));
//#endregion
//#region src/js/components/dataDives/shared/MainCards.jsx
var import_jsx_runtime$4, propTypes$3, MainCards;
var init_MainCards = __esmMin((() => {
	init_mobileBreakpoints();
	init_ExternalLink();
	init_Analytics();
	init_index_es();
	init_ReadMore();
	init_MainCard();
	import_jsx_runtime$4 = require_jsx_runtime();
	propTypes$3 = { contentObject: PropTypes.object.isRequired };
	MainCards = ({ contentObject }) => {
		const additionalFunctionality = (expanded) => {
			if (window.innerWidth >= 1200) {
				const toExpand = document.querySelector(".card__toExpand");
				if (!expanded) toExpand.style.paddingBottom = "116px";
				else toExpand.style.paddingBottom = "24px";
			}
		};
		const analyticsEvent = (item) => {
			Analytics.event({
				event: "Data Dives",
				category: "Data Dives: Equity Covid Spending Page Main Card",
				action: `Clicked ${item} See Project Button`
			});
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("section", {
			className: "main-cards__wrapper",
			children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(Qs, {
				className: "grid-content",
				children: Object.keys(contentObject).map((key, index) => {
					const card = contentObject[key];
					const cardContent = card.text.length > 353 ? /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(ReadMore, {
						openIcon: "angle-down",
						closeIcon: "angle-up",
						openPrompt: "Read More",
						closePrompt: "Read Less",
						text: card.text,
						limit: "353",
						additionalFunctionality
					}) : card.text;
					return /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)($s, {
						width: 6,
						desktop: 6,
						tablet: 12,
						mobile: 12,
						className: index % 2 === 0 ? `equity-main-card__col-one` : `equity-main-card__col-two`,
						children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(MainCard, {
							image: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("img", {
								className: "main-cards__svg",
								role: "presentation",
								src: card.img,
								alt: ""
							}),
							imageColor: card.color,
							heading: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("h2", { children: card.heading }),
							text: cardContent,
							button: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(ExternalLink, {
								url: card.link,
								onClick: () => analyticsEvent(/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("h2", { children: card.text })),
								children: "See Project\xA0\xA0"
							})
						})
					});
				})
			})
		});
	};
	MainCards.propTypes = propTypes$3;
}));
//#endregion
//#region src/js/components/dataDives/shared/DataDiveHeading.jsx
var import_jsx_runtime$3, propTypes$2, DataDiveHeading;
var init_DataDiveHeading = __esmMin((() => {
	init_index_es();
	import_jsx_runtime$3 = require_jsx_runtime();
	propTypes$2 = {
		content: PropTypes.object.isRequired,
		postCount: PropTypes.number.isRequired
	};
	DataDiveHeading = ({ content, postCount }) => {
		const { heading, intro, note, collab, date } = content;
		return /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("section", {
			className: "equity-heading",
			"aria-label": "EquityHeading sections",
			children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Qs, {
				className: "grid-content",
				children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)($s, {
					width: 12,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
							className: "equity-heading__heading",
							children: heading
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
							className: "equity-heading__stats-row",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
									className: "equity-heading__pill",
									style: !collab ? { display: "none" } : {},
									children: "Partner Collaboration"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
									className: "equity-heading__date",
									children: date
								}),
								/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
									className: "equity-heading__dot",
									children: "•"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", { children: [postCount, "\xA0posts"] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
							className: "equity-heading__intro",
							children: intro
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
							className: "equity-heading__note",
							children: note
						})
					]
				})
			})
		});
	};
	DataDiveHeading.propTypes = propTypes$2;
}));
//#endregion
//#region src/js/components/sharedComponents/cards/SpotlightCard.jsx
var import_jsx_runtime$2, propTypes$1, SpotlightCard;
var init_SpotlightCard = __esmMin((() => {
	init_index_es();
	import_jsx_runtime$2 = require_jsx_runtime();
	propTypes$1 = {
		icon: PropTypes.object,
		heading: PropTypes.object,
		content: PropTypes.object,
		link: PropTypes.object
	};
	SpotlightCard = ({ icon, heading, content, link }) => /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)(Qs, {
		className: "spotlightCard-content",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)($s, {
				mobile: 12,
				tablet: 1,
				desktop: 1,
				className: "spotlightCard__icon-wrapper",
				children: icon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)($s, {
				mobile: 12,
				tablet: 10,
				className: "spotlightCard__heading-wrapper",
				children: heading
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)($s, {
				width: 12,
				desktop: 12,
				className: "spotlightCard__content-wrapper",
				children: content
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)($s, {
				width: 12,
				desktop: 12,
				className: "spotlightCard__link-wrapper",
				children: link
			})
		]
	});
	SpotlightCard.propTypes = propTypes$1;
}));
//#endregion
//#region src/js/components/dataDives/equity/EquitySpotlightCards.jsx
var import_jsx_runtime$1, propTypes, EquitySpotlightCards;
var init_EquitySpotlightCards = __esmMin((() => {
	init_index_es();
	init_SpotlightCard();
	import_jsx_runtime$1 = require_jsx_runtime();
	propTypes = { content: PropTypes.object };
	EquitySpotlightCards = (props) => {
		const { spotlightCardIcon, spotlightCardTitle, spotlightCardText, spotlightCardLink, trackCardIcon, trackCardTitle, trackCardText, trackCardLink } = props.content;
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("section", {
			className: "equity-spotlight",
			children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)(Qs, {
				className: "grid-content",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)($s, {
					width: 12,
					desktop: 6,
					className: "equity-spotlight__column-one",
					children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(SpotlightCard, {
						icon: spotlightCardIcon,
						heading: spotlightCardTitle,
						content: spotlightCardText,
						link: spotlightCardLink
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)($s, {
					width: 12,
					desktop: 6,
					className: "equity-spotlight__column-two",
					children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(SpotlightCard, {
						icon: trackCardIcon,
						heading: trackCardTitle,
						content: trackCardText,
						link: trackCardLink
					})
				})]
			})
		});
	};
	EquitySpotlightCards.PropTypes = propTypes;
}));
//#endregion
//#region src/_scss/pages/equityCovidSpendingPage/equityCovidSpendingPage.scss
var require_equityCovidSpendingPage = /* @__PURE__ */ __commonJSMin((() => {}));
//#endregion
//#region src/js/components/dataDives/EquityCovidSpendingPage.jsx
var import_jsx_runtime, EquityCovidSpendingPage;
//#endregion
__esmMin((() => {
	init_dist();
	init_socialShare();
	init_Analytics();
	init_es();
	init_development();
	init_ShareIcon508();
	init_PageWrapper();
	init_metaTagHelper();
	init_modalActions();
	init_MainCards();
	init_DataDiveHeading();
	init_EquitySpotlightCards();
	import_jsx_runtime = require_jsx_runtime();
	require_equityCovidSpendingPage();
	EquityCovidSpendingPage = () => {
		const analyticsEvent = (action) => {
			Analytics.event({
				event: "Data Dives",
				category: "Data Dives: Equity Covid Spending Page",
				action
			});
		};
		const spotlightClickHandler = () => {
			analyticsEvent("Spotlight on The Opportunity Project", "Spotlight on The Opportunity Project");
		};
		const covidClickHandler = () => {
			analyticsEvent("Spotlight on COVID Profile", "Spotlight on COVID Profile");
		};
		const HeadingContentObject = {
			heading: "Equity in COVID-19 Spending",
			intro: "We worked with teams from various schools and advocacy groups across the country to create tools for analyzing USAspending data and other federal open datasets to understand how the $4.5 trillion in federal COVID-19 spending has been shared across communities most vulnerable to the impacts of the pandemic.",
			note: "To explore the tools created by these teams and learn more about our collaboration, check out the links below.",
			collab: true,
			date: "Jan 18, 2022",
			postCnt: 4
		};
		const cardsContentObject = {
			bowie: {
				text: "The Bowie State University Opportunity Project uses publicly accessible CDC’s Social Vulnerability Index, CDC’s County vaccination rates, and American Rescue Plan COVID-19 vaccine spending data from USAspending to assess COVID-19 vaccination and equity problems for community leaders as end users.",
				link: "https://a.flow.gl/flow/kx4yer85/display",
				img: "../../../../img/top-bowie-state-combined-image.svg",
				heading: "Bowie State University",
				color: "#ffbe60"
			},
			morehouse: {
				text: "The MSI (Minority Serving Institutions) COVID-19 Relief Dashboard for Equity and Transparency uses several federal datasets surrounding school enrollment and COVID-19 relief awards to highlight whether or not COVID-19 funding was equitably distributed to MSIs around the country for federal, state, and local officials and organizations.",
				link: "https://a.flow.gl/flow/kuo62d54/display",
				img: "../../../../img/top-morehouse-combined-image.svg",
				heading: "Morehouse College",
				color: "#339189"
			},
			kansas: {
				text: "The Child Care Planning Assessment Tool will help community leaders better assess and understand the connection between childcare and equitable labor participation including a county level snapshot of child care supply and demand and interactive calculators to begin addressing child care needs in their community.",
				link: "https://top.kucppr.org/",
				img: "../../../../img/top-university-kansas-combined-image.svg",
				heading: "University of Kansas Center for Public Partnerships and Research",
				color: "#fa9441"
			},
			momproject: {
				text: "The PEI (Predictive Equity Index) model employs machine learning and predictive analytics to understand key drivers of equity in the distribution of PPP loans. This methodology allows for creation of a cohesive dataset, allowing for an in-depth assessment of county-level performance of equity, as well as an understanding of how future actions serve to impact anticipated levels of equity in future funding efforts. Taken together, this product allows for policy makers at the county, state, and national-level to take county-level action maximizing the impact of federal dollars on the communities the investments aim to serve.",
				link: "https://work.themomproject.com/predictiveequity",
				img: "../../../../img/top-mom-project-combined-image.svg",
				heading: "The Mom Project",
				color: "#29abe2"
			}
		};
		const spotlightContentObject = {
			spotlightCardIcon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FontAwesomeIcon, {
				className: "equity-spotlight__star",
				icon: "star",
				size: "xl",
				style: {
					height: "20px",
					width: "20px"
				}
			}) }),
			spotlightCardTitle: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Spotlight on The Opportunity Project" }),
			spotlightCardText: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Learn more about the teams we worked with to help build these interactive tools as part of The Opportunity Project, a U.S. Census Bureau program bringing government, industry, and communities together to create digital products using federal open data to help the public understand real-world problems facing the country today." }),
			spotlightCardLink: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/disaster/covid-19/the-opportunity-project",
				onClick: spotlightClickHandler,
				children: "Learn More"
			}),
			trackCardIcon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FontAwesomeIcon, {
				icon: "chart-bar",
				inverse: true,
				size: "xl",
				style: {
					height: "20px",
					width: "20px"
				}
			}) }),
			trackCardTitle: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"Track ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "COVID-19" }),
				" Spending"
			] }),
			trackCardText: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "See how much the federal government is spending in response to COVID-19. Use our COVID-19 profile page to track who is receiving relief funds, which agencies are paying out these funds, and more. Download the data from the page to create your own analysis!" }),
			trackCardLink: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/disaster/covid-19?publicLaw=all",
				onClick: covidClickHandler,
				children: "Explore Now"
			})
		};
		const slug = "data-dives/equity-COVID-19-spending";
		const emailArgs = {
			subject: "Equity in COVID-19 spending | USAspending.gov",
			body: `Dive into the data with the interactive tools on USAspending.gov to learn about equity in COVID-19 spending: ${getBaseUrl(slug)}`
		};
		const dispatch = useDispatch();
		const handleShareDispatch = (url) => {
			dispatch(showModal(url));
		};
		const handleShare = (optionName) => {
			handleShareOptionClick(optionName, slug, emailArgs, handleShareDispatch);
			analyticsEvent("Share Page");
		};
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageWrapper, {
			pageName: "EquityCovidSpendingPage",
			classNames: "equity-covid-spending-page",
			overLine: "Data Dives",
			title: "Equity in COVID-19 Spending",
			metaTagProps: { ...equityPageMetaTags },
			toolBarComponents: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareIcon508, {
				url: getBaseUrl(slug),
				onShareOptionClick: handleShare
			})],
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				id: "main-content",
				className: "main-content equity-content",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataDiveHeading, {
						content: HeadingContentObject,
						postCount: Object.keys(cardsContentObject).length
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MainCards, { contentObject: cardsContentObject }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EquitySpotlightCards, { content: spotlightContentObject })
				]
			})
		});
	};
}))();
export { EquityCovidSpendingPage as default };
