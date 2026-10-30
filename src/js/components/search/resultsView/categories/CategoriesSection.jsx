/**
 * CategoriesSection.jsx
 * Created by Andrea Blackwell 04/14/2024
 **/

import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import PropTypes from "prop-types";

import Analytics from "../../../../helpers/analytics/Analytics";
import CategoriesVisualizationWrapperContainer
    from "../../../../containers/search/resultsView/CategoriesVisualizationWrapperContainer";
import PlaceholderComponent from "../PlaceholderComponent";
import CategoriesDsm from "./CategoriesDsm";
import useIntersectionObserver from "../../../../hooks/useIntersectionObserver";
import logVisualizationViewEvent from "../logVisualizationViewEvent";

const propTypes = {
    spendingLevel: PropTypes.string,
    hash: PropTypes.string
};
const CategoriesSection = ({
    spendingLevel,
    hash
}) => {
    const [searchParams] = useSearchParams();
    const section = searchParams.get('section');
    const type = searchParams.get('type');
    const defaultDropdown = (section && type) ? type : 'awarding_agency';
    const [selectedDropdown, setSelectedDropdown] = useState(defaultDropdown);
    const { ref, isIntersecting: categoriesHasLoaded } = useIntersectionObserver({
        threshold: 0.1,
        freezeOnceVisible: true
    });

    useEffect(() => {
        if (categoriesHasLoaded) {
            logVisualizationViewEvent("categories", hash);
        }
    }, [categoriesHasLoaded, hash]);

    const onClick = (e) => {
        setSelectedDropdown(e);
        Analytics.event({
            category: 'Section Categories',
            action: `View ${e}`,
            label: hash
        });
    };

    const wrapperProps = {
        sectionTitle: 'Results by Category',
        dropdownOptions: [
            {
                name: 'Awarding Agency',
                value: 'awarding_agency',
                onClick,
                dsmContent: <CategoriesDsm spendingLevel={spendingLevel} />
            },
            {
                name: 'Awarding Subagency',
                value: 'awarding_subagency',
                onClick,
                dsmContent: <CategoriesDsm spendingLevel={spendingLevel} />
            },
            {
                name: 'Recipient',
                value: 'recipient',
                onClick,
                dsmContent: <CategoriesDsm spendingLevel={spendingLevel} />
            },
            {
                name: 'North American Industry Classification System (NAICS)',
                value: 'naics',
                onClick,
                dsmContent: <CategoriesDsm spendingLevel={spendingLevel} />
            },
            {
                name: 'Product and Service Code (PSC)',
                value: 'psc',
                onClick,
                dsmContent: <CategoriesDsm spendingLevel={spendingLevel} />
            },
            {
                name: 'Assistance Listing',
                value: 'cfda',
                onClick,
                dsmContent: <CategoriesDsm spendingLevel={spendingLevel} />
            }
        ],
        selectedDropdownOption: selectedDropdown,
        sectionName: 'categories'

    };
    return (
        <div ref={ref} className="categories">
            {categoriesHasLoaded ?
                (
                    <CategoriesVisualizationWrapperContainer
                        wrapperProps={wrapperProps}
                        selectedDropdown={selectedDropdown}
                        hash={hash}
                        key={selectedDropdown} />
                ) :
                <PlaceholderComponent className="categories" />}
        </div>
    );
};

CategoriesSection.propTypes = propTypes;
export default CategoriesSection;
