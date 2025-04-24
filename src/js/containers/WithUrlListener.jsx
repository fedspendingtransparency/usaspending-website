import React from "react";
import GlossaryListenerContainer from 'containers/glossary/GlossaryListener';
import AboutTheDataListenerContainer from 'containers/aboutTheDataSidebar/AboutTheDataListener';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useLocation } from 'react-router';

const WithUrlListener = (component, props) => {
    const { search } = useLocation();
    const ListenerContainer = search.includes('about-the-data') ? AboutTheDataListenerContainer : GlossaryListenerContainer;

    return (
        <ListenerContainer {...props} Child={component} />
    );
};

export default WithUrlListener;
