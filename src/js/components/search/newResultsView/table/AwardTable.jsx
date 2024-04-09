import React from "react";
import fetchAwardsTableData from '../fetchAwardsTableData';
import fetchAwardTableCount from '../fetchAwardTableCount';

const resource = fetchAwardsTableData();
const countAPICall = fetchAwardTableCount();

const AwardTable = React.memo(() => {
    if (resource) {
        console.log('awards table api call');
    }
    const content = resource.read();
    const message = content.messages[0];
    const sampleId = content.results[0]['Award ID'];

    const countContent = countAPICall.read();
    const contracts = countContent.results.contracts;
    const directPayments = countContent.results.direct_payments;
    const grants = countContent.results.grants;
    const idvs = countContent.results.idvs;
    const loans = countContent.results.loans;
    const other = countContent.results.other;

    return (
        <section
            className="temp-component-one"
            style={{
                border: '2px solid red',
                height: '800px',
                margin: '40px 40px',
                textAlign: 'center',
                fontSize: '24px',
                padding: '40px'
            }}>
            <div>
                Awards Table Section
            </div>
            <br />
            <div>
                {message}
            </div>
            <br />
            <div>
                Award ID of first result:
            </div>
            <div>
                {sampleId}
            </div>
            <br />
            <div>
                Award Counts
            </div>
            <div>
                Contracts: {contracts} <br />
                Direct Payments: {directPayments} <br />
                Grants: {grants} <br />
                IDVs: {idvs} <br />
                Loans: {loans} <br />
                Other: {other}
            </div>
        </section>
    );
});

export default AwardTable;
