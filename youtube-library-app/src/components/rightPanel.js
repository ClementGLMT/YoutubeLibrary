import React from 'react';
import VideoList from './videolist';
import 'semantic-ui-css/semantic.min.css';
import SearchForm from './searchForm';
import './components.css';
import VideoPlayer from './videoPlayer';
import { Header } from 'semantic-ui-react';


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
      var VideoName = 'Okonami no suzuki';
      
        return (

          <div className='rightPanel'>
          <SearchForm className='searchForm'/>

            <VideoList side='right' user={this.state.user} isDataLoaded={this.state.isDataLoaded}/>
          </div>


    );
      
    /*
    return (
      <div className='rightPanel'>
          <div className='videoContainer'>
              <Header > {VideoName} </Header>
              <VideoPlayer className = 'videoPlayer' url='https://www.youtube.com/watch?v=txkzJVZhVYc' thumburl='https://image.noelshack.com/fichiers/2020/12/5/1584732752-yagami-light.jpg'/>
          </div>
      </div>


    );*/
    }

};