/**
 * Agency.jsx
 * Created by Emily Gullo 12/22/2016
 **/

import React from 'react';
import { useDispatch, useSelector } from "react-redux";

import AgencyListContainer from "containers/search/filters/AgencyListContainer";
import { fetchAwardingAgencies, fetchFundingAgencies } from "helpers/searchHelper";
import {
    updateSelectedAwardingAgencies,
    updateSelectedFundingAgencies
} from "redux/actions/search/searchFilterActions";
import SelectedAgencies from "./SelectedAgencies";


const Agency = () => {
    const {
        selectedAwardingAgencies, selectedFundingAgencies
    } = useSelector((state) => state.filters);
    const dispatch = useDispatch();

    const toggleFundingAgency = (agency, isValid) => {
        if (Object.keys(agency).length !== 0 && isValid) {
            const updateParams = {};
            updateParams.agency = agency;

            dispatch(updateSelectedFundingAgencies(updateParams));
        }
    };

    const toggleAwardingAgency = (agency, isValid) => {
        if (Object.keys(agency).length !== 0 && isValid) {
            const updateParams = {};
            updateParams.agency = agency;

            dispatch(updateSelectedAwardingAgencies(updateParams));
        }
    };

    return (
        <div className="agency-filter">
            <div className="filter-item-wrap">
                <AgencyListContainer
                    agencyType="Awarding"
                    fetchAgencies={fetchAwardingAgencies}
                    toggleAgency={toggleAwardingAgency}
                    selectedAgencies={selectedAwardingAgencies} />
                <SelectedAgencies
                    agencyType="Awarding"
                    selectedAgencies={selectedAwardingAgencies}
                    toggleAgency={toggleAwardingAgency} />
            </div>
            <div className="filter-item-wrap">
                <AgencyListContainer
                    agencyType="Funding"
                    fetchAgencies={fetchFundingAgencies}
                    toggleAgency={toggleFundingAgency}
                    selectedAgencies={selectedFundingAgencies} />
                <SelectedAgencies
                    agencyType="Funding"
                    selectedAgencies={selectedFundingAgencies}
                    toggleAgency={toggleFundingAgency} />
            </div>
        </div>
    );
};

export default Agency;
