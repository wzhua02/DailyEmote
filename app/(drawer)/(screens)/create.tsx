import { View, Text, TextInput, Pressable, SafeAreaView, TouchableOpacity, StyleSheet } from "react-native";

import React, { useState } from "react";
import { router } from "expo-router";
import { styles } from "../../../styleSheets/Styles";
import HeaderComponent from "../../../components/createEntry/HeaderComponent";
import DateInput from "../../../components/createEntry/DateInput";
import TitleInput from "../../../components/createEntry/TitleInput";
import EntryInput from "../../../components/createEntry/EntryInput";
import AddEntryButton from "../../../components/createEntry/AddEntryButton";
import AddEntryComponents from "../../../components/createEntry/AddEntryComponents";


const create = () => {
  const [title, setTitle] = useState("");
  const [textEntry, setTextEntry] = useState("");
  const [dateString, setDateString] = useState(""); //Format: "YYYY-MM-DD"

  const goBack = () => {
    router.back();
  };

  const resetAll = () => {
    setTitle("");
    setTextEntry("");
    setDateString("");
    router.back();
  };

  return (
    <SafeAreaView style={[styles.overlay, {justifyContent: "flex-start",}]}>
      <View style={styles.headerContainer}>
        <HeaderComponent goBack={goBack}/>
      </View>
      
      <View style={{width: "100%"}}>
      <AddEntryComponents 
        dateString={dateString} 
        setDateString={setDateString} 
        title={title} 
        setTitle={setTitle} 
        textEntry={textEntry} 
        setTextEntry={setTextEntry}
      />
      </View>
      
      <View style={addEntryStyles.buttonContainer}>
        <AddEntryButton 
          title={title} 
          dateString={dateString} 
          textEntry={textEntry} 
          resetAll={resetAll}
        />
      </View>

    </SafeAreaView>
  );
};

export default create;

const addEntryStyles = StyleSheet.create({
  boxComponent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: '100%',
  },
  inputContainer: {
    padding: 10,
    marginVertical: 10,
    flex: 2,
  },
  entryContainer: {
    padding: 10,
    marginVertical: 10,
    height: 300,
    width: '100%',
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 1,
    width: "100%",
  },
});
