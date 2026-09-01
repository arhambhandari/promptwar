import { describe, it, expect } from 'vitest';
import { indiaLocations } from '../data/locations';

describe('Locations Data', () => {
  it('contains major states', () => {
    expect(Object.keys(indiaLocations)).toContain('Maharashtra');
    expect(Object.keys(indiaLocations)).toContain('Gujarat');
    expect(Object.keys(indiaLocations)).toContain('Tamil Nadu');
  });

  it('contains districts for Maharashtra', () => {
    const maharashtraDistricts = Object.keys(indiaLocations['Maharashtra']);
    expect(maharashtraDistricts).toContain('Mumbai Suburban');
    expect(maharashtraDistricts).toContain('Pune');
  });
});
