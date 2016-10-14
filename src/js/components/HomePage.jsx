/**
 * HomePage.jsx
 * Created by Emily Gullo 9/26/2016
 **/

import React from 'react'
import Header from './Header.jsx'
import Welcome from './Welcome.jsx'

export default class HomePage extends React.Component {

  render() {
      return (
      <div className="flex-wrapper home-page">
          <Header/>
          <Welcome/>
      </div>
    );
  }

}
