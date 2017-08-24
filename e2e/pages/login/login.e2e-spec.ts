import {LoginComponentPage} from "./login.po";

describe('Login Page', ()=> {

  let page: LoginComponentPage;

  beforeEach(()=> {
    page = new LoginComponentPage();

    page.navigateTo();
  });

  it('should have a sign up button', ()=> {
    expect(page.getLoginButtonText())
      .toEqual('SIGN IN TO GET STARTED');
  });
});
