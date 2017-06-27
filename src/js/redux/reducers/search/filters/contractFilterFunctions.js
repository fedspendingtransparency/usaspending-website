/**
 * Created by Emily Gullo on 6/23/2017
 */

export const updatePricingType = (state, value) => {
    let updatedSet = state;

    const identifier = value.value;

    if (updatedSet.has(identifier)) {
        updatedSet = updatedSet.delete(identifier);
    }
    else {
        updatedSet = updatedSet.add(identifier);
    }

    return updatedSet;
};

export const updateSetAside = (state, value) => {
    let updatedSet = state;

    const identifier = value.value;

    if (updatedSet.has(identifier)) {
        updatedSet = updatedSet.delete(identifier);
    }
    else {
        updatedSet = updatedSet.add(identifier);
    }

    return updatedSet;
};

export const updateExtentCompeted = (state, value) => {
    let updatedSet = state;

    const identifier = value.value;

    if (updatedSet.has(value.value)) {
        updatedSet = updatedSet.delete(identifier);
    }
    else {
        updatedSet = updatedSet.add(identifier);
    }

    return updatedSet;
};
