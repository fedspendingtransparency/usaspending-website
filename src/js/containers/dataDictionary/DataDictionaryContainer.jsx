/**
 * DataDictionaryContainer.jsx
 * Created by Lizzie Salita 8/31/18
 */

import React from 'react';
import DataDictionary from 'components/dataDictionary/DataDictionary';
import { fetchDataDictionary } from 'apis/dataDictionary';

export default class DataDictionaryContainer extends React.Component {
    constructor(props) {
        super(props);

        this.request = null;
        this.state = {
            inFlight: true,
            error: false,
            sections: [],
            columns: [],
            rows: [],
            downloadLocation: '',
            sort: {
                field: '',
                direction: ''
            },
            searchTerm: ''
        };
    }

    componentDidMount() {
        this.loadContent();
    }

    setSearchString = (searchTerm) => {
        this.setState({
            searchTerm
        });
    };

    loadContent = () => {
        this.setState({
            inFlight: true
        });

        if (this.request) {
            this.request.cancel();
        }

        this.request = fetchDataDictionary();
        this.request.promise
            .then((res) => {
                const content = res.data.document;
                this.setState({
                    sections: content.sections,
                    columns: content.headers,
                    downloadLocation: content.metadata.download_location,
                    inFlight: false,
                    error: false
                }, () => this.parseRows(content.rows));
            })
            .catch((err) => {
                console.error(err);
                this.setState({
                    inFlight: false,
                    error: true
                });
                this.request = null;
            });
    };

    parseRows(rows) {
    // replace nulls with 'N/A'
        const parsedRows = rows.map((row) => row.map((data) => data || 'N/A'));

        this.setState({
            rows: parsedRows
        }, () => {
            this.defaultSort();
        });
    }

    defaultSort() {
        if (this.state.columns.length > 0) {
            this.changeSort(this.state.columns[0].raw, 'asc');
        }
    }

    changeSort = (field, direction) => {
    // Get the index of the column we are sorting by
        const index = this.state.columns.findIndex((col) => col.raw === field);

        let rows;
        if (direction === 'desc') {
            rows = this.state.rows.sort((a, b) => b[index].localeCompare(a[index]));
        }
        else {
            rows = this.state.rows.sort((a, b) => a[index].localeCompare(b[index]));
        }

        // Update the state
        this.setState({
            rows,
            sort: {
                field,
                direction
            }
        });
    };

    render = () => (
        <DataDictionary
            {...this.state}
            changeSort={this.changeSort}
            setSearchString={this.setSearchString}
            searchTerm={this.state.searchTerm} />
    );
}
