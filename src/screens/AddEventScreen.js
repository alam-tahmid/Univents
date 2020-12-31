import React, { Component, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Dimensions, Button, Platform, ScrollView, Alert, ToastAndroid } from 'react-native';
import * as firebase from "firebase";
import { Ionicons } from "@expo/vector-icons";
import CheckBox from 'react-native-check-box';
import { SafeAreaView } from 'react-native-safe-area-context';
//import { ScrollView } from 'react-native-gesture-handler';
import DatePicker from 'react-native-datepicker';
import TimePicker from 'react-native-simple-time-picker';



const { height } = Dimensions.get('window');

export default class AddEventScreen extends React.Component {

    state = {
        // mode: 'date',
        // show: false,
        errorMessage: null,
        screenHeight: 0,
        audience: "",
        contactEmail: "",
        contactName: "",
        contactNumber: "",
        date: "",
        time: "12:00",
        description: "",
        eventId: "12345",
        giveaways: "",
        groupevent: "",
        location: "",
        organizer: "",
        studentid: "",
        ticket: "",
        ticketUrl: "",
        eventName: "",
        title: "",
        typeOfEvent: "",
        selectedHours: 12,
        selectedMinutes: 0,
        isCheckedGE: false,
        isCheckedG: false,
        isCheckedSId: false,
        isCheckedT: false
    };


    saveToFirebase() {

        let { audience, contactEmail, contactName, contactNumber, date, selectedHours,
            selectedMinutes, description, eventId, giveaways, groupevent, location,
            organizer, ticket, ticketUrl, eventName, typeOfEvent, eventType,
            studentid, isCheckedT, isCheckedSId, isCheckedG, isCheckedGE } = this.state;


            if (isCheckedSId) {
                studentid = "Y"
            }else{
                studentid = "N"
            }
            if (isCheckedG) {
                giveaways = "Y"
            }else{
                giveaways = "N"
            }
            if (isCheckedGE) {
                groupevent = "Y"
            }else
            {
                groupevent = "N"
            }
            if(isCheckedT){
                ticket = "Y"
            }
            else{
                ticket = "N"
            }
        firebase.database().ref('/events/').push({
            audience: audience,
            contactEmail: contactEmail,
            contactName: contactName,
            contactPhone: contactNumber,
            date: date,
            time: selectedHours + ":" + selectedMinutes,
            description: description,
            eventId: eventId+1,
            giveaways: giveaways,
            groupevent: groupevent,
            location: location,
            organizer: organizer,
            studentid: studentid,
            ticket: ticket,
            ticketUrl: ticketUrl,
            title: eventName,
            typeOfEvent: eventType
        })
            .then(() => {
                this.props.navigation.navigate('Home')
                ToastAndroid.show("Event Added Succesfully !", ToastAndroid.SHORT);
            })
            .catch(
                error => this.setState({
                    errorMessage: error.message
                })
            );


    }

