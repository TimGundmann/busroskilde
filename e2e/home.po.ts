import { browser, by, element, promise } from 'protractor';

export class HomePage {

  pressProfile() {
    this.clickElement('profile-button');
  }

  profileVisible(): promise.Promise<boolean> {
    return this.listVisisble('profile');
  }

  pressNews() {
    this.clickElement('news-button');
  }

  newsVisible(): promise.Promise<boolean> {
    return this.listVisisble('news');
  }

  pressUsers() {
    this.clickElement('users-button');
  }

  usersVisible(): promise.Promise<boolean> {
    return this.listVisisble('users');
  }

  pressPlans() {
    element(by.cssContainingText('a', 'Vagtplaner')).click();
  }

  plansVisible(): promise.Promise<boolean> {
    return this.listVisisble('plans');
  }

  private clickElement(seleniumId: string) {
    browser.sleep(1000);
    element(by.css('[selenium-id="' + seleniumId + '"]')).click();
  }

  private listVisisble(seleniumId: string): promise.Promise<boolean> {
    // wait for annimation
    browser.sleep(1000);
    return element(by.css('[selenium-id=\"' + seleniumId + '"]')).isDisplayed();
  }

}
