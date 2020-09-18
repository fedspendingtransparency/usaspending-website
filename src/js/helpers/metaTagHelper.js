/**
 * Created by michaelbray on 5/25/17.
 */

// Disabling max-len property for readability / editability
/* eslint-disable max-len */

const productionURL = 'https://usaspending.gov/';
const imgDirectory = 'img/';

const siteName = 'USAspending.gov';
const facebookImage = 'FacebookOG.png';

export const homePageMetaTags = {
    og_url: productionURL,
    og_title: 'Government Spending Open Data | USAspending',
    og_description:
        'USAspending is the official open data source of federal spending information. We track how federal money is spent in communities across America and beyond. Learn more about government spending through interactive tools that explore elements of the federal budget, such as federal loan, grant, and contract data.',
    og_site_name: siteName,
    og_image: `${productionURL}${imgDirectory}${facebookImage}`
};

export const searchPageMetaTags = {
    og_url: `${productionURL}search`,
    og_title: 'Federal Awards | Advanced Search | USAspending',
    og_description:
        'Advanced Search gives you a variety of filters to find federal awards such as loans, grants, and contracts.',
    og_site_name: siteName,
    og_image: `${productionURL}${imgDirectory}${facebookImage}`
};

export const explorerPageMetaTags = {
    og_url: `${productionURL}explorer`,
    og_title: 'Government Spending Explorer | USAspending.gov',
    og_description:
        'Spending Explorer lets you explore the federal spending landscape through the lens of three accounting categories: Budget Function (spending purpose), Agency (spending source), and Object Class (purchased item or service).',
    og_site_name: siteName,
    og_image: `${productionURL}${imgDirectory}${facebookImage}`
};

export const aboutPageMetaTags = {
    og_url: `${productionURL}about`,
    og_title: 'About | USAspending.gov',
    og_description:
        'Learn about our mission, background, and data sources by visiting this page. ',
    og_site_name: siteName,
    og_image: `${productionURL}${imgDirectory}${facebookImage}`
};

export const accessibilityPageMetaTags = {
    og_url: `${productionURL}about/accessibility`,
    og_title: 'Accessibility | USAspending.gov',
    og_description:
        'Learn about our commitment to accessibility on this page.',
    og_site_name: siteName,
    og_image: `${productionURL}${imgDirectory}${facebookImage}`
};

export const privacyPageMetaTags = {
    og_url: `${productionURL}about/privacy`,
    og_title: 'Privacy | USAspending.gov',
    og_description:
        'Learn about our privacy policy on this page. ',
    og_site_name: siteName,
    og_image: `${productionURL}${imgDirectory}${facebookImage}`
};

export const foiaPageMetaTags = {
    og_url: `${productionURL}about/foia`,
    og_title: 'Freedom of Information Act | USAspending',
    og_description:
        'Learn where to make a Freedom of Information Act (FOIA) request by visiting this page.',
    og_site_name: siteName,
    og_image: `${productionURL}${imgDirectory}${facebookImage}`
};

export const dbInfoPageMetaTags = {
    og_url: `${productionURL}db_info`,
    og_title: 'Dun & Bradstreet, Inc. Data | USAspending',
    og_description:
        'Learn about our licensing agreement with Dun & Bradstreet, Inc. by visiting this page.',
    og_site_name: siteName,
    og_image: `${productionURL}${imgDirectory}${facebookImage}`
};

export const awardPageMetaTags = ({
    _category: awardType,
    recipient: { _name: recipientName },
    _dateSigned: dateSigned,
    generatedId: id,
    fundingAgency: { toptierName: agencyName },
    awardingAgency: { toptierName: asstAggAgencyName }
}) => ({
    og_url: `${productionURL}award/${id}`,
    og_title: `${awardType.toUpperCase()} to ${recipientName} | USAspending.gov`,
    og_description:
        `View a summary page of this ${dateSigned.format('YYYY')} ${awardType.toUpperCase()} to ${recipientName} from the ${agencyName || asstAggAgencyName}.`,
    og_site_name: siteName,
    og_image: `${productionURL}${imgDirectory}${facebookImage}`
});

export const federalAccountPageMetaTags = ({
    title,
    agency_identifier: agencyId,
    main_account_code: accountCode
}) => ({
    og_url: `${productionURL}federal_account/${agencyId}/${accountCode}`,
    og_title: `${title} | Spending Profile | USAspending`,
    og_description:
        `View the spending activity of the federal account for ${title}. `,
    og_site_name: siteName,
    og_image: `${productionURL}${imgDirectory}${facebookImage}`
});

export const agencyPageMetaTags = ({
    name: agencyName,
    id
}) => ({
    og_url: `${productionURL}agency/${id}`,
    og_title: `${agencyName} | Spending Profile | USAspending`,
    og_description:
        `View the spending activity of the ${agencyName} in this profile page. `,
    og_site_name: siteName,
    og_image: `${productionURL}${imgDirectory}${facebookImage}`
});

