import { getNewUrlForGlossary } from 'helpers/glossaryHelper';

test.each([
    // name, fn
    ['/', '/?glossary=', ''],
    ['/search', '/search/?glossary=', ''],
    ['/submission-statistics/', '/submission-statistics/?glossary=&fy=2020&period=12', '?fy=2020&period=12']
])('when existing url is %s, the glossary query param is appended correctly as %s', (existingUrl, expected, search = '') => {
    expect(getNewUrlForGlossary(existingUrl, '/?glossary=', search)).toEqual(expected);
});
