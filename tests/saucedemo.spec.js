const {test,expect} = require ('@playwright/test');

test("Sauce Demo", async({browser})=>
{
    const context= await browser.newContext();
    const page= await context.newPage();
    await page.goto("https://www.saucedemo.com/");
    const username= 'standard_user';
    const password= 'secret_sauce';
    const productname= 'Sauce Labs Fleece Jacket';
    const productdesc= 'Sauce';

    await page.locator("#user-name").fill(username);
    await page.locator("#password").fill(password);
    await page.locator("#login-button").click();
    await page.locator(".inventory_container").waitFor();
    const products= page.locator(".inventory_item").filter({hasText: productdesc});
    const count= await products.count();
    console.log("Starting to scroll to load the products");
for (let j=0; j< 6; j++)
{
   await page.evaluate(()=>{
window.scrollTo(0, document.body.scrollHeight);
   })
}

   await page.waitForLoadState('networkidle');

    for(let i=0; i< count; i++)
    {
       const text= await products.nth(i).locator(".inventory_item_name").textContent();
       console.log(text);
    
       if(text === productname)
       {
       const finalprod=  products.nth(i).locator("button[class*='btn_primary']");
       await finalprod.scrollIntoViewIfNeeded();
       await finalprod.click();
       }

    }
});


test("Adding fifth product from array", async({browser})=>
{
    const context= await browser.newContext();
    const page= await context.newPage();
    await page.goto("https://www.saucedemo.com/");
    const username= 'standard_user';
    const password= 'secret_sauce';


    await page.locator("#user-name").fill(username);
    await page.locator("#password").fill(password);
    await page.locator("#login-button").click();
    await page.locator(".inventory_container").waitFor();
    const products= page.locator(".inventory_item");
    const count= await products.count();
    console.log(count);
    for (let j=0; j< 6; j++)
        {
           await page.evaluate(()=>{
        window.scrollTo(0, document.body.scrollHeight);
           })
        }
        
    await page.waitForLoadState('networkidle');
    
           
           const text= await products.nth(4).locator(".inventory_item_name").textContent();
           console.log(text);
           page.pause();
           const finalproduct = products.nth(4).locator("button[class*='btn_primary']");
           await finalproduct.scrollIntoViewIfNeeded();
           await finalproduct.click();

           const cartbutton= page.locator("#shopping_cart_container");
         await cartbutton.scrollIntoViewIfNeeded();
          await cartbutton.click();

           

           await page.locator("#cart_contents_container").waitFor();
          const cartlist= page.locator(".cart_item");
          const cartext = await page.locator(".inventory_item_name").textContent();
          console.log(cartext);
          expect(cartext).toBe(text);
});


test("Login after grabbing the text", async({browser})=>
{
    const context= await browser.newContext();
    const page= await context.newPage();
    await page.goto("https://www.saucedemo.com/");
    await page.locator("#login_credentials").waitFor();
    const username= await page.locator("#login_credentials").textContent();
    console.log(username);
    const actualusername= username.split(":")[1].split("l")[0];
    console.log(actualusername);
    await page.locator("#user-name").fill(actualusername);


    const password= await page.locator(".login_password").textContent();
    console.log(password);

    const actualpassword=password.split(":")[1];
    console.log(actualpassword);
    await page.locator("#password").fill(actualpassword);
    await page.locator("#login-button").click();
});

