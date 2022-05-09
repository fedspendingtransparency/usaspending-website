import React, { useState } from 'react';
import PropTypes from "prop-types";
import { useDispatch, useSelector } from 'react-redux';

import { useDefCodes } from 'containers/covid19/WithDefCodes';
import CheckboxTree from 'components/sharedComponents/CheckboxTree';
import { setDefCodes } from 'redux/actions/bulkDownload/bulkDownloadActions';

import DEFCheckboxTreeLabel from 'components/search/filters/defc/DEFCheckboxTreeLabel';

export const NewBadge = () => (
    <div className="new-badge">NEW</div>
);

const covidParentNode = {
    label: "COVID-19 Spending",
    value: "COVID",
    className: "def-checkbox-label--covid",
    expandDisabled: true,
    isSearchable: false,
    showNodeIcon: false,
    children: []
};

const infrastructureParentNode = {
    label: "Infrastructure Spending",
    value: "INFRA",
    className: "def-checkbox-label--covid",
    expandDisabled: true,
    isSearchable: false,
    showNodeIcon: false,
    children: []
};

const parseCovidCodes = (codes) => codes
    .filter((code) => code.disaster === 'covid_19')
    .reduce((acc, covidCode) => ({
        ...acc,
        children: acc.children.concat([{
            label: covidCode.title,
            subLabel: covidCode.public_law,
            value: covidCode.code,
            expandDisabled: true
        }])
            .sort((a, b) => {
                if (a.value < b.value) return -1;
                if (a.value > b.value) return 1;
                return 0;
            })
    }), covidParentNode);

const extractInfraCodes = (codes) => codes
    .filter((code) => code.code === '1' || code.code === 'Z')
    .reduce((acc, infraCode) => ({
        ...acc,
        children: acc.children.concat([{
            label: infraCode.title,
            subLabel: infraCode.public_law,
            value: infraCode.code,
            expandDisabled: true
        }])
            .sort((a, b) => {
                if (a.value < b.value) return 1;
                if (a.value > b.value) return -1;
                return 0;
            })
    }), infrastructureParentNode);

const DEFCheckboxTreeDownload = ({
    type,
    isDisabled = false
}) => {
    const [errorMsg, isLoading, validDefCodes] = useDefCodes();
    const [expanded, setExpanded] = useState([]);
    const { defCodes } = useSelector((state) => state.bulkDownload[type]);
    const dispatch = useDispatch();

    const onCollapse = (newExpandedArray) => {
        setExpanded([newExpandedArray]);
    };

    const onExpand = (newExpandedArray) => {
        setExpanded([newExpandedArray]);
    };

    const stageFilter = (newChecked) => {
        const newCount = newChecked.reduce((acc) => acc + 1, 0);
        if (newCount > 0) {
            dispatch(setDefCodes(type, newChecked));
        }
        else {
            dispatch(setDefCodes(type, []));
        }
    };

    return (
        <div className="def-code-filter-download">
            <CheckboxTree
                className="def-checkbox-tree"
                checked={defCodes}
                expanded={expanded}
                isDisabled={isDisabled}
                data={[parseCovidCodes(validDefCodes)]}
                isError={(errorMsg !== '')}
                errorMessage={errorMsg}
                isLoading={isLoading}
                searchText=""
                noResults={false}
                labelComponent={<DEFCheckboxTreeLabel />}
                onUncheck={stageFilter}
                onCheck={stageFilter}
                onCollapse={onCollapse}
                onExpand={onExpand} />
            <CheckboxTree
                className="def-checkbox-tree"
                checked={defCodes}
                expanded={expanded}
                isDisabled={isDisabled}
                data={[extractInfraCodes(validDefCodes)]}
                isError={(errorMsg !== '')}
                errorMessage={errorMsg}
                isLoading={isLoading}
                searchText=""
                noResults={false}
                labelComponent={<DEFCheckboxTreeLabel />}
                onUncheck={stageFilter}
                onCheck={stageFilter}
                onCollapse={onCollapse}
                onExpand={onExpand} />
        </div>
    );
};

DEFCheckboxTreeDownload.propTypes = {
    isDisabled: PropTypes.bool,
    type: PropTypes.string.isRequired // either "accounts" or "awards"
};

export default DEFCheckboxTreeDownload;
