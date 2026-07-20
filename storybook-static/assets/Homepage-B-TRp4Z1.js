import { n as __esmMin, t as __commonJSMin } from "./rolldown-runtime-D1cXj70v.js";
import { $n as Analytics, An as isCancel, Ar as tc, Ba as init_GlobalConstants, Ca as showSlideout, Dr as sc, Fr as init_dist, Ma as useLocation, Oa as init_development, Oi as init_searchFiltersReducer, Pa as useNavigate, Pr as FontAwesomeIcon, Qa as init_modern, Sa as init_slideoutHelper, Sr as lc, T as init_fiscalYearHelper, Tr as rc, Xt as fetchAllTerms, Zt as init_glossaryHelper, _r as ac, eo as useQuery, er as init_Analytics, et as ExternalLink, fr as Qs, ir as $s, jr as vs, ka as Link, ki as initialState, kn as init_axios, n as init_Loading, nr as api, ro as require_jsx_runtime, rr as init_js_cookie, t as LoadingWrapper, tt as init_ExternalLink, wi as init_moneyFormatter, xr as init_index_es, y as currentFiscalYear, ya as init_mobileBreakpoints, yi as formatMoneyWithUnits, za as globalConstants } from "./index.js-CgeUxZJy.js";
import { D as init_metaTagHelper, E as homePageMetaTags } from "./HeaderContainer-DuB8bISr.js";
import { n as init_PageWrapper, t as PageWrapper } from "./PageWrapper-BZX48lf-.js";
import { n as useLatestAccountData, t as init_WithLatestFy } from "./WithLatestFy-D_VFY3b6.js";
import { n as init_GlossaryLink, t as GlossaryLink } from "./GlossaryLink-Dzf78LU9.js";
import { a as getThumbnailPath, c as transformString, o as init_featuredContentHelper, r as getPrimaryFill } from "./featuredContentHelper-C4z4x-zw.js";
import { n as init_featuredContentMetadata, t as articles } from "./featuredContentMetadata-Cj4BNQNl.js";
import { _ as generateUrlHash, y as init_searchHelper } from "./searchHelper-D0TEuy-H.js";
import { n as useFetchBreakdown, t as init_useFetchBreakdown } from "./useFetchBreakdown-Cl-F-JOx.js";
import React, { createContext, forwardRef, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import { throttle } from "lodash-es";
//#region src/js/components/homepage/Hero/AnimatedHeading.jsx
/**
* AnimatedHeading.jsx
* Created by Andrea Blackwell 03/22
*/
var import_jsx_runtime$13, AnimatedHeading;
var init_AnimatedHeading = __esmMin((() => {
	import_jsx_runtime$13 = require_jsx_runtime();
	AnimatedHeading = ({ paused }) => {
		const wordPairs = [
			[
				"Explore",
				"by industry",
				75
			],
			[
				"Search",
				"by agency",
				75
			],
			[
				"Track",
				"over time",
				75
			],
			[
				"Download",
				"to communities",
				0
			],
			[
				"Analyze",
				"by recipient",
				75
			]
		];
		const [endWordTop, setEndWordTop] = useState();
		const [wordWrap, setWordWrap] = useState(false);
		const [landingCnt, setLandingCnt] = useState(0);
		const [animatedCnt, setAnimatedCnt] = useState(0);
		const [wordOrder, setWordOrder] = useState(wordPairs);
		const [windowWidth, setWindowWidth] = useState();
		const [hidden, setHidden] = useState(false);
		const shuffle = (array) => {
			let currentIndex = array.length, randomIndex;
			while (currentIndex !== 0) {
				randomIndex = Math.floor(Math.random() * currentIndex);
				currentIndex--;
				[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
			}
			return array;
		};
		const pauseAll = (paused) => {
			const intro = document.querySelectorAll(".phrase__intro__item span");
			intro.forEach((item, index) => {
				intro[index].style.animationPlayState = paused ? "paused" : "running";
			});
			const end = document.querySelectorAll(".phrase__end__item span");
			end.forEach((item, index) => {
				end[index].style.animationPlayState = paused ? "paused" : "running";
			});
			document.querySelector(".phrase__intro__item").style.animationPlayState = paused ? "paused" : "running";
			document.querySelector(".phrase__static__item").style.animationPlayState = paused ? "paused" : "running";
			document.querySelector(".phrase__end__item").style.animationPlayState = paused ? "paused" : "running";
			document.querySelector(".landing-phrase").style.animationPlayState = paused ? "paused" : "running";
		};
		const startMainAnimation = () => {
			document.querySelector(".phrase__intro__item .entrance__item")?.classList.add("phrase__intro__item--entrance");
			document.querySelector(".phrase__intro__item .rotating__items")?.classList.add("phrase__intro__item--rotation");
			document.querySelector(".phrase__end__item .entrance__item")?.classList.add("phrase__end__item--entrance");
			document.querySelector(".phrase__end__item .rotating__items")?.classList.add("phrase__end__item--rotation");
			const phrase = document.querySelector(".phrase");
			phrase.style.visibility = "visible";
			const clonedNode = phrase.cloneNode(true);
			phrase.parentNode.replaceChild(clonedNode, phrase);
		};
		const restartPhraseAnimation = () => {
			document.querySelector(".phrase__intro__item")?.classList.remove("phrase--exit-animation");
			document.querySelector(".phrase__static__item")?.classList.remove("phrase--exit-animation");
			document.querySelector(".phrase__end__item")?.classList.remove("phrase--exit-animation");
			document.querySelector(".phrase__intro__item")?.classList.remove("phrase--entrance-animation");
			document.querySelector(".phrase__static__item")?.classList.remove("phrase--entrance-animation");
			document.querySelector(".phrase__end__item")?.classList.remove("phrase--entrance-animation");
			document.querySelector(".phrase__intro__item .entrance__item")?.classList.remove("phrase__intro__item--entrance");
			document.querySelector(".phrase__intro__item .rotating__items")?.classList.remove("phrase__intro__item--rotation");
			document.querySelector(".phrase__end__item .entrance__item")?.classList.remove("phrase__end__item--entrance");
			document.querySelector(".phrase__end__item .rotating__items")?.classList.remove("phrase__end__item--rotation");
			const phrase = document.querySelector(".phrase");
			const clonedNode = phrase.cloneNode(true);
			phrase.parentNode.replaceChild(clonedNode, phrase);
		};
		const restartLandingAnimation = () => {
			const landing = document.querySelector(".landing-phrase");
			landing?.classList.remove("landing-phrase--entrance-animation");
			landing?.classList.add("landing-phrase--exit-animation");
			landing.style.visibility = "visible";
			const clonedNode = landing.cloneNode(true);
			landing.parentNode.replaceChild(clonedNode, landing);
		};
		const handleVisibilityChange = () => {
			if (document[hidden]) pauseAll(true);
			else {
				restartLandingAnimation();
				restartPhraseAnimation();
				setLandingCnt((prevState) => prevState + 1);
			}
		};
		useEffect(() => {
			let visibilityChange;
			if (typeof document.hidden !== "undefined") {
				setHidden("hidden");
				visibilityChange = "visibilitychange";
			} else if (typeof document.msHidden !== "undefined") {
				setHidden("msHidden");
				visibilityChange = "msvisibilitychange";
			} else if (typeof document.webkitHidden !== "undefined") {
				setHidden("webkitHidden");
				visibilityChange = "webkitvisibilitychange";
			}
			document.addEventListener(visibilityChange, handleVisibilityChange, false);
			return () => {
				document.removeEventListener(visibilityChange, handleVisibilityChange);
			};
		}, []);
		useEffect(() => {
			pauseAll(paused);
		}, [paused]);
		useEffect(() => {
			document.querySelector(".phrase").style.visibility = "hidden";
			const landing = document.querySelector(".landing-phrase");
			landing.addEventListener("animationend", () => {
				landing.style.visibility = "hidden";
				document.querySelector(".phrase__intro__item")?.classList.add("phrase--entrance-animation");
				document.querySelector(".phrase__static__item")?.classList.add("phrase--entrance-animation");
				const endPhrase = document.querySelector(".phrase__end__item");
				endPhrase?.classList.add("phrase--entrance-animation");
				endPhrase.addEventListener("animationend", () => {
					startMainAnimation();
					setAnimatedCnt((prevState) => prevState + 1);
				});
			});
		}, [landingCnt]);
		useEffect(() => {
			const animated = document.querySelector(".phrase__end__item .rotating__items").lastElementChild;
			setWordOrder((prevState) => shuffle(prevState));
			animated.addEventListener("animationstart", () => {
				setTimeout(() => {
					document.querySelector(".phrase__intro__item")?.classList.add("phrase--exit-animation");
					document.querySelector(".phrase__static__item")?.classList.add("phrase--exit-animation");
					const endPhrase = document.querySelector(".phrase__end__item");
					endPhrase?.classList.add("phrase--exit-animation");
					endPhrase.addEventListener("animationend", () => {
						document.querySelector(".phrase").style.visibility = "hidden";
						restartLandingAnimation();
						setTimeout(() => {
							restartPhraseAnimation();
							setLandingCnt((prevState) => prevState + 1);
						}, [1e3]);
					}, 2e3);
				}, 2100);
			});
		}, [animatedCnt]);
		const handleWindowResize = () => {
			const tempEndPart = document.querySelector(".phrase__end");
			const tempStaticPart = document.querySelector(".phrase__static__item");
			if (endWordTop !== tempEndPart.offsetTop) {
				setEndWordTop(tempEndPart.offsetTop);
				setWordWrap(tempEndPart.offsetTop - tempStaticPart.offsetTop > 10);
			}
			const newWidth = window.innerWidth;
			if (windowWidth !== newWidth) setWindowWidth(newWidth);
		};
		useEffect(() => {
			handleWindowResize();
			window.addEventListener("resize", handleWindowResize);
			return () => {
				window.removeEventListener("resize", handleWindowResize);
			};
		});
		const rotatingText = () => /* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("div", {
			className: "hero__headline",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("h1", {
				className: "landing-phrase landing-phrase--entrance-animation",
				children: /* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("div", { children: [
					"The official source ",
					/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("span", {
						style: { whiteSpace: "nowrap" },
						children: "of government"
					}),
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("span", {
						style: { whiteSpace: "nowrap" },
						children: "spending data"
					})
				] })
			}), /* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("div", {
				className: "phrase",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("div", {
						className: "phrase__intro",
						children: /* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("div", {
							className: "phrase__intro__item",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("div", {
								className: "entrance__item",
								children: /* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("span", { children: [wordOrder[0][0], "\xA0"] })
							}), /* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("div", {
								className: "rotating__items",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("span", { children: [wordOrder[1][0], "\xA0"] }),
									/* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("span", { children: [wordOrder[2][0], "\xA0"] }),
									/* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("span", { children: [wordOrder[3][0], "\xA0"] }),
									/* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("span", { children: [wordOrder[4][0], "\xA0"] })
								]
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("div", {
						className: "phrase__static__item",
						children: /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("span", { children: "government spending\xA0" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("div", {
						className: "phrase__end",
						children: /* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("div", {
							className: "phrase__end__item",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("div", {
								className: "entrance__item",
								children: /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("span", {
									style: { left: wordWrap ? `${wordOrder[0][2]}px` : `0` },
									children: wordOrder[0][1]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime$13.jsxs)("div", {
								className: "rotating__items",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("span", {
										style: { left: wordWrap ? `${wordOrder[1][2]}px` : `0` },
										children: wordOrder[1][1]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("span", {
										style: { left: wordWrap ? `${wordOrder[2][2]}px` : `0` },
										children: wordOrder[2][1]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("span", {
										style: { left: wordWrap ? `${wordOrder[3][2]}px` : `0` },
										children: wordOrder[3][1]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("span", {
										style: { left: wordWrap ? `${wordOrder[4][2]}px` : `0` },
										children: wordOrder[4][1]
									})
								]
							})]
						})
					})
				]
			})]
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(import_jsx_runtime$13.Fragment, { children: rotatingText() });
	};
}));
//#endregion
//#region src/js/components/homepage/Hero/Hero.jsx
/**
* Hero.jsx
* Created by Brian Petway 03/22
*/
var import_jsx_runtime$12, Hero;
var init_Hero = __esmMin((() => {
	init_development();
	init_dist();
	init_index_es();
	init_mobileBreakpoints();
	init_Analytics();
	init_AnimatedHeading();
	import_jsx_runtime$12 = require_jsx_runtime();
	Hero = () => {
		const [isPaused, setIsPaused] = useState(false);
		const [windowWidth, setWindowWidth] = useState(0);
		const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 992);
		const trackSearchLink = () => Analytics.event({
			event: "homepage_start_searching_awards",
			category: "Homepage",
			action: "Link",
			label: "search"
		});
		const trackAboutLink = () => Analytics.event({
			event: "homepage_link",
			category: "Homepage",
			action: "Link",
			label: "about"
		});
		const history = useNavigate();
		const handleSearch = () => {
			trackSearchLink();
			history("/search");
		};
		const handleDataSources = () => {
			trackAboutLink();
			history(`/data-sources`);
		};
		const keyPressHandler = (e) => {
			if (e.key === "Enter") {
				e.preventDefault();
				setIsPaused((previousIsPaused) => !previousIsPaused);
			}
		};
		useEffect(() => {
			const handleResize = throttle(() => {
				const newWidth = window.innerWidth;
				if (windowWidth !== newWidth) {
					setWindowWidth(newWidth);
					setIsLargeScreen(newWidth >= 992);
				}
			}, 50);
			window.addEventListener("resize", handleResize);
			return () => window.removeEventListener("resize", handleResize);
		}, [windowWidth]);
		return /* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)("section", {
			className: "homepage-hero",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)("div", {
				className: "homepage-hero-content",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(AnimatedHeading, { paused: isPaused }), /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("div", {
					className: "hero__lower-wrapper",
					children: /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("div", {
						className: "hero__center-content-wrapper",
						children: /* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)("div", {
							className: "hero__center-content",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)("div", {
									className: "hero__button-container",
									children: [/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(sc, {
										buttonSize: "lg",
										copy: "Start Searching Awards",
										buttonTitle: "Start Searching Awards",
										buttonType: "primary",
										backgroundColor: "light",
										onClick: handleSearch
									}), /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(sc, {
										buttonSize: "lg",
										copy: "Learn About USAspending.gov",
										buttonTitle: "Learn About USAspending.gov",
										buttonType: "secondary",
										backgroundColor: "light",
										onClick: handleDataSources
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("div", {
									className: "hero__text-container",
									children: /* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)("p", { children: [
										"USAspending is the official open data source of federal spending information, ",
										/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("br", {}),
										"including information about federal awards such as contracts, grants, and loans."
									] })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("div", {
									className: "hero__pause-button-container",
									children: /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("a", {
										className: "hero__pause-button",
										role: "button",
										tabIndex: "0",
										onClick: () => {
											setIsPaused((previousIsPaused) => !previousIsPaused);
										},
										onKeyPress: (e) => {
											keyPressHandler(e);
										},
										children: isPaused ? /* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)(import_jsx_runtime$12.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(FontAwesomeIcon, {
											icon: "play",
											width: 10
										}), "\xA0\xA0Play text animation"] }) : /* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)(import_jsx_runtime$12.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)(FontAwesomeIcon, {
											icon: "pause",
											width: 10
										}), "\xA0\xA0Pause text animation"] })
									})
								})
							]
						})
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)("div", {
				className: "homepage-hero-graphic-container",
				children: [isLargeScreen && /* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)("div", {
					className: "homepage-hero-graphic",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("div", {
							className: "hero__graphic-layer-background",
							children: /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("img", {
								role: "presentation",
								src: "../../../../img/homepage-hero/desktop/hero-graphic-background-mountains@2x.webp",
								alt: ""
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("div", {
							className: "hero__graphic-layer-bridge",
							children: /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("img", {
								role: "presentation",
								src: "../../../../img/homepage-hero/desktop/hero-graphic-background-bridge@2x.webp",
								alt: ""
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("div", {
							className: "hero__graphic-layer-buildings",
							children: /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("img", {
								role: "presentation",
								src: "../../../../img/homepage-hero/desktop/hero-graphic-background-left-hill@2x.webp",
								alt: ""
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("div", {
							className: "hero__graphic-layer-windmills",
							children: /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("img", {
								role: "presentation",
								src: "../../../../img/homepage-hero/desktop/hero-graphic-background-right-hill@2x.webp",
								alt: ""
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("div", {
							className: "hero__graphic-layer-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("img", {
								role: "presentation",
								src: "../../../../img/homepage-hero/desktop/hero-graphic-foreground@2x.webp",
								alt: ""
							})
						})
					]
				}), !isLargeScreen && /* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)("div", {
					className: "homepage-hero-graphic",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("div", {
							className: "hero__graphic-layer-windmills",
							children: /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("img", {
								role: "presentation",
								src: "../../../../img/homepage-hero/mobile/mobile-hero-graphic-background-right-hill@2x.webp",
								alt: ""
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("div", {
							className: "hero__graphic-layer-background",
							children: /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("img", {
								role: "presentation",
								src: "../../../../img/homepage-hero/mobile/mobile-hero-graphic-background-left-hill@2x.webp",
								alt: ""
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("div", {
							className: "hero__graphic-layer-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("img", {
								role: "presentation",
								src: "../../../../img/homepage-hero/mobile/mobile-hero-graphic-foreground@2x.webp",
								alt: ""
							})
						})
					]
				})]
			})]
		});
	};
}));
//#endregion
//#region src/js/components/homepage/SummaryStats.jsx
/**
* SummaryStats.jsx
* Created by Andrea Blackwell 07/18/22
*/
var import_jsx_runtime$11, budgetCategories, trackExplorerLink, trackBudgetFunctionLink, SummaryStats;
var init_SummaryStats = __esmMin((() => {
	init_axios();
	init_index_es();
	init_development();
	init_dist();
	init_GlobalConstants();
	init_moneyFormatter();
	init_Analytics();
	init_searchHelper();
	init_searchFiltersReducer();
	init_useFetchBreakdown();
	init_WithLatestFy();
	import_jsx_runtime$11 = require_jsx_runtime();
	budgetCategories = [
		{ name: "Medicare" },
		{ name: "National Defense" },
		{ name: "Social Security" },
		{ name: "Transportation" },
		{ name: "Agriculture" },
		{
			name: "Veterans Benefits and Services",
			label: "Veterans Benefits"
		},
		{ name: "Energy" },
		{ name: "Net Interest" }
	];
	trackExplorerLink = () => Analytics.event({
		event: "homepage-summary-stats",
		category: "Homepage",
		action: "Link",
		label: "explorer"
	});
	trackBudgetFunctionLink = (title) => Analytics.event({
		event: "homepage-summary-stats",
		category: "Homepage - Summary Stats Budget Function Title Click",
		action: "Link",
		label: `clicked - ${title}`
	});
	SummaryStats = () => {
		const [, , { year: latestFy, period: latestPeriod }] = useLatestAccountData();
		const { data, total: budgetTotal, randomIndex, error, loading } = useFetchBreakdown(useMemo(() => ({
			type: "budget_function",
			filters: {
				fy: latestFy,
				period: latestPeriod
			}
		}), [latestFy, latestPeriod]));
		const hashRef = useRef(null);
		const budgetData = [];
		data?.results.forEach((item) => {
			const budgetCategoriesIndex = budgetCategories.map((e) => e.name).indexOf(item.name);
			if (budgetCategoriesIndex > -1) {
				const name = "label" in budgetCategories[budgetCategoriesIndex] ? budgetCategories[budgetCategoriesIndex].label : budgetCategories[budgetCategoriesIndex].name;
				budgetData.push({
					name,
					amount: item.amount
				});
			}
		});
		const performSearch = (title, e) => {
			e.preventDefault();
			const filterValue = {
				filters: {
					...initialState,
					keyword: { [title]: title }
				},
				version: globalConstants.REQUEST_VERSION
			};
			hashRef.current = generateUrlHash(filterValue);
			hashRef.current.promise.then((results) => {
				const hashData = results.data;
				trackBudgetFunctionLink(title);
				window.open(`/search?hash=${encodeURIComponent(hashData.hash)}`, "_blank");
				hashRef.current = null;
			}).catch((hashError) => {
				console.log(hashError);
				if (isCancel(hashError)) {} else {
					hashRef.current = null;
					console.log(error);
				}
			});
		};
		const renderLink = (name) => /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("a", {
			role: "button",
			tabIndex: 0,
			"aria-label": "View awards",
			onKeyDown: (e) => {
				if (e.key === "Enter") performSearch(name, e);
			},
			onClick: (e) => performSearch(name, e),
			children: name
		});
		const loadBudgetItem = (index) => {
			if (loading) return /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("span", { className: "dot-pulse" });
			return /* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)(import_jsx_runtime$11.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("span", {
					className: "budget-item__amount",
					children: formatMoneyWithUnits(budgetData[index % budgetData?.length]?.amount)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("br", {}),
				/* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("span", {
					className: "budget-item__name",
					children: [!error ? "on " : "", renderLink(budgetData[index % budgetData?.length]?.name)]
				})
			] });
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("section", {
			className: "summary-stats",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("div", {
				className: "summary-stats-desktop",
				children: /* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)(Qs, {
					className: "grid-content",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)($s, {
							width: 4,
							className: "summary-stats__budget-total-container",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("span", { children: "So far this year, the federal government" }),
								/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("br", {}),
								/* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("span", { children: [
									"plans to spend ",
									loading ? /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("span", { className: "dot-pulse" }) : /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("span", {
										className: "summary-stats__budget-total",
										children: formatMoneyWithUnits(budgetTotal)
									}),
									" including…"
								] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)($s, {
							className: "summary-stats__budget-items",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("div", {
									className: "summary-stats__budget-item",
									children: loadBudgetItem(randomIndex)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("div", {
									className: "summary-stats__budget-item",
									children: loadBudgetItem(randomIndex + 1)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("div", {
									className: "summary-stats__budget-item",
									children: loadBudgetItem(randomIndex + 2)
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("div", {
							style: {
								display: "flex",
								flexDirection: "row",
								justifyContent: "center"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("div", {
								className: "summary-stats__vertical-border",
								children: "\xA0"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)($s, {
							width: 2,
							className: "summary-stats__spending-link",
							children: /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(Qs, { children: /* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)(Link, {
								to: "/explorer/budget_function",
								onClick: trackExplorerLink,
								children: [/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("div", {
									className: "summary-stats__spending-link-text",
									children: /* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("div", { children: [
										"See more breakdowns",
										/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("br", {}),
										"of federal spending"
									] })
								}), /* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("div", {
									className: "icon-stack",
									style: {
										position: "relative",
										justifyContent: "center",
										alignItems: "center",
										marginTop: "8px"
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(FontAwesomeIcon, {
										color: "white",
										icon: "circle",
										style: {
											position: "absolute",
											width: "24",
											height: "24"
										}
									}), /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(FontAwesomeIcon, {
										className: "arrow-circle-right",
										icon: "arrow-circle-right",
										style: { position: "absolute" }
									})]
								})]
							}) })
						})
					]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("div", {
				className: "summary-stats-mobile",
				children: /* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)(Qs, {
					className: "grid-content",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)($s, {
							width: 12,
							className: "summary-stats__budget-total-container",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("span", { children: ["So far this year,", /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("span", {
									style: { whiteSpace: "nowrap" },
									children: "the federal government"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("br", {}),
								/* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("span", { children: [
									"plans to spend",
									loading ? /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("span", { className: "dot-pulse" }) : /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("span", {
										className: "summary-stats__budget-total",
										children: formatMoneyWithUnits(budgetTotal)
									}),
									"including…"
								] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)($s, {
							width: 12,
							className: "summary-stats__budget-items",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("div", {
									className: "summary-stats__budget-item",
									children: loadBudgetItem(randomIndex)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("div", {
									className: "summary-stats__budget-item",
									children: loadBudgetItem(randomIndex + 1)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("div", {
									className: "summary-stats__budget-item",
									children: loadBudgetItem(randomIndex + 2)
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)($s, {
							width: 12,
							className: "summary-stats__spending-link",
							children: /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(Qs, { children: /* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)(Link, {
								to: "/explorer/budget_function",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("div", {
									className: "summary-stats__spending-link-text",
									children: "See more breakdowns of federal spending"
								}), /* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("div", {
									className: "icon-stack",
									style: {
										position: "relative",
										justifyContent: "center",
										alignItems: "center"
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(FontAwesomeIcon, {
										color: "white",
										icon: "circle",
										style: {
											position: "absolute",
											width: "24",
											height: "24"
										}
									}), /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)(FontAwesomeIcon, {
										className: "arrow-circle-right",
										icon: "arrow-circle-right",
										style: { position: "absolute" }
									})]
								})]
							}) })
						})
					]
				})
			})]
		});
	};
}));
//#endregion
//#region node_modules/swiper/shared/ssr-window.esm.mjs
/**
* SSR Window 5.0.1
* Better handling for window object in SSR environment
* https://github.com/nolimits4web/ssr-window
*
* Copyright 2025, Vladimir Kharlampidi
*
* Licensed under MIT
*
* Released on: June 27, 2025
*/
function isObject$3(obj) {
	return obj !== null && typeof obj === "object" && "constructor" in obj && obj.constructor === Object;
}
function extend$2(target = {}, src = {}) {
	const noExtend = [
		"__proto__",
		"constructor",
		"prototype"
	];
	Object.keys(src).filter((key) => noExtend.indexOf(key) < 0).forEach((key) => {
		if (typeof target[key] === "undefined") target[key] = src[key];
		else if (isObject$3(src[key]) && isObject$3(target[key]) && Object.keys(src[key]).length > 0) extend$2(target[key], src[key]);
	});
}
function getDocument() {
	const doc = typeof document !== "undefined" ? document : {};
	extend$2(doc, ssrDocument);
	return doc;
}
function getWindow() {
	const win = typeof window !== "undefined" ? window : {};
	extend$2(win, ssrWindow);
	return win;
}
var ssrDocument, ssrWindow;
var init_ssr_window_esm = __esmMin((() => {
	ssrDocument = {
		body: {},
		addEventListener() {},
		removeEventListener() {},
		activeElement: {
			blur() {},
			nodeName: ""
		},
		querySelector() {
			return null;
		},
		querySelectorAll() {
			return [];
		},
		getElementById() {
			return null;
		},
		createEvent() {
			return { initEvent() {} };
		},
		createElement() {
			return {
				children: [],
				childNodes: [],
				style: {},
				setAttribute() {},
				getElementsByTagName() {
					return [];
				}
			};
		},
		createElementNS() {
			return {};
		},
		importNode() {
			return null;
		},
		location: {
			hash: "",
			host: "",
			hostname: "",
			href: "",
			origin: "",
			pathname: "",
			protocol: "",
			search: ""
		}
	};
	ssrWindow = {
		document: ssrDocument,
		navigator: { userAgent: "" },
		location: {
			hash: "",
			host: "",
			hostname: "",
			href: "",
			origin: "",
			pathname: "",
			protocol: "",
			search: ""
		},
		history: {
			replaceState() {},
			pushState() {},
			go() {},
			back() {}
		},
		CustomEvent: function CustomEvent() {
			return this;
		},
		addEventListener() {},
		removeEventListener() {},
		getComputedStyle() {
			return { getPropertyValue() {
				return "";
			} };
		},
		Image() {},
		Date() {},
		screen: {},
		setTimeout() {},
		clearTimeout() {},
		matchMedia() {
			return {};
		},
		requestAnimationFrame(callback) {
			if (typeof setTimeout === "undefined") {
				callback();
				return null;
			}
			return setTimeout(callback, 0);
		},
		cancelAnimationFrame(id) {
			if (typeof setTimeout === "undefined") return;
			clearTimeout(id);
		}
	};
}));
//#endregion
//#region node_modules/swiper/shared/utils.mjs
function classesToTokens(classes = "") {
	return classes.trim().split(" ").filter((c) => !!c.trim());
}
function deleteProps(obj) {
	const object = obj;
	Object.keys(object).forEach((key) => {
		try {
			object[key] = null;
		} catch (e) {}
		try {
			delete object[key];
		} catch (e) {}
	});
}
function nextTick(callback, delay = 0) {
	return setTimeout(callback, delay);
}
function now() {
	return Date.now();
}
function getComputedStyle$1(el) {
	const window = getWindow();
	let style;
	if (window.getComputedStyle) style = window.getComputedStyle(el, null);
	if (!style && el.currentStyle) style = el.currentStyle;
	if (!style) style = el.style;
	return style;
}
function getTranslate(el, axis = "x") {
	const window = getWindow();
	let matrix;
	let curTransform;
	let transformMatrix;
	const curStyle = getComputedStyle$1(el);
	if (window.WebKitCSSMatrix) {
		curTransform = curStyle.transform || curStyle.webkitTransform;
		if (curTransform.split(",").length > 6) curTransform = curTransform.split(", ").map((a) => a.replace(",", ".")).join(", ");
		transformMatrix = new window.WebKitCSSMatrix(curTransform === "none" ? "" : curTransform);
	} else {
		transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,");
		matrix = transformMatrix.toString().split(",");
	}
	if (axis === "x") if (window.WebKitCSSMatrix) curTransform = transformMatrix.m41;
	else if (matrix.length === 16) curTransform = parseFloat(matrix[12]);
	else curTransform = parseFloat(matrix[4]);
	if (axis === "y") if (window.WebKitCSSMatrix) curTransform = transformMatrix.m42;
	else if (matrix.length === 16) curTransform = parseFloat(matrix[13]);
	else curTransform = parseFloat(matrix[5]);
	return curTransform || 0;
}
function isObject$2(o) {
	return typeof o === "object" && o !== null && o.constructor && Object.prototype.toString.call(o).slice(8, -1) === "Object";
}
function isNode(node) {
	if (typeof window !== "undefined" && typeof window.HTMLElement !== "undefined") return node instanceof HTMLElement;
	return node && (node.nodeType === 1 || node.nodeType === 11);
}
function extend$1(...args) {
	const to = Object(args[0]);
	for (let i = 1; i < args.length; i += 1) {
		const nextSource = args[i];
		if (nextSource !== void 0 && nextSource !== null && !isNode(nextSource)) {
			const keysArray = Object.keys(Object(nextSource)).filter((key) => key !== "__proto__" && key !== "constructor" && key !== "prototype");
			for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
				const nextKey = keysArray[nextIndex];
				const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
				if (desc !== void 0 && desc.enumerable) if (isObject$2(to[nextKey]) && isObject$2(nextSource[nextKey])) if (nextSource[nextKey].__swiper__) to[nextKey] = nextSource[nextKey];
				else extend$1(to[nextKey], nextSource[nextKey]);
				else if (!isObject$2(to[nextKey]) && isObject$2(nextSource[nextKey])) {
					to[nextKey] = {};
					if (nextSource[nextKey].__swiper__) to[nextKey] = nextSource[nextKey];
					else extend$1(to[nextKey], nextSource[nextKey]);
				} else to[nextKey] = nextSource[nextKey];
			}
		}
	}
	return to;
}
function setCSSProperty(el, varName, varValue) {
	el.style.setProperty(varName, varValue);
}
function animateCSSModeScroll({ swiper, targetPosition, side }) {
	const window = getWindow();
	const startPosition = -swiper.translate;
	let startTime = null;
	let time;
	const duration = swiper.params.speed;
	swiper.wrapperEl.style.scrollSnapType = "none";
	window.cancelAnimationFrame(swiper.cssModeFrameID);
	const dir = targetPosition > startPosition ? "next" : "prev";
	const isOutOfBound = (current, target) => {
		return dir === "next" && current >= target || dir === "prev" && current <= target;
	};
	const animate = () => {
		time = (/* @__PURE__ */ new Date()).getTime();
		if (startTime === null) startTime = time;
		const progress = Math.max(Math.min((time - startTime) / duration, 1), 0);
		const easeProgress = .5 - Math.cos(progress * Math.PI) / 2;
		let currentPosition = startPosition + easeProgress * (targetPosition - startPosition);
		if (isOutOfBound(currentPosition, targetPosition)) currentPosition = targetPosition;
		swiper.wrapperEl.scrollTo({ [side]: currentPosition });
		if (isOutOfBound(currentPosition, targetPosition)) {
			swiper.wrapperEl.style.overflow = "hidden";
			swiper.wrapperEl.style.scrollSnapType = "";
			setTimeout(() => {
				swiper.wrapperEl.style.overflow = "";
				swiper.wrapperEl.scrollTo({ [side]: currentPosition });
			});
			window.cancelAnimationFrame(swiper.cssModeFrameID);
			return;
		}
		swiper.cssModeFrameID = window.requestAnimationFrame(animate);
	};
	animate();
}
function elementChildren(element, selector = "") {
	const window = getWindow();
	const children = [...element.children];
	if (window.HTMLSlotElement && element instanceof HTMLSlotElement) children.push(...element.assignedElements());
	if (!selector) return children;
	return children.filter((el) => el.matches(selector));
}
function elementIsChildOfSlot(el, slot) {
	const elementsQueue = [slot];
	while (elementsQueue.length > 0) {
		const elementToCheck = elementsQueue.shift();
		if (el === elementToCheck) return true;
		elementsQueue.push(...elementToCheck.children, ...elementToCheck.shadowRoot ? elementToCheck.shadowRoot.children : [], ...elementToCheck.assignedElements ? elementToCheck.assignedElements() : []);
	}
}
function elementIsChildOf(el, parent) {
	const window = getWindow();
	let isChild = parent.contains(el);
	if (!isChild && window.HTMLSlotElement && parent instanceof HTMLSlotElement) {
		isChild = [...parent.assignedElements()].includes(el);
		if (!isChild) isChild = elementIsChildOfSlot(el, parent);
	}
	return isChild;
}
function showWarning(text) {
	try {
		console.warn(text);
		return;
	} catch (err) {}
}
function createElement$1(tag, classes = []) {
	const el = document.createElement(tag);
	el.classList.add(...Array.isArray(classes) ? classes : classesToTokens(classes));
	return el;
}
function elementOffset(el) {
	const window = getWindow();
	const document = getDocument();
	const box = el.getBoundingClientRect();
	const body = document.body;
	const clientTop = el.clientTop || body.clientTop || 0;
	const clientLeft = el.clientLeft || body.clientLeft || 0;
	const scrollTop = el === window ? window.scrollY : el.scrollTop;
	const scrollLeft = el === window ? window.scrollX : el.scrollLeft;
	return {
		top: box.top + scrollTop - clientTop,
		left: box.left + scrollLeft - clientLeft
	};
}
function elementPrevAll(el, selector) {
	const prevEls = [];
	while (el.previousElementSibling) {
		const prev = el.previousElementSibling;
		if (selector) {
			if (prev.matches(selector)) prevEls.push(prev);
		} else prevEls.push(prev);
		el = prev;
	}
	return prevEls;
}
function elementNextAll(el, selector) {
	const nextEls = [];
	while (el.nextElementSibling) {
		const next = el.nextElementSibling;
		if (selector) {
			if (next.matches(selector)) nextEls.push(next);
		} else nextEls.push(next);
		el = next;
	}
	return nextEls;
}
function elementStyle(el, prop) {
	return getWindow().getComputedStyle(el, null).getPropertyValue(prop);
}
function elementIndex(el) {
	let child = el;
	let i;
	if (child) {
		i = 0;
		while ((child = child.previousSibling) !== null) if (child.nodeType === 1) i += 1;
		return i;
	}
}
function elementParents(el, selector) {
	const parents = [];
	let parent = el.parentElement;
	while (parent) {
		if (selector) {
			if (parent.matches(selector)) parents.push(parent);
		} else parents.push(parent);
		parent = parent.parentElement;
	}
	return parents;
}
function elementOuterSize(el, size, includeMargins) {
	const window = getWindow();
	if (includeMargins) return el[size === "width" ? "offsetWidth" : "offsetHeight"] + parseFloat(window.getComputedStyle(el, null).getPropertyValue(size === "width" ? "margin-right" : "margin-top")) + parseFloat(window.getComputedStyle(el, null).getPropertyValue(size === "width" ? "margin-left" : "margin-bottom"));
	return el.offsetWidth;
}
function makeElementsArray(el) {
	return (Array.isArray(el) ? el : [el]).filter((e) => !!e);
}
function setInnerHTML(el, html = "") {
	if (typeof trustedTypes !== "undefined") el.innerHTML = trustedTypes.createPolicy("html", { createHTML: (s) => s }).createHTML(html);
	else el.innerHTML = html;
}
var init_utils = __esmMin((() => {
	init_ssr_window_esm();
}));
//#endregion
//#region node_modules/swiper/shared/swiper-core.mjs
function calcSupport() {
	const window = getWindow();
	const document = getDocument();
	return {
		smoothScroll: document.documentElement && document.documentElement.style && "scrollBehavior" in document.documentElement.style,
		touch: !!("ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch)
	};
}
function getSupport() {
	if (!support) support = calcSupport();
	return support;
}
function calcDevice({ userAgent } = {}) {
	const support = getSupport();
	const window = getWindow();
	const platform = window.navigator.platform;
	const ua = userAgent || window.navigator.userAgent;
	const device = {
		ios: false,
		android: false
	};
	const screenWidth = window.screen.width;
	const screenHeight = window.screen.height;
	const android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
	let ipad = ua.match(/(iPad)(?!\1).*OS\s([\d_]+)/);
	const ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
	const iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
	const windows = platform === "Win32";
	let macos = platform === "MacIntel";
	if (!ipad && macos && support.touch && [
		"1024x1366",
		"1366x1024",
		"834x1194",
		"1194x834",
		"834x1112",
		"1112x834",
		"768x1024",
		"1024x768",
		"820x1180",
		"1180x820",
		"810x1080",
		"1080x810"
	].indexOf(`${screenWidth}x${screenHeight}`) >= 0) {
		ipad = ua.match(/(Version)\/([\d.]+)/);
		if (!ipad) ipad = [
			0,
			1,
			"13_0_0"
		];
		macos = false;
	}
	if (android && !windows) {
		device.os = "android";
		device.android = true;
	}
	if (ipad || iphone || ipod) {
		device.os = "ios";
		device.ios = true;
	}
	return device;
}
function getDevice(overrides = {}) {
	if (!deviceCached) deviceCached = calcDevice(overrides);
	return deviceCached;
}
function calcBrowser() {
	const window = getWindow();
	const device = getDevice();
	let needPerspectiveFix = false;
	function isSafari() {
		const ua = window.navigator.userAgent.toLowerCase();
		return ua.indexOf("safari") >= 0 && ua.indexOf("chrome") < 0 && ua.indexOf("android") < 0;
	}
	if (isSafari()) {
		const ua = String(window.navigator.userAgent);
		if (ua.includes("Version/")) {
			const [major, minor] = ua.split("Version/")[1].split(" ")[0].split(".").map((num) => Number(num));
			needPerspectiveFix = major < 16 || major === 16 && minor < 2;
		}
	}
	const isWebView = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window.navigator.userAgent);
	const isSafariBrowser = isSafari();
	const need3dFix = isSafariBrowser || isWebView && device.ios;
	return {
		isSafari: needPerspectiveFix || isSafariBrowser,
		needPerspectiveFix,
		need3dFix,
		isWebView
	};
}
function getBrowser() {
	if (!browser) browser = calcBrowser();
	return browser;
}
function Resize({ swiper, on, emit }) {
	const window = getWindow();
	let observer = null;
	let animationFrame = null;
	const resizeHandler = () => {
		if (!swiper || swiper.destroyed || !swiper.initialized) return;
		emit("beforeResize");
		emit("resize");
	};
	const createObserver = () => {
		if (!swiper || swiper.destroyed || !swiper.initialized) return;
		observer = new ResizeObserver((entries) => {
			animationFrame = window.requestAnimationFrame(() => {
				const { width, height } = swiper;
				let newWidth = width;
				let newHeight = height;
				entries.forEach(({ contentBoxSize, contentRect, target }) => {
					if (target && target !== swiper.el) return;
					newWidth = contentRect ? contentRect.width : (contentBoxSize[0] || contentBoxSize).inlineSize;
					newHeight = contentRect ? contentRect.height : (contentBoxSize[0] || contentBoxSize).blockSize;
				});
				if (newWidth !== width || newHeight !== height) resizeHandler();
			});
		});
		observer.observe(swiper.el);
	};
	const removeObserver = () => {
		if (animationFrame) window.cancelAnimationFrame(animationFrame);
		if (observer && observer.unobserve && swiper.el) {
			observer.unobserve(swiper.el);
			observer = null;
		}
	};
	const orientationChangeHandler = () => {
		if (!swiper || swiper.destroyed || !swiper.initialized) return;
		emit("orientationchange");
	};
	on("init", () => {
		if (swiper.params.resizeObserver && typeof window.ResizeObserver !== "undefined") {
			createObserver();
			return;
		}
		window.addEventListener("resize", resizeHandler);
		window.addEventListener("orientationchange", orientationChangeHandler);
	});
	on("destroy", () => {
		removeObserver();
		window.removeEventListener("resize", resizeHandler);
		window.removeEventListener("orientationchange", orientationChangeHandler);
	});
}
function Observer({ swiper, extendParams, on, emit }) {
	const observers = [];
	const window = getWindow();
	const attach = (target, options = {}) => {
		const observer = new (window.MutationObserver || window.WebkitMutationObserver)((mutations) => {
			if (swiper.__preventObserver__) return;
			if (mutations.length === 1) {
				emit("observerUpdate", mutations[0]);
				return;
			}
			const observerUpdate = function observerUpdate() {
				emit("observerUpdate", mutations[0]);
			};
			if (window.requestAnimationFrame) window.requestAnimationFrame(observerUpdate);
			else window.setTimeout(observerUpdate, 0);
		});
		observer.observe(target, {
			attributes: typeof options.attributes === "undefined" ? true : options.attributes,
			childList: swiper.isElement || (typeof options.childList === "undefined" ? true : options).childList,
			characterData: typeof options.characterData === "undefined" ? true : options.characterData
		});
		observers.push(observer);
	};
	const init = () => {
		if (!swiper.params.observer) return;
		if (swiper.params.observeParents) {
			const containerParents = elementParents(swiper.hostEl);
			for (let i = 0; i < containerParents.length; i += 1) attach(containerParents[i]);
		}
		attach(swiper.hostEl, { childList: swiper.params.observeSlideChildren });
		attach(swiper.wrapperEl, { attributes: false });
	};
	const destroy = () => {
		observers.forEach((observer) => {
			observer.disconnect();
		});
		observers.splice(0, observers.length);
	};
	extendParams({
		observer: false,
		observeParents: false,
		observeSlideChildren: false
	});
	on("init", init);
	on("destroy", destroy);
}
function updateSize() {
	const swiper = this;
	let width;
	let height;
	const el = swiper.el;
	if (typeof swiper.params.width !== "undefined" && swiper.params.width !== null) width = swiper.params.width;
	else width = el.clientWidth;
	if (typeof swiper.params.height !== "undefined" && swiper.params.height !== null) height = swiper.params.height;
	else height = el.clientHeight;
	if (width === 0 && swiper.isHorizontal() || height === 0 && swiper.isVertical()) return;
	width = width - parseInt(elementStyle(el, "padding-left") || 0, 10) - parseInt(elementStyle(el, "padding-right") || 0, 10);
	height = height - parseInt(elementStyle(el, "padding-top") || 0, 10) - parseInt(elementStyle(el, "padding-bottom") || 0, 10);
	if (Number.isNaN(width)) width = 0;
	if (Number.isNaN(height)) height = 0;
	Object.assign(swiper, {
		width,
		height,
		size: swiper.isHorizontal() ? width : height
	});
}
function updateSlides() {
	const swiper = this;
	function getDirectionPropertyValue(node, label) {
		return parseFloat(node.getPropertyValue(swiper.getDirectionLabel(label)) || 0);
	}
	const params = swiper.params;
	const { wrapperEl, slidesEl, rtlTranslate: rtl, wrongRTL } = swiper;
	const isVirtual = swiper.virtual && params.virtual.enabled;
	const previousSlidesLength = isVirtual ? swiper.virtual.slides.length : swiper.slides.length;
	const slides = elementChildren(slidesEl, `.${swiper.params.slideClass}, swiper-slide`);
	const slidesLength = isVirtual ? swiper.virtual.slides.length : slides.length;
	let snapGrid = [];
	const slidesGrid = [];
	const slidesSizesGrid = [];
	let offsetBefore = params.slidesOffsetBefore;
	if (typeof offsetBefore === "function") offsetBefore = params.slidesOffsetBefore.call(swiper);
	let offsetAfter = params.slidesOffsetAfter;
	if (typeof offsetAfter === "function") offsetAfter = params.slidesOffsetAfter.call(swiper);
	const previousSnapGridLength = swiper.snapGrid.length;
	const previousSlidesGridLength = swiper.slidesGrid.length;
	const swiperSize = swiper.size - offsetBefore - offsetAfter;
	let spaceBetween = params.spaceBetween;
	let slidePosition = -offsetBefore;
	let prevSlideSize = 0;
	let index = 0;
	if (typeof swiperSize === "undefined") return;
	if (typeof spaceBetween === "string" && spaceBetween.indexOf("%") >= 0) spaceBetween = parseFloat(spaceBetween.replace("%", "")) / 100 * swiperSize;
	else if (typeof spaceBetween === "string") spaceBetween = parseFloat(spaceBetween);
	swiper.virtualSize = -spaceBetween - offsetBefore - offsetAfter;
	slides.forEach((slideEl) => {
		if (rtl) slideEl.style.marginLeft = "";
		else slideEl.style.marginRight = "";
		slideEl.style.marginBottom = "";
		slideEl.style.marginTop = "";
	});
	if (params.centeredSlides && params.cssMode) {
		setCSSProperty(wrapperEl, "--swiper-centered-offset-before", "");
		setCSSProperty(wrapperEl, "--swiper-centered-offset-after", "");
	}
	if (params.cssMode) {
		setCSSProperty(wrapperEl, "--swiper-slides-offset-before", `${offsetBefore}px`);
		setCSSProperty(wrapperEl, "--swiper-slides-offset-after", `${offsetAfter}px`);
	}
	const gridEnabled = params.grid && params.grid.rows > 1 && swiper.grid;
	if (gridEnabled) swiper.grid.initSlides(slides);
	else if (swiper.grid) swiper.grid.unsetSlides();
	let slideSize;
	const shouldResetSlideSize = params.slidesPerView === "auto" && params.breakpoints && Object.keys(params.breakpoints).filter((key) => {
		return typeof params.breakpoints[key].slidesPerView !== "undefined";
	}).length > 0;
	for (let i = 0; i < slidesLength; i += 1) {
		slideSize = 0;
		const slide = slides[i];
		if (slide) {
			if (gridEnabled) swiper.grid.updateSlide(i, slide, slides);
			if (elementStyle(slide, "display") === "none") continue;
		}
		if (isVirtual && params.slidesPerView === "auto") {
			if (params.virtual.slidesPerViewAutoSlideSize) slideSize = params.virtual.slidesPerViewAutoSlideSize;
			if (slideSize && slide) {
				if (params.roundLengths) slideSize = Math.floor(slideSize);
				slide.style[swiper.getDirectionLabel("width")] = `${slideSize}px`;
			}
		} else if (params.slidesPerView === "auto") {
			if (shouldResetSlideSize) slide.style[swiper.getDirectionLabel("width")] = ``;
			const slideStyles = getComputedStyle(slide);
			const currentTransform = slide.style.transform;
			const currentWebKitTransform = slide.style.webkitTransform;
			if (currentTransform) slide.style.transform = "none";
			if (currentWebKitTransform) slide.style.webkitTransform = "none";
			if (params.roundLengths) slideSize = swiper.isHorizontal() ? elementOuterSize(slide, "width", true) : elementOuterSize(slide, "height", true);
			else {
				const width = getDirectionPropertyValue(slideStyles, "width");
				const paddingLeft = getDirectionPropertyValue(slideStyles, "padding-left");
				const paddingRight = getDirectionPropertyValue(slideStyles, "padding-right");
				const marginLeft = getDirectionPropertyValue(slideStyles, "margin-left");
				const marginRight = getDirectionPropertyValue(slideStyles, "margin-right");
				const boxSizing = slideStyles.getPropertyValue("box-sizing");
				if (boxSizing && boxSizing === "border-box") slideSize = width + marginLeft + marginRight;
				else {
					const { clientWidth, offsetWidth } = slide;
					slideSize = width + paddingLeft + paddingRight + marginLeft + marginRight + (offsetWidth - clientWidth);
				}
			}
			if (currentTransform) slide.style.transform = currentTransform;
			if (currentWebKitTransform) slide.style.webkitTransform = currentWebKitTransform;
			if (params.roundLengths) slideSize = Math.floor(slideSize);
		} else {
			slideSize = (swiperSize - (params.slidesPerView - 1) * spaceBetween) / params.slidesPerView;
			if (params.roundLengths) slideSize = Math.floor(slideSize);
			if (slide) slide.style[swiper.getDirectionLabel("width")] = `${slideSize}px`;
		}
		if (slide) slide.swiperSlideSize = slideSize;
		slidesSizesGrid.push(slideSize);
		if (params.centeredSlides) {
			slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
			if (prevSlideSize === 0 && i !== 0) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
			if (i === 0) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
			if (Math.abs(slidePosition) < 1 / 1e3) slidePosition = 0;
			if (params.roundLengths) slidePosition = Math.floor(slidePosition);
			if (index % params.slidesPerGroup === 0) snapGrid.push(slidePosition);
			slidesGrid.push(slidePosition);
		} else {
			if (params.roundLengths) slidePosition = Math.floor(slidePosition);
			if ((index - Math.min(swiper.params.slidesPerGroupSkip, index)) % swiper.params.slidesPerGroup === 0) snapGrid.push(slidePosition);
			slidesGrid.push(slidePosition);
			slidePosition = slidePosition + slideSize + spaceBetween;
		}
		swiper.virtualSize += slideSize + spaceBetween;
		prevSlideSize = slideSize;
		index += 1;
	}
	swiper.virtualSize = Math.max(swiper.virtualSize, swiperSize) + offsetAfter;
	if (rtl && wrongRTL && (params.effect === "slide" || params.effect === "coverflow")) wrapperEl.style.width = `${swiper.virtualSize + spaceBetween}px`;
	if (params.setWrapperSize) wrapperEl.style[swiper.getDirectionLabel("width")] = `${swiper.virtualSize + spaceBetween}px`;
	if (gridEnabled) swiper.grid.updateWrapperSize(slideSize, snapGrid);
	if (!params.centeredSlides) {
		const isFractionalSlidesPerView = params.slidesPerView !== "auto" && params.slidesPerView % 1 !== 0;
		const shouldSnapToSlideEdge = params.snapToSlideEdge && !params.loop && (params.slidesPerView === "auto" || isFractionalSlidesPerView);
		let lastAllowedSnapIndex = snapGrid.length;
		if (shouldSnapToSlideEdge) {
			let minVisibleSlides;
			if (params.slidesPerView === "auto") {
				minVisibleSlides = 1;
				let accumulatedSize = 0;
				for (let i = slidesSizesGrid.length - 1; i >= 0; i -= 1) {
					accumulatedSize += slidesSizesGrid[i] + (i < slidesSizesGrid.length - 1 ? spaceBetween : 0);
					if (accumulatedSize <= swiperSize) minVisibleSlides = slidesSizesGrid.length - i;
					else break;
				}
			} else minVisibleSlides = Math.floor(params.slidesPerView);
			lastAllowedSnapIndex = Math.max(slidesLength - minVisibleSlides, 0);
		}
		const newSlidesGrid = [];
		for (let i = 0; i < snapGrid.length; i += 1) {
			let slidesGridItem = snapGrid[i];
			if (params.roundLengths) slidesGridItem = Math.floor(slidesGridItem);
			if (shouldSnapToSlideEdge) {
				if (i <= lastAllowedSnapIndex) newSlidesGrid.push(slidesGridItem);
			} else if (snapGrid[i] <= swiper.virtualSize - swiperSize) newSlidesGrid.push(slidesGridItem);
		}
		snapGrid = newSlidesGrid;
		if (Math.floor(swiper.virtualSize - swiperSize) - Math.floor(snapGrid[snapGrid.length - 1]) > 1) {
			if (!shouldSnapToSlideEdge) snapGrid.push(swiper.virtualSize - swiperSize);
		}
	}
	if (isVirtual && params.loop) {
		const size = slidesSizesGrid[0] + spaceBetween;
		if (params.slidesPerGroup > 1) {
			const groups = Math.ceil((swiper.virtual.slidesBefore + swiper.virtual.slidesAfter) / params.slidesPerGroup);
			const groupSize = size * params.slidesPerGroup;
			for (let i = 0; i < groups; i += 1) snapGrid.push(snapGrid[snapGrid.length - 1] + groupSize);
		}
		for (let i = 0; i < swiper.virtual.slidesBefore + swiper.virtual.slidesAfter; i += 1) {
			if (params.slidesPerGroup === 1) snapGrid.push(snapGrid[snapGrid.length - 1] + size);
			slidesGrid.push(slidesGrid[slidesGrid.length - 1] + size);
			swiper.virtualSize += size;
		}
	}
	if (snapGrid.length === 0) snapGrid = [0];
	if (spaceBetween !== 0) {
		const key = swiper.isHorizontal() && rtl ? "marginLeft" : swiper.getDirectionLabel("marginRight");
		slides.filter((_, slideIndex) => {
			if (!params.cssMode || params.loop) return true;
			if (slideIndex === slides.length - 1) return false;
			return true;
		}).forEach((slideEl) => {
			slideEl.style[key] = `${spaceBetween}px`;
		});
	}
	if (params.centeredSlides && params.centeredSlidesBounds) {
		let allSlidesSize = 0;
		slidesSizesGrid.forEach((slideSizeValue) => {
			allSlidesSize += slideSizeValue + (spaceBetween || 0);
		});
		allSlidesSize -= spaceBetween;
		const maxSnap = allSlidesSize > swiperSize ? allSlidesSize - swiperSize : 0;
		snapGrid = snapGrid.map((snap) => {
			if (snap <= 0) return -offsetBefore;
			if (snap > maxSnap) return maxSnap + offsetAfter;
			return snap;
		});
	}
	if (params.centerInsufficientSlides) {
		let allSlidesSize = 0;
		slidesSizesGrid.forEach((slideSizeValue) => {
			allSlidesSize += slideSizeValue + (spaceBetween || 0);
		});
		allSlidesSize -= spaceBetween;
		if (allSlidesSize < swiperSize) {
			const allSlidesOffset = (swiperSize - allSlidesSize) / 2;
			snapGrid.forEach((snap, snapIndex) => {
				snapGrid[snapIndex] = snap - allSlidesOffset;
			});
			slidesGrid.forEach((snap, snapIndex) => {
				slidesGrid[snapIndex] = snap + allSlidesOffset;
			});
		}
	}
	Object.assign(swiper, {
		slides,
		snapGrid,
		slidesGrid,
		slidesSizesGrid
	});
	if (params.centeredSlides && params.cssMode && !params.centeredSlidesBounds) {
		setCSSProperty(wrapperEl, "--swiper-centered-offset-before", `${-snapGrid[0]}px`);
		setCSSProperty(wrapperEl, "--swiper-centered-offset-after", `${swiper.size / 2 - slidesSizesGrid[slidesSizesGrid.length - 1] / 2}px`);
		const addToSnapGrid = -swiper.snapGrid[0];
		const addToSlidesGrid = -swiper.slidesGrid[0];
		swiper.snapGrid = swiper.snapGrid.map((v) => v + addToSnapGrid);
		swiper.slidesGrid = swiper.slidesGrid.map((v) => v + addToSlidesGrid);
	}
	if (slidesLength !== previousSlidesLength) swiper.emit("slidesLengthChange");
	if (snapGrid.length !== previousSnapGridLength) {
		if (swiper.params.watchOverflow) swiper.checkOverflow();
		swiper.emit("snapGridLengthChange");
	}
	if (slidesGrid.length !== previousSlidesGridLength) swiper.emit("slidesGridLengthChange");
	if (params.watchSlidesProgress) swiper.updateSlidesOffset();
	swiper.emit("slidesUpdated");
	if (!isVirtual && !params.cssMode && (params.effect === "slide" || params.effect === "fade")) {
		const backFaceHiddenClass = `${params.containerModifierClass}backface-hidden`;
		const hasClassBackfaceClassAdded = swiper.el.classList.contains(backFaceHiddenClass);
		if (slidesLength <= params.maxBackfaceHiddenSlides) {
			if (!hasClassBackfaceClassAdded) swiper.el.classList.add(backFaceHiddenClass);
		} else if (hasClassBackfaceClassAdded) swiper.el.classList.remove(backFaceHiddenClass);
	}
}
function updateAutoHeight(speed) {
	const swiper = this;
	const activeSlides = [];
	const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
	let newHeight = 0;
	let i;
	if (typeof speed === "number") swiper.setTransition(speed);
	else if (speed === true) swiper.setTransition(swiper.params.speed);
	const getSlideByIndex = (index) => {
		if (isVirtual) return swiper.slides[swiper.getSlideIndexByData(index)];
		return swiper.slides[index];
	};
	if (swiper.params.slidesPerView !== "auto" && swiper.params.slidesPerView > 1) if (swiper.params.centeredSlides) (swiper.visibleSlides || []).forEach((slide) => {
		activeSlides.push(slide);
	});
	else for (i = 0; i < Math.ceil(swiper.params.slidesPerView); i += 1) {
		const index = swiper.activeIndex + i;
		if (index > swiper.slides.length && !isVirtual) break;
		activeSlides.push(getSlideByIndex(index));
	}
	else activeSlides.push(getSlideByIndex(swiper.activeIndex));
	for (i = 0; i < activeSlides.length; i += 1) if (typeof activeSlides[i] !== "undefined") {
		const height = activeSlides[i].offsetHeight;
		newHeight = height > newHeight ? height : newHeight;
	}
	if (newHeight || newHeight === 0) swiper.wrapperEl.style.height = `${newHeight}px`;
}
function updateSlidesOffset() {
	const swiper = this;
	const slides = swiper.slides;
	const minusOffset = swiper.isElement ? swiper.isHorizontal() ? swiper.wrapperEl.offsetLeft : swiper.wrapperEl.offsetTop : 0;
	for (let i = 0; i < slides.length; i += 1) slides[i].swiperSlideOffset = (swiper.isHorizontal() ? slides[i].offsetLeft : slides[i].offsetTop) - minusOffset - swiper.cssOverflowAdjustment();
}
function updateSlidesProgress(translate = this && this.translate || 0) {
	const swiper = this;
	const params = swiper.params;
	const { slides, rtlTranslate: rtl, snapGrid } = swiper;
	if (slides.length === 0) return;
	if (typeof slides[0].swiperSlideOffset === "undefined") swiper.updateSlidesOffset();
	let offsetCenter = -translate;
	if (rtl) offsetCenter = translate;
	swiper.visibleSlidesIndexes = [];
	swiper.visibleSlides = [];
	let spaceBetween = params.spaceBetween;
	if (typeof spaceBetween === "string" && spaceBetween.indexOf("%") >= 0) spaceBetween = parseFloat(spaceBetween.replace("%", "")) / 100 * swiper.size;
	else if (typeof spaceBetween === "string") spaceBetween = parseFloat(spaceBetween);
	for (let i = 0; i < slides.length; i += 1) {
		const slide = slides[i];
		let slideOffset = slide.swiperSlideOffset;
		if (params.cssMode && params.centeredSlides) slideOffset -= slides[0].swiperSlideOffset;
		const slideProgress = (offsetCenter + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide.swiperSlideSize + spaceBetween);
		const originalSlideProgress = (offsetCenter - snapGrid[0] + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide.swiperSlideSize + spaceBetween);
		const slideBefore = -(offsetCenter - slideOffset);
		const slideAfter = slideBefore + swiper.slidesSizesGrid[i];
		const isFullyVisible = slideBefore >= 0 && slideBefore <= swiper.size - swiper.slidesSizesGrid[i];
		const isVisible = slideBefore >= 0 && slideBefore < swiper.size - 1 || slideAfter > 1 && slideAfter <= swiper.size || slideBefore <= 0 && slideAfter >= swiper.size;
		if (isVisible) {
			swiper.visibleSlides.push(slide);
			swiper.visibleSlidesIndexes.push(i);
		}
		toggleSlideClasses$1(slide, isVisible, params.slideVisibleClass);
		toggleSlideClasses$1(slide, isFullyVisible, params.slideFullyVisibleClass);
		slide.progress = rtl ? -slideProgress : slideProgress;
		slide.originalProgress = rtl ? -originalSlideProgress : originalSlideProgress;
	}
}
function updateProgress(translate) {
	const swiper = this;
	if (typeof translate === "undefined") {
		const multiplier = swiper.rtlTranslate ? -1 : 1;
		translate = swiper && swiper.translate && swiper.translate * multiplier || 0;
	}
	const params = swiper.params;
	const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
	let { progress, isBeginning, isEnd, progressLoop } = swiper;
	const wasBeginning = isBeginning;
	const wasEnd = isEnd;
	if (translatesDiff === 0) {
		progress = 0;
		isBeginning = true;
		isEnd = true;
	} else {
		progress = (translate - swiper.minTranslate()) / translatesDiff;
		const isBeginningRounded = Math.abs(translate - swiper.minTranslate()) < 1;
		const isEndRounded = Math.abs(translate - swiper.maxTranslate()) < 1;
		isBeginning = isBeginningRounded || progress <= 0;
		isEnd = isEndRounded || progress >= 1;
		if (isBeginningRounded) progress = 0;
		if (isEndRounded) progress = 1;
	}
	if (params.loop) {
		const firstSlideIndex = swiper.getSlideIndexByData(0);
		const lastSlideIndex = swiper.getSlideIndexByData(swiper.slides.length - 1);
		const firstSlideTranslate = swiper.slidesGrid[firstSlideIndex];
		const lastSlideTranslate = swiper.slidesGrid[lastSlideIndex];
		const translateMax = swiper.slidesGrid[swiper.slidesGrid.length - 1];
		const translateAbs = Math.abs(translate);
		if (translateAbs >= firstSlideTranslate) progressLoop = (translateAbs - firstSlideTranslate) / translateMax;
		else progressLoop = (translateAbs + translateMax - lastSlideTranslate) / translateMax;
		if (progressLoop > 1) progressLoop -= 1;
	}
	Object.assign(swiper, {
		progress,
		progressLoop,
		isBeginning,
		isEnd
	});
	if (params.watchSlidesProgress || params.centeredSlides && params.autoHeight) swiper.updateSlidesProgress(translate);
	if (isBeginning && !wasBeginning) swiper.emit("reachBeginning toEdge");
	if (isEnd && !wasEnd) swiper.emit("reachEnd toEdge");
	if (wasBeginning && !isBeginning || wasEnd && !isEnd) swiper.emit("fromEdge");
	swiper.emit("progress", progress);
}
function updateSlidesClasses() {
	const swiper = this;
	const { slides, params, slidesEl, activeIndex } = swiper;
	const isVirtual = swiper.virtual && params.virtual.enabled;
	const gridEnabled = swiper.grid && params.grid && params.grid.rows > 1;
	const getFilteredSlide = (selector) => {
		return elementChildren(slidesEl, `.${params.slideClass}${selector}, swiper-slide${selector}`)[0];
	};
	let activeSlide;
	let prevSlide;
	let nextSlide;
	if (isVirtual) if (params.loop) {
		let slideIndex = activeIndex - swiper.virtual.slidesBefore;
		if (slideIndex < 0) slideIndex = swiper.virtual.slides.length + slideIndex;
		if (slideIndex >= swiper.virtual.slides.length) slideIndex -= swiper.virtual.slides.length;
		activeSlide = getFilteredSlide(`[data-swiper-slide-index="${slideIndex}"]`);
	} else activeSlide = getFilteredSlide(`[data-swiper-slide-index="${activeIndex}"]`);
	else if (gridEnabled) {
		activeSlide = slides.find((slideEl) => slideEl.column === activeIndex);
		nextSlide = slides.find((slideEl) => slideEl.column === activeIndex + 1);
		prevSlide = slides.find((slideEl) => slideEl.column === activeIndex - 1);
	} else activeSlide = slides[activeIndex];
	if (activeSlide) {
		if (!gridEnabled) {
			nextSlide = elementNextAll(activeSlide, `.${params.slideClass}, swiper-slide`)[0];
			if (params.loop && !nextSlide) nextSlide = slides[0];
			prevSlide = elementPrevAll(activeSlide, `.${params.slideClass}, swiper-slide`)[0];
			if (params.loop && false);
		}
	}
	slides.forEach((slideEl) => {
		toggleSlideClasses(slideEl, slideEl === activeSlide, params.slideActiveClass);
		toggleSlideClasses(slideEl, slideEl === nextSlide, params.slideNextClass);
		toggleSlideClasses(slideEl, slideEl === prevSlide, params.slidePrevClass);
	});
	swiper.emitSlidesClasses();
}
function getActiveIndexByTranslate(swiper) {
	const { slidesGrid, params } = swiper;
	const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
	let activeIndex;
	for (let i = 0; i < slidesGrid.length; i += 1) if (typeof slidesGrid[i + 1] !== "undefined") {
		if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1] - (slidesGrid[i + 1] - slidesGrid[i]) / 2) activeIndex = i;
		else if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1]) activeIndex = i + 1;
	} else if (translate >= slidesGrid[i]) activeIndex = i;
	if (params.normalizeSlideIndex) {
		if (activeIndex < 0 || typeof activeIndex === "undefined") activeIndex = 0;
	}
	return activeIndex;
}
function updateActiveIndex(newActiveIndex) {
	const swiper = this;
	const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
	const { snapGrid, params, activeIndex: previousIndex, realIndex: previousRealIndex, snapIndex: previousSnapIndex } = swiper;
	let activeIndex = newActiveIndex;
	let snapIndex;
	const getVirtualRealIndex = (aIndex) => {
		let realIndex = aIndex - swiper.virtual.slidesBefore;
		if (realIndex < 0) realIndex = swiper.virtual.slides.length + realIndex;
		if (realIndex >= swiper.virtual.slides.length) realIndex -= swiper.virtual.slides.length;
		return realIndex;
	};
	if (typeof activeIndex === "undefined") activeIndex = getActiveIndexByTranslate(swiper);
	if (snapGrid.indexOf(translate) >= 0) snapIndex = snapGrid.indexOf(translate);
	else {
		const skip = Math.min(params.slidesPerGroupSkip, activeIndex);
		snapIndex = skip + Math.floor((activeIndex - skip) / params.slidesPerGroup);
	}
	if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;
	if (activeIndex === previousIndex && !swiper.params.loop) {
		if (snapIndex !== previousSnapIndex) {
			swiper.snapIndex = snapIndex;
			swiper.emit("snapIndexChange");
		}
		return;
	}
	if (activeIndex === previousIndex && swiper.params.loop && swiper.virtual && swiper.params.virtual.enabled) {
		swiper.realIndex = getVirtualRealIndex(activeIndex);
		return;
	}
	const gridEnabled = swiper.grid && params.grid && params.grid.rows > 1;
	let realIndex;
	if (swiper.virtual && params.virtual.enabled) if (params.loop) realIndex = getVirtualRealIndex(activeIndex);
	else realIndex = activeIndex;
	else if (gridEnabled) {
		const firstSlideInColumn = swiper.slides.find((slideEl) => slideEl.column === activeIndex);
		let activeSlideIndex = parseInt(firstSlideInColumn.getAttribute("data-swiper-slide-index"), 10);
		if (Number.isNaN(activeSlideIndex)) activeSlideIndex = Math.max(swiper.slides.indexOf(firstSlideInColumn), 0);
		realIndex = Math.floor(activeSlideIndex / params.grid.rows);
	} else if (swiper.slides[activeIndex]) {
		const slideIndex = swiper.slides[activeIndex].getAttribute("data-swiper-slide-index");
		if (slideIndex) realIndex = parseInt(slideIndex, 10);
		else realIndex = activeIndex;
	} else realIndex = activeIndex;
	Object.assign(swiper, {
		previousSnapIndex,
		snapIndex,
		previousRealIndex,
		realIndex,
		previousIndex,
		activeIndex
	});
	if (swiper.initialized) preload(swiper);
	swiper.emit("activeIndexChange");
	swiper.emit("snapIndexChange");
	if (swiper.initialized || swiper.params.runCallbacksOnInit) {
		if (previousRealIndex !== realIndex) swiper.emit("realIndexChange");
		swiper.emit("slideChange");
	}
}
function updateClickedSlide(el, path) {
	const swiper = this;
	const params = swiper.params;
	let slide = el.closest(`.${params.slideClass}, swiper-slide`);
	if (!slide && swiper.isElement && path && path.length > 1 && path.includes(el)) [...path.slice(path.indexOf(el) + 1, path.length)].forEach((pathEl) => {
		if (!slide && pathEl.matches && pathEl.matches(`.${params.slideClass}, swiper-slide`)) slide = pathEl;
	});
	let slideFound = false;
	let slideIndex;
	if (slide) {
		for (let i = 0; i < swiper.slides.length; i += 1) if (swiper.slides[i] === slide) {
			slideFound = true;
			slideIndex = i;
			break;
		}
	}
	if (slide && slideFound) {
		swiper.clickedSlide = slide;
		if (swiper.virtual && swiper.params.virtual.enabled) swiper.clickedIndex = parseInt(slide.getAttribute("data-swiper-slide-index"), 10);
		else swiper.clickedIndex = slideIndex;
	} else {
		swiper.clickedSlide = void 0;
		swiper.clickedIndex = void 0;
		return;
	}
	if (params.slideToClickedSlide && swiper.clickedIndex !== void 0 && swiper.clickedIndex !== swiper.activeIndex) swiper.slideToClickedSlide();
}
function getSwiperTranslate(axis = this.isHorizontal() ? "x" : "y") {
	const swiper = this;
	const { params, rtlTranslate: rtl, translate, wrapperEl } = swiper;
	if (params.virtualTranslate) return rtl ? -translate : translate;
	if (params.cssMode) return translate;
	let currentTranslate = getTranslate(wrapperEl, axis);
	currentTranslate += swiper.cssOverflowAdjustment();
	if (rtl) currentTranslate = -currentTranslate;
	return currentTranslate || 0;
}
function setTranslate(translate, byController) {
	const swiper = this;
	const { rtlTranslate: rtl, params, wrapperEl, progress } = swiper;
	let x = 0;
	let y = 0;
	const z = 0;
	if (swiper.isHorizontal()) x = rtl ? -translate : translate;
	else y = translate;
	if (params.roundLengths) {
		x = Math.floor(x);
		y = Math.floor(y);
	}
	swiper.previousTranslate = swiper.translate;
	swiper.translate = swiper.isHorizontal() ? x : y;
	if (params.cssMode) wrapperEl[swiper.isHorizontal() ? "scrollLeft" : "scrollTop"] = swiper.isHorizontal() ? -x : -y;
	else if (!params.virtualTranslate) {
		if (swiper.isHorizontal()) x -= swiper.cssOverflowAdjustment();
		else y -= swiper.cssOverflowAdjustment();
		wrapperEl.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
	}
	let newProgress;
	const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
	if (translatesDiff === 0) newProgress = 0;
	else newProgress = (translate - swiper.minTranslate()) / translatesDiff;
	if (newProgress !== progress) swiper.updateProgress(translate);
	swiper.emit("setTranslate", swiper.translate, byController);
}
function minTranslate() {
	return -this.snapGrid[0];
}
function maxTranslate() {
	return -this.snapGrid[this.snapGrid.length - 1];
}
function translateTo(translate = 0, speed = this.params.speed, runCallbacks = true, translateBounds = true, internal) {
	const swiper = this;
	const { params, wrapperEl } = swiper;
	if (swiper.animating && params.preventInteractionOnTransition) return false;
	const minTranslate = swiper.minTranslate();
	const maxTranslate = swiper.maxTranslate();
	let newTranslate;
	if (translateBounds && translate > minTranslate) newTranslate = minTranslate;
	else if (translateBounds && translate < maxTranslate) newTranslate = maxTranslate;
	else newTranslate = translate;
	swiper.updateProgress(newTranslate);
	if (params.cssMode) {
		const isH = swiper.isHorizontal();
		if (speed === 0) wrapperEl[isH ? "scrollLeft" : "scrollTop"] = -newTranslate;
		else {
			if (!swiper.support.smoothScroll) {
				animateCSSModeScroll({
					swiper,
					targetPosition: -newTranslate,
					side: isH ? "left" : "top"
				});
				return true;
			}
			wrapperEl.scrollTo({
				[isH ? "left" : "top"]: -newTranslate,
				behavior: "smooth"
			});
		}
		return true;
	}
	if (speed === 0) {
		swiper.setTransition(0);
		swiper.setTranslate(newTranslate);
		if (runCallbacks) {
			swiper.emit("beforeTransitionStart", speed, internal);
			swiper.emit("transitionEnd");
		}
	} else {
		swiper.setTransition(speed);
		swiper.setTranslate(newTranslate);
		if (runCallbacks) {
			swiper.emit("beforeTransitionStart", speed, internal);
			swiper.emit("transitionStart");
		}
		if (!swiper.animating) {
			swiper.animating = true;
			if (!swiper.onTranslateToWrapperTransitionEnd) swiper.onTranslateToWrapperTransitionEnd = function transitionEnd(e) {
				if (!swiper || swiper.destroyed) return;
				if (e.target !== this) return;
				swiper.wrapperEl.removeEventListener("transitionend", swiper.onTranslateToWrapperTransitionEnd);
				swiper.onTranslateToWrapperTransitionEnd = null;
				delete swiper.onTranslateToWrapperTransitionEnd;
				swiper.animating = false;
				if (runCallbacks) swiper.emit("transitionEnd");
			};
			swiper.wrapperEl.addEventListener("transitionend", swiper.onTranslateToWrapperTransitionEnd);
		}
	}
	return true;
}
function setTransition(duration, byController) {
	const swiper = this;
	if (!swiper.params.cssMode) {
		swiper.wrapperEl.style.transitionDuration = `${duration}ms`;
		swiper.wrapperEl.style.transitionDelay = duration === 0 ? `0ms` : "";
	}
	swiper.emit("setTransition", duration, byController);
}
function transitionEmit({ swiper, runCallbacks, direction, step }) {
	const { activeIndex, previousIndex } = swiper;
	let dir = direction;
	if (!dir) if (activeIndex > previousIndex) dir = "next";
	else if (activeIndex < previousIndex) dir = "prev";
	else dir = "reset";
	swiper.emit(`transition${step}`);
	if (runCallbacks && dir === "reset") swiper.emit(`slideResetTransition${step}`);
	else if (runCallbacks && activeIndex !== previousIndex) {
		swiper.emit(`slideChangeTransition${step}`);
		if (dir === "next") swiper.emit(`slideNextTransition${step}`);
		else swiper.emit(`slidePrevTransition${step}`);
	}
}
function transitionStart(runCallbacks = true, direction) {
	const swiper = this;
	const { params } = swiper;
	if (params.cssMode) return;
	if (params.autoHeight) swiper.updateAutoHeight();
	transitionEmit({
		swiper,
		runCallbacks,
		direction,
		step: "Start"
	});
}
function transitionEnd(runCallbacks = true, direction) {
	const swiper = this;
	const { params } = swiper;
	swiper.animating = false;
	if (params.cssMode) return;
	swiper.setTransition(0);
	transitionEmit({
		swiper,
		runCallbacks,
		direction,
		step: "End"
	});
}
function slideTo(index = 0, speed, runCallbacks = true, internal, initial) {
	if (typeof index === "string") index = parseInt(index, 10);
	const swiper = this;
	let slideIndex = index;
	if (slideIndex < 0) slideIndex = 0;
	const { params, snapGrid, slidesGrid, previousIndex, activeIndex, rtlTranslate: rtl, wrapperEl, enabled } = swiper;
	if (!enabled && !internal && !initial || swiper.destroyed || swiper.animating && params.preventInteractionOnTransition) return false;
	if (typeof speed === "undefined") speed = swiper.params.speed;
	const skip = Math.min(swiper.params.slidesPerGroupSkip, slideIndex);
	let snapIndex = skip + Math.floor((slideIndex - skip) / swiper.params.slidesPerGroup);
	if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;
	const translate = -snapGrid[snapIndex];
	if (params.normalizeSlideIndex) for (let i = 0; i < slidesGrid.length; i += 1) {
		const normalizedTranslate = -Math.floor(translate * 100);
		const normalizedGrid = Math.floor(slidesGrid[i] * 100);
		const normalizedGridNext = Math.floor(slidesGrid[i + 1] * 100);
		if (typeof slidesGrid[i + 1] !== "undefined") {
			if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext - (normalizedGridNext - normalizedGrid) / 2) slideIndex = i;
			else if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext) slideIndex = i + 1;
		} else if (normalizedTranslate >= normalizedGrid) slideIndex = i;
	}
	if (swiper.initialized && slideIndex !== activeIndex) {
		if (!swiper.allowSlideNext && (rtl ? translate > swiper.translate && translate > swiper.minTranslate() : translate < swiper.translate && translate < swiper.minTranslate())) return false;
		if (!swiper.allowSlidePrev && translate > swiper.translate && translate > swiper.maxTranslate()) {
			if ((activeIndex || 0) !== slideIndex) return false;
		}
	}
	if (slideIndex !== (previousIndex || 0) && runCallbacks) swiper.emit("beforeSlideChangeStart");
	swiper.updateProgress(translate);
	let direction;
	if (slideIndex > activeIndex) direction = "next";
	else if (slideIndex < activeIndex) direction = "prev";
	else direction = "reset";
	const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
	if (!(isVirtual && initial) && (rtl && -translate === swiper.translate || !rtl && translate === swiper.translate)) {
		swiper.updateActiveIndex(slideIndex);
		if (params.autoHeight) swiper.updateAutoHeight();
		swiper.updateSlidesClasses();
		if (params.effect !== "slide") swiper.setTranslate(translate);
		if (direction !== "reset") {
			swiper.transitionStart(runCallbacks, direction);
			swiper.transitionEnd(runCallbacks, direction);
		}
		return false;
	}
	if (params.cssMode) {
		const isH = swiper.isHorizontal();
		const t = rtl ? translate : -translate;
		if (speed === 0) {
			if (isVirtual) {
				swiper.wrapperEl.style.scrollSnapType = "none";
				swiper._immediateVirtual = true;
			}
			if (isVirtual && !swiper._cssModeVirtualInitialSet && swiper.params.initialSlide > 0) {
				swiper._cssModeVirtualInitialSet = true;
				requestAnimationFrame(() => {
					wrapperEl[isH ? "scrollLeft" : "scrollTop"] = t;
				});
			} else wrapperEl[isH ? "scrollLeft" : "scrollTop"] = t;
			if (isVirtual) requestAnimationFrame(() => {
				swiper.wrapperEl.style.scrollSnapType = "";
				swiper._immediateVirtual = false;
			});
		} else {
			if (!swiper.support.smoothScroll) {
				animateCSSModeScroll({
					swiper,
					targetPosition: t,
					side: isH ? "left" : "top"
				});
				return true;
			}
			wrapperEl.scrollTo({
				[isH ? "left" : "top"]: t,
				behavior: "smooth"
			});
		}
		return true;
	}
	const isSafari = getBrowser().isSafari;
	if (isVirtual && !initial && isSafari && swiper.isElement) swiper.virtual.update(false, false, slideIndex);
	swiper.setTransition(speed);
	swiper.setTranslate(translate);
	swiper.updateActiveIndex(slideIndex);
	swiper.updateSlidesClasses();
	swiper.emit("beforeTransitionStart", speed, internal);
	swiper.transitionStart(runCallbacks, direction);
	if (speed === 0) swiper.transitionEnd(runCallbacks, direction);
	else if (!swiper.animating) {
		swiper.animating = true;
		if (!swiper.onSlideToWrapperTransitionEnd) swiper.onSlideToWrapperTransitionEnd = function transitionEnd(e) {
			if (!swiper || swiper.destroyed) return;
			if (e.target !== this) return;
			swiper.wrapperEl.removeEventListener("transitionend", swiper.onSlideToWrapperTransitionEnd);
			swiper.onSlideToWrapperTransitionEnd = null;
			delete swiper.onSlideToWrapperTransitionEnd;
			swiper.transitionEnd(runCallbacks, direction);
		};
		swiper.wrapperEl.addEventListener("transitionend", swiper.onSlideToWrapperTransitionEnd);
	}
	return true;
}
function slideToLoop(index = 0, speed, runCallbacks = true, internal) {
	if (typeof index === "string") index = parseInt(index, 10);
	const swiper = this;
	if (swiper.destroyed) return;
	if (typeof speed === "undefined") speed = swiper.params.speed;
	const gridEnabled = swiper.grid && swiper.params.grid && swiper.params.grid.rows > 1;
	let newIndex = index;
	if (swiper.params.loop) if (swiper.virtual && swiper.params.virtual.enabled) newIndex = newIndex + swiper.virtual.slidesBefore;
	else {
		let targetSlideIndex;
		if (gridEnabled) {
			const slideIndex = newIndex * swiper.params.grid.rows;
			targetSlideIndex = swiper.slides.find((slideEl) => slideEl.getAttribute("data-swiper-slide-index") * 1 === slideIndex).column;
		} else targetSlideIndex = swiper.getSlideIndexByData(newIndex);
		const cols = gridEnabled ? Math.ceil(swiper.slides.length / swiper.params.grid.rows) : swiper.slides.length;
		const { centeredSlides, slidesOffsetBefore, slidesOffsetAfter } = swiper.params;
		const bothDirections = centeredSlides || !!slidesOffsetBefore || !!slidesOffsetAfter;
		let slidesPerView = swiper.params.slidesPerView;
		if (slidesPerView === "auto") slidesPerView = swiper.slidesPerViewDynamic();
		else {
			slidesPerView = Math.ceil(parseFloat(swiper.params.slidesPerView, 10));
			if (bothDirections && slidesPerView % 2 === 0) slidesPerView = slidesPerView + 1;
		}
		let needLoopFix = cols - targetSlideIndex < slidesPerView;
		if (bothDirections) needLoopFix = needLoopFix || targetSlideIndex < Math.ceil(slidesPerView / 2);
		if (internal && bothDirections && swiper.params.slidesPerView !== "auto" && !gridEnabled) needLoopFix = false;
		if (needLoopFix) {
			const direction = bothDirections ? targetSlideIndex < swiper.activeIndex ? "prev" : "next" : targetSlideIndex - swiper.activeIndex - 1 < swiper.params.slidesPerView ? "next" : "prev";
			swiper.loopFix({
				direction,
				slideTo: true,
				activeSlideIndex: direction === "next" ? targetSlideIndex + 1 : targetSlideIndex - cols + 1,
				slideRealIndex: direction === "next" ? swiper.realIndex : void 0
			});
		}
		if (gridEnabled) {
			const slideIndex = newIndex * swiper.params.grid.rows;
			newIndex = swiper.slides.find((slideEl) => slideEl.getAttribute("data-swiper-slide-index") * 1 === slideIndex).column;
		} else newIndex = swiper.getSlideIndexByData(newIndex);
	}
	requestAnimationFrame(() => {
		swiper.slideTo(newIndex, speed, runCallbacks, internal);
	});
	return swiper;
}
function slideNext(speed, runCallbacks = true, internal) {
	const swiper = this;
	const { enabled, params, animating } = swiper;
	if (!enabled || swiper.destroyed) return swiper;
	if (typeof speed === "undefined") speed = swiper.params.speed;
	let perGroup = params.slidesPerGroup;
	if (params.slidesPerView === "auto" && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) perGroup = Math.max(swiper.slidesPerViewDynamic("current", true), 1);
	const increment = swiper.activeIndex < params.slidesPerGroupSkip ? 1 : perGroup;
	const isVirtual = swiper.virtual && params.virtual.enabled;
	if (params.loop) {
		if (animating && !isVirtual && params.loopPreventsSliding) return false;
		swiper.loopFix({ direction: "next" });
		swiper._clientLeft = swiper.wrapperEl.clientLeft;
		if (swiper.activeIndex === swiper.slides.length - 1 && params.cssMode) {
			requestAnimationFrame(() => {
				swiper.slideTo(swiper.activeIndex + increment, speed, runCallbacks, internal);
			});
			return true;
		}
	}
	if (params.rewind && swiper.isEnd) return swiper.slideTo(0, speed, runCallbacks, internal);
	return swiper.slideTo(swiper.activeIndex + increment, speed, runCallbacks, internal);
}
function slidePrev(speed, runCallbacks = true, internal) {
	const swiper = this;
	const { params, snapGrid, slidesGrid, rtlTranslate, enabled, animating } = swiper;
	if (!enabled || swiper.destroyed) return swiper;
	if (typeof speed === "undefined") speed = swiper.params.speed;
	const isVirtual = swiper.virtual && params.virtual.enabled;
	if (params.loop) {
		if (animating && !isVirtual && params.loopPreventsSliding) return false;
		swiper.loopFix({ direction: "prev" });
		swiper._clientLeft = swiper.wrapperEl.clientLeft;
	}
	const translate = rtlTranslate ? swiper.translate : -swiper.translate;
	function normalize(val) {
		if (val < 0) return -Math.floor(Math.abs(val));
		return Math.floor(val);
	}
	const normalizedTranslate = normalize(translate);
	const normalizedSnapGrid = snapGrid.map((val) => normalize(val));
	const isFreeMode = params.freeMode && params.freeMode.enabled;
	let prevSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate) - 1];
	if (typeof prevSnap === "undefined" && (params.cssMode || isFreeMode)) {
		let prevSnapIndex;
		snapGrid.forEach((snap, snapIndex) => {
			if (normalizedTranslate >= snap) prevSnapIndex = snapIndex;
		});
		if (typeof prevSnapIndex !== "undefined") prevSnap = isFreeMode ? snapGrid[prevSnapIndex] : snapGrid[prevSnapIndex > 0 ? prevSnapIndex - 1 : prevSnapIndex];
	}
	let prevIndex = 0;
	if (typeof prevSnap !== "undefined") {
		prevIndex = slidesGrid.indexOf(prevSnap);
		if (prevIndex < 0) prevIndex = swiper.activeIndex - 1;
		if (params.slidesPerView === "auto" && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) {
			prevIndex = prevIndex - swiper.slidesPerViewDynamic("previous", true) + 1;
			prevIndex = Math.max(prevIndex, 0);
		}
	}
	if (params.rewind && swiper.isBeginning) {
		const lastIndex = swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1;
		return swiper.slideTo(lastIndex, speed, runCallbacks, internal);
	} else if (params.loop && swiper.activeIndex === 0 && params.cssMode) {
		requestAnimationFrame(() => {
			swiper.slideTo(prevIndex, speed, runCallbacks, internal);
		});
		return true;
	}
	return swiper.slideTo(prevIndex, speed, runCallbacks, internal);
}
function slideReset(speed, runCallbacks = true, internal) {
	const swiper = this;
	if (swiper.destroyed) return;
	if (typeof speed === "undefined") speed = swiper.params.speed;
	return swiper.slideTo(swiper.activeIndex, speed, runCallbacks, internal);
}
function slideToClosest(speed, runCallbacks = true, internal, threshold = .5) {
	const swiper = this;
	if (swiper.destroyed) return;
	if (typeof speed === "undefined") speed = swiper.params.speed;
	let index = swiper.activeIndex;
	const skip = Math.min(swiper.params.slidesPerGroupSkip, index);
	const snapIndex = skip + Math.floor((index - skip) / swiper.params.slidesPerGroup);
	const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
	if (translate >= swiper.snapGrid[snapIndex]) {
		const currentSnap = swiper.snapGrid[snapIndex];
		const nextSnap = swiper.snapGrid[snapIndex + 1];
		if (translate - currentSnap > (nextSnap - currentSnap) * threshold) index += swiper.params.slidesPerGroup;
	} else {
		const prevSnap = swiper.snapGrid[snapIndex - 1];
		const currentSnap = swiper.snapGrid[snapIndex];
		if (translate - prevSnap <= (currentSnap - prevSnap) * threshold) index -= swiper.params.slidesPerGroup;
	}
	index = Math.max(index, 0);
	index = Math.min(index, swiper.slidesGrid.length - 1);
	return swiper.slideTo(index, speed, runCallbacks, internal);
}
function slideToClickedSlide() {
	const swiper = this;
	if (swiper.destroyed) return;
	const { params, slidesEl } = swiper;
	const slidesPerView = params.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : params.slidesPerView;
	let slideToIndex = swiper.getSlideIndexWhenGrid(swiper.clickedIndex);
	let realIndex;
	const slideSelector = swiper.isElement ? `swiper-slide` : `.${params.slideClass}`;
	const isGrid = swiper.grid && swiper.params.grid && swiper.params.grid.rows > 1;
	if (params.loop) {
		if (swiper.animating) return;
		realIndex = parseInt(swiper.clickedSlide.getAttribute("data-swiper-slide-index"), 10);
		if (params.centeredSlides) swiper.slideToLoop(realIndex);
		else if (slideToIndex > (isGrid ? (swiper.slides.length - slidesPerView) / 2 - (swiper.params.grid.rows - 1) : swiper.slides.length - slidesPerView)) {
			swiper.loopFix();
			slideToIndex = swiper.getSlideIndex(elementChildren(slidesEl, `${slideSelector}[data-swiper-slide-index="${realIndex}"]`)[0]);
			nextTick(() => {
				swiper.slideTo(slideToIndex);
			});
		} else swiper.slideTo(slideToIndex);
	} else swiper.slideTo(slideToIndex);
}
function loopCreate(slideRealIndex, initial) {
	const swiper = this;
	const { params, slidesEl } = swiper;
	if (!params.loop || swiper.virtual && swiper.params.virtual.enabled) return;
	const initSlides = () => {
		elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`).forEach((el, index) => {
			el.setAttribute("data-swiper-slide-index", index);
		});
	};
	const clearBlankSlides = () => {
		const slides = elementChildren(slidesEl, `.${params.slideBlankClass}`);
		slides.forEach((el) => {
			el.remove();
		});
		if (slides.length > 0) {
			swiper.recalcSlides();
			swiper.updateSlides();
		}
	};
	const gridEnabled = swiper.grid && params.grid && params.grid.rows > 1;
	if (params.loopAddBlankSlides && (params.slidesPerGroup > 1 || gridEnabled)) clearBlankSlides();
	const slidesPerGroup = params.slidesPerGroup * (gridEnabled ? params.grid.rows : 1);
	const shouldFillGroup = swiper.slides.length % slidesPerGroup !== 0;
	const shouldFillGrid = gridEnabled && swiper.slides.length % params.grid.rows !== 0;
	const addBlankSlides = (amountOfSlides) => {
		for (let i = 0; i < amountOfSlides; i += 1) {
			const slideEl = swiper.isElement ? createElement$1("swiper-slide", [params.slideBlankClass]) : createElement$1("div", [params.slideClass, params.slideBlankClass]);
			swiper.slidesEl.append(slideEl);
		}
	};
	if (shouldFillGroup) {
		if (params.loopAddBlankSlides) {
			addBlankSlides(slidesPerGroup - swiper.slides.length % slidesPerGroup);
			swiper.recalcSlides();
			swiper.updateSlides();
		} else showWarning("Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
		initSlides();
	} else if (shouldFillGrid) {
		if (params.loopAddBlankSlides) {
			addBlankSlides(params.grid.rows - swiper.slides.length % params.grid.rows);
			swiper.recalcSlides();
			swiper.updateSlides();
		} else showWarning("Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
		initSlides();
	} else initSlides();
	const bothDirections = params.centeredSlides || !!params.slidesOffsetBefore || !!params.slidesOffsetAfter;
	swiper.loopFix({
		slideRealIndex,
		direction: bothDirections ? void 0 : "next",
		initial
	});
}
function loopFix({ slideRealIndex, slideTo = true, direction, setTranslate, activeSlideIndex, initial, byController, byMousewheel } = {}) {
	const swiper = this;
	if (!swiper.params.loop) return;
	swiper.emit("beforeLoopFix");
	const { slides, allowSlidePrev, allowSlideNext, slidesEl, params } = swiper;
	const { centeredSlides, slidesOffsetBefore, slidesOffsetAfter, initialSlide } = params;
	const bothDirections = centeredSlides || !!slidesOffsetBefore || !!slidesOffsetAfter;
	swiper.allowSlidePrev = true;
	swiper.allowSlideNext = true;
	if (swiper.virtual && params.virtual.enabled) {
		if (slideTo) {
			if (!bothDirections && swiper.snapIndex === 0) swiper.slideTo(swiper.virtual.slides.length, 0, false, true);
			else if (bothDirections && swiper.snapIndex < params.slidesPerView) swiper.slideTo(swiper.virtual.slides.length + swiper.snapIndex, 0, false, true);
			else if (swiper.snapIndex === swiper.snapGrid.length - 1) swiper.slideTo(swiper.virtual.slidesBefore, 0, false, true);
		}
		swiper.allowSlidePrev = allowSlidePrev;
		swiper.allowSlideNext = allowSlideNext;
		swiper.emit("loopFix");
		return;
	}
	let slidesPerView = params.slidesPerView;
	if (slidesPerView === "auto") slidesPerView = swiper.slidesPerViewDynamic();
	else {
		slidesPerView = Math.ceil(parseFloat(params.slidesPerView, 10));
		if (bothDirections && slidesPerView % 2 === 0) slidesPerView = slidesPerView + 1;
	}
	const slidesPerGroup = params.slidesPerGroupAuto ? slidesPerView : params.slidesPerGroup;
	let loopedSlides = bothDirections ? Math.max(slidesPerGroup, Math.ceil(slidesPerView / 2)) : slidesPerGroup;
	if (loopedSlides % slidesPerGroup !== 0) loopedSlides += slidesPerGroup - loopedSlides % slidesPerGroup;
	loopedSlides += params.loopAdditionalSlides;
	swiper.loopedSlides = loopedSlides;
	const gridEnabled = swiper.grid && params.grid && params.grid.rows > 1;
	if (slides.length < slidesPerView + loopedSlides || swiper.params.effect === "cards" && slides.length < slidesPerView + loopedSlides * 2) showWarning("Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled or not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters");
	else if (gridEnabled && params.grid.fill === "row") showWarning("Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`");
	const prependSlidesIndexes = [];
	const appendSlidesIndexes = [];
	const cols = gridEnabled ? Math.ceil(slides.length / params.grid.rows) : slides.length;
	const isInitialOverflow = initial && cols - initialSlide < slidesPerView && !bothDirections;
	let activeIndex = isInitialOverflow ? initialSlide : swiper.activeIndex;
	if (typeof activeSlideIndex === "undefined") activeSlideIndex = swiper.getSlideIndex(slides.find((el) => el.classList.contains(params.slideActiveClass)));
	else activeIndex = activeSlideIndex;
	const isNext = direction === "next" || !direction;
	const isPrev = direction === "prev" || !direction;
	let slidesPrepended = 0;
	let slidesAppended = 0;
	const activeColIndexWithShift = (gridEnabled ? slides[activeSlideIndex].column : activeSlideIndex) + (bothDirections && typeof setTranslate === "undefined" ? -slidesPerView / 2 + .5 : 0);
	if (activeColIndexWithShift < loopedSlides) {
		slidesPrepended = Math.max(loopedSlides - activeColIndexWithShift, slidesPerGroup);
		for (let i = 0; i < loopedSlides - activeColIndexWithShift; i += 1) {
			const index = i - Math.floor(i / cols) * cols;
			if (gridEnabled) {
				const colIndexToPrepend = cols - index - 1;
				for (let i = slides.length - 1; i >= 0; i -= 1) if (slides[i].column === colIndexToPrepend) prependSlidesIndexes.push(i);
			} else prependSlidesIndexes.push(cols - index - 1);
		}
	} else if (activeColIndexWithShift + slidesPerView > cols - loopedSlides) {
		slidesAppended = Math.max(activeColIndexWithShift - (cols - loopedSlides * 2), slidesPerGroup);
		if (isInitialOverflow) slidesAppended = Math.max(slidesAppended, slidesPerView - cols + initialSlide + 1);
		for (let i = 0; i < slidesAppended; i += 1) {
			const index = i - Math.floor(i / cols) * cols;
			if (gridEnabled) slides.forEach((slide, slideIndex) => {
				if (slide.column === index) appendSlidesIndexes.push(slideIndex);
			});
			else appendSlidesIndexes.push(index);
		}
	}
	swiper.__preventObserver__ = true;
	requestAnimationFrame(() => {
		swiper.__preventObserver__ = false;
	});
	if (swiper.params.effect === "cards" && slides.length < slidesPerView + loopedSlides * 2) {
		if (appendSlidesIndexes.includes(activeSlideIndex)) appendSlidesIndexes.splice(appendSlidesIndexes.indexOf(activeSlideIndex), 1);
		if (prependSlidesIndexes.includes(activeSlideIndex)) prependSlidesIndexes.splice(prependSlidesIndexes.indexOf(activeSlideIndex), 1);
	}
	if (isPrev) prependSlidesIndexes.forEach((index) => {
		slides[index].swiperLoopMoveDOM = true;
		slidesEl.prepend(slides[index]);
		slides[index].swiperLoopMoveDOM = false;
	});
	if (isNext) appendSlidesIndexes.forEach((index) => {
		slides[index].swiperLoopMoveDOM = true;
		slidesEl.append(slides[index]);
		slides[index].swiperLoopMoveDOM = false;
	});
	swiper.recalcSlides();
	if (params.slidesPerView === "auto") swiper.updateSlides();
	else if (gridEnabled && (prependSlidesIndexes.length > 0 && isPrev || appendSlidesIndexes.length > 0 && isNext)) swiper.slides.forEach((slide, slideIndex) => {
		swiper.grid.updateSlide(slideIndex, slide, swiper.slides);
	});
	if (params.watchSlidesProgress) swiper.updateSlidesOffset();
	if (slideTo) {
		if (prependSlidesIndexes.length > 0 && isPrev) {
			if (typeof slideRealIndex === "undefined") {
				const currentSlideTranslate = swiper.slidesGrid[activeIndex];
				const diff = swiper.slidesGrid[activeIndex + slidesPrepended] - currentSlideTranslate;
				if (byMousewheel) swiper.setTranslate(swiper.translate - diff);
				else {
					swiper.slideTo(activeIndex + Math.ceil(slidesPrepended), 0, false, true);
					if (setTranslate) {
						swiper.touchEventsData.startTranslate = swiper.touchEventsData.startTranslate - diff;
						swiper.touchEventsData.currentTranslate = swiper.touchEventsData.currentTranslate - diff;
					}
				}
			} else if (setTranslate) {
				const shift = gridEnabled ? prependSlidesIndexes.length / params.grid.rows : prependSlidesIndexes.length;
				swiper.slideTo(swiper.activeIndex + shift, 0, false, true);
				swiper.touchEventsData.currentTranslate = swiper.translate;
			}
		} else if (appendSlidesIndexes.length > 0 && isNext) if (typeof slideRealIndex === "undefined") {
			const currentSlideTranslate = swiper.slidesGrid[activeIndex];
			const diff = swiper.slidesGrid[activeIndex - slidesAppended] - currentSlideTranslate;
			if (byMousewheel) swiper.setTranslate(swiper.translate - diff);
			else {
				swiper.slideTo(activeIndex - slidesAppended, 0, false, true);
				if (setTranslate) {
					swiper.touchEventsData.startTranslate = swiper.touchEventsData.startTranslate - diff;
					swiper.touchEventsData.currentTranslate = swiper.touchEventsData.currentTranslate - diff;
				}
			}
		} else {
			const shift = gridEnabled ? appendSlidesIndexes.length / params.grid.rows : appendSlidesIndexes.length;
			swiper.slideTo(swiper.activeIndex - shift, 0, false, true);
		}
	}
	swiper.allowSlidePrev = allowSlidePrev;
	swiper.allowSlideNext = allowSlideNext;
	if (swiper.controller && swiper.controller.control && !byController) {
		const loopParams = {
			slideRealIndex,
			direction,
			setTranslate,
			activeSlideIndex,
			byController: true
		};
		if (Array.isArray(swiper.controller.control)) swiper.controller.control.forEach((c) => {
			if (!c.destroyed && c.params.loop) c.loopFix({
				...loopParams,
				slideTo: c.params.slidesPerView === params.slidesPerView ? slideTo : false
			});
		});
		else if (swiper.controller.control instanceof swiper.constructor && swiper.controller.control.params.loop) swiper.controller.control.loopFix({
			...loopParams,
			slideTo: swiper.controller.control.params.slidesPerView === params.slidesPerView ? slideTo : false
		});
	}
	swiper.emit("loopFix");
}
function loopDestroy() {
	const swiper = this;
	const { params, slidesEl } = swiper;
	if (!params.loop || !slidesEl || swiper.virtual && swiper.params.virtual.enabled) return;
	swiper.recalcSlides();
	const newSlidesOrder = [];
	swiper.slides.forEach((slideEl) => {
		const index = typeof slideEl.swiperSlideIndex === "undefined" ? slideEl.getAttribute("data-swiper-slide-index") * 1 : slideEl.swiperSlideIndex;
		newSlidesOrder[index] = slideEl;
	});
	swiper.slides.forEach((slideEl) => {
		slideEl.removeAttribute("data-swiper-slide-index");
	});
	newSlidesOrder.forEach((slideEl) => {
		slidesEl.append(slideEl);
	});
	swiper.recalcSlides();
	swiper.slideTo(swiper.realIndex, 0);
}
function setGrabCursor(moving) {
	const swiper = this;
	if (!swiper.params.simulateTouch || swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) return;
	const el = swiper.params.touchEventsTarget === "container" ? swiper.el : swiper.wrapperEl;
	if (swiper.isElement) swiper.__preventObserver__ = true;
	el.style.cursor = "move";
	el.style.cursor = moving ? "grabbing" : "grab";
	if (swiper.isElement) requestAnimationFrame(() => {
		swiper.__preventObserver__ = false;
	});
}
function unsetGrabCursor() {
	const swiper = this;
	if (swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) return;
	if (swiper.isElement) swiper.__preventObserver__ = true;
	swiper[swiper.params.touchEventsTarget === "container" ? "el" : "wrapperEl"].style.cursor = "";
	if (swiper.isElement) requestAnimationFrame(() => {
		swiper.__preventObserver__ = false;
	});
}
function closestElement(selector, base = this) {
	function __closestFrom(el) {
		if (!el || el === getDocument() || el === getWindow()) return null;
		if (el.assignedSlot) el = el.assignedSlot;
		const found = el.closest(selector);
		if (!found && !el.getRootNode) return null;
		return found || __closestFrom(el.getRootNode().host);
	}
	return __closestFrom(base);
}
function preventEdgeSwipe(swiper, event, startX) {
	const window = getWindow();
	const { params } = swiper;
	const edgeSwipeDetection = params.edgeSwipeDetection;
	const edgeSwipeThreshold = params.edgeSwipeThreshold;
	if (edgeSwipeDetection && (startX <= edgeSwipeThreshold || startX >= window.innerWidth - edgeSwipeThreshold)) {
		if (edgeSwipeDetection === "prevent") {
			event.preventDefault();
			return true;
		}
		return false;
	}
	return true;
}
function onTouchStart(event) {
	const swiper = this;
	const document = getDocument();
	let e = event;
	if (e.originalEvent) e = e.originalEvent;
	const data = swiper.touchEventsData;
	if (e.type === "pointerdown") {
		if (data.pointerId !== null && data.pointerId !== e.pointerId) return;
		data.pointerId = e.pointerId;
	} else if (e.type === "touchstart" && e.targetTouches.length === 1) data.touchId = e.targetTouches[0].identifier;
	if (e.type === "touchstart") {
		preventEdgeSwipe(swiper, e, e.targetTouches[0].pageX);
		return;
	}
	const { params, touches, enabled } = swiper;
	if (!enabled) return;
	if (!params.simulateTouch && e.pointerType === "mouse") return;
	if (swiper.animating && params.preventInteractionOnTransition) return;
	if (!swiper.animating && params.cssMode && params.loop) swiper.loopFix();
	let targetEl = e.target;
	if (params.touchEventsTarget === "wrapper") {
		if (!elementIsChildOf(targetEl, swiper.wrapperEl)) return;
	}
	if ("which" in e && e.which === 3) return;
	if ("button" in e && e.button > 0) return;
	if (data.isTouched && data.isMoved) return;
	const swipingClassHasValue = !!params.noSwipingClass && params.noSwipingClass !== "";
	const eventPath = e.composedPath ? e.composedPath() : e.path;
	if (swipingClassHasValue && e.target && e.target.shadowRoot && eventPath) targetEl = eventPath[0];
	const noSwipingSelector = params.noSwipingSelector ? params.noSwipingSelector : `.${params.noSwipingClass}`;
	const isTargetShadow = !!(e.target && e.target.shadowRoot);
	if (params.noSwiping && (isTargetShadow ? closestElement(noSwipingSelector, targetEl) : targetEl.closest(noSwipingSelector))) {
		swiper.allowClick = true;
		return;
	}
	if (params.swipeHandler) {
		if (!targetEl.closest(params.swipeHandler)) return;
	}
	touches.currentX = e.pageX;
	touches.currentY = e.pageY;
	const startX = touches.currentX;
	const startY = touches.currentY;
	if (!preventEdgeSwipe(swiper, e, startX)) return;
	Object.assign(data, {
		isTouched: true,
		isMoved: false,
		allowTouchCallbacks: true,
		isScrolling: void 0,
		startMoving: void 0
	});
	touches.startX = startX;
	touches.startY = startY;
	data.touchStartTime = now();
	swiper.allowClick = true;
	swiper.updateSize();
	swiper.swipeDirection = void 0;
	if (params.threshold > 0) data.allowThresholdMove = false;
	let preventDefault = true;
	if (targetEl.matches(data.focusableElements)) {
		preventDefault = false;
		if (targetEl.nodeName === "SELECT") data.isTouched = false;
	}
	if (document.activeElement && document.activeElement.matches(data.focusableElements) && document.activeElement !== targetEl && (e.pointerType === "mouse" || e.pointerType !== "mouse" && !targetEl.matches(data.focusableElements))) document.activeElement.blur();
	const shouldPreventDefault = preventDefault && swiper.allowTouchMove && params.touchStartPreventDefault;
	if ((params.touchStartForcePreventDefault || shouldPreventDefault) && !targetEl.isContentEditable) e.preventDefault();
	if (params.freeMode && params.freeMode.enabled && swiper.freeMode && swiper.animating && !params.cssMode) swiper.freeMode.onTouchStart();
	swiper.emit("touchStart", e);
}
function onTouchMove(event) {
	const document = getDocument();
	const swiper = this;
	const data = swiper.touchEventsData;
	const { params, touches, rtlTranslate: rtl, enabled } = swiper;
	if (!enabled) return;
	if (!params.simulateTouch && event.pointerType === "mouse") return;
	let e = event;
	if (e.originalEvent) e = e.originalEvent;
	if (e.type === "pointermove") {
		if (data.touchId !== null) return;
		if (e.pointerId !== data.pointerId) return;
	}
	let targetTouch;
	if (e.type === "touchmove") {
		targetTouch = [...e.changedTouches].find((t) => t.identifier === data.touchId);
		if (!targetTouch || targetTouch.identifier !== data.touchId) return;
	} else targetTouch = e;
	if (!data.isTouched) {
		if (data.startMoving && data.isScrolling) swiper.emit("touchMoveOpposite", e);
		return;
	}
	const pageX = targetTouch.pageX;
	const pageY = targetTouch.pageY;
	if (e.preventedByNestedSwiper) {
		touches.startX = pageX;
		touches.startY = pageY;
		return;
	}
	if (!swiper.allowTouchMove) {
		if (!e.target.matches(data.focusableElements)) swiper.allowClick = false;
		if (data.isTouched) {
			Object.assign(touches, {
				startX: pageX,
				startY: pageY,
				currentX: pageX,
				currentY: pageY
			});
			data.touchStartTime = now();
		}
		return;
	}
	if (params.touchReleaseOnEdges && !params.loop) {
		if (swiper.isVertical()) {
			if (pageY < touches.startY && swiper.translate <= swiper.maxTranslate() || pageY > touches.startY && swiper.translate >= swiper.minTranslate()) {
				data.isTouched = false;
				data.isMoved = false;
				return;
			}
		} else if (rtl && (pageX > touches.startX && -swiper.translate <= swiper.maxTranslate() || pageX < touches.startX && -swiper.translate >= swiper.minTranslate())) return;
		else if (!rtl && (pageX < touches.startX && swiper.translate <= swiper.maxTranslate() || pageX > touches.startX && swiper.translate >= swiper.minTranslate())) return;
	}
	if (document.activeElement && document.activeElement.matches(data.focusableElements) && document.activeElement !== e.target && e.pointerType !== "mouse") document.activeElement.blur();
	if (document.activeElement) {
		if (e.target === document.activeElement && e.target.matches(data.focusableElements)) {
			data.isMoved = true;
			swiper.allowClick = false;
			return;
		}
	}
	if (data.allowTouchCallbacks) swiper.emit("touchMove", e);
	touches.previousX = touches.currentX;
	touches.previousY = touches.currentY;
	touches.currentX = pageX;
	touches.currentY = pageY;
	const diffX = touches.currentX - touches.startX;
	const diffY = touches.currentY - touches.startY;
	if (swiper.params.threshold && Math.sqrt(diffX ** 2 + diffY ** 2) < swiper.params.threshold) return;
	if (typeof data.isScrolling === "undefined") {
		let touchAngle;
		if (swiper.isHorizontal() && touches.currentY === touches.startY || swiper.isVertical() && touches.currentX === touches.startX) data.isScrolling = false;
		else if (diffX * diffX + diffY * diffY >= 25) {
			touchAngle = Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180 / Math.PI;
			data.isScrolling = swiper.isHorizontal() ? touchAngle > params.touchAngle : 90 - touchAngle > params.touchAngle;
		}
	}
	if (data.isScrolling) swiper.emit("touchMoveOpposite", e);
	if (typeof data.startMoving === "undefined") {
		if (touches.currentX !== touches.startX || touches.currentY !== touches.startY) data.startMoving = true;
	}
	if (data.isScrolling || e.type === "touchmove" && data.preventTouchMoveFromPointerMove) {
		data.isTouched = false;
		return;
	}
	if (!data.startMoving) return;
	swiper.allowClick = false;
	if (!params.cssMode && e.cancelable) e.preventDefault();
	if (params.touchMoveStopPropagation && !params.nested) e.stopPropagation();
	let diff = swiper.isHorizontal() ? diffX : diffY;
	let touchesDiff = swiper.isHorizontal() ? touches.currentX - touches.previousX : touches.currentY - touches.previousY;
	if (params.oneWayMovement) {
		diff = Math.abs(diff) * (rtl ? 1 : -1);
		touchesDiff = Math.abs(touchesDiff) * (rtl ? 1 : -1);
	}
	touches.diff = diff;
	diff *= params.touchRatio;
	if (rtl) {
		diff = -diff;
		touchesDiff = -touchesDiff;
	}
	const prevTouchesDirection = swiper.touchesDirection;
	swiper.swipeDirection = diff > 0 ? "prev" : "next";
	swiper.touchesDirection = touchesDiff > 0 ? "prev" : "next";
	const isLoop = swiper.params.loop && !params.cssMode;
	const allowLoopFix = swiper.touchesDirection === "next" && swiper.allowSlideNext || swiper.touchesDirection === "prev" && swiper.allowSlidePrev;
	if (!data.isMoved) {
		if (isLoop && allowLoopFix) swiper.loopFix({ direction: swiper.swipeDirection });
		data.startTranslate = swiper.getTranslate();
		swiper.setTransition(0);
		if (swiper.animating) {
			const evt = new window.CustomEvent("transitionend", {
				bubbles: true,
				cancelable: true,
				detail: { bySwiperTouchMove: true }
			});
			swiper.wrapperEl.dispatchEvent(evt);
		}
		data.allowMomentumBounce = false;
		if (params.grabCursor && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) swiper.setGrabCursor(true);
		swiper.emit("sliderFirstMove", e);
	}
	(/* @__PURE__ */ new Date()).getTime();
	if (params._loopSwapReset !== false && data.isMoved && data.allowThresholdMove && prevTouchesDirection !== swiper.touchesDirection && isLoop && allowLoopFix && Math.abs(diff) >= 1) {
		Object.assign(touches, {
			startX: pageX,
			startY: pageY,
			currentX: pageX,
			currentY: pageY,
			startTranslate: data.currentTranslate
		});
		data.loopSwapReset = true;
		data.startTranslate = data.currentTranslate;
		return;
	}
	swiper.emit("sliderMove", e);
	data.isMoved = true;
	data.currentTranslate = diff + data.startTranslate;
	let disableParentSwiper = true;
	let resistanceRatio = params.resistanceRatio;
	if (params.touchReleaseOnEdges) resistanceRatio = 0;
	if (diff > 0) {
		if (isLoop && allowLoopFix && data.allowThresholdMove && data.currentTranslate > (params.centeredSlides ? swiper.minTranslate() - swiper.slidesSizesGrid[swiper.activeIndex + 1] - (params.slidesPerView !== "auto" && swiper.slides.length - params.slidesPerView >= 2 ? swiper.slidesSizesGrid[swiper.activeIndex + 1] + swiper.params.spaceBetween : 0) - swiper.params.spaceBetween : swiper.minTranslate())) swiper.loopFix({
			direction: "prev",
			setTranslate: true,
			activeSlideIndex: 0
		});
		if (data.currentTranslate > swiper.minTranslate()) {
			disableParentSwiper = false;
			if (params.resistance) data.currentTranslate = swiper.minTranslate() - 1 + (-swiper.minTranslate() + data.startTranslate + diff) ** resistanceRatio;
		}
	} else if (diff < 0) {
		if (isLoop && allowLoopFix && data.allowThresholdMove && data.currentTranslate < (params.centeredSlides ? swiper.maxTranslate() + swiper.slidesSizesGrid[swiper.slidesSizesGrid.length - 1] + swiper.params.spaceBetween + (params.slidesPerView !== "auto" && swiper.slides.length - params.slidesPerView >= 2 ? swiper.slidesSizesGrid[swiper.slidesSizesGrid.length - 1] + swiper.params.spaceBetween : 0) : swiper.maxTranslate())) swiper.loopFix({
			direction: "next",
			setTranslate: true,
			activeSlideIndex: swiper.slides.length - (params.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : Math.ceil(parseFloat(params.slidesPerView, 10)))
		});
		if (data.currentTranslate < swiper.maxTranslate()) {
			disableParentSwiper = false;
			if (params.resistance) data.currentTranslate = swiper.maxTranslate() + 1 - (swiper.maxTranslate() - data.startTranslate - diff) ** resistanceRatio;
		}
	}
	if (disableParentSwiper) e.preventedByNestedSwiper = true;
	if (!swiper.allowSlideNext && swiper.swipeDirection === "next" && data.currentTranslate < data.startTranslate) data.currentTranslate = data.startTranslate;
	if (!swiper.allowSlidePrev && swiper.swipeDirection === "prev" && data.currentTranslate > data.startTranslate) data.currentTranslate = data.startTranslate;
	if (!swiper.allowSlidePrev && !swiper.allowSlideNext) data.currentTranslate = data.startTranslate;
	if (params.threshold > 0) if (Math.abs(diff) > params.threshold || data.allowThresholdMove) {
		if (!data.allowThresholdMove) {
			data.allowThresholdMove = true;
			touches.startX = touches.currentX;
			touches.startY = touches.currentY;
			data.currentTranslate = data.startTranslate;
			touches.diff = swiper.isHorizontal() ? touches.currentX - touches.startX : touches.currentY - touches.startY;
			return;
		}
	} else {
		data.currentTranslate = data.startTranslate;
		return;
	}
	if (!params.followFinger || params.cssMode) return;
	if (params.freeMode && params.freeMode.enabled && swiper.freeMode || params.watchSlidesProgress) {
		swiper.updateActiveIndex();
		swiper.updateSlidesClasses();
	}
	if (params.freeMode && params.freeMode.enabled && swiper.freeMode) swiper.freeMode.onTouchMove();
	swiper.updateProgress(data.currentTranslate);
	swiper.setTranslate(data.currentTranslate);
}
function onTouchEnd(event) {
	const swiper = this;
	const data = swiper.touchEventsData;
	let e = event;
	if (e.originalEvent) e = e.originalEvent;
	let targetTouch;
	if (!(e.type === "touchend" || e.type === "touchcancel")) {
		if (data.touchId !== null) return;
		if (e.pointerId !== data.pointerId) return;
		targetTouch = e;
	} else {
		targetTouch = [...e.changedTouches].find((t) => t.identifier === data.touchId);
		if (!targetTouch || targetTouch.identifier !== data.touchId) return;
	}
	if ([
		"pointercancel",
		"pointerout",
		"pointerleave",
		"contextmenu"
	].includes(e.type)) {
		if (!(["pointercancel", "contextmenu"].includes(e.type) && (swiper.browser.isSafari || swiper.browser.isWebView))) return;
	}
	data.pointerId = null;
	data.touchId = null;
	const { params, touches, rtlTranslate: rtl, slidesGrid, enabled } = swiper;
	if (!enabled) return;
	if (!params.simulateTouch && e.pointerType === "mouse") return;
	if (data.allowTouchCallbacks) swiper.emit("touchEnd", e);
	data.allowTouchCallbacks = false;
	if (!data.isTouched) {
		if (data.isMoved && params.grabCursor) swiper.setGrabCursor(false);
		data.isMoved = false;
		data.startMoving = false;
		return;
	}
	if (params.grabCursor && data.isMoved && data.isTouched && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) swiper.setGrabCursor(false);
	const touchEndTime = now();
	const timeDiff = touchEndTime - data.touchStartTime;
	if (swiper.allowClick) {
		const pathTree = e.path || e.composedPath && e.composedPath();
		swiper.updateClickedSlide(pathTree && pathTree[0] || e.target, pathTree);
		swiper.emit("tap click", e);
		if (timeDiff < 300 && touchEndTime - data.lastClickTime < 300) swiper.emit("doubleTap doubleClick", e);
	}
	data.lastClickTime = now();
	nextTick(() => {
		if (!swiper.destroyed) swiper.allowClick = true;
	});
	if (!data.isTouched || !data.isMoved || !swiper.swipeDirection || touches.diff === 0 && !data.loopSwapReset || data.currentTranslate === data.startTranslate && !data.loopSwapReset) {
		data.isTouched = false;
		data.isMoved = false;
		data.startMoving = false;
		return;
	}
	data.isTouched = false;
	data.isMoved = false;
	data.startMoving = false;
	let currentPos;
	if (params.followFinger) currentPos = rtl ? swiper.translate : -swiper.translate;
	else currentPos = -data.currentTranslate;
	if (params.cssMode) return;
	if (params.freeMode && params.freeMode.enabled) {
		swiper.freeMode.onTouchEnd({ currentPos });
		return;
	}
	const swipeToLast = currentPos >= -swiper.maxTranslate() && !swiper.params.loop;
	let stopIndex = 0;
	let groupSize = swiper.slidesSizesGrid[0];
	for (let i = 0; i < slidesGrid.length; i += i < params.slidesPerGroupSkip ? 1 : params.slidesPerGroup) {
		const increment = i < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
		if (typeof slidesGrid[i + increment] !== "undefined") {
			if (swipeToLast || currentPos >= slidesGrid[i] && currentPos < slidesGrid[i + increment]) {
				stopIndex = i;
				groupSize = slidesGrid[i + increment] - slidesGrid[i];
			}
		} else if (swipeToLast || currentPos >= slidesGrid[i]) {
			stopIndex = i;
			groupSize = slidesGrid[slidesGrid.length - 1] - slidesGrid[slidesGrid.length - 2];
		}
	}
	let rewindFirstIndex = null;
	let rewindLastIndex = null;
	if (params.rewind) {
		if (swiper.isBeginning) rewindLastIndex = params.virtual && params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1;
		else if (swiper.isEnd) rewindFirstIndex = 0;
	}
	const ratio = (currentPos - slidesGrid[stopIndex]) / groupSize;
	const increment = stopIndex < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
	if (timeDiff > params.longSwipesMs) {
		if (!params.longSwipes) {
			swiper.slideTo(swiper.activeIndex);
			return;
		}
		if (swiper.swipeDirection === "next") if (ratio >= params.longSwipesRatio) swiper.slideTo(params.rewind && swiper.isEnd ? rewindFirstIndex : stopIndex + increment);
		else swiper.slideTo(stopIndex);
		if (swiper.swipeDirection === "prev") if (ratio > 1 - params.longSwipesRatio) swiper.slideTo(stopIndex + increment);
		else if (rewindLastIndex !== null && ratio < 0 && Math.abs(ratio) > params.longSwipesRatio) swiper.slideTo(rewindLastIndex);
		else swiper.slideTo(stopIndex);
	} else {
		if (!params.shortSwipes) {
			swiper.slideTo(swiper.activeIndex);
			return;
		}
		if (!(swiper.navigation && (e.target === swiper.navigation.nextEl || e.target === swiper.navigation.prevEl))) {
			if (swiper.swipeDirection === "next") swiper.slideTo(rewindFirstIndex !== null ? rewindFirstIndex : stopIndex + increment);
			if (swiper.swipeDirection === "prev") swiper.slideTo(rewindLastIndex !== null ? rewindLastIndex : stopIndex);
		} else if (e.target === swiper.navigation.nextEl) swiper.slideTo(stopIndex + increment);
		else swiper.slideTo(stopIndex);
	}
}
function onResize() {
	const swiper = this;
	const { params, el } = swiper;
	if (el && el.offsetWidth === 0) return;
	if (params.breakpoints) swiper.setBreakpoint();
	const { allowSlideNext, allowSlidePrev, snapGrid } = swiper;
	const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
	swiper.allowSlideNext = true;
	swiper.allowSlidePrev = true;
	swiper.updateSize();
	swiper.updateSlides();
	swiper.updateSlidesClasses();
	const isVirtualLoop = isVirtual && params.loop;
	if ((params.slidesPerView === "auto" || params.slidesPerView > 1) && swiper.isEnd && !swiper.isBeginning && !swiper.params.centeredSlides && !isVirtualLoop) swiper.slideTo(swiper.slides.length - 1, 0, false, true);
	else if (swiper.params.loop && !isVirtual) swiper.slideToLoop(swiper.realIndex, 0, false, true);
	else swiper.slideTo(swiper.activeIndex, 0, false, true);
	if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) {
		clearTimeout(swiper.autoplay.resizeTimeout);
		swiper.autoplay.resizeTimeout = setTimeout(() => {
			if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) swiper.autoplay.resume();
		}, 500);
	}
	swiper.allowSlidePrev = allowSlidePrev;
	swiper.allowSlideNext = allowSlideNext;
	if (swiper.params.watchOverflow && snapGrid !== swiper.snapGrid) swiper.checkOverflow();
}
function onClick(e) {
	const swiper = this;
	if (!swiper.enabled) return;
	if (!swiper.allowClick) {
		if (swiper.params.preventClicks) e.preventDefault();
		if (swiper.params.preventClicksPropagation && swiper.animating) {
			e.stopPropagation();
			e.stopImmediatePropagation();
		}
	}
}
function onScroll() {
	const swiper = this;
	const { wrapperEl, rtlTranslate, enabled } = swiper;
	if (!enabled) return;
	swiper.previousTranslate = swiper.translate;
	if (swiper.isHorizontal()) swiper.translate = -wrapperEl.scrollLeft;
	else swiper.translate = -wrapperEl.scrollTop;
	if (swiper.translate === 0) swiper.translate = 0;
	swiper.updateActiveIndex();
	swiper.updateSlidesClasses();
	let newProgress;
	const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
	if (translatesDiff === 0) newProgress = 0;
	else newProgress = (swiper.translate - swiper.minTranslate()) / translatesDiff;
	if (newProgress !== swiper.progress) swiper.updateProgress(rtlTranslate ? -swiper.translate : swiper.translate);
	swiper.emit("setTranslate", swiper.translate, false);
}
function onLoad(e) {
	const swiper = this;
	processLazyPreloader(swiper, e.target);
	if (swiper.params.cssMode || swiper.params.slidesPerView !== "auto" && !swiper.params.autoHeight) return;
	swiper.update();
}
function onDocumentTouchStart() {
	const swiper = this;
	if (swiper.documentTouchHandlerProceeded) return;
	swiper.documentTouchHandlerProceeded = true;
	if (swiper.params.touchReleaseOnEdges) swiper.el.style.touchAction = "auto";
}
function attachEvents() {
	const swiper = this;
	const { params } = swiper;
	swiper.onTouchStart = onTouchStart.bind(swiper);
	swiper.onTouchMove = onTouchMove.bind(swiper);
	swiper.onTouchEnd = onTouchEnd.bind(swiper);
	swiper.onDocumentTouchStart = onDocumentTouchStart.bind(swiper);
	if (params.cssMode) swiper.onScroll = onScroll.bind(swiper);
	swiper.onClick = onClick.bind(swiper);
	swiper.onLoad = onLoad.bind(swiper);
	events(swiper, "on");
}
function detachEvents() {
	const swiper = this;
	events(swiper, "off");
}
function setBreakpoint() {
	const swiper = this;
	const { realIndex, initialized, params, el } = swiper;
	const breakpoints = params.breakpoints;
	if (!breakpoints || breakpoints && Object.keys(breakpoints).length === 0) return;
	const document = getDocument();
	const breakpointsBase = params.breakpointsBase === "window" || !params.breakpointsBase ? params.breakpointsBase : "container";
	const breakpointContainer = ["window", "container"].includes(params.breakpointsBase) || !params.breakpointsBase ? swiper.el : document.querySelector(params.breakpointsBase);
	const breakpoint = swiper.getBreakpoint(breakpoints, breakpointsBase, breakpointContainer);
	if (!breakpoint || swiper.currentBreakpoint === breakpoint) return;
	const breakpointParams = (breakpoint in breakpoints ? breakpoints[breakpoint] : void 0) || swiper.originalParams;
	const wasMultiRow = isGridEnabled(swiper, params);
	const isMultiRow = isGridEnabled(swiper, breakpointParams);
	const wasGrabCursor = swiper.params.grabCursor;
	const isGrabCursor = breakpointParams.grabCursor;
	const wasEnabled = params.enabled;
	if (wasMultiRow && !isMultiRow) {
		el.classList.remove(`${params.containerModifierClass}grid`, `${params.containerModifierClass}grid-column`);
		swiper.emitContainerClasses();
	} else if (!wasMultiRow && isMultiRow) {
		el.classList.add(`${params.containerModifierClass}grid`);
		if (breakpointParams.grid.fill && breakpointParams.grid.fill === "column" || !breakpointParams.grid.fill && params.grid.fill === "column") el.classList.add(`${params.containerModifierClass}grid-column`);
		swiper.emitContainerClasses();
	}
	if (wasGrabCursor && !isGrabCursor) swiper.unsetGrabCursor();
	else if (!wasGrabCursor && isGrabCursor) swiper.setGrabCursor();
	[
		"navigation",
		"pagination",
		"scrollbar"
	].forEach((prop) => {
		if (typeof breakpointParams[prop] === "undefined") return;
		const wasModuleEnabled = params[prop] && params[prop].enabled;
		const isModuleEnabled = breakpointParams[prop] && breakpointParams[prop].enabled;
		if (wasModuleEnabled && !isModuleEnabled) swiper[prop].disable();
		if (!wasModuleEnabled && isModuleEnabled) swiper[prop].enable();
	});
	const directionChanged = breakpointParams.direction && breakpointParams.direction !== params.direction;
	const needsReLoop = params.loop && (breakpointParams.slidesPerView !== params.slidesPerView || directionChanged);
	const wasLoop = params.loop;
	if (directionChanged && initialized) swiper.changeDirection();
	extend$1(swiper.params, breakpointParams);
	const isEnabled = swiper.params.enabled;
	const hasLoop = swiper.params.loop;
	Object.assign(swiper, {
		allowTouchMove: swiper.params.allowTouchMove,
		allowSlideNext: swiper.params.allowSlideNext,
		allowSlidePrev: swiper.params.allowSlidePrev
	});
	if (wasEnabled && !isEnabled) swiper.disable();
	else if (!wasEnabled && isEnabled) swiper.enable();
	swiper.currentBreakpoint = breakpoint;
	swiper.emit("_beforeBreakpoint", breakpointParams);
	if (initialized) {
		if (needsReLoop) {
			swiper.loopDestroy();
			swiper.loopCreate(realIndex);
			swiper.updateSlides();
		} else if (!wasLoop && hasLoop) {
			swiper.loopCreate(realIndex);
			swiper.updateSlides();
		} else if (wasLoop && !hasLoop) swiper.loopDestroy();
	}
	swiper.emit("breakpoint", breakpointParams);
}
function getBreakpoint(breakpoints, base = "window", containerEl) {
	if (!breakpoints || base === "container" && !containerEl) return void 0;
	let breakpoint = false;
	const window = getWindow();
	const currentHeight = base === "window" ? window.innerHeight : containerEl.clientHeight;
	const points = Object.keys(breakpoints).map((point) => {
		if (typeof point === "string" && point.indexOf("@") === 0) {
			const minRatio = parseFloat(point.substr(1));
			return {
				value: currentHeight * minRatio,
				point
			};
		}
		return {
			value: point,
			point
		};
	});
	points.sort((a, b) => parseInt(a.value, 10) - parseInt(b.value, 10));
	for (let i = 0; i < points.length; i += 1) {
		const { point, value } = points[i];
		if (base === "window") {
			if (window.matchMedia(`(min-width: ${value}px)`).matches) breakpoint = point;
		} else if (value <= containerEl.clientWidth) breakpoint = point;
	}
	return breakpoint || "max";
}
function prepareClasses(entries, prefix) {
	const resultClasses = [];
	entries.forEach((item) => {
		if (typeof item === "object") Object.keys(item).forEach((classNames) => {
			if (item[classNames]) resultClasses.push(prefix + classNames);
		});
		else if (typeof item === "string") resultClasses.push(prefix + item);
	});
	return resultClasses;
}
function addClasses() {
	const swiper = this;
	const { classNames, params, rtl, el, device } = swiper;
	const suffixes = prepareClasses([
		"initialized",
		params.direction,
		{ "free-mode": swiper.params.freeMode && params.freeMode.enabled },
		{ "autoheight": params.autoHeight },
		{ "rtl": rtl },
		{ "grid": params.grid && params.grid.rows > 1 },
		{ "grid-column": params.grid && params.grid.rows > 1 && params.grid.fill === "column" },
		{ "android": device.android },
		{ "ios": device.ios },
		{ "css-mode": params.cssMode },
		{ "centered": params.cssMode && params.centeredSlides },
		{ "watch-progress": params.watchSlidesProgress }
	], params.containerModifierClass);
	classNames.push(...suffixes);
	el.classList.add(...classNames);
	swiper.emitContainerClasses();
}
function removeClasses() {
	const swiper = this;
	const { el, classNames } = swiper;
	if (!el || typeof el === "string") return;
	el.classList.remove(...classNames);
	swiper.emitContainerClasses();
}
function checkOverflow() {
	const swiper = this;
	const { isLocked: wasLocked, params } = swiper;
	const { slidesOffsetBefore } = params;
	if (slidesOffsetBefore) {
		const lastSlideIndex = swiper.slides.length - 1;
		const lastSlideRightEdge = swiper.slidesGrid[lastSlideIndex] + swiper.slidesSizesGrid[lastSlideIndex] + slidesOffsetBefore * 2;
		swiper.isLocked = swiper.size > lastSlideRightEdge;
	} else swiper.isLocked = swiper.snapGrid.length === 1;
	if (params.allowSlideNext === true) swiper.allowSlideNext = !swiper.isLocked;
	if (params.allowSlidePrev === true) swiper.allowSlidePrev = !swiper.isLocked;
	if (wasLocked && wasLocked !== swiper.isLocked) swiper.isEnd = false;
	if (wasLocked !== swiper.isLocked) swiper.emit(swiper.isLocked ? "lock" : "unlock");
}
function moduleExtendParams(params, allModulesParams) {
	return function extendParams(obj = {}) {
		const moduleParamName = Object.keys(obj)[0];
		const moduleParams = obj[moduleParamName];
		if (typeof moduleParams !== "object" || moduleParams === null) {
			extend$1(allModulesParams, obj);
			return;
		}
		if (params[moduleParamName] === true) params[moduleParamName] = { enabled: true };
		if (moduleParamName === "navigation" && params[moduleParamName] && params[moduleParamName].enabled && !params[moduleParamName].prevEl && !params[moduleParamName].nextEl) params[moduleParamName].auto = true;
		if (["pagination", "scrollbar"].indexOf(moduleParamName) >= 0 && params[moduleParamName] && params[moduleParamName].enabled && !params[moduleParamName].el) params[moduleParamName].auto = true;
		if (!(moduleParamName in params && "enabled" in moduleParams)) {
			extend$1(allModulesParams, obj);
			return;
		}
		if (typeof params[moduleParamName] === "object" && !("enabled" in params[moduleParamName])) params[moduleParamName].enabled = true;
		if (!params[moduleParamName]) params[moduleParamName] = { enabled: false };
		extend$1(allModulesParams, obj);
	};
}
var support, deviceCached, browser, eventsEmitter, toggleSlideClasses$1, toggleSlideClasses, processLazyPreloader, unlazy, preload, update, translate, transition, slide, loop, grabCursor, events, events$1, isGridEnabled, breakpoints, classes, checkOverflow$1, defaults, prototypes, extendedDefaults, Swiper$1;
var init_swiper_core = __esmMin((() => {
	init_ssr_window_esm();
	init_utils();
	eventsEmitter = {
		on(events, handler, priority) {
			const self = this;
			if (!self.eventsListeners || self.destroyed) return self;
			if (typeof handler !== "function") return self;
			const method = priority ? "unshift" : "push";
			events.split(" ").forEach((event) => {
				if (!self.eventsListeners[event]) self.eventsListeners[event] = [];
				self.eventsListeners[event][method](handler);
			});
			return self;
		},
		once(events, handler, priority) {
			const self = this;
			if (!self.eventsListeners || self.destroyed) return self;
			if (typeof handler !== "function") return self;
			function onceHandler(...args) {
				self.off(events, onceHandler);
				if (onceHandler.__emitterProxy) delete onceHandler.__emitterProxy;
				handler.apply(self, args);
			}
			onceHandler.__emitterProxy = handler;
			return self.on(events, onceHandler, priority);
		},
		onAny(handler, priority) {
			const self = this;
			if (!self.eventsListeners || self.destroyed) return self;
			if (typeof handler !== "function") return self;
			const method = priority ? "unshift" : "push";
			if (self.eventsAnyListeners.indexOf(handler) < 0) self.eventsAnyListeners[method](handler);
			return self;
		},
		offAny(handler) {
			const self = this;
			if (!self.eventsListeners || self.destroyed) return self;
			if (!self.eventsAnyListeners) return self;
			const index = self.eventsAnyListeners.indexOf(handler);
			if (index >= 0) self.eventsAnyListeners.splice(index, 1);
			return self;
		},
		off(events, handler) {
			const self = this;
			if (!self.eventsListeners || self.destroyed) return self;
			if (!self.eventsListeners) return self;
			events.split(" ").forEach((event) => {
				if (typeof handler === "undefined") self.eventsListeners[event] = [];
				else if (self.eventsListeners[event]) self.eventsListeners[event].forEach((eventHandler, index) => {
					if (eventHandler === handler || eventHandler.__emitterProxy && eventHandler.__emitterProxy === handler) self.eventsListeners[event].splice(index, 1);
				});
			});
			return self;
		},
		emit(...args) {
			const self = this;
			if (!self.eventsListeners || self.destroyed) return self;
			if (!self.eventsListeners) return self;
			let events;
			let data;
			let context;
			if (typeof args[0] === "string" || Array.isArray(args[0])) {
				events = args[0];
				data = args.slice(1, args.length);
				context = self;
			} else {
				events = args[0].events;
				data = args[0].data;
				context = args[0].context || self;
			}
			data.unshift(context);
			(Array.isArray(events) ? events : events.split(" ")).forEach((event) => {
				if (self.eventsAnyListeners && self.eventsAnyListeners.length) self.eventsAnyListeners.forEach((eventHandler) => {
					eventHandler.apply(context, [event, ...data]);
				});
				if (self.eventsListeners && self.eventsListeners[event]) self.eventsListeners[event].forEach((eventHandler) => {
					eventHandler.apply(context, data);
				});
			});
			return self;
		}
	};
	toggleSlideClasses$1 = (slideEl, condition, className) => {
		if (condition && !slideEl.classList.contains(className)) slideEl.classList.add(className);
		else if (!condition && slideEl.classList.contains(className)) slideEl.classList.remove(className);
	};
	toggleSlideClasses = (slideEl, condition, className) => {
		if (condition && !slideEl.classList.contains(className)) slideEl.classList.add(className);
		else if (!condition && slideEl.classList.contains(className)) slideEl.classList.remove(className);
	};
	processLazyPreloader = (swiper, imageEl) => {
		if (!swiper || swiper.destroyed || !swiper.params) return;
		const slideSelector = () => swiper.isElement ? `swiper-slide` : `.${swiper.params.slideClass}`;
		const slideEl = imageEl.closest(slideSelector());
		if (slideEl) {
			let lazyEl = slideEl.querySelector(`.${swiper.params.lazyPreloaderClass}`);
			if (!lazyEl && swiper.isElement) if (slideEl.shadowRoot) lazyEl = slideEl.shadowRoot.querySelector(`.${swiper.params.lazyPreloaderClass}`);
			else requestAnimationFrame(() => {
				if (slideEl.shadowRoot) {
					lazyEl = slideEl.shadowRoot.querySelector(`.${swiper.params.lazyPreloaderClass}`);
					if (lazyEl && !lazyEl.lazyPreloaderManaged) lazyEl.remove();
				}
			});
			if (lazyEl && !lazyEl.lazyPreloaderManaged) lazyEl.remove();
		}
	};
	unlazy = (swiper, index) => {
		if (!swiper.slides[index]) return;
		const imageEl = swiper.slides[index].querySelector("[loading=\"lazy\"]");
		if (imageEl) imageEl.removeAttribute("loading");
	};
	preload = (swiper) => {
		if (!swiper || swiper.destroyed || !swiper.params) return;
		let amount = swiper.params.lazyPreloadPrevNext;
		const len = swiper.slides.length;
		if (!len || !amount || amount < 0) return;
		amount = Math.min(amount, len);
		const slidesPerView = swiper.params.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : Math.ceil(swiper.params.slidesPerView);
		const activeIndex = swiper.activeIndex;
		if (swiper.params.grid && swiper.params.grid.rows > 1) {
			const activeColumn = activeIndex;
			const preloadColumns = [activeColumn - amount];
			preloadColumns.push(...Array.from({ length: amount }).map((_, i) => {
				return activeColumn + slidesPerView + i;
			}));
			swiper.slides.forEach((slideEl, i) => {
				if (preloadColumns.includes(slideEl.column)) unlazy(swiper, i);
			});
			return;
		}
		const slideIndexLastInView = activeIndex + slidesPerView - 1;
		if (swiper.params.rewind || swiper.params.loop) for (let i = activeIndex - amount; i <= slideIndexLastInView + amount; i += 1) {
			const realIndex = (i % len + len) % len;
			if (realIndex < activeIndex || realIndex > slideIndexLastInView) unlazy(swiper, realIndex);
		}
		else for (let i = Math.max(activeIndex - amount, 0); i <= Math.min(slideIndexLastInView + amount, len - 1); i += 1) if (i !== activeIndex && (i > slideIndexLastInView || i < activeIndex)) unlazy(swiper, i);
	};
	update = {
		updateSize,
		updateSlides,
		updateAutoHeight,
		updateSlidesOffset,
		updateSlidesProgress,
		updateProgress,
		updateSlidesClasses,
		updateActiveIndex,
		updateClickedSlide
	};
	translate = {
		getTranslate: getSwiperTranslate,
		setTranslate,
		minTranslate,
		maxTranslate,
		translateTo
	};
	transition = {
		setTransition,
		transitionStart,
		transitionEnd
	};
	slide = {
		slideTo,
		slideToLoop,
		slideNext,
		slidePrev,
		slideReset,
		slideToClosest,
		slideToClickedSlide
	};
	loop = {
		loopCreate,
		loopFix,
		loopDestroy
	};
	grabCursor = {
		setGrabCursor,
		unsetGrabCursor
	};
	events = (swiper, method) => {
		const document = getDocument();
		const { params, el, wrapperEl, device } = swiper;
		const capture = !!params.nested;
		const domMethod = method === "on" ? "addEventListener" : "removeEventListener";
		const swiperMethod = method;
		if (!el || typeof el === "string") return;
		document[domMethod]("touchstart", swiper.onDocumentTouchStart, {
			passive: false,
			capture
		});
		el[domMethod]("touchstart", swiper.onTouchStart, { passive: false });
		el[domMethod]("pointerdown", swiper.onTouchStart, { passive: false });
		document[domMethod]("touchmove", swiper.onTouchMove, {
			passive: false,
			capture
		});
		document[domMethod]("pointermove", swiper.onTouchMove, {
			passive: false,
			capture
		});
		document[domMethod]("touchend", swiper.onTouchEnd, { passive: true });
		document[domMethod]("pointerup", swiper.onTouchEnd, { passive: true });
		document[domMethod]("pointercancel", swiper.onTouchEnd, { passive: true });
		document[domMethod]("touchcancel", swiper.onTouchEnd, { passive: true });
		document[domMethod]("pointerout", swiper.onTouchEnd, { passive: true });
		document[domMethod]("pointerleave", swiper.onTouchEnd, { passive: true });
		document[domMethod]("contextmenu", swiper.onTouchEnd, { passive: true });
		if (params.preventClicks || params.preventClicksPropagation) el[domMethod]("click", swiper.onClick, true);
		if (params.cssMode) wrapperEl[domMethod]("scroll", swiper.onScroll);
		if (params.updateOnWindowResize) swiper[swiperMethod](device.ios || device.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", onResize, true);
		else swiper[swiperMethod]("observerUpdate", onResize, true);
		el[domMethod]("load", swiper.onLoad, { capture: true });
	};
	events$1 = {
		attachEvents,
		detachEvents
	};
	isGridEnabled = (swiper, params) => {
		return swiper.grid && params.grid && params.grid.rows > 1;
	};
	breakpoints = {
		setBreakpoint,
		getBreakpoint
	};
	classes = {
		addClasses,
		removeClasses
	};
	checkOverflow$1 = { checkOverflow };
	defaults = {
		init: true,
		direction: "horizontal",
		oneWayMovement: false,
		swiperElementNodeName: "SWIPER-CONTAINER",
		touchEventsTarget: "wrapper",
		initialSlide: 0,
		speed: 300,
		cssMode: false,
		updateOnWindowResize: true,
		resizeObserver: true,
		nested: false,
		createElements: false,
		eventsPrefix: "swiper",
		enabled: true,
		focusableElements: "input, select, option, textarea, button, video, label",
		width: null,
		height: null,
		preventInteractionOnTransition: false,
		userAgent: null,
		url: null,
		edgeSwipeDetection: false,
		edgeSwipeThreshold: 20,
		autoHeight: false,
		setWrapperSize: false,
		virtualTranslate: false,
		effect: "slide",
		breakpoints: void 0,
		breakpointsBase: "window",
		spaceBetween: 0,
		slidesPerView: 1,
		slidesPerGroup: 1,
		slidesPerGroupSkip: 0,
		slidesPerGroupAuto: false,
		centeredSlides: false,
		centeredSlidesBounds: false,
		slidesOffsetBefore: 0,
		slidesOffsetAfter: 0,
		normalizeSlideIndex: true,
		centerInsufficientSlides: false,
		snapToSlideEdge: false,
		watchOverflow: true,
		roundLengths: false,
		touchRatio: 1,
		touchAngle: 45,
		simulateTouch: true,
		shortSwipes: true,
		longSwipes: true,
		longSwipesRatio: .5,
		longSwipesMs: 300,
		followFinger: true,
		allowTouchMove: true,
		threshold: 5,
		touchMoveStopPropagation: false,
		touchStartPreventDefault: true,
		touchStartForcePreventDefault: false,
		touchReleaseOnEdges: false,
		uniqueNavElements: true,
		resistance: true,
		resistanceRatio: .85,
		watchSlidesProgress: false,
		grabCursor: false,
		preventClicks: true,
		preventClicksPropagation: true,
		slideToClickedSlide: false,
		loop: false,
		loopAddBlankSlides: true,
		loopAdditionalSlides: 0,
		loopPreventsSliding: true,
		rewind: false,
		allowSlidePrev: true,
		allowSlideNext: true,
		swipeHandler: null,
		noSwiping: true,
		noSwipingClass: "swiper-no-swiping",
		noSwipingSelector: null,
		passiveListeners: true,
		maxBackfaceHiddenSlides: 10,
		containerModifierClass: "swiper-",
		slideClass: "swiper-slide",
		slideBlankClass: "swiper-slide-blank",
		slideActiveClass: "swiper-slide-active",
		slideVisibleClass: "swiper-slide-visible",
		slideFullyVisibleClass: "swiper-slide-fully-visible",
		slideNextClass: "swiper-slide-next",
		slidePrevClass: "swiper-slide-prev",
		wrapperClass: "swiper-wrapper",
		lazyPreloaderClass: "swiper-lazy-preloader",
		lazyPreloadPrevNext: 0,
		runCallbacksOnInit: true,
		_emitClasses: false
	};
	prototypes = {
		eventsEmitter,
		update,
		translate,
		transition,
		slide,
		loop,
		grabCursor,
		events: events$1,
		breakpoints,
		checkOverflow: checkOverflow$1,
		classes
	};
	extendedDefaults = {};
	Swiper$1 = class Swiper$1 {
		constructor(...args) {
			let el;
			let params;
			if (args.length === 1 && args[0].constructor && Object.prototype.toString.call(args[0]).slice(8, -1) === "Object") params = args[0];
			else [el, params] = args;
			if (!params) params = {};
			params = extend$1({}, params);
			if (el && !params.el) params.el = el;
			const document = getDocument();
			if (params.el && typeof params.el === "string" && document.querySelectorAll(params.el).length > 1) {
				const swipers = [];
				document.querySelectorAll(params.el).forEach((containerEl) => {
					const newParams = extend$1({}, params, { el: containerEl });
					swipers.push(new Swiper$1(newParams));
				});
				return swipers;
			}
			const swiper = this;
			swiper.__swiper__ = true;
			swiper.support = getSupport();
			swiper.device = getDevice({ userAgent: params.userAgent });
			swiper.browser = getBrowser();
			swiper.eventsListeners = {};
			swiper.eventsAnyListeners = [];
			swiper.modules = [...swiper.__modules__];
			if (params.modules && Array.isArray(params.modules)) params.modules.forEach((mod) => {
				if (typeof mod === "function" && swiper.modules.indexOf(mod) < 0) swiper.modules.push(mod);
			});
			const allModulesParams = {};
			swiper.modules.forEach((mod) => {
				mod({
					params,
					swiper,
					extendParams: moduleExtendParams(params, allModulesParams),
					on: swiper.on.bind(swiper),
					once: swiper.once.bind(swiper),
					off: swiper.off.bind(swiper),
					emit: swiper.emit.bind(swiper)
				});
			});
			swiper.params = extend$1({}, extend$1({}, defaults, allModulesParams), extendedDefaults, params);
			swiper.originalParams = extend$1({}, swiper.params);
			swiper.passedParams = extend$1({}, params);
			if (swiper.params && swiper.params.on) Object.keys(swiper.params.on).forEach((eventName) => {
				swiper.on(eventName, swiper.params.on[eventName]);
			});
			if (swiper.params && swiper.params.onAny) swiper.onAny(swiper.params.onAny);
			Object.assign(swiper, {
				enabled: swiper.params.enabled,
				el,
				classNames: [],
				slides: [],
				slidesGrid: [],
				snapGrid: [],
				slidesSizesGrid: [],
				isHorizontal() {
					return swiper.params.direction === "horizontal";
				},
				isVertical() {
					return swiper.params.direction === "vertical";
				},
				activeIndex: 0,
				realIndex: 0,
				isBeginning: true,
				isEnd: false,
				translate: 0,
				previousTranslate: 0,
				progress: 0,
				velocity: 0,
				animating: false,
				cssOverflowAdjustment() {
					return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
				},
				allowSlideNext: swiper.params.allowSlideNext,
				allowSlidePrev: swiper.params.allowSlidePrev,
				touchEventsData: {
					isTouched: void 0,
					isMoved: void 0,
					allowTouchCallbacks: void 0,
					touchStartTime: void 0,
					isScrolling: void 0,
					currentTranslate: void 0,
					startTranslate: void 0,
					allowThresholdMove: void 0,
					focusableElements: swiper.params.focusableElements,
					lastClickTime: 0,
					clickTimeout: void 0,
					velocities: [],
					allowMomentumBounce: void 0,
					startMoving: void 0,
					pointerId: null,
					touchId: null
				},
				allowClick: true,
				allowTouchMove: swiper.params.allowTouchMove,
				touches: {
					startX: 0,
					startY: 0,
					currentX: 0,
					currentY: 0,
					diff: 0
				},
				imagesToLoad: [],
				imagesLoaded: 0
			});
			swiper.emit("_swiper");
			if (swiper.params.init) swiper.init();
			return swiper;
		}
		getDirectionLabel(property) {
			if (this.isHorizontal()) return property;
			return {
				"width": "height",
				"margin-top": "margin-left",
				"margin-bottom ": "margin-right",
				"margin-left": "margin-top",
				"margin-right": "margin-bottom",
				"padding-left": "padding-top",
				"padding-right": "padding-bottom",
				"marginRight": "marginBottom"
			}[property];
		}
		getSlideIndex(slideEl) {
			const { slidesEl, params } = this;
			const firstSlideIndex = elementIndex(elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`)[0]);
			return elementIndex(slideEl) - firstSlideIndex;
		}
		getSlideIndexByData(index) {
			return this.getSlideIndex(this.slides.find((slideEl) => slideEl.getAttribute("data-swiper-slide-index") * 1 === index));
		}
		getSlideIndexWhenGrid(index) {
			if (this.grid && this.params.grid && this.params.grid.rows > 1) {
				if (this.params.grid.fill === "column") index = Math.floor(index / this.params.grid.rows);
				else if (this.params.grid.fill === "row") index = index % Math.ceil(this.slides.length / this.params.grid.rows);
			}
			return index;
		}
		recalcSlides() {
			const swiper = this;
			const { slidesEl, params } = swiper;
			swiper.slides = elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`);
		}
		enable() {
			const swiper = this;
			if (swiper.enabled) return;
			swiper.enabled = true;
			if (swiper.params.grabCursor) swiper.setGrabCursor();
			swiper.emit("enable");
		}
		disable() {
			const swiper = this;
			if (!swiper.enabled) return;
			swiper.enabled = false;
			if (swiper.params.grabCursor) swiper.unsetGrabCursor();
			swiper.emit("disable");
		}
		setProgress(progress, speed) {
			const swiper = this;
			progress = Math.min(Math.max(progress, 0), 1);
			const min = swiper.minTranslate();
			const current = (swiper.maxTranslate() - min) * progress + min;
			swiper.translateTo(current, typeof speed === "undefined" ? 0 : speed);
			swiper.updateActiveIndex();
			swiper.updateSlidesClasses();
		}
		emitContainerClasses() {
			const swiper = this;
			if (!swiper.params._emitClasses || !swiper.el) return;
			const cls = swiper.el.className.split(" ").filter((className) => {
				return className.indexOf("swiper") === 0 || className.indexOf(swiper.params.containerModifierClass) === 0;
			});
			swiper.emit("_containerClasses", cls.join(" "));
		}
		getSlideClasses(slideEl) {
			const swiper = this;
			if (swiper.destroyed) return "";
			return slideEl.className.split(" ").filter((className) => {
				return className.indexOf("swiper-slide") === 0 || className.indexOf(swiper.params.slideClass) === 0;
			}).join(" ");
		}
		emitSlidesClasses() {
			const swiper = this;
			if (!swiper.params._emitClasses || !swiper.el) return;
			const updates = [];
			swiper.slides.forEach((slideEl) => {
				const classNames = swiper.getSlideClasses(slideEl);
				updates.push({
					slideEl,
					classNames
				});
				swiper.emit("_slideClass", slideEl, classNames);
			});
			swiper.emit("_slideClasses", updates);
		}
		slidesPerViewDynamic(view = "current", exact = false) {
			const { params, slides, slidesGrid, slidesSizesGrid, size: swiperSize, activeIndex } = this;
			let spv = 1;
			if (typeof params.slidesPerView === "number") return params.slidesPerView;
			if (params.centeredSlides) {
				let slideSize = slides[activeIndex] ? Math.ceil(slides[activeIndex].swiperSlideSize) : 0;
				let breakLoop;
				for (let i = activeIndex + 1; i < slides.length; i += 1) if (slides[i] && !breakLoop) {
					slideSize += Math.ceil(slides[i].swiperSlideSize);
					spv += 1;
					if (slideSize > swiperSize) breakLoop = true;
				}
				for (let i = activeIndex - 1; i >= 0; i -= 1) if (slides[i] && !breakLoop) {
					slideSize += slides[i].swiperSlideSize;
					spv += 1;
					if (slideSize > swiperSize) breakLoop = true;
				}
			} else if (view === "current") {
				for (let i = activeIndex + 1; i < slides.length; i += 1) if (exact ? slidesGrid[i] + slidesSizesGrid[i] - slidesGrid[activeIndex] < swiperSize : slidesGrid[i] - slidesGrid[activeIndex] < swiperSize) spv += 1;
			} else for (let i = activeIndex - 1; i >= 0; i -= 1) if (slidesGrid[activeIndex] - slidesGrid[i] < swiperSize) spv += 1;
			return spv;
		}
		update() {
			const swiper = this;
			if (!swiper || swiper.destroyed) return;
			const { snapGrid, params } = swiper;
			if (params.breakpoints) swiper.setBreakpoint();
			[...swiper.el.querySelectorAll("[loading=\"lazy\"]")].forEach((imageEl) => {
				if (imageEl.complete) processLazyPreloader(swiper, imageEl);
			});
			swiper.updateSize();
			swiper.updateSlides();
			swiper.updateProgress();
			swiper.updateSlidesClasses();
			function setTranslate() {
				const translateValue = swiper.rtlTranslate ? swiper.translate * -1 : swiper.translate;
				const newTranslate = Math.min(Math.max(translateValue, swiper.maxTranslate()), swiper.minTranslate());
				swiper.setTranslate(newTranslate);
				swiper.updateActiveIndex();
				swiper.updateSlidesClasses();
			}
			let translated;
			if (params.freeMode && params.freeMode.enabled && !params.cssMode) {
				setTranslate();
				if (params.autoHeight) swiper.updateAutoHeight();
			} else {
				if ((params.slidesPerView === "auto" || params.slidesPerView > 1) && swiper.isEnd && !params.centeredSlides) {
					const slides = swiper.virtual && params.virtual.enabled ? swiper.virtual.slides : swiper.slides;
					translated = swiper.slideTo(slides.length - 1, 0, false, true);
				} else translated = swiper.slideTo(swiper.activeIndex, 0, false, true);
				if (!translated) setTranslate();
			}
			if (params.watchOverflow && snapGrid !== swiper.snapGrid) swiper.checkOverflow();
			swiper.emit("update");
		}
		changeDirection(newDirection, needUpdate = true) {
			const swiper = this;
			const currentDirection = swiper.params.direction;
			if (!newDirection) newDirection = currentDirection === "horizontal" ? "vertical" : "horizontal";
			if (newDirection === currentDirection || newDirection !== "horizontal" && newDirection !== "vertical") return swiper;
			swiper.el.classList.remove(`${swiper.params.containerModifierClass}${currentDirection}`);
			swiper.el.classList.add(`${swiper.params.containerModifierClass}${newDirection}`);
			swiper.emitContainerClasses();
			swiper.params.direction = newDirection;
			swiper.slides.forEach((slideEl) => {
				if (newDirection === "vertical") slideEl.style.width = "";
				else slideEl.style.height = "";
			});
			swiper.emit("changeDirection");
			if (needUpdate) swiper.update();
			return swiper;
		}
		changeLanguageDirection(direction) {
			const swiper = this;
			if (swiper.rtl && direction === "rtl" || !swiper.rtl && direction === "ltr") return;
			swiper.rtl = direction === "rtl";
			swiper.rtlTranslate = swiper.params.direction === "horizontal" && swiper.rtl;
			if (swiper.rtl) {
				swiper.el.classList.add(`${swiper.params.containerModifierClass}rtl`);
				swiper.el.dir = "rtl";
			} else {
				swiper.el.classList.remove(`${swiper.params.containerModifierClass}rtl`);
				swiper.el.dir = "ltr";
			}
			swiper.update();
		}
		mount(element) {
			const swiper = this;
			if (swiper.mounted) return true;
			let el = element || swiper.params.el;
			if (typeof el === "string") el = document.querySelector(el);
			if (!el) return false;
			el.swiper = swiper;
			if (el.parentNode && el.parentNode.host && el.parentNode.host.nodeName === swiper.params.swiperElementNodeName.toUpperCase()) swiper.isElement = true;
			const getWrapperSelector = () => {
				return `.${(swiper.params.wrapperClass || "").trim().split(" ").join(".")}`;
			};
			const getWrapper = () => {
				if (el && el.shadowRoot && el.shadowRoot.querySelector) return el.shadowRoot.querySelector(getWrapperSelector());
				return elementChildren(el, getWrapperSelector())[0];
			};
			let wrapperEl = getWrapper();
			if (!wrapperEl && swiper.params.createElements) {
				wrapperEl = createElement$1("div", swiper.params.wrapperClass);
				el.append(wrapperEl);
				elementChildren(el, `.${swiper.params.slideClass}`).forEach((slideEl) => {
					wrapperEl.append(slideEl);
				});
			}
			Object.assign(swiper, {
				el,
				wrapperEl,
				slidesEl: swiper.isElement && !el.parentNode.host.slideSlots ? el.parentNode.host : wrapperEl,
				hostEl: swiper.isElement ? el.parentNode.host : el,
				mounted: true,
				rtl: el.dir.toLowerCase() === "rtl" || elementStyle(el, "direction") === "rtl",
				rtlTranslate: swiper.params.direction === "horizontal" && (el.dir.toLowerCase() === "rtl" || elementStyle(el, "direction") === "rtl"),
				wrongRTL: elementStyle(wrapperEl, "display") === "-webkit-box"
			});
			return true;
		}
		init(el) {
			const swiper = this;
			if (swiper.initialized) return swiper;
			if (swiper.mount(el) === false) return swiper;
			swiper.emit("beforeInit");
			if (swiper.params.breakpoints) swiper.setBreakpoint();
			swiper.addClasses();
			swiper.updateSize();
			swiper.updateSlides();
			if (swiper.params.watchOverflow) swiper.checkOverflow();
			if (swiper.params.grabCursor && swiper.enabled) swiper.setGrabCursor();
			if (swiper.params.loop && swiper.virtual && swiper.params.virtual.enabled) swiper.slideTo(swiper.params.initialSlide + swiper.virtual.slidesBefore, 0, swiper.params.runCallbacksOnInit, false, true);
			else swiper.slideTo(swiper.params.initialSlide, 0, swiper.params.runCallbacksOnInit, false, true);
			if (swiper.params.loop) swiper.loopCreate(void 0, true);
			swiper.attachEvents();
			const lazyElements = [...swiper.el.querySelectorAll("[loading=\"lazy\"]")];
			if (swiper.isElement) lazyElements.push(...swiper.hostEl.querySelectorAll("[loading=\"lazy\"]"));
			lazyElements.forEach((imageEl) => {
				if (imageEl.complete) processLazyPreloader(swiper, imageEl);
				else imageEl.addEventListener("load", (e) => {
					processLazyPreloader(swiper, e.target);
				});
			});
			preload(swiper);
			swiper.initialized = true;
			preload(swiper);
			swiper.emit("init");
			swiper.emit("afterInit");
			return swiper;
		}
		destroy(deleteInstance = true, cleanStyles = true) {
			const swiper = this;
			const { params, el, wrapperEl, slides } = swiper;
			if (typeof swiper.params === "undefined" || swiper.destroyed) return null;
			swiper.emit("beforeDestroy");
			swiper.initialized = false;
			swiper.detachEvents();
			if (params.loop) swiper.loopDestroy();
			if (cleanStyles) {
				swiper.removeClasses();
				if (el && typeof el !== "string") el.removeAttribute("style");
				if (wrapperEl) wrapperEl.removeAttribute("style");
				if (slides && slides.length) slides.forEach((slideEl) => {
					slideEl.classList.remove(params.slideVisibleClass, params.slideFullyVisibleClass, params.slideActiveClass, params.slideNextClass, params.slidePrevClass);
					slideEl.removeAttribute("style");
					slideEl.removeAttribute("data-swiper-slide-index");
				});
			}
			swiper.emit("destroy");
			Object.keys(swiper.eventsListeners).forEach((eventName) => {
				swiper.off(eventName);
			});
			if (deleteInstance !== false) {
				if (swiper.el && typeof swiper.el !== "string") swiper.el.swiper = null;
				deleteProps(swiper);
			}
			swiper.destroyed = true;
			return null;
		}
		static extendDefaults(newDefaults) {
			extend$1(extendedDefaults, newDefaults);
		}
		static get extendedDefaults() {
			return extendedDefaults;
		}
		static get defaults() {
			return defaults;
		}
		static installModule(mod) {
			if (!Swiper$1.prototype.__modules__) Swiper$1.prototype.__modules__ = [];
			const modules = Swiper$1.prototype.__modules__;
			if (typeof mod === "function" && modules.indexOf(mod) < 0) modules.push(mod);
		}
		static use(module) {
			if (Array.isArray(module)) {
				module.forEach((m) => Swiper$1.installModule(m));
				return Swiper$1;
			}
			Swiper$1.installModule(module);
			return Swiper$1;
		}
	};
	Object.keys(prototypes).forEach((prototypeGroup) => {
		Object.keys(prototypes[prototypeGroup]).forEach((protoMethod) => {
			Swiper$1.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
		});
	});
	Swiper$1.use([Resize, Observer]);
}));
//#endregion
//#region node_modules/swiper/shared/update-swiper.mjs
function isObject$1(o) {
	return typeof o === "object" && o !== null && o.constructor && Object.prototype.toString.call(o).slice(8, -1) === "Object" && !o.__swiper__;
}
function extend(target, src) {
	const noExtend = [
		"__proto__",
		"constructor",
		"prototype"
	];
	Object.keys(src).filter((key) => noExtend.indexOf(key) < 0).forEach((key) => {
		if (typeof target[key] === "undefined") target[key] = src[key];
		else if (isObject$1(src[key]) && isObject$1(target[key]) && Object.keys(src[key]).length > 0) if (src[key].__swiper__) target[key] = src[key];
		else extend(target[key], src[key]);
		else target[key] = src[key];
	});
}
function needsNavigation(params = {}) {
	return params.navigation && typeof params.navigation.nextEl === "undefined" && typeof params.navigation.prevEl === "undefined";
}
function needsPagination(params = {}) {
	return params.pagination && typeof params.pagination.el === "undefined";
}
function needsScrollbar(params = {}) {
	return params.scrollbar && typeof params.scrollbar.el === "undefined";
}
function uniqueClasses(classNames = "") {
	const classes = classNames.split(" ").map((c) => c.trim()).filter((c) => !!c);
	const unique = [];
	classes.forEach((c) => {
		if (unique.indexOf(c) < 0) unique.push(c);
	});
	return unique.join(" ");
}
function wrapperClass(className = "") {
	if (!className) return "swiper-wrapper";
	if (!className.includes("swiper-wrapper")) return `swiper-wrapper ${className}`;
	return className;
}
function updateSwiper({ swiper, slides, passedParams, changedParams, nextEl, prevEl, scrollbarEl, paginationEl }) {
	const updateParams = changedParams.filter((key) => key !== "children" && key !== "direction" && key !== "wrapperClass");
	const { params: currentParams, pagination, navigation, scrollbar, virtual, thumbs } = swiper;
	let needThumbsInit;
	let needControllerInit;
	let needPaginationInit;
	let needScrollbarInit;
	let needNavigationInit;
	let loopNeedDestroy;
	let loopNeedEnable;
	let loopNeedReloop;
	if (changedParams.includes("thumbs") && passedParams.thumbs && passedParams.thumbs.swiper && !passedParams.thumbs.swiper.destroyed && currentParams.thumbs && (!currentParams.thumbs.swiper || currentParams.thumbs.swiper.destroyed)) needThumbsInit = true;
	if (changedParams.includes("controller") && passedParams.controller && passedParams.controller.control && currentParams.controller && !currentParams.controller.control) needControllerInit = true;
	if (changedParams.includes("pagination") && passedParams.pagination && (passedParams.pagination.el || paginationEl) && (currentParams.pagination || currentParams.pagination === false) && pagination && !pagination.el) needPaginationInit = true;
	if (changedParams.includes("scrollbar") && passedParams.scrollbar && (passedParams.scrollbar.el || scrollbarEl) && (currentParams.scrollbar || currentParams.scrollbar === false) && scrollbar && !scrollbar.el) needScrollbarInit = true;
	if (changedParams.includes("navigation") && passedParams.navigation && (passedParams.navigation.prevEl || prevEl) && (passedParams.navigation.nextEl || nextEl) && (currentParams.navigation || currentParams.navigation === false) && navigation && !navigation.prevEl && !navigation.nextEl) needNavigationInit = true;
	const destroyModule = (mod) => {
		if (!swiper[mod]) return;
		swiper[mod].destroy();
		if (mod === "navigation") {
			if (swiper.isElement) {
				swiper[mod].prevEl.remove();
				swiper[mod].nextEl.remove();
			}
			currentParams[mod].prevEl = void 0;
			currentParams[mod].nextEl = void 0;
			swiper[mod].prevEl = void 0;
			swiper[mod].nextEl = void 0;
		} else {
			if (swiper.isElement) swiper[mod].el.remove();
			currentParams[mod].el = void 0;
			swiper[mod].el = void 0;
		}
	};
	if (changedParams.includes("loop") && swiper.isElement) if (currentParams.loop && !passedParams.loop) loopNeedDestroy = true;
	else if (!currentParams.loop && passedParams.loop) loopNeedEnable = true;
	else loopNeedReloop = true;
	updateParams.forEach((key) => {
		if (isObject$1(currentParams[key]) && isObject$1(passedParams[key])) {
			Object.assign(currentParams[key], passedParams[key]);
			if ((key === "navigation" || key === "pagination" || key === "scrollbar") && "enabled" in passedParams[key] && !passedParams[key].enabled) destroyModule(key);
		} else {
			const newValue = passedParams[key];
			if ((newValue === true || newValue === false) && (key === "navigation" || key === "pagination" || key === "scrollbar")) {
				if (newValue === false) destroyModule(key);
			} else currentParams[key] = passedParams[key];
		}
	});
	if (updateParams.includes("controller") && !needControllerInit && swiper.controller && swiper.controller.control && currentParams.controller && currentParams.controller.control) swiper.controller.control = currentParams.controller.control;
	if (changedParams.includes("children") && slides && virtual && currentParams.virtual.enabled) {
		virtual.slides = slides;
		virtual.update(true);
	} else if (changedParams.includes("virtual") && virtual && currentParams.virtual.enabled) {
		if (slides) virtual.slides = slides;
		virtual.update(true);
	}
	if (changedParams.includes("children") && slides && currentParams.loop) loopNeedReloop = true;
	if (needThumbsInit) {
		if (thumbs.init()) thumbs.update(true);
	}
	if (needControllerInit) swiper.controller.control = currentParams.controller.control;
	if (needPaginationInit) {
		if (swiper.isElement && (!paginationEl || typeof paginationEl === "string")) {
			paginationEl = document.createElement("div");
			paginationEl.classList.add("swiper-pagination");
			paginationEl.part.add("pagination");
			swiper.el.appendChild(paginationEl);
		}
		if (paginationEl) currentParams.pagination.el = paginationEl;
		pagination.init();
		pagination.render();
		pagination.update();
	}
	if (needScrollbarInit) {
		if (swiper.isElement && (!scrollbarEl || typeof scrollbarEl === "string")) {
			scrollbarEl = document.createElement("div");
			scrollbarEl.classList.add("swiper-scrollbar");
			scrollbarEl.part.add("scrollbar");
			swiper.el.appendChild(scrollbarEl);
		}
		if (scrollbarEl) currentParams.scrollbar.el = scrollbarEl;
		scrollbar.init();
		scrollbar.updateSize();
		scrollbar.setTranslate();
	}
	if (needNavigationInit) {
		if (swiper.isElement) {
			if (!nextEl || typeof nextEl === "string") {
				nextEl = document.createElement("div");
				nextEl.classList.add("swiper-button-next");
				setInnerHTML(nextEl, swiper.navigation.arrowSvg);
				nextEl.part.add("button-next");
				swiper.el.appendChild(nextEl);
			}
			if (!prevEl || typeof prevEl === "string") {
				prevEl = document.createElement("div");
				prevEl.classList.add("swiper-button-prev");
				setInnerHTML(prevEl, swiper.navigation.arrowSvg);
				prevEl.part.add("button-prev");
				swiper.el.appendChild(prevEl);
			}
		}
		if (nextEl) currentParams.navigation.nextEl = nextEl;
		if (prevEl) currentParams.navigation.prevEl = prevEl;
		navigation.init();
		navigation.update();
	}
	if (changedParams.includes("allowSlideNext")) swiper.allowSlideNext = passedParams.allowSlideNext;
	if (changedParams.includes("allowSlidePrev")) swiper.allowSlidePrev = passedParams.allowSlidePrev;
	if (changedParams.includes("direction")) swiper.changeDirection(passedParams.direction, false);
	if (loopNeedDestroy || loopNeedReloop) swiper.loopDestroy();
	if (loopNeedEnable || loopNeedReloop) swiper.loopCreate();
	swiper.update();
}
var paramsList;
var init_update_swiper = __esmMin((() => {
	init_utils();
	paramsList = [
		"eventsPrefix",
		"injectStyles",
		"injectStylesUrls",
		"modules",
		"init",
		"_direction",
		"oneWayMovement",
		"swiperElementNodeName",
		"touchEventsTarget",
		"initialSlide",
		"_speed",
		"cssMode",
		"updateOnWindowResize",
		"resizeObserver",
		"nested",
		"focusableElements",
		"_enabled",
		"_width",
		"_height",
		"preventInteractionOnTransition",
		"userAgent",
		"url",
		"_edgeSwipeDetection",
		"_edgeSwipeThreshold",
		"_freeMode",
		"_autoHeight",
		"setWrapperSize",
		"virtualTranslate",
		"_effect",
		"breakpoints",
		"breakpointsBase",
		"_spaceBetween",
		"_slidesPerView",
		"maxBackfaceHiddenSlides",
		"_grid",
		"_slidesPerGroup",
		"_slidesPerGroupSkip",
		"_slidesPerGroupAuto",
		"_centeredSlides",
		"_centeredSlidesBounds",
		"_slidesOffsetBefore",
		"_slidesOffsetAfter",
		"normalizeSlideIndex",
		"_centerInsufficientSlides",
		"_snapToSlideEdge",
		"_watchOverflow",
		"roundLengths",
		"touchRatio",
		"touchAngle",
		"simulateTouch",
		"_shortSwipes",
		"_longSwipes",
		"longSwipesRatio",
		"longSwipesMs",
		"_followFinger",
		"allowTouchMove",
		"_threshold",
		"touchMoveStopPropagation",
		"touchStartPreventDefault",
		"touchStartForcePreventDefault",
		"touchReleaseOnEdges",
		"uniqueNavElements",
		"_resistance",
		"_resistanceRatio",
		"_watchSlidesProgress",
		"_grabCursor",
		"preventClicks",
		"preventClicksPropagation",
		"_slideToClickedSlide",
		"_loop",
		"loopAdditionalSlides",
		"loopAddBlankSlides",
		"loopPreventsSliding",
		"_rewind",
		"_allowSlidePrev",
		"_allowSlideNext",
		"_swipeHandler",
		"_noSwiping",
		"noSwipingClass",
		"noSwipingSelector",
		"passiveListeners",
		"containerModifierClass",
		"slideClass",
		"slideActiveClass",
		"slideVisibleClass",
		"slideFullyVisibleClass",
		"slideNextClass",
		"slidePrevClass",
		"slideBlankClass",
		"wrapperClass",
		"lazyPreloaderClass",
		"lazyPreloadPrevNext",
		"runCallbacksOnInit",
		"observer",
		"observeParents",
		"observeSlideChildren",
		"a11y",
		"_autoplay",
		"_controller",
		"coverflowEffect",
		"cubeEffect",
		"fadeEffect",
		"flipEffect",
		"creativeEffect",
		"cardsEffect",
		"hashNavigation",
		"history",
		"keyboard",
		"mousewheel",
		"_navigation",
		"_pagination",
		"parallax",
		"_scrollbar",
		"_thumbs",
		"virtual",
		"zoom",
		"control"
	];
}));
//#endregion
//#region node_modules/swiper/shared/update-on-virtual-data.mjs
function getParams(obj = {}, splitEvents = true) {
	const params = { on: {} };
	const events = {};
	const passedParams = {};
	extend(params, defaults);
	params._emitClasses = true;
	params.init = false;
	const rest = {};
	const allowedParams = paramsList.map((key) => key.replace(/_/, ""));
	const plainObj = Object.assign({}, obj);
	Object.keys(plainObj).forEach((key) => {
		if (typeof obj[key] === "undefined") return;
		if (allowedParams.indexOf(key) >= 0) if (isObject$1(obj[key])) {
			params[key] = {};
			passedParams[key] = {};
			extend(params[key], obj[key]);
			extend(passedParams[key], obj[key]);
		} else {
			params[key] = obj[key];
			passedParams[key] = obj[key];
		}
		else if (key.search(/on[A-Z]/) === 0 && typeof obj[key] === "function") if (splitEvents) events[`${key[2].toLowerCase()}${key.substr(3)}`] = obj[key];
		else params.on[`${key[2].toLowerCase()}${key.substr(3)}`] = obj[key];
		else rest[key] = obj[key];
	});
	[
		"navigation",
		"pagination",
		"scrollbar"
	].forEach((key) => {
		if (params[key] === true) params[key] = {};
		if (params[key] === false) delete params[key];
	});
	return {
		params,
		passedParams,
		rest,
		events
	};
}
function mountSwiper({ el, nextEl, prevEl, paginationEl, scrollbarEl, swiper }, swiperParams) {
	if (needsNavigation(swiperParams) && nextEl && prevEl) {
		swiper.params.navigation.nextEl = nextEl;
		swiper.originalParams.navigation.nextEl = nextEl;
		swiper.params.navigation.prevEl = prevEl;
		swiper.originalParams.navigation.prevEl = prevEl;
	}
	if (needsPagination(swiperParams) && paginationEl) {
		swiper.params.pagination.el = paginationEl;
		swiper.originalParams.pagination.el = paginationEl;
	}
	if (needsScrollbar(swiperParams) && scrollbarEl) {
		swiper.params.scrollbar.el = scrollbarEl;
		swiper.originalParams.scrollbar.el = scrollbarEl;
	}
	swiper.init(el);
}
function getChangedParams(swiperParams, oldParams, children, oldChildren, getKey) {
	const keys = [];
	if (!oldParams) return keys;
	const addKey = (key) => {
		if (keys.indexOf(key) < 0) keys.push(key);
	};
	if (children && oldChildren) {
		const oldChildrenKeys = oldChildren.map(getKey);
		const childrenKeys = children.map(getKey);
		if (oldChildrenKeys.join("") !== childrenKeys.join("")) addKey("children");
		if (oldChildren.length !== children.length) addKey("children");
	}
	paramsList.filter((key) => key[0] === "_").map((key) => key.replace(/_/, "")).forEach((key) => {
		if (key in swiperParams && key in oldParams) {
			if (isObject$1(swiperParams[key]) && isObject$1(oldParams[key])) {
				const newKeys = Object.keys(swiperParams[key]);
				const oldKeys = Object.keys(oldParams[key]);
				if (newKeys.length !== oldKeys.length) addKey(key);
				else {
					newKeys.forEach((newKey) => {
						if (swiperParams[key][newKey] !== oldParams[key][newKey]) addKey(key);
					});
					oldKeys.forEach((oldKey) => {
						if (swiperParams[key][oldKey] !== oldParams[key][oldKey]) addKey(key);
					});
				}
			} else if (swiperParams[key] !== oldParams[key]) addKey(key);
		}
	});
	return keys;
}
var updateOnVirtualData;
var init_update_on_virtual_data = __esmMin((() => {
	init_update_swiper();
	init_swiper_core();
	updateOnVirtualData = (swiper) => {
		if (!swiper || swiper.destroyed || !swiper.params.virtual || swiper.params.virtual && !swiper.params.virtual.enabled) return;
		swiper.updateSlides();
		swiper.updateProgress();
		swiper.updateSlidesClasses();
		swiper.emit("_virtualUpdated");
		if (swiper.parallax && swiper.params.parallax && swiper.params.parallax.enabled) swiper.parallax.setTranslate();
	};
}));
//#endregion
//#region node_modules/swiper/swiper-react.mjs
/**
* Swiper React 12.1.2
* Most modern mobile touch slider and framework with hardware accelerated transitions
* https://swiperjs.com
*
* Copyright 2014-2026 Vladimir Kharlampidi
*
* Released under the MIT License
*
* Released on: February 18, 2026
*/
function _extends() {
	_extends = Object.assign ? Object.assign.bind() : function(target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];
			for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
		}
		return target;
	};
	return _extends.apply(this, arguments);
}
function isChildSwiperSlide(child) {
	return child.type && child.type.displayName && child.type.displayName.includes("SwiperSlide");
}
function processChildren(c) {
	const slides = [];
	React.Children.toArray(c).forEach((child) => {
		if (isChildSwiperSlide(child)) slides.push(child);
		else if (child.props && child.props.children) processChildren(child.props.children).forEach((slide) => slides.push(slide));
	});
	return slides;
}
function getChildren(c) {
	const slides = [];
	const slots = {
		"container-start": [],
		"container-end": [],
		"wrapper-start": [],
		"wrapper-end": []
	};
	React.Children.toArray(c).forEach((child) => {
		if (isChildSwiperSlide(child)) slides.push(child);
		else if (child.props && child.props.slot && slots[child.props.slot]) slots[child.props.slot].push(child);
		else if (child.props && child.props.children) {
			const foundSlides = processChildren(child.props.children);
			if (foundSlides.length > 0) foundSlides.forEach((slide) => slides.push(slide));
			else slots["container-end"].push(child);
		} else slots["container-end"].push(child);
	});
	return {
		slides,
		slots
	};
}
function renderVirtual(swiper, slides, virtualData) {
	if (!virtualData) return null;
	const getSlideIndex = (index) => {
		let slideIndex = index;
		if (index < 0) slideIndex = slides.length + index;
		else if (slideIndex >= slides.length) slideIndex = slideIndex - slides.length;
		return slideIndex;
	};
	const style = swiper.isHorizontal() ? { [swiper.rtlTranslate ? "right" : "left"]: `${virtualData.offset}px` } : { top: `${virtualData.offset}px` };
	const { from, to } = virtualData;
	const loopFrom = swiper.params.loop ? -slides.length : 0;
	const loopTo = swiper.params.loop ? slides.length * 2 : slides.length;
	const slidesToRender = [];
	for (let i = loopFrom; i < loopTo; i += 1) if (i >= from && i <= to) slidesToRender.push(slides[getSlideIndex(i)]);
	return slidesToRender.map((child, index) => {
		return /*#__PURE__*/ React.cloneElement(child, {
			swiper,
			style,
			key: child.props.virtualIndex || child.key || `slide-${index}`
		});
	});
}
function useIsomorphicLayoutEffect(callback, deps) {
	if (typeof window === "undefined") return useEffect(callback, deps);
	return useLayoutEffect(callback, deps);
}
var SwiperSlideContext, SwiperContext, Swiper, SwiperSlide;
var init_swiper_react = __esmMin((() => {
	init_swiper_core();
	init_update_on_virtual_data();
	init_update_swiper();
	SwiperSlideContext = /*#__PURE__*/ createContext(null);
	SwiperContext = /*#__PURE__*/ createContext(null);
	Swiper = /*#__PURE__*/ forwardRef(({ className, tag: Tag = "div", wrapperTag: WrapperTag = "div", children, onSwiper, ...rest } = {}, externalElRef) => {
		let eventsAssigned = false;
		const [containerClasses, setContainerClasses] = useState("swiper");
		const [virtualData, setVirtualData] = useState(null);
		const [breakpointChanged, setBreakpointChanged] = useState(false);
		const initializedRef = useRef(false);
		const swiperElRef = useRef(null);
		const swiperRef = useRef(null);
		const oldPassedParamsRef = useRef(null);
		const oldSlides = useRef(null);
		const nextElRef = useRef(null);
		const prevElRef = useRef(null);
		const paginationElRef = useRef(null);
		const scrollbarElRef = useRef(null);
		const { params: swiperParams, passedParams, rest: restProps, events } = getParams(rest);
		const { slides, slots } = getChildren(children);
		const onBeforeBreakpoint = () => {
			setBreakpointChanged(!breakpointChanged);
		};
		Object.assign(swiperParams.on, { _containerClasses(swiper, classes) {
			setContainerClasses(classes);
		} });
		const initSwiper = () => {
			Object.assign(swiperParams.on, events);
			eventsAssigned = true;
			const passParams = { ...swiperParams };
			delete passParams.wrapperClass;
			swiperRef.current = new Swiper$1(passParams);
			if (swiperRef.current.virtual && swiperRef.current.params.virtual.enabled) {
				swiperRef.current.virtual.slides = slides;
				const extendWith = {
					cache: false,
					slides,
					renderExternal: setVirtualData,
					renderExternalUpdate: false
				};
				extend(swiperRef.current.params.virtual, extendWith);
				extend(swiperRef.current.originalParams.virtual, extendWith);
			}
		};
		if (!swiperElRef.current) initSwiper();
		if (swiperRef.current) swiperRef.current.on("_beforeBreakpoint", onBeforeBreakpoint);
		const attachEvents = () => {
			if (eventsAssigned || !events || !swiperRef.current) return;
			Object.keys(events).forEach((eventName) => {
				swiperRef.current.on(eventName, events[eventName]);
			});
		};
		const detachEvents = () => {
			if (!events || !swiperRef.current) return;
			Object.keys(events).forEach((eventName) => {
				swiperRef.current.off(eventName, events[eventName]);
			});
		};
		useEffect(() => {
			return () => {
				if (swiperRef.current) swiperRef.current.off("_beforeBreakpoint", onBeforeBreakpoint);
			};
		});
		useEffect(() => {
			if (!initializedRef.current && swiperRef.current) {
				swiperRef.current.emitSlidesClasses();
				initializedRef.current = true;
			}
		});
		useIsomorphicLayoutEffect(() => {
			if (externalElRef) externalElRef.current = swiperElRef.current;
			if (!swiperElRef.current) return;
			if (swiperRef.current.destroyed) initSwiper();
			mountSwiper({
				el: swiperElRef.current,
				nextEl: nextElRef.current,
				prevEl: prevElRef.current,
				paginationEl: paginationElRef.current,
				scrollbarEl: scrollbarElRef.current,
				swiper: swiperRef.current
			}, swiperParams);
			if (onSwiper && !swiperRef.current.destroyed) onSwiper(swiperRef.current);
			return () => {
				if (swiperRef.current && !swiperRef.current.destroyed) swiperRef.current.destroy(true, false);
			};
		}, []);
		useIsomorphicLayoutEffect(() => {
			attachEvents();
			const changedParams = getChangedParams(passedParams, oldPassedParamsRef.current, slides, oldSlides.current, (c) => c.key);
			oldPassedParamsRef.current = passedParams;
			oldSlides.current = slides;
			if (changedParams.length && swiperRef.current && !swiperRef.current.destroyed) updateSwiper({
				swiper: swiperRef.current,
				slides,
				passedParams,
				changedParams,
				nextEl: nextElRef.current,
				prevEl: prevElRef.current,
				scrollbarEl: scrollbarElRef.current,
				paginationEl: paginationElRef.current
			});
			return () => {
				detachEvents();
			};
		});
		useIsomorphicLayoutEffect(() => {
			updateOnVirtualData(swiperRef.current);
		}, [virtualData]);
		function renderSlides() {
			if (swiperParams.virtual) return renderVirtual(swiperRef.current, slides, virtualData);
			return slides.map((child, index) => {
				return /*#__PURE__*/ React.cloneElement(child, {
					swiper: swiperRef.current,
					swiperSlideIndex: index
				});
			});
		}
		return /*#__PURE__*/ React.createElement(Tag, _extends({
			ref: swiperElRef,
			className: uniqueClasses(`${containerClasses}${className ? ` ${className}` : ""}`)
		}, restProps), /*#__PURE__*/ React.createElement(SwiperContext.Provider, { value: swiperRef.current }, slots["container-start"], /*#__PURE__*/ React.createElement(WrapperTag, { className: wrapperClass(swiperParams.wrapperClass) }, slots["wrapper-start"], renderSlides(), slots["wrapper-end"]), needsNavigation(swiperParams) && /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement("div", {
			ref: prevElRef,
			className: "swiper-button-prev"
		}), /*#__PURE__*/ React.createElement("div", {
			ref: nextElRef,
			className: "swiper-button-next"
		})), needsScrollbar(swiperParams) && /*#__PURE__*/ React.createElement("div", {
			ref: scrollbarElRef,
			className: "swiper-scrollbar"
		}), needsPagination(swiperParams) && /*#__PURE__*/ React.createElement("div", {
			ref: paginationElRef,
			className: "swiper-pagination"
		}), slots["container-end"]));
	});
	Swiper.displayName = "Swiper";
	SwiperSlide = /*#__PURE__*/ forwardRef(({ tag: Tag = "div", children, className = "", swiper, zoom, lazy, virtualIndex, swiperSlideIndex, ...rest } = {}, externalRef) => {
		const slideElRef = useRef(null);
		const [slideClasses, setSlideClasses] = useState("swiper-slide");
		const [lazyLoaded, setLazyLoaded] = useState(false);
		function updateClasses(_s, el, classNames) {
			if (el === slideElRef.current) setSlideClasses(classNames);
		}
		useIsomorphicLayoutEffect(() => {
			if (typeof swiperSlideIndex !== "undefined") slideElRef.current.swiperSlideIndex = swiperSlideIndex;
			if (externalRef) externalRef.current = slideElRef.current;
			if (!slideElRef.current || !swiper) return;
			if (swiper.destroyed) {
				if (slideClasses !== "swiper-slide") setSlideClasses("swiper-slide");
				return;
			}
			swiper.on("_slideClass", updateClasses);
			return () => {
				if (!swiper) return;
				swiper.off("_slideClass", updateClasses);
			};
		});
		useIsomorphicLayoutEffect(() => {
			if (swiper && slideElRef.current && !swiper.destroyed) setSlideClasses(swiper.getSlideClasses(slideElRef.current));
		}, [swiper]);
		const slideData = {
			isActive: slideClasses.indexOf("swiper-slide-active") >= 0,
			isVisible: slideClasses.indexOf("swiper-slide-visible") >= 0,
			isPrev: slideClasses.indexOf("swiper-slide-prev") >= 0,
			isNext: slideClasses.indexOf("swiper-slide-next") >= 0
		};
		const renderChildren = () => {
			return typeof children === "function" ? children(slideData) : children;
		};
		const onLoad = () => {
			setLazyLoaded(true);
		};
		return /*#__PURE__*/ React.createElement(Tag, _extends({
			ref: slideElRef,
			className: uniqueClasses(`${slideClasses}${className ? ` ${className}` : ""}`),
			"data-swiper-slide-index": virtualIndex,
			onLoad
		}, rest), zoom && /*#__PURE__*/ React.createElement(SwiperSlideContext.Provider, { value: slideData }, /*#__PURE__*/ React.createElement("div", {
			className: "swiper-zoom-container",
			"data-swiper-zoom": typeof zoom === "number" ? zoom : void 0
		}, renderChildren(), lazy && !lazyLoaded && /*#__PURE__*/ React.createElement("div", {
			className: "swiper-lazy-preloader",
			ref: (node) => {
				if (node) node.lazyPreloaderManaged = true;
			}
		}))), !zoom && /*#__PURE__*/ React.createElement(SwiperSlideContext.Provider, { value: slideData }, renderChildren(), lazy && !lazyLoaded && /*#__PURE__*/ React.createElement("div", {
			className: "swiper-lazy-preloader",
			ref: (node) => {
				if (node) node.lazyPreloaderManaged = true;
			}
		})));
	});
	SwiperSlide.displayName = "SwiperSlide";
}));
//#endregion
//#region node_modules/swiper/modules/keyboard.mjs
function Keyboard({ swiper, extendParams, on, emit }) {
	const document = getDocument();
	const window = getWindow();
	swiper.keyboard = { enabled: false };
	extendParams({ keyboard: {
		enabled: false,
		onlyInViewport: true,
		pageUpDown: true,
		speed: void 0
	} });
	function handle(event) {
		if (!swiper.enabled) return;
		const { rtlTranslate: rtl } = swiper;
		let e = event;
		if (e.originalEvent) e = e.originalEvent;
		const kc = e.keyCode || e.charCode;
		const pageUpDown = swiper.params.keyboard.pageUpDown;
		const isPageUp = pageUpDown && kc === 33;
		const isPageDown = pageUpDown && kc === 34;
		const isArrowLeft = kc === 37;
		const isArrowRight = kc === 39;
		const isArrowUp = kc === 38;
		const isArrowDown = kc === 40;
		if (!swiper.allowSlideNext && (swiper.isHorizontal() && isArrowRight || swiper.isVertical() && isArrowDown || isPageDown)) return false;
		if (!swiper.allowSlidePrev && (swiper.isHorizontal() && isArrowLeft || swiper.isVertical() && isArrowUp || isPageUp)) return false;
		if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) return;
		if (document.activeElement && (document.activeElement.isContentEditable || document.activeElement.nodeName && (document.activeElement.nodeName.toLowerCase() === "input" || document.activeElement.nodeName.toLowerCase() === "textarea"))) return;
		if (swiper.params.keyboard.onlyInViewport && (isPageUp || isPageDown || isArrowLeft || isArrowRight || isArrowUp || isArrowDown)) {
			let inView = false;
			if (elementParents(swiper.el, `.${swiper.params.slideClass}, swiper-slide`).length > 0 && elementParents(swiper.el, `.${swiper.params.slideActiveClass}`).length === 0) return;
			const el = swiper.el;
			const swiperWidth = el.clientWidth;
			const swiperHeight = el.clientHeight;
			const windowWidth = window.innerWidth;
			const windowHeight = window.innerHeight;
			const swiperOffset = elementOffset(el);
			if (rtl) swiperOffset.left -= el.scrollLeft;
			const swiperCoord = [
				[swiperOffset.left, swiperOffset.top],
				[swiperOffset.left + swiperWidth, swiperOffset.top],
				[swiperOffset.left, swiperOffset.top + swiperHeight],
				[swiperOffset.left + swiperWidth, swiperOffset.top + swiperHeight]
			];
			for (let i = 0; i < swiperCoord.length; i += 1) {
				const point = swiperCoord[i];
				if (point[0] >= 0 && point[0] <= windowWidth && point[1] >= 0 && point[1] <= windowHeight) {
					if (point[0] === 0 && point[1] === 0) continue;
					inView = true;
				}
			}
			if (!inView) return void 0;
		}
		const speed = swiper.params.keyboard.speed;
		if (swiper.isHorizontal()) {
			if (isPageUp || isPageDown || isArrowLeft || isArrowRight) if (e.preventDefault) e.preventDefault();
			else e.returnValue = false;
			if ((isPageDown || isArrowRight) && !rtl || (isPageUp || isArrowLeft) && rtl) swiper.slideNext(speed);
			if ((isPageUp || isArrowLeft) && !rtl || (isPageDown || isArrowRight) && rtl) swiper.slidePrev(speed);
		} else {
			if (isPageUp || isPageDown || isArrowUp || isArrowDown) if (e.preventDefault) e.preventDefault();
			else e.returnValue = false;
			if (isPageDown || isArrowDown) swiper.slideNext(speed);
			if (isPageUp || isArrowUp) swiper.slidePrev(speed);
		}
		emit("keyPress", kc);
	}
	function enable() {
		if (swiper.keyboard.enabled) return;
		document.addEventListener("keydown", handle);
		swiper.keyboard.enabled = true;
	}
	function disable() {
		if (!swiper.keyboard.enabled) return;
		document.removeEventListener("keydown", handle);
		swiper.keyboard.enabled = false;
	}
	on("init", () => {
		if (swiper.params.keyboard.enabled) enable();
	});
	on("destroy", () => {
		if (swiper.keyboard.enabled) disable();
	});
	Object.assign(swiper.keyboard, {
		enable,
		disable
	});
}
var init_keyboard = __esmMin((() => {
	init_ssr_window_esm();
	init_utils();
}));
//#endregion
//#region node_modules/swiper/shared/create-element-if-not-defined.mjs
function createElementIfNotDefined(swiper, originalParams, params, checkProps) {
	if (swiper.params.createElements) Object.keys(checkProps).forEach((key) => {
		if (!params[key] && params.auto === true) {
			let element = elementChildren(swiper.el, `.${checkProps[key]}`)[0];
			if (!element) {
				element = createElement$1("div", checkProps[key]);
				element.className = checkProps[key];
				swiper.el.append(element);
			}
			params[key] = element;
			originalParams[key] = element;
		}
	});
	return params;
}
var init_create_element_if_not_defined = __esmMin((() => {
	init_utils();
}));
//#endregion
//#region node_modules/swiper/modules/navigation.mjs
function Navigation({ swiper, extendParams, on, emit }) {
	extendParams({ navigation: {
		nextEl: null,
		prevEl: null,
		addIcons: true,
		hideOnClick: false,
		disabledClass: "swiper-button-disabled",
		hiddenClass: "swiper-button-hidden",
		lockClass: "swiper-button-lock",
		navigationDisabledClass: "swiper-navigation-disabled"
	} });
	swiper.navigation = {
		nextEl: null,
		prevEl: null,
		arrowSvg
	};
	function getEl(el) {
		let res;
		if (el && typeof el === "string" && swiper.isElement) {
			res = swiper.el.querySelector(el) || swiper.hostEl.querySelector(el);
			if (res) return res;
		}
		if (el) {
			if (typeof el === "string") res = [...document.querySelectorAll(el)];
			if (swiper.params.uniqueNavElements && typeof el === "string" && res && res.length > 1 && swiper.el.querySelectorAll(el).length === 1) res = swiper.el.querySelector(el);
			else if (res && res.length === 1) res = res[0];
		}
		if (el && !res) return el;
		return res;
	}
	function toggleEl(el, disabled) {
		const params = swiper.params.navigation;
		el = makeElementsArray(el);
		el.forEach((subEl) => {
			if (subEl) {
				subEl.classList[disabled ? "add" : "remove"](...params.disabledClass.split(" "));
				if (subEl.tagName === "BUTTON") subEl.disabled = disabled;
				if (swiper.params.watchOverflow && swiper.enabled) subEl.classList[swiper.isLocked ? "add" : "remove"](params.lockClass);
			}
		});
	}
	function update() {
		const { nextEl, prevEl } = swiper.navigation;
		if (swiper.params.loop) {
			toggleEl(prevEl, false);
			toggleEl(nextEl, false);
			return;
		}
		toggleEl(prevEl, swiper.isBeginning && !swiper.params.rewind);
		toggleEl(nextEl, swiper.isEnd && !swiper.params.rewind);
	}
	function onPrevClick(e) {
		e.preventDefault();
		if (swiper.isBeginning && !swiper.params.loop && !swiper.params.rewind) return;
		swiper.slidePrev();
		emit("navigationPrev");
	}
	function onNextClick(e) {
		e.preventDefault();
		if (swiper.isEnd && !swiper.params.loop && !swiper.params.rewind) return;
		swiper.slideNext();
		emit("navigationNext");
	}
	function init() {
		const params = swiper.params.navigation;
		swiper.params.navigation = createElementIfNotDefined(swiper, swiper.originalParams.navigation, swiper.params.navigation, {
			nextEl: "swiper-button-next",
			prevEl: "swiper-button-prev"
		});
		if (!(params.nextEl || params.prevEl)) return;
		let nextEl = getEl(params.nextEl);
		let prevEl = getEl(params.prevEl);
		Object.assign(swiper.navigation, {
			nextEl,
			prevEl
		});
		nextEl = makeElementsArray(nextEl);
		prevEl = makeElementsArray(prevEl);
		const initButton = (el, dir) => {
			if (el) {
				if (params.addIcons && el.matches(".swiper-button-next,.swiper-button-prev") && !el.querySelector("svg")) {
					const tempEl = document.createElement("div");
					setInnerHTML(tempEl, arrowSvg);
					el.appendChild(tempEl.querySelector("svg"));
					tempEl.remove();
				}
				el.addEventListener("click", dir === "next" ? onNextClick : onPrevClick);
			}
			if (!swiper.enabled && el) el.classList.add(...params.lockClass.split(" "));
		};
		nextEl.forEach((el) => initButton(el, "next"));
		prevEl.forEach((el) => initButton(el, "prev"));
	}
	function destroy() {
		let { nextEl, prevEl } = swiper.navigation;
		nextEl = makeElementsArray(nextEl);
		prevEl = makeElementsArray(prevEl);
		const destroyButton = (el, dir) => {
			el.removeEventListener("click", dir === "next" ? onNextClick : onPrevClick);
			el.classList.remove(...swiper.params.navigation.disabledClass.split(" "));
		};
		nextEl.forEach((el) => destroyButton(el, "next"));
		prevEl.forEach((el) => destroyButton(el, "prev"));
	}
	on("init", () => {
		if (swiper.params.navigation.enabled === false) disable();
		else {
			init();
			update();
		}
	});
	on("toEdge fromEdge lock unlock", () => {
		update();
	});
	on("destroy", () => {
		destroy();
	});
	on("enable disable", () => {
		let { nextEl, prevEl } = swiper.navigation;
		nextEl = makeElementsArray(nextEl);
		prevEl = makeElementsArray(prevEl);
		if (swiper.enabled) {
			update();
			return;
		}
		[...nextEl, ...prevEl].filter((el) => !!el).forEach((el) => el.classList.add(swiper.params.navigation.lockClass));
	});
	on("click", (_s, e) => {
		let { nextEl, prevEl } = swiper.navigation;
		nextEl = makeElementsArray(nextEl);
		prevEl = makeElementsArray(prevEl);
		const targetEl = e.target;
		let targetIsButton = prevEl.includes(targetEl) || nextEl.includes(targetEl);
		if (swiper.isElement && !targetIsButton) {
			const path = e.path || e.composedPath && e.composedPath();
			if (path) targetIsButton = path.find((pathEl) => nextEl.includes(pathEl) || prevEl.includes(pathEl));
		}
		if (swiper.params.navigation.hideOnClick && !targetIsButton) {
			if (swiper.pagination && swiper.params.pagination && swiper.params.pagination.clickable && (swiper.pagination.el === targetEl || swiper.pagination.el.contains(targetEl))) return;
			let isHidden;
			if (nextEl.length) isHidden = nextEl[0].classList.contains(swiper.params.navigation.hiddenClass);
			else if (prevEl.length) isHidden = prevEl[0].classList.contains(swiper.params.navigation.hiddenClass);
			if (isHidden === true) emit("navigationShow");
			else emit("navigationHide");
			[...nextEl, ...prevEl].filter((el) => !!el).forEach((el) => el.classList.toggle(swiper.params.navigation.hiddenClass));
		}
	});
	const enable = () => {
		swiper.el.classList.remove(...swiper.params.navigation.navigationDisabledClass.split(" "));
		init();
		update();
	};
	const disable = () => {
		swiper.el.classList.add(...swiper.params.navigation.navigationDisabledClass.split(" "));
		destroy();
	};
	Object.assign(swiper.navigation, {
		enable,
		disable,
		update,
		init,
		destroy
	});
}
var arrowSvg;
var init_navigation = __esmMin((() => {
	init_create_element_if_not_defined();
	init_utils();
	arrowSvg = `<svg class="swiper-navigation-icon" width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.38296 20.0762C0.111788 19.805 0.111788 19.3654 0.38296 19.0942L9.19758 10.2796L0.38296 1.46497C0.111788 1.19379 0.111788 0.754138 0.38296 0.482966C0.654131 0.211794 1.09379 0.211794 1.36496 0.482966L10.4341 9.55214C10.8359 9.9539 10.8359 10.6053 10.4341 11.007L1.36496 20.0762C1.09379 20.3474 0.654131 20.3474 0.38296 20.0762Z" fill="currentColor"/></svg>`;
}));
//#endregion
//#region node_modules/swiper/shared/classes-to-selector.mjs
function classesToSelector(classes = "") {
	return `.${classes.trim().replace(/([\.:!+\/()[\]#>~*^$|=,'"@{}\\])/g, "\\$1").replace(/ /g, ".")}`;
}
var init_classes_to_selector = __esmMin((() => {}));
//#endregion
//#region node_modules/swiper/modules/pagination.mjs
function Pagination({ swiper, extendParams, on, emit }) {
	const pfx = "swiper-pagination";
	extendParams({ pagination: {
		el: null,
		bulletElement: "span",
		clickable: false,
		hideOnClick: false,
		renderBullet: null,
		renderProgressbar: null,
		renderFraction: null,
		renderCustom: null,
		progressbarOpposite: false,
		type: "bullets",
		dynamicBullets: false,
		dynamicMainBullets: 1,
		formatFractionCurrent: (number) => number,
		formatFractionTotal: (number) => number,
		bulletClass: `${pfx}-bullet`,
		bulletActiveClass: `${pfx}-bullet-active`,
		modifierClass: `${pfx}-`,
		currentClass: `${pfx}-current`,
		totalClass: `${pfx}-total`,
		hiddenClass: `${pfx}-hidden`,
		progressbarFillClass: `${pfx}-progressbar-fill`,
		progressbarOppositeClass: `${pfx}-progressbar-opposite`,
		clickableClass: `${pfx}-clickable`,
		lockClass: `${pfx}-lock`,
		horizontalClass: `${pfx}-horizontal`,
		verticalClass: `${pfx}-vertical`,
		paginationDisabledClass: `${pfx}-disabled`
	} });
	swiper.pagination = {
		el: null,
		bullets: []
	};
	let bulletSize;
	let dynamicBulletIndex = 0;
	function isPaginationDisabled() {
		return !swiper.params.pagination.el || !swiper.pagination.el || Array.isArray(swiper.pagination.el) && swiper.pagination.el.length === 0;
	}
	function setSideBullets(bulletEl, position) {
		const { bulletActiveClass } = swiper.params.pagination;
		if (!bulletEl) return;
		bulletEl = bulletEl[`${position === "prev" ? "previous" : "next"}ElementSibling`];
		if (bulletEl) {
			bulletEl.classList.add(`${bulletActiveClass}-${position}`);
			bulletEl = bulletEl[`${position === "prev" ? "previous" : "next"}ElementSibling`];
			if (bulletEl) bulletEl.classList.add(`${bulletActiveClass}-${position}-${position}`);
		}
	}
	function getMoveDirection(prevIndex, nextIndex, length) {
		prevIndex = prevIndex % length;
		nextIndex = nextIndex % length;
		if (nextIndex === prevIndex + 1) return "next";
		else if (nextIndex === prevIndex - 1) return "previous";
	}
	function onBulletClick(e) {
		const bulletEl = e.target.closest(classesToSelector(swiper.params.pagination.bulletClass));
		if (!bulletEl) return;
		e.preventDefault();
		const index = elementIndex(bulletEl) * swiper.params.slidesPerGroup;
		if (swiper.params.loop) {
			if (swiper.realIndex === index) return;
			const moveDirection = getMoveDirection(swiper.realIndex, index, swiper.slides.length);
			if (moveDirection === "next") swiper.slideNext();
			else if (moveDirection === "previous") swiper.slidePrev();
			else swiper.slideToLoop(index);
		} else swiper.slideTo(index);
	}
	function update() {
		const rtl = swiper.rtl;
		const params = swiper.params.pagination;
		if (isPaginationDisabled()) return;
		let el = swiper.pagination.el;
		el = makeElementsArray(el);
		let current;
		let previousIndex;
		const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
		const total = swiper.params.loop ? Math.ceil(slidesLength / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
		if (swiper.params.loop) {
			previousIndex = swiper.previousRealIndex || 0;
			current = swiper.params.slidesPerGroup > 1 ? Math.floor(swiper.realIndex / swiper.params.slidesPerGroup) : swiper.realIndex;
		} else if (typeof swiper.snapIndex !== "undefined") {
			current = swiper.snapIndex;
			previousIndex = swiper.previousSnapIndex;
		} else {
			previousIndex = swiper.previousIndex || 0;
			current = swiper.activeIndex || 0;
		}
		if (params.type === "bullets" && swiper.pagination.bullets && swiper.pagination.bullets.length > 0) {
			const bullets = swiper.pagination.bullets;
			let firstIndex;
			let lastIndex;
			let midIndex;
			if (params.dynamicBullets) {
				bulletSize = elementOuterSize(bullets[0], swiper.isHorizontal() ? "width" : "height", true);
				el.forEach((subEl) => {
					subEl.style[swiper.isHorizontal() ? "width" : "height"] = `${bulletSize * (params.dynamicMainBullets + 4)}px`;
				});
				if (params.dynamicMainBullets > 1 && previousIndex !== void 0) {
					dynamicBulletIndex += current - (previousIndex || 0);
					if (dynamicBulletIndex > params.dynamicMainBullets - 1) dynamicBulletIndex = params.dynamicMainBullets - 1;
					else if (dynamicBulletIndex < 0) dynamicBulletIndex = 0;
				}
				firstIndex = Math.max(current - dynamicBulletIndex, 0);
				lastIndex = firstIndex + (Math.min(bullets.length, params.dynamicMainBullets) - 1);
				midIndex = (lastIndex + firstIndex) / 2;
			}
			bullets.forEach((bulletEl) => {
				const classesToRemove = [...[
					"",
					"-next",
					"-next-next",
					"-prev",
					"-prev-prev",
					"-main"
				].map((suffix) => `${params.bulletActiveClass}${suffix}`)].map((s) => typeof s === "string" && s.includes(" ") ? s.split(" ") : s).flat();
				bulletEl.classList.remove(...classesToRemove);
			});
			if (el.length > 1) bullets.forEach((bullet) => {
				const bulletIndex = elementIndex(bullet);
				if (bulletIndex === current) bullet.classList.add(...params.bulletActiveClass.split(" "));
				else if (swiper.isElement) bullet.setAttribute("part", "bullet");
				if (params.dynamicBullets) {
					if (bulletIndex >= firstIndex && bulletIndex <= lastIndex) bullet.classList.add(...`${params.bulletActiveClass}-main`.split(" "));
					if (bulletIndex === firstIndex) setSideBullets(bullet, "prev");
					if (bulletIndex === lastIndex) setSideBullets(bullet, "next");
				}
			});
			else {
				const bullet = bullets[current];
				if (bullet) bullet.classList.add(...params.bulletActiveClass.split(" "));
				if (swiper.isElement) bullets.forEach((bulletEl, bulletIndex) => {
					bulletEl.setAttribute("part", bulletIndex === current ? "bullet-active" : "bullet");
				});
				if (params.dynamicBullets) {
					const firstDisplayedBullet = bullets[firstIndex];
					const lastDisplayedBullet = bullets[lastIndex];
					for (let i = firstIndex; i <= lastIndex; i += 1) if (bullets[i]) bullets[i].classList.add(...`${params.bulletActiveClass}-main`.split(" "));
					setSideBullets(firstDisplayedBullet, "prev");
					setSideBullets(lastDisplayedBullet, "next");
				}
			}
			if (params.dynamicBullets) {
				const dynamicBulletsLength = Math.min(bullets.length, params.dynamicMainBullets + 4);
				const bulletsOffset = (bulletSize * dynamicBulletsLength - bulletSize) / 2 - midIndex * bulletSize;
				const offsetProp = rtl ? "right" : "left";
				bullets.forEach((bullet) => {
					bullet.style[swiper.isHorizontal() ? offsetProp : "top"] = `${bulletsOffset}px`;
				});
			}
		}
		el.forEach((subEl, subElIndex) => {
			if (params.type === "fraction") {
				subEl.querySelectorAll(classesToSelector(params.currentClass)).forEach((fractionEl) => {
					fractionEl.textContent = params.formatFractionCurrent(current + 1);
				});
				subEl.querySelectorAll(classesToSelector(params.totalClass)).forEach((totalEl) => {
					totalEl.textContent = params.formatFractionTotal(total);
				});
			}
			if (params.type === "progressbar") {
				let progressbarDirection;
				if (params.progressbarOpposite) progressbarDirection = swiper.isHorizontal() ? "vertical" : "horizontal";
				else progressbarDirection = swiper.isHorizontal() ? "horizontal" : "vertical";
				const scale = (current + 1) / total;
				let scaleX = 1;
				let scaleY = 1;
				if (progressbarDirection === "horizontal") scaleX = scale;
				else scaleY = scale;
				subEl.querySelectorAll(classesToSelector(params.progressbarFillClass)).forEach((progressEl) => {
					progressEl.style.transform = `translate3d(0,0,0) scaleX(${scaleX}) scaleY(${scaleY})`;
					progressEl.style.transitionDuration = `${swiper.params.speed}ms`;
				});
			}
			if (params.type === "custom" && params.renderCustom) {
				setInnerHTML(subEl, params.renderCustom(swiper, current + 1, total));
				if (subElIndex === 0) emit("paginationRender", subEl);
			} else {
				if (subElIndex === 0) emit("paginationRender", subEl);
				emit("paginationUpdate", subEl);
			}
			if (swiper.params.watchOverflow && swiper.enabled) subEl.classList[swiper.isLocked ? "add" : "remove"](params.lockClass);
		});
	}
	function render() {
		const params = swiper.params.pagination;
		if (isPaginationDisabled()) return;
		const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.grid && swiper.params.grid.rows > 1 ? swiper.slides.length / Math.ceil(swiper.params.grid.rows) : swiper.slides.length;
		let el = swiper.pagination.el;
		el = makeElementsArray(el);
		let paginationHTML = "";
		if (params.type === "bullets") {
			let numberOfBullets = swiper.params.loop ? Math.ceil(slidesLength / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
			if (swiper.params.freeMode && swiper.params.freeMode.enabled && numberOfBullets > slidesLength) numberOfBullets = slidesLength;
			for (let i = 0; i < numberOfBullets; i += 1) if (params.renderBullet) paginationHTML += params.renderBullet.call(swiper, i, params.bulletClass);
			else paginationHTML += `<${params.bulletElement} ${swiper.isElement ? "part=\"bullet\"" : ""} class="${params.bulletClass}"></${params.bulletElement}>`;
		}
		if (params.type === "fraction") if (params.renderFraction) paginationHTML = params.renderFraction.call(swiper, params.currentClass, params.totalClass);
		else paginationHTML = `<span class="${params.currentClass}"></span> / <span class="${params.totalClass}"></span>`;
		if (params.type === "progressbar") if (params.renderProgressbar) paginationHTML = params.renderProgressbar.call(swiper, params.progressbarFillClass);
		else paginationHTML = `<span class="${params.progressbarFillClass}"></span>`;
		swiper.pagination.bullets = [];
		el.forEach((subEl) => {
			if (params.type !== "custom") setInnerHTML(subEl, paginationHTML || "");
			if (params.type === "bullets") swiper.pagination.bullets.push(...subEl.querySelectorAll(classesToSelector(params.bulletClass)));
		});
		if (params.type !== "custom") emit("paginationRender", el[0]);
	}
	function init() {
		swiper.params.pagination = createElementIfNotDefined(swiper, swiper.originalParams.pagination, swiper.params.pagination, { el: "swiper-pagination" });
		const params = swiper.params.pagination;
		if (!params.el) return;
		let el;
		if (typeof params.el === "string" && swiper.isElement) el = swiper.el.querySelector(params.el);
		if (!el && typeof params.el === "string") el = [...document.querySelectorAll(params.el)];
		if (!el) el = params.el;
		if (!el || el.length === 0) return;
		if (swiper.params.uniqueNavElements && typeof params.el === "string" && Array.isArray(el) && el.length > 1) {
			el = [...swiper.el.querySelectorAll(params.el)];
			if (el.length > 1) el = el.find((subEl) => {
				if (elementParents(subEl, ".swiper")[0] !== swiper.el) return false;
				return true;
			});
		}
		if (Array.isArray(el) && el.length === 1) el = el[0];
		Object.assign(swiper.pagination, { el });
		el = makeElementsArray(el);
		el.forEach((subEl) => {
			if (params.type === "bullets" && params.clickable) subEl.classList.add(...(params.clickableClass || "").split(" "));
			subEl.classList.add(params.modifierClass + params.type);
			subEl.classList.add(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
			if (params.type === "bullets" && params.dynamicBullets) {
				subEl.classList.add(`${params.modifierClass}${params.type}-dynamic`);
				dynamicBulletIndex = 0;
				if (params.dynamicMainBullets < 1) params.dynamicMainBullets = 1;
			}
			if (params.type === "progressbar" && params.progressbarOpposite) subEl.classList.add(params.progressbarOppositeClass);
			if (params.clickable) subEl.addEventListener("click", onBulletClick);
			if (!swiper.enabled) subEl.classList.add(params.lockClass);
		});
	}
	function destroy() {
		const params = swiper.params.pagination;
		if (isPaginationDisabled()) return;
		let el = swiper.pagination.el;
		if (el) {
			el = makeElementsArray(el);
			el.forEach((subEl) => {
				subEl.classList.remove(params.hiddenClass);
				subEl.classList.remove(params.modifierClass + params.type);
				subEl.classList.remove(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
				if (params.clickable) {
					subEl.classList.remove(...(params.clickableClass || "").split(" "));
					subEl.removeEventListener("click", onBulletClick);
				}
			});
		}
		if (swiper.pagination.bullets) swiper.pagination.bullets.forEach((subEl) => subEl.classList.remove(...params.bulletActiveClass.split(" ")));
	}
	on("changeDirection", () => {
		if (!swiper.pagination || !swiper.pagination.el) return;
		const params = swiper.params.pagination;
		let { el } = swiper.pagination;
		el = makeElementsArray(el);
		el.forEach((subEl) => {
			subEl.classList.remove(params.horizontalClass, params.verticalClass);
			subEl.classList.add(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
		});
	});
	on("init", () => {
		if (swiper.params.pagination.enabled === false) disable();
		else {
			init();
			render();
			update();
		}
	});
	on("activeIndexChange", () => {
		if (typeof swiper.snapIndex === "undefined") update();
	});
	on("snapIndexChange", () => {
		update();
	});
	on("snapGridLengthChange", () => {
		render();
		update();
	});
	on("destroy", () => {
		destroy();
	});
	on("enable disable", () => {
		let { el } = swiper.pagination;
		if (el) {
			el = makeElementsArray(el);
			el.forEach((subEl) => subEl.classList[swiper.enabled ? "remove" : "add"](swiper.params.pagination.lockClass));
		}
	});
	on("lock unlock", () => {
		update();
	});
	on("click", (_s, e) => {
		const targetEl = e.target;
		const el = makeElementsArray(swiper.pagination.el);
		if (swiper.params.pagination.el && swiper.params.pagination.hideOnClick && el && el.length > 0 && !targetEl.classList.contains(swiper.params.pagination.bulletClass)) {
			if (swiper.navigation && (swiper.navigation.nextEl && targetEl === swiper.navigation.nextEl || swiper.navigation.prevEl && targetEl === swiper.navigation.prevEl)) return;
			if (el[0].classList.contains(swiper.params.pagination.hiddenClass) === true) emit("paginationShow");
			else emit("paginationHide");
			el.forEach((subEl) => subEl.classList.toggle(swiper.params.pagination.hiddenClass));
		}
	});
	const enable = () => {
		swiper.el.classList.remove(swiper.params.pagination.paginationDisabledClass);
		let { el } = swiper.pagination;
		if (el) {
			el = makeElementsArray(el);
			el.forEach((subEl) => subEl.classList.remove(swiper.params.pagination.paginationDisabledClass));
		}
		init();
		render();
		update();
	};
	const disable = () => {
		swiper.el.classList.add(swiper.params.pagination.paginationDisabledClass);
		let { el } = swiper.pagination;
		if (el) {
			el = makeElementsArray(el);
			el.forEach((subEl) => subEl.classList.add(swiper.params.pagination.paginationDisabledClass));
		}
		destroy();
	};
	Object.assign(swiper.pagination, {
		enable,
		disable,
		render,
		update,
		init,
		destroy
	});
}
var init_pagination = __esmMin((() => {
	init_classes_to_selector();
	init_create_element_if_not_defined();
	init_utils();
}));
//#endregion
//#region node_modules/swiper/modules/a11y.mjs
function A11y({ swiper, extendParams, on }) {
	extendParams({ a11y: {
		enabled: true,
		notificationClass: "swiper-notification",
		prevSlideMessage: "Previous slide",
		nextSlideMessage: "Next slide",
		firstSlideMessage: "This is the first slide",
		lastSlideMessage: "This is the last slide",
		paginationBulletMessage: "Go to slide {{index}}",
		slideLabelMessage: "{{index}} / {{slidesLength}}",
		containerMessage: null,
		containerRoleDescriptionMessage: null,
		containerRole: null,
		itemRoleDescriptionMessage: null,
		slideRole: "group",
		id: null,
		scrollOnFocus: true,
		wrapperLiveRegion: true
	} });
	swiper.a11y = { clicked: false };
	let liveRegion = null;
	let preventFocusHandler;
	let focusTargetSlideEl;
	let visibilityChangedTimestamp = (/* @__PURE__ */ new Date()).getTime();
	function notify(message) {
		const notification = liveRegion;
		if (notification.length === 0) return;
		setInnerHTML(notification, message);
	}
	function getRandomNumber(size = 16) {
		const randomChar = () => Math.round(16 * Math.random()).toString(16);
		return "x".repeat(size).replace(/x/g, randomChar);
	}
	function makeElFocusable(el) {
		el = makeElementsArray(el);
		el.forEach((subEl) => {
			subEl.setAttribute("tabIndex", "0");
		});
	}
	function makeElNotFocusable(el) {
		el = makeElementsArray(el);
		el.forEach((subEl) => {
			subEl.setAttribute("tabIndex", "-1");
		});
	}
	function addElRole(el, role) {
		el = makeElementsArray(el);
		el.forEach((subEl) => {
			subEl.setAttribute("role", role);
		});
	}
	function addElRoleDescription(el, description) {
		el = makeElementsArray(el);
		el.forEach((subEl) => {
			subEl.setAttribute("aria-roledescription", description);
		});
	}
	function addElControls(el, controls) {
		el = makeElementsArray(el);
		el.forEach((subEl) => {
			subEl.setAttribute("aria-controls", controls);
		});
	}
	function addElLabel(el, label) {
		el = makeElementsArray(el);
		el.forEach((subEl) => {
			subEl.setAttribute("aria-label", label);
		});
	}
	function addElId(el, id) {
		el = makeElementsArray(el);
		el.forEach((subEl) => {
			subEl.setAttribute("id", id);
		});
	}
	function addElLive(el, live) {
		el = makeElementsArray(el);
		el.forEach((subEl) => {
			subEl.setAttribute("aria-live", live);
		});
	}
	function disableEl(el) {
		el = makeElementsArray(el);
		el.forEach((subEl) => {
			subEl.setAttribute("aria-disabled", true);
		});
	}
	function enableEl(el) {
		el = makeElementsArray(el);
		el.forEach((subEl) => {
			subEl.setAttribute("aria-disabled", false);
		});
	}
	function onEnterOrSpaceKey(e) {
		if (e.keyCode !== 13 && e.keyCode !== 32) return;
		const params = swiper.params.a11y;
		const targetEl = e.target;
		if (swiper.pagination && swiper.pagination.el && (targetEl === swiper.pagination.el || swiper.pagination.el.contains(e.target))) {
			if (!e.target.matches(classesToSelector(swiper.params.pagination.bulletClass))) return;
		}
		if (swiper.navigation && swiper.navigation.prevEl && swiper.navigation.nextEl) {
			const prevEls = makeElementsArray(swiper.navigation.prevEl);
			if (makeElementsArray(swiper.navigation.nextEl).includes(targetEl)) {
				if (!(swiper.isEnd && !swiper.params.loop)) swiper.slideNext();
				if (swiper.isEnd) notify(params.lastSlideMessage);
				else notify(params.nextSlideMessage);
			}
			if (prevEls.includes(targetEl)) {
				if (!(swiper.isBeginning && !swiper.params.loop)) swiper.slidePrev();
				if (swiper.isBeginning) notify(params.firstSlideMessage);
				else notify(params.prevSlideMessage);
			}
		}
		if (swiper.pagination && targetEl.matches(classesToSelector(swiper.params.pagination.bulletClass))) targetEl.click();
	}
	function updateNavigation() {
		if (swiper.params.loop || swiper.params.rewind || !swiper.navigation) return;
		const { nextEl, prevEl } = swiper.navigation;
		if (prevEl) if (swiper.isBeginning) {
			disableEl(prevEl);
			makeElNotFocusable(prevEl);
		} else {
			enableEl(prevEl);
			makeElFocusable(prevEl);
		}
		if (nextEl) if (swiper.isEnd) {
			disableEl(nextEl);
			makeElNotFocusable(nextEl);
		} else {
			enableEl(nextEl);
			makeElFocusable(nextEl);
		}
	}
	function hasPagination() {
		return swiper.pagination && swiper.pagination.bullets && swiper.pagination.bullets.length;
	}
	function hasClickablePagination() {
		return hasPagination() && swiper.params.pagination.clickable;
	}
	function updatePagination() {
		const params = swiper.params.a11y;
		if (!hasPagination()) return;
		swiper.pagination.bullets.forEach((bulletEl) => {
			if (swiper.params.pagination.clickable) {
				makeElFocusable(bulletEl);
				if (!swiper.params.pagination.renderBullet) {
					addElRole(bulletEl, "button");
					addElLabel(bulletEl, params.paginationBulletMessage.replace(/\{\{index\}\}/, elementIndex(bulletEl) + 1));
				}
			}
			if (bulletEl.matches(classesToSelector(swiper.params.pagination.bulletActiveClass))) bulletEl.setAttribute("aria-current", "true");
			else bulletEl.removeAttribute("aria-current");
		});
	}
	const initNavEl = (el, wrapperId, message) => {
		makeElFocusable(el);
		if (el.tagName !== "BUTTON") {
			addElRole(el, "button");
			el.addEventListener("keydown", onEnterOrSpaceKey);
		}
		addElLabel(el, message);
		addElControls(el, wrapperId);
	};
	const handlePointerDown = (e) => {
		if (focusTargetSlideEl && focusTargetSlideEl !== e.target && !focusTargetSlideEl.contains(e.target)) preventFocusHandler = true;
		swiper.a11y.clicked = true;
	};
	const handlePointerUp = () => {
		preventFocusHandler = false;
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				if (!swiper.destroyed) swiper.a11y.clicked = false;
			});
		});
	};
	const onVisibilityChange = (e) => {
		visibilityChangedTimestamp = (/* @__PURE__ */ new Date()).getTime();
	};
	const handleFocus = (e) => {
		if (swiper.a11y.clicked || !swiper.params.a11y.scrollOnFocus) return;
		if ((/* @__PURE__ */ new Date()).getTime() - visibilityChangedTimestamp < 100) return;
		const slideEl = e.target.closest(`.${swiper.params.slideClass}, swiper-slide`);
		if (!slideEl || !swiper.slides.includes(slideEl)) return;
		focusTargetSlideEl = slideEl;
		const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
		const isActive = (isVirtual ? parseInt(slideEl.getAttribute("data-swiper-slide-index"), 10) : swiper.slides.indexOf(slideEl)) === swiper.activeIndex;
		const isVisible = swiper.params.watchSlidesProgress && swiper.visibleSlides && swiper.visibleSlides.includes(slideEl);
		if (isActive || isVisible) return;
		if (e.sourceCapabilities && e.sourceCapabilities.firesTouchEvents) return;
		if (swiper.isHorizontal()) swiper.el.scrollLeft = 0;
		else swiper.el.scrollTop = 0;
		requestAnimationFrame(() => {
			if (preventFocusHandler) return;
			if (swiper.params.loop) swiper.slideToLoop(swiper.getSlideIndexWhenGrid(parseInt(slideEl.getAttribute("data-swiper-slide-index"))), 0);
			else if (isVirtual) swiper.slideTo(swiper.getSlideIndexWhenGrid(parseInt(slideEl.getAttribute("data-swiper-slide-index"), 10)), 0);
			else swiper.slideTo(swiper.getSlideIndexWhenGrid(swiper.slides.indexOf(slideEl)), 0);
			preventFocusHandler = false;
		});
	};
	const initSlides = () => {
		const params = swiper.params.a11y;
		if (params.itemRoleDescriptionMessage) addElRoleDescription(swiper.slides, params.itemRoleDescriptionMessage);
		if (params.slideRole) addElRole(swiper.slides, params.slideRole);
		const slidesLength = swiper.slides.length;
		if (params.slideLabelMessage) swiper.slides.forEach((slideEl, index) => {
			const slideIndex = swiper.params.loop ? parseInt(slideEl.getAttribute("data-swiper-slide-index"), 10) : index;
			addElLabel(slideEl, params.slideLabelMessage.replace(/\{\{index\}\}/, slideIndex + 1).replace(/\{\{slidesLength\}\}/, slidesLength));
		});
	};
	const init = () => {
		const params = swiper.params.a11y;
		swiper.el.append(liveRegion);
		const containerEl = swiper.el;
		if (params.containerRoleDescriptionMessage) addElRoleDescription(containerEl, params.containerRoleDescriptionMessage);
		if (params.containerMessage) addElLabel(containerEl, params.containerMessage);
		if (params.containerRole) addElRole(containerEl, params.containerRole);
		const wrapperEl = swiper.wrapperEl;
		const wrapperId = params.id || wrapperEl.getAttribute("id") || `swiper-wrapper-${getRandomNumber(16)}`;
		addElId(wrapperEl, wrapperId);
		if (params.wrapperLiveRegion) addElLive(wrapperEl, swiper.params.autoplay && swiper.params.autoplay.enabled ? "off" : "polite");
		initSlides();
		let { nextEl, prevEl } = swiper.navigation ? swiper.navigation : {};
		nextEl = makeElementsArray(nextEl);
		prevEl = makeElementsArray(prevEl);
		if (nextEl) nextEl.forEach((el) => initNavEl(el, wrapperId, params.nextSlideMessage));
		if (prevEl) prevEl.forEach((el) => initNavEl(el, wrapperId, params.prevSlideMessage));
		if (hasClickablePagination()) makeElementsArray(swiper.pagination.el).forEach((el) => {
			el.addEventListener("keydown", onEnterOrSpaceKey);
		});
		getDocument().addEventListener("visibilitychange", onVisibilityChange);
		swiper.el.addEventListener("focus", handleFocus, true);
		swiper.el.addEventListener("pointerdown", handlePointerDown, true);
		swiper.el.addEventListener("pointerup", handlePointerUp, true);
	};
	function destroy() {
		if (liveRegion) liveRegion.remove();
		let { nextEl, prevEl } = swiper.navigation ? swiper.navigation : {};
		nextEl = makeElementsArray(nextEl);
		prevEl = makeElementsArray(prevEl);
		if (nextEl) nextEl.forEach((el) => el.removeEventListener("keydown", onEnterOrSpaceKey));
		if (prevEl) prevEl.forEach((el) => el.removeEventListener("keydown", onEnterOrSpaceKey));
		if (hasClickablePagination()) makeElementsArray(swiper.pagination.el).forEach((el) => {
			el.removeEventListener("keydown", onEnterOrSpaceKey);
		});
		getDocument().removeEventListener("visibilitychange", onVisibilityChange);
		if (swiper.el && typeof swiper.el !== "string") {
			swiper.el.removeEventListener("focus", handleFocus, true);
			swiper.el.removeEventListener("pointerdown", handlePointerDown, true);
			swiper.el.removeEventListener("pointerup", handlePointerUp, true);
		}
	}
	on("beforeInit", () => {
		liveRegion = createElement$1("span", swiper.params.a11y.notificationClass);
		liveRegion.setAttribute("aria-live", "assertive");
		liveRegion.setAttribute("aria-atomic", "true");
	});
	on("afterInit", () => {
		if (!swiper.params.a11y.enabled) return;
		init();
	});
	on("slidesLengthChange snapGridLengthChange slidesGridLengthChange", () => {
		if (!swiper.params.a11y.enabled) return;
		initSlides();
	});
	on("fromEdge toEdge afterInit lock unlock", () => {
		if (!swiper.params.a11y.enabled) return;
		updateNavigation();
	});
	on("paginationUpdate", () => {
		if (!swiper.params.a11y.enabled) return;
		updatePagination();
	});
	on("destroy", () => {
		if (!swiper.params.a11y.enabled) return;
		destroy();
	});
}
var init_a11y = __esmMin((() => {
	init_ssr_window_esm();
	init_classes_to_selector();
	init_utils();
}));
//#endregion
//#region node_modules/swiper/modules/index.mjs
var init_modules = __esmMin((() => {
	init_ssr_window_esm();
	init_utils();
	init_keyboard();
	init_navigation();
	init_pagination();
	init_create_element_if_not_defined();
	init_a11y();
}));
//#endregion
//#region node_modules/swiper/swiper-bundle.css
var init_swiper_bundle = __esmMin((() => {}));
//#endregion
//#region node_modules/swiper/swiper.css
var init_swiper = __esmMin((() => {}));
//#endregion
//#region src/js/components/homepage/AwardSearch/AwardSearch.jsx
/**
* AwardSearch.jsx
* Created by Brian Petway 08/22/22
*/
var import_jsx_runtime$10, AwardSearch;
var init_AwardSearch = __esmMin((() => {
	init_fiscalYearHelper();
	init_index_es();
	init_axios();
	init_dist();
	init_searchFiltersReducer();
	init_GlossaryLink();
	init_searchHelper();
	init_GlobalConstants();
	init_Analytics();
	init_swiper_react();
	init_modules();
	init_swiper_bundle();
	init_swiper();
	import_jsx_runtime$10 = require_jsx_runtime();
	AwardSearch = () => {
		const [isDesktopXL, setDesktopXL] = useState(window.innerWidth >= 1400);
		const [isMobile, setMobile] = useState(window.innerWidth < 768);
		const [windowWidth, setWindowWidth] = useState(window.innerWidth);
		const [activeCardIndex, setActiveCardIndex] = useState(0);
		const placeOfPerformance = /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("div", {
			"aria-disabled": activeCardIndex !== 0,
			children: [
				"Search spending to your community using Location filters like",
				/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("div", {
					className: "award-search__glossary",
					children: " Place of Performance"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(GlossaryLink, {
					term: "primary-place-of-performance",
					hidden: activeCardIndex !== 0
				})
			]
		});
		const fiscalYear = /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("div", {
			"aria-disabled": activeCardIndex !== 1,
			children: [
				"See spending data over time using our Time Period filters, like",
				/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("div", {
					className: "award-search__glossary",
					children: " Fiscal Year"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(GlossaryLink, {
					term: "fiscal-year-fy",
					hidden: activeCardIndex !== 1
				})
			]
		});
		const naics = /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("div", {
			"aria-disabled": activeCardIndex !== 2,
			children: [
				"Use the",
				/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("div", {
					className: "award-search__glossary",
					children: " North American Industry Classification System (NAICS)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(GlossaryLink, {
					term: "naics",
					hidden: activeCardIndex !== 2
				}),
				"filter to find spending by industry"
			]
		});
		const psc = /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("div", {
			"aria-disabled": activeCardIndex !== 3,
			children: [
				"From medical supplies to aircraft equipment, use",
				/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("div", {
					className: "award-search__glossary",
					children: " Product or Service Codes (PSCs)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(GlossaryLink, {
					term: "product-or-service-code-psc",
					hidden: activeCardIndex !== 3
				}),
				"to see what's being purchased"
			]
		});
		useEffect(() => {
			const handleResize = throttle(() => {
				const newWidth = window.innerWidth;
				if (windowWidth !== newWidth) {
					setWindowWidth(newWidth);
					if (newWidth >= 1400) setDesktopXL(true);
					else setDesktopXL(false);
					if (newWidth < 768) setMobile(true);
					else setMobile(false);
				}
			}, 50);
			window.addEventListener("resize", handleResize);
			return () => window.removeEventListener("resize", handleResize);
		}, [windowWidth]);
		const getSelectedSection = (section, rankType) => {
			const filterValue = {
				filters: {
					...initialState,
					selectedLocations: { USA: {
						filter: { country: "USA" },
						display: {
							title: "UNITED STATES",
							entity: "Country",
							standalone: "UNITED STATES"
						},
						identifier: "USA"
					} }
				},
				version: globalConstants.REQUEST_VERSION
			};
			if (section === "map") filterValue.filters.timePeriodFY = [currentFiscalYear().toString()];
			else if (section === "time") filterValue.filters.timePeriodFY = [
				currentFiscalYear().toString(),
				(currentFiscalYear() - 1).toString(),
				(currentFiscalYear() - 2).toString(),
				(currentFiscalYear() - 3).toString(),
				(currentFiscalYear() - 4).toString()
			];
			else if (section === "categories" && rankType === "naics") filterValue.filters.timePeriodFY = [currentFiscalYear().toString()];
			else if (section === "categories" && rankType === "psc") filterValue.filters.timePeriodFY = [currentFiscalYear().toString()];
			let tempHash = generateUrlHash(filterValue);
			tempHash.promise.then((results) => {
				const hashData = results.data;
				if (rankType === "naics" || rankType === "psc") window.open(`/search?hash=${encodeURIComponent(hashData.hash)}&section=${encodeURIComponent(section)}&type=${encodeURIComponent(rankType)}`, "_self");
				else if (section === "time") window.open(`/search?hash=${encodeURIComponent(hashData.hash)}&section=${encodeURIComponent(section)}&by=${encodeURIComponent("fiscal_year")}`, "_self");
				else window.open(`/search?hash=${encodeURIComponent(hashData.hash)}&section=${encodeURIComponent(section)}`, "_self");
				tempHash = null;
			}).catch((error) => {
				console.log(error);
				if (isCancel(error)) {} else if (error.response) (void 0).hash = null;
				else {
					tempHash = null;
					console.log(error);
				}
			});
		};
		const trackClick = (buttonName) => Analytics.event({
			event: "homepage_search_award_data_section",
			category: "Homepage",
			action: "Link",
			label: `carousel ${buttonName}`
		});
		const handleGoToAdvancedSearch = (buttonName, rankType) => {
			getSelectedSection(buttonName, rankType);
			trackClick(buttonName);
		};
		const onSlideChange = (d) => {
			const currentIndex = d.realIndex;
			d.slides.forEach((slide, i) => {
				if (i === currentIndex) {
					slide.ariaHidden = false;
					setActiveCardIndex(currentIndex);
				} else slide.ariaHidden = true;
			});
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("section", {
			className: "award-search__section",
			children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("div", {
				style: { justifyContent: "center" },
				className: "award-search__topdiv",
				children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)(Qs, {
					className: "grid-content",
					children: [isDesktopXL && /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)(import_jsx_runtime$10.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)($s, {
						desktop: 4,
						tablet: 12,
						mobile: 12,
						className: "award-search__col1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("div", {
								className: "award-search__overline-div",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("span", {
									className: "fa-layers fa-fw award-search__span",
									children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(FontAwesomeIcon, {
										icon: "search",
										size: "sm",
										style: {
											height: "12px",
											width: "12px"
										}
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("p", {
									className: "award-search__overline",
									children: "SEARCH AWARD DATA"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("h2", {
								className: "award-search__header",
								children: "Search data on federal award spending"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("p", {
								className: "award-search__subtext",
								children: "Find information on awards such as contracts, grants, and loans based on location, industry, and more."
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)($s, {
						desktop: 8,
						tablet: 12,
						mobile: 12,
						className: "award-search__col2",
						children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)(Swiper, {
							a11y: true,
							centeredSlides: true,
							navigation: true,
							watchslidesvisibility: "true",
							slidesPerView: "auto",
							spaceBetween: 40,
							modules: [
								Keyboard,
								A11y,
								Navigation
							],
							keyboard: true,
							style: { alignItems: "middle" },
							onSlideChange,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(SwiperSlide, {
									tabIndex: activeCardIndex === 0 ? 0 : -1,
									className: "award-search__slide award-search__card1",
									style: { marginBottom: "20px" },
									children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(tc, {
										variant: "elevated",
										size: "lg",
										children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)(rc, {
											headline: "Federal Spending to Communities",
											text: placeOfPerformance,
											children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("div", {
												className: "award-search__image",
												children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("img", {
													src: "img/homepage-award-search/award-search-communities.svg",
													alt: "",
													role: "presentation"
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(lc, {
												onlyPerformAction: true,
												text: "View spending by state",
												variant: "primary",
												textAlignment: "center",
												action: () => {
													handleGoToAdvancedSearch("map");
												},
												disabled: activeCardIndex !== 0
											})]
										})
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(SwiperSlide, {
									tabIndex: activeCardIndex === 1 ? 0 : -1,
									className: "award-search__slide award-search__card2",
									style: { marginBottom: "20px" },
									children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(tc, {
										variant: "elevated",
										size: "lg",
										children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)(rc, {
											headline: "Federal Spending Over Time",
											text: fiscalYear,
											children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("div", {
												className: "award-search__image",
												children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("img", {
													src: "img/homepage-award-search/award-search-over-time-2x.svg",
													alt: "",
													role: "presentation"
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(lc, {
												onlyPerformAction: true,
												text: "View spending by fiscal year",
												variant: "primary",
												textAlignment: "center",
												action: () => {
													handleGoToAdvancedSearch("time");
												},
												disabled: activeCardIndex !== 1
											})]
										})
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(SwiperSlide, {
									tabIndex: activeCardIndex === 2 ? 0 : -1,
									className: "award-search__slide award-search__card3",
									style: { marginBottom: "20px" },
									children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(tc, {
										variant: "elevated",
										size: "lg",
										children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)(rc, {
											headline: "Federal Spending by Industry",
											text: naics,
											children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("div", {
												className: "award-search__image",
												children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("img", {
													src: "img/homepage-award-search/award-search-industry-2x.svg",
													alt: "",
													role: "presentation"
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(lc, {
												onlyPerformAction: true,
												text: "View spending by industry",
												variant: "primary",
												textAlignment: "center",
												action: () => {
													handleGoToAdvancedSearch("categories", "naics");
												},
												disabled: activeCardIndex !== 2
											})]
										})
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(SwiperSlide, {
									tabIndex: activeCardIndex === 3 ? 0 : -1,
									className: "award-search__slide award-search__card1",
									style: { marginBottom: "20px" },
									children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(tc, {
										variant: "elevated",
										size: "lg",
										children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)(rc, {
											headline: "Federal Spending by Product or Service",
											text: psc,
											children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("div", {
												className: "award-search__image",
												children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("img", {
													src: "img/homepage-award-search/award-search-psc-2x.svg",
													alt: "",
													role: "presentation"
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(lc, {
												onlyPerformAction: true,
												text: "View spending by product or service",
												variant: "primary",
												textAlignment: "center",
												action: () => {
													handleGoToAdvancedSearch("categories", "psc");
												},
												disabled: activeCardIndex !== 3
											})]
										})
									})
								})
							]
						})
					})] }), !isDesktopXL && /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)(import_jsx_runtime$10.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(Qs, {
						desktop: 9,
						tablet: 12,
						mobile: 12,
						children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)($s, {
							desktop: 9,
							tablet: 12,
							mobile: 12,
							className: "award-search__col1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("div", {
									className: "award-search__overline-div",
									children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("span", {
										className: "fa-layers fa-fw award-search__span",
										children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(FontAwesomeIcon, {
											icon: "search",
											size: "sm",
											style: {
												height: "12px",
												width: "12px"
											}
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("p", {
										className: "award-search__overline",
										children: "AWARD SEARCH"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("h2", {
									className: "award-search__header",
									children: "Search data on federal award spending"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("p", {
									className: "award-search__subtext",
									children: "Find information on awards such as contracts, grants, and loans based on location, industry, and more."
								})
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)($s, {
						desktop: 8,
						tablet: 12,
						mobile: 12,
						className: "award-search__col2",
						style: {
							width: "100%",
							margin: "auto"
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)(Swiper, {
							a11y: true,
							centeredSlides: true,
							pagination: isMobile,
							navigation: !isMobile,
							watchslidesvisibility: "true",
							slidesPerView: "auto",
							spaceBetween: 40,
							modules: [
								Keyboard,
								A11y,
								Pagination,
								Navigation
							],
							keyboard: true,
							className: "award-search__swiper",
							onSlideChange,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(SwiperSlide, {
									tabIndex: activeCardIndex === 0 ? 0 : -1,
									className: "award-search__slide",
									style: { marginBottom: "20px" },
									children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(tc, {
										className: "award-search__card1",
										variant: "elevated",
										size: isMobile ? "sm" : "lg",
										children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)(rc, {
											headline: "Federal Spending to Communities",
											text: placeOfPerformance,
											children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("div", {
												className: "award-search__image",
												children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("img", {
													src: "img/homepage-award-search/award-search-communities.svg",
													alt: "",
													role: "presentation"
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(lc, {
												onlyPerformAction: true,
												text: "View spending by state",
												variant: "primary",
												textAlignment: "center",
												backgroundColor: "dark",
												action: () => {
													handleGoToAdvancedSearch("map");
												},
												disabled: activeCardIndex !== 0
											})]
										})
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(SwiperSlide, {
									tabIndex: activeCardIndex === 1 ? 0 : -1,
									className: "award-search__slide award-search__card2",
									style: { marginBottom: "20px" },
									children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(tc, {
										className: "award-search__card2",
										variant: "elevated",
										size: isMobile ? "sm" : "lg",
										children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)(rc, {
											headline: "Federal Spending Over Time",
											text: fiscalYear,
											children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("div", {
												className: "award-search__image",
												children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("img", {
													src: "img/homepage-award-search/award-search-over-time-2x.svg",
													alt: "",
													role: "presentation"
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(lc, {
												onlyPerformAction: true,
												text: "View spending by fiscal year",
												variant: "primary",
												action: () => {
													handleGoToAdvancedSearch("time");
												},
												disabled: activeCardIndex !== 1
											})]
										})
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(SwiperSlide, {
									tabIndex: activeCardIndex === 2 ? 0 : -1,
									className: "award-search__slide award-search__card3",
									style: { marginBottom: "20px" },
									children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(tc, {
										className: "award-search__card3",
										variant: "elevated",
										size: isMobile ? "sm" : "lg",
										children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)(rc, {
											headline: "Federal Spending by Industry",
											text: naics,
											children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("div", {
												className: "award-search__image",
												children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("img", {
													src: "img/homepage-award-search/award-search-industry-2x.svg",
													alt: "",
													role: "presentation"
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(lc, {
												onlyPerformAction: true,
												text: "View spending by industry",
												variant: "primary",
												action: () => {
													handleGoToAdvancedSearch("categories", "naics");
												},
												disabled: activeCardIndex !== 2
											})]
										})
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(SwiperSlide, {
									tabIndex: activeCardIndex === 3 ? 0 : -1,
									className: "award-search__slide award-search__card4",
									style: { marginBottom: "20px" },
									children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(tc, {
										className: "award-search__card4",
										variant: "elevated",
										size: isMobile ? "sm" : "lg",
										children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)(rc, {
											headline: "Federal Spending by Product or Service",
											text: psc,
											children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("div", {
												className: "award-search__image",
												children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("img", {
													src: "img/homepage-award-search/award-search-psc-2x.svg",
													alt: "",
													role: "presentation"
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(lc, {
												onlyPerformAction: true,
												text: "View spending by product or service",
												variant: "primary",
												action: () => {
													handleGoToAdvancedSearch("categories", "psc");
												},
												disabled: activeCardIndex !== 3
											})]
										})
									})
								})
							]
						})
					})] })]
				})
			})
		});
	};
}));
//#endregion
//#region src/js/components/homepage/ExploreTheData/ExploreTheData.jsx
var import_jsx_runtime$9, propTypes$2, ExploreTheData;
var init_ExploreTheData = __esmMin((() => {
	init_index_es();
	import_jsx_runtime$9 = require_jsx_runtime();
	propTypes$2 = {
		title: PropTypes.string,
		cardObjects: PropTypes.array,
		access: PropTypes.bool
	};
	ExploreTheData = (props) => /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("section", {
		className: `explore-data__section ${props.access ? "access" : ""}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("div", {
			style: {
				display: "flex",
				justifyContent: "center"
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)(Qs, {
				className: "grid-content",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)($s, {
					className: "explore-data__title",
					width: 12,
					children: props.title
				}), /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(Qs, {
					className: "explore-data__card-row",
					hasGutter: true,
					gutterSize: "lg",
					children: props.cardObjects.map((card, index) => /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)($s, {
						className: "explore-data__card",
						mobile: 12,
						tablet: 12,
						desktop: 4,
						children: /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)(tc, {
							variant: "elevated",
							size: "md",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(ac, { fill: card.fillColor }), /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(rc, {
								headline: card.headline,
								text: card.text,
								children: /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)(lc, {
									variant: "secondary",
									backgroundColor: "light",
									buttonSize: "sm",
									textAlignment: "center",
									text: card.buttonText,
									link: card.buttonLink,
									govLink: card.govLink,
									action: card.action
								})
							})]
						})
					}, index))
				})]
			})
		})
	});
	ExploreTheData.propTypes = propTypes$2;
}));
//#endregion
//#region src/js/components/homepage/HomepageExploreToggle/HomepageExploreToggle.jsx
/**
* HomepageExploreToggle.jsx
* Created by Brian Petway 08/22/22
*/
var import_jsx_runtime$8, exploreDataTitle, exploreData, accessDataTitle, accessData, toggleTabs, HomepageExploreToggle;
var init_HomepageExploreToggle = __esmMin((() => {
	init_index_es();
	init_dist();
	init_ExploreTheData();
	init_Analytics();
	import_jsx_runtime$8 = require_jsx_runtime();
	exploreDataTitle = "Browse ready-made analyses with our Spending Profiles";
	exploreData = [
		{
			fillColor: "#168092",
			headline: "Tools for understanding agency spending",
			text: "Use our interactive tools to find out how federal agencies are spending money",
			buttonText: "Explore Agency Profiles",
			buttonLink: "/agency",
			buttonSize: "sm",
			action: () => Analytics.event({
				event: "homepage_explore-the-data",
				category: "Homepage",
				action: "Link",
				label: "explore agency profiles card"
			})
		},
		{
			fillColor: "#009ec1",
			headline: "Insights into federal award recipients",
			text: "See who is receiving contracts, grants, loans, and other types of awards",
			buttonText: "View Recipient Profiles",
			buttonLink: "/recipient",
			buttonSize: "sm",
			action: () => Analytics.event({
				event: "homepage_explore-the-data",
				category: "Homepage",
				action: "Link",
				label: "view recipient profiles card"
			})
		},
		{
			fillColor: "#005ea2",
			headline: "Overview of federal awards made to states",
			text: "Find data on contracts, grants, and other types of awards made in each state",
			buttonText: "Browse State Profiles",
			buttonLink: "/state",
			buttonSize: "sm",
			action: () => Analytics.event({
				event: "homepage_explore-the-data",
				category: "Homepage",
				action: "Link",
				label: "browse state profiles card"
			})
		}
	];
	accessDataTitle = "Create your own analyses using USAspending data";
	accessData = [
		{
			fillColor: "#783cb9",
			headline: "Download prime and sub-award data",
			text: "Create a custom download with details on specific awards",
			buttonText: "Go to award data download",
			buttonLink: "/download_center/custom_award_data",
			action: () => Analytics.event({
				event: "homepage_explore-the-data",
				category: "Homepage",
				action: "Link",
				label: "custom award data download card"
			})
		},
		{
			fillColor: "#4a50c4",
			headline: "Download all federal spending data",
			text: "Our account data includes award and non-award spending",
			buttonText: "Go to account data download",
			buttonLink: "/download_center/custom_account_data",
			buttonSize: "sm",
			action: () => Analytics.event({
				event: "homepage_explore-the-data",
				category: "Homepage",
				action: "Link",
				label: "account data download"
			})
		},
		{
			fillColor: "#0050d8",
			headline: "Use our API for your products",
			text: "Our API is open, allowing you to create your own data visualizations",
			buttonText: "View API endpoints",
			buttonLink: "https://api.usaspending.gov/docs/endpoints",
			govLink: true,
			action: () => Analytics.event({
				event: "homepage_explore-the-data",
				category: "Homepage",
				action: "Link",
				label: "view api endpoints"
			})
		}
	];
	toggleTabs = [{
		internal: "explore",
		label: [/* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)("div", {
			className: "homepage-explore-toggle__text-container",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("div", {
				className: "homepage-explore-toggle__icon-container",
				children: /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(FontAwesomeIcon, {
					icon: "chart-pie",
					className: "homepage-explore-toggle__icon"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("div", {
				className: "homepage-explore-toggle__text",
				children: "EXPLORE THE DATA"
			})]
		})]
	}, {
		internal: "access",
		label: [/* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)("div", {
			className: "homepage-explore-toggle__text-container",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("div", {
				className: "homepage-explore-toggle__icon-container access",
				children: /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(FontAwesomeIcon, {
					icon: "file-download",
					className: "homepage-explore-toggle__icon access"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("div", {
				className: "homepage-explore-toggle__text",
				children: "DOWNLOAD THE DATA"
			})]
		})]
	}];
	HomepageExploreToggle = () => {
		const [activeTab, setActiveTab] = useState("explore");
		const changeActiveTab = (internal) => {
			if (activeTab === "explore" && internal !== "explore" || activeTab === "access" && internal !== "access") setActiveTab(activeTab === "explore" ? "access" : "explore");
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("section", {
			className: "homepage-explore-toggle__section",
			children: /* @__PURE__ */ (0, import_jsx_runtime$8.jsxs)("div", {
				style: {
					display: "flex",
					flexDirection: "column",
					justifyContent: "center"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(Qs, {
					className: "grid-content",
					children: /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(vs, {
						active: activeTab,
						types: toggleTabs,
						switchTab: changeActiveTab
					}) })
				}), activeTab === "explore" ? /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(ExploreTheData, {
					title: exploreDataTitle,
					cardObjects: exploreData
				}) : /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(ExploreTheData, {
					title: accessDataTitle,
					cardObjects: accessData,
					access: true
				})]
			})
		});
	};
}));
//#endregion
//#region src/js/components/homepage/HomepageResources/HomepageResources.jsx
var import_jsx_runtime$7, HomepageResources;
var init_HomepageResources = __esmMin((() => {
	init_index_es();
	init_dist();
	init_Analytics();
	init_slideoutHelper();
	import_jsx_runtime$7 = require_jsx_runtime();
	HomepageResources = () => {
		return /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("section", {
			className: "homepage-resources__section",
			children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
				style: {
					display: "flex",
					flexDirection: "column",
					justifyContent: "center"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)(Qs, {
					className: "grid-content",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)($s, {
						width: 12,
						children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)(Qs, {
							className: "homepage-resources__top-label-container",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
								className: "homepage-resources__top-label-icon-container",
								children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(FontAwesomeIcon, {
									className: "homepage-resources__book-icon",
									icon: "book-open",
									size: "xs"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
								className: "homepage-resources__top-label-text",
								children: "FIND RESOURCES"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(Qs, {
							className: "homepage-resources__headline",
							children: "Find answers to your data questions"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)($s, {
						width: 12,
						children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(Qs, {
							className: "homepage-resources__card-row",
							hasGutter: true,
							gutterSize: "lg",
							children: [
								{
									icon: /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
										className: "homepage-resources__icon-container guide",
										children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(FontAwesomeIcon, {
											icon: "chart-bar",
											color: "#112f4e",
											size: "lg"
										})
									}),
									headline: "Federal Spending Guide",
									text: "Learn how to use the data",
									buttonText: /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)(import_jsx_runtime$7.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", { children: "View the guide\xA0\xA0" }), /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(FontAwesomeIcon, { icon: "arrow-right" })] }),
									buttonLink: "/federal-spending-guide",
									action: () => Analytics.event({
										event: "homepage_find-resources",
										category: "Homepage",
										action: "Link",
										label: "learn how to use the data card"
									})
								},
								{
									icon: /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
										className: "homepage-resources__icon-container dictionary",
										children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(FontAwesomeIcon, {
											icon: "database",
											color: "#34a37e",
											size: "lg"
										})
									}),
									headline: "Data Dictionary",
									text: "Learn about the data elements",
									buttonText: /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)(import_jsx_runtime$7.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", { children: "View the dictionary\xA0\xA0" }), /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(FontAwesomeIcon, { icon: "arrow-right" })] }),
									buttonLink: "/data-dictionary",
									action: () => Analytics.event({
										event: "homepage_find-resources",
										category: "Homepage",
										action: "Link",
										label: "data dictionary card"
									})
								},
								{
									icon: /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
										className: "homepage-resources__icon-container model",
										children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(FontAwesomeIcon, {
											icon: "sitemap",
											color: "#0081a1",
											size: "lg"
										})
									}),
									headline: "About the Data",
									text: "Read important data disclosures",
									buttonText: /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
										className: "homepage-resources__link-container",
										children: ["View the disclosures\xA0\xA0", /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(FontAwesomeIcon, { icon: "arrow-right" })]
									}),
									action: () => {
										Analytics.event({
											event: "homepage_find-resources",
											category: "Homepage",
											action: "Link",
											label: "data model card"
										});
										showSlideout("atd");
									},
									govLink: false,
									onlyPerformAction: true
								},
								{
									icon: /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
										className: "homepage-resources__icon-container glossary",
										children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(FontAwesomeIcon, {
											icon: "book",
											color: "#3333a3",
											size: "lg"
										})
									}),
									headline: "Glossary",
									text: "Learn about spending terms",
									buttonText: /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
										className: "homepage-resources__link-container",
										children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", { children: ["View the glossary\xA0\xA0", /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(FontAwesomeIcon, { icon: "arrow-right" })] })
									}),
									action: () => {
										Analytics.event({
											event: "homepage_find-resources",
											category: "Homepage",
											action: "Link",
											label: "glossary card"
										});
										showSlideout("glossary", { clear: true });
									},
									govLink: false,
									onlyPerformAction: true
								}
							].map((card, index) => /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)($s, {
								className: "homepage-resources__card-col",
								mobile: 12,
								tablet: 6,
								desktop: 3,
								children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)(tc, { children: [card.icon, /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(rc, {
									headline: card.headline,
									text: card.text,
									children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)(lc, {
										variant: "text",
										backgroundColor: "light",
										textAlignment: "left",
										text: card.buttonText,
										link: card.buttonLink,
										govLink: card.govLink,
										onlyPerformAction: card.onlyPerformAction,
										action: card.action
									})
								})] })
							}, index))
						})
					})]
				})
			})
		});
	};
}));
//#endregion
//#region src/js/components/homepage/ReadyToGetStarted/ReadyToGetStarted.jsx
var import_jsx_runtime$6, cardObjects, ReadyToGetStarted;
var init_ReadyToGetStarted = __esmMin((() => {
	init_index_es();
	init_Analytics();
	import_jsx_runtime$6 = require_jsx_runtime();
	cardObjects = [
		{
			fillColor: "#00bde3",
			image: "img/homepage-ready-to-get-started/homepage-get-started-award-search.webp",
			imageHeight: "177px",
			overline: "SEARCH AWARD DATA",
			headline: "Find details on federal awards",
			buttonText: "Go to Award Search",
			buttonLink: "/search",
			action: () => Analytics.event({
				event: "homepage_ready-to-get-started",
				category: "Homepage",
				action: "Link",
				label: "award search card"
			})
		},
		{
			fillColor: "#34a37e",
			image: "img/homepage-ready-to-get-started/homepage-get-started-spending-explorer.webp",
			imageHeight: "177px",
			overline: "EXPLORE THE DATA",
			headline: "Break down the federal budget",
			buttonText: "Dive into Spending Explorer",
			buttonLink: "/explorer",
			action: () => Analytics.event({
				event: "homepage_ready-to-get-started",
				category: "Homepage",
				action: "Link",
				label: "spending explorer card"
			})
		},
		{
			fillColor: "#fa9441",
			image: "img/homepage-ready-to-get-started/homepage-get-started-recipient-profiles.webp",
			imageHeight: "177px",
			overline: "EXPLORE THE DATA",
			headline: "Find recipients of federal funds",
			buttonText: "Browse Recipient Profiles",
			buttonLink: "/recipient",
			action: () => Analytics.event({
				event: "homepage_ready-to-get-started",
				category: "Homepage",
				action: "Link",
				label: "spending profiles card"
			})
		},
		{
			fillColor: "#9355dc",
			image: "img/homepage-ready-to-get-started/homepage-get-started-learn-more.webp",
			imageHeight: "177px",
			overline: "FIND RESOURCES",
			headline: "Learn more about USAspending.gov",
			buttonText: "Read about the Data Sources",
			buttonLink: "/data-sources",
			action: () => Analytics.event({
				event: "homepage_ready-to-get-started",
				category: "Homepage",
				action: "Link",
				label: "resources card"
			})
		}
	];
	ReadyToGetStarted = () => /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("section", {
		className: "ready-to-get-started__section",
		children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", {
			style: {
				display: "flex",
				justifyContent: "center"
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)(Qs, {
				className: "grid-content",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)($s, {
					className: "ready-to-get-started__title",
					width: 12,
					children: "Ready to get started?"
				}), /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(Qs, {
					className: "ready-to-get-started__card-row",
					hasGutter: true,
					gutterSize: "lg",
					children: cardObjects.map((card, index) => /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)($s, {
						className: "ready-to-get-started__card",
						mobile: 12,
						tablet: 6,
						desktop: 3,
						children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)(tc, {
							variant: "outline",
							size: "md",
							children: [/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(ac, {
								size: "md",
								variant: "inset",
								fill: card.fillColor,
								imageContainerHeight: card.imageHeight,
								img: card.image
							}), /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(rc, {
								variant: "inset",
								imageContainerHeight: card.imageHeight,
								overline: card.overline,
								headline: card.headline,
								children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)(lc, {
									text: card.buttonText,
									variant: "text",
									buttonSize: "sm",
									backgroundColor: "light",
									textAlignment: "left",
									link: card.buttonLink,
									action: card.action
								})
							})]
						})
					}, index))
				})]
			})
		})
	});
}));
//#endregion
//#region src/js/helpers/homepageFeaturedContentHelper.js
var publishedSprint, publishedDate, partition, fallbackMarketingArticle, fallbackOtherArticle, getOtherArticle, getCurrentArticles;
var init_homepageFeaturedContentHelper = __esmMin((() => {
	init_featuredContentMetadata();
	init_featuredContentHelper();
	publishedSprint = 211;
	publishedDate = "11/13/2025";
	partition = (array, isValid) => array.reduce(([pass, fail], elem) => isValid(elem) ? [[...pass, elem], fail] : [pass, [...fail, elem]], [[], []]);
	fallbackMarketingArticle = {
		title: "Exploring America's Finances",
		fill: "#1b2b85",
		thumbnail_path: "../../img/featuredContent/thumbnails/exploring-americas-finances-thumbnail.webp",
		taxonomy: "Exploring America's Finances",
		slug: "exploring-americas-finances"
	};
	fallbackOtherArticle = {
		title: "What is an Award?",
		fill: "#783cb9",
		thumbnail_path: "../../img/featuredContent/thumbnails/what-is-an-award-thumbnail.webp",
		taxonomy: "Data Definitions",
		slug: "what-is-an-award"
	};
	getOtherArticle = (otherArticleCadence, otherArticles, featureWeekNum, featureSprintNum) => {
		let otherArticle;
		if (otherArticles.length > 0 && otherArticleCadence === "week") otherArticle = otherArticles.filter((article) => article.feature_week === featureWeekNum)[0];
		else if (otherArticles.length > 0 && otherArticleCadence === "sprint") otherArticle = otherArticles.filter((article) => article.feature_sprint - 1 + article.feature_week === featureSprintNum)[0];
		if (!otherArticle) otherArticle = fallbackOtherArticle;
		return otherArticle;
	};
	getCurrentArticles = (otherArticleCadence, dayOneString = publishedDate) => {
		const today = /* @__PURE__ */ new Date();
		const dayOne = new Date(dayOneString);
		const weekDifference = today - dayOne > 0 ? Math.ceil((today - dayOne) / 6048e5) : 1;
		const featureSprintNum = weekDifference > 0 ? Math.ceil(weekDifference / 3) : 1;
		const featureWeekNum = weekDifference - (featureSprintNum - 1) * 3;
		const currentArticles = articles.filter((article) => article.feature_sprint - publishedSprint === featureSprintNum);
		const [marketingArticles, otherArticles] = partition(currentArticles, (article) => article.content_type === "Marketing");
		const [marketingArticle, otherArticle] = [marketingArticles.length > 0 ? marketingArticles[0] : fallbackMarketingArticle, getOtherArticle(otherArticleCadence, otherArticles, featureWeekNum, featureSprintNum)].map((article) => {
			if (article?.title && article?.taxonomy) {
				const titleIndex = article.title.indexOf(":");
				if (titleIndex > 0 && titleIndex + 2 < article.title.length) return {
					url: `/featured-content/${transformString(article.taxonomy)}/${transformString(article.title)}`,
					title: article.title.substring(titleIndex + 2),
					overline: article.title.substring(0, titleIndex),
					...article
				};
				return {
					url: `/featured-content/${transformString(article.taxonomy)}/${transformString(article.title)}`,
					overline: article.taxonomy.toUpperCase(),
					...article
				};
			}
			return article;
		});
		return [marketingArticle, otherArticle];
	};
}));
//#endregion
//#region src/js/components/homepage/FeaturedContent/FeaturedContentCard.jsx
var import_jsx_runtime$5, trackHomePageLink, propTypes$1, FeaturedContentCard;
var init_FeaturedContentCard = __esmMin((() => {
	init_index_es();
	init_Analytics();
	init_ExternalLink();
	import_jsx_runtime$5 = require_jsx_runtime();
	trackHomePageLink = (title, event = "homepage_featured_content_links", category = "Homepage", action = "Link") => {
		if (title) Analytics.event({
			label: title,
			event,
			category,
			action
		});
	};
	propTypes$1 = {
		url: PropTypes.string.isRequired,
		fill: PropTypes.string.isRequired,
		img: PropTypes.string.isRequired,
		taxonomy: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		externalLink: PropTypes.bool
	};
	FeaturedContentCard = ({ url, title, fill, img, taxonomy, externalLink = false }) => {
		const Content = () => /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)(tc, {
			variant: "outline",
			size: "md",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(ac, {
				fill,
				variant: "expanded",
				img
			}), /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(rc, {
				overline: taxonomy?.toUpperCase(),
				headline: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", { children: title })
			})]
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)($s, {
			width: 12,
			desktop: 6,
			tablet: 6,
			mobile: 12,
			children: externalLink ? /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(ExternalLink, {
				isCard: true,
				url,
				children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(Content, {})
			}) : /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("a", {
				href: url,
				target: "_blank",
				rel: "noopener noreferrer",
				onClick: () => trackHomePageLink(title),
				className: "featured-content__section--link",
				children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(Content, {})
			})
		});
	};
	FeaturedContentCard.propTypes = propTypes$1;
}));
//#endregion
//#region src/js/components/homepage/FeaturedContent/FeaturedContent.jsx
var import_jsx_runtime$4, marketingArticle, otherArticle, propTypes, FeaturedContent;
var init_FeaturedContent = __esmMin((() => {
	init_dist();
	init_GlobalConstants();
	init_homepageFeaturedContentHelper();
	init_featuredContentHelper();
	init_FeaturedContentCard();
	import_jsx_runtime$4 = require_jsx_runtime();
	[marketingArticle, otherArticle] = getCurrentArticles(globalConstants.FEATURED_CONTENT_ROTATION);
	propTypes = {
		leftCard: PropTypes.shape({
			url: PropTypes.string.isRequired,
			fill: PropTypes.string.isRequired,
			thumbnail_path: PropTypes.string.isRequired,
			taxonomy: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired
		}),
		rightCard: PropTypes.shape({
			url: PropTypes.string.isRequired,
			fill: PropTypes.string.isRequired,
			thumbnail_path: PropTypes.string.isRequired,
			taxonomy: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired
		})
	};
	FeaturedContent = (({ leftCard = marketingArticle, rightCard = otherArticle }) => /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("section", {
		className: "featured-content__section",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
			className: "featured-content__heading",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
				className: "featured-content__heading--background",
				children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(FontAwesomeIcon, {
					className: "featured-content__heading--icon",
					icon: "bullhorn"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", { children: "Featured Content" })]
		}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
			className: "featured-content__section--flex-row",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(FeaturedContentCard, {
				url: leftCard.url,
				title: leftCard.title,
				fill: getPrimaryFill(leftCard),
				img: getThumbnailPath(leftCard),
				taxonomy: leftCard.taxonomy,
				externalLink: leftCard?.externalLink
			}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(FeaturedContentCard, {
				url: rightCard.url,
				title: rightCard.title,
				fill: getPrimaryFill(rightCard),
				img: getThumbnailPath(rightCard),
				taxonomy: rightCard.taxonomy,
				externalLink: rightCard?.externalLink
			})]
		})]
	}));
	FeaturedContent.propTypes = propTypes;
}));
//#endregion
//#region src/js/components/homepage/WordOfTheDay/ErrorWordOfTheDay.jsx
var import_jsx_runtime$3, ErrorWordOfTheDay;
var init_ErrorWordOfTheDay = __esmMin((() => {
	import_jsx_runtime$3 = require_jsx_runtime();
	ErrorWordOfTheDay = () => /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
		className: "word-of-the-day__error-message",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("p", {
				className: "word-of-the-day-paragraph-one",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("p", {
				className: "word-of-the-day-paragraph-two",
				children: "Sorry, we're unable to load this content."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("button", {
				className: "word-of-the-day-error-button",
				onClick: () => window.location = `mailto:usaspending.help@fiscal.treasury.gov?subject=${encodeURIComponent("Word of the Day Error")}`,
				children: "Report this error"
			})
		]
	});
}));
//#endregion
//#region src/js/components/homepage/WordOfTheDay/WordOfTheDay.jsx
/**
* WordOfTheDay.jsx
* Created by Brian Petway 08/22/22
*/
var import_jsx_runtime$2, WordOfTheDay;
var init_WordOfTheDay = __esmMin((() => {
	init_dist();
	init_index_es();
	init_development();
	init_modern();
	init_glossaryHelper();
	init_Analytics();
	init_Loading();
	init_ErrorWordOfTheDay();
	init_slideoutHelper();
	import_jsx_runtime$2 = require_jsx_runtime();
	WordOfTheDay = () => {
		const [noResults, setNoResults] = useState(false);
		const [term, setTerm] = useState("");
		const [changedTerm, setChangedTerm] = useState("");
		const [definition, setDefinition] = useState("");
		const [glossary, setGlossary] = useState("");
		const [glossarySlug, setGlossarySlug] = useState("");
		const { pathname, search } = useLocation();
		const [currentMonth, setCurrentMonth] = useState(-1);
		const [currentDate, setCurrentDate] = useState(-1);
		const glossaryTerms = [
			"Account Balance (File A)",
			"Account Breakdown by Award (File C)",
			"Account Breakdown by Program Activity & Object Class (File B)",
			"Action Date",
			"Appropriation",
			"Assistance Listings (CFDA Program)",
			"Award",
			"Award Type",
			"Awards Data (File D)",
			"Budget Authority",
			"Budget Function",
			"Budgetary Resources",
			"Contract",
			"Deobligation",
			"Direct Loan",
			"Direct Payment",
			"Disaster Emergency Fund Code (DEFC)",
			"Face Value of Loan",
			"FAIN",
			"Federal Account",
			"Federal Action Obligation",
			"Financial Assistance",
			"Fiscal Year (FY)",
			"Funding Opportunity Number",
			"Grant",
			"Indefinite Delivery Vehicle (IDV)",
			"Insurance",
			"Loan",
			"Loan Subsidy Cost",
			"Multiple Recipients",
			"NAICS",
			"National Interest Action (NIA)",
			"Object Class",
			"Obligation",
			"Other Budgetary Resources",
			"Outlay",
			"Period of Performance Current End Date",
			"Period of Performance Potential End Date",
			"Period of Performance Start Date",
			"Potential Award Amount",
			"Primary Place of Performance",
			"Prime Award",
			"Prime Recipient",
			"Procurement Instrument Identifier (PIID)",
			"Product or Service Code (PSC)",
			"Program Activity",
			"Recipient",
			"Recipient Location",
			"Recipient/Business Types",
			"Redacted Due to PII",
			"Set Aside Type",
			"Spending",
			"Sub-Award",
			"Submission Period",
			"Sub-Recipient",
			"Transaction",
			"Treasury Account Symbol (TAS)",
			"Unique Entity Identifier (UEI)",
			"Unlinked Award",
			"Unobligated Balance",
			"URI"
		];
		const dateDataMapper = {
			0: { startingIndex: 31 },
			1: { startingIndex: 0 },
			2: { startingIndex: 31 },
			3: { startingIndex: 0 },
			4: { startingIndex: 31 },
			5: { startingIndex: 0 },
			6: { startingIndex: 31 },
			7: { startingIndex: 31 },
			8: { startingIndex: 0 },
			9: { startingIndex: 31 },
			10: { startingIndex: 0 },
			11: { startingIndex: 31 }
		};
		const selectWordOfTheDay = () => {
			const d = /* @__PURE__ */ new Date();
			setCurrentDate(d.getUTCDate());
			setCurrentMonth(d.getUTCMonth());
		};
		const { data: allTerms, isSuccess: allTermsSuccess, isLoading: loading, error } = useQuery({
			queryKey: ["allGlossaryTerms"],
			queryFn: () => fetchAllTerms().promise,
			staleTime: 6e4
		});
		useEffect(() => {
			if (allTerms && allTermsSuccess) {
				selectWordOfTheDay();
				setGlossary(allTerms.data.results);
			}
		}, [allTerms, allTermsSuccess]);
		const readMoreAction = () => {
			Analytics.event({
				event: "homepage-word-of-the-day",
				category: "Homepage",
				action: "Link",
				label: "word of the day"
			});
			showSlideout("glossary", { url: glossarySlug });
		};
		useEffect(() => {
			if (currentDate > -1 && currentMonth > -1) {
				let index = dateDataMapper[currentMonth]?.startingIndex + currentDate;
				if (index >= glossaryTerms.length) index = currentDate;
				setTerm(glossaryTerms[index]);
			}
		}, [
			currentDate,
			currentMonth,
			dateDataMapper,
			glossaryTerms
		]);
		useEffect(() => {
			let found = false;
			if (glossary && term) {
				for (const value of glossary) if (value.term?.trim().toLowerCase() === term?.trim().toLowerCase()) {
					setGlossarySlug(value.slug);
					found = true;
					setNoResults(false);
					setDefinition(value.plain);
				}
			}
			if (!found) setNoResults(true);
			if (term === "Account Balance (File A)") setChangedTerm("File A");
			else if (term === "Account Breakdown by Award (File C)") setChangedTerm("File C");
			else if (term === "Account Breakdown by Program Activity & Object Class (File B)") setChangedTerm("File B");
			else if (term === "Period of Performance Current End Date") setChangedTerm("Current End Date");
			else if (term === "Period of Performance Potential End Date") setChangedTerm("Potential End Date");
			else if (term === "Period of Performance Start Date") setChangedTerm("Start Date");
			else if (term === "Procurement Instrument Identifier (PIID)") setChangedTerm("PIID");
		}, [
			glossary,
			pathname,
			search,
			term,
			currentDate,
			currentMonth
		]);
		return /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("section", {
			className: "word-of-the-day__section",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
				className: "word-of-the-day__heading",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
					className: "word-of-the-day__heading--background",
					children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(FontAwesomeIcon, {
						className: "word-of-the-day__heading--icon",
						icon: "lightbulb"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", { children: "Word of the Day" })]
			}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(tc, {
				variant: "outline",
				fill: "#1a4480",
				children: !loading && !noResults && !error ? /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)(import_jsx_runtime$2.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
						className: "word-of-the-day__headline",
						children: changedTerm === "" ? term : changedTerm
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", { className: "word-of-the-day__divider" }),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(rc, {
						customClassName: "word-of-the-day__body",
						children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)(import_jsx_runtime$2.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
							className: "definition",
							children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", { children: definition })
						}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(lc, {
							action: readMoreAction,
							onlyPerformAction: true,
							variant: "secondary",
							backgroundColor: "dark",
							customClassName: "word-of-the-day__button",
							children: "Read More"
						})] })
					})
				] }) : /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(rc, {
					customClassName: "card__body_error",
					children: loading ? /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(LoadingWrapper, { isLoading: loading }) : /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(ErrorWordOfTheDay, {})
				})
			})]
		});
	};
}));
//#endregion
//#region src/js/components/homepage/HomepageFirstRow/HomepageFirstRow.jsx
var import_jsx_runtime$1, HomepageFirstRow;
var init_HomepageFirstRow = __esmMin((() => {
	init_index_es();
	init_FeaturedContent();
	init_WordOfTheDay();
	import_jsx_runtime$1 = require_jsx_runtime();
	HomepageFirstRow = () => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
		className: "grid-content",
		children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
			className: "featured-word-of-the-day-row",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)($s, {
				width: 8,
				mobile: 12,
				tablet: 12,
				desktop: 8,
				children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(FeaturedContent, {})
			}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)($s, {
				width: 12,
				mobile: 12,
				tablet: 12,
				desktop: 4,
				children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(WordOfTheDay, {})
			})]
		})
	});
}));
//#endregion
//#region src/_scss/pages/homepage/homepage.scss
var require_homepage = /* @__PURE__ */ __commonJSMin((() => {}));
//#endregion
//#region src/js/components/homepage/Homepage.jsx
/**
* Homepage.jsx
* Created by Brian Petway 08/22/22
*/
var import_jsx_runtime, Homepage;
//#endregion
__esmMin((() => {
	init_js_cookie();
	init_PageWrapper();
	init_metaTagHelper();
	init_Hero();
	init_SummaryStats();
	init_AwardSearch();
	init_HomepageExploreToggle();
	init_HomepageResources();
	init_ReadyToGetStarted();
	init_HomepageFirstRow();
	import_jsx_runtime = require_jsx_runtime();
	require_homepage();
	Homepage = () => {
		useEffect(() => {
			api.set("homepage_to_query_time", (/* @__PURE__ */ new Date()).getTime(), { expires: 14 });
		}, []);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageWrapper, {
			pageName: "Homepage",
			classNames: "usa-da-home-page",
			noHeader: true,
			metaTagProps: { ...homePageMetaTags },
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				id: "main-content",
				className: "main-content homepage-update-content",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryStats, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomepageFirstRow, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AwardSearch, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomepageExploreToggle, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomepageResources, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReadyToGetStarted, {})
				]
			})
		});
	};
}))();
export { Homepage as default };
