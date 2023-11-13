/**
 * @jest-environment jsdom
 * 
 * trainingVideoHelper-test.js
 * Created by Andrea Blackwell 01/04/2023
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import parseChapters from "../../src/js/helpers/trainingVideoHelper";

const sampleDescription = "Drop us a comment below!\n\nCHAPTERS:\n\n0:00 Welcome!\n\n0:30";
const videoId = "1234";

describe('The Training Video Page parseChapters functions', () => {
    const parsedContent = parseChapters(sampleDescription, videoId);

    it('should replace \n with <br /> elements', () => {
        expect(parsedContent).not.toContain('\n');
    });

    it('should include a description with chapter timestamps converted to links', () => {
        render(parsedContent);
        const link = screen.getByRole("link", { name: "0:30" });
    });
});

