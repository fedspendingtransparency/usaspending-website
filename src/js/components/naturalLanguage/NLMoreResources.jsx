/**
 * 
 * NLMoreResources.jsx 
 * Created by Trey Morgan 7/8/2026
 */

import React from "react";
import { FlexGridRow, FlexGridCol, Button } from 'data-transparency-ui';
import { moreResourcesBtnData } from "./NLData";

const NLMoreResources = () => (
    <section className="more-resources__section">
        <FlexGridRow className="more-resources__row">
            <FlexGridCol className="more-resources__label">
                MORE RESOURCES:
            </FlexGridCol>
            {moreResourcesBtnData.map((btn) => (
                <FlexGridCol 
                    className="more-resources__col"
                    key={`more-resources-${btn.id}`}  
                    mobile={12}
                    tablet={12}
                    desktop={4}>
                    <Button
                        copy=""
                        onClick={btn.action}
                        buttonTitle=""
                        buttonSize="md"
                        buttonType="text"
                        backgroundColor="light"
                        textAlignment="left"
                        imageAlignment="right"
                        image={btn.image}/>
                </FlexGridCol>
            ))
            }
        </FlexGridRow>
    </section>
);

export default NLMoreResources;