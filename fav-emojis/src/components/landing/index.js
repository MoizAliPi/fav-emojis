/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';
import { MDBDataTable } from 'mdbreact';
import './landing.css';
import uuid from 'uuid';
import Papa from 'papaparse';


import { SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION } from 'constants';

class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: uuid.v4(),
            emojis: []
        }
        this.handlefavCount = this.handlefavCount.bind(this);
        this.getData = this.getData.bind(this);
    }

    //fetching the csv file
    async fetchCsv() {
        const response = await fetch('emojis.csv');
        let reader = response.body.getReader();
        let decoder = new TextDecoder('utf-8');
        const result = await reader.read();
        return decoder.decode(result.value);
    }

    //getting the parsed data
    getData(res) {
        var arr = [];
        Object.keys(res).forEach(function (key) {
            arr.push(res[key]);
        });
        console.log(arr);
        this.setState({
            emojis: arr
        });
    }

    //calling the parsing function
    componentWillMount() {
        this.getCSVData();
    }


    async getCSVData() {
        let csvData = await this.fetchCsv();

        Papa.parse(csvData, {
            complete: this.getData
        });
    }

    //increasing the favourite count
    handlefavCount() {
        var count = this.state.favCount;

        this.setState({
            favCount: count + 1
        });
    }

    render() {
        const data = {
            columns: [
                {
                    label: 'No.',
                    field: 'number',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Emoji',
                    field: 'emoji',
                    sort: 'asc',
                    width: 270
                },
                {
                    label: 'Description',
                    field: 'desc',
                    sort: 'asc',
                    width: 200
                },
                {
                    label: 'Favourite',
                    field: 'fav',
                    sort: 'asc',
                    width: 100
                }
            ],
            rows: this.state.emojis
        };

        return (
            <MDBDataTable
                striped
                bordered
                data={data}
            />
        );
    }
}

export default Landing;