from steps.pages.base_page import BasePage
from steps.pages.base_item import BaseItem
import steps.pages.spending_explorer_page
from selenium.webdriver.common.action_chains import ActionChains
from enum import Enum, auto
import time
import re
import importlib

class FederalAccountDetailPage(BasePage):

    def __init__(self, driver):
        super(FederalAccountDetailPage, self).__init__(driver)

    def title(self):
        title_locator = '//div[@class="sticky-header__title"]/h1'
        return self.find(title_locator).text

    def header(self):
        header_locator = '//div[@class="account-overview"]/h3[1]'
        return self.find(header_locator).text