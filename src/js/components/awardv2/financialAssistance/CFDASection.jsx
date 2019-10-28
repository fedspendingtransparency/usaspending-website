import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import AwardSection from '../shared/AwardSection';
import AwardSectionHeader from '../shared/AwardSectionHeader';
import { CFDASectionInfo } from "../shared/InfoTooltipContent";
import ExpandableAwardSection from '../shared/ExpandableAwardSection';

const propTypes = {
    data: PropTypes.shape({
        cfda_number: PropTypes.string,
        cfda_title: PropTypes.string,
        applicant_eligibility: PropTypes.string,
        beneficiary_eligibility: PropTypes.string,
        federal_agency: PropTypes.string,
        objectives: PropTypes.string,
        obligations: PropTypes.string,
        popular_name: PropTypes.string,
        website: PropTypes.string,
        sam_website: PropTypes.string
    })
};

const CFDASection = ({ data }) => {
    const {
        cfda_number,
        cfda_title,
        applicant_eligibility,
        beneficiary_eligibility,
        cfda_federal_agency,
        cfda_objectives,
        cfda_website,
        sam_website
    } = data;
    const test = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat harum cum alias est sit ab molestias voluptate temporibus tenetur ipsam, provident ducimus a eum. Molestiae laborum minima, magni repudiandae, assumenda maxime error ad vero, ab suscipit asperiores eius. Deserunt quidem vitae nisi laudantium odio ipsam, neque, hic officia necessitatibus assumenda illo earum recusandae blanditiis? Odit, laborum ex? Ducimus possimus odit esse, qui nostrum laborum. Iste esse magnam vitae dolorum tempore ad ut explicabo hic, labore impedit enim! Maxime aspernatur doloremque est. Nesciunt exercitationem dignissimos iusto reprehenderit! Maiores, soluta. Quibusdam ea distinctio corrupti eligendi molestias, maiores alias ex, quidem eius praesentium similique blanditiis dolore eveniet laboriosam enim consequatur autem. Facilis sed consectetur quasi architecto labore quidem nihil sequi, quis sit sapiente dolore ratione animi autem at amet, corporis aperiam. Nam exercitationem, tempore quas inventore at ullam omnis similique blanditiis dolorum voluptas dolores vero amet rem ipsam repudiandae numquam tempora architecto natus laudantium fuga suscipit nisi ea. Soluta ipsa labore maxime? Nisi quo, atque cum sed qui eos adipisci est aut. Deserunt inventore mollitia, debitis veritatis suscipit esse atque quam maiores ad doloremque eligendi aut sed fugiat nulla. Ut commodi ullam amet natus perspiciatis! Incidunt natus laudantium ullam molestias numquam aut vero doloribus, impedit distinctio dolorem, voluptate ipsam mollitia at, ea commodi beatae architecto voluptatem! Vero iusto sequi saepe eaque fugiat inventore quae officiis illum laborum! Ut maxime commodi voluptate aperiam, soluta dolor repellat asperiores ab aliquam ea est perspiciatis atque deserunt dolores architecto libero doloremque numquam tenetur. Officiis, fugit facilis. Iusto enim et a tempora maxime commodi provident neque? Numquam possimus blanditiis nostrum mollitia adipisci excepturi soluta, eveniet nihil molestiae modi vero optio ea expedita consequuntur enim voluptas quod velit, officia eaque laborum autem! Aliquam minus unde officiis, corporis enim sit. Nulla harum voluptatem nihil? Qui dolores at suscipit harum ipsum a adipisci porro saepe reiciendis amet recusandae optio possimus quo, expedita corporis asperiores aut minus voluptate! Odit molestiae perferendis sequi dolor quo porro molestias, excepturi a iusto quasi distinctio ea quae praesentium eius minima et labore libero, aperiam vel, amet rerum veritatis ipsa blanditiis. Optio esse rem sequi error, eum quisquam consequuntur doloribus cum commodi possimus porro quidem, provident aperiam dignissimos voluptates. Facere, et voluptates. Assumenda beatae impedit ad iure, ab asperiores ea minima ex mollitia velit tenetur iusto dolore ipsa saepe aut dolorum temporibus, quos modi neque dolor recusandae? Nobis, quis. Quam harum, praesentium deleniti molestias natus quibusdam vel!";
    const expandableContent = (
        <React.Fragment>
            <h5>Applicant Eligibility</h5>
            <ExpandableAwardSection type="secondary" content={applicant_eligibility} />
            <h5>Beneficiary Eligibility</h5>
            <ExpandableAwardSection type="secondary" content={beneficiary_eligibility} />
        </React.Fragment>
    );
    return (
        <AwardSection type="column" className="cfda-section award-viz">
            <AwardSectionHeader
                title="CFDA Program / Assistance Listing Information"
                icon={<FontAwesomeIcon icon="hands-helping" />}
                tooltip={CFDASectionInfo} />
            <div className="award__col__content">
                <ExpandableAwardSection content={expandableContent}>
                    <h4>{`${data.cfda_number}: ${data.cfda_title.toUpperCase()}`}</h4>
                    <h5>Objectives</h5>
                    <ExpandableAwardSection type="secondary" content={test} />
                    <h5>Administrative Agency</h5>
                    <p>{cfda_federal_agency}</p>
                    <h5>Website</h5>
                    <a href={cfda_website}>{cfda_website}</a>
                    <h5>SAM.gov Page</h5>
                    <a href={sam_website}>{sam_website}</a>
                </ExpandableAwardSection>
            </div>
        </AwardSection>
    );
};

CFDASection.propTypes = propTypes;
export default CFDASection;
