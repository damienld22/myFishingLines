import React from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';
import {Card, Badge} from 'react-native-elements';

const LineCard = ({
  number,
  description,
  distance,
  onChangeDistance,
  onChangeDescription,
}) => {
  return (
    <Card style={styles.card}>
      <View style={styles.line}>
        <Badge value={number} badgeStyle={styles.badge} />
        <TextInput
          multiline
          value={description || ''}
          style={styles.text}
          editable
          placeholder="Description"
          keyboardType="default"
          onChangeText={onChangeDescription}
        />
      </View>
      <View style={styles.line}>
        <TextInput
          value={distance || ''}
          style={distance ? styles.distance : ''}
          editable
          placeholder="Distance"
          keyboardType="numeric"
          onChangeText={onChangeDistance}
        />
        <Text>{distance ? 'm' : ''}</Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'column',
  },
  line: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  text: {
    flex: 1,
    marginLeft: 10,
    textAlign: 'center',
  },
  distance: {
    width: 35,
  },
  badge: {
    width: 25,
    height: 25,
  },
});

export default LineCard;
