/**
 * HomepageFirstRow.jsx
 * Created by Brian Petway 08/22/22
 */

import React, { useEffect, useState } from 'react';
import { FlexGridCol, FlexGridRow } from 'data-transparency-ui';
import { throttle } from "lodash";
import { mediumScreen } from 'dataMapping/shared/mobileBreakpoints';
import FeaturedContent from "../FeaturedContent/FeaturedContent";
import WordOfTheDay from "../WordOfTheDay/WordOfTheDay";

const HomepageFirstRow = () => {
    const [windowWidth, setWindowWidth] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < mediumScreen);
    useEffect(() => {
        const handleResize = throttle(() => {
            const newWidth = window.innerWidth;
            if (windowWidth !== newWidth) {
                setWindowWidth(newWidth);
                setIsMobile(newWidth < mediumScreen);
            }
        }, 50);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [windowWidth]);

    return (
        <section className="homepage-first-row__section">
            {isMobile ?
                <>
                    <FeaturedContent />
                    <WordOfTheDay />
                </>
                :
                <>
                    <FlexGridRow className="grid-content">
                        <FlexGridCol width={8} >
                            <FeaturedContent />
                        </FlexGridCol>
                        <FlexGridCol width={4} >
                            <WordOfTheDay />
                        </FlexGridCol>
                    </FlexGridRow>
                </>
            }
        </section>
    );
};

export default HomepageFirstRow;
