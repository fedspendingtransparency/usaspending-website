/**
 * Created by michaelbray on 3/6/17.
 */

/* eslint-disable import/prefer-default-export */
// We only have one export but want to maintain consistency with other helpers
export const formatAwardID = (award, awardIDType) => {
    switch (awardIDType) {
        case 'PIID': {
            return award.piid;
        }
        case 'FAIN': {
            return award.fain;
        }
        case 'URI': {
            return award.uri;
        }
        default: {
            return `${award.id}`;
        }
    }
};
/* eslint-enable import/prefer-default-export */
