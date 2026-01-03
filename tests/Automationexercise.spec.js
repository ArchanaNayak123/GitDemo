const {test,expect} = require ('@playwright/test');

test("Adding product to cart", async({browser})=>
{
 const context= await browser.newContext();
 const page= await context.newPage();
 await page.goto("https://automationexercise.com/?utm_source=chatgpt.com");
 console.log("Starting to scroll to load the products");
for (let j=0; j< 6; j++)
{
   await page.evaluate(()=>{
window.scrollTo(0, document.body.scrollHeight);
   });

   await page.waitForLoadState('networkidle');


}

 const prod= page.locator(".single-products").filter({hasText: 'Blue Top'});
 await prod.first().waitFor();
 await prod.locator(".add-to-cart").first().click();
 console.log("Product added to the cart");
 page.locator("#cartModal").waitFor({state: 'visible'});
 const text= await page.locator("button[class*='btn-block']").textContent();
 console.log(text);
 expect(text).toContain("Continue Shopping");
 
 await page.locator(".modal-content a[href='/view_cart']").waitFor({state: 'visible'});
await page.locator(".modal-content a[href='/view_cart']").click();
await page.waitForLoadState('networkidle');
 const tablecontent= page.locator(".cart_info");
 await tablecontent.first().waitFor({state: 'visible'});
const content= page.locator("tbody tr td[class='cart_description']");
 const countvalue= await content.count();
 console.log(countvalue);
 let found= false;
 for(let i=0; i< countvalue; i++)
 {
    const textvalue= await content.nth(i).textContent();
    if(textvalue.includes('Blue Top'))
    {
        found=true;
        console.log(found);
        break;
    }
    

    expect(found).toBe(true);
 }


});