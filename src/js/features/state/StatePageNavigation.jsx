/**
 * StatePageNavigation.jsx
 * Created on 12/12/2025 by Josue Aguilar
 */

import React, { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { useMatch, useNavigate } from "react-router";

import { setStateFiscalYear, setStateCenter } from "redux/actions/state/stateActions";
import { stateCenterFromFips } from 'helpers/mapHelper';

import useFetchOverview from "./containers/useFetchOverview";
import StatePage from "./StatePage";
import useStateNavigation from "./useStateNavigation";

const StatePageNavigation = () => {

    return (
        <StatePage />
    );
};

export default StatePageNavigation;
