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

    it('should not throw when CHAPTERS is present without timestamps', () => {
        const { container } = render(parseChapters('CHAPTERS:\n\ncoming soon', videoId));
        expect(container.querySelectorAll('a.videoChapter')).toHaveLength(0);
        expect(container).toHaveTextContent('coming soon');
    });

    it('should not throw on a missing description', () => {
        expect(() => render(parseChapters(undefined, videoId))).not.toThrow();
        expect(() => render(parseChapters(null, videoId))).not.toThrow();
    });

    it('should convert hour timestamps correctly', () => {
        const { container } = render(parseChapters('CHAPTERS:\n1:02:30 Wrap up', videoId));
        const links = container.querySelectorAll('a.videoChapter');
        expect(links).toHaveLength(1);
        expect(links[0]).toHaveTextContent('1:02:30');
        expect(links[0]).toHaveAttribute('data-time', '3750');
    });

    it('should not match one timestamp inside another', () => {
        const { container } = render(parseChapters('CHAPTERS:\n10:30 Later\n0:30 Early', videoId));
        const links = container.querySelectorAll('a.videoChapter');
        expect(links).toHaveLength(2);
        expect(links[0]).toHaveTextContent('10:30');
        expect(links[0]).toHaveAttribute('data-time', '630');
        expect(links[1]).toHaveTextContent('0:30');
        expect(links[1]).toHaveAttribute('data-time', '30');
    });

    it('should link every occurrence of a repeated timestamp without nesting', () => {
        const { container } = render(parseChapters('CHAPTERS:\n0:30 One\n0:30 Two', videoId));
        expect(container.querySelectorAll('a.videoChapter')).toHaveLength(2);
        expect(container.querySelectorAll('a a')).toHaveLength(0);
    });

    it('should only link timestamps after the CHAPTERS heading', () => {
        const { container } = render(parseChapters('Recorded at 2:00 pm\nCHAPTERS:\n0:15 Intro', videoId));
        const links = container.querySelectorAll('a.videoChapter');
        expect(links).toHaveLength(1);
        expect(links[0]).toHaveTextContent('0:15');
    });

    it('should keep target and rel on linkified urls after sanitizing', () => {
        const { container } = render(parseChapters('See https://www.usaspending.gov for more', videoId));
        const link = container.querySelector('a[href^="https://www.usaspending.gov"]');
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('should strip scripts, event handlers, and javascript: links', () => {
        const { container } = render(parseChapters(
            '<script>alert(1)</script><a href="javascript:alert(1)" onclick="alert(2)">bad</a> <img src=x onerror="alert(3)">',
            videoId
        ));
        expect(container.querySelector('script')).toBeNull();
        expect(container.querySelector('[onclick]')).toBeNull();
        expect(container.querySelector('[onerror]')).toBeNull();
        expect(container.querySelector('a[href^="javascript"]')).toBeNull();
    });

    it('should handle Windows line endings', () => {
        const { container } = render(parseChapters('Line one\r\nLine two', videoId));
        expect(container.querySelectorAll('br')).toHaveLength(1);
        expect(container.textContent).not.toContain('\r');
    });

    it('should escape the video id in the data-id attribute', () => {
        const { container } = render(parseChapters('CHAPTERS:\n0:15 Intro', '"><b>x</b>'));
        expect(container.querySelector('a.videoChapter')).toHaveAttribute('data-id', '"><b>x</b>');
        expect(container.querySelector('b')).toBeNull();
    });
});
