/**
 * @jest-environment jsdom
 * 
 * TrainingVideo-test.js
 * Created by Andrea Blackwell 12/21/22
 */

import React from "react";
import VideoMetadata from 'models/v2/video/VideoMetadata';
import metadata from 'dataMapping/trainingVideos/playListMetadata';

const sampleVideo = Object.create(VideoMetadata);
sampleVideo.populate(metadata.items[1]);

describe('Video Metadata model', () => {
    it ('should contain a full URL to a YouTube video', () => {
        expect(sampleVideo.url).toEqual('https://www.youtube.com/watch?v=AEKL2LOkRZY');
    });

    it ('should include a title', () => {
        expect(sampleVideo.title).toEqual('TUTORIAL: How to Use USAspending API Endpoints');
    });

    it ('should include a published at date', () => {
        expect(sampleVideo.publishedAt).toEqual('Dec 5, 2022');
    });

    it ('should include a duration', () => {
        expect(sampleVideo.duration).toEqual('9:58');
    });

    it ('should include a default thumbnail', () => {
        expect(sampleVideo.thumbnails.default.url).not.toEqual('');
    });
});
