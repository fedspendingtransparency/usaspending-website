import { n as __esmMin } from "./rolldown-runtime-D1cXj70v.js";
//#region src/js/helpers/textMeasurement.js
var measureText, measureTableHeader, measureTreemapHeader, measureTreemapValue;
var init_textMeasurement = __esmMin((() => {
	measureText = (font, text) => {
		let canvas;
		if (!document.getElementById("measurement-canvas-wrapper")) {
			const appWrapper = document.getElementById("app");
			const canvasDiv = document.createElement("div");
			canvasDiv.classList.add("hide");
			canvasDiv.setAttribute("id", "measurement-canvas-wrapper");
			canvas = document.createElement("canvas");
			canvas.setAttribute("id", "measurement-canvas");
			canvasDiv.appendChild(canvas);
			appWrapper.appendChild(canvasDiv);
		} else canvas = document.getElementById("measurement-canvas");
		if (!canvas) return 0;
		const context = canvas.getContext("2d");
		context.font = font;
		return Math.ceil(context.measureText(text).width);
	};
	measureTableHeader = (text) => {
		return measureText("bold 14px Source Sans Pro, sans serif", text) + 120;
	};
	measureTreemapHeader = (text) => {
		return measureText("16px Source Sans Pro, sans serif", text);
	};
	measureTreemapValue = (text) => {
		return measureText("bold 18px Source Sans Pro, sans serif", text);
	};
}));
//#endregion
export { measureTreemapValue as i, measureTableHeader as n, measureTreemapHeader as r, init_textMeasurement as t };
