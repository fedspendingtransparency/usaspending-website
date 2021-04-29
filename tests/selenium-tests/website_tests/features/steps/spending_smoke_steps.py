from behave import *
from steps.utils import latest_fiscal_year
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from hamcrest import assert_that, equal_to
from delayed_assert import expect
from selenium.common.exceptions import TimeoutException
import time
import datetime
# from fiscalyear import *
from basic_steps import wait_for_xpath, wait_for_clickable, wait_for_class_name
from utils import latest_fiscal_year, quarter_display_ranges, current_month
from xpath import XPATH_DICT, TIMING_DICT
import math

@when('Navigate to Spending Explorer')
def step_impl(context):
    """
    Click on the header to get to the spending explorer page
    """
    xpath = '//a[@class="full-menu__link" and @href="#/explorer"]'

    wait_for_xpath(context, xpath)
    wait_for_clickable(context, xpath)

    nav = context.browser.find_element_by_xpath(xpath)
    nav.click()

@when('Review three entry points')
def step_impl(context):
    """
    Checks that the three panels on the spending explorer page are displayed
    """
    xpath = '//h2[@class="landing-option__title"]'
    wait_for_xpath(context, xpath)
    header = context.browser.find_elements_by_xpath(xpath)

    assert_that(header[0].is_displayed())
    assert_that(header[1].is_displayed())
    assert_that(header[2].is_displayed())
    assert_that(header[0].text, equal_to("Budget FunctionIcon Depicting a Glossary Book"))
    assert_that(header[1].text, equal_to("AgencyIcon Depicting a Glossary Book"))
    assert_that(header[2].text, equal_to("Object ClassIcon Depicting a Glossary Book"))

    xpath = '//a[@class="landing-option__button"]'
    wait_for_xpath(context, xpath)
    buttons = context.browser.find_elements_by_xpath(xpath)

    assert_that(buttons[0].is_displayed())
    assert_that(buttons[1].is_displayed())
    assert_that(buttons[2].is_displayed())
    assert_that("/#/explorer/budget_function" in buttons[0].get_attribute('href'))
    assert_that("/#/explorer/agency" in buttons[1].get_attribute('href'))
    assert_that("/#/explorer/object_class" in buttons[2].get_attribute('href'))

@when('Click glossary icon by the "{item}" label')
def step_impl(context,item):
    """
    Clicks on the glossary icon by the specified label

    Parameters
    ----------
    item : string
        Label with the glossary icon to be clicked on
    """
    xpath = '//a[@href="#/explorer/?glossary={}"]'.format(item)
    wait_for_clickable(context, xpath)
    gloss = context.browser.find_element_by_xpath(xpath)
    gloss.click()

@when('Glossary is displayed')
def step_impl(context):
    """
    Checks that the Glossary is opened and displayed
    """
    xpath = '//div[@class="usa-da-glossary-wrapper"]'
    wait_for_xpath(context, xpath)
    gloss = context.browser.find_element_by_xpath(xpath)
    assert_that(gloss is not None)
    assert_that(gloss.is_displayed())

    xpath = '//button[@class="close-button"]'
    wait_for_clickable(context, xpath)
    button =  context.browser.find_element_by_xpath(xpath)
    button.click()
    time.sleep(1)

@when('Click on start button under "{item}"')
def step_impl(context, item):
    """
    Click on the start button by the specified label

    Parameters
    ----------
    item : string
        name of the label to be clicked on
    """
    xpath = '//a[@class="landing-option__button" and @href="#/explorer/{}"]'.format(item)

    '//*[@id="detail-header"]/div[1]/h2'

    wait_for_xpath(context, xpath)
    start = context.browser.find_element_by_xpath(xpath)

    start.click()

    xpath = '//h2[@class="detail-header__title"]'
    wait_for_xpath(context, xpath)
    header = context.browser.find_element_by_xpath(xpath)
    item = item.replace("_", " ")
    # assert_that(header.text, equal_to("You are viewing FY {} spending by {}".format(2019, item.title())))

@then('check table load')
def step_impl(context):
    """
    Checks to ensure that the spending explorer table is loaded correctly
    """
    xpath = '//div[@class="explorer-table"]'
    wait_for_xpath(context, xpath)

    table = context.browser.find_element_by_xpath(xpath)
    assert_that(table is not None)
    assert_that(table.is_displayed())

