import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { kGlobalConstants } from '../GlobalConstants.js';

import reducers from '../reducers/index.jsx'
import HomePage from '../components/HomePage.jsx'

let devExtension = undefined;
if (kGlobalConstants.DEV) {
	// only enable Redux debugging in dev mode
	devExtension = window.devToolsExtension ? window.devToolsExtension() : undefined;
}


let store = createStore(reducers, {}, devExtension);
export default class AppContainer extends React.Component {
	constructor(props) {
		super(props);
    }

    render() {

			let appContents = <HomePage />

  		return (
  			<Provider store={store}>
  				{appContents}
  			</Provider>
  		);
  	}
}
