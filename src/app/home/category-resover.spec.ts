import { CategoryResover } from './category-resover';
import { PlanService } from 'app/services/plan.service';

describe('CategoryResover', () => {
  it('should create an instance', () => {
    expect(new CategoryResover(new PlanService(null))).toBeTruthy();
  });
});
