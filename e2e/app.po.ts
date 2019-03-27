import { browser, by, element, promise } from 'protractor';

export class LandingPage {

  navigateTo() {
    browser.debugger();
    return browser.get('/');
  }

  pressMessageButton() {
    browser.findElement(by.css('[selenium-id="contact"]')).click();
    browser.sleep(1000);
  }

  messageAreaVisible(): promise.Promise<boolean> {
    return browser.executeScript('return window.pageYOffset;')
      .then((offset: number) => {
        return browser.driver.manage().window().getSize()
          .then(size => {
            return element(by.id('contact')).getLocation()
              .then(lo => {
                return element(by.id('contact')).getAttribute('offsetHeight')
                  .then(offsetHeight => {
                    console.log('windows height: ' + size.height);
                    console.log('windows off set: ' + offset);
                    console.log('element location: ' + lo.y);
                    console.log('element offset: ' + offsetHeight);
                    return (size.height + offset) > (lo.y + parseInt(offsetHeight, 0));
                  });
              });
          });
      });
  }

}
