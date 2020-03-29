import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import './components.css';
import {store} from '../store';
import {Transition} from 'semantic-ui-react';
import {toast, Flip} from 'react-toastify';
import RightSearchResults from './rightSearchResults';
import RightVideoPlayer from './rightVideoPlayer';
import RightWelcome from './rightWelcome';
import {toogleVisible} from '../actions';


export default class rightPanel extends React.Component {

  constructor(props) {
    super(props);
    this.update = false;
    this.ret = [{comp: '', id: 0}];
    //this.rightState = store.getState().ShowOnRight;

    toast.configure({
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      transition: Flip,
      className: 'centerToast'
    });

  }

  /*shouldComponentUpdate() {
    if(store.getState().ShowOnRight.visible) {
      store.dispatch(toogleVisible());
      return true;
    }
    return false;
  }*/

  componentDidMount() {
    this.update = true;
    this.rightState = store.getState().ShowOnRight;
    store.dispatch(toogleVisible());
    //this.visible =! this.visible;
  }
  componentDidUpdate(){
    console.log("Did update right");
    //this.update = false;
   // this.visible =! this.visible;
   //store.dispatch(toogleVisible());
  }

  componentWillUnmount() {
    store.dispatch(toogleVisible());
    console.log("%c Component will unmount called in right Panel", 'color:red')
  }

    render(){


      var rightState = store.getState().ShowOnRight;
      console.log("%c Testing right with rightState: "+JSON.stringify(rightState), 'color: blue');
      //console.log("Data on right : "+JSON.stringify(store.getState().DataLoading.rightPanel.videos));
      //this.visible = true;

      //store.dispatch(toogleVisible());

      if(rightState.rightShowWelcome){
        this.ret[0].comp = <RightWelcome />;
        this.ret[0].id = 1;
      }
      else {
        if(rightState.rightShowSearchAndResults) {
          this.ret[0].comp = <RightSearchResults />;
          this.ret[0].id = 2;
        }
        else {
          if(rightState.rightShowVideo) {
            this.ret[0].comp = <RightVideoPlayer />;
            this.ret[0].id = 3; 
          }
        }
      }

      var video = store.getState().ShowOnRight.videoToPlay;
      console.log("Rendering with visible : "+store.getState().ShowOnRight.visible);
      //console.log("Object : "+this.ret.toString())
        return (
          <Transition.Group  animation='drop' duration={500}>
            {
              rightState.visible &&
              this.ret.map(child => (
                <div key = {child.id} className = 'rightPanel'>
                {child.id === 1 &&
                      <RightWelcome  />
                  }{
                  child.id === 2  &&
                      <RightSearchResults />
                  }
                  {child.id === 3 &&
                      <RightVideoPlayer video={video}/>
                  }
                
                </div>
              ))
          } 
          </Transition.Group>
        );
      }
      
      /*if(rightState.rightShowVideo) {
        console.log("Rendering video player");
        return (
          <div className='rightPanel'>
          <Transition.Group  animation='fade' duration={500}>
            {rightState.rightShowVideo &&
              <RightVideoPlayer />
            }            
          </Transition.Group> 
          </div>    
          );
      }*/


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
}

----------------------------------------------------------


      else {
        return(
          <div className = 'rightPanel'>
          <Transition.Group  animation='zoom' duration={0}>
            {rightState.rightShowSearchAndResults &&
              <RightSearchResults />
            }      
          </Transition.Group>
          <Transition.Group animation='zoom' duration = {0}>
            {rightState.rightShowVideo && 
              <RightVideoPlayer />
            }
          </Transition.Group>
          </div>
        );
      }

*/