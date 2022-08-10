/**
 * BaseAwardAmount.js
 * Created by David Trinh 12/19/18
 */

import * as MoneyFormatter from 'helpers/moneyFormatter';

const getCovid19Totals = (arr, defCodes = []) => arr.filter((obj) => defCodes.filter((d) => d?.disaster === "covid_19")?.map((defc) => defc.code).includes(obj?.code)).reduce((acc, obj) => acc + obj?.amount || 0, 0);

const getInfrastructureTotals = (arr) => arr.filter((d) => d?.code === "Z" || d?.code === "1")?.reduce((acc, obj) => acc + obj?.amount || 0, 0);

const tempData = {
    _category: "loans",
    id: 49612062,
    generatedId: "ASST_NON_P268K145445_9100",
    type: "07",
    typeDescription: "DIRECT LOAN (E)",
    description: "2013-2014 DL BASE RECORD",
    _subawardTotal: 0,
    subawardCount: 0,
    _totalObligation: 615894680,
    _totalOutlay: 3592577,
    _child_award_total_outlay: 0,
    _grandchild_award_total_outlay: 0,
    _baseExercisedOptions: 0,
    _baseAndAllOptions: 0,
    _dateSigned: "2013-06-11T04:00:00.000Z",
    naics: {},
    psc: {},
    defCodes: [
        "Z"
    ],
    fileC: {
        obligations: [
            {
                code: "Z",
                amount: 615894680
            }
        ],
        outlays: [
            {
                code: "Z",
                amount: 3592577
            }
        ]
    },
    cfdas: [
        {
            samWebsite: "https://sam.gov/fal/0c0ddb04f212489e9aa977e162a4a86f/view",
            cfdaWebsite: "http://www.ifap.ed.gov/.",
            cfdaFederalAgency: "OFFICE OF FEDERAL STUDENT AID, EDUCATION, DEPARTMENT OF",
            cfdaNumber: "84.268",
            cfdaTitle: "Federal Direct Student Loans",
            applicantEligibility: "The applicant must be a U.S. citizen, national, or person in the United States for other than a temporary purpose. A student borrower must be enrolled or accepted for enrollment in a degree or certificate program on at least a half-time basis as an undergraduate, graduate, or professional student at a participating postsecondary institution. An otherwise eligible student is eligible for loans during a single twelve-month period in which the student is enrolled in a non-degree/non-certificate course of study that the institution has determined is necessary in order for the student to enroll in a program leading to a degree or certificate. Under the Direct PLUS program, parents may borrow for dependent undergraduate students. Also, graduate and professional students are eligible to borrow PLUS Loans. Direct Unsubsidized and PLUS loans are available to eligible borrowers regardless of need. However, a financial needs test based on family income is required for an undergraduate student to receive a Direct Subsidized loan. A student that is presently enrolled at a participating institution must be maintaining satisfactory academic progress in the course of study that they are pursuing. The borrower may not owe a refund on any Title IV grant or be in default on any Title IV loan received for attendance at any institution. The borrower must also file a Statement of Registration compliance (Selective Service). ",
            beneficiaryEligibility: "Vocational, undergraduate, and graduate postsecondary school students and their parents.",
            cfdaObjectives: "To provide loan capital directly from the Federal government to vocational, undergraduate, and graduate postsecondary school students and their parents.",
            _totalAwardObligation: 0,
            _federalActionOblicationAmount: 0,
            _percentOfTotal: null,
            federalActionOblicationAmount: "$0",
            federalActionOblicationAmountShort: "$0.0",
            percentOfTotal: "--",
            cfdaTitleShort: "Federal Direct Student Loans"
        }
    ],
    recipient: {
        internalId: "12e04014-a8fc-0542-d3b6-6ed9a403c237-R",
        _name: "WALDEN UNIVERSITY, INC.",
        duns: null,
        uei: null,
        parentName: "",
        parentDuns: null,
        parentUei: null,
        parentInternalId: "",
        businessCategories: [
            "Category Business",
            "Not Designated a Small Business"
        ],
        location: {
            _address1: "100 WASHINGTON AVE S",
            _address2: "",
            _address3: "",
            _province: "",
            _city: "MINNEAPOLIS",
            _county: "HENNEPIN",
            _countyCode: "053",
            _stateCode: "MN",
            _zip: "55401-2110",
            _zip4: "2110",
            _country: "UNITED STATES",
            _countryCode: "USA",
            _state: "MINNESOTA",
            _stateName: "MINNESOTA",
            _congressionalDistrict: "05"
        }
    },
    placeOfPerformance: {
        _address1: "",
        _address2: "",
        _address3: "",
        _province: "",
        _city: "MINNEAPOLIS",
        _county: "HENNEPIN",
        _countyCode: "053",
        _stateCode: "MN",
        _zip: "55401-2110",
        _zip4: "2110",
        _country: "UNITED STATES",
        _countryCode: "USA",
        _state: "MINNESOTA",
        _stateName: "MINNESOTA",
        _congressionalDistrict: "05"
    },
    periodOfPerformance: {
        _startDate: "2013-01-01T05:00:00.000Z",
        _endDate: "2035-07-31T04:00:00.000Z",
        _awardDate: "",
        _lastModifiedDate: "2022-02-07T05:00:00.000Z",
        _potentialEndDate: ""
    },
    awardingAgency: {
        id: 1068,
        hasAgencyPage: true,
        toptierName: "Department of Education",
        toptierAbbr: "ED",
        toptierId: "",
        subtierName: "Department of Education",
        subtierAbbr: "ED",
        subtierId: "",
        officeName: "OFFICE OF POSTSECONDARY EDUCATION",
        officeId: "",
        agencySlug: "department-of-education"
    },
    fundingAgency: {
        id: 1068,
        hasAgencyPage: true,
        toptierName: "Department of Education",
        toptierAbbr: "ED",
        toptierId: "",
        subtierName: "Department of Education",
        subtierAbbr: "ED",
        subtierId: "",
        officeName: "OFFICE OF POSTSECONDARY EDUCATION",
        officeId: "",
        agencySlug: "department-of-education"
    },
    executiveDetails: {
        officers: {
            "Officer 1": "--",
            "Officer 2": "--",
            "Officer 3": "--",
            "Officer 4": "--",
            "Officer 5": "--"
        }
    },
    _faceValue: 143212546824,
    _subsidy: 14321254682,
    _baseAllOptions: 0,
    _federalObligation: 0,
    _nonFederalFunding: 0,
    _totalFunding: 0,
    fain: "P268K145445",
    uri: null,
    biggestCfda: {
        samWebsite: "https://sam.gov/fal/0c0ddb04f212489e9aa977e162a4a86f/view",
        cfdaWebsite: "http://www.ifap.ed.gov/.",
        cfdaFederalAgency: "OFFICE OF FEDERAL STUDENT AID, EDUCATION, DEPARTMENT OF",
        cfdaNumber: "84.268",
        cfdaTitle: "Federal Direct Student Loans",
        applicantEligibility: "The applicant must be a U.S. citizen, national, or person in the United States for other than a temporary purpose. A student borrower must be enrolled or accepted for enrollment in a degree or certificate program on at least a half-time basis as an undergraduate, graduate, or professional student at a participating postsecondary institution. An otherwise eligible student is eligible for loans during a single twelve-month period in which the student is enrolled in a non-degree/non-certificate course of study that the institution has determined is necessary in order for the student to enroll in a program leading to a degree or certificate. Under the Direct PLUS program, parents may borrow for dependent undergraduate students. Also, graduate and professional students are eligible to borrow PLUS Loans. Direct Unsubsidized and PLUS loans are available to eligible borrowers regardless of need. However, a financial needs test based on family income is required for an undergraduate student to receive a Direct Subsidized loan. A student that is presently enrolled at a participating institution must be maintaining satisfactory academic progress in the course of study that they are pursuing. The borrower may not owe a refund on any Title IV grant or be in default on any Title IV loan received for attendance at any institution. The borrower must also file a Statement of Registration compliance (Selective Service). ",
        beneficiaryEligibility: "Vocational, undergraduate, and graduate postsecondary school students and their parents.",
        cfdaObjectives: "To provide loan capital directly from the Federal government to vocational, undergraduate, and graduate postsecondary school students and their parents.",
        _totalAwardObligation: "",
        _federalActionOblicationAmount: 0,
        _percentOfTotal: null,
        federalActionOblicationAmount: "$0",
        federalActionOblicationAmountShort: "$0.0",
        percentOfTotal: "--",
        cfdaTitleShort: "Federal Direct Student Loans"
    },
    cfdaList: [
        {
            applicant_eligibility: "The applicant must be a U.S. citizen, national, or person in the United States for other than a temporary purpose. A student borrower must be enrolled or accepted for enrollment in a degree or certificate program on at least a half-time basis as an undergraduate, graduate, or professional student at a participating postsecondary institution. An otherwise eligible student is eligible for loans during a single twelve-month period in which the student is enrolled in a non-degree/non-certificate course of study that the institution has determined is necessary in order for the student to enroll in a program leading to a degree or certificate. Under the Direct PLUS program, parents may borrow for dependent undergraduate students. Also, graduate and professional students are eligible to borrow PLUS Loans. Direct Unsubsidized and PLUS loans are available to eligible borrowers regardless of need. However, a financial needs test based on family income is required for an undergraduate student to receive a Direct Subsidized loan. A student that is presently enrolled at a participating institution must be maintaining satisfactory academic progress in the course of study that they are pursuing. The borrower may not owe a refund on any Title IV grant or be in default on any Title IV loan received for attendance at any institution. The borrower must also file a Statement of Registration compliance (Selective Service). ",
            beneficiary_eligibility: "Vocational, undergraduate, and graduate postsecondary school students and their parents.",
            cfda_federal_agency: "OFFICE OF FEDERAL STUDENT AID, EDUCATION, DEPARTMENT OF",
            cfda_number: "84.268",
            cfda_objectives: "To provide loan capital directly from the Federal government to vocational, undergraduate, and graduate postsecondary school students and their parents.",
            cfda_obligations: "(Direct Loans) FY 21$84,456,530,000.00; FY 22 est $85,028,930,000.00; FY 23 est $85,182,755,000.00; FY 20$88,446,619,000.00; FY 19$90,660,894,000.00; FY 18$95,864,248,000.00; FY 17$93,812,654,000.00; FY 16$95,462,059,000.00; - Figures represent Net Commitment Loan volume, without Consolidation.(Direct Loans) FY 21$19,964,715,000.00; FY 22 est $26,217,008,000.00; FY 23 est $27,239,740,000.00; FY 20$30,400,791,000.00; FY 19$39,892,538,000.00; FY 18$41,632,348,000.00; FY 17$48,762,128,000.00; FY 16$45,633,297,000.00; - (Figures represent Net Commitment Consolidation volume)",
            cfda_popular_name: "",
            cfda_title: "Federal Direct Student Loans",
            cfda_website: "http://www.ifap.ed.gov/.",
            federal_action_obligation_amount: 0,
            non_federal_funding_amount: 0,
            sam_website: "https://sam.gov/fal/0c0ddb04f212489e9aa977e162a4a86f/view",
            total_funding_amount: 0
        }
    ],
    recordType: 2
};

