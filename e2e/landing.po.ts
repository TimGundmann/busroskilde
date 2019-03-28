import { browser, by, element, promise } from 'protractor';
import { WebdriverWebElement } from 'protractor/built/element';

export class LandingPage {

  navigateToRoot() {
    return browser.get('/');
  }

  pressMessage() {
    element(by.css('[selenium-id="contact"]')).click();
    browser.sleep(1000);
  }

  pressSingUp(): any {
    element(by.css('[selenium-id="newUser"]')).click();
    browser.sleep(1000);
  }

  messageAreaVisible(): promise.Promise<boolean> {
    return this.areaVisibleFor(element(by.id('contact')));
  }

  signUpAreaVisible(): promise.Promise<boolean> {
    return this.areaVisibleFor(element(by.id('signup')));
  }

  private areaVisibleFor(element: WebdriverWebElement): promise.Promise<boolean> {
    return browser.executeScript('return window.pageYOffset;')
      .then((offset: number) => {
        return element.getLocation()
          .then(lo => {
            return offset === lo.y;
          });
      });
  }

}
