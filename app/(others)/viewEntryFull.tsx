import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { colors, styles } from "../../styleSheets/Styles";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import HeaderComponent from "../../components/viewEntry/HeaderComponent";
import ViewEntryComponent from "../../components/viewEntry/ViewEntryComponent";
import { readSingleEntry } from "../../utils/FireBaseHandler";

export default function viewEntryFull() {
  const { id } = useLocalSearchParams();
  if (typeof id != 'string') {
    //error
    return null;
  }

  const [title, setTitle] = useState("");
  const [textEntry, setTextEntry] = useState("");
  const [date, setDate] = useState("");

  const loadEntry = async () => {
    readSingleEntry(id).then((data) => {
      setTitle(data.title);
      setTextEntry(data.textEntry);
      setDate(data.day + "-" + data.month + "-" + data.year);
    });
  }

  const handleEditButton = () => {
    router.push({
      pathname: './editEntry',
      params: {
        id: id,
      },
    });
  }

  const goBack = () => {
    router.back();
  }

  useEffect(() => {
    loadEntry();
    console.log("View Entry Page loaded document: ", id)
  }, []);

  return (
    <SafeAreaView style={[styles.overlay, {justifyContent: "flex-start",}]}>
      <View style={viewEntryStyles.headerContainer}>
        <HeaderComponent goBack={goBack} goEdit={handleEditButton}/>
      </View>
      <View style={viewEntryStyles.viewTextContainer}>
        <ViewEntryComponent title={title} textEntry={textEntry} date={date}/>
      </View>
      
    </SafeAreaView>
  );
}

const viewEntryStyles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: '100%',
    marginVertical: 15,
  },
  viewTextContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: '100%',
  },
}) 