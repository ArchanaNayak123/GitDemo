class CartPage
{


    constructor(page)
    {

this.page= page;
this.cartContainer= page.locator("#cart_contents_container");
this.checkout= page.getByRole("button", {name: 'Checkout'});
this.firstName= page.getByPlaceholder("First Name");
this.lastName= page.getByPlaceholder("Last Name");
this.postalCode= page.locator("#postal-code");
this.continue= page.locator("#continue");
this.cartvalue= page.locator(".summary_total_label");
this.tax= page.locator(".summary_tax_label");

this.finish= page.getByRole("button", {name: 'Finish'});
this.finalMessage= page.locator(".complete-header")



    }

async cartpageDetails()
{
    await this.cartContainer.waitFor();
    await this.checkout.click();
    await this.firstName.fill("Archana");
    await this.lastName.fill("Nayak");
    await this.postalCode.fill("576107");
    await this.continue.click();
    const cartTotal= await this.cartvalue.textContent();
    const totalValue= cartTotal.split(" ")[1];
    const tax= await this.tax.textContent();
    console.log(cartTotal);
    console.log(tax);
   const cartTotalvalue=  cartTotal.split("$")[1];
    const finaltax= tax.split("$")[1];
   const cartTotalmrp = parseFloat(cartTotalvalue + finaltax);
    console.log(cartTotalmrp);
    const finalcartTotalvalue = `$${cartTotalmrp.toFixed(2)}`;
    console.log(finalcartTotalvalue);

    return { finalcartTotalvalue, totalValue }

}

async confirmationPage()
{


    await this.finish.click();
    const finalmsg = await this.finalMessage.textContent();
    console.log(finalmsg);
    return finalmsg;

}
}
module.exports= {CartPage};








