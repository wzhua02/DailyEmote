import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { styles } from '../../styleSheets/Styles';
import DateInput from './DateInput';
import TitleInput from './TitleInput';
import EntryInput from './EntryInput';
import { AddEntryProps } from '../../types/Types';

export default function AddEntryComponents({ dateString, setDateString, title, setTitle, textEntry, setTextEntry }: AddEntryProps) {
  return (
    <View>
      <View style={addEntryStyles.boxComponent}>
        <Text style={styles.whiteText}>Date: </Text>
        <View style={addEntryStyles.inputContainer}>
        <DateInput text={dateString} setText={setDateString}/>
        </View>
      </View>

      <View style={addEntryStyles.boxComponent}>
        <Text style={styles.whiteText}>Title: </Text>
        <View style={addEntryStyles.inputContainer}>
        <TitleInput text={title} setText={setTitle}/>
        </View>
      </View>

      <View style={[addEntryStyles.boxComponent, {flexDirection: "column"}]}>
        <Text style={styles.whiteText}>Description: </Text>
        <View style={addEntryStyles.entryContainer}>
        <EntryInput text={textEntry} setText={setTextEntry}/>
        </View>
      </View>
    </View>
  )
}

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
