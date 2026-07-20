const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./awarding-agency-vs-funding-agency-yDaZxD6I.js","./rolldown-runtime-D1cXj70v.js","./index.js-Dk2VDaPz.js","./index-DeVJJSux.css","./bringing-data-to-life-BeD1GsH_.js","./building-america-250-years-of-investment-DUSyaJ1P.js","./celebrating-small-business-week-BAlur-PF.js","./discover-how-government-spending-supports-causes-you-care-about-BRKDCo0S.js","./exploring-americas-finances-BIEa7ZeP.js","./exploring-spending-in-your-community-deNClP7z.js","./government-financial-transparency-from-parchment-to-digital-data-k0q252mA.js","./grants-vs-contracts-DNOdrGXC.js","./johns-usaspending-search-NNGnQuG1.js","./keons-usaspending-search-vHQayS97.js","./michaels-usaspending-search-za0QwOlC.js","./obligations-vs-outlays-DyOYyEiz.js","./preserving-americas-story-DGq_6Mo2.js","./qat-only-test-OLpDfb3f.js","./the-story-of-spending-transparency-TAM8eoQv.js","./understanding-four-government-data-source-systems-DfFfIwBv.js","./understanding-our-trusted-data-CLRs9iN0.js","./using-popular-filters-on-usaspendinggov-Cm63OXhu.js","./ways-to-use-our-data-DCB5fOue.js","./what-is-a-loan-DAPy5lYa.js","./what-is-a-recipient-OvlDCzlH.js","./what-is-an-award-B0JSFsZh.js"])))=>i.map(i=>d[i]);
import { n as __esmMin } from "./rolldown-runtime-D1cXj70v.js";
import { Ga as useLocation, Ha as Link, Kr as FontAwesomeIcon, Mr as fo, Nr as init_index_es, Ua as Navigate, Va as init_development, Xa as __vitePreload, Za as init_preload_helper, cr as init_socialShare, dt as AboutTheDataLink, et as ExternalLink, fn as init_modalActions, ft as init_AboutTheDataLink, go as require_jsx_runtime, gr as $s, ja as init_mobileBreakpoints, lr as newSocialShareOptions, no as init_es, oo as useDispatch, or as getBaseUrl, pn as showModal, qr as init_dist, sr as handleShareOptionClick, tt as init_ExternalLink, wr as Qs } from "./index.js-Dk2VDaPz.js";
import { D as init_metaTagHelper, E as homePageMetaTags } from "./HeaderContainer-CiRwnRgy.js";
import { n as init_PageWrapper, t as PageWrapper } from "./PageWrapper-Dqa3KwTb.js";
import { n as init_GlossaryLink, t as GlossaryLink } from "./GlossaryLink-CffoixM2.js";
import { c as transformString, i as getSecondaryFill, n as CustomImg, o as init_featuredContentHelper, r as getPrimaryFill, t as CustomA } from "./featuredContentHelper-CmgWI1Hc.js";
import { n as init_featuredContentMetadata, t as articles } from "./featuredContentMetadata-DpeBgoHT.js";
import { t as require_featuredContent } from "./featuredContent-DYn74408.js";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { throttle } from "lodash-es";
//#region \0rolldown_dynamic_import_helper.js
var _rolldown_dynamic_import_helper_default;
var init__rolldown_dynamic_import_helper = __esmMin((() => {
	_rolldown_dynamic_import_helper_default = (glob, path, segments) => {
		const query = path.lastIndexOf("?");
		const v = glob[query === -1 || query < path.lastIndexOf("/") ? path : path.slice(0, query)];
		if (v) return typeof v === "function" ? v() : Promise.resolve(v);
		return new Promise((_, reject) => {
			(typeof queueMicrotask === "function" ? queueMicrotask : setTimeout)(reject.bind(null, /* @__PURE__ */ new Error("Unknown variable dynamic import: " + path + (path.split("/").length !== segments ? ". Note that variables only represent file names one level deep." : ""))));
		});
	};
}));
//#endregion
//#region src/js/components/featuredContent/ExploreMore.jsx
var import_jsx_runtime$5, propTypes$3, ExploreMore;
var init_ExploreMore = __esmMin((() => {
	init_index_es();
	init_development();
	init_dist();
	init_ExternalLink();
	import_jsx_runtime$5 = require_jsx_runtime();
	propTypes$3 = {
		header: PropTypes.string,
		citations: PropTypes.array
	};
	ExploreMore = (props) => {
		const truncateText = (input, maxLen) => {
			if (input.length <= maxLen) return input;
			return `${input.substring(0, maxLen - 3)}...`;
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)(import_jsx_runtime$5.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("span", {
			className: "featured-content__citation-heading",
			children: props.header
		}), /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(Qs, {
			hasGutter: true,
			gutterSize: "lg",
			className: "featured-content__citation-wrapper",
			children: props.citations?.map((citation, index) => /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)($s, {
				mobile: 10,
				tablet: 5,
				desktop: 12,
				className: "featured-content__citation",
				children: citation.type === "external" ? /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(import_jsx_runtime$5.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(ExternalLink, {
					isCard: true,
					url: citation.slug,
					children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("span", { children: truncateText(citation.label, 55) }), /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(FontAwesomeIcon, {
						icon: "external-link-alt",
						className: "featured-content__icon"
					})] })
				}) }) : /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(import_jsx_runtime$5.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(Link, {
					to: citation.slug,
					children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("span", { children: truncateText(citation.label, 55) }) })
				}) })
			}, `featured-content__citation-${index}`))
		})] });
	};
	ExploreMore.propTypes = propTypes$3;
}));
//#endregion
//#region src/js/components/featuredContent/RelatedTerms.jsx
var import_jsx_runtime$4, propTypes$2, RelatedTerms;
var init_RelatedTerms = __esmMin((() => {
	init_index_es();
	init_GlossaryLink();
	init_AboutTheDataLink();
	import_jsx_runtime$4 = require_jsx_runtime();
	propTypes$2 = {
		header: PropTypes.string,
		citations: PropTypes.array
	};
	RelatedTerms = (props) => /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)(import_jsx_runtime$4.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
		className: "featured-content__citation-heading",
		children: props.header
	}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(Qs, {
		className: "featured-content__citation-wrapper",
		children: props.citations?.map((citation, index) => /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)($s, {
			mobile: 12,
			tablet: 4,
			desktop: 12,
			className: "featured-content__citation",
			children: citation.type === "glossary" ? /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(GlossaryLink, {
				term: citation.term,
				label: citation.label,
				displayIcon: false
			}) : /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(AboutTheDataLink, {
				slug: citation.term,
				children: citation.label
			})
		}, `featured-content__citation-${index}`))
	})] });
	RelatedTerms.propTypes = propTypes$2;
}));
//#endregion
//#region src/js/components/featuredContent/InlineShare.jsx
var import_jsx_runtime$3, propTypes$1, InlineShare;
var init_InlineShare = __esmMin((() => {
	init_index_es();
	init_socialShare();
	import_jsx_runtime$3 = require_jsx_runtime();
	propTypes$1 = {
		url: PropTypes.string,
		classNames: PropTypes.string,
		onShareOptionClick: PropTypes.func.isRequired,
		onKeyUp: PropTypes.func.isRequired,
		includedDropdownOptions: PropTypes.arrayOf(PropTypes.string)
	};
	InlineShare = ({ includedDropdownOptions = [], classNames = "", onShareOptionClick = () => {} }) => {
		const socialShareOptions = newSocialShareOptions.filter(({ name }) => {
			if (!includedDropdownOptions.length) return true;
			return includedDropdownOptions.includes(name);
		}).map((option) => ({
			...option,
			onClick: () => onShareOptionClick(option.name)
		}));
		return /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
			className: classNames,
			children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
				className: "featured-content__citation-heading",
				children: "Share this page"
			}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Qs, {
				className: "featured-content__share-wrapper",
				children: socialShareOptions.map((option) => /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)($s, {
					mobile: 12,
					desktop: 12,
					tablet: 2,
					className: "featured-content__share-option",
					children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
						className: "featured-content__share-button",
						role: "button",
						tabIndex: 0,
						onClick: option.onClick,
						onKeyUp: (e) => {
							if (e.key === "Enter") option.onClick();
						},
						children: option.component ? option.component : option.name
					})
				}))
			})]
		});
	};
	InlineShare.propTypes = propTypes$1;
	InlineShare.displayName = "Inline Share Menu";
}));
//#endregion
//#region src/js/components/featuredContent/FeaturedContentArticleSidebar.jsx
var import_jsx_runtime$2, propTypes, FeaturedContentArticleSidebar;
var init_FeaturedContentArticleSidebar = __esmMin((() => {
	init_index_es();
	init_socialShare();
	init_es();
	init_ExploreMore();
	init_RelatedTerms();
	init_InlineShare();
	init_modalActions();
	init_featuredContentHelper();
	import_jsx_runtime$2 = require_jsx_runtime();
	propTypes = { chosenArticle: PropTypes.object.isRequired };
	FeaturedContentArticleSidebar = ({ chosenArticle }) => {
		const slug = `/featured-content/${transformString(chosenArticle?.content_type)}/${transformString(chosenArticle?.title)}`;
		const dispatch = useDispatch();
		const handleShareDispatch = (url) => {
			dispatch(showModal(url));
		};
		const onShareClick = (optionName, url) => {
			const emailSubject = `${chosenArticle.banner_title}`;
			handleShareOptionClick(optionName, url, {
				subject: encodeURIComponent(`${emailSubject}`),
				body: `Check out this article from USAspending.gov: ${getBaseUrl(slug)}`
			}, handleShareDispatch);
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)($s, {
			tablet: 12,
			mobile: 12,
			desktop: 4,
			className: "featured-content__column-two",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(InlineShare, {
					onShareOptionClick: (name) => onShareClick(name, slug),
					url: getBaseUrl(slug)
				}),
				chosenArticle?.related_terms.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(RelatedTerms, {
					header: "Related Terms",
					citations: chosenArticle?.related_terms
				}),
				chosenArticle?.explore_more.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(ExploreMore, {
					header: "Explore More",
					citations: chosenArticle?.explore_more
				})
			]
		});
	};
	FeaturedContentArticleSidebar.propTypes = propTypes;
}));
//#endregion
//#region src/js/components/featuredContent/FeaturedContentHeader.jsx
var import_jsx_runtime$1, heroPath, FeaturedContentHeader;
var init_FeaturedContentHeader = __esmMin((() => {
	init_index_es();
	init_featuredContentHelper();
	import_jsx_runtime$1 = require_jsx_runtime();
	heroPath = "../../img/featuredContent/banner/desktop/banner-";
	FeaturedContentHeader = ({ isMobile, isTablet, chosenArticle }) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)(Qs, {
		className: "featured-content__header-wrapper",
		style: { backgroundColor: (isMobile || isTablet) && getPrimaryFill(chosenArticle) },
		children: [!isMobile && !isTablet && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("img", {
			src: chosenArticle?.slug ? `${heroPath}${chosenArticle?.slug}.webp` : null,
			alt: "hero",
			name: "featured-content-hero",
			id: "featured-content-hero"
		}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)($s, {
			desktopxl: {
				span: 4,
				offset: 1
			},
			desktop: {
				span: 5,
				offset: 1
			},
			tablet: {
				span: 10,
				offset: 2
			},
			mobile: {
				span: 10,
				offset: 1
			},
			className: `featured-content__header-block usa-dt-flex-grid__row ${chosenArticle?.black_text ? "black-text" : ""}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
					className: "featured-content__label",
					style: { backgroundColor: getSecondaryFill(chosenArticle) },
					children: chosenArticle?.taxonomy
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
					className: "featured-content__title",
					children: chosenArticle?.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
					className: "featured-content__subtitle",
					children: chosenArticle?.banner_subtitle
				})
			]
		})]
	});
}));
//#endregion
//#region src/js/components/featuredContent/FeaturedContentArticle.jsx
var import_jsx_runtime, components, FeaturedContentArticle;
//#endregion
__esmMin((() => {
	init__rolldown_dynamic_import_helper();
	init_index_es();
	init_development();
	init_metaTagHelper();
	init_PageWrapper();
	init_mobileBreakpoints();
	init_featuredContentHelper();
	init_GlossaryLink();
	init_FeaturedContentArticleSidebar();
	init_featuredContentMetadata();
	init_FeaturedContentHeader();
	import_jsx_runtime = require_jsx_runtime();
	init_preload_helper();
	require_featuredContent();
	components = {
		GlossaryLink,
		a: CustomA,
		img: CustomImg
	};
	FeaturedContentArticle = () => {
		const [windowWidth, setWindowWidth] = useState(0);
		const [isTablet, setIsTablet] = useState(window.innerWidth < 992 && window.innerWidth >= 768);
		const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
		const parts = useLocation().pathname.split("/");
		const lastPortion = parts[parts.length - 1];
		const [chosenArticle, setChosenArticle] = useState(null);
		const [MarkdownContent, setMarkdownContent] = useState(null);
		const [isInfographicTemplate, setIsInfographicTemplate] = useState(false);
		const [sections, setSections] = useState([]);
		const [activeSection, setActiveSection] = useState([]);
		const [isFound, setIsFound] = useState(false);
		const jumpToSection = (section = "") => {
			const sectionDom = document.querySelector(`#featured-content-article-${section}`);
			if (!sectionDom) return;
			setActiveSection(section);
			const sectionTop = sectionDom.offsetTop;
			window.scrollTo({
				top: sectionTop + 60,
				left: 0,
				behavior: "smooth"
			});
		};
		useEffect(() => {
			for (const article of articles) if (transformString(article.title) === lastPortion) {
				setIsFound(true);
				setChosenArticle(article);
				setIsInfographicTemplate(Object.prototype.hasOwnProperty.call(article, "isInfographicTemplate") ? article.isInfographicTemplate : false);
				const tempSections = [];
				for (let i = 0; i < article?.sections?.length; i++) tempSections.push({
					section: transformString(article?.sections[i]),
					label: article?.sections[i]
				});
				if (tempSections?.length > 0) setSections(tempSections);
				else setSections([{
					section: "",
					label: ""
				}]);
			}
		}, [lastPortion]);
		useEffect(() => {
			const handleResize = throttle(() => {
				if (windowWidth !== window.innerWidth) {
					setWindowWidth(window.innerWidth);
					setIsTablet(window.innerWidth < 992 && window.innerWidth >= 768);
					setIsMobile(window.innerWidth < 768);
				}
			}, 100);
			window.addEventListener("resize", handleResize);
			return () => window.removeEventListener("resize", handleResize);
		}, [windowWidth]);
		useEffect(() => {
			const fetchMarkdown = async () => {
				const file = await _rolldown_dynamic_import_helper_default(/* #__PURE__ */ Object.assign({
					"../../../content/featuredContent/awarding-agency-vs-funding-agency.mdx": () => __vitePreload(() => import("./awarding-agency-vs-funding-agency-yDaZxD6I.js"), __vite__mapDeps([0,1,2,3]), import.meta.url),
					"../../../content/featuredContent/bringing-data-to-life.mdx": () => __vitePreload(() => import("./bringing-data-to-life-BeD1GsH_.js"), __vite__mapDeps([4,1,2,3]), import.meta.url),
					"../../../content/featuredContent/building-america-250-years-of-investment.mdx": () => __vitePreload(() => import("./building-america-250-years-of-investment-DUSyaJ1P.js"), __vite__mapDeps([5,1,2,3]), import.meta.url),
					"../../../content/featuredContent/celebrating-small-business-week.mdx": () => __vitePreload(() => import("./celebrating-small-business-week-BAlur-PF.js"), __vite__mapDeps([6,1,2,3]), import.meta.url),
					"../../../content/featuredContent/discover-how-government-spending-supports-causes-you-care-about.mdx": () => __vitePreload(() => import("./discover-how-government-spending-supports-causes-you-care-about-BRKDCo0S.js"), __vite__mapDeps([7,1,2,3]), import.meta.url),
					"../../../content/featuredContent/exploring-americas-finances.mdx": () => __vitePreload(() => import("./exploring-americas-finances-BIEa7ZeP.js"), __vite__mapDeps([8,1,2,3]), import.meta.url),
					"../../../content/featuredContent/exploring-spending-in-your-community.mdx": () => __vitePreload(() => import("./exploring-spending-in-your-community-deNClP7z.js"), __vite__mapDeps([9,1,2,3]), import.meta.url),
					"../../../content/featuredContent/government-financial-transparency-from-parchment-to-digital-data.mdx": () => __vitePreload(() => import("./government-financial-transparency-from-parchment-to-digital-data-k0q252mA.js"), __vite__mapDeps([10,1,2,3]), import.meta.url),
					"../../../content/featuredContent/grants-vs-contracts.mdx": () => __vitePreload(() => import("./grants-vs-contracts-DNOdrGXC.js"), __vite__mapDeps([11,1,2,3]), import.meta.url),
					"../../../content/featuredContent/johns-usaspending-search.mdx": () => __vitePreload(() => import("./johns-usaspending-search-NNGnQuG1.js"), __vite__mapDeps([12,1,2,3]), import.meta.url),
					"../../../content/featuredContent/keons-usaspending-search.mdx": () => __vitePreload(() => import("./keons-usaspending-search-vHQayS97.js"), __vite__mapDeps([13,1,2,3]), import.meta.url),
					"../../../content/featuredContent/michaels-usaspending-search.mdx": () => __vitePreload(() => import("./michaels-usaspending-search-za0QwOlC.js"), __vite__mapDeps([14,1,2,3]), import.meta.url),
					"../../../content/featuredContent/obligations-vs-outlays.mdx": () => __vitePreload(() => import("./obligations-vs-outlays-DyOYyEiz.js"), __vite__mapDeps([15,1,2,3]), import.meta.url),
					"../../../content/featuredContent/preserving-americas-story.mdx": () => __vitePreload(() => import("./preserving-americas-story-DGq_6Mo2.js"), __vite__mapDeps([16,1,2,3]), import.meta.url),
					"../../../content/featuredContent/qat-only-test.mdx": () => __vitePreload(() => import("./qat-only-test-OLpDfb3f.js"), __vite__mapDeps([17,1,2,3]), import.meta.url),
					"../../../content/featuredContent/the-story-of-spending-transparency.mdx": () => __vitePreload(() => import("./the-story-of-spending-transparency-TAM8eoQv.js"), __vite__mapDeps([18,1,2,3]), import.meta.url),
					"../../../content/featuredContent/understanding-four-government-data-source-systems.mdx": () => __vitePreload(() => import("./understanding-four-government-data-source-systems-DfFfIwBv.js"), __vite__mapDeps([19,1,2,3]), import.meta.url),
					"../../../content/featuredContent/understanding-our-trusted-data.mdx": () => __vitePreload(() => import("./understanding-our-trusted-data-CLRs9iN0.js"), __vite__mapDeps([20,1,2,3]), import.meta.url),
					"../../../content/featuredContent/using-popular-filters-on-usaspendinggov.mdx": () => __vitePreload(() => import("./using-popular-filters-on-usaspendinggov-Cm63OXhu.js"), __vite__mapDeps([21,1,2,3]), import.meta.url),
					"../../../content/featuredContent/ways-to-use-our-data.mdx": () => __vitePreload(() => import("./ways-to-use-our-data-DCB5fOue.js"), __vite__mapDeps([22,1,2,3]), import.meta.url),
					"../../../content/featuredContent/what-is-a-loan.mdx": () => __vitePreload(() => import("./what-is-a-loan-DAPy5lYa.js"), __vite__mapDeps([23,1,2,3]), import.meta.url),
					"../../../content/featuredContent/what-is-a-recipient.mdx": () => __vitePreload(() => import("./what-is-a-recipient-OvlDCzlH.js"), __vite__mapDeps([24,1,2,3]), import.meta.url),
					"../../../content/featuredContent/what-is-an-award.mdx": () => __vitePreload(() => import("./what-is-an-award-B0JSFsZh.js"), __vite__mapDeps([25,1,2,3]), import.meta.url)
				}), `../../../content/featuredContent/${chosenArticle.slug}.mdx`, 6);
				setMarkdownContent(() => file.default || file);
			};
			if (chosenArticle !== null) fetchMarkdown();
		}, [chosenArticle]);
		const setNoHeader = () => {
			if (!isFound) return false;
			if (!isInfographicTemplate) return true;
			return false;
		};
		const Hero = () => {
			if (isInfographicTemplate) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, {});
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeaturedContentHeader, {
				isMobile,
				isTablet,
				chosenArticle
			});
		};
		const InfographicHero = () => {
			if (isInfographicTemplate) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "infographic-featured-content__header-block",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: `featured-content__label ${chosenArticle?.black_text ? "black-text" : ""}`,
					style: { backgroundColor: getPrimaryFill(chosenArticle) },
					children: chosenArticle?.taxonomy
				})
			});
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, {});
		};
		const Article = () => {
			if (chosenArticle && typeof MarkdownContent === "function") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarkdownContent, { components });
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, {});
		};
		const PageContent = () => {
			if (!isFound) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(fo, {});
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Qs, {
				desktop: 12,
				className: "grid-content featured-content__article-body",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)($s, {
					tablet: 12,
					mobile: 12,
					desktop: 8,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfographicHero, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "featured-content__article-title",
							children: chosenArticle?.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "featured-content__last-updated",
							children: ["Last Updated: ", chosenArticle?.created_date]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Article, {})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeaturedContentArticleSidebar, { chosenArticle })]
			})] });
		};
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [chosenArticle?.hidden && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/404" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageWrapper, {
			pageName: "featured-content-article",
			classNames: "featured-content-page",
			noHeader: setNoHeader(),
			backgroundColor: isInfographicTemplate ? getPrimaryFill(chosenArticle) : `rgb(26, 68, 128)`,
			sections,
			activeSection,
			jumpToSection,
			inPageNav: isInfographicTemplate && sections?.length > 2 && chosenArticle && typeof MarkdownContent === "function",
			metaTagProps: { ...homePageMetaTags },
			rootMargin: "-240px 0px 0px 0px",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				id: "main-content",
				className: "main-content featured-content",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageContent, {})
			})
		})] });
	};
}))();
export { FeaturedContentArticle as default };
