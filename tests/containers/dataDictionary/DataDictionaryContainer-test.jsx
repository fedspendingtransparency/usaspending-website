/**
 * DataDictionaryContainer-test.jsx
 * Created by Lizzie Salita 10/1/2018
 */

 import React from 'react';
 import { mount } from 'enzyme';
 import DataDictionaryContainer from 'containers/dataDictionary/DataDictionaryContainer';

 import { mockApiCall } from '../../testResources/mockApiHelper';
 import * as api from 'helpers/apiRequest';
 import { mockDictionary } from '../../mockApi/responses/dataDictionary.js';

 mockApiCall(api, 'apiRequest', mockDictionary);

 // mock the child component by replacing it with a function that returns a null element
 jest.mock('components/dataDictionary/DataDictionary', () => jest.fn(() => null));

 describe('DataDictionaryContainer', () => {
     it('should make an API call for the dictionary content on mount and save res data to the state', async () => {
         const container = mount(<DataDictionaryContainer />);

         await container.instance().request.promise;

         console.log(container.state());

         expect(container.state().sections).toEqual(mockDictionary.data.document.sections);
         expect(container.state().columns).toEqual(mockDictionary.data.document.headers);
         expect(container.state().downloadLocation).toEqual(mockDictionary.data.document.metadata.download_location);
     });
     describe('parseRows', () => {
         it('should replace null values with N/A and update the state', () => {
             const container = mount(<DataDictionaryContainer />);

             const mockRows = [['A', 'B', 'C', null]];
             const expectedRows = [['A', 'B', 'C', 'N/A']];

             container.instance().parseRows(mockRows);
             expect(container.state().rows).toEqual(expectedRows);
         });
     });
     describe('changeSort', () => {
         it('should change the order of rows and update the state', async () => {
             const container = mount(<DataDictionaryContainer />);

             await container.instance().request.promise;

             console.log(container.state());

             container.instance().changeSort('file', 'asc');

             const expectedRows = [
                 ['B', 'dolor sit amet', '1890', 'X'],
                 ['C', 'consectetur adipiscing elit', '1994', 'Y'],
                 ['A', 'Lorem ipsum', '1862', 'Z']
             ];

             expect(container.state().sort).toEqual({
                 field: 'file',
                 direction: 'asc'
             });

             expect(container.state().rows).toEqual(expectedRows);
         });
     });
 });
