from behave import *
from steps.pages.home_page import HomePage
from selenium.webdriver.common.action_chains import ActionChains
import time
from hamcrest import assert_that, equal_to, is_not
from delayed_assert import assert_expectations

# @given('I load the website')
# def step_impl(context):
#     webapp.load_website()
#     context.webapp = webapp
#     context.page_obj = HomePage(webapp.driver)

@when('I navigate to Spending Explorer')
def step_imple(context):
    context.page_obj = context.page_obj.navigate_to_spending_explorer()

@when('I go to "{menuitem}" Download Center page')
def step_impl(context, menuitem):
    context.page_obj = context.page_obj.navigate_to_download_center(menuitem)

@when('I go to "{menuitem}" Award Search page')
def step_impl(context, menuitem):
    context.page_obj = context.page_obj.navigate_to_award_search(menuitem)


@when('I go to "{menuitem}" Profile page')
def step_impl(context, menuitem):
    context.page_obj = context.page_obj.navigate_to("Profiles", menuitem)

@then('I end test')
def step_impl(context):
    assert_expectations()