import { test as baseTest } from "@playwright/test";
import { HomePage } from "../page-objects/HomePage";
import { ContactPage } from "../page-objects/ContactPage";
import { AboutPage } from "../page-objects/AboutPage";

const test = baseTest.extend({
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await use(homePage);
    },
    contactPage: async ({ page }, use) => {
        const contactPage = new ContactPage(page);
        await use(contactPage);
    },
    aboutPage: async ({ page }, use) => {
        const aboutPage = new AboutPage(page);
        await use(aboutPage);
    }
});

export { test };