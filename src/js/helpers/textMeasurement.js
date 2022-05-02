/**
 * textMeasurement.js
 * Created by Kevin Li 6/19/17
 * For measuring your text
 */

export const measureText = (font, text) => {
    // create an invisible canvas element on the DOM
    let canvas;
    if (!document.getElementById('measurement-canvas-wrapper')) {
        const appWrapper = document.getElementById('app');
        const canvasDiv = document.createElement('div');
        canvasDiv.classList.add('hide');
        canvasDiv.setAttribute('id', 'measurement-canvas-wrapper');
        canvas = document.createElement('canvas');
        canvas.setAttribute('id', 'measurement-canvas');
        canvasDiv.appendChild(canvas);

        appWrapper.appendChild(canvasDiv);
    }
    else {
        canvas = document.getElementById('measurement-canvas');
    }

    if (!canvas) {
    // something went wrong and the canvas isn't on the DOM
        return 0;
    }

    // iterate through the provided columns and measure their titles
    const context = canvas.getContext('2d');
    context.font = font;
    return Math.ceil(context.measureText(text).width);
};

export const measureTableHeader = (text) => {
    const tableHeaderFont = 'bold 14px Source Sans Pro, sans serif';
    // add an extra 120px to account for the sorter icons
    return measureText(tableHeaderFont, text) + 120;
};

export const measureTreemapHeader = (text) => {
    const treemapHeaderFont = '16px Source Sans Pro, sans serif';
    return measureText(treemapHeaderFont, text);
};

export const measureTreemapValue = (text) => {
    const treemapValueFont = 'bold 18px Source Sans Pro, sans serif';
    return measureText(treemapValueFont, text);
};
