import { View, SafeAreaView, StyleSheet, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { editEntry, formatDate, readSingleEntry } from "../../utils/FireBaseHandler";
import { colors, styles } from "../../styleSheets/Styles";
import DateInput from "../../components/entry/DateInput";
import ConfirmButton from "../../components/ConfirmButton";
import DescriptionInput from "../../components/entry/DescriptionInput";
import TitleInput from "../../components/entry/TitleInput";
import HeaderComponent from "../../components/HeaderComponent";

/**
 * Receives the entry id and date from the previous screen, allows the user to edit the entry
 * Before saving the entry, will prompt user with alert if there are empty fields
 * Before returning to the previous screen, will prompt user with alert if there are unsaved changes
 * Uploads changes to the database
 * @returns Edit Entry Screen
 */
export default function editEntryScreen() {
  const { id, dateString } = useLocalSearchParams();

  /**
   * checks if id and date is a string
   */
  if (typeof id != 'string' || typeof dateString != 'string') {
    //error
    return null;
  }

  const [title, setTitle] = useState("");
  const [textEntry, setTextEntry] = useState("");
  const [date, setDate] = useState(formatDate(new Date(dateString))); //Format: "YYYY-MM-DD"
  const [loading, setLoading] = useState(true); //Loading state (Maybe remove it later)

  /**
   * Function that handles loading the entry data onto the screen
   */
  const handleLoadEntry = async () => {
    readSingleEntry(id).then((data) => {
      setTitle(data.title);
      setTextEntry(data.textEntry);
      setDate(data.year + "-" + data.month + "-" + data.day);
    });
  }

  /**
   * Function to handle when the edit entry button is pressed
   */
  const handleEditEntry = () => {
    console.log("Edit Entry Button Pressed");
    if (title === "" || date === "" || textEntry === "") {
      Alert.alert("Please don't leave any fields empty");
    }
    else {
      editEntry(id, title, date, textEntry);
      setTitle("");
      setTextEntry("");
      setDate("");
      router.back();
    }
  }

  /**
   * Function to go back to the previous screen
   * To be implemented: Before going back, will prompt user with alert if there are unsaved changes
   * Resets the title, textEntry, and date states
   */
  const goBack = () => {
    setTitle("");
    setTextEntry("");
    setDate("");
    router.back();
  };

  /**
   * When the screen is loaded, load the entry data
   * (Loading state consider removing it later)
   */
  useEffect(() => {
    if (title === "" && textEntry === "" && date === "") {
      setLoading(true);
      handleLoadEntry();
    } else {
      handleLoadEntry();
    }
    setLoading(false);
    console.log("Edit Entry Page loaded document: ", id);
  }, []);

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: colors.background, //Color: Dark Blue
      alignItems: 'center',
      padding: 10,
      justifyContent: "flex-start",
    }}>
      {/* Header */}
      <View style={editEntryStyles.headerContainer}>
        <HeaderComponent title={"Edit Entry"} goBack={goBack}/>
      </View>
      {/*Entry data input fields*/}
      <View style={{padding: 10, alignItems: "center"}}>
        {/* Date Input */}
        <View style={editEntryStyles.inputContainer}>
          <DateInput text={date} setText={setDate}/>
        </View>
        {/* Title Input */}
        <View style={editEntryStyles.inputContainer}>
          <TitleInput text={title} setText={setTitle}/>
        </View>
        {/* Description Input */}
        <View style={editEntryStyles.inputContainer}>
          <DescriptionInput text={textEntry} setText={setTextEntry}/>
        </View>
      </View>
      {/* Edit Entry Button */}
      <View style={editEntryStyles.buttonContainer}>
        <ConfirmButton handlePress={handleEditEntry} title="Edit Entry"/>
      </View>
    </SafeAreaView>
  );
};

const editEntryStyles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: '100%',
    marginVertical: 15,
  },
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    flexDirection: "row",
    borderColor: "red",
    borderWidth: 1,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 1,
    width: "100%",
  },
});