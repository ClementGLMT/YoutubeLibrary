import React from 'react';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { Icon, Header, Button, Image, Modal, Input } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './components.css';




export default class VideoTile extends React.Component {

    constructor(props){
      super(props);


      this.inputName = '';


    }


    state = { open: false }

    show = (dimmer) => () => this.setState({ dimmer, open: true })
    close = () => this.setState({ open: false })

      render() {

        const { open, dimmer } = this.state;
        var thumbsize;
        if(this.props.side === 'OnLeft')
          thumbsize = 'medium';
        else 
          thumbsize = 'high';

        
        console.log("Loading tie with data (thumbsize = "+thumbsize+")= "+JSON.stringify(this.props.data));

        return(

          <div>
            <GridListTile  key={this.props.data.id} cols={1} className={this.props.gridTileClass}>
                <img src={this.props.data.thumbnails[thumbsize].url} className={this.props.side} alt={this.props.data.title.concat(this.props.data.subtitle)}/>
                <GridListTileBar title={this.props.data.title} subtitle={this.props.data.subtitle} >
                </GridListTileBar>

                { (this.props.side === 'OnLeft') &&
                <div>
                  <Button className='editPopup' icon onClick={this.show('blurring')}> <Icon name='edit outline' /></Button>
                  <Button className='deletePopup' icon > <Icon name='delete' /></Button>
                  <Button  icon className='videoPlayButton' > 
                     <Icon  size ='huge'  name='youtube play' /> 
                   </Button>
                    <div className='myCenterTriangle'> </div>
                    </div>
                }


            </GridListTile>

            <Modal style = {{marginBottom: '10px'}} dimmer={dimmer} open={open} onClose={this.close} size='small'>
                <Modal.Header>{this.props.data.title.concat(this.props.data.subtitle)}</Modal.Header>
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

