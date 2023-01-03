import React from 'react';

const parseChapters = (description, videoId) => {
    let newDescription = description;

    newDescription = newDescription.replaceAll('\n', '<br />');

    if (description.indexOf('CHAPTERS') > -1) {
        const regex = /\d+:\d\d/g;

        const found = newDescription.match(regex);
        const timeInSecs = [];
        found.forEach((item) => {
            let sec = 0;
            let newItem = item.split(':');
            newItem = newItem.reverse();
            for (let i = 0; i < newItem.length; i++) {
                if (i === 0) {
                    sec += parseInt(newItem[i], 10);
                }
                else {
                    sec += parseInt(newItem[i], 10) * 60;
                }
            }
            timeInSecs.push(sec);
        });

        // find the timestamp in the description
        for (let j = 0; j < found.length; j++) {
            newDescription = newDescription.replace(found[j], `<a href="https://www.youtube.com/watch?v=${videoId}&t=${timeInSecs[j]}s">${found[j]}</a>`);
        }
    }

    return (<div dangerouslySetInnerHTML={{ __html: newDescription }} />);
};

export default parseChapters;
