/**
 * @jest-environment jsdom
 * 
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
    countyCode: '06',
    stateCode: 'IN',
    zip5: '12345',
    countryCode: 'USA',
    country: 'USA',
    state: 'Indiana',
    congressionalDistrict: '04'
};

const location = Object.create(CoreLocation);
location.populateCore(locationData);

const multiLocationData = {
    address1: '',
    address2: '',
    province: '',
    city: '',
    county: '',
    countyCode: '',
    stateCode: '',
    zip5: '',
    countryCode: 'USA',
    country: 'USA',
    state: '',
    congressionalDistrict: '90'
};

const multiLocation = Object.create(CoreLocation);
multiLocation.populateCore(multiLocationData);
const multiLocationAddress = 'MULTI-STATE';
const multiLocationDistrict = 'CONGRESSIONAL DISTRICT: 90 (Multiple Districts)';

const foreignLocationData = {
    province: 'Quebec',
    city: 'Montreal',
    county: null,
    stateCode: null,
    zip5: null,
    foreignPostalCode: '54321',
    countryCode: 'CAN',
    country: 'Canada',
    state: null,
    congressionalDistrict: null
};

const foreignLocation = Object.create(CoreLocation);
foreignLocation.populateCore(foreignLocationData);

describe('Core Location getter functions', () => {
    it('should format the street address', () => {
        expect(location.streetAddress).toEqual('602 Trumball Street\nApt 2\n');
    });
    describe('Street Address 1', () => {
        it('should return street address 1', () => {
            expect(location.streetAddress1).toEqual(locationData.address1);
        });
        it('should return -- when no street address 1', () => {
            const badLocationData = { ...locationData };
            badLocationData.address1 = null;
            const badLocation = Object.create(CoreLocation);
            badLocation.populateCore(badLocationData);
            expect(badLocation.streetAddress1).toEqual('--');
        });
        it('should handle a null street address', () => {
            const missingData = Object.assign({}, locationData, {
                address1: null,
                address2: null
            });
            const partialLocation = Object.create(CoreLocation);
            partialLocation.populateCore(missingData);

            expect(partialLocation.streetAddress).toEqual('');
        });
    });
    describe('Regional Address', () => {
        it('should format the regional address', () => {
            expect(location.regionalAddress).toEqual('Pawnee, IN 12345');
        });
        it('should include country and foreign postal code in the regional address for foreign countries', () => {
            expect(foreignLocation.regionalAddress).toEqual('Montreal, Quebec Canada 54321');
        });
        it('should handle a null city', () => {
            const missingData = Object.assign({}, locationData, {
                city: null
            });
            const partialLocation = Object.create(CoreLocation);
            partialLocation.populateCore(missingData);

            expect(partialLocation.regionalAddress).toEqual('IN 12345');
        });
        it('should handle a null state', () => {
            const missingData = Object.assign({}, locationData, {
                state: null,
                stateCode: null
            });
            const partialLocation = Object.create(CoreLocation);
            partialLocation.populateCore(missingData);

            expect(partialLocation.regionalAddress).toEqual('Pawnee, 12345');
        });
        it('should handle an extended zip code', () => {
            const missingData = Object.assign({}, locationData, {
                zip4: '12345-6789',
                zip5: null
            });
            const partialLocation = Object.create(CoreLocation);
            partialLocation.populateCore(missingData);

            expect(partialLocation.regionalAddress).toEqual('Pawnee, IN 12345');
        });
        it('should set regional address to "MULTI-STATE" when' +
            ' congressionalDistrict is 90', () => {
            expect(multiLocation.regionalAddress).toEqual(multiLocationAddress);
        });
    });
    describe('Recipient Regional Address Contracts & IDV', () => {
        it('should use state name property when foreign', () => {
            const newForeignLocationData = { ...foreignLocation };
            newForeignLocationData.state = 'California';
            const newForeignLocation = Object.create(CoreLocation);
            newForeignLocation.populateCore(newForeignLocationData);
            const includesStateCode = newForeignLocation.recipientRegionalAddressContractsAndIDV.includes('California');
            expect(includesStateCode).toEqual(true);
        });
    });
    describe('Congressional District', () => {
        it('should format the congressional district', () => {
            expect(location.congressionalDistrict).toEqual('IN-04');
        });
        it('should handle a null congressional district', () => {
            const missingData = Object.assign({}, locationData, {
                congressionalDistrict: null
            });
            const partialLocation = Object.create(CoreLocation);
            partialLocation.populateCore(missingData);

            expect(partialLocation.congressionalDistrict).toEqual('');
        });
    });
    describe('Full Congressional District', () => {
        it('should format the congressional district with a prefix', () => {
            expect(location.fullCongressionalDistrict).toEqual('\nCONGRESSIONAL' +
                ' DISTRICT: IN-04');
        });
        it('should handle a null congressional district', () => {
            const missingData = Object.assign({}, locationData, {
                congressionalDistrict: null
            });
            const partialLocation = Object.create(CoreLocation);
            partialLocation.populateCore(missingData);

            expect(partialLocation.fullCongressionalDistrict).toEqual('');
        });
        it('should set fullCongressionalDistrict to a predetermined value if' +
            ' congressionalDistrict is 90', () => {
            expect(multiLocation.fullCongressionalDistrict).toEqual(multiLocationDistrict);
        });
    });
    describe('Recipient Congressional District', () => {
        it('should return Congressional District when it exists', () => {
            expect(location.recipientCongressionalDistrict)
                .toEqual(`\nCongressional District: ${location.congressionalDistrict}`);
        });
        it('should return -- when no congressional district exists', () => {
            const badLocationData = { ...locationData };
            badLocationData.congressionalDistrict = null;
            const badLocation = Object.create(CoreLocation);
            badLocation.populateCore(badLocationData);
            expect(badLocation.recipientCongressionalDistrict).toEqual('--');
        });
    });
    describe('State Province', () => {
        it('should use province as the state/province when state is not available', () => {
            expect(foreignLocation.stateProvince).toEqual('Quebec');
        });
        it('should use the state code as state/province when city is available', () => {
            expect(location.stateProvince).toEqual('IN');
        });
    });
    describe('State Name', () => {
        it('should return state name', () => {
            expect(location.stateName).toEqual(locationData.state);
        });
        it('should return -- when no state name', () => {
            const badLocationData = { ...locationData };
            badLocationData.state = null;
            const badLocation = Object.create(CoreLocation);
            badLocation.populateCore(badLocationData);
            expect(badLocation.stateName).toEqual('--');
        });
    });
    describe('Full Address', () => {
        it('should format the full address', () => {
            expect(location.fullAddress).toEqual('602 Trumball Street\nApt' +
                ' 2\nPawnee, IN 12345\nCONGRESSIONAL DISTRICT: IN-04');
        });
        it('should handle a null street address', () => {
            const missingData = Object.assign({}, locationData, {
                address1: null,
                address2: null
            });
            const partialLocation = Object.create(CoreLocation);
            partialLocation.populateCore(missingData);

            expect(partialLocation.fullAddress).toEqual('Pawnee, IN 12345\nCONGRESSIONAL DISTRICT: IN-04');
        });
        it('should handle a null city', () => {
            const missingData = Object.assign({}, locationData, {
                city: null
            });
            const partialLocation = Object.create(CoreLocation);
            partialLocation.populateCore(missingData);

            expect(partialLocation.fullAddress).toEqual('602 Trumball Street\nApt 2\nIN 12345\nCONGRESSIONAL DISTRICT: IN-04');
        });
        it('should handle a null state', () => {
            const missingData = Object.assign({}, locationData, {
                state: null,
                stateCode: null
            });
            const partialLocation = Object.create(CoreLocation);
            partialLocation.populateCore(missingData);

            expect(partialLocation.fullAddress).toEqual('602 Trumball Street\nApt 2\nPawnee, 12345');
        });
        it('should handle an extended zip code', () => {
            const missingData = Object.assign({}, locationData, {
                zip4: '12345-6789',
                zip5: null
            });
            const partialLocation = Object.create(CoreLocation);
            partialLocation.populateCore(missingData);

            expect(partialLocation.fullAddress).toEqual('602 Trumball Street\nApt 2\nPawnee, IN 12345\nCONGRESSIONAL DISTRICT: IN-04');
        });
        it('should handle a two part zip code', () => {
            const data = Object.assign({}, locationData, {
                zip4: '6789',
                zip5: '12345'
            });
            const partialLocation = Object.create(CoreLocation);
            partialLocation.populateCore(data);

            expect(partialLocation.regionalAddress).toEqual('Pawnee, IN 12345-6789');
        });
        it('should handle a null congressional district', () => {
            const missingData = Object.assign({}, locationData, {
                congressionalDistrict: null
            });
            const partialLocation = Object.create(CoreLocation);
            partialLocation.populateCore(missingData);

            expect(partialLocation.fullAddress).toEqual('602 Trumball Street\nApt 2\nPawnee, IN 12345');
        });
    });
    describe('County and State', () => {
        it('should handle county and state when both are defined', () => {
            expect(location.countyAndState).toEqual(`${location._county} County, ${location._stateCode}`);
        });
        it('should handle county and state when county is not defined', () => {
            const missingCountyLocationData = Object.assign({}, locationData, { county: null });
            const missingCountyLocation = Object.create(CoreLocation);
            missingCountyLocation.populateCore(missingCountyLocationData);
            expect(missingCountyLocation.countyAndState).toEqual(`--, ${location._stateCode}`);
        });
        it('should handle county and state when state is not defined', () => {
            const missingStateLocationData = Object.assign({}, locationData, { stateCode: null });
            const missingStateLocation = Object.create(CoreLocation);
            missingStateLocation.populateCore(missingStateLocationData);
            expect(missingStateLocation.countyAndState).toEqual(`${location._county} County, --`);
        });
        it('should handle county and state when county and state are not defined', () => {
            const missingCountyAndStateLocationData = Object.assign(
                {},
                locationData,
                { county: null, stateCode: null }
            );
            const missingCountyAndStateLocation = Object.create(CoreLocation);
            missingCountyAndStateLocation.populateCore(missingCountyAndStateLocationData);
            expect(missingCountyAndStateLocation.countyAndState).toEqual('--');
        });
    });
    describe('Country Name', () => {
        it('should return UNITED STATES when country name is UNITED STATES', () => {
            const otherLocationData = { ...locationData };
            otherLocationData.country = 'UNITED STATES';
            otherLocationData.countryCode = '';
            const otherLocation = Object.create(CoreLocation);
            otherLocation.populateCore(otherLocationData);
            expect(otherLocation.countryName).toEqual('UNITED STATES');
        });
        it('should return UNITED STATES when country code is USA', () => {
            const otherLocationData = { ...locationData };
            otherLocationData.countryCode = 'UNITED STATES';
            otherLocationData.countryName = '';
            const otherLocation = Object.create(CoreLocation);
            otherLocation.populateCore(otherLocationData);
            expect(otherLocation.countryName).toEqual('UNITED STATES');
        });
        it('should return UNITED STATES when country code is UNITED STATES', () => {
            const otherLocationData = { ...locationData };
            otherLocationData.countryCode = 'UNITED STATES';
            const otherLocation = Object.create(CoreLocation);
            otherLocation.populateCore(otherLocationData);
            expect(otherLocation.countryName).toEqual('UNITED STATES');
        });
        it('should return foreign country name when it exists', () => {
            const otherLocationData = { ...locationData };
            otherLocationData.country = 'France';
            otherLocationData.countryCode = null;
            const otherLocation = Object.create(CoreLocation);
            otherLocation.populateCore(otherLocationData);
            expect(otherLocation.countryName).toEqual('France');
        });
        it('should return -- when no country name exists', () => {
            const badLocationData = { ...locationData };
            badLocationData.countryCode = null;
            badLocationData.country = null;
            const badLocation = Object.create(CoreLocation);
            badLocation.populateCore(badLocationData);
            expect(badLocation.countryName).toEqual('--');
        });
    });
});
