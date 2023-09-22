/**
 * @jest-environment jsdom
 * 
 * DownloadButtonContainer-test.jsx
 * Created by Brett Varney 10/6/21
 */

import React from 'react';
import * as redux from 'react-redux';
import { createStore } from 'redux';
import covid19Reducer from 'redux/reducers/covid19/covid19Reducer';
import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import DownloadButtonContainer from 'containers/covid19/DownloadButtonContainer';
import * as downloadHelper from 'helpers/downloadHelper';
import { mockDefcParams } from '../../mockData/helpers/disasterHelper';

describe('COVID-19 DownloadButtonContainer', () => {
    it('should request data download', async () => {
        jest.spyOn(redux, 'useSelector')
            .mockReturnValueOnce(false)
            .mockReturnValueOnce({
                defcParams: mockDefcParams
            });
        const mockStore = createStore(covid19Reducer, { defCodes: mockDefcParams });
        const spy = jest.spyOn(downloadHelper, 'requestFullDownload');

        render(<BrowserRouter><redux.Provider store={mockStore}><DownloadButtonContainer /></redux.Provider></BrowserRouter>);
        expect(spy).toHaveBeenCalledTimes(0);

        fireEvent.click(screen.getByTitle('Download'));
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith({ filters: { def_codes: mockDefcParams } }, 'disaster');
    });
});
