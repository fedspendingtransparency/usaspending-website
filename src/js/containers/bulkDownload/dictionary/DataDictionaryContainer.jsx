/**
 * DataDictionaryContainer.jsx
 * Created by Lizzie Salita 8/31/18
 */

import React from 'react';

import * as BulkDownloadHelper from 'helpers/bulkDownloadHelper';
import DataDictionary from "../../../components/bulkDownload/dictionary/DataDictionary";


export default class DataDictionaryContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inFlight: true,
            error: false,
            sections: [],
            columns: [],
            rows: []
        };

        this.request = null;

        this.loadContent = this.loadContent.bind(this);
    }

    componentDidMount() {
        this.loadContent();
    }

    loadContent() {
        this.setState({
            inFlight: true
        });

        if (this.request) {
            this.request.cancel();
        }

        // perform the API request
        this.request = BulkDownloadHelper.requestDictionaryContent();

        this.request.promise
            .then((res) => {
                const content = res.data;
                this.setState({
                    sections: content.sections,
                    columns: content.columns,
                    rows: content.rows,
                    inFlight: false,
                    error: false
                });
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    inFlight: false,
                    error: true
                });
                this.request = null;
            });
    }
    render() {
        return (
            <DataDictionary
                sections={this.state.sections}
                columns={this.state.columns}
                rows={this.state.rows} />
        );
    }
}
