import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isCancel } from 'axios';

import { fetchIdvActivity } from 'helpers/idvHelper';
import IdvActivity from 'components/awardv2/idv/activity/IdvActivity';
import BaseIdvActivityBar from 'models/v2/awardsV2/BaseIdvActivityBar';

const propTypes = {
    awardId: PropTypes.string
};

export class IdvActivityContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            count: 0,
            awards: [],
            inFlight: true,
            error: false
        };

        this.idvActivityRequest = null;

        this.changePage = this.changePage.bind(this);
    }

    async componentDidMount() {
        await this.loadAwards();
    }

    async componentDidUpdate(prevProps) {
        if (prevProps.awardId !== this.props.awardId) {
            await this.loadAwards();
        }
    }

    async loadAwards() {
        if (this.idvActivityRequest) {
            this.idvActivityRequest.cancel();
        }

        const params = {
            award_id: this.props.awardId,
            page: this.state.page
        };

        this.idvActivityRequest = fetchIdvActivity(params);

        try {
            const { data } = await this.idvActivityRequest.promise;
            this.setState({
                page: data.page_metadata.page,
                count: data.page_metadata.count,
                error: false
            }, () => this.parseAwards(data.results));
        }
        catch (error) {
            if (!isCancel(error)) {
                this.setState({
                    error: true,
                    inFlight: false
                });
                console.log(error);
            }
        }
    }

    parseAwards(results) {
        const awards = results.map((award) => {
            const idvActivityBar = Object.create(BaseIdvActivityBar);
            idvActivityBar.populate(award);
            return idvActivityBar;
        });
        this.setState({
            awards,
            inFlight: false
        });
    }

    changePage(page) {
        this.setState({
            page
        }, () => this.loadAwards());
    }

    render() {
        return (
            <IdvActivity
                {...this.state}
                changePage={this.changePage} />
        );
    }
}

IdvActivityContainer.propTypes = propTypes;

const mapStateToProps = (state) => ({
    awardId: state.awardV2.id
});

export default connect(mapStateToProps, null)(IdvActivityContainer);
