/**
 * BulkDownloadBottomBarContainer-test.jsx
 * Created by Lizzie Salita 11/7/17
 */

import React from 'react';
import { shallow } from 'enzyme';

import { BulkDownloadBottomBarContainer } from 'containers/bulkDownload/modal/BulkDownloadBottomBarContainer';
import { mockRedux, mockActions, mockStatusResponse } from '../mockData';

jest.mock('helpers/bulkDownloadHelper', () => require('../mockBulkDownloadHelper'));
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/search/modals/fullDownload/DownloadBottomBar', () =>
    jest.fn(() => null));

describe('BulkDownloadBottomBarContainer', () => {
    it('should not display the bottom bar if a download is not pending', () => {
        const container = shallow(<BulkDownloadBottomBarContainer
            {...mockRedux}
            {...mockActions} />);
        const mockDisplay = jest.fn();
        container.instance().displayBar = mockDisplay;
        container.instance().componentDidMount();

        expect(mockDisplay).toHaveBeenCalledTimes(0);
    });
    it('should display the bottom bar if a download is pending', () => {
        const startingDownload = Object.assign({}, mockRedux.bulkDownload.download, {
            pendingDownload: true,
            showCollapsedProgress: true,
            expectedFile: ''
        });
        const bulkDownload = Object.assign({}, mockRedux.bulkDownload, {
            download: startingDownload
        });
        const redux = Object.assign({}, mockRedux, {
            bulkDownload
        });
        const container = shallow(<BulkDownloadBottomBarContainer
            {...redux}
            {...mockActions} />);
        const mockDisplay = jest.fn();
        container.instance().displayBar = mockDisplay;
        container.instance().componentDidMount();

        expect(mockDisplay).toHaveBeenCalledTimes(1);
    });

    describe('displayBar', () => {
        it('should set the visible state to true', () => {
            const container = shallow(<BulkDownloadBottomBarContainer
                {...mockRedux}
                {...mockActions} />);

            expect(container.state().visible).toBeFalsy();

            container.instance().displayBar();
            expect(container.state().visible).toBeTruthy();
            expect(container.state().showError).toBeFalsy();
            expect(container.state().showSuccess).toBeFalsy();
        });
    });

    describe('checkStatus', () => {
        it('should do nothing if no file is expected', () => {
            const container = shallow(<BulkDownloadBottomBarContainer
                {...mockRedux}
                {...mockActions} />);
            const mockParse = jest.fn();
            container.instance().parseStatus = mockParse;

            container.instance().checkStatus();

            expect(mockParse).toHaveBeenCalledTimes(0);
        });
        it('should continue call the parseStatus function upon receiving an API response', async () => {
            const bulkDownload = Object.assign({}, mockRedux.bulkDownload, {
                download: Object.assign({}, mockRedux.bulkDownload.download, {
                    expectedFile: 'blerg.zip'
                })
            });
            const redux = Object.assign({}, mockRedux, {
                bulkDownload
            });
            const container = shallow(<BulkDownloadBottomBarContainer
                {...redux}
                {...mockActions} />);
            const mockParse = jest.fn();
            container.instance().parseStatus = mockParse;

            container.instance().checkStatus();
            await container.instance().statusRequest.promise;

            expect(mockParse).toHaveBeenCalledTimes(1);
        });
    });

    describe('parseStatus', () => {
        it('should download the file if the status is finished', () => {
            const response = Object.assign({}, mockStatusResponse, {
                status: 'finished',
                url: 'http://www.google.com'
            });
            const container = shallow(<BulkDownloadBottomBarContainer
                {...mockRedux}
                {...mockActions} />);
            const mockDownload = jest.fn();
            container.instance().downloadFile = mockDownload;

            container.instance().parseStatus(response);
            expect(mockDownload).toHaveBeenCalledTimes(1);
            expect(mockDownload).toHaveBeenCalledWith('http://www.google.com');
        });
        it('should display an error message if the status is failed', () => {
            const response = Object.assign({}, mockStatusResponse, {
                status: 'failed',
                message: 'Fake error message'
            });
            const container = shallow(<BulkDownloadBottomBarContainer
                {...mockRedux}
                {...mockActions} />);
            const mockError = jest.fn();
            container.instance().displayError = mockError;

            container.instance().parseStatus(response);
            expect(mockError).toHaveBeenCalledTimes(1);
            expect(mockError).toHaveBeenCalledWith('Fake error message');
        });
        it('should schedule another status API call in other cases', () => {
            const response = Object.assign({}, mockStatusResponse, {
                status: 'running'
            });
            const container = shallow(<BulkDownloadBottomBarContainer
                {...mockRedux}
                {...mockActions} />);
            const mockSchedule = jest.fn();
            container.instance().scheduleNextStatus = mockSchedule;

            container.instance().parseStatus(response);
            expect(mockSchedule).toHaveBeenCalledTimes(1);
        });
    });

    describe('scheduleNextStatus', () => {
        it('should perform an API call every 15 seconds for the first 4 status calls', () => {
            const container = shallow(<BulkDownloadBottomBarContainer
                {...mockRedux}
                {...mockActions} />);
            const mockStatus = jest.fn();
            container.instance().checkStatus = mockStatus;

            jest.useFakeTimers();

            container.instance().statusCount = 2;
            container.instance().scheduleNextStatus();
            jest.runTimersToTime(15000);
            expect(mockStatus).toHaveBeenCalledTimes(1);
        });
        it('should perform an API call every 30 seconds after that', () => {
            const container = shallow(<BulkDownloadBottomBarContainer
                {...mockRedux}
                {...mockActions} />);
            const mockStatus = jest.fn();
            container.instance().checkStatus = mockStatus;

            jest.useFakeTimers();

            container.instance().statusCount = 8;
            container.instance().scheduleNextStatus();
            jest.runTimersToTime(15000);
            expect(mockStatus).toHaveBeenCalledTimes(0);
            jest.runTimersToTime(15000);
            expect(mockStatus).toHaveBeenCalledTimes(1);
        });
    });

    describe('displayError', () => {
        it('should set the showError state to true and display a message', () => {
            const container = shallow(<BulkDownloadBottomBarContainer
                {...mockRedux}
                {...mockActions} />);
            container.instance().displayError('error message');
            expect(container.state().showError).toBeTruthy();
            expect(container.state().description).toEqual('error message');
        });
    });

    describe('downloadFile', () => {
        it('should open the file URL', () => {
            const container = shallow(<BulkDownloadBottomBarContainer
                {...mockRedux}
                {...mockActions} />);
            const download = jest.fn();
            global.open = download;

            container.instance().downloadFile('http://www.google.com');
            expect(download).toHaveBeenCalledTimes(1);
            expect(download).toHaveBeenCalledWith('http://www.google.com', '_self');
        });

        it('should tell Redux that the download has completed', () => {
            const mockReset = jest.fn();
            const actions = Object.assign({}, mockActions, {
                resetDownload: mockReset
            });

            const container = shallow(<BulkDownloadBottomBarContainer
                {...mockRedux}
                {...actions} />);
            container.instance().downloadFile('http://www.google.com');
            expect(mockReset).toHaveBeenCalledTimes(1);
        });

        it('should set the state to success and display such a message', () => {
            const container = shallow(<BulkDownloadBottomBarContainer
                {...mockRedux}
                {...mockActions} />);
            container.instance().downloadFile('http://www.google.com');

            expect(container.state().showSuccess).toBeTruthy();
        });

        it('should close the download bar after 5 seconds', () => {
            const container = shallow(<BulkDownloadBottomBarContainer
                {...mockRedux}
                {...mockActions} />);
            const mockClose = jest.fn();
            container.instance().closeBar = mockClose;
            container.instance().downloadFile('http://www.google.com');

            jest.useFakeTimers();
            jest.runTimersToTime(5000);
            expect(mockClose).toHaveBeenCalledTimes(1);
        });
    });

    describe('closeBar', () => {
        it('closes the bar', () => {
            const container = shallow(<BulkDownloadBottomBarContainer
                {...mockRedux}
                {...mockActions} />);

            container.instance().closeBar();
            expect(container.state().visible).toBeFalsy();
        });
    });
});
