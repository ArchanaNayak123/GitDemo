const {test} = require ('@playwright/test');
const { count } = require('node:console');

test("Product Purchase Validations", async ({browser}) =>{

const brandName= 'Real Essentials';
const descText= 'Crewneck';
//creating a new browser interface
const context= await browser.newContext(); 

//creating a tab
const page = await context.newPage();

//Navigatig to website
await page.goto("https://amazon.com");

console.log(await page.title());

// page.locator("input[class*='ZvCKfk']").fill("archananayak.parkala@gmail.com");
// page.locator("button[class*='KcXDCU']").click();

await page.locator("#twotabsearchtextbox").pressSequentially("tshirts");

const options= page.locator(".left-pane-results-container");

await options.waitFor();

const dropdowncount= await options.locator("div[aria-label*='tshirts']").count();
for( let i=0; i< dropdowncount; i++)
{
   const text= await options.locator("div[aria-label*='tshirts']").nth(i).textContent();
   console.log(text);
   if(text === "tshirts shirts for women")
   {
    await options.locator("div[aria-label*='tshirts']").nth(i).click();
    break;
    
   }
}

const pageload= page.locator(".s-main-slot");
await pageload.last().waitFor();
const productsdesc= page.locator("div[data-cy*='title-recipe']");
productsdesc.first().waitFor();
const prod= productsdesc.filter({hasText: brandName}).filter({hasText: descText});
await prod.last().waitFor();
console.log("Starting to scroll to load the products");
for (let j=0; j< 6; j++)
{
   await page.evaluate(()=>{
window.scrollTo(0, document.body.scrollHeight);
   });

   await page.waitForLoadState('networkidle');
   const countvalue1= await prod.count();

}

const countvalue= await prod.count();
for (let i=0; i<countvalue; i++)
{
   await prod.nth(i).scrollIntoViewIfNeeded();
   const textvalue= await prod.nth(i).textContent();
   console.log(textvalue);
   const firstprod=  prod.nth(0);
const secondprod=  prod.nth(1);
   

}
console.log(countvalue);




/*const pageload= page.locator(".s-main-slot");
await pageload.waitFor();
const products=  page.locator("div[data-cy*='title-recipe']").filter({hasText: brandName}).filter({hasText: descText});
const count= await products.count();
console.log(count);
const firstprod=  products.nth(0);
const secondprod=  products.nth(1);

await firstprod.waitFor();
const mrp1= await firstprod.locator("div[class*='s-price-instructions-style']").textContent();
await firstprod.waitFor();
const mrp2= await secondprod.locator("div[class*='s-price-instructions-style']").textContent();
console.log(mrp1);
console.log(mrp2);


await firstprod.locator("div[class*='a-spacing-top-mini']").click();
await secondprod.locator("div[class*='a-spacing-top-mini']").click();



await page.locator("#nav-cart").click();
*/









});