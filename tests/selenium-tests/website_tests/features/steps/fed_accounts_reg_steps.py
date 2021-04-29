from behave import *
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from hamcrest import assert_that, equal_to
from selenium.common.exceptions import TimeoutException
import time
import datetime
# from fiscalyear import *
from basic_steps import wait_for_xpath, wait_for_clickable, wait_for_class_name, highlight
from xpath import XPATH_DICT, TIMING_DICT


@when('fed accounts link {num} is clicked')
def step_impl(context, num):
    num = int(num)
    wait = True
    count = 0
    while wait and count < 5:
        try:
            wait_for_class_name(context, 'results-table__row')
            items = context.browser.find_elements_by_class_name('results-table__row')
            wait_for_class_name(context, 'results-table__data')
            target = items[num].find_elements_by_class_name('results-table__data')
            target = target.pop(1)
            assert_that(target.is_displayed())
            target = target.find_element_by_tag_name('a')
            wait = False
        except:
            print(count)
            count += 1
            time.sleep(1)
            continue

    context.browser.execute_script("return arguments[0].scrollIntoView();", target)
    context.browser.execute_script("window.scrollBy(0, -150);")
    target.click()

@then('check when fed accounts link {num} is clicked the title in the redirected page is correct')
def step_impl(context, num):
    num = int(num)
    wait_for_class_name(context, 'results-table__row')
    items = context.browser.find_elements_by_class_name('results-table__row')
    wait_for_class_name(context, 'results-table__data')
    target = items[num].find_elements_by_class_name('results-table__data')
    target = target.pop(1)
    assert_that(target.is_displayed())
    txt = target.text
    target = target.find_element_by_tag_name('a')
    context.browser.execute_script("return arguments[0].scrollIntoView();", target)
    context.browser.execute_script("window.scrollBy(0, -150);")
    target.click()

    wait_for_class_name(context, 'account-overview')
    title_element = context.browser.find_element_by_class_name('account-overview')
    title_element = title_element.find_element_by_tag_name('h3')
    assert_that(title_element.is_displayed())
    title = title_element.text
    assert_that(title, equal_to(txt))

@then('I find the fed accounts snapshot title')
def step_impl(context):
    wait_for_class_name(context, 'account-overview')
    target = context.browser.find_element_by_class_name('account-overview')
    target = target.find_elements_by_tag_name('h3')
    target = target.pop(1)
    assert_that(target.is_displayed())
    assert_that(target.text, equal_to('FY 2019 Snapshot'))

@then('check number of bars in the graph classname {element} is {num}')
def step_impl(context, element, num):
    num = int(num)
    wait_for_class_name(context, element)
    target = context.browser.find_elements_by_class_name(element)
    assert_that(target is not None)
    print(num)
    for i in target:
        print(i.text)
    assert_that(len(target), equal_to(num))

@then('I am on Federal Account Profile page with title containing "{title}"')
def step_impl(context, title):
    expected = "Federal Account Profile"
    actual = context.page_obj.title()
    assert_that(actual, equal_to(expected))
    header = context.page_obj.header()
    assert_that(title in header)
