import { LandingPage } from './landing.po';

describe('Landing page', () => {
  let page: LandingPage;

  beforeEach(() => {
    page = new LandingPage();
  });

  it('should be possible to enter a message', () => {
    // given
    page.navigateToRoot();

    // when
    page.pressMessage();

    // then
    expect(page.messageAreaVisible()).toBeTruthy();
  });

  it('should be pussible to sign up', () => {
    // given
    page.navigateToRoot();

    // when
    page.pressSingUp();

    // then
    expect(page.signUpAreaVisible()).toBeTruthy();
  });

});
