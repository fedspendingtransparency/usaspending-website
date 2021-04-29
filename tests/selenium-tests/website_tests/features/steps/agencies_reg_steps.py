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
# from basic_steps import wait_for_class_name
from xpath import XPATH_DICT, TIMING_DICT


def wait_for_class_name(context, class_name, timeout_secs = 30):
    class_name_element_is_present = expected_conditions.presence_of_element_located((By.CLASS_NAME,class_name))
    WebDriverWait(context.browser, timeout_secs).until(class_name_element_is_present)


@then('check that agency page link {num} is clicked the title in the redirected page is correct')
def step_impl(context, num):
    num = int(num)
    wait_for_class_name(context, 'agency-link-cell')
    items = context.browser.find_elements_by_class_name('agency-link-cell')
    print(items[num-1].text)
    target = items[num-1].find_element_by_tag_name('a')
    assert_that(target.is_displayed())
    txt = target.text
    # txt = txt[:-6]
    txt = txt[:txt.index('(')].strip()
    context.browser.execute_script("return arguments[0].scrollIntoView();", target)
    context.browser.execute_script("window.scrollBy(0, -150);")
    target.click()

    wait_for_class_name(context, 'agency-overview')
    title_element = context.browser.find_element_by_class_name('agency-overview')
    title_element = title_element.find_element_by_tag_name('h3')
    assert_that(title_element.is_displayed())
    title = title_element.text
    assert_that(title, equal_to(txt))

@then('check the number of results is equal to the displayed results count')
def step_impl(context):
    wait_for_class_name(context, 'results-count')
    display_total = context.browser.find_element_by_class_name('results-count')
    display_total = int(display_total.text[:3])
    targets = context.browser.find_elements_by_class_name('column-agency_name')
    total = len(targets)
    assert_that(display_total, equal_to(total))
