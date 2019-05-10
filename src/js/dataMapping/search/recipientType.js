/**
 * recipientType.js
 * Created by michaelbray on 5/16/17.
 */

/* eslint-disable quote-props */
// disable quote-props for consistency sake (we need leading numbers)

/* eslint-disable max-len */
// disable max-len for readability sake
export const recipientTypes = {
    'category_business': 'Business',
    'small_business': 'Small Business',
    'other_than_small_business': 'Other Than Small Business',
    'corporate_entity_tax_exempt': 'Corporate Entity Tax Exempt',
    'corporate_entity_not_tax_exempt': 'Corporate Entity Not Tax Exempt',
    'partnership_or_limited_liability_partnership': 'Partnership or Limited Liability Partnership',
    'sole_proprietorship': 'Sole Proprietorship',
    'manufacturer_of_goods': 'Manufacturer of Goods',
    'subchapter_s_corporation': 'Sub-Chapter S Corporation',
    'limited_liability_corporation': 'Limited Liability Corporation (LLC)',
    'minority_owned_business': 'Minority Owned Business',
    'alaskan_native_owned_business': 'Alaskan Native Owned Business',
    'american_indian_owned_business': 'American Indian Owned Business',
    'asian_pacific_american_owned_business': 'Asian Pacific American Owned Business',
    'black_american_owned_business': 'Black American Owned Business',
    'hispanic_american_owned_business': 'Hispanic American Owned Business',
    'native_american_owned_business': 'Native American Owned Business',
    'native_hawaiian_owned_business': 'Native Hawaiian Owned Business',
    'subcontinent_asian_indian_american_owned_business': 'Subcontinent Asian Indian American Owned Business',
    'tribally_owned_business': 'Tribally Owned Business',
    'other_minority_owned_business': 'Other Minority Owned Business',
    'woman_owned_business': 'Women Owned Business',
    'women_owned_small_business': 'Women Owned Small Business',
    'economically_disadvantaged_women_owned_small_business': 'Economically Disadvantaged Women Owned Small Business',
    'joint_venture_women_owned_small_business': 'Joint Venture Women Owned Small Business',
    'joint_venture_economically_disadvantaged_women_owned_small_business': 'Joint Venture Economically Disadvantaged Women Owned Small Business',
    'veteran_owned_business': 'Veteran Owned Business',
    'service_disabled_veteran_owned_business': 'Service Disabled Veteran Owned Business',
    'special_designations': 'Special Designations',
    '8a_program_participant': '8a Program Participant',
    'ability_one_program': 'Ability One Program',
    'dot_certified_disadvantaged_business_enterprise': 'DoT Certified Disadvantaged Business Enterprise',
    'emerging_small_business': 'Emerging Small Business',
    'federally_funded_research_and_development_corp': 'Federally Funded Research and Development Corp',
    'historically_underutilized_business_firm': 'Historically Underutilized Business (HUBZone) Firm',
    'labor_surplus_area_firm': 'Labor Surplus Area Firm',
    'sba_certified_8a_joint_venture': 'SBA Certified 8a Joint Venture',
    'self_certified_small_disadvanted_business': 'Self-Certified Small Disadvantaged Business',
    'small_agricultural_cooperative': 'Small Agricultural Cooperative',
    'small_disadvantaged_business': 'Small Disadvantaged Business',
    'community_developed_corporation_owned_firm': 'Community Developed Corporation Owned Firm',
    'us_owned_business': 'U.S. Owned Business',
    'foreign_owned_and_us_located_business': 'Foreign-Owned and U.S. Located Business',
    'foreign_owned_and_located_business': 'Foreign Owned and Located Business',
    'foreign_government': 'Foreign Government',
    'international_organization': 'International Organization',
    'domestic_shelter': 'Domestic Shelter',
    'hospital': 'Hospital',
    'veterinary_hospital': 'Veterinary Hospital',
    'nonprofit': 'Nonprofit',
    'foundation': 'Foundation',
    'community_development_corporations': 'Community Development Corporations',
    'higher_education': 'Higher Education',
    'public_institution_of_higher_education': 'Public Institution of Higher Education',
    'private_institution_of_higher_education': 'Private Institution of Higher Education',
    'minority_serving_institution_of_higher_education': 'Minority-Serving Institution of Higher Education',
    'school_of_forestry': 'School of Forestry',
    'veterinary_college': 'Veterinary College',
    'government': 'Government',
    'national_government': 'National Government',
    'interstate_entity': 'Interstate Entity',
    'regional_and_state_government': 'Regional and State Government',
    'regional_organization': 'Regional Organization',
    'us_territory_or_possession': 'U.S. Territory or Possession',
    'council_of_governments': 'Council of Governments',
    'local_government': 'Local Government',
    'indian_native_american_tribal_government': 'Indian Native American Tribal Government',
    'authorities_and_commissions': 'Authorities and Commissions',
    'individuals': 'Individuals'
};

