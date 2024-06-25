/**
 * PlaceholderComponent.jsx
 * Created by Brian Petway 06/10/2024
 **/

/**
    This component is needed in order to make the progressive loading on the
    new search page function correctly. The text is the same color as the background
    so it is not visible. The css rules for this component are in resultsView.scss,
    and the 800px height is arbitrary.
**/

import React from "react";

const PlaceholderComponent = () => (
    <div className="search__placeholder">
            PLACEHOLDER
    </div>
);

export default PlaceholderComponent;
