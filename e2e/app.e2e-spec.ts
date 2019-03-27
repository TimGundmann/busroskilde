import { LandingPage } from './app.po';

describe('Landing', () => {
  let page: LandingPage;

  beforeEach(() => {
    page = new LandingPage();
  });

  it('should move to message', () => {
    // given
    page.navigateTo();

    // when
    page.pressMessageButton();

    // then
    page.messageAreaVisible().then(result => {
      expect(result).toBeTruthy();
    });
  });
});
