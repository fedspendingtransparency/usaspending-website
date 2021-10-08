/**
 * DownloadButtonContainer-test.jsx
 * Created by Brett Varney 10/6/21
 */

import React from 'react';
import * as redux from 'react-redux';
import { mount } from 'enzyme';
import { render } from 'test-utils';
import { DownloadButtonContainer } from 'containers/covid19/DownloadButtonContainer';
import * as downloadHelper from 'helpers/downloadHelper';
import { mockDefcParams } from '../../mockData/helpers/disasterHelper';

describe('COVID-19 DownloadButtonContainer', () => {
    it('should request data download', async () => {
        jest.spyOn(redux, 'useSelector').mockReturnValue({
            defcParams: mockDefcParams,
            bulkDownload: { download: { pendingDownload: false } }
        });
        const spy = jest.spyOn(downloadHelper, 'requestFullDownload');
        //         const downloadButtonContainer = DownloadButtonContainer();

        // console.log(JSON.stringify(downloadButtonContainer));

        //         await downloadButtonContainer.downloadData();
        // const container = mount(<DownloadButtonContainer />);
        await DownloadButtonContainer().downloadData();
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenNthCalledWith(mockDefcParams, 'disaster');
    });
});
