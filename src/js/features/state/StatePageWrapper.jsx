import React, { useContext, useEffect, useMemo, useState } from "react";
import { find } from "lodash-es";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { statePageMetaTags } from "helpers/metaTagHelper";
import { combineQueryParams, getQueryParamString } from "helpers/queryParams";
import { getStickyBreakPointForSidebar } from "helpers/stickyHeaderHelper";
import { stickyHeaderHeight } from "dataMapping/stickyHeader/stickyHeader";
import useQueryParams from "hooks/useQueryParams";
import { showModal } from "redux/actions/modal/modalActions";
import IsMobileContext from "context/IsMobileContext";
import PageWrapper from "components/sharedComponents/PageWrapper";
import statePageToolbarComponents from "./statePageToolbarComponents";

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
    const query = useQueryParams();
    const history = useNavigate();
    const { isMedium } = useContext(IsMobileContext);
    const [activeSection, setActiveSection] = useState(query.section || 'overview');
    const dispatch = useDispatch();

    const { name, id } = stateProfile.overview;
    const metaTagProps = useMemo(
        () => (name && id ? statePageMetaTags({ name, id }) : {})
        , [name, id]
    );

    const handleShareDispatch = (url) => {
        dispatch(showModal(url));
    };

    const jumpToSection = (section = '') => {
        // we've been provided a section to jump to
        // check if it's a valid section
        const sectionObj = find(stateSections, ['section', section]);
        if (!sectionObj) return;

        // find the section in dom
        const sectionDom = document.querySelector(`#state-${sectionObj.section}`);
        if (!sectionDom) return;

        // add section to url
        const newQueryParams = combineQueryParams(query, { section: `${section}` });
        history({
            path: `${getQueryParamString(newQueryParams)}`
        }, { replace: true });

        // add offsets
        let conditionalOffset;
        if (isMedium) {
            conditionalOffset = window.scrollY < getStickyBreakPointForSidebar() ?
                stickyHeaderHeight + 140 : 60;
        }
        else {
            conditionalOffset = window.scrollY < getStickyBreakPointForSidebar() ?
                stickyHeaderHeight + 40 : 10;
        }
        const sectionTop = (sectionDom.offsetTop - stickyHeaderHeight - conditionalOffset);

        window.scrollTo({
            top: sectionTop - 25,
            left: 0,
            behavior: 'smooth'
        });
        setActiveSection(section);
    };

    useEffect(() => {
        if (!loading && query.section) {
            jumpToSection(query.section);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query.section, loading, isMedium]);

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
            activeSection={activeSection}
            jumpToSection={jumpToSection}
            inPageNav>
            {children}
        </PageWrapper>
    );
};

StatePageWrapper.propTypes = propTypes;
export default StatePageWrapper;
