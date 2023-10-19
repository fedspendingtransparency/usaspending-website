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
// import metaData from "./mockMetaData";

const metaData = {
    items: [
        {
            id: "b7SDGhSZ5wM",
            snippet: {
                title: "lofi hip hop radio",
                description: "Lofi Girl",
                publishedAt: 'Lofi Girl',
                thumbnails: 'none'
            },
            contentDetails: {
                duration: 'infinite',
            }
        },
        {
            id: "123abc",
            snippet: {
                title: "synthwave radio",
                description: "Lofi Girl",
                publishedAt: 'Lofi Girl',
                thumbnails: 'none'
            },
            contentDetails: {
                duration: 'infinite',
            }
        }
    ]
}

// Mock the child component, so that we can isolate functionality of the container
jest.mock('../../../src/js/components/trainingVideos/TrainingVideosPage', () => {
    return jest.fn(() => null)
})
jest.mock('../../../src/js/dataMapping/trainingVideos/playListMetadata', () => {
    return {
        items: metaData.items
    }
});

describe('TrainingVideosContainer', () => {
    afterEach(() => {
        jest.clearAllMocks();
    })
    const testResult = {
        featuredVideo: {
            id: metaData.items[0].id,
            title: metaData.items[0].snippet.title,
            description: metaData.items[0].snippet.description,
            _publishedAt: metaData.items[0].snippet.publishedAt,
            _duration: metaData.items[0].contentDetails.duration,
            thumbnails: metaData.items[0].snippet.thumbnails
        },
        videos: [
            {
                id: metaData.items[1].id,
                title: metaData.items[1].snippet.title,
                description: metaData.items[1].snippet.description,
                _publishedAt: metaData.items[1].snippet.publishedAt,
                _duration: metaData.items[1].contentDetails.duration,
                thumbnails: metaData.items[1].snippet.thumbnails
            }
        ],
    }

    it('renders without crashing', () => {
        render(<TrainingVideosContainer />);
        expect(TrainingVideosPage).toHaveBeenCalledWith(testResult, {});

    })

    // test number of object against the number of cards created
})
