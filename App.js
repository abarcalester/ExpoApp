import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Platform } from 'react-native';
import logo from './assets/logo.png';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import uploadToAnonymousFileAsync from 'anonymous-files';


export default function App() {
	const [selectedImage, setSelectedImage] = useState(null);

	const openImagePicker = async () => {
		let permissionResult =
			await ImagePicker.requestMediaLibraryPermissionsAsync();

		if (permissionResult.granted === false) {
			alert('Permission to access camera roll is required');
			return;
		}

		let pickerResult = await ImagePicker.launchImageLibraryAsync();

		if (pickerResult.cancelled === true) return;

		if(Platform.OS === 'web') {
			const remoteUri = await uploadToAnonymousFileAsync(pickerResult.uri);
			setSelectedImage({ localUri: pickerResult.uri, remoteUri });
		} else {
			setSelectedImage({ localUri: pickerResult.uri, remoteUri: null });
		}

		setSelectedImage({ localUri: pickerResult.uri });
	};

	const openShareDialogAsync = async () => {
		if (!(await Sharing.isAvailableAsync())) {
			alert(`The image is not available for sharing at ${selectedImage.remoteUri}`);
			return;
		}

		if (selectedImage === null) return;

		await Sharing.shareAsync(selectedImage.localUri);
	}

	if (selectedImage) {
		return (
			<View style={styles.container}>
				<Image
					source={{ uri: selectedImage.localUri }}
					style={styles.thumbnail}
				/>
				<TouchableOpacity onPress={openShareDialogAsync} style={styles.button}>
					<Text style={styles.buttonText}>Share picture</Text>
				</TouchableOpacity>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<Image source={logo} style={styles.logo} />

			<Text style={styles.textInfo}>
				To share a photo on your phone with a friend, just press the
				button below
			</Text>
			<StatusBar style="auto" />
			<TouchableOpacity onPress={openImagePicker} style={styles.button}>
				<Text style={styles.buttonText}>Pick a photo</Text>
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
		letterSpacing: 1,
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
	},
	thumbnail: {
		width: 300,
		height: 300
	},
});
