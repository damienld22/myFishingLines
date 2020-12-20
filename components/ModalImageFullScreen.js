import React, {useEffect, useState} from 'react';
import {Overlay, Image, Icon, Button} from 'react-native-elements';
import {
  StyleSheet,
  Image as ImageRN,
  Dimensions,
  View,
  TouchableNativeFeedback,
} from 'react-native';

export default function ModalImageFullScreen({
  isVisible,
  onClose,
  onClear,
  landmark,
}) {
  const [width, setWidth] = useState(null);
  const [height, setHeight] = useState(null);
  const [positionPicture, setPositionPicture] = useState({X: 0, Y: 0});

  const onLayoutImage = (evt) => {
    evt.target.measure((_fx, _fy, _width, _height, px, py) => {
      setPositionPicture({X: px, Y: py});
    });
  };

  useEffect(() => {
    ImageRN.getSize(
      `data:image/gif;base64,${landmark.image}`,
      (widthImage, heightImage) => {
        const screenWidth = Dimensions.get('window').width;
        const scaleFactor = widthImage / screenWidth;
        const imageHeight = heightImage / scaleFactor;
        setWidth(screenWidth);
        setHeight(imageHeight);
      },
    );
  }, [landmark]);

  return (
    <Overlay isVisible={isVisible} onBackdropPress={onClose} fullScreen={true}>
      <>
        <View style={styles.buttons}>
          <TouchableNativeFeedback onPress={onClose}>
            <Icon name="arrow-back" type="material" />
          </TouchableNativeFeedback>
          <Button
            titleStyle={styles.clearButton}
            onPress={onClear}
            title="Supprimer"
            type="clear"
          />
        </View>
        <View style={styles.container}>
          <Image
            onLayout={onLayoutImage}
            source={{uri: `data:image/gif;base64,${landmark.image}`}}
            style={{width, height}}
          />
        </View>
        <View
          style={{
            ...styles.landmark,
            left: landmark.positionLandmark.X + positionPicture.X,
            top: landmark.positionLandmark.Y + positionPicture.Y,
          }}>
          <Icon type="material" name="room" color="#FF0000" />
        </View>
      </>
    </Overlay>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  clearButton: {
    color: '#FF0000',
  },
  landmark: {
    zIndex: 9999,
    position: 'absolute',
  },
});
