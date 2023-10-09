import { identifier } from './utils-identifier'

describe('identifier', () => {
  it('should return a prefixed random id', () => {
    expect(identifier('cus')).toContain('cus_')
  })
})
