import { StyleSheet, SafeAreaView, Text, View, Pressable, Modal } from "react-native";
import { globalStyles } from "../styleSheets/Styles";
import { AntDesign } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import { FIREBASE_DB } from "../FireBaseConfig";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { entryData } from "../app/(tabs)/list";

type EntryProps = {
  item: entryData
  getEntries: () => void
}

export default function DisplayEntry({ item, getEntries }: EntryProps) {
  const [isHappy, setIsHappy] = useState(item.isHappy);
  const [modalVisible, setModalVisible] = useState(false);
  
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
      <Pressable onPress={() => setModalVisible(true)}>
        <Text style={entryStyles.text}>{item.title}</Text>
      </Pressable>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        
      </Modal>
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
  