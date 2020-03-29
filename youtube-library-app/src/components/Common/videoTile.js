import React from 'react';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { Icon, Button, Transition } from 'semantic-ui-react';
import Divider from '@material-ui/core/Divider';
import {store} from '../../store';
import {showVideoPlayerAction, openCloseModalAction, updateListReducerAction, toggleVisibleAction} from '../../actions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'semantic-ui-css/semantic.min.css';
import '../styles/components.css';

const axios = require('axios');





export default class VideoTile extends React.Component {

    constructor(props){
      super(props);

      this.inputName = '';
      this.visible= true;
      this.animation = ''
    }

    openModal(){                                  //Ask for the opening of the renaming modal with the tile info
      var video = {
        title:  this.props.data.title.concat(this.props.data.subtitle),
        thumbnails: this.props.data.thumbnails,
        id: this.props.data.id
      } 
      store.dispatch(openCloseModalAction('open', video));
    }


    handlePlay(){                                 //Ask for the opening of the embed video player with the tile info
      store.dispatch(toggleVisibleAction())
      this.dispatchShowVideoPlayer({
        title: this.props.data.title.concat(this.props.data.subtitle),
        thumbnails: this.props.data.thumbnails,
        id: this.props.data.id
      });
    }

    handleDelete() {                              //Delete the video from the library
      var self = this;
      this.animation = 'drop';
      this.visible = !this.visible;
    axios.post('http://localhost:2999/remove', {  //Post on the server with info about the video to delete
      body: {
        user: store.getState().User.user,
        rmid: this.props.data.id
      }
    })
    .then(function(response) {
      var side;
      if(self.props.side === 'OnLeft')
        side = 'leftPanel';
      
      if(self.props.side === 'OnRight')
        side = 'rightPanel';
      
      self.dispatchUpdateList(side, response.data.videos);    //Update Library video list with new video list got from server
    })
    .catch(function(err) {
      console.log(err);
    })

    toast.success("Video removed from your library !");

    }

    handleAdd() {                                         //Add the video to the library
      var self = this;
      var alreadyIn = false;
      var videos = store.getState().DataLoading.leftPanel.videos;

      for (let i = 0; i < videos.length; i++) {
        if(this.props.data.id === videos[i].id){
          alreadyIn = true;
          break;
        }
      }
      if(alreadyIn){                                      //Display an error animation and an error toast if the video is already in the library
        this.animation = 'shake';
        this.visible = !this.visible;
        toast.error("Video already in library !");        
        this.dispatchUpdateList('leftPanel', videos);
      }
      else {                                              //Else add the video to the library 

        this.animation = 'pulse';
        this.visible = !this.visible;

        toast.success("Video added to library !")
        axios.post('http://localhost:2999/add', {         //Post on the server to update the library by adding the video
            user: store.getState().User.user,
            addid: this.props.data.id,
            addtitle: this.props.data.title.concat(this.props.data.subtitle),
            thumbnails: JSON.stringify(this.props.data.thumbnails)
        })
        .then(function(response) {
          self.dispatchUpdateList('leftPanel', response.data.videos);   //Then update state with the new video list
        })
        .catch(function(err) {
          console.log(err);
        })
      }
    }

    dispatchUpdateList(panel, videos) {
      store.dispatch(updateListReducerAction(panel, videos));
  }

    dispatchShowVideoPlayer(video) {                          //Set state to show the emebd player of this video 

      var actualRightDisp = store.getState().RightDisplay;

      for(var key in actualRightDisp){                        //Find actual display on right panel and turn it off
        if(actualRightDisp[key])
          actualRightDisp[key] = false;
      }
      actualRightDisp.videoToPlay = video;
      store.dispatch(toggleVisibleAction());
      store.dispatch(showVideoPlayerAction(actualRightDisp));
    }

      render() {

        var thumbsize;
        if(this.props.side === 'OnLeft')
          thumbsize = 'medium';
        else 
          thumbsize = 'high';

        var buttons = <div />;

        if(this.props.side === 'OnLeft') {                              //Load buttons and info bar to display on the VideoTile (Library list: Rename, Remove and Play buttons)
          buttons =
            <div>
              <GridListTileBar title={this.props.data.title} subtitle={this.props.data.subtitle}  />
              <Button className='editPopup' icon onClick={() => {this.openModal()}}> 
                <Icon name='edit' />
              </Button>
              <Button className='deletePopup' icon onClick={() => {this.handleDelete()}}> 
                <Icon name='delete' />
              </Button>
              <Button  onClick = {() => {this.handlePlay()}} icon className='videoPlayButton' > 
                <Icon  size ='huge'  name='youtube play' /> 
              </Button>
              <div className='myCenterTriangle' />
            </div>
        }

        else {                                                            
          buttons =                                                     //Load buttons and info bar to display on the VideoTile (Results list: Add and Play buttons)
            <div>
              <GridListTileBar title={this.props.data.title} subtitle={this.props.data.subtitle}  />
              <Button className = 'addPopup' icon onClick= {() => {this.handleAdd()}}>
                <Icon  size = 'big' name='add' />
              </Button>
              <Button  onClick = {() => {this.handlePlay()}} icon className='videoPlayButtonRight' > 
                <Icon  size ='massive'  name='youtube play' /> 
              </Button>   
              <div className='myBigCenterTriangle'/>                 
            </div>
        }

        return(

          <Transition 
          animation={this.animation}
          duration={500}
          visible={this.visible}
          >
            <div className={'tileContainer'+this.props.side}>
              <GridListTile  key={this.props.data.id} cols={1} className={this.props.gridTileClass}>
                <img src={this.props.data.thumbnails[thumbsize].url} className={this.props.side} alt={this.props.data.title.concat(this.props.data.subtitle)}/>
                { (this.props.side === 'OnLeft' || ((this.props.side === 'OnRight') && (!store.getState().DataLoading.rightPanel.isLoading)) ) &&
                  buttons
                }
              </GridListTile>
              <Divider />
            </div>
          </Transition>
        );
      }


}

