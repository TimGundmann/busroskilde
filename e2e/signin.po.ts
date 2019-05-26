import { browser, by, element, promise } from 'protractor';
const auth = require('../signin.auth.json');

export class SignInPage {

  signIn() {
    this.navigateToRoot();
    this.gotoSignIn();
    this.setEmailAndPassword();
    this.pressSignIn();
  }

  navigateToRoot() {
    browser.debugger();
    return browser.get('/');
  }

  gotoSignIn() {
    element(by.css('[selenium-id="signin"]')).click();
    browser.getCurrentUrl()
      .then(url => {
        if (!url.includes('signin')) {
          element(by.css('[selenium-id="signin"]')).click();
        }
      });
  }

  setEmailAndPassword() {
    element(by.css('[selenium-id="email"]')).sendKeys(auth.email);
    element(by.css('[selenium-id="password"]')).sendKeys(auth.password);
  }

  pressSignIn() {
    element(by.css('[selenium-id="signin-button"]')).click();
    browser.sleep(2000);
  }

  isSigendIn(): promise.Promise<boolean> {
    return browser.getCurrentUrl().then(url => url.includes('home'));
  }

  pressForgottenPassword() {
    element(by.css('[selenium-id="signin-forgotten"]')).click();
  }

  forgottenPasswordDialogIsVisible(): promise.Promise<boolean> {
    return element(by.css('[selenium-id="forgotten"]')).isDisplayed();
  }

}
