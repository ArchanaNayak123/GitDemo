const {test} = require ('@playwright/test');
const { count } = require('node:console');



test('Verify the total MRP of 2 Apparels that have the same brand name and have one common word in the description', async ({ page }) => {
    const url = "https://www.myntra.com/men-tshirts"
    await page.goto(url);
  
    // Click the get started link.
    const brandName = "H&M"
    const substring = "Loose"
    let totalCalculatedMRPValue = 0;
  
    for(let i=0; i<2; i++){
      // Listen for popup
      const popupPromise = page.waitForEvent('popup');
      // Select item
      await page.getByRole("link", {name: `${brandName} ${substring}`}).nth(i).click()
      const popup = await popupPromise;
  
      // Store the MRP
      const mrpText = await popup.locator(".pdp-mrp").locator("s").textContent();
      const productMRPValue = parseInt(mrpText?.replace("₹","").replace(",","") || "0");
      totalCalculatedMRPValue += productMRPValue
  
      // Size
      await popup.getByRole("button", {name: "L", exact: true}).click()
      // Cart
      await popup.waitForTimeout(3000)
      await popup.getByText("ADD TO BAG").click()
  
      await popup.close();
    }
  
  
    await page.getByText("Bag", {exact: true}).click()
  
    // get mrp value
    const totalMRPValue = await page.locator(".priceDetail-base-row").filter({ hasText: 'Total MRP' }).locator(".priceDetail-base-value").textContent();
    const totalValue = parseInt(totalMRPValue?.replace("₹","").replace(",","") || "0");
  
    console.log("Total Calculated: " + totalCalculatedMRPValue)
    console.log("Total Value: " + totalValue)
    expect(totalValue).toBe(totalCalculatedMRPValue);
  
  });