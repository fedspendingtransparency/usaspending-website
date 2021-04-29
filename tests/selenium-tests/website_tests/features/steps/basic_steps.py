from behave import *
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException, UnexpectedAlertPresentException
from hamcrest import assert_that, equal_to, is_not
import time
import os

from xpath import XPATH_DICT, TIMING_DICT

def highlight(element):
    scroll_to(element)
    driver = element._parent
    def apply_style(s):
        driver.execute_script("arguments[0].setAttribute('style', arguments[1]);",element, s)
    original_style = element.get_attribute('style')
    apply_style("background: yellow; border: 2px solid red;")
    time.sleep(.5)
    apply_style(original_style)
    return element


def scroll_to(element):
    hover = ActionChains(element._parent).move_to_element(element)
    hover.perform()
    time.sleep(.2) # necessary to give it time to scroll
    return element



class Error(Exception):
    pass

def wait_for_xpath(context, xpath, timeout_secs = 30):
    try:
        xpath_element_is_present = expected_conditions.presence_of_element_located((By.XPATH,xpath))
        WebDriverWait(context.browser, timeout_secs).until(xpath_element_is_present)
    except TimeoutException as te:
        message = 'Timed out after waiting {} seconds for xpath "{}" to load'.format(timeout_secs, xpath)
        raise TimeoutException(message) from te


def wait_for_class_name(context, class_name, timeout_secs = 30):
    try:
        class_name_element_is_present = expected_conditions.presence_of_element_located((By.CLASS_NAME,class_name))
        WebDriverWait(context.browser, timeout_secs).until(class_name_element_is_present)
    except TimeoutException as te:
        message = 'Timed out after waiting {} seconds for class_name "{}" to load'.format(timeout_secs, class_name)
        raise TimeoutException(message) from te


def wait_for_id(context, id, timeout_secs = 30):
    try:
        id_element_is_present = expected_conditions.presence_of_element_located((By.ID,id))
        WebDriverWait(context.browser, timeout_secs).until(id_element_is_present)
    except TimeoutException as te:
        message = 'Timed out after waiting {} seconds for id "{}" to load'.format(timeout_secs, id)
        raise TimeoutException(message) from te


def wait_for_clickable(context, xpath, timeout_secs=30):
    try:
        xpath_element_is_present = expected_conditions.element_to_be_clickable((By.XPATH,xpath))
        WebDriverWait(context.browser, timeout_secs).until(xpath_element_is_present)
    except TimeoutException as te:
        message = 'Timed out after waiting {} seconds for xpath "{}" to load'.format(timeout_secs, xpath)
        raise TimeoutException(message) from te

def find_hidden_element(context, xpath, timeout_secs=30):
    context.browser.find_element_by_id(xpath)

@given('On the homepage')
def step_impl(context):
    context.browser.command_executor._commands["send_command"] = ("POST", '/session/$sessionId/chromium/send_command')
    params = {'cmd': 'Page.setDownloadBehavior', 'params': {'behavior': 'allow', 'downloadPath': context.path}}
    command_result = context.browser.execute("send_command", params)
    context.browser.get("https://" + context.page)

@given('on the "{page}" page')
def step_impl(context, page):
    try:
        context.browser.command_executor._commands["send_command"] = ("POST", '/session/$sessionId/chromium/send_command')
        params = {'cmd': 'Page.setDownloadBehavior', 'params': {'behavior': 'allow', 'downloadPath': context.path}}
        command_result = context.browser.execute("send_command", params)
        context.browser.get('https://' + page)
    except UnexpectedAlertPresentException:
        alert = context.browser.switch_to.alert
        alert.accept()

@when('I refresh the page')
def step_impl(context):
    context.browser.refresh()

@when('scroll to top')
def step_impl(context):
    context.browser.execute_script("window.scrollBy(0, -window.innerHeight);")
    # context.browser.save_screenshot("screenshot.png")

@when('we click on {element}')
def step_impl(context, element):
    element_xpath = XPATH_DICT.get(element)
    if not element_xpath:
        raise Error("Xpath not found in XPATH_DICT")
    wait_for_clickable(context, element_xpath)
    target = context.browser.find_element_by_xpath(element_xpath)
    assert_that(target is not None)
    move_to = ActionChains(context.browser).move_to_element(target)
    move_to.perform()
    time.sleep(.5) # wait to move-to-element
    target.click()
    timing = TIMING_DICT.get(element)
    if timing:
        time.sleep(timing)

