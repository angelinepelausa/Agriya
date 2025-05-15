import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const MyProductsDairy = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔁 Fetch products from backend filtered by category
  useEffect(() => {
    const unsubscribe = firestore()
      .collection('products')
      .where('category', '==', 'Dairy')
      .onSnapshot(snapshot => {
        const fetched = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(fetched);
        setLoading(false);
      });

    return () => unsubscribe();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.productCard}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>₱{item.price}/kg</Text>
        <Text style={styles.stock}>In Stock: {item.stock}</Text>
      </View>

      {/* 🖊 Edit and 🗑 Delete icons (no functionality attached yet) */}
      <View style={styles.actions}>
        <TouchableOpacity>
          <Ionicons name="create-outline" size={18} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="trash-outline" size={18} color="red" style={{ marginLeft: 8 }} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* 🟩 Header with back button and title */}
      <View style={styles.topRectangle}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backArrow}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.pageTitle}>My Products</Text>
      </View>

      {/* 🧺 Section title */}
      <Text style={styles.sectionLabel}>Dairy</Text>

      {/* 📦 Product list or empty state */}
      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : products.length === 0 ? (
        <Text style={styles.emptyText}>No items found.</Text>
      ) : (
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      )}

      {/* ➕ Add new product button */}
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate ('AddProduct')}>
        <Text style={styles.addButtonText}>Add New Product</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f2f2' },
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
    marginLeft: 100,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#5D5C5C',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  list: { paddingHorizontal: 20, paddingBottom: 10 },
  productCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 1,
  },
  image: { width: 60, height: 60, borderRadius: 6, marginRight: 10 },
  details: { flex: 1 },
  name: { fontSize: 14, fontWeight: '600', color: '#5D5C5C' },
  price: { color: '#11AB2F', fontSize: 13 },
  stock: { fontSize: 12, color: '#888' },
  actions: { flexDirection: 'row', alignItems: 'center' },
  emptyText: { textAlign: 'center', marginTop: 100, fontSize: 14, color: '#777' },
  loadingText: { textAlign: 'center', marginTop: 100, fontSize: 14, color: '#777' },
  addButton: {
    backgroundColor: '#11AB2F',
    paddingVertical: 12,
    margin: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default MyProductsDairy;
