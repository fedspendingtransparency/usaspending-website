/**
 * @jest-environment jsdom
 */
import tinycolor from 'tinycolor2';
import * as colorHelper from 'helpers/colorHelper';

describe('colorHelper', () => {
    describe('isContrastCompliant', () => {
        it('should return true when the color contrast is greater than or equal to 4.5', () => {
            const firstCompliant = colorHelper.isContrastCompliant('#000000', '#767676');
            expect(firstCompliant).toBeTruthy();

            const secondCompliant = colorHelper.isContrastCompliant('#0000FF', '#ABBAFF');
            expect(secondCompliant).toBeTruthy();
        });
        it('should return false when the color contrast is less than 4.5', () => {
            const firstCompliant = colorHelper.isContrastCompliant('#000000', '#646464');
            expect(firstCompliant).toBeFalsy();

            const secondCompliant = colorHelper.isContrastCompliant('#0000FF', '#0000FF');
            expect(secondCompliant).toBeFalsy();
        });
    });
    describe('lightestAcceptableLumeForWhiteText', () => {
        it('should return a luminance value that, combined with white, will result in a contrast ratio equal to the provided target', () => {
            const firstLume = colorHelper.lightestAcceptableLumeForWhiteText(3.1);
            const firstContrast = (1 + 0.05) / (firstLume + 0.05);
            expect(
                // round to 1 decimal value
                Math.round(firstContrast * 10) / 10
            ).toEqual(3.1);

            const secondLume = colorHelper.lightestAcceptableLumeForWhiteText(6.2);
            const secondContrast = (1 + 0.05) / (secondLume + 0.05);
            expect(
                // round to 1 decimal value
                Math.round(secondContrast * 10) / 10
            ).toEqual(6.2);
        });
    });
    describe('labelColorFromBackground', () => {
        it('should return white when the background lume is less than the lightest acceptable background lume for a white label ata 4.6:1 color contrast', () => {
            const background = '#000000';
            const color = colorHelper.labelColorFromBackground(background);
            expect(tinycolor(background).getLuminance()).toBeLessThan(colorHelper.lightestAcceptableLumeForWhiteText(4.6));
            expect(color).toEqual('#ffffff');
        });
        it('should return a non-white color for when the background lume is greater than lightest acceptable background lume for a white label at 4.6:1 color contrast', () => {
            const background = '#74b9ff';
            const color = colorHelper.labelColorFromBackground(background);
            expect(tinycolor(background).getLuminance()).toBeGreaterThan(colorHelper.lightestAcceptableLumeForWhiteText(4.6));
            expect(color).not.toEqual('#ffffff');
        });
        it('should return a color with 4.6:1 color contrast against a light background', () => {
            const color = colorHelper.labelColorFromBackground('#74b9ff');
            const labelColor = tinycolor(color).getLuminance();
            const backgroundColor = tinycolor('#74b9ff').getLuminance();
            // see https://www.w3.org/TR/WCAG/#dfn-contrast-ratio
            const contrastRatio = (backgroundColor + 0.05) / (labelColor + 0.05);
            expect(
                // round it to 1 decimal
                Math.round(contrastRatio * 10) / 10
            ).toEqual(4.6);
        });
    });
});
