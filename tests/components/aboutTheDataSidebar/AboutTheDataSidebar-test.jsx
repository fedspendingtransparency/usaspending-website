/**
 * AboutTheDataSidebar-test.jsx
 * Created by Andrea Blackwell 12/14/2022
 */

import React from 'react';
import sinon from 'sinon';
import { render, screen, act } from 'test-utils';
import schema from 'dataMapping/aboutTheDataSchema';

import AboutTheData from 'component/aboutTheDataSidebar/AboutTheData';
import { initialState } from 'redux/reducers/aboutTheDataSidebar/aboutTheDataReducer';
import { mockActions, mockData, mockSearch, standardTerm } from './mockAboutTheDataSidebarFn';

xdescribe('About the Data Main Component', () => {

    // it('should only call populateGlossaryWithAllTerms when search term is empty', () => {
    //     render(<AboutTheData {...mockActions} schema={{schema}} />);
    //
    //
    //     expect(populateGlossaryWithAllTermsSpy.callCount).toEqual(0);
    //     expect(performSearchSpy.callCount).toEqual(1);
    //
    // });

    // xdescribe('parseTerms', () => {
    //     it('should parse the API response into an array of Definition objects', () => {
    //         mockGlossaryHelper('populateCache', 'resolve', mockCache);
    //         mockGlossaryHelper('performSearch', 'resolve', mockSearch);
    //
    //         const mockedSetGlossaryResults = jest.fn();
    //
    //         const swizzledActions = Object.assign({}, mockActions, {
    //             setGlossaryResults: mockedSetGlossaryResults
    //         });
    //
    //         const container = shallow(<GlossaryContainer
    //             {...swizzledActions}
    //             glossary={mockData} />);
    //
    //         container.instance().parseTerms(mockSearch.matched_objects.term);
    //
    //         expect(mockedSetGlossaryResults).toHaveBeenCalledTimes(1);
    //         expect(mockedSetGlossaryResults).toHaveBeenCalledWith([standardTerm]);
    //     });
    // });
    //
    // describe('jumpToTerm', () => {
    //     it('should show the glossary and load the specified term when a term with a matching slug exists', () => {
    //         mockGlossaryHelper('populateCache', 'resolve', mockCache);
    //         mockGlossaryHelper('performSearch', 'resolve', mockSearch);
    //
    //         const mockShowGlossary = jest.fn();
    //         const mockSetGlossary = jest.fn();
    //
    //         const swizzledActions = Object.assign({}, mockActions, {
    //             setGlossaryTerm: mockSetGlossary,
    //             showGlossary: mockShowGlossary
    //         });
    //
    //         const container = shallow(<GlossaryContainer
    //             {...swizzledActions}
    //             glossary={mockData} />);
    //
    //         container.instance().jumpToTerm('test-term');
    //
    //         expect(mockSetGlossary).toHaveBeenCalledTimes(1);
    //         expect(mockSetGlossary).toHaveBeenCalledWith(standardTerm);
    //         expect(mockShowGlossary).toHaveBeenCalledTimes(1);
    //     });
    //     it('should do nothing when no terms with matching slugs exist', () => {
    //         mockGlossaryHelper('populateCache', 'resolve', mockCache);
    //         mockGlossaryHelper('performSearch', 'resolve', mockSearch);
    //
    //         const mockShowGlossary = jest.fn();
    //         const mockSetGlossary = jest.fn();
    //
    //         const swizzledActions = Object.assign({}, mockActions, {
    //             setGlossaryTerm: mockSetGlossary,
    //             showGlossary: mockShowGlossary
    //         });
    //
    //         const container = shallow(<GlossaryContainer
    //             {...swizzledActions}
    //             glossary={mockData} />);
    //
    //         container.instance().jumpToTerm('xxxxx');
    //
    //         expect(mockSetGlossary).toHaveBeenCalledTimes(0);
    //         expect(mockShowGlossary).toHaveBeenCalledTimes(0);
    //     });
    // });
});