const BaseAwardAmounts = {
    populateBase(data) {
        this.id = (data.award_id && `${data.award_id}`) || '';
        if (data.generatedId) {
            this.generatedId = encodeURIComponent(`${data.generatedId}`);
        }
        this.generatedId = data.generated_unique_award_id
            ? encodeURIComponent(`${data.generated_unique_award_id}`)
            : '';
    },
    populateAggIdv(data, defCodes) {
        this.childIDVCount = data.child_idv_count || 0;
        this.childAwardCount = data.child_award_count || 0;
        this.grandchildAwardCount = data.grandchild_award_count || 0;
        this._baseAndAllOptions = parseFloat(
            data.child_award_base_and_all_options_value + data.grandchild_award_base_and_all_options_value
        ) || 0;
        this._totalObligation = parseFloat(
            data.child_award_total_obligation + data.grandchild_award_total_obligation
        ) || 0;
        this._combinedOutlay = parseFloat(
            data.child_award_total_outlay + data.grandchild_award_total_outlay
        ) || 0;
        this._baseExercisedOptions = parseFloat(
            data.child_award_base_exercised_options_val + data.grandchild_award_base_exercised_options_val
        ) || 0;
        this._fileCOutlay = getCovid19Totals(
            data.child_account_outlays_by_defc
                .concat(data.grandchild_account_outlays_by_defc),
            defCodes
        );
        this._fileCObligated = getCovid19Totals(
            data.child_account_obligations_by_defc
                .concat(data.grandchild_account_obligations_by_defc),
            defCodes
        );
        this._fileCObligatedInfrastructure = getInfrastructureTotals(data.child_account_obligations_by_defc
            .concat(data.grandchild_account_obligations_by_defc));
        this._fileCOutlayInfrastructure = getInfrastructureTotals(data.child_account_obligations_by_defc
            .concat(data.grandchild_account_obligations_by_defc));
    },
    populateIdv(data, defCodes) {
        this._totalObligation = data._totalObligation;
        this._totalOutlay = data._totalOutlay;
        this._childAwardTotalOutlay = data._childAwardTotalOutlay;
        this._grandchildAwardTotalOutlay = data._grandchildAwardTotalOutlay;
        this._baseExercisedOptions = data._baseExercisedOptions;
        this._baseAndAllOptions = data._baseAndAllOptions;
        this._fileCOutlay = getCovid19Totals(data.fileC.outlays, defCodes);
        this._fileCObligated = getCovid19Totals(data.fileC.obligations, defCodes);
        this._fileCOutlayInfrastructure = getInfrastructureTotals(data.fileC.outlays);
        this._fileCObligatedInfrastructure = getInfrastructureTotals(data.fileC.obligations);
    },
    populateLoan(data, defCodes) {
        this._subsidy = data._subsidy;
        this._faceValue = data._faceValue;
        this._totalOutlay = data._totalOutlay;
        this._totalObligation = data._totalObligation;
        this._fileCOutlay = getCovid19Totals(data.fileC.outlays, defCodes);
        this._fileCObligated = getCovid19Totals(data.fileC.obligations, defCodes);
        this._fileCOutlayInfrastructure = getInfrastructureTotals(data.fileC.outlays);
        this._fileCObligatedInfrastructure = getInfrastructureTotals(data.fileC.obligations);
    },
    populateAsst(data, defCodes) {
        this._totalObligation = data._totalObligation;
        this._totalOutlay = data._totalOutlay;
        this._totalFunding = data._totalFunding;
        this._nonFederalFunding = data._nonFederalFunding;
        this._fileCOutlay = getCovid19Totals(data.fileC.outlays, defCodes);
        this._fileCObligated = getCovid19Totals(data.fileC.obligations, defCodes);
        this._fileCOutlayInfrastructure = getInfrastructureTotals(data.fileC.outlays);
        this._fileCObligatedInfrastructure = getInfrastructureTotals(data.fileC.obligations);
    },
    populateContract(data, defCodes) {
        this._totalObligation = data._totalObligation;
        this._totalOutlay = data._totalOutlay;
        this._baseExercisedOptions = data._baseExercisedOptions;
        this._baseAndAllOptions = data._baseAndAllOptions;
        this._fileCOutlay = getCovid19Totals(data.fileC.outlays, defCodes);
        this._fileCObligated = getCovid19Totals(data.fileC.obligations, defCodes);
        this._fileCOutlayInfrastructure = getInfrastructureTotals(data.fileC.outlays);
        this._fileCObligatedInfrastructure = getInfrastructureTotals(data.fileC.obligations);
    },
    populate(data, awardAmountType, defCodes) {
        this.populateBase(data, awardAmountType);
        if (awardAmountType === 'idv_aggregated') {
            // In every other context, the data has been parsed by CoreAward; here, it's payload straight from the API.
            this.populateAggIdv(data, defCodes);
        }
        else if (awardAmountType === 'idv') {
            this.populateIdv(data, defCodes);
        }
        else if (awardAmountType === 'contract') {
            this.populateContract(data, defCodes);
        }
        else if (awardAmountType === 'loan') {
            this.populateLoan(tempData, defCodes);
            // this.populateLoan(data, defCodes);
        }
        else {
            // grants, direct payment, insurance, other all use populateAsst
            this.populateAsst(data, defCodes);
        }
    },
    get baseAndAllOptionsFormatted() {
        return MoneyFormatter.formatMoneyWithPrecision(this._baseAndAllOptions, 2);
    },
    get baseAndAllOptionsAbbreviated() {
        if (Math.abs(this._baseAndAllOptions) >= MoneyFormatter.unitValues.MILLION) {
            const units = MoneyFormatter.calculateUnitForSingleValue(this._baseAndAllOptions);
            if (this._baseAndAllOptions < 0) {
                return `(${MoneyFormatter.formatMoneyWithPrecision(Math.abs(this._baseAndAllOptions) / units.unit, 1)} ${units.longLabel.charAt(0).toUpperCase() + units.longLabel.slice(1)})`;
            }
            return `${MoneyFormatter.formatMoneyWithPrecision(this._baseAndAllOptions / units.unit, 1)} ${units.longLabel.charAt(0).toUpperCase() + units.longLabel.slice(1)}`;
        }
        else if (this._baseAndAllOptions < 0) {
            return `(${Math.abs(MoneyFormatter.formatMoney(this._baseAndAllOptions))})`;
        }
        return MoneyFormatter.formatMoney(this._baseAndAllOptions);
    },
    get totalObligationFormatted() {
        return MoneyFormatter.formatMoneyWithPrecision(this._totalObligation, 2);
    },
    get combinedOutlayFormatted() {
        return MoneyFormatter.formatMoneyWithPrecision(this._combinedOutlay, 2);
    },
    get combinedOutlayAbbreviated() {
        if (Math.abs(this._combinedOutlay) >= MoneyFormatter.unitValues.MILLION) {
            const units = MoneyFormatter.calculateUnitForSingleValue(this._combinedOutlay);
            if (this._combinedOutlay < 0) {
                return `(${MoneyFormatter.formatMoneyWithPrecision(Math.abs(this._combinedOutlay) / units.unit, 1)} ${units.longLabel.charAt(0).toUpperCase() + units.longLabel.slice(1)})`;
            }
            return `${MoneyFormatter.formatMoneyWithPrecision(this._combinedOutlay / units.unit, 1)} ${units.longLabel.charAt(0).toUpperCase() + units.longLabel.slice(1)}`;
        }
        else if (this._combinedOutlay < 0) {
            return `(${Math.abs(MoneyFormatter.formatMoney(this._combinedOutlay))})`;
        }
        return MoneyFormatter.formatMoney(this._combinedOutlay);
    },
    get totalOutlayFormatted() {
        return MoneyFormatter.formatMoneyWithPrecision(this._totalOutlay, 2);
    },
    get totalOutlayAbbreviated() {
        if (Math.abs(this._totalOutlay) >= MoneyFormatter.unitValues.MILLION) {
            const units = MoneyFormatter.calculateUnitForSingleValue(this._totalOutlay);
            if (this._totalOutlay < 0) {
                return `(${MoneyFormatter.formatMoneyWithPrecision(Math.abs(this._totalOutlay) / units.unit, 1)} ${units.longLabel.charAt(0).toUpperCase() + units.longLabel.slice(1)})`;
            }
            return `${MoneyFormatter.formatMoneyWithPrecision(this._totalOutlay / units.unit, 1)} ${units.longLabel.charAt(0).toUpperCase() + units.longLabel.slice(1)}`;
        }
        else if (this._totalOutlay < 0) {
            return `(${Math.abs(MoneyFormatter.formatMoney(this._totalOutlay))})`;
        }
        return MoneyFormatter.formatMoney(this._totalOutlay);
    },
    get totalObligationAbbreviated() {
        if (Math.abs(this._totalObligation) >= MoneyFormatter.unitValues.MILLION) {
            const units = MoneyFormatter.calculateUnitForSingleValue(this._totalObligation);
            if (this._totalObligation < 0) {
                return `(${MoneyFormatter.formatMoneyWithPrecision(Math.abs(this._totalObligation) / units.unit, 1)} ${units.longLabel.charAt(0).toUpperCase() + units.longLabel.slice(1)})`;
            }
            return `${MoneyFormatter.formatMoneyWithPrecision(this._totalObligation / units.unit, 1)} ${units.longLabel.charAt(0).toUpperCase() + units.longLabel.slice(1)}`;
        }
        else if (this._totalObligation < 0) {
            return `(${Math.abs(MoneyFormatter.formatMoney(this._totalObligation))})`;
        }
        return MoneyFormatter.formatMoney(this._totalObligation);
    },
    get infrastructureOutlayFormatted() {
        return MoneyFormatter.formatMoneyWithPrecision(this._fileCOutlayInfrastructure, 2);
    },
    get infrastructureOutlayAbbreviated() {
        if (Math.abs(this._fileCOutlayInfrastructure) >= MoneyFormatter.unitValues.MILLION) {
            const units = MoneyFormatter.calculateUnitForSingleValue(this._fileCOutlayInfrastructure);
            if (this._fileCOutlayInfrastructure < 0) {
                return `(${MoneyFormatter.formatMoneyWithPrecision(Math.abs(this._fileCOutlayInfrastructure) / units.unit, 1)} ${units.longLabel.charAt(0).toUpperCase() + units.longLabel.slice(1)})`;
            }
            return `${MoneyFormatter.formatMoneyWithPrecision(this._fileCOutlayInfrastructure / units.unit, 1)} ${units.longLabel.charAt(0).toUpperCase() + units.longLabel.slice(1)}`;
        }
        else if (this._fileCOutlayInfrastructure < 0) {
            return `(${Math.abs(MoneyFormatter.formatMoney(this._fileCOutlayInfrastructure))})`;
        }
        return MoneyFormatter.formatMoney(this._fileCOutlayInfrastructure);
    },
    get infrastructureObligationFormatted() {
        return MoneyFormatter.formatMoneyWithPrecision(this._fileCObligatedInfrastructure, 2);
    },
    get infrastructureObligationAbbreviated() {
        if (Math.abs(this._fileCObligatedInfrastructure) >= MoneyFormatter.unitValues.MILLION) {
            const units = MoneyFormatter.calculateUnitForSingleValue(this._fileCObligatedInfrastructure);
            if (this._fileCObligatedInfrastructure < 0) {
                return `(${MoneyFormatter.formatMoneyWithPrecision(Math.abs(this._fileCObligatedInfrastructure) / units.unit, 1)} ${units.longLabel.charAt(0).toUpperCase() + units.longLabel.slice(1)})`;
            }
            return `${MoneyFormatter.formatMoneyWithPrecision(this._fileCObligatedInfrastructure / units.unit, 1)} ${units.longLabel.charAt(0).toUpperCase() + units.longLabel.slice(1)}`;
        }
        else if (this._fileCObligatedInfrastructure < 0) {
            return `(${Math.abs(MoneyFormatter.formatMoney(this._fileCObligatedInfrastructure))})`;
        }
        return MoneyFormatter.formatMoney(this._fileCObligatedInfrastructure);
    },
    get baseExercisedOptionsFormatted() {
        return MoneyFormatter.formatMoneyWithPrecision(this._baseExercisedOptions, 2);
    },
    get baseExercisedOptionsAbbreviated() {
        if (this._baseExercisedOptions >= MoneyFormatter.unitValues.MILLION) {
            const units = MoneyFormatter.calculateUnitForSingleValue(this._baseExercisedOptions);
            return `${MoneyFormatter.formatMoneyWithPrecision(this._baseExercisedOptions / units.unit, 1)} ${units.longLabel.charAt(0).toUpperCase() + units.longLabel.slice(1)}`;
        }
        return MoneyFormatter.formatMoney(this._baseExercisedOptions);
    },
    get overspendingFormatted() {
        return MoneyFormatter.formatMoneyWithPrecision(this._totalObligation - this._baseExercisedOptions, 2);
    },
    get overspendingAbbreviated() {
        if (this._totalObligation - this._baseExercisedOptions >= MoneyFormatter.unitValues.MILLION) {
            const units = MoneyFormatter.calculateUnitForSingleValue(this._totalObligation - this._baseExercisedOptions);
            return `${MoneyFormatter.formatMoneyWithPrecision((this._totalObligation - this._baseExercisedOptions) / units.unit, 1)} ${units.unitLabel}`;
        }
        return MoneyFormatter.formatMoney(this._totalObligation - this._baseExercisedOptions);
    },
    get extremeOverspendingFormatted() {
        return MoneyFormatter.formatMoneyWithPrecision(this._totalObligation - this._baseAndAllOptions, 2);
    },
    get extremeOverspendingAbbreviated() {
        if (this._totalObligation - this._baseAndAllOptions >= MoneyFormatter.unitValues.MILLION) {
            const units = MoneyFormatter.calculateUnitForSingleValue(this._totalObligation - this._baseAndAllOptions);
            return `${MoneyFormatter.formatMoneyWithPrecision((this._totalObligation - this._baseAndAllOptions) / units.unit, 1)} ${units.unitLabel}`;
        }
        return MoneyFormatter.formatMoney(this._totalObligation - this._baseAndAllOptions);
    },
    get fileCOutlayFormatted() {
        return MoneyFormatter.formatMoneyWithPrecision(this._fileCOutlay, 2);
    },
    get fileCOutlayAbbreviated() {
        if (this._fileCOutlay >= MoneyFormatter.unitValues.MILLION) {
            const units = MoneyFormatter.calculateUnitForSingleValue(this._fileCOutlay);
            return `${MoneyFormatter.formatMoneyWithPrecision((this._fileCOutlay) / units.unit, 1)} ${units.unitLabel}`;
        }
        return MoneyFormatter.formatMoney(this._fileCOutlay);
    },
    get fileCObligatedFormatted() {
        return MoneyFormatter.formatMoneyWithPrecision(this._fileCObligated, 2);
    },
    get fileCObligatedAbbreviated() {
        if (this._fileCObligated >= MoneyFormatter.unitValues.MILLION) {
            const units = MoneyFormatter.calculateUnitForSingleValue(this._fileCObligated);
            return `${MoneyFormatter.formatMoneyWithPrecision((this._fileCObligated) / units.unit, 1)} ${units.unitLabel}`;
        }
        return MoneyFormatter.formatMoney(this._fileCObligated);
    },
    get totalFundingAbbreviated() {
        if (Math.abs(this._totalFunding) >= MoneyFormatter.unitValues.MILLION) {
            const units = MoneyFormatter.calculateUnitForSingleValue(this._totalFunding);
            if (this._totalFunding < 0) {
                return `(${MoneyFormatter.formatMoneyWithPrecision(Math.abs(this._totalFunding) / units.unit, 1)} ${units.longLabel.charAt(0).toUpperCase() + units.longLabel.slice(1)})`;
            }
            return `${MoneyFormatter.formatMoneyWithPrecision(this._totalFunding / units.unit, 1)} ${units.longLabel.charAt(0).toUpperCase() + units.longLabel.slice(1)}`;
        }
        else if (this._totalFunding < 0) {
            return `(${Math.abs(MoneyFormatter.formatMoney(this._totalFunding))})`;
        }
        return MoneyFormatter.formatMoney(this._totalFunding);
    },
    get totalFundingFormatted() {
        return MoneyFormatter.formatMoneyWithPrecision(this._totalFunding, 2);
    },
    get nonFederalFundingFormatted() {
        return MoneyFormatter.formatMoneyWithPrecision(this._nonFederalFunding, 2);
    },
    get nonFederalFundingAbbreviated() {
        if (Math.abs(this._nonFederalFunding) >= MoneyFormatter.unitValues.MILLION) {
            const units = MoneyFormatter.calculateUnitForSingleValue(this._nonFederalFunding);
            if (this._nonFederalFunding < 0) {
                return `(${MoneyFormatter.formatMoneyWithPrecision(Math.abs(this._nonFederalFunding) / units.unit, 1)} ${units.longLabel.charAt(0).toUpperCase() + units.longLabel.slice(1)})`;
            }
            return `${MoneyFormatter.formatMoneyWithPrecision(this._nonFederalFunding / units.unit, 1)} ${units.longLabel.charAt(0).toUpperCase() + units.longLabel.slice(1)}`;
        }
        else if (this._nonFederalFunding < 0) {
            return `(${Math.abs(MoneyFormatter.formatMoney(this._nonFederalFunding))})`;
        }
        return MoneyFormatter.formatMoney(this._nonFederalFunding);
    },
    get faceValueAbbreviated() {
        if (Math.abs(this._faceValue) >= MoneyFormatter.unitValues.MILLION) {
            const units = MoneyFormatter.calculateUnitForSingleValue(this._faceValue);
            if (this._faceValue < 0) {
                return `(${MoneyFormatter.formatMoneyWithPrecision(Math.abs(this._faceValue) / units.unit, 1)} ${units.longLabel.charAt(0).toUpperCase() + units.longLabel.slice(1)})`;
            }
            return `${MoneyFormatter.formatMoneyWithPrecision(this._faceValue / units.unit, 1)} ${units.longLabel.charAt(0).toUpperCase() + units.longLabel.slice(1)}`;
        }
        else if (this._faceValue < 0) {
            return `(${Math.abs(MoneyFormatter.formatMoney(this._faceValue))})`;
        }
        return MoneyFormatter.formatMoney(this._faceValue);
    },
    get faceValueFormatted() {
        return MoneyFormatter.formatMoneyWithPrecision(this._faceValue, 2);
    },
    get subsidyAbbreviated() {
        if (Math.abs(this._subsidy) >= MoneyFormatter.unitValues.MILLION) {
            const units = MoneyFormatter.calculateUnitForSingleValue(this._subsidy);
            if (this._subsidy < 0) {
                return `(${MoneyFormatter.formatMoneyWithPrecision(Math.abs(this._subsidy) / units.unit, 1)} ${units.longLabel.charAt(0).toUpperCase() + units.longLabel.slice(1)})`;
            }
            return `${MoneyFormatter.formatMoneyWithPrecision(this._subsidy / units.unit, 1)} ${units.longLabel.charAt(0).toUpperCase() + units.longLabel.slice(1)}`;
        }
        else if (this._subsidy < 0) {
            return `(${Math.abs(MoneyFormatter.formatMoney(this._subsidy))})`;
        }
        return MoneyFormatter.formatMoney(this._subsidy);
    },
    get subsidyFormatted() {
        return MoneyFormatter.formatMoneyWithPrecision(this._subsidy, 2);
    }
};

export default BaseAwardAmounts;
