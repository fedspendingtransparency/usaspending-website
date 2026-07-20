import { n as __esmMin } from "./rolldown-runtime-D1cXj70v.js";
import { go as require_jsx_runtime } from "./index.js-Dk2VDaPz.js";
import "react";
//#region src/js/helpers/featuredContent/featuredContentHelper.jsx
var import_jsx_runtime, primaryFill, secondaryFill, contentTaxonomyNameToKey, transformString, transformDate, CustomA, CustomImg, getPrimaryFill, getSecondaryFill, getThumbnailPath;
var init_featuredContentHelper = __esmMin((() => {
	import_jsx_runtime = require_jsx_runtime();
	primaryFill = {
		dataDefinition: "#783CB9",
		search: "#D54309",
		seeforyourself: "#E66F0E",
		questions: "#864381",
		finances: "#1B2B85",
		trust: "#73B3E7",
		stories: "#2378C3",
		difference: "#5ABF95",
		america250: "#0b4678"
	};
	secondaryFill = {
		dataDefinition: "#D5BFFF",
		search: "#F6BD9C",
		seeforyourself: "#FFBC78",
		questions: "#E2BEE4",
		finances: "#628EF4",
		trust: "#D9E8F6",
		stories: "#73B3E7",
		difference: "#DBF6ED",
		america250: "#69B3E3"
	};
	contentTaxonomyNameToKey = {
		"Data Definitions": "dataDefinition",
		"My USAspending Search": "search",
		"See 4 Yourself": "seeforyourself",
		"Recently Answered Questions": "questions",
		"Exploring America's Finances": "finances",
		"Data You Can Trust": "trust",
		"Spending Stories": "stories",
		"What's the Difference?": "difference",
		"America250": "america250"
	};
	transformString = (input) => {
		if (input) return input.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-]/g, "").toLowerCase();
		return null;
	};
	transformDate = (input) => {
		return new Date(input).toLocaleDateString("en-us", {
			weekday: "long",
			year: "numeric",
			month: "short",
			day: "numeric"
		}).replace(/^\w+,\s*/g, "");
	};
	CustomA = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		target: "_blank",
		rel: "noopener noreferrer",
		...props
	});
	CustomImg = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: `../../img/featuredContent/articles/${props.src}`,
		alt: props.alt
	});
	getPrimaryFill = (article) => {
		if (!article) return "none";
		return primaryFill[contentTaxonomyNameToKey[article.taxonomy]];
	};
	getSecondaryFill = (article) => {
		if (!article) return "none";
		return secondaryFill[contentTaxonomyNameToKey[article.taxonomy]];
	};
	getThumbnailPath = (article) => {
		return `../../img/featuredContent/thumbnails/${article.slug}-thumbnail.webp`;
	};
}));
//#endregion
export { getThumbnailPath as a, transformString as c, getSecondaryFill as i, CustomImg as n, init_featuredContentHelper as o, getPrimaryFill as r, transformDate as s, CustomA as t };
