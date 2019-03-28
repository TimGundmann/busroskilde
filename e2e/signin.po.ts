import { browser, by, element, promise } from 'protractor';

export class SignInPage {
  navigateToRoot() {
    browser.debugger();
    return browser.get('/');
  }

  pressSignIn() {
    element(by.css('[selenium-id="signin"]')).click();
  }

  setEmailAndPassword() {
    element(by.css('[selenium-id="email"]')).sendKeys(browser.params.signin.email);
    element(by.css('[selenium-id="password"]')).sendKeys(browser.params.singin.password);
  }

  signIn(): any {
    element(by.css('[selenium-id="signin-button"]')).click();
  }

  isSigendIn(): promise.Promise<boolean> {
    return browser.getCurrentUrl().then(url => url.includes('home'));
  }

}
