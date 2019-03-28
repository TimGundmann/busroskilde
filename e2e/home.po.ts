import { browser, by, element, promise } from 'protractor';

export class HomePage {

  navigateToHome() {
    return browser.get('/#/home');
  }

  pressProfile() {
    element(by.css('[selenium-id="profile-button"]')).click();
  }

  profileVisible(): promise.Promise<boolean> {
    // wait for annimation
    browser.sleep(1000);
    return element(by.css('[selenium-id="profile"]')).isDisplayed();
  }

}
