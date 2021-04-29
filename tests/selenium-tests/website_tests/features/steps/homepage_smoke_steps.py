from behave import *
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from hamcrest import assert_that, equal_to
import time
from xpath import XPATH_DICT
from basic_steps import wait_for_clickable, wait_for_xpath

@when('Select "{search}" in dropdown')
def step_impl(context, search):
    xpath = '//button[@class="feature-dropdown__button "]'
    wait_for_xpath(context, xpath)
    button = context.browser.find_element_by_xpath(xpath)
    assert_that(button.is_displayed())

    xpath= '//div[@class="feature-profile"]'
    head = context.browser.find_element_by_xpath(xpath)

    move = ActionChains(context.browser).move_to_element(head)
    move.perform()
    time.sleep(1)

    hover = ActionChains(context.browser).move_to_element(button)
    hover.perform()

    if search == "advanced":
        xpath = '//a[@href="#/search" and @class="feature-dropdown-item__link"]'
    else:
        xpath = '//a[@href="#/keyword_search" and @class="feature-dropdown-item__link"]'
    wait_for_xpath(context, xpath)
    link = context.browser.find_element_by_xpath(xpath)
    link.click()
    time.sleep(1)

@then('check keyword header')
def step_impl(context):
    wait_for_xpath(context, '//div[@class="keyword-header__title"]/h1')
    header_elem = context.browser.find_element_by_xpath('//div[@class="keyword-header__title"]/h1')
    assert_that(header_elem.text, equal_to("Keyword Search"))

@then('"{detail}" is displayed')
def step_impl(context, detail):
    xpath = '//div[@class="homepage-download__button-label" and text()="{}"]'.format(detail)
    wait_for_xpath(context, xpath)
    elem = context.browser.find_element_by_xpath(xpath)
    assert_that(elem is not None)

@then('we see that link in {element} displays "{URL}"')
def step_impl(context, element, URL):
    xpath = XPATH_DICT[element]
    wait_for_xpath(context, xpath)
    target = context.browser.find_element_by_xpath(xpath)
    link = target.get_attribute('href')

    assert_that(URL, equal_to(link), "Link does not match expected URL")
