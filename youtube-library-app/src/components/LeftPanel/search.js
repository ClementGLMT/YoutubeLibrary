import React from 'react';
import { Button, Icon } from 'semantic-ui-react'
import '../styles/components.css';
import {showSearchAndResultsAction} from '../../actions';
import {store} from '../../store';
import 'semantic-ui-css/semantic.min.css';


export default class Search extends React.Component {


    dispatchShowSearchAndResults() {

        var actualRightDisp = store.getState().RightDisplay;

        for(var key in actualRightDisp){                                  //Find the actual panel displayed and turn it off
          if((actualRightDisp[key] === true) && (key !== 'visible'))
            actualRightDisp[key] = false;
        }

      store.dispatch(showSearchAndResultsAction(actualRightDisp));          //Set state and show search and results
      }

    render() {
        return(

            <Button  onClick = {this.dispatchShowSearchAndResults} animated='fade'>
            <Button.Content visible>
                <Icon name='search' />
            </Button.Content>
            <Button.Content hidden>Search a video on Youtube</Button.Content>
          </Button>
        );
    }

}