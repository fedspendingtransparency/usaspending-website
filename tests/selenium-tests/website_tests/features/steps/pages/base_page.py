from abc import ABC
import time
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import StaleElementReferenceException
from selenium.common.exceptions import WebDriverException

class BasePage(ABC):
    """Base class to initialize the base page that will be called from all pages"""

    # WAIT_TOLERANCE_IN_SECONDS = 10
    # POLLING_PERIOD_IN_SECONDS = .500
    # DEFAULT_PAUSE_PERIOD_IN_SECONDS = .500

    def __init__(self, driver):
        self.driver = driver

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
        hover = ActionChains(self.driver).move_to_element(element)
        hover.perform()
        time.sleep(.2) # necessary to give it time to scroll
        return element

    def find(self, locator, how_long = 30):
        xpath_element_is_present = EC.presence_of_element_located((By.XPATH, locator))
        element = WebDriverWait(self.driver, how_long).until(xpath_element_is_present)
        self.highlight(self.scroll_to(element))
        return element

    def find_all(self, locator, how_long = 30):
        time.sleep(.500)
        xpath_elements_are_present = EC.presence_of_all_elements_located((By.XPATH, locator))
        try:
            elements = WebDriverWait(self.driver, how_long).until(xpath_elements_are_present)
        except WebDriverException:
            elements = []
        return elements


    def page_title(self):
        element = self.find('//meta[@property = "og:title"]')
        title = element.get_attribute('content')
        return title

    def _element_exists(self, locator):
        size = 0
        try:
            elements = self.driver.find_elements_by_xpath(locator)
            size = len(elements)
        except WebDriverException:
            # do nothing
            pass
        return size > 0

    def wait_to_disappear(self, locator):
        return WebDriverWait(self.driver, 30).until(EC.invisibility_of_element_located((By.XPATH, locator)))

    def wait_for_loading(self, locator, how_long=30):
        # time.sleep(.3)
        present = self._element_exists(locator)
        if present:
            elements = self.driver.find_elements_by_xpath(locator)
            wait = WebDriverWait(self.driver, how_long)
            for element in elements:
                wait.until(_element_no_longer_loading(element))
        time.sleep(.5) # takes a moment to update after loading

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