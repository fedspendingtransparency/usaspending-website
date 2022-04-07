/* eslint-disable react/no-array-index-key */
/* eslint-disable max-len */
import React from 'react';
import Accordion from "../sharedComponents/accordion/Accordion";

const awardAccountSpendingComparisonQuestions = [{
    question: "What is the difference between award and account spending?",
    answer: (<><p>Account spending includes all government spending. Award spending is a subset of account spending that includes only money the federal government has paid or promised to pay a non-federal recipient through financial assistance or a contract.</p>
        <p>For example, account spending includes money used to pay federal government employees’ salaries. This spending is not included in award spending.</p></>)
},
{
    question: "How is the value of award and account spending measured?",
    answer: (<>
        <p>The value of award and account spending (except for loans) is measured by obligations and outlays. The value of loans is measured using loan subsidy cost.</p>
        <p>An obligation is a promise made by the government to spend funds. An agency incurs an obligation when it takes an action that requires it to make a payment such as placing an order, signing a contract, awarding a grant, or purchasing a service. Negative obligations, or de-obligations, occur when agencies decrease previous obligations to correct errors or to reflect new information. A de-obligation may be issued when the price of a project was lower than expected.</p>
        <p>An outlay occurs when money is actually paid out. </p>
        <p>Loan subsidy cost is an estimation made by the government of what a loan will cost over time. </p>
        <p>More information about the data elements used to measure the value of award and account spending is available throughout this guide.</p>
    </>)
},
{
    question: "How is award spending linked to account spending?",
    answer: (<>
        <p>Agencies periodically upload account spending in various formats. One format (account breakdown by award) represents award activity and includes details on federal accounts funding that activity. Agencies also upload transaction level award spending for both contracts and financial assistance. </p>
        <p>These files can be linked together to associate award spending with account spending. If a shared ID cannot be found between these files, award spending may be unlinked to any account.</p>
        <p>The MAKE THIS A LINK Agency Submission Statistics page contains data on this linkage under the “Number of Unlinked Contract Awards” and “Number of Unlinked Assistance Awards” columns.</p>
        <p>More information about federal accounts is discussed in the ACCOUNT DATA ELEMENTS section of this guide.</p>

    </>)
}];

