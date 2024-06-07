import { StyleSheet, Pressable, SafeAreaView, Text, TextInput, View, FlatList, ActivityIndicator, Modal } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { globalStyles } from "../../styleSheets/Styles";
import Entry from "../../components/entry";
import { useState, useEffect } from "react";
import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { FIREBASE_DB } from "../../FireBaseConfig";
import { Calendar } from "react-native-calendars";

//each diary entry
/*
  1. id
  2. title
  3. isHappy
  4. date
  5. textEntry
*/
export type entryData = {
  id: string,
  title: string,
  isHappy: boolean,
  date: string,
  textEntry: string,
}

export default function List() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [textEntry, setTextEntry] = useState("");
  const [entries, setEntries] = useState([] as entryData[]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");

  const addEntry = async () => {
    try {
      const docRef = await addDoc(collection(FIREBASE_DB, "entries"), {
        title: title,
        isHappy: false,
        date: date,
        textEntry: textEntry,
      });
      console.log("Document written with ID: ", docRef.id);
      setTitle("");
      setDate("");
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
          <TextInput 
            style={listStyles.dateInput} 
            placeholder="Date" 
            value={date}
            onChangeText={(text) => setDate(text)}
          />
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

  
  