test("Getting MRP and comparing the ones with the cart", async({browser})=>
   {
      const context= await browser.newContext();
    const page= await context.newPage();
    await page.goto("https://www.saucedemo.com/");
    const username= 'standard_user';
    const password= 'secret_sauce';
    await page.locator("#user-name").fill(username);
    await page.locator("#password").fill(password);
    await page.locator("#login-button").click();
    await page.locator(".inventory_container").waitFor();


    const productdesc= page.locator(".inventory_item_description").filter({hasText: 'Sauce Labs Bolt T-Shirt'});
    const mrp= await productdesc.locator("div[class='inventory_item_price']").textContent();
console.log(mrp);

await page.waitForLoadState('networkidle');
await productdesc.getByRole("button", {name: 'Add to cart'}).click();


await page.locator("#shopping_cart_container").click();

await page.locator("#cart_contents_container").waitFor();
const cartprod =  page.locator(".cart_item");
const text =await page.locator(".cart_item div[class='cart_item_label']").filter({hasText: 'Sauce Labs Bolt T-shirt'}).textContent();
console.log(text);
//await cartprod.locator(".item_pricebar .inventory_item_price").waitFor();
//const cartmrp= await cartprod.locator(".item_pricebar .inventory_item_price").textContent();
//console.log(cartmrp);

//expect(cartmrp).toBe(mrp);

const cartmrp= await cartprod.locator("div[class='inventory_item_price']").textContent();
console.log(cartmrp);
});


test("Adding multiple products to cart", async({browser})=>
   {

      const context= await browser.newContext();
      const page= await context.newPage();
      await page.goto("https://www.saucedemo.com/");
      const username= 'standard_user';
      const password= 'secret_sauce';
      await page.locator("#user-name").fill(username);
      await page.locator("#password").fill(password);
      await page.locator("#login-button").click();
      await page.locator(".inventory_container").waitFor();
     const productlist= page.locator(".inventory_list .inventory_item_description");
     const count = await page.locator(".inventory_list .inventory_item").count();
     console.log(count);
let totalmrp= 0;
     for(let i=0; i<count; i++)
     {
      await productlist.nth(i).getByRole("button", {name: 'Add to cart'}).click();
      const text= await productlist.nth(i).locator(".inventory_item_name").textContent();
      console.log(text);
      const mrp= await productlist.nth(i).locator(".inventory_item_price").textContent(); 
        //console.log(mrp);
      const convertedmrp =mrp.split('$')[1];
        //console.log(mrp.split('$')[1]);
     // console.log(typeof parseInt(mrp));
 totalmrp= totalmrp + parseFloat(convertedmrp);
 const finaltotalmrp = `$${totalmrp.toFixed(2)}`;
 console.log(finaltotalmrp);
  //console.log(totalmrp);
     if(i === 1)
   {
         break;
      }
      }

     

     await page.locator("#shopping_cart_container").click();
     await page.locator("#cart_contents_container").waitFor();
     await page.getByRole("button", {name: 'Checkout'}).click();
     await page.getByPlaceholder("First Name").fill("Archana");
     await page.getByPlaceholder("Last Name").fill("Nayak");
     await page.locator("#postal-code").fill("576107");
     await page.locator("#continue").click();
     const cartTotal= await page.locator(".summary_total_label").textContent();
     const totalValue= cartTotal.split(" ")[1];
     const tax= await page.locator(".summary_tax_label").textContent();
     console.log(cartTotal);
     console.log(tax);
    const cartTotalvalue=  cartTotal.split("$")[1];
     const finaltax= tax.split("$")[1];

     const cartTotalmrp = parseFloat(cartTotalvalue + finaltax);
     console.log(cartTotalmrp);
     const finalcartTotalvalue = `$${cartTotalmrp.toFixed(2)}`;
     console.log(finalcartTotalvalue);
     expect(finalcartTotalvalue).toBe(totalValue);

     await page.getByRole("button", {name: 'Finish'}).click();
     const finalmsg = await page.locator(".complete-header").textContent();
     console.log(finalmsg);
     expect(finalmsg).toBe("Thank you for your order!");




   });


   test("Login error validations", async({browser})=>
      {

         const context= await browser.newContext();
         const page= await context.newPage();
         await page.goto("https://www.saucedemo.com/");
 const username= 'standard_user';
         const password= 'secret_sauces';
         await page.locator("#user-name").fill(username);
      await page.locator("#password").fill(password);
      await page.locator("#login-button").click();
      const errormsg= await page.locator("div[class*='error-message-container']").textContent();
      console.log(errormsg);
      expect(errormsg).toBe("Epic sadface: Username and password do not match any user in this service");



      });

    