const awardSpendingQuestions = [{
    question: "What is a prime award? What is a sub-award? What is prime award transaction? What is a prime award summary?",
    answer: (<>
        <p>A prime award is an agreement that the federal government makes with a non-federal entity for the purpose of carrying out a federal program. Prime awards are distinct from sub-awards. A sub-award is an agreement that a prime award recipient makes with another entity to perform a portion of the work for of a prime award.</p>
        <p>A prime award transaction can be either the initial (also called ‘base’) contract, grant, loan, etc. of a prime award, or any amendment or modification to a prime award.</p>
        <p>A prime award summary is a roll-up of all related prime award transactions which share a set of identifiers that make up the unique award key. Prime award transactions are aggregated together as prime award summaries using different sets of fields for contracts versus financial assistance award spending.</p>
    </>)
},
{
    question: "What are the two major categories of award spending?",
    answer: (<>
        <p>The two main categories of award spending are financial assistance spending and contract spending.</p>
        <p>The federal government uses financial assistance spending to transfer money (or in-kind resources) to a non-federal entity to serve a public purpose as defined by Congress. The federal government uses contract spending to purchase the goods and services required to fulfill agencies’ public duties. </p>
        <p>For example, the Federal Highway Administration uses financial assistance spending to provide funds to states for public roads while the Air Force uses contract spending to acquire fighter jets to execute its mission.</p>
        <p>Some data elements across financial assistance and contract spending are different between the two categories. More information about these differences is available throughout this guide.</p>
    </>)
},
{
    question: "Which fields in USAspending download files contain prime award summary identifier information?",
    answer: (<>
        <p>The award_unique_key, assistance_award_unique_key, and contract_award_unique_key columns contain prime award summary identifier information. </p>
        <p>The award_unique_key field contains both financial assistance and contract prime award summary identifier information. This field is available in Treasury and federal account level account breakdown by award account download files. The assistance_award_unique_key field contains financial assistance prime award summary identifier information. This field is available in financial assistance prime award transaction and summary download files. The contract_award_unique_key field contains contract prime award summary identifier information. This field is available in contract prime award transaction and summary download files. </p>
        <p>These fields may be used to aggregate, filter, or join account breakdown by award, prime award summary, and prime award transaction download files by prime award summary.</p>
        <p>More information about these identifiers is available online.</p>
        <p>The Award ID filter on Advanced Search can be used to filter award spending by the PIID, FAIN and URI data elements. These data elements are important components of prime award summary identifier information.</p>
        <p>More information about these fields is available in the Data Dictionary and the Custom Account Data Dictionary.</p>
        <p>More information on how to download data from USAspending is available in the HOW TO ACCESS THE DATA section of this guide.</p>
    </>)
},
{
    question: "What are the different award type categories?",
    answer: (<>
        <p>Both financial assistance and contract spending may be further categorized into more granular award types, such as a purchase order or a direct loan. There are over 20 award type categories available in USAspending.</p>
    </>)
},
{
    question: "Which fields in USAspending download files contain award type information?",
    answer: (<>
        <p>The assistance_type_code, assistance_type_description, award_type_code, award_type, parent_award_type_code, and parent_award_type fields contain award type information. These fields are used to categorize prime awards and parent prime awards by the various detailed types of financial assistance and contract spending.</p>
        <p>The assistance_type_code and assistance_type_description fields are available on financial assistance prime award transaction and summary files. The award_type_code and award_type fields are available on contract prime award transaction and summary files, and Treasury and federal account level account breakdown by award files. The parent_award_type and parent_award_type_code fields are available on contract prime award transaction and summary files.</p>
        <p>The Award Type filter on Advanced Search can be used to filter award spending by these data elements.</p>
        <p>More information about these fields is available in the Data Dictionary and the Custom Account Data Dictionary.</p>
        <p>More information on how to download data from USAspending is available in the HOW TO ACCESS THE DATA section of this guide.</p>
        <p>More information about parent awards is available in the CONTRACTS AWARDS AND TRANSACTIONS section of this guide.</p>
    </>)
},
{
    question: "Which fields in USAspending download files contain award spending amount information?",
    answer: (<>
        <p>The federal_action_obligation, total_obligated_amount, original_loan_subsidy_cost, and total_loan_subsidy_cost fields contain financial assistance and contract award spending amount information. </p>
        <p>The federal_action_obligation field is available on financial assistance and contract prime award transaction download files. The total_obligated_amount field is available on financial assistance and contract prime award transaction and summary download files. The original_loan_subsidy_cost field is available on financial assistance prime award transaction download files. The total_loan_subsidy_cost field is available on financial assistance prime award transaction and summary download files.</p>
        <p>The Award Amount filter on Advanced Search can be used to filter award spending by these data elements.</p>
        <p>More information about these fields is available in the Data Dictionary and the Custom Account Data Dictionary.</p>
        <p>More information on how to download data from USAspending is available in the HOW TO ACCESS THE DATA section of this guide.</p>
    </>)
},
{
    question: "How are data on financial assistance and contract spending different?",
    answer: (<>
        <p>Only financial assistance spending includes Assistance Listings information (formerly CFDA Program). Only contract spending includes North American Industry Classification System (NAICS) and Product and Service Codes (PSC) information. Both financial assistance and contract spending include recipient type information. However, different recipient type categories apply to financial assistance versus contract spending. Financial assistance and contract spending use different fields to identify awards.</p>
        <p>More information about Assistance Listings data elements is discussed in the ASSISTANCE LISTINGS DATA ELEMENTS section of this guide.</p>
        <p>More information about NAICS and PSC data elements is discussed in the INDUSTRY AND PRODUCT DATA ELEMENTS section of this guide.</p>
        <p>More information about recipient data elements is discussed in the RECIPIENT DATA ELEMENTS section of this guide.</p>
    </>)
},
{
    question: "How are data on financial assistance and contract spending similar?",
    answer: (<>
        <p>Both financial assistance and contract spending include the following information:</p>
        <ul>
            <li>Treasury and federal account categories</li>
            <li>Location information, including primary place of performance and recipient location</li>
            <li>Recipient information, including recipient name, recipient type and recipient location</li>
            <li>Disaster Emergency Fund Codes (DEFC) categories</li>
        </ul>
        <p>More information about account data elements is available in the ACCOUNT DATA ELEMENTS section of this guide.</p>
        <p>More information about location data elements is available in the LOCATION DATA ELEMENTS section of this guide.</p>
        <p>More information about recipient data elements is available in the RECIPIENT DATA ELEMENTS section of this guide.</p>
        <p>More information about DEFC data elements is available in the DEFC DATA ELEMENTS section of this guide.</p>
    </>)
},
{
    question: "Are outlays included in award spending data?",
    answer: (<>
        <p>Beginning in FY2022, all agencies were required to submit outlay data for award spending every month. Awards funded by a COVID-19 supplemental were required to submit outlays starting in April of 2020. Any outlay data before this period was optional for agencies to report, and thus may be incomplete.</p>
    </>)
}];

