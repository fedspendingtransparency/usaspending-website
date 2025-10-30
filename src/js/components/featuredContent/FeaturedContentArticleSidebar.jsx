import React, { useState, useEffect } from 'react';
import { FlexGridCol } from "data-transparency-ui";
import PropTypes from "prop-types";
import { handleShareOptionClick, getBaseUrl } from 'helpers/socialShare';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import ExploreMore from "./ExploreMore";
import RelatedTerms from "./RelatedTerms";
import NewShare from "./NewShare";
import { showModal } from '../../redux/actions/modal/modalActions';
import { transformString } from '../../helpers/featuredContent/featuredContentHelper';

const propTypes = { chosenArticle: PropTypes.object.isRequired };

const FeaturedContentArticleSidebar = ({ chosenArticle }) => {
    const slug = `/featured-content/${transformString(chosenArticle?.content_type)}/${transformString(chosenArticle?.title)}`;
    console.debug("chosen article: ", slug);
    const [value, setValue] = useState();
    const dispatch = useDispatch();
    const handleShareDispatch = (url) => {
        dispatch(showModal(url));
    };
    const onShareClick = (optionName, url) => {
        console.debug("option name: ", optionName);
        // remove existing params
        const emailSubject = `Featured Content: ${chosenArticle.banner_title}`;
        const emailArgs = {
            subject: encodeURIComponent(`${emailSubject}`),
            body: `${`${chosenArticle.content_type}:${chosenArticle.banner_title}`}`
        };
        handleShareOptionClick(optionName, url, emailArgs, handleShareDispatch);
    };


    return (
        <FlexGridCol
            tablet={12}
            mobile={12}
            desktop={4}
            className="featured-content__column-two">
            <NewShare
                onShareOptionClick={(name) => onShareClick(name, slug)}
                url={getBaseUrl(slug)} />
            {chosenArticle?.related_terms.length > 0 &&
            <RelatedTerms
                header="Related Terms"
                citations={chosenArticle?.related_terms} />
            }
            {chosenArticle?.explore_more.length > 0 &&
            <ExploreMore
                header="Explore More"
                citations={chosenArticle?.explore_more} />
            }
        </FlexGridCol>
    );
};

FeaturedContentArticleSidebar.propTypes = propTypes;
export default FeaturedContentArticleSidebar;
