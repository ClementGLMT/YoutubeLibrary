import React from 'react';
import VideoList from '../Common/videoList';
import { Header, Image, Modal, Input, Button } from 'semantic-ui-react';
import Search from './search'; 
import '../styles/components.css';
import 'semantic-ui-css/semantic.min.css';
import { store} from '../../store';
import {toast} from 'react-toastify';
import {updateListReducerAction, openCloseModalAction} from '../../actions';
const axios = require('axios');




export default class leftPanel extends React.Component{


      getLibraryContent() {       //Get the user's library 
        var context = this;
        var data = {name: '', videos: []};
        var libraryURL = 'http://localhost:2999/data';    //Get to the API page
        axios.get(libraryURL, {
            params: {
                user: store.getState().User.user,
            }
        })
        .then( function (response) { 
            data = response.data.videos;
            for (let i = 0; i < data.length; i++) {       //Set videos to VideoList Tile format
                data[i]['isParsed'] = false;
                data[i]['subtitle'] = '';
            }
            context.dispatchUpdateList('leftPanel', data);
        })
        .catch((err) => {
            console.log(err);
        })
    }

   componentDidMount(){
        this.getLibraryContent();
    }


    dispatchUpdateList(panel, videos) {                 //Update state with the new list
        store.dispatch(updateListReducerAction(panel, videos));
    }

      closeModal() {
        store.dispatch(openCloseModalAction('close'));
      }

      handlePositiveClick() {                           //handle renaming by clicking on the modal's confirm button 
        var self = this;
        axios.post('http://localhost:2999/rename', {    //Post to the API to apply modifications
            body: {
                videoid: store.getState().Modal.video.id,
                newtitle: this.inputName,
                user: store.getState().User.user
            }
        })
        .then(function(response) {
            self.dispatchUpdateList('leftPanel', response.data.videos); //Set state with new video list
        })
        .catch (function(err) {
            console.log(err);
        })

        this.closeModal();
        toast.success("Video renamed !");
      }

    render(){

            return (
                <div className='leftPanel'>
                    <Header className='libraryName'>
                        <Image size='mini' circular src='https://image.noelshack.com/fichiers/2020/12/4/1584657095-miniytlogo.png' /> {store.getState().User.user}'s library
                    </Header>
                    <Search className='search' style={{ height: '10%', width: '340px', margin: '0 auto' }}/>

                    <VideoList className='videoList' side='OnLeft' data= {store.getState().DataLoading.leftPanel.videos}/>

                    <Modal style = {{marginBottom: '10px'}} dimmer={store.getState().Modal.dimmer} open={store.getState().Modal.isOpen} onClose={this.closeModal} size='small'>
                      <Modal.Header>{store.getState().Modal.video.title}</Modal.Header>
                      <Modal.Content image>
                        <Image
                          wrapped
                          size='medium'
                          src={store.getState().Modal.video.thumbnails.medium.url}
                          className = 'medium'
                        />
                        <Modal.Description>
                          <Header style={{marginLeft: 'auto', marginRight: 'auto'}} >What's the new name of your video ?</Header>
                          <Input onChange={(event,data)=> {this.inputName = data.value}} placeholder='New name' style={{marginTop: '28.375px', marginLeft: '56.55px'}}/>
                        </Modal.Description>
                      </Modal.Content>
                      <Modal.Actions>
                        <Button negative onClick={this.closeModal}>
                          Cancel
                        </Button>
                        <Button
                          positive
                          icon='checkmark'
                          labelPosition='right'
                          content="Confirm"
                          onClick={() => {this.handlePositiveClick();}}
                        />
                      </Modal.Actions>
                    </Modal>
                </div>
            );


    }

};