import { StyleSheet } from 'react-native'

export const globalStyles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'skyblue',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginBottom: 20,
    padding: 10,
    // backgroundColor: "red",
    alignItems: 'center',
  },
  headingText: {
    fontSize: 24, // Large text
    fontWeight: 'bold', // Bold text
    color: '#333333', // Dark gray color for the text
    flex: 1,
  },
  textInput: {
    marginVertical: 4,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff',
  },
  listItem: {
    marginVertical: 4,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: 'lightgray',
    flexDirection: 'row',
  },
  text: {
    marginHorizontal: 10,
    fontSize: 17,
    fontWeight: '500',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: 'blue',
    borderRadius: 50,
    padding: 15,
    elevation: 5,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginVertical: 10,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    padding: 10,
    backgroundColor: 'lightgray',
    fontSize: 17,
    alignSelf: 'center',
    borderRadius: 4,
    marginTop: "auto",
    width: "100%",
  },
});