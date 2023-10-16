/**
 * @jest-environment jsdom
 *
 * AboutTheDataSidebarListener-test.jsx
 * Created by Nick Torres 10/16/2023
 */
import React from 'react';
import { mockData } from '../../components/aboutTheDataSidebar/mockAboutTheDataSidebarFn';
import { render, screen, act } from '../../testResources/test-utils';
import { AboutTheDataListenerContainer } from "../../../src/js/containers/aboutTheDataSidebar/AboutTheDataListener";

const mockPush = jest.fn();
const mockReplace = jest.fn();
export const mockATDListenerProps = {
    history: {
        push: mockPush,
        replace: mockReplace,
        location: {
            search: '?about-the-data=gtas'
        }
    },
    match: {
        search: "?about-the-data=gtas"
    },
    location: {
        search: '?about-the-data=gtas'
    },
    showAboutTheData: jest.fn(),
    setAboutTheDataTermFromUrl: jest.fn(),
    setLastOpenedSlideout: jest.fn()
};

describe('About The Data Sidebar Listener Test', () => {
    it(`Render ATD Listener with appropriate props`, () => {
        act(() => {
            render(
                <AboutTheDataListenerContainer {...mockATDListenerProps} />,
                {
                    initialState: {
                        aboutTheDataSidebar: mockData
                    }
                }
            );
        });
        screen.debug();
    });
});
