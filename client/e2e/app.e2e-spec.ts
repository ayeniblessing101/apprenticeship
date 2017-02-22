import { LenkenPage } from './app.po';

describe('lenken App', function() {
  let page: LenkenPage;

  beforeEach(() => {
    page = new LenkenPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
