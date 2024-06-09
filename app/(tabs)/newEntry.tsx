import { StyleSheet, View, Text, Modal, TextInput, Pressable } from 'react-native'
import { globalStyles } from '../../styleSheets/Styles';
import React, { useState } from 'react';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { FIREBASE_DB } from '../../FireBaseConfig';
import { router } from 'expo-router';
import { firebase } from '@react-native-firebase/firestore';
import { entryData } from './list';


type newEntryProps = {
  setModalVisible?: (arg0: boolean) => void,
}

const newEntry = ({ setModalVisible }: newEntryProps) => {
  const [title, setTitle] = useState("");
  const [textEntry, setTextEntry] = useState("");
  const [date, setDate] = useState(new Date());
  const [dateModal, setDateModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [entries, setEntries] = useState([] as entryData[]);

  const addEntry = async () => {
    try {
      const timeStamp = firebase.firestore.Timestamp.fromDate(date); //Date to Timestamp for Firestore
      const docRef = await addDoc(collection(FIREBASE_DB, "entries"), {
        title: title,
        isHappy: false,
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDate(),
        textEntry: textEntry,
      });
      console.log("Document written with ID: ", docRef.id);
      setTitle("");
      setTextEntry("");
      readEntry();
      if (setModalVisible !== undefined) {
        setModalVisible(false);
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const readEntry = async () => {
    setLoading(true);
    const querySnapshot = await getDocs(collection(FIREBASE_DB, "entries"));
    const newEntries: entryData[] = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.id, doc.data());
      newEntries.push({
          id: doc.id, 
          title: doc.data().title, 
          isHappy: doc.data().isHappy,
          date: doc.data().date,
          textEntry: doc.data().textEntry,
        });
    });
    setEntries(newEntries); // Update state once with new entries
    setLoading(false);
  }

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setDateModal(false);
    setDate(currentDate);
    console.log(currentDate.toDateString().split(" "));
  };  

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return day + "-" + month + "-" + year;
  }

  return (
    <View>
      <View style={modalStyles.modalView}>
          <Text style={modalStyles.heading}>New Entry</Text>
          <TextInput 
            style={modalStyles.titleInput} 
            placeholder="Title" 
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
          {/* Date Select */}
          {dateModal && (
            <DateTimePicker
              mode="date"
              display="spinner"
              value={date}
              onChange={onDateChange}
            />
          )}
          <Pressable 
            style={{width: "100%"}}
            onPress={() => {
              setDateModal(true);
              console.log("Opened date modal")
            }}
          >
            <Text style={modalStyles.dateInput}>
              Date: {formatDate(date)}
            </Text>
          </Pressable>
          <TextInput 
            style={modalStyles.entryInput} 
            placeholder="Enter new entry" 
            value={textEntry}
            onChangeText={(text) => setTextEntry(text)}
          />
          <Pressable 
            style={[modalStyles.button, modalStyles.buttonClose]}
            onPress={addEntry}
          >
            <Text style={modalStyles.textStyle}>Add Entry</Text>
          </Pressable>
          <Pressable
            style={[modalStyles.button, modalStyles.buttonClose]}
            onPress={() => {if (setModalVisible !== undefined) {
              setModalVisible(false);
            }}}
          >
            <Text style={modalStyles.textStyle}>Hide Modal</Text>
          </Pressable>
        </View>
    </View>
  )
}

export default newEntry;

const modalStyles = StyleSheet.create({
  titleInput: {
    padding: 10,
    backgroundColor: 'lightgray',
    fontSize: 17,
    alignSelf: 'center',
    borderRadius: 4,
    marginTop: "auto",
    width: "100%",
    marginVertical: 10,
  },
  dateInput: {
    padding: 10,
    backgroundColor: 'lightgray',
    fontSize: 17,
    alignSelf: 'center',
    borderRadius: 4,
    marginTop: "auto",
    width: "100%",
    marginVertical: 10,
  },
  entryInput: {
    padding: 10,
    backgroundColor: 'lightgray',
    fontSize: 17,
    alignSelf: 'center',
    borderRadius: 4,
    marginTop: "auto",
    width: "100%",
    height: "40%",
    marginVertical: 10,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: 'blue',
    borderRadius: 50,
    padding: 15,
    elevation: 5,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: "90%",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginVertical: 10,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: '400',
    flex: 1,
  },
});