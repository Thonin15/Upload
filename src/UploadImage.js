import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Alert, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import {firebase} from '../config';

const UploadMediaFile = () => {
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            quality: 1,
        });
        console.log('Image picking result:', result);
        if (!result.canceled && result.assets.length > 0 && result.assets[0].uri) {
            setImage(result.assets[0].uri);
        } else {
            console.log('Image picking cancelled or URI is undefined');
        }
    };
    
    

    const uploadMedia = async () => {
        try {
            setUploading(true);
            if (!image) {
                console.log('No image selected');
                return;
            }
            const { uri } = await FileSystem.getInfoAsync(image);
            const blob = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = () => {
                    resolve(xhr.response);
                };
                xhr.onerror = (e) => {
                    reject(new TypeError('Network request failed'));
                };
                xhr.responseType = 'blob';
                xhr.open('GET', uri, true);
                xhr.send(null);
            });
            const filename = image.substring(image.lastIndexOf('/') + 1);
            const ref = firebase.storage().ref().child(filename);
            await ref.put(blob);
            setUploading(false);
            Alert.alert('Photo Uploaded !!!');
            setImage(null);
        } catch (error) {
            console.error(error);
            setUploading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.selectButton} onPress={pickImage}>
                <Text> Pick an Image</Text>
            </TouchableOpacity>
            <View style={styles.imageContainer}>
                {image && <Image source={{ uri: image }} style={{ width: 300, height: 300 }} />}
            </View>
            <TouchableOpacity style={styles.uploadButton} onPress={uploadMedia}>
                <Text> Upload</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default UploadMediaFile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectButton: {
        borderRadius: 5,
        width: 150,
        height: 50,
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    uploadButton: {
        borderRadius: 5,
        width: 150,
        height: 50,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
