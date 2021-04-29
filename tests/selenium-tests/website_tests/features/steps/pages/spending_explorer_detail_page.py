from steps.pages.base_page import BasePage
from steps.pages.base_item import BaseItem
import steps.pages.spending_explorer_page
from steps.pages.federal_account_detail_page import FederalAccountDetailPage
from selenium.webdriver.common.action_chains import ActionChains
from selenium.common.exceptions import NoSuchElementException
from enum import Enum, auto
import time
import re
import importlib


class SpendingExplorerDetailPage(BasePage):

    def __init__(self, driver):
        super(SpendingExplorerDetailPage, self).__init__(driver)

    def header(self):
        locator = '//h2[@class="detail-header__title"]'
        return self.find(locator).text

    def detail_header_element(self):
        locator = '//div[@class="detail-header"]//h2[@class="detail-header__title"]'
        return self.find(locator)

    def detail_header(self):
        return self.detail_header_element().text

    def select_detail_header(self):
        self.detail_header_element().click()
        time.sleep(.5) # give page transition a chance to start loading to avoid stale component
        return FederalAccountDetailPage(self.driver)

    def period(self):
        locator = '//*[@class="usa-dt-quarter-picker"]'
        parent = self.find(locator)
        locator = '(.//ul[@class="usa-dt-quarter-picker__period-list"]//button[contains(@class, "quarter-picker__quarter_active")])[last()]'
        element = parent.find_element_by_xpath(locator)
        return element.text

    def fy_picker(self):
        locator = '//div[@class = "quarter-picker"]'
        element = self.find(locator)
        return self.DateRangeSelector(element)

    def quarters_selected(self):
        locator = '//button[contains(@class, "quarter-picker__quarter_active")]'
        return len(self.find_all(locator))


    def select_title(self, title):
        title_locator = '//*[local-name()="g"]/*[local-name()="title" and contains(text(),"{}")]/..'.format(title)
        self.find(title_locator).click()
        self._wait_for_load_message_to_disappear()

    def displaying_No_More_Awards(self):
        locator = '//div[@class="no-awards-message"]'
        return self.find(locator).text

    def go_back(self):
        locator = '//button[@class="go-back"]'
        self.find(locator).click()
        self._wait_for_load_message_to_disappear()


    def find_node(self, name):
        title_locator = '//*[local-name()="g"]/*[local-name()="title" and contains(text(),"{}")]/..'.format(name)
        element = self.find(title_locator)
        return self.MapNode(element)

    def select_previous_trail_item(self):
        items = self._find_all_sidebar_items()
        previous = items[-2]
        self.highlight(self.scroll_to(previous.root))
        previous.select()


    def side_bar(self, title):
        items = self._find_all_sidebar_items()
        item = [x for x in items if title in x.title()][0]
        return item


    def select_root_trail_item(self):
        first_item_locator = '//ul[@class="vertical-trail"]//li[first()]/button'
        self.find(first_item_locator).click()

    def start_over(self):
        locator = '//a[@class="start-over-button"]'
        self.find(locator).click()
        return steps.pages.spending_explorer_page.SpendingExplorerPage(self.driver)

    def select_view(self, view):
        locator = '//button[@value="{}"]'.format(view)
        self.find(locator).click()
        self._wait_for_load_message_to_disappear()

    def get_table_record(self, name):
        rows = self._find_all_rows()
        target = [row for row in rows if name in row.name()]
        if target:
            return target[0]
        return None

    def select_table_row(self, name):
        target = self.get_table_record(name)
        while not target:
            if self.goto_next_page():
                target = self.get_table_record(name)
            else:
                raise NoSuchElementException('{} record does not exist'.format(name))

        self.scroll_to(target.root)
        target.select()
        self._wait_for_load_message_to_disappear()


    def goto_next_page(self):
        locator = '(//ul[@class="pager"])[1]//li[@class="pager__item"]/button'
        next_button = self.find_all(locator)
        if (self._element_exists(locator)) and (not "disabled" in next_button[-1].get_attribute("class")):
            next_button[-1].click()
            return True
        else:
            return False



    def unreported_title(self):
        locator = '//div[@class="explorer-unreported"]//h3[@class="explorer-unreported__header"]'
        return self.find(locator).text


    # I could make dropdown an object, overkill? or consistant design?
    def change_to(self, view):
        dropdown_locator = '//button[@class="dropdown__selection"]'
        self.find(dropdown_locator).click()
        item_locator = '//div[text()="{}"]/..'.format(view)
        self.find(item_locator).click()

    def obligated_amount(self):
        obligated_amount_locator = '//div[@class="detail-header__value"]'
        return self.find(obligated_amount_locator).text

    def data_of_date(self):
        locator = '//div[@class="detail-header__update"]'
        result = self.find(locator).text
        return result

    def page_navigator(self):
        locator = '//div[1][@class="usa-dt-pagination"]'
        root = self.find(locator)
        return self.PageNavigator(root)


    def sort_table_by(self, column, direction):
        locator = SpendingExplorerDetailPage.TableColumn[column].sort_locator(direction)
        sort_button = self.find(locator)
        if "active" not in sort_button.get_attribute("class"):
            sort_button.click()


    def _find_all_sidebar_items(self):
        all_locator = '//ul[@class="vertical-trail"]//li[@class="trail-item" and position()>1]'
        elements = self.find_all(all_locator)
        return list(map(lambda r: self.SideBarItem(r), elements))


    def _find_all_rows(self):
        elements = self.find_all('//div[@class="explorer-table"]//tbody//tr')
        return list(map(lambda r: self.Row(r), elements))


    def _wait_for_load_message_to_disappear(self):
        load_message_locator = '//div[@class="explorer-detail-content__loading"]'
        self.wait_for_loading(load_message_locator)


    # Date Range Selector: includes Fiscal Year dropdown and Quarter selector buttons
    class DateRangeSelector(BaseItem):
        def __init__(self, element):
            super(SpendingExplorerDetailPage.DateRangeSelector, self).__init__(element)

        def select_quarter(self, quarter):
            q = quarter[1:]
            locator = '(.//button[contains(@class, "quarter-picker__quarter")])[{}]'.format(q)
            self.find_in(locator).click()

        def select_fiscal_year(self, fy):
            list_locator = './/button[@class="fy-picker__button"]'
            self.find_in(list_locator).click()
            item_locator = './/button[contains(@value, "{}")]'.format(fy)
            self.find_in(item_locator).click()

    # A single record in table view
    class Row(BaseItem):

        def __init__(self, element):
            super(SpendingExplorerDetailPage.Row, self).__init__(element)

        def __repr__(self):
            return self.name()

        def _table_view(self):
            SpendingExplorerDetailPage.select_view("table")

        def select(self):
            self.find_in('./td[1]//button').click()

        def name(self):
            return self.find_in('./td[1]').text

        def amount(self):
            return self.find_in('./td[2]').text

        def amount_as_int(self):
            result = self.amount()
            return int(result.replace(',', '').replace('$',''))

        def percent(self):
            return self.find_in('./td[3]').text

        def percent_as_int(self):
            text = self.percent()
            regex = "-?\d{1,2}\.\d{0,2}"
            matcher = re.compile(regex)
            percent = matcher.findall(text)
            return float(percent[0])


    # The collection of buttons to cycle through pages in table view
    class PageNavigator(BaseItem):

        _totals_text_regex = '(?P<start>\d*)-(?P<end>\d*)\sof\s(?P<total>\d*)\sresults'

        def __init__(self, element):
            super(SpendingExplorerDetailPage.PageNavigator, self).__init__(element)

        def page_count(self):
            buttons = self._find_numbered_buttons()
            last_button = buttons[-1]
            return last_button.text

        def current_page_number(self):
            buttons = self._find_numbered_buttons()
            current_page = [x for x in buttons if "pager__button_active" in x.get_attribute("class")]
            if len(current_page) > 1:
                pass
            return current_page[0].text

        def move_next(self):
            button = self._find_all_page_buttons()[-1]
            button.click()

        def record_count(self):
            text = self._totals_text()
            matches = re.match(self._totals_text_regex, text)
            return int(matches.group("total"))

        def records_per_page(self):
            text = self._totals_text()
            matches = re.match(self._totals_text_regex, text)
            start = matches.group("start")
            end = matches.group("end")
            return (1 + int(end) - int(start))

        def calculated_number_of_pages(self):
            return 1 + self.record_count() // self.records_per_page()

        def _totals_text(self):
            locator = './div'
            return self.find_in(locator).text # e.g. "1-20 of 104 results"

        def _find_all_page_buttons(self):
            locator = './/li[@class="pager__item"]/button'
            return self.find_all_in(locator)

        def _find_numbered_buttons(self):
            buttons = self._find_all_page_buttons()
            # buttons look like < 1 2 3 ... 6 >
            start_index = 1 # ignore "< PREVIOUS" button
            last_index = len(buttons)-1 # ignore "> NEXT" button
            return buttons[1:last_index]


    # Table columns and sort button locators
    class TableColumn(Enum):

        name = (1, 'Name', True)
        amount = (2, 'Obligated Amount', True)
        percent = (3, 'Percent of Total', True)

        def __new__(cls, index, label, can_sort):
            obj = object.__new__(cls)
            obj._value_ = index
            obj.index = index
            obj.label = label
            obj.can_sort = can_sort
            obj.sort_locator_template = '//table/thead/tr/td[{}]/div/div/div/div[2]/button[{}]' # 2 params, index and ascending/descending
            return obj


        def sort_locator(self, order):
            dir = 1 if order.lower() == 'ascending' else 2
            return self.sort_locator_template.format(self.index, dir)


    # The "breadcrumb" on the left navigation
    class SideBarItem(BaseItem):

        def __init__(self, element):
            super(SpendingExplorerDetailPage.SideBarItem, self).__init__(element)

        def type(self):
            locator = './/div[@class="type"]'
            return self.find_in(locator).text

        def title(self):
            locator = './/div[@class="title "]'
            return self.find_in(locator).text

        def amount(self):
            locator = './/div[@class="amount "]'
            return self.find_in(locator).text

        def select(self):
            locator = './button'
            self.find_in(locator).click()


    # A box in the tree-map view
    class MapNode(BaseItem):

        def __init__(self, element):
            super(SpendingExplorerDetailPage.MapNode, self).__init__(element)

        def _name_element(self):
            locator = './/*[local-name()="text" and contains(@class,"explorer-cell-title")]'
            return self.find_in(locator)

        def title(self):
            # locator = './*[local-name()="title"]'
            # title = self.find_in(locator)
            return self.root.text

        def name(self):
            name =  self._name_element().text
            return name

        def hover(self):
            target = self._name_element()
            action = ActionChains(target.parent)
            action.move_to_element(target)
            action.perform()

        def tooltip_amount(self):
            locator = '//div[@class="tooltip top"]//div[@class="tooltip-value"]'
            return self.find_in(locator).text

        def click(self):
            self.root.click()
