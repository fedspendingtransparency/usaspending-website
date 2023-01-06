/**
 * businessTypesHelper.js
 * Created by Lizzie Salita 8/7/17
 */

// eslint-disable-next-line import/prefer-default-export
export const getBusinessTypes = () => {
    const businessTypes =
        [
            {
                displayName: 'Alaskan Native Corporation Owned Firm',
                fieldName: 'alaskan_native_corporation_owned_firm'
            },
            {
                displayName: 'American Indian Owned Business',
                fieldName: 'american_indian_owned_business'
            },
            {
                displayName: 'Indian Tribe Federally Recognized',
                fieldName: 'indian_tribe_federally_recognized'
            },
            {
                displayName: 'Native Hawaiian Organization Owned Firm',
                fieldName: 'native_hawaiian_organization_owned_firm'
            },
            {
                displayName: 'Tribally Owned Firm',
                fieldName: 'tribally_owned_firm'
            },
            {
                displayName: 'Veteran Owned Business',
                fieldName: 'veteran_owned_business'
            },
            {
                displayName: 'Service Disabled Veteran Owned Business',
                fieldName: 'service_disabled_veteran_owned_business'
            },
            {
                displayName: 'Woman Owned Business',
                fieldName: 'woman_owned_business'
            },
            {
                displayName: 'Women Owned Small Business',
                fieldName: 'women_owned_small_business'
            },
            {
                displayName: 'Economically Disadvantaged Women Owned Small Business',
                fieldName: 'economically_disadvantaged_women_owned_small_business'
            },
            {
                displayName: 'Joint Venture Women Owned Small Business',
                fieldName: 'joint_venture_women_owned_small_business'
            },
            {
                displayName: 'Joint Venture Economically Disadvantaged Women Owned Small Business',
                fieldName: 'joint_venture_economic_disadvantaged_women_owned_small_bus'
            },
            {
                displayName: 'Minority Owned Business',
                fieldName: 'minority_owned_business'
            },
            {
                displayName: 'Subcontinent Asian Asian - Indian American Owned Business',
                fieldName: 'subcontinent_asian_asian_indian_american_owned_business'
            },
            {
                displayName: 'Asian Pacific American Owned Business',
                fieldName: 'asian_pacific_american_owned_business'
            },
            {
                displayName: 'Black American Owned Business',
                fieldName: 'black_american_owned_business'
            },
            {
                displayName: 'Hispanic American Owned Business',
                fieldName: 'hispanic_american_owned_business'
            },
            {
                displayName: 'Native American Owned Business',
                fieldName: 'native_american_owned_business'
            },
            {
                displayName: 'Other Minority Owned Business',
                fieldName: 'other_minority_owned_business'
            },
            {
                displayName: 'Emerging Small Business',
                fieldName: 'emerging_small_business'
            },
            {
                displayName: 'Community Developed Corporation Owned Firm',
                fieldName: 'community_developed_corporation_owned_firm'
            },
            {
                displayName: 'Labor Surplus Area Firm',
                fieldName: 'labor_surplus_area_firm'
            },
            {
                displayName: 'U.S. Federal Government',
                fieldName: 'us_federal_government'
            },
            {
                displayName: 'Federally Funded Research and Development Corp',
                fieldName: 'federally_funded_research_and_development_corp'
            },
            {
                displayName: 'Federal Agency',
                fieldName: 'federal_agency'
            },
            {
                displayName: 'U.S. State Government',
                fieldName: 'us_state_government'
            },
            {
                displayName: 'U.S. Local Government',
                fieldName: 'us_local_government'
            },
            {
                displayName: 'City Local Government',
                fieldName: 'city_local_government'
            },
            {
                displayName: 'County Local Government',
                fieldName: 'county_local_government'
            },
            {
                displayName: 'Inter-Municipal Local Government',
                fieldName: 'inter_municipal_local_government'
            },
            {
                displayName: 'Local Government Owned',
                fieldName: 'local_government_owned'
            },
            {
                displayName: 'Municipality Local Government',
                fieldName: 'municipality_local_government'
            },
            {
                displayName: 'School District Local Government',
                fieldName: 'school_district_local_government'
            },
            {
                displayName: 'Township Local Government',
                fieldName: 'township_local_government'
            },
            {
                displayName: 'U.S. Tribal Government',
                fieldName: 'us_tribal_government'
            },
            {
                displayName: 'Foreign Government',
                fieldName: 'foreign_government'
            },
            {
                displayName: 'Corporate Entity Not Tax Exempt',
                fieldName: 'corporate_entity_not_tax_exempt'
            },
            {
                displayName: 'Corporate Entity tax Exempt',
                fieldName: 'corporate_entity_tax_exempt'
            },
            {
                displayName: 'Partnership or Limited Liability Partnership',
                fieldName: 'partnership_or_limited_liability_partnership'
            },
            {
                displayName: 'Sole Proprietorship',
                fieldName: 'sole_proprietorship'
            },
            {
                displayName: 'Small Agricultural Cooperative',
                fieldName: 'small_agricultural_cooperative'
            },
            {
                displayName: 'International Organization',
                fieldName: 'international_organization'
            },
            {
                displayName: 'U.S. Government Entity',
                fieldName: 'us_government_entity'
            },
            {
                displayName: 'Community Development Corporation',
                fieldName: 'community_development_corporation'
            },
            {
                displayName: 'Domestic Shelter',
                fieldName: 'domestic_shelter'
            },
            {
                displayName: 'Educational Institution',
                fieldName: 'educational_institution'
            },
            {
                displayName: 'Foundation',
                fieldName: 'foundation'
            },
            {
                displayName: 'Hospital Flag',
                fieldName: 'hospital_flag'
            },
            {
                displayName: 'Manufacturer of Goods',
                fieldName: 'manufacturer_of_goods'
            },
            {
                displayName: 'Veterinary Hospital',
                fieldName: 'veterinary_hospital'
            },
            {
                displayName: 'Hispanic Servicing Institution',
                fieldName: 'hispanic_servicing_institution'
            },
            {
                displayName: 'Airport Authority',
                fieldName: 'airport_authority'
            },
            {
                displayName: 'Council of Governments',
                fieldName: 'council_of_governments'
            },
            {
                displayName: 'Housing Authorities Public/Tribal',
                fieldName: 'housing_authorities_public_tribal'
            },
            {
                displayName: 'Interstate Entity',
                fieldName: 'interstate_entity'
            },
            {
                displayName: 'Planning Commission',
                fieldName: 'planning_commission'
            },
            {
                displayName: 'Port Authority',
                fieldName: 'port_authority'
            },
            {
                displayName: 'Transit Authority',
                fieldName: 'transit_authority'
            },
            {
                displayName: 'Subchapter S Corporation',
                fieldName: 'subchapter_scorporation'
            },
            {
                displayName: 'Limited Liability Corporation',
                fieldName: 'limited_liability_corporation'
            },
            {
                displayName: 'Foreign Owned',
                fieldName: 'foreign_owned'
            },
            {
                displayName: 'For Profit Organization',
                fieldName: 'for_profit_organization'
            },
            {
                displayName: 'Nonprofit Organization',
                fieldName: 'nonprofit_organization'
            },
            {
                displayName: 'Other Not For Profit Organization',
                fieldName: 'other_not_for_profit_organization'
            },
            {
                displayName: 'The AbilityOne Program',
                fieldName: 'the_ability_one_program'
            },
            {
                displayName: 'Private University or College ',
                fieldName: 'private_university_or_college'
            },
            {
                displayName: 'State Controlled Institution of Higher Learning',
                fieldName: 'state_controlled_institution_of_higher_learning'
            },
            {
                displayName: '1862 Land grant College',
                fieldName: 'c1862_land_grant_college'
            },
            {
                displayName: '1890 land grant College',
                fieldName: 'c1890_land_grant_college'
            },
            {
                displayName: '1994 Land Grant College',
                fieldName: 'c1994_land_grant_college'
            },
            {
                displayName: 'Minority Institution',
                fieldName: 'minority_institution'
            },
            {
                displayName: 'Historically Black College or University',
                fieldName: 'historically_black_college'
            },
            {
                displayName: 'Tribal College',
                fieldName: 'tribal_college'
            },
            {
                displayName: 'Alaskan Native Servicing Institution',
                fieldName: 'alaskan_native_servicing_institution'
            },
            {
                displayName: 'Native Hawaiian Servicing Institution',
                fieldName: 'native_hawaiian_servicing_institution'
            },
            {
                displayName: 'School of Forestry',
                fieldName: 'school_of_forestry'
            },
            {
                displayName: 'Veterinary College',
                fieldName: 'veterinary_college'
            },
            {
                displayName: 'DoT Certified Disadvantaged Business Enterprise',
                fieldName: 'dot_certified_disadvantage'
            },
            {
                displayName: 'Self-Certified Small Disadvantaged Business',
                fieldName: 'self_certified_small_disadvantaged_business'
            },
            {
                displayName: '8a Program Participant',
                fieldName: 'c8a_program_participant'
            },
            {
                displayName: 'Historically Underutilized Business Zone HUBZone Firm',
                fieldName: 'historically_underutilized_business_zone'
            },
            {
                displayName: 'SBA Certified 8 a Joint Venture',
                fieldName: 'sba_certified_8a_joint_venture'
            }
        ];
    return businessTypes;
};
