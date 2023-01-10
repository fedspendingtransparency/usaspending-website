/**
 * PlayButton.jsx
 * Created by Brian Petway 12/22/22
 */

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PlayButton = () => (
    <div className="overlay-play-button">
        <div className="play-button-bg">
            <FontAwesomeIcon icon="play" className="play-button__icon" />
        </div>
    </div>
);

export default PlayButton;
