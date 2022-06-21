/**
 * MainCards.jsx
 * Created by Nick Torres 06/17/22
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FlexGridRow, FlexGridCol } from 'data-transparency-ui';
// import ReadMoreUpdated from '../../sharedComponents/ReadMoreUpdated';
import TOPCard from '../../sharedComponents/TOPCard';

const propTypes = {
    contentObject: PropTypes.object.isRequired
};

const MainCards = ({ contentObject }) => {
    const bowieImg = <img src="../../../../img/top-bowie-state-combined-image.svg" alt="" />;
    const kansasImg = <img src="../../../../img/top-university-kansas-combined-image.svg" alt="" />;
    const morehouseImg = <img src="../../../../img/top-morehouse-combined-image.svg" alt="" />;
    const momImg = <img src="../../../../img/top-mom-project-combined-image.svg" alt="" />;


    const bowieHdg = <h2>Bowie State University</h2>;
    const kansasHdg = <h2>Morehouse College</h2>;
    const morehouseHdg = <h2>University of Kansas Center for Public Partnerships and Research</h2>;
    const momHdg = <h2>The Mom Project</h2>;
    const {
        bowieText, kansasText, momText, morehouseText
    } = contentObject;

    return (
        <section className="main-cards__wrapper">
            <FlexGridRow>
                <FlexGridCol width={6} desktop={6} tablet={12} mobile={12}>
                    <TOPCard image={bowieImg} imageColor="#ffbe60" heading={bowieHdg} text={bowieText} />
                </FlexGridCol>
                <FlexGridCol width={6} desktop={6} tablet={12} mobile={12}>
                    <TOPCard image={morehouseImg} imageColor="#339189" heading={morehouseHdg} text={morehouseText} />
                </FlexGridCol>
            </FlexGridRow>
            <FlexGridRow>
                <FlexGridCol width={6} desktop={6} tablet={12} mobile={12}>
                    <TOPCard image={kansasImg} imageColor="#fa9441" heading={kansasHdg} text={kansasText} />
                </FlexGridCol>
                <FlexGridCol width={6} desktop={6} tablet={12} mobile={12}>
                    <TOPCard image={momImg} imageColor="#29abe2" heading={momHdg} text={momText} />
                </FlexGridCol>
            </FlexGridRow>
        </section>
    );
};

MainCards.propTypes = propTypes;

export default MainCards;

