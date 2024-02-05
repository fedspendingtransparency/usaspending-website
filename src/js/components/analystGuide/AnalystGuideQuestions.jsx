/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-array-index-key */
/* eslint-disable max-len */
import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Accordion from "../sharedComponents/accordion/Accordion";
import GlossaryLink from '../sharedComponents/GlossaryLink';

const AnalystGuideQuestions = ({ onExternalLinkClick }) => {
    const jumpToSection = (section = '') => {
        const sectionDom = document.querySelector(`#${section}`);
        if (!sectionDom) {
            return;
        }
        window.scrollTo({
            top: sectionDom.offsetTop + 585,
            left: 0,
            behavior: 'smooth'
        });
    };

    const awardAccountSpendingComparisonQuestions = [{
        question: "What is the difference between award and account spending?",
        answer: (<><p className="analyst-guide__answerStyle">Account spending includes all government spending. Award spending is a subset of account spending that includes only money the federal government has paid or promised to pay a non-federal recipient through financial assistance or a contract.</p>
            <p className="analyst-guide__answerStyle">For example, account spending includes money used to pay federal government employees’ salaries. This spending is not included in award spending.</p></>)
    },
    {
        question: "How is the value of award and account spending measured?",
        answer: (<>
            <p className="analyst-guide__answerStyle">The value of award and account spending (except for loans) is measured by obligations and outlays. The value of loans is measured using loan subsidy cost.</p>
            <p className="analyst-guide__answerStyle">An obligation is a promise made by the government to spend funds. An agency incurs an obligation when it takes an action that requires it to make a payment such as placing an order, signing a contract, awarding a grant, or purchasing a service. Negative obligations, or de-obligations, occur when agencies decrease previous obligations to correct errors or to reflect new information. A de-obligation may be issued when the price of a project was lower than expected.</p>
            <p className="analyst-guide__answerStyle">An outlay occurs when money is actually paid out. </p>
            <p className="analyst-guide__answerStyle">Loan subsidy cost is an estimation made by the government of what a loan will cost over time. </p>
            <p className="analyst-guide__answerStyle">More information about the data elements used to measure the value of award and account spending is available throughout this guide.</p>
        </>)
    },
    {
        question: "How is award spending linked to account spending?",
        answer: (<>
            <p className="analyst-guide__answerStyle">Agencies periodically upload account spending in various formats. One format (account breakdown by award) represents award activity and includes details on federal accounts funding that activity. Agencies also upload transaction level award spending for both contracts and financial assistance. </p>
            <p className="analyst-guide__answerStyle">These files can be linked together to associate award spending with account spending. If a shared ID cannot be found between these files, award spending may be unlinked to any account.</p>
            <p className="analyst-guide__answerStyle">The{' '}
                <Link to="/submission-statistics">Agency Submission Statistics page</Link>
                {' '}contains data on this linkage under the “Number of Unlinked Contract Awards” and “Number of Unlinked Assistance Awards” columns.
            </p>
            <p className="analyst-guide__answerStyle">More information about federal accounts is discussed in the{' '}
                <button
                    role="link"
                    className="analyst-guide__sectionJump"
                    onClick={() => jumpToSection("analyst-guide__AccountData")}>
                    ACCOUNT DATA ELEMENTS
                </button>{' '}section of this guide.
            </p>
        </>)
    }];

    const awardSpendingQuestions = [{
        question: "What is a prime award? What is a sub-award? What is prime award transaction? What is a prime award summary?",
        answer: (<>
            <p className="analyst-guide__answerStyle">A prime award is an agreement that the federal government makes with a non-federal entity for the purpose of carrying out a federal program. Prime awards are distinct from sub-awards. A sub-award is an agreement that a prime award recipient makes with another entity to perform a portion of the work for of a prime award.</p>
            <p className="analyst-guide__answerStyle">A prime award transaction can be either the initial (also called ‘base’) contract, grant, loan, etc. of a prime award, or any amendment or modification to a prime award.</p>
            <p className="analyst-guide__answerStyle">A prime award summary is a roll-up of all related prime award transactions which share a set of identifiers that make up the unique award key. Prime award transactions are aggregated together as prime award summaries using different sets of fields for contracts versus financial assistance award spending.</p>
        </>)
    },
    {
        question: "What are the two major categories of award spending?",
        answer: (<>
            <p className="analyst-guide__answerStyle">The two main categories of award spending are financial assistance spending and contract spending.</p>
            <p className="analyst-guide__answerStyle">The federal government uses financial assistance spending to transfer money (or in-kind resources) to a non-federal entity to serve a public purpose as defined by Congress. The federal government uses contract spending to purchase the goods and services required to fulfill agencies’ public duties. </p>
            <p className="analyst-guide__answerStyle">For example, the Federal Highway Administration uses financial assistance spending to provide funds to states for public roads while the Air Force uses contract spending to acquire fighter jets to execute its mission.</p>
            <p className="analyst-guide__answerStyle">Some data elements across financial assistance and contract spending are different between the two categories. More information about these differences is available throughout this guide.</p>
        </>)
    },
    {
        question: "Which fields in USAspending download files contain prime award summary identifier information?",
        answer: (<>
            <p className="analyst-guide__answerStyle">The award_unique_key, assistance_award_unique_key, and contract_award_unique_key columns contain prime award summary identifier information. </p>
            <p className="analyst-guide__answerStyle">The award_unique_key field contains both financial assistance and contract prime award summary identifier information. This field is available in Treasury and federal account level account breakdown by award account download files. The assistance_award_unique_key field contains financial assistance prime award summary identifier information. This field is available in financial assistance prime award transaction and summary download files. The contract_award_unique_key field contains contract prime award summary identifier information. This field is available in contract prime award transaction and summary download files. </p>
            <p className="analyst-guide__answerStyle">These fields may be used to aggregate, filter, or join account breakdown by award, prime award summary, and prime award transaction download files by prime award summary.</p>
            <p className="analyst-guide__answerStyle">More information about these identifiers is{' '}
                <button
                    value="https://github.com/fedspendingtransparency/usaspending-api/wiki/Award-Identifiers"
                    role="link"
                    className="analyst-guide__external-link"
                    onClick={onExternalLinkClick}>
                        available online{' '}
                    <span
                        data-href="https://github.com/fedspendingtransparency/usaspending-api/wiki/Award-Identifiers"
                        className="usa-button-link__icon">
                        <FontAwesomeIcon data-href="https://github.com/fedspendingtransparency/usaspending-api/wiki/Award-Identifiers" icon="external-link-alt" />
                    </span>
                        .
                </button>
            </p>
            <p className="analyst-guide__answerStyle">The Award ID filter on <Link to="/search">Advanced Search</Link> can be used to filter award spending by the PIID, FAIN and URI data elements. These data elements are important components of prime award summary identifier information.</p>
            <p className="analyst-guide__answerStyle">More information about these fields is available in the <Link to="/data-dictionary">Data Dictionary</Link> and the <a href="https://files.usaspending.gov/docs/Custom+Account+Data+Dictionary.xlsx">Custom Account Data Dictionary</a>.</p>
            <p className="analyst-guide__answerStyle">More information on how to download data from USAspending is available in the{' '}
                <button
                    role="link"
                    className="analyst-guide__sectionJump"
                    onClick={() => jumpToSection("analyst-guide__DataAccess")}>
                    HOW TO ACCESS THE DATA
                </button>{' '}section of this guide.
            </p>
        </>)
    },
    {
        question: "What are the different award type categories?",
        answer: (<>
            <p className="analyst-guide__answerStyle">Both financial assistance and contract spending may be further categorized into more granular award types, such as a purchase order or a direct loan. There are over 20 award type categories available in USAspending.</p>
        </>)
    },
    {
        question: "Which fields in USAspending download files contain award type information?",
        answer: (<>
            <p className="analyst-guide__answerStyle">The assistance_type_code, assistance_type_description, award_type_code, award_type, parent_award_type_code, and parent_award_type fields contain award type information. These fields are used to categorize prime awards and parent prime awards by the various detailed types of financial assistance and contract spending.</p>
            <p className="analyst-guide__answerStyle">The assistance_type_code and assistance_type_description fields are available on financial assistance prime award transaction and summary files. The award_type_code and award_type fields are available on contract prime award transaction and summary files, and Treasury and federal account level account breakdown by award files. The parent_award_type and parent_award_type_code fields are available on contract prime award transaction and summary files.</p>
            <p className="analyst-guide__answerStyle">The Award Type filter on <Link to="/search">Advanced Search</Link> can be used to filter award spending by these data elements.</p>
            <p className="analyst-guide__answerStyle">More information about these fields is available in the <Link to="/data-dictionary">Data Dictionary</Link> and the <a href="https://files.usaspending.gov/docs/Custom+Account+Data+Dictionary.xlsx">Custom Account Data Dictionary</a>.</p>
            <p className="analyst-guide__answerStyle">More information on how to download data from USAspending is available in the{' '}
                <button
                    role="link"
                    className="analyst-guide__sectionJump"
                    onClick={() => jumpToSection("analyst-guide__DataAccess")}>
                    HOW TO ACCESS THE DATA
                </button>{' '}section of this guide.
            </p>
            <p className="analyst-guide__answerStyle">More information about parent awards is available in the {' '}
                <button
                    role="link"
                    className="analyst-guide__sectionJump"
                    onClick={() => jumpToSection("analyst-guide__ContractTransactions")}>
                    CONTRACT TRANSACTIONS AND AWARD SUMMARIES
                </button>{' '}section of this guide.
            </p>
        </>)
    },
    {
        question: "Which fields in USAspending download files contain award spending amount information?",
        answer: (<>
            <p className="analyst-guide__answerStyle">The federal_action_obligation, total_obligated_amount, original_loan_subsidy_cost, and total_loan_subsidy_cost fields contain financial assistance and contract award spending amount information. </p>
            <p className="analyst-guide__answerStyle">The federal_action_obligation field is available on financial assistance and contract prime award transaction download files. The total_obligated_amount field is available on financial assistance and contract prime award transaction and summary download files. The original_loan_subsidy_cost field is available on financial assistance prime award transaction download files. The total_loan_subsidy_cost field is available on financial assistance prime award transaction and summary download files.</p>
            <p className="analyst-guide__answerStyle">The Award Amount filter on <Link to="/search">Advanced Search</Link> can be used to filter award spending by these data elements.</p>
            <p className="analyst-guide__answerStyle">More information about these fields is available in the <Link to="/data-dictionary">Data Dictionary</Link> and the <a href="https://files.usaspending.gov/docs/Custom+Account+Data+Dictionary.xlsx">Custom Account Data Dictionary</a>.</p>
            <p className="analyst-guide__answerStyle">More information on how to download data from USAspending is available in the{' '}
                <button
                    role="link"
                    className="analyst-guide__sectionJump"
                    onClick={() => jumpToSection("analyst-guide__DataAccess")}>
                    HOW TO ACCESS THE DATA
                </button>{' '}section of this guide.
            </p>
        </>)
    },
    {
        question: "How are data on financial assistance and contract spending different?",
        answer: (<>
            <p className="analyst-guide__answerStyle">Only financial assistance spending includes Assistance Listings information (formerly CFDA Program). Only contract spending includes North American Industry Classification System (NAICS) and Product and Service Codes (PSC) information. Both financial assistance and contract spending include recipient type information. However, different recipient type categories apply to financial assistance versus contract spending. Financial assistance and contract spending use different fields to identify awards.</p>
            <p className="analyst-guide__answerStyle">More information about Assistance Listings data elements is discussed in the {' '}
                <button
                    role="link"
                    className="analyst-guide__sectionJump"
                    onClick={() => jumpToSection("analyst-guide__AssistanceListings")}>
                    ASSISTANCE LISTINGS DATA ELEMENTS
                </button>{' '}section of this guide.
            </p>
            <p className="analyst-guide__answerStyle">More information about NAICS and PSC data elements is discussed in the {' '}
                <button
                    role="link"
                    className="analyst-guide__sectionJump"
                    onClick={() => jumpToSection("analyst-guide__Industry")}>
                   INDUSTRY AND PRODUCT DATA ELEMENTS
                </button>{' '}section of this guide.
            </p>
            <p className="analyst-guide__answerStyle">More information about recipient data elements is discussed in the {' '}
                <button
                    role="link"
                    className="analyst-guide__sectionJump"
                    onClick={() => jumpToSection("analyst-guide__Recipient")}>
                    RECIPIENT DATA ELEMENTS
                </button>{' '}section of this guide.
            </p>
        </>)
    },
    {
        question: "How are data on financial assistance and contract spending similar?",
        answer: (<>
            <p className="analyst-guide__answerStyle">Both financial assistance and contract spending include the following information:</p>
            <ul>
                <li className="analyst-guide__answerStyle">Treasury and federal account categories</li>
                <li className="analyst-guide__answerStyle">Location information, including primary place of performance and recipient location</li>
                <li className="analyst-guide__answerStyle">Recipient information, including recipient name, recipient type and recipient location</li>
                <li className="analyst-guide__answerStyle">Disaster Emergency Fund Codes (DEFC) categories</li>
            </ul>
            <p className="analyst-guide__answerStyle">More information about account data elements is available in the {' '}
                <button
                    role="link"
                    className="analyst-guide__sectionJump"
                    onClick={() => jumpToSection("analyst-guide__AccountData")}>
                    ACCOUNT DATA ELEMENTS
                </button>{' '}section of this guide.
            </p>
            <p className="analyst-guide__answerStyle">More information about location data elements is available in the {' '}
                <button
                    role="link"
                    className="analyst-guide__sectionJump"
                    onClick={() => jumpToSection("analyst-guide__LocationData")}>
                    LOCATION DATA ELEMENTS
                </button>{' '}section of this guide.
            </p>
            <p className="analyst-guide__answerStyle">More information about recipient data elements is available in the {' '}
                <button
                    role="link"
                    className="analyst-guide__sectionJump"
                    onClick={() => jumpToSection("analyst-guide__Recipient")}>
                    RECIPIENT DATA ELEMENTS
                </button>{' '}section of this guide.
            </p>
            <p className="analyst-guide__answerStyle">More information about DEFC data elements is available in the {' '}
                <button
                    role="link"
                    className="analyst-guide__sectionJump"
                    onClick={() => jumpToSection("analyst-guide__Disaster")}>
                  DISASTER AND EMERGENCY DATA ELEMENTS
                </button>{' '}section of this guide.
            </p>
        </>)
    },
    {
        question: "Are outlays included in award spending data?",
        answer: (<>
            <p className="analyst-guide__answerStyle">Beginning in FY2022, all agencies were required to submit outlay data for award spending every month. Awards funded by a COVID-19 supplemental were required to submit outlays starting in April of 2020. Any outlay data before this period was optional for agencies to report, and thus may be incomplete.</p>
        </>)
    }];

    const financialAssistanceQuestions = [{
        question: "How is the value of a loan measured?",
        answer: (<>
            <p className="analyst-guide__answerStyle">There are two data elements used to measure the value of a loan: the face value of the loan and the loan subsidy cost. The face value of a loan is the total amount of the loan. The loan subsidy cost is the government’s estimate of the loan’s likely cost to the government, in net present value terms. Because federal loans are expected to be repaid, the face value of a loan is not considered federal spending (and for loan guarantees, the face value is not even directly provided by the government, but instead from a third-party financial institution).</p>
            <p className="analyst-guide__answerStyle">Loan subsidy cost is calculated based on a credit model specific to the program and, in some cases, the recipient’s characteristics or credit history. Loan subsidy cost allows the government to budget for potential defaults on loans. </p>
        </>)
    },
    {
        question: "How do the face value and subsidy cost of loans impact the value of award spending?",
        answer: (<>
            <p className="analyst-guide__answerStyle">Positive loan subsidy costs are included in obligations and outlays. The face value of a loan is not included in obligations or outlays. Administrative costs of running the loan or loan guarantee program are excluded from loan subsidy cost calculations.</p>
            <p className="analyst-guide__answerStyle">Loan subsidy costs can be positive, negative, or zero depending on whether the government expects to lose money, gain money, or break even on a loan. The loan subsidy cost of a loan should never be larger in absolute value than the face value of the loan. </p>
            <p className="analyst-guide__answerStyle">When loan subsidy cost is updated to reflect the outcome or current state of loans, agency budgets more accurately reflect resources used for loans.</p>
        </>)
    },
    {
        question: "Do agencies update loan data in USAspending through the life of a loan?",
        answer: (<>
            <p className="analyst-guide__answerStyle">Currently, it’s uncommon for agencies to update loans with corrections to the base record or by adding a modification record. As a result, the face value and subsidy cost data on USAspending generally only reflect the reality at the time of initial reporting. If the face value of the loan is modified during its life (such as if the loan principal is later expanded or the recipient returns part of the original loan), this will generally not be reflected in the data. If the risk profile of a recipient changes, up to and including if they completely default on the loan, this will generally not be reflected in the data. If the loan is forgiven, this will generally not be reflected in the data either. Consequently, loan spending data are generally less accurate than that of other award types.</p>
        </>)
    },
    {
        question: "Which fields in USAspending download files contain loan value information?",
        answer: (<>
            <p className="analyst-guide__answerStyle">The total_face_value_of_loan, face_value_of_loan, total_loan_subsidy_cost, and original_loan_subsidy_cost fields contain loan value data. </p>
            <p className="analyst-guide__answerStyle">All four fields are available in financial assistance prime award transaction download files. The total_face_value_of_loan and total_loan_subsidy_cost fields are also available in financial assistance prime award summary download files.</p>
            <p className="analyst-guide__answerStyle">The Award Amount filter on <Link to="/search">Advanced Search</Link> can be used to filter award spending by loan subsidy cost.</p>
            <p className="analyst-guide__answerStyle">More information about these fields is available in the <Link to="/data-dictionary">Data Dictionary</Link>.</p>
            <p className="analyst-guide__answerStyle">More information on how to download data from USAspending is available in the{' '}
                <button
                    role="link"
                    className="analyst-guide__sectionJump"
                    onClick={() => jumpToSection("analyst-guide__DataAccess")}>
                    HOW TO ACCESS THE DATA
                </button>{' '}section of this guide.
            </p>
        </>)
    }];

    const contractTransactionQuestions = [{
        question: "What are Indefinite Delivery Vehicles and how are they represented in USAspending?",
        answer: (<>
            <p className="analyst-guide__answerStyle">Indefinite Delivery Vehicles (IDVs) are vehicles that facilitate the delivery of supply and service orders.</p>
            <p className="analyst-guide__answerStyle">Types of IDVs include:</p>
            <ul>
                <li className="analyst-guide__answerStyle">Government-Wide Acquisition Contract (GWAC)</li>
                <li className="analyst-guide__answerStyle">Indefinite Delivery / Requirements Contract</li>
                <li className="analyst-guide__answerStyle">Indefinite Delivery / Indefinite Quantity (IDIQ) Contract</li>
                <li className="analyst-guide__answerStyle">Indefinite Delivery / Definite Quantity Contract</li>
                <li className="analyst-guide__answerStyle">Federal Supply Schedule (FSS)</li>
                <li className="analyst-guide__answerStyle">Basic Ordering Agreement (BOA)</li>
                <li className="analyst-guide__answerStyle">Blanket Purchase Agreements (BPA)</li>
            </ul>
            <p className="analyst-guide__answerStyle">IDVs can be browsed using award profile pages. IDVs may be searched using Advanced Search.</p>
            <p className="analyst-guide__answerStyle">An IDV may contain many contract prime award summaries and other IDVs. The parent_award_id_piid contains the PIID of the IDV contract prime award summary under which an IDV or contract prime award summary was issued.</p>
        </>)
    }];

    const dataAccessQuestions = [{
        question: "How can I download account spending data?",
        answer: (<>
            <p className="analyst-guide__answerStyle">The following files contain account spending data:</p>
            <ul>
                <li className="analyst-guide__answerStyle">FA_AccountBalances</li>
                <li className="analyst-guide__answerStyle">TAS_AccountBalances</li>
                <li className="analyst-guide__answerStyle">FA_AccountBreakdownByPA-OC</li>
                <li className="analyst-guide__answerStyle">TAS_AccountBreakdownByPA-OC</li>
                <li className="analyst-guide__answerStyle">FA_AccountBreakdownByAward</li>
                <li className="analyst-guide__answerStyle">TAS_AccountBreakdownByAward</li>
            </ul>
            <p className="analyst-guide__answerStyle">These files are available through the <Link to="/download_center/custom_account_data">Custom Account Data</Link> download feature.</p>
            <p className="analyst-guide__answerStyle">The AccountBalances files include account balance information. These files will be returned if the Custom Account Data file type filter includes “Account Balances.”</p>
            <p className="analyst-guide__answerStyle">The AccountBreakdownByPA-OC files include account data with program activity and object class information. These files will be returned if the Custom Account Data file type filter includes “Account Breakdown by Program Activity & Object Class.”</p>
            <p className="analyst-guide__answerStyle">The AccountBreakdownByAward files include account data with prime award level information. These files will be returned if the Custom Account Data file type filter includes “Account Breakdown by Award.”</p>
            <p className="analyst-guide__answerStyle">The data in account spending files which begin with “FA” are aggregated to the Federal Account level. The data in account spending files which begin with “TAS” are broken out to the Treasury Account Symbol level.</p>
            <p className="analyst-guide__answerStyle">More information about these fields is available in the <Link to="/data-dictionary">Data Dictionary</Link> and the <a href="https://files.usaspending.gov/docs/Custom+Account+Data+Dictionary.xlsx">Custom Account Data Dictionary</a>.</p>
            <p className="analyst-guide__answerStyle">More information on federal and Treasury accounts is available in the{' '}
                <button
                    role="link"
                    className="analyst-guide__sectionJump"
                    onClick={() => jumpToSection("analyst-guide__AccountData")}>
                  ACCOUNT DATA ELEMENTS
                </button>{' '}section of this guide.
            </p>
        </>)
    },
    {
        question: "How can I download prime award transaction data?",
        answer: (<>
            <p className="analyst-guide__answerStyle">The following files contain prime award transaction data:</p>
            <ul>
                <li className="analyst-guide__answerStyle">Assistance_PrimeTransactions</li>
                <li className="analyst-guide__answerStyle">Contracts_PrimeTransactions</li>
                <li className="analyst-guide__answerStyle">Assistance_Delta</li>
                <li className="analyst-guide__answerStyle">Contracts_Delta</li>
                <li className="analyst-guide__answerStyle">Assistance_Full</li>
                <li className="analyst-guide__answerStyle">Contracts_Full </li>
            </ul>
            <p className="analyst-guide__answerStyle">Each row in these files represents a prime award transaction within a prime award summary. </p>
            <p className="analyst-guide__answerStyle">The Assistance_PrimeTransactions and Contract_PrimeTransactions files are available through the <Link to="/search">Advanced Search</Link> and <Link to="/download_center/custom_award_data">Custom Award Data</Link> download features. For Advanced Search, both files are returned if the level of data is set to “Transaction.” For Custom Award Data, the Assistance_PrimeTransactions file is returned if the Award Type filter includes “Grants,” “Direct Payments,” “Loans,” “Insurance,” or “Other Financial Assistance.” The Contracts_PrimeTransactions file is returned if the Award Type filter includes “Contracts” or “Contract IDVs.” </p>
            <p className="analyst-guide__answerStyle">The Assistance_Delta, Assistance_Full, Contracts_Delta and Contracts_Full files are available through the <Link to="/download_center/award_data_archive">Award Data Archive</Link> download feature. The Assistance_Full and Assistance_Delta files are returned if the Award Type is set to “Financial Assistance.” The Contracts_Full and Contracts_Delta files are returned if the Award Type is set to “Contracts.”</p>
            <p className="analyst-guide__answerStyle">Which file you should download and how you should access the file depends on your use case.</p>
            <p className="analyst-guide__answerStyle">The Assistance_PrimeTransactions and Contracts_PrimeTransactions files are generated on demand based on selected specifications. Use these files if you only need prime award transaction data which meet certain criteria and can wait for the USAspending server to process your request. Access these files through Advanced Search to download a smaller amount of prime award transaction data which meets very specific criteria. Access these files through Custom Award Download to download a larger amount of prime award transaction data.</p>
            <p className="analyst-guide__answerStyle">The Assistance_Delta, Assistance_Full, Contracts_Delta, and Contracts_Full files include major agencies’ prime award transaction data for full fiscal years. These files are pre-prepared and can be accessed instantaneously. Use these files to maintain a copy of or to quickly access agency prime award transaction data.</p>
            <p className="analyst-guide__answerStyle">More information about the columns in these files is available in the <Link to="/data-dictionary">Data Dictionary</Link> and throughout this guide.</p>
        </>)
    },
    {
        question: "How can I download prime award summary data?",
        answer: (<>
            <p className="analyst-guide__answerStyle">Prime award summary data are contained in the Assistance_PrimeAwardSummaries and Contracts_PrimeAwardSummaries files. Each row in these files represents a financial assistance or contract prime award summary.</p>
            <p className="analyst-guide__answerStyle">The Assistance_PrimeAwardSummaries and Contracts_PrimeAwardSummaries files are available through <Link to="/search">Advanced Search</Link> and the <Link to="/disaster/covid-19">COVID-19 Spending profile page</Link> download features. For Advanced Search, these files are both returned if the level of data is set to “Award.”</p>
            <p className="analyst-guide__answerStyle">How you should access these files depends on your use case. </p>
            <p className="analyst-guide__answerStyle">When accessed through Advanced Search, the Assistance_PrimeAwardSummaries and Contracts_PrimeAwardSummaries files are generated on demand based on selected specifications. Access these files through advanced search to download prime award summary data which meet very specific criteria.</p>
            <p className="analyst-guide__answerStyle">When accessed through the COVID-19 Spending profile page, the Assistance_PrimeAwardSummaries and Contracts_PrimeAwardSummaries files are pre-prepared with all COVID-19 prime award summary data. These files can be accessed instantaneously through this page. Access these files through the COVID-19 Spending Profile page if you need a broad range of prime award summary data related to COVID-19.</p>
            <p className="analyst-guide__answerStyle">More information about the columns in these files is available in the <Link to="/data-dictionary">Data Dictionary</Link> and throughout this guide.</p>
        </>)
    },
    {
        question: "I’d like to use the API – where can I learn more about it?",
        answer: (<>
            <p className="analyst-guide__answerStyle">The <a href="https://api.usaspending.gov/">API page</a> on USAspending offers general API guidance, tutorials, request recipes, and more. A <a href="https://api.usaspending.gov/docs/endpoints">list of endpoints</a> is available online. The download files described above are available through the API.</p>
        </>)
    },
    {
        question: "How can I download a copy of the full database?",
        answer: (<>
            <p className="analyst-guide__answerStyle">The USAspending <a href="https://files.usaspending.gov/database_download/">SQL Database Downloads page</a> includes instructions and links to help download snapshots of the USAspending database as a PostgreSQL archive. This resource is intended for advanced users. The full database is over 1.5 terabytes and will continue to increase in size. The process to complete a full database restore can take many hours to complete.</p>
        </>)
    }];

    const agencyDataQuestions = [{
        question: "What is the difference between an awarding agency and a funding agency?",
        answer: (<>
            <p className="analyst-guide__answerStyle">The awarding agency for an award is the agency that creates and administers the award, while funding agencies pay for the award. In most cases, the awarding and funding agency are the same. The division of funding and awarding agencies benefits many smaller agencies, who may not have the staff available to administer an award.</p>
        </>)
    },
    {
        question: "What are sub-tier agencies?",
        answer: (<>
            <p className="analyst-guide__answerStyle">Sub-tier agencies are the divisions of top-tier federal agencies. For example, the IRS is a sub-tier agency of The U.S. Department of the Treasury, as the FBI is for The U.S. Department of Justice. </p>
        </>)
    },
    {
        question: "Where is the full list of agency names and codes?",
        answer: (<>
            <p className="analyst-guide__answerStyle">The <a href="https://files.usaspending.gov/reference_data/agency_codes.csv">agency_codes.csv</a> file includes data on agency and sub-tier agency names and codes used throughout USAspending. The <a href="https://sam.gov/content/hierarchy">Federal Hierarchy page on sam.gov</a> includes a comprehensive and up-to-date list of agencies and sub-tier agencies. Federal agencies are responsible for using this tool to manage their agency structure. You can browse award spending by sub-tier agency the Award Spending section of <Link to="/agency">Agency profile pages</Link>.</p>
        </>)
    },
    {
        question: "What is an agency subcomponent?",
        answer: (<>
            <p className="analyst-guide__answerStyle">Agency subcomponents, also known as bureaus, group together federal accounts within a top-tier agency. Bureaus allow users to see account spending data from related federal accounts. You can browse account spending by subcomponent in the Status of Funds section of <Link to="/agency">Agency profile pages</Link>.</p>
        </>)
    }, {
        question: "Which fields in USAspending download files contain awarding agency identifier information?",
        answer: (<>
            <p className="analyst-guide__answerStyle">The awarding_agency_code, awarding_agency_name, awarding_sub_agency_code (aka awarding_subagency_code), awarding_sub_agency_name (aka awarding_subagency_name), awarding_office_code, and awarding_office_name fields contain awarding agency identifier information. </p>
            <p className="analyst-guide__answerStyle">Each of these fields are available on financial assistance and contract prime award transaction and summary download files, as well as Treasury and federal account level account breakdown by award download files. Account download files use the awarding_subagency_code and awarding_subagency_name fields.</p>
            <p className="analyst-guide__answerStyle">More information about these fields is available in the <a href="https://files.usaspending.gov/docs/Custom+Account+Data+Dictionary.xlsx">Custom Account Data Dictionary</a> and the <Link to="/data-dictionary">Data Dictionary</Link>.</p>
            <p className="analyst-guide__answerStyle">More information on how to download data from USAspending is available in the{' '}
                <button
                    role="link"
                    className="analyst-guide__sectionJump"
                    onClick={() => jumpToSection("analyst-guide__DataAccess")}>
                    HOW TO ACCESS THE DATA
                </button>{' '}section of this guide.
            </p>
        </>)
    }, {
        question: "Which fields in USAspending download files contain funding agency identifier information?",
        answer: (<>
            <p className="analyst-guide__answerStyle">The funding_agency_code, funding_agency_name, funding_sub_agency_code, funding_sub_agency_name, funding_office_code, and funding_office_name fields contain funding agency identifier information. </p>
            <p className="analyst-guide__answerStyle">Each these fields are available on financial assistance and contract prime award transaction and summary download files, and federal and Treasury account level account breakdown by award download files.</p>
            <p className="analyst-guide__answerStyle">The Funding Agency filter on <Link to="/search">Advanced Search</Link> can be used to filter award spending by these data elements.</p>
            <p className="analyst-guide__answerStyle">More information about these fields is available in the <a href="https://files.usaspending.gov/docs/Custom+Account+Data+Dictionary.xlsx">Custom Account Data Dictionary</a> and the <Link to="/data-dictionary">Data Dictionary</Link>.</p>
            <p className="analyst-guide__answerStyle">More information on how to download data from USAspending is available in the{' '}
                <button
                    role="link"
                    className="analyst-guide__sectionJump"
                    onClick={() => jumpToSection("analyst-guide__DataAccess")}>
                    HOW TO ACCESS THE DATA
                </button>{' '}section of this guide.
            </p>
        </>)
    }, {
        question: "Which USAspending features are used to browse and download agency data?",
        answer: (<>
            <p className="analyst-guide__answerStyle">The <Link to="/agency">Agency profile pages</Link> page can be used to browse detailed information on agencies.</p>
            <p className="analyst-guide__answerStyle">The awarding agency filter on <Link to="/search">Advanced Search</Link> can be used to filter award spending by agency data elements.</p>
            <p className="analyst-guide__answerStyle">The agency filter on <Link to="/download_center/custom_account_data">Custom Account Download</Link> can be used to download account spending data by agency.</p>
            <p className="analyst-guide__answerStyle">The agency filter on <Link to="/download_center/award_data_archive">Award Data Archive</Link> can be used to download account spending data by agency.</p>
            <p className="analyst-guide__answerStyle">The agency and sub-agency filters on <Link to="/download_center/custom_award_data">Custom Award Data</Link> can be used to download account spending data by agency.</p>
        </>)
    }, {
        question: "How can I see all agencies which funded a prime award?",
        answer: (<>
            <p className="analyst-guide__answerStyle">To see all agencies which funded an award, review the Funding Agency column in the Federal Account Funding table on the award profile page. This information is also available in the funding agency columns of the FederalAccountFunding file of the award profile download.</p>
            <p className="analyst-guide__answerStyle">A single prime award transaction may be funded by multiple agencies. However, only the agency which funded the most amount of money will be listed as the funding agency on that prime award transaction. </p>
        </>)
    }];

    const accountDataQuestions = [{
        question: "What is a Treasury Account Symbol (TAS)?",
        answer: (<>
            <p className="analyst-guide__answerStyle">Account spending occurs through Treasury accounts. A Treasury Account Symbol (TAS) is a code used to represent and provide information about a Treasury account. The TAS provides critical information about account and linked award spending associated with a Treasury account.</p>
            <p className="analyst-guide__answerStyle">Each TAS is composed of the following elements:</p>
            <ul>
                <li className="analyst-guide__answerStyle">Agency Identifier (AID): 3 digits that identify the agency responsible for a Treasury account. The AID is assigned by Congress.</li>
                <li className="analyst-guide__answerStyle">Main Account Code (MAC): 4 digits that identify the Treasury account type and purpose. The MAC cannot be blank.</li>
                <li className="analyst-guide__answerStyle">Sub Account Code (SAC): 3 digits that identify a sub-division of the Treasury account. The SAC cannot be blank. A SAC value of &quot;000&quot; means that the Treasury account is the parent account.</li>
                <li className="analyst-guide__answerStyle">Allocation Transfer Agency ID (ATA): 3 digits that identify the agency that receives funds through an allocation (non-expenditure) transfer.</li>
                <li className="analyst-guide__answerStyle">Beginning Period of Availability (BPOA): 4 digits that identify the first year that an appropriation account may incur new obligations. The BPOA is used for annual and multi-year funds only.</li>
            </ul>
            <p className="analyst-guide__answerStyle">AND</p>
            <ul>
                <li className="analyst-guide__answerStyle">Ending Period of Availability (EPOA): 4 digits that identify the last year that an appropriation account may incur new obligations. The EPOA is for annual and multi-year funds only.</li>
            </ul>
            <p className="analyst-guide__answerStyle">OR (if no BPOA or EPOA)</p>
            <ul>
                <li className="analyst-guide__answerStyle">Availability Type Code (ATC): 1 character that identifies the availability (or time period) for obligations to be made on the Treasury account. An ATC value of “X” means that there is an unlimited or indefinite period to incur new obligations.</li>
            </ul>
            <p className="analyst-guide__answerStyle">The TAS filter on <Link to="/search">Advanced Search</Link> can be used to filter award spending by TAS.</p>
            <p className="analyst-guide__answerStyle">The Treasury Account Symbol chart in the Spending by Category section of <Link to="/federal_account">Federal Account Profile pages</Link> display all Treasury accounts associated with a federal account. </p>
        </>)
    },
    {
        question: "What are federal accounts?",
        answer: (<>
            <p className="analyst-guide__answerStyle">Federal accounts are groupings of related Treasury accounts. Federal accounts are created by combining all Treasury accounts that share an AID and MAC. Together, these codes create a Federal Account Symbol that can be used to represent a federal account. Federal accounts are used to track how agencies receive and spend congressional funding. There are more than 2,000 federal accounts across the federal government. Federal accounts are found in the budget that the President submits to Congress for approval.</p>
            <p className="analyst-guide__answerStyle">Each AID should have at least one federal account associated with it, so the agency can conduct its function and carry out its mission. Despite the name, there are instances where an AID is shared among more than one agency. In these cases, each agency within the shared AID will have at least one federal account of its own.</p>
        </>)
    },
    {
        question: "Which fields in USAspending download files contain TAS and federal account information?",
        answer: (<>
            <p className="analyst-guide__answerStyle">The agency_identifier_code, main_account_code, sub_account_code, allocation_transfer_agency_identifier_code, beginning_period_of_availability, ending_period_of_availability, and availability_type_code fields contain constituent TAS component information. The Treasury_account_symbol and federal_account_symbol fields contain full account symbols. The Treasury_account_name and federal_account_name fields contain descriptive account names. </p>
            <p className="analyst-guide__answerStyle">All of these fields are available on all Treasury account level account download files.</p>
            <p className="analyst-guide__answerStyle">The federal_account_name and federal_account_symbol fields are available on all account download files. </p>
            <p className="analyst-guide__answerStyle">The federal_accounts_funding_this_award and Treasury_accounts_funding_this_award fields contain information on accounts funding award spending. These fields are available on all award download files.</p>
            <p className="analyst-guide__answerStyle">The TAS filter on <Link to="/search">Advanced Search</Link> can be used to filter award spending by these data elements. </p>
            <p className="analyst-guide__answerStyle">More information about these fields is available in the <a href="https://files.usaspending.gov/docs/Custom+Account+Data+Dictionary.xlsx">Custom Account Data Dictionary</a> and the <Link to="/data-dictionary">Data Dictionary</Link>.</p>
            <p className="analyst-guide__answerStyle">More information on how to download data from USAspending is available in the{' '}
                <button
                    role="link"
                    className="analyst-guide__sectionJump"
                    onClick={() => jumpToSection("analyst-guide__DataAccess")}>
                    HOW TO ACCESS THE DATA
                </button>{' '}section of this guide.
            </p>
        </>)
    },
    {
        question: "Which USAspending features are used to browse and download TAS and federal account data?",
        answer: (<>
            <p className="analyst-guide__answerStyle">The <Link to="/federal_account">Federal Account Profile pages</Link> can be used to browse detailed information on federal accounts.</p>
            <p className="analyst-guide__answerStyle">The TAS filter on <Link to="/search">Advanced Search</Link> can be used to filter award spending by these data elements. </p>
            <p className="analyst-guide__answerStyle">The federal account filter on <Link to="/download_center/custom_account_data">Custom Account Download</Link> can be used to download account spending data by federal account.</p>
        </>)
    },
    {
        question: "What is the difference between a Treasury account and a federal account?",
        answer: (<>
            <p className="analyst-guide__answerStyle">Federal accounts are comprised of a TAS or multiple TASs. You can understand their relationship using the analogy of a bank account. Say you have a bank account, and in that account, you have checking, growth, and savings accounts. In this scenario, your bank account is the federal account, and the checking, growth, and savings accounts are your TASs. Checking, growth, and savings accounts have different purposes and are at the level where transactions take place. These “TASs” would be grouped under your account based on your Social Security Number, in the same way that a federal account is based on a Federal Account Symbol. Just like checking, growth, and savings accounts, the Student Financial Assistance federal account has several related TASs that have different obligation amounts.</p>
        </>)
    },
    {
        question: "What does it mean when one agency’s TAS is part of a second agency’s submissions?",
        answer: (<>
            <p className="analyst-guide__answerStyle">Sometimes the funding associated with a TAS is executed by a different agency than the one indicated by the Agency Identifier. When this occurs, quite often the executing agency will submit the financial and award information associated with the TAS. Since the funding was assigned by Congress to the agency indicated by the Agency Identifier, we group by Agency Identifier so that users can see both the budgetary resources assigned to the agency as well as the spending that flows from the related accounts.</p>
        </>)
    },
    {
        question: "How can I see account spending for prior years?",
        answer: (<>
            <p className="analyst-guide__answerStyle">The fiscal year and quarter filter on the <Link to="/download_center/custom_account_data">Custom Account Data</Link> download feature can be used to download account spending from 2017 to present. For data before 2017, you can see similar information in the <a href="https://www.whitehouse.gov/omb/budget/appendix/">Office of Management and Budget (OMB) budget appendices</a>.</p>
        </>)
    }];

    const industryProductQuestions = [{
        question: "What are Product and Service Codes (PSC)?",
        answer: (<>
            <p className="analyst-guide__answerStyle">The Product and Service Code (PSC) system describes the type of product or service purchased by contract spending.  You can find a list of Product Service Codes at <a href="https://www.acquisition.gov/psc-manual">acquisition.gov</a>. Only contract spending includes PSC codes. PSC data on USAspending make it possible to study how much money the government spends on different types of products.</p>
        </>)
    },
    {
        question: "What is the North American Industrial Classification System (NAICS)?",
        answer: (<>
            <p className="analyst-guide__answerStyle">The North American Industry Classification System (NAICS) is the standard used by Federal statistical agencies to classify business establishments to collect, analyze, and publish statistical data related to the U.S. business economy. You can learn more about NAICS codes at <a href="https://www.census.gov/naics/">https://www.census.gov/naics/</a>. Only contract spending includes NAICS codes. NAICS data on USAspending make it possible to study how much money the government spends by industry.</p>
        </>)
    },
    {
        question: "Which fields in USAspending download files contain PSC and NAICS information?",
        answer: (<>
            <p className="analyst-guide__answerStyle">The product_or_service_code, product_or_service_code_description, naics_code, and naics_description fields contain PSC and NAICS information.</p>
            <p className="analyst-guide__answerStyle">These fields are all available on contract prime award transaction and summary downloads, and account breakdown by award account downloads.</p>
            <p className="analyst-guide__answerStyle">The PSC and NAICS filters on <Link to="/search">Advanced Search</Link> can be used to filter award spending by these data elements. </p>
            <p className="analyst-guide__answerStyle">More information about these fields is available in the <a href="https://files.usaspending.gov/docs/Custom+Account+Data+Dictionary.xlsx">Custom Account Data Dictionary</a> and the <Link to="/data-dictionary">Data Dictionary</Link>.</p>
            <p className="analyst-guide__answerStyle">More information on how to download data from USAspending is available in the{' '}
                <button
                    role="link"
                    className="analyst-guide__sectionJump"
                    onClick={() => jumpToSection("analyst-guide__DataAccess")}>
                    HOW TO ACCESS THE DATA
                </button>{' '}section of this guide.
            </p>
        </>)
    }];

    const disasterEmergencyQuestions = [{
        question: "What are Disaster Emergency Fund Codes (DEFCs)?",
        answer: (<>
            <p className="analyst-guide__answerStyle">DEFCs are used to track spending for disasters and emergencies such as COVID-19, or other events. Each code links spending to one or more public laws authorizing the funding. Both financial assistance and contracts spending include Disaster Emergency Fund Codes (DEFC) information. </p>
            <p className="analyst-guide__answerStyle">The Office of Management and Budget (OMB) assigns new DEFC domain values for each enacted appropriation with disaster or emergency funding. A DEFC domain value code will be assigned based on public law number and disaster or emergency designations. </p>
        </>)
    },
    {
        question: "How can I view and download spending by DEFC?",
        answer: (<>
            <p className="analyst-guide__answerStyle">There are a few ways to access DEFC spending on USAspending. The DEFC filter on <Link to="/search">Advanced Search</Link> can be used to filter award spending by this data element. All COVID-19 spending is included in on our <Link to="/disaster/covid-19">COVID-19 Spending profile page</Link>. Finally, account spending can be downloaded by DEFC using <Link to="/download_center/custom_account_data">Custom Account Download</Link>.</p>
        </>)
    },
    {
        question: "Which fields in USAspending download files contain DEFC information?",
        answer: (<>
            <p className="analyst-guide__answerStyle">The disaster_emergency_fund_code and disaster_emergency_fund_codes_for_overall_award fields contain DEFC information. The disaster_emergency_fund_codes field is available on all account download files, and financial assistance and contract prime award summary download files.</p>
            <p className="analyst-guide__answerStyle">The <Link to="/download_center/custom_account_data">Custom Account Data</Link> download DEFC filter can be used to filter award download files by DEFC.</p>
            <p className="analyst-guide__answerStyle">The <Link to="/disaster/covid-19">COVID-19 Spending profile page</Link> download can be used to download all COVID-19 spending.</p>
            <p className="analyst-guide__answerStyle">The DEFC filter on <Link to="/search">Advanced Search</Link> can be used to filter award spending by this data element. </p>
            <p className="analyst-guide__answerStyle">More information about these fields is available in the <a href="https://files.usaspending.gov/docs/Custom+Account+Data+Dictionary.xlsx">Custom Account Data Dictionary</a> and the <Link to="/data-dictionary">Data Dictionary</Link>.</p>
            <p className="analyst-guide__answerStyle">More information on how to download data from USAspending is available in the{' '}
                <button
                    role="link"
                    className="analyst-guide__sectionJump"
                    onClick={() => jumpToSection("analyst-guide__DataAccess")}>
                    HOW TO ACCESS THE DATA
                </button>{' '}section of this guide.
            </p>
        </>)
    }];

    const assistanceListingQuestions = [{
        question: "What are Assistance Listings?",
        answer: (<>
            <p className="analyst-guide__answerStyle">Assistance listings are detailed public descriptions of federal programs that provide grants, loans, scholarships, insurance, and other types of assistance awards. Assistance Listings were formally referred to as the Catalog of Federal Domestic Assistance (CFDA). Only financial assistance spending includes Assistance Listings information; contract spending does not. More information about Assistance Listings is available on <a href="https://sam.gov/content/assistance-listings">sam.gov</a>.</p>
        </>)
    },
    {
        question: "Which fields in USAspending download files contain Assistance Listings information?",
        answer: (<>
            <p className="analyst-guide__answerStyle">The cfda_number and cfda_title fields contain Assistance Listings information. These fields are both available on financial assistance prime award transaction and summary download files, and Treasury and federal account level account breakdown by award download files. </p>
            <p className="analyst-guide__answerStyle">The <Link to="/search">Advanced Search</Link> CFDA Program filter can be used to filter award spending by assistance listing.</p>
            <p className="analyst-guide__answerStyle">More information about these fields is available in the <a href="https://files.usaspending.gov/docs/Custom+Account+Data+Dictionary.xlsx">Custom Account Data Dictionary</a> and the <Link to="/data-dictionary">Data Dictionary</Link>.</p>
            <p className="analyst-guide__answerStyle">More information on how to download data from USAspending is available in the{' '}
                <button
                    role="link"
                    className="analyst-guide__sectionJump"
                    onClick={() => jumpToSection("analyst-guide__DataAccess")}>
                    HOW TO ACCESS THE DATA
                </button>{' '}section of this guide.
            </p>
        </>)
    }];

    const recipientDataQuestions = [{
        question: "What is a recipient?",
        answer: (<>
            <p className="analyst-guide__answerStyle">A recipient is a company, organization, individual, or government entity (i.e., state, local, tribal, federal, or foreign), that receives funding from the U.S. government. The <Link to="/recipient">Recipient Profile page</Link> includes detailed information on government spending to individual recipients. Both financial assistance and contracts spending include recipient information such as recipient name, recipient location, and recipient type.</p>
            <p className="analyst-guide__answerStyle">More information on recipient location information is available in the {' '}
                <button
                    role="link"
                    className="analyst-guide__sectionJump"
                    onClick={() => jumpToSection("analyst-guide__LocationData")}>
                    LOCATION DATA ELEMENTS
                </button>{' '}section of this guide.
            </p>
        </>)
    },
    {
        question: "How are recipients identified?",
        answer: (<>
            <p className="analyst-guide__answerStyle">With limited exceptions, virtually all award recipients have two unique identifies - a Unique Entity Identifier (UEI) and a DUNS number. Larger entities with multiple locations or departments may contain many entities with different UEI or DUNS numbers. These recipients may be grouped together using parent recipient data elements. Recipients of aggregate awards such as Social Security Retirement Insurance recipients do not have a UEI or DUNS to protect personal identifiable information.  </p>
            <p className="analyst-guide__answerStyle">By April of 2022, the federal government will have stopped using the DUNS number to uniquely identify entities. At that point, entities doing business with the federal government will use UEI. More information about the DUNS to UEI transition is available <a href="https://www.gsa.gov/about-us/organization/federal-acquisition-service/office-of-systems-management/integrated-award-environment-iae/iae-systems-information-kit/unique-entity-identifier-update">online</a>.</p>
        </>)
    },
    {
        question: "Which fields in USAspending download files contain recipient identifier information?",
        answer: (<>
            <p className="analyst-guide__answerStyle">The recipient_name, recipient_parent_name, recipient_uei, recipient_parent_uei, recipient_duns, and recipient_parent_duns fields contain recipient identifier information. These fields are all available on financial assistance and contract prime award transaction and summary download files, and Treasury and federal account level account breakdown by award download files.</p>
            <p className="analyst-guide__answerStyle">The recipient_parent data elements reference the ultimate parent of an awardee or recipient and can be used to group together related recipients.</p>
            <p className="analyst-guide__answerStyle">The <Link to="/search">Advanced Search</Link> Recipient filter can be used to filter award spending by these data elements.</p>
            <p className="analyst-guide__answerStyle">More information about these fields is available in the <a href="https://files.usaspending.gov/docs/Custom+Account+Data+Dictionary.xlsx">Custom Account Data Dictionary</a> and the <Link to="/data-dictionary">Data Dictionary</Link>.</p>
            <p className="analyst-guide__answerStyle">More information on how to download data from USAspending is available in the{' '}
                <button
                    role="link"
                    className="analyst-guide__sectionJump"
                    onClick={() => jumpToSection("analyst-guide__DataAccess")}>
                    HOW TO ACCESS THE DATA
                </button>{' '}section of this guide.
            </p>
        </>)
    },
    {
        question: "What are recipient types?",
        answer: (<>
            <p className="analyst-guide__answerStyle">Recipient types (aka business types) are socio-economic and other organizational/business characteristics that are used to categorize financial assistance and contract recipients.</p>
        </>)
    },
    {
        question: "Which recipient type categories are available for contract vs financial assistance recipients?",
        answer: (<>
            <p className="analyst-guide__answerStyle">Both financial assistance and contract spending include recipient type information. However, most recipient type categories only apply to contract award recipients. An Advanced Search which combines mutually exclusive Recipient Type and Award Type filter options, such as <Link to="/search/?hash=4f711e2f7e08dba46fb40cb34502dab8">this search</Link>, will return zero results. </p>
            <p className="analyst-guide__answerStyle">The only recipient type categories available in <Link to="/search">Advanced Search</Link> which apply to financial assistance recipients are: </p>
            <ul>
                <li className="analyst-guide__answerStyle">Small Business</li>
                <li className="analyst-guide__answerStyle">Other Than Small Business</li>
                <li className="analyst-guide__answerStyle">Nonprofit</li>
                <li className="analyst-guide__answerStyle">Public Institution of Higher Education</li>
                <li className="analyst-guide__answerStyle">Private Institution of Higher Education</li>
                <li className="analyst-guide__answerStyle">Minority-Serving Institution of Higher Education</li>
                <li className="analyst-guide__answerStyle">Regional and State Government</li>
                <li className="analyst-guide__answerStyle">Regional Organization</li>
                <li className="analyst-guide__answerStyle">U.S. Territory or Possession</li>
                <li className="analyst-guide__answerStyle">Local Government</li>
                <li className="analyst-guide__answerStyle">Indian Native American Tribal Government</li>
                <li className="analyst-guide__answerStyle">Authorities and Commissions</li>
                <li className="analyst-guide__answerStyle">Individuals</li>
            </ul>
            <p className="analyst-guide__answerStyle">Each of these recipient type categories also apply to contract recipients, except for Regional Organization, U.S. Territory, or Possession and Individuals.</p>
        </>)
    }];

    const locationDataQuestions = [{
        question: "What are the different location types?",
        answer: (<>
            <p className="analyst-guide__answerStyle">The two different location types are primary place of performance and recipient location. Primary place of performance is the principal place of business, where the majority of the work of an award is performed. For example, in a manufacturing contract, this would be the main plant where items are produced. Recipient location is Legal business address of an award recipient. Both financial assistance and contract spending include location information. Both location types may be measured at several geographic levels including country, state, county, city, congressional district, or zip code. Not all geographic levels are available for all award spending. </p>
        </>)
    },
    {
        question: "Which fields in USAspending download files contain recipient location information?",
        answer: (<>
            <p className="analyst-guide__answerStyle">Some of the most important recipient fields are recipient_city_name, recipient_county_name, recipient_state_name, and recipient_zip_code. These fields are all available in financial assistance and contract prime award transaction and summary download files. The recipient_zip_code field is also available on federal and Treasury account level account breakdown by award account download files.</p>
            <p className="analyst-guide__answerStyle">The Recipient Location filters on <Link to="/search">Advanced Search</Link> can be used to filter award spending by these data elements.</p>
            <p className="analyst-guide__answerStyle">More information about these fields is available in the <a href="https://files.usaspending.gov/docs/Custom+Account+Data+Dictionary.xlsx">Custom Account Data Dictionary</a> and the <Link to="/data-dictionary">Data Dictionary</Link>.</p>
            <p className="analyst-guide__answerStyle">More information on how to download data from USAspending is available in the{' '}
                <button
                    role="link"
                    className="analyst-guide__sectionJump"
                    onClick={() => jumpToSection("analyst-guide__DataAccess")}>
                    HOW TO ACCESS THE DATA
                </button>{' '}section of this guide.
            </p>
        </>)
    },
    {
        question: "Which fields in USAspending download files contain primary place of performance location information?",
        answer: (<>
            <p className="analyst-guide__answerStyle">Some of the most important primary place of performance fields are: </p>
            <ul>
                <li className="analyst-guide__answerStyle">primary_place_of_performance_city_name</li>
                <li className="analyst-guide__answerStyle">primary_place_of_performance_county_name</li>
                <li className="analyst-guide__answerStyle">primary_place_of_performance_state_name </li>
                <li className="analyst-guide__answerStyle">primary_place_of_performance_zip_4 </li>
                <li className="analyst-guide__answerStyle">primary_place_of_performance_zip_code</li>
            </ul>
            <p className="analyst-guide__answerStyle">The first four fields are all available in financial assistance and contract prime award transaction and summary download files. The primary_place_of_performance_zip_code field is available on federal and Treasury account level account breakdown by award account download files.</p>
            <p className="analyst-guide__answerStyle">The Place of Performance filters on <Link to="/search">Advanced Search</Link> can be used to filter award spending by these data elements.</p>
            <p className="analyst-guide__answerStyle">More information about these fields is available in the <a href="https://files.usaspending.gov/docs/Custom+Account+Data+Dictionary.xlsx">Custom Account Data Dictionary</a> and the <Link to="/data-dictionary">Data Dictionary</Link>.</p>
            <p className="analyst-guide__answerStyle">More information on how to download data from USAspending is available in the{' '}
                <button
                    role="link"
                    className="analyst-guide__sectionJump"
                    onClick={() => jumpToSection("analyst-guide__DataAccess")}>
                    HOW TO ACCESS THE DATA
                </button>{' '}section of this guide.
            </p>
        </>)
    }];

    const additionalResources = [{
        question: "How do I find the meanings of particular terms and field names?",
        answer: (<>
            <p className="analyst-guide__answerStyle">The <span>Glossary</span>{' '}<GlossaryLink term="/" />{' '} lists plain-language definitions of terms used throughout USAspending.</p>
            <p className="analyst-guide__answerStyle">The <Link to="/data-dictionary">Data Dictionary</Link> defines data elements included in the various download files available on USAspending.</p>
            <p className="analyst-guide__answerStyle">The <a href="https://www.fpds.gov/downloads/Version_1.5_specs/FPDS_DataDictionary_V1.5.pdf">FPDS Data Dictionary</a> includes descriptions of terminology related to contract data.</p>
        </>)
    },
    {
        question: "What other resources are available to help understand the data in USAspending?",
        answer: (<>
            <p className="analyst-guide__answerStyle">The github{' '}
                <button
                    value="https://github.com/fedspendingtransparency/usaspending-api/wiki"
                    role="link"
                    className="analyst-guide__external-link"
                    onClick={onExternalLinkClick}>
                    wiki{' '}
                    <span
                        data-href="https://github.com/fedspendingtransparency/usaspending-api/wiki"
                        className="usa-button-link__icon">
                        <FontAwesomeIcon data-href="https://github.com/fedspendingtransparency/usaspending-api/wiki" icon="external-link-alt" />
                    </span>
                </button>
                {' '}provides information for developers on how the USAspending application works.
            </p>
            <p className="analyst-guide__answerStyle">The USAspending&apos;s{' '}
                <button
                    value="https://fiscalservice.force.com/usaspending/s/"
                    role="link"
                    className="analyst-guide__external-link"
                    onClick={onExternalLinkClick}>
        FAQ page{' '}
                    <span
                        data-href="https://fiscalservice.force.com/usaspending/s/"
                        className="usa-button-link__icon">
                        <FontAwesomeIcon data-href="https://fiscalservice.force.com/usaspending/s/" icon="external-link-alt" />
                    </span>
        .
                </button>
                {' '}provides additional advice for getting the most out of the site.
            </p>
            <p className="analyst-guide__answerStyle">The <a href="https://fiscal.treasury.gov/data-transparency/DAIMS-current.html">DATA Act Information Model Schema (DAIMS) page</a> provides more information on various systems related to the data in USAspending.</p>
        </>)
    }];
    return (
        <>
            <div>
                <h4 className="analyst-guide__questionSections" id="analyst-guide__AwardAccountSpending">Award And Account Spending Comparison</h4>
            </div>
            <div className="analyst-guide__questionLine" />
            <div className="analyst-guide__answerSection">
                {awardAccountSpendingComparisonQuestions.map((item, i) => (
                    <div className="analyst-guide__questionAnswers">
                        <Accordion
                            key={`item_${i}`}
                            title={item.question}>{item.answer}
                        </Accordion>
                    </div>
                ))}
            </div>

            <div>
                <h4 className="analyst-guide__questionSections" id="analyst-guide__Award">Award Spending</h4>
            </div>
            <div className="analyst-guide__questionLine" />

            <div className="analyst-guide__answerSection">
                {awardSpendingQuestions.map((item, i) => (
                    <div className="analyst-guide__questionAnswers">
                        <Accordion
                            key={`item_${i}`}
                            title={item.question}>{item.answer}
                        </Accordion>
                    </div>
                ))}
            </div>

            <div>
                <h4 className="analyst-guide__questionSections" id="analyst-guide__FinancialAssistance">Financial Assistance Transactions And Award Summaries</h4>
            </div>
            <div className="analyst-guide__questionLine" />

            <div className="analyst-guide__answerSection">
                {financialAssistanceQuestions.map((item, i) => (
                    <div className="analyst-guide__questionAnswers">
                        <Accordion
                            key={`item_${i}`}
                            title={item.question}>{item.answer}
                        </Accordion>
                    </div>
                ))}
            </div>

            <div>
                <h4 className="analyst-guide__questionSections" id="analyst-guide__ContractTransactions">Contract Transactions And Award Summaries</h4>
            </div>
            <div className="analyst-guide__questionLine" />

            <div className="analyst-guide__answerSection">
                {contractTransactionQuestions.map((item, i) => (
                    <div className="analyst-guide__questionAnswers">
                        <Accordion
                            key={`item_${i}`}
                            title={item.question}>{item.answer}
                        </Accordion>
                    </div>
                ))}
            </div>

            <div>
                <h4 className="analyst-guide__questionSections" id="analyst-guide__DataAccess">How To Access The Data</h4>
            </div>
            <div className="analyst-guide__questionLine" />

            <div className="analyst-guide__answerSection">
                {dataAccessQuestions.map((item, i) => (
                    <div className="analyst-guide__questionAnswers">
                        <Accordion
                            key={`item_${i}`}
                            title={item.question}>{item.answer}
                        </Accordion>
                    </div>
                ))}
            </div>

            <div>
                <h4 className="analyst-guide__questionSections" id="analyst-guide__AgencyData">Agency Data Elements</h4>
            </div>
            <div className="analyst-guide__questionLine" />

            <div className="analyst-guide__answerSection">
                {agencyDataQuestions.map((item, i) => (
                    <div className="analyst-guide__questionAnswers">
                        <Accordion
                            key={`item_${i}`}
                            title={item.question}>{item.answer}
                        </Accordion>
                    </div>
                ))}
            </div>

            <div>
                <h4 className="analyst-guide__questionSections" id="analyst-guide__AccountData">Account Data Elements</h4>
            </div>
            <div className="analyst-guide__questionLine" />

            <div className="analyst-guide__answerSection">
                {accountDataQuestions.map((item, i) => (
                    <div className="analyst-guide__questionAnswers">
                        <Accordion
                            key={`item_${i}`}
                            title={item.question}>{item.answer}
                        </Accordion>
                    </div>
                ))}
            </div>

            <div>
                <h4 className="analyst-guide__questionSections" id="analyst-guide__Industry">Industry And Product Data Elements</h4>
            </div>
            <div className="analyst-guide__questionLine" />

            <div className="analyst-guide__answerSection">
                {industryProductQuestions.map((item, i) => (
                    <div className="analyst-guide__questionAnswers">
                        <Accordion
                            key={`item_${i}`}
                            title={item.question}>{item.answer}
                        </Accordion>
                    </div>
                ))}
            </div>

            <div>
                <h4 className="analyst-guide__questionSections" id="analyst-guide__Disaster">Disaster And Emergency Data Elements</h4>
            </div>
            <div className="analyst-guide__questionLine" />

            <div className="analyst-guide__answerSection">
                {disasterEmergencyQuestions.map((item, i) => (
                    <div className="analyst-guide__questionAnswers">
                        <Accordion
                            key={`item_${i}`}
                            title={item.question}>{item.answer}
                        </Accordion>
                    </div>
                ))}
            </div>

            <div>
                <h4 className="analyst-guide__questionSections" id="analyst-guide__AssistanceListings">Assistance Listings Data Elements</h4>
            </div>
            <div className="analyst-guide__questionLine" />

            <div className="analyst-guide__answerSection">
                {assistanceListingQuestions.map((item, i) => (
                    <div className="analyst-guide__questionAnswers">
                        <Accordion
                            key={`item_${i}`}
                            title={item.question}>{item.answer}
                        </Accordion>
                    </div>
                ))}
            </div>

            <div>
                <h4 className="analyst-guide__questionSections" id="analyst-guide__Recipient">Recipient Data Elements</h4>
            </div>
            <div className="analyst-guide__questionLine" />

            <div className="analyst-guide__answerSection">
                {recipientDataQuestions.map((item, i) => (
                    <div className="analyst-guide__questionAnswers">
                        <Accordion
                            key={`item_${i}`}
                            title={item.question}>{item.answer}
                        </Accordion>
                    </div>
                ))}
            </div>

            <div>
                <h4 className="analyst-guide__questionSections" id="analyst-guide__LocationData">Location Data Elements</h4>
            </div>
            <div className="analyst-guide__questionLine" />

            <div className="analyst-guide__answerSection">
                {locationDataQuestions.map((item, i) => (
                    <div className="analyst-guide__questionAnswers">
                        <Accordion
                            key={`item_${i}`}
                            title={item.question}>{item.answer}
                        </Accordion>
                    </div>
                ))}
            </div>

            <div>
                <h4 className="analyst-guide__questionSections" id="analyst-guide__AdditionalResources">Additional Resources</h4>
            </div>
            <div className="analyst-guide__questionLine" />

            <div className="analyst-guide__answerSection">
                {additionalResources.map((item, i) => (
                    <div className="analyst-guide__questionAnswers">
                        <Accordion
                            key={`item_${i}`}
                            title={item.question}>{item.answer}
                        </Accordion>
                    </div>
                ))}
            </div>
        </>
    );
};

export default AnalystGuideQuestions;