@then('check trail item "{num}"')
def step_impl(context, num):
    """
    Checks that the sidebar on the spending explorer has the correct number of items

    Parameters

    num : int
        Number of trail items the sidebar should have
    """
    time.sleep(2)

    xpath = '//li[@class="trail-item"]'
    wait_for_xpath(context, xpath)

    button = context.browser.find_elements_by_xpath(xpath)

    assert_that(len(button),equal_to(int(num)))

    for x in range (0, (int(num)-1)):
        print(x)
        assert_that(button[x].is_displayed())

    context.browser.execute_script("window.scrollTo(0, 0);")

@When('I wait {seconds} seconds')
def step_impl(context, seconds):
    seconds = float(seconds)
    time.sleep(seconds)

@then('check number of visual boxes are equal to number of table elements for {type}')
def step_impl(context, type):
    wait_for_class_name(context, 'explorer-cell')
    boxes = context.browser.find_elements_by_class_name('explorer-cell')

    element_xpath = XPATH_DICT.get('Explorer Table Button')
    target = context.browser.find_element_by_xpath(element_xpath).click()

    wait_for_class_name(context, 'go-deeper-link')
    rows = context.browser.find_elements_by_class_name('go-deeper-link')

    element_xpath = XPATH_DICT.get('Explorer View Button')
    target = context.browser.find_element_by_xpath(element_xpath).click()

    total_rows = len(rows)
    if type == 'Budget':
        total_rows -= 1
        assert_that(len(boxes), equal_to(total_rows))
    elif type == 'Agency':
        assert_that(total_rows, equal_to(20))


@then('we check the numbers and percentages in the {type} table')
def step_impl(context, type):
    wait_for_class_name(context, 'explorer-detail')
    total = context.browser.find_element_by_class_name('detail-header__value')
    total_num = str( total.text ).strip('$ Trillion')

    cell_items = context.browser.find_elements_by_tag_name('tr')
    cell_items.pop(0)
    if type == 'Budget':
        cell_items.pop()

    perc_list = []

    for item in cell_items:
        content = item.find_elements_by_class_name('cell-content')
        numb = str( content[1].text ).strip('$,')
        numb = int( numb.replace(',','') )
        perc = str( content[2].text ).strip('%')
        perc = float( perc )
        perc_list.append( perc )
        perc = perc/100
        final = numb/perc
        if final > 6500000000000 and final < 6700000000000:
            passed = True
        else:
            passed = False
        assert_that(passed is True)

    perc_total = 0
    passed = False
    for item in perc_list:
        perc_total += item
    if type == 'Agency':
         # if perc_total == 98.68999999999998:
        if math.isclose(perc_total, 98, rel_tol=.05):
            passed = True
    else:
        if perc_total > 99.9 and perc_total < 100.1:
            passed = True

    print(perc_total)
    assert_that(passed is True)

@then('we check all the pagination buttons are present')
def step_impl(context):
    navigator = context.page_obj.page_navigator()
    expected_count = navigator.calculated_number_of_pages()
    actual_count = navigator.page_count()
    assert_that(actual_count, expected_count, "Incorrect Page count, expected: {}, actuall: {}".format(expected_count, actual_count))

@then('we see pagination buttons function as expected')
def step_impl(context):
    navigator = context.page_obj.page_navigator()
    page_count = navigator.calculated_number_of_pages()
    for i in range(1, page_count):
        actual = navigator.current_page_number()
        assert_that(actual, i, "Wrong page, expected: {}, actual: {}".format(i, actual))
        navigator.move_next()

@when('we find and click on the {title} tile')
def step_impl(context, title):
    unreported = None
    wait_for_class_name(context, 'go-deeper-link')
    cells = context.browser.find_elements_by_class_name('go-deeper-link')
    for item in cells:
        txt = item.text
        print(txt)
        if txt == title:
            unreported = item
    assert_that(unreported is not None)
    assert_that(unreported.text, equal_to(title))
    context.browser.execute_script("return arguments[0].scrollIntoView();", unreported)
    context.browser.execute_script("window.scrollBy(0, -150);")
    unreported.click()

@when('explorer table name {name} is clicked')
def step_impl(context, name):
    unreported = None
    cells = context.browser.find_elements_by_class_name('go-deeper-link')
    for item in cells:
        txt = item.text
        if txt == name:
            unreported = item
    assert_that(unreported is not None)
    unreported.click()

@when('the breadcrumb {selection} is clicked')
def step_impl(context, selection):
    trail = context.browser.find_element_by_class_name('vertical-trail')
    buttons = trail.find_elements_by_class_name('item')
    last_button = None
    for item in buttons:
        if item.get_attribute('title') == selection:
            last_button = item
    assert_that(last_button is not None)
    last_button.click()

