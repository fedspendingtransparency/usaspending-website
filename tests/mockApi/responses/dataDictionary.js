export const mockDictionary = {
    data: {
        document: {
            metadata: {
                total_rows: 3,
                total_columns: 4,
                total_size: '100.00KB',
                download_location: 'http://files-nonprod.usaspending.gov/docs/DATA+Transparency+Crosswalk.xlsx'
            },
            sections: [
                {
                    section: 'Section One',
                    colspan: 3
                },
                {
                    section: 'Section Two',
                    colspan: 1
                }
            ],
            headers: [
                {
                    display: 'Element',
                    raw: 'element'
                },
                {
                    display: 'Definition',
                    raw: 'definition'
                },
                {
                    display: 'Name',
                    raw: 'name'
                },
                {
                    display: 'File',
                    raw: 'file'
                }
            ],
            rows: [
                [
                    'A',
                    'Lorem ipsum',
                    '1862',
                    'Z'
                ],
                [
                    'B',
                    'dolor sit amet',
                    '1890',
                    'X'
                ],
                [
                    'C',
                    'consectetur adipiscing elit',
                    '1994',
                    'Y'
                ]
            ]
        }
    }
};
