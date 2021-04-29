from behave import *
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from hamcrest import assert_that, equal_to, is_not
import time
import os
import zipfile
import glob
import csv
import re
from datetime import datetime
from xpath import XPATH_DICT

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


def wait_for_xpath(context, xpath, timeout_secs=30):
    xpath_element_is_present = expected_conditions.presence_of_element_located((By.XPATH,xpath))
    WebDriverWait(context.browser, timeout_secs).until(xpath_element_is_present)


def wait_for_clickable(context, xpath):
    timeout_secs = 10
    xpath_element_is_present = expected_conditions.element_to_be_clickable((By.XPATH,xpath))
    WebDriverWait(context.browser, timeout_secs).until(xpath_element_is_present)

@when('I type "{text}" in the "{input}" text input')
def step_impl(context, text, input):
    xpath = '//input[@type="text" and @placeholder = "{}"]'.format(input)
    wait_for_xpath(context, xpath)

    textbox = context.browser.find_element_by_xpath(xpath)
    textbox.send_keys(text)
    time.sleep(1)

    textbox.send_keys(Keys.ENTER)
    textbox.send_keys(Keys.ENTER)

@then("Geography results are displayed")
def step_impl(context):
    xpath = '//*[@id="results-section-geo"]/h2'
    wait_for_xpath(context, xpath)
    header = context.browser.find_element_by_xpath(xpath)

    assert_that(header.text, equal_to("Spending by Geography"))

    xpath2 = '//*[@id="results-section-geo"]/div[2]/div[2]/ul/li[3]/button'
    wait_for_xpath(context, xpath2, 30)
    map = context.browser.find_element_by_xpath(xpath2)
    assert_that(map.is_displayed())

@then('"{name}" results are displayed')
def step_impl(context, name):
    xpath = '//div[@class="visualization-content"]//section//h2'
    wait_for_xpath(context, xpath)

    head = context.browser.find_element_by_xpath(xpath)

    assert_that(head.text, equal_to(name))

@then('"{name}" dropdown is displayed with a chart')
def step_impl(context, name):
    xpath1 = '//*[@id="results-section-rank"]/div[1]/h2'
    xpath2 = '//button[@class="selected-button"]'

    wait_for_xpath(context, xpath1)
    wait_for_xpath(context, xpath2)

    head = context.browser.find_element_by_xpath(xpath1)
    drop = context.browser.find_element_by_xpath(xpath2)
    string = head.text + drop.get_attribute('title')

    assert_that(string, equal_to(name))

@then('Download link is provided to copy and the file is being prepared')
def step_impl(context):

    # xpath = '//div[@class="link"]'
    # wait_for_xpath(context, xpath)
    # link = context.browser.find_element_by_xpath(xpath)
    # assert_that(link.is_displayed())

    xpath = '//*[@class="floating-download-bottom-bar"]'
    try:
        wait_for_xpath(context, xpath)
    except:
        print("xpath timed out")

    download_complete = False
    timing = 0
    while not download_complete and timing < 120:
        try:
            context.browser.find_element_by_xpath(xpath)
        except:
            download_complete = True
        time.sleep(1)
        timing += 1

    assert_that(download_complete, "Downloaded file did not generate within 2 minutes")


@when('Click on the downloaded zip file')
def step_impl(context):

    files = context.path + os.sep + '*'

    wait = True
    timing = 0
    # print(path)
    while wait and timing < 100:
        try:
            max(glob.iglob(files))
        except ValueError:
            time.sleep(1)
            timing = timing + 1
            continue
        wait = False
    assert_that(not wait, 'Download did not start')
    timing = 0
    wait = True
    os.chdir(context.path)
    while wait and timing < 100:
        time.sleep(1)
        if (max(glob.iglob(files), key=os.path.getctime).endswith('.crdownload')):
            wait = True
        else:
            wait = False
        timing = timing + 1

    assert_that(not wait, 'Download timed out')
    latest_file = max(glob.iglob(files), key=os.path.getctime)
    file_name = latest_file.replace(context.path + os.sep, "")
    downloads = os.listdir(context.path)
    # print(file_name)
    file_exists = False
    # print(downloads)
    for item in downloads:
        if item == file_name:
            file_exists = True
    context.file = file_name
    os.chdir(context.home_path)
    assert_that(file_exists, "File {} not found in {}".format(file_name, downloads))

