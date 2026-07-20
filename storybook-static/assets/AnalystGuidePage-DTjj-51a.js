import { n as __esmMin } from "./rolldown-runtime-D1cXj70v.js";
import { Ha as Link, Nr as init_index_es, Oa as init_IsMobileContext, Va as init_development, cr as init_socialShare, et as ExternalLink, fn as init_modalActions, go as require_jsx_runtime, gr as $s, no as init_es, oo as useDispatch, or as getBaseUrl, pn as showModal, sr as handleShareOptionClick, tt as init_ExternalLink, wr as Qs } from "./index.js-Dk2VDaPz.js";
import { D as init_metaTagHelper, d as analystGuideMetaTags } from "./HeaderContainer-CiRwnRgy.js";
import { n as init_PageWrapper, t as PageWrapper } from "./PageWrapper-Dqa3KwTb.js";
import { n as init_Accordion, t as Accordion } from "./Accordion-C5PrszdX.js";
import { n as init_BannerPageHeader, t as BannerPageHeader } from "./BannerPageHeader-DCwSVutm.js";
import { n as init_GlossaryLink, t as GlossaryLink } from "./GlossaryLink-CffoixM2.js";
import { n as init_ShareDownloadButtonGroup, t as ShareDownloadButtonGroup } from "./ShareDownloadButtonGroup-DXKEuG6H.js";
import "react";
//#region src/_scss/pages/analystGuide/analystGuide.scss
var init_analystGuide = __esmMin((() => {}));
//#endregion
//#region src/js/components/analystGuide/AnalystGuideQuestions.jsx
var import_jsx_runtime$2, AnalystGuideQuestions;
var init_AnalystGuideQuestions = __esmMin((() => {
	init_development();
	init_Accordion();
	init_GlossaryLink();
	init_ExternalLink();
	import_jsx_runtime$2 = require_jsx_runtime();
	AnalystGuideQuestions = () => {
		const jumpToSection = (section = "") => {
			const sectionDom = document.querySelector(`#${section}`);
			if (!sectionDom) return;
			window.scrollTo({
				top: sectionDom.offsetTop + 585,
				left: 0,
				behavior: "smooth"
			});
		};
		const awardAccountSpendingComparisonQuestions = [
			{
				question: "What is the difference between award and account spending?",
				answer: /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)(import_jsx_runtime$2.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
					className: "analyst-guide__answerStyle",
					children: "Account spending includes all government spending. Award spending is a subset of account spending that includes only money the federal government has paid or promised to pay a non-federal recipient through financial assistance or a contract."
				}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
					className: "analyst-guide__answerStyle",
					children: "For example, account spending includes money used to pay federal government employees’ salaries. This spending is not included in award spending."
				})] })
			},
			{
				question: "How is the value of award and account spending measured?",
				answer: /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)(import_jsx_runtime$2.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
						className: "analyst-guide__answerStyle",
						children: "The value of award and account spending (except for loans) is measured by obligations and outlays. The value of loans is measured using loan subsidy cost."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
						className: "analyst-guide__answerStyle",
						children: "An obligation is a promise made by the government to spend funds. An agency incurs an obligation when it takes an action that requires it to make a payment such as placing an order, signing a contract, awarding a grant, or purchasing a service. Negative obligations, or de-obligations, occur when agencies decrease previous obligations to correct errors or to reflect new information. A de-obligation may be issued when the price of a project was lower than expected."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
						className: "analyst-guide__answerStyle",
						children: "An outlay occurs when money is actually paid out. "
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
						className: "analyst-guide__answerStyle",
						children: "Loan subsidy cost is an estimation made by the government of what a loan will cost over time. "
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
						className: "analyst-guide__answerStyle",
						children: "More information about the data elements used to measure the value of award and account spending is available throughout this guide."
					})
				] })
			},
			{
				question: "How is award spending linked to account spending?",
				answer: /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)(import_jsx_runtime$2.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
						className: "analyst-guide__answerStyle",
						children: "Agencies periodically upload account spending in various formats. One format (account breakdown by award) represents award activity and includes details on federal accounts funding that activity. Agencies also upload transaction level award spending for both contracts and financial assistance. "
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
						className: "analyst-guide__answerStyle",
						children: "These files can be linked together to associate award spending with account spending. If a shared ID cannot be found between these files, award spending may be unlinked to any account."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
						className: "analyst-guide__answerStyle",
						children: [
							"The",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Link, {
								to: "/submission-statistics",
								children: "Agency Submission Statistics page"
							}),
							" ",
							"contains data on this linkage under the “Number of Unlinked Contract Awards” and “Number of Unlinked Assistance Awards” columns."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
						className: "analyst-guide__answerStyle",
						children: [
							"More information about federal accounts is discussed in the",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("button", {
								role: "link",
								className: "analyst-guide__sectionJump",
								onClick: () => jumpToSection("analyst-guide__AccountData"),
								children: "ACCOUNT DATA ELEMENTS"
							}),
							" ",
							"section of this guide."
						]
					})
				] })
			}
		];
		const awardSpendingQuestions = [
			{
				question: "What is a prime award? What is a sub-award? What is prime award transaction? What is a prime award summary?",
				answer: /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)(import_jsx_runtime$2.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
						className: "analyst-guide__answerStyle",
						children: "A prime award is an agreement that the federal government makes with a non-federal entity for the purpose of carrying out a federal program. Prime awards are distinct from sub-awards. A sub-award is an agreement that a prime award recipient makes with another entity to perform a portion of the work for of a prime award."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
						className: "analyst-guide__answerStyle",
						children: "A prime award transaction can be either the initial (also called ‘base’) contract, grant, loan, etc. of a prime award, or any amendment or modification to a prime award."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
						className: "analyst-guide__answerStyle",
						children: "A prime award summary is a roll-up of all related prime award transactions which share a set of identifiers that make up the unique award key. Prime award transactions are aggregated together as prime award summaries using different sets of fields for contracts versus financial assistance award spending."
					})
				] })
			},
			{
				question: "What are the two major categories of award spending?",
				answer: /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)(import_jsx_runtime$2.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
						className: "analyst-guide__answerStyle",
						children: "The two main categories of award spending are financial assistance spending and contract spending."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
						className: "analyst-guide__answerStyle",
						children: "The federal government uses financial assistance spending to transfer money (or in-kind resources) to a non-federal entity to serve a public purpose as defined by Congress. The federal government uses contract spending to purchase the goods and services required to fulfill agencies’ public duties. "
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
						className: "analyst-guide__answerStyle",
						children: "For example, the Federal Highway Administration uses financial assistance spending to provide funds to states for public roads while the Air Force uses contract spending to acquire fighter jets to execute its mission."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
						className: "analyst-guide__answerStyle",
						children: "Some data elements across financial assistance and contract spending are different between the two categories. More information about these differences is available throughout this guide."
					})
				] })
			},
			{
				question: "Which fields in USAspending download files contain prime award summary identifier information?",
				answer: /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)(import_jsx_runtime$2.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
						className: "analyst-guide__answerStyle",
						children: "The award_unique_key, assistance_award_unique_key, and contract_award_unique_key columns contain prime award summary identifier information. "
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
						className: "analyst-guide__answerStyle",
						children: "The award_unique_key field contains both financial assistance and contract prime award summary identifier information. This field is available in Treasury and federal account level account breakdown by award account download files. The assistance_award_unique_key field contains financial assistance prime award summary identifier information. This field is available in financial assistance prime award transaction and summary download files. The contract_award_unique_key field contains contract prime award summary identifier information. This field is available in contract prime award transaction and summary download files. "
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
						className: "analyst-guide__answerStyle",
						children: "These fields may be used to aggregate, filter, or join account breakdown by award, prime award summary, and prime award transaction download files by prime award summary."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
						className: "analyst-guide__answerStyle",
						children: [
							"More information about these identifiers is",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)(ExternalLink, {
								url: "https://github.com/fedspendingtransparency/usaspending-api/wiki/Award-Identifiers",
								className: "analyst-guide__external-link",
								isCard: true,
								showIcon: true,
								children: ["available online", " "]
							}),
							"."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
						className: "analyst-guide__answerStyle",
						children: [
							"The Award ID filter on ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Link, {
								to: "/search",
								children: "Advanced Search"
							}),
							" can be used to filter award spending by the PIID, FAIN and URI data elements. These data elements are important components of prime award summary identifier information."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
						className: "analyst-guide__answerStyle",
						children: [
							"More information about these fields is available in the ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Link, {
								to: "/data-dictionary",
								children: "Data Dictionary"
							}),
							" and the ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("a", {
								href: "https://files.usaspending.gov/docs/Custom+Account+Data+Dictionary.xlsx",
								children: "Custom Account Data Dictionary"
							}),
							"."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
						className: "analyst-guide__answerStyle",
						children: [
							"More information on how to download data from USAspending is available in the",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("button", {
								role: "link",
								className: "analyst-guide__sectionJump",
								onClick: () => jumpToSection("analyst-guide__DataAccess"),
								children: "HOW TO ACCESS THE DATA"
							}),
							" ",
							"section of this guide."
						]
					})
				] })
			},
			{
				question: "What are the different award type categories?",
				answer: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(import_jsx_runtime$2.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
					className: "analyst-guide__answerStyle",
					children: "Both financial assistance and contract spending may be further categorized into more granular award types, such as a purchase order or a direct loan. There are over 20 award type categories available in USAspending."
				}) })
			},
			{
				question: "Which fields in USAspending download files contain award type information?",
				answer: /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)(import_jsx_runtime$2.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
						className: "analyst-guide__answerStyle",
						children: "The assistance_type_code, assistance_type_description, award_type_code, award_type, parent_award_type_code, and parent_award_type fields contain award type information. These fields are used to categorize prime awards and parent prime awards by the various detailed types of financial assistance and contract spending."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
						className: "analyst-guide__answerStyle",
						children: "The assistance_type_code and assistance_type_description fields are available on financial assistance prime award transaction and summary files. The award_type_code and award_type fields are available on contract prime award transaction and summary files, and Treasury and federal account level account breakdown by award files. The parent_award_type and parent_award_type_code fields are available on contract prime award transaction and summary files."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
						className: "analyst-guide__answerStyle",
						children: [
							"The Award Type filter on ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Link, {
								to: "/search",
								children: "Advanced Search"
							}),
							" can be used to filter award spending by these data elements."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
						className: "analyst-guide__answerStyle",
						children: [
							"More information about these fields is available in the ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Link, {
								to: "/data-dictionary",
								children: "Data Dictionary"
							}),
							" and the ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("a", {
								href: "https://files.usaspending.gov/docs/Custom+Account+Data+Dictionary.xlsx",
								children: "Custom Account Data Dictionary"
							}),
							"."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
						className: "analyst-guide__answerStyle",
						children: [
							"More information on how to download data from USAspending is available in the",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("button", {
								role: "link",
								className: "analyst-guide__sectionJump",
								onClick: () => jumpToSection("analyst-guide__DataAccess"),
								children: "HOW TO ACCESS THE DATA"
							}),
							" ",
							"section of this guide."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
						className: "analyst-guide__answerStyle",
						children: [
							"More information about parent awards is available in the ",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("button", {
								role: "link",
								className: "analyst-guide__sectionJump",
								onClick: () => jumpToSection("analyst-guide__ContractTransactions"),
								children: "CONTRACT TRANSACTIONS AND AWARD SUMMARIES"
							}),
							" ",
							"section of this guide."
						]
					})
				] })
			},
			{
				question: "Which fields in USAspending download files contain award spending amount information?",
				answer: /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)(import_jsx_runtime$2.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
						className: "analyst-guide__answerStyle",
						children: "The federal_action_obligation, total_obligated_amount, original_loan_subsidy_cost, and total_loan_subsidy_cost fields contain financial assistance and contract award spending amount information. "
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
						className: "analyst-guide__answerStyle",
						children: "The federal_action_obligation field is available on financial assistance and contract prime award transaction download files. The total_obligated_amount field is available on financial assistance and contract prime award transaction and summary download files. The original_loan_subsidy_cost field is available on financial assistance prime award transaction download files. The total_loan_subsidy_cost field is available on financial assistance prime award transaction and summary download files."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
						className: "analyst-guide__answerStyle",
						children: [
							"The Award Amount filter on ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Link, {
								to: "/search",
								children: "Advanced Search"
							}),
							" can be used to filter award spending by these data elements."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
						className: "analyst-guide__answerStyle",
						children: [
							"More information about these fields is available in the ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Link, {
								to: "/data-dictionary",
								children: "Data Dictionary"
							}),
							" and the ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("a", {
								href: "https://files.usaspending.gov/docs/Custom+Account+Data+Dictionary.xlsx",
								children: "Custom Account Data Dictionary"
							}),
							"."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
						className: "analyst-guide__answerStyle",
						children: [
							"More information on how to download data from USAspending is available in the",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("button", {
								role: "link",
								className: "analyst-guide__sectionJump",
								onClick: () => jumpToSection("analyst-guide__DataAccess"),
								children: "HOW TO ACCESS THE DATA"
							}),
							" ",
							"section of this guide."
						]
					})
				] })
			},
			{
				question: "How are data on financial assistance and contract spending different?",
				answer: /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)(import_jsx_runtime$2.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
						className: "analyst-guide__answerStyle",
						children: "Only financial assistance spending includes Assistance Listings information (formerly CFDA Program). Only contract spending includes North American Industry Classification System (NAICS) and Product and Service Codes (PSC) information. Both financial assistance and contract spending include recipient type information. However, different recipient type categories apply to financial assistance versus contract spending. Financial assistance and contract spending use different fields to identify awards."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
						className: "analyst-guide__answerStyle",
						children: [
							"More information about Assistance Listings data elements is discussed in the ",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("button", {
								role: "link",
								className: "analyst-guide__sectionJump",
								onClick: () => jumpToSection("analyst-guide__AssistanceListings"),
								children: "ASSISTANCE LISTINGS DATA ELEMENTS"
							}),
							" ",
							"section of this guide."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
						className: "analyst-guide__answerStyle",
						children: [
							"More information about NAICS and PSC data elements is discussed in the ",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("button", {
								role: "link",
								className: "analyst-guide__sectionJump",
								onClick: () => jumpToSection("analyst-guide__Industry"),
								children: "INDUSTRY AND PRODUCT DATA ELEMENTS"
							}),
							" ",
							"section of this guide."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
						className: "analyst-guide__answerStyle",
						children: [
							"More information about recipient data elements is discussed in the ",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("button", {
								role: "link",
								className: "analyst-guide__sectionJump",
								onClick: () => jumpToSection("analyst-guide__Recipient"),
								children: "RECIPIENT DATA ELEMENTS"
							}),
							" ",
							"section of this guide."
						]
					})
				] })
			},
			{
				question: "How are data on financial assistance and contract spending similar?",
				answer: /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)(import_jsx_runtime$2.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
						className: "analyst-guide__answerStyle",
						children: "Both financial assistance and contract spending include the following information:"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("ul", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("li", {
							className: "analyst-guide__answerStyle",
							children: "Treasury and federal account categories"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("li", {
							className: "analyst-guide__answerStyle",
							children: "Location information, including primary place of performance and recipient location"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("li", {
							className: "analyst-guide__answerStyle",
							children: "Recipient information, including recipient name, recipient type and recipient location"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("li", {
							className: "analyst-guide__answerStyle",
							children: "Disaster Emergency Fund Codes (DEFC) categories"
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
						className: "analyst-guide__answerStyle",
						children: [
							"More information about account data elements is available in the ",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("button", {
								role: "link",
								className: "analyst-guide__sectionJump",
								onClick: () => jumpToSection("analyst-guide__AccountData"),
								children: "ACCOUNT DATA ELEMENTS"
							}),
							" ",
							"section of this guide."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
						className: "analyst-guide__answerStyle",
						children: [
							"More information about location data elements is available in the ",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("button", {
								role: "link",
								className: "analyst-guide__sectionJump",
								onClick: () => jumpToSection("analyst-guide__LocationData"),
								children: "LOCATION DATA ELEMENTS"
							}),
							" ",
							"section of this guide."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
						className: "analyst-guide__answerStyle",
						children: [
							"More information about recipient data elements is available in the ",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("button", {
								role: "link",
								className: "analyst-guide__sectionJump",
								onClick: () => jumpToSection("analyst-guide__Recipient"),
								children: "RECIPIENT DATA ELEMENTS"
							}),
							" ",
							"section of this guide."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
						className: "analyst-guide__answerStyle",
						children: [
							"More information about DEFC data elements is available in the ",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("button", {
								role: "link",
								className: "analyst-guide__sectionJump",
								onClick: () => jumpToSection("analyst-guide__Disaster"),
								children: "DISASTER AND EMERGENCY DATA ELEMENTS"
							}),
							" ",
							"section of this guide."
						]
					})
				] })
			},
			{
				question: "Are outlays included in award spending data?",
				answer: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(import_jsx_runtime$2.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
					className: "analyst-guide__answerStyle",
					children: "Beginning in FY2022, all agencies were required to submit outlay data for award spending every month. Awards funded by a COVID-19 supplemental were required to submit outlays starting in April of 2020. Any outlay data before this period was optional for agencies to report, and thus may be incomplete."
				}) })
			}
		];
		const financialAssistanceQuestions = [
			{
				question: "How is the value of a loan measured?",
				answer: /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)(import_jsx_runtime$2.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
					className: "analyst-guide__answerStyle",
					children: "There are two data elements used to measure the value of a loan: the face value of the loan and the loan subsidy cost. The face value of a loan is the total amount of the loan. The loan subsidy cost is the government’s estimate of the loan’s likely cost to the government, in net present value terms. Because federal loans are expected to be repaid, the face value of a loan is not considered federal spending (and for loan guarantees, the face value is not even directly provided by the government, but instead from a third-party financial institution)."
				}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
					className: "analyst-guide__answerStyle",
					children: "Loan subsidy cost is calculated based on a credit model specific to the program and, in some cases, the recipient’s characteristics or credit history. Loan subsidy cost allows the government to budget for potential defaults on loans. "
				})] })
			},
			{
				question: "How do the face value and subsidy cost of loans impact the value of award spending?",
				answer: /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)(import_jsx_runtime$2.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
						className: "analyst-guide__answerStyle",
						children: "Positive loan subsidy costs are included in obligations and outlays. The face value of a loan is not included in obligations or outlays. Administrative costs of running the loan or loan guarantee program are excluded from loan subsidy cost calculations."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
						className: "analyst-guide__answerStyle",
						children: "Loan subsidy costs can be positive, negative, or zero depending on whether the government expects to lose money, gain money, or break even on a loan. The loan subsidy cost of a loan should never be larger in absolute value than the face value of the loan. "
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
						className: "analyst-guide__answerStyle",
						children: "When loan subsidy cost is updated to reflect the outcome or current state of loans, agency budgets more accurately reflect resources used for loans."
					})
				] })
			},
			{
				question: "Do agencies update loan data in USAspending through the life of a loan?",
				answer: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(import_jsx_runtime$2.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
					className: "analyst-guide__answerStyle",
					children: "Currently, it’s uncommon for agencies to update loans with corrections to the base record or by adding a modification record. As a result, the face value and subsidy cost data on USAspending generally only reflect the reality at the time of initial reporting. If the face value of the loan is modified during its life (such as if the loan principal is later expanded or the recipient returns part of the original loan), this will generally not be reflected in the data. If the risk profile of a recipient changes, up to and including if they completely default on the loan, this will generally not be reflected in the data. If the loan is forgiven, this will generally not be reflected in the data either. Consequently, loan spending data are generally less accurate than that of other award types."
				}) })
			},
			{
				question: "Which fields in USAspending download files contain loan value information?",
				answer: /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)(import_jsx_runtime$2.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
						className: "analyst-guide__answerStyle",
						children: "The total_face_value_of_loan, face_value_of_loan, total_loan_subsidy_cost, and original_loan_subsidy_cost fields contain loan value data. "
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
						className: "analyst-guide__answerStyle",
						children: "All four fields are available in financial assistance prime award transaction download files. The total_face_value_of_loan and total_loan_subsidy_cost fields are also available in financial assistance prime award summary download files."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
						className: "analyst-guide__answerStyle",
						children: [
							"The Award Amount filter on ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Link, {
								to: "/search",
								children: "Advanced Search"
							}),
							" can be used to filter award spending by loan subsidy cost."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
						className: "analyst-guide__answerStyle",
						children: [
							"More information about these fields is available in the ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Link, {
								to: "/data-dictionary",
								children: "Data Dictionary"
							}),
							"."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
						className: "analyst-guide__answerStyle",
						children: [
							"More information on how to download data from USAspending is available in the",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("button", {
								role: "link",
								className: "analyst-guide__sectionJump",
								onClick: () => jumpToSection("analyst-guide__DataAccess"),
								children: "HOW TO ACCESS THE DATA"
							}),
							" ",
							"section of this guide."
						]
					})
				] })
			}
		];
		const contractTransactionQuestions = [{
			question: "What are Indefinite Delivery Vehicles and how are they represented in USAspending?",
			answer: /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)(import_jsx_runtime$2.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
					className: "analyst-guide__answerStyle",
					children: "Indefinite Delivery Vehicles (IDVs) are vehicles that facilitate the delivery of supply and service orders."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
					className: "analyst-guide__answerStyle",
					children: "Types of IDVs include:"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("ul", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("li", {
						className: "analyst-guide__answerStyle",
						children: "Government-Wide Acquisition Contract (GWAC)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("li", {
						className: "analyst-guide__answerStyle",
						children: "Indefinite Delivery / Requirements Contract"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("li", {
						className: "analyst-guide__answerStyle",
						children: "Indefinite Delivery / Indefinite Quantity (IDIQ) Contract"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("li", {
						className: "analyst-guide__answerStyle",
						children: "Indefinite Delivery / Definite Quantity Contract"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("li", {
						className: "analyst-guide__answerStyle",
						children: "Federal Supply Schedule (FSS)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("li", {
						className: "analyst-guide__answerStyle",
						children: "Basic Ordering Agreement (BOA)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("li", {
						className: "analyst-guide__answerStyle",
						children: "Blanket Purchase Agreements (BPA)"
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
					className: "analyst-guide__answerStyle",
					children: "IDVs can be browsed using award profile pages. IDVs may be searched using Advanced Search."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
					className: "analyst-guide__answerStyle",
					children: "An IDV may contain many contract prime award summaries and other IDVs. The parent_award_id_piid contains the PIID of the IDV contract prime award summary under which an IDV or contract prime award summary was issued."
				})
			] })
		}];
		const dataAccessQuestions = [
			{
				question: "How can I download account spending data?",
				answer: /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)(import_jsx_runtime$2.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
						className: "analyst-guide__answerStyle",
						children: "The following files contain account spending data:"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("ul", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("li", {
							className: "analyst-guide__answerStyle",
							children: "FA_AccountBalances"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("li", {
							className: "analyst-guide__answerStyle",
							children: "TAS_AccountBalances"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("li", {
							className: "analyst-guide__answerStyle",
							children: "FA_AccountBreakdownByPA-OC"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("li", {
							className: "analyst-guide__answerStyle",
							children: "TAS_AccountBreakdownByPA-OC"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("li", {
							className: "analyst-guide__answerStyle",
							children: "FA_AccountBreakdownByAward"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("li", {
							className: "analyst-guide__answerStyle",
							children: "TAS_AccountBreakdownByAward"
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
						className: "analyst-guide__answerStyle",
						children: [
							"These files are available through the ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Link, {
								to: "/download_center/custom_account_data",
								children: "Custom Account Data"
							}),
							" download feature."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
						className: "analyst-guide__answerStyle",
						children: "The AccountBalances files include account balance information. These files will be returned if the Custom Account Data file type filter includes “Account Balances.”"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
						className: "analyst-guide__answerStyle",
						children: "The AccountBreakdownByPA-OC files include account data with program activity and object class information. These files will be returned if the Custom Account Data file type filter includes “Account Breakdown by Program Activity & Object Class.”"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
						className: "analyst-guide__answerStyle",
						children: "The AccountBreakdownByAward files include account data with prime award level information. These files will be returned if the Custom Account Data file type filter includes “Account Breakdown by Award.”"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
						className: "analyst-guide__answerStyle",
						children: "The data in account spending files which begin with “FA” are aggregated to the Federal Account level. The data in account spending files which begin with “TAS” are broken out to the Treasury Account Symbol level."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
						className: "analyst-guide__answerStyle",
						children: [
							"More information about these fields is available in the ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Link, {
								to: "/data-dictionary",
								children: "Data Dictionary"
							}),
							" and the ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("a", {
								href: "https://files.usaspending.gov/docs/Custom+Account+Data+Dictionary.xlsx",
								children: "Custom Account Data Dictionary"
							}),
							"."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
						className: "analyst-guide__answerStyle",
						children: [
							"More information on federal and Treasury accounts is available in the",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("button", {
								role: "link",
								className: "analyst-guide__sectionJump",
								onClick: () => jumpToSection("analyst-guide__AccountData"),
								children: "ACCOUNT DATA ELEMENTS"
							}),
							" ",
							"section of this guide."
						]
					})
				] })
			},
			{
				question: "How can I download prime award transaction data?",
				answer: /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)(import_jsx_runtime$2.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
						className: "analyst-guide__answerStyle",
						children: "The following files contain prime award transaction data:"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("ul", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("li", {
							className: "analyst-guide__answerStyle",
							children: "Assistance_PrimeTransactions"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("li", {
							className: "analyst-guide__answerStyle",
							children: "Contracts_PrimeTransactions"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("li", {
							className: "analyst-guide__answerStyle",
							children: "Assistance_Delta"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("li", {
							className: "analyst-guide__answerStyle",
							children: "Contracts_Delta"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("li", {
							className: "analyst-guide__answerStyle",
							children: "Assistance_Full"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("li", {
							className: "analyst-guide__answerStyle",
							children: "Contracts_Full "
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
						className: "analyst-guide__answerStyle",
						children: "Each row in these files represents a prime award transaction within a prime award summary. "
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
						className: "analyst-guide__answerStyle",
						children: [
							"The Assistance_PrimeTransactions and Contract_PrimeTransactions files are available through the ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Link, {
								to: "/search",
								children: "Advanced Search"
							}),
							" and ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Link, {
								to: "/download_center/custom_award_data",
								children: "Custom Award Data"
							}),
							" download features. For Advanced Search, both files are returned if the level of data is set to “Transaction.” For Custom Award Data, the Assistance_PrimeTransactions file is returned if the Award Type filter includes “Grants,” “Direct Payments,” “Loans,” “Insurance,” or “Other Financial Assistance.” The Contracts_PrimeTransactions file is returned if the Award Type filter includes “Contracts” or “Contract IDVs.” "
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
						className: "analyst-guide__answerStyle",
						children: [
							"The Assistance_Delta, Assistance_Full, Contracts_Delta and Contracts_Full files are available through the ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Link, {
								to: "/download_center/award_data_archive",
								children: "Award Data Archive"
							}),
							" download feature. The Assistance_Full and Assistance_Delta files are returned if the Award Type is set to “Financial Assistance.” The Contracts_Full and Contracts_Delta files are returned if the Award Type is set to “Contracts.”"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
						className: "analyst-guide__answerStyle",
						children: "Which file you should download and how you should access the file depends on your use case."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
						className: "analyst-guide__answerStyle",
						children: "The Assistance_PrimeTransactions and Contracts_PrimeTransactions files are generated on demand based on selected specifications. Use these files if you only need prime award transaction data which meet certain criteria and can wait for the USAspending server to process your request. Access these files through Advanced Search to download a smaller amount of prime award transaction data which meets very specific criteria. Access these files through Custom Award Download to download a larger amount of prime award transaction data."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
						className: "analyst-guide__answerStyle",
						children: "The Assistance_Delta, Assistance_Full, Contracts_Delta, and Contracts_Full files include major agencies’ prime award transaction data for full fiscal years. These files are pre-prepared and can be accessed instantaneously. Use these files to maintain a copy of or to quickly access agency prime award transaction data."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
						className: "analyst-guide__answerStyle",
						children: [
							"More information about the columns in these files is available in the ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Link, {
								to: "/data-dictionary",
								children: "Data Dictionary"
							}),
							" and throughout this guide."
						]
					})
				] })
			},
			{
				question: "How can I download prime award summary data?",
				answer: /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)(import_jsx_runtime$2.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
						className: "analyst-guide__answerStyle",
						children: "Prime award summary data are contained in the Assistance_PrimeAwardSummaries and Contracts_PrimeAwardSummaries files. Each row in these files represents a financial assistance or contract prime award summary."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
						className: "analyst-guide__answerStyle",
						children: [
							"The Assistance_PrimeAwardSummaries and Contracts_PrimeAwardSummaries files are available through ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Link, {
								to: "/search",
								children: "Advanced Search"
							}),
							" and the ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Link, {
								to: "/disaster/covid-19",
								children: "COVID-19 Spending profile page"
							}),
							" download features. For Advanced Search, these files are both returned if the level of data is set to “Award.”"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
						className: "analyst-guide__answerStyle",
						children: "How you should access these files depends on your use case. "
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
						className: "analyst-guide__answerStyle",
						children: "When accessed through Advanced Search, the Assistance_PrimeAwardSummaries and Contracts_PrimeAwardSummaries files are generated on demand based on selected specifications. Access these files through advanced search to download prime award summary data which meet very specific criteria."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
						className: "analyst-guide__answerStyle",
						children: "When accessed through the COVID-19 Spending profile page, the Assistance_PrimeAwardSummaries and Contracts_PrimeAwardSummaries files are pre-prepared with all COVID-19 prime award summary data. These files can be accessed instantaneously through this page. Access these files through the COVID-19 Spending Profile page if you need a broad range of prime award summary data related to COVID-19."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
						className: "analyst-guide__answerStyle",
						children: [
							"More information about the columns in these files is available in the ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Link, {
								to: "/data-dictionary",
								children: "Data Dictionary"
							}),
							" and throughout this guide."
						]
					})
				] })
			},
			{
				question: "I’d like to use the API – where can I learn more about it?",
				answer: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(import_jsx_runtime$2.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
					className: "analyst-guide__answerStyle",
					children: [
						"The ",
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("a", {
							href: "https://api.usaspending.gov/",
							children: "API page"
						}),
						" on USAspending offers general API guidance, tutorials, request recipes, and more. A ",
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("a", {
							href: "https://api.usaspending.gov/docs/endpoints",
							children: "list of endpoints"
						}),
						" is available online. The download files described above are available through the API."
					]
				}) })
			},
			{
				question: "How can I download a copy of the full database?",
				answer: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(import_jsx_runtime$2.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
					className: "analyst-guide__answerStyle",
					children: [
						"The USAspending ",
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("a", {
							href: "https://onevoicecrm.my.site.com/usaspending/s/database-download",
							children: "SQL Database Downloads page"
						}),
						" includes instructions and links to help download snapshots of the USAspending database as a PostgreSQL archive. This resource is intended for advanced users. The full database is over 1.5 terabytes and will continue to increase in size. The process to complete a full database restore can take many hours to complete."
					]
				}) })
			}
		];
		const agencyDataQuestions = [
			{
				question: "What is the difference between an awarding agency and a funding agency?",
				answer: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(import_jsx_runtime$2.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
					className: "analyst-guide__answerStyle",
					children: "The awarding agency for an award is the agency that creates and administers the award, while funding agencies pay for the award. In most cases, the awarding and funding agency are the same. The division of funding and awarding agencies benefits many smaller agencies, who may not have the staff available to administer an award."
				}) })
			},
			{
				question: "What are sub-tier agencies?",
				answer: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(import_jsx_runtime$2.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
					className: "analyst-guide__answerStyle",
					children: "Sub-tier agencies are the divisions of top-tier federal agencies. For example, the IRS is a sub-tier agency of The U.S. Department of the Treasury, as the FBI is for The U.S. Department of Justice. "
				}) })
			},
			{
				question: "Where is the full list of agency names and codes?",
				answer: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(import_jsx_runtime$2.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
					className: "analyst-guide__answerStyle",
					children: [
						"The ",
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("a", {
							href: "https://files.usaspending.gov/reference_data/agency_codes.csv",
							children: "agency_codes.csv"
						}),
						" file includes data on agency and sub-tier agency names and codes used throughout USAspending. The ",
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("a", {
							href: "https://sam.gov/content/hierarchy",
							children: "Federal Hierarchy page on sam.gov"
						}),
						" includes a comprehensive and up-to-date list of agencies and sub-tier agencies. Federal agencies are responsible for using this tool to manage their agency structure. You can browse award spending by sub-tier agency the Award Spending section of ",
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Link, {
							to: "/agency",
							children: "Agency profile pages"
						}),
						"."
					]
				}) })
			},
			{
				question: "What is an agency subcomponent?",
				answer: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(import_jsx_runtime$2.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
					className: "analyst-guide__answerStyle",
					children: [
						"Agency subcomponents, also known as bureaus, group together federal accounts within a top-tier agency. Bureaus allow users to see account spending data from related federal accounts. You can browse account spending by subcomponent in the Status of Funds section of ",
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Link, {
							to: "/agency",
							children: "Agency profile pages"
						}),
						"."
					]
				}) })
			},
			{
				question: "Which fields in USAspending download files contain awarding agency identifier information?",
				answer: /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)(import_jsx_runtime$2.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
						className: "analyst-guide__answerStyle",
						children: "The awarding_agency_code, awarding_agency_name, awarding_sub_agency_code (aka awarding_subagency_code), awarding_sub_agency_name (aka awarding_subagency_name), awarding_office_code, and awarding_office_name fields contain awarding agency identifier information. "
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
						className: "analyst-guide__answerStyle",
						children: "Each of these fields are available on financial assistance and contract prime award transaction and summary download files, as well as Treasury and federal account level account breakdown by award download files. Account download files use the awarding_subagency_code and awarding_subagency_name fields."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
						className: "analyst-guide__answerStyle",
						children: [
							"More information about these fields is available in the ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("a", {
								href: "https://files.usaspending.gov/docs/Custom+Account+Data+Dictionary.xlsx",
								children: "Custom Account Data Dictionary"
							}),
							" and the ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Link, {
								to: "/data-dictionary",
								children: "Data Dictionary"
							}),
							"."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
						className: "analyst-guide__answerStyle",
						children: [
							"More information on how to download data from USAspending is available in the",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("button", {
								role: "link",
								className: "analyst-guide__sectionJump",
								onClick: () => jumpToSection("analyst-guide__DataAccess"),
								children: "HOW TO ACCESS THE DATA"
							}),
							" ",
							"section of this guide."
						]
					})
				] })
			},
			{
				question: "Which fields in USAspending download files contain funding agency identifier information?",
				answer: /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)(import_jsx_runtime$2.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
						className: "analyst-guide__answerStyle",
						children: "The funding_agency_code, funding_agency_name, funding_sub_agency_code, funding_sub_agency_name, funding_office_code, and funding_office_name fields contain funding agency identifier information. "
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
						className: "analyst-guide__answerStyle",
						children: "Each these fields are available on financial assistance and contract prime award transaction and summary download files, and federal and Treasury account level account breakdown by award download files."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
						className: "analyst-guide__answerStyle",
						children: [
							"The Funding Agency filter on ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Link, {
								to: "/search",
								children: "Advanced Search"
							}),
							" can be used to filter award spending by these data elements."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
						className: "analyst-guide__answerStyle",
						children: [
							"More information about these fields is available in the ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("a", {
								href: "https://files.usaspending.gov/docs/Custom+Account+Data+Dictionary.xlsx",
								children: "Custom Account Data Dictionary"
							}),
							" and the ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Link, {
								to: "/data-dictionary",
								children: "Data Dictionary"
							}),
							"."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
						className: "analyst-guide__answerStyle",
						children: [
							"More information on how to download data from USAspending is available in the",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("button", {
								role: "link",
								className: "analyst-guide__sectionJump",
								onClick: () => jumpToSection("analyst-guide__DataAccess"),
								children: "HOW TO ACCESS THE DATA"
							}),
							" ",
							"section of this guide."
						]
					})
				] })
			},
			{
				question: "Which USAspending features are used to browse and download agency data?",
				answer: /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)(import_jsx_runtime$2.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
						className: "analyst-guide__answerStyle",
						children: [
							"The ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Link, {
								to: "/agency",
								children: "Agency profile pages"
							}),
							" page can be used to browse detailed information on agencies."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
						className: "analyst-guide__answerStyle",
						children: [
							"The awarding agency filter on ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Link, {
								to: "/search",
								children: "Advanced Search"
							}),
							" can be used to filter award spending by agency data elements."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
						className: "analyst-guide__answerStyle",
						children: [
							"The agency filter on ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Link, {
								to: "/download_center/custom_account_data",
								children: "Custom Account Download"
							}),
							" can be used to download account spending data by agency."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
						className: "analyst-guide__answerStyle",
						children: [
							"The agency filter on ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Link, {
								to: "/download_center/award_data_archive",
								children: "Award Data Archive"
							}),
							" can be used to download account spending data by agency."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
						className: "analyst-guide__answerStyle",
						children: [
							"The agency and sub-agency filters on ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Link, {
								to: "/download_center/custom_award_data",
								children: "Custom Award Data"
							}),
							" can be used to download account spending data by agency."
						]
					})
				] })
			},
			{
				question: "How can I see all agencies which funded a prime award?",
				answer: /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)(import_jsx_runtime$2.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
					className: "analyst-guide__answerStyle",
					children: "To see all agencies which funded an award, review the Funding Agency column in the Federal Account Funding table on the award profile page. This information is also available in the funding agency columns of the FederalAccountFunding file of the award profile download."
				}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
					className: "analyst-guide__answerStyle",
					children: "A single prime award transaction may be funded by multiple agencies. However, only the agency which funded the most amount of money will be listed as the funding agency on that prime award transaction. "
				})] })
			}
		];
		const accountDataQuestions = [
			{
				question: "What is a Treasury Account Symbol (TAS)?",
				answer: /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)(import_jsx_runtime$2.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
						className: "analyst-guide__answerStyle",
						children: "Account spending occurs through Treasury accounts. A Treasury Account Symbol (TAS) is a code used to represent and provide information about a Treasury account. The TAS provides critical information about account and linked award spending associated with a Treasury account."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
						className: "analyst-guide__answerStyle",
						children: "Each TAS is composed of the following elements:"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("ul", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("li", {
							className: "analyst-guide__answerStyle",
							children: "Agency Identifier (AID): 3 digits that identify the agency responsible for a Treasury account. The AID is assigned by Congress."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("li", {
							className: "analyst-guide__answerStyle",
							children: "Main Account Code (MAC): 4 digits that identify the Treasury account type and purpose. The MAC cannot be blank."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("li", {
							className: "analyst-guide__answerStyle",
							children: "Sub Account Code (SAC): 3 digits that identify a sub-division of the Treasury account. The SAC cannot be blank. A SAC value of \"000\" means that the Treasury account is the parent account."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("li", {
							className: "analyst-guide__answerStyle",
							children: "Allocation Transfer Agency ID (ATA): 3 digits that identify the agency that receives funds through an allocation (non-expenditure) transfer."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("li", {
							className: "analyst-guide__answerStyle",
							children: "Beginning Period of Availability (BPOA): 4 digits that identify the first year that an appropriation account may incur new obligations. The BPOA is used for annual and multi-year funds only."
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
						className: "analyst-guide__answerStyle",
						children: "AND"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("ul", { children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("li", {
						className: "analyst-guide__answerStyle",
						children: "Ending Period of Availability (EPOA): 4 digits that identify the last year that an appropriation account may incur new obligations. The EPOA is for annual and multi-year funds only."
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
						className: "analyst-guide__answerStyle",
						children: "OR (if no BPOA or EPOA)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("ul", { children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("li", {
						className: "analyst-guide__answerStyle",
						children: "Availability Type Code (ATC): 1 character that identifies the availability (or time period) for obligations to be made on the Treasury account. An ATC value of “X” means that there is an unlimited or indefinite period to incur new obligations."
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
						className: "analyst-guide__answerStyle",
						children: [
							"The TAS filter on ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Link, {
								to: "/search",
								children: "Advanced Search"
							}),
							" can be used to filter award spending by TAS."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
						className: "analyst-guide__answerStyle",
						children: [
							"The Treasury Account Symbol chart in the Spending by Category section of ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Link, {
								to: "/federal_account",
								children: "Federal Account Profile pages"
							}),
							" display all Treasury accounts associated with a federal account. "
						]
					})
				] })
			},
			{
				question: "What are federal accounts?",
				answer: /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)(import_jsx_runtime$2.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
					className: "analyst-guide__answerStyle",
					children: "Federal accounts are groupings of related Treasury accounts. Federal accounts are created by combining all Treasury accounts that share an AID and MAC. Together, these codes create a Federal Account Symbol that can be used to represent a federal account. Federal accounts are used to track how agencies receive and spend congressional funding. There are more than 2,000 federal accounts across the federal government. Federal accounts are found in the budget that the President submits to Congress for approval."
				}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
					className: "analyst-guide__answerStyle",
					children: "Each AID should have at least one federal account associated with it, so the agency can conduct its function and carry out its mission. Despite the name, there are instances where an AID is shared among more than one agency. In these cases, each agency within the shared AID will have at least one federal account of its own."
				})] })
			},
			{
				question: "Which fields in USAspending download files contain TAS and federal account information?",
				answer: /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)(import_jsx_runtime$2.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
						className: "analyst-guide__answerStyle",
						children: "The agency_identifier_code, main_account_code, sub_account_code, allocation_transfer_agency_identifier_code, beginning_period_of_availability, ending_period_of_availability, and availability_type_code fields contain constituent TAS component information. The Treasury_account_symbol and federal_account_symbol fields contain full account symbols. The Treasury_account_name and federal_account_name fields contain descriptive account names. "
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
						className: "analyst-guide__answerStyle",
						children: "All of these fields are available on all Treasury account level account download files."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
						className: "analyst-guide__answerStyle",
						children: "The federal_account_name and federal_account_symbol fields are available on all account download files. "
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
						className: "analyst-guide__answerStyle",
						children: "The federal_accounts_funding_this_award and Treasury_accounts_funding_this_award fields contain information on accounts funding award spending. These fields are available on all award download files."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
						className: "analyst-guide__answerStyle",
						children: [
							"The TAS filter on ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Link, {
								to: "/search",
								children: "Advanced Search"
							}),
							" can be used to filter award spending by these data elements. "
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
						className: "analyst-guide__answerStyle",
						children: [
							"More information about these fields is available in the ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("a", {
								href: "https://files.usaspending.gov/docs/Custom+Account+Data+Dictionary.xlsx",
								children: "Custom Account Data Dictionary"
							}),
							" and the ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Link, {
								to: "/data-dictionary",
								children: "Data Dictionary"
							}),
							"."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
						className: "analyst-guide__answerStyle",
						children: [
							"More information on how to download data from USAspending is available in the",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("button", {
								role: "link",
								className: "analyst-guide__sectionJump",
								onClick: () => jumpToSection("analyst-guide__DataAccess"),
								children: "HOW TO ACCESS THE DATA"
							}),
							" ",
							"section of this guide."
						]
					})
				] })
			},
			{
				question: "Which USAspending features are used to browse and download TAS and federal account data?",
				answer: /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)(import_jsx_runtime$2.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
						className: "analyst-guide__answerStyle",
						children: [
							"The ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Link, {
								to: "/federal_account",
								children: "Federal Account Profile pages"
							}),
							" can be used to browse detailed information on federal accounts."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
						className: "analyst-guide__answerStyle",
						children: [
							"The TAS filter on ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Link, {
								to: "/search",
								children: "Advanced Search"
							}),
							" can be used to filter award spending by these data elements. "
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
						className: "analyst-guide__answerStyle",
						children: [
							"The federal account filter on ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Link, {
								to: "/download_center/custom_account_data",
								children: "Custom Account Download"
							}),
							" can be used to download account spending data by federal account."
						]
					})
				] })
			},
			{
				question: "What is the difference between a Treasury account and a federal account?",
				answer: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(import_jsx_runtime$2.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
					className: "analyst-guide__answerStyle",
					children: "Federal accounts are comprised of a TAS or multiple TASs. You can understand their relationship using the analogy of a bank account. Say you have a bank account, and in that account, you have checking, growth, and savings accounts. In this scenario, your bank account is the federal account, and the checking, growth, and savings accounts are your TASs. Checking, growth, and savings accounts have different purposes and are at the level where transactions take place. These “TASs” would be grouped under your account based on your Social Security Number, in the same way that a federal account is based on a Federal Account Symbol. Just like checking, growth, and savings accounts, the Student Financial Assistance federal account has several related TASs that have different obligation amounts."
				}) })
			},
			{
				question: "What does it mean when one agency’s TAS is part of a second agency’s submissions?",
				answer: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(import_jsx_runtime$2.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
					className: "analyst-guide__answerStyle",
					children: "Sometimes the funding associated with a TAS is executed by a different agency than the one indicated by the Agency Identifier. When this occurs, quite often the executing agency will submit the financial and award information associated with the TAS. Since the funding was assigned by Congress to the agency indicated by the Agency Identifier, we group by Agency Identifier so that users can see both the budgetary resources assigned to the agency as well as the spending that flows from the related accounts."
				}) })
			},
			{
				question: "How can I see account spending for prior years?",
				answer: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(import_jsx_runtime$2.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
					className: "analyst-guide__answerStyle",
					children: [
						"The fiscal year and quarter filter on the ",
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Link, {
							to: "/download_center/custom_account_data",
							children: "Custom Account Data"
						}),
						" download feature can be used to download account spending from 2017 to present. For data before 2017, you can see similar information in the ",
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("a", {
							href: "https://www.whitehouse.gov/omb/budget/appendix/",
							children: "Office of Management and Budget (OMB) budget appendices"
						}),
						"."
					]
				}) })
			}
		];
		const industryProductQuestions = [
			{
				question: "What are Product and Service Codes (PSC)?",
				answer: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(import_jsx_runtime$2.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
					className: "analyst-guide__answerStyle",
					children: [
						"The Product and Service Code (PSC) system describes the type of product or service purchased by contract spending.  You can find a list of Product Service Codes at ",
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("a", {
							href: "https://www.acquisition.gov/psc-manual",
							children: "acquisition.gov"
						}),
						". Only contract spending includes PSC codes. PSC data on USAspending make it possible to study how much money the government spends on different types of products."
					]
				}) })
			},
			{
				question: "What is the North American Industrial Classification System (NAICS)?",
				answer: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(import_jsx_runtime$2.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
					className: "analyst-guide__answerStyle",
					children: [
						"The North American Industry Classification System (NAICS) is the standard used by Federal statistical agencies to classify business establishments to collect, analyze, and publish statistical data related to the U.S. business economy. You can learn more about NAICS codes at ",
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("a", {
							href: "https://www.census.gov/naics/",
							children: "https://www.census.gov/naics/"
						}),
						". Only contract spending includes NAICS codes. NAICS data on USAspending make it possible to study how much money the government spends by industry."
					]
				}) })
			},
			{
				question: "Which fields in USAspending download files contain PSC and NAICS information?",
				answer: /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)(import_jsx_runtime$2.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
						className: "analyst-guide__answerStyle",
						children: "The product_or_service_code, product_or_service_code_description, naics_code, and naics_description fields contain PSC and NAICS information."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
						className: "analyst-guide__answerStyle",
						children: "These fields are all available on contract prime award transaction and summary downloads, and account breakdown by award account downloads."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
						className: "analyst-guide__answerStyle",
						children: [
							"The PSC and NAICS filters on ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Link, {
								to: "/search",
								children: "Advanced Search"
							}),
							" can be used to filter award spending by these data elements. "
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
						className: "analyst-guide__answerStyle",
						children: [
							"More information about these fields is available in the ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("a", {
								href: "https://files.usaspending.gov/docs/Custom+Account+Data+Dictionary.xlsx",
								children: "Custom Account Data Dictionary"
							}),
							" and the ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Link, {
								to: "/data-dictionary",
								children: "Data Dictionary"
							}),
							"."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
						className: "analyst-guide__answerStyle",
						children: [
							"More information on how to download data from USAspending is available in the",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("button", {
								role: "link",
								className: "analyst-guide__sectionJump",
								onClick: () => jumpToSection("analyst-guide__DataAccess"),
								children: "HOW TO ACCESS THE DATA"
							}),
							" ",
							"section of this guide."
						]
					})
				] })
			}
		];
		const disasterEmergencyQuestions = [
			{
				question: "What are Disaster Emergency Fund Codes (DEFCs)?",
				answer: /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)(import_jsx_runtime$2.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
					className: "analyst-guide__answerStyle",
					children: "DEFCs are used to track spending for disasters and emergencies such as COVID-19, or other events. Each code links spending to one or more public laws authorizing the funding. Both financial assistance and contracts spending include Disaster Emergency Fund Codes (DEFC) information. "
				}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
					className: "analyst-guide__answerStyle",
					children: "The Office of Management and Budget (OMB) assigns new DEFC domain values for each enacted appropriation with disaster or emergency funding. A DEFC domain value code will be assigned based on public law number and disaster or emergency designations. "
				})] })
			},
			{
				question: "How can I view and download spending by DEFC?",
				answer: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(import_jsx_runtime$2.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
					className: "analyst-guide__answerStyle",
					children: [
						"There are a few ways to access DEFC spending on USAspending. The DEFC filter on ",
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Link, {
							to: "/search",
							children: "Advanced Search"
						}),
						" can be used to filter award spending by this data element. All COVID-19 spending is included in on our ",
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Link, {
							to: "/disaster/covid-19",
							children: "COVID-19 Spending profile page"
						}),
						". Finally, account spending can be downloaded by DEFC using ",
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Link, {
							to: "/download_center/custom_account_data",
							children: "Custom Account Download"
						}),
						"."
					]
				}) })
			},
			{
				question: "Which fields in USAspending download files contain DEFC information?",
				answer: /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)(import_jsx_runtime$2.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
						className: "analyst-guide__answerStyle",
						children: "The disaster_emergency_fund_code and disaster_emergency_fund_codes_for_overall_award fields contain DEFC information. The disaster_emergency_fund_codes field is available on all account download files, and financial assistance and contract prime award summary download files."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
						className: "analyst-guide__answerStyle",
						children: [
							"The ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Link, {
								to: "/download_center/custom_account_data",
								children: "Custom Account Data"
							}),
							" download DEFC filter can be used to filter award download files by DEFC."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
						className: "analyst-guide__answerStyle",
						children: [
							"The ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Link, {
								to: "/disaster/covid-19",
								children: "COVID-19 Spending profile page"
							}),
							" download can be used to download all COVID-19 spending."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
						className: "analyst-guide__answerStyle",
						children: [
							"The DEFC filter on ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Link, {
								to: "/search",
								children: "Advanced Search"
							}),
							" can be used to filter award spending by this data element. "
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
						className: "analyst-guide__answerStyle",
						children: [
							"More information about these fields is available in the ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("a", {
								href: "https://files.usaspending.gov/docs/Custom+Account+Data+Dictionary.xlsx",
								children: "Custom Account Data Dictionary"
							}),
							" and the ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Link, {
								to: "/data-dictionary",
								children: "Data Dictionary"
							}),
							"."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
						className: "analyst-guide__answerStyle",
						children: [
							"More information on how to download data from USAspending is available in the",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("button", {
								role: "link",
								className: "analyst-guide__sectionJump",
								onClick: () => jumpToSection("analyst-guide__DataAccess"),
								children: "HOW TO ACCESS THE DATA"
							}),
							" ",
							"section of this guide."
						]
					})
				] })
			}
		];
		const assistanceListingQuestions = [{
			question: "What are Assistance Listings?",
			answer: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(import_jsx_runtime$2.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
				className: "analyst-guide__answerStyle",
				children: [
					"Assistance listings are detailed public descriptions of federal programs that provide grants, loans, scholarships, insurance, and other types of assistance awards. Assistance Listings were formally referred to as the Catalog of Federal Domestic Assistance (CFDA). Only financial assistance spending includes Assistance Listings information; contract spending does not. More information about Assistance Listings is available on ",
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("a", {
						href: "https://sam.gov/content/assistance-listings",
						children: "sam.gov"
					}),
					"."
				]
			}) })
		}, {
			question: "Which fields in USAspending download files contain Assistance Listings information?",
			answer: /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)(import_jsx_runtime$2.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
					className: "analyst-guide__answerStyle",
					children: "The cfda_number and cfda_title fields contain Assistance Listings information. These fields are both available on financial assistance prime award transaction and summary download files, and Treasury and federal account level account breakdown by award download files. "
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
					className: "analyst-guide__answerStyle",
					children: [
						"The ",
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Link, {
							to: "/search",
							children: "Advanced Search"
						}),
						" CFDA Program filter can be used to filter award spending by assistance listing."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
					className: "analyst-guide__answerStyle",
					children: [
						"More information about these fields is available in the ",
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("a", {
							href: "https://files.usaspending.gov/docs/Custom+Account+Data+Dictionary.xlsx",
							children: "Custom Account Data Dictionary"
						}),
						" and the ",
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Link, {
							to: "/data-dictionary",
							children: "Data Dictionary"
						}),
						"."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
					className: "analyst-guide__answerStyle",
					children: [
						"More information on how to download data from USAspending is available in the",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("button", {
							role: "link",
							className: "analyst-guide__sectionJump",
							onClick: () => jumpToSection("analyst-guide__DataAccess"),
							children: "HOW TO ACCESS THE DATA"
						}),
						" ",
						"section of this guide."
					]
				})
			] })
		}];
		const recipientDataQuestions = [
			{
				question: "What is a recipient?",
				answer: /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)(import_jsx_runtime$2.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
					className: "analyst-guide__answerStyle",
					children: [
						"A recipient is a company, organization, individual, or government entity (i.e., state, local, tribal, federal, or foreign), that receives funding from the U.S. government. The ",
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Link, {
							to: "/recipient",
							children: "Recipient Profile page"
						}),
						" includes detailed information on government spending to individual recipients. Both financial assistance and contracts spending include recipient information such as recipient name, recipient location, and recipient type."
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
					className: "analyst-guide__answerStyle",
					children: [
						"More information on recipient location information is available in the ",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("button", {
							role: "link",
							className: "analyst-guide__sectionJump",
							onClick: () => jumpToSection("analyst-guide__LocationData"),
							children: "LOCATION DATA ELEMENTS"
						}),
						" ",
						"section of this guide."
					]
				})] })
			},
			{
				question: "How are recipients identified?",
				answer: /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)(import_jsx_runtime$2.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
					className: "analyst-guide__answerStyle",
					children: "With limited exceptions, virtually all award recipients have two unique identifies - a Unique Entity Identifier (UEI) and a DUNS number. Larger entities with multiple locations or departments may contain many entities with different UEI or DUNS numbers. These recipients may be grouped together using parent recipient data elements. Recipients of aggregate awards such as Social Security Retirement Insurance recipients do not have a UEI or DUNS to protect personal identifiable information.  "
				}), /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
					className: "analyst-guide__answerStyle",
					children: [
						"By April of 2022, the federal government will have stopped using the DUNS number to uniquely identify entities. At that point, entities doing business with the federal government will use UEI. More information about the DUNS to UEI transition is available ",
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("a", {
							href: "https://www.gsa.gov/about-us/organization/federal-acquisition-service/office-of-systems-management/integrated-award-environment-iae/iae-systems-information-kit/unique-entity-identifier-update",
							children: "online"
						}),
						"."
					]
				})] })
			},
			{
				question: "Which fields in USAspending download files contain recipient identifier information?",
				answer: /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)(import_jsx_runtime$2.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
						className: "analyst-guide__answerStyle",
						children: "The recipient_name, recipient_parent_name, recipient_uei, recipient_parent_uei, recipient_duns, and recipient_parent_duns fields contain recipient identifier information. These fields are all available on financial assistance and contract prime award transaction and summary download files, and Treasury and federal account level account breakdown by award download files."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
						className: "analyst-guide__answerStyle",
						children: "The recipient_parent data elements reference the ultimate parent of an awardee or recipient and can be used to group together related recipients."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
						className: "analyst-guide__answerStyle",
						children: [
							"The ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Link, {
								to: "/search",
								children: "Advanced Search"
							}),
							" Recipient filter can be used to filter award spending by these data elements."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
						className: "analyst-guide__answerStyle",
						children: [
							"More information about these fields is available in the ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("a", {
								href: "https://files.usaspending.gov/docs/Custom+Account+Data+Dictionary.xlsx",
								children: "Custom Account Data Dictionary"
							}),
							" and the ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Link, {
								to: "/data-dictionary",
								children: "Data Dictionary"
							}),
							"."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
						className: "analyst-guide__answerStyle",
						children: [
							"More information on how to download data from USAspending is available in the",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("button", {
								role: "link",
								className: "analyst-guide__sectionJump",
								onClick: () => jumpToSection("analyst-guide__DataAccess"),
								children: "HOW TO ACCESS THE DATA"
							}),
							" ",
							"section of this guide."
						]
					})
				] })
			},
			{
				question: "What are recipient types?",
				answer: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(import_jsx_runtime$2.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
					className: "analyst-guide__answerStyle",
					children: "Recipient types (aka business types) are socio-economic and other organizational/business characteristics that are used to categorize financial assistance and contract recipients."
				}) })
			},
			{
				question: "Which recipient type categories are available for contract vs financial assistance recipients?",
				answer: /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)(import_jsx_runtime$2.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
						className: "analyst-guide__answerStyle",
						children: [
							"Both financial assistance and contract spending include recipient type information. However, most recipient type categories only apply to contract award recipients. An Advanced Search which combines mutually exclusive Recipient Type and Award Type filter options, such as ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Link, {
								to: "/search/?hash=4f711e2f7e08dba46fb40cb34502dab8",
								children: "this search"
							}),
							", will return zero results. "
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
						className: "analyst-guide__answerStyle",
						children: [
							"The only recipient type categories available in ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Link, {
								to: "/search",
								children: "Advanced Search"
							}),
							" which apply to financial assistance recipients are: "
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("ul", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("li", {
							className: "analyst-guide__answerStyle",
							children: "Small Business"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("li", {
							className: "analyst-guide__answerStyle",
							children: "Other Than Small Business"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("li", {
							className: "analyst-guide__answerStyle",
							children: "Nonprofit"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("li", {
							className: "analyst-guide__answerStyle",
							children: "Public Institution of Higher Education"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("li", {
							className: "analyst-guide__answerStyle",
							children: "Private Institution of Higher Education"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("li", {
							className: "analyst-guide__answerStyle",
							children: "Minority-Serving Institution of Higher Education"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("li", {
							className: "analyst-guide__answerStyle",
							children: "Regional and State Government"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("li", {
							className: "analyst-guide__answerStyle",
							children: "Regional Organization"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("li", {
							className: "analyst-guide__answerStyle",
							children: "U.S. Territory or Possession"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("li", {
							className: "analyst-guide__answerStyle",
							children: "Local Government"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("li", {
							className: "analyst-guide__answerStyle",
							children: "Indian Native American Tribal Government"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("li", {
							className: "analyst-guide__answerStyle",
							children: "Authorities and Commissions"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("li", {
							className: "analyst-guide__answerStyle",
							children: "Individuals"
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
						className: "analyst-guide__answerStyle",
						children: "Each of these recipient type categories also apply to contract recipients, except for Regional Organization, U.S. Territory, or Possession and Individuals."
					})
				] })
			}
		];
		const locationDataQuestions = [
			{
				question: "What are the different location types?",
				answer: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(import_jsx_runtime$2.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
					className: "analyst-guide__answerStyle",
					children: "The two different location types are primary place of performance and recipient location. Primary place of performance is the principal place of business, where the majority of the work of an award is performed. For example, in a manufacturing contract, this would be the main plant where items are produced. Recipient location is Legal business address of an award recipient. Both financial assistance and contract spending include location information. Both location types may be measured at several geographic levels including country, state, county, city, congressional district, or zip code. Not all geographic levels are available for all award spending. "
				}) })
			},
			{
				question: "Which fields in USAspending download files contain recipient location information?",
				answer: /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)(import_jsx_runtime$2.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
						className: "analyst-guide__answerStyle",
						children: "Some of the most important recipient fields are recipient_city_name, recipient_county_name, recipient_state_name, and recipient_zip_code. These fields are all available in financial assistance and contract prime award transaction and summary download files. The recipient_zip_code field is also available on federal and Treasury account level account breakdown by award account download files."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
						className: "analyst-guide__answerStyle",
						children: [
							"The Recipient Location filters on ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Link, {
								to: "/search",
								children: "Advanced Search"
							}),
							" can be used to filter award spending by these data elements."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
						className: "analyst-guide__answerStyle",
						children: [
							"More information about these fields is available in the ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("a", {
								href: "https://files.usaspending.gov/docs/Custom+Account+Data+Dictionary.xlsx",
								children: "Custom Account Data Dictionary"
							}),
							" and the ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Link, {
								to: "/data-dictionary",
								children: "Data Dictionary"
							}),
							"."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
						className: "analyst-guide__answerStyle",
						children: [
							"More information on how to download data from USAspending is available in the",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("button", {
								role: "link",
								className: "analyst-guide__sectionJump",
								onClick: () => jumpToSection("analyst-guide__DataAccess"),
								children: "HOW TO ACCESS THE DATA"
							}),
							" ",
							"section of this guide."
						]
					})
				] })
			},
			{
				question: "Which fields in USAspending download files contain primary place of performance location information?",
				answer: /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)(import_jsx_runtime$2.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
						className: "analyst-guide__answerStyle",
						children: "Some of the most important primary place of performance fields are: "
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("ul", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("li", {
							className: "analyst-guide__answerStyle",
							children: "primary_place_of_performance_city_name"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("li", {
							className: "analyst-guide__answerStyle",
							children: "primary_place_of_performance_county_name"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("li", {
							className: "analyst-guide__answerStyle",
							children: "primary_place_of_performance_state_name "
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("li", {
							className: "analyst-guide__answerStyle",
							children: "primary_place_of_performance_zip_4 "
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("li", {
							className: "analyst-guide__answerStyle",
							children: "primary_place_of_performance_zip_code"
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
						className: "analyst-guide__answerStyle",
						children: "The first four fields are all available in financial assistance and contract prime award transaction and summary download files. The primary_place_of_performance_zip_code field is available on federal and Treasury account level account breakdown by award account download files."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
						className: "analyst-guide__answerStyle",
						children: [
							"The Place of Performance filters on ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Link, {
								to: "/search",
								children: "Advanced Search"
							}),
							" can be used to filter award spending by these data elements."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
						className: "analyst-guide__answerStyle",
						children: [
							"More information about these fields is available in the ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("a", {
								href: "https://files.usaspending.gov/docs/Custom+Account+Data+Dictionary.xlsx",
								children: "Custom Account Data Dictionary"
							}),
							" and the ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Link, {
								to: "/data-dictionary",
								children: "Data Dictionary"
							}),
							"."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
						className: "analyst-guide__answerStyle",
						children: [
							"More information on how to download data from USAspending is available in the",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("button", {
								role: "link",
								className: "analyst-guide__sectionJump",
								onClick: () => jumpToSection("analyst-guide__DataAccess"),
								children: "HOW TO ACCESS THE DATA"
							}),
							" ",
							"section of this guide."
						]
					})
				] })
			}
		];
		const additionalResources = [
			{
				question: "How do I find the meanings of particular terms and field names?",
				answer: /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)(import_jsx_runtime$2.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
						className: "analyst-guide__answerStyle",
						children: [
							"The ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", { children: "Glossary" }),
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(GlossaryLink, { term: "/" }),
							" ",
							" lists plain-language definitions of terms used throughout USAspending."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
						className: "analyst-guide__answerStyle",
						children: [
							"The ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Link, {
								to: "/data-dictionary",
								children: "Data Dictionary"
							}),
							" defines data elements included in the various download files available on USAspending."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
						className: "analyst-guide__answerStyle",
						children: [
							"The ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("a", {
								href: "https://www.fpds.gov/downloads/Version_1.5_specs/FPDS_DataDictionary_V1.5.pdf",
								children: "FPDS Data Dictionary"
							}),
							" includes descriptions of terminology related to contract data."
						]
					})
				] })
			},
			{
				question: "What other resources are available to help understand the data in USAspending?",
				answer: /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)(import_jsx_runtime$2.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
						className: "analyst-guide__answerStyle",
						children: [
							"The github",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)(ExternalLink, {
								url: "https://github.com/fedspendingtransparency/usaspending-api/wiki",
								className: "analyst-guide__external-link",
								isCard: true,
								showIcon: true,
								children: ["wiki", " "]
							}),
							" ",
							"provides information for developers on how the USAspending application works."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
						className: "analyst-guide__answerStyle",
						children: [
							"The USAspending's",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("a", {
								href: "https://onevoicecrm.my.site.com/usaspending/s/recordlist/Knowledge__kav/00B3d000000V4WDEA0",
								children: ["FAQ page", " "]
							}),
							"provides additional advice for getting the most out of the site."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
						className: "analyst-guide__answerStyle",
						children: [
							"The ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("a", {
								href: "https://tfx.treasury.gov/data-transparency/gsdm",
								children: "Governmentwide Spending Data Model (GSDM) page"
							}),
							" provides more information on various systems related to the data in USAspending."
						]
					})
				] })
			},
			{
				question: "How do I cite USAspending.gov data?",
				answer: /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)(import_jsx_runtime$2.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("p", {
						className: "analyst-guide__answerStyle",
						children: "There are a few different ways to cite data from USAspending.gov. Reference the examples below, based on the type of data being cited."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("h4", {
						className: "analyst-guide-citation",
						children: "Suggested General Citation:"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
						className: "analyst-guide__answerStyle",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", {
								className: "citation-it",
								children: "USAspending.gov"
							}),
							", U.S. Department of Treasury, Bureau of the Fiscal Service,",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("br", {}),
							"\xA0\xA0\xA0\xA0",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("a", {
								href: "https://www.usaspending.gov",
								children: "https://www.usaspending.gov"
							}),
							". Accessed [Day] [Month]. [Year]."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("h4", {
						className: "analyst-guide-citation",
						children: "Suggested Specific Profile/Award Citations:"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
						className: "analyst-guide__answerStyle",
						children: [
							"“Contract to Science Systems and Applications, INC.” ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", {
								className: "citation-it",
								children: "USAspending.gov"
							}),
							",",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("br", {}),
							"\xA0\xA0\xA0\xA0",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("a", {
								href: "https://www.usaspending.gov/award/CONT_AWD_NNG17HP01C_8000_-NONE-_-NONE-",
								children: "www.usaspending.gov/award/CONT_AWD_NNG17HP01C_8000_-NONE-_-NONE-"
							}),
							". Accessed [Day] [Month]. [Year]."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("p", {
						className: "analyst-guide__answerStyle",
						children: [
							"“State Profile: Maine.” ",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("span", {
								className: "citation-it",
								children: "USAspending.gov"
							}),
							",",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("br", {}),
							"\xA0\xA0\xA0\xA0",
							/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("a", {
								href: "https://www.usaspending.gov/state/maine/2025",
								children: "https://www.usaspending.gov/state/maine/2025"
							}),
							". Accessed [Day] [Month]. [Year]."
						]
					})
				] })
			}
		];
		return /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)(import_jsx_runtime$2.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("h4", {
				className: "analyst-guide__questionSections",
				id: "analyst-guide__AwardAccountSpending",
				children: "Award And Account Spending Comparison"
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", { className: "analyst-guide__questionLine" }),
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
				className: "analyst-guide__answerSection",
				children: awardAccountSpendingComparisonQuestions.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
					className: "analyst-guide__questionAnswers",
					children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Accordion, {
						title: item.question,
						children: item.answer
					}, `item_${i}`)
				}))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("h4", {
				className: "analyst-guide__questionSections",
				id: "analyst-guide__Award",
				children: "Award Spending"
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", { className: "analyst-guide__questionLine" }),
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
				className: "analyst-guide__answerSection",
				children: awardSpendingQuestions.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
					className: "analyst-guide__questionAnswers",
					children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Accordion, {
						title: item.question,
						children: item.answer
					}, `item_${i}`)
				}))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("h4", {
				className: "analyst-guide__questionSections",
				id: "analyst-guide__FinancialAssistance",
				children: "Financial Assistance Transactions And Award Summaries"
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", { className: "analyst-guide__questionLine" }),
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
				className: "analyst-guide__answerSection",
				children: financialAssistanceQuestions.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
					className: "analyst-guide__questionAnswers",
					children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Accordion, {
						title: item.question,
						children: item.answer
					}, `item_${i}`)
				}))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("h4", {
				className: "analyst-guide__questionSections",
				id: "analyst-guide__ContractTransactions",
				children: "Contract Transactions And Award Summaries"
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", { className: "analyst-guide__questionLine" }),
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
				className: "analyst-guide__answerSection",
				children: contractTransactionQuestions.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
					className: "analyst-guide__questionAnswers",
					children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Accordion, {
						title: item.question,
						children: item.answer
					}, `item_${i}`)
				}))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("h4", {
				className: "analyst-guide__questionSections",
				id: "analyst-guide__DataAccess",
				children: "How To Access The Data"
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", { className: "analyst-guide__questionLine" }),
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
				className: "analyst-guide__answerSection",
				children: dataAccessQuestions.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
					className: "analyst-guide__questionAnswers",
					children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Accordion, {
						title: item.question,
						children: item.answer
					}, `item_${i}`)
				}))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("h4", {
				className: "analyst-guide__questionSections",
				id: "analyst-guide__AgencyData",
				children: "Agency Data Elements"
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", { className: "analyst-guide__questionLine" }),
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
				className: "analyst-guide__answerSection",
				children: agencyDataQuestions.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
					className: "analyst-guide__questionAnswers",
					children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Accordion, {
						title: item.question,
						children: item.answer
					}, `item_${i}`)
				}))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("h4", {
				className: "analyst-guide__questionSections",
				id: "analyst-guide__AccountData",
				children: "Account Data Elements"
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", { className: "analyst-guide__questionLine" }),
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
				className: "analyst-guide__answerSection",
				children: accountDataQuestions.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
					className: "analyst-guide__questionAnswers",
					children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Accordion, {
						title: item.question,
						children: item.answer
					}, `item_${i}`)
				}))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("h4", {
				className: "analyst-guide__questionSections",
				id: "analyst-guide__Industry",
				children: "Industry And Product Data Elements"
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", { className: "analyst-guide__questionLine" }),
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
				className: "analyst-guide__answerSection",
				children: industryProductQuestions.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
					className: "analyst-guide__questionAnswers",
					children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Accordion, {
						title: item.question,
						children: item.answer
					}, `item_${i}`)
				}))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("h4", {
				className: "analyst-guide__questionSections",
				id: "analyst-guide__Disaster",
				children: "Disaster And Emergency Data Elements"
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", { className: "analyst-guide__questionLine" }),
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
				className: "analyst-guide__answerSection",
				children: disasterEmergencyQuestions.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
					className: "analyst-guide__questionAnswers",
					children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Accordion, {
						title: item.question,
						children: item.answer
					}, `item_${i}`)
				}))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("h4", {
				className: "analyst-guide__questionSections",
				id: "analyst-guide__AssistanceListings",
				children: "Assistance Listings Data Elements"
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", { className: "analyst-guide__questionLine" }),
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
				className: "analyst-guide__answerSection",
				children: assistanceListingQuestions.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
					className: "analyst-guide__questionAnswers",
					children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Accordion, {
						title: item.question,
						children: item.answer
					}, `item_${i}`)
				}))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("h4", {
				className: "analyst-guide__questionSections",
				id: "analyst-guide__Recipient",
				children: "Recipient Data Elements"
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", { className: "analyst-guide__questionLine" }),
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
				className: "analyst-guide__answerSection",
				children: recipientDataQuestions.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
					className: "analyst-guide__questionAnswers",
					children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Accordion, {
						title: item.question,
						children: item.answer
					}, `item_${i}`)
				}))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("h4", {
				className: "analyst-guide__questionSections",
				id: "analyst-guide__LocationData",
				children: "Location Data Elements"
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", { className: "analyst-guide__questionLine" }),
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
				className: "analyst-guide__answerSection",
				children: locationDataQuestions.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
					className: "analyst-guide__questionAnswers",
					children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Accordion, {
						title: item.question,
						children: item.answer
					}, `item_${i}`)
				}))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("h4", {
				className: "analyst-guide__questionSections",
				id: "analyst-guide__AdditionalResources",
				children: "Additional Resources"
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", { className: "analyst-guide__questionLine" }),
			/* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
				className: "analyst-guide__answerSection",
				children: additionalResources.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
					className: "analyst-guide__questionAnswers",
					children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Accordion, {
						title: item.question,
						children: item.answer
					}, `item_${i}`)
				}))
			})
		] });
	};
}));
//#endregion
//#region src/js/components/analystGuide/AnalystGuideIntro.jsx
var import_jsx_runtime$1, AnalystGuideIntro;
var init_AnalystGuideIntro = __esmMin((() => {
	init_index_es();
	init_es();
	init_analystGuide();
	init_socialShare();
	init_modalActions();
	init_ShareDownloadButtonGroup();
	import_jsx_runtime$1 = require_jsx_runtime();
	AnalystGuideIntro = () => {
		const dispatch = useDispatch();
		const onExternalLinkClick = (e) => {
			dispatch(showModal(e));
		};
		const slug = "federal-spending-guide";
		const onShareClick = (name) => {
			const emailArgs = {
				subject: `USAspending.gov Federal Spending Guide`,
				body: `Interested in learning how to effectively use Federal Spending Data? Check out #USAspending Federal Spending Guide! ${getBaseUrl(slug)}`
			};
			handleShareOptionClick(name, slug, emailArgs, onExternalLinkClick);
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)(Qs, {
			className: "analyst-guide__intro",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)($s, {
				width: 10,
				children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("div", {
					className: "analyst-guide__title-wrapper",
					children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("h2", {
						className: "analyst-guide__topTitle",
						children: "What is the Federal Spending Guide?"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("div", {
					className: "analyst-guide__bodyText",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("p", { children: "Welcome to the Federal Spending Guide. You'll find answers here to commonly asked questions about federal spending concepts and USAspending data. We hope this guide makes it easier for you to conduct your own analyses and develop your own tools." }), /* @__PURE__ */ (0, import_jsx_runtime$1.jsxs)("p", { children: [
						"If you'd like to recommend a question to be added to this guide, please share it on our ",
						/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("a", {
							href: "https://onevoicecrm.my.site.com/usaspending/s/",
							alt: "Community Page",
							target: "_blank",
							rel: "noopener noreferrer",
							children: "Community page"
						}),
						" or send an email to ",
						/* @__PURE__ */ (0, import_jsx_runtime$1.jsx)("a", {
							href: "mailto:USAspending.Help@fiscal.treasury.gov",
							alt: "email link USAspending.help@fiscal.treasury.gov",
							children: "USAspending.Help@fiscal.treasury.gov"
						}),
						". We look forward to hearing from you!"
					] })]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)($s, {
				width: 2,
				children: /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(ShareDownloadButtonGroup, {
					url: getBaseUrl(slug),
					downloadLink: "/data/Federal-Spending-Guide.pdf",
					onShareClick
				})
			})]
		});
	};
}));
//#endregion
//#region src/js/components/analystGuide/AnalystGuidePage.jsx
var import_jsx_runtime, AnalystGuidePage;
//#endregion
__esmMin((() => {
	init_index_es();
	init_analystGuide();
	init_socialShare();
	init_metaTagHelper();
	init_IsMobileContext();
	init_BannerPageHeader();
	init_PageWrapper();
	init_AnalystGuideQuestions();
	init_AnalystGuideIntro();
	import_jsx_runtime = require_jsx_runtime();
	AnalystGuidePage = () => {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageWrapper, {
			pageName: "FederalSpendingGuide",
			classNames: "usa-da-analyst-guide-page",
			noHeader: true,
			metaTagProps: { ...analystGuideMetaTags },
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				id: "main-content",
				className: "main-content",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BannerPageHeader, {
					kicker: "RESOURCES",
					title: "Federal Spending Guide",
					body: "Questions and answers about USAspending data and federal spending concepts",
					faIcon: "sack-dollar",
					primaryColor: "#0081A1",
					secondaryColor: "#00687D"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Qs, {
					style: { justifyContent: "center" },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)($s, {
						desktop: 6,
						tablet: 12,
						className: "analyst-guide-body",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnalystGuideIntro, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnalystGuideQuestions, {})]
					})
				})]
			})
		});
	};
}))();
export { AnalystGuidePage as default };
