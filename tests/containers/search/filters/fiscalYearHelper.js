export const earliestFiscalYear = 1984;
export const currentFiscalYear = () => 1990;

export const convertFYToDateRange = (fy) => {
    const startingYear = fy - 1;
    const endingYear = fy;

    return [`${startingYear}-10-01`, `${endingYear}-09-30`];
};
