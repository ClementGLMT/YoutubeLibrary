import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import '../styles/components.css';
import {store} from '../../store';
import {Transition} from 'semantic-ui-react';
import {toast, Flip} from 'react-toastify';
import RightSearchResults from './rightSearchResults';
import RightVideoPlayer from './rightVideoPlayer';
import RightWelcome from './rightWelcome';
import {toggleVisibleAction} from '../../actions';


export default class rightPanel extends React.Component {

  constructor(props) {
    super(props);
    this.ret = [{comp: '', id: 0}];

    toast.configure({               //Configure toast
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


  componentDidMount() {
    store.dispatch(toggleVisibleAction());      //Toogle visibility of transition 
  }


  componentWillUnmount() {
    store.dispatch(toggleVisibleAction());      //Toogle visibility of transition
  }

    render(){


      var rightState = store.getState().RightDisplay;

      //Conditionnal rendering of right panel

      if(rightState.showWelcome){                     //Show welcome panel
        this.ret[0].comp = <RightWelcome />;
        this.ret[0].id = 1;
      }
      else {
        if(rightState.showSearchAndResults) {         //Show search and results panel
          this.ret[0].comp = <RightSearchResults />;
          this.ret[0].id = 2;
        }
        else {
          if(rightState.showVideo) {                  //Show embed video player panel
            this.ret[0].comp = <RightVideoPlayer />;
            this.ret[0].id = 3; 
          }
        }
      }

      var video = store.getState().RightDisplay.videoToPlay;

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
};
