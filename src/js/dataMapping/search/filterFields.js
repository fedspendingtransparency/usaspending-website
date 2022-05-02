export const awardFields = {
    startDate: 'period_of_performance_start_date',
    endDate: 'period_of_performance_current_end_date',
    keyword: 'description',
    locationScope: 'place_of_performance__location_country_code',
    location: 'place_of_performance__location_id',
    awardType: 'type',
    awardId: 'id',
    awardAmount: 'total_obligation',
    recipientId: 'recipient__legal_entity_id',
    recipientLocationScope: 'recipient__location__location_country_code',
    recipientLocation: 'recipient__location__location_id',
    recipientName: 'recipient__recipient_name',
    recipientType: 'recipient__business_categories',
    fundingAgency: {
        toptier: 'funding_agency__toptier_agency__name',
        subtier: 'funding_agency__subtier_agency__name'
    },
    awardingAgency: {
        toptier: 'awarding_agency__toptier_agency__name',
        subtier: 'awarding_agency__subtier_agency__name'
    },
    objectClass: 'financial_set__object_class__object_class',
    budgetFunctionTitle: 'financial_set__treasury_account__budget_function_title',
    budgetSubfunctionTitle: 'financial_set__treasury_account__budget_subfunction_title',
    federalAccount: 'financial_set__treasury_account__federal_account_id',
    cfdaNumber: 'latest_transaction__assistance_data__cfda__program_number',
    cfdaTitle: 'latest_transaction__assistance_data__cfda__program_title',
    naics: 'latest_transaction__contract_data__naics',
    naicsDescription: 'latest_transaction__contract_data__naics_description',
    psc: 'latest_transaction__contract_data__product_or_service_code',
    pricingType: 'latest_transaction__contract_data__type_of_contract_pricing',
    setAside: 'latest_transaction__contract_data__type_set_aside',
    extentCompeted: 'latest_transaction__contract_data__extent_competed'
};

export const tasCategoriesFields = {
    startDate: 'reporting_period_start',
    endDate: 'reporting_period_end',
    budgetFunctionTitle: 'treasury_account__budget_function_title',
    budgetSubfunctionTitle: 'treasury_account__budget_subfunction_title',
    objectClass: 'object_class__object_class',
    fundingAgency: 'treasury_account__agency_id',
    fundingAgencyFREC: 'treasury_account__fr_entity_code',
    federalAccount: 'treasury_account__federal_account_id'
};

export const transactionFields = {
    date: 'action_date',
    locationScope: 'place_of_performance__location_country_code',
    location: 'place_of_performance__location_id',
    fundingAgencyCGAC: 'award__financial_set__treasury_account__agency_id',
    fundingAgency: {
        toptier: 'funding_agency__toptier_agency__name',
        subtier: 'funding_agency__subtier_agency__name'
    },
    awardingAgency: {
        toptier: 'awarding_agency__toptier_agency__name',
        subtier: 'awarding_agency__subtier_agency__name'
    },
    recipientId: 'recipient__legal_entity_id',
    recipientLocationScope: 'recipient__location__location_country_code',
    recipientLocation: 'recipient__location__location_id',
    recipientName: 'recipient__recipient_name',
    recipientType: 'recipient__business_categories',
    awardType: 'type',
    awardId: 'award_id',
    awardAmount: 'federal_action_obligation',
    objectClass: 'award__financial_set__object_class__object_class',
    budgetFunctionTitle: 'award__financial_set__treasury_account__budget_function_title',
    budgetSubfunctionTitle: 'award__financial_set__treasury_account__budget_subfunction_title',
    federalAccount: 'award__financial_set__treasury_account__federal_account_id',
    cfdaNumber: 'assistance_data__cfda__program_number',
    cfdaTitle: 'assistance_data__cfda__program_title',
    naics: 'contract_data__naics',
    naicsDescription: 'contract_data__naics_description',
    psc: 'contract_data__product_or_service_code'
};

export const accountAwardsFields = {
    startDate: 'award__period_of_performance_start_date',
    endDate: 'award__period_of_performance_current_end_date',
    locationScope: 'award__place_of_performance__location_country_code',
    location: 'award__place_of_performance__location_id',
    awardType: 'award__type',
    awardId: 'award__id',
    awardAmount: 'award__total_obligation',
    recipientId: 'award__recipient__legal_entity_id',
    recipientLocationScope: 'award__recipient__location__location_country_code',
    recipientLocation: 'award__recipient__location__location_id',
    recipientName: 'award__recipient__recipient_name',
    recipientType: 'award__recipient__business_categories',
    fundingAgency: {
        toptier: 'award__funding_agency__toptier_agency__name',
        subtier: 'award__funding_agency__subtier_agency__name'
    },
    awardingAgency: {
        toptier: 'award__awarding_agency__toptier_agency__name',
        subtier: 'award__awarding_agency__subtier_agency__name'
    },
    objectClass: 'object_class__object_class',
    budgetFunctionTitle: 'treasury_account__budget_function_title',
    budgetSubfunctionTitle: 'treasury_account__budget_subfunction_title',
    federalAccount: 'treasury_account__federal_account_id',
    cfdaNumber: 'award__transaction__assistance_data__cfda__program_number',
    cfdaTitle: 'award__transaction__assistance_data__cfda__program_title',
    naics: 'award__transaction__contract_data__naics',
    naicsDescription: 'award__transaction__contract_data__naics_description',
    psc: 'award__transaction__contract_data__product_or_service_code',
    pricingType: 'award__latest_transaction__contract_data__type_of_contract_pricing',
    setAside: 'award__latest_transaction__contract_data__type_set_aside',
    extentCompeted: 'award__latest_transaction__contract_data__extent_competed'
};
