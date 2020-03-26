import React from 'react';
import VideoList from './videolist';
import { Header, Image, Modal, Input, Button } from 'semantic-ui-react';
import Search from './search'; 
import './components.css';
import 'semantic-ui-css/semantic.min.css';
import { store} from '../store';
import {updateListReducer, setUser, modalAction} from '../actions';
const axios = require('axios');




export default class leftPanel extends React.Component{

    constructor(props) {
        super(props);
        this.data = {name: '', videos: []};
        this.getUser();
      }

      getLibraryContent() {
        var context = this;
        var data = {name: '', videos: []};
        var libraryURL = 'http://localhost:2999/data';
        //console.log(store.getState().SetUser.user);
        axios.get(libraryURL, {
            params: {
                user: store.getState().SetUser.user,
            }
        })
        .then( function (response) { 
            data = response.data.videos;
            //console.log("Received from server: "+JSON.stringify(data));
            for (let i = 0; i < data.length; i++) {
                data[i]['isParsed'] = false;
                data[i]['subtitle'] = '';
                
            }
            context.data = data;
            //console.log("Receiving response from server"+JSON.stringify(context.data));
            context.dispatchUpdateList('leftPanel', data);
            //return data;
        })
        .catch((err) => {
            console.log(err);
        })
    }

    updateLibrary(data) {
        this.data = data;
    }

   componentDidMount(){
        this.getLibraryContent();
    }


    dispatchUpdateList(panel, videos) {
        store.dispatch(updateListReducer(panel, videos));
    }



      closeModal() {
        store.dispatch(modalAction('close'));
      }

      handlePositiveClick() {
        var self = this;
        console.log("User when requesting : "+store.getState().SetUser.user);

        axios.post('http://localhost:2999/rename', {
            body: {
                videoid: store.getState().ModalReducer.video.id,
                newtitle: this.inputName,
                user: store.getState().SetUser.user
            }
        })
        .then(function(response) {
            console.log(response);
            self.dispatchUpdateList('leftPanel', response.data.videos);
        })
        .catch (function(err) {
            console.log(err);
        })


        this.closeModal();
      }



      getUser(){

        var regex = /http:\/\/localhost:3000\/\?user=([\w-]{1,})/;
     
        var url = window.location.href;
        var user = url.match(regex)[1];
        this.dispatchSetUser(user);
       }
     
       dispatchSetUser(user) {
         store.dispatch(setUser(user));
         console.log("User dispatch done");
       }

  


    

    render(){


            console.log("Rendering in left panel : "+JSON.stringify(store.getState().DataLoading.leftPanel.videos));

            return (
                <div className='leftPanel'>
                    <Header className='libraryName'>
                        <Image size='mini' circular src='https://image.noelshack.com/fichiers/2020/12/4/1584657095-miniytlogo.png' /> {store.getState().SetUser.user}'s library
                    </Header>
                    <Search className='search' style={{ height: '10%', width: '340px', margin: '0 auto' }}/>

                    <VideoList className='videoList' side='OnLeft' user={store.getState().SetUser.user} data= {store.getState().DataLoading.leftPanel.videos}/>

                    <Modal style = {{marginBottom: '10px'}} dimmer={store.getState().ModalReducer.dimmer} open={store.getState().ModalReducer.isModalOpen} onClose={this.closeModal} size='small'>
                <Modal.Header>{store.getState().ModalReducer.video.title}</Modal.Header>
                <Modal.Content image>
                  <Image
                    wrapped
                    size='medium'
                    src={store.getState().ModalReducer.video.thumbnails.medium.url}
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