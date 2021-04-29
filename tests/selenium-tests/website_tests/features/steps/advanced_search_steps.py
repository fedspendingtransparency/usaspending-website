from behave import *
from steps.pages.home_page import HomePage
from selenium.webdriver.common.action_chains import ActionChains
import time
from hamcrest import assert_that, equal_to, is_not
from delayed_assert import assert_expectations

#------------ need to update these steps after implementing Advanced Search Page-------------
@when('I select FY2019 filter')
def step_impl(context):
    context.page_obj.select_fy_2019()



@when('I select first record - Lockheed Martin')
def step_impl(context):
    context.feature.contract = context.page_obj.first_contract()
    context.page_obj = context.page_obj.select_first_record_award_id()

#------------ end -------------

@when('I select FY {fiscal_year} filter')
def step_impl(context, fiscal_year):
    selector = context.page_obj.date_range_selector()
    for fy in fiscal_year.split(" "):
        selector.select_fiscal_year(fy)


@when('I filter on recipient {recipient_value}')
def step_impl(context, recipient_value):
    selector = context.page_obj.recipient_filter()
    for recipient in recipient_value.split(","):
        selector.select(recipient)


@when('I filter on Agency {agency_value}')
def step_impl(context, agency_value):
    selector = context.page_obj.agency_filter()
    for agency in agency_value.replace(" ", "").split(","):
        selector.select(agency)


@when('I filter on Keyword "{keyword}"')
def step_impl(context, keyword):
    selector = context.page_obj.keyword_filter()
    selector.enter_keyword(keyword)


@when('I filter on Treasury Accounts {tas_codes}')
def step_impl(context, tas_codes):
    filter = context.page_obj.tas_filter()
    for code in tas_codes.split(","):
        code = code.replace('"', '')
        filter.select(code)


@when('I filter on Treasury Components "{tas_codes}"')
def step_impl(context, tas_codes):
    filter = context.page_obj.tas_component_filter()
    filter.select_components(tas_codes)

@when('I filter on NAICS by "{naics_code}"')
def step_impl(context, naics_code):
    filter = context.page_obj.naics_filter()
    filter.select_code(naics_code)


@when('I filter on {name} by "{title}" code "{code}"')
def step_impl(context, name, title, code):
    filters = context.page_obj.AdvancedSearchFilters
    filter = filters.get_filter(name)
    filter.filter_on(code)
    filters.submit()


@when('I Submit Search')
def step_impl(context):
    context.page_obj.submit_filters()

@when('I switch to view "{result_type}"')
def step_impl(context, result_type):
    context.page_obj.switch_results_to(result_type)


@then('I see "{title}" visualization for "{table}"')
def step_impl(context, title, table):
    is_active = context.page_obj.is_active_visualization(title)
    assert_that(is_active, equal_to(True), "Expected {} visualization to be active".format(title))
    is_active_table = context.page_obj.is_active_table(table)
    assert_that(is_active_table, equal_to(True), "Expected {} table to be active".format(table))


@then('I see visualization title is "{title}"')
def step_impl(context, title):
    actual_title = context.page_obj.active_title()
    assert_that(actual_title, equal_to(title), "Advanced search page title Expected: {}, Actual: {}".format(title, actual_title))


@then('I see results contain records')
def step_impl(context):
    has_records = context.page_obj.has_records()
    assert_that(has_records, "Advanced Search page expected results from filtered search")


@then('I see Awarding Agency is "{filtered_on}" in results')
def step_impl(context, filtered_on):
    records = context.page_obj.find_all_rows()
    for record in records:
        actual = record.awarding_agency()
        assert_that(filtered_on in actual, "AdvancedSearch page awarding agency Expected: {}, Actual: {}".format(filtered_on, actual))

@then('I validate "{table}" table column names')
def step_impl(context, table):
    columns = context.page_obj.TableColumn
    for column in columns:
        if context.page_obj.table_has_columns():
            expected_label = column.expected_label
            actual_label = context.page_obj.table_column_name(column)
            assert_that(expected_label in actual_label, "AdvancedSearch {} column name Expected: {}, Actual {}".format(table, expected_label, actual_label))


@then('I see "{table}" table is sorted in "{order}" order by "{column}"')
def step_impl(context, table, order, column):
    column_index = column.lower().replace(" ", "_")
    sorted_column = context.page_obj.TableColumn[column_index]
    is_sorted = context.page_obj.is_sorted(sorted_column)
    assert(is_sorted, equal_to(True), "Expected {} default sorted column to be {}".format(table, column))

@when('I select "{table}" table')
def step_impl(context, table):
    context.page_obj.select_table(table)

