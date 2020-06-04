/**
 * covidHelper.js
 * Created By Jonathan Hill 06/02/20
 */

import { snakeCase } from 'lodash';
import { getBaseUrl } from 'helpers/socialShare';
import { slug, defCodes, componentByCovid19Section } from 'dataMapping/covid19/covid19';
import { scrollToY } from 'helpers/scrollToHelper';


export const getDEFOptions = (setSelectedDEF, defaultSortDEF) => defCodes.map((year) => {
    const onClickHandler = () => setSelectedDEF(year);
    return {
        name: `${year}`,
        value: year,
        onClick: onClickHandler
    };
})
.sort((a, b) => defaultSortDEF(a.value, b.value));

export const getSocialShareURL = () => getBaseUrl(slug);

export const jumpToSection = (section = '', activeSection, setActiveSection) => {
    // we've been provided a section to jump to
    // check if it's a valid section
    const matchedSection = Object.keys(componentByCovid19Section()).find((key) => key === section);

    if (!matchedSection) {
        // no matching section
        return;
    }

    // scroll to the correct section
    const sectionDom = document.querySelector(`#covid19-${snakeCase(section)}`);

    if (!sectionDom) {
        return;
    }
    if (activeSection === 'overview') {
        scrollToY(sectionDom.offsetTop - 150, 700);
    }
    else {
        // scrollY set to the top of the section, subtracting the height of sticky elements + 20px of margin
        scrollToY(sectionDom.offsetTop - 86, 700);
    }

    setActiveSection(matchedSection);
};
