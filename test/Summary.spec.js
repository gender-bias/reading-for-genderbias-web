describe('The summary', function() {
    let page;
    before(async function() {
        page = await browser.newPage();
        await page.goto(PAGE_URL);
    });

    after(async function() {
        await page.close();
    });

    describe('initially', function() {
        it("should not exist", async function() {
            const summaryContainer = await page.$(SEL_SIDEBAR_CONTAINER);
            expect(summaryContainer).to.be.null;
        });
    });

    describe('after submission', function() {
        before(async function() {
            await page.type(SEL_TEXTAREA, TEXT);

            const button = await page.$(SEL_SUBMIT);
            await button.click();
        });

        it('should hide the header component', async function() {
            const header = await page.$(HEADING_SELECTOR);
            expect(header).to.be.null;
        });

        it('should appear', async function() {
            const summaryContainer = await page.$(SEL_SIDEBAR_CONTAINER);
            expect(summaryContainer).to.exist;
        });
        it('should have correct number of summaries', async function() {
            await page.waitFor(SEL_ISSUE_P);
            expect(await page.$$(SEL_ISSUE_P)).to.have.lengthOf(2);
        });
        it('should be highlighted on mouseover', async function() {
            await page.hover(SEL_ISSUE);
            const issueHover = await page.waitFor(SEL_ISSUE_HOVER);
            expect(issueHover).to.exist;
        });

        it('should highlight the corresponding flag', async function() {
            await page.hover(SEL_ISSUE);

            const element = await page.$(".issueHover");
            expect(element).to.exist;
        });
    });
});