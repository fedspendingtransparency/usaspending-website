/**
 * covid19.js
 * Created by Jonathan Hill 06/02/20
 */

import { getBaseUrl } from 'helpers/socialShare';

const slug = 'covid-19';

export const getEmailSocialShareData = {
    subject: 'USAspending.gov COVID-19 Response: ',
    body: `View the COVID-19 Response on USAspending.gov: ${getBaseUrl(slug)}`
};

export const scrollPositionOfSiteHeader = (cookie) => (cookie ? 96 : 187);

export const defCodes = ['L', 'M', 'N', 'O', 'P'];

export const footerTitle = 'Looking for more insight on COVID-19 relief?';
export const footerDescription = 'for more in-depth analysis on this COVID-19 and more';
