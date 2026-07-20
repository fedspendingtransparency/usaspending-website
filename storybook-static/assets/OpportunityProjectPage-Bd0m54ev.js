import { n as __esmMin, t as __commonJSMin } from "./rolldown-runtime-D1cXj70v.js";
import { Fr as init_dist, Pr as FontAwesomeIcon, Ua as init_es, en as init_modalActions, fr as Qs, gr as Zs, ir as $s, qa as useDispatch, ro as require_jsx_runtime, tn as showModal, xr as init_index_es } from "./index.js-CgeUxZJy.js";
import { D as init_metaTagHelper, I as topPageMetaTags } from "./HeaderContainer-DuB8bISr.js";
import { n as init_PageWrapper, t as PageWrapper } from "./PageWrapper-BZX48lf-.js";
import "react";
//#region src/_scss/pages/covid19/opportunityProject.scss
var require_opportunityProject = /* @__PURE__ */ __commonJSMin((() => {}));
//#endregion
//#region src/js/components/covid19/OpportunityProjectPage.jsx
var import_jsx_runtime, OpportunityProjectPage;
//#endregion
__esmMin((() => {
	init_PageWrapper();
	init_metaTagHelper();
	init_index_es();
	init_dist();
	init_es();
	init_modalActions();
	import_jsx_runtime = require_jsx_runtime();
	require_opportunityProject();
	OpportunityProjectPage = () => {
		const dispatch = useDispatch();
		const handleClick = (e) => {
			e.preventDefault();
			dispatch(showModal(e.target.href));
		};
		const externalLink = (href, linkText) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
			href,
			onClick: handleClick,
			children: [
				linkText,
				"\xA0",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FontAwesomeIcon, {
					size: "sm",
					icon: "external-link-alt"
				})
			]
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageWrapper, {
			pageName: "The Opportunity Project",
			title: "The Opportunity Project",
			noHeader: true,
			metaTagProps: topPageMetaTags,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zs, {
				className: "top-page",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Qs, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)($s, {
					desktop: {
						span: 8,
						offset: 2
					},
					className: "content",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
						role: "main",
						className: "main-content",
						id: "main-content",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "main-heading",
								children: "Analyzing Equity in Federal COVID-19 Spending: The Opportunity Project"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "img/opportunity-project-logo.png",
								role: "presentation",
								alt: ""
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The Bureau of the Fiscal Service (Fiscal) at the U.S. Department of the Treasury is proud to have been selected by The Opportunity Project as a Challenge Partner to collaborate, innovate and assist in solving the problem of analyzing equity in COVID-19 federal funding." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The Opportunity Project (TOP) is a public & private sector innovation program led by Census Open Innovation Labs at the U.S. Census Bureau with a focus on the nation’s toughest challenges. TOP brings together technologists, government, and community leaders to rapidly prototype digital products— powered by federal open data—that solve real-world problems for people across the country TOP’s 2021 sprint theme is “The World Post COVID-19: Society, Economy, and Environment”." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									"The team behind ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "/about",
										children: "USAspending.gov"
									}),
									" at Fiscal brought together tech teams, product advisors, user advocates, local government officials and federal data stewards from all over America to collaborate on the mission of analyzing equity in COVID-19 federal funding for our TOP 2021 sprint.  We want to thank and acknowledge all  of the TOP participants for volunteering their time, contributing to federal open data innovation, serving as a resource, and collaborating across sectors in service of helping communities."
								] })
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("picture", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("source", {
									srcSet: "img/opportunity-project-map.webp 950w",
									type: "image/webp"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("source", {
									srcSet: "img/opportunity-project-map.png",
									type: "image/png"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: "img/opportunity-project-map.png",
									alt: "United States map displaying locations of teams who participated in the Bureau of the Fiscal Service's 2021 sprint for The Opportunity Project"
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "list-heading",
									children: "Tech Teams:"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Bowie State University" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Morehouse College" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "University of Kansas Center for Public Partnerships and Research" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "The Mom Project" })
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "list-heading",
									children: "Product Advisors:"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Flow Immersive" }) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "list-heading",
									children: "User Advocates:"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "The Girl Scout Research Institute at Girl Scouts of the USA" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "The Honorable Elbra Wedgeworth, Denver, Colorado" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Dr. Bina Shrimali, Researcher, Public Health & Community Development" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Christian McDonald, Innovation Director, Dallas Morning News Journalism Innovation Endowment at The University of Texas at Austin" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Maria Howeth, Grants Specialist, Tribal Nations, Ecivis" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Poonam Soans, Chief Data Officer, The State of New Jersey" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Department of Human Services, Allegheny County, Pennsylvania" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Johnson County Public Health, Johnson County, Iowa" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Office of the Chief Financial Officer, Data Strategy & Analytics, City of Detroit, MI" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "City of Laredo Information Services Department, Laredo, Texas" })
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "list-heading",
									children: "Federal Data Stewards:"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									"To see a comprehensive list of federal open datasets that were curated in this sprint to help analyze equity in COVID-19 federal funding visit the",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "https://opportunity.census.gov/data/covid-spending/",
										target: "_blank",
										rel: "noopener noreferrer",
										children: "TOP datasets page"
									}),
									"."
								] })
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "bold",
									children: "THE CHALLENGE"
								}), " – Develop innovative tools that combine datasets to help inform community leaders on equitable distribution of federal funding. Teams were encouraged to analyze how federal COVID-19 spending has been shared with communities most vulnerable to impacts of the pandemic."] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "bold",
									children: "THE PROBLEM"
								}), " – Over the course of the COVID-19 pandemic, the federal government has made $4.5 trillion available for relief efforts. How has this money been spent? A greater understanding of how government spending reaches different communities is a step forward for data transparency and a call-to-action to improve equity."] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "bold",
									children: "THE OPPORTUNITY"
								}), " – The correlation between federal spending data and demographic data is critical to understanding how federal funds are distributed to various communities, but this correlation has not been fully explored or made accessible to local stakeholders. This creates blind spots for government leaders as they make decisions on funding allocation and addressing inequities in their communities. To help address this need, the opportunity project sought technologists to help innovate and build digital products with experts (known as user advocates) on the ground in communities across America."] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "bold",
									children: "THE TARGET END USERS"
								}), " – Local government officials, federal funding decision makers, equity policy experts, community advocacy organizations and data journalists."] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "bold",
									children: "THE VISION"
								}), " – By bringing together Census, Treasury, and other open data sources, there can be innovative digital tools built to help stakeholders better understand whether the federal government is equitably distributing federal funds during the COVID-19 pandemic."] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "bold",
									children: "THE RESULTS"
								}), " – The Opportunity Project 2021 sprint concluded in November 2021.  Working with user advocates, data stewards, product advisors and following Census’s TOP product development toolkit, tech teams submitted innovative tools to analyze equity in federal COVID-19 spending.  The results are both inspiring and illuminating.  To see what tech teams built, please visit the website links below."] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "bold",
									children: "PLEASE NOTE: Inclusion on this page does not constitute endorsement by the Department of the Treasury, Bureau of the Fiscal Service, or any employees thereof of any product, service, or enterprise."
								}) })
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Bowie State University" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Product statement: Bowie State University Opportunity Project uses publicly accessible CDC’s Social Vulnerability Index, CDC’s County vaccination rates, the ARP county COVID-19 vaccine spending data, and Co-est 2020 to assess COVID-19 vaccination and equity problems for community leaders as end users." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Link: ", externalLink("https://app.flow.gl/flow/3xfvr3", "Bowie State University TOP Project on Flow Immersive")] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Morehouse College" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Product statement: The MSI (Minority Serving Institutions) COVID-19 Relief Dashboard for Equity and Transparency uses several federal datasets surrounding school enrollment and COVID-19 relief awards to highlight whether or not COVID-19 funding was equitably distributed to MSIs around the country for federal, state, and local officials and organizations." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Link: ", externalLink("https://a.flow.gl/flow/kuo62d54", "MSI COVID-19 Relief Dashboard for Equity and Transparency")] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "University of Kansas Center for Public Partnerships and Research" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Product statement: The Child Care Planning Assessment Tool will help community leaders better assess and understand the connection between childcare and equitable labor participation including a county level snapshot of child care supply and demand and interactive calculators to begin addressing child care needs in their community." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Link: ", externalLink("https://top.kucppr.org/", "Child Care in America | A broken business model (kucppr.org)")] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Video: ", externalLink("https://vimeo.com/638475809", "Kansas & Flow Immersive TOP Project Video Overview")] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "The Mom Project" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Product statement: The PEI (Predictive Equity Index) model employs machine learning and predictive analytics to understand key drivers of equity in the distribution of PPP loans. This methodology allows for creation of a cohesive dataset, allowing for an in-depth assessment of county-level performance of equity, as well as an understanding of how future actions serve to impact anticipated levels of equity in future funding efforts. Taken together, this product allows for policy makers at the county, state, and national-level to take county-level action maximizing the impact of federal dollars on the communities the investments aim to serve." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Link: ", externalLink("https://work.themomproject.com/predictiveequity", "Predictive Equity Index Model, developed by Werklabs, the research division of The Mom Project")] })
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "center",
								children: ["Questions, ideas, or feedback? E-mail us at ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "mailto:usaspending@fiscal.treasury.gov",
									children: "usaspending@fiscal.treasury.gov"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "center",
								children: [
									"We want to thank everyone involved in The Opportunity Project.  Learn more at",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "https://opportunity.census.gov/",
										target: "_blank",
										rel: "noopener noreferrer",
										children: "opportunity.census.gov"
									}),
									"."
								]
							})] })
						]
					})
				}) })
			})
		});
	};
}))();
export { OpportunityProjectPage as default };
