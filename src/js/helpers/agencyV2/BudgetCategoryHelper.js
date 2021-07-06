import BaseAccountSpendingRow from 'models/v2/agency/BaseAccountSpendingRow';

// eslint-disable-next-line import/prefer-default-export
export const parseRows = (data, agencyObligated) => {
    // add total obligation to each object and it's children objects
    const dataAndTotalObligation = data.map((d) => {
        let dataChildrenAndTotalObligation = [];
        if (d.children && d.children.length > 0) {
            dataChildrenAndTotalObligation = d.children.map((child) => ({
                ...child,
                total_obligated_amount: agencyObligated
            }));
        }

        if (dataChildrenAndTotalObligation.length > 0) {
            return {
                ...d,
                children: dataChildrenAndTotalObligation,
                total_obligated_amount: agencyObligated
            };
        }

        return {
            ...d,
            total_obligated_amount: agencyObligated
        };
    });

    // parse row and row's children
    const parsedData = dataAndTotalObligation.map((item) => {
        const accountSpendingRow = Object.create(BaseAccountSpendingRow);
        accountSpendingRow.populate(item);

        let rowChildren = [];
        if (item.children && item.children.length > 0) {
            rowChildren = item.children.map((childItem) => {
                const accountChildSpendingRow = Object.create(BaseAccountSpendingRow);
                accountChildSpendingRow.populate(childItem);
                return accountChildSpendingRow;
            });
        }

        if (rowChildren && rowChildren.length > 0) {
            Object.defineProperty(accountSpendingRow, "children", {
                value: rowChildren
            });
        }

        return accountSpendingRow;
    });
    return parsedData;
};
