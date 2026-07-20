import { n as __esmMin } from "./rolldown-runtime-D1cXj70v.js";
import { Ba as storeSingleton, Gn as init_queryParams, Ha as Link, Kn as getStickyBreakPointForSidebar, Kr as FontAwesomeIcon, La as init_useQueryParams, Ra as useQueryParams, Un as combineQueryParams, Va as init_development, Wn as getQueryParamString, an as init_url, fn as init_modalActions, go as require_jsx_runtime, no as init_es, on as sanitizeUrl, oo as useDispatch, pn as showModal, pr as init_stickyHeader, qa as useNavigate, qn as init_stickyHeaderHelper, qr as init_dist, za as init_storeSingleton } from "./index.js-Dk2VDaPz.js";
import { D as init_metaTagHelper, a as aboutPageMetaTags } from "./HeaderContainer-CiRwnRgy.js";
import { n as init_PageWrapper, t as PageWrapper } from "./PageWrapper-Dqa3KwTb.js";
import { t as require_aboutPage } from "./aboutPage-BPtHvv7H.js";
import { useEffect, useState } from "react";
import { find, throttle } from "lodash-es";
//#region src/js/components/about/Mission.jsx
var import_jsx_runtime$6, Mission;
var init_Mission = __esmMin((() => {
	import_jsx_runtime$6 = require_jsx_runtime();
	Mission = () => /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
		className: "about-section-wrapper",
		id: "about-mission",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("h2", {
				className: "about-section-title",
				children: "Mission"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("h3", {
				className: "about-subtitle",
				children: "Building a more transparent government."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", {
				className: "about-section-content",
				children: /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("p", { children: "USAspending.gov is the official source for spending data for the U.S. Government. Its mission is to show the American public what the federal government spends every year and how it spends the money. You can follow the money from the Congressional appropriations to the federal agencies and down to local communities and businesses." })
			})
		]
	});
}));
//#endregion
//#region src/js/components/about/Background.jsx
var import_jsx_runtime$5, Background;
var init_Background = __esmMin((() => {
	import_jsx_runtime$5 = require_jsx_runtime();
	Background = () => /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
		className: "about-section-wrapper",
		id: "about-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("h2", {
				className: "about-section-title",
				children: "Background"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("h3", {
				className: "about-subtitle",
				children: "A continuing effort."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("div", {
				className: "about-section-content",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("p", { children: "The Federal Funding Accountability and Transparency Act of 2006 (FFATA) was signed into law on September 26, 2006. The legislation required that federal contract, grant, loan, and other financial assistance awards of more than $25,000 be displayed on a publicly accessible and searchable website to give the American public access to information on how their tax dollars are being spent. In 2008, FFATA was amended by the Government Funding Transparency Act, which required prime recipients to report details on their first-tier sub-recipients for awards made as of October 1, 2010." }),
					/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("p", { children: "The transparency efforts of FFATA were expanded with the enactment of the Digital Accountability and Transparency Act (DATA Act) Pub. L. 113-101 on May 9, 2014." }),
					/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("strong", { children: "The purpose of the DATA Act, as directed by Congress, is to:" }) }),
					/* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("ul", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("li", { children: "Expand FFATA by disclosing direct agency expenditures and linking federal contract, loan, and grant spending information to federal agency programs" }),
						/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("li", { children: "Establish governmentwide data standards for financial data and provide consistent, reliable, and searchable data that is displayed accurately" }),
						/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("li", { children: "Simplify reporting, streamline reporting requirements, and reduce compliance costs, while improving transparency" }),
						/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("li", { children: "Improve the quality of data submitted to USAspending.gov by holding agencies accountable." })
					] })
				]
			})
		]
	});
}));
//#endregion
//#region src/js/components/about/MoreInfo.jsx
var import_jsx_runtime$4, MoreInfo;
var init_MoreInfo = __esmMin((() => {
	init_development();
	import_jsx_runtime$4 = require_jsx_runtime();
	MoreInfo = () => /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("div", {
		className: "about-section-wrapper",
		id: "about-more-info",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("h2", {
			className: "about-section-title",
			children: "More Information"
		}), /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
			className: "about-section-content",
			children: /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("p", { children: [
				"For more information about the data, see the",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("a", {
					target: "_blank",
					rel: "noopener noreferrer",
					href: "https://onevoicecrm.my.site.com/usaspending/s/recordlist/Knowledge__kav/00B3d000000V4WDEA0",
					children: "FAQs"
				}),
				"\xA0and the",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)(Link, {
					to: "/data-dictionary",
					children: "Data Dictionary"
				}),
				"."
			] })
		})]
	});
}));
//#endregion
//#region src/js/components/about/Contact.jsx
var import_jsx_runtime$3, Contact;
var init_Contact = __esmMin((() => {
	import_jsx_runtime$3 = require_jsx_runtime();
	Contact = () => /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
		className: "about-section-wrapper",
		id: "about-contact",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("h2", {
				className: "about-section-title",
				children: "Contact Us"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("h3", {
				className: "about-subtitle",
				children: "How to reach us."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
				className: "about-section-content",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("p", { children: "We look forward to hearing from you and having the opportunity to answer your questions and comments." }), /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("div", {
					className: "about-section-content-inline-buttons",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
						className: "button-holder",
						children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("a", {
							target: "_blank",
							rel: "noopener noreferrer",
							href: "https://onevoicecrm.my.site.com/usaspending/s/",
							children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("button", {
								className: "usa-button-outline",
								"aria-label": "Visit Our Community Page",
								title: "Visit Our Community Page",
								children: "Visit Our Community Page"
							})
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("div", {
						className: "button-holder",
						children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("a", {
							href: `mailto:usaspending.help@fiscal.treasury.gov?subject=${encodeURIComponent("Contact Us")}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("button", {
								className: "usa-button-outline",
								"aria-label": "Send Us A Message",
								title: "Send Us A Message",
								children: "Send Us A Message"
							})
						})
					})]
				})]
			})
		]
	});
}));
//#endregion
//#region src/js/helpers/redirectHelper.js
var showRedirectModal;
var init_redirectHelper = __esmMin((() => {
	init_storeSingleton();
	init_modalActions();
	init_url();
	showRedirectModal = (url) => {
		const safeUrl = sanitizeUrl(url);
		if (safeUrl) storeSingleton.store.dispatch(showModal(safeUrl));
	};
}));
//#endregion
//#region src/js/components/about/Development.jsx
var import_jsx_runtime$2, Development;
var init_Development = __esmMin((() => {
	init_redirectHelper();
	import_jsx_runtime$2 = require_jsx_runtime();
	Development = () => {
		const clickedLink = () => {
			showRedirectModal("https://github.com/fedspendingtransparency/usaspending-website/wiki");
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
			className: "about-section-wrapper",
			id: "about-development",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("h2", {
				className: "about-section-title",
				children: "Development and Releases"
			}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
				className: "about-section-content",
				children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", { children: [
					"USAspending.gov is developed using agile methods. Our current release approach is a two-week development sprint, followed by a two-week testing period, followed by public release. We begin coding the next sprint at the same time we’re testing the first sprint, so updates are published to the website about every two weeks. If you want us to send you the Release Notes when an update goes out, please",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("a", {
						href: `mailto:join-usaspending@lists.fiscal.treasury.gov?subject=${encodeURIComponent("Yes! I'd like to receive updates.")}`,
						children: "sign up here"
					}),
					". Previous Release Notes are available\xA0",
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("button", {
						className: "usa-button-link",
						role: "link",
						onClick: clickedLink,
						children: "here"
					}),
					"."
				] })
			})]
		});
	};
}));
//#endregion
//#region src/js/components/about/Licensing.jsx
var import_jsx_runtime$1, Licensing;
var init_Licensing = __esmMin((() => {
	init_development();
	init_es();
	init_modalActions();
	init_dist();
	import_jsx_runtime$1 = require_jsx_runtime();
	Licensing = () => {
		const dispatch = useDispatch();
		const onClick = () => dispatch(showModal("https://github.com/fedspendingtransparency"));
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
			className: "about-section-wrapper",
			id: "about-licensing",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("h2", {
				className: "about-section-title",
				children: "Licensing"
			}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
				className: "about-section-content",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("p", { children: [
						"The U.S. Department of the Treasury, Bureau of the Fiscal Service is committed to providing open data to enable effective tracking of federal spending.  The data on this site is available to copy, adapt, redistribute, or otherwise use for non-commercial or for commercial purposes, subject to the Limitation on Permissible Use of Dun & Bradstreet, Inc. Data\xA0",
						/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Link, {
							to: "/db_info",
							children: "noted on the homepage"
						}),
						"."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("p", { children: [
						"The code in our\xA0",
						/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("button", {
							className: "usa-button-link",
							role: "link",
							onClick,
							children: ["public github repository", /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
								className: "usa-button-link__icon",
								children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(FontAwesomeIcon, { icon: "external-link-alt" })
							})]
						}),
						"\xA0is available for public use under the Creative Commons CC0 Public Domain Dedication license."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("h3", {
						className: "about-subtitle",
						children: "Citations"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("p", { children: "There are a few different ways to cite data from USAspending.gov. Reference the examples below, based on the type of data being cited." }),
					/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("h4", {
						className: "about-citation",
						children: "Suggested General Citation:"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("p", {
						className: "citation-wrapper",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
								className: "citation-it",
								children: "USAspending.gov"
							}),
							", U.S. Department of Treasury, Bureau of the Fiscal Service,",
							/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("a", {
								href: "https://www.usaspending.gov",
								children: "https://www.usaspending.gov"
							}),
							". Accessed [Day] [Month]. [Year]."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("h4", {
						className: "about-citation",
						children: "Suggested Specific Profile/Award Citations:"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("p", {
						className: "citation-wrapper",
						children: [
							"“Contract to Science Systems and Applications, INC.” ",
							/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
								className: "citation-it",
								children: "USAspending.gov"
							}),
							",",
							/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("a", {
								href: "https://www.usaspending.gov/award/CONT_AWD_NNG17HP01C_8000_-NONE-_-NONE-",
								children: "www.usaspending.gov/award/CONT_AWD_NNG17HP01C_8000_-NONE-_-NONE-"
							}),
							". Accessed [Day] [Month]. [Year]."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("p", {
						className: "citation-wrapper",
						children: [
							"“State Profile: Maine.” ",
							/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("span", {
								className: "citation-it",
								children: "USAspending.gov"
							}),
							",",
							/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("a", {
								href: "https://www.usaspending.gov/state/maine/2025",
								children: "https://www.usaspending.gov/state/maine/2025"
							}),
							". Accessed [Day] [Month]. [Year]."
						]
					})
				]
			})]
		});
	};
}));
//#endregion
//#region src/js/components/about/AboutPage.jsx
/**
* AboutPage.jsx
* Created by Mike Bray 11/20/2017
**/
var import_jsx_runtime, aboutSections, AboutPage;
//#endregion
__esmMin((() => {
	init_development();
	init_queryParams();
	init_stickyHeader();
	init_stickyHeaderHelper();
	init_metaTagHelper();
	init_useQueryParams();
	init_PageWrapper();
	init_Mission();
	init_Background();
	init_MoreInfo();
	init_Contact();
	init_Development();
	init_Licensing();
	import_jsx_runtime = require_jsx_runtime();
	require_aboutPage();
	aboutSections = [
		{
			section: "mission",
			label: "Mission"
		},
		{
			section: "background",
			label: "Background"
		},
		{
			section: "development",
			label: "Development and Releases"
		},
		{
			section: "licensing",
			label: "Licensing"
		},
		{
			section: "more-info",
			label: "More Information"
		},
		{
			section: "contact",
			label: "Contact"
		}
	];
	AboutPage = () => {
		const history = useNavigate();
		const query = useQueryParams();
		const [activeSection, setActiveSection] = useState(query.section || "mission");
		const jumpToSection = (section = "") => {
			if (!find(aboutSections, { section })) return;
			const sectionDom = document.querySelector(`#about-${section}`);
			if (!sectionDom) return;
			if (!window.location.href.includes(`section=${section}`)) {
				const newQueryParams = combineQueryParams(query, { section: `${section}` });
				history({ path: `${getQueryParamString(newQueryParams)}` }, { replace: true });
			}
			setActiveSection(section);
			const conditionalOffset = window.scrollY < getStickyBreakPointForSidebar() ? 106 : 10;
			const sectionTop = sectionDom.offsetTop - 66 - conditionalOffset;
			window.scrollTo({
				top: sectionTop - 25,
				left: 0,
				behavior: "smooth"
			});
		};
		useEffect(throttle(() => {
			let isMounted = true;
			if (isMounted) {
				const urlSection = query.section;
				if (urlSection) jumpToSection(urlSection);
			}
			return () => {
				isMounted = false;
			};
		}, 100), [history, query.section]);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageWrapper, {
			pageName: "about",
			classNames: "usa-da-about-page",
			metaTagProps: aboutPageMetaTags,
			title: "About",
			inPageNav: true,
			sections: aboutSections,
			jumpToSection,
			activeSection,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				id: "main-content",
				className: "main-content",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "about-content-wrapper",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "about-content",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "about-padded-content",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mission, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Background, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Development, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Licensing, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoreInfo, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Contact, {})
							]
						})
					})
				})
			})
		});
	};
}))();
export { AboutPage as default };
