import { HomePage } from './home.po';
import { SignInPage } from './signin.po';

fdescribe('Landing page', () => {
  let page: HomePage;

  beforeEach(() => {
    page = new HomePage();
    const signin = new SignInPage();
    signin.signIn();
  });

  it('should be possible to se my profile', () => {
    // given when
    page.pressProfile();

    // then
    expect(page.profileVisible()).toBeTruthy();
  });


});
