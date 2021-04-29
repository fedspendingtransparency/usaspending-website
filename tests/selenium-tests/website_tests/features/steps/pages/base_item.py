from abc import ABC
from steps.pages.base_page import BasePage
from selenium.webdriver.common.action_chains import ActionChains
from selenium.common.exceptions import WebDriverException
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import StaleElementReferenceException
from selenium.common.exceptions import WebDriverException
import time

class BaseItem(ABC):

    def __init__(self, element):
        self.root = element


    # ACTIVATE For development only
    # def highlight(self, element):
    #     driver = element._parent
    #     def apply_style(s):
    #         driver.execute_script("arguments[0].setAttribute('style', arguments[1]);",element, s)
    #     original_style = element.get_attribute('style')
    #     apply_style("background: yellow; border: 2px solid red;")
    #     time.sleep(.5)
    #     apply_style(original_style)
    #     return element

    # def scroll_to(self, element):
    #     driver = element._parent
    #     hover = ActionChains(driver).move_to_element(element)
    #     hover.perform()
    #     time.sleep(1) # necessary to give it time to scroll
    #     return element

    def find_in(self, locator):
        return self.root.find_element_by_xpath(locator)

    def find_all_in(self, locator):
        return self.root.find_elements_by_xpath(locator)

    def _element_exists(self, locator):
        size = 0
        try:
            elements = self.find_all_in(locator)
            size = len(elements)
        except WebDriverException:
            # do nothing
            pass
        return size > 0


    def wait_for_loading(self, locator, how_long=30):
        time.sleep(.5) # give it a moment to display "Loading" message
        present = self._element_exists(locator)
        if present:
            elements = self.root.find_elements_by_xpath(locator)
            wait = WebDriverWait(self.root, how_long)
            for element in elements:
                wait.until(_element_no_longer_loading(element))
        time.sleep(.5) # takes a moment to update after loading



    def __eq__(self, other):
        if isinstance(other, BaseItem):
            return self.root == other.root
        return False

    def __hash__(self):
        return self.root.__hash__()

class _element_no_longer_loading(BasePage):

    def __init__(self, element):
        self.element = element

    def __call__(self, driver):
        try:
            if "loading" in self.highlight(self.element).get_attribute("class"):
                return False
            return True
        except NoSuchElementException:
            return True
        except StaleElementReferenceException:
            return True