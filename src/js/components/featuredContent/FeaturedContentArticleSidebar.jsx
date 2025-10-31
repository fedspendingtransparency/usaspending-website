import React from 'react';
import { FlexGridCol } from "data-transparency-ui";
import PropTypes from "prop-types";
import { handleShareOptionClick, getBaseUrl } from 'helpers/socialShare';
import { useDispatch } from 'react-redux';
import ExploreMore from "./ExploreMore";
import RelatedTerms from "./RelatedTerms";
import InlineShare from "./InlineShare";
import { showModal } from '../../redux/actions/modal/modalActions';
import { transformString } from '../../helpers/featuredContent/featuredContentHelper';

const propTypes = { chosenArticle: PropTypes.object.isRequired };

const FeaturedContentArticleSidebar = ({ chosenArticle }) => {
    const slug = `/featured-content/${transformString(chosenArticle?.content_type)}/${transformString(chosenArticle?.title)}`;
    const dispatch = useDispatch();
    const handleShareDispatch = (url) => {
        dispatch(showModal(url));
    };
    const onShareClick = (optionName, url) => {
        const emailSubject = `${chosenArticle.banner_title}`;
        const emailArgs = {
            subject: encodeURIComponent(`${emailSubject}`),
            body: `Check out this article from USAspending.gov: ${getBaseUrl(slug)}`
        };
        handleShareOptionClick(optionName, url, emailArgs, handleShareDispatch);
    };


    return (
        <FlexGridCol
            tablet={12}
            mobile={12}
            desktop={4}
            className="featured-content__column-two">
            <InlineShare
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
