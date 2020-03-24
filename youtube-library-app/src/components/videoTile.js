import React from 'react';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { Icon, Header, Button, Image, Modal, Input } from 'semantic-ui-react';
import {store} from '../store';
import {showVideoPlayer, modalAction, updateListReducer} from '../actions';
import 'semantic-ui-css/semantic.min.css';
import './components.css';

const axios = require('axios');





export default class VideoTile extends React.Component {

    constructor(props){
      super(props);

      this.inputName = '';

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
      this.dispatchShowVideoPlayer();
    }

    handleDelete() {
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

    dispatchUpdateList(panel, videos) {
      store.dispatch(updateListReducer(panel, videos));
  }



    dispatchShowVideoPlayer() {

      var lastDisp;
      var actualRightDisp = store.getState().ShowOnRight;
      //console.log("Previous right panel state "+JSON.stringify(actualRightDisp))
      for(var k in actualRightDisp) {
        if(actualRightDisp[k] === 1)
          lastDisp = k ;
     }
     //console.log("LastDisp : "+lastDisp);
     //console.log("Previous right panel state modified "+JSON.stringify(actualRightDisp))
      store.dispatch(showVideoPlayer(lastDisp));
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


        return(

          <div>
            <GridListTile  key={this.props.data.id} cols={1} className={this.props.gridTileClass}>
                <img src={this.props.data.thumbnails[thumbsize].url} className={this.props.side} alt={this.props.data.title.concat(this.props.data.subtitle)}/>
                <GridListTileBar title={this.props.data.title} subtitle={this.props.data.subtitle} >
                </GridListTileBar>

                { (this.props.side === 'OnLeft') &&
                <div>
                  <Button className='editPopup' icon onClick={() => {this.openModal()}}> <Icon name='edit outline' /></Button>
                  <Button className='deletePopup' icon onClick={() => {this.handleDelete()}}> <Icon name='delete' /></Button>
                  <Button  onClick = {() => {this.handlePlay()}} icon className='videoPlayButton' > 
                     <Icon  size ='huge'  name='youtube play' /> 
                   </Button>
                    <div className='myCenterTriangle'> </div>
                    </div>
                }


            </GridListTile>
              
            </div>

        );
      }


}

