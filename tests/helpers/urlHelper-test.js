/**
 * @jest-environment jsdom
 * 
 * urlHelper-test.js
 * Created by JD House 7/7/2026
*/

import { sanitizeUrl } from "../../src/js/helpers/url";


describe('sanitizeUrl()', () => {
    it('returns a normalized https URL unchanged', () => {
        expect(sanitizeUrl('https://api.usaspending.gov/'))
            .toBe('https://api.usaspending.gov/');
    });
        
    it('returns a normalized https URL unchanged', () => {
        expect(sanitizeUrl('https://api.usaspending.gov/docs/intro-tutorial'))
            .toBe('https://api.usaspending.gov/docs/intro-tutorial');
    });
        
    it('strips leading / trailing whitespace', () => {
        expect(sanitizeUrl('       https://api.usaspending.gov/        '))
            .toBe('https://api.usaspending.gov/');
    });

    it('strips invisible unicode characters', () => {
        expect(sanitizeUrl("\u200Bhttps://api.usaspending.gov/\u200B"))
            .toBe('https://api.usaspending.gov/');
    });

    it('removes common known open-direct attack query params', () => {
        expect(sanitizeUrl("https://api.usaspending.gov/?redirect=http://evil-route.com"))
            .toBe('https://api.usaspending.gov/');
    });

    it('removes multiple common known open-direct attack query params', () => {
        expect(sanitizeUrl("https://api.usaspending.gov/?redirect=http://evil-route.com/?url=/moreEvil&safe=yes"))
            .toBe('https://api.usaspending.gov/?safe=yes');
    });

    // should return null

    it('blocks non https url', () => {
        expect(sanitizeUrl("http://test-https.com"))
            .toBeNull();
    })

    it('blocks non javascript: URLs', () => {
        expect(sanitizeUrl("javascript:alert(1"))
            .toBeNull();
    })
});
