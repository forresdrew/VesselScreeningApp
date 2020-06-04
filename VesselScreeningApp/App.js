import React, {Fragment} from 'react';
//import * as firebase from "firebase";
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Start from './src/pages/Start';
import Home from './src/pages/Home';
import Create from './src/pages/Create';

const App = () => {
  return <AppContainer />
};

const AppNavigator = createStackNavigator({
  Home: Home,
  Create: Create,
  Start: Start
  },
  {
    initialRouteName: 'Start',
  }
);

/*const firebaseConfig = {
  apiKey: "AIzaSyAh65Q6wLlCzn_Kuqxy_W6zCOcDszBPNOE",
  authDomain: "swen3252019a2.firebaseapp.com",
  databaseURL: "https://swen3252019a2.firebaseio.com",
  projectId: "swen3252019a2",
  storageBucket: "",
  messagingSenderId: "848882815804",
  appId: "1:848882815804:web:ae31142d7b0a5f63aec439"
};

firebase.initializeApp(firebaseConfig);*/

const AppContainer = createAppContainer(AppNavigator);

export default App;
