const {test} = require ('@playwright/test');
const { count } = require('node:console');

test("Product Purchase Validations on Myntra", async ({browser}) =>{

const brandName= 'Roadster';
const descText= 'Cotton';
//creating a new browser interface
const context= await browser.newContext(); 

//creating a tab
const page = await context.newPage();

//Navigatig to website
await page.goto("https://www.myntra.com/");

await page.locator(".desktop-searchBar").pressSequentially("tshirts");
const dropdownpage= await page.locator(".desktop-autoSuggest");
await dropdownpage.waitFor();
const totalcount= await dropdownpage.locator("li[data-value*='for-women']").count();
for (let i=0; i<totalcount; i++)
{
    const text= await dropdownpage.nth(i).textContent();
    if(text === "Tshirts For Women")
    {
        dropdownpage.nth(i).click();
    }
}




});