@then('we see pagination totals label has results')
def step_impl(context):
    target = context.browser.find_element_by_class_name('pagination__totals')
    str = target.text
    str = str[-7:]
    assert_that('results', equal_to(str))

@then('we see that we are viewing latest fiscal year spending by Budget Function')
def step_impl(context):
    title_locator = '//h2[@class="detail-header__title"]'
    wait_for_xpath(context, title_locator, 30)
    title = context.browser.find_element_by_xpath(title_locator).text
    assert_that(title != None)
    expected_year = latest_fiscal_year()
    context.feature.current_fy = expected_year[1]
    assert_that(str(expected_year[1]) in title)
    pass

@then('we see that we are viewing previous fiscal year spending by Budget Function')
def step_impl(context):
    title_locator = '//h2[@class="detail-header__title"]'
    wait_for_xpath(context, title_locator, 30)
    title = context.browser.find_element_by_xpath(title_locator).text
    assert_that(title != None)
    expected_year = context.feature.selected_fy
    assert_that(str(expected_year) in title)
    pass

@when('we select previous fy in spending explorer')
def step_impl(context):
    previous_fy = context.feature.current_fy - 1
    item_locator = "//button[@class='fy-picker__item' and @value='{}']".format(previous_fy)
    item = context.browser.find_element_by_xpath(item_locator)
    context.feature.selected_fy = item.text
    item.click()


@then('I see the previous fy is displayed')
def step_impl(context):
    previous_fiscal_year = str(latest_fiscal_year()[1] - 1)
    actual_header = context.page_obj.header()
    assert_that(previous_fiscal_year in actual_header, "Current FY ({}) not in header: {}".format(previous_fiscal_year, actual_header))

@when('I select quarter "{quarter}"')
def step_impl(context, quarter):
    picker = context.page_obj.fy_picker()
    picker.select_quarter(quarter)

@when('I select fiscal year "{fiscal_year}"')
def step_impl(context, fiscal_year):
    picker = context.page_obj.fy_picker()
    picker.select_fiscal_year(fiscal_year)

@then('I see "{quarter_count}" quarters selected')
def step_impl(context, quarter_count):
    actual_quarters_count = str(context.page_obj.quarters_selected())
    # test that all quarters up until "last_quarter" active
    expected_quarters_count = quarter_count
    assert_that(actual_quarters_count == expected_quarters_count, "expected {}, actual {}".format(expected_quarters_count, actual_quarters_count))

@then('I see an obligated amount of "{amount}"')
def step_impl(context, amount):
    actual_amount = context.page_obj.obligated_amount()
    expect(amount in actual_amount)

@then('I see Data of date of end of quarter "{quarter}"')
def step_impl(context, quarter):
    actual_day = context.page_obj.data_of_date()
    eoq = quarter_display_ranges[quarter.lower()][1]
    expect(eoq[0] in actual_day)
    expect(str(eoq[1]) in actual_day)

@then('I capture amount of "{name}" box')
def step_impl(context, name):
    node = context.page_obj.find_node(name)
    context.feature.current_node = node
    node.hover()
    context.feature.node_amount = node.tooltip_amount()


@when('I select box containing "{name}"')
def step_impl(context, name):
    if context.feature.current_node != None:
        node = context.feature.current_node
        node.click()
    else:
        node = context.page_obj.select_title(name)
    time.sleep(1)


@then('I compare sidebar containing "{name}" amount against box amount')
def step_impl(context, name):
    sidebar = context.page_obj.side_bar(name)
    actual = sidebar.amount()
    expected = context.feature.node_amount
    assert_that(actual.lower(), equal_to(expected.lower()))


@then('I check the values of "{name}" record')
def step_impl(context, name):
    row = context.page_obj.get_table_record(name)
    context.feature.record_amount = row.amount()
    expect("$" in row.amount())
    expect("%" in row.percent())

@when('I select record containing "{name}"')
def step_imple(context, name):
    record = context.page_obj.get_table_record(name)
    record.select()

@then('I see Spending Explorer options')
def step_impl(context):
    expected_header = 'Spending Explorer'
    actual_header = context.page_obj.header()
    expect(expected_header in actual_header, 'Expected: {}, Actual: {}'.format(expected_header, actual_header))
    expected_title = "Explore the spending landscape."
    actual_title = context.page_obj.title()
    expect(expected_title in actual_title, 'Expected: {}, Actual: {}'.format(expected_title, actual_title))

