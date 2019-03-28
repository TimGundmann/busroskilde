import { browser, by, element, promise } from 'protractor';
const auth = require('../signin.auth.json');

export class SignInPage {
  navigateToRoot() {
    browser.debugger();
    return browser.get('/');
  }

  gotoSignInOut() {
    element(by.css('[selenium-id="signin"]')).click();
  }

  setEmailAndPassword() {
    console.log(auth.email + ' ' + auth.password);
    element(by.css('[selenium-id="email"]')).sendKeys(auth.email);
    element(by.css('[selenium-id="password"]')).sendKeys(auth.password);
  }

  signIn(): any {
    element(by.css('[selenium-id="signin-button"]')).click();
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
