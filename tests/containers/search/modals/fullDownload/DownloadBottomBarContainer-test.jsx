/**
 * DownloadBottomBarContainer-test.jsx
 * Created by Emily Gullo 08/24/2017
 */
import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';

import { DownloadBottomBarContainer } from 'containers/search/modals/fullDownload/DownloadBottomBarContainer';
import { mockParams, mockResponse } from './mockFullDownload';

// force Jest to use native Node promises
// see: https://facebook.github.io/jest/docs/troubleshooting.html#unresolved-promises
global.Promise = require.requireActual('promise');

// spy on specific functions inside the component
const displaySpy = sinon.spy(DownloadBottomBarContainer.prototype, 'displayBar');
const downloadSpy = sinon.spy(DownloadBottomBarContainer.prototype, 'downloadFile');
const errorSpy = sinon.spy(DownloadBottomBarContainer.prototype, 'displayError');

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/search/modals/fullDownload/DownloadBottomBar', () =>
    jest.fn(() => null));

describe('DownloadBottomBarContainer', () => {
    it('should not display the bottom bar if a download is not pending', () => {
        const container = mount(<DownloadBottomBarContainer download={mockParams} />);

        container.setState({
            visible: false
        });

        expect(displaySpy.callCount).toEqual(0);
        displaySpy.reset();
    });
    it('should display the bottom bar if a download is pending', () => {
        const defaultProps = {
            pendingDownload: true,
            showCollapsedProgress: true
        };
        const container = mount(<DownloadBottomBarContainer download={defaultProps} />);

        container.setState({
            visible: true
        });

        expect(displaySpy.callCount).toEqual(1);
        displaySpy.reset();
    });

    describe('parseStatus', () => {
        it('should download the file if status is ready', () => {
            const container = mount(<DownloadBottomBarContainer
                download={mockParams}
                setDownloadPending={jest.fn()}
                setDownloadCollapsed={jest.fn()} />);
            container.instance().parseStatus(mockResponse);

            expect(downloadSpy.callCount).toEqual(1);
            expect(errorSpy.callCount).toEqual(0);
            downloadSpy.reset();
            errorSpy.reset();
        });

        it('should display an error if status is failed', () => {
            const mockFailedResponse = {
                total_size: 12345,
                total_columns: 19,
                total_rows: 55555,
                file_name: "transaction_9fn24der3.csv",
                status: "failed",
                url: "https://s3.amazonaws.com/award_9fn24der3.csv",
                message: "Your file failed because the database crashed."
            };
            const container = shallow(<DownloadBottomBarContainer
                downloadParams={mockParams}
                setDownloadPending={jest.fn()}
                setDownloadCollapsed={jest.fn()} />);
            container.instance().parseStatus(mockFailedResponse);

            expect(downloadSpy.callCount).toEqual(0);
            expect(errorSpy.callCount).toEqual(1);
            errorSpy.reset();
            downloadSpy.reset();
        });
    });

    describe('scheduleNextStatus', () => {
        it('should set the number of seconds til next check', () => {
            const container = shallow(<DownloadBottomBarContainer
                download={mockParams} />);

            container.instance().statusCount = 6;
            container.instance().scheduleNextStatus();
            // expect(container.instance().statusTimer).toEqual(15000);
            expect(container.instance().statusCount).toBeGreaterThan(6);
        });

        it('should increment the status count', () => {
            const container = shallow(<DownloadBottomBarContainer
                downloadParams={mockParams} />);

            container.instance().statusCount = 0;
            container.instance().scheduleNextStatus();
            expect(container.instance().statusCount).toBeGreaterThan(0);
        });
    });

    describe('displayError', () => {
        it('displays the error received', () => {
            const container = shallow(<DownloadBottomBarContainer
                download={mockParams}
                setDownloadPending={jest.fn()}
                setDownloadCollapsed={jest.fn()} />);

            container.instance().displayError(mockResponse.message);
            expect(container.instance().state.description).toEqual(mockResponse.message);
            expect(container.instance().state.showError).toEqual(true);
        });
    });

    describe('downloadFile', () => {
        it('downloads the file', () => {
            const container = shallow(<DownloadBottomBarContainer
                download={mockParams}
                setDownloadPending={jest.fn()}
                setDownloadCollapsed={jest.fn()} />);

            container.instance().downloadFile(mockResponse.url);
            expect(container.instance().state.showSuccess).toBeTruthy();
        });
    });

    describe('closeBar', () => {
        it('closes the bar', () => {
            const container = shallow(<DownloadBottomBarContainer
                downloadParams={mockParams}
                mounted />);

            container.instance().closeBar();
            expect(container.instance().state.visible).toBeFalsy();
        });
    });
});
