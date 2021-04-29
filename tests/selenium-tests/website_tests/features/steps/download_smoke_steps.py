from behave import *
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException
from hamcrest import assert_that, equal_to
import time
from dateutil.relativedelta import relativedelta
import re
import os
import pandas as pd
import zipfile
import datetime
from utils import latest_fiscal_year
from xpath import XPATH_DICT
import glob

def wait_for_xpath(context, xpath, timeout_secs = 30):
    xpath_element_is_present = expected_conditions.presence_of_element_located((By.XPATH,xpath))
    WebDriverWait(context.browser, timeout_secs).until(xpath_element_is_present)


def wait_for_clickable(context, xpath, timeout_secs = 30):
    xpath_element_is_present = expected_conditions.element_to_be_clickable((By.XPATH,xpath))
    WebDriverWait(context.browser, timeout_secs).until(xpath_element_is_present)

@then('I see the intro paragraphs')
def step_impl(context):
    time.sleep(4)
    xpath = '//p'
    wait_for_xpath(context, xpath)
    paragraphs = context.browser.find_elements_by_xpath(xpath)
    values = [
        "Welcome to the Award Data Archive, which features major agencies’ award transaction data for full fiscal years. They’re a great way to get a view into broad spending trends and, best of all, the files are already prepared — you can access them instantaneously.",
        "New files are uploaded by the 15th of each month. Check the Data As Of column to see the last time files were generated. Full files feature data for the fiscal year up until the date the file was prepared, and delta files feature only new, modified, and deleted data since the date the last month's files were generated. The `correction_delete_ind` column in the delta files indicates whether a record has been modified (C), deleted (D), or added (blank). To download data prior to FY 2008, visit our Custom Award Data page.",
        "Ready to grab your data? Complete the form below."
        ]
    for paragraph in paragraphs:
        p = paragraph.get_attribute('textContent')
        assert_that(p in values)

@then('I see two records one for Full and one for Delta')
def step_impl(context):
    xpath1 = '//*[@id="main-content"]/div/div[2]/div/div[2]/table/tbody/tr[1]/td[2]/a'
    xpath2 = '//*[@id="main-content"]/div/div[2]/div/div[2]/table/tbody/tr[2]/td[2]/a'

    link1 = context.browser.find_element_by_xpath(xpath1).get_attribute('innerHTML')
    link2 = context.browser.find_element_by_xpath(xpath2).get_attribute('innerHTML')
    assert_that("Delta" in link2)

@then('I see the dates under the Date As Of column')
def step_impl(context):
    xpath1 = '//*[@id="main-content"]/div/div[2]/div/div[2]/table/tbody/tr[1]/td[4]'
    xpath2 = '//*[@id="main-content"]/div/div[2]/div/div[2]/table/tbody/tr[2]/td[4]'

    date1 = context.browser.find_element_by_xpath(xpath1).get_attribute('innerHTML')
    date2 = context.browser.find_element_by_xpath(xpath2).get_attribute('innerHTML')

    x = re.search("([0-9][0-9]).([0-9][0-9]).(20[0-9][0-9])", date1)
    y = re.search("([0-9][0-9]).([0-9][0-9]).(20[0-9][0-9])", date2)
    assert_that(x is not None, "Date for Full file is {}".format(date1))
    assert_that(y is not None, "Date for delta file is {}".format(date2))
    assert_that(x.group(), equal_to(date1))
    assert_that(y.group(), equal_to(date2))

@then('File is extracted and displays the correct file')
def step_impl(context):

    myzip = zipfile.ZipFile(context.path + os.sep + context.file)
    namelist = myzip.namelist()
    context.namelist = namelist

    assert_that(len(namelist), equal_to(1), "Zip file is empty")
    file_name = ""

    file_exists = False
    if "Delta" in context.file:
        file_name = context.file.split("Delta")[0]
    else:
        file_name = context.file.split("Full")[0]

    for item in namelist:
        if file_name in item:
            file_exists = True
    assert_that(file_exists, "Expected string {} was not found in zipfile {}".format(file_name, context.file))



@then('I see the URL displays "{url}"')
def step_impl(context, url):
    URL = context.browser.current_url
    print(URL)
    assert_that(url in URL, "Expected URL not found")

@then('File is extracted and displays the following: {file}')
def step_impl(context, file):

    myzip = zipfile.ZipFile(context.path + "/" + context.file)
    namelist = myzip.namelist()
    namelist = myzip.namelist()
    context.namelist = namelist

    assert_that(file in namelist, "File {} not found in {}".format(file, namelist))


@then('Matching zip file is extracted and displays the following: {file}')
def step_impl(context, file):

    zip_name = file.split("_")[0]
    downloads = os.listdir(context.path)
    myzip = None
    for item in downloads:
        if zip_name in item:
            myzip = zipfile.ZipFile(context.path+ os.sep + item)

    assert_that(myzip is not None, "File not found")
    namelist = myzip.namelist()
    context.namelist = namelist

    assert_that(file in namelist, "File {} not found in {}".format(file, namelist))


