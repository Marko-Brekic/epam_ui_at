import { test } from "./utils/epam-fixtures";
import { expect } from "@playwright/test";
import testData from "../data/test-data.json";

test.describe("Homepage tests", () => {

    test.beforeEach(async ({ homePage }) => {
        await homePage.open();
    });

    test("Check if title is correct", async ({ homePage }) => {
        const pageTitle = await homePage.getPageTitle();
        expect(pageTitle).toBe(testData.homePageTitleEn);
    });

    test("Check the ability to switch Light / Dark mode", async ({ homePage }) => {
        const initialTheme = await homePage.getCurrentTheme();
        await homePage.switchTheme();
        const changedTheme = await homePage.getCurrentTheme();
        if (initialTheme.includes("dark-mode")) {
            expect(changedTheme).toContain("light-mode");
        } else {
            expect(changedTheme).toContain("dark-mode");
        }
    });

    test("Check that allow to change language to UA", async ({ homePage }) => {
        await homePage.changeLanguageToUa();
        const currentPageTitle = await homePage.getPageTitle();
        expect(currentPageTitle).toBe(testData.pageTitleUa);
    });

    test("Check the policies list", async ({ homePage }) => {
        const expectedLinkTexts = testData.policiesLinkTexts;
        await homePage.scrollToPoliciesSection();
        const policiesLinkTexts = await homePage.getPoliciesLinkTexts();
        expectedLinkTexts.forEach(linkText => {
            expect(policiesLinkTexts).toContain(linkText);
        });
    });

    test("Check that allow to switch location list by region", async ({ homePage }) => {
        const expectedRegions = testData.regions;
        await homePage.scrollToOurLocationsSection();
        const regionLinkTexts = await homePage.getLocationsTabTexts();
        expect(regionLinkTexts).toEqual(expectedRegions);
        for (const regionTab of homePage.getRegionTabs()) {
            await regionTab.locator.click();
            await expect(regionTab.locator).toHaveClass(/active/);
        }
    });

    test("Check the search function", async ({ homePage }) => {
        await homePage.performSearch(testData.searchPhrase);
        const numberOfSearchResultArticles = await homePage.getNumberOfSearchResultArticles();
        expect(numberOfSearchResultArticles).toBeGreaterThan(0);
    });

});

test.describe("Contact page tests", () => {

    test("Check form fields validation", async ({ contactPage }) => {
        await contactPage.open();
        await contactPage.submitForm();
        for (const requiredField of contactPage.getRequiredFields()) {
            const requiredFieldMsg = await requiredField.locator.getAttribute("data-required-msg");
            expect(requiredFieldMsg).toBe(testData.contactForm.fieldRequiredMsg);
        }
        const requiredCheckboxMsg = await contactPage.consentCheckboxRequiredMsg.getAttribute("data-required-msg");
        expect(requiredCheckboxMsg).toBe(testData.contactForm.consentCheckboxRequiredMsg);
    });

});

test.describe("About page tests", () => {

    test("Check that the Company logo in the header leads to the main page", async ({ aboutPage, homePage }) => {
        await aboutPage.open();
        await aboutPage.navigateToHomePageViaEpamHeaderLogo();
        const currentPageUrl = homePage.page.url();
        expect(currentPageUrl).toBe(testData.homePageUrlEn);
    });

    test("Check that it is possible to download report", async ({ aboutPage }) => {
        await aboutPage.open();
        const downloadedFileName = await aboutPage.downloadReport();
        const expectedFileName = testData.reportFileName;
        expect(downloadedFileName).toBe(expectedFileName);
    });

});

// test("Check if title is correct", async ({ page }) => {
//     await page.goto("https://www.epam.com/");
//     const title = await page.title();
//     const titleText = "EPAM | Software Engineering & Product Development Services"
//     expect(title).toBe(titleText);
// });

// test("Check the ability to switch Light / Dark mode", async ({ page }) => {
//     await page.goto("https://www.epam.com/");
//     const initialTheme = await page.locator("body").getAttribute("class");
//     await page.click(".header__vaulting-container .theme-switcher");
//     const changedTheme = await page.locator("body").getAttribute("class");
//     //expect(changedTheme).not.toBe(initialTheme);
//     if (initialTheme.includes("dark-mode")) {
//         expect(changedTheme).toContain("light-mode");
//     } else {
//         expect(changedTheme).toContain("dark-mode");
//     }
// });

// test("Check that allow to change language to UA", async ({ page }) => {
//     await page.goto("https://www.epam.com/");
//     await page.click(".location-selector__button");
//     const uaLocationListItem = await page.locator(".location-selector__link[href='https://careers.epam.ua']");
//     await uaLocationListItem.click();
//     const headerLanguagePrefix = await page.locator(".header__controls .location-selector__button");
//     const headerLanguagePrefixText = await headerLanguagePrefix.textContent();
//     expect(headerLanguagePrefixText).toContain("Україна (UA)");
// });