const financialAssistanceQuestions = [{
    question: "How is the value of loan measured?",
    answer: (<>
        <p>There are two data elements used to measure the value of a loan: the face value of the loan and the loan subsidy cost. The face value of a loan is the total amount of the loan. The loan subsidy cost is the government’s estimate of the loan’s likely cost to the government, in net present value terms. Because federal loans are expected to be repaid, the face value of a loan is not considered federal spending (and for loan guarantees, the face value is not even directly provided by the government, but instead from a third-party financial institution).</p>
        <p>Loan subsidy cost is calculated based on a credit model specific to the program and, in some cases, the recipient’s characteristics or credit history. Loan subsidy cost allows the government to budget for potential defaults on loans. </p>
    </>)
},
{
    question: "How do the face value and subsidy cost of loans impact the value of award spending?",
    answer: (<>
        <p>Positive loan subsidy costs are included in obligations and outlays. The face value of a loan is not included in obligations or outlays. Administrative costs of running the loan or loan guarantee program are excluded from loan subsidy cost calculations.</p>
        <p>Loan subsidy costs can be positive, negative, or zero depending on whether the government expects to lose money, gain money, or break even on a loan. The loan subsidy cost of a loan should never be larger in absolute value than the face value of the loan. </p>
        <p>When loan subsidy cost is updated to reflect the outcome or current state of loans, agency budgets more accurately reflect resources used for loans.</p>
    </>)
},
{
    question: "Do agencies update loan data in USAspending through the life of a loan?",
    answer: (<>
        <p>Currently, it’s uncommon for agencies to update loans with corrections to the base record or by adding a modification record. As a result, the face value and subsidy cost data on USAspending generally only reflect the reality at the time of initial reporting. If the face value of the loan is modified during its life (such as if the loan principal is later expanded or the recipient returns part of the original loan), this will generally not be reflected in the data. If the risk profile of a recipient changes, up to and including if they completely default on the loan, this will generally not be reflected in the data. If the loan is forgiven, this will generally not be reflected in the data either. Consequently, loan spending data are generally less accurate than that of other award types.</p>
    </>)
},
{
    question: "Which fields in USAspending download files contain loan value information?",
    answer: (<>
        <p>The total_face_value_of_loan, face_value_of_loan, total_loan_subsidy_cost, and original_loan_subsidy_cost fields contain loan value data. </p>
        <p>All four fields are available in financial assistance prime award transaction download files. The total_face_value_of_loan and total_loan_subsidy_cost fields are also available in financial assistance prime award summary download files.</p>
        <p>The Award Amount filter on Advanced Search can be used to filter award spending by loan subsidy cost.</p>
        <p>More information about these fields is available in the Data Dictionary.</p>
        <p>More information on how to download data from USAspending is available in the HOW TO ACCESS THE DATA section of this guide. </p>
    </>)
}];

const contractTransactionQuestions = [{
    question: "What are Indefinite Delivery Vehicles and how are they represented in USAspending?",
    answer: (<>
        <p>Indefinite Delivery Vehicles (IDVs) are vehicles that facilitate the delivery of supply and service orders.</p>
        <p>Types of IDVs include:</p>
        <ul>
            <li>Government-Wide Acquisition Contract (GWAC)</li>
            <li>Indefinite Delivery / Requirements Contract</li>
            <li>Indefinite Delivery / Indefinite Quantity (IDIQ) Contract</li>
            <li>Indefinite Delivery / Definite Quantity Contract</li>
            <li>Federal Supply Schedule (FSS)</li>
            <li>Basic Ordering Agreement (BOA)</li>
            <li>Blanket Purchase Agreements (BPA)</li>
        </ul>
        <p>IDVs can be browsed using award profile pages. IDVs may be searched  using Advanced Search.</p>
        <p>An IDV may contain many contract prime award summaries and other IDVs. The parent_award_id_piid contains the PIID of the IDV contract prime award summary under which an IDV or contract prime award summary was issued.</p>
    </>)
}];

