/**
 * DownloadBottomBarContainer-test.jsx
 * Created by Emily Gullo 08/24/2017
 */
import React from 'react';
import { shallow } from 'enzyme';

import { DownloadBottomBarContainer } from 'containers/search/modals/fullDownload/DownloadBottomBarContainer';
import { mockRedux, mockActions, mockResponse } from './mockFullDownload';

jest.mock('helpers/downloadHelper', () => require('./downloadHelper'));
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/search/modals/fullDownload/DownloadBottomBar', () =>
    jest.fn(() => null));

describe('DownloadBottomBarContainer', () => {
    it('should not display the bottom bar if a download is not pending', () => {
        const container = shallow(<DownloadBottomBarContainer
            {...mockRedux}
            {...mockActions} />);
        const mockDisplay = jest.fn();
        container.instance().displayBar = mockDisplay;
        container.instance().componentDidMount();

        expect(mockDisplay).toHaveBeenCalledTimes(0);
    });
    it('should display the bottom bar if a download is pending', () => {
        const startingDownload = Object.assign({}, mockRedux.download, {
            pendingDownload: true,
            showCollapsedProgress: true,
            expectedFile: ''
        });
        const redux = Object.assign({}, mockRedux, {
            download: startingDownload
        });
        const container = shallow(<DownloadBottomBarContainer
            {...redux}
            {...mockActions} />);
        const mockDisplay = jest.fn();
        container.instance().displayBar = mockDisplay;
        container.instance().componentDidMount();

        expect(mockDisplay).toHaveBeenCalledTimes(1);
    });

    describe('displayBar', () => {
        it('should set the visible state to true', () => {
            const container = shallow(<DownloadBottomBarContainer
                {...mockRedux}
                {...mockActions} />);

            expect(container.state().visible).toBeFalsy();

            container.instance().displayBar();
            expect(container.state().visible).toBeTruthy();
            expect(container.state().showError).toBeFalsy();
            expect(container.state().showSuccess).toBeFalsy();
        });
    });

    describe('requestDownload', () => {
        it('should begin checking the status upon completion of the API call', async () => {
            const container = shallow(<DownloadBottomBarContainer
                {...mockRedux}
                {...mockActions} />);
            const mockCheck = jest.fn();
            container.instance().checkStatus = mockCheck;

            container.instance().requestDownload(mockRedux.filters, [], 'awards');
            await container.instance().request.promise;

            expect(mockCheck).toHaveBeenCalledTimes(1);
        });
    });

    describe('checkStatus', () => {
        it('should do nothing if no file is expected', () => {
            const container = shallow(<DownloadBottomBarContainer
                {...mockRedux}
                {...mockActions} />);
            const mockParse = jest.fn();
            container.instance().parseStatus = mockParse;

            container.instance().checkStatus();

            expect(mockParse).toHaveBeenCalledTimes(0);
        });
        it('should continue call the parseStatus function upon receiving an API response', async () => {
            const redux = Object.assign({}, mockRedux, {
                download: Object.assign({}, mockRedux.download, {
                    expectedFile: 'blerg.zip'
                })
            });

            const container = shallow(<DownloadBottomBarContainer
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
            const response = Object.assign({}, mockResponse, {
                status: 'finished',
                file_url: 'http://www.google.com'
            });
            const container = shallow(<DownloadBottomBarContainer
                {...mockRedux}
                {...mockActions} />);
            const mockDownload = jest.fn();
            container.instance().downloadFile = mockDownload;

            container.instance().parseStatus(response);
            expect(mockDownload).toHaveBeenCalledTimes(1);
            expect(mockDownload).toHaveBeenCalledWith('http://www.google.com');
        });
        it('should display an error message if the status is failed', () => {
            const response = Object.assign({}, mockResponse, {
                status: 'failed',
                message: 'Fake error message'
            });
            const container = shallow(<DownloadBottomBarContainer
                {...mockRedux}
                {...mockActions} />);
            const mockError = jest.fn();
            container.instance().displayError = mockError;

            container.instance().parseStatus(response);
            expect(mockError).toHaveBeenCalledTimes(1);
            expect(mockError).toHaveBeenCalledWith('Fake error message');
        });
        it('should schedule another status API call in other cases', () => {
            const response = Object.assign({}, mockResponse, {
                status: 'running'
            });
            const container = shallow(<DownloadBottomBarContainer
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
            const container = shallow(<DownloadBottomBarContainer
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
            const container = shallow(<DownloadBottomBarContainer
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
            const container = shallow(<DownloadBottomBarContainer
                {...mockRedux}
                {...mockActions} />);
            container.instance().displayError('error message');
            expect(container.state().showError).toBeTruthy();
            expect(container.state().description).toEqual('error message');
        });
    });

    describe('downloadFile', () => {
        it('should open the file URL', () => {
            const container = shallow(<DownloadBottomBarContainer
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

            const container = shallow(<DownloadBottomBarContainer
                {...mockRedux}
                {...actions} />);
            container.instance().downloadFile('http://www.google.com');
            expect(mockReset).toHaveBeenCalledTimes(1);
        });

        it('should set the state to success and display such a message', () => {
            const container = shallow(<DownloadBottomBarContainer
                {...mockRedux}
                {...mockActions} />);
            container.instance().downloadFile('http://www.google.com');

            expect(container.state().showSuccess).toBeTruthy();
        });

        it('should close the download bar after 5 seconds', () => {
            const container = shallow(<DownloadBottomBarContainer
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
            const container = shallow(<DownloadBottomBarContainer
                {...mockRedux}
                {...mockActions} />);

            container.instance().closeBar();
            expect(container.state().visible).toBeFalsy();
        });
    });
});
