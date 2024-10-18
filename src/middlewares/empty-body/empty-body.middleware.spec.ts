import { EmptyBodyMiddleware } from './empty-body.middleware';

describe('EmptyBodyMiddleware', () => {
  it('should be defined', () => {
    expect(new EmptyBodyMiddleware()).toBeDefined();
  });
});