@when('I click on {element}')
def step_impl(context, element):
    element_xpath = XPATH_DICT.get(element)
    if not element_xpath:
        raise Error("Xpath not found in XPATH_DICT")
    wait_for_clickable(context, element_xpath)
    target = context.browser.find_element_by_xpath(element_xpath)
    assert_that(target is not None)
    # context.browser.execute_script("return arguments[0].scrollIntoView();", target)
    # context.browser.execute_script("window.scrollBy(0, -150);")
    assert_that(target.is_displayed())
    target.click()

    timing = TIMING_DICT.get(element)
    if timing:
        time.sleep(timing)

@when('we type "{text}" into "{element}"')
def step_impl(context, text, element):
    element_xpath = XPATH_DICT[element]
    wait_for_xpath(context, element_xpath)
    target = context.browser.find_element_by_xpath(element_xpath)
    assert_that(target is not None)
    assert_that(target.is_displayed())
    target.send_keys(text)
    timing = TIMING_DICT[element]
    # print(timing)
    if timing > 0:
        time.sleep(timing)
    target.send_keys(Keys.ENTER)

@when('we start to type "{text}" into "{element}"')
def step_impl(context, text, element):
    element_xpath = XPATH_DICT[element]
    wait_for_xpath(context, element_xpath)
    target = context.browser.find_element_by_xpath(element_xpath)
    assert_that(target is not None)
    assert_that(target.is_displayed())
    target.send_keys(text)
    timing = TIMING_DICT[element]
    # print(timing)
    if timing > 0:
        time.sleep(timing)
    # do not submit the text
    #target.send_keys(Keys.ENTER)

@when('we hover over {element}')
def step_impl(context, element):
    element_xpath = XPATH_DICT[element]
    action = ActionChains(context.browser)
    wait_for_xpath(context, element_xpath)
    target = context.browser.find_element_by_xpath(element_xpath)
    context.browser.execute_script("return arguments[0].scrollIntoView();", target)
    context.browser.execute_script("window.scrollBy(0, -150);")
    action.move_to_element(target)
    action.perform()

@when('we hover on {element} then click {element2}')
def step_impl(context, element, element2):
    element_xpath = XPATH_DICT[element]
    element2_xpath = XPATH_DICT[element2]
    action = ActionChains(context.browser)
    wait_for_xpath(context, element_xpath)
    action.move_to_element(context.browser.find_element_by_xpath(element_xpath))
    wait_for_xpath(context, element2_xpath)
    action.click(context.browser.find_element_by_xpath(element2_xpath))
    action.perform()

@then('we see that {element} has a value of {value}')
def step_impl(context, element, value):
    element_xpath = XPATH_DICT[element]
    wait_for_xpath(context, element_xpath, 30)
    target = context.browser.find_element_by_xpath(element_xpath)
    assert_that(target is not None)
    content = target.get_attribute('textContent').strip()
    assert_that(content,equal_to(value))

@then('we see classname {class_name} has a value of {value}')
def step_impl(context, class_name, value):
    wait_for_class_name(context, class_name)
    target = context.browser.find_element_by_class_name(class_name)
    assert_that(target is not None)
    content = target.get_attribute('textContent').strip()
    assert_that(value in content, "expected classname {} value {} to be contained in {}".format(class_name, value, content))

@then('we see that {element} does not have a value')
def step_impl(context, element):
    element_xpath = XPATH_DICT[element]
    wait_for_xpath(context, element_xpath, 30)
    target = context.browser.find_element_by_xpath(element_xpath)
    assert_that(target is not None)
    content = target.get_attribute('textContent').strip()
    assert_that(content,equal_to(''))

@then('we see that {element} is displayed')
def step_impl(context, element):
    element_xpath = XPATH_DICT[element]
    wait_for_xpath(context, element_xpath, 30)
    target = context.browser.find_element_by_xpath(element_xpath)
    context.browser.execute_script("return arguments[0].scrollIntoView();", target)
    context.browser.execute_script("window.scrollBy(0, -150);")
    assert_that(target is not None)
    assert_that(target.is_displayed())

@then('we see that "{element}" is displayed in glossary search results')
def step_impl(context, element):
    results_locator = '//*[@class="glossary-link"]'
    results = context.browser.find_elements_by_xpath(results_locator)
    for result in results:
        link_text = result.text
        assert_that(element in link_text)

@then('we see that {element} is NOT displayed')
def step_impl(context, element):
    element_xpath = XPATH_DICT[element]
    time.sleep(1)
    target = context.browser.find_elements_by_xpath(element_xpath)
    assert_that(target == [])