@when('I navigate to "{landing}"')
def step_impl(context, landing):
    context.feature.landing = context.page_obj.find_entry(landing)
    context.page_obj = context.feature.landing.navigate_to_detail()

@when('I open glossary')
def step_impl(context):
    landing = context.feature.landing
    landing.open_glossary()
    context.feature.glossary = context.page_obj.find_glossary()

@then('I verify glossary')
def step_impl(context):
    glossary = context.feature.glossary
    term = glossary.term()
    landing = context.feature.landing
    title = landing.title()
    assert_that(term in title, "Expected title {} to equal term {}".format(title, term))


@when ('I close glossary')
def step_impl(context):
    glossary = context.feature.glossary
    glossary.close()

@then('I see Spending Explorer for "{selection}" showing current Fiscal Year and quarter')
def step_impl(context, selection):
    page = context.page_obj
    actual_header = page.header()
    actual_period = page.period()
    expected_fy = str(latest_fiscal_year()[1])
    expected_month = str(current_month())
    assert_that(expected_fy in actual_header, "Current FY ({}) not in header: {}".format(expected_fy, actual_header))
    assert_that(expected_month in actual_period, "Current period ({}) not selected, actual selcted: {}".format(expected_month, actual_period))

@when ('I select previous fy')
def step_impl(context):
    previous_fiscal_year = str(latest_fiscal_year()[1] - 1)
    picker = context.page_obj.fy_picker()
    picker.select_fiscal_year(previous_fiscal_year)

@when('I select title containing "{title}" in grid')
def step_impl(context, title):
    context.page_obj.select_title(title)

@then('I check sidebar containing "{title}" against record values')
def step_impl(context, title):
    record_amount = context.feature.record_amount
    # sidebar_amount = context.page_obj.side_bar(title)


@then('I see No More Awards message')
def step_impl(context):
    label = context.page_obj.displaying_No_More_Awards()
    assert_that(label, 'Expected "No More Awards" label, actual not present')

@when('I select go back')
def step_impl(context):
    context.page_obj.go_back()

@when('I select previous trail item')
def step_impl(context):
    context.page_obj.select_previous_trail_item()

@then('I see "{title}" in sidebar')
def step_impl(context, title):
    sidebar = context.page_obj.side_bar(title)
    assert_that(title in sidebar.title())

@when('I select "{view}" view')
def step_impl(context, view):
    context.page_obj.select_view(view)

@when('I select "{name}" row')
def step_impl(context, name):
    context.page_obj.select_table_row(name)

@when('I start over')
def step_impl(context):
    newpage = context.page_obj.start_over()
    context.page_obj = newpage

@when('I change to "{view}" report')
def step_impl(context, view):
    context.page_obj.change_to(view)

@then('I see Unreported info message')
def step_imple(context):
    expected = 'Data has not been reported at this time.'
    actual = context.page_obj.unreported_title()
    assert_that(actual, expected, "Unreported Title expected: {}, actual: {}".format(expected, actual))

@then('I see detail header contains "{item}"')
def step_impl(context, item):
    actual = context.page_obj.detail_header()
    assert_that(item.lower() in actual.lower(), "Detail Title expected: {}, actual: {}".format(item, actual))

@when('I select the detail header')
def step_impl(context):
    # page transition
    context.page_obj = context.page_obj.select_detail_header()

@when('I sort table by "{column}" "{direction}"')
def step_impl(context, column, direction):
    context.page_obj.sort_table_by(column, direction)

@then('I see records sorted by Amount "{direction}"')
def step_impl(context, direction):
    records = context.page_obj._find_all_rows()
    expected = context.page_obj._find_all_rows()
    expected = sorted(records, key=lambda e: (e.amount_as_int()))
    if direction == 'descending':
        expected.reverse()
    assert_that(records, equal_to(expected))

@then('I see records sorted by Name "{direction}"')
def step_impl(context, direction):
    records = context.page_obj._find_all_rows()
    expected = context.page_obj._find_all_rows()
    expected = sorted(records, key=lambda e: (e.name()))
    if direction == 'descending':
        expected.reverse()
    assert_that(records, equal_to(expected))

@then('I see records sorted by Percent "{direction}"')
def step_impl(context, direction):
    records = context.page_obj._find_all_rows()
    expected = context.page_obj._find_all_rows()
    expected = sorted(records, key=lambda e: (e.percent_as_int(), e.name()))
    if direction == 'descending':
        expected.reverse()
    assert_that(records, equal_to(expected))