import React from 'react';
import DOMPurify from 'dompurify';
import linkifyHtml from 'linkify-html';

// matches m:ss, mm:ss, and h:mm:ss timestamps
const timestampRegex = /\b(?:\d+:)?\d{1,2}:\d\d\b/g;

const escapeAttribute = (value) => String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');

// '1:02:30' -> 3750
const timestampToSeconds = (timestamp) => timestamp
    .split(':')
    .reduce((total, unit) => (total * 60) + parseInt(unit, 10), 0);

const linkChapters = (text, videoId) => text.replace(timestampRegex, (timestamp) => (
    `<a class="videoChapter" role="link" tabindex="0" data-id="${escapeAttribute(videoId)}" data-time="${timestampToSeconds(timestamp)}">${timestamp}</a>`
));

const parseChapters = (description, videoId) => {
    if (!description) return (<div />);

    let newDescription = description
        .replaceAll('\r\n', '\n')
        .replaceAll('\n', '<br />');

    // only timestamps after the CHAPTERS heading are chapters
    const chaptersIndex = newDescription.indexOf('CHAPTERS');
    if (chaptersIndex > -1) {
        newDescription = newDescription.slice(0, chaptersIndex) +
            linkChapters(newDescription.slice(chaptersIndex), videoId);
    }

    newDescription = linkifyHtml(newDescription, { target: '_blank', rel: 'noopener noreferrer' });

    // sanitize once, at the very end, so every link (chapter and linkified) is covered; DOMPurify strips target by default
    newDescription = DOMPurify.sanitize(newDescription, { ADD_ATTR: ['target'] });

    return (<div dangerouslySetInnerHTML={{ __html: newDescription }} />);
};

export default parseChapters;
