const {test,expect} = require ('@playwright/test');
const { POManager } = require('../pageobject/POManager');


test.only("Sauce Demo", async({page})=>
{

const POMpage= new POManager(page);
//Errorlogin Validations
//const context= await browser.newContext();
//const page= await context.newPage();
const username1= 'standard_user';
const password1= 'secret_sauces';
const loginPage= POMpage.getloginPage();
await loginPage.goTo();
const errormsg= await loginPage.LoginWithError(username1, password1);
expect(errormsg).toBe("Epic sadface: Username and password do not match any user in this service");



//Logging in after grabbing the username and password from the footer
await loginPage.LoginwithProperCredentials();


//Adding first 2 products found on page. Grabbing the price and comparing with the total mrp
const productPage = POMpage.getproductPage();
await productPage.productAddingToCart();
await productPage.goToCart();

//Checking the products in cart
const cartPage= POMpage.getcartPage();
const { finalcartTotalvalue, totalValue}= await cartPage.cartpageDetails();
expect(finalcartTotalvalue).toBe(totalValue);
//Thank you message display
const finalmsg= await cartPage.confirmationPage();
expect(finalmsg).toBe("Thank you for your order!");




});
