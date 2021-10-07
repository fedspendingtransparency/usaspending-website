/**
 * DownloadButtonContainer-test.jsx
 * Created by Brett Varney 10/6/21
 */

import React from 'react';
import { render } from 'test-utils';
import DownloadButtonContainer from 'containers/covid19/DownloadButtonContainer';
import * as downloadHelper from 'helpers/downloadHelper';
import { mockDefcParams } from '../../mockData/helpers/disasterHelper';
import { useDispatch } from 'react-redux';
import { setDefcParams } from 'redux/actions/covid19/covid19Actions';

const dispatch = useDispatch();

describe('COVID-19 DownloadButtonContainer', () => {
    it('should get all download data', () => {
        const spy = jest.spyOn(downloadHelper, 'requestFullDownload');
        dispatch(setDefcParams(mockDefcParams));

        render(<DownloadButtonContainer />);
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenNthCalledWith(mockDefcParams, 'disaster');
    });
});
