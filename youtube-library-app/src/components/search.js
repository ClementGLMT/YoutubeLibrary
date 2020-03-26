import React from 'react';
import { Button, Icon } from 'semantic-ui-react'
import './components.css';
import {showSearchAndResults} from '../actions';
import {store} from '../store';
import 'semantic-ui-css/semantic.min.css';



import 'semantic-ui-css/semantic.min.css'



export default class Search extends React.Component {


    dispatchShowSearchAndResults() {
        var lastDisp;
        var actualRightDisp = store.getState().ShowOnRight;
        console.log("Previous right panel state "+JSON.stringify(actualRightDisp))

        for(var key in actualRightDisp){
          if(actualRightDisp[key] === true)
            lastDisp = key;
        }
        
       console.log("LastDisp : "+lastDisp);
       //console.log("Previous right panel state modified "+JSON.stringify(actualRightDisp))
      store.dispatch(showSearchAndResults(lastDisp));
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