import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { colors, styles } from '../../styleSheets/Styles';
import { textInputProps } from '../../types/Types';

export default function TitleInput({ text, setText }: textInputProps) {
  return (
    <View style={titleStyles.inputContainer}>
      <TextInput 
        style={[titleStyles.inputBox, titleStyles.text]}
        placeholder="Title"
        value={text}
        onChangeText={(text) => setText(text)}
        multiline={true}
        numberOfLines={1}
      />
    </View>
  )
}

const titleStyles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  inputBox: {
    padding: 10,
    borderRadius: 10,
    flex: 2,
    backgroundColor: colors.contrastBackground, //Color: Dark Gray
  },
  text: {
    color: colors.secondary,
    fontSize: 20,
  }
});