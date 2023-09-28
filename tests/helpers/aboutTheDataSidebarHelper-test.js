/**
 * @jest-environment jsdom
 * 
 * aboutTheDataSidebarHelper-test.js
 * Created by Andrea Blackwell 12/07/2022
 */

import schema from 'dataMapping/aboutTheDataSchema';
import { getDrilldownEntry, getDrilldownEntrySectionAndId, escapeRegExp } from 'helpers/aboutTheDataSidebarHelper';

describe('About the Data Sidebar Helpers', () => {
    it('should return the correct entry object', () => {
        const slug = "file-b";
        const entry = getDrilldownEntry(schema, slug);
        expect(entry.name)
            .toEqual('File B (Account Breakdown by Program Activity & Object Class)');
    });

    it('should not return an entry object', () => {
        const incorrectSlug = "file";
        const entry = getDrilldownEntry(schema, incorrectSlug);
        expect(entry).toBeUndefined();
    });

    it('should return the section and id', () => {
        const slug = "file-c";
        const entry = getDrilldownEntrySectionAndId(schema, slug);
        expect(entry.entryId).toEqual(3);
    });

    it('should add an escape for special chars in the regexp', () => {
        const term = '-/\\^$*+?.()|[]{}';
        const result = escapeRegExp(term);
        // this is a weird one; i'm open to better ideas
        // and there are still more special chars that we could add to the list
        // but it's doing what it needs to do for now
        expect(result).toBe('\\-\\/\\\\\\^\\$\\*\\+\\?\\.\\(\\)\\|\\[\\]\\{\\}');
    });
});

