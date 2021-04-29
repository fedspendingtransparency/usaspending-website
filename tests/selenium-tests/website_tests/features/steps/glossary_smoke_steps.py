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
from basic_steps import highlight
from xpath import XPATH_DICT, TIMING_DICT

def wait_for_xpath(context, xpath):
    timeout_secs = 30
    xpath_element_is_present = expected_conditions.presence_of_element_located((By.XPATH,xpath))
    WebDriverWait(context.browser, timeout_secs).until(xpath_element_is_present)

def wait_for_clickable(context, xpath):
    timeout_secs = 30
    xpath_element_is_present = expected_conditions.element_to_be_clickable((By.XPATH,xpath))
    WebDriverWait(context.browser, timeout_secs).until(xpath_element_is_present)

@Then('we see the "Glossary Search Results"')
def step_impl(context):
    xpath = '//div[@class="glossary-search-results "]'
    glossaryResults = context.browser.find_element_by_xpath(xpath).get_attribute('innerHTML')
    print(glossaryResults)
    context.glossaryResults = glossaryResults

@Then('we see "More Resources" displayed')
def step_impl(context):
    xpath = '//*[@class = "glossary-resources"]'
    element = context.browser.find_element_by_xpath(xpath)
    assert_that(element.is_displayed())
    moreResources = element.get_attribute('innerHTML')
    context.moreResources = moreResources

@When('click "Glossary pink button"')
def step_impl(context):
    context.browser.execute_script("window.scrollTo(0,document.body.scrollHeight)")
    xpath = '//button[@class = "floating-glossary-button"]'
    action = ActionChains(context.browser)
    wait_for_xpath(context, xpath)
    action.move_to_element(context.browser.find_element_by_xpath(xpath))
    wait_for_xpath(context, xpath)
    action.click(context.browser.find_element_by_xpath(xpath))
    action.perform()

@Then('we validate each glossary link')
def step_impl(context):
    links_xpath = '//*[@class="glossary-link"]'
    link_count = len(find_all(context, links_xpath))
    for index in range(link_count):
        # Need to re-find link to prevent staleness
        link = highlight(find_all(context, links_xpath)[index])
        expectedName = link.text
        link.click()
        title_locator = '//*[@class = "definition-wrapper"]/h2'
        title = find(context, title_locator)
        actualName = title.text
        assert_that(actualName, equal_to(expectedName))
        # more resouces
        back_locator = '//*[@class="glossary-back"]'

        if has_any(context, '//*[text()="See also:"]/parent::node()/ul/li/a'):
            see_also_link_count = len(find_all(context, '//*[text()="See also:"]/parent::node()/ul/li/a', 2))


            for innerIndex in range(see_also_link_count):
                see_also_link = highlight(find_all(context, '//*[text()="See also:"]/parent::node()/ul/li/a')[innerIndex])
                expected_see_also_title = see_also_link.text
                see_also_link.click()
                see_also_title =  find(context, title_locator)
                actual_see_also_title = see_also_title.text
                try:
                    assert_that(actual_see_also_title, equal_to(expected_see_also_title))
                except AssertionError as err:
                    # if link target title doesn't match, look for some other page that might match.
                    a_locator = '//*[@title = "Official Definition"]'
                    find(context, a_locator).click()
                    a_title = find(context, title_locator).text
                    assert_that(a_title, equal_to(expected_see_also_title), "link title: {} doesn't equal some target's title: {} or {}".format(expected_see_also_title, see_also_title, a_title))

                find(context, back_locator).click()
                link = highlight(find_all(context, links_xpath)[index])
                link.click()

        # more resources has a couple different formats, they are all correct so look for all of them
        elif has_any(context, '//*[contains(text(), "See Also: ")]/a'):
            see_also_link_count = len(find_all(context, '//*[contains(text(), "See Also: ")]/a', 2))


            for innerIndex in range(see_also_link_count):
                see_also_link = highlight(find_all(context, '//*[contains(text(), "See Also: ")]/a')[innerIndex])
                expected_see_also_title = see_also_link.text
                see_also_link.click()
                see_also_title =  find(context, title_locator)
                actual_see_also_title = see_also_title.text
                try:
                    assert_that(actual_see_also_title, equal_to(expected_see_also_title))
                except AssertionError as err:
                    # if link target title doesn't match, look for some other page that might match.
                    a_locator = '//*[@title = "Official Definition"]'
                    find(context, a_locator).click()
                    a_title = find(context, title_locator).text
                    assert_that(a_title, equal_to(expected_see_also_title), "link title: {} doesn't equal some target's title: {} or {}".format(expected_see_also_title, see_also_title, a_title))

                find(context, back_locator).click()
                link = highlight(find_all(context, links_xpath)[index])
                link.click()


        back = find(context, back_locator)
        back.click()


def has_any(context, locator):
    return len(context.browser.find_elements_by_xpath(locator)) > 0

def find_all(context, locator, how_long = 30):
        time.sleep(.500)
        xpath_elements_are_present = expected_conditions.presence_of_all_elements_located((By.XPATH, locator))
        elements = WebDriverWait(context.browser, how_long).until(xpath_elements_are_present)
        return elements


def find(context, locator, how_long = 30):
        xpath_element_is_present = expected_conditions.presence_of_element_located((By.XPATH, locator))
        element = WebDriverWait(context.browser, how_long).until(xpath_element_is_present)
        highlight(element)
        return element
