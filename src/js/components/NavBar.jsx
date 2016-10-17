import React from 'react'
import * as Icons from './icons/Icons.jsx';

export default class NavBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
			<div className="usa-header">
                <h2>USAspending.gov</h2>
				<ul className="usa-nav-primary">
					<li><a href="#">The Data</a></li>
					<li><a href="#">How the US Spends Money</a></li>
					<li><a href="#">Get the Data</a></li>
					<li><a href="#">Help</a></li>
				</ul>
			</div>
        );
    }

}
