import { StyleSheet, SafeAreaView, Text, View, Pressable } from "react-native";
import { globalStyles } from "../styleSheets/Styles";
import { AntDesign } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import { FIREBASE_DB } from "../FireBaseConfig";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { entryData } from "../app/(tabs)/list";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

//each diary entry
/*
  1. id
  2. title
  3. isHappy
  4. date
  5. textEntry
*/
type EntryProps = {
  item: entryData
  getEntries: () => void
}

export default function Entry({ item, getEntries }: EntryProps) {
  const [isHappy, setIsHappy] = useState(item.isHappy);
  
  const updateIsHappy = async () => {
    const entryRef = doc(FIREBASE_DB, "entries", item.id);
    await updateDoc(entryRef, {
      isHappy: isHappy,
    });
  }

  const deleteEntry = async () => {
    const entryRef = doc(FIREBASE_DB, "entries", item.id);
    await deleteDoc(entryRef);
    getEntries();
  }

  useEffect(() => {
    updateIsHappy();
  }, [isHappy]);

  return (
    <View style={entryStyles.entry}>
      {/* Emoticon */}
      <Pressable onPress={() => setIsHappy(!isHappy)}>
        { isHappy ? (
          <AntDesign name="smileo" size={24} color="black" style={entryStyles.icons}/>
        ) : (
          <AntDesign name="frowno" size={24} color="black" style={entryStyles.icons}/>
        )}
      </Pressable>
      {/* Text Entry */}
      <Text style={entryStyles.text}>{item.title}</Text>
      {/* Delete Button */}
      <Pressable onPress={deleteEntry}>
        <AntDesign name="delete" size={24} color="black"/>
      </Pressable>
    </View>
  );
}

const entryStyles = StyleSheet.create({
  entry: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 4,
    padding: 10,
    backgroundColor: 'lightgray',
    borderRadius: 4,
  },
  text: {
    marginHorizontal: 10,
    fontSize: 17,
    fontWeight: '500',
    flex: 1,
  },
  icons: {
    flex: 0.1,
  }
})
  