import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import './components.css';
import {store} from '../store';
import RightSearchResults from './rightSearchResults';
import RightVideoPlayer from './rightVideoPlayer';
import RightWelcome from './rightWelcome';


export default class rightPanel extends React.Component {

  constructor(props) {
    super(props);

  }

    render(){


      var rightState = store.getState().ShowOnRight;

      //console.log("Testing with rightState: "+JSON.stringify(rightState));
      //console.log("Data on right : "+JSON.stringify(store.getState().DataLoading.rightPanel.videos));

      
      if(rightState.rightShowWelcome) {
        return (
          <RightWelcome />
        );
      }

      if(rightState.rightShowSearchAndResults) {
        return (
          <RightSearchResults data = {store.getState().DataLoading.rightPanel.videos}/>
        );
      }

      if(rightState.rightShowVideo) {
        console.log("Rendering video player");
        return (
          <RightVideoPlayer />
        );
      }

      return (
        <div>

        </div>
      );



      
    }

};