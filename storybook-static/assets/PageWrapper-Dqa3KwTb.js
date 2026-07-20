import { n as __esmMin } from "./rolldown-runtime-D1cXj70v.js";
import { Cr as Ps, Kn as getStickyBreakPointForSidebar, Kr as FontAwesomeIcon, Nr as init_index_es, go as require_jsx_runtime, i as init_Footer, ja as init_mobileBreakpoints, qn as init_stickyHeaderHelper, qr as init_dist, r as Footer_default } from "./index.js-Dk2VDaPz.js";
import { i as init_MetaTags, n as init_HeaderContainer, r as MetaTags, t as HeaderContainer_default } from "./HeaderContainer-CiRwnRgy.js";
import React, { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { throttle } from "lodash-es";
//#region src/js/helpers/inPageNavHelper.js
var checkIsOverflow, getElementData, reset;
var init_inPageNavHelper = __esmMin((() => {
	checkIsOverflow = (ulEl, padding) => {
		let left = false;
		let right = false;
		const elArray = [...ulEl?.childNodes];
		const firstElPosition = elArray[0]?.getBoundingClientRect();
		const lastElPosition = elArray[elArray?.length - 1]?.getBoundingClientRect();
		if (firstElPosition?.left < 0 || ulEl?.scrollLeft > 0) left = true;
		if (lastElPosition?.right > ulEl?.clientWidth + padding || lastElPosition?.right > ulEl?.scrollWidth) right = true;
		return {
			left,
			right
		};
	};
	getElementData = (ulEl) => {
		const tempElementData = [];
		ulEl.childNodes.forEach((el) => {
			const box = el.getBoundingClientRect();
			tempElementData.push({
				name: el.innerHTML,
				originalLeftOffset: box.left,
				width: box.width
			});
		});
		return tempElementData;
	};
	reset = (navBar) => {
		navBar.current.querySelector("ul").scrollTo({
			left: "0",
			behavior: "smooth"
		});
	};
}));
//#endregion
//#region src/js/components/sharedComponents/InPageNav.jsx
/**
* InPageNav.jsx
* Created by Andrea Blackwell 08/09/2023
**/
var import_jsx_runtime$1, propTypes, InPageNav;
var init_InPageNav = __esmMin((() => {
	init_dist();
	init_mobileBreakpoints();
	init_inPageNavHelper();
	import_jsx_runtime$1 = require_jsx_runtime();
	propTypes = {
		sections: PropTypes.array,
		activeSection: PropTypes.string,
		jumpToSection: PropTypes.func,
		detectActiveSection: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
		pageName: PropTypes.string,
		rootMargin: PropTypes.string,
		threshold: PropTypes.array,
		loading: PropTypes.bool
	};
	InPageNav = (props) => {
		const { sections, jumpToSection, pageName, detectActiveSection, rootMargin, threshold, loading } = props;
		const [observerSupported, setObserverSupported] = useState(false);
		const [activeSection, setActiveSection] = useState(props.activeSection);
		const [windowWidth, setWindowWidth] = useState(window.innerWidth);
		const [ulElement, setUlElement] = useState(null);
		const [elementData, setElementData] = useState([]);
		const [isOverflowLeft, setIsOverflowLeft] = useState(false);
		const [isOverflowRight, setIsOverflowRight] = useState(false);
		const [padding, setPadding] = useState(32);
		const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
		const navBar = useRef(null);
		const [sectionPositions, setSectionPositions] = useState([]);
		const visibleSections = /* @__PURE__ */ new Set();
		const observerOptions = {
			rootMargin: rootMargin || `-140px 0px 0px 0px`,
			threshold: threshold || [
				0,
				.25,
				.5,
				.75,
				1
			]
		};
		let initialPageLoad = true;
		const prefix = `${pageName}-`;
		const callbackFunction = useCallback((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) visibleSections.add(entry.target);
				else visibleSections.delete(entry.target);
				const visible = [...visibleSections];
				if (visible.length) {
					const section = visible.reduce((best, el) => el.getBoundingClientRect().top < best.getBoundingClientRect().top ? el : best).id.replace(prefix, "");
					setActiveSection(section);
				}
			});
		});
		const checkIsOverflowHidden = () => {
			const ulEl = navBar?.current?.querySelector("ul");
			const { left, right } = checkIsOverflow(ulEl, padding);
			setIsOverflowLeft(left);
			setIsOverflowRight(right);
		};
		const handleHorizontalScroll = useCallback((e) => {
			e.stopPropagation();
			checkIsOverflowHidden();
		});
		const scrollLeft = useCallback((e) => {
			e.stopPropagation();
			const ulEl = navBar.current.querySelector("ul");
			const elArray = [...ulEl.childNodes];
			const lastVisibleEl = {
				name: "",
				index: 0
			};
			elArray.find((el, i) => {
				const box = el.getBoundingClientRect();
				if (box.left > 0 && box.right < ulEl.clientWidth) {
					lastVisibleEl.name = el.querySelector("a").innerHTML;
					lastVisibleEl.index = i;
					return i;
				}
			});
			const lastVisibleIndex = lastVisibleEl.index;
			if (lastVisibleIndex + 2 < elementData.length) {
				const newLeftPosition = ulEl.scrollLeft - ulEl.clientWidth + 20 + elementData[lastVisibleIndex + 1].width + elementData[lastVisibleIndex + 2].width;
				ulEl.scrollTo({
					left: newLeftPosition,
					behavior: "smooth"
				});
			} else reset(navBar);
		});
		const scrollRight = useCallback((e) => {
			e.stopPropagation();
			if (elementData) {
				const ulEl = navBar.current.querySelector("ul");
				const elArray = [...ulEl.childNodes];
				const firstRtHiddenEl = {
					name: "",
					index: 0
				};
				elArray.find((el, i) => {
					const box = el.getBoundingClientRect();
					const documentWidth = ulEl.clientWidth;
					if (box.right > documentWidth && box.left > padding / 2) {
						firstRtHiddenEl.name = el.querySelector("a").innerHTML;
						firstRtHiddenEl.index = i;
						return i;
					}
				});
				const index = firstRtHiddenEl.index;
				if (index - 2 >= 0) {
					const leftOffset = elementData[index - 2]?.originalLeftOffset;
					if (leftOffset) {
						const leftPosition = leftOffset + padding / 2;
						ulEl.scrollTo({
							left: leftPosition,
							behavior: "smooth"
						});
					}
				} else reset(navBar);
			}
		});
		const getInitialElements = useCallback(() => {
			const ulEl = navBar.current.querySelector("ul");
			const tempElementData = getElementData(ulEl);
			setUlElement(ulEl);
			setElementData(tempElementData);
		});
		const onKeyPress = useCallback((e, direction) => {
			if (e.key === "Enter") {
				if (direction === "left") scrollLeft(e);
				if (direction === "right") scrollRight(e);
			}
		});
		const handleResize = () => {
			const newWidth = window.innerWidth;
			if (windowWidth !== newWidth) setWindowWidth(newWidth);
			setIsMobile(windowWidth < 992);
			if (992 < windowWidth && windowWidth <= 1200) setPadding(52);
			if (1200 < windowWidth && windowWidth <= 1640) setPadding(72);
			if (1640 < windowWidth) setPadding(192);
			checkIsOverflowHidden();
		};
		useEffect(() => {
			checkIsOverflowHidden();
			ulElement?.addEventListener("scrollend", (e) => handleHorizontalScroll(e));
			return () => ulElement?.removeEventListener("scrollend", (e) => handleHorizontalScroll(e));
		}, [ulElement]);
		const cacheSectionPositions = throttle(() => {
			const newSectionPositions = sections.map((section) => {
				const sectionCode = section.section;
				const domElement = document.getElementById(`${pageName}-${sectionCode}`);
				if (!domElement) return null;
				const verticalSectionOffset = document.querySelector(".usda-page-header")?.offsetHeight || 0;
				const topPos = domElement.offsetTop - verticalSectionOffset;
				return {
					section: sectionCode,
					top: topPos,
					bottom: domElement.offsetHeight + topPos - verticalSectionOffset
				};
			});
			setSectionPositions(newSectionPositions);
		}, 100);
		useEffect(() => {
			getInitialElements();
			handleResize();
			setObserverSupported("IntersectionObserver" in window);
			window.addEventListener("resize", () => handleResize());
			return () => window.removeEventListener("resize", () => handleResize());
		}, []);
		useEffect(() => {
			if (observerSupported && initialPageLoad) {
				initialPageLoad = false;
				const target = prefix;
				const targets = document.querySelectorAll(`[id*='${target}']`);
				const observer = new IntersectionObserver(callbackFunction, observerOptions);
				targets.forEach((i) => {
					if (i) observer.observe(i);
				});
				return () => observer.disconnect();
			}
		}, [observerSupported, loading]);
		useEffect(() => {
			if (detectActiveSection && sectionPositions.length === 0) cacheSectionPositions();
			window.addEventListener("resize", cacheSectionPositions);
			return () => {
				window.removeEventListener("resize", cacheSectionPositions);
			};
		}, [detectActiveSection, sectionPositions.length]);
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
			className: "usda-in-page-nav__container",
			children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("nav", {
				ref: navBar,
				className: `usda-in-page-nav__wrapper ${isOverflowLeft && !isMobile ? "left-fade-effect" : ""} ${isOverflowRight ? "right-fade-effect" : ""} `,
				children: [
					isOverflowLeft && !isMobile && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
						"aria-label": "In-page navigation left paginator",
						title: "In-page navigation left paginator",
						className: "usda-in-page-nav__paginator left",
						tabIndex: "0",
						role: "button",
						onKeyDown: (e) => onKeyPress(e, "left"),
						onClick: (e) => scrollLeft(e),
						children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(FontAwesomeIcon, {
							icon: "chevron-left",
							alt: "Back"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("ul", { children: sections.map((section) => /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("li", {
						className: `usda-in-page-nav__element ${section.section === activeSection ? "active" : ""}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("a", {
							role: "button",
							tabIndex: "0",
							onKeyDown: (e) => e.key === "Enter" ? jumpToSection(section.section) : "",
							onClick: () => jumpToSection(section.section),
							children: section.label
						}, `in-page-nav-link-${section.label}`)
					}, `in-page-nav-li-${section.label}`)) }),
					isOverflowRight && !isMobile && /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
						"aria-label": "In-page navigation right paginator",
						title: "In-page navigation right paginator",
						className: "usda-in-page-nav__paginator right",
						tabIndex: "0",
						role: "button",
						onKeyDown: (e) => onKeyPress(e, "right"),
						onClick: (e) => scrollRight(e),
						children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(FontAwesomeIcon, {
							icon: "chevron-right",
							alt: "Forward"
						})
					})
				]
			})
		});
	};
	InPageNav.propTypes = propTypes;
}));
//#endregion
//#region src/js/components/sharedComponents/PageWrapper.jsx
/**
* Page.jsx
* Created by Max Kendall 04/23/2021
*/
var import_jsx_runtime, PageWrapper;
var init_PageWrapper = __esmMin((() => {
	init_index_es();
	init_stickyHeaderHelper();
	init_MetaTags();
	init_HeaderContainer();
	init_Footer();
	init_InPageNav();
	import_jsx_runtime = require_jsx_runtime();
	PageWrapper = ({ pageName, classNames, metaTagProps = {}, children, ref, noHeader = false, title, overLine, toolBarComponents = [], filters = {}, spending_level = [], sections, activeSection, jumpToSection, backgroundColor = "#112F4E", rootMargin, inPageNav = false, loading }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: classNames,
		ref,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetaTags, { ...metaTagProps }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeaderContainer_default, {}),
			noHeader ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ps, {
				title,
				stickyBreakPoint: getStickyBreakPointForSidebar(),
				overLine,
				toolBar: toolBarComponents,
				pageName,
				backgroundColor
			}), sections && inPageNav && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InPageNav, {
				sections,
				loading,
				activeSection,
				pageName,
				rootMargin,
				detectActiveSection: true,
				jumpToSection
			})] }),
			React.cloneElement(children, { className: `usda-page__container${children.props.className ? ` ${children.props.className}` : ""}` }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer_default, {
				pageName,
				filters,
				spending_level
			})
		]
	});
	PageWrapper.propTypes = {
		pageName: PropTypes.string.isRequired,
		classNames: PropTypes.string,
		metaTagProps: PropTypes.object,
		toolBarComponents: PropTypes.arrayOf(PropTypes.element),
		title: PropTypes.string,
		overLine: PropTypes.string,
		children: PropTypes.element,
		ref: PropTypes.object,
		noHeader: PropTypes.bool,
		filters: PropTypes.object,
		sections: PropTypes.array,
		activeSection: PropTypes.string,
		jumpToSection: PropTypes.func,
		inPageNav: PropTypes.bool,
		backgroundColor: PropTypes.string,
		spending_level: PropTypes.array
	};
}));
//#endregion
export { init_InPageNav as i, init_PageWrapper as n, InPageNav as r, PageWrapper as t };
