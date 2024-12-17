import React, { useState } from 'react';
import { StyleSheet, TextInput, Pressable, Image, ScrollView, View, Text, Alert, TouchableOpacity } from 'react-native';
import { requestGalleryPermission, requestCameraPermission } from '../utils/Permissions';
import { pickImageFromGallery, captureImageWithCamera } from '../utils/Camera';
import { useNavigation } from '@react-navigation/native';

export default function MainScreen() {
  const [mineralType, setMineralType] = useState('');
  const navigation = useNavigation();

  const handleGalleryPick = async () => {
    const hasPermission = await requestGalleryPermission();
    if (hasPermission) {
      const image = await pickImageFromGallery();
      console.log('Gallery image:', image);
    } else {
      Alert.alert('Permission Denied', 'Gallery access is required to select photos.');
    }
  };

  const handleCameraCapture = async () => {
    const hasPermission = await requestCameraPermission();
    if (hasPermission) {
      const image = await captureImageWithCamera();
      console.log('Captured image:', image);
    } else {
      Alert.alert('Permission Denied', 'Camera access is required to take photos.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require('../assets/mainimage.webp')}
        style={styles.image}
      />
      <Text style={styles.title}>Discover Minerals</Text>
      <View style={styles.separator} />
      <View style={styles.mineralSelector}>
        <Text style={styles.label}>Select Mineral Type</Text>
        <TextInput
          value={mineralType}
          onChangeText={(text) => setMineralType(text)}
          placeholder="Enter mineral type"
          style={styles.input}
        />
      </View>
      <Pressable style={styles.uploadButton} onPress={handleGalleryPick}>
        <Text style={styles.buttonText}>Upload Photo</Text>
      </Pressable>
      <Pressable style={styles.addButton} onPress={handleCameraCapture}>
        <Text style={styles.buttonText}>Add Photo</Text>
      </Pressable>

      {/* Go to Details butonunu ekleyelim */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.uploadButton} // Aynı stil buton kullanılarak, farklı görünümü için başka bir stil kullanılabilir
          onPress={() => navigation.navigate('Details')}
        >
          <Text style={styles.buttonText}>Go to Details</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F2F2F2',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2F4F4F',
    marginBottom: 20,
    textAlign: 'center',
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: '80%',
    alignSelf: 'center',
    backgroundColor: '#DDD',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 20,
  },
  uploadButton: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: '#A0D6B4',
    borderWidth: 2,
    borderColor: '#8CCFBA',
  },
  addButton: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: '#FF6F61',
    borderWidth: 2,
    borderColor: '#FF8DAA',
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#FFF',
    fontSize: 16,
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  mineralSelector: {
    width: '100%',
    marginVertical: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
