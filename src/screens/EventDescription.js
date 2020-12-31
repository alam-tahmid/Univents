import React, { Component } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { Entypo, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import * as firebase from "firebase";
import Card from './EventCard';
import CardSection from './EventCardSection';

class EventDescription extends Component {
     
     constructor(props) {
        super(props);
    }
    state = {
        title: "",
        contactName: "",
        contactPhone:"",
        contactEmail:"",
        date:"",
        description:"",
        image:"",
        giveAways:"",
        groupEvent:"",
        location:"",
        oranizer:"",
        studentId:"",
        ticket:"",
        type:"",
        audience: "",
        time: "",
        ticketurl: "",
        eventId:12345,
        individualEvent:[],
        errorMessage: null
    };

    componentDidMount() {
        const { navigation } = this.props;
        //const { keyValue1 } = this.state;  
        const eventId = navigation.getParam('eventId', '12345');  
            var keyValue = firebase.database().ref('/events/').once('value',data => {
                var events = data.val();
                var keys = Object.keys(events);
                for(var i=0;i<keys.length;i++){
                    var keyValue =  keys[i];
                    var eventNumber = events[keyValue].eventId;
                    if(eventId === eventNumber){
                        
                        var getEvents = firebase.database().ref('/events/' +keyValue);
                        getEvents.once('value').then(snapshot => {
                        let result = snapshot.val();
                            this.setState({
                                title: result.title,
                                contactName: result.contactName,
                                contactEmail: result.contactEmail,
                                contactPhone: result.contactPhone,
                                date: result.date,
                                time: result.time,
                                description: result.description,
                                image: result.eventimage,
                                giveAways: result.giveaways,
                                groupEvent: result.groupevent,
                                location: result.location,
                                oranizer: result.organizer,
                                studentId: result.studentid,
                                ticket: result.ticket,
                                type: result.typeOfEvent,
                                audience: result.audience,
                                ticketurl : result.ticketUrl
                            });
                        })

                        break;
                    }
                } 
        })
    }

    render() {

        return (
            <ScrollView style= {styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Event Description</Text>
                </View>
                <Card>
                    <CardSection>
                        <View style={styles.thumbnailContainerStyle}>
                            <Image
                                style={styles.thumbnailStyle}
                                source={require('../Images/PurdueFW.jpg')}
                            />
                        </View>
                    </CardSection>
                    <CardSection>
                        <Text style={styles.textTitleStyle}>{this.state.title} </Text>
                    </CardSection>
                    <CardSection>
                    </CardSection>
                    <CardSection>
                        <Entypo name="location-pin" size={25} />
                        <Text style={styles.textDescStyle}> {this.state.location} </Text>
                    </CardSection>
                    <CardSection>
                        <MaterialCommunityIcons name="calendar-question" size={25} />
                        <Text style={styles.textDescStyle}> {this.state.date} {this.state.time} </Text>
                    </CardSection>
                    <CardSection>
                        <Text style={styles.textStyle}>Description: </Text>
                    </CardSection>
                    <CardSection>
                        <Text style={styles.textDescStyle}>{this.state.description} </Text>
                    </CardSection>
                    <CardSection>
                        <Text style={styles.textStyle}>Type:</Text>
                    </CardSection>
                    <CardSection>
                            <Text style={styles.textDescStyle}>{this.state.type}</Text>
                    </CardSection>
                    <CardSection>
                        <Text style={styles.textStyle}>Organizer: </Text>
                    </CardSection>
                    <CardSection>
                        <Text style={styles.textDescStyle}>{this.state.oranizer} </Text>
                    </CardSection>
                    <CardSection>
                        <Text style={styles.textStyle}>Audience:  </Text>
                    </CardSection>
                    <CardSection>
                        <Text style={styles.textDescStyle}>{this.state.audience} </Text>
                    </CardSection>
                    <CardSection>
                        <Text style={styles.textStyle}>Contact Information: </Text>
                    </CardSection>
                    <CardSection>
                        <Text style={styles.textDescStyle}>
                            <Ionicons name="ios-person" size={25} />   {this.state.contactName}{'\n'}
                            <Entypo name="phone" size={25} />  {this.state.contactPhone}{'\n'}
                            <Entypo name="email" size={25} />  {this.state.contactEmail}{'\n'}
                        </Text>
                    </CardSection>
                    <CardSection>
                        <Text style={styles.textStyle}>Contact Information: </Text>
                    </CardSection>
                    <CardSection>
                        <Text style={styles.textDescStyle}>
                            <Ionicons name="ios-person" size={25} />   {this.state.contactName}{'\n'}
                            <Entypo name="phone" size={25} />  {this.state.contactPhone}{'\n'}
                            <Entypo name="email" size={25} />  {this.state.contactEmail}{'\n'}
                        </Text>
                    </CardSection>
                    <CardSection>
                        <Text style={styles.textStyle}>StudentId Required:  </Text>
                        <Text style={styles.textDescStyle}>{this.state.studentId =='Y' ? 'Yes' : 'No'}</Text>
                    </CardSection>
                    <CardSection>
                        <Text style={styles.textStyle}>Giveaways:  </Text>
                        <Text style={styles.textDescStyle}>{this.state.giveAways == 'Y' ? 'Yes' : 'No'}</Text>
                    </CardSection>
                    <CardSection>
                        <Text style={styles.textStyle}>Ticket Required:  </Text>
                        <Text style={styles.textDescStyle}>{this.state.ticket == "Y" ? 'Yes' : 'No'}</Text>
                    </CardSection>
                    <CardSection>
                        <Text style={styles.textStyle}>Group Event:  </Text>
                        <Text style={styles.textDescStyle}>{this.state.groupEvent == "Y" ? 'Yes' : 'No'}</Text>
                    </CardSection>
                    <CardSection>
                        <Text style={styles.textStyle}>Ticket URL:  </Text>
                        <Text style={styles.textDescStyle}>{this.state.ticketurl !="" ? this.state.ticketurl : "Not Applicable" }</Text>
                    </CardSection>
                    <CardSection>

                    </CardSection>

                </Card>
            </ScrollView>
        );

    };

};



const styles = {
    container: {
        flex: 1,
        backgroundColor: "#fff"
      },
      header: {
        paddingTop: 50,
        paddingBottom: 15,
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
    cardStyle: {
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5
    },
    cardSectionStyle: {
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        position: 'relative'
    },
    textStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "#16bb95"
    },
    textTitleStyle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: "#16bb95"
    },
    textDescStyle: {
        fontSize: 17
    },
    thumbnailStyle: {
        height: 180,
        width: 370
    },

    calendarIcon: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    date: {
        fontSize: 40,
        marginTop: 4
    }
};

export default EventDescription;