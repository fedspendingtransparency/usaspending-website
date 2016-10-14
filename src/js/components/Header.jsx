import React from 'react'
import * as Icons from './icons/Icons.jsx';

export default class Header extends React.Component {

  render(){
    return (
  <div className="usa-da-top-banner">
      <div className="container">
          <div className="row">
              <div className="top-alert-icon">
                  <i className="usa-da-icon"><Icons.ExclamationTriangle /> </i>
              </div>
              <div className="top-alert-text">
                  <p>This site is not intended to be an official resource for federal spending data. To submit official federal spending data, please visit <a href="http://www.USAspending.gov" target="_blank">USAspending.gov</a>.</p>
              </div>
          </div>
      </div>
  </div>
);
  }

}
