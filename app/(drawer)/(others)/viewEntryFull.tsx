import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { colors, styles } from "../../../styleSheets/Styles";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import HeaderComponent from "../../../components/viewEntry/HeaderComponent";
import ViewEntryComponent from "../../../components/viewEntry/ViewEntryComponent";
import { doc, getDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../../../FireBaseConfig";

export default function viewEntryFull() {
  const { id } = useLocalSearchParams();

  const [title, setTitle] = useState("");
  const [textEntry, setTextEntry] = useState("");
  const [date, setDate] = useState("");

  if (typeof id != 'string') {
    //error
    return null;
  }

  const loadDoc = async () => {
    try {
      const docRef = doc(FIREBASE_DB, "entries", id);
      const document = await getDoc(docRef);
      if (document.exists()) {
        console.log("Document data:", document.data());
        setTitle(document.data().title);
        setTextEntry(document.data().textEntry);
        setDate(`${document.data().day}-${document.data().month}-${document.data().year}`);
      } else {
        // doc.data() will be undefined
        console.log("Document not found!");
      }
    } catch (e) {
      console.error("Error getting document:", e);
    }
  }

  const handleEditButton = () => {
    router.navigate({
      pathname: 'editEntry',
      params: {
        id: id,
        title: title,
        textEntry: textEntry,
        date: date,
      },
    });
  }

  const goBack = () => {
    router.back();
  }

  useFocusEffect(
    useCallback(() => {
    const loadPage = loadDoc();
    console.log("loaded: ", id);
    return () => loadPage;
  }, [])
);

  return (
    <SafeAreaView style={[styles.overlay, {justifyContent: "flex-start",}]}>
      <View style={styles.headerContainer}>
        <HeaderComponent goBack={goBack} goEdit={handleEditButton}/>
      </View>
      <View style={viewEntryStyles.viewTextContainer}>
        <ViewEntryComponent title={title} textEntry={textEntry} date={date}/>
      </View>
      
    </SafeAreaView>
  );
}

const viewEntryStyles = StyleSheet.create({
  viewTextContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: '100%',
  },
}) 
