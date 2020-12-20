import React, {useEffect, useState} from 'react';
import {Overlay, Image, Text, Button, Icon} from 'react-native-elements';
import {
  StyleSheet,
  Image as ImageRN,
  Dimensions,
  View,
  TouchableNativeFeedback,
} from 'react-native';

export default function ModalImageAddLandmark({
  isVisible,
  onClose,
  onValid,
  image,
}) {
  const [width, setWidth] = useState(null);
  const [height, setHeight] = useState(null);
  const [positionLandmark, setPositionLandmark] = useState({X: -50, Y: -50});
  const [positionPicture, setPositionPicture] = useState({X: 0, Y: 0});

  const onLayoutImage = (evt) => {
    evt.target.measure((_fx, _fy, _width, _height, px, py) => {
      setPositionPicture({X: px, Y: py});
    });
  };

  const handleClick = (evt) => {
    const X = evt.nativeEvent.pageX - 20; // Remove 20px to integrate size of element
    const Y = evt.nativeEvent.pageY - 20; // Remove 20px to integrate size of element
    setPositionLandmark({X, Y});
  };

  useEffect(() => {
    ImageRN.getSize(
      `data:image/gif;base64,${image}`,
      (widthImage, heightImage) => {
        const screenWidth = Dimensions.get('window').width;
        const scaleFactor = widthImage / screenWidth;
        const imageHeight = heightImage / scaleFactor;
        setWidth(screenWidth);
        setHeight(imageHeight);
      },
    );
  }, [image]);

  return (
    <Overlay isVisible={isVisible} onBackdropPress={onClose} fullScreen={true}>
      <Text h4>Ajouter un repère :</Text>
      <Text style={styles.instruction}>
        Ajoutez un repère en cliquant sur l'image
      </Text>
      <View style={styles.container}>
        <TouchableNativeFeedback onPress={handleClick} onLayout={onLayoutImage}>
          <Image
            source={{uri: `data:image/gif;base64,${image}`}}
            style={{width, height}}
          />
        </TouchableNativeFeedback>
      </View>

      <View style={styles.buttons}>
        <Button onPress={onClose} title="Annuler" type="clear" />
        <Button
          onPress={() => {
            onValid({
              image,
              positionLandmark: {
                X: positionLandmark.X - positionPicture.X,
                Y: positionLandmark.Y - positionPicture.Y,
              },
            });
          }}
          title="Valider"
          type="clear"
        />
      </View>
      <View
        style={{
          ...styles.landmark,
          left: positionLandmark.X,
          top: positionLandmark.Y,
        }}>
        <Icon type="material" name="room" color="#FF0000" />
      </View>
    </Overlay>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  instruction: {
    fontStyle: 'italic',
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    bottom: 0,
    marginTop: 'auto',
  },
  landmark: {
    zIndex: 9999,
    position: 'absolute',
  },
});
