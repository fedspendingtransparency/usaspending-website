/**
 * disasterHelper
 * Created by Max Kendall 02/5/2021
* */

// We should start keeping our mock API helpers here to level up our file organization

export const mockDefCodes = {
    data: {
        codes: [
            { code: 'L', disaster: 'covid_19' },
            { code: 'M', disaster: 'covid_19' },
            { code: 'A', disaster: 'not_covid-19' }
        ]
    }
};

export const validDefCodes = [
    {
        code: "1",
        public_law: "Non-emergency P.L. 117-58",
        title: "Infrastructure Investment and Jobs Act",
        urls: [
            "http://www.govinfo.gov/content/pkg/PLAW-117publ58/pdf/PLAW-117publ58.pdf"
        ],
        disaster: "infrastructure"
    },
    {
        code: "L",
        public_law: "Emergency P.L. 116-123",
        title: "Coronavirus Preparedness and Response Supplemental Appropriations Act, 2020",
        urls: [
            "http://www.govinfo.gov/content/pkg/PLAW-116publ123/pdf/PLAW-116publ123.pdf"
        ],
        disaster: "covid_19"
    },
    {
        code: "M",
        public_law: "Emergency P.L. 116-127",
        title: "Families First Coronavirus Response Act",
        urls: [
            "http://www.govinfo.gov/content/pkg/PLAW-116publ127/pdf/PLAW-116publ127.pdf"
        ],
        disaster: "covid_19"
    },
    {
        code: "N",
        public_law: "Emergency P.L. 116-136",
        title: "Coronavirus Aid, Relief, and Economic Security Act or the CARES Act",
        urls: [
            "http://www.govinfo.gov/content/pkg/PLAW-116publ136/pdf/PLAW-116publ136.pdf"
        ],
        disaster: "covid_19"
    },
    {
        code: "O",
        public_law: "Non-emergency P.L. 116-136|Non-emergency P.L. 116-139|Non-emergency P.L. 116-260|Non-emergency P.L. 117-2",
        title: "Coronavirus Aid, Relief, and Economic Security Act or the CARES Act|Paycheck Protection Program and Health Care Enhancement Act|Consolidated Appropriations Act, 2021|American Rescue Plan Act of 2021",
        urls: [
            "http://www.govinfo.gov/content/pkg/PLAW-116publ136/pdf/PLAW-116publ136.pdf",
            "http://www.govinfo.gov/content/pkg/PLAW-116publ139/pdf/PLAW-116publ139.pdf",
            "http://www.govinfo.gov/content/pkg/PLAW-116publ260/pdf/PLAW-116publ260.pdf",
            "http://www.govinfo.gov/content/pkg/PLAW-117publ2/pdf/PLAW-117publ2.pdf"
        ],
        disaster: "covid_19"
    },
    {
        code: "P",
        public_law: "Emergency P.L. 116-139",
        title: "Paycheck Protection Program and Health Care Enhancement Act",
        urls: [
            "http://www.govinfo.gov/content/pkg/PLAW-116publ139/pdf/PLAW-116publ139.pdf"
        ],
        disaster: "covid_19"
    },
    {
        code: "U",
        public_law: "Emergency P.L. 116-260",
        title: "Consolidated Appropriations Act, 2021",
        urls: [
            "http://www.govinfo.gov/content/pkg/PLAW-116publ260/pdf/PLAW-116publ260.pdf"
        ],
        disaster: "covid_19"
    },
    {
        code: "V",
        public_law: "Non-emergency P.L. 117-2",
        title: "American Rescue Plan Act of 2021",
        urls: [
            "http://www.govinfo.gov/content/pkg/PLAW-117publ2/pdf/PLAW-117publ2.pdf"
        ],
        disaster: "covid_19"
    },
    {
        code: "Z",
        public_law: "Emergency P.L. 117-58",
        title: "Infrastructure Investment and Jobs Act",
        urls: [
            "http://www.govinfo.gov/content/pkg/PLAW-117publ58/pdf/PLAW-117publ58.pdf"
        ],
        disaster: "infrastructure"
    }
];

export const mockDefcParams = mockDefCodes.data.codes.filter((c) => c.disaster === 'covid_19').map((code) => code.code);

export const fetchDEFCodesMockReturnValue = ({
    promise: new Promise((resolve) => {
        process.nextTick(() => {
            resolve(mockDefCodes);
        });
    }),
    cancel: jest.fn()
});

