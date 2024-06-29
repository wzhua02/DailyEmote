import { View, StyleSheet, ActivityIndicator, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, styles } from '../../../styleSheets/Styles'
import Entry from './modalListEntry'
import { entryData, modalContentProps } from '../../../types/Types'
import { collection, getDocs } from 'firebase/firestore'
import { FIREBASE_DB } from '../../../FireBaseConfig'
import { readDateEntry } from '../../../utils/FireBaseHandler'

/**
   * Function to display all entries given a selectedDate.
   * @param selectedDate - the date selected by the user
   * @param closeModal - function to close the modal
   * @returns loading circle if entries are being read, 
   * otherwise a list of entries
   */
export default function modalList({ selectedDate, closeModal }: modalContentProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [entries, setEntries] = useState<entryData[]>([]);

  /**
   * Function to load entries
   */
  const loadEntries = async () => {
    setLoading(true);
    await readDateEntry(selectedDate, setEntries);
    console.log("ran readDateEntry");
    setLoading(false);
  };

  useEffect(() => {
    loadEntries();
  }, []);

  return (
    <View style={modalListStyles.listEntries}>
      {loading ? (
        console.log("Loading"),
        <ActivityIndicator size="large" color={colors.accent} />
      ) : (
        console.log(entries),
        <FlatList
          data={entries}
          renderItem={({ item }) => (
            <Entry
              item={item}
              closeModal={closeModal}
              reload={loadEntries}
            />
          )}
          keyExtractor={(item) => item.id}
          scrollEnabled={true}
          contentContainerStyle={{ flexGrow: 1 }}
        />
      )}
    </View>
  );
}

const modalListStyles = StyleSheet.create({
  listEntries: {
    width: "90%",
    maxHeight: "80%",
    flexGrow: 1,
    marginVertical: 10,
  },
})