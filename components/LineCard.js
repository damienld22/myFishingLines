import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableNativeFeedback,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {launchCamera} from 'react-native-image-picker';
import {Card, Badge, Button, Image} from 'react-native-elements';
import ModalSpeechToText from './ModalSpeechToText';

const LineCard = ({
  number,
  description,
  distance,
  landmark,
  onChangeDistance,
  onChangeDescription,
  onChangeLandmark,
}) => {
  const [modalVocalIsVisible, setModalVocalIsVisible] = useState(false);

  const handleAddLandmark = () => {
    launchCamera(
      {
        mediaType: 'photo',
        includeBase64: true,
        saveToPhotos: false,
        quality: 0.5,
      },
      (picture) => {
        onChangeLandmark(picture.base64);
      },
    );
  };

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
        <TouchableNativeFeedback onPress={() => setModalVocalIsVisible(true)}>
          <Icon name="text-to-speech" type="material-community" />
        </TouchableNativeFeedback>
      </View>
      <View style={styles.secondLine}>
        <View style={styles.distanceContainer}>
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
        {landmark ? (
          <Image
            source={{uri: `data:image/gif;base64,${landmark}`}}
            style={styles.landmark}
          />
        ) : (
          <Button
            title={'Ajouter un repère'}
            type="clear"
            onPress={handleAddLandmark}
          />
        )}
      </View>

      {modalVocalIsVisible && (
        <ModalSpeechToText
          isVisible={modalVocalIsVisible}
          onClose={() => setModalVocalIsVisible(false)}
          onValid={(text) => {
            onChangeDescription(text);
            setModalVocalIsVisible(false);
          }}
        />
      )}
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
  secondLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  landmark: {
    width: 100,
    height: 100,
  },
});

export default LineCard;
