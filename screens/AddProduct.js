import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { launchImageLibrary } from 'react-native-image-picker';

const { height } = Dimensions.get('window');

const AddProduct = () => {
  const navigation = useNavigation();

  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [unit, setUnit] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [uploading, setUploading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleChooseImage = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo' });
    if (!result.didCancel && result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  const uploadImageToCloudinary = async (uri) => {
    const data = new FormData();
    data.append('file', {
      uri,
      type: 'image/jpeg',
      name: 'product.jpg',
    });
    data.append('upload_preset', 'Agriya');
    data.append('cloud_name', 'drzhpbmus');

    const res = await fetch('https://api.cloudinary.com/v1_1/drzhpbmus/image/upload', {
      method: 'POST',
      body: data,
    });

    const json = await res.json();
    return json.secure_url;
  };

  const handleAddProduct = async () => {
    const trimmedName = productName.trim();
    const trimmedDesc = description.trim();
    const trimmedPrice = price.trim();
    const trimmedStock = stock.trim();

    if (
      !trimmedName ||
      !trimmedDesc ||
      !trimmedPrice ||
      !unit ||
      !category ||
      !trimmedStock ||
      !imageUri
    ) {
      setAlertMessage('Please fill in all fields including the image');
      setShowAlert(true);
      return;
    }

    if (isNaN(trimmedPrice) || isNaN(trimmedStock)) {
      setAlertMessage('Price and Stock must be numeric values.');
      setShowAlert(true);
      return;
    }

    if (uploading) return;

    try {
      setUploading(true);

      const imageUrl = await uploadImageToCloudinary(imageUri);

      await firestore().collection('products').add({
        productName: trimmedName,
        description: trimmedDesc,
        price: parseFloat(trimmedPrice),
        unit,
        category,
        stock: parseInt(trimmedStock),
        imageUrl,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      setAlertMessage('Product added successfully!');
      setShowAlert(true);
      navigation.goBack();
    } catch (error) {
      console.error('Error adding product: ', error);
      setAlertMessage('Failed to add product. Please try again.');
      setShowAlert(true);
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topRectangle}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Text style={styles.backArrow}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Add Product</Text>
      </View>

      <ScrollView contentContainerStyle={styles.formContainer}>
        <View style={styles.card}>
          <Text style={styles.label}>Product Image</Text>
          <TouchableOpacity style={styles.imagePlaceholder} onPress={handleChooseImage}>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={{ width: '100%', height: '100%' }} />
            ) : (
              <Text style={{ color: '#aaa' }}>[ Upload Image ]</Text>
            )}
          </TouchableOpacity>

          <Text style={styles.label}>Product Name</Text>
          <TextInput
            style={styles.input}
            value={productName}
            onChangeText={setProductName}
            placeholder="Enter product name"
          />

          <Text style={styles.label}>Product Description</Text>
          <TextInput
            style={[styles.input, { height: 80 }]}
            multiline
            value={description}
            onChangeText={setDescription}
            placeholder="Enter product description"
          />

          <Text style={styles.label}>Price</Text>
          <View style={styles.row}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              value={price}
              onChangeText={(text) => setPrice(text.replace(/[^0-9.]/g, ''))}
              keyboardType="numeric"
              placeholder="Enter price"
            />
            <View style={styles.dropdown}>
              <Picker selectedValue={unit} onValueChange={setUnit} style={styles.picker}>
                <Picker.Item label="Choose unit" value="" enabled={false} style={{ fontSize: 14, color: '#aaa' }} />
                <Picker.Item label="kg" value="kg" />
                <Picker.Item label="g" value="g" />
                <Picker.Item label="L" value="L" />
                <Picker.Item label="ml" value="ml" />
                <Picker.Item label="pcs" value="pc" />
                <Picker.Item label="dozen" value="dozen" />
              </Picker>
            </View>
          </View>

          <Text style={styles.label}>Category</Text>
          <View style={styles.pickerWrapper}>
            <Picker selectedValue={category} onValueChange={setCategory} style={styles.picker}>
              <Picker.Item label="Choose category" value="" enabled={false} style={{ fontSize: 14, color: '#aaa' }} />
              <Picker.Item label="Fruits & Vegetables" value="Fruits & Vegetables" />
              <Picker.Item label="Dairy" value="Dairy" />
              <Picker.Item label="Grains" value="Grains" />
              <Picker.Item label="Meat & Poultry" value="Meat & Poultry" />
            </Picker>
          </View>

          <Text style={styles.label}>Stock</Text>
          <TextInput
            style={styles.input}
            value={stock}
            onChangeText={(text) => setStock(text.replace(/[^0-9]/g, ''))}
            keyboardType="numeric"
            placeholder="Enter stock quantity"
          />

          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddProduct}
            disabled={uploading}
          >
            <Text style={styles.addButtonText}>
              {uploading ? 'Uploading...' : 'Add Product'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal transparent={true} visible={showAlert} animationType="fade">
        <TouchableWithoutFeedback onPress={() => setShowAlert(false)}>
          <View style={styles.modalBackground}>
            <View style={styles.alertContainer}>
              <Text style={styles.alertText}>{alertMessage}</Text>
              <TouchableOpacity style={styles.alertButton} onPress={() => setShowAlert(false)}>
                <Text style={styles.alertButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(240, 243, 242)',
  },
  topRectangle: {
    width: '100%',
    height: height * 0.13,
    backgroundColor: '#11AB2F',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 40,
  },
  backButton: {
    padding: 10,
  },
  backArrow: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 10,
  },
  formContainer: {
    padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 13,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    height: 40,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdown: {
    flex: 1,
    marginLeft: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    height: 40,
    justifyContent: 'center',
  },
  pickerWrapper: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    height: 40,
    justifyContent: 'center',
  },
  picker: {
    height: 40,
    width: '100%',
    height: '150%',
  },
  imagePlaceholder: {
    width: '100%',
    height: 120,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  addButton: {
    backgroundColor: '#11AB2F',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 25,
    marginBottom: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  alertContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  alertText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  alertButton: {
    backgroundColor: '#11AB2F',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  alertButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default AddProduct;