from steps.pages.base_page import BasePage
from steps.pages.base_item import BaseItem
from steps.pages.agency_profile_page import AgencyProfilePage
from steps.pages.recipient_profile_page import RecipientProfilePage
from selenium.webdriver.common.action_chains import ActionChains
from selenium.common.exceptions import TimeoutException
from enum import Enum, auto
import datetime
import time


class AwardDetailPage(BasePage):

    def __init__(self, driver):
        super(AwardDetailPage, self).__init__(driver)


    def header(self):
        locator = '//div[@class="sticky-header__title"]/h1'
        return self.find(locator).text


    def contract_props(self):
        contract = {'piid': self._piid_element().text}
        contract['name'] = self._recipient_element().text
        contract['awarder'] = self._awarder_element().text
        contract['type'] = self._type_element().text
        return contract


    def select_awarder(self):
        self._awarder_element().click()
        time.sleep(.5) # give it second to get off source page
        return AgencyProfilePage(self.driver)


    def select_recipient(self):
        self._recipient_element().click()
        time.sleep(.5) # give it second to get off source page
        return RecipientProfilePage(self.driver)


    def tool_tip(self, index):
        hover_locator = '(//div[@class = "tooltip__hover-wrapper"]//*[local-name() = "svg"])[{}]'.format(index)
        hover = self.find(hover_locator)
        if index in range(9,11):
            hover.find_element_by_xpath('./../../..').click()
        self.driver.execute_script("window.scrollBy(0, -20);")
        actions = ActionChains(self.driver).move_to_element(hover)
        actions.perform()
        time.sleep(.5)
        javascript = "return document.getElementsByClassName('tooltip__title')[0].innerText;"
        return self.driver.execute_script(javascript)


    def _active_table(self):
        locator = '//div[@class="table-types"]//*[contains(@class, "table-type-toggle")]'
        tabs = self.find_all(locator)
        for index in range(len(tabs)):
            active = True if 'active' in tabs[index].get_attribute('class') else False
            if active:
                enums_are_base_1 = index + 1
                return self.AwardSearchTable(enums_are_base_1).target()


    def find_all_rows(self):
        row_locator = '//div[@class="tables-content"]/div[last()]//div[@class="ibt-table-row"]'
        elements = self.find_all(row_locator, how_long=120)
        # what table is selected
        active_type = self._active_table()
        t = getattr(self, '{}Row'.format(active_type))
        # get rows
        return list(map(lambda r: t(r), elements))

    def sort(self, table_name, field_name, direction):
        table = self.AwardSearchTable[table_name.replace(" ", "_")]
        self.find(table.tab_locator()).click()
        fields = getattr(self, '{}Fields'.format(table_name.replace(" ", "")))
        field = fields[field_name.replace(" ", "_")]
        sort_button = field.sort_locator(direction)
        self.find(sort_button).click()
        how_long = 120
        try:
            self.wait_for_loading('//div[contains(@class, "-table") and contains(@class, "loading")]', how_long)
        except TimeoutException as te:
            message = 'Timed out after waiting {} seconds for table "{}" and field "{}" to load'.format(how_long, table_name, field_name)
            raise Exception(message) from te


    def _awarder_element(self):
        awarder_locator = '//h5[@class="award-overview__left-section__agency-name"]/a'
        return self.find(awarder_locator)


    def _recipient_element(self):
        name_locator = '//h5[contains(@class, "award-overview__left-section__agency-name__recipient")]/a'
        return self.find(name_locator)


    def _piid_element(self):
        piid_locator = '//div[@class="award__heading-id"]/p'
        return self.find(piid_locator)


    def _type_element(self):
        type_locator = '//div[@class="award__info"]/h2'
        return self.find(type_locator)


    def _select_table(self, tablename):
        table_name = tablename.replace(" ", "_")
        self.find(self.AwardSearchTable[table_name].tab_locator()).click()


    class AwardSearchTable(Enum):
        Transaction_History = auto()
        SubAwards = auto()
        Federal_Account_Funding = auto()

        def __new__(cls, index):
            obj = object.__new__(cls)
            obj._value_ = index
            obj.locator = '//div[@class="table-types"]//*[contains(@class, "table-type-toggle")][{}]'
            return obj

        def target(self):
            return self.name.replace("_", "")

        def tab_locator(self):
            return self.locator.format(self.value)


    class TransactionHistoryFields(Enum):
        Modification_Number = auto()
        Action_Date = auto()
        Amount = auto()
        Reason_for_Modification = auto()
        Description = auto()

        def sort_locator(self, direction):
            dir = 1 if "asc" in direction.lower() else 2
            locator = '(//div[@class="ibt-header-cell"][{}]//button[contains(@class, "sort-icon")])[{}]'
            return locator.format(self.value, dir)


    class TransactionHistoryRow(BaseItem):

        def __init__(self, element):
            super(AwardDetailPage.TransactionHistoryRow, self).__init__(element)


        def __repr__(self):
            return '[{}, {}, {}, {}, {}]\n'.format(self.Modification_Number(), self.Action_Date(), self.Amount(), self.Reason_for_Modification(), self.Description())


        def Modification_Number(self):
            return self.find_in('(.//div[@class="cell-content"])[1]').text


        def Action_Date(self):
            action_date = self.find_in('(.//div[@class="cell-content"])[2]').text
            d = datetime.datetime.strptime(action_date, '%m/%d/%Y')
            return d


        def Amount(self):
            amount = self.find_in('(.//div[@class="cell-content"])[3]').text
            amount = amount.replace("$", "")
            amount = amount.replace(",", "")
            return int(amount)


        def Reason_for_Modification(self):
            return self.find_in('(.//div[@class="cell-content"])[4]').text


        def Description(self):
            return self.find_in('(.//div[@class="cell-content"])[5]').text


    class SubAwardsFields(Enum):
        Sub_Award_ID = auto()
        Recipient_Name = auto()
        Action_Date = auto()
        Amount = auto()
        Description = auto()

        def sort_locator(self, direction):
            dir = 1 if "asc" in direction.lower() else 2
            locator = '(//div[@class="ibt-header-cell"][{}]//button[contains(@class, "sort-icon")])[{}]'
            return locator.format(self.value, dir)


    class SubAwardsRow(BaseItem):

        def __init__(self, element):
            super(AwardDetailPage.SubAwardsRow, self).__init__(element)


        def __repr__(self):
            return '[{}, {}, {}, {}]\n'.format(self.Sub_Award_ID(), self.Recipient_Name(), self.Action_Date(), self.Amount())
            # return '\n{}'.format(self.Description())


        def Sub_Award_ID(self):
            return self.find_in('(.//div[@class="cell-content"])[1]').text


        def Recipient_Name(self):
            return self.find_in('(.//div[@class="cell-content"])[2]').text


        def Action_Date(self):
            action_date = self.find_in('(.//div[@class="cell-content"])[3]').text
            d = datetime.datetime.strptime(action_date, '%m/%d/%Y')
            return d


        def Amount(self):
            amount = self.find_in('(.//div[@class="cell-content"])[4]').text
            amount = amount.replace("$", "")
            amount = amount.replace(",", "")
            return int(amount)


        def Description(self):
            return self.find_in('(.//div[@class="cell-content"])[5]').text


    class FederalAccountFundingFields(Enum):
        Submission_Date = auto()
        Federal_Account = auto()
        Funding_Agency = auto()
        Awarding_Agency = auto()
        Program_Activity = auto()
        Object_Class = auto()
        Funding_Obligated = auto()

        def sort_locator(self, direction):
            dir = 1 if "asc" in direction.lower() else 2
            locator = '(//div[@class="ibt-header-cell"][{}]//button[contains(@class, "sort-icon")])[{}]'
            return locator.format(self.value, dir)

    class FederalAccountFundingRow(BaseItem):

        def __init__(self, element):
            super(AwardDetailPage.FederalAccountFundingRow, self).__init__(element)


        def __repr__(self):
            return '[{}, {}, {}, {}]\n'.format(self.Federal_Account(), self.Funding_Agency(), self.Awarding_Agency(), self.Funding_Obligated())


        def Submission_Date(self):
            text = self.find_in('(.//div[@class="cell-content"])[1]').text
            text = text.replace('FY ', '')
            text = text.replace(' Q', '')
            return int(text)


        def Federal_Account(self):
            return self.find_in('(.//div[@class="cell-content"])[2]').text


        def Funding_Agency(self):
            return self.find_in('(.//div[@class="cell-content"])[3]').text


        def Awarding_Agency(self):
            return self.find_in('(.//div[@class="cell-content"])[4]').text


        def Program_Activity(self):
            return self.find_in('(.//div[@class="cell-content"])[5]').text


        def Object_Class(self):
            return self.find_in('(.//div[@class="cell-content"])[6]').text


        def Funding_Obligated(self):
            amount = self.find_in('(.//div[@class="cell-content"])[7]').text
            amount = amount.replace("$", "")
            amount = amount.replace(",", "")
            return int(amount)