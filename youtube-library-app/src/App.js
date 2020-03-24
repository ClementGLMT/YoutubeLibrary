import React from 'react';
import './App.css';
import LeftPanel from './components/leftPanel';
import RightPanel from './components/rightPanel';
import 'semantic-ui-css/semantic.min.css';
import { store } from "./store";
import {setUser} from './actions';




export default class App extends React.Component {
  
  constructor(props) {
    super(props);
  }



  render(){

    console.log("User in App.js : "+store.getState().SetUser.user);

    /*var offTop = this.header.getBoundingClientRect().top;
    if (window.pageYOffset > offTop) {
      this.header.classList.add("sticky");
    } else {
      this.header.classList.remove("sticky");
    }*/

    return (

      <div className="App"> 

        <header className = "App-header">
          <div>Your Youtube Library</div>
        </header>
    
      <LeftPanel className= "leftPanel" user= {store.getState().SetUser.user}/>
  
      <RightPanel className = "rightPanel" user= {store.getState().SetUser.user}/>

      </div>
  
    );
  }

}
