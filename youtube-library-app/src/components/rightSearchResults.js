import React from 'react';
import VideoList from './videolist';
import 'semantic-ui-css/semantic.min.css';
import SearchForm from './searchForm';
import './components.css';
import {store} from '../store';
import tileData from './tileData';



export default class RightSearchResults extends React.Component {




    render()  {

        var state = store.getState().DataLoading.rightPanel;

        var data = [];

        if(store.getState().DataLoading.rightPanel.isSearching.search && store.getState().DataLoading.rightPanel.isLoading){
            for (let i = 0; i < store.getState().DataLoading.rightPanel.isSearching.maxRes; i++) {
                data[i] = tileData[i];
            }
        }

        if(store.getState().DataLoading.rightPanel.isSearching.search && !store.getState().DataLoading.rightPanel.isLoading) {
            data = store.getState().DataLoading.rightPanel.videos;
        }

        //console.log("Data in RightSearchResults: "+JSON.stringify(store.getState().DataLoading.rightPanel));


        return(
            <div className='rightPanel'>
                <SearchForm className='searchForm'/>
  
               
                <VideoList side='OnRight' data={data}/>
            </div>
        );

    }
}

/*{(store.getState().DataLoading.rightPanel.isSearching.search) &&
    <VideoList side='OnRight' data={data}/>
    }*/