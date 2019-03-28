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
    page.gotoSignInOut();
    page.setEmailAndPassword();
    page.signIn();

    // then
    expect(page.isSigendIn()).toBeTruthy();
  });

  it('should be possible to change password', () => {
    // given
    page.navigateToRoot();
    page.gotoSignInOut();

    // when
    page.gotoSignInOut();
    page.pressForgottenPassword();

    // then
    expect(page.forgottenPasswordDialogIsVisible()).toBeTruthy();
  });

});
