import { browser, by, element, promise } from 'protractor';

export class HomePage {

  navigateToHome() {
    browser.sleep(500);
    return browser.get('/home');
  }

  pressProfile() {
    element(by.css('[selenium-id="profile-button"]')).click();
  }

  profileVisible(): promise.Promise<boolean> {
    return element(by.css('[selenium-id="profile"]')).isDisplayed();
  }

}
