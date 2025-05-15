import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const CustomerCancelled= () => {
  const navigation = useNavigation();
  const [cancelledProducts, setCancelledProducts] = useState([]);

  useEffect(() => {
    const fetchCancelledProducts = async () => {
      try {
        const response = await axios.get('https://your-api.com/cancelled');
        console.log('Fetched:', response.data); // ✅ Log it
        setCancelledProducts(response.data);
      } catch (error) {
        console.error('Error:', error);
        setCancelledProducts([]); // Ensure state is empty on error
      }
    };
  
    
  }, []);

  const handleBuyAgain = (product) => {
    // Logic to add product to cart (use your cart context, redux, or local state here)
    // Navigate to cart screen
    Alert.alert('Added to Cart', `${product.name} added to cart.`);
    navigation.navigate('Cart'); // Assuming OrdersScreen is your cart screen
  };

  const renderCancelledItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.storeName}>{item.storeName}</Text>
      <View style={styles.productRow}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
        <View style={styles.productDetails}>
          <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
          <Text style={styles.price}>₱{item.price}</Text>
          <Text style={styles.total}>Total: ₱{item.total}</Text>
        </View>
      </View>
      <View style={styles.bottomRow}>
        <Text style={styles.cancelledText}>Cancelled</Text>
        <TouchableOpacity style={styles.buyAgainBtn} onPress={() => handleBuyAgain(item)}>
          <Text style={styles.buyAgainText}>Buy Again</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const handleBackPress = () => {
    navigation.navigate('ProfileScreen');
  };

  const TabButton = ({ title, isActive, onPress }) => {
    return (
      <TouchableOpacity style={styles.tabButton} onPress={onPress}>
        <Text style={[styles.tabText, isActive && styles.activeTabText]}>
          {title}
        </Text>
        {isActive && <View style={styles.activeUnderline} />}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.topRectangle}>
            <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
                  <Text style={styles.backArrow}>{'<'}</Text>
            </TouchableOpacity>
              <Text style={styles.title}>My Purchases</Text>
        </View>

      {/* Tabs (static for now) */}
      <View style={styles.tabBar}>
              <TabButton title="To Pay"  onPress={() => navigation.navigate('ToPay')} />
              <TabButton title="To Ship" onPress={() => navigation.navigate('ToShip')} />
              <TabButton title="To Receive" onPress={() => navigation.navigate('ToReceive')} />
              <TabButton title="Completed"  onPress={() => navigation.navigate('CustomerCompleted')} />
              <TabButton title="Cancelled" isActive onPress={() => navigation.navigate('CustomerCancelled')} />
        </View>

      {/* Content */}
      {cancelledProducts.length === 0 ? (
            <FlatList
            data={cancelledProducts}
            keyExtractor={(item, index) => (item._id || item.id || index).toString()}
            renderItem={renderCancelledItem}
            contentContainerStyle={styles.listContainer}
            />
        ) : (
            <ScrollView style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No Orders Yet.</Text>
            </ScrollView>
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
        paddingTop: 30,
      },
      backButton: {
        padding: 10,
      },
      backArrow: {
        fontSize: 24,
        color: 'white',
        fontWeight: 'bold',
      },
      title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 10,
      },
      tabBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 48,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
      },
      tabButton: {
        alignItems: 'center',
        justifyContent: 'center',
      },
      tabText: {
        fontSize: 14,
        color: '#888',
      },
      activeTabText: {
        color: '#16a34a',
        fontWeight: 'bold',
      },
      activeUnderline: {
        marginTop: 4,
        height: 2,
        width: '100%',
        backgroundColor: '#16a34a',
        borderRadius: 4,
      },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyText: {
      color: '#999',
      fontSize: 16,
    },
    listContainer: {
      padding: 10,
    },
    card: {
      backgroundColor: '#f9f9f9',
      borderRadius: 12,
      padding: 12,
      marginBottom: 12,
      elevation: 1,
    },
    storeName: {
      fontWeight: 'bold',
      fontSize: 16,
      marginBottom: 8,
    },
    productRow: {
      flexDirection: 'row',
    },
    productImage: {
      width: 70,
      height: 70,
      borderRadius: 8,
      marginRight: 10,
    },
    productDetails: {
      flex: 1,
      justifyContent: 'space-between',
    },
    productName: {
      fontSize: 15,
      marginBottom: 6,
    },
    price: {
      fontSize: 14,
      color: '#444',
    },
    total: {
      fontSize: 14,
      fontWeight: 'bold',
    },
    bottomRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 10,
    },
    cancelledText: {
      color: '#ff3b30',
      fontWeight: 'bold',
    },
    buyAgainBtn: {
      borderWidth: 1,
      borderColor: '#ff6f00',
      borderRadius: 6,
      paddingHorizontal: 12,
      paddingVertical: 6,
    },
    buyAgainText: {
      color: '#ff6f00',
      fontWeight: 'bold',
    },
  });

  export default CustomerCancelled;