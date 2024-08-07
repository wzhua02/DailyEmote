import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Card } from '@rneui/base'
import { entryData } from '../../../utils/FireBaseHandler';

type CardProps = {
  item: entryData;
  gotoViewEntry: (text: string) => void;
}

export default function CardComponent({ item, gotoViewEntry }: CardProps) {
  return (
    <View>
      <TouchableOpacity onPress={() => { gotoViewEntry(item.id) }}>
        <Card containerStyle={{ height: 262 }}>
          <Card.Title
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{ marginBottom: -15 }}
          >
            {item.title}
          </Card.Title>
          <Card.Divider style={{ marginTop: 15 }} />
          <Card.Image
            style={{ paddingTop: 30 }}
            source={{
              uri:
                'https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg',
            }}
          />
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={{ textAlign: 'justify', paddingTop: 10, lineHeight: 19}}
          >
            {item.textEntry}
          </Text>
        </Card>
      </TouchableOpacity>
    </View>
  )
}