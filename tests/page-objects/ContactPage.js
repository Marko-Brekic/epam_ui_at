import { BasePage } from "./BasePage";

export class ContactPage extends BasePage {

    constructor(page) {
        super(page);
        this.page = page;
        this.formSubmitButton = page.getByRole("button", { name: "Submit" });
        this.firstNameFieldRequiredMsg = page.locator("//label[contains(text(), 'First Name')]/..");
        this.lastNameFieldRequiredMsg = page.locator("//label[contains(text(), 'Last Name')]/..");
        this.emailFieldRequiredMsg = page.locator("//label[contains(text(), 'Email')]/..");
        this.phoneFieldRequiredMsg = page.locator("//label[contains(text(), 'Phone')]/..");
        this.heardAboutEpamFieldRequiredMsg = page.locator("//label[contains(text(), 'How did you hear about EPAM?')]/..");
        this.consentCheckboxRequiredMsg = page.locator("//input[@name='gdprConsent']/../..");
    }

    async open() {
        await this.visit("/about/who-we-are/contact");
        await this.page.waitForLoadState("load");
        return this;
    }

    async submitForm() {
        await this.formSubmitButton.click();
    }

    getRequiredFields() {
        return [
            { name: "firstNameField", locator: this.firstNameFieldRequiredMsg },
            { name: "lastNameField", locator: this.lastNameFieldRequiredMsg },
            { name: "emailField", locator: this.emailFieldRequiredMsg },
            { name: "phoneField", locator: this.phoneFieldRequiredMsg },
            { name: "heardAboutEpamField", locator: this.heardAboutEpamFieldRequiredMsg }
        ];
    }
}