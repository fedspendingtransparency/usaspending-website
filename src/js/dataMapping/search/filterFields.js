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
    fundingAgency: {
        toptier: 'funding_agency__toptier_agency__name',
        subtier: 'funding_agency__subtier_agency__name'
    },
    awardingAgency: {
        toptier: 'awarding_agency__toptier_agency__name',
        subtier: 'awarding_agency__subtier_agency__name'
    },
    objectClass: 'financial_set__object_class__major_object_class',
    budgetFunctionTitle: 'financial_set__treasury_account__budget_function_title',
    budgetSubfunctionTitle: 'financial_set__treasury_account__budget_subfunction_title',
    federalAccount: 'financial_set__treasury_account__federal_account'
};

export const tasCategoriesFields = {
    startDate: 'reporting_period_start',
    endDate: 'reporting_period_end',
    budgetFunctionTitle: 'treasury_account__budget_function_title',
    budgetSubfunctionTitle: 'treasury_account__budget_subfunction_title',
    objectClass: 'object_class__major_object_class',
    fundingAgency: 'treasury_account__agency_id',
    federalAccount: 'treasury_account__federal_account'
};

export const transactionFields = {
    date: 'action_date',
    keyword: 'description',
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
    awardType: 'type',
    awardId: 'award_id',
    awardAmount: 'federal_action_obligation',
    objectClass: 'award__financial_set__object_class__major_object_class',
    budgetFunctionTitle: 'award__financial_set__treasury_account__budget_function_title',
    budgetSubfunctionTitle: 'award__financial_set__treasury_account__budget_subfunction_title',
    federalAccount: 'award__financial_set__treasury_account__federal_account'
};

export const accountAwardsFields = {
    startDate: 'award__period_of_performance_start_date',
    endDate: 'award__period_of_performance_current_end_date',
    keyword: 'award__description',
    locationScope: 'award__place_of_performance__location_country_code',
    location: 'award__place_of_performance__location_id',
    awardType: 'award__type',
    awardId: 'award__id',
    awardAmount: 'award__total_obligation',
    recipientId: 'award__recipient__legal_entity_id',
    recipientLocationScope: 'award__recipient__location__location_country_code',
    recipientLocation: 'award__recipient__location__location_id',
    fundingAgency: {
        toptier: 'award__funding_agency__toptier_agency__name',
        subtier: 'award__funding_agency__subtier_agency__name'
    },
    awardingAgency: {
        toptier: 'award__awarding_agency__toptier_agency__name',
        subtier: 'award__awarding_agency__subtier_agency__name'
    },
    objectClass: 'object_class__major_object_class',
    budgetFunctionTitle: 'treasury_account__budget_function_title',
    budgetSubfunctionTitle: 'treasury_account__budget_subfunction_title',
    federalAccount: 'treasury_account__federal_account'
};
