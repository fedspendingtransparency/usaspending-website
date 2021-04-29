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


titles    = {  'Total Awarded Amount'           :'',
                'DetailsInformation'            :'',
                'Award Breakdown'               :'',
                'Primary Place of Performance'  :'',
            }

headers   = {   'Award Type'    :'',
                'Amount'        :'',
                'Count'         :'',
            }

col_names = {   'Direct Payments'               : '',
                'Contracts'                     : '',
                'Grants'                        : '',
                'Other Financial Assistance'    : '',
                'Loans'                         : '',
            }

details_table = {   'Population'                : '',
                    'Awarded Amount Per Capita' : '',
                    'Median Household Income'   : '',
                }

top5_names = {  'Awarding Agencies'         : '',
                'Recipients'                : '',
                'CFDA Programs'             : '',
                'NAICS Codes'               : '',
                'Counties'                  : '',
                'Congressional Districts'   : '',
            }

top5_tabs = {   'All Awards'                    : '',
                'Contracts'                     : '',
                'Grants'                        : '',
                'Direct Payments'               : '',
                'Other Financial Assistance'    : '',
                'Loans'                         : '',
            }


def get_main_content(context):
    return context.browser.find_element_by_id('main-content')

def check_valid_names(context, found_items, ref_dict):
    for item in found_items:
        txt = item.text
        assert_that(txt in ref_dict)

def find_bars_expected(context):
    wait_for_class_name(context, 'x-axis')
    bar_list = context.browser.find_elements_by_class_name('x-axis')
    years = len(bar_list) - 1
    return [years, years*4, years*12]

@when('state {state} is clicked')
def step_impl(context, state):
    wait_for_class_name(context, 'state-list__body-cell')
    items = context.browser.find_elements_by_class_name('state-list__body-cell')
    target = None
    count = 0
    for item in items:
        if count % 3 == 0:
            target = item.find_element_by_tag_name('a')
            name = target.text
            if name == state:
                break
        count += 1
    assert_that(target is not None)
    assert_that(name, equal_to(state))
    context.browser.execute_script("return arguments[0].scrollIntoView();", target)
    context.browser.execute_script("window.scrollBy(0, -150);")
    target.click()

@when('the sidebar dropdown filter {value} is selected')
def step_impl(context, value):
    wait_for_class_name(context, 'fy-picker__item')
    options = context.browser.find_elements_by_class_name('fy-picker__item')
    selection = None
    for item in options:
        option = item.get_attribute('value')
        if option == value:
            selection = item
    assert_that(options is not None)
    assert_that(selection is not None)
    selection.click()

@then('check overview title names')
def step_impl(context):
    wait_for_class_name(context, 'state-overview__heading')
    targets = context.browser.find_elements_by_class_name('state-overview__heading')
    assert_that(len(targets), equal_to(4))
    check_valid_names(context, targets, titles)

@then('check table headers and column names in breakdown section')
def step_impl(context):
    wait_for_class_name(context, 'award-breakdown-table__header-cell')
    headers_found = context.browser.find_elements_by_class_name('award-breakdown-table__header-cell')
    assert_that(len(headers_found), equal_to(3))
    check_valid_names(context, headers_found, headers)

    wait_for_class_name(context, 'award-breakdown-table__data')
    cols_found = context.browser.find_elements_by_class_name('award-breakdown-table__data')
    count = 0
    left_col = []
    for item in cols_found:
        if count % 3 == 0:
            left_col.append(item)
        count += 1
    assert_that(len(left_col), equal_to(5))
    check_valid_names(context, left_col, col_names)

@then('check names in details table')
def step_impl(context):
    wait_for_class_name(context, 'details__table')
    target = context.browser.find_element_by_class_name('details__table')
    names = target.find_elements_by_tag_name('th')
    assert_that(len(names),equal_to(3))
    check_valid_names(context, names, details_table)

@then('check table names in top5')
def step_impl(context):
    wait_for_class_name(context, 'category-table__title-name')
    targets = context.browser.find_elements_by_class_name('category-table__title-name')
    assert_that(len(targets), equal_to(6))
    check_valid_names(context, targets, top5_names)

@then('check all tables are present and have the correct amount of rows and properly labeled headers for each tab')
def step_impl(context):
    time.sleep(5)
    wait_for_class_name(context, 'table-type-toggle')
    buttons = context.browser.find_elements_by_class_name('table-type-toggle')
    assert_that(len(buttons), equal_to(6))
    check_valid_names(context, buttons, top5_tabs)
    for tab in buttons:
        context.browser.execute_script("return arguments[0].scrollIntoView();", tab)
        context.browser.execute_script("window.scrollBy(0, -150);")
        assert_that(tab.is_displayed())
        tab.click()
        time.sleep(1)
        wait_for_class_name(context, 'category-table')
        tables = context.browser.find_elements_by_class_name('category-table')
        for item in tables:
            wait_for_class_name(context, 'category-table__table-body')
            table = item.find_element_by_class_name('category-table__table-body')
            wait_for_class_name(context, 'category-table__table-row')
            rows  = table.find_elements_by_class_name('category-table__table-row')
            wait_for_class_name(context, 'category-table__table-cell')
            cells = table.find_elements_by_class_name('category-table__table-cell')
            assert_that(len(rows), equal_to(5))
            assert_that(len(cells), equal_to(15))

@then('check bars for presence and formatting')
def step_impl(context):
    wait_for_class_name(context, 'period-button')
    graph_buttons = context.browser.find_elements_by_class_name('period-button')
    assert_that(len(graph_buttons), equal_to(3))
    count = 0
    amount_of_bars_expected = find_bars_expected(context)
    for button in graph_buttons:
        context.browser.execute_script("return arguments[0].scrollIntoView();", button)
        context.browser.execute_script("window.scrollBy(0, -150);")
        assert_that(button.is_displayed())
        button.click()
        wait_for_class_name(context, 'bar-item')
        bar_list = context.browser.find_elements_by_class_name('bar-item')
        hover_boxes = context.browser.find_elements_by_class_name('hover-hitbox')
        total_years = len(bar_list)
        assert_that(total_years, equal_to(len(hover_boxes)))
        assert_that(total_years >= (amount_of_bars_expected[count]))
        count += 1

@then('check the award breakdown tree map for presence of boxes and hover boxes')
def step_impl(context):
    wait_for_class_name(context, 'treemap-svg')
    target = context.browser.find_element_by_class_name('treemap-svg')
    boxes = target.find_elements_by_class_name('category')
    for box in boxes:
        if box.text != '':
            assert_that(box.text in col_names)
