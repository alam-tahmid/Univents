import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import EventDescription from './EventDescription';

export default class HomeScreen extends React.Component{
    events = [
        {
          id: "1",
          name: "FAFSA COMPLETION NIGHT",
          venue: "Kettler Hall",
          date: "Thu,Feb 12 6.00PM CST",
          organizedby: ""
        },
        {
          id: "2",
          name: "Homecoming 2020",
          venue: "Walb Union, Classic Ballroom",
          date: "Thu,Feb 12 6.00PM CST"
        },
      ];
      renderEvent = event => {
        const key = '-M58EUvnKreP58d_DHc3';
        return (
          <TouchableOpacity onPress={() => this.props.navigation.navigate('EventDesc', {key: key})}>
            <View style={styles.eventItem}>
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                  <View>
                    <Text style={styles.name}>{event.name}</Text>
                    <Text style={styles.date}>{event.date}</Text>
                  </View>
                  <Ionicons name="md-more" size={24} color="#73788B" />
                </View>
                <Text style={styles.venue}>{event.venue}</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      };
      render() {
        return (
          <View style={styles.container}>
            {/* <View style={styles.header}>
              <Text style={styles.headerTitle}>Events</Text>
            </View> */}
            <FlatList style={styles.event}
              data={this.events}
              renderItem={({ item }) => this.renderEvent(item)}
              keyExtractor={item => item.id}
            />
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
        backgroundColor: "#daaa00",
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
        fontWeight: "500"
      },
      event: {
        marginTop: 5
      },
      eventItem: {
        backgroundColor: "#f1f1f7",
        borderRadius: 5,
        padding: 8,
        flexDirection: "row",
        marginVertical: 8
    
      },
      name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "#16bb95"
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
    })
    