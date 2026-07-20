import { n as __esmMin } from "./rolldown-runtime-D1cXj70v.js";
import { Aa as Navigate, Ar as tc, Ba as init_GlobalConstants, Dr as sc, Fr as init_dist, Oa as init_development, Pr as FontAwesomeIcon, Sr as lc, Tr as rc, _r as ac, fr as Qs, ir as $s, ro as require_jsx_runtime, xr as init_index_es, za as globalConstants } from "./index.js-CgeUxZJy.js";
import { n as Alert, r as init_Alert, t as require_searchPage } from "./searchPage-CQVH28To.js";
import { n as init_PageWrapper, t as PageWrapper } from "./PageWrapper-BZX48lf-.js";
import { n as init_Accordion, t as Accordion } from "./Accordion-DxniQozb.js";
import { n as init_ComboBox, t as ComboBox } from "./ComboBox-VQ22JVkq.js";
import { n as init_BannerPageHeader, t as BannerPageHeader } from "./BannerPageHeader-BC5NwUDM.js";
import { useCallback, useEffect, useState } from "react";
//#region src/js/components/sharedComponents/PageFeatureFlag.jsx
var import_jsx_runtime$1, PageFeatureFlag;
var init_PageFeatureFlag = __esmMin((() => {
	init_development();
	init_GlobalConstants();
	import_jsx_runtime$1 = require_jsx_runtime();
	PageFeatureFlag = ({ children }) => {
		return globalConstants.QAT ? /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(import_jsx_runtime$1.Fragment, { children }) : /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Navigate, { to: "/404" });
	};
}));
//#endregion
//#region tests/mockData.js
var mockComboBox;
var init_mockData = __esmMin((() => {
	mockComboBox = [
		{
			value: "apple",
			text: "Apple"
		},
		{
			value: "apricot",
			text: "Apricot"
		},
		{
			value: "avocado",
			text: "Avocado"
		},
		{
			value: "banana",
			text: "Banana"
		},
		{
			value: "blackberry",
			text: "Blackberry"
		},
		{
			value: "blood-orange",
			text: "Blood orange"
		},
		{
			value: "blueberry",
			text: "Blueberry"
		},
		{
			value: "boysenberry",
			text: "Boysenberry"
		},
		{
			value: "breadfruit",
			text: "Breadfruit"
		},
		{
			value: "buddhas-hand-citron",
			text: "Buddha's hand citron"
		},
		{
			value: "cantaloupe",
			text: "Cantaloupe"
		},
		{
			value: "clementine",
			text: "Clementine"
		},
		{
			value: "crab-apple",
			text: "Crab apple"
		},
		{
			value: "currant",
			text: "Currant"
		},
		{
			value: "cherry",
			text: "Cherry"
		},
		{
			value: "custard-apple",
			text: "Custard apple"
		},
		{
			value: "coconut",
			text: "Coconut"
		},
		{
			value: "cranberry",
			text: "Cranberry"
		},
		{
			value: "date",
			text: "Date"
		},
		{
			value: "dragonfruit",
			text: "Dragonfruit"
		},
		{
			value: "durian",
			text: "Durian"
		},
		{
			value: "elderberry",
			text: "Elderberry"
		},
		{
			value: "fig",
			text: "Fig"
		},
		{
			value: "gooseberry",
			text: "Gooseberry"
		},
		{
			value: "grape",
			text: "Grape"
		},
		{
			value: "grapefruit",
			text: "Grapefruit"
		},
		{
			value: "guava",
			text: "Guava"
		},
		{
			value: "honeydew-melon",
			text: "Honeydew melon"
		},
		{
			value: "jackfruit",
			text: "Jackfruit"
		},
		{
			value: "kiwifruit",
			text: "Kiwifruit"
		},
		{
			value: "kumquat",
			text: "Kumquat"
		},
		{
			value: "lemon",
			text: "Lemon"
		},
		{
			value: "lime",
			text: "Lime"
		},
		{
			value: "lychee",
			text: "Lychee"
		},
		{
			value: "mandarine",
			text: "Mandarine"
		},
		{
			value: "mango",
			text: "Mango"
		},
		{
			value: "mangosteen",
			text: "Mangosteen"
		},
		{
			value: "marionberry",
			text: "Marionberry"
		},
		{
			value: "nectarine",
			text: "Nectarine"
		},
		{
			value: "orange",
			text: "Orange"
		},
		{
			value: "papaya",
			text: "Papaya"
		},
		{
			value: "passionfruit",
			text: "Passionfruit"
		},
		{
			value: "peach",
			text: "Peach"
		},
		{
			value: "pear",
			text: "Pear"
		},
		{
			value: "persimmon",
			text: "Persimmon"
		},
		{
			value: "plantain",
			text: "Plantain"
		},
		{
			value: "plum",
			text: "Plum"
		},
		{
			value: "pineapple",
			text: "Pineapple"
		},
		{
			value: "pluot",
			text: "Pluot"
		},
		{
			value: "pomegranate",
			text: "Pomegranate"
		},
		{
			value: "pomelo",
			text: "Pomelo"
		},
		{
			value: "quince",
			text: "Quince"
		},
		{
			value: "raspberry",
			text: "Raspberry"
		},
		{
			value: "rambutan",
			text: "Rambutan"
		},
		{
			value: "soursop",
			text: "Soursop"
		},
		{
			value: "starfruit",
			text: "Starfruit"
		},
		{
			value: "strawberry",
			text: "Strawberry"
		},
		{
			value: "tamarind",
			text: "Tamarind"
		},
		{
			value: "tangelo",
			text: "Tangelo"
		},
		{
			value: "tangerine",
			text: "Tangerine"
		},
		{
			value: "ugli-fruit",
			text: "Ugli fruit"
		},
		{
			value: "watermelon",
			text: "Watermelon"
		},
		{
			value: "white-current",
			text: "White currant"
		},
		{
			value: "yuzu",
			text: "Yuzu"
		}
	];
}));
//#endregion
//#region src/js/components/TempPage.jsx
var import_jsx_runtime, TempPage;
//#endregion
__esmMin((() => {
	init_dist();
	init_index_es();
	init_Alert();
	init_PageWrapper();
	init_PageFeatureFlag();
	init_Accordion();
	init_ComboBox();
	init_mockData();
	init_BannerPageHeader();
	import_jsx_runtime = require_jsx_runtime();
	require_searchPage();
	TempPage = () => {
		const imageLink = "../../img/top-bowie-state-combined-image.svg";
		const onClose = useCallback(() => window.alert("Close Icon Triggered!"), []);
		const alertBody = "This is a succinct, helpful in-page status message.";
		const [inputValue, setInputValue] = useState("This is a default value");
		const [inputValue1, setInputValue1] = useState("");
		const [inputValue2, setInputValue2] = useState("");
		const [disabled, setDisabled] = useState(true);
		useEffect(() => {
			setTimeout(() => {
				setDisabled(false);
			}, 5e3);
		}, []);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageFeatureFlag, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageWrapper, {
			pageName: "Test Page",
			classNames: "usa-da-search-page",
			title: "Test Page",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				id: "main-content",
				className: "main-content",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BannerPageHeader, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "New 508 Typography" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Accordion, {
						title: "Headings",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "h1: A quick brown fox jumps over the lazy dog." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "h2: A quick brown fox jumps over the lazy dog." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "h3: A quick brown fox jumps over the lazy dog." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: "h4: A quick brown fox jumps over the lazy dog." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", { children: "h5: A quick brown fox jumps over the lazy dog." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h6", { children: "h6: A quick brown fox jumps over the lazy dog." })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Accordion, {
						title: "Body & UI",
						contentClassName: "temp-page__body-ui",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "title",
								children: "title: A quick brown fox jumps over the lazy dog."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "lead",
								children: "lead: A quick brown fox jumps over the lazy dog."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "base",
								children: "base: A quick brown fox jumps over the lazy dog."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "small",
								children: "small: A quick brown fox jumps over the lazy dog."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "smallest",
								children: "smallest: A quick brown fox jumps over the lazy dog."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "<ComboBox />" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							flexDirection: "column",
							border: "1px solid darkgrey",
							height: "fit-content",
							maxWidth: "900px"
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComboBox, {
								inputValue: inputValue2,
								setInputValue: setInputValue2,
								optionsArray: mockComboBox,
								label: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
									"This is an Example Label",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: " (Required) " }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FontAwesomeIcon, { icon: "circle-question" })
								] }),
								placeholder: "this has a 5 second disabled delay",
								formName: "fruit2",
								disabled
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComboBox, {
								inputValue,
								setInputValue,
								optionsArray: mockComboBox,
								placeholder: "this is a ComboBox with no label",
								formName: "fruit"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComboBox, {
								inputValue: inputValue1,
								setInputValue: setInputValue1,
								optionsArray: mockComboBox,
								label: "This is a disabled combo box",
								placeholder: "e.g., apple, banana, mango",
								formName: "fruit1",
								disabled: true
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Fontawesome Pro Icons" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FontAwesomeIcon, { icon: "bluetooth" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FontAwesomeIcon, { icon: "lightbulb-cfl" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FontAwesomeIcon, { icon: ["fal", "lightbulb"] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "<Alert />" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							flexDirection: "column",
							border: "1px solid darkgrey",
							padding: "8px",
							height: "fit-content",
							maxWidth: "900px"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert, {
							type: "test",
							header: "Default Example",
							body: alertBody,
							onClose,
							icon: true
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert, {
							type: "error",
							header: "Custom Example",
							className: "alert-test-className",
							body: alertBody,
							icon: "chevron-left",
							onClose,
							closeIcon: "chevron-up"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion, {
						title: "Info Alert Variants",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								flexDirection: "column",
								border: "1px solid darkgrey",
								padding: "8px",
								height: "fit-content",
								maxWidth: "900px"
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert, {
									header: "Info Example",
									onClose,
									body: alertBody,
									icon: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert, {
									header: "Info Example",
									body: alertBody,
									icon: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert, {
									header: "Info Example",
									onClose,
									body: alertBody
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert, {
									header: "Info Example",
									body: alertBody
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert, {
									body: alertBody,
									onClose,
									icon: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert, {
									body: alertBody,
									icon: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert, {
									body: alertBody,
									onClose
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert, { body: alertBody })
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion, {
						title: "Success Alert Variants",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								flexDirection: "column",
								border: "1px solid darkgrey",
								padding: "8px",
								height: "fit-content",
								maxWidth: "900px"
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert, {
									type: "success",
									header: "Success Example",
									onClose,
									body: alertBody,
									icon: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert, {
									type: "success",
									header: "Success Example",
									body: alertBody,
									icon: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert, {
									type: "success",
									header: "Success Example",
									onClose,
									body: alertBody
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert, {
									type: "success",
									header: "Success Example",
									body: alertBody
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert, {
									type: "success",
									body: alertBody,
									onClose,
									icon: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert, {
									type: "success",
									body: alertBody,
									icon: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert, {
									type: "success",
									body: alertBody,
									onClose
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert, {
									type: "success",
									body: alertBody
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion, {
						title: "Warning Alert Variants",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								flexDirection: "column",
								border: "1px solid darkgrey",
								padding: "8px",
								height: "fit-content",
								maxWidth: "900px"
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert, {
									type: "warning",
									header: "Warning Example",
									onClose,
									body: alertBody,
									icon: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert, {
									type: "warning",
									header: "Warning Example",
									body: alertBody,
									icon: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert, {
									type: "warning",
									header: "Warning Example",
									onClose,
									body: alertBody
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert, {
									type: "warning",
									header: "Warning Example",
									body: alertBody
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert, {
									type: "warning",
									body: alertBody,
									onClose,
									icon: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert, {
									type: "warning",
									body: alertBody,
									icon: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert, {
									type: "warning",
									body: alertBody,
									onClose
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert, {
									type: "warning",
									body: alertBody
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion, {
						title: "Error Alert Variants",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								flexDirection: "column",
								border: "1px solid darkgrey",
								padding: "8px",
								height: "fit-content",
								maxWidth: "900px"
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert, {
									type: "error",
									header: "Error Example",
									onClose,
									body: alertBody,
									icon: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert, {
									type: "error",
									header: "Error Example",
									body: alertBody,
									icon: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert, {
									type: "error",
									header: "Error Example",
									onClose,
									body: alertBody
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert, {
									type: "error",
									header: "Warning Example",
									body: alertBody
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert, {
									type: "error",
									body: alertBody,
									onClose,
									icon: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert, {
									type: "error",
									body: alertBody,
									icon: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert, {
									type: "error",
									body: alertBody,
									onClose
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert, {
									type: "error",
									body: alertBody
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Container Variants" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Qs, {
						width: 3,
						desktop: 3,
						hasGutter: true,
						gutterSize: 32,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)($s, {
								width: 3,
								desktop: 3,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(tc, {
									variant: "outline",
									size: "sm",
									height: "200px",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(rc, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "When awarding funding, the U.S. government enters a binding agreement called an obligation, which meand that the federal government promises to spend the money." }) })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)($s, {
								width: 3,
								desktop: 3,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(tc, {
									variant: "outline",
									size: "md",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(rc, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "When awarding funding, the U.S. government enters a binding agreement called an obligation, which meand that the federal government promises to spend the money." }) })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)($s, {
								width: 3,
								desktop: 3,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(tc, {
									variant: "elevated",
									size: "md",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(rc, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "When awarding funding, the U.S. government enters a binding agreement called an obligation, which meand that the federal government promises to spend the money." }) })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)($s, {
								width: 3,
								desktop: 3,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(tc, {
									variant: "outline",
									fill: "#1a4480",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(rc, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "When awarding funding, the U.S. government enters a binding agreement called an obligation, which meand that the federal government promises to spend the money." }) })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)($s, {
								width: 3,
								desktop: 3,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(tc, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(rc, {
									overline: "Award Search",
									headline: "Find details on federal awards",
									text: "Search spending to your community using Location filters like Place of Performance",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(lc, {
										text: "Search",
										variant: "primary",
										link: "/search"
									})
								}) })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Hero Variants" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Qs, {
						width: 3,
						desktop: 3,
						hasGutter: true,
						gutterSize: 32,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)($s, {
								width: 3,
								desktop: 3,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(tc, {
									variant: "elevated",
									size: "sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ac, {
										variant: "inset",
										fill: "#1a4480",
										img: imageLink
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(rc, {
										variant: "inset",
										overline: "blah lbahl bhal",
										headline: "more more more",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "hello" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "hello" })]
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)($s, {
								width: 3,
								desktop: 3,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(tc, {
									variant: "elevated",
									size: "md",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ac, {
											fill: "#1a4480",
											img: imageLink
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "hello" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "hello" })
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)($s, {
								width: 3,
								desktop: 3,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(tc, {
									variant: "elevated",
									size: "md",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ac, { fill: "#1a4480" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(rc, {
										overline: "Award Search",
										headline: "Find details on federal awards",
										text: "Search spending to your community using Location filters like Place of Performance",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(lc, {
											text: "Return Home",
											variant: "primary",
											link: "/"
										})
									})]
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Button Variants" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Qs, {
						width: 3,
						desktop: 3,
						hasGutter: true,
						gutterSize: 32,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)($s, {
								width: 4,
								desktop: 4,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(tc, {
									variant: "elevated",
									size: "md",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ac, { fill: "#1a4480" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(rc, {
										overline: "Resources",
										headline: "Learn how to use USAspending with our tutorial videos",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(lc, {
											text: "Search",
											variant: "hero__button--action",
											link: "/search"
										})
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)($s, {
								width: 4,
								desktop: 4,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(tc, {
									variant: "elevated",
									size: "md",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ac, {
										variant: "expanded",
										img: imageLink
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(rc, {
										overline: "Resources",
										headline: "Learn how to use USAspending with our tutorial videos",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(lc, {
											text: "Search",
											link: "/search"
										})
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)($s, {
								width: 4,
								desktop: 4,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(tc, {
									variant: "elevated",
									size: "md",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ac, {
										variant: "expanded",
										fill: "#1a4480",
										img: imageLink
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(rc, {
										overline: "Resources",
										headline: "Learn how to use USAspending with our tutorial videos",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(lc, {
											text: "Search",
											variant: "text",
											link: "/search"
										})
									})]
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "New Button Variants" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Qs, {
						width: 3,
						desktop: 3,
						hasGutter: true,
						gutterSize: 32,
						style: { marginLeft: "16px" },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(sc, {
								copy: "TEST",
								buttonTitle: "TEST",
								buttonSize: "sm",
								buttonType: "primary",
								backgroundColor: "light"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(sc, {
								copy: "TEST",
								buttonTitle: "TEST",
								buttonSize: "md",
								buttonType: "primary",
								backgroundColor: "light"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(sc, {
								copy: "TEST",
								buttonTitle: "TEST",
								buttonSize: "lg",
								buttonType: "primary",
								backgroundColor: "light"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Qs, {
						width: 3,
						desktop: 3,
						hasGutter: true,
						gutterSize: 32,
						style: { marginLeft: "16px" },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(sc, {
							copy: "This is wrapping button text",
							buttonTitle: "TEST",
							buttonSize: "lg",
							buttonType: "primary",
							backgroundColor: "light",
							maxWidth: "200px",
							textAlignment: "center"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(sc, {
							copy: "This is wrapping button text",
							buttonTitle: "TEST",
							buttonSize: "lg",
							buttonType: "primary",
							backgroundColor: "light",
							maxWidth: "200px",
							textAlignment: "left"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Qs, {
						width: 3,
						desktop: 3,
						hasGutter: true,
						gutterSize: 32,
						style: { marginLeft: "16px" },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(sc, {
								copy: "TEST",
								buttonTitle: "TEST",
								buttonSize: "sm",
								buttonType: "primary",
								backgroundColor: "light",
								disabled: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(sc, {
								copy: "TEST",
								buttonTitle: "TEST",
								buttonSize: "md",
								buttonType: "primary",
								backgroundColor: "light",
								disabled: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(sc, {
								copy: "TEST",
								buttonTitle: "TEST",
								buttonSize: "lg",
								buttonType: "primary",
								backgroundColor: "light",
								disabled: true
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Qs, {
						width: 3,
						desktop: 3,
						hasGutter: true,
						gutterSize: 32,
						style: { marginLeft: "16px" },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(sc, {
								copy: "TEST",
								buttonTitle: "TEST",
								buttonSize: "sm",
								buttonType: "primaryIcon",
								backgroundColor: "light",
								imageAlignment: "left",
								image: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FontAwesomeIcon, { icon: "share-alt" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(sc, {
								copy: "TEST",
								buttonTitle: "TEST",
								buttonSize: "md",
								buttonType: "primaryIcon",
								backgroundColor: "light",
								imageAlignment: "left",
								image: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FontAwesomeIcon, { icon: "share-alt" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(sc, {
								copy: "TEST",
								buttonTitle: "TEST",
								buttonSize: "lg",
								buttonType: "primaryIcon",
								backgroundColor: "light",
								imageAlignment: "left",
								image: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FontAwesomeIcon, { icon: "share-alt" })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Qs, {
						width: 3,
						desktop: 3,
						hasGutter: true,
						gutterSize: 32,
						style: { marginLeft: "16px" },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(sc, {
								copy: "TEST",
								buttonTitle: "TEST",
								buttonSize: "sm",
								buttonType: "secondary",
								backgroundColor: "light"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(sc, {
								copy: "TEST",
								buttonTitle: "TEST",
								buttonSize: "md",
								buttonType: "secondary",
								backgroundColor: "light"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(sc, {
								copy: "TEST",
								buttonTitle: "TEST",
								buttonSize: "lg",
								buttonType: "secondary",
								backgroundColor: "light"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Qs, {
						width: 3,
						desktop: 3,
						hasGutter: true,
						gutterSize: 32,
						style: {
							marginLeft: "16px",
							backgroundColor: "#323a44"
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(sc, {
								copy: "TEST",
								buttonTitle: "TEST",
								buttonSize: "sm",
								buttonType: "secondary",
								backgroundColor: "dark"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(sc, {
								copy: "TEST",
								buttonTitle: "TEST",
								buttonSize: "md",
								buttonType: "secondary",
								backgroundColor: "dark"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(sc, {
								copy: "TEST",
								buttonTitle: "TEST",
								buttonSize: "lg",
								buttonType: "secondary",
								backgroundColor: "dark"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Qs, {
						width: 3,
						desktop: 3,
						hasGutter: true,
						gutterSize: 32,
						style: {
							marginLeft: "16px",
							backgroundColor: "#323a44"
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(sc, {
								copy: "TEST",
								buttonTitle: "TEST",
								buttonSize: "sm",
								buttonType: "secondaryIcon",
								backgroundColor: "dark",
								imageAlignment: "left",
								image: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FontAwesomeIcon, { icon: "share-alt" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(sc, {
								copy: "TEST",
								buttonTitle: "TEST",
								buttonSize: "md",
								buttonType: "secondaryIcon",
								backgroundColor: "dark",
								imageAlignment: "left",
								image: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FontAwesomeIcon, { icon: "share-alt" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(sc, {
								copy: "TEST",
								buttonTitle: "TEST",
								buttonSize: "lg",
								buttonType: "secondaryIcon",
								backgroundColor: "dark",
								imageAlignment: "left",
								image: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FontAwesomeIcon, { icon: "share-alt" })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Qs, {
						width: 3,
						desktop: 3,
						hasGutter: true,
						gutterSize: 32,
						style: { marginLeft: "16px" },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(sc, {
								copy: "TEST",
								buttonTitle: "TEST",
								buttonSize: "sm",
								buttonType: "tertiary",
								backgroundColor: "light"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(sc, {
								copy: "TEST",
								buttonTitle: "TEST",
								buttonSize: "md",
								buttonType: "tertiary",
								backgroundColor: "light"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(sc, {
								copy: "TEST",
								buttonTitle: "TEST",
								buttonSize: "lg",
								buttonType: "tertiary",
								backgroundColor: "light"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Qs, {
						width: 3,
						desktop: 3,
						hasGutter: true,
						gutterSize: 32,
						style: { marginLeft: "16px" },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(sc, {
								copy: "TEST",
								buttonTitle: "TEST",
								buttonSize: "sm",
								buttonType: "tertiaryIcon",
								backgroundColor: "light",
								imageAlignment: "left",
								image: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FontAwesomeIcon, { icon: "share-alt" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(sc, {
								copy: "TEST",
								buttonTitle: "TEST",
								buttonSize: "md",
								buttonType: "tertiaryIcon",
								backgroundColor: "light",
								imageAlignment: "left",
								image: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FontAwesomeIcon, { icon: "share-alt" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(sc, {
								copy: "TEST",
								buttonTitle: "TEST",
								buttonSize: "lg",
								buttonType: "tertiaryIcon",
								backgroundColor: "light",
								imageAlignment: "left",
								image: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FontAwesomeIcon, { icon: "share-alt" })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Qs, {
						width: 3,
						desktop: 3,
						hasGutter: true,
						gutterSize: 32,
						style: { marginLeft: "16px" },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(sc, {
								copy: "TEST",
								buttonTitle: "TEST",
								buttonSize: "sm",
								buttonType: "text",
								backgroundColor: "light"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(sc, {
								copy: "TEST",
								buttonTitle: "TEST",
								buttonSize: "md",
								buttonType: "text",
								backgroundColor: "light"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(sc, {
								copy: "TEST",
								buttonTitle: "TEST",
								buttonSize: "lg",
								buttonType: "text",
								backgroundColor: "light"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Qs, {
						width: 3,
						desktop: 3,
						hasGutter: true,
						gutterSize: 32,
						style: { marginLeft: "16px" },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(sc, {
								copy: "TEST",
								buttonTitle: "TEST",
								buttonSize: "sm",
								buttonType: "text",
								backgroundColor: "light",
								imageAlignment: "left",
								image: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FontAwesomeIcon, { icon: "share-alt" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(sc, {
								copy: "TEST",
								buttonTitle: "TEST",
								buttonSize: "md",
								buttonType: "text",
								backgroundColor: "light",
								imageAlignment: "left",
								image: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FontAwesomeIcon, { icon: "share-alt" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(sc, {
								copy: "TEST",
								buttonTitle: "TEST",
								buttonSize: "lg",
								buttonType: "text",
								backgroundColor: "light",
								imageAlignment: "left",
								image: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FontAwesomeIcon, { icon: "share-alt" })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Qs, {
						width: 3,
						desktop: 3,
						hasGutter: true,
						gutterSize: 32,
						style: { marginLeft: "16px" },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(sc, {
								copy: "TEST",
								buttonTitle: "TEST",
								buttonSize: "sm",
								buttonType: "text",
								backgroundColor: "light",
								imageAlignment: "right",
								image: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FontAwesomeIcon, { icon: "share-alt" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(sc, {
								copy: "TEST",
								buttonTitle: "TEST",
								buttonSize: "md",
								buttonType: "text",
								backgroundColor: "light",
								imageAlignment: "right",
								image: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FontAwesomeIcon, { icon: "share-alt" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(sc, {
								copy: "TEST",
								buttonTitle: "TEST",
								buttonSize: "lg",
								buttonType: "text",
								backgroundColor: "light",
								imageAlignment: "right",
								image: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FontAwesomeIcon, { icon: "share-alt" })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Qs, {
						width: 3,
						desktop: 3,
						hasGutter: true,
						gutterSize: 32,
						style: {
							marginLeft: "16px",
							backgroundColor: "#323a44"
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(sc, {
								copy: "TEST",
								buttonTitle: "TEST",
								buttonSize: "sm",
								buttonType: "text",
								backgroundColor: "dark"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(sc, {
								copy: "TEST",
								buttonTitle: "TEST",
								buttonSize: "md",
								buttonType: "text",
								backgroundColor: "dark"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(sc, {
								copy: "TEST",
								buttonTitle: "TEST",
								buttonSize: "lg",
								buttonType: "text",
								backgroundColor: "dark"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Qs, {
						width: 3,
						desktop: 3,
						hasGutter: true,
						gutterSize: 32,
						style: {
							marginLeft: "16px",
							backgroundColor: "#323a44"
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(sc, {
								copy: "TEST",
								buttonTitle: "TEST",
								buttonSize: "sm",
								buttonType: "text",
								backgroundColor: "dark",
								imageAlignment: "left",
								image: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FontAwesomeIcon, { icon: "share-alt" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(sc, {
								copy: "TEST",
								buttonTitle: "TEST",
								buttonSize: "md",
								buttonType: "text",
								backgroundColor: "dark",
								imageAlignment: "left",
								image: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FontAwesomeIcon, { icon: "share-alt" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(sc, {
								copy: "TEST",
								buttonTitle: "TEST",
								buttonSize: "lg",
								buttonType: "text",
								backgroundColor: "dark",
								imageAlignment: "left",
								image: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FontAwesomeIcon, { icon: "share-alt" })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Qs, {
						width: 3,
						desktop: 3,
						hasGutter: true,
						gutterSize: 32,
						style: {
							marginLeft: "16px",
							backgroundColor: "#323a44"
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(sc, {
								copy: "TEST",
								buttonTitle: "TEST",
								buttonSize: "sm",
								buttonType: "text",
								backgroundColor: "dark",
								imageAlignment: "right",
								image: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FontAwesomeIcon, { icon: "share-alt" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(sc, {
								copy: "TEST",
								buttonTitle: "TEST",
								buttonSize: "md",
								buttonType: "text",
								backgroundColor: "dark",
								imageAlignment: "right",
								image: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FontAwesomeIcon, { icon: "share-alt" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(sc, {
								copy: "TEST",
								buttonTitle: "TEST",
								buttonSize: "lg",
								buttonType: "text",
								backgroundColor: "dark",
								imageAlignment: "right",
								image: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FontAwesomeIcon, { icon: "share-alt" })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Qs, {
						width: 3,
						desktop: 3,
						hasGutter: true,
						gutterSize: 32,
						style: { marginLeft: "16px" },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(sc, {
								copy: "TEST",
								buttonTitle: "TEST",
								buttonSize: "sm",
								buttonType: "stacked",
								backgroundColor: "light",
								image: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FontAwesomeIcon, { icon: "share-alt" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(sc, {
								copy: "TEST",
								buttonTitle: "TEST",
								buttonSize: "md",
								buttonType: "stacked",
								backgroundColor: "light",
								image: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FontAwesomeIcon, { icon: "share-alt" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(sc, {
								copy: "TEST",
								buttonTitle: "TEST",
								buttonSize: "lg",
								buttonType: "stacked",
								backgroundColor: "light",
								image: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FontAwesomeIcon, { icon: "share-alt" })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Qs, {
						width: 3,
						desktop: 3,
						hasGutter: true,
						gutterSize: 32,
						style: {
							marginLeft: "16px",
							backgroundColor: "#323a44"
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(sc, {
								copy: "TEST",
								buttonTitle: "TEST",
								buttonSize: "sm",
								buttonType: "stacked",
								backgroundColor: "dark",
								image: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FontAwesomeIcon, { icon: "share-alt" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(sc, {
								copy: "TEST",
								buttonTitle: "TEST",
								buttonSize: "md",
								buttonType: "stacked",
								backgroundColor: "dark",
								image: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FontAwesomeIcon, { icon: "share-alt" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(sc, {
								copy: "TEST",
								buttonTitle: "TEST",
								buttonSize: "lg",
								buttonType: "stacked",
								backgroundColor: "dark",
								image: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FontAwesomeIcon, { icon: "share-alt" })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Qs, {
						width: 3,
						desktop: 3,
						hasGutter: true,
						gutterSize: 32,
						style: { marginLeft: "16px" },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(sc, {
								buttonTitle: "TEST",
								buttonSize: "sm",
								buttonType: "icon",
								backgroundColor: "light",
								image: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FontAwesomeIcon, { icon: "share-alt" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(sc, {
								buttonTitle: "TEST",
								buttonSize: "md",
								buttonType: "icon",
								backgroundColor: "light",
								image: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FontAwesomeIcon, { icon: "share-alt" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(sc, {
								buttonTitle: "TEST",
								buttonSize: "lg",
								buttonType: "icon",
								backgroundColor: "light",
								image: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FontAwesomeIcon, { icon: "share-alt" })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Qs, {
						width: 3,
						desktop: 3,
						hasGutter: true,
						gutterSize: 32,
						style: {
							marginLeft: "16px",
							backgroundColor: "#323a44"
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(sc, {
								buttonTitle: "TEST",
								buttonSize: "sm",
								buttonType: "icon",
								backgroundColor: "dark",
								image: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FontAwesomeIcon, { icon: "share-alt" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(sc, {
								buttonTitle: "TEST",
								buttonSize: "md",
								buttonType: "icon",
								backgroundColor: "dark",
								image: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FontAwesomeIcon, { icon: "share-alt" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(sc, {
								buttonTitle: "TEST",
								buttonSize: "lg",
								buttonType: "icon",
								backgroundColor: "dark",
								image: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FontAwesomeIcon, { icon: "share-alt" })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Qs, {
						width: 3,
						desktop: 3,
						hasGutter: true,
						gutterSize: 32,
						style: { marginLeft: "16px" },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(sc, {
								copy: "what",
								buttonTitle: "TEST",
								buttonSize: "sm",
								buttonType: "inline",
								backgroundColor: "light",
								imageAlignment: "right",
								image: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FontAwesomeIcon, { icon: "share-alt" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(sc, {
								copy: "what",
								buttonTitle: "TEST",
								buttonSize: "md",
								buttonType: "inline",
								backgroundColor: "light",
								imageAlignment: "right",
								image: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FontAwesomeIcon, { icon: "share-alt" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(sc, {
								copy: "what",
								buttonTitle: "TEST",
								buttonSize: "lg",
								buttonType: "inline",
								backgroundColor: "light",
								imageAlignment: "right",
								image: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FontAwesomeIcon, { icon: "share-alt" })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Qs, {
						width: 3,
						desktop: 3,
						hasGutter: true,
						gutterSize: 32,
						style: { marginLeft: "16px" },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(sc, {
								copy: "hello",
								buttonTitle: "TEST",
								buttonSize: "sm",
								buttonType: "intext",
								backgroundColor: "light",
								to: "https://usaspending.gov"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(sc, {
								copy: "hello",
								buttonTitle: "TEST",
								buttonSize: "md",
								buttonType: "intext",
								backgroundColor: "light",
								to: "https://usaspending.gov"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(sc, {
								copy: "hello",
								buttonTitle: "TEST",
								buttonSize: "lg",
								buttonType: "intext",
								backgroundColor: "light",
								to: "https://usaspending.gov"
							})
						]
					})
				]
			})
		}) });
	};
}))();
export { TempPage as default };
