import { HomePage } from './home.po';
import { SignInPage } from './signin.po';

describe('Landing page', () => {
  let page: HomePage;

  beforeEach(() => {
    page = new HomePage();
    const signin = new SignInPage();
    signin.signIn();
  });

  it('should be possible to se my profile', () => {
    // given
    page.navigateToHome();

    // when
    page.pressProfile();

    // then
    expect(page.profileVisible()).toBeTruthy();
  });


});
