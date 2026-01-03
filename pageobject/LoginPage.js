class LoginPage{


constructor(page)

{
    this.page= page;
    this.username= page.locator("#user-name");
    this.password= page.locator("#password");
    this.loginButton= page.locator("#login-button");
    this.errorMessage= page.locator("div[class*='error-message-container']");

    this.properusername= page.locator("#login_credentials");
    this.properpassword= page.locator(".login_password");
    
    
}

async goTo()
{
    await this.page.goto("https://www.saucedemo.com/");
}

async LoginWithError(username1, password1)
{
    await this.username.fill(username1);
    await this.password.fill(password1);
    await this.loginButton.click();
    const errormsg= this.errorMessage.textContent();
    return errormsg;
}


async LoginwithProperCredentials()
    {
        await this.properusername.waitFor();
        const username= await this.properusername.textContent();
        console.log(username);
        const actualusername= username.split(":")[1].split("l")[0];
        console.log(actualusername);
        await this.username.fill(actualusername);
     const password= await this.properpassword.textContent();
        console.log(password);
    const actualpassword=password.split(":")[1];
        console.log(actualpassword);
        await this.password.fill(actualpassword);
        await this.loginButton.click();
 }


}



module.exports= { LoginPage};