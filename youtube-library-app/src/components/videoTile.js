import React from 'react';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { Icon, Button, Transition } from 'semantic-ui-react';
import Divider from '@material-ui/core/Divider';
import {store} from '../store';
import {showVideoPlayer, modalAction, updateListReducer, toogleVisible} from '../actions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'semantic-ui-css/semantic.min.css';
import './components.css';

const axios = require('axios');





export default class VideoTile extends React.Component {

    constructor(props){
      super(props);

      this.inputName = '';
      this.visible= true;
      this.animation = ''
      this.update = false;

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
      console.log("Dispatching video title : "+this.props.data.title.concat(this.props.data.subtitle));
      store.dispatch(toogleVisible())
      this.dispatchShowVideoPlayer({
        title: this.props.data.title.concat(this.props.data.subtitle),
        thumbnails: this.props.data.thumbnails,
        id: this.props.data.id
      });
    }

    handleDelete() {
      var self = this;
      this.animation = 'drop';
      this.visible = !this.visible;
    axios.post('http://localhost:2999/remove', {
      body: {
        user: store.getState().SetUser.user,
        rmid: this.props.data.id
      }
    })
    .then(function(response) {
      console.log(response);
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

    //this.updatethis.update = true;
    toast.success("Video removed from your library !");

    }

    handleAdd() {
      var self = this;
      var alreadyIn = false;
      console.log("In Handle add");
      var videos = store.getState().DataLoading.leftPanel.videos;
      console.log("In Handle add2");

      for (let i = 0; i < videos.length; i++) {
        if(this.props.data.id === videos[i].id){
          alreadyIn = true;
          break;
        }
      }
      if(alreadyIn){
        this.animation = 'shake';
        this.visible = !this.visible;
        toast.error("Video already in library !");        
        this.dispatchUpdateList('leftPanel', videos);
      }
      else {

        this.animation = 'pulse';
        this.visible = !this.visible;
        console.log("Heho");

        toast.success("Video added to library !")
        console.log("Heho2");
        console.log("Title added : "+JSON.stringify(this.props.data));
        axios.post('http://localhost:2999/add', {
            user: store.getState().SetUser.user,
            addid: this.props.data.id,
            addtitle: this.props.data.title.concat(this.props.data.subtitle),
            thumbnails: JSON.stringify(this.props.data.thumbnails)
        })
        .then(function(response) {
          var disp = {
            videos: response.data.videos,
          }
          console.log("Heho3");

          /*for (let i = 0; i < videos.length; i++) {
            disp.videos[i]['subtitle']  =self.props.data.subtitle;
            disp.videos[i]['isParsed'] = false;
            
          }*/
          console.log("giving to reducer : "+JSON.stringify(disp));
          self.dispatchUpdateList('leftPanel', response.data.videos);
        })
        .catch(function(err) {
          console.log(err);
        })
      }

      //this.update = true;
      //console.log("Update asked");
    }

    dispatchUpdateList(panel, videos) {
      store.dispatch(updateListReducer(panel, videos));
  }

  /*shouldComponentUpdate() {
    return this.update;
  }*/

  componentDidUpdate() {
    console.log("Updating tile of "+this.props.data.title.concat(this.props.data.subtitle))
    //this.visible = !this.visible;

  }


    dispatchShowVideoPlayer(video) {

      var actualRightDisp = store.getState().ShowOnRight;
      //console.log("Previous right panel state "+JSON.stringify(actualRightDisp))

      for(var key in actualRightDisp){
        if(actualRightDisp[key])
          actualRightDisp[key] = false;
      }
      actualRightDisp.videoToPlay = video;
      store.dispatch(toogleVisible());

     //console.log("LastDisp : "+lastDisp);
     //console.log("Previous right panel state modified in before dispatching SHOW VIDEO PLAYER"+JSON.stringify(actualRightDisp))
      store.dispatch(showVideoPlayer(actualRightDisp));
    }

      render() {

        var thumbsize;
        if(this.props.side === 'OnLeft')
          thumbsize = 'medium';
        else 
          thumbsize = 'high';

        //console.log('State of tile "'+this.props.data.title.concat(this.props.data.subtitle)+'": '+JSON.stringify(store.getState()));

        if(store.getState().ModalReducer.isModalOpen === true){
          //console.log('Opening modal with : '+JSON.stringify(this.props.data));
        }

        //console.log("Delete anim visible : "+this.inOutVisible);

        console.log("Rendering tile of "+this.props.data.title.concat(this.props.data.subtitle))

        var buttons = <div />;

        if(this.props.side === 'OnLeft') {
          buttons = <div>
                      <Button className='editPopup' icon onClick={() => {this.openModal()}}> <Icon name='edit outline' /></Button>
                      <Button className='deletePopup' icon onClick={() => {this.handleDelete()}}> <Icon name='delete' /></Button>
                      <Button  onClick = {() => {this.handlePlay()}} icon className='videoPlayButton' > 
                        <Icon  size ='huge'  name='youtube play' /> 
                      </Button>
                      <div className='myCenterTriangle'> </div>
                    </div>
        }

        else {
          buttons = <div>
                      <Button className = 'addPopup' icon onClick= {() => {this.handleAdd()}}>
                        <Icon  size = 'big' name='add square' />
                      </Button>
                      <Button  onClick = {() => {this.handlePlay()}} icon className='videoPlayButtonRight' > 
                        <Icon  size ='massive'  name='youtube play' /> 
                      </Button>   
                      <div className='myBigCenterTriangle'> </div>                 
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
                <GridListTileBar title={this.props.data.title} subtitle={this.props.data.subtitle} >
                </GridListTileBar>

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

