import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Checkout = ({ route }) => {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState({});
  const [product, setProduct] = useState(route.params?.product || {});
  const [quantity, setQuantity] = useState(route.params?.quantity || 1);

  useEffect(() => {
    const uid = auth().currentUser?.uid;
    if (uid) {
      firestore()
        .collection('users')
        .doc(uid)
        .get()
        .then(doc => {
          if (doc.exists) {
            setUserInfo(doc.data());
          }
        });
    }
  }, []);

  const placeOrder = async () => {
    try {
      await firestore().collection('orders').add({
        userId: auth().currentUser.uid,
        product,
        quantity,
        status: 'To Pay',
        timestamp: firestore.FieldValue.serverTimestamp()
      });
      Alert.alert('Success', 'Order placed!');
      navigation.navigate('ToPayScreen');
    } catch (error) {
      Alert.alert('Error', 'Could not place order.');
    }
  };

  const productTotal = product.price * quantity;
  const shippingFee = 45;
  const total = productTotal + shippingFee;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.topRectangle}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backArrow}>{'<'}</Text>
        </TouchableOpacity>
          <Text style={styles.pageTitle}>Checkout</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Address Card */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Deliver To</Text>
          <Text style={styles.textBold}>{userInfo.username} ({userInfo.phoneNumber})</Text>
          <Text style={styles.text}>{userInfo.address}</Text>
        </View>

        {/* Product Summary */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.productRow}>
            <Image source={{ uri: product.image }} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.textBold}>{product.name}</Text>
              <Text style={styles.text}>₱{product.price} /kg</Text>
              <Text style={styles.text}>Quantity: {quantity}</Text>
            </View>
          </View>
          <View style={styles.rowBetween}>
            <Text>Total ({quantity} item)</Text>
            <Text style={styles.textBold}>₱{productTotal}</Text>
          </View>
        </View>

        {/* Payment Method */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <View style={styles.rowBetween}>
            <Text>Cash on Delivery</Text>
            <View style={styles.radioDot} />
          </View>
        </View>

        {/* Payment Summary */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Payment Summary</Text>
          <View style={styles.rowBetween}>
            <Text>Subtotal</Text>
            <Text>₱{productTotal}</Text>
          </View>
          <View style={styles.rowBetween}>
            <Text>Shipping Fee</Text>
            <Text>₱{shippingFee}</Text>
          </View>
          <View style={styles.rowBetween}>
            <Text style={styles.textBold}>Total</Text>
            <Text style={styles.textBold}>₱{total}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Place Order Button */}
      <TouchableOpacity style={styles.placeOrderButton} onPress={placeOrder}>
        <Text style={styles.placeOrderText}>Place Order</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F9F9' },
  topRectangle: {
    width: '100%',
    height: '15%',
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
    justifyContent: 'center',
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 110,
  },
  scrollContent: {
    padding: 15,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 1,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 16,
  },
  text: {
    fontSize: 14,
    color: '#555',
  },
  textBold: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#333',
  },
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 10,
  },
  productInfo: {
    flex: 1,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  radioDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#11AB2F',
  },
  placeOrderButton: {
    backgroundColor: '#11AB2F',
    paddingVertical: 15,
    alignItems: 'center',
    margin: 10,
    borderRadius: 5,
    marginBottom: 25,
  },
  placeOrderText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Checkout;