@when('I click the top banner for "{primary_nav}" then "{sub_nav}"')
def step_impl(context, primary_nav, sub_nav):
    major_xpath = '//div[@class = "nav-dropdown__parent-label" and text() = "{}"]/parent::button'.format(primary_nav)
    minor_xpath = '//a[@class = "nav-children__link " and text() = "{}"]'.format(sub_nav)
    action = ActionChains(context.browser)
    wait_for_xpath(context, major_xpath)
    action.move_to_element(context.browser.find_element_by_xpath(major_xpath))
    wait_for_xpath(context, minor_xpath)
    action.click(context.browser.find_element_by_xpath(minor_xpath))
    action.perform()

@given('click logo')
def step_impl(context):
    xpath = '//a[@class="site-logo__link"]'
    wait_for_clickable(context, xpath)
    context.browser.find_element_by_xpath(xpath).click()


# CMM: this step is used throughout on many pages. Be mindful when changing.
@then('I get a top header for "{header_text}"')
def step_impl(context, header_text):
    wait_for_xpath(context, '//*[@id="main-focus" and text() = "{}"]'.format(header_text))
    header_elem = context.browser.find_element_by_xpath('(//*[@id="main-focus"])//h1')
    assert_that(header_elem.text, equal_to(header_text))


@when('I select the FY checkbox for "{fiscal_year}"')
def step_impl(context, fiscal_year):
    xpath = '//input[@class="fy-option-checkbox" and @value="FY {}"]'.format(fiscal_year)
    wait_for_xpath(context, xpath)
    fy_tick_box = context.browser.find_element_by_xpath(xpath)
    fy_tick_box.click()


@when('I select date range of Today to Today')
def step_impl(context):
    start_index = 1
    end_index = 2
    # select Date Range
    date_range_locator = '//*[@id="filter-date-range-tab"]'
    context.browser.find_element_by_xpath(date_range_locator).click()
    # select start calendar
    calendar_locator_template = '(//a[@class="usa-da-icon picker-icon date"])[{}]'
    start_calendar_locator = calendar_locator_template.format(start_index)
    context.browser.find_element_by_xpath(start_calendar_locator).click()
    # select today
    today_locator_template = '(//div[contains(@class, "today")])[{}]'
    start_today_locator = today_locator_template.format(start_index)
    context.browser.find_element_by_xpath(start_today_locator).click()
    # select end calendar
    calendar_locator_template = '(//a[@class="usa-da-icon picker-icon date"])[{}]'
    start_calendar_locator = calendar_locator_template.format(end_index)
    context.browser.find_element_by_xpath(start_calendar_locator).click()
    # select today
    today_locator_template = '(//div[contains(@class, "today")])[{}]'
    start_today_locator = today_locator_template.format(end_index)
    context.browser.find_element_by_xpath(start_today_locator).click()
    # select Date search
    search_locator = '//button[@class="set-date-submit"]'
    context.browser.find_element_by_xpath(search_locator).click()


@when('I click the "{filter_name}" filter dropdown')
def step_impl(context, filter_name):
    time.sleep(1) # wait for background loading of html
    xpath = '//*[@class="filter-toggle__button " and contains(@title,"{}")]'.format(filter_name)
    wait_for_xpath(context, xpath)
    button = highlight(context.browser.find_element_by_xpath(xpath))
    button.click()
    wait_for_xpath(context, '(//*[contains(@aria-label, "{}")]//input)[1]'.format(filter_name))


@when('I add the zip code "{zip_code}" to my Advanced Search query')
def step_impl(context, zip_code):
    xpath = '//input[@id="location-picker-zip"]'
    wait_for_xpath(context, xpath)
    zip_field = context.browser.find_element_by_xpath(xpath)
    zip_field.send_keys(zip_code)
    zip_field.send_keys(Keys.ENTER)


@when('I hit Submit Search')
def step_impl(context):
    context.browser.execute_script("window.scrollTo(0, 0);")
    xpath = '//button[@class="submit-button"]'
    wait_for_xpath(context, xpath)
    submit_search_button = WebDriverWait(context.browser, 20).until(
        expected_conditions.element_to_be_clickable((By.XPATH, xpath)))
    submit_search_button.click()

