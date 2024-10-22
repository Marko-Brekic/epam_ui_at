export class BasePage {

    constructor(page) {
        this.page = page;
    }

    async visit(url) {
        await this.page.goto(url);
    }
}