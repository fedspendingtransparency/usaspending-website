from steps.pages.base_page import BasePage
from steps.pages.base_item import BaseItem
from selenium.webdriver.common.action_chains import ActionChains
from enum import Enum, auto
import time
import importlib


class CustomAccountDataDownloadCenterPage(BasePage):

    def __init__(self, driver):
        super(CustomAccountDataDownloadCenterPage, self).__init__(driver)

    def header(self):
        header_locator = '//*[@id="main-focus"]'
        header_text = self.find(header_locator).text
        return header_text

    def title(self):
        title_locator = '//*[@id="main-content"]//*[@class="download-center__title"]'
        title_text = self.find(title_locator).text
        return title_text

    def select_account_level(self, acccount_level):
        locator = self.AccountLevel[acccount_level].locator()
        self.find(locator).click()
        return self

    def select_file_type(self, file_type):
        locator = self.FileType[file_type.replace(" ", "_")].locator()
        self.find(locator).click()
        return self

    def select_quarter(self, year, quarter):
        self._select_year(year)

        self._select_quarter(quarter)

    def selectBudgetFunction(self, budget_function, budget_subfunction):
        picker = self._budget_function_picker()
        picker.click()

        budgetFunctions = self._budget_functions()
        function_element = list(filter(lambda x: x.text == budget_function, budgetFunctions))[0]
        self.scroll_to(function_element)
        function_element.click()

        if(budget_subfunction):
            picker = self._budget_sub_function_picker()
            picker.click()
            budget_subfunctions = self._budget_subfunctions()
            subfunction_element = list(filter(lambda x: budget_subfunction in x.text, budget_subfunctions))[0]
            self.scroll_to(subfunction_element)
            subfunction_element.click()

        return self

    def get_selected_options_instance(self):
        locator = '//*[@class="download-user-selections"]'
        return self.SelectedOptions(self.find(locator))

    def _budget_function_picker(self):
        budget_function_picker_locator = '//*[@id="main-content"]/div/div[2]/div/div[1]/form/div[1]/div/div[1]/div/div/button'
        return self.find(budget_function_picker_locator)

    def _budget_sub_function_picker(self):
        budget_subfunction_picker_locator = '//*[@id="main-content"]/div/div[2]/div/div[1]/form/div[1]/div/div[2]/div/div/button'
        return self.find(budget_subfunction_picker_locator)

    def _budget_functions(self):
        budget_functions_locator = '//*[@id="main-content"]/div/div[2]/div/div[1]/form/div[1]/div/div[1]/div/div/div/ul/li/button'
        return self.find_all(budget_functions_locator)

    def _budget_subfunctions(self):
        budget_subfunctions_locator = '//*[@id="main-content"]/div/div[2]/div/div[1]/form/div[1]/div/div[2]/div/div/div/ul/li/button'
        return self.find_all(budget_subfunctions_locator)

    def _fiscal_year_picker(self):
        locator = '//button[@class="fy-picker__button"]'
        return self.find(locator)

    def _fiscal_years(self):
        locator = '//li[@class="fy-picker__list-item"]/button'
        return self.find_all(locator)

    def _quarter_locator(self, quarter):
        locator = '(//li[@class = "quarter-picker__list-item"])'
        quarter_element = list(filter(lambda x: quarter in x.text, self.find_all(locator)))[0]
        return quarter_element

    def _select_year(self, year):
        picker = self._fiscal_year_picker()
        picker.click()

        years = self._fiscal_years()
        year_element = list(filter(lambda x: year in x.text, years))[0]
        self.scroll_to(year_element)
        year_element.click()

    def _select_quarter(self, quarter):
        self._quarter_locator(quarter).click()


    class AccountLevel(Enum):

            Federal = auto()
            Treasury = auto()

            def locator(self):
                locator_template = '(//div[@class="radio"]/input[@name="account-level"])[{}]'
                locator = locator_template.format(self.value)
                return  locator

    class FileType(Enum):

            Account_Balances = auto()
            Account_Breakdown_by_Program_Activity_And_Object_Class = auto()
            Accoutn_Breakdown_by_Award = auto()

            def locator(self):
                locator_template = '(//input[@name="submission-type"])[{}]'
                locator = locator_template.format(self.value)
                return  locator

    class SelectedOptions(BaseItem):

        __option_locator_template = '(//div[@class="selection"]/child::div[2])[{}]'

        def __init__(self, element):
            super(CustomAccountDataDownloadCenterPage.SelectedOptions, self).__init__(element)

        def budget_function(self):
            locator = self.__option_locator_template.format('1')
            return self.find_in(locator).text

        def budget_subfunction(self):
            locator = self.__option_locator_template.format('2')
            return self.find_in(locator).text

        def agency(self):
            locator = self.__option_locator_template.format('3')
            return self.find_in(locator).text

        def federal_account(self):
            locator = self.__option_locator_template.format('4')
            return self.find_in(locator).text

        def account_level(self):
            locator = self.__option_locator_template.format('5')
            return self.find_in(locator).text

        def file_submission_type(self):
            locator = self.__option_locator_template.format('6')
            return self.find_in(locator).text

        def fiscal_year(self):
            locator = self.__option_locator_template.format('7')
            return self.find_in(locator).text
