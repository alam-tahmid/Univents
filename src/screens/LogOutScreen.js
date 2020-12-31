import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';


export default class LogOutScreen extends React.Component {
    render(){
        return(
            <View style={styles.container}>
            <Text style={styles.logintitle}>{`Thank you for using Univent App...\n`}</Text>
                <Text style={styles.loginsubtitle}>{`Please click below button to Log out\n\n\n`}</Text>
                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Login')}>
                    <Text style={{ color: "#FFF", fontSize: 16, fontWeight: "bold" }}>Sign Out</Text>
                </TouchableOpacity>
            </View>        
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
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
        width: 100,
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