@then('Files are extracted and displays correct files')
def step_impl(context):
    path_separator = os.path.sep
    myzip = zipfile.ZipFile(context.path + path_separator + context.file)
    context.namelist = namelist = myzip.namelist()
    expected_filenames  = []
    expected_extensions = []
    for row in context.table:
        expected_filenames.append(row['filename'])
        expected_extensions.append(row['extension'])

    regex = '(?:.*(?P<file_name>(?:FA_AccountBalances)|(?:Contracts_PrimeTransactions)|(?:Assistance_PrimeTransactions)|(?:All_Contracts_PrimeTransactions)))(?:.*\.(?P<extension>.*))'

    expected_format = 'filename format: [filename]_[yyyy-mm-dd]_H[hh]M[mm]S[ss]_[digit].[extension]'

    for filename in namelist:
        print(filename) # remove
        m = re.match(regex, filename)
        if not m:
            assert_that(False, 'file name format non-compliant, expected format {}, actual {}'.format(expected_format, filename))
        assert_that(m.group('file_name') in expected_filenames , 'filename does not exist in expected filenames: {}, actual: {}'.format(expected_filenames, m.group('file_name')))
        assert_that(m.group('extension') in expected_extensions, 'filename does not exist in expected filenames: {}, actual: {}'.format(expected_extensions, m.group('extension')))

@then('the file is extracted and displays the following: "{file1}"')
def step_impl(context, file1):
    myzip = zipfile.ZipFile(context.path + "/" + context.file)
    namelist = myzip.namelist()
    context.namelist = namelist

    assert_that(file1 in namelist, "File {} was not found in {}".format(file1, namelist))

    downloads = os.listdir(context.path)
    if '.DS_Store' in downloads:
        downloads.remove('.DS_Store')
    context.download_count = len(downloads)

@then('Files are extracted and displays the following: "{file1}" "{file2}" "{file3}" "{file4}"')
def step_impl(context, file1, file2, file3, file4):


    myzip = zipfile.ZipFile(context.path + "/" + context.file)
    namelist = myzip.namelist()
    context.namelist = namelist

    assert_that(file1 in namelist, "File {} was not found in {}".format(file1, namelist))
    assert_that(file2 in namelist,  "File {} was not found in {}".format(file2, namelist))
    assert_that(file3 in namelist,  "File {} was not found in {}".format(file3, namelist))
    assert_that(file4 in namelist,  "File {} was not found in {}".format(file4, namelist))

    downloads = os.listdir(context.path)
    if '.DS_Store' in downloads:
        downloads.remove('.DS_Store')
    context.download_count = len(downloads)


@when('Go back')
def step_impl(context):
    context.browser.back()
    time.sleep(2)

@then('Filters are reset')
def step_impl(context):
    xpath = '//button[@class="submit-button"]'
    wait_for_xpath(context, xpath)
    submit = context.browser.find_element_by_xpath(xpath)
    assert_that(not submit.is_enabled(), 'submit disabled')

@then('we see the sub awards rows')
def step_impl(context):
    time.sleep(3)
    xpath = '//div[@class="count-badge  active"]'
    xpath2 = '//div[@class="count-badge "]'

    wait_for_xpath(context, xpath)
    wait_for_xpath(context, xpath2)

    count1 = context.browser.find_element_by_xpath(xpath)
    count2 = context.browser.find_element_by_xpath(xpath2)
    sub_rows = {
        "Sub-Contracts": int(count1.get_attribute('innerHTML').replace(",", "")),
        "Sub-Grants": int(count2.get_attribute('innerHTML').replace(",", ""))
    }
    context.sub_rows = sub_rows

