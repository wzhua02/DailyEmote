import { View, Text, Pressable, StyleSheet, Alert } from 'react-native'
import React from 'react'
import { colors, styles } from '../../styleSheets/Styles'
import { addDoc, collection } from 'firebase/firestore';
import { FIREBASE_DB } from '../../FireBaseConfig';
import { router } from 'expo-router';
import { AddEntryButtonProps } from '../../types/Types';


export default function AddEntryButton({ title, dateString, textEntry, resetAll }: AddEntryButtonProps) {
 
  const handleAddEntry = async () => {
    console.log("Add Entry Button Pressed");
    if (title === "" || dateString === "" || textEntry === "") {
      Alert.alert("Please don't leave any fields empty");
    }
    const [ year, month, day ] = dateString.split("-");
    try {
      const entriesRef = collection(FIREBASE_DB, "entries");
      const document = await addDoc(entriesRef, {
        title: title,
        year: year,
        month: month,
        day: day,
        textEntry: textEntry,
      });
      console.log("Document written with ID: ", document.id);
      resetAll();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <View>
      <Pressable 
        style={styles.button}
        onPress={handleAddEntry}
      >
        <Text style={styles.whiteText}>Add Entry</Text>
      </Pressable>
    </View>
  );
}