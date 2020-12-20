import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableNativeFeedback,
} from 'react-native';
import {launchCamera} from 'react-native-image-picker';
import {Card, Badge, Icon, Image, Button} from 'react-native-elements';
import ModalSpeechToText from './ModalSpeechToText';
import ModalClearAll from './ModalClearAll';
import ModalImageFullScreen from './ModalImageFullScreen';
import ModalImageAddLandmark from './ModalImageAddLandmark';
import ModalAddLandmarkOrientation from './ModalAddLandmarkOrientation';

const LineCard = ({
  number,
  description,
  distance,
  landmark,
  landmarkOrientation,
  onChangeDistance,
  onChangeDescription,
  onChangeLandmark,
  onChangeLandmarkOrientation,
}) => {
  const [modalVocalIsVisible, setModalVocalIsVisible] = useState(false);
  const [modalClearAllIsVisible, setModalClearAllIsVisible] = useState(false);
  const [
    modalAddLandmarkOrientationIsVisible,
    setModalAddLandmarkOrientationIsVisible,
  ] = useState(false);
  const [modalImageFullScreen, setImageFullScreen] = useState(null);
  const [imageToEdit, setImageToEdit] = useState(null);

  const handleAddLandmark = () => {
    launchCamera(
      {
        mediaType: 'photo',
        includeBase64: true,
        saveToPhotos: false,
        quality: 0.5,
      },
      (picture) => {
        setImageToEdit(picture.base64);
      },
    );
  };

  return (
    <Card style={styles.card}>
      <View style={styles.firstLine}>
        <Badge value={number} badgeStyle={styles.badge} />
        <TouchableNativeFeedback
          onPress={() => setModalClearAllIsVisible(true)}>
          <Icon
            style={styles.clear}
            name="clear"
            color={'#f00'}
            type="material"
          />
        </TouchableNativeFeedback>
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
      <View style={styles.line}>
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
      <View style={styles.markerLine}>
        <View style={styles.addLandmarkContainer}>
          {landmarkOrientation ? (
            <TouchableNativeFeedback
              onPress={() => setModalAddLandmarkOrientationIsVisible(true)}>
              <View style={styles.landmarkOrientationDisplay}>
                <Icon type="material" name="explore" size={15} />
                <Text>{`${landmarkOrientation}°`}</Text>
              </View>
            </TouchableNativeFeedback>
          ) : (
            <Button
              onPress={() => setModalAddLandmarkOrientationIsVisible(true)}
              type="clear"
              icon={{
                name: 'add-location',
                type: 'material',
                size: 20,
              }}
            />
          )}
          {landmark ? (
            <TouchableNativeFeedback onPress={() => setImageFullScreen(true)}>
              <Image
                source={{uri: `data:image/gif;base64,${landmark.image}`}}
                style={styles.landmark}
              />
            </TouchableNativeFeedback>
          ) : (
            <Button
              onPress={handleAddLandmark}
              type="clear"
              icon={{
                name: 'add-a-photo',
                type: 'material',
                size: 20,
              }}
            />
          )}
        </View>
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
      {modalClearAllIsVisible && (
        <ModalClearAll
          isVisible={modalClearAllIsVisible}
          onClose={() => setModalClearAllIsVisible(false)}
          onValid={() => {
            onChangeDescription('');
            onChangeDistance('');
            onChangeLandmark('');
            setModalClearAllIsVisible(false);
          }}
        />
      )}
      {modalImageFullScreen && (
        <ModalImageFullScreen
          isVisible={modalImageFullScreen}
          onClose={() => setImageFullScreen(false)}
          landmark={landmark}
          onClear={() => {
            setImageFullScreen(false);
            onChangeLandmark('');
          }}
        />
      )}
      {imageToEdit && (
        <ModalImageAddLandmark
          isVisible={Boolean(imageToEdit)}
          onClose={() => setImageToEdit(null)}
          onValid={(res) => {
            onChangeLandmark(res);
            setImageToEdit(null);
          }}
          image={imageToEdit}
        />
      )}
      {modalAddLandmarkOrientationIsVisible && (
        <ModalAddLandmarkOrientation
          isVisible={modalAddLandmarkOrientationIsVisible}
          onClose={() => setModalAddLandmarkOrientationIsVisible(null)}
          onValid={(value) => {
            onChangeLandmarkOrientation(value);
            setModalAddLandmarkOrientationIsVisible(false);
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
  firstLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  line: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  markerLine: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  text: {
    flex: 1,
  },
  distance: {
    width: 35,
  },
  badge: {
    width: 25,
    height: 25,
  },
  landmark: {
    width: 80,
    height: 80,
    marginRight: 10,
    marginLeft: 10,
  },
  clear: {
    marginLeft: 20,
  },
  addLandmarkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  landmarkOrientationDisplay: {
    marginRight: 20,
    marginLeft: 20,
  },
});

export default LineCard;
