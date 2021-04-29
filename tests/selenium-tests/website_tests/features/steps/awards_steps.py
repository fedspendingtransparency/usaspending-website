from behave import *
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from hamcrest import assert_that, equal_to
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


@then('we see that {element1} and {element2} have the same value')
def step_impl(context, element1, element2):
    element1_xpath = XPATH_DICT[element1]
    element2_xpath = XPATH_DICT[element2]

    wait_for_xpath(context, element1_xpath, 30)
    wait_for_xpath(context, element2_xpath, 30)

    target1 = context.browser.find_element_by_xpath(element1_xpath)
    assert_that(target1 is not None)
    content1 = target1.get_attribute('textContent')
    target2 = context.browser.find_element_by_xpath(element2_xpath)
    assert_that(target2 is not None)
    content2 = target2.get_attribute('textContent')
    assert_that(content1.strip(), equal_to(content2.strip()))

@then('we see that the contract table headers for {tab} are correct')
def step_impl(context, tab):
    xpath = '//div[@class="ibt-header-cell"]/div/div/div/div'

    wait_for_xpath(context, xpath, 30)

    header_dict = {
        "Transaction History": ["Modification Number", "Action Date", "Amount", "Reason for Modification", "Description"],
        "Sub-Awards": ["Sub-Award ID", "Recipient Name", "Action Date", "Amount", "Description"],
        "Financial System Details": ["Submission Date", "Federal Account Name", "Treasury Account Symbol", "Program Activity", "Object Class", "Funding Obligated"]

    }
    results = context.browser.find_elements_by_xpath(xpath)
    
    headers = []
    
    for i in results:
        text = i.get_attribute('innerText')
        if text is not '':
            headers.append(text)

    assert_that(headers, equal_to(header_dict[tab]))

def sort_func(e):
    e = e.replace('$', '')
    e = e.replace(',', '')
    try:
        return(int(e))
    except ValueError:
        return e

@then('we see that the table is {reverse} sorted by column {number}')
def step_impl(context, number, reverse):
    xpath = '//*[@id="details-table-section"]/div[4]/div/div/div[2]/div/div/div/div/div[{}]/div/div'.format(number)
    wait_for_xpath(context, xpath)
    elements = context.browser.find_elements_by_xpath(xpath)

    content = []
    for elem in elements:
        content.append(elem.get_attribute('innerText'))

    sorted_content = content.copy()
    if reverse == "reverse":
        sorted_content.sort(reverse=True, key=sort_func)
    else:
         sorted_content.sort(key=sort_func)

    assert_that(content, equal_to(sorted_content))


@then('we see that the details table is {reverse} sorted by column {number}')
def step_impl(context, number, reverse):
    xpath = '//*[@id="details-table-section"]/div[4]/div/div[2]/div/div[2]/div/div/div/div/div[{}]'.format(number)
    wait_for_xpath(context, xpath)
    elements = context.browser.find_elements_by_xpath(xpath)

    content = []
    for elem in elements:
        content.append(elem.get_attribute('innerText'))
    
    sorted_content = content.copy()
    if reverse == "reverse":
        sorted_content.sort(reverse=True, key=sort_func)
    else:
        sorted_content.sort(key=sort_func)

    assert_that(content, equal_to(sorted_content))

@when('we click on column {number} {direction} sort')
def step_impl(context, number, direction):
    button = 1
    if direction == 'descending':
        button = 2
    xpath = '//*[@id="details-table-section"]/div[4]/div/div/div[1]/div/div/div[{}]/div/div/div/div[2]/button[{}]'.format(number, button)

    wait_for_xpath(context, xpath)
    
    arrow = context.browser.find_element_by_xpath(xpath)

    arrow.click()
    time.sleep(3)

@when('we click on details column {number} {direction} sort')
def step_impl(context, number, direction):
    button = 1
    if direction == 'descending':
        button = 2
    xpath = '//*[@id="details-table-section"]/div[4]/div/div[2]/div/div[1]/div/div/div[{}]/div/div/div/div[2]/button[{}]'.format(number, button)
    wait_for_xpath(context, xpath)
    arrow = context.browser.find_element_by_xpath(xpath)
    arrow.click()
    time.sleep(2)

@then('fail')
def step_impl(context):
    assert False 