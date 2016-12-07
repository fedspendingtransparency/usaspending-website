import React from 'react';
import { render } from 'react-dom';
import AppContainer from './containers/AppContainer';

const appDiv = document.getElementById('app');
render(
    <AppContainer />,
    appDiv
);

