import React, {useEffect, useState} from 'react';
import {Overlay, Image, Icon} from 'react-native-elements';
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

  useEffect(() => {
    ImageRN.getSize(
      `data:image/gif;base64,${landmark}`,
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
      <View style={styles.buttons}>
        <TouchableNativeFeedback onPress={onClose}>
          <Icon name="arrow-back" type="material" />
        </TouchableNativeFeedback>
        <TouchableNativeFeedback onPress={onClear}>
          <Icon name="clear" type="material" />
        </TouchableNativeFeedback>
      </View>
      <View style={styles.container}>
        <Image
          source={{uri: `data:image/gif;base64,${landmark}`}}
          style={{width, height}}
        />
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
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
