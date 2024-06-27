import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { textInputProps } from '../../types/Types'
import { colors, styles } from '../../styleSheets/Styles'

export default function EntryInput({ text, setText }: textInputProps) {
  return (
    <View style={entryInputStyles.inputContainer}>
      <TextInput 
        style={[entryInputStyles.inputBox, entryInputStyles.text]}
        placeholder="Enter how you are feeling here"
        value={text}
        onChangeText={(text) => setText(text)}
        multiline={true}
        numberOfLines={6}
      />
    </View>
  )
}

const entryInputStyles = StyleSheet.create({
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  inputBox: {
    padding: 10,
    borderRadius: 10,
    width: "100%",
    backgroundColor: colors.contrastBackground, //Color: Dark Gray
  },
  text: {
    color: colors.secondary,
    fontSize: 20,
  }
})