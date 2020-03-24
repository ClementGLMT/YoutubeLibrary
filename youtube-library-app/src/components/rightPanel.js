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
    this.state = {
      user: this.props.user,
      isDataLoaded: 0,
    }
  }

    render(){
      console.log("Rendering right panel with isDataLoaded: "+this.state.isDataLoaded);


      var rightState = store.getState().ShowOnRight;

      console.log("Testing with rightState: "+JSON.stringify(rightState))

      
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