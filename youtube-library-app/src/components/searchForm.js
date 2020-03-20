import React from 'react';
import options from './maxresults';
import { Form } from 'semantic-ui-react'



export default class searchForm extends React.Component {

    submitSearch(){

    }

    render() {

        return(

            <Form /*onSubmit={this.submitSearch}*/>
                <Form.Group widths='equal'>
                    <Form.Input fluid label='Your search' placeholder='Search...' />
                    <Form.Select
                        fluid
                        label='How many results ?'
                        options={options}
                        placeholder='How many results ?'
                    />
                </Form.Group>
                <Form.Button>Search</Form.Button>
            </Form>
        );
    }



}