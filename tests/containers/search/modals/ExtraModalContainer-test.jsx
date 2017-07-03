/**
 * ExtraModalContainer-test.jsx
 * Created by Kevin Li 5/11/17
 */
import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';

import * as DownloadHelper from 'helpers/downloadHelper';
import { ExtraModalContainer } from 'containers/search/modals/ExtraModalContainer';

import { mockRequest, mockReady, mockParams } from './mockDownload';

// force Jest to use native Node promises
// see: https://facebook.github.io/jest/docs/troubleshooting.html#unresolved-promises
global.Promise = require.requireActual('promise');

// spy on specific functions inside the component
const downloadSpy = sinon.spy(ExtraModalContainer.prototype, 'requestDownload');

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/search/modals/ExtraModal', () =>
    jest.fn(() => null));

const mockDownloadHelper = (functionName, event, expectedResponse) => {
    jest.useFakeTimers();

    // override the specified function
    DownloadHelper[functionName] = jest.fn(() => {
        // Axios normally returns a promise, replicate this, but return the expected result
        const networkCall = new Promise((resolve, reject) => {
            process.nextTick(() => {
                if (event === 'resolve') {
                    resolve({
                        data: expectedResponse
                    });
                }
                else {
                    reject({
                        data: expectedResponse
                    });
                }
            });
        });

        return {
            promise: networkCall,
            cancel: jest.fn()
        };
    });
};

describe('ExtraModalContainer', () => {
    it('should request a download when the modal is opened', () => {
        mockDownloadHelper('requestAwardTable', 'resolve', mockRequest);

        const container = mount(<ExtraModalContainer
            downloadParams={mockParams} />);

        container.setProps({
            mounted: true
        });

        expect(downloadSpy.callCount).toEqual(1);
        downloadSpy.reset();
    });

    it('should not request a download if the request hash hasn\'t changed', () => {
        mockDownloadHelper('requestAwardTable', 'resolve', mockRequest);

        const container = mount(<ExtraModalContainer
            downloadParams={mockParams} />);

        container.setState({
            activeParams: mockParams
        });

        container.setProps({
            mounted: true
        });

        expect(downloadSpy.callCount).toEqual(0);
        downloadSpy.reset();
    });

    describe('parseResponse', () => {
        it('should check for status updates if the download request has not finished', () => {
            mockDownloadHelper('requestAwardTable', 'resolve', mockRequest);

            const container = shallow(<ExtraModalContainer
                downloadParams={mockParams}
                mounted />);

            container.instance().parseResponse(mockRequest);
            expect(container.instance().statusChecker).not.toBeNull();
        });

        it('should not check for status updates if the download request has finished', () => {
            mockDownloadHelper('requestAwardTable', 'resolve', mockRequest);

            const container = shallow(<ExtraModalContainer
                downloadParams={mockParams}
                mounted />);

            container.instance().parseResponse(mockReady);
            expect(container.instance().statusChecker).toBeNull();
        });

        it('should display the current status message from the API', () => {
            mockDownloadHelper('requestAwardTable', 'resolve', mockRequest);

            const container = shallow(<ExtraModalContainer
                downloadParams={mockParams}
                mounted />);

            container.instance().parseResponse(mockRequest);

            expect(container.state().message).toEqual("message");
            expect(container.state().animate).toBeTruthy();
        });

        it('should stop animating if the download is ready', () => {
            mockDownloadHelper('requestAwardTable', 'resolve', mockRequest);

            const container = shallow(<ExtraModalContainer
                downloadParams={mockParams}
                mounted />);

            container.instance().parseResponse(mockReady);

            expect(container.state().message).toEqual("done");
            expect(container.state().location).toEqual("url");
            expect(container.state().animate).toBeFalsy();
        });
    });
});
