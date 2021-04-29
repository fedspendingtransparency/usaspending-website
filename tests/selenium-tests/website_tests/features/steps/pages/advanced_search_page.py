from steps.pages.base_page import BasePage
from steps.pages.base_item import BaseItem
from steps.pages.award_detail_page import AwardDetailPage
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains
from enum import Enum, auto
import time

# html for "Gathering your data" message in Advanced Search Page

# <span>
# 	<div class="results-table-message-container">
# 		<div class="results-table-loading">
# 			<div class="loading-animation">
# 				<svg class="loading-bars" xmlns="http://www.w3.org/2000/svg" version="1.1" width="50" height="50" style="opacity: 0;">
# 					<rect class="bar-one" x="0" y="0" height="50" width="10"></rect>
# 					<rect class="bar-two" x="13" y="0" height="50" width="10"></rect>
# 					<rect class="bar-three" x="26" y="0" height="50" width="10">
# 					</rect><rect class="bar-four" x="39" y="0" height="50" width="10"></rect>
# 				</svg>
# 			</div>
# 			<div class="loading-message">Gathering your data...</div>
# 		</div>
# 	</div>
# </span>

# //*[@class = "results-table-message-container"]//*[@class="loading-message" and contains(@text(), "Gathering your data")]






class AdvancedSearchPage(BasePage):

    def __init__(self, driver):
        super(AdvancedSearchPage, self).__init__(driver)


# Following methods are temporary until Advanced Search tests are implemented

    def select_fy_2019(self):
        locator = '//*[@id = "fy2019"]'
        ck_box = self.find(locator)
        if not ck_box.is_selected():
            ck_box.click()


    def first_contract(self):
        element = self._get_first_record_element()
        contract = {"piid": element.find_element_by_xpath("./div[1]").text}
        contract['name'] = element.find_element_by_xpath("./div[2]").text
        contract['awarder'] = element.find_element_by_xpath("./div[6]").text
        contract['type'] = element.find_element_by_xpath("./div[8]").text
        return contract

    def select_first_record_award_id(self):
        record = self._get_first_record_element()
        id_element = record.find_element_by_xpath("./div[1]//a")
        id_element.click()
        time.sleep(.5)
        return AwardDetailPage(self.driver)

    def _get_first_record_element(self):
        locator = '(//div[@class="ibt-table-row"])[1]'
        # locator = '((//div[@class="ibt-table-row"])[1]//a)[1]' # id link
        return self.find(locator)


    def _filter_locator(self, name):
        locator = '//*[@class="search-option" and contains(@aria-label, "{}")]'.format(name)
        return locator


# End temporary

# Filter functions
    def date_range_selector(self):
        locator = self._filter_locator("Time Period")
        root_element = self.find(locator)
        return self.DateRangeSelector(root_element)

    def keyword_filter(self):
        locator = self._filter_locator("Keyword")
        root_element = self.find(locator)
        return self.KeywordFilter(root_element)

    def recipient_filter(self):
        locator = self._filter_locator("Recipient")
        root_element = self.find(locator)
        filter = self.RecipientFilter(root_element)
        return filter


    def tas_filter(self):
        locator = self._filter_locator("TAS")
        root_element = self.find(locator)
        filter = self.TASFilter(root_element)
        return filter


    def tas_component_filter(self):
        filter = self.tas_filter()
        filter.view_tas_component()
        return filter


    def naics_filter(self):
        locator = self._filter_locator("NAICS")
        root_element = self.find(locator)
        filter = self.NAICSFilter(root_element)
        return filter


    def agency_filter(self):
        locator = self._filter_locator("Agency")
        root_element = self.find(locator)
        filter = self.AgencyFilter(root_element)
        return filter


    def submit_filters(self):
        locator = '//*[@class = "search-sidebar"]'
        root_element = self.scroll_to(self.find(locator))
        filter = self.AdvancedSearchFilters(root_element)
        filter.submit_filters()
        time.sleep(.5) # a standard delay
        locator = '//*[@class = "loading-message"]'
        self.wait_for_loading(locator)

