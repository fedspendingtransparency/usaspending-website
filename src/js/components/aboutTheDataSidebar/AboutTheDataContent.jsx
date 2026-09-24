import React, { useMemo } from 'react';
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import { escapeRegExp } from "../../helpers/aboutTheDataSidebarHelper";
import { setAboutTheDataTerm } from "../../redux/actions/aboutTheDataSidebar/aboutTheDataActions";
import schema from "../../../config/aboutTheData/aboutTheDataSchema";
import DownloadButton from "./DownloadButton";
import AboutTheDataNoResults from "./AboutTheDataNoResults";
import AboutTheDataListView from "./AboutTheDataListView";
import AboutTheDataDrilldown from "./AboutTheDataDrilldown";

const propTypes = {
    clearDrilldown: PropTypes.func,
    entryId: PropTypes.number,
    section: PropTypes.object
}

const AboutTheDataContent = ({
    clearDrilldown,
    entryId,
    section
}) => {
    const dispatch = useDispatch();
    const input = useSelector((state) => state.aboutTheDataSidebar.search.input);

    const selectItem = (index, s) => dispatch(setAboutTheDataTerm(s.fields[index]));

    const searchResults = useMemo(() => {
        if (!input || input.length < 3) return schema;

        const resultItems = {};

        // look for search term in each 'fields.name' in each section
        Object
            .entries(schema)
            .filter(([, s]) => s.heading !== undefined)
            .forEach(([sectionKey, s]) => {
                const matchingFields = s.fields.filter((field) =>
                    field.name.toLowerCase()
                        .includes(input.toLowerCase())
                );
                if (matchingFields.length) {
                    const markupFields = [];
                    matchingFields.forEach((field) => {
                        // add classname to the search term in the results
                        const regex = new RegExp(escapeRegExp(input), 'gi');
                        const markupName = field.name.replace(regex, '<match>$&<match>');
                        const parts = markupName.split('<match>');
                        const markup = <>
                            {parts.map((part) => (
                                <>
                                    {part.toLowerCase() === input.toLowerCase() ? (
                                        <span className="matched-highlight">
                                            {part}
                                        </span>
                                    )
                                        :
                                        <>
                                            {part}
                                        </>
                                    }
                                </>
                            ))}
                        </>;

                        markupFields.push({
                            name: markup,
                            slug: field.slug
                        });
                    });
                    resultItems[sectionKey] = {
                        fields: markupFields,
                        heading: s.heading
                    };
                }
            });

        clearDrilldown();

        return resultItems
    }, [input, clearDrilldown])

    const content = Object.keys(searchResults).length === 0 ? (
        <>
            <DownloadButton />
            <AboutTheDataNoResults searchTerm={input} />
        </>
    )
        :
        (
            <>
                <DownloadButton />
                {Object.values(searchResults)
                    .filter((s) => s.heading !== undefined)
                    .map((s) => (
                        <AboutTheDataListView
                            key={`section-${s.heading}`}
                            section={s}
                            selectItem={selectItem} />
                    ))}
            </>
        );

    return (
        <div className="atd__body">
            { entryId !== null && entryId >= 0 && section ?
                <AboutTheDataDrilldown
                    section={section?.heading}
                    name={section?.fields[entryId]?.name}
                    clearDrilldown={clearDrilldown}
                    slug={section?.fields[entryId]?.slug} />
                :
                <>
                    {content}
                </>
            }
        </div>
    )
}

AboutTheDataContent.propTypes = propTypes;
export default AboutTheDataContent;