const dataAccessQuestions = [{
    question: "How can I download account spending data?",
    answer: (<>
        <p>The following files contain account spending data:</p>
        <ul>
            <li>FA_AccountBalances</li>
            <li>TAS_AccountBalances</li>
            <li>FA_AccountBreakdownByPA-OC</li>
            <li>TAS_AccountBreakdownByPA-OC</li>
            <li>FA_AccountBreakdownByAward</li>
            <li>TAS_AccountBreakdownByAward</li>
        </ul>
        <p>These files are available through the Custom Account Data download feature.</p>
        <p>The AccountBalances files include account balance information. These files will be returned if the Custom Account Data file type filter includes “Account Balances.”</p>
        <p>The AccountBreakdownByPA-OC files include account data with program activity and object class information. These files will be returned if the Custom Account Data file type filter includes “Account Breakdown by Program Activity & Object Class.”</p>
        <p>The AccountBreakdownByAward files include account data with prime award level information. These files will be returned if the Custom Account Data file type filter includes “Account Breakdown by Award.”</p>
        <p>The data in account spending files which begin with “FA” are aggregated to the Federal Account level. The data in account spending files which begin with “TAS” are broken out to the Treasury Account Symbol level.</p>
        <p>More information about these fields is available in the Data Dictionary and the Custom Account Data Dictionary.</p>
        <p>More information on federal and Treasury accounts is available in the ACCOUNTS DATA ELEMENTS section of this guide.</p>
    </>)
},
{
    question: "How can I download prime award transaction data?",
    answer: (<>
        <p>The following files contain prime award transaction data:</p>
        <ul>
            <li>Assistance_PrimeTransactions</li>
            <li>Contracts_PrimeTransactions</li>
            <li>Assistance_Delta</li>
            <li>Contracts_Delta</li>
            <li>Assistance_Full</li>
            <li>Contracts_Full </li>
        </ul>
        <p>Each row in these files represents a prime award transaction within a prime award summary. </p>
        <p>The Assistance_PrimeTransactions and Contract_PrimeTransactions files are available through the Advanced Search and Custom Award Data download features. For Advanced Search, both files are returned if the level of data is set to “Transaction.” For Custom Award Data, the Assistance_PrimeTransactions file is returned if the Award Type filter includes “Grants,” “Direct Payments,” “Loans,” “Insurance,” or “Other Financial Assistance.” The Contracts_PrimeTransactions file is returned if the Award Type filter includes “Contracts” or “Contract IDVs.” </p>
        <p>The Assistance_Delta, Assistance_Full, Contracts_Delta and Contracts_Full files are available through the Award Data Archive download feature. The Assistance_Full and Assistance_Delta files are returned if the Award Type is set to “Financial Assistance.” The Contracts_Full and Contracts_Delta files are returned if the Award Type is set to “Contracts.”</p>
        <p>Which file you should download and how you should access the file depends on your use case.</p>
        <p>The Assistance_PrimeTransactions and Contracts_PrimeTransactions files are generated on demand based on selected specifications. Use these files if you only need prime award transaction data which meet certain criteria and can wait for the USAspending server to process your request. Access these files through Advanced Search to download a smaller amount of prime award transaction data which meets very specific criteria. Access these files through Custom Award Download to download a larger amount of prime award transaction data.</p>
        <p>The Assistance_Delta, Assistance_Full, Contracts_Delta, and Contracts_Full files include major agencies’ prime award transaction data for full fiscal years. These files are pre-prepared and can be accessed instantaneously. Use these files to maintain a copy of or to quickly access agency prime award transaction data.</p>
        <p>More information about the columns in these files is available in the Data Dictionary and throughout this guide.</p>
    </>)
},
{
    question: "How can I download prime award summary data?",
    answer: (<>
        <p>Prime award summary data are contained in the Assistance_PrimeAwardSummaries and Contracts_PrimeAwardSummaries files. Each row in these files represents a financial assistance or contract prime award summary.</p>
        <p>The Assistance_PrimeAwardSummaries and Contracts_PrimeAwardSummaries files are available through Advanced Search and the COVID-19 Spending profile page download features. For Advanced Search, these files are both returned if the level of data is set to “Award.”</p>
        <p>How you should access these files depends on your use case. </p>
        <p>When accessed through Advanced Search, the Assistance_PrimeAwardSummaries and Contracts_PrimeAwardSummaries files are generated on demand based on selected specifications. Access these files through advanced search to download prime award summary data which meet very specific criteria.</p>
        <p>When accessed through the COVID-19 Spending profile page, the Assistance_PrimeAwardSummaries and Contracts_PrimeAwardSummaries files are pre-prepared with all COVID-19 prime award summary data. These files can be accessed instantaneously through this page. Access these files through the COVID-19 Spending Profile page if you need a broad range of prime award summary data related to COVID-19.</p>
        <p>More information about the columns in these files is available in the Data Dictionary and throughout this guide.</p>
    </>)
},
{
    question: "I’d like to use the API – where can I learn more about it?",
    answer: (<>
        <p>The API page on USAspending offers general API guidance, tutorials, request recipes, and more. A list of endpoints is available online. The download files described above are available through the API.</p>
    </>)
},
{
    question: "How can I download a copy of the full database?",
    answer: (<>
        <p>The USAspending SQL Database Downloads page incudes instructions and links to help download snapshots of the USAspending database as a PostgreSQL archive. This resource is intended for advanced users. The full database is over 1.5 terabytes and will continue to increase in size. The process to complete a full database restore can take many hours to complete.</p>
    </>)
}];

