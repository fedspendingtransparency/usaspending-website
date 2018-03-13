/**
 * CoreLocation-test.js
 * Created by Lizzie Salita 3/12/18
 */

import CoreLocation from 'models/v2/CoreLocation';

const locationData = {
    address1: '602 Trumball Street',
    address2: 'Apt 2',
    province: '',
    city: 'Pawnee',
    county: 'Wamapoke',
    stateCode: 'IN',
    zip5: '12345',
    country: 'USA',
    state: 'Indiana',
    congressionalDistrict: '04'
};

const location = Object.create(CoreLocation);
location.populateCore(locationData);

describe('Core Location getter functions', () => {
   it('should format the street address', () => {
        expect(location.streetAddress).toEqual('602 Trumball Street\nApt 2\n');
   });
   it('should format the regional address', () => {
      expect(location.regionalAddress).toEqual('Pawnee, IN 12345');
   });
   it('should format the congressional district', () => {
       expect(location.congressionalDistrict).toEqual('IN-04');
   });
   it('should use the state code as state/province when city is available', () => {
       expect(location.stateProvince).toEqual('IN');
   });
   it('should format the full address', () => {
       expect(location.fullAddress).toEqual('602 Trumball Street\nApt 2\nPawnee, IN 12345\nIN-04');
   });
});
