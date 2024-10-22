import { BasePage } from "./BasePage";

export class HomePage extends BasePage {

    constructor(page) {
        super(page);
        this.page = page;
        this.body = "body";
        this.themeSwitcher = ".header__vaulting-container .theme-switcher";
        this.languageSelectorEn = page.getByRole("button", { name: "Global (EN)" });
        this.uaLanguageSelector = "//a[@class='location-selector__link'][contains(text(),'Україна')]";
        this.uaLanguageLink = page.getByRole("link", { name: "Україна (Українська)" });
        this.policiesSection = ".policies";
        this.policiesLinkTexts = ".policies-links-wrapper .fat-links";
        this.locationTabs = ".js-tabs-controls a";
        this.ourLocationsHeader = page.getByText("Our Locations");
        this.americasRegionTab = page.getByRole("tab", { name: "AMERICAS" });
        this.emeaRegionTab = page.getByRole("tab", { name: "EMEA" });
        this.apacRegionTab = page.getByRole("tab", { name: "APAC" });
        this.searchButton = page.getByRole("button", { name: "Search" });
        this.searchInputField = page.getByPlaceholder("What are you looking for?");
        this.searchResultArticles = ".search-results__items article";
    }

    async open() {
        await this.visit("/");
        await this.page.waitForLoadState("load");
    }

    async getPageTitle() {
        return await this.page.title();
    }

    async getCurrentTheme() {
        return await this.page.locator(this.body).getAttribute("class");
    }

    async switchTheme() {
        await this.page.click(this.themeSwitcher);
    }

    async changeLanguageToUa() {
        await this.languageSelectorEn.click();
        await this.page.waitForSelector(this.uaLanguageSelector, { state: "visible" });
        await this.uaLanguageLink.click();
        await this.page.waitForLoadState("networkidle");
    }

    async scrollToPoliciesSection() {
        await this.page.locator(this.policiesSection).scrollIntoViewIfNeeded();
    }

    async getPoliciesLinkTexts() {
        return await this.page.locator(this.policiesLinkTexts).allTextContents();
    }

    async scrollToOurLocationsSection() {
        await this.ourLocationsHeader.scrollIntoViewIfNeeded();
    }

    async getLocationsTabTexts() {
        return await this.page.locator(this.locationTabs).allTextContents();
    }

    getRegionTabs() {
        return [
            { name: "EMEA", locator: this.emeaRegionTab },
            { name: "APAC", locator: this.apacRegionTab },
            { name: "AMERICAS", locator: this.americasRegionTab }
        ];
    }

    async performSearch(phrase) {
        await this.searchButton.click();
        await this.searchInputField.fill(phrase);
        await this.page.keyboard.press("Enter");
    }

    async getNumberOfSearchResultArticles() {
        await this.page.waitForSelector(this.searchResultArticles);
        return await this.page.locator(this.searchResultArticles).count();
    }
}