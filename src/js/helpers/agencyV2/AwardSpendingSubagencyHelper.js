import BaseSubagencySpendingRow from 'models/v2/agency/BaseSubagencySpendingRow';
import BaseSubagencySpendingRowChildren from 'models/v2/agency/BaseSubagencySpendingRowChildren';

// eslint-disable-next-line import/prefer-default-export
export const parseRows = (data) => {
    const dataAndTotalObligation = data.map((d) => {
        let dataChildrenAndTotalObligation = [];
        if (d.children && d.children.length > 0) {
            dataChildrenAndTotalObligation = d.children.map((child) => ({
                ...child
            }));
        }

        if (dataChildrenAndTotalObligation.length > 0) {
            return {
                ...d,
                children: dataChildrenAndTotalObligation
            };
        }

        return {
            ...d
        };
    });

    // parse row and row's children
    const parsedData = dataAndTotalObligation.map((item) => {
        const subagencyTotalsRow = Object.create(BaseSubagencySpendingRow);
        subagencyTotalsRow.populateCore(item);

        let rowChildren = [];
        if (item.children && item.children.length > 0) {
            rowChildren = item.children.map((childItem) => {
                const subagencyTotalsRowChild = Object.create(BaseSubagencySpendingRowChildren);
                subagencyTotalsRowChild.populate(childItem);
                return subagencyTotalsRowChild;
            });
        }

        if (rowChildren && rowChildren.length > 0) {
            Object.defineProperty(subagencyTotalsRow, "children", {
                value: rowChildren
            });
        }

        return subagencyTotalsRow;
    });
    return parsedData;
};
