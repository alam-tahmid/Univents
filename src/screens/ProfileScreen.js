import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, TextInput, Image,TouchableOpacity } from 'react-native';
import { avatar, Avatar} from 'react-native-elements';
import {AsyncStorage} from 'react-native'

import * as firebase from "firebase";

export default class ProfileScreen extends React.Component {

    constructor(props){
        super(props)
      }

      state = {
        email: "",
        firstName:"",
        lastName:"",
        organization:"",
        errorMessage: null,
        TextInputDisableStatus: true
    };
   
    componentDidMount() {
        AsyncStorage.multiGet(['email', 'password']).then((data) => {
            let sessionEmail = data[0][1];
                
        if(sessionEmail != null){
        var userProfile = firebase.database().ref('/users');
        userProfile.once('value', data => {
            let users   = data.val();
            var keys = Object.keys(users);
            for(var i=0;i<keys.length;i++){
                var keyValue =  keys[i];
                var email = users[keyValue].emailAddress;
                if(sessionEmail === email){
                            this.setState({
                                email: users[keyValue].emailAddress,
                                firstName: users[keyValue].firstName,
                                lastName: users[keyValue].lastName,
                                organization: users[keyValue].organization
                            });
                    }
                }    
            })
        } 
        });
    }
    render(){
        const { firstName,lastName, email, organization } = this.state;
        const initials = firstName.slice(0,1).concat(lastName.slice(0,1));
        return(
          
          <View style={styles.container}>
               <View style={styles.header}>
              <Text style={styles.headerTitle}>My Profile</Text>
            </View>
              <View style={styles.profileImage}>
                <Avatar size="xlarge"
                        rounded title={initials}
                        overlayContainerStyle={{backgroundColor: '#16bb95'}}
                        activeOpacity={0.7}
                        style={styles.image}></Avatar>
                    
              </View>
              <View style={styles.form}>
                    <View style={{ marginTop: 10 }}>
                            <Text style={styles.labelTitle}>First Name</Text>
                            <TextInput 
                                style={styles.textbox} 
                                editable={false}
                                onChangeText={firstName => this.setState({ firstName })} 
                                value={this.state.firstName} 
                                autoCapitalize="none">
                            </TextInput>
                    </View>

                    <View style={{ marginTop: 10 }}>
                            <Text style={styles.labelTitle}>Last Name</Text>
                            <TextInput 
                                style={styles.textbox} 
                                editable={false}
                                onChangeText={lastName => this.setState({ lastName })} 
                                value={this.state.lastName} 
                                autoCapitalize="none">
                            </TextInput>
                    </View>

                    <View style={{ marginTop: 10 }}>
                            <Text style={styles.labelTitle}>Email Address</Text>
                            <TextInput 
                                style={styles.textbox} 
                                editable={false}
                                onChangeText={email => this.setState({ email })} 
                                value={this.state.email} 
                                autoCapitalize="none">
                            </TextInput>
                    </View>

                    <View style={{ marginTop: 10 }}>
                            <Text style={styles.labelTitle}>Organization</Text>
                            <TextInput 
                                style={styles.textbox}  
                                autoCapitalize="none" 
                                editable={false}
                                onChangeText={organization => this.setState({ organization })} 
                                value={this.state.organization}>
                            </TextInput>
                    </View>

                </View>

          </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    title:{
        color: "black"
    },
    header: {
        paddingTop: 50,
        paddingBottom: 20,
        backgroundColor: "#16bb95",
        alignItems: "center",
        justifyContent: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#EBECF4",
        shadowColor: "#454D65",
        shadowOffset: { height: 5 },
        shadowRadius: 15,
        shadowOpacity: 0.2,
        zIndex: 10
      },
      headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "#fff"
      },
    profileImage: {
        width: 200,
        height: 200,
        overflow: "hidden",
        borderRadius: 100,
        marginLeft: 20,
        alignSelf: 'center'
    },
    image:{
        flex: 1,
        width: undefined,
        height: undefined
    },
    content:{
        flex: 1,
        paddingTop: 20,
        marginLeft: 20
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 80,

    },form: {
        marginBottom: 60,
        marginHorizontal: 30
    },
    labelTitle: {
        color: "#8A8F9E",
        fontSize: 20,
        textTransform: "uppercase",
        fontWeight: "700"
    },
    textbox: {
        borderBottomColor: "#8A8F9E",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 20,
        color: "#161F3D",
    },
    button: {
        marginHorizontal: 30,
        backgroundColor: "#16bb95",
        borderRadius: 4,
        height: 52,
        alignItems: "center",
        justifyContent: "center",
        fontSize: 12,
        marginTop: 1
    },
    errorMessage: {
        height: 30,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 30
    },
    error: {
        color: "#E9446A",
        fontSize: 12,
        fontWeight: "600",
        textAlign: "center"
    },
   

    

})