@then('Files contain the correct number of rows and sub rows')
def step_impl(context):

    myzip = zipfile.ZipFile(context.path + "/" + context.file)
    other = context.row_counts['Grants']+context.row_counts["Direct Payments"]+context.row_counts["Loans"]+context.row_counts['Other']

    for x in range(0,4):
        myzip.extract(context.namelist[x], context.path)

    with open(context.path + "/" + context.namelist[0], "r+") as mfile:
        reader = csv.reader(mfile, delimiter = ",")
        data = list(reader)
        r = len(data) - 1
        assert_that(r, equal_to(context.row_counts['Contracts'] + context.row_counts['IDVs']), 'All contracts prime awards')

    with open(context.path + "/" + context.namelist[1], "r+") as mfile:
        reader = csv.reader(mfile, delimiter = ",")
        data = list(reader)
        r = len(data) - 1
        assert_that(r,equal_to(other), 'All assistance prime awards')

    with open(context.path + "/" + context.namelist[2], "r+") as mfile:
        reader = csv.reader(mfile, delimiter = ",")
        data = list(reader)
        r = len(data) - 1
        assert_that(r, equal_to(context.sub_rows['Sub-Contracts']), 'All contract subawards')

    with open(context.path + "/" + context.namelist[3], "r+") as mfile:
        reader = csv.reader(mfile, delimiter = ",")
        data = list(reader)
        r = len(data) - 1
        assert_that(r, equal_to(context.sub_rows['Sub-Grants']), 'All assistance subawards')



@when('we click on the sort in column {number}')
def step_impl(context, number):
    xpath = '//*[@id="results-section-table"]/div[3]/div[2]/div/div[1]/div/div/div[{}]/div/div/div/div[2]/button[2]'.format(number)
    wait_for_xpath(context, xpath)
    arrow = context.browser.find_element_by_xpath(xpath)
    context.browser.execute_script("return arguments[0].scrollIntoView();", arrow)
    context.browser.execute_script("window.scrollBy(0, -150);")
    arrow.click()

@then('we see the table headers for {tab}')
def step_impl(context, tab):
    xpath = '//*[@class="ibt-header-cell"]/div/div/div/div[1]'
    wait_for_xpath(context, xpath)
    targets = context.browser.find_elements_by_xpath(xpath)
    headers = []
    for x in targets:
        headers.append(x.get_attribute('textContent'))
    correct_headers = {
        "Contracts": ["Award ID", "Recipient Name", "Start Date", "End Date", "Award Amount", "Awarding Agency", "Awarding Sub Agency", "Contract Award Type"],
        "Contract IDVs": ["Award ID", "Recipient Name", "Start Date", "Ordering Period End Date", "Award Amount", "Awarding Agency", "Awarding Sub Agency", "Contract Award Type"],
        "Grants": ["Award ID", "Recipient Name", "Start Date", "End Date", "Award Amount", "Awarding Agency", "Awarding Sub Agency", "Award Type"],
        "Direct Payments": ["Award ID", "Recipient Name", "Start Date", "End Date", "Award Amount", "Awarding Agency", "Awarding Sub Agency", "Award Type"],
        "Loans": ["Award ID", "Recipient Name", "Issued Date", "Loan Value", "Subsidy Cost", "Awarding Agency", "Awarding Sub Agency"],
        "Other": ["Award ID", "Recipient Name", "Start Date", "End Date", "Award Amount", "Awarding Agency", "Awarding Sub Agency", "Award Type"],
        "Sub-Contracts": ["Sub-Award ID", "Sub-Awardee Name", "Sub-Award Date", "Sub-Award Amount", "Awarding Agency", "Awarding Sub Agency", "Prime Award ID", "Prime Recipient Name"],
        "Sub-Grants": ["Sub-Award ID", "Sub-Awardee Name", "Sub-Award Date", "Sub-Award Amount", "Awarding Agency", "Awarding Sub Agency", "Prime Award ID", "Prime Recipient Name"],
    }
    assert_that(correct_headers[tab], equal_to(headers))

