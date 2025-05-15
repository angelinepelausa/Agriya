import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import axios from 'axios';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 40) / 2 - 10;

const BuyAgain = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Replace with your backend endpoint
    const fetchBuyAgain = async () => {
        try {
          // ✅ Replace with your backend API
          const response = await axios.get('https://your-backend.com/api/recently-viewed');
          setProducts(response.data); // Data should be an array of recently viewed products
        } catch (error) {
          console.error('Error fetching buy again products:', error);
        }
      };

      
  }, []);

  const handleBuyAgain = (product) => {
    // Add to cart logic (optional: send to backend)
    navigation.navigate('Cart'); // Navigate to cart
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
      <Text style={styles.price}>₱{item.price}</Text>
      <TouchableOpacity style={styles.buyAgainButton} onPress={() => handleBuyAgain(item)}>
        <Text style={styles.buyAgainText}>Buy Again</Text>
      </TouchableOpacity>
    </View>
  );

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.topRectangle}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
            <Text style={styles.backArrow}>{'<'}</Text>
        </TouchableOpacity>
            <Text style={styles.pageTitle}>Buy Again</Text>
        <View style={styles.topRightIcons}>
            <TouchableOpacity style={styles.cartIcon} onPress={() => navigation.navigate('Cart')}>
                <Image
                  source={require('../assets/Cart.png')}
                  style={styles.topIcon}
                  resizeMode='contain'
                />
            </TouchableOpacity>
        </View>
      </View>

      {/* Products */}
      {products.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No products yet.</Text>
        </View>
      ) : (
        <FlatList
            data={products}
            keyExtractor={(item, index) => (item._id || item.id || index).toString()}
            renderItem={renderItem}
            numColumns={2}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.productList}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
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
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 10,
  },
  topRightIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginRight: 10,
  },
  cartIcon: {
    padding: 5, 
    marginLeft: 5,
  },
  topIcon: {
    width: 30, 
    height: 30,
    bottom: 35,
    left: 188,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  card: {
    width: ITEM_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    borderWidth: 0.5,
    borderColor: '#ddd',
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 10,
  },
  name: {
    fontSize: 13,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#e53935',
    marginBottom: 10,
  },
  buyAgainButton: {
    backgroundColor: '#e53935',
    paddingVertical: 6,
    borderRadius: 4,
    alignItems: 'center',
  },
  buyAgainText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    paddingHorizontal: 30,
  },
});

export default BuyAgain;
