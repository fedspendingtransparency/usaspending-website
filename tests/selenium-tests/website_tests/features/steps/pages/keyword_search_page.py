from steps.pages.base_page import BasePage
from steps.pages.base_item import BaseItem
from steps.pages.award_detail_page import AwardDetailPage
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains
from enum import Enum, auto
import time

class KeywordSearchPage(BasePage):

    def __init__(self, driver):
        super(KeywordSearchPage, self).__init__(driver)


    # Placeholder object for Page methods.
    #
    # Stub required for HomePage._page(menuitem) method