    handleAddEvent = () => {


        let { audience, contactEmail, contactName, contactNumber, date, selectedHours,
            selectedMinutes, description, eventId, giveaways, groupevent, location,
            organizer, ticket, ticketUrl, eventName, typeOfEvent, eventType, studentid,
            isCheckedT, isCheckedSId, isCheckedG, isCheckedGE } = this.state;


        if (eventName !== "" && location !== "" && date !== "" && eventType !== "" && organizer !== "" && contactName !== "" && contactNumber !== "" && contactEmail !== "") {           

            if (isCheckedT) {
                ticket = "Y";
                if (ticketUrl === "") {

                    Alert.alert(
                        "Ticket URL Empty",
                        "Please add Ticket Url",
                        [

                            { text: "OK", onPress: () => console.log("OK Pressed") }
                        ],
                        { cancelable: false }
                    );
                } else {
                    this.saveToFirebase();
                }
            }

            else {

                ticket = "N";

                this.saveToFirebase();
            }

        } else {

            Alert.alert(
                "Mandotory Fields Missing",
                "Please fill up the * marked fields",
                [

                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
            );
        }



    }



    render() {
        const scollEnabled = this.state.screenHeight > height;
        const { selectedHours, selectedMinutes } = this.state;
        return (

            <SafeAreaView style={styles.container}>


                <ScrollView>
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <Text style={styles.logintitle}>{`Add New Event\n`}</Text>
                        </View>
                        <View style={styles.errorMessage}>
                            {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                        </View>

                        <View style={styles.form}>
                            <View style={{ marginTop: 10 }}>
                                <Text style={styles.labelTitle}>* Indicated fields are mandatory</Text>
                            </View>

                            <View style={{ marginTop: 20 }}>
                                <Text style={styles.labelTitle}>Name of the Event*</Text>
                                <TextInput style={styles.textbox} onChangeText={eventName => this.setState({ eventName })} value={this.state.eventName} autoCapitalize="none"></TextInput>
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <Text style={styles.labelTitle}>Location*</Text>
                                <TextInput style={styles.textbox} onChangeText={location => this.setState({ location })} value={this.state.location} autoCapitalize="none"></TextInput>
                            </View>

                            <View style={{ marginTop: 10 }}>
                                <Text style={styles.labelTitle}>Date*</Text>
                                <TextInput style={styles.textbox} onChangeText={date => this.setState({ date })} value={this.state.date} autoCapitalize="none"></TextInput>
                            </View>

                            <View style={{ marginTop: 10 }}>
                                <DatePicker
                                    style={{ width: 200 }}
                                    date={this.state.date} //initial date from state
                                    mode="date" //The enum of date, datetime and time
                                    placeholder="select date"
                                    format="DD-MM-YYYY"
                                    minDate="01-01-2016"
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    customStyles={{
                                        dateIcon: {
                                            position: 'absolute',
                                            left: 0,
                                            top: 4,
                                            marginLeft: 0
                                        },
                                        dateInput: {
                                            marginLeft: 36
                                        }
                                    }}
                                    onDateChange={(date) => { this.setState({ date: date }) }}
                                />

                            </View>

                            <View style={{ marginTop: 10 }}>
                                <Text style={styles.labelTitle}>Start Time*</Text>
                                <View style={styles.container}>
                                    <Text style={{ fontSize: 20 }}>{selectedHours}: {selectedMinutes}</Text>
                                    <TimePicker
                                        hourPlaceholder="hour"
                                        selectedHours={selectedHours}
                                        //initial Hourse value
                                        minutePlaceholder="minute"
                                        selectedMinutes={selectedMinutes}
                                        //initial Minutes value
                                        onChange={(hours, minutes) => this.setState({
                                            selectedHours: hours, selectedMinutes: minutes
                                        })}
                                    />
                                </View>
                            </View>


                            <View style={{ marginTop: 10 }}>
                                <Text style={styles.labelTitle}>Description</Text>
                                <TextInput style={styles.textbox} onChangeText={description => this.setState({ description })} value={this.state.description} autoCapitalize="none"></TextInput>
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <Text style={styles.labelTitle}>Event Type*</Text>
                                <TextInput style={styles.textbox} onChangeText={eventType => this.setState({ eventType })} value={this.state.eventType} autoCapitalize="none"></TextInput>
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <Text style={styles.labelTitle}>Audience</Text>
                                <TextInput style={styles.textbox} onChangeText={audience => this.setState({ audience })} value={this.state.audience} autoCapitalize="none"></TextInput>
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <Text style={styles.labelTitle}>Organizer*</Text>
                                <TextInput style={styles.textbox} onChangeText={organizer => this.setState({ organizer })} value={this.state.organizer} autoCapitalize="none"></TextInput>
                            </View>

                            <View style={{ marginTop: 10 }}>
                                <Text style={styles.labelTitle}>Contact Person*</Text>
                                <TextInput style={styles.textbox} onChangeText={contactName => this.setState({ contactName })} value={this.state.contactName} autoCapitalize="none"></TextInput>
                            </View>

                            <View style={{ marginTop: 10 }}>
                                <Text style={styles.labelTitle}>Organizer's  Email*</Text>
                                <TextInput style={styles.textbox} onChangeText={contactEmail => this.setState({ contactEmail })} value={this.state.contactEmail} autoCapitalize="none"></TextInput>
                            </View>

                            <View style={{ marginTop: 10 }}>
                                <Text style={styles.labelTitle}>Organizer's  Phone*</Text>
                                <TextInput style={styles.textbox}   keyboardType={'numeric'}  onChangeText={contactNumber => this.setState({ contactNumber })} value={this.state.contactNumber} autoCapitalize="none"></TextInput>
                            </View>


                            <View style={{ marginTop: 10 }}>
                                <CheckBox
                                    style={{ flex: 1, padding: 10 }}
                                    onClick={() => {
                                        this.setState({
                                            isCheckedSId: !this.state.isCheckedSId
                                        })
                                    }}
                                    isChecked={this.state.isCheckedSId}
                                    leftText={"Student Id Required"}
                                />
                            </View>

                            <View style={{ marginTop: 10 }}>
                                <CheckBox
                                    style={{ flex: 1, padding: 10 }}
                                    onClick={() => {
                                        this.setState({
                                            isCheckedG: !this.state.isCheckedG
                                        })
                                    }}
                                    isChecked={this.state.isCheckedG}
                                    leftText={"Give Aways"}
                                />
                            </View>

                            <View style={{ marginTop: 10 }}>
                                <CheckBox
                                    style={{ flex: 1, padding: 10 }}
                                    onClick={() => {
                                        this.setState({
                                            isCheckedGE: !this.state.isCheckedGE
                                        })
                                    }}
                                    isChecked={this.state.isCheckedGE}
                                    leftText={"Group Event"}
                                />
                            </View>

                            <View style={{ marginTop: 10 }}>
                                <CheckBox
                                    style={{ flex: 1, padding: 10 }}
                                    onClick={() => {
                                        this.setState({
                                            isCheckedT: !this.state.isCheckedT
                                        })
                                    }}
                                    isChecked={this.state.isCheckedT}
                                    leftText={"Ticket"}
                                />
                            </View>

                            <View style={{ marginTop: 10 }}>
                                <Text style={styles.labelTitle}>Ticket Url</Text>
                                <TextInput style={styles.textbox} onChangeText={ticketUrl => this.setState({ ticketUrl })} value={this.state.ticketUrl} autoCapitalize="none"></TextInput>
                            </View>
                        </View>
                        <View style={{ marginBottom: 20 }}>
                            <TouchableOpacity style={styles.button} onPress={this.handleAddEvent}>
                                <Text style={{ color: "#FFF", fontSize: 16, fontWeight: "bold" }}>Add Event!</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: "#fff"
    },
    header: {
        paddingTop: 20,
        paddingBottom: 5,
        backgroundColor: "#16bb95",
        alignItems: "center",
        justifyContent: "center",
        borderBottomWidth: 0.2,
        borderBottomColor: "#EBECF4",
        shadowColor: "#454D65",
        shadowOffset: { height: 5 },
        shadowRadius: 15,
        shadowOpacity: 0.2,
        zIndex: 10
      },
    logintitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "#fff",
        backgroundColor: "#16bb95"
        //fontFamily:'open-sans-bold'
    },
    form: {
        marginBottom: 75,
        marginHorizontal: 30,
        //marginTop: 10
    },
    labelTitle: {
        // color: "#522d80"
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