import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import * as firebase from "firebase";
import {AsyncStorage} from 'react-native';

/*Login screen authenticates the user and navigates to home screen*/
export default class LoginScreen extends React.Component {
    state = {
        email: "",
        password: "",
        errorMessage: null
    };
    /*Authenticating the user login credentials in the firebase and navigating to home sceen on successful authentication*/ 
    handleLogin = () => {
        const { email, password } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                AsyncStorage.multiSet([
                    ["email", email],
                ])
                this.props.navigation.navigate('Home')
            })
            .catch(
                error => this.setState({ 
                    errorMessage: error.message })
                );
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.logintitle}>{`Let's get started\n`}</Text>
                <Text style={styles.loginsubtitle}>{`Sign up or login to see the events in the \n Univents App`}</Text>
                <View style={styles.errorMessage}>
                    {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                </View>
                <View style={styles.form}>
                    <View style={{ marginTop: 20 }}>
                        <Text style={styles.labelTitle}>Email Address</Text>
                        <TextInput style={styles.textbox} onChangeText={email => this.setState({ email })} value={this.state.email} autoCapitalize="none"></TextInput>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={styles.labelTitle}>Password</Text>
                        <TextInput style={styles.textbox} secureTextEntry autoCapitalize="none" onChangeText={password => this.setState({ password })} value={this.state.password}></TextInput>
                    </View>
                </View>
                <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
                    <Text style={{ color: "#FFF", fontSize: 16, fontWeight: "bold" }}>Sign in</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ alignSelf: "center", marginTop: 35 }} onPress={() => this.props.navigation.navigate("Register")}>
                    <Text style={{ color: "#414959", fontSize: 14, fontWeight: "400" }}>
                        New to Univents App? <Text style={{ fontSize: 16, color: "#16bb95" }}>Register Now</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}
/*Styling the login screen*/ 
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
    loginsubtitle: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        color: "#414959"
    },
    form: {
        marginBottom: 40,
        marginHorizontal: 30,
        marginTop: 15
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
        fontSize: 12
    },
    errorMessage: {
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 30
    },
    error: {
        color: "#E9446A",
        fontSize: 14,
        fontWeight: "600",
        textAlign: "center"
    }
})