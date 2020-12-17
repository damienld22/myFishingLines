import React from 'react';
import {SafeAreaView, StyleSheet, ScrollView, StatusBar} from 'react-native';
import Home from './components/Home';

const App = () => {
  return (
    <>
      <StatusBar />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Home />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {},
});

export default App;