@when('we wait for {element} to appear')
def step_impl(context, element):
    """
    Waits for an element to appear on the page, times out after 1 minutes

    Parameters
    -----------
    element : string
        name of the element that is expected to appear
    """
    element_xpath = XPATH_DICT[element]
    wait = True
    timing = 0
    while wait and timing < 60:
        try:
            target = context.browser.find_element_by_xpath(element_xpath)
        except:
            timing = timing + 1
            time.sleep(1)
            continue
        if (target.is_displayed()):
            wait = False
            break

    assert_that(not wait)

@when('I wait for {class_name} to load')
def step_impl(context, class_name):
    wait = True
    timing = 0
    while wait and timing < 30:
        objects = context.browser.find_elements_by_class_name(class_name)
        if objects:
            wait = False
        timing = timing + 1
        time.sleep(1)
    time.sleep(1)
    assert_that(not wait)

@when('we wait for {element} to have a value of {value}')
def step_impl(context, element, value):
    element_xpath = XPATH_DICT[element]
    value_match = False
    timing = 0
    wait_for_xpath(context, element_xpath)
    target = context.browser.find_element_by_xpath(element_xpath)
    target_value = target.get_attribute('textContent')
    print(target_value)
    while not value_match and timing < 120:
        wait_for_xpath(context, element_xpath)
        target = context.browser.find_element_by_xpath(element_xpath)
        target_value = target.get_attribute('textContent')
        if target_value == value:
            value_match = True
            break
        else:
            time.sleep(1)
        timing = timing + 1
    error = "Error: {} did not change to a value of {} in 2 minutes".format(element, value)
    assert_that(value_match, error)

@when('Follow download link in {element}')
def step_impl(context, element):
    element_xpath = XPATH_DICT[element]
    wait_for_xpath(context, element_xpath)
    target = context.browser.find_element_by_xpath(element_xpath)
    assert_that(target is not None)
    link = target.get_attribute('href')
    print(link)
    context.browser.find_element_by_tag_name('html').send_keys(Keys.COMMAND + 't')
    context.browser.get(link)
    context.browser.find_element_by_css_selector('html').send_keys(Keys.CONTROL + Keys.SHIFT + Keys.TAB)

@then('we see that {element} contains "{value}"')
def step_impl(context, element, value):
    element_xpath = XPATH_DICT[element]
    wait_for_xpath(context, element_xpath, 30)
    target = context.browser.find_element_by_xpath(element_xpath)
    assert_that(target is not None)
    content = target.get_attribute('innerHTML')
    assert_that(value in content, 'Element did not contain "{}", found "{}" instead'.format(value, content))

@when('Wait for download to complete')
def step_impl(context):
    wait = True
    count = 0
    print(context.download_count)
    while wait and count < 120:
        download = os.listdir(context.path)
        if '.DS_Store' in download:
            download.remove('.DS_Store')
        if len(download) > context.download_count:
            wait = False
        count = count + 1
        time.sleep(1)

    download = os.listdir(context.path)
    if '.DS_Store' in download:
        download.remove('.DS_Store')
    context.download_count = len(download)
    assert_that(not wait, "File did not download within 2 minutes")


@then('we see that {element} does not have a value of {value}')
def step_impl(context, element, value):
    element_xpath = XPATH_DICT[element]
    wait_for_xpath(context, element_xpath, 30)
    target = context.browser.find_element_by_xpath(element_xpath)
    assert_that(target is not None)
    content = target.get_attribute('textContent').strip()
    assert_that(value, is_not(equal_to(content)))

@when('we wait for {element} to vanish')
def step_impl(context, element):
    element_xpath = XPATH_DICT[element]
    wait = True
    timing = 0
    while wait and timing < 120:
        try:
            context.browser.find_element_by_xpath(element_xpath)
        except:
            wait = False
            break
        timing = timing + 1
        time.sleep(1)
    time.sleep(1)
    assert_that(not wait, "{} did not vanish within two minutes".format(element))

@then('we see that {element} is disabled')
def step_impl(context, element):
    element_xpath = XPATH_DICT.get(element)
    if not element_xpath:
        raise Error("Xpath not found in XPATH_DICT")
    wait_for_xpath(context, element_xpath, 30)
    target = context.browser.find_element_by_xpath(element_xpath)
    context.browser.execute_script("return arguments[0].scrollIntoView();", target)
    context.browser.execute_script("window.scrollBy(0, -150);")
    assert_that(target is not None)
    assert_that(target.is_displayed())
    disabled = target.get_attribute('aria-disabled')
    if disabled:
        assert_that(disabled, "Element {} is not disabled".format(element))
    else:
        assert_that(target.get_attribute('disabled').encode('utf-8') == b'true')


