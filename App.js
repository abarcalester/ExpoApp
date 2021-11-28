import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import logo from './assets/logo.png';
import * as ImagePicker from 'expo-image-picker'

export default function App() {
  let openImagePicker = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    console.log(pickerResult);
  }

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo}/>

      <Text style={styles.textInfo}>To share a photo on your phone with a friend, just press the button below</Text>
      <StatusBar style="auto" />
      <TouchableOpacity onPress={openImagePicker} style={styles.button}>
        <Text style={styles.buttonText}>
          Pick a photo
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: '100%', 
    height: 150,
  },
  textInfo: {
    color: '#888', 
    fontSize: 18,
    paddingHorizontal: 20,
    letterSpacing: 1
  },
  button: {
    backgroundColor: '#4286f4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 20,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  }
});
