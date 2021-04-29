from behave import *
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from hamcrest import assert_that, equal_to
import time
import os
import zipfile
import csv

def wait_for_xpath(context, xpath):
    timeout_secs = 30
    xpath_element_is_present = expected_conditions.presence_of_element_located((By.XPATH,xpath))
    WebDriverWait(context.browser, timeout_secs).until(xpath_element_is_present)


def wait_for_clickable(context, xpath):
    timeout_secs = 30
    xpath_element_is_present = expected_conditions.element_to_be_clickable((By.XPATH,xpath))
    WebDriverWait(context.browser, timeout_secs).until(xpath_element_is_present)


@when('we see the number of rows')
def step_impl(context):
    xpath = '//div[contains(@class, "count-badge")]'

    wait_for_xpath(context, xpath)

    count_arr = context.browser.find_elements_by_xpath(xpath)
    assert_that(len(count_arr), equal_to(6))

    rows = {
        "Contracts": int(count_arr[0].get_attribute('innerHTML').replace(",", "")),
        "IDVs": int(count_arr[1].get_attribute('innerHTML').replace(",","")),
        "Grants": int(count_arr[2].get_attribute('innerHTML').replace(",", "")),
        "Direct Payments": int(count_arr[3].get_attribute('innerHTML').replace(",", "")),
        "Loans": int(count_arr[4].get_attribute('innerHTML').replace(",", "")),
        "Other": int(count_arr[5].get_attribute('innerHTML').replace(",", "")),
    }
    context.row_counts=rows

@when('we see the number of keyword rows')
def step_impl(context):
    time.sleep(3)
    xpath = '//div[@class="count-badge  active"]'
    xpath2 = '//div[@class="count-badge "]'

    wait_for_xpath(context, xpath)
    wait_for_xpath(context, xpath2)

    count1 = context.browser.find_element_by_xpath(xpath)
    count_arr = context.browser.find_elements_by_xpath(xpath2)
    assert_that(len(count_arr), equal_to(4))
    rows = {
        "Contracts": int(count1.get_attribute('innerHTML').replace(",", "")),
        "Grants": int(count_arr[0].get_attribute('innerHTML').replace(",", "")),
        "Direct Payments": int(count_arr[1].get_attribute('innerHTML').replace(",", "")),
        "Loans": int(count_arr[2].get_attribute('innerHTML').replace(",", "")),
        "Other": int(count_arr[3].get_attribute('innerHTML').replace(",", "")),
        "IDVs": 0,
    }
    context.row_counts=rows

@then('Files contain the correct number of rows')
def step_impl(context):

    myzip = zipfile.ZipFile(context.path + os.path.sep + context.file)

    if ("Contracts" in context.namelist[0]):
        contracts = context.namelist[0]
        assistance = context.namelist[1]
    else :
        contracts = context.namelist[1]
        assistance = context.namelist[0]

    myzip.extract(contracts, context.path)
    with open(context.path + os.path.sep + contracts, "r+", encoding='utf8') as mfile:
        reader = csv.reader(mfile, delimiter = ",")
        data = list(reader)
        r = len(data) - 1
# THIS ASSERT FAILS AND IS A KNOWN ISSUE.
        assert_that(r, equal_to(context.row_counts['Contracts'] + context.row_counts["IDVs"]), "All contracts")

    other = context.row_counts['Grants']+context.row_counts["Direct Payments"]+context.row_counts["Loans"]+context.row_counts['Other']
    myzip.extract(assistance, context.path)

    with open(context.path + os.path.sep + assistance, "r+", encoding='utf8') as mfile:
        reader = csv.reader(mfile, delimiter = ",")
        data = list(reader)
        r = len(data) - 1
        assert_that(r, equal_to(other), "All assistance")

@when('wait')
def step_impl(context):
    time.sleep(5)