@when('I type "{text}" into "{element}"')
def step_impl(context, text, element):
    element_xpath = XPATH_DICT.get(element)
    if not element_xpath:
        raise Error("Xpath not found in XPATH_DICT")
    wait_for_xpath(context, element_xpath)
    target = context.browser.find_element_by_xpath(element_xpath)
    assert_that(target is not None, "{} not found, xpath: {}".format(element, element_xpath))
    assert_that(target.is_displayed(), "{} not displayed, xpath: {}".format(element, element_xpath))
    target.send_keys(text)
    timing = TIMING_DICT.get(element)
    if timing:
        time.sleep(timing)

@then('we see that "{element}" {boolean} checked')
def step_impl(context, element, boolean):
    element_xpath = XPATH_DICT[element]
    wait_for_xpath(context, element_xpath, 30)
    target = context.browser.find_element_by_xpath(element_xpath)
    context.browser.execute_script("return arguments[0].scrollIntoView();", target)
    context.browser.execute_script("window.scrollBy(0, -150);")
    assert_that(target is not None)
    assert_that(target.is_displayed())
    disabled = target.get_attribute('checked')
    if boolean == "is":
        assert_that(disabled, "Element {} is not checked".format(element))
    elif boolean == "isn't":
        assert_that(not disabled, "Element {} is checked".format(element))

@when('Click toggle {toggle}')
def step_impl(context, toggle):
    element_xpath = XPATH_DICT[toggle]
    wait_for_xpath(context, element_xpath, 30)
    target = context.browser.find_element_by_xpath(element_xpath)
    context.browser.execute_script("return arguments[0].scrollIntoView();", target)
    context.browser.execute_script("window.scrollBy(0, -150);")
    assert_that(target is not None)
    assert_that(target.is_displayed())
    expanded = target.get_attribute('aria-expanded')
    if expanded == "false":
        target.click()

@when('{Check} the "{toggle}"')
def step_impl(context, Check, toggle):
    element_xpath = XPATH_DICT[toggle]
    wait_for_xpath(context, element_xpath, 30)
    target = context.browser.find_element_by_xpath(element_xpath)
    context.browser.execute_script("return arguments[0].scrollIntoView();", target)
    context.browser.execute_script("window.scrollBy(0, -150);")
    assert_that(target is not None)
    assert_that(target.is_displayed())
    checked = target.get_attribute('checked')
    print(checked)
    if checked == "false" and Check == "Check":
        target.click()
    elif checked == "true" and Check == "Uncheck":
        target.click()

@then('we see that xpath {xpath} has an attribute {attribute} with a value of {value}')
def step_impl(context, xpath, attribute, value):
    element_xpath = XPATH_DICT.get(xpath)
    if not element_xpath:
        raise Error("Xpath not found in XPATH_DICT")
    attr = element_xpath.get_attribute(attribute).encode('utf-8')
    assert_that(attr, equal_to(attribute))

@then('classname {element} is displayed')
def step_impl(context, element):
    wait_for_class_name(context, element, timeout_secs=120)
    target = context.browser.find_element_by_class_name(element)
    assert_that(target is not None)
    assert_that(target.is_displayed)

@when('classname {element} is clicked')
def step_impl(context, element):
    wait_for_class_name(context, element)
    target = context.browser.find_element_by_class_name(element)
    assert_that(target is not None)
    assert_that(target.is_displayed)
    context.browser.execute_script("return arguments[0].scrollIntoView();", target)
    context.browser.execute_script("window.scrollBy(0, -150);")
    target.click()

@then('then we check element {element} has a url redirect of {page}')
def step_impl(context, element, page):
    element_xpath = XPATH_DICT.get(element)
    if not element_xpath:
        raise Error("Xpath not found in XPATH_DICT")
    wait_for_clickable(context, element_xpath)
    target = context.browser.find_element_by_xpath(element_xpath)
    assert_that(target is not None)
    redirect = target.get_attribute('href')
    print('redirect: {0}'.format(redirect))
    print('target: {0}'.format(target))
    assert_that(redirect, equal_to(page))

@when('I type {text} into classname {element}')
def step_impl(context, text, element):
    wait_for_class_name(context, element)
    target = context.browser.find_element_by_class_name(element)
    assert_that(target is not None)
    target.send_keys(text)

@when('the text box classname {element} is cleared')
def step_impl(context, element):
    wait_for_class_name(context, element)
    target = context.browser.find_element_by_class_name(element)
    assert_that(target is not None)
    target.clear()

