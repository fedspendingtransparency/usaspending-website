import { n as __esmMin } from "./rolldown-runtime-D1cXj70v.js";
import { ro as require_jsx_runtime, ya as init_mobileBreakpoints } from "./index.js-CgeUxZJy.js";
import { createElement, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { throttle } from "lodash-es";
//#region src/js/components/sharedComponents/timeChart/chart/BarChartLegendItem.jsx
/**
* BarChartLegendItem.jsx
* Created by Kevin Li 3/21/17
*/
var import_jsx_runtime$1, propTypes$1, BarChartLegendItem;
var init_BarChartLegendItem = __esmMin((() => {
	init_mobileBreakpoints();
	import_jsx_runtime$1 = require_jsx_runtime();
	propTypes$1 = {
		color: PropTypes.string,
		label: PropTypes.string,
		offset: PropTypes.number,
		mobileOffset: PropTypes.number
	};
	BarChartLegendItem = (props) => {
		const [windowWidth, setWindowWidth] = useState(window.innerWidth);
		useEffect(() => {
			const handleResize = throttle(() => {
				const newWidth = window.innerWidth;
				if (windowWidth !== newWidth) setWindowWidth(newWidth);
			}, 50);
			window.addEventListener("resize", handleResize);
			return () => window.removeEventListener("resize", handleResize);
		}, [windowWidth]);
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("g", {
			className: "chart-legend-item",
			transform: windowWidth <= 576 ? `translate(0, ${props.mobileOffset})` : `translate(${props.offset}, 0)`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("circle", {
				className: "key-color",
				fill: props.color,
				cx: "6",
				cy: "6",
				r: "6"
			}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("text", {
				className: "key-label",
				x: "20",
				y: "10",
				children: props.label
			})]
		});
	};
	BarChartLegendItem.propTypes = propTypes$1;
}));
//#endregion
//#region src/js/components/sharedComponents/timeChart/chart/BarChartLegend.jsx
var import_jsx_runtime, propTypes, BarChartLegend;
var init_BarChartLegend = __esmMin((() => {
	init_BarChartLegendItem();
	import_jsx_runtime = require_jsx_runtime();
	propTypes = { legend: PropTypes.arrayOf(PropTypes.object) };
	BarChartLegend = (props) => {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
			className: "chart-legend",
			children: props.legend.map((item) => /* @__PURE__ */ createElement(BarChartLegendItem, {
				...item,
				key: item.label
			}))
		});
	};
	BarChartLegend.propTypes = propTypes;
}));
//#endregion
export { init_BarChartLegend as n, BarChartLegend as t };