const agencyDataQuestions = [{
    question: "What is the difference between an awarding agency and a funding agency?",
    answer: (<>
        <p>The awarding agency for an award is the agency that creates and administers the award, while funding agencies pay for the award. In most cases, the awarding and funding agency are the same. The division of funding and awarding agencies benefits many smaller agencies, who may not have the staff available to administer an award.</p>
    </>)
},
{
    question: "What are sub-tier agencies?",
    answer: (<>
        <p>Sub-tier agencies are the divisions of top-tier federal agencies. For example, the IRS is a sub-tier agency of The U.S. Department of the Treasury, as the FBI is for The U.S. Department of Justice. </p>
    </>)
},
{
    question: "Where is the full list of agency names and codes?",
    answer: (<>
        <p>The agency_codes.csv file includes data on agency and sub-tier agency names and codes used throughout USAspending. The Federal Hierarchy page on sam.gov includes a comprehensive and up-to-date list of agencies and sub-tier agencies. Federal agencies are responsible for using this tool to manage their agency structure. You can browse award spending by sub-tier agency the Award Spending section of Agency profile pages.</p>
    </>)
},
{
    question: "What is an agency subcomponent?",
    answer: (<>
        <p>Agency subcomponents, also known as bureaus, group together federal accounts within a top-tier agency. Bureaus allow users to see account spending data from related federal accounts. You can browse account spending by subcomponent in the Status of Funds section of Agency profile pages.</p>
    </>)
}, {
    question: "‘Which fields in USAspending download files contain awarding agency identifier information?",
    answer: (<>
        <p>The awarding_agency_code, awarding_agency_name, awarding_sub_agency_code (aka awarding_subagency_code), awarding_sub_agency_name (aka awarding_subagency_name), awarding_office_code, and awarding_office_name fields contain awarding agency identifier information. </p>
        <p>Each of these fields are available on financial assistance and contract prime award transaction and summary download files, as well as Treasury and federal account level account breakdown by award download files. Account download files use the awarding_subagency_code and awarding_subagency_name fields.</p>
        <p>More information about these fields is available in the Custom Account Data Dictionary and the Data Dictionary.</p>
        <p>More information on how to download data from USAspending is available in the HOW TO ACCESS THE DATA section of this guide.</p>
    </>)
}, {
    question: "Which fields in USAspending download files contain funding agency identifier information?",
    answer: (<>
        <p>The funding_agency_code, funding_agency_name, funding_sub_agency_code, funding_sub_agency_name, funding_office_code, and funding_office_name fields contain funding agency identifier information. </p>
        <p>Each these fields are available on financial assistance and contract prime award transaction and summary download files, and federal and Treasury account level account breakdown by award download files.</p>
        <p>The Funding Agency filter on Advanced Search can be used to filter award spending by these data elements.</p>
        <p>More information about these fields is available in the Custom Account Data Dictionary and the Data Dictionary.</p>
        <p>More information on how to download data from USAspending is available in the HOW TO ACCESS THE DATA section of this guide.</p>
    </>)
}, {
    question: "Which USAspending features are used to browse and download agency data?",
    answer: (<>
        <p>The Agency Profile page can be used to browse detailed information on agencies.</p>
        <p>The awarding agency filter on Advanced Search can be used to filter award spending by agency data elements.</p>
        <p>The agency filter on Custom Account Download can be used to download account spending data by agency.</p>
        <p>The agency filter on Award Data Archive can be used to download account spending data by agency.</p>
        <p>The agency and sub-agency filters on Custom Award Data can be used to download account spending data by agency.</p>
    </>)
}, {
    question: "How can I see all agencies which funded a prime award?",
    answer: (<>
        <p>To see all agencies which funded an award, review the Funding Agency column in the Federal Account Funding table on the award profile page. This information is also available in the funding agency columns of the FederalAccountFunding file of the award profile download.</p>
        <p>A single prime award transaction may be funded by multiple agencies. However, only the agency which funded the most amount of money will be listed as the funding agency on that prime award transaction. </p>
    </>)
}];

