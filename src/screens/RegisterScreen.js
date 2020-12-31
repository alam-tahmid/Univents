import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import * as firebase from "firebase";
import { Ionicons } from "@expo/vector-icons";

/*Register screen to save the user details in the firebase*/
export default class RegisterScreen extends React.Component {
    state = {
        email: "",
        password: "",
        firstName:"",
        lastName:"",
        organization:"",
        errorMessage: null
    };
    /*Registering the user in the firebase. Saving the username, password authentication information in the authentication section in the firebase*/ 
    handleRegister = () => {  
        var date = new Date(); 
        var createddate = date.getDate() + "/"+ parseInt(date.getMonth()+1) +"/"+date.getFullYear();
        /*Saving user information in firebase*/ 
        firebase.database().ref('users/').push({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            emailAddress: this.state.email,
            organization: this.state.organization,
            createdDate: createddate
          });
        /*Saving authentication information in the firebase*/ 
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                this.props.navigation.navigate('Login')
            })
            .catch(
                error => this.setState({ 
                    errorMessage: error.message })
                );
    };
    render() {
        return (
            <View style={styles.container}>       
                <Text style={styles.logintitle}>{`Sign up to get started\n`}</Text>
                <View style={styles.errorMessage}>
                    {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                </View>
                <View style={styles.form}>
                    <View style={{ marginTop: 10 }}>
                            <Text style={styles.labelTitle}>First Name</Text>
                            <TextInput style={styles.textbox} onChangeText={firstName => this.setState({ firstName })} value={this.state.firstName} autoCapitalize="none"></TextInput>
                    </View>
                    <View style={{ marginTop: 10 }}>
                            <Text style={styles.labelTitle}>Last Name</Text>
                            <TextInput style={styles.textbox} onChangeText={lastName => this.setState({ lastName })} value={this.state.lastName} autoCapitalize="none"></TextInput>
                    </View>
                    <View style={{ marginTop: 10 }}>
                            <Text style={styles.labelTitle}>Email Address</Text>
                            <TextInput style={styles.textbox} onChangeText={email => this.setState({ email })} value={this.state.email} autoCapitalize="none"></TextInput>
                    </View>
                    <View style={{ marginTop: 10 }}>
                            <Text style={styles.labelTitle}>Password</Text>
                            <TextInput style={styles.textbox} secureTextEntry autoCapitalize="none" onChangeText={password => this.setState({ password })} value={this.state.password}></TextInput>
                    </View>
                    <View style={{ marginTop: 10 }}>
                            <Text style={styles.labelTitle}>Organization</Text>
                            <TextInput style={styles.textbox}  autoCapitalize="none" onChangeText={organization => this.setState({ organization })} value={this.state.organization}></TextInput>
                    </View>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={this.handleRegister}>
                        <Text style={{ color: "#FFF", fontSize: 16, fontWeight:"bold" }}>Register</Text>
                    </TouchableOpacity>
                    
            </View>
        )
    }
}
/*Styling the register screen*/ 
const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: "#fff"
    },
    logintitle: {
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
        color: "#16bb95"
    },
    form: {
        marginBottom: 60,
        marginHorizontal: 30
    },
    labelTitle: {
        color: "#8A8F9E",
        fontSize: 12,
        textTransform: "uppercase",
        fontWeight: "700"
    },
    textbox: {
        borderBottomColor: "#8A8F9E",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: "#161F3D"
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
    }
})