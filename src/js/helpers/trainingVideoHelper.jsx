import React from 'react';
import DOMPurify from 'dompurify';

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
            newDescription = newDescription.replace(found[j], `<a class="videoChapter" className="videoChapter" tabindex=0 data-id="${videoId}" data-time="${timeInSecs[j]}">${found[j]}</a>`);
        }
    }

    const sanitizedData = () => ({
        __html: DOMPurify.sanitize(newDescription)
    });

    return (<div dangerouslySetInnerHTML={sanitizedData()} />);
};

export default parseChapters;
