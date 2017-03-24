import React from 'react';
import ReactDOM from 'react-dom';
import Shell from './components/Shell';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Provider } from 'mobx-react';
import { observable } from 'mobx';
import axios from 'axios';
import DevTools, { setLogEnabled } from 'mobx-react-devtools';
import createHistory from 'history/createBrowserHistory'
import createMemoryHistory from 'history/createMemoryHistory'
import Cookies from 'cookies-js';

/* STORES */
import UserStore from './Stores/UserStore.js';
import CollectionStore from './Stores/CollectionStore.js';
import QuestionStore from './Stores/QuestionStore.js';
import DemographicsDataStore from './Stores/DemographicsDataStore.js';
import CensusDataStore from './Stores/CensusDataStore.js';
import AppStatisticsStore from './Stores/AppStatisticsStore.js';

injectTapEventPlugin();

Cookies.defaults = {
  secure: true
};

window.authSettings = {
  facebookPageId: 1522822621304793,
  //facebookId: 1499361770335561,
  facebookId: 1499361770335561,
  googleMapsAPI: "AIzaSyDZxI6243Bb460yabWL_tyN97NBH6hsnwo",
}

window.API = axios.create({
  baseURL: 'http://localhost:8000'
});

if (location.host === 'share-test.represent.me' || location.host === 'test.represent.me') { // Test server override defaults
  window.authSettings.facebookId = 1684727181799018;
  window.API.defaults.baseURL = 'https://test.represent.me';
}

window.stores = {
  UserStore:              new UserStore(),
  CollectionStore:        new CollectionStore(),
  QuestionStore:          new QuestionStore(),
  DemographicsDataStore:  new DemographicsDataStore(),
  CensusDataStore:        new CensusDataStore(),
  AppStatisticsStore:     new AppStatisticsStore(),
}

window.REPRESENT = (element, initialPath = "/", virtualLocation = true) => {

  let history;

  if(virtualLocation) {
    history = createMemoryHistory({
      initialEntries: [ initialPath ],
    });
  }else {
    history = createHistory();
  }

  ReactDOM.render(
    <div>
      <Provider
        UserStore={window.stores.UserStore}
        CollectionStore={window.stores.CollectionStore}
        QuestionStore={window.stores.QuestionStore}
        DemographicsDataStore={window.stores.DemographicsDataStore}
        CensusDataStore={window.stores.CensusDataStore}
        AppStatisticsStore={window.stores.AppStatisticsStore}
        >
        <Shell history={history}/>
      </Provider>
    </div>,
    document.getElementById(element)
  );
}

window.REPRESENTREADY();
