import React, { useMemo } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { statePageMetaTags } from "helpers/metaTagHelper";
import { showModal } from "redux/actions/modal/modalActions";
import PageWrapper from "components/sharedComponents/PageWrapper";
import statePageToolbarComponents from "./statePageToolbarComponents";
import useJumpToSection from "../../../hooks/useJumpToSection";

const stateSections = [
    {
        section: 'overview',
        label: 'Overview'
    },
    {
        section: 'transactions-over-time',
        label: 'Transactions Over Time'
    },
    {
        section: 'top-five',
        label: 'Top 5'
    }
];

const propTypes = {
    stateProfile: PropTypes.object,
    handleFyChange: PropTypes.func,
    loading: PropTypes.bool,
    children: PropTypes.element
};

const StatePageWrapper = ({
    stateProfile, children, handleFyChange, loading
}) => {
    const dispatch = useDispatch();

    const { name, id } = stateProfile.overview;
    const metaTagProps = useMemo(
        () => (name && id ? statePageMetaTags({ name, id }) : {})
        , [name, id]
    );

    const handleShareDispatch = (url) => {
        dispatch(showModal(url));
    };

    const jumpToSection = useJumpToSection("#state-", stateSections, loading);

    return (
        <PageWrapper
            pageName="state"
            classNames="usa-da-state-page"
            overLine="state profile"
            title={name}
            metaTagProps={metaTagProps}
            toolBarComponents={statePageToolbarComponents(
                stateProfile, handleFyChange, handleShareDispatch
            )}
            sections={stateSections}
            jumpToSection={jumpToSection}
            loading={loading}
            inPageNav>
            {children}
        </PageWrapper>
    );
};

StatePageWrapper.propTypes = propTypes;
export default StatePageWrapper;