export const agencyLandingPageMetaTags = {
    og_url: `${productionURL}agency`,
    og_title: 'Federal Agency Spending Profiles | USAspending',
    og_description:
        'View the spending activity of federal agencies by selecting from this list.',
    og_site_name: siteName,
    og_image: `${productionURL}${imgDirectory}${facebookImage}`
};

export const covidPageMetaTags = {
    og_url: `${productionURL}disaster/covid-19`,
    og_title: 'COVID Relief Spending | USAspending',
    og_description:
        'Federal agencies that have received COVID-19 supplemental appropriations are required by the Office of Management and Budget (OMB) to report obligations and expenditures on a monthly basis to USAspending.gov. Visit the COVID-19 Spending profile page for an overview of this data.',
    og_site_name: siteName,
    og_image: `${productionURL}${imgDirectory}${facebookImage}`
};

export const stylePageMetaTags = {
    og_url: `${productionURL}style`,
    og_title: 'Style Guide | USAspending',
    og_description:
        'USAspending.gov is the new official source of accessible, searchable and reliable spending data for the U.S. Government.',
    og_site_name: siteName,
    og_image: `${productionURL}${imgDirectory}${facebookImage}`
};

export const downloadArchivePageMetaTags = {
    og_url: `${productionURL}download_center/award_data_archive`,
    og_title: 'Award Data Archive | USAspending',
    og_description:
        'Instantly download an archive of award spending data from federal agencies. ',
    og_site_name: siteName,
    og_image: `${productionURL}${imgDirectory}${facebookImage}`
};

export const downloadAwardPageMetaTags = {
    og_url: `${productionURL}download_center/custom_award_data`,
    og_title: 'Custom Award Data | USAspending',
    og_description:
        'Customize your download of federal awards (prime awards and sub-awards) using the filters on this page. ',
    og_site_name: siteName,
    og_image: `${productionURL}${imgDirectory}${facebookImage}`
};

export const downloadAccountPageMetaTags = {
    og_url: `${productionURL}download_center/custom_account_data`,
    og_title: 'Custom Account Data | USAspending',
    og_description:
        'Customize your download of federal spending data (both award and non-award spending) using the filters on this page. ',
    og_site_name: siteName,
    og_image: `${productionURL}${imgDirectory}${facebookImage}`
};

export const dataDictionaryPageMetaTags = {
    og_url: `${productionURL}download_center/data_dictionary`,
    og_title: 'Data Dictionary | USAspending',
    og_description:
        'Learn about the data elements in our download packages by visiting this page.',
    og_site_name: siteName,
    og_image: `${productionURL}${imgDirectory}${facebookImage}`
};

export const keywordPageMetaTags = {
    og_url: `${productionURL}keyword_search`,
    og_title: 'Federal Awards | Keyword Search | USAspending',
    og_description:
        'Keyword Search lets you find federal awards such as loans, grants, and contracts through submitted keywords.',
    og_site_name: siteName,
    og_image: `${productionURL}${imgDirectory}${facebookImage}`
};

export const statePageMetaTags = ({
    name,
    id
}) => ({
    og_url: `${productionURL}state/${id}/latest`,
    og_title: `${name} | Spending Profile | USAspending`,
    og_description:
        `View the federal spending activity for the state of ${name} in this profile page. `,
    og_site_name: siteName,
    og_image: `${productionURL}${imgDirectory}${facebookImage}`
});

export const errorPageMetaTags = {
    og_url: productionURL,
    og_title: '404 | USAspending',
    og_description:
        'The requested page cannot be found. Please visit our homepage to re-start your search or send us an inquiry.',
    og_site_name: siteName,
    og_image: `${productionURL}${imgDirectory}${facebookImage}`
};

export const recipientLandingPageMetaTags = {
    og_url: `${productionURL}recipient`,
    og_title: 'Federal Award Recipient Profiles | USAspending',
    og_description:
        'View the federal spending activity for various recipient entities by selecting from this list.',
    og_site_name: siteName,
    og_image: `${productionURL}${imgDirectory}${facebookImage}`
};

export const accountLandingPageMetaTags = {
    og_url: `${productionURL}federal_account`,
    og_title: 'Federal Account Spending Profiles | USAspending',
    og_description:
        'View the spending activity of accounts that fund federal spending.',
    og_site_name: siteName,
    og_image: `${productionURL}${imgDirectory}${facebookImage}`
};

export const recipientPageMetaTags = ({
    id,
    name
}) => ({
    og_url: `${productionURL}recipient/${id}/latest`,
    og_title: `${name} | Federal Award Recipient Profile | USAspending`,
    og_description:
        `View the federal spending activity for ${name} in this profile page.`,
    og_site_name: siteName,
    og_image: `${productionURL}${imgDirectory}${facebookImage}`
});

export const stateLandingPageMetaTags = {
    og_url: `${productionURL}state`,
    og_title: 'U.S. State Spending Profiles | USAspending',
    og_description:
        'View the federal spending activity for U.S. States by selecting from this list. ',
    og_site_name: siteName,
    og_image: `${productionURL}${imgDirectory}${facebookImage}`
};

/* eslint-enable max-len */
