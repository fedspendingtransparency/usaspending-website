/**
 * inPageNavHelper.js
 * Created by Andrea Blackwell 01/16/24
 */

export const checkIsOverflow = (ulEl, padding) => {
    let left = false;
    let right = false;
    const elArray = [...ulEl?.childNodes];
    const firstElPosition = elArray[0]?.getBoundingClientRect();
    const lastElPosition = elArray[elArray?.length - 1]?.getBoundingClientRect();

    if (firstElPosition?.left < 0 || ulEl?.scrollLeft > 0) {
        left = true;
    }

    if (lastElPosition?.right > ulEl?.clientWidth + padding || lastElPosition?.right > ulEl?.scrollWidth) {
        right = true;
    }

    return { left, right };
};

export const getElementData = (ulEl) => {
    const tempElementData = [];

    ulEl.childNodes.forEach((el) => {
        const box = el.getBoundingClientRect();
        tempElementData.push({
            name: el.innerHTML,
            originalLeftOffset: box.left,
            width: box.width
        });
    });

    return tempElementData;
};

export const reset = (navBar) => {
    const ulEl = navBar.current.querySelector("ul");
    ulEl.scrollTo({ left: "0", behavior: 'smooth' });
};
