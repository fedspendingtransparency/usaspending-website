import React from 'react'
import TopBar from './TopBar.jsx'
import Welcome from './Welcome.jsx'

export default class HomePage extends React.Component {

  render() {
      return (
      <div className="flex-wrapper">
          <TopBar/>
          <Welcome/>
      </div>
    );
  }

}
