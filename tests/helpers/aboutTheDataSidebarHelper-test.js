/**
 * aboutTheDataSidebarHelper-test.js
 * Created by Andrea Blackwell 12/07/2022
 */

import schema from 'dataMapping/aboutTheDataSchema';
import { getDrilldownEntry, getDrilldownEntrySectionAndId } from 'helpers/aboutTheDataSidebarHelper';

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

});

