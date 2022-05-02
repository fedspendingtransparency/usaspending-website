import BaseAgencySubcomponentsList from 'models/v2/agency/BaseAgencySubcomponentsList';

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
    const parsedData = dataAndTotalObligation.map((item) => {
        const agencySubcomponents = Object.create(BaseAgencySubcomponentsList);
        agencySubcomponents.populate(item);

        return agencySubcomponents;
    });
    return parsedData;
};