export const recipientTypeGroups = {
    category_business: [
        'small_business',
        'other_than_small_business',
        'corporate_entity_tax_exempt',
        'corporate_entity_not_tax_exempt',
        'partnership_or_limited_liability_partnership',
        'sole_proprietorship',
        'manufacturer_of_goods',
        'subchapter_s_corporation',
        'limited_liability_corporation'
    ],
    minority_owned_business: [
        'alaskan_native_owned_business',
        'american_indian_owned_business',
        'asian_pacific_american_owned_business',
        'black_american_owned_business',
        'hispanic_american_owned_business',
        'native_american_owned_business',
        'native_hawaiian_owned_business',
        'subcontinent_asian_indian_american_owned_business',
        'tribally_owned_business',
        'other_minority_owned_business'
    ],
    woman_owned_business: [
        'women_owned_small_business',
        'economically_disadvantaged_women_owned_small_business',
        'joint_venture_women_owned_small_business',
        'joint_venture_economically_disadvantaged_women_owned_small_business'
    ],
    veteran_owned_business: [
        'service_disabled_veteran_owned_business'
    ],
    special_designations: [
        '8a_program_participant',
        'ability_one_program',
        'dot_certified_disadvantaged_business_enterprise',
        'emerging_small_business',
        'federally_funded_research_and_development_corp',
        'historically_underutilized_business_firm',
        'labor_surplus_area_firm',
        'sba_certified_8a_joint_venture',
        'self_certified_small_disadvanted_business',
        'small_agricultural_cooperative',
        'small_disadvantaged_business',
        'community_developed_corporation_owned_firm',
        'us_owned_business',
        'foreign_owned_and_us_located_business',
        'foreign_owned_and_located_business',
        'foreign_government',
        'international_organization',
        'domestic_shelter',
        'hospital',
        'veterinary_hospital'
    ],
    nonprofit: [
        'foundation',
        'community_development_corporations'
    ],
    higher_education: [
        'public_institution_of_higher_education',
        'private_institution_of_higher_education',
        'minority_serving_institution_of_higher_education',
        'school_of_forestry',
        'veterinary_college'
    ],
    government: [
        'national_government',
        'interstate_entity',
        'regional_and_state_government',
        'regional_organization',
        'us_territory_or_possession',
        'council_of_governments',
        'local_government',
        'indian_native_american_tribal_government',
        'authorities_and_commissions'
    ],
    individuals: [
        'individuals'
    ]
};

export const groupKeys = [
    'category_business',
    'minority_owned_business',
    'woman_owned_business',
    'veteran_owned_business',
    'special_designations',
    'nonprofit',
    'higher_education',
    'government',
    'individuals'];

export const groupLabels = {
    category_business: 'Business',
    minority_owned_business: 'Minority Owned Business',
    woman_owned_business: 'Women Owned Business',
    veteran_owned_business: 'Veteran Owned Business',
    special_designations: 'Special Designations',
    nonprofit: 'Nonprofit',
    higher_education: 'Higher Education',
    government: 'Government',
    individuals: 'Individuals'
};

/* eslint-enable max-len */
/* eslint-enable quote-props */
