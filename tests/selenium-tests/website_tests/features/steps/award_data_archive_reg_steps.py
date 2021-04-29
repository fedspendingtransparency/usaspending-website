from behave import *
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from hamcrest import assert_that, equal_to
from selenium.common.exceptions import TimeoutException
import time
import os
import glob
import csv
import re
from datetime import datetime
from xpath import XPATH_DICT, TIMING_DICT


def wait_for_class_name(context, class_name, timeout_secs = 30):
    class_name_element_is_present = expected_conditions.presence_of_element_located((By.CLASS_NAME,class_name))
    WebDriverWait(context.browser, timeout_secs).until(class_name_element_is_present)

@when('find and select {name} from Agency dropdown')
def step_impl(context, name):
    wait_for_class_name(context, 'selected-button')
    target = context.browser.find_element_by_class_name('selected-button')
    assert_that(target.is_displayed())
    target.click()
    time.sleep(0.5)
    wait_for_class_name(context, 'field-item')
    items = context.browser.find_elements_by_class_name('field-item')
    selection = None
    for item in items:
        if item.text == name:
            selection = item
    assert_that(selection is not None)
    assert_that(selection.is_displayed())
    selection.click()

@then('find {name} button')
def step_impl(context, name):
    wait_for_class_name(context, 'item-button')
    items = context.browser.find_elements_by_class_name('item-button')
    selection = None
    for item in items:
        print(item.text)
        if item.text == name:
            selection = item
    assert_that(selection is not None)
    assert_that(selection.is_displayed())
    selection.click()




