import React from "react";
import GlossaryListenerContainer from 'containers/glossary/GlossaryListener';
import AboutTheDataListenerContainer from 'containers/aboutTheDataSidebar/AboutTheDataListener';
import { useLocation } from 'react-router-dom';

const WithUrlListener = (component, props) => {
    const { search } = useLocation();
    const ListenerContainer = search.includes('about-the-data') ? AboutTheDataListenerContainer : GlossaryListenerContainer;

    return (
        <ListenerContainer {...props} Child={component} />
    );
};

export default WithUrlListener;
