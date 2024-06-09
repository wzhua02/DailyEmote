import { View, Text, Button, Modal, Pressable, TextInput } from 'react-native'
import { globalStyles } from '../../styleSheets/Styles';
import { useState } from 'react';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

const datepick = () => {
  const [dateModal, setDateModal] = useState(false);
  const [date, setDate] = useState(new Date());

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setDateModal(false);
    setDate(currentDate);
    console.log(currentDate.toDateString().split(" "));
  };

  return (
    <View style={globalStyles.background}>
      {dateModal && (
        <DateTimePicker
          mode="date"
          display="spinner"
          value={date}
          onChange={onChange}
        />
      )}
      <Pressable onPress={() => setDateModal(true)}>
        <TextInput
          style={globalStyles.input}
          editable={false}
          placeholder='Select Date'
          value={date.toDateString()}
        />
      </Pressable>
    </View>
  )
}

export default datepick;

{/* <Button 
        title="Select Date" 
        onPress={() => setDateModal(true)}
      />
      <DatePicker
        modal
        open={dateModal}
        date={date}
        onConfirm={(date) => {
          setDate(date);
          setDateModal(false);
        }}
        onCancel={() => setDateModal(false)}
      /> */}