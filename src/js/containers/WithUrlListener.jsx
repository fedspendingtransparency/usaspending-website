import React from "react";
import { useLocation } from 'react-router';

import GlossaryListenerContainer from 'containers/glossary/GlossaryListener';
import AboutTheDataListenerContainer from 'containers/aboutTheDataSidebar/AboutTheDataListener';
import useIsMobile from "hooks/useIsMobile";
import IsMobileContext from "context/IsMobileContext";

const WithUrlListener = (component, props) => {
    const { search } = useLocation();
    const ListenerContainer = search.includes('about-the-data') ?
        AboutTheDataListenerContainer :
        GlossaryListenerContainer;
    const isMobileObject = useIsMobile();

    return (
        <IsMobileContext value={isMobileObject}>
            <ListenerContainer {...props} Child={component} />
        </IsMobileContext>
    );
};

export default WithUrlListener;