def sort_func(e):
    if "$" in e:
        e = e.replace('$', '')
        e = e.replace(',', '')
        try:
            return(int(e))
        except ValueError:
            return e
    e = e.replace('-', '')
    e = e.replace('&', '')
    e = e.replace(' ', '')
    e = e.replace(".", '')
    e = e.replace("the", '')
    if "/" in e:
        try:
            return datetime.strptime(e, '%m/%d/%Y')
        except:
            return e
    return e


@then('we see that the awards table is {reverse} sorted by column {number}')
def step_impl(context, number, reverse):
    xpath ='//*[@id="results-section-table"]/div[3]/div[2]/div/div[2]/div/div/div/div/div[{}]/div/div'.format(number)
    wait_for_xpath(context, xpath)
    elements = context.browser.find_elements_by_xpath(xpath)

    content = []
    for elem in elements:
        if elem.get_attribute('innerText').strip() is not "":
            content.append(elem.get_attribute('innerText'))

    sorted_content = content.copy()
    if reverse == "reverse":
        sorted_content.sort(reverse=True, key=sort_func)
    else:
         sorted_content.sort(key=sort_func)

    assert_that(sorted_content, equal_to(content))

@when('we scroll table to the left')
def step_impl(context):
    xpath = '//*[@id="results-section-table"]/div[3]/div[2]/div/div[2]/div/div/div/div[1]/div[{}]'.format(2)
    wait_for_xpath(context, xpath)
    element = context.browser.find_element_by_xpath(xpath)
    element.click()

    for x in range(2, 8):
        xpath = '//*[@id="results-section-table"]/div[3]/div[2]/div/div[2]/div/div/div/div[1]/div[{}]'.format(x)
        wait_for_xpath(context, xpath)
        element = context.browser.find_element_by_xpath(xpath)
        element.send_keys(Keys.ARROW_RIGHT)


@when('Wait for table to load')
def step_impl(context):
    xpath = '//div[@class="loading-message"]'
    try:
        wait_for_xpath(context, xpath)
    except:
        print("Table loaded too fast")
    wait = True
    count = 0
    while wait and count < 120:
        try:
            context.browser.find_element_by_xpath(xpath)
        except:
            wait = False
            break
        count = count + 1
        time.sleep(1)

    assert_that(not wait, "Table did not load within two minutes")

    load = True
    xpath2 = '//*[@id="results-section-table"]/div[3]/span/div/div/div[2]'
    try:
	    elem = context.browser.find_element_by_xpath(xpath2).get_attribute('innerText')
    except:
	    load = False

    # if load:
	#     assert_that(elem, is_not(equal_to("An error occurred.")), "Table failed to load due to an error")

@when('we select "{checkbox_label}"')
def step_impl(context, checkbox_label):
    checkbox_locator = '//*[contains(@id, "-{}")]/following-sibling::span/*/*'.format(checkbox_label)
    checkbox = highlight(context.browser.find_element_by_xpath(checkbox_locator))
    checkbox.click()


@then('we see the filter tag for "{name}"')
def step_impl(context, name):
    label_locator = '//*[@class="shown-filter-button" and contains(text(),"{}")]'.format(name)
    label = highlight(context.browser.find_element_by_xpath(label_locator))
    actual = label.text
    assert_that(name in actual, "Shown filter Expected: {}, Actual: {}".format(name, actual))



def wait_to_disappear(context, locator):
    return WebDriverWait(context.browser, 30).until(expected_conditions.invisibility_of_element_located((By.XPATH, locator)))


@when('we enter "{term}" into "{element}" search')
def step_impl(context, term, element):
    element_xpath = XPATH_DICT[element]
    wait_for_xpath(context, element_xpath)
    target = context.browser.find_element_by_xpath(element_xpath)
    assert_that(target is not None)
    assert_that(target.is_displayed())
    target.send_keys(term)
    wait_to_disappear(context, '//div[@class = "checkbox-tree-filter-message-container__text" and contains(text(), "Loading your data")]')
