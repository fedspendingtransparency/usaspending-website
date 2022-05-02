export const federalAccountComponents = [
    {
        label: 'Agency Identifier',
        code: 'aid',
        characterLimit: 3,
        required: true
    },
    {
        label: 'Main Account Code',
        code: 'main',
        characterLimit: 4,
        required: true
    }
];

export const treasuryAccountComponents = [
    {
        label: 'Allocation Transfer Agency Identifier',
        code: 'ata',
        characterLimit: 3,
        required: false
    },
    {
        label: 'Agency Identifier',
        code: 'aid',
        characterLimit: 3,
        required: true
    },
    {
        label: 'Beginning Period of Availability',
        code: 'bpoa',
        characterLimit: 4,
        required: false
    },
    {
        label: 'Ending Period of Availability',
        code: 'epoa',
        characterLimit: 4,
        required: false
    },
    {
        label: 'Availability Type Code',
        code: 'a',
        characterLimit: 1,
        required: false
    },
    {
        label: 'Main Account Code',
        code: 'main',
        characterLimit: 4,
        required: true
    },
    {
        label: 'Sub Account Code',
        code: 'sub',
        characterLimit: 3,
        required: false
    }
];
