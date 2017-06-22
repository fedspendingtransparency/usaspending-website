/**
 * Created by michaelbray on 3/21/17.
 */

export const updatePricingType = (state, value) => {
    let updatedSet = state;

    const identifier = `${value.title}`;

    if (updatedSet.has(identifier)) {
        updatedSet = updatedSet.delete(identifier);
    }
    else {
        updatedSet = updatedSet.set(identifier, value);
    }

    return updatedSet;
};

export const updateSetAside = (state, value) => {
    let updatedSet = state;

    const identifier = `${value.title}`;

    if (updatedSet.has(identifier)) {
        updatedSet = updatedSet.delete(identifier);
    }
    else {
        updatedSet = updatedSet.set(identifier, value);
    }

    return updatedSet;
};

export const updateExtentCompeted = (state, value) => {
    let updatedSet = state;

    const identifier = `${value.title}`;

    if (updatedSet.has(identifier)) {
        updatedSet = updatedSet.delete(identifier);
    }
    else {
        updatedSet = updatedSet.set(identifier, value);
    }

    return updatedSet;
};
