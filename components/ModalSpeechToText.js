import React, {useEffect, useState} from 'react';
import {Overlay, Button, Text} from 'react-native-elements';
import {StyleSheet, View} from 'react-native';
import Voice from '@react-native-community/voice';

export default function ModalSpeechToText({isVisible, onClose, onValid}) {
  const [text, setText] = useState('');

  useEffect(() => {
    Voice.onSpeechResults = ({value}) => setText(value[0]);
    Voice.start('fr-FR');
  }, []);

  return (
    <Overlay
      isVisible={isVisible}
      onBackdropPress={onClose}
      overlayStyle={styles.container}>
      <>
        <Text h4 style={styles.title}>
          Énoncez la description :
        </Text>
        <Text style={styles.text}>{text || ''}</Text>
        <View style={styles.buttons}>
          <Button
            title={'Annuler'}
            onPress={() => {
              Voice.destroy();
              onClose();
            }}
          />
          <Button
            title={'Valider'}
            onPress={() => {
              Voice.destroy();
              onValid(text);
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
  text: {
    textAlign: 'center',
  },
});
