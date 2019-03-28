import { SignInPage } from './signin.po';

describe('Sing in page', () => {
  let page: SignInPage;

  beforeEach(() => {
    page = new SignInPage();
  });

  it('should be possible to sign in', () => {
    // given
    page.navigateToRoot();

    // when
    page.gotoSignIn();
    page.setEmailAndPassword();
    page.pressSignIn();

    // then
    expect(page.isSigendIn()).toBeTruthy();
  });

  it('should be possible to change password', () => {
    // given
    page.navigateToRoot();
    page.gotoSignIn();

    // when
    page.gotoSignIn();
    page.pressForgottenPassword();

    // then
    expect(page.forgottenPasswordDialogIsVisible()).toBeTruthy();
  });

});
