import { n as __esmMin, t as __commonJSMin } from "./rolldown-runtime-D1cXj70v.js";
import { go as require_jsx_runtime, i as init_Footer, r as Footer_default } from "./index.js-Dk2VDaPz.js";
import { D as init_metaTagHelper, g as dbInfoPageMetaTags, i as init_MetaTags, n as init_HeaderContainer, r as MetaTags, t as HeaderContainer_default } from "./HeaderContainer-CiRwnRgy.js";
import "react";
//#region src/_scss/pages/dbInfo/dbInfoPage.scss
var require_dbInfoPage = /* @__PURE__ */ __commonJSMin((() => {}));
//#endregion
//#region src/js/components/about/DBInfo.jsx
var import_jsx_runtime, DBInfo;
//#endregion
__esmMin((() => {
	init_metaTagHelper();
	init_Footer();
	init_HeaderContainer();
	init_MetaTags();
	import_jsx_runtime = require_jsx_runtime();
	require_dbInfoPage();
	DBInfo = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "usa-da-db-info",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetaTags, { ...dbInfoPageMetaTags }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeaderContainer_default, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				id: "main-content",
				className: "main-content",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "article-wrapper",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Limitation on Permissible Use of Dun & Bradstreet, Inc. Data" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "This website contains data supplied by third party information suppliers, one of which is D&B. For the purposes of the following limitation on permissible use of D&B data, which includes each entity's DUNS Number and its associated business information, \"D&B Open Data\" is defined as the following data elements: Business Name, Street Address, City Name, State/Province Name, Country Name, County Code, State/Province Code, State/Province Abbreviation, and ZIP/Postal Code." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "D&B hereby grants you, the user, a license for a limited, non-exclusive use of D&B data within the limitations set forth herein. By using this website you agree that you shall not use D&B Open Data without giving written attribution to the source of such data (i.e., D&B) and shall not access, use or disseminate D&B Open Data in bulk, (i.e., in amounts sufficient for use as an original source or as a substitute for the product and/or service being licensed hereunder)." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Except for data elements identified above as D&B Open Data, under no circumstances are you authorized to use any other D&B data for commercial, resale or marketing purposes (e.g., identifying, quantifying, segmenting and/or analyzing customers and prospective customers). Systematic access (electronic harvesting) or extraction of content from the website, including the use of \"bots\" or \"spiders\", is prohibited. Federal government entities are authorized to use the D&B data for purposes of acquisition as defined in FAR 2.101 and for the purpose of managing Federal awards, including sub-awardees, or reporting Federal award information." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The Federal Government and its agencies assume no liability for the use of the D&B data once it is downloaded or accessed. The D&B data is provided \"as is\" without warranty of any kind. The D&B data is the intellectual property of D&B. In no event will D&B or any third party information supplier be liable in any way with regard to the use of the D&B data. For more information about the scope of permissible use of D&B data licensed hereunder, please contact D&B at datause_govt@dnb.com" })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer_default, { pageName: "DBInfo" })
		]
	});
}))();
export { DBInfo as default };