const accountDataQuestions = [{
    question: "What is a Treasury Account Symbol (TAS)?",
    answer: (<>
        <p>Account spending occurs through Treasury accounts. A Treasury Account Symbol (TAS) is a code used to represent and provide information about a Treasury account. The TAS provides critical information about account and linked award spending associated with a Treasury account.</p>
        <p>Each TAS is composed of the following elements:</p>
        <ul>
            <li>Agency Identifier (AID): 3 digits that identify the agency responsible for a Treasury account. The AID is assigned by Congress.</li>
            <li>Main Account Code (MAC): 4 digits that identify the Treasury account type and purpose. The MAC cannot be blank.</li>
            <li>Sub Account Code (SAC): 3 digits that identify a sub-division of the Treasury account. The SAC cannot be blank. A SAC value of &quot;000&quot; means that the Treasury account is the parent account.</li>
            <li>Allocation Transfer Agency ID (ATA): 3 digits that identify the agency that receives funds through an allocation (non-expenditure) transfer.</li>
            <li>Beginning Period of Availability (BPOA): 4 digits that identify the first year that an appropriation account may incur new obligations. The BPOA is used for annual and multi-year funds only.</li>
        </ul>
        <p>AND</p>
        <ul>
            <li>Ending Period of Availability (EPOA): 4 digits that identify the last year that an appropriation account may incur new obligations. The EPOA is for annual and multi-year funds only.</li>
        </ul>
        <p>OR (if no BPOA or EPOA)</p>
        <ul>
            <li>Availability Type Code (ATC): 1 character that identifies the availability (or time period) for obligations to be made on the Treasury account. An ATC value of “X” means that there is an unlimited or indefinite period to incur new obligations.</li>
        </ul>
        <p>The TAS filter on Advanced Search can be used to filter award spending by TAS.</p>
        <p>The Treasury Account Symbol chart in the Spending by Category section of Federal Account Profile pages display all Treasury accounts associated with a federal account. </p>
    </>)
},
{
    question: "What are federal accounts?",
    answer: (<>
        <p>Federal accounts are groupings of related Treasury accounts. Federal accounts are created by combining all Treasury accounts that share an AID and MAC. Together, these codes create a Federal Account Symbol that can be used to represent a federal account. Federal accounts are used to track how agencies receive and spend congressional funding. There are more than 2,000 federal accounts across the federal government. Federal accounts are found in the budget that the President submits to Congress for approval.</p>
        <p>Each AID should have at least one federal account associated with it, so the agency can conduct its function and carry out its mission. Despite the name, there are instances where an AID is shared among more than one agency. In these cases, each agency within the shared AID will have at least one federal account of its own.</p>
        </>)
},
{
    question: "Which fields in USAspending download files contain TAS and federal account information?",
    answer: (<>
        <p>The agency_identifier_code, main_account_code, sub_account_code, allocation_transfer_agency_identifier_code, beginning_period_of_availability, ending_period_of_availability, and availability_type_code fields contain constituent TAS component information. The Treasury_account_symbol and federal_account_symbol fields contain full account symbols. The Treasury_account_name and federal_account_name fields contain descriptive account names. </p>
        <p>All of these fields are available on all Treasury account level account download files.</p>
        <p>The federal_account_name and federal_account_symbol fields are available on all account download files. </p>
        <p>The federal_accounts_funding_this_award and Treasury_accounts_funding_this_award fields contain information on accounts funding award spending. These fields are available on all award download files.</p>
        <p>The TAS filter on Advanced Search can be used to filter award spending by these data elements. </p>
        <p>More information about these fields is available in the Custom Account Data Dictionary and the Data Dictionary.</p>
        <p>More information on how to download data from USAspending is available in the HOW TO ACCESS THE DATA section of this guide.</p>
    </>)
},
{
    question: "Which USAspending features are used to browse and download TAS and federal account data?",
    answer: (<>
        <p>The Federal Account Profile can be used to browse detailed information on federal accounts.</p>
        <p>The TAS filter on Advanced Search can be used to filter award spending by these data elements. </p>
        <p>The federal account filter on Custom Account Download can be used to download account spending data by federal account.</p>
    </>)
},
{
    question: "What is the difference between a Treasury account and a federal account?",
    answer: (<>
        <p>Federal accounts are comprised of a TAS or multiple TASs. You can understand their relationship using the analogy of a bank account. Say you have a bank account, and in that account, you have checking, growth, and savings accounts. In this scenario, your bank account is the federal account, and the checking, growth, and savings accounts are your TASs. Checking, growth, and savings accounts have different purposes and are at the level where transactions take place. These “TASs” would be grouped under your account based on your Social Security Number, in the same way that a federal account is based on a Federal Account Symbol. Just like checking, growth, and savings accounts, the Student Financial Assistance federal account has several related TASs that have different obligation amounts.</p>
    </>)
},
{
    question: "What does it mean when one agency’s TAS is part of a second agency’s submissions?",
    answer: (<>
        <p>Sometimes the funding associated with a TAS is executed by a different agency than the one indicated by the Agency Identifier. When this occurs, quite often the executing agency will submit the financial and award information associated with the TAS. Since the funding was assigned by Congress to the agency indicated by the Agency Identifier, we group by Agency Identifier so that users can see both the budgetary resources assigned to the agency as well as the spending that flows from the related accounts.</p>
    </>)
},
{
    question: "How can I see account spending for prior years?",
    answer: (<>
        <p>The fiscal year and quarter filter on the Custom Account Data download feature can be used to download account spending from 2017 to present. For data before 2017, you can see similar information in the Office of Management and Budget (OMB) budget appendices.</p>
    </>)
}];

const industryProductQuestions = [{
    question: "What are Product and Service Codes (PSC)?",
    answer: (<>
        <p>The Product and Service Code (PSC) system describes the type of product or service purchased by contract spending.  You can find a list of Product Service Codes at acquisition.gov. Only contract spending includes PSC codes. PSC data on USAspending make it possible to study how much money the government spends on different types of products.</p>
    </>)
},
{
    question: "What is the North American Industrial Classification System (NAICS)?",
    answer: (<>
        <p>The North American Industry Classification System (NAICS) is the standard used by Federal statistical agencies to classify business establishments to collect, analyze, and publish statistical data related to the U.S. business economy. You can learn more about NAICS codes at https://www.census.gov/naics/. Only contract spending includes NAICS codes. NAICS data on USAspending make it possible to study how much money the government spends by industry.</p>
    </>)
},
{
    question: "Which fields in USAspending download files contain PSC and NAICS information?",
    answer: (<>
        <p>The product_or_service_code, product_or_service_code_description, naics_code, and naics_description fields contain PSC and NAICS information.</p>
        <p>These fields are all available on contract prime award transaction and summary downloads, and account breakdown by award account downloads.</p>
        <p>The PSC and NAICS filters on Advanced Search can be used to filter award spending by these data elements. </p>
        <p>More information about these fields is available in the Custom Account Data Dictionary and the Data Dictionary.</p>
        <p>More information on how to download data from USAspending is available in the HOW TO ACCESS THE DATA section of this guide.</p>
    </>)
}];

