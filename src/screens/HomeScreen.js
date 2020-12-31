import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import EventDescription from './EventDescription';
import * as firebase from "firebase";
import moment from "moment";

export default class HomeScreen extends React.Component{

  constructor(props){
    super(props),
    this.state = {  
      title: '',  
    };
  }
  
  state = {
    title: "",
    date:"",
    giveAways:"",
    groupEvent:"",
    location:"",
    studentId:"",
    ticket:"",
    events: [],
    time: "",
    eventId:"",
    errorMessage: null
  }

  static navigationOptions = {  
    title: 'HomeScreen',    
};  
  
  componentDidMount() {
    var getEvents = firebase.database().ref('/events/');
    getEvents.on('value', querySnapShot => {
      let data = querySnapShot.val();
      let events = Object.values(data);
      this.setState({events})
      querySnapShot.forEach((child) => {
        let key = child.key;
        let result = child.val();
          this.setState({
            key: key,
            eventId: result.eventId,
            title: result.title,
            date: moment(result.date).format("YYYY-MM-DD"),
            location: result.location,
            time: result.time,
            giveAways: result.giveaways,
            groupEvent: result.groupEvent,
            studentId: result.studentid,
            ticket: result.ticket,
          });
      })
    });
  }  
  
      render() {
        const { giveAways } = this.state;
      
        return (
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Events</Text>
            </View>
            <FlatList
              data = {this.state.events}
              renderItem={({item}) => 
              <TouchableOpacity onPress={() => this.props.navigation.navigate('EventDescription', {eventId: item.eventId})}>
                     <View style={styles.eventItem}>
                       <View style={{ flex: 1 }}>
                         <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                           <View>
                             <Text style={styles.name}>{item.title}</Text>
                             <Text style={styles.date}>{item.date} {item.time}</Text>
                           </View>
        
                           <Ionicons name="md-more" size={24} color="#73788B" />
                         </View>
                         <Text style={styles.venue}>{item.location}</Text>

                         <View style={styles.navBarLeftButton}>
                            <Ionicons name="md-card" size={24} color="#73788B" />  
                            <Ionicons name="md-gift" size={24} color="#73788B" /> 
                            <Ionicons name="md-people" size={24} color="#73788B" />
                            <Ionicons name="md-image" size={24} color="#73788B" />
                         </View>
                       </View>
                     </View>
                   </TouchableOpacity>}
              keyExtractor= {item => item.title}
            >

            </FlatList>
          </View>
        );
      }
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: "#fff"
      },
      header: {
        paddingTop: 50,
        paddingBottom: 15,
        backgroundColor: "#16bb95",
        //backgroundColor: "#0000A0",
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
        //fontWeight: "500",
        fontWeight: 'bold',
        color: "#fff"
      },
      event: {
        marginTop: 5
      },
      eventItem: {
        backgroundColor: "#f1f1f7",
        //backgroundColor: "#6F4E37",
        borderRadius: 5,
        padding: 8,
        flexDirection: "row",
        marginVertical: 8,
        width: 390
      },
      name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "#16bb95"
        //color: "#FFF"
      },
      date: {
        fontSize: 14,
        color: "#454D65",
        marginTop: 6
      },
      venue: {
        marginTop: 4,
        fontSize: 14,
        color: "#463E3F"
      },
      navBarLeftButton: {
        paddingLeft: 6,
        justifyContent: "space-between",
        marginVertical: 4,
        width: 100,
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
      },
    })
    