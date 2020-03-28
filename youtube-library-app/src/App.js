import React from 'react';
import './App.css';
import LeftPanel from './components/leftPanel';
import RightPanel from './components/rightPanel';
import {Header} from 'semantic-ui-react';
import WelcomeRightPanel from './components/welcomeRightPanel';
import {setUser} from './actions'
import 'semantic-ui-css/semantic.min.css';
import { store } from "./store";
import {Link, Route} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';




export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.getUser();
    this.update= false;

  }
  


  

  
  getUser(){

    var regex = /http:\/\/localhost:3000\/library\?user=([\w-]{1,})/;
 
    var url = window.location.href;
    var matches =  url.match(regex);
    if(matches !== null){
      this.dispatchSetUser(url.match(regex)[1]);
      console.log("User got : "+url.match(regex)[1])
    }
    else {
      this.dispatchSetUser('no user');
      console.log("no User got : ")

    }
   }
 
   dispatchSetUser(user) {
     store.dispatch(setUser(user));
     console.log("User dispatch done");
   }

   componentDidMount() {
    this.getUser();
   }


  render(){

    console.log("User in App.js : "+store.getState().SetUser.user);
    var user = store.getState().SetUser.user;
    /*var offTop = this.header.getBoundingClientRect().top;
    if (window.pageYOffset > offTop) {
      this.header.classList.add("sticky");
    } else {
      this.header.classList.remove("sticky");
    }*/

    var links = <h3 className='title2'> Log you in with &nbsp;  
                  <Link  to='/library?user=John'>
                    John &nbsp;
                  </Link>
                    or &nbsp;
                  <Link  to='/library?user=Mark'>
                    Mark
                  </Link>
                </h3>

    if(user === 'no user'){
      return (
        <div className="App">

        <Header className='App-header'>
          Your Youtube library
        </Header>

        <WelcomeRightPanel links={links}/>

      </div>
      );
    }

    return (

      <div className="App">


        <Header className='App-header'>
          Your Youtube library
        </Header>

        <LeftPanel className= "leftPanel" user= {user}/>
  
      <RightPanel className = "rightPanel" user= {user}/>

      </div>
  
    );
  }

}
