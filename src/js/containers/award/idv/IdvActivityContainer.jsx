import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isCancel } from 'axios';

import { fetchIdvActivity } from 'helpers/idvHelper';
import IdvActivity from 'components/award/idv/activity/IdvActivity';
import BaseIdvActivityBar from 'models/v2/award/BaseIdvActivityBar';

const propTypes = {
    awardId: PropTypes.string
};

export class IdvActivityContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasNext: false,
            hasPrevious: null,
            limit: 50,
            next: 0,
            page: 1,
            previous: null,
            total: 0,
            awards: [],
            xSeries: [],
            ySeries: [],
            inFlight: true,
            error: false
        };

        this.idvActivityRequest = null;

        this.changePage = this.changePage.bind(this);
        this.selectedItemFunc = this.selectedItemFunc.bind(this);
    }

    async componentDidMount() {
        await this.loadAwards();
    }

    async componentDidUpdate(prevProps) {
        if (prevProps.awardId !== this.props.awardId) {
            await this.loadAwards();
        }
    }

    componentWillUnmount() {
        if (this.idvActivityRequest) {
            this.idvActivityRequest.cancel();
        }
    }

    async loadAwards() {
        if (this.idvActivityRequest) {
            this.idvActivityRequest.cancel();
        }

        const params = {
            award_id: this.props.awardId,
            page: this.state.page,
            hide_edge_cases: true,
            limit: this.state.limit
        };

        this.idvActivityRequest = fetchIdvActivity(params);

        try {
            const { data } = await this.idvActivityRequest.promise;
            this.setState({
                hasNext: data.page_metadata.hasNext,
                hasPrevious: data.page_metadata.hasPrevious,
                limit: data.page_metadata.limit,
                next: data.page_metadata.next,
                page: data.page_metadata.page,
                previous: data.page_metadata.previous,
                total: data.page_metadata.total,
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
        }).filter((award) => award._startDate && award._endDate);
        const startDates = awards.map((award) => award._startDate.valueOf());
        const endDates = awards.map((award) => award._endDate.valueOf());
        const xSeries = startDates.concat(endDates);
        const ySeries = awards.map((award) => award._obligatedAmount);

        this.setState({
            awards,
            xSeries,
            ySeries,
            inFlight: false
        });
    }

    changePage(page) {
        this.setState({
            inFlight: true,
            page
        }, () => this.loadAwards());
    }

    selectedItemFunc(limit) {
        this.setState({
            limit,
            inFlight: true,
            page: 1
        }, () => this.loadAwards());
    }

    render() {
        return (
            <IdvActivity
                {...this.state}
                {...this.props}
                changePage={this.changePage}
                selectedItemFunc={this.selectedItemFunc} />
        );
    }
}

IdvActivityContainer.propTypes = propTypes;

const mapStateToProps = (state) => ({
    awardId: state.award.id
});

export default connect(mapStateToProps, null)(IdvActivityContainer);
