/**
 * featuredContentHelper.js
 * Created by Nick Torres 9/23/2025
*/
import React from "react";
import GlossaryLink from "components/glossary/Glossary";


const primaryFill = {
    dataDefinition: '#783CB9',
    search: '#D54309',
    seeforyourself: '#E66F0E',
    questions: '#864381',
    finances: '#1B2B85',
    trust: '#73B3E7',
    stories: '#2378C3',
    difference: '#5ABF95'
};

const secondaryFill = {
    dataDefinition: '#D5BFFF',
    search: '#F6BD9C',
    seeforyourself: '#FFBC78',
    questions: '#E2BEE4',
    finances: '#628EF4',
    trust: '#D9E8F6',
    stories: '#73B3E7',
    difference: '#DBF6ED'
};

const contentTaxonomyNameToKey = {
    "Data Definitions": "dataDefinition",
    "My USAspending Search": "search",
    "See 4 Yourself": "seeforyourself",
    "Recently Answered Questions": "questions",
    "Exploring America's Finances": "finances",
    "Data You Can Trust": "trust",
    "Spending Stories": "stories",
    "What's the Difference?": "difference"
};

export const transformString = (input) => {
    if (input) {
        return input.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '').toLowerCase();
    }
    return null;
};

export const transformDate = (input) => {
    const options = {
        weekday: 'long', year: 'numeric', month: 'short', day: 'numeric'
    };
    const date = new Date(input);
    const formattedDate = date.toLocaleDateString('en-us', options).replace(/^\w+,\s*/g, '');
    return formattedDate;
};

const CustomA = (props) =>
    // eslint-disable-next-line jsx-a11y/anchor-has-content,react/jsx-filename-extension
    (<a target="_blank" rel="noopener noreferrer" {...props} />);

const CustomImg = (props) => (<img src={`../../img/featuredContent/articles/${props.src}`} alt={props.alt} />);

export const getPrimaryFill = (article) => {
    if (!article) return 'none';
    return (primaryFill[contentTaxonomyNameToKey[article.taxonomy]]);
};
export const getSecondaryFill = (article) => {
    if (!article) return 'none';
    return (secondaryFill[contentTaxonomyNameToKey[article.taxonomy]]);
};


export const getThumbnailPath = (article) => {
    const slug = article?.taxonomy.replace(/[&/\\#,+()$~%.'":*?<>{}]/g, "").replace(/\s+/g, "-").toLowerCase();
    const thumbnailPath = "../../img/featuredContent/cards/";
    return `${thumbnailPath}${slug}.webp`;
};

export const components = {
    GlossaryLink,
    a: CustomA,
    img: CustomImg
};

