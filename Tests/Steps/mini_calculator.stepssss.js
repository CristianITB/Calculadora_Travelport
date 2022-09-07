const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

const url = "http://127.0.0.1:5500/index.html";

Given('a user opens the app', async () => {
// Write code here that turns the phrase above into concrete actions
//return 'pending';
await page.goto(url);
});

Then('the display screen should show the following value: {string}', async function (string) {
// Write code here that turns the phrase above into concrete actions
//return 'pending';
const display = await page.locator('data-testid=display').innerText();
expect(display).toBe(string);
});
