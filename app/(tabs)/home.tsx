import { StyleSheet, View, Text, Button, Platform, TouchableOpacity, ScrollView, Modal, Pressable } from 'react-native'
import { useNavigation, useRouter } from 'expo-router';
import { FIREBASE_AUTH } from '../../FireBaseConfig';
import { globalStyles } from '../../styleSheets/Styles';
import React, { useEffect, useState } from 'react';
import { Calendar } from "react-native-calendars";
import { SafeAreaView } from 'react-native-safe-area-context';
import { FIREBASE_DB  } from '../../FireBaseConfig';
import firestore from '@react-native-firebase/firestore';

const home = () => {
  const auth = FIREBASE_AUTH;
  const navigation = useNavigation();
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogout = async () => {
    await auth.signOut();
    console.log('logged out');
    router.replace("/signin");
  };

  const handleDayPress = (day: { dateString: string }) => {
    setSelectedDate(day.dateString);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={globalStyles.background}>
      <Text style={{color: 'white'}}>Home Page!</Text>
      {/* Calendar */}
      <Calendar
        onDayPress={handleDayPress}
        markedDates={{
          [selectedDate]: { selected: true, marked: true, selectedColor: 'blue' },
        }}
      />
      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={homeStyles.modalView}>
          <Text style={homeStyles.modalText}>Selected Date: {selectedDate}</Text>
          <Pressable
            style={[homeStyles.button, homeStyles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={homeStyles.textStyle}>Hide Modal</Text>
          </Pressable>
        </View>
      </Modal>
      <Button title="Sign Out" onPress={handleLogout}/>
    </SafeAreaView>
  );
};

export default home;

const homeStyles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});