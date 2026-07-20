import { n as __esmMin } from "./rolldown-runtime-D1cXj70v.js";
import { On as init_Icons, dt as AboutTheDataLink, ft as init_AboutTheDataLink, hn as Close, ro as require_jsx_runtime, wr as ps, xr as init_index_es } from "./index.js-CgeUxZJy.js";
import "react";
import PropTypes from "prop-types";
import { uniqueId } from "lodash-es";
//#region src/js/components/award/shared/InfoTooltipContent.jsx
var import_jsx_runtime, modificationNumber, actionDate, amount, actionType, actionTypeFA, transactionDescription, loanFaceValue, loanSubsidyCost, subawardID, recipientName, actionDateSub, amountSub, descriptionSub, relatedAwardsInfo, summaryRelatedAwardsInfo, summaryRelatedAwardsInfoIdv, descriptionInfoAsst, descriptionInfoContract, descriptionInfo, awardAmountsInfo, awardHistoryIdv, awardHistoryContract, awardHistoryFinancialAssistanceGeneric, awardHistoryFinancialAssistanceLoan, datesInfoAsst, datesInfo, datesInfoIdv, contractActivityGrants, contractActivityInfoContracts, idvActivityInfo, federalAccountsInfoContract, federalAccountsInfoIdv, ContractAwardAmountsInfo, AsstAwardAmountsInfo, LoanAwardAmountsInfo, CFDAOverviewInfo, CFDASectionInfo, CovidFlagTooltip, UnlinkedTooltip, CondensedCDTooltip, ExplorerInfoToolTip;
var init_InfoTooltipContent = __esmMin((() => {
	init_index_es();
	init_Icons();
	init_AboutTheDataLink();
	import_jsx_runtime = require_jsx_runtime();
	modificationNumber = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ps, {
		title: "Modification Number",
		children: "This number identifies the modification. Modification numbers increment from lower to higher as more mods are made."
	});
	actionDate = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ps, {
		title: "Action Date",
		children: "This is when the modification was issued."
	});
	amount = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ps, {
		title: "Amount",
		children: "This refers to the amount of money added or subtracted from the initial awarded amount by the modification, if any."
	});
	actionType = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ps, {
		title: "Action Type",
		children: ["This column describes the type of modification. It uses a letter code system that maps to the following descriptions:", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
			className: "info-tooltip__list",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "A" }), " – Additional Work"] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "B" }), " – Supplemental Agreement for work within scope"] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "C" }), " – Funding Only Action"] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "D" }), " – Change Order"] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "E" }), " – Terminate for Default (complete or partial)"] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "F" }), " – Terminate for Convenience (complete or partial)"] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "G" }), " – Exercise an Option"] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "H" }), " – Definitize Letter Contract"] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "J" }), " – Novation Agreement"] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "K" }), " – Close Out"] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "L" }), " – Definitize Change Order"] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "M" }), " – Other Administrative Action"] })
			]
		})]
	});
	actionTypeFA = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ps, {
		title: "Action Type",
		children: ["This column describes the type of modification. It uses a letter code system that maps to the following descriptions:", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
			className: "info-tooltip__list",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "A" }), " – New assistance award"] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "B" }), " – Continuation"] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "C" }), " – Revision"] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "D" }), " – Funding adjustment to a completed project"] })
			]
		})]
	});
	transactionDescription = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ps, {
		title: "Transaction Description",
		children: "Describes the modification, typically covering its effect on the contract."
	});
	loanFaceValue = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ps, {
		title: "Loan Face Value",
		children: "The Face Value of a loan represents how much has actually been lent out to the entity that received the loan dollars. Sometimes loans are financed by a financial institution (with the Federal government merely providing a 'loan guarantee' to the financial institution and reimbursement in cases where the loan isn't paid back), and other times they are financed by the Federal government directly (direct loans). Regardless of how it is financed, a loan's face value is not considered Federal spending, because it does not, in itself, represent a long-term cost to the government. The estimated long-term cost to the government of a loan is captured in the subsidy cost field."
	});
	loanSubsidyCost = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ps, {
		title: "Loan Subsidy Cost (Total Obligations To Date)",
		children: "The implications of a loan or loan guarantee for the Federal Budget (and thus the loan version of spending/obligations) are known as the loan's subsidy cost. Subsidy cost is the calculated net present value of the loan to the government, taking into account the interest rate and the modeled risk of the recipient failing to pay back the loan in part or full; subsidy cost can be positive (indicating that the government is likely to lose money on the loan) or negative (indicating that the government is likely to make money on the loan). Subsidy cost should never be larger in absolute value terms than the face value itself. Administrative costs of running the loan or loan guarantee program itself are excluded from subsidy cost calculations. Note that a loan's face value is not considered Federal spending, since it does not in itself represent a long-term cost to the government."
	});
	subawardID = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ps, {
		title: "Sub-Award ID",
		children: "The sub-award ID number chosen by the prime recipient for this transaction."
	});
	recipientName = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ps, {
		title: "Sub-Recipient Name",
		children: "The name of the sub-recipient."
	});
	actionDateSub = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ps, {
		title: "Action Date",
		children: "The date when the sub-contract was issued."
	});
	amountSub = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ps, {
		title: "Amount",
		children: "The amount of money involved in the sub-contract action."
	});
	descriptionSub = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ps, {
		title: "Description",
		children: "The description of the sub-contract provided by the prime recipient. The level of detail in descriptions varies and is dependent on the author."
	});
	relatedAwardsInfo = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "award-summary-tooltip related-awards-tt",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "tooltip__title",
			children: "Orders Made Under this IDV"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "tooltip__text",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "This section displays the child award orders*, child IDV orders*, and grandchild award orders that have been made under this Indefinite Delivery Vehicle (IDV)." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "IDVs are a special kind of contract which usually aren’t directly associated with award amounts. This is because IDVs merely act as a means, or “vehicle”, for agencies to purchase an indefinite amount of goods or services from vendors within a specific time frame. For this reason, the award orders made under the IDV are where all (or most) of the agency’s spending related to an IDV occurs, not the IDV itself*." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The award orders made under an IDV are sometimes known or referred to as:" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "info-tooltip__list",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "• Task Order" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "• Delivery Order" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "• Purchase Order" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "• Blanket Purchase Agreement (BPA) Calls" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Another thing to note is that sometimes an IDV order can be made under an IDV (and in turn, have award orders made under it). We show child award orders*, child IDV orders*, and grandchild award orders* made under this IDV in the three tabs below, respectively." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "*Child award order" }), " refers to award orders made directly under this IDV (IDV > Award)."] }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "*Child IDV order" }), " refers to IDVs made directly under this IDV (IDV > IDV)."] }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "*Grandchild award order" }), " refers to award orders made within a child IDV order (IDV > IDV > Award)."] }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "*IDV itself" }), " refers to the top-level IDV this page is summarizing, not including any of its child award orders or child IDV orders."] }) })
				] })
			]
		})]
	});
	summaryRelatedAwardsInfo = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "award-summary-tooltip",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "tooltip__title",
			children: "Related Awards"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "tooltip__text",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Parent Award" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "tooltip__text-section",
					children: "A parent award, or parent indefinite delivery vehicle (IDV), is any award that has other prime awards made under it."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "tooltip__text-section",
					children: "The contract summarized on this page is a “child” prime award of the parent IDV indicated here."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "tooltip__text-section",
					children: "Click on the parent award ID to view the summary page of this award's parent award, which details all of that parent award's “child” and “grandchild” awards."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Sub-Awards" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "tooltip__text-section",
					children: "This is the count of sub-awards (in this case, sub-contracts to furnish supplies or services to advance the prime contract) issued and reported directly by the prime recipient. For more details, click on the count to scroll to the Sub-Awards tab within the Award History section of this page. Sub-awards are always referred to as such and are independent of the ‘child' and ‘grandchild' prime award structure discussed above."
				})
			]
		})]
	});
	summaryRelatedAwardsInfoIdv = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "award-summary-tooltip",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "tooltip__title",
			children: "Related Awards"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "tooltip__text",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Related Awards refers to two possible types of awards related to this indefinite delivery vehicle (IDV):" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Parent Award" }), " – The parent award is the IDV award that this IDV was made under.  Click on the link to view more information on this IDV’s parent award."] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Child Award Order" }), " – This refers to the count of award orders made directly under this IDV (IDV > Award). Click on the count to view the child award orders of this IDV."] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Child IDV Order" }), " – This refers to the count of IDVs made directly under this IDV (IDV > IDV). Click on this count to view the child IDV orders of this IDV."] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Grandchild Award Order" }), " – This refers to the count of award orders made within child IDV Orders under this IDV (IDV > IDV > Award). Click on this count to view the grandchild award orders of this IDV."] })
			] })]
		})]
	});
	descriptionInfoAsst = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "award-summary-tooltip",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "tooltip__title",
			children: "Description"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "tooltip__text",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "tooltip__text-section",
				children: "The description of this award is provided by the financial assistance manager who submitted its data. The level of detail in descriptions varies and is dependent on the author and the standards of the agencies involved. The description featured here comes from the base award. Modifications have their own descriptions which can differ from the description of the base award; these can be viewed in the Transaction History tab of the Award History section below or by downloading the data via the top-right “DOWNLOAD” button."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "tooltip__text-section",
				children: "Additional contextual information on the purpose of this award can be gleaned from the Assistance Listing (CFDA Program) module below."
			})]
		})]
	});
	descriptionInfoContract = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "award-summary-tooltip",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "tooltip__title",
			children: "Description"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "tooltip__text",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The description of the award is provided by the contracting officer who submitted this contract data. The level of detail in descriptions varies and is dependent on the author and the standards of the agencies involved. The description featured here comes from the base award of the contract.  Contract transactions (also known as modifications) have their own descriptions available. These transaction descriptions and other details can be viewed in the Transaction History tab of the Award History section located further down this page, or by downloading the data via the top-right “DOWNLOAD” button." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Also shown below the description are groups of codes from two systems of classification:" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "info-tooltip__list award-desciption-section",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "North American Industry Classification System (NAICS) Code" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "This code describes the primary industrial activity of the recipient of this award. It is six digits and has three levels of embedded granularity:" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "info-tooltip__list",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "• The first two-digits indicate the sector (general)." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "• The first four-digits indicate the industry group." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "• The full six-digits indicate the sub-industry group (specific)." })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							style: { marginBottom: 0 },
							children: "These three levels are displayed hierarchically below for this recipient."
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Product and Service Codes (PSC)" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "These codes are used to categorize awards by the type of product, service, or research and development (R&D) procured. The code is 4 characters and has up to four levels of embedded granularity:" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "info-tooltip__list",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "• The first level classifies what was procured as a product, service or R&D ." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "• The second level indicates the top level category of what was procured." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "• The third level indicates the detailed level category subdivision of what was procured." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "• The fourth level exists for R&D and services only. For R&D, it specifies the stage of the R&D process involved. For services, it specifies a further subdivision of the third level code." })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Each of these levels is displayed hierarchically below for this recipient." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Click on the glossary icons for more information on NAICS and PSC." })
					] })]
				})
			]
		})]
	});
	descriptionInfo = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "award-summary-tooltip",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "tooltip__title",
			children: "Description"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "tooltip__text",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The description of the award is provided by the contract officer who submitted this award data. The quality of these descriptions can vary as they are largely dependent on their author and agency standards." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Also shown below are codes from two sets, North American Industry Classification System (NAICS) and Product Service Codes (PSC), used to categorize awards by what they are or are for." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Click on the glossary icons for more information on those systems." })
			]
		})]
	});
	awardAmountsInfo = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "award-summary-tooltip",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "tooltip__title",
			children: "Award Amounts"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "tooltip__text",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "This section provides information on the value of this indefinite delivery vehicle (IDV) at two different levels, shown separately under the following tabs:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Award Orders Made Under this IDV" }), " – The information within this tab is derived from the spending data of every award order made under this IDV, including child award orders* and grandchild award orders*.  It does not include the spending data of the IDV itself* or its child IDV orders*. This is because award amount data is not typically found in IDVs themselves. In order to provide a better idea of the actual value of the IDV as a whole, award amounts are taken from its award orders and then aggregated (or summed together) and then presented here."] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Counts of the total amount of orders as well as the child award orders and grandchild award orders are also displayed in a table below the bar chart." })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "This IDV" }), " – This tab contains spending data that is directly attributed to the IDV record summarized on this page. This data does not include the spending data attributed to any awards or IDVs made under it.  In many cases, the data directly attributed to an IDV record does not show actual award amounts, which is why the amounts in this tab are often $0."] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "*Child award order" }), " refers to award orders made directly under this IDV (IDV > Award)."] }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "*Child IDV order" }), " refers to IDVs made directly under this IDV (IDV > IDV)."] }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "*Grandchild award order" }), " refers to award orders made within a child IDV order (IDV > IDV > Award)."] }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "*IDV itself" }), " refers to the top-level IDV this page is summarizing, not including any of its child award orders or child IDV orders."] }) })
			] })]
		})]
	});
	awardHistoryIdv = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "award-summary-tooltip",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "tooltip__title",
			children: "Award History"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "tooltip__text",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Transaction History" }), " – This table contains historical changes made to this award, shown as individual modification records. This information is reported by the Awarding Agency's contracting office."] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Federal Account Funding" }), " – The data documenting the funding, or the actual transactions made my an agency to obligate money, of an award can be found in this table. This data comes from the Awarding Agency's financial accounting offices."] })]
		})]
	});
	awardHistoryContract = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "award-summary-tooltip",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "tooltip__title",
			children: "Award History"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "tooltip__text",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "This section displays all of this award's transactions (also known as modifications), sub-awards, and federal account funding data in tabs and rows. Please note that the tables displayed here only feature a small set of the available data fields.  To download the full set, including data attributes not displayed here and all related sub-awards and federal account data, click the “DOWNLOAD” button at the top-right of this page." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Transaction History" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "tooltip__text-section",
					children: "This table contains historical changes made to this award, shown as individual modification records. This information is reported by the awarding agency's contracting or grants officer."
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Sub-Awards" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "tooltip__text-section",
					children: "This table contains any sub-awards reported by this recipient."
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Federal Account Funding" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "tooltip__text-section",
					children: "This table contains funding data directly submitted from agency financial accounting systems, also known as “Award Financial” or “Account Breakdown by Award” data. This data, which links each Treasury account to each award transaction it funds, connects award spending to the appropriation, budgeting, and allocation processes, which channel Congressional and Administration intent and determine how much money is assigned to each federal account."
				})] })
			]
		})]
	});
	awardHistoryFinancialAssistanceGeneric = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "award-summary-tooltip",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "tooltip__title",
			children: "Award History"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "tooltip__text",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "This section displays all of this award's transactions (modifications) and federal account funding data in tabs and rows. The tables display only a small set of the available data fields.  To download the full set, including data attributes not displayed here and federal account data, click the “DOWNLOAD” button at the top-right of this page." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Transaction History" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "tooltip__text-section",
					children: "This table contains historical changes made to this award, shown as individual modification records. This information is reported by the awarding agency's officer."
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Federal Account Funding" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "tooltip__text-section",
					children: "This table contains funding data directly submitted from agency financial accounting systems, also known as “Award Financial” or “Account Breakdown by Award” data. This data, which links each Treasury account to each award transaction it funds, connects award spending to the appropriation, budgeting, and allocation processes, which channel Congressional and Administration intent and determine how much money is assigned to each federal account."
				})] })
			]
		})]
	});
	awardHistoryFinancialAssistanceLoan = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "award-summary-tooltip",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "tooltip__title",
			children: "Award History"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "tooltip__text",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "This section displays all of this award's transactions (modifications) and federal account funding data in tabs and rows. The tables display only a small set of the available data fields.  To download the full set, including data attributes not displayed here and federal account data, click the “DOWNLOAD” button at the top-right of this page." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Transaction History" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "tooltip__text-section",
					children: "This table contains historical changes made to this loan award, shown as individual modification records. This information is reported by the awarding agency's loan officer."
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Federal Account Funding" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "tooltip__text-section",
					children: "This table contains funding data directly submitted from agency financial accounting systems, also known as “Award Financial” or “Account Breakdown by Award” data. This data, which links each Treasury account to each award transaction it funds, connects award spending to the appropriation, budgeting, and allocation processes, which channel Congressional and Administration intent and determine how much money is assigned to each federal account."
				})] })
			]
		})]
	});
	datesInfoAsst = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "award-summary-tooltip",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "tooltip__title",
			children: "Dates"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "tooltip__text",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Start Date" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "tooltip__text-section",
					children: "The start date marks when the awarded recipient's work begins or when the award is otherwise effective.  This is also called the period of performance start date."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "End Date" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "tooltip__text-section",
					children: "The end date marks the end of the award's period of performance, when the recipient will finish its work or the award will otherwise end."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "tooltip__text-section",
					children: "Note that administrative actions related to this award may continue to occur after this date."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "tooltip__text-section",
					children: "Assistance awards are sometimes subject to extensions, noncompetitive continuations, or early termination; if any of these occur, they will be indicated by a modification that alters the end date."
				})
			]
		})]
	});
	datesInfo = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "award-summary-tooltip",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "tooltip__title",
			children: "Dates"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "tooltip__text",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Start Date" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "tooltip__text-section",
					children: "The start date marks when the awarded recipient's work begins or when the award is otherwise effective. This is also called the period of performance start date or effective date of the contract."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Current End Date" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "tooltip__text-section",
					children: "The current end date marks the end of the contract's current period of performance or when the recipient will finish its work. This date factors in only currently-exercised contract extension options."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "tooltip__text-section",
					children: "Note that administrative actions related to this contract may continue to occur after this date."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Potential End Date" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "tooltip__text-section",
					children: "The potential end date marks the end of the contract's potential period of performance or when the recipient will finish its work if all remaining contract extension options are exercised."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "tooltip__text-section",
					children: "Note that administrative actions related to this contract may continue to occur after this date."
				})
			]
		})]
	});
	datesInfoIdv = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "award-summary-tooltip",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "tooltip__title",
			children: "Dates"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "tooltip__text",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The dates below are described in more detail:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Start Date" }), " – This is the effective date, or when the IDV was made available for use by agencies."] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Ordering Period End Date" }), " – This is the last date for agencies to make purchases under this IDV."] })] })]
		})]
	});
	contractActivityGrants = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "award-summary-tooltip",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "tooltip__title",
			children: "Grant Activity"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "tooltip__text",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "This chart displays modifications made over the course of this grant's period of performance.  It gives you a sense of how obligations on this grant were made over time, and how they changed the value of the grant." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Grant Transactions" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "tooltip__text-section",
						children: "Each transaction is marked by a dot.  You can hover your cursor over each dot to get more information for that particular transaction."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "tooltip__text-section",
						children: "The vertical placement of each dot (transaction) represents the total amount obligated at that time (up to and including that transaction) and the horizontal placement represents the transaction's action date."
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Start Date" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "tooltip__text-section",
					children: "The start date marks when the awarded recipient's work begins or when the award is otherwise effective.  This is also called the period of performance start date. "
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "End Date" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "tooltip__text-section",
						children: "The end date marks the end of the grant's period of performance or when the recipient will finish its work."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "tooltip__text-section",
						children: "Administrative actions related to this grant may continue to occur after this date."
					})
				] })
			]
		})]
	});
	contractActivityInfoContracts = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "award-summary-tooltip",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "tooltip__title",
			children: "Contract Activity"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "tooltip__text",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "This chart displays modifications made over the course of this contract's period of performance. It gives you a sense of how obligations on this contract were made over time and how they changed the value of the contract." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Contract Transactions" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "tooltip__text-section",
						children: "Each transaction is marked by a dot.  You can hover your cursor over each dot to get more information for that particular transaction."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "tooltip__text-section",
						children: "The vertical placement of each dot (transaction) represents the total amount obligated at that time (up to and including that transaction) and the horizontal placement represents the transaction's action date."
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Potential Award Amount" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "tooltip__text-section",
					children: "The horizontal line at the top of the chart represents the potential award amount, or contract ceiling, of this contract."
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Start Date" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "tooltip__text-section",
					children: "The start date marks when the awarded recipient's work begins or when this contract is otherwise effective.  This is also called the period of performance start date or effective date."
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Current End Date" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "tooltip__text-section",
						children: "The current end date marks the end of this contract's current period of performance or when the recipient will finish its work.  This date factors in only currently-exercised contract extension options."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "tooltip__text-section",
						children: "Note that administrative actions related to this contract may continue to occur after this date."
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Potential End Date" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "tooltip__text-section",
						children: "The potential end date marks the end of this contract's potential period of performance or when the recipient will finish its work if all remaining contract extension options are exercised."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "tooltip__text-section",
						children: "Note that administrative actions related to this contract may continue to occur after this date."
					})
				] })
			]
		})]
	});
	idvActivityInfo = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "award-summary-tooltip",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "tooltip__title",
			children: "IDV Activity"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "tooltip__text",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "How to read this visual:" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"Each bar represents a ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "child award order*" }),
					" or",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: " grandchild award order* " }),
					"made underneath this indefinite delivery vehicle (IDV). Each bar’s position on the vertical axis indicates its ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "obligated amount" }),
					". Where the left side of each bar begins on the horizontal axis indicates the start date of its period of performance. Where the right side of each bar ends on the horizontal axis indicates the end date of its period of performance. The green part of each bar shows how much of the award order’s potential award amount has been obligated. For example, a green bar reaching half of the width of the grey bar means the award has obligated half of its potential award amount."
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Data shown in this visual:" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"This visual shows the award orders made under this IDV. This includes",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: " child award orders*" }),
					" made directly underneath this IDV, as well as ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "grandchild award orders* " }),
					"made under ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "child IDV orders*" }),
					"."
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Data not shown in this visual:" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"This visual does not show the ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "IDV itself*" }),
					" nor does it show the",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: " child IDV orders*" }),
					" made under this IDV. If an award has a zero or negative obligated amount, or is missing an end date, it is not displayed."
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Options when viewing the awards:" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"Awards orders are shown 10, 50, or 100 at a time (user choice) and in descending order according to their respective",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: " obligated amounts" }),
					". Use the page number links at the top-right of this section to view more."
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "You can get more details on each award order by hovering your cursor over the award order’s bar." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "*Child award order" }),
						" refers to award orders made directly under this IDV (IDV => ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Award" }),
						")."
					] }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "*Child IDV order" }),
						" refers to IDVs made directly under this IDV (IDV => ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "IDV" }),
						")."
					] }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "*Grandchild award order" }),
						" refers to award orders made within a child IDV order (IDV => IDV => ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Award" }),
						")."
					] }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "*IDV itself" }), " refers to the top-level IDV this page is summarizing, not including any of its child award orders or child IDV orders."] }) })
				] })
			]
		})]
	});
	federalAccountsInfoContract = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "award-summary-tooltip",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "tooltip__title",
			children: "Federal Accounts"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "tooltip__text",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "tooltip__text-section",
					children: "The funding committed by the government to an award is stored in federal accounts.  The federal accounts and the amounts they have committed to this award are displayed here."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Viewing Options for this Visual: " }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "tooltip__text-section",
					children: "You can view federal account data as a list or as a treemap by clicking on the buttons at the top right corner of this section. The chart below this data provides a Summary of All Federal Accounts Used by this Award."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "tooltip__text-section",
					children: "In the list view, a summary table displays the total reported funding committed to this award from each contributing federal account, as well as associated funding agencies and awarding agencies."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "tooltip__text-section",
					children: "In the treemap view, each proportionately-sized rectangle represents a different federal account's portion of the total funding for this award."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Data Shown in this Visual" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "tooltip__text-section",
					children: "This visual leverages funding data directly submitted from agency financial accounting systems, also known as “Award Financial” or “Account Breakdown by Award” data. This data, which links each Treasury account to each Award transaction it funds, connects award spending to the appropriation, budgeting, and allocation processes, which channel Congressional and Administration intent and determine how much money is assigned to each federal account."
				})
			]
		})]
	});
	federalAccountsInfoIdv = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "award-summary-tooltip",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "tooltip__title",
			children: "Federal Accounts"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "tooltip__text",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "How to read this visual:" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"The funding committed to the award orders made under this indefinite delivery vehicle (IDV) is shown here. Each rectangle represents a different federal account. The size of each rectangle indicates the fraction of the total funding for this IDV provided by that federal account."
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Data shown in this visual:" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"Funding data* from all child award orders* and grandchild award orders* are summed and categorized by the federal account it came from."
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Data not shown in this visual:" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"This section does not show any federal account funding directly attached to the IDV itself* (if any) nor funding directly attached to its child IDV orders* (if any)."
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Viewing options for this visual:" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"You can view this data as a treemap or as a list by clicking on the buttons at the top right corner of this section."
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Summary table:" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"Also included is a summary table showing the total federal account funding committed across all award orders made underneath this IDV, as well as the counts of federal funding accounts and awarding agencies involved with these award orders."
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "*Funding data" }), " refers to award-level accounting/financial data submitted by government agencies which is linked to complementary data they previously submitted from their award systems. . This is the same data available for download in the Download Center, under Custom Account Download by selecting “Account Breakdown by Award” within the “File Type” section."] }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "*Child award order" }), " refers to award orders made directly under this IDV (IDV > Award)."] }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "*Child IDV order" }), " refers to IDVs made directly under this IDV (IDV > IDV)."] }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "*Grandchild award order" }), " refers to award orders made within a child IDV order (IDV > IDV > Award)."] }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "*IDV itself" }), " refers to the top-level IDV this page is summarizing, not including any of its child award orders or child IDV orders."] }) })
				] })
			]
		})]
	});
	ContractAwardAmountsInfo = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "award-summary-tooltip",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "tooltip__title",
			children: "Award Amounts"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "tooltip__text",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "This section illustrates how much the government has spent on this award." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The outlayed amount of a contract represents the amount an agency has paid the vendor as recorded in the agency’s financial system. Please note that the Office of Management and Budget (OMB) required agencies to provide outlay data at the award summary level for each award that received COVID-19 supplemental funding starting in Fiscal Year (FY) 2020, and for all awards starting in FY 2022. As a result, award-level outlay data are incomplete prior to FY 2022, and almost entirely absent prior to FY 2020." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The obligated amount of a contract represents the amount an agency has promised to pay the vendor as recorded in the agency's financial system. It usually matches the current value of the contract, but certain agencies (e.g., DOD) are allowed to incrementally fund some contracts in their financial systems. In these cases, the obligated amount may lag behind the current award amount." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The current value of a contract (current award amount) represents the value of the base contract and any exercised options. " }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The potential value of a contract (potential award amount) represents the value of the base contract and all options, if they happen to be exercised in the future. This is sometimes called the contract ceiling or capacity." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "If a recipient fails to deliver on the terms of the contract, the contract can end or be modified, reducing the current and potential value through a deobligation." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "This visual depicts the outlayed amount, obligated amount, current award amount, and potential award amount of the contract." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Hover over the chart for more information about the specific amounts displayed." })
			]
		})]
	});
	AsstAwardAmountsInfo = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "award-summary-tooltip",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "tooltip__title",
			children: "Award Amounts"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "tooltip__text",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "This section illustrates the total value of this award, which is a combination of any obligated federal dollars and non-federal funding provided." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Hover over the chart for more information about the specific amounts displayed." })]
		})]
	});
	LoanAwardAmountsInfo = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "award-summary-tooltip",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "tooltip__title",
			children: "Award Amounts"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "tooltip__text",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "This section illustrates the total value of this loan to the recipient and its expected cost to the government." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The total face value of the loan is shown with the original subsidy cost as a portion of that face value.  The original subsidy cost is the long-term estimated cost of this loan to the government based on the modeled risk that the recipient will default. Administrative costs of running the loan program itself are excluded from this number." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Hover over the chart for more information about the specific amounts displayed." })
			]
		})]
	});
	CFDAOverviewInfo = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "award-summary-tooltip",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "tooltip__title",
			children: "Assistance Listing (CFDA Program)"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "tooltip__text",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The Catalog of Federal Domestic Assistance (CFDA), also known as Assistance Listings, is a collection of federal financial assistance programs that provides benefits to the American public. Every assistance award must be categorized under a CFDA program, and every CFDA program must be specifically authorized by congressional statute before an agency can begin to issue awards under it." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The CFDA number(s) and title(s) listed here identify the program(s) associated with this award." })]
		})]
	});
	CFDASectionInfo = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "award-summary-tooltip",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "tooltip__title",
			children: "Assistance Listing (CFDA Program)"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "tooltip__text",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The Catalog of Federal Domestic Assistance (CFDA), also known as Assistance Listings, is a collection of federal financial assistance programs that provide benefits to the American public. Every assistance award must be categorized under a CFDA program, and every CFDA program must be specifically authorized by Congressional statute before an agency can begin to issue awards under it." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "This section contains information about the CFDA program(s) that this award has been categorized under.  This information includes the following:" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Objectives " }), "The purpose, goals, and details of this CFDA program and its implementation."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Administrative Agency " }), "The federal agency that operates this CFDA program."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Website " }), "The official website of this CFDA program."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "SAM.gov Page " }), "The CFDA program’s page on SAM.gov, which is the source of data in this section.  Additional information on this CFDA program, including contact information, projected future spending and information on how to apply (if appropriate) can be found here."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Use of Assistance " }), "The broad functional category this CFDA program falls under (e.g., Agriculture)"] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Applicant Eligibility " }), "The types of recipients that are eligible to apply for assistance funds from this CFDA program."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Beneficiary Eligibility " }), "The types of organizations that are eligible beneficiaries under this CFDA Program."] })
				] })
			]
		})]
	});
	CovidFlagTooltip = ({ codes }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "award-summary-tooltip covid-19",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "tooltip__title",
			children: "Includes COVID-19 Spending"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "tooltip__text",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"This award is part of the COVID-19 Spending because part of its spending was derived from funds associated with the following ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Disaster Emergency Fund Codes" }),
				" (DEFC): "
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				style: { textAlign: "center" },
				children: codes.sort().map((code, i, arr) => {
					if (i === arr.length - 1) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: code.toUpperCase() }, uniqueId(i));
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: `${code.toUpperCase()}, ` }, uniqueId(i));
				})
			})]
		})]
	});
	CovidFlagTooltip.propTypes = { codes: PropTypes.arrayOf(PropTypes.string) };
	UnlinkedTooltip = (props) => {
		const clickCloseTooltip = () => {
			props.setShowTooltip(false);
		};
		const closeTooltip = (e) => {
			if (e.key === "Enter" || e.key === "Escape") clickCloseTooltip();
		};
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "award-summary-tooltip unlinked",
			styles: {
				position: "absolute",
				transform: `translate(0px,20px)`
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "tooltip__header",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "tooltip__title",
					children: "This award has not been linked to any federal account"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "tooltip__close-button",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "award-summary__close-button",
						title: "Dismiss tooltip",
						"aria-label": "Dismiss tooltip",
						tabIndex: 0,
						onKeyUp: closeTooltip,
						onClick: clickCloseTooltip,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Close, {})
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "tooltip__text",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "This means all financial system data elements (File C) are unavailable on this page and in downloads for this award." })
			})]
		});
	};
	UnlinkedTooltip.propTypes = { setShowTooltip: PropTypes.func };
	CondensedCDTooltip = ({ title }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "award-summary-tooltip",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "tooltip__title",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "tooltip__text",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The congressional districts displayed reflect current congressional districts based on redistricting as a result of the 2020 census. These districts will be in effect from 2023 – 2033.*" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					"Additional information can be found in the \"Congressional District Data\" section of the",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AboutTheDataLink, {
						slug: "congressional-district-data",
						children: " About the Data "
					}),
					"module under Find Resources."
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "*Court-ordered redistricting might alter the time frame when a congressional district is in effect." }) })
			]
		})]
	});
	ExplorerInfoToolTip = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "award-summary-tooltip",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "tooltip__title",
			children: "Data Source"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "tooltip__text",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"The sum of line 2190 across all remaining accounts in the",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: " GTAS SF 133 Report on Budget Execution and Budgetary Resources " }),
				"for this period, after excluding loan financing accounts. Loan program accounts ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("u", { children: "are" }),
				" included."
			] })
		})]
	});
	CondensedCDTooltip.propTypes = { title: PropTypes.string };
}));
//#endregion
export { federalAccountsInfoContract as A, summaryRelatedAwardsInfo as B, datesInfo as C, descriptionInfoAsst as D, descriptionInfo as E, loanSubsidyCost as F, transactionDescription as H, modificationNumber as I, recipientName as L, idvActivityInfo as M, init_InfoTooltipContent as N, descriptionInfoContract as O, loanFaceValue as P, relatedAwardsInfo as R, contractActivityInfoContracts as S, datesInfoIdv as T, summaryRelatedAwardsInfoIdv as V, awardHistoryContract as _, ContractAwardAmountsInfo as a, awardHistoryIdv as b, LoanAwardAmountsInfo as c, actionDateSub as d, actionType as f, awardAmountsInfo as g, amountSub as h, CondensedCDTooltip as i, federalAccountsInfoIdv as j, descriptionSub as k, UnlinkedTooltip as l, amount as m, CFDAOverviewInfo as n, CovidFlagTooltip as o, actionTypeFA as p, CFDASectionInfo as r, ExplorerInfoToolTip as s, AsstAwardAmountsInfo as t, actionDate as u, awardHistoryFinancialAssistanceGeneric as v, datesInfoAsst as w, contractActivityGrants as x, awardHistoryFinancialAssistanceLoan as y, subawardID as z };
