import React from "react";

import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { Ionicons } from "@expo/vector-icons";
import LoginScreen from "./src/screens/LoginScreen"
import RegisterScreen from "./src/screens/RegisterScreen";
import HomeScreen from "./src/screens/HomeScreen";
import EventDescription from "./src/screens/EventDescription";
import AddEventScreen from "./src/screens/AddEventScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import LogOutScreen from "./src/screens/LogOutScreen"

import * as firebase from "firebase";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDgezbSa2NlTp0ShcqWLdqOakYCC0QObmM",
  authDomain: "ueapp-2625e.firebaseapp.com",
  databaseURL: "https://ueapp-2625e.firebaseio.com",
  projectId: "ueapp-2625e",
  storageBucket: "ueapp-2625e.appspot.com",
  messagingSenderId: "480862975285",
  appId: "1:480862975285:web:4189940c4223801066087c",
  measurementId: "G-XGLJ1XNQH7"
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

console.disableYellowBox = true;

const AppContainer = createStackNavigator({
  default: createBottomTabNavigator({
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: ({tintcolor}) => <Ionicons name = "md-home" size={24} color={tintcolor}/>
      }
    },
    AddEvent: {
      screen: AddEventScreen,
      navigationOptions: {
        tabBarIcon: ({tintcolor}) => (
          <Ionicons 
            name = "md-add-circle-outline" 
            size={48} 
            color= "#16bb95"
            style = {{
              shadowColor: "#E9446A",
              shadowOffset: {width: 0, height: 0},
              shadowRadius: 10,
              shadowOpacity: 0.3
            }}
          />)
      }
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
          tabBarIcon: ({ tintColor }) => <Ionicons name="md-person" size={24} color={tintColor} />
      }
  }, 
  SignOut: {
    screen: LogOutScreen,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Ionicons name="md-power" size={24} color={tintColor} />
  }
  }
  },
  {
    defaultNavigationOptions: {
      tabBarOnPress: ({ navigation, defaultHandler }) => {
          if (navigation.state.key === "AddEvent") {
              navigation.navigate("AddEventModal");
          } else {
              defaultHandler();
          }
      }
  },
  tabBarOptions: {
      activeTintColor: "#161F3D",
      inactiveTintColor: "#B8BBC4",
      showLabel: false
  }
  }),
  AddEventModal: {
    screen: AddEventScreen
},
  EventDescription: {
    screen: EventDescription
  }
},
  {
        mode: "modal",
        headerMode: "none"
  });

const AuthStack = createStackNavigator({
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        headerTitle: 'Univents',
        headerStyle: {
          backgroundColor: '#16a085', 
        },
        headerTitleStyle: {
          color: 'white',
        },
      },
    },
    Register: {
      screen: RegisterScreen,
      navigationOptions: {
        headerTitle: 'Univents',
        headerStyle: {
          backgroundColor: '#16a085',
        },
        headerTitleStyle: {
          color: 'white',
        },
      },
    },
});

export default createAppContainer(
    createSwitchNavigator(
        {
            Auth: AuthStack,
            App: AppContainer   
        }
    )
);