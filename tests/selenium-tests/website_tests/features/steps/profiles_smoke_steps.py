from behave import *
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException
from hamcrest import assert_that, equal_to
import time
from xpath import XPATH_DICT, TIMING_DICT

def wait_for_xpath(context, xpath, timeout_secs = 30):
    xpath_element_is_present = expected_conditions.presence_of_element_located((By.XPATH,xpath))
    WebDriverWait(context.browser, timeout_secs).until(xpath_element_is_present)


def wait_for_clickable(context, xpath, timeout_secs = 30):
    xpath_element_is_present = expected_conditions.element_to_be_clickable((By.XPATH,xpath))
    WebDriverWait(context.browser, timeout_secs).until(xpath_element_is_present) 

@when('Enter "{text}" into the search field')
def step_impl(context, text): 
    xpath = '//*[@id="main-content"]/div/div[2]/form/input'
    wait_for_xpath(context, xpath)
    target = context.browser.find_element_by_xpath(xpath)
    assert_that(target is not None)
    assert_that(target.is_displayed())
    target.send_keys(text)
    time.sleep(0.5)

@when('Enter "{text}" into state search')
def step_impl(context, text):
    xpath = '//*[@id="main-content"]/div/div[2]/div[1]/form/input'
    wait_for_xpath(context, xpath)
    target = context.browser.find_element_by_xpath(xpath)
    assert_that(target is not None)
    assert_that(target.is_displayed())
    target.send_keys(text)
    time.sleep(2)

@then('I see the Recipients list')
def step_impl(context):
    xpath = '//*[@id="main-content"]/div/div[4]/div/table/tbody/tr'
    wait_for_xpath(context,xpath)
    elements = context.browser.find_elements_by_xpath(xpath)
    assert_that(len(elements) > 1)
    time.sleep(1)

@then('I see dropdown contents')
def step_impl(context):
    xpath = '//button[@class="fy-picker__item"]'
    wait_for_xpath(context, xpath)
    dropdown = ["Trailing 12 Months", "All Fiscal Years",  "FY 2019", "FY 2018", "FY 2017", "FY 2016", "FY 2015", "FY 2014", "FY 2013", "FY 2012", "FY 2011", "FY 2010", "FY 2009", "FY 2008"]
    elements = context.browser.find_elements_by_xpath(xpath)
    values = []
    for elem in elements:
        values.append(elem.get_attribute("textContent"))
    for item in dropdown:
        assert_that(item in values)

@when('I see the Total Transaction amount')
def step_impl(context):
    xpath = '//*[@id="recipient-overview"]/div/div[2]/div[1]/div[1]'
    wait_for_xpath(context, xpath)
    amount = context.browser.find_element_by_xpath(xpath).get_attribute('innerHTML')
    print(amount)
    context.amount = amount

@then('I see the Total Transaction amount updated')
def step_impl(context):
    xpath = '//*[@id="recipient-overview"]/div/div[2]/div[1]/div[1]'
    wait_for_xpath(context, xpath)
    amount = context.browser.find_element_by_xpath(xpath).get_attribute('innerHTML')
    print(amount)
    assert_that(amount != context.amount)