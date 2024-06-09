import { StyleSheet, Pressable, SafeAreaView, Text, TextInput, View, FlatList, ActivityIndicator, Modal, Button } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { globalStyles } from "../../styleSheets/Styles";
import Entry from "../../components/displayEntry";
import { useState, useEffect } from "react";
import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { FIREBASE_DB } from "../../FireBaseConfig";
import { Calendar } from "react-native-calendars";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { firebase } from "@react-native-firebase/firestore";

//each diary entry
/*
  1. id
  2. title
  3. isHappy
  4. date
    4.1 Year
    4.2 Month
    4.3 Day
  5. textEntry
*/
export type entryData = {
  id: string,
  title: string,
  isHappy: boolean,
  date: Date,
  textEntry: string,
}

export default function List() {
  const [title, setTitle] = useState("");
  const [textEntry, setTextEntry] = useState("");
  const [entries, setEntries] = useState([] as entryData[]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [dateModal, setDateModal] = useState(false);

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
      setModalVisible(!modalVisible);
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

  const deleteAllEntries = async () => {
    setLoading(true);
    const querySnapshot = await getDocs(collection(FIREBASE_DB, "entries"));
    querySnapshot.docs.map((item) => deleteDoc(doc(FIREBASE_DB, "entries", item.id)));
    readEntry();
    setLoading(false);
  }

  useEffect(() => {
    readEntry();
  }, []);

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setDateModal(false);
    setDate(currentDate);
    console.log(currentDate.toDateString().split(" "));
  };  

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    return day + "-" + month + "-" + year;
  }

  return (
    <SafeAreaView style={listStyles.listBackground}>
      <View style={globalStyles.header}>
        <Text style={listStyles.heading}>Heading</Text>
        <Text style={listStyles.count}>{entries.length}</Text>
        <Pressable onPress={deleteAllEntries}>
          <AntDesign name="delete" size={24} color="black" />
        </Pressable>
      </View>
      {/* flatlist */}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff"/>
      ) : (
        <FlatList
          data={entries}
          renderItem={({item}) => (
            <Entry item={item} getEntries={readEntry}/>
          )}
          keyExtractor={item => item.id}
        />
      )}
    
      {/* Floating Button */}
      <Pressable 
        style={listStyles.floatingButton} 
        onPress={() => setModalVisible(true)}
      >
        <AntDesign name="plus" size={24} color="white" />
      </Pressable>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={listStyles.modalView}>
          <Text style={listStyles.heading}>New Entry</Text>
          <TextInput 
            style={listStyles.titleInput} 
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
            onPress={() => setDateModal(true)}
          >
            <Text style={listStyles.dateInput}>
              Date: {formatDate(date)}
            </Text>
          </Pressable>
          <TextInput 
            style={listStyles.entryInput} 
            placeholder="Enter new entry" 
            value={textEntry}
            onChangeText={(text) => setTextEntry(text)}
          />
          <Pressable 
            style={[listStyles.button, listStyles.buttonClose]}
            onPress={addEntry}>
            <Text style={listStyles.textStyle}>Add Entry</Text>
          </Pressable>
          <Pressable
            style={[listStyles.button, listStyles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={listStyles.textStyle}>Hide Modal</Text>
          </Pressable>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const listStyles = StyleSheet.create({  
  listBackground: {
    flex: 1,
    backgroundColor: 'lightblue',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: 'skyblue',
    alignSelf: 'center',
    padding: 10,
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: 24,
    fontWeight: '400',
    flex: 1,
  },
  count: {
    fontSize: 30,
    fontWeight: '400',
    marginRight: 10,
  },
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
});

  
  