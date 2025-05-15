import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const SellerShop = ({ navigation }) => {
    const [products, setProducts] = useState([]);
    const [seller, setSeller] = useState({ name: '', profilePhoto: '' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (data && data.someProperty) {
            console.log(data.someProperty);
        }
        const fetchSellerData = async () => {
            try {
                const sellerDoc = await firestore().collection('sellers').doc('sellerId').get();
                if (sellerDoc.exists) {
                    const sellerData = sellerDoc.data();
                    setSeller({
                        name: sellerData.name,
                        profilePhoto: sellerData.profilePhoto,
                    });
                }
            } catch (error) {
                console.error('Invalid Seller Information', error);
            }
        };

        const fetchProducts = async () => {
            try {
                const productsSnapshot = await firestore()
                    .collection('products')
                    .where('sellerId', '==', 'sellerId') 
                    .get();
                const productsData = productsSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setProducts(productsData);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSellerData();
        fetchProducts();
    }, []);

    const renderProduct = ({ item }) => (
        <View style={styles.productCard}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>{item.price}</Text>
        </View>
    );

    if (loading) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color="#4CAF50" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../assets/back-arrow.png')} style={{ width: 20, height: 20, position: 'absolute', marginLeft: -30 }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                <Image source={require('../assets/Cart.png')} style={styles.cartIcon} />
                </TouchableOpacity>
            </View>
            <View style={styles.profileSection}>
                <View style={styles.profileImageContainer}>
                    {seller.profilePhoto ? (
                        <Image source={{ uri: seller.profilePhoto }} style={styles.profileImage} />
                    ) : (
                        <Text style={styles.profileImagePlaceholder}>👤</Text>
                    )}
                </View>
                <Text style={styles.shopName}>{seller.name || 'Seller Name'}</Text>
            </View>
            <Text style={styles.productsTitle}>Products</Text>
            <FlatList
                data={products}
                renderItem={renderProduct}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                contentContainerStyle={styles.productsList}
            />
            <View style={styles.footer}>
                <Text style={styles.footerItem}>Home</Text>
                <Text style={[styles.footerItem, styles.activeFooterItem]}>Marketplace</Text>
                <Text style={styles.footerItem}>Orders</Text>
                <Text style={styles.footerItem}>Profile</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#4CAF50',
    },
    cartIcon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        tintColor: '#fff',
        position: 'absolute',
        right: -100,
        top: -60,
    },
    profileSection: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    profileImageContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#E0E0E0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileImage: { width: '100%', height: '100%', borderRadius: 40 },
    profileImagePlaceholder: { fontSize: 40, color: '#4CAF50' },
    shopName: { fontSize: 18, fontWeight: 'bold', marginTop: 10 },
    productsTitle: { fontSize: 16, fontWeight: 'bold', margin: 10 },
    productsList: { paddingHorizontal: 10 },
    productCard: {
        flex: 1,
        margin: 5,
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 2,
    },
    productImage: { width: '100%', height: 100 },
    productName: { fontSize: 14, fontWeight: 'bold', margin: 5 },
    productPrice: { fontSize: 12, color: '#4CAF50', margin: 5 },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
    },
    footerItem: { fontSize: 14, color: '#9E9E9E' },
    activeFooterItem: { color: '#4CAF50' },
});

export default SellerShop;