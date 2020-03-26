import React from 'react';
import options from './maxresults';
import { Form } from 'semantic-ui-react';
import './components.css';
import {updateListReducer, resultsFetchData, isSearching} from '../actions';
import { store } from '../store';

const axios = require('axios');




export default class searchForm extends React.Component {

    constructor(props){
        super(props);
        this.inputSearch = '';
        this.maxRes = 0;
        this.data= [];
    }

    handleSubmit(){
        var self = this;
        store.dispatch(isSearching(true, this.maxRes));
        //var data;
        var action= resultsFetchData('http://localhost:2999/search', {
                maxResults: self.maxRes,
                keyword: self.inputSearch
        });
        console.log("ACTION :"+action);
        action();
       /* store.dispatch(resultsFetchData('http://localhost:2999/search', {
            body: {
                maxResults: self.maxRes,
                keyword: self.inputSearch
            }
        }));*/
        //console.log("Submitting search: search = "+this.inputSearch+" max = "+this.maxRes);
        /*axios.post('http://localhost:2999/search', {
            maxResults: self.maxRes,
            keyword: self.inputSearch
        })
        .then(function(response) {
            console.log(JSON.stringify(response.data));
            self.data = response.data;
            self.dispatchUpdateList('righPanel', self.data);
        })
        .catch(function(err) {
            console.log(err);
        })*/


    }

    componentDidMount(){
        console.log("Dispatching data in component did mount: "+JSON.stringify(this.data));

    }

    dispatchUpdateList(panel, videos){
        if(this.data !== []) {
            store.dispatch(updateListReducer(panel, videos));
        }
    }

    componentWillUnmount() {
        store.dispatch(isSearching(false));
    }

    render() {



        return(

            <Form onSubmit={() => {this.handleSubmit()}}>
                <Form.Group widths='equal'>
                    <Form.Input fluid onChange={(event, data) => {this.inputSearch = data.value}} label='Your search' placeholder='Search...' />
                    <Form.Select
                        fluid
                        label='How many results ?'
                        options={options}
                        placeholder='How many results ?'
                        onChange={(event, data) => {this.maxRes = data.value}}
                    />
                </Form.Group>
                <Form.Button>Search</Form.Button>
            </Form>
        );
    }



}