import React from 'react';
import VideoList from './videolist';
import 'semantic-ui-css/semantic.min.css';
import SearchForm from './searchForm';
import './rightPanel.css'


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
        return (

          <div className='rightPanel'>
            <SearchForm />

            <VideoList side='right' user={this.state.user} isDataLoaded={this.state.isDataLoaded}/>
          </div>


    );
    }

};