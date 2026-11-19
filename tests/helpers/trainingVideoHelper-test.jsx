/**
 * @jest-environment jsdom
 *
 * trainingVideoHelper-test.js
 * Created by Andrea Blackwell 01/04/2023
 */

import { render } from '@testing-library/react';
import parseChapters from '../../src/js/helpers/trainingVideoHelper';

const sampleDescription = 'Drop us a comment below!\n\nCHAPTERS:\n\n0:00 Welcome!\n\n0:30';
const videoId = '1234';

describe('The Training Video Page parseChapters functions', () => {
    const renderContent = () => render(parseChapters(sampleDescription, videoId));

    it('should replace \n with <br /> elements', () => {
        const { container } = renderContent();
        expect(container.querySelectorAll('br').length).toBeGreaterThan(0);
        expect(container.textContent).not.toContain('\n');
    });

    it('should include a description with chapter timestamps converted to links', () => {
        const { container } = renderContent();
        const links = container.querySelectorAll('a.videoChapter');
        expect(links).toHaveLength(2);
        expect(links[0]).toHaveTextContent('0:00');
        expect(links[0]).toHaveAttribute('data-id', videoId);
        expect(links[0]).toHaveAttribute('data-time', '0');
        expect(links[1]).toHaveAttribute('data-time', '30');
    });
});
