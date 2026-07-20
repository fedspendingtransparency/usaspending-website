import { n as __esmMin } from "./rolldown-runtime-D1cXj70v.js";
import { Dr as Xa, Hr as tc, Lr as rc, Nr as init_index_es, dr as Analytics, fr as init_Analytics, go as require_jsx_runtime, gr as $s, kr as ac, wr as Qs } from "./index.js-Dk2VDaPz.js";
import { D as init_metaTagHelper, E as homePageMetaTags } from "./HeaderContainer-CiRwnRgy.js";
import { n as init_PageWrapper, t as PageWrapper } from "./PageWrapper-Dqa3KwTb.js";
import { n as init_BannerPageHeader, t as BannerPageHeader } from "./BannerPageHeader-DCwSVutm.js";
import { a as getThumbnailPath, c as transformString, o as init_featuredContentHelper, r as getPrimaryFill, s as transformDate } from "./featuredContentHelper-CmgWI1Hc.js";
import { n as init_featuredContentMetadata, t as articles } from "./featuredContentMetadata-DpeBgoHT.js";
import { t as require_featuredContent } from "./featuredContent-DYn74408.js";
import { useEffect, useRef, useState } from "react";
import PropTypes, { oneOfType } from "prop-types";
//#region src/js/models/v2/featuredContent/ArticleMetadata.js
var ArticleMetadata;
var init_ArticleMetadata = __esmMin((() => {
	init_featuredContentHelper();
	ArticleMetadata = {
		populate(data) {
			this.content_type = data.content_type || "";
			this.taxonomy = data.taxonomy || "";
			this.fill = data.fill || "";
			this.title = data.title || "";
			this.banner_subtitle = data.banner_subtitle || "";
			this.created_date = data.created_date || "";
			this.description = data.description || "";
			this.hero = data.hero || "";
			this.slug = data.slug || "";
			this.explore_more = data.explore_more || "";
			this.related_terms = data.related_terms || "";
			this.hidden = data.hidden || "";
			this.isInfographicTemplate = data.isInfographicTemplate || "";
		},
		get publishedAt() {
			return transformDate(this.created_date);
		}
	};
}));
//#endregion
//#region src/js/components/featuredContent/articleCard/ArticleThumbnail.jsx
var import_jsx_runtime$3, propTypes$2, ArticleThumbnail;
var init_ArticleThumbnail = __esmMin((() => {
	init_index_es();
	import_jsx_runtime$3 = require_jsx_runtime();
	propTypes$2 = {
		thumbnailUrl: PropTypes.string,
		title: PropTypes.string
	};
	ArticleThumbnail = ({ thumbnailUrl, title }) => /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Qs, { children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)($s, {
		width: 12,
		className: "video-thumbnail__column-container",
		children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("img", {
			src: thumbnailUrl,
			title,
			alt: title
		})
	}) });
	ArticleThumbnail.propTypes = propTypes$2;
}));
//#endregion
//#region src/js/hooks/useIntersectionObserver.jsx
var useIntersectionObserver;
var init_useIntersectionObserver = __esmMin((() => {
	useIntersectionObserver = ({ freezeOnceVisible = false, initialIsIntersecting = false, onChange, root = null, rootMargin = "0%", threshold = 0 }) => {
		const [ref, setRef] = useState(null);
		const [state, setState] = useState(() => ({
			isIntersecting: initialIsIntersecting,
			entry: void 0
		}));
		const callbackRef = useRef();
		callbackRef.current = onChange;
		const frozen = state.entry?.isIntersecting && freezeOnceVisible;
		useEffect(() => {
			if (!ref) return;
			if (!("IntersectionObserver" in window)) return;
			if (frozen) return;
			let unobserve;
			const observer = new IntersectionObserver((entries) => {
				const thresholds = Array.isArray(observer.thresholds) ? observer.thresholds : [observer.thresholds];
				entries.forEach((entry) => {
					const isIntersecting = entry.isIntersecting && thresholds.some((th) => entry.intersectionRatio >= th);
					setState({
						isIntersecting,
						entry
					});
					if (callbackRef.current) callbackRef.current(isIntersecting, entry);
					if (isIntersecting && freezeOnceVisible && unobserve) {
						unobserve();
						unobserve = void 0;
					}
				});
			}, {
				threshold,
				root,
				rootMargin
			});
			observer.observe(ref);
			return () => {
				observer.disconnect();
			};
		}, [
			ref,
			JSON.stringify(threshold),
			root,
			rootMargin,
			frozen,
			freezeOnceVisible
		]);
		const prevRef = useRef(null);
		useEffect(() => {
			if (!ref && state.entry?.target && !freezeOnceVisible && !frozen && prevRef.current !== state.entry.target) {
				prevRef.current = state.entry.target;
				setState({
					isIntersecting: initialIsIntersecting,
					entry: void 0
				});
			}
		}, [
			ref,
			state.entry,
			freezeOnceVisible,
			frozen,
			initialIsIntersecting
		]);
		const result = [
			setRef,
			!!state.isIntersecting,
			state.entry
		];
		result.ref = result[0];
		result.isIntersecting = result[1];
		result.entry = result[2];
		return result;
	};
}));
//#endregion
//#region src/js/components/featuredContent/articleCard/ArticleCard.jsx
/**
* ArticleCard.jsx
* Created by Andrea Blackwell 12/20/22
*/
var import_jsx_runtime$2, propTypes$1, ArticleCard;
var init_ArticleCard = __esmMin((() => {
	init_index_es();
	init_ArticleThumbnail();
	init_useIntersectionObserver();
	init_Analytics();
	import_jsx_runtime$2 = require_jsx_runtime();
	propTypes$1 = {
		title: PropTypes.string,
		description: PropTypes.string,
		onClick: PropTypes.func,
		onKeyUp: PropTypes.func,
		thumbnailUrl: PropTypes.string,
		publishedAt: PropTypes.string,
		fill: PropTypes.string,
		url: oneOfType([PropTypes.string, PropTypes.func])
	};
	ArticleCard = ({ title, onClick, description, onKeyUp, thumbnailUrl, fill, publishedAt, taxonomy }) => {
		const { ref, isIntersecting } = useIntersectionObserver({
			threshold: .75,
			freezeOnceVisible: true
		});
		useEffect(() => {
			if (isIntersecting) Analytics.event({
				event: "dap_event",
				category: "USAspending – Featured Content",
				action: "Card Viewed",
				label: `${title}`
			});
		}, [isIntersecting, title]);
		const overline = taxonomy.toUpperCase();
		return /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
			ref,
			children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)(tc, {
				variant: "outline",
				size: "md",
				tabIndex: "0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(ac, {
					variant: "expanded",
					thumbnail: true,
					fill,
					onClick,
					onKeyUp,
					children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(ArticleThumbnail, {
						thumbnailUrl,
						title
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(rc, {
					overline,
					headline: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
						className: "article-card__headline",
						onClick,
						children: title
					}) }),
					text: description,
					children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
						className: "list-of-articles__inline",
						children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
							className: "article-card__metadiv",
							children: publishedAt
						})
					})
				})]
			})
		});
	};
	ArticleCard.propTypes = propTypes$1;
}));
//#endregion
//#region src/js/components/featuredContent/list/ArticleList.jsx
/**
* ArticleList.jsx
* Created by Andrea Blackwell 9/15/25
*/
var import_jsx_runtime$1, propTypes, ArticleList;
var init_ArticleList = __esmMin((() => {
	init_index_es();
	init_featuredContentHelper();
	init_Analytics();
	init_ArticleCard();
	import_jsx_runtime$1 = require_jsx_runtime();
	propTypes = { articles: PropTypes.array };
	ArticleList = ({ articles }) => {
		const [sortOrder, setSortOrder] = useState();
		const [articleList, setArticleList] = useState(articles.filter((article) => !article?.hidden));
		const originalArticleList = articles.filter((article) => !article?.hidden);
		const prevSortRef = useRef();
		useEffect(() => {
			setSortOrder("Newest");
		}, []);
		useEffect(() => {
			const tmpArticles = [...originalArticleList];
			if (prevSortRef.current === sortOrder) return;
			prevSortRef.current = sortOrder;
			if (sortOrder === "Newest") tmpArticles.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
			if (sortOrder === "Oldest") tmpArticles.sort((a, b) => new Date(a.created_date) - new Date(b.created_date));
			setArticleList(tmpArticles);
		}, [originalArticleList, sortOrder]);
		const sortBy = () => {
			[...originalArticleList].sort((a, b) => b.value > a.value);
		};
		const onClick = (e, newUrl, title) => {
			e.persist();
			window.open(newUrl, "_self");
			Analytics.event({
				event: "dap_event",
				category: "Featured Content",
				action: "Card Clicked",
				label: `${title}`
			});
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("section", {
			className: "list-of-articles__section",
			children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
				className: "grid-content",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Qs, {
					className: "list-of-articles__sort",
					children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)($s, {
						width: 12,
						className: "article-sort",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
							className: "article-sort-label",
							children: "Sort By: "
						}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Xa, {
							className: "article-sort-list",
							sortFn: sortBy,
							options: [{
								name: "Newest",
								value: "0",
								onClick: () => {
									setSortOrder("Newest");
								}
							}, {
								name: "Oldest",
								value: 1,
								onClick: () => {
									setSortOrder("Oldest");
								}
							}],
							dropdownDirection: "right",
							backgroundColor: "#ffffff",
							selectedOption: sortOrder
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Qs, {
					hasGutter: true,
					gutterSize: "lg",
					children: articleList.map((article) => {
						const newUrl = `/featured-content/${transformString(article.taxonomy)}/${transformString(article.title)}`;
						return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)($s, {
							desktopxl: 4,
							desktop: 4,
							tablet: 6,
							mobile: 12,
							className: "list-of-articles__article",
							children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ArticleCard, {
								onKeyUp: (e) => {
									e.persist();
									if (e.key === "Enter" && e.target.className !== "usa-dt-picker__button" && !e.target.className.includes("text")) window.open(newUrl, "_self");
								},
								tabIndex: "0",
								taxonomy: article.taxonomy,
								title: article.title,
								description: article.description,
								thumbnailUrl: getThumbnailPath(article),
								fill: getPrimaryFill(article),
								publishedAt: article.publishedAt,
								onClick: (e) => onClick(e, newUrl, article.title)
							})
						});
					})
				})]
			})
		});
	};
	ArticleList.propTypes = propTypes;
}));
//#endregion
//#region src/js/components/featuredContent/FeaturedContentPage.jsx
var import_jsx_runtime, FeaturedContentPage;
//#endregion
__esmMin((() => {
	init_PageWrapper();
	init_ArticleMetadata();
	init_featuredContentMetadata();
	init_ArticleList();
	init_metaTagHelper();
	init_BannerPageHeader();
	import_jsx_runtime = require_jsx_runtime();
	require_featuredContent();
	FeaturedContentPage = () => {
		const articlesList = [];
		articles.forEach((item) => {
			const articleMetadata = Object.create(ArticleMetadata);
			if (item.feature_week > 0) {
				articleMetadata.populate(item);
				articlesList.push(articleMetadata);
			}
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageWrapper, {
			pageName: "Featured Content",
			classNames: "featured-content-page",
			noHeader: true,
			metaTagProps: { ...homePageMetaTags },
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				id: "main-content",
				className: "main-content featured-content",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BannerPageHeader, {
					className: "content-page-header",
					kicker: "RESOURCES",
					title: "Featured Content",
					body: "Read the latest featured content to learn more about government spending.",
					faIcon: "chart-simple",
					primaryColor: "#0B4778",
					secondaryColor: "#005EA2"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArticleList, { articles: articlesList })]
			})
		});
	};
}))();
export { FeaturedContentPage as default };