const disasterEmergencyQuestions = [{
    question: "What are Disaster Emergency Fund Codes (DEFCs)?",
    answer: (<>
        <p>DEFCs are used to track spending for disasters and emergencies such as COVID-19, or other events. Each code links spending to one or more public laws authorizing the funding. Both financial assistance and contracts spending include Disaster Emergency Fund Codes (DEFC) information. </p>
        <p>The Office of Management and Budget (OMB) assigns new DEFC domain values for each enacted appropriation with disaster or emergency funding. A DEFC domain value code will be assigned based on public law number and disaster or emergency designations. </p>
    </>)
},
{
    question: "How can I view and download spending by DEFC?",
    answer: (<>
        <p>There are a few ways to access DEFC spending on USAspending. The DEFC filter on Advanced Search can be used to filter award spending by this data element. All COVID-19 spending is included in on our COVID-19 Spending profile page. Finally, account spending can be downloaded by DEFC using Custom Account Download.</p>
    </>)
},
{
    question: "Which fields in USAspending download files contain DEFC information?",
    answer: (<>
        <p>The disaster_emergency_fund_code and disaster_emergency_fund_codes_for_overall_award fields contain DEFC information. The disaster_emergency_fund_codes field is available on all account download files, and financial assistance and contract prime award summary download files.</p>
        <p>The Custom Account Data download DEFC filter can be used to filter award download files by DEFC.</p>
        <p>The COVID-19 Spending profile page download can be used to download all COVID-19 spending.</p>
        <p>The DEFC filter on Advanced Search can be used to filter award spending by this data element. </p>
        <p>More information about these fields is available in the Custom Account Data Dictionary and the Data Dictionary.</p>
        <p>More information on how to download data from USAspending is available in the HOW TO ACCESS THE DATA section of this guide. </p>
    </>)
}];

const assistanceListingQuestions = [{
    question: "What are Assistance Listings?",
    answer: (<>
        <p>Assistance listings are detailed public descriptions of federal programs that provide grants, loans, scholarships, insurance, and other types of assistance awards. Assistance Listings were formally referred to as the Catalog of Federal Domestic Assistance (CFDA). Only financial assistance spending includes Assistance Listings information; contract spending does not. More information about Assistance Listings is available on sam.gov. </p>
    </>)
},
{
    question: "Which fields in USAspending download files contain Assistance Listings information?",
    answer: (<>
        <p>The cfda_number and cfda_title fields contain Assistance Listings information. These fields are both available on financial assistance prime award transaction and summary download files, and Treasury and federal account level account breakdown by award download files. </p>
        <p>The Advanced Search CFDA Program filter can be used to filter award spending by assistance listing.</p>
        <p>More information about these fields is available in the Custom Account Data Dictionary and the Data Dictionary.</p>
        <p>More information on how to download data from USAspending is available in the HOW TO ACCESS THE DATA section of this guide.</p>
    </>)
}];

const recipientDataQuestions = [{
    question: "What is a recipient?",
    answer: (<>
        <p>A recipient is a company, organization, individual, or government entity (i.e., state, local, tribal, federal, or foreign), that receives funding from the U.S. government. The Recipient Profile page includes detailed information on government spending to individual recipients. Both financial assistance and contracts spending include recipient information such as recipient name, recipient location, and recipient type.</p>
        <p>More information on recipient location information is available in the LOCATION DATA ELEMENTS section of this guide.</p>
    </>)
},
{
    question: "How are recipients identified?",
    answer: (<>
        <p>With limited exceptions, virtually all award recipients have two unique identifies - a Unique Entity Identifier (UEI) and a DUNS number. Larger entities with multiple locations or departments may contain many entities with different UEI or DUNS numbers. These recipients may be grouped together using parent recipient data elements. Recipients of aggregate awards such as Social Security Retirement Insurance recipients do not have a UEI or DUNS to protect personal identifiable information.  </p>
        <p>By April of 2022, the federal government will have stopped using the DUNS number to uniquely identify entities. At that point, entities doing business with the federal government will use UEI. More information about the DUNS to UEI transition is available online.</p>
    </>)
},
{
    question: "Which fields in USAspending download files contain recipient identifier information?",
    answer: (<>
        <p>The recipient_name, recipient_parent_name, recipient_uei, recipient_parent_uei, recipient_duns, and recipient_parent_duns fields contain recipient identifier information. These fields are all available on financial assistance and contract prime award transaction and summary download files, and Treasury and federal account level account breakdown by award download files.</p>
        <p>The recipient_parent data elements reference the ultimate parent of an awardee or recipient and can be used to group together related recipients.</p>
        <p>The Advanced Search Recipient filter can be used to filter award spending by these data elements.</p>
        <p>More information about these fields is available in the Custom Account Data Dictionary and the Data Dictionary.</p>
        <p>More information on how to download data from USAspending is available in the HOW TO ACCESS THE DATA section of this guide.</p>
    </>)
},
{
    question: "What are recipient types?",
    answer: (<>
        <p>Recipient types (aka business types) are socio-economic and other organizational/business characteristics that are used to categorize financial assistance and contract recipients.</p>
    </>)
},
{
    question: "Which recipient type categories are available for contract vs financial assistance recipients?",
    answer: (<>
        <p>Both financial assistance and contract spending include recipient type information. However, most recipient type categories only apply to contract award recipients. An Advanced Search which combines mutually exclusive Recipient Type and Award Type filter options, such as this search, will return zero results. </p>
        <p>The only recipient type categories available in Advanced Search which apply to financial assistance recipients are: </p>
        <ul>
            <li>Small Business</li>
            <li>Other Than Small Business</li>
            <li>Nonprofit</li>
            <li>Public Institution of Higher Education</li>
            <li>Private Institution of Higher Education</li>
            <li>Minority-Serving Institution of Higher Education</li>
            <li>Regional and State Government</li>
            <li>Regional Organization</li>
            <li>U.S. Territory or Possession</li>
            <li>Local Government</li>
            <li>Indian Native American Tribal Government</li>
            <li>Authorities and Commissions</li>
            <li>Individuals</li>
        </ul>
        <p>Each of these recipient type categories also apply to contract recipients, except for Regional Organization, U.S. Territory, or Possession and Individuals.</p>
    </>)
}];