@when('switch tab')
def step_impl(context):
    context.feature.home_tab_title = context.page_obj.page_title()
    context.browser.switch_to_window(context.browser.window_handles[1])


@when('we close tab')
def step_impl(context):
    context.browser.close()
    context.browser.switch_to_window(context.browser.window_handles[0])


@then('we are on home tab')
def step_impl(context):
    expected = context.feature.home_tab_title
    actual = context.page_obj.page_title()
    assert_that(actual, equal_to(expected))


@then('We confirm the PDF URL')
def step_impl(context):
    link = context.browser.current_url
    assert_that('https://files.usaspending.gov/database_download/' in link, 'expected "usaspending-db-setup.pdf", actual: ' + link)


@then('PDF is downloaded and has the correct name')
def step_impl(context):

    os.chdir(context.path)
    files = context.path + '/*'

    wait = True
    timing = 0

    while wait and timing < 100:
        try:
            max(glob.iglob(files))
        except ValueError:
            time.sleep(1)
            timing = timing + 1
            continue
        wait = False

    # assert_that(not wait, 'Download did not start')

    timing = 0
    wait = True

    while wait and timing < 100:
        time.sleep(1)
        if (max(glob.iglob(files), key=os.path.getctime).endswith('.crdownload')):
            wait = True
        else:
            wait = False
        timing = timing + 1

    # assert_that(not wait, 'Download timed out')
    downloads = os.listdir(context.path)
    os.chdir(context.home_path)
    assert_that('usaspending-db-setup.pdf' in downloads, "File not found")

@when('I navigate to the Raw Quarterly DATA Act to find most recent files for agency')
def step_impl(context):
    # select DATA Act link
    data_act_locator = '/html/body/div/p[2]/a'
    wait_for_xpath(context, data_act_locator)
    link = context.browser.find_element_by_xpath(data_act_locator)
    link.click()

    # determine expected latest year and quarter
    latest = latest_fiscal_year()

    # click year
    latest_year_locator = '/html/body/div/p[last()]/a'
    latest_year = context.browser.find_element_by_xpath(latest_year_locator)
    latest_year_text = latest_year.text
    assert_that(str(latest[1]) in latest_year_text)
    latest_year.click()
    # click quarter
    latest_quarter_locator = '/html/body/div/p[last()]/a'
    latest_quarter = context.browser.find_element_by_xpath(latest_quarter_locator)
    latest_quarter_text = latest_quarter.text
    assert_that('Q'+str(latest[0]) in latest_quarter_text)
    latest_quarter.click()
    # click agency
    agency = 'Office of Personnel Management (OPM)'
    agency_link = context.browser.find_element_by_partial_link_text(agency)
    agency_link.click()


@when('we search on "{term}"')
def step_impl(context, term):
    input_locator = '//*[@class="dictionary-search__input"]'
    input = context.browser.find_element_by_xpath(input_locator)
    input.send_keys(term)
    input.send_keys(Keys.ENTER)
    time.sleep(1)


@then('we see results filtered to contain "{term}"')
def step_impl(context, term):
    row_locator = '//*[@class="dictionary-table__body-row"]'
    rows = context.browser.find_elements_by_xpath(row_locator)
    contains_term = True
    for index in range(len(rows)):
        contains_term = term in rows[index].text
        assert_that(contains_term, "row missing search terms. Row: {}. Term:{}".format(index, term))


@when('we download dictionary')
def step_impl(context):
    download_link_locator = '//*[@class="data-dictionary__download-link"]'
    download_link = context.browser.find_element_by_xpath(download_link_locator)
    download_link.click()
    wait = True
    count = 0
    print(context.download_count)
    while wait and count < 120:
        download = os.listdir(context.path)
        if '.DS_Store' in download:
            download.remove('.DS_Store')
        if "Data_Dictionary_Crosswalk.xlsx" in download:
            wait = False
        count = count + 1
        time.sleep(1)

    assert_that(not wait, "File did not download within 2 minutes")


@then('we see valid headers')
def step_impl(context):
    file_name = 'Data_Dictionary_Crosswalk.xlsx'
    expected_headers = context.feature.expected_headers
    actual_headers = []
    with pd.ExcelFile(context.path + os.sep + file_name) as mfile:
        data = pd.read_excel(mfile, 'Public', usecols='A:D')
        actual_headers.append(data.loc[0][0])
        actual_headers.append(data.loc[0][1])
        actual_headers.append(data.loc[0][2])
        actual_headers.append(data.loc[0][3])

    assert_that(actual_headers, equal_to(expected_headers))


@then('we see headers in table')
def step_impl(context):
    wait_for_xpath(context, '(//*[contains(@class, "dictionary-table__body-cell")])[1]')
    header_locator = '//*[contains(@class,"dictionary-table__head-cell section-0-col")]'
    headers = context.browser.find_elements_by_xpath(header_locator)
    expected_headers = []
    for header in headers:
        value = header.text
        expected_headers.append(value)

    context.feature.expected_headers = expected_headers
