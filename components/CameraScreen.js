import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { purple_80, darkPurple } from "../utils/colours";

const CameraScreen = (props) => {
  console.log('Cam props: ', props);
  
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');

      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === 'granted');

    })();

  }, []);

  
  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      setImage(data.uri);
    }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const { goBack } = props.navigation;
  
  if (hasCameraPermission === null || hasGalleryPermission === false) {
    return <View />;
  }
  if (hasCameraPermission === false || hasGalleryPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.cameraContainer}>
        <Camera
          ref={ref => setCamera(ref)}
          style={styles.fixedRatio}
          type={type}
          ratio={'1:1'} />
      </View>

      {/* <Button
        title="Flip Camera"
        onPress={() => {
          setType(
            type === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back
          );
        }}>
      </Button>
      <Button title="Take Picture" onPress={() => takePicture()} />
      <Button title="Pick Image From Gallery" onPress={() => pickImage()} />
      <Button title="Save" onPress={() => {
        props.navigation.navigate({
          name: "Report an Issue",
          params: {pictureURI: image},
          merge: true
        });
      }} /> */}

      <View style={{flexDirection: 'column', justifyContent: 'space-around'}}>
        <TouchableOpacity
          style={styles.pictureBtn}
          onPress={() => {
            setType(
              type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            );
          }}
        >
          <Text style={{fontSize: 16, color: darkPurple}}>Flip camera</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.pictureBtn}
          onPress={() => takePicture()}
        >
          <Text style={{fontSize: 16, color: darkPurple}}>Take picture</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.pictureBtn}
          onPress={() => pickImage()}
        >
          <Text style={{fontSize: 16, color: darkPurple}}>Pick image from gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.pictureBtn}
          onPress={() => {
            props.navigation.navigate({
              name: "Report an Issue",
              params: {pictureURI: image},
              merge: true
            });
          }}
        >
          <Text style={{fontSize: 16, color: darkPurple}}>Save</Text>
        </TouchableOpacity>
      </View>

      {image && <Image source={{ uri: image }} style={{ flex: 1 }} />}
    </View>
  );
}



const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1
  },
  pictureBtn: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: purple_80,
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: darkPurple,
  }
})


export default CameraScreen;