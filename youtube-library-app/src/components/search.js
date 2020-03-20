import React from 'react';
import { Button, Icon } from 'semantic-ui-react'

import 'semantic-ui-css/semantic.min.css'



export default class Search extends React.Component {


    render() {
        return(

            <Button animated='fade'>
            <Button.Content visible>
                <Icon name='search' />
            </Button.Content>
            <Button.Content hidden>Search a video on Youtube</Button.Content>
          </Button>
        );
    }

}