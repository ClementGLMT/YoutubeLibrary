import React from 'react';
import VideoList from './videolist';
import 'semantic-ui-css/semantic.min.css';
import SearchForm from './searchForm';
import './components.css';
import {store} from '../store';



export default class RightSearchResults extends React.Component {



    render()  {

        return(
            <div className='rightPanel'>
                <SearchForm className='searchForm'/>
  
                {store.getState().DataLoading.isRightDataLoaded === 1 &&
                <VideoList side='OnRight' data={store.getState().DataLoading.rightPanel.videos}/>
                }
            </div>
        );

    }
}