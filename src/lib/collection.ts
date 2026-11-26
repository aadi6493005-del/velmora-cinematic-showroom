import lotion from '@/assets/body-lotion.asset.json';
import wash from '@/assets/body-wash.asset.json';
import butter from '@/assets/body-butter.asset.json';
import mist from '@/assets/body-mist.asset.json';
import hand from '@/assets/hand-cream.asset.json';
import scrub from '@/assets/body-scrub.asset.json';

export const products = [
  { id: 'lotion', name: 'Body Lotion', size: '400 ml', price: 1290, image: lotion.url, description: 'A silky finishing touch to your everyday ritual. Beautifully considered care, inspired by lavender.', note: 'Your everyday essential', concept: false },
  { id: 'wash', name: 'Body Wash', size: '250 ml', price: 890, image: wash.url, description: 'Begin anew with a delicate, lavender-inspired cleansing ritual.', note: 'A beautiful beginning', concept: true },
  { id: 'butter', name: 'Body Butter', size: '200 g', price: 1490, image: butter.url, description: 'A rich, indulgent texture for moments that deserve a little more care.', note: 'An indulgent embrace', concept: true },
  { id: 'mist', name: 'Body Mist', size: '100 ml', price: 990, image: mist.url, description: 'An airy botanical-inspired finishing ritual, from morning to evening.', note: 'A moment of freshness', concept: true },
  { id: 'hand', name: 'Hand Cream', size: '75 ml', price: 590, image: hand.url, description: 'A little luxury to keep close. A considered companion for your hands.', note: 'Care, within reach', concept: true },
  { id: 'scrub', name: 'Body Scrub', size: '200 g', price: 1190, image: scrub.url, description: 'Make space for a fresh start with a beautifully textured care ritual.', note: 'The art of renewal', concept: true },
] as const;
export type Product = (typeof products)[number];
export type Bag = Record<string, number>;
export function updateQuantity(bag: Bag, id: string, delta: number): Bag {
  if (!products.some(p => p.id === id)) return bag;
  const next = { ...bag, [id]: Math.max(0, (bag[id] ?? 0) + delta) };
  if (next[id] === 0) delete next[id];
  return next;
}
export function bagTotal(bag: Bag) { return products.reduce((total, p) => total + p.price * (bag[p.id] ?? 0), 0); }
export const money = (amount: number) => `₹${amount.toLocaleString('en-IN')}`;