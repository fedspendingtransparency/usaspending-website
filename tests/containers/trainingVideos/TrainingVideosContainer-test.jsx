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

const result = {
    videos: [{
        _duration: "infinite",
        _publishedAt: "Lofi Girl",
        description: "synthwave radio",
        id: "123abc",
        thumbnails: "synthwave boy gaming",
        title: "beats to chill/game to"
    },
    {
        _duration: "infinite",
        _publishedAt: "Lofi Girl",
        description: "lofi hip hop radio",
        id: "456def",
        thumbnails: "lofi girl chillin",
        title: "beats to sleep/chill to"
    },
    {
        _duration: "october",
        _publishedAt: "Lofi Girl",
        description: "Halloween lofi radio",
        id: "789ghi",
        thumbnails: "spooky lofi girl studying",
        title: "spooky beats to get chills to"
    }],
    featuredVideo: {
        _duration: "infinite",
        _publishedAt: "Lofi Girl",
        description: "lofi hip hop radio",
        id: "b7SDGhSZ5wM",
        thumbnails: "lofi girl studying",
        title: "beats to relax/study to"
    }
};

// // Mock the child component, so that we can isolate functionality of the container
jest.mock('../../../src/config/trainingVideos/playListMetadata', () => ({
    items: metaData.items
}));
jest.mock('../../../src/js/components/trainingVideos/TrainingVideosPage', () => jest.fn(() => null));


describe('TrainingVideosContainer', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders container and page with mock data', () => {
        render(<TrainingVideosContainer />);
        expect(TrainingVideosPage).toHaveBeenCalledWith(result, undefined);
    });
});
