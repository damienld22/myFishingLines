import React, {useEffect, useState} from 'react';
import {Overlay, Button, Text, Icon} from 'react-native-elements';
import {StyleSheet, View} from 'react-native';
import CompassHeading from 'react-native-compass-heading';

export default function ModalAddLandmarkOrientation({
  isVisible,
  onClose,
  onValid,
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const degree_update_rate = 3;
    CompassHeading.start(degree_update_rate, (degree) => {
      // We have 20° of error
      setValue((degree + 20) % 360);
    });

    return () => {
      CompassHeading.stop();
    };
  }, []);

  return (
    <Overlay
      isVisible={isVisible}
      onBackdropPress={onClose}
      overlayStyle={styles.container}>
      <>
        <Text h4 style={styles.title}>
          Orientation du repère :
        </Text>
        <Icon type="material" name="explore" size={50} />
        <Text h4 style={styles.result}>{`${value}°`}</Text>
        <View style={styles.buttons}>
          <Button
            title={'Annuler'}
            onPress={() => {
              onClose();
            }}
          />
          <Button
            title={'Valider'}
            onPress={() => {
              onValid(value);
            }}
          />
        </View>
      </>
    </Overlay>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 300,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 30,
  },
  title: {
    marginBottom: 30,
  },
  result: {
    textAlign: 'center',
  },
});
