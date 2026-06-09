import React from "react";
import { useLocation } from 'react-router';

import GlossaryListenerContainer from 'containers/glossary/GlossaryListener';
import AboutTheDataListenerContainer from 'containers/aboutTheDataSidebar/AboutTheDataListener';

const WithUrlListener = (component) => {
    const { search } = useLocation();
    const ListenerContainer = search.includes('about-the-data') ?
        AboutTheDataListenerContainer :
        GlossaryListenerContainer;

    return (
        <ListenerContainer search={search} Child={component} />
    );
};

export default WithUrlListener;
