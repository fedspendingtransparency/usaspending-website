import React, { useEffect, useState } from "react";

const TempComponent1 = () => {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    return (!isLoading &&
        <div style={{
            border: '2px solid red',
            height: '400px',
            margin: '40px 40px',
            textAlign: 'center',
            fontSize: '24px',
            paddingTop: '180px'
        }}>
        COMPONENT 1, 2 SECOND TIMEOUT
        </div>
    );
};

export default TempComponent1;
