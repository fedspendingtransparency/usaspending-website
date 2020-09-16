import React, { useEffect, useState, useRef } from 'react';
import { isCancel } from 'axios';
import PropTypes from "prop-types";
import { useDispatch, useSelector } from 'react-redux';

import { fetchDEFCodes } from 'helpers/disasterHelper';
import CheckboxTree from 'components/sharedComponents/CheckboxTree';
import { setDefCodes } from 'redux/actions/bulkDownload/bulkDownloadActions';
import { setDEFCodes } from 'redux/actions/covid19/covid19Actions';

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

const parseCovidCodes = (codes) => codes.filter((code) => code.disaster === 'covid_19')
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

const DEFCheckboxTreeDownload = ({ type }) => {
    const [nodes, setNodes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [expanded, setExpanded] = useState([]);
    const validDefCodes = useSelector((state) => state.covid19.defCodes);

    const request = useRef(null);
    const dispatch = useDispatch();

    const { defCodes } = useSelector((state) => state.bulkDownload[type]);


    const fetchCodes = async () => {
        if (request.current) {
            request.current.cancel();
        }
        setLoading(true);
        let covidCodes;

        if (validDefCodes && validDefCodes.length > 0) {
            covidCodes = parseCovidCodes(validDefCodes);
        } else {
            request.current = fetchDEFCodes();
            const res = await request.current.promise;
            covidCodes = res.data.codes;
            dispatch(setDEFCodes(covidCodes.filter((c) => c.disaster === 'covid_19')));
        }

        try {
            setNodes([covidCodes]);
            setLoading(false);
        }
        catch (e) {
            console.log('Error fetching Def Codes ', e);
            if (!isCancel(e)) {
                setLoading(false);
                setError(true);
                setErrorMessage(e?.messsage || 'There was an error, please refresh the browser.');
                request.current = null;
            }
        }
    };

    useEffect(() => {
        fetchCodes();
        return () => {
            if (request.current) {
                request.current.cancel();
            }
        };
    }, [validDefCodes]);

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
                data={nodes}
                isError={error}
                errorMessage={errorMessage}
                isLoading={loading}
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
    type: PropTypes.string.isRequired // either "accounts" or "awards"
};

export default DEFCheckboxTreeDownload;
