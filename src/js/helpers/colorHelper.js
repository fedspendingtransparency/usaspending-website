/**
 * colorHelper.js
 * Created by Kevin Li 3/12/18
 */


import tinycolor from 'tinycolor2';

export const isContrastCompliant = (firstColor, secondColor) => {
    const first = tinycolor(firstColor);
    const second = tinycolor(secondColor);

    // refer to https://www.w3.org/TR/WCAG/#dfn-contrast-ratio
    const firstLume = first.getLuminance();
    const secondLume = second.getLuminance();
    const darker = Math.min(firstLume, secondLume);
    const lighter = Math.max(firstLume, secondLume);
    const contrastRatio = (lighter + 0.05) / (darker + 0.05);

    return contrastRatio >= 4.5;
};

export const lightestAcceptableLumeForWhiteText = (targetContrast) => (
    // calculate what the darkest acceptable background color luminance is to still use a white
    // label given a target contrast ratio
    (1.05 / targetContrast) - 0.05
);

// generate an RGB hex code for a label given any background color
export const labelColorFromBackground = (backgroundColor) => {
    const targetContrast = 4.6;
    const backgroundLumeMax = lightestAcceptableLumeForWhiteText(targetContrast);
    const background = tinycolor(backgroundColor);

    // calculate the relative luminance of the background color
    const backLume = background.getLuminance();
    if (backLume <= backgroundLumeMax) {
    // background is dark enough to support white text
        return '#ffffff';
    }

    // otherwise, the background is too light and needs a darker text color
    // determine what the foreground luminance must be to achieve a 4.6:1 contrast ratio
    // refer to https://www.w3.org/TR/WCAG/#dfn-contrast-ratio
    const foreLume = ((backLume + 0.05) / targetContrast) - 0.05;

    // given this luminance, determine what a grey RGB code must be
    // we know that the R, G, and B values must be equal to each other because grey colors have
    // the same R, G, and B values. Given this and the foreground luminance, we can calculate what
    // their adjusted inputs are.
    // refer to https://www.w3.org/TR/WCAG/#dfn-relative-luminance
    const sRGB = foreLume / (0.2126 + 0.7152 + 0.0722);

    // from this we can determine the original, unadjusted R value
    let rawR = sRGB * 12.92;
    if (rawR > 0.03928) {
        rawR = ((sRGB ** (1 / 2.4)) * 1.055) - 0.055;
    }

    const foreground = tinycolor({
        r: rawR * 255,
        g: rawR * 255,
        b: rawR * 255
    });
    return foreground.toHexString();
};
