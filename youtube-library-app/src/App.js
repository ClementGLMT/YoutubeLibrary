import React from 'react';
import './App.css';
import LeftPanel from './components/leftPanel';
import RightPanel from './components/rightPanel';
import 'semantic-ui-css/semantic.min.css'




export default class App extends React.Component {

    constructor(props) {
    super(props);
    this.state = {
      user: this.getUser()
      }
    }
  

  getUser(){

   var regex = /http:\/\/localhost:3000\/\?user=([\w-]{1,})/;

   var url = window.location.href;
   var user = url.match(regex)[1];
   return user;
  }

  render(){


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
    
      <LeftPanel className= "leftPanel" user= {this.state.user}/>
  
      <RightPanel className = "rightPanel" user= {this.state.user}/>

      </div>
  
    );
  }

}
