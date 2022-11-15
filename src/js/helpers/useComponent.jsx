import { useState } from 'react';

let componentPromise = null;
let componentModule = null;

// The method runs component importing.
//
const importComponent = (path) => {
    if (componentModule) {
        return Promise.resolve(componentModule);
    }
    if (componentPromise) {
        return componentPromise;
    }
    componentPromise = import('content/about-the-data/descriptions/file-a.md') // change it to something
        .then((module) => {
            componentModule = module;
            return module;
        });
    return componentPromise;
};

// Uncomment the below line to start module loading as soon as it possible.
//
// prepareComponent();

const useComponent = (path) => {
    const [component, setComponent] = useState(componentModule);
    if (component === undefined) {
        importComponent(path)
            .then(setComponent) // we just wait until component is ready
            .catch(console.error); // we want to see loading exceptions in console
    }
    return component;
};

export default useComponent;
