from steps.pages.base_page import BasePage


class RecipientProfilePage(BasePage):

    def __init__(self, driver):
        super(RecipientProfilePage, self).__init__(driver)

    def header(self):
        locator = '//div[@class="sticky-header__title"]/h1'
        return self.find(locator).text

    def title(self):
        locator = '//h2[@class="recipient-overview__title"]'
        return self.find(locator).text