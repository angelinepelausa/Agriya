import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const RecentlyViewed = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchRecentlyViewed = async () => {
      try {
        // ✅ Replace with your backend API
        const response = await axios.get('https://your-backend.com/api/recently-viewed');
        setProducts(response.data); // Data should be an array of recently viewed products
      } catch (error) {
        console.error('Failed to fetch recently viewed:', error);
      }
    };

    
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text numberOfLines={2} style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>{item.price}</Text>
    </View>
  );

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Header same as other screens */}
      <View style={styles.topRectangle}>
            <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
                <Text style={styles.backArrow}>{'<'}</Text>
            </TouchableOpacity>
              <Text style={styles.pageTitle}>Recently Viewed</Text>
        </View>
      

      {/* Conditional rendering */}
      {products.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Products you search or view will appear here.</Text>
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
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 10,
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
  productList: {
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 140,
    borderRadius: 6,
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 8,
    color: '#333',
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#11AB2F',
    marginTop: 4,
  },
});

export default RecentlyViewed;