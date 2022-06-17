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
    contentObject: PropTypes.object
};

const MainCards = (contentObject) => {
    const bowieImg = <img src="../../../../img/top-bowie-state-combined-image.svg" alt="" />;
    const kansasImg = <img src="../../../../img/top-university-kansas-combined-image.svg" alt="" />;
    const morehouseImg = <img src="../../../../img/top-morehouse-combined-image.svg" alt="" />;
    const momImg = <img src="../../../../img/top-mom-project-combined-image.svg" alt="" />;

    return (
        <section className="main-cards__wrapper">
            <FlexGridRow>
                <FlexGridCol width={12} desktop={6}>
                    <TOPCard image={bowieImg} imageColor="#ffbe60" heading="Bowie State University" text={contentObject.bowieText} />
                </FlexGridCol>
                <FlexGridCol width={12} desktop={6}>
                    <TOPCard image={morehouseImg} imageColor="#339189" heading="Morehouse College" text={contentObject.morehouseText} />
                </FlexGridCol>
            </FlexGridRow>
            <FlexGridRow>
                <FlexGridCol width={12} desktop={6}>
                    <TOPCard image={kansasImg} imageColor="#fa9441" heading="University of Kansas Center for Public Partnerships and Research" text={contentObject.kansasText} />
                </FlexGridCol>
                <FlexGridCol width={12} desktop={6}>
                    <TOPCard image={momImg} imageColor="#29abe2" heading="The Mom Project" text={contentObject.momText} />
                </FlexGridCol>
            </FlexGridRow>
        </section>
    );
};

MainCards.propTypes = propTypes;

export default MainCards;

