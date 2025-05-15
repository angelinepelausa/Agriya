import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Cart = ({ navigation }) => {
  const route = useRoute();
  const [cartItems, setCartItems] = useState([]);

  const fetchCartProducts = async () => {
    try {
      const cartSnapshot = await firestore().collection('cart').get();
      const cartData = cartSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCartItems(cartData);
    } catch (error) {
      console.error('Error fetching cart products:', error);
    }
  };

  const addProductToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  useEffect(() => {
    fetchCartProducts();

    if (route.params?.product) {
      addProductToCart(route.params.product);
    }
  }, [route.params?.product]);

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <TouchableOpacity style={styles.checkbox} />
      <Image
        source={{ uri: item.image }} // ✅ Correct: use { uri: item.image }
        style={styles.itemImage}
      />
      <View style={styles.itemDetails}>
        <Text style={styles.sellerName}>{item.seller}</Text>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>₱{item.price}</Text>
      </View>
      <TouchableOpacity style={styles.removeButton}>
        <Text style={styles.removeButtonText}>X</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topRectangle}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backArrow}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Shopping Cart</Text>
      </View>

      <FlatList
        data={cartItems} // ✅ Now using cartItems
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.cartList}
      />

      <TouchableOpacity
        style={styles.checkoutButton}
        onPress={async () => {
          await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
          console.log('Cart items stored in checkout database:', cartItems);
          navigation.navigate('Checkout', { cartItems });
        }}
      >
        <Text style={styles.checkoutButtonText}>Check Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
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
    marginLeft: 87,
  },
  cartList: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
    marginVertical: 5,
    padding: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 3,
    marginRight: 10,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  sellerName: {
    fontSize: 12,
    color: '#888',
  },
  itemName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 2,
  },
  itemPrice: {
    fontSize: 14,
    color: '#11AB2F',
  },
  removeButton: {
    backgroundColor: '#f5f5f5',
    padding: 5,
    borderRadius: 5,
  },
  removeButtonText: {
    fontSize: 12,
    color: '#888',
  },
  checkoutButton: {
    backgroundColor: '#11AB2F',
    paddingVertical: 15,
    alignItems: 'center',
    margin: 10,
    borderRadius: 5,
    marginBottom: 25,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Cart;
