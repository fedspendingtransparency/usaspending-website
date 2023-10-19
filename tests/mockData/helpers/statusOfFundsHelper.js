/**
 * statusOfFundsHelper.js
 * Created by Brian Petway 10/06/23
 * */

export const mockData =
    [
        {
            name: "Federal Highway Administration",
            id: "federal-highway-administration",
            total_obligations: 51777859245.76,
            total_outlays: 47603063743.35,
            total_budgetary_resources: 100086511034.61
        },
        {
            name: "Federal Aviation Administration",
            id: "federal-aviation-administration",
            total_obligations: 29588949808.3,
            total_outlays: 31978039085.05,
            total_budgetary_resources: 46986977242.12
        },
        {
            name: "Federal Transit Administration",
            id: "federal-transit-administration",
            total_obligations: 14525357456.99,
            total_outlays: 20393836350.68,
            total_budgetary_resources: 51616542712.41
        },
        {
            name: "Federal Railroad Administration",
            id: "federal-railroad-administration",
            total_obligations: 7612002361.85,
            total_outlays: 3644582286.56,
            total_budgetary_resources: 28165544598.91
        },
        {
            name: "Maritime Administration",
            id: "maritime-administration",
            total_obligations: 1883494137.23,
            total_outlays: 1979718454.33,
            total_budgetary_resources: 4665177790.96
        },
        {
            name: "Office of the Secretary",
            id: "office-of-the-secretary",
            total_obligations: 1852898547.74,
            total_outlays: 2257702612.68,
            total_budgetary_resources: 13399454156.59
        },
        {
            name: "National Highway Traffic Safety Administration",
            id: "national-highway-traffic-safety-administration",
            total_obligations: 1335786362.83,
            total_outlays: 1137039356.39,
            total_budgetary_resources: 2010500490.93
        },
        {
            name: "Federal Motor Carrier Safety Administration",
            id: "federal-motor-carrier-safety-administration",
            total_obligations: 836161991.94,
            total_outlays: 794541848.17,
            total_budgetary_resources: 1350823146.4
        },
        {
            name: "Pipeline and Hazardous Materials Safety Administration",
            id: "pipeline-and-hazardous-materials-safety-administration",
            total_obligations: 218807443.73,
            total_outlays: 324137146.48,
            total_budgetary_resources: 869183436.2
        },
        {
            name: "Office of Inspector General",
            id: "office-of-inspector-general",
            total_obligations: 96900880.55,
            total_outlays: 96459782.63,
            total_budgetary_resources: 127499852.11
        }
    ];

export const mockParsedData =
    [
        {
            id: "federal-highway-administration",
            name: "Federal Highway Administration",
            _budgetaryResources: 100086511034.61,
            _obligations: 51777859245.76,
            _outlays: 47603063743.35
        },
        {
            id: "federal-transit-administration",
            name: "Federal Transit Administration",
            _budgetaryResources: 51616542712.41,
            _obligations: 14525357456.99,
            _outlays: 20393836350.68
        },
        {
            id: "federal-aviation-administration",
            name: "Federal Aviation Administration",
            _budgetaryResources: 46986977242.12,
            _obligations: 29588949808.3,
            _outlays: 31978039085.05
        },
        {
            id: "federal-railroad-administration",
            name: "Federal Railroad Administration",
            _budgetaryResources: 28165544598.91,
            _obligations: 7612002361.85,
            _outlays: 3644582286.56
        },
        {
            id: "office-of-the-secretary",
            name: "Office of the Secretary",
            _budgetaryResources: 13399454156.59,
            _obligations: 1852898547.74,
            _outlays: 2257702612.68
        },
        {
            id: "maritime-administration",
            name: "Maritime Administration",
            _budgetaryResources: 4665177790.96,
            _obligations: 1883494137.23,
            _outlays: 1979718454.33
        },
        {
            id: "national-highway-traffic-safety-administration",
            name: "National Highway Traffic Safety Administration",
            _budgetaryResources: 2010500490.93,
            _obligations: 1335786362.83,
            _outlays: 1137039356.39
        },
        {
            id: "federal-motor-carrier-safety-administration",
            name: "Federal Motor Carrier Safety Administration",
            _budgetaryResources: 1350823146.4,
            _obligations: 836161991.94,
            _outlays: 794541848.17
        },
        {
            id: "pipeline-and-hazardous-materials-safety-administration",
            name: "Pipeline and Hazardous Materials Safety Administration",
            _budgetaryResources: 869183436.2,
            _obligations: 218807443.73,
            _outlays: 324137146.48
        },
        {
            id: "office-of-inspector-general",
            name: "Office of Inspector General",
            _budgetaryResources: 127499852.11,
            _obligations: 96900880.55,
            _outlays: 96459782.63
        }
    ];

export const mockLevel4ApiResponse =
    {
        res: [
            {
                name: "INTEREST PAID TO CREDIT FINANCING ACCOUNTS",
                obligated_amount: 11671286399.07,
                gross_outlay_amount: 0,
                children: [
                    {
                        name: "Grants and fixed charges",
                        obligated_amount: 11671286399.07,
                        gross_outlay_amount: 0
                    }
                ]
            }
        ]
    };

export const mockProgramActivityOrObjectClassName = 'INTEREST PAID TO CREDIT FINANCING ACCOUNTS';

export const mockLevel5Data =
    [
        {
            name: "Grants and fixed charges",
            obligated_amount: 11671286399.07,
            gross_outlay_amount: 0
        }
    ];
