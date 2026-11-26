import { describe, expect, it } from 'vitest';
import { products, updateQuantity, bagTotal } from './collection';
describe('VELMORA demo collection', () => {
  it('contains all six specified products and quantities', () => {
    expect(products.map(p => [p.name,p.size])).toEqual([['Body Lotion','400 ml'],['Body Wash','250 ml'],['Body Butter','200 g'],['Body Mist','100 ml'],['Hand Cream','75 ml'],['Body Scrub','200 g']]);
  });
  it('adds and adjusts quantities without negative items', () => {
    expect(updateQuantity(updateQuantity({},'lotion',1),'lotion',1)).toEqual({lotion:2});
    expect(updateQuantity({lotion:1},'lotion',-2)).toEqual({});
  });
  it('summarizes the sample INR prices', () => { expect(bagTotal({lotion:2,wash:1})).toBe(3470); });
});