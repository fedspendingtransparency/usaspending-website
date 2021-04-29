from behave import *
from steps.pages.home_page import HomePage
from selenium.webdriver.common.action_chains import ActionChains
import time
from hamcrest import assert_that, equal_to, is_not
from delayed_assert import expect, assert_expectations

@then('I see I am on Custom Account Download Center page')
def step_impl(context):
    expected_header = "Download Center"
    actual_header = context.page_obj.header()
    expect(expected_header == actual_header, 'Expected header: {}, actual: {}'.format(expected_header, actual_header))

    expected_title = "Custom Account Data"
    actual_title = context.page_obj.title()
    expect(expected_title == actual_title, 'Expected header: {}, actual: {}'.format(expected_title, actual_title))

@when('I select "{budget_function}", "{budget_subfunction}" Budget Function')
def step_impl(context, budget_function, budget_subfunction):
    context.cad_budget_function = budget_function
    context.cad_budget_subfunction = budget_subfunction
    context.page_obj.selectBudgetFunction(budget_function, budget_subfunction)

@when('I select "{account_level}" Account level')
def step_impl(context, account_level):
    context.cad_account_level = account_level
    context.page_obj.select_account_level(account_level)


@when('I select the "{file_type}" file type')
def step_impl(context, file_type):
    context.cad_file_type = file_type
    context.page_obj.select_file_type(file_type)


@when('I select Quarter "{quarter}" of FY "{year}"')
def step_impl(context, quarter, year):
    context.cad_quarter = quarter
    context.cad_year = year
    context.page_obj.select_quarter(year, quarter)

@then('the selected options displays correct options selected')
def step_impl(context):
    options = context.page_obj.get_selected_options_instance()
    expect(context.cad_budget_function == options.budget_function())
    expect(context.cad_budget_subfunction == options.budget_subfunction())
    expect(context.cad_budget_subfunction == options.budget_subfunction())
    expect(context.cad_account_level == options.account_level())
    expect(context.cad_file_type == options.file_submission_type())
    expected_fy = context.cad_year + "-" + context.cad_quarter
    expect(expected_fy == options.fiscal_year())

