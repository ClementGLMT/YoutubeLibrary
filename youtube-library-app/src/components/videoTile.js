import React from 'react';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { Icon, Header, Button, Image, Modal, Input, Transition } from 'semantic-ui-react';
import Divider from '@material-ui/core/Divider';
import {store} from '../store';
import {showVideoPlayer, modalAction, updateListReducer} from '../actions';
import 'semantic-ui-css/semantic.min.css';
import './components.css';

const axios = require('axios');





export default class VideoTile extends React.Component {

    constructor(props){
      super(props);

      this.inputName = '';
      this.addVisible= true;
      this.inOutVisible = true;

    }



    openModal(){
      var video = {
        title:  this.props.data.title.concat(this.props.data.subtitle),
        thumbnails: this.props.data.thumbnails,
        id: this.props.data.id
      } 
      console.log('Modal opened by '+JSON.stringify(this.props.data.title.concat(this.props.data.subtitle)));
      store.dispatch(modalAction('open', video));
    }


    handlePlay(){
      this.dispatchShowVideoPlayer({
        title: this.props.data.title.concat(this.props.data.subtitle),
        thumbnails: this.props.data.thumbnails,
        id: this.props.data.id
      });
    }

    handleDelete() {
      var self = this;
      this.inOutVisible = false;
      this.update = true;

      var self = this;
    axios.post('http://localhost:2999/remove', {
      body: {
        user: store.getState().SetUser.user,
        rmid: this.props.data.id
      }
    })
    .then(function(response) {
      console.log(response);
      /*self.dispatchToogleDataLoaded('leftPanel');
      //self.updateLibrary(response.data.videos);
      self.dispatchToogleDataLoaded('leftPanel');*/
      var side;
      if(self.props.side === 'OnLeft')
        side = 'leftPanel';
      
      if(self.props.side === 'OnRight')
        side = 'rightPanel';
      
      self.dispatchUpdateList(side, response.data.videos);
    })
    .catch(function(err) {
      console.log(err);
    })

    }

    handleAdd() {
      var self = this;
      var alreadyIn = false;

      var videos = store.getState().DataLoading.leftPanel.videos;

      for (let i = 0; i < videos.length; i++) {
        if(this.props.data.id === videos[i].id){
          alreadyIn = true;
          break;
        }
      }
      if(alreadyIn)
        alert('Video already in your library !')
      else {

        this.addVisible = !this.addVisible;
        console.log("Title added : "+JSON.stringify(this.props.data));
        axios.post('http://localhost:2999/add', {
            user: store.getState().SetUser.user,
            addid: this.props.data.id,
            addtitle: this.props.data.title.concat(this.props.data.subtitle),
            thumbnails: JSON.stringify(this.props.data.thumbnails)
        })
        .then(function(response) {
          console.log(response);
          var side;
          if(self.props.side === 'OnLeft')
            side = 'leftPanel';
          
          if(self.props.side === 'OnRight')
            side = 'rightPanel';
          
          self.dispatchUpdateList('leftPanel', response.data.videos);
        })
        .catch(function(err) {
          console.log(err);
        })
      }

      
    }

    dispatchUpdateList(panel, videos) {
      store.dispatch(updateListReducer(panel, videos));
  }


    dispatchShowVideoPlayer(video) {

      var lastDisp;
      var actualRightDisp = store.getState().ShowOnRight;
      //console.log("Previous right panel state "+JSON.stringify(actualRightDisp))

      for(var key in actualRightDisp){
        if(actualRightDisp[key])
          actualRightDisp[key] = false;
      }
      actualRightDisp.videoToPlay = video;
     //console.log("LastDisp : "+lastDisp);
     //console.log("Previous right panel state modified "+JSON.stringify(actualRightDisp))
      store.dispatch(showVideoPlayer(actualRightDisp));
    }

      render() {

        var thumbsize;
        if(this.props.side === 'OnLeft')
          thumbsize = 'medium';
        else 
          thumbsize = 'high';

        //console.log('State of tile "'+this.props.data.title.concat(this.props.data.subtitle)+'": '+JSON.stringify(store.getState()));
        //console.log("Rendering tile of "+this.props.data.title.concat(this.props.data.subtitle))

        if(store.getState().ModalReducer.isModalOpen === true){
          //console.log('Opening modal with : '+JSON.stringify(this.props.data));
        }

        console.log("Delete anim visible : "+this.inOutVisible);

        const button = {};


        return(


          <Transition          
            animation='drop'
            duration={500}
            visible={this.inOutVisible}
          >
          <Transition
          animation='pulse'
          duration={500}
          visible={this.addVisible}
        >
          <div>
            <GridListTile  key={this.props.data.id} cols={1} className={this.props.gridTileClass}>
                <img src={this.props.data.thumbnails[thumbsize].url} className={this.props.side} alt={this.props.data.title.concat(this.props.data.subtitle)}/>
                <GridListTileBar title={this.props.data.title} subtitle={this.props.data.subtitle} >
                </GridListTileBar>

                { (this.props.side === 'OnLeft') 
                  ? <div>
                      <Button className='editPopup' icon onClick={() => {this.openModal()}}> <Icon name='edit outline' /></Button>
                      <Button className='deletePopup' icon onClick={() => {this.handleDelete()}}> <Icon name='delete' /></Button>
                      <Button  onClick = {() => {this.handlePlay()}} icon className='videoPlayButton' > 
                        <Icon  size ='huge'  name='youtube play' /> 
                      </Button>
                      <div className='myCenterTriangle'> </div>
                    </div>
                  : <div>
                    <Button className = 'addPopup' icon onClick= {() => {this.handleAdd()}}>
                      <Icon  size = 'big' name='add square' />
                    </Button>
                    <Button  onClick = {() => {this.handlePlay()}} icon className='videoPlayButtonRight' > 
                      <Icon  size ='massive'  name='youtube play' /> 
                    </Button>   
                    <div className='myBigCenterTriangle'> </div>                 
                  </div>
                }
            </GridListTile>
              <Divider />
              </div>
          </Transition>
        </Transition>


        );
      }


}

