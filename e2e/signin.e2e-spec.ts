import { SignInPage } from './signin.po';

fdescribe('Sing in page', () => {
  let page: SignInPage;

  beforeEach(() => {
    page = new SignInPage();
  });

  it('should be possible to sign in', () => {
    // given
    page.navigateToRoot();

    // when
    page.pressSignIn();
    page.setEmailAndPassword();
    page.signIn();

    // then
    expect(page.isSigendIn()).toBeTruthy();
  });

});
