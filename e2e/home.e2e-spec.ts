import { HomePage } from './home.po';
import { SignInPage } from './signin.po';

describe('Landing page', () => {
  let page: HomePage;

  beforeEach(() => {
    page = new HomePage();
    const signin = new SignInPage();
    signin.signIn();
  });

  it('should land on news', () => {
    // given when then
    expect(page.newsVisible()).toBeTruthy();
  });

  it('should be possible to see my profile', () => {
    // given when
    page.pressProfile();

    // then
    expect(page.profileVisible()).toBeTruthy();
  });

  it('should be possible to see news', () => {
    // given when
    page.pressNews();

    // then
    expect(page.newsVisible()).toBeTruthy();
  });

  it('should be possible to see users', () => {
    // given when
    page.pressUsers();

    // then
    expect(page.usersVisible()).toBeTruthy();
  });

  it('should be possible to see plans', () => {
    // given when
    page.pressPlans();

    // then
    expect(page.plansVisible()).toBeTruthy();
  });

});
