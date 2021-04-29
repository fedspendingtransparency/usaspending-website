from steps.pages.base_page import BasePage


class AgencyProfilePage(BasePage):

    def __init__(self, driver):
        super(AgencyProfilePage, self).__init__(driver)

    def header(self):
        locator = '//div[@class="sticky-header__title"]/h1'
        return self.find(locator).text

    def title(self):
        locator = '//div[@class="title"]/h3'
        return self.find(locator).text