// test("Check the policies list", async ({ page }) => {
//     await page.goto("https://www.epam.com/");
//     const expectedLinkTexts = ["INVESTORS", "COOKIE POLICY", "OPEN SOURCE", "APPLICANT PRIVACY NOTICE", "PRIVACY POLICY", "WEB ACCESSIBILITY"];
//     const policiesSection = page.locator(".policies");
//     await policiesSection.scrollIntoViewIfNeeded();
//     const policiesLinkTexts = await page.locator(".policies-links-wrapper .fat-links").allTextContents();
//     expectedLinkTexts.forEach(linkText => {
//         expect(policiesLinkTexts).toContain(linkText);
//     });
// });

// test("Check that allow to switch location list by region", async ({ page }) => {
//     await page.goto("https://www.epam.com/");
//     const expectedRegions = ["AMERICAS", "EMEA", "APAC"];
//     const ourLocationsHeader = page.locator("//span[@class='museo-sans-light'][contains(text(),'Our')]");
//     await ourLocationsHeader.scrollIntoViewIfNeeded();
//     const regionLinkTexts = await page.locator(".js-tabs-controls a").allTextContents();
//     expect(regionLinkTexts).toEqual(expectedRegions);
//     const americasRegionLink = page.locator("//a[contains(text(), 'AMERICAS')]");
//     const emeaRegionLink = page.locator("//a[contains(text(), 'EMEA')]");
//     const apacRegionLink = page.locator("//a[contains(text(), 'APAC')]");
//     await emeaRegionLink.click();
//     expect(emeaRegionLink).toHaveClass(/active/);
//     await apacRegionLink.click();
//     expect(apacRegionLink).toHaveClass(/active/);
//     await americasRegionLink.click();
//     expect(americasRegionLink).toHaveClass(/active/);
// });

// test("Check the search function", async ({ page }) => {
//     await page.goto("https://www.epam.com/");
//     const searchIcon = page.locator(".search-icon");
//     await searchIcon.click();
//     const searchInputField = page.getByPlaceholder("What are you looking for?");
//     await searchInputField.fill("AI");
//     await page.keyboard.press("Enter");
//     await page.waitForSelector(".search-results__items article");
//     const searchResultArticles = page.locator(".search-results__items article");
//     const searchResultArticleCount = await searchResultArticles.count();
//     expect(searchResultArticleCount).toBeGreaterThan(0);
// });

// test("Check form fields validation", async ({ page }) => {
//     await page.goto("https://www.epam.com/about/who-we-are/contact");
//     const formSubmitButton = page.getByRole('button', { name: 'Submit' });
//     await formSubmitButton.click();

//     const firstNameField = page.locator("//label[contains(text(), 'First Name')]/..");
//     const lastNameField = page.locator("//label[contains(text(), 'Last Name')]/..");    // not actually a field but parent
//     const emailField = page.locator("//label[contains(text(), 'Email')]/..");
//     const phoneField = page.locator("//label[contains(text(), 'Phone')]/..");
//     const heardAboutEpamField = page.locator("//label[contains(text(), 'How did you hear about EPAM?')]/..");
//     const consentCheckbox = page.locator("//input[@name='gdprConsent']/../..");

//     const firstNameFieldDataRequiredMsg = await firstNameField.getAttribute("data-required-msg");
//     expect(firstNameFieldDataRequiredMsg).toBe("This is a required field");
//     const lastNameFieldDataRequiredMsg = await lastNameField.getAttribute("data-required-msg");
//     expect(lastNameFieldDataRequiredMsg).toBe("This is a required field");
//     const emailFieldDataRequiredMsg = await emailField.getAttribute("data-required-msg");
//     expect(emailFieldDataRequiredMsg).toBe("This is a required field");
//     const phoneFieldDataRequiredMsg = await phoneField.getAttribute("data-required-msg");
//     expect(phoneFieldDataRequiredMsg).toBe("This is a required field");
//     const heardAboutEpamFieldDataRequiredMsg = await heardAboutEpamField.getAttribute("data-required-msg");
//     expect(heardAboutEpamFieldDataRequiredMsg).toBe("This is a required field");
//     const consentCheckboxDataRequiredMsg = await consentCheckbox.getAttribute("data-required-msg");
//     expect(consentCheckboxDataRequiredMsg).toBe("Please check this box if you want to proceed");
// });

// test("Check that the Company logo in the header leads to the main page", async ({ page }) => {
//     await page.goto("https://www.epam.com/about");
//     const epamHeaderLogo = page.locator(".header__logo-link");
//     await epamHeaderLogo.click();
//     const currentPageUrl = page.url();
//     expect(currentPageUrl).toBe("https://www.epam.com/");
// });

// test("Check that it is possible to download report", async ({ page }) => {
//     await page.goto("https://www.epam.com/about");
//     const waitForDownloadEvent = page.waitForEvent("download");
//     const reportDownloadButton = page.locator("//span[@class='button__content button__content--desktop'][contains(text(), 'DOWNLOAD')]");
//     await reportDownloadButton.click();
//     const download = await waitForDownloadEvent;
//     await download.saveAs("./downloads/" + download.suggestedFilename());
//     const downloadedFileName = download.suggestedFilename();
//     const expectedFileName = "EPAM_Corporate_Overview_Q4_EOY.pdf";
//     expect(downloadedFileName).toBe(expectedFileName);
// });

