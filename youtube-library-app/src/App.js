import React from 'react';
import './App.css';
import LeftPanel from './components/LeftPanel/leftPanel';
import RightPanel from './components/RightPanel/rightPanel';
import {Header} from 'semantic-ui-react';
import WelcomeRightPanel from './components/RightPanel/welcomeRightPanel';
import {setUserAction, showWelcomePanelAction} from './actions'
import 'semantic-ui-css/semantic.min.css';
import { store } from "./store";
import {Link} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';




export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.getUser();
    //this.dispatchShowWelcome();
  }
  
  getUser(){

    var regex = /http:\/\/localhost:3000\/library\?user=([\w-]{1,})/;
 
    var url = window.location.href;
    var matches =  url.match(regex);
    if(matches !== null){
      this.dispatchUser(url.match(regex)[1]);
      this.dispatchShowWelcome();
    }
    else {
      this.dispatchUser('no user');
    }
  }
 
  dispatchUser(user) {
     store.dispatch(setUserAction(user));
  }

   componentDidMount() {
    this.getUser();
    this.dispatchShowWelcome();
   }

   dispatchShowWelcome() {

    var actualRightDisp = store.getState().RightDisplay;

    for(var key in actualRightDisp){                        //Find actual display on right panel and turn it off
      if(actualRightDisp[key]  && (key !== 'visible'))
        actualRightDisp[key] = false;
    }
    //store.dispatch(toggleVisibleAction());
    store.dispatch(showWelcomePanelAction(actualRightDisp));
   }




  render(){

    var user = store.getState().User.user;
    var links = 
      <h3 className='title2'> Log you in with &nbsp;  
        <Link to='/library?user=John'>
          John &nbsp;
        </Link>
        or &nbsp;
        <Link to='/library?user=Mark'>
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