const locationDataQuestions = [{
    question: "What are the different location types?",
    answer: (<>
        <p>The two different location types are primary place of performance and recipient location. Primary place of performance is the principal place of business, where the majority of the work of an award is performed. For example, in a manufacturing contract, this would be the main plant where items are produced. Recipient location is Legal business address of an award recipient. Both financial assistance and contract spending include location information. Both location types may be measured at several geographic levels including country, state, county, city, congressional district, or zip code. Not all geographic levels are available for all award spending. </p>
    </>)
},
{
    question: "Which fields in USAspending download files contain recipient location information?",
    answer: (<>
        <p>Some of the most important recipient fields are recipient_city_name, recipient_county_name, recipient_state_name, and recipient_zip_code. These fields are all available in financial assistance and contract prime award transaction and summary download files. The recipient_zip_code field is also available on federal and Treasury account level account breakdown by award account download files.</p>
        <p>The Recipient Location filters on Advanced Search can be used to filter award spending by these data elements.</p>
        <p>More information about these fields is available in the Custom Account Data Dictionary and the Data Dictionary.</p>
        <p>More information on how to download data from USAspending is available in the HOW TO ACCESS THE DATA section of this guide.</p>
    </>)
},
{
    question: "Which fields in USAspending download files contain primary place of performance location information?",
    answer: (<>
        <p>Some of the most important primary place of performance fields are: </p>
        <ul>
            <li>primary_place_of_performance_city_name</li>
            <li>primary_place_of_performance_county_name</li>
            <li>primary_place_of_performance_state_name </li>
            <li>primary_place_of_performance_zip_4 </li>
            <li>primary_place_of_performance_zip_code</li>
        </ul>
        <p>The first four fields are all available in financial assistance and contract prime award transaction and summary download files. The primary_place_of_performance_zip_code field is available on federal and Treasury account level account breakdown by award account download files.</p>
        <p>The Place of Performance filters on Advanced Search can be used to filter award spending by these data elements.</p>
        <p>More information about these fields is available in the Custom Account Data Dictionary and the Data Dictionary.</p>
        <p>More information on how to download data from USAspending is available in the HOW TO ACCESS THE DATA section of this guide.</p>
    </>)
}];

const additionalResources = [{
    question: "How do I find the meanings of particular terms and field names?",
    answer: (<>
        <p>The Glossary lists plain-language definitions of terms used throughout USAspending.</p>
        <p>The Data Dictionary defines data elements included in the various download files available on USAspending.</p>
        <p>The FPDS Data Dictionary includes descriptions of terminology related to contract data.</p>
    </>)
},
{
    question: "What other resources are available to help understand the data in USAspending?",
    answer: (<>
        <p>The github wiki provides information for developers on how the USAspending application works.</p>
        <p>The USAspending&apos;s FAQ page provides additional advice for getting the most out of the site.</p>
        <p>The DATA Act Information Model Schema (DAIMS) page provides more information on various systems related to the data in USAspending.</p>
        </>)
}];


const AnalystGuideQuestions = () => (
    <>
        <div>
            <h4 className="analyst-guide__questionSections">Award And Account Spending Comparison</h4>
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
            <h4 className="analyst-guide__questionSections">Award Spending</h4>
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
            <h4 className="analyst-guide__questionSections">Financial Assistance Transactions And Award Summaries</h4>
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
            <h4 className="analyst-guide__questionSections">Contract Transactions And Award Summaries</h4>
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
            <h4 className="analyst-guide__questionSections">How To Access The Data</h4>
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
            <h4 className="analyst-guide__questionSections">Agency Data Elements</h4>
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
            <h4 className="analyst-guide__questionSections">Account Data Elements</h4>
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
            <h4 className="analyst-guide__questionSections">Industry And Product Data Elements</h4>
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
            <h4 className="analyst-guide__questionSections">Disaster And Emergency Data Elements</h4>
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
            <h4 className="analyst-guide__questionSections">Assistance Listings Data Elements</h4>
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
            <h4 className="analyst-guide__questionSections">Recipient Data Elements</h4>
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
            <h4 className="analyst-guide__questionSections">Location Data Elements</h4>
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
            <h4 className="analyst-guide__questionSections">Additional Resources</h4>
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

export default AnalystGuideQuestions;

