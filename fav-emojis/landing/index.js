/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';
import axios from 'axios';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Container, Col, Row, Button } from 'reactstrap';
import './landing.css';
const csv = require('csv-parser');
const fs = require('fs');


class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            emojiName: null,
            engVer: null,
            arabVer: null,
            favCount: 0,
        }
        this.handlefavCount = this.handlefavCount.bind(this);
    }

    //parsing the .csv into json
    parseCSV() {
        fs.createReadStream('emojis.csv')
            .pipe(csv())
            .on('data', (row) => {
                console.log(JSON.stringify(row));
            })
            .on('end', () => {
                console.log('CSV file successfully processed');
            });
    }

    //calling the parser 
    componentDidMount() {
        this.parseCSV();
    }

    //increasing the favourite count
    handlefavCount(){
        var count = this.state.favCount;

        this.setState({
            favCount: count + 1
        });
    }
}








export default Landing;