@then("we check that the {name} file has correct headers")
def step_impl(context, name):
    contract_headers = [
        "contract_transaction_unique_key",
        "award_id_piid",
        "modification_number",
        "transaction_number",
        "parent_award_agency_id",
        "parent_award_agency_name",
        "parent_award_id",
        "parent_award_modification_number",
        "federal_action_obligation",
        "total_dollars_obligated",
        "base_and_exercised_options_value",
        "current_total_value_of_award",
        "base_and_all_options_value",
        "potential_total_value_of_award",
        "action_date",
        "period_of_performance_start_date",
        "period_of_performance_current_end_date",
        "period_of_performance_potential_end_date",
        "ordering_period_end_date",
        "awarding_agency_code",
        "awarding_agency_name",
        "awarding_sub_agency_code",
        "awarding_sub_agency_name",
        "awarding_office_code",
        "awarding_office_name",
        "funding_agency_code",
        "funding_agency_name",
        "funding_sub_agency_code",
        "funding_sub_agency_name",
        "funding_office_code",
        "funding_office_name",
        "foreign_funding",
        "foreign_funding_description",
        "sam_exception",
        "sam_exception_description",
        "recipient_duns",
        "recipient_name",
        "recipient_doing_business_as_name",
        "cage_code",
        "recipient_parent_name",
        "recipient_parent_duns",
        "recipient_country_code",
        "recipient_country_name",
        "recipient_address_line_1",
        "recipient_address_line_2",
        "recipient_city_name",
        "recipient_state_code",
        "recipient_state_name",
        "recipient_zip_4_code",
        "recipient_congressional_district",
        "recipient_phone_number",
        "recipient_fax_number",
        "primary_place_of_performance_country_code",
        "primary_place_of_performance_country_name",
        "primary_place_of_performance_city_name",
        "primary_place_of_performance_county_name",
        "primary_place_of_performance_state_code",
        "primary_place_of_performance_state_name",
        "primary_place_of_performance_zip_4",
        "primary_place_of_performance_congressional_district",
        "award_or_idv_flag",
        "award_type_code",
        "award_type",
        "idv_type_code",
        "idv_type",
        "multiple_or_single_award_idv_code",
        "multiple_or_single_award_idv",
        "type_of_idc_code",
        "type_of_idc",
        "type_of_contract_pricing_code",
        "type_of_contract_pricing",
        "award_description",
        "action_type_code",
        "action_type",
        "solicitation_identifier",
        "number_of_actions",
        "inherently_governmental_functions",
        "inherently_governmental_functions_description",
        "product_or_service_code",
        "product_or_service_code_description",
        "contract_bundling_code",
        "contract_bundling",
        "dod_claimant_program_code",
        "dod_claimant_program_description",
        "naics_code",
        "naics_description",
        "recovered_materials_sustainability_code",
        "recovered_materials_sustainability",
        "domestic_or_foreign_entity_code",
        "domestic_or_foreign_entity",
        "dod_acquisition_program_code",
        "dod_acquisition_program_description",
        "information_technology_commercial_item_category_code",
        "information_technology_commercial_item_category",
        "epa_designated_product_code",
        "epa_designated_product",
        "country_of_product_or_service_origin_code",
        "country_of_product_or_service_origin",
        "place_of_manufacture_code",
        "place_of_manufacture",
        "subcontracting_plan_code",
        "subcontracting_plan",
        "extent_competed_code",
        "extent_competed",
        "solicitation_procedures_code",
        "solicitation_procedures",
        "type_of_set_aside_code",
        "type_of_set_aside",
        "evaluated_preference_code",
        "evaluated_preference",
        "research_code",
        "research",
        "fair_opportunity_limited_sources_code",
        "fair_opportunity_limited_sources",
        "other_than_full_and_open_competition_code",
        "other_than_full_and_open_competition",
        "number_of_offers_received",
        "commercial_item_acquisition_procedures_code",
        "commercial_item_acquisition_procedures",
        "small_business_competitiveness_demonstration_program",
        "commercial_item_test_program_code",
        "commercial_item_test_program",
        "a76_fair_act_action_code",
        "a76_fair_act_action",
        "fed_biz_opps_code",
        "fed_biz_opps",
        "local_area_set_aside_code",
        "local_area_set_aside",
        "price_evaluation_adjustment_preference_percent_difference",
        "clinger_cohen_act_planning_code",
        "clinger_cohen_act_planning",
        "materials_supplies_articles_equipment_code",
        "materials_supplies_articles_equipment",
        "labor_standards_code",
        "labor_standards",
        "construction_wage_rate_requirements_code",
        "construction_wage_rate_requirements",
        "interagency_contracting_authority_code",
        "interagency_contracting_authority",
        "other_statutory_authority",
        "program_acronym",
        "parent_award_type_code",
        "parent_award_type",
        "parent_award_single_or_multiple_code",
        "parent_award_single_or_multiple",
        "major_program",
        "national_interest_action_code",
        "national_interest_action",
        "cost_or_pricing_data_code",
        "cost_or_pricing_data",
        "cost_accounting_standards_clause_code",
        "cost_accounting_standards_clause",
        "gfe_gfp_code",
        "gfe_gfp",
        "sea_transportation_code",
        "sea_transportation",
        "undefinitized_action_code",
        "undefinitized_action",
        "consolidated_contract_code",
        "consolidated_contract",
        "performance_based_service_acquisition_code",
        "performance_based_service_acquisition",
        "multi_year_contract_code",
        "multi_year_contract",
        "contract_financing_code",
        "contract_financing",
        "purchase_card_as_payment_method_code",
        "purchase_card_as_payment_method",
        "contingency_humanitarian_or_peacekeeping_operation_code",
        "contingency_humanitarian_or_peacekeeping_operation",
        "alaskan_native_owned_corporation_or_firm",
        "american_indian_owned_business",
        "indian_tribe_federally_recognized",
        "native_hawaiian_owned_business",
        "tribally_owned_business",
        "veteran_owned_business",
        "service_disabled_veteran_owned_business",
        "woman_owned_business",
        "women_owned_small_business",
        "economically_disadvantaged_women_owned_small_business",
        "joint_venture_women_owned_small_business",
        "joint_venture_economic_disadvantaged_women_owned_small_bus",
        "minority_owned_business",
        "subcontinent_asian_asian_indian_american_owned_business",
        "asian_pacific_american_owned_business",
        "black_american_owned_business",
        "hispanic_american_owned_business",
        "native_american_owned_business",
        "other_minority_owned_business",
        "contracting_officers_determination_of_business_size",
        "contracting_officers_determination_of_business_size_code",
        "emerging_small_business",
        "community_developed_corporation_owned_firm",
        "labor_surplus_area_firm",
        "us_federal_government",
        "federally_funded_research_and_development_corp",
        "federal_agency",
        "us_state_government",
        "us_local_government",
        "city_local_government",
        "county_local_government",
        "inter_municipal_local_government",
        "local_government_owned",
        "municipality_local_government",
        "school_district_local_government",
        "township_local_government",
        "us_tribal_government",
        "foreign_government",
        "organizational_type",
        "corporate_entity_not_tax_exempt",
        "corporate_entity_tax_exempt",
        "partnership_or_limited_liability_partnership",
        "sole_proprietorship",
        "small_agricultural_cooperative",
        "international_organization",
        "us_government_entity",
        "community_development_corporation",
        "domestic_shelter",
        "educational_institution",
        "foundation",
        "hospital_flag",
        "manufacturer_of_goods",
        "veterinary_hospital",
        "hispanic_servicing_institution",
        "receives_contracts",
        "receives_grants",
        "receives_contracts_and_grants",
        "airport_authority",
        "council_of_governments",
        "housing_authorities_public_tribal",
        "interstate_entity",
        "planning_commission",
        "port_authority",
        "transit_authority",
        "subchapter_scorporation",
        "limited_liability_corporation",
        "foreign_owned_and_located",
        "for_profit_organization",
        "nonprofit_organization",
        "other_not_for_profit_organization",
        "the_ability_one_program",
        "number_of_employees",
        "annual_revenue",
        "private_university_or_college",
        "state_controlled_institution_of_higher_learning",
        "1862_land_grant_college",
        "1890_land_grant_college",
        "1994_land_grant_college",
        "minority_institution",
        "historically_black_college",
        "tribal_college",
        "alaskan_native_servicing_institution",
        "native_hawaiian_servicing_institution",
        "school_of_forestry",
        "veterinary_college",
        "dot_certified_disadvantage",
        "self_certified_small_disadvantaged_business",
        "small_disadvantaged_business",
        "c8a_program_participant",
        "historically_underutilized_business_zone_hubzone_firm",
        "sba_certified_8a_joint_venture",
        "last_modified_date",
    ]
    financial_headers = [
        "assistance_transaction_unique_key",
        "award_id_fain",
        "modification_number",
        "award_id_uri",
        "sai_number",
        "federal_action_obligation",
        "non_federal_funding_amount",
        "total_funding_amount",
        "face_value_of_loan",
        "original_subsidy_cost",
        "total_subsidy_cost",
        "total_loan_value",
        "action_date",
        "period_of_performance_start_date",
        "period_of_performance_current_end_date",
        "awarding_agency_code",
        "awarding_agency_name",
        "awarding_sub_agency_code",
        "awarding_sub_agency_name",
        "awarding_office_code",
        "awarding_office_name",
        "funding_agency_code",
        "funding_agency_name",
        "funding_sub_agency_code",
        "funding_sub_agency_name",
        "funding_office_code",
        "funding_office_name",
        "recipient_duns",
        "recipient_name",
        "recipient_parent_name",
        "recipient_parent_duns",
        "recipient_country_code",
        "recipient_country_name",
        "recipient_address_line_1",
        "recipient_address_line_2",
        "recipient_city_code",
        "recipient_city_name",
        "recipient_county_code",
        "recipient_county_name",
        "recipient_state_code",
        "recipient_state_name",
        "recipient_zip_code",
        "recipient_zip_last_4_code",
        "recipient_congressional_district",
        "recipient_foreign_city_name",
        "recipient_foreign_province_name",
        "recipient_foreign_postal_code",
        "primary_place_of_performance_country_code",
        "primary_place_of_performance_country_name",
        "primary_place_of_performance_code",
        "primary_place_of_performance_city_name",
        "primary_place_of_performance_county_code",
        "primary_place_of_performance_county_name",
        "primary_place_of_performance_state_name",
        "primary_place_of_performance_zip_4",
        "primary_place_of_performance_congressional_district",
        "primary_place_of_performance_foreign_location",
        "cfda_number",
        "cfda_title",
        "assistance_type_code",
        "assistance_type_description",
        "award_description",
        "business_funds_indicator_code",
        "business_funds_indicator_description",
        "business_types_code",
        "business_types_description",
        "correction_delete_indicator_code",
        "correction_delete_indicator_description",
        "action_type_code",
        "action_type_description",
        "record_type_code",
        "record_type_description",
        "last_modified_date",
    ]

    if name == "contracts":
        headers = contract_headers
    elif name == "financial assistance":
        headers = financial_headers
    else:
        headers = None
        print('name entered is invalid')

    with open(str(context.path + "/" + context.file), 'r+') as csvfile:
        reader = csv.reader(csvfile, delimiter=',', )
        count = 0
        for row in reader:
            if (count == 0):
                for item in row:
                    assert_that(item in headers, item)
            count = count + 1
            if (count == 1):
                break

