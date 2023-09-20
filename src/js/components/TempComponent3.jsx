import React, { useEffect, useState } from "react";
import fetchData from './fetchData';

const resource = fetchData();

const TempComponent3 = (inViewport) => {
    const [content, setContent] = useState(null);
    const [term, setTerm] = useState(null);
    const [definition, setDefinition] = useState(null);

    useEffect(() => {
        if (inViewport) {
            // content = resource.read();
            setContent(resource.read());
            // term = content.results[0].term;
            setTerm(content?.results[0].term);
            // definition = content.results[0].official;
            setDefinition(content?.results[0].official);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inViewport]);

    return (
        <section
            id="temp-component-three"
            style={{
                border: '2px solid blue',
                height: '400px',
                margin: '40px 40px',
                textAlign: 'center',
                fontSize: '24px',
                paddingTop: '80px'
            }}>
            COMPONENT 3
            <div>
                {term}
                {definition}
            </div>
        </section>
    );
};

export default TempComponent3;
