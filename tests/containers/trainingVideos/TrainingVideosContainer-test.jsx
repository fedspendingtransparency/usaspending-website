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

const metaData = {
    items: [
        {
            id: "b7SDGhSZ5wM",
            snippet: {
                title: "beats to relax/study to",
                description: "lofi hip hop radio",
                publishedAt: 'Lofi Girl',
                thumbnails: 'lofi girl studying'
            },
            contentDetails: {
                duration: 'infinite'
            }
        },
        {
            id: "123abc",
            snippet: {
                title: "beats to chill/game to",
                description: "synthwave radio",
                publishedAt: 'Lofi Girl',
                thumbnails: 'synthwave boy gaming'
            },
            contentDetails: {
                duration: 'infinite'
            }
        },
        {
            id: "456def",
            snippet: {
                title: "beats to sleep/chill to",
                description: "lofi hip hop radio",
                publishedAt: 'Lofi Girl',
                thumbnails: 'lofi girl chillin'
            },
            contentDetails: {
                duration: 'infinite'
            }
        },
        {
            id: "789ghi",
            snippet: {
                title: "spooky beats to get chills to",
                description: "Halloween lofi radio",
                publishedAt: 'Lofi Girl',
                thumbnails: 'spooky lofi girl studying'
            },
            contentDetails: {
                duration: 'october'
            }
        }
    ]
};

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
        },
        {
            id: metaData.items[2].id,
            title: metaData.items[2].snippet.title,
            description: metaData.items[2].snippet.description,
            _publishedAt: metaData.items[2].snippet.publishedAt,
            _duration: metaData.items[2].contentDetails.duration,
            thumbnails: metaData.items[2].snippet.thumbnails
        },
        {
            id: metaData.items[3].id,
            title: metaData.items[3].snippet.title,
            description: metaData.items[3].snippet.description,
            _publishedAt: metaData.items[3].snippet.publishedAt,
            _duration: metaData.items[3].contentDetails.duration,
            thumbnails: metaData.items[3].snippet.thumbnails
        }
    ]
};

// Mock the child component, so that we can isolate functionality of the container
jest.mock('../../../src/js/components/trainingVideos/TrainingVideosPage', () => jest.fn(() => null));
jest.mock('../../../src/js/dataMapping/trainingVideos/playListMetadata', () => ({
    items: metaData.items
}));


describe('TrainingVideosContainer', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders container and page with mock data', () => {
        render(<TrainingVideosContainer />);
        expect(TrainingVideosPage).toHaveBeenCalledWith(testResult, {});
    });
});
