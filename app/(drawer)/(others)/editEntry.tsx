import { View, Text, TextInput, Pressable, SafeAreaView, StyleSheet } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../../../FireBaseConfig";
import { colors, styles } from "../../../styleSheets/Styles";
import HeaderComponent from "../../../components/editEntry/HeaderComponent";
import AddEntryComponents from "../../../components/createEntry/AddEntryComponents";
import EditEntryButton from "../../../components/editEntry/EditEntryButton";

type Params = {
  id: string;
  title: string;
  textEntry: string;
  date: string;
}

export default function editEntry() {
  const { id, title, textEntry, date } = useLocalSearchParams<Params>();
  console.log("id: ", id);
  console.log("title: ", title);
  console.log("textEntry: ", textEntry);
  console.log("date: ", date);

  const [targetId, setTargetId] = useState(id || "");
  const [titleEdit, setTitleEdit] = useState(title || "");
  const [textEntryEdit, setTextEntryEdit] = useState(textEntry || "");
  const [dateStringEdit, setDateStringEdit] = useState(date || new Date().toDateString());

  const goBack = () => {
    router.back();
  };

  const resetAll = () => {
    setTitleEdit("");
    setTextEntryEdit("");
    setDateStringEdit("");
    router.back();
  };

 return (
  <SafeAreaView style={[styles.overlay, {justifyContent: "flex-start",}]}>
    <View style={styles.headerContainer}>
      <HeaderComponent goBack={goBack}/>
    </View>

    <View style={editEntryStyles.editTextContainer}>
      <AddEntryComponents 
          dateString={dateStringEdit} 
          setDateString={setDateStringEdit} 
          title={titleEdit} 
          setTitle={setTitleEdit} 
          textEntry={textEntryEdit} 
          setTextEntry={setTextEntryEdit}
        />
    </View>

    <View style={editEntryStyles.buttonContainer}>
      <EditEntryButton 
          id={targetId}
          title={titleEdit} 
          dateString={dateStringEdit} 
          textEntry={textEntryEdit} 
          resetAll={resetAll}
        />
    </View>
    
  </SafeAreaView>
 );
};

const editEntryStyles = StyleSheet.create({
  editTextContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: '100%',
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 1,
    width: "100%",
  },
}) 

