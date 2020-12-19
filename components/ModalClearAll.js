import React from 'react';
import {Overlay, Button, Text} from 'react-native-elements';
import {StyleSheet, View} from 'react-native';

export default function ModalClearAll({isVisible, onClose, onValid}) {
  return (
    <Overlay
      isVisible={isVisible}
      onBackdropPress={onClose}
      overlayStyle={styles.container}>
      <>
        <Text h4>Voulez-vous vraiment supprimer cette ligne ?</Text>
        <View style={styles.buttons}>
          <Button title={'Annuler'} onPress={onClose} />
          <Button title={'Valider'} onPress={onValid} />
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
});
