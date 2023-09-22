/**
 * @jest-environment jsdom
 * 
 * Base Parent Award Details test
 * Created by maxwell kendall 06/28/19
 */

import parentAwardDetails from "../../../src/js/models/v2/award/BaseParentAwardDetails";
import { mockIdv } from "./mockAwardApi";
import { decodedAwardId, encodedAwardId } from "../../mockData";

describe('parentAwardDetails', () => {
    const mockData = mockIdv.parent_award;
    it('successfully populates the object with the expected shape and value', () => {
        const result = Object.create(parentAwardDetails);
        result.populateCore(mockIdv.parent_award);
        expect(result.idvType).toEqual(mockData.idv_type_description);
        expect(result.idcType).toEqual(mockData.type_of_idc_description);
        expect(result.agencyId).toEqual(mockData.agency_id);
        expect(result.agencyName).toEqual(mockData.agency_name);
        expect(result.subAgencyId).toEqual(mockData.sub_agency_id);
        expect(result.subAgencyName).toEqual(mockData.sub_agency_name);
        expect(result.multipleOrSingle).toEqual(mockData.multiple_or_single_aw_desc);
        expect(result.piid).toEqual(mockData.piid);
    });
    it('encodes the generated id or returns an empty string when null', () => {
        const withId = Object.create(parentAwardDetails);
        withId.populateCore({ ...mockIdv.parent_award, generated_unique_award_id: decodedAwardId });

        expect(withId.awardId).toEqual(encodedAwardId);

        const noId = Object.create(parentAwardDetails);
        noId.populateCore({ ...mockIdv.parent_award, generated_unique_award_id: null });

        expect(noId.awardId).toEqual('');
    });
});