@when('hover over classname {element}')
def step_impl(context, element):
    action = ActionChains(context.browser)
    wait_for_class_name(context, element)
    target = context.browser.find_element_by_class_name(element)
    context.browser.execute_script("return arguments[0].scrollIntoView();", target)
    context.browser.execute_script("window.scrollBy(0, -150);")
    action.move_to_element(target)
    action.perform()

@then('object {num} of classname {element} has a value of {value}')
def step_impl(context, num, element, value):
    num = int(num)
    wait_for_class_name(context, element)
    targets = context.browser.find_elements_by_class_name(element)
    target = targets.pop(num-1)
    assert_that(target is not None)
    content = target.get_attribute('textContent').strip()
    assert_that(content,equal_to(value))

@when('object {num} of classname {element} is clicked')
def step_impl(context, num, element):
    num = int(num)
    wait_for_class_name(context, element)
    targets = context.browser.find_elements_by_class_name(element)
    target = targets.pop(num-1)
    assert_that(target is not None)
    assert_that(target.is_displayed)
    context.browser.execute_script("return arguments[0].scrollIntoView();", target)
    context.browser.execute_script("window.scrollBy(0, -150);")
    target.click()

@then('classname {element} has {num} objects present')
def step_impl(context, element, num):
    num = int(num)
    wait_for_class_name(context, element)
    targets = context.browser.find_elements_by_class_name(element)
    assert_that(len(targets), equal_to(num))

@when('id {element} is clicked')
def step_impl(context, element):
    wait_for_id(context, element)
    target = context.browser.find_element_by_id(element)
    assert_that(target is not None)
    assert_that(target.is_displayed)
    context.browser.execute_script("return arguments[0].scrollIntoView();", target)
    context.browser.execute_script("window.scrollBy(0, -150);")
    target.click()

@then('we see id {element} has a value of {value}')
def step_impl(context, element, value):
    wait_for_id(context, element)
    target = context.browser.find_element_by_id(element)
    assert_that(target.is_displayed())
    content = target.get_attribute('textContent').strip()
    assert_that(content,equal_to(value))

@then('id {element} is displayed')
def step_impl(context, element, value):
    wait_for_id(context, element)
    target = context.browser.find_element_by_id(element)
    assert_that(target.is_displayed())

@when('we click the back button')
def step_impl(context):
    context.browser.execute_script("window.history.go(-1)")

@then('check attribute {attr} of object {num} of classname {element} has a value of {value}')
def step_impl(context, num, element, attr, value):
    num = int(num)
    wait_for_class_name(context, element)
    targets = context.browser.find_elements_by_class_name(element)
    target = targets.pop(num-1)
    assert_that(target.is_displayed())
    content = target.get_attribute(attr)
    assert_that(content,equal_to(value))

@when('the tag {tag} of object {num} of classname {element} is clicked')
def step_impl(context, tag, num, element):
    num = int(num)
    wait_for_class_name(context, element)
    targets = context.browser.find_elements_by_class_name(element)
    target = targets.pop(num-1)
    target = target.find_element_by_tag_name(tag)
    assert_that(target.is_displayed())
    context.browser.execute_script("return arguments[0].scrollIntoView();", target)
    context.browser.execute_script("window.scrollBy(0, -150);")
    target.click()

@then('check tag {tag} of object {num} of classname {element} has a value of {value}')
def step_impl(context, tag, num, element, value):
    num = int(num)
    wait_for_class_name(context, element)
    targets = context.browser.find_elements_by_class_name(element)
    target = targets.pop(num-1)
    target = target.find_element_by_tag_name(tag)
    assert_that(target.is_displayed())
    txt = target.text
    assert_that(txt,equal_to(value))

@when('switch to tab number {num}')
def step_impl(context, num):
    context.feature.home_tab_title = context.page_obj.page_title()
    num = int(num)
    context.browser.switch_to.window(context.browser.window_handles[(num - 1)])

@then('the url has a value of {url}')
def step_impl(context, url):
    assert_that(context.browser.current_url, equal_to(url))

@then('copy url and go to new tab')
def step_impl(context):
    url = context.browser.current_url
    context.browser.execute_script("window.open('{0}')".format(url))
    context.browser.switch_to.window(context.browser.window_handles[1])

@then('close tab number {num}')
def step_impl(context, num):
    num = int(num)
    context.browser.switch_to.window(context.browser.window_handles[(num - 1)])
    context.browser.close()
