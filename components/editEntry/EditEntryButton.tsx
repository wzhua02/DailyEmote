import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { EditEntryButtonProps } from '../../types/Types'
import { styles } from '../../styleSheets/Styles'
import { doc, updateDoc } from 'firebase/firestore'
import { FIREBASE_DB } from '../../FireBaseConfig'

export default function EditEntryButton({ id, title, dateString, textEntry, resetAll }: EditEntryButtonProps) {
  const handleEditEntry = async () => {
    console.log("Edit Entry Button Pressed");
    try {
      const docRef = doc(FIREBASE_DB, "entries", id);
      const document = await updateDoc(docRef, {
        title: title,
        textEntry: textEntry,
        dateString: dateString,
      });
    } catch (e) {
      console.error("Error updating document: ", e);
    }
    resetAll();
  }
  
  return (
    <View>
      <Pressable 
        style={styles.button}
        onPress={handleEditEntry}
      >
        <Text style={styles.whiteText}>Save Changes</Text>
      </Pressable>
    </View>
  )
}