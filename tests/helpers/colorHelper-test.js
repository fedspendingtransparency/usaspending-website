import tinycolor from 'tinycolor2';
import * as colorHelper from 'helpers/colorHelper';

describe('colorHelper', () => {
    describe('labelColorFromBackground', () => {
        it('should return white for dark backgrounds', () => {
            const color = colorHelper.labelColorFromBackground('#000000');
            expect(color).toEqual('#ffffff');
        });
        it('should return a non-white color for light backgrounds', () => {
            const color = colorHelper.labelColorFromBackground('#74b9ff');
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
