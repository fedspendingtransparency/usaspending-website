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
from basic_steps import wait_for_xpath, wait_for_clickable, wait_for_class_name
from xpath import XPATH_DICT, TIMING_DICT

details_table = ['DUNS', 'Address', 'Business Types']

@then('find and verify pointer {num} on recipients page has a value of {value}')
def step_impl(context, num, value):
    num = int(num)
    action = ActionChains(context.browser)
    targets = context.browser.find_elements_by_class_name('usa-da-icon-info-circle')
    if len(targets) == 4:
        targets.pop(0)
    target = targets[num - 1]
    action.move_to_element(target)
    action.perform()
    wait_for_class_name(context, 'homepage-hero-tooltip__tooltip_text')
    text = context.browser.find_element_by_class_name('homepage-hero-tooltip__tooltip_text')
    text = text.text
    assert_that(text is not None)
    assert_that(text, equal_to(value))
    action.move_by_offset(0,-100)
    action.perform()

@when('recipient link {num} is clicked')
def step_impl(context, num):
    num = int(num)
    wait = True
    count = 0
    while wait and count < 5:
        try:
            wait_for_class_name(context, 'recipient-list__body-row')
            items = context.browser.find_elements_by_class_name('recipient-list__body-row')
            wait_for_class_name(context, 'recipient-list__body-cell')
            target = items[num - 1].find_element_by_class_name('recipient-list__body-cell')
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

@then('check when recipient link {num} is clicked the title in the redirected page is correct')
def step_impl(context, num):
    num = int(num)
    wait_for_class_name(context, 'recipient-list__body-row')
    items = context.browser.find_elements_by_class_name('recipient-list__body-row')
    wait_for_class_name(context, 'recipient-list__body-cell')
    target = items[num - 1].find_element_by_class_name('recipient-list__body-cell')
    assert_that(target.is_displayed())
    txt = target.text
    txt = txt[1:]
    target = target.find_element_by_tag_name('a')
    context.browser.execute_script("return arguments[0].scrollIntoView();", target)
    context.browser.execute_script("window.scrollBy(0, -150);")
    target.click()

    wait_for_class_name(context, 'recipient-overview__title')
    title_element = context.browser.find_element_by_class_name('recipient-overview__title')
    assert_that(title_element.is_displayed())
    title = title_element.text
    assert_that(txt in title)

@then('check recipient overview details table row titles')
def step_impl(context):
    wait_for_class_name(context, 'details__table')
    target = context.browser.find_element_by_class_name('details__table')
    targets = target.find_elements_by_tag_name('th')
    for item in targets:
        assert_that(item.text in details_table)

@then('check recipient page graph has the correct amount of bars present')
def step_impl(context):
    wait_for_class_name(context, 'x-axis')
    axis_labels = context.browser.find_elements_by_class_name('x-axis')
    wait_for_class_name(context, 'bar-item')
    bar_list = context.browser.find_elements_by_class_name('bar-item')
    if axis_labels[0].text == '':
        axis_labels.pop(0)

    active_button = context.browser.find_element_by_class_name('visualization-period')
    active_button = active_button.find_element_by_class_name('active').text

    if active_button == 'Years':
        assert_that(len(bar_list) > 11)
        assert_that(len(bar_list), equal_to(len(axis_labels)))
    elif active_button == 'Quarter':
        assert_that(len(bar_list) > 46)
    elif active_button == 'Month':
        assert_that(len(bar_list) > 140)
    else:
        raise Exception('Could not determine which graph period is currently active')

@then('check amount of trend lines and points')
def step_impl(context):
    wait_for_class_name(context, 'trendline-data')
    trend_class = context.browser.find_element_by_class_name('trendline-data')
    g = trend_class.find_elements_by_tag_name('g')
    point = trend_class.find_elements_by_class_name('point-item')

    active_button = context.browser.find_element_by_class_name('visualization-period')
    active_button = active_button.find_element_by_class_name('active').text

    if active_button == 'Years':
        assert_that(len(point) > 11)
    elif active_button == 'Quarter':
        assert_that(len(point) > 46)
    elif active_button == 'Month':
        assert_that(len(point) > 140)
    else:
        raise Exception('Could not determine which graph period is currently active')

    assert_that(len(point), equal_to((len(g)+1)/2))

@then('check recipient table {num} has 5 by 3 rows')
def step_impl(context, num):
    num = int(num)
    wait_for_class_name(context, 'category-table__table')
    tables = context.browser.find_elements_by_class_name('category-table__table')
    table = tables.pop(num-1)
    rows = table.find_elements_by_class_name('category-table__table-row')
    cells = table.find_elements_by_class_name('category-table__table-cell')
    assert_that(table.is_displayed())
    assert_that(len(rows), equal_to(5))
    assert_that(len(cells), equal_to(15))
