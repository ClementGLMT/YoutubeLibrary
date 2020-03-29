import React from 'react';
import options from './maxResultsOptions';
import { Form } from 'semantic-ui-react';
import '../styles/components.css';
import {resultsFetchDataAction, isSearchingAction} from '../../actions';
import { store } from '../../store';





export default class searchForm extends React.Component {

    constructor(props){
        super(props);
        this.inputSearch = '';
        this.maxRes = 0;
        this.data= [];
    }

    handleSubmit(){                                                 //Submit user's search and number of results asked to our server 
        var self = this;
        store.dispatch(isSearchingAction(true, this.maxRes));
        var action= resultsFetchDataAction('http://localhost:2999/search', {
                maxResults: self.maxRes,
                keyword: self.inputSearch
        });
        action();
    }


    componentWillUnmount() {
        store.dispatch(isSearchingAction(false));
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