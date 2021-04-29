from behave import *
from steps.pages.home_page import HomePage
from selenium.webdriver.common.action_chains import ActionChains
from selenium.common.exceptions import WebDriverException
import time
from operator import methodcaller
from hamcrest import assert_that, equal_to, is_not
from delayed_assert import assert_expectations


@then('I see Award detail for Lockheed Martin')
def step_impl(context):
    page_header = context.page_obj.header()
    assert_that(page_header == 'Contract Summary')
    expected_contract = context.feature.contract
    actual_contract = context.page_obj.contract_props()
    assert_that(expected_contract['piid'], equal_to(actual_contract['piid']), 'expected {}, actual {}'.format(expected_contract['piid'], actual_contract['piid']))
    assert_that(expected_contract['name'], equal_to(actual_contract['name']), 'expected {}, actual {}'.format(expected_contract['name'], actual_contract['name']))
    assert_that(expected_contract['awarder'] in actual_contract['awarder'], 'expected {}, actual {}'.format(expected_contract['awarder'], actual_contract['awarder']))
    assert_that(expected_contract['type'].lower(), equal_to(actual_contract['type'].lower()), 'expected {}, actual {}'.format(expected_contract['type'], actual_contract['type']))


@when('I select Awarding Agency link')
def step_impl(context):
    context.page_obj = context.page_obj.select_awarder()


@then('I see awarding Agency Profile')
def step_impl(context):
    actual = context.page_obj.header()
    expected = 'Agency Profile'
    assert_that(actual, equal_to(expected), 'Expected: {}, Actual: {}'.format(expected, actual))


@then('I see "{title}" page')
def step_impl(context, title):
    expected = title
    actual = context.page_obj.title()
    assert_that(expected.lower() in actual.lower(), 'Expected: {} to be in Actual: {}'.format(expected, actual))


@when('I select Recipient link')
def step_impl(context):
    context.page_obj = context.page_obj.select_recipient()


@then('I see Recipient Profile')
def step_impl(context):
    actual = context.page_obj.header()
    expected = 'Recipient Profile'
    assert_that(actual, equal_to(expected), 'Expected: {}, Actual: {}'.format(expected, actual))


@then('I validate tooltips')
def step_impl(context):
    for index in range(0, len(context.table.rows)):
        expected = context.table[index]['name']
        try:
            actual = context.page_obj.tool_tip(index + 1)
        except WebDriverException as error:
            message = 'Error occurred during {} Tool Tip test. message: {}'.format(expected, str(error))
            raise Exception(message) from error

        assert_that(actual, equal_to(expected), 'Expected: {}, Actual: {}'.format(expected, actual))


@when('I sort "{table}" by "{field}" "{direction}"')
def step_impl(context, table, field, direction):
    context.page_obj.sort(table, field, direction)
    time.sleep(1) # DEBUG: follow to see affect on flaky sorting test.


@then('I see "{table}" records are sorted by "{field}" "{direction}"')
def step_impl(context, table, field, direction):
    originally_displayed = 10
    visible_rows = context.page_obj.find_all_rows()
    expected = visible_rows[0:originally_displayed]
    actual = visible_rows[0:originally_displayed]
    expected = sorted(expected, key=methodcaller(field.replace(" ", "_")))
    if 'desc' in direction:
        expected.reverse()

    max = len(actual)
    for index in range(0, max):
        if actual[index] is expected[index]:
            continue
        elif (index < (max - 1)) and getattr(actual[index], field.replace(" ", "_"))() == getattr(expected[index + 1], field.replace(" ", "_"))():
            continue
        elif (index > 0) and getattr(actual[index], field.replace(" ", "_"))() == getattr(expected[index - 1], field.replace(" ", "_"))():
            continue
        else:
            assert_that(actual, equal_to(expected), 'Sort {} {} by {} index: [{}] Expected: \n{}, Actual: \n{}'.format(table, field, direction, index, expected[index], actual[index]))
