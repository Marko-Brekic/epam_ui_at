import { BasePage } from "./BasePage";

export class AboutPage extends BasePage {

    constructor(page) {
        super(page);
        this.page = page;
        this.epamHeaderLogo = page.locator(".header__logo-link");
        this.downloadReportButton = page.getByRole("link", { name: "DOWNLOAD" });
    }

    async open() {
        await this.visit("/about");
        await this.page.waitForLoadState("load");
    }

    async navigateToHomePageViaEpamHeaderLogo() {
        await this.epamHeaderLogo.click();
    }

    async downloadReport() {
        const waitForDownloadEvent = this.page.waitForEvent("download");
        await this.downloadReportButton.click();
        const download = await waitForDownloadEvent;
        await download.saveAs("./downloads/" + download.suggestedFilename());
        return download.suggestedFilename();    
    }
}