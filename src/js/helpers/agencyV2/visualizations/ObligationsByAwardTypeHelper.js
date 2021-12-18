/**
 * ObligationsByAwardTypeHelper.js
 * Created by Andrea Blackwell 12/15/2021
 */


export const mapToFullCategoryName = (categoryType) => `All ${categoryType.charAt(0).toUpperCase()}${categoryType.slice(1)}`;

export const getCategoryNameByAwardType = (awardType, categoryMapping) => {
    const categoryNames = Object.keys(categoryMapping);
    return categoryMapping[categoryNames[0]].includes(awardType) ? categoryNames[0] : categoryNames[1];
};

export const getActiveCategoryType = (activeType, categoryMapping) => {
    if (activeType?.length > 0) {
        const categoryNames = Object.keys(categoryMapping);
        const category = categoryMapping[categoryNames[0]].includes(activeType) ? categoryNames[0] : categoryNames[1];
        return category.replace(/(^All\s)/, '').toLowerCase();
    }
    return '';
};

export const getOuterCategoryId = (categoryName, outer) => {
    for (let i = 0; i < outer.length; i++) {
        if (outer[i].label.includes(categoryName)) return i;
    }

    return '';
};