# table functions
    def is_active_visualization(self, title):
        locator = '//*[contains(@class, "visualization-type-tab") and @title = "{}"]'.format(title)
        element = self.find(locator)
        return "active" in element.get_attribute("class")

    def switch_results_to(self, results_type):
        active_title = self.active_title()
        active_title = active_title.replace("Spending by ", "") # handle plural 's'.
        if(active_title not in results_type):
            switch_locator = '(//*[@class="subaward-toggle"])[2]'
            element = self.find(switch_locator)
            element.click()
        pass

    table_locator = '//*[contains(@class, "table-type-toggle") and contains(@title, "{}")]'

    def is_active_table(self, table):
        locator = self.table_locator.format(table)
        element = self.find(locator)
        return "active" in element.get_attribute("class")


    def active_title(self):
        locator = '//*[@class="visualization-title"]'
        return self.find(locator).text


    def table_has_columns(self):
        return len(self.find_all('//*[@class = "header-sort"]')) > 0


    def table_column_name(self, column):
        locator = column.label_locator()
        name = self.find(locator).text
        return name


    def find_all_rows(self, table='Contract'):
        locator = '//*[@class = "ibt-table-row"]'
        elements = self.find_all(locator)
        row_object = getattr(self, "{}Row".format(table))
        return list(map(lambda r: row_object(r), elements))


    def has_records(self):
        elements = self.find_all_rows()
        return len(elements) > 0


    def select_table(self, table):
        locator = self.table_locator.format(table)
        self.find(locator).click()
        self.wait_for_table()


    def wait_for_table(self):
        locator = '//div[@class = "loading-message"]'
        self.wait_for_loading(locator)


    def is_sorted(self, column):
        locator = column.sort_locator()
        sort_button = self.find(locator)
        is_active = "active" in sort_button.get_attribute("class")
        return is_active


    def _wait_for_first_record(self):
        if self._has_records():
            locator = '//*[@id = "27-cell-0-0"]'
            self.find(locator)


    def _has_records(self):
        count_locator = '//*[@class = "count-badge  active"]'
        count = int(self.find(count_locator).text)
        return count > 0


    class TableColumn(Enum):

        award_id = (1, 'Award ID')
        recipient = (2, 'Recipient Name')
        start_date = (3, 'Date')
        end_date = (4, 'End Date')
        award_amount = (5, 'Award Amount\n(Total Award Obligations to Date)')
        awarding_agency = (8, 'Awarding Agency')
        awarding_sub_agency = (9, 'Awarding Sub Agency')
        contract_award_type = (10, 'Award Type')

        def __new__(cls, index, label):
            obj = object.__new__(cls)
            obj._value_ = index
            obj.index = index
            obj.expected_label = label
            obj.sort_locator_template = '(//*[contains(@class,"sort-icon") and @value="desc"])[{}]'
            obj.label_locator_template = '(.//*[@class = "header-sort"])[{}]'
            return obj


        def label_locator(self):
            locator = self.label_locator_template.format(self.index)
            return locator


        def sort_locator(self):
            locator = self.sort_locator_template.format(self.index)
            return locator


    class ContractRow(BaseItem):

        def __init__(self, element):
            super(AdvancedSearchPage.ContractRow, self).__init__(element)

        def __repr__(self):
            return self.name()

        def award_id(self):
            return self.find_in('(.//*[@class = "header-label"])[1]').text

        def recipient_name(self):
            return self.find_in('(.//*[@class = "header-label"])[2]').text

        def award_amount(self):
            return self.find_in('(.//*[@class = "header-label"])[5]').text

        def award_amount_as_int(self):
            result = self.award_amount()
            return int(result.replace(',','').replace('$', ))

        def awarding_agency(self):
            return self.find_in('.//*[@class = "ibt-table-cell"][8]//*[@class="cell-content"]').text


