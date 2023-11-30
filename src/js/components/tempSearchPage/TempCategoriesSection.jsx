import React from "react";
import fetchData from './fetchSpendingByCategoriesData';

const resource = fetchData();

const TempCategoriesSection = () => {
    const content = resource.read();
    const message = content.messages[0];
    const agencyName = content.results[0].name;

    return (
        <section
            id="temp-component-four"
            style={{
                border: '2px solid gold',
                height: '400px',
                margin: '40px 40px',
                textAlign: 'center',
                fontSize: '24px',
                paddingTop: '40px'
            }}>
            <div>
                Categories Section
            </div>
            <br />
            <div>
                {message}
            </div>
            <br />
            <div>
                Agency Name of first result:
            </div>
            <div>
                {agencyName}
            </div>
        </section>
    );
};

export default TempCategoriesSection;
