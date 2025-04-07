/* eslint-disable linebreak-style */
/**
 * @jest-environment jsdom
 * 
 * slideoutHelper-test.js
 */
import * as redux from 'react-redux';
import { createStore } from 'redux';
import { expect, jest } from '@jest/globals';
import * as glossaryReducer from 'redux/reducers/glossary/glossaryReducer';
import * as slideoutReducer from 'redux/reducers/slideouts/slideoutReducer';
import { waitFor } from '../testResources/test-utils';
import { showSlideout } from "../../src/js/helpers/slideoutHelper";


const glossaryStore = createStore(glossaryReducer, glossaryReducer.initialState);
const slideoutStore = createStore(slideoutReducer, slideoutReducer.initialState);

beforeEach(() => {
    jest.clearAllMocks();
});

describe('showSlideout', () => {
    it('should dispatch showGlossary and setLastOpenedSlideout when showSlideout helper function is called with no options', async () => {
        const mockGlossaryDispatch = jest.spyOn(glossaryStore, 'dispatch');
        const mockSlideoutDispatch = jest.spyOn(slideoutStore, 'dispatch');
        showSlideout('glossary');
        return waitFor(() => {
            expect(mockGlossaryDispatch).toHaveBeenCalledTimes(1);
            expect(mockGlossaryDispatch).toHaveBeenCalledWith(glossaryReducer.showGlossary('test data processed'));
            expect(mockSlideoutDispatch).toHaveBeenCalledTimes(1);
            expect(mockSlideoutDispatch).toHaveBeenCalledWith(slideoutReducer.setLastOpenedSlideout('test data processed'));
        });
    });
});
