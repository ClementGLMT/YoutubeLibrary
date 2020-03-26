import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import './components.css';
import {store} from '../store';
import {Transition} from 'semantic-ui-react';
import RightSearchResults from './rightSearchResults';
import RightVideoPlayer from './rightVideoPlayer';
import RightWelcome from './rightWelcome';


export default class rightPanel extends React.Component {

  constructor(props) {
    super(props);
    this.visible= false;
    this.update = false;

  }

  componentDidMount(){
    this.visible = !this.visible;
  }

  componentDidUpdate() {
    this.visible = !this.visible;
  }

  /*componentWillUnmount(){
    this.visible = false;
  }*/
    render(){


      var rightState = store.getState().ShowOnRight;
      console.log("Testing right with rightState: "+JSON.stringify(rightState));
      //console.log("Data on right : "+JSON.stringify(store.getState().DataLoading.rightPanel.videos));

      
      if(rightState.rightShowWelcome) {
        return (
          <RightWelcome />
        );
      }
      
      if(rightState.rightShowSearchAndResults) {
        //this.visible = true;
        return (
          <Transition.Group  animation='fade' duration={500}>
            {rightState.rightShowSearchAndResults &&
              <RightSearchResults />
            }            
          </Transition.Group>
        );
      }
      
      if(rightState.rightShowVideo) {
        console.log("Rendering video player");
        return (
          <RightVideoPlayer />
        );
      }


      
    }

};

/*if(rightState.rightShowSearchAndResults) {
  //this.visible = true;
  return (
    <Transition.Group  animation='fade' duration={500}>
      {rightState.rightShowSearchAndResults &&
        <RightSearchResults />
      }            
    </Transition.Group>
  );
}

if(rightState.rightShowVideo) {
  console.log("Rendering video player");
  return (
    <RightVideoPlayer />
  );
}*/