import { View, Text, FlatList } from 'react-native'
import React, { useState } from 'react'
import { Card } from '@rneui/base';
import { colors } from '../../styleSheets/Styles'
import { entryData } from '../../types/Types';

export default function CardsListComponent(data: entryData[]) {

  console.log("Inside flatlist: ", data);
  
  return (
    <View>
       <FlatList     // KME for Cards to display 
            extraData={data}
            data = {data}
            horizontal
            persistentScrollbar = {true}
            showsHorizontalScrollIndicator = {false}
            keyExtractor={i => i.id}
            renderItem={({item}) => {
              console.log("Title: ", item.title);
              console.log("Text: ", item.textEntry);
              console.log("Day: ", item.day);
              console.log("Month: ", item.month);
              console.log("Year: ", item.year);

              return (
                <View style ={{ width: 300 }}>
                <Card containerStyle = {{height: 265}}>
                  <Card.Title 
                    numberOfLines = {1}
                    ellipsizeMode = "tail"
                    style = {{marginBottom: -10}}
                  >
                    {item.title}
                  </Card.Title>
                  <Card.Divider style = {{marginTop: 15}}/>
                  <Card.Image
                    style={{ paddingTop: -10}}
                    source={{
                      uri:
                        'https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg',
                    }}
                  />
                  <Text 
                    numberOfLines = {2} 
                    ellipsizeMode = "tail" 
                    style={{ textAlign: 'justify', paddingTop: 10 }}
                  >
                    {item.textEntry}
                  </Text>
              </Card>
              </View>
              );
            }}>
        </FlatList>
    </View>
  )
}

const CardsListStyles = {
  
}