@when('archive file link {name} is clicked')
def step_impl(context, name):
    if name == "Full":
        class_name = 'row-odd'
    elif name == "Delta":
        class_name = 'row-even'
    wait_for_class_name(context, class_name)
    targets = context.browser.find_elements_by_class_name(class_name)
    target = targets.pop(1)
    target = target.find_element_by_tag_name('a')
    assert_that(target.is_displayed)
    target.click()
    time.sleep(1)
    target.click()

@then('check dates on award data archive download')
def step_impl(context):
    now = datetime.now()
    wait_for_class_name(context, 'award-data-archive-table')
    target = context.browser.find_element_by_class_name('award-data-archive-table')
    time.sleep(1)
    targets = target.find_elements_by_tag_name('a')

    for target in targets:
        text = target.text
        actualDatePart = re.search('(\d{8})', text).group(0)
        actual_download_date = datetime.strptime(actualDatePart, '%Y%m%d')
        time_diff = (now - actual_download_date).days
        # time_diff = time_diff.days
        assert_that(time_diff < 36, "Number of days greater than 36.")
        assert_that(actual_download_date.day >= 10 and actual_download_date.day <= 15, "download date day not between 10 and 15 inclusive.")

@when('click on database download link {num}')
def step_impl(context, num):
    num = int(num)
    wait_for_class_name(context, 'container')
    target = context.browser.find_element_by_class_name('container')
    time.sleep(1)
    targets = target.find_elements_by_tag_name('a')
    link = targets.pop(num - 1)
    print(link.text)
    link.click()

@then('check dates on download database file')
def step_impl(context):
    now = datetime.now()
    wait_for_class_name(context, 'container')
    target = context.browser.find_element_by_class_name('container')
    time.sleep(1)
    target = target.find_element_by_xpath('//table/tbody/tr[2]/td[1]')
    text = target.text
    print(text)
    text = re.search('(\d{4}-\d{2}-\d{2})', text).group(0)
    print(text)
    download_date = datetime.strptime(text,'%Y-%m-%d')
    time_diff = now - download_date
    time_diff = time_diff.days
    assert_that(time_diff < 36)
