import React from 'react';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { Icon, Header, Button, Image, Modal, Input, Popup } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './components.css';




export default class VideoTile extends React.Component {

    constructor(props){
      super(props);

      this.state = {
        thumbClass : '',
        title: '',
        subtitle: '',
        isRight: ''
      }

      this.inputName = '';

      if(this.props.thumbsize === 'medium'){
        this.state.thumbClass = 'medium';
        this.state.isRight = 0;
      }
      if(this.props.thumbsize === 'high'){
        this.state.thumbClass = 'high';
        this.state.isRight = 1;
      }

      this.state.title = this.props.data.title;
      this.state.subtitle = '';

      if(this.props.data.title.length > 41){
        this.state.title = '';
        var arr = this.props.data.title.split(' ');
        console.log(arr);
        var i=0;
        while ((this.state.title.length + arr[i].length) < 40) {
          this.state.title = this.state.title.concat(arr[i]);
          this.state.title = this.state.title.concat(' ');
          console.log("Title = "+ this.state.title+" for i = "+i);
            i++;
        }
        console.log("break for i = "+i);

        for (let j = i; j < arr.length;j++) {
          this.state.subtitle = this.state.subtitle.concat(arr[j]);  
          this.state.subtitle = this.state.subtitle.concat(' ');
          console.log("subtitle = "+ this.state.subtitle+" for j = "+j);
        }
      }

    }

    /*<Modal style = {{marginBottom: '10px'}} dimmer={dimmer} open={open} onClose={this.close} size='small'>
                <Modal.Header>{this.state.title.concat(this.state.subtitle)}</Modal.Header>
                <Modal.Content image>
                  <Image
                    wrapped
                    size='medium'
                    src={this.props.data.thumbnails.medium.url}
                    className = 'medium'
                  />
                  <Modal.Description>
                    <Header style={{marginLeft: 'auto', marginRight: 'auto'}} >What's the new name of your video ?</Header>
                      <Input placeholder='New name' style={{marginTop: '28.375px', marginLeft: '56.55px'}}/>
                  </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                  <Button negative onClick={this.close}>
                    Cancel
                  </Button>
                  <Button
                    positive
                    icon='checkmark'
                    labelPosition='right'
                    content="Confirm"
                    onClick={this.close}
                  />
                </Modal.Actions>
              </Modal>*/

                              /*<Popup on='click' trigger={<Button className='editPopup' icon basic > <Icon name='edit outline'/></Button>} flowing >
                              <Header as='h4'>New name ?</Header>
                              <Input placeholder='New name'/>
                              <Button onClick={()=> {alert('yessai')}}>Confirm</Button>
                           </Popup>*/

    state = { open: false }

    show = (dimmer) => () => this.setState({ dimmer, open: true })
    close = () => this.setState({ open: false })

      render() {

        const { open, dimmer } = this.state;

        return(

          <div>
            <GridListTile  key={this.props.data.id} cols={1} className={this.props.gridTileClass}>
                <img src={this.props.data.thumbnails[this.props.thumbsize].url} className={this.state.thumbClass} alt={this.state.title.concat(this.state.subtitle)}/>
                <GridListTileBar title={this.state.title} subtitle={this.state.subtitle} >
                </GridListTileBar>

                { !this.state.isRight &&
                  <Button className='editPopup' icon onClick={this.show('blurring')}> <Icon name='edit outline' /></Button>
                }

            </GridListTile>

            <Modal style = {{marginBottom: '10px'}} dimmer={dimmer} open={open} onClose={this.close} size='small'>
                <Modal.Header>{this.state.title.concat(this.state.subtitle)}</Modal.Header>
                <Modal.Content image>
                  <Image
                    wrapped
                    size='medium'
                    src={this.props.data.thumbnails.medium.url}
                    className = 'medium'
                  />
                  <Modal.Description>
                    <Header style={{marginLeft: 'auto', marginRight: 'auto'}} >What's the new name of your video ?</Header>
                      <Input onChange={(event,data)=> {this.inputName = data.value}} placeholder='New name' style={{marginTop: '28.375px', marginLeft: '56.55px'}}/>
                  </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                  <Button negative onClick={this.close}>
                    Cancel
                  </Button>
                  <Button
                    positive
                    icon='checkmark'
                    labelPosition='right'
                    content="Confirm"
                    onClick={() => {alert(this.inputName);  this.close();}}
                  />
                </Modal.Actions>
              </Modal>
              
            </div>

        );
      }


}

