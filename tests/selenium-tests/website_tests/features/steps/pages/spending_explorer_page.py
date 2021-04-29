from steps.pages.base_page import BasePage
from steps.pages.base_item import BaseItem
# from steps.pages.spending_explorer_detail_page import SpendingExplorerDetailPage
import steps.pages.spending_explorer_detail_page
from selenium.webdriver.common.action_chains import ActionChains
from enum import Enum, auto
import time
import importlib


class SpendingExplorerPage(BasePage):


    def __init__(self, driver):
        super(SpendingExplorerPage, self).__init__(driver)

    def header(self):
        header_locator = '//*[@class="usda-page-header__title"]'
        element = self.find(header_locator)
        text = element.text
        return text

    def title(self):
        title_locator = '//h2[@class="explorer-landing__title"]'
        return self.find(title_locator).text

    def find_entry(self, entry):
        locator_template = '(//div[@class="landing-option"])[{}]'
        index = self.Pages[entry.replace(" ", "_")].index
        locator = locator_template.format(index)
        element = self.find(locator)
        return self.Page(element)

    def find_glossary(self):
        locator = '//div[@class="usa-da-glossary-wrapper"]'
        glossary_element = self.find(locator)
        return SpendingExplorerPage.Glossary(glossary_element)

    class Pages(Enum):
        Budget_Function = (1, 'See spending divided by a high level categorization based on purpose.')
        Agency = (2, 'See spending divided by all U.S. government agencies.')
        Object_Class = (3, 'See spending grouped by the types of items and services purchased by the federal government.')


        def __new__(cls, index, expected_description):
            obj = object.__new__(cls)
            obj.index = index
            obj.expected_description = expected_description
            obj.page_locator_template = '(//div[@class="landing-option"])[{}]'
            return obj


        def locator(self):
            locator = self.page_locator_template.format(self.index)
            return locator


    class Page(BaseItem):

        def __init__(self, driver):
            super(SpendingExplorerPage.Page, self).__init__(driver)


        def title(self):
            locator = './/h2[@class="landing-option__title"]'
            return self.find_in(locator).text


        def description(self):
            locator = './/div[@class="landing-option__description"]'
            return self.find_in(locator).text


        def open_glossary(self):
            locator = './/*[@class="usa-da-icon-guide"]'
            self.find_in(locator).click()


        def navigate_to_detail(self):
            locator = './/a[@class="landing-option__button"]'
            element = self.find_in(locator)
            element.click()
            return steps.pages.spending_explorer_detail_page.SpendingExplorerDetailPage(self.root.parent)

    class Glossary(BaseItem):

        def __init__(self, driver):
            super(SpendingExplorerPage.Glossary, self).__init__(driver)


        def term(self):
            locator = './/h2[@class = "term"]'
            return self.find_in(locator).text


        def close(self):
            locator = '//button[@id="glossary-close-button"]'
            return self.find_in(locator).click()