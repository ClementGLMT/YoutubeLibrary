import React from 'react';
import VideoList from './videolist';
import { Header, Image } from 'semantic-ui-react';
import Search from './search'; 
import './components.css';
import 'semantic-ui-css/semantic.min.css';
import { store} from '../store';
import {toogleIsDataLoaded} from '../actions';
const axios = require('axios');




export default class leftPanel extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
          user: this.props.user,
          isDataLoaded: 0,
        }
        this.data = {name: '', videos: []};
      }

      getLibraryContent() {
        var context = this;
        var data = {name: '', videos: []};
        var libraryURL = 'http://localhost:2999/data';
        console.log(this.state.user);
        axios.get(libraryURL, {
            params: {
                user: this.state.user,
            }
        })
        .then( function (response) { 
            data = response.data;
            context.data = data;
            context.dispatchDataLoaded('leftPanel');
            console.log("Data got : "+JSON.stringify(context.data));
            console.log("isDataLoaded : "+context.state.isDataLoaded);
            return data;
        })
        .catch((err) => {
            console.log(err);
        })
    }

    componentDidMount(){
        var data = this.getLibraryContent();
        if(data !== undefined)
            this.data= data;
    }

    dispatchDataLoaded(panel) {
        store.dispatch(toogleIsDataLoaded(panel));
      }


    

    render(){
        console.log("In render (left): "+JSON.stringify(this.state.data));
        console.log("User in left Panel : "+this.props.user)
        console.log("Rendering left panel with isDataLoaded: "+this.state.isDataLoaded);




            return (
                <div className='leftPanel'>
                    <Header className='libraryName'>
                        <Image size='mini' circular src='https://image.noelshack.com/fichiers/2020/12/4/1584657095-miniytlogo.png' /> Your library
                    </Header>
                    <Search className='search' style={{ height: '10%', width: '340px', margin: '0 auto' }}/>

                    <VideoList className='videoList' side='OnLeft' user={this.props.user} data= {this.data.videos} isDataLoaded={store.getState().DataLoading.isLeftDataLoaded}/>
                </div>
            );


    }

};