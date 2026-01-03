class ProductPage{

constructor(page)
{

this.page= this.page;
this.pageInventory= page.locator(".inventory_container");
this.productsList= page.locator(".inventory_list .inventory_item_description");
this.productCount= page.locator(".inventory_list .inventory_item");
this.gotoCart= page.locator("#shopping_cart_container");

}


async productAddingToCart()
{
    await this.pageInventory.waitFor();
    const productlist= this.productsList;
    const count = await this.productCount.count();
    //console.log(count);
 let totalmrp= 0;
    for(let i=0; i<count; i++)
    {
     await this.productsList.nth(i).getByRole("button", {name: 'Add to cart'}).click();
     const text= await this.productsList.nth(i).locator(".inventory_item_name").textContent();
     console.log(text);
     const mrp= await this.productsList.nth(i).locator(".inventory_item_price").textContent(); 
       console.log(mrp);
     const convertedmrp =mrp.split('$')[1];
       //console.log(mrp.split('$')[1]);
    // console.log(typeof parseInt(mrp));
 totalmrp= totalmrp + parseFloat(convertedmrp);
 const finaltotalmrp = `$${totalmrp.toFixed(2)}`;
 console.log(finaltotalmrp);
 console.log(totalmrp);
    if(i === 1)
  {
        break;
     }
     }


}


async goToCart()
{
    await this.gotoCart.click();
}
}


module.exports ={ProductPage};






