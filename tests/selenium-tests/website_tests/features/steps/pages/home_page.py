from steps.pages.base_page import BasePage
from steps.pages.advanced_search_page import AdvancedSearchPage
from steps.pages.custom_account_data_page import CustomAccountDataDownloadCenterPage
from steps.pages.spending_explorer_page import SpendingExplorerPage
from steps.pages.keyword_search_page import KeywordSearchPage
from steps.pages.custom_award_data_page import CustomAwardDataPage
from steps.pages.dataset_metadata_page import DatasetMetadataPage
from selenium.webdriver.common.action_chains import ActionChains
from enum import Enum, auto
import time
import importlib

# SET US_USERNAME="usaspending"
# SET US_PASSWORD='feder@lspending!1'

class HomePage(BasePage):

    def __init__(self, driver):
        super(HomePage, self).__init__(driver)

    def navigate_to_spending_explorer(self):
        menuElement = self.find(self.HeaderMenu.Spending_Explorer.locator()).click()
        return SpendingExplorerPage(self.driver)

    def _page(self, menuitem):
        module = importlib.import_module('steps.pages')
        module = importlib.reload(module)
        _file_name = '{}_page'.format(menuitem.replace(" ", "_").lower())
        _file = getattr(module, _file_name) # file
        _class_name = '{}Page'.format(menuitem.replace(" ", ""))
        _class = getattr(_file, _class_name) # classname
        return _class(self.driver)

    # TODO these methods can be generalized. Currently specific to a Header menu

    def navigate_to_award_search(self, menuitem):
        menuElement = self.find(self.HeaderMenu.Award_Search.locator())
        hover = ActionChains(self.driver).move_to_element(menuElement)
        hover.perform()

        menuitem_element = self.find(self.AwardSearchMenuItem[menuitem.replace(" ", "_")].locator())
        menuitem_element.click()

        return self._page(menuitem)

    def navigate_to_download_center(self, menuitem):
        menuElement = self.find(self.HeaderMenu.Download_Center.locator())
        hover = ActionChains(self.driver).move_to_element(menuElement)
        hover.perform()

        menuitemElement = self.find(self.DownloadCenterMenuItem[menuitem.replace(" ", "_")].locator())
        self.scroll_to(menuitemElement)
        menuitemElement.click()
        time.sleep(1)

        return self._page(menuitem)


    def navigate_to_profile(self, menuitem):
        menuElement = self.find(self.HeaderMenu[menuitem].locator())
        hover = ActionChains(self.driver).move_to_element(menuElement)
        hover.perform()

        menuitemElement = self.find(self.ProfilesMenuItem[menuitem].locator())
        menuitemElement.click()
        time.sleep(1)

        return self._page(menuitem)

    # end TODO

    class HeaderMenu(Enum):
        Spending_Explorer = auto()
        Award_Search = auto()
        Profiles = auto()
        Download_Center = auto()
        Glossary = auto()

        def locator(self):
            locatorTemplate = "//div[contains(@class, 'full-men')]/ul/li[{}]"
            locator = locatorTemplate.format(self.value)
            return locator

    class AwardSearchMenuItem(Enum):
        Advanced_Search = auto()
        Keyword_Search = auto()

        def locator(self):
            locatorTemplate = '(//*[@class ="nav-children__list-item"])[{}]/a'
            return locatorTemplate.format(self.value)

    class ProfilesMenuItem(Enum):
        Agencies = auto()
        Accounts = auto()
        States = auto()
        Recipients = auto()

        def locator(self):
            locatorTemplate = "//*[@id='app']/div/div/div[1]/header/nav/div/div[4]/ul/li[3]/div/div/ul/li[{}]/a"
            return  locatorTemplate.format(self.value)

    class DownloadCenterMenuItem(Enum):
        Award_Data_Archive = auto()
        Custom_Award_Data = auto()
        Custom_Account_Data = auto()
        Agency_Submission_Files = auto()
        Database_Download = auto()
        API = auto()
        Data_Dictionary = auto()
        Dataset_Metadata = auto()

        def locator(self):
            locatorTemplate = '//*[contains(@class, "nav-children_active")]//li[{}]'
            return  locatorTemplate.format(self.value)
