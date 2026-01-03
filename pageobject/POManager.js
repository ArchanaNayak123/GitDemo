const {LoginPage}=  require('./LoginPage');
const {CartPage}= require('./CartPage');
const {ProductPage} = require('./ProductPage');

class POManager{


    constructor(page)
    {
        this.page= page;
         this.loginPage= new LoginPage(this.page);
         this.productPage = new ProductPage(this.page);
         this.cartPage= new CartPage(this.page);

    }

    getloginPage()
    {
        return this.loginPage;

    }
    getproductPage()
    {
        return this.productPage;
    }
    getcartPage()
    {
        return this.cartPage;
    }
}

module.exports= {POManager};