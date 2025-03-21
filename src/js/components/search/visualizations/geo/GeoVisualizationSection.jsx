/**
 * GeoVisualizationSection.jsx
 * Created by Kevin Li 2/13/17
 */

import React, { useEffect, useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import MapboxGL from 'mapbox-gl/dist/mapbox-gl';

import ResultsTableErrorMessage from 'components/search/table/ResultsTableErrorMessage';
import LoadingSpinner from 'components/sharedComponents/LoadingSpinner';
import { ExclamationTriangle } from 'components/sharedComponents/icons/Icons';
import Note from 'components/sharedComponents/Note';
import { noteMessage } from 'dataMapping/search/geoVisualizationSection';
import { getAtdDefcText } from "helpers/aboutTheDataSidebarHelper";
import {
    advancedSearchFilters,
    filtersOnClickHandler
} from 'dataMapping/covid19/recipient/map/map';
import { awardTypeTabs } from 'dataMapping/covid19/covid19';
import GeoVisualizationScopeButton from './GeoVisualizationScopeButton';
import MapWrapper from './MapWrapper';
import GeoVisualizationTooltip from './GeoVisualizationTooltip';
import MapMessage from './MapMessage';
import GlossaryLink from '../../../sharedComponents/GlossaryLink';
import ReadMore from '../../../sharedComponents/ReadMore';
import { usePrevious } from "../../../../helpers";

const propTypes = {
    scope: PropTypes.string,
    mapLayer: PropTypes.string,
    changeScope: PropTypes.func,
    changeMapLayer: PropTypes.func,
    mapMoved: PropTypes.func,
    renderHash: PropTypes.string,
    data: PropTypes.object,
    total: PropTypes.number,
    loading: PropTypes.bool,
    error: PropTypes.bool,
    noResults: PropTypes.bool,
    mapLegendToggle: PropTypes.string,
    updateMapLegendToggle: PropTypes.func,
    subaward: PropTypes.bool,
    className: PropTypes.string,
    center: PropTypes.array,
    singleLocationSelected: PropTypes.object,
    newAdvancedSearch: PropTypes.bool
};

const availableLayers = ['country', 'state', 'county', 'congressionalDistrict'];

const GeoVisualizationSection = (props) => {
    const [showHover, setShowHover] = useState(false);
    const [selectedItem, setSelectedItem] = useState({});
    const [tableBody, setTableBody] = useState("");
    const [tableTitle, setTableTitle] = useState("");
    const [tablePreview, setTablePreview] = useState("");
    const [expanded, setExpanded] = useState(null);
    const [activeFilters, setActiveFilters] = useState({
        territory: props.mapLayer,
        spendingType: 'obligation',
        amountType: 'totalSpending',
        recipientType: 'all',
        awardType: 'all'
    });
    const sectionHr = useRef(null);
    const prevProps = usePrevious(props);
    const dataRef = useRef(props.data);

    const updateAmountTypeFilter = (value) => {
        setActiveFilters({ ...activeFilters, amountType: value });
        props.updateMapLegendToggle(value);
    };

    const updateTerritoryFilter = (value) => {
        props.changeMapLayer(value);
        setActiveFilters({ ...activeFilters, territory: value });
    };
    const addOnClickToFilters = () => Object.keys(advancedSearchFilters).reduce((acc, filter) => {
        const filterWithOnClick = {
            ...advancedSearchFilters[filter],
            onClick: filtersOnClickHandler[filter] === 'updateAmountTypeFilter' ? updateAmountTypeFilter : updateTerritoryFilter
        };
        acc[filter] = filterWithOnClick;
        return acc;
    }, {});
    const showTooltip = (geoId, position) => {
        // convert state code to full string name
        // TODO: This ref is necessary, need to figure out why the map components are losing reference to data
        const label = dataRef.current.labels[geoId];
        setShowHover(true);
        setSelectedItem({
            label: label.label,
            total: props.total,
            value: label.value,
            x: position.x,
            y: position.y
        });
    };

    const hideTooltip = () => {
        setShowHover(false);
        setSelectedItem({});
    };

    const handleUpdateTitle = () => {
        const primeAwardTitle = "Spending by Geography";
        const subAwardTitle = "Sub-Award Spending by Geography";
        const dropdownValue = document.querySelector(".filter__dropdown-button-text");
        if (dropdownValue === "Subawards") {
            setTableTitle(subAwardTitle);
        }
        else {
            setTableTitle(primeAwardTitle);
        }
    };

    const handleUpdateBody = useCallback(() => {
        const dropdownValue = document.querySelector(".filter__dropdown-button-text");

        const primeAwardPreview = "Use the map below to break down spending by state, county, or congressional district.";
        const primeAwardBody = <>
            {getAtdDefcText(props.isDefCodeInFilter?.length > 0)}
            <p className="award-search__body-text">
                The data in the map represent <span className="award-search__glossary-term">federal action</span>{' '}<GlossaryLink term="federal-action-obligation" /> {<span className="award-search__glossary-term"> obligation</span>}{' '}{<GlossaryLink term="obligation" />} amounts for non-loan prime award {<span className="award-search__glossary-term"> transactions</span>}{' '}{<GlossaryLink term="transaction" />} within the selected filters. Loan awards use the {<span className="award-search__glossary-term">subsidy cost</span>}{' '}{<GlossaryLink term="loan-subsidy-cost" />} rather than the obligated amount to sum up the value of the loan. Prime award transactions with the same unique award ID are grouped under a single prime award summary. Prime award summaries can be viewed in the Table tab.
            </p>
        </>;

        const subAwardPreview = "Use the map below to break down spending by state, county, or congressional district.";
        const subAwardBody = (
            <>
                {getAtdDefcText(props.isDefCodeInFilter?.length > 0)}
                <p className="award-search__body-text">
                    The data below represent{<span className="award-search__glossary-term"> sub-awards</span>}{' '}{<GlossaryLink term="sub-award" />}{' '}that meet the selected filter criteria. The results do not reflect sub-awards whose
                    {<span className="award-search__glossary-term"> prime awards</span>}{' '}{<GlossaryLink term="prime-award" />}
                    {' '}meet the selected filter criteria. For example, if you filter by Place of Performance in your county, you will see only sub-awards with Place of Performance in your county, but you will not see all sub-awards whose prime award lists Place of Performance in your county.
                </p>
                <p className="award-search__body-text">
                    Sub-award amounts are funded by prime award obligations and outlays. In theory, the total value of all sub-award amounts for any given prime award is a subset of the Current Award Amount for that prime award; sub-award amounts generally should not exceed the Current Award Amount for their associated prime award. To avoid double-counting the overall value of a prime award, do not sum up sub-award amounts and prime award obligations or outlays.
                </p>
            </>);
        if (dropdownValue === "Subawards") {
            setTableBody(subAwardBody);
            setTablePreview(subAwardPreview);
        }
        else {
            setTableBody(primeAwardBody);
            setTablePreview(primeAwardPreview);
        }
    });

    useEffect(() => {
        handleUpdateTitle();
        handleUpdateBody();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        dataRef.current = props.data;
    }, [props.data]);

    useEffect(() => {
        if (!expanded || expanded === null) {
            const elem = document.querySelector(".read-more__preview-lines");
            elem?.classList.add("line-clamp");
        }

        if (props.subaward !== prevProps?.subaward) {
            handleUpdateTitle();
            handleUpdateBody();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [expanded, prevProps?.subaward, props.subaward]);

    useEffect(() => {
        updateTerritoryFilter(props.mapLayer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.mapLayer]);

    const applyLineClamp = (elem) => {
        elem.classList.add("line-clamp");
    };

    const removeLineClamp = (elem) => {
        elem.classList.remove("line-clamp");
    };

    const additionalFunctionality = () => {
        const elem = document.querySelector(".read-more__preview-lines");
        setExpanded(!expanded);
        // doesn't seem correct
        if (!expanded) {
            removeLineClamp(elem);
        }
        else {
            applyLineClamp(elem);
        }
    };

    const getMessage = () => {
        if (!MapboxGL.supported()) {
            return (
                <div className="results-table-message-container">
                    <ResultsTableErrorMessage title="WebGL Required for this map." description="Please enable WebGL in your browser settings to view this map visualization." />
                </div>
            );
        }

        let message = null;

        if (props.loading) {
            message = (
                <MapMessage>
                    <div className="map-loading">
                        <LoadingSpinner />
                        <div className="loading-message">
                            Gathering your data...
                        </div>
                    </div>
                </MapMessage>
            );
        }
        else if (props.error) {
            message = (
                <MapMessage>
                    <div className="map-no-results">
                        <div className="error-icon">
                            <ExclamationTriangle alt="An error occurred" />
                        </div>
                        <div className="title">
                            An error occurred.
                        </div>
                        <div className="description">
                            Something went wrong while gathering your data.
                        </div>
                    </div>
                </MapMessage>
            );
        }
        else if (props.noResults) {
            message = (
                <MapMessage>
                    <div className="map-no-results">
                        <div className="no-results-icon" />
                        <div className="title">
                            No results found in the current map area.
                        </div>
                    </div>
                </MapMessage>
            );
        }

        return message;
    };

    const MapHeader = () => {
        if (!props.newAdvancedSearch) {
            return (
                <>
                    <h2 className="visualization-title">
                        {tableTitle}
                    </h2>
                    <hr
                        className="results-divider"
                        ref={sectionHr} />

                    <div className="visualization-top">
                        <div className="visualization-description">
                            <p className="award-search__what-title">What's included in this view of the data?</p>
                            <div className="content">
                                <ReadMore
                                    openPrompt="read more"
                                    closePrompt="read less"
                                    openIcon=""
                                    closeIcon=""
                                    showPreview
                                    previewLines={tablePreview}
                                    additionalFunctionality={additionalFunctionality}>
                                    {tableBody}
                                </ReadMore>
                            </div>
                        </div>

                        <div className="visualization-period">
                            <div className="content">
                                <ul>
                                    <li>
                                        <GeoVisualizationScopeButton
                                            value="place_of_performance"
                                            label="Place of Performance"
                                            active={props.scope === 'place_of_performance'}
                                            changeScope={props.changeScope} />
                                    </li>
                                    <li>
                                        <GeoVisualizationScopeButton
                                            value="recipient_location"
                                            label="Recipient Location"
                                            active={props.scope === 'recipient_location'}
                                            changeScope={props.changeScope} />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </>
            );
        }

        return (<></>);
    };

    return (
        <section
            className="results-visualization-geo-section"
            id="results-section-geo"
            aria-label="Spending by Geography">
            <MapHeader />
            <MapWrapper
                filters={addOnClickToFilters()}
                activeFilters={activeFilters}
                setActiveFilters={setActiveFilters}
                awardTypeFilters={awardTypeTabs}
                data={props.data}
                renderHash={props.renderHash}
                scope={props.mapLayer}
                changeMapLayer={props.changeMapLayer}
                showHover={showHover}
                selectedItem={selectedItem}
                showTooltip={showTooltip}
                hideTooltip={hideTooltip}
                tooltip={GeoVisualizationTooltip}
                availableLayers={availableLayers}
                showLayerToggle
                center={props.center}
                className={props.className}
                mapLegendToggle={props.mapLegendToggle}
                updateMapLegendToggle={props.updateMapLegendToggle}
                singleLocationSelected={props.singleLocationSelected} >
                {getMessage()}
            </MapWrapper>
            {props.newAdvancedSearch ? <></> : <Note message={noteMessage} /> }
        </section>
    );
};

GeoVisualizationSection.propTypes = propTypes;
export default GeoVisualizationSection;