# Filter objects
    class AdvancedSearchFilters(BaseItem):
        def __init__(self, element):
            super(AdvancedSearchPage.AdvancedSearchFilters, self).__init__(element)

        #override methods in BaseItem
        def highlight(self, element):
            driver = element._parent
            def apply_style(s):
                driver.execute_script("arguments[0].setAttribute('style', arguments[1]);",element, s)
            original_style = element.get_attribute('style')
            apply_style("background: yellow; border: 2px solid red;")
            time.sleep(.5)
            apply_style(original_style)
            return element

        def scroll_to(self, element):
            driver = element._parent
            hover = ActionChains(driver).move_to_element(element)
            hover.perform()
            time.sleep(1) # necessary to give it time to scroll
            return element

        def find_in(self, locator):
            return self.highlight(self.scroll_to(self.root.find_element_by_xpath(locator)))

        # End Override

        def get_filter(self, label):
            locator = self._filter_locator("TAS")
            root_element = self.find(locator)
            filter = self.TASFilter(root_element)
            return filter

        def submit_filters(self):
            bottom = 2
            locator = '(.//*[@class="submit-button"])[{}]'.format(bottom)
            submit_filter = self.find_in(locator)
            submit_filter.click()
            self.wait_for_table()


        def wait_for_table(self):
            locator = '//div[@class = "loading-message"]'
            self.wait_for_loading(locator)


        def _expand_if_necessary(self, label):
            element = self.find_in('.//*[@class="filter-toggle__button " and contains(@title,"{}")]'.format(label))
            if not self._is_expanded(element):
                element.click()


        def _is_expanded(self, element):
            isExpanded = element.get_attribute('aria-expanded')
            return True if isExpanded == 'true' else False



    # Date Range Selector: includes Fiscal Year checkboxes and DateRage values
    class DateRangeSelector(AdvancedSearchFilters):
        def __init__(self, element):
            super(AdvancedSearchPage.DateRangeSelector, self).__init__(element)


        def select_fiscal_year(self, fy):
            self._expand_if_necessary("Time Period")
            locator = './/input[@id = "fy{}"]'.format(fy)
            fy_element = self.find_in(locator)
            fy_element.click()


    class KeywordFilter(AdvancedSearchFilters):
        def __init__(self, element):
            super(AdvancedSearchPage.KeywordFilter, self).__init__(element)


        def enter_keyword(self, keyword):
            self._expand_if_necessary("Keyword")
            locator = './/*[@id="search"]'
            input = self.find_in(locator)
            input.send_keys(keyword)
            input.send_keys(Keys.ENTER)



    class AgencyFilter(AdvancedSearchFilters):
        def __init__(self, element):
            super(AdvancedSearchPage.AgencyFilter, self).__init__(element)

        def select(self, value):
            self._expand_if_necessary("Agency")
            locator = './/input[@placeholder="Awarding Agency"]'
            input = self.find_in(locator)
            input.send_keys(value)
            time.sleep(1) # give badge time to load
            # select type-ahead box
            badge = self.find_in('//*[@class="usa-da-typeahead"]/ul/li[1]')
            badge.click()


    class RecipientFilter(AdvancedSearchFilters):
        def __init__(self, element):
            super(AdvancedSearchPage.RecipientFilter, self).__init__(element)


        def select(self, value):
            self._expand_if_necessary("Recipient")
            locator = './/*[@id="search"]'
            input = self.find_in(locator)
            input.send_keys(value)
            input.send_keys(Keys.ENTER)


    class TASFilter(AdvancedSearchFilters):

        # html for "loading your data..." in TAS Filter
        # <div class="checkbox-tree-filter-message-container">
	    #     <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="spinner" class="svg-inline--fa fa-spinner fa-w-16 fa-spin " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
		#         <path fill="currentColor" d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"></path>
	    #     </svg>
	    #     <div class="checkbox-tree-filter-message-container__text">Loading your data...</div>
        # </div>

        def __init__(self, element):
            super(AdvancedSearchPage.TASFilter, self).__init__(element)


        def view_tas_component(self):
            self.expand()
            component_tab_locator = './/*[contains(@class, "tab-toggle ") and @title = "Treasury Account Symbol Components"]'
            tab = self.find_in(component_tab_locator)
            tab.click()


        def select(self, value):
            self.expand()
            locator = './/*[@class="geo-entity-dropdown__input"]'
            input = self.find_in(locator)
            input.clear()
            input.send_keys(value)
            wait_locator = '//*[@class="checkbox-tree-filter-message-container"]'
            self.wait_for_loading(wait_locator)
            checkbox_locator = '(.//*[@class="checkbox-tree-label__value-container-value"])[last()]'
            checkbox = self.find_in(checkbox_locator)
            checkbox.click()

        def expand(self):
            self._expand_if_necessary("TAS")


        def select_components(self, tas_code):
            locator_template = '//*[contains(text(), "{}")]/following-sibling::*//input'

        # sample format: 012-X-5268-000
            codes = tas_code.split("-")
        # Agency Identifier (3): codes[0]
            input = self.find_in(locator_template.format("Agency Identifier (AID)"))
            input.clear()
            input.send_keys(codes[0])
            time.sleep(1) # wait for query to return
            input.send_keys(Keys.ENTER)
            # time.sleep(1) # wait for update

        # Availability Type Code (1): codes[1]

        # Main Account code (4): codes[2]
            input = self.find_in(locator_template.format("Main Account Code (MAIN)"))
            input.clear()
            input.send_keys(codes[2])
            time.sleep(1) # wait for query to return
            input.send_keys(Keys.ENTER)
            # time.sleep(1) # wait for update

        # Sub Account code (3): codes[3]

        # Add filters
            locator = './/*[@class = "program-source-components__button"]'
            button = self.find_in(locator)
            button.click()


    class NAICSFilter(AdvancedSearchFilters):

        # html for "loading your data..." in TAS Filter
        # <div class="checkbox-tree-filter-message-container">
	    #     <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="spinner" class="svg-inline--fa fa-spinner fa-w-16 fa-spin " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
		#         <path fill="currentColor" d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"></path>
	    #     </svg>
	    #     <div class="checkbox-tree-filter-message-container__text">Loading your data...</div>
        # </div>

        def __init__(self, element):
            super(AdvancedSearchPage.NAICSFilter, self).__init__(element)


        def expand(self):
            self._expand_if_necessary("NAICS")

        def select_code(self, code):
            self.expand()
            # locate filter
            locator = './/*[@class="geo-entity-dropdown__input"]'
            input = self.find_in(locator)
            input.clear()
            input.send_keys(code)
            # wait for ...loading
            wait_locator = '//*[@class="checkbox-tree-filter-message-container__text"]'
            self.wait_for_loading(wait_locator)
            # submit filter
            checkbox_locator = '(.//ol)[last()]'
            checkbox = self.find_in(checkbox_locator)
            checkbox.click()


    class DEFCFilter(AdvancedSearchFilters):

        # html for "loading your data..." in TAS Filter
        # <div class="checkbox-tree-filter-message-container">
	    #     <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="spinner" class="svg-inline--fa fa-spinner fa-w-16 fa-spin " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
		#         <path fill="currentColor" d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"></path>
	    #     </svg>
	    #     <div class="checkbox-tree-filter-message-container__text">Loading your data...</div>
        # </div>

        def __init__(self, element):
            super(AdvancedSearchPage.DEFCFilter, self).__init__(element)


        def expand(self):
            self._expand_if_necessary("NAICS")