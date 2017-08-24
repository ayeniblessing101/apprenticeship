import { SkillsPipe } from './skills.pipe';
import { HelperService } from '../../services/helper.service';

describe('SkillsPipe', () => {
  let helper: HelperService;

  beforeEach(() => { helper = new HelperService() });

  it('create an instance', () => {
    const pipe = new SkillsPipe(helper);
    expect(pipe).toBeTruthy();
  });
});
