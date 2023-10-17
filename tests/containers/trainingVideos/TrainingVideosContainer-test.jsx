/**
 * @jest-environment jsdom
 *
 * TrainingVideosContainer-test.jsx
 * Created by Josue Aguilar 10/12/2023
 */

import React from 'react';
import TrainingVideosContainer from "../../../src/js/containers/trainingVideos/TrainingVideosContainer";
import { render } from "../../testResources/test-utils";
import TrainingVideosPage from "../../../src/js/components/trainingVideos/TrainingVideosPage";

// Mock the child component, so that we can isolate functionality of the container
jest.mock('../../../src/js/components/trainingVideos/TrainingVideosPage', () => {
    return jest.fn(() => null)
})

jest.mock('')

describe('TrainingVideosContainer', () => {
    // afterEach(() => {
    //     jest.clearAllMocks();
    // });

    it('renders without crashing', () => {
        render(<TrainingVideosContainer />);
        expect(TrainingVideosPage).toHaveBeenCalledWith('wrong');
    })

    // test number of object against the number of cards created
})
