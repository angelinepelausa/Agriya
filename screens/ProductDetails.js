import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const ProductDetails = () => {
const navigation = useNavigation();
const route = useRoute();
const { productId } = route.params; 

const [product, setProduct] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
    if (data && data.someProperty) {
        console.log(data.someProperty);
    }
    const fetchProductDetails = async () => {
    try {
        const productDoc = await firestore().collection('products').doc(productId).get();
        if (productDoc.exists) {
        setProduct(productDoc.data());
        } else {
        console.error('Product not found');
        }
    } catch (error) {
        console.error('Error fetching product details:', error);
    } finally {
        setLoading(false);
    }
    };

    fetchProductDetails();
}, [productId]);

    const handleAddToCart = async () => {
        if (!product) return;
    
        try {
        await firestore().collection('Cart').add({
            productId: productId,
            name: product.name,
            price: product.price,
            image: product.image,
            seller: product.seller,
            quantity: 1, 
        });
    
        Alert.alert('Success', 'Product added to cart!');
        } catch (error) {
        console.error('Error adding product to cart:', error);
        Alert.alert('Error', 'Failed to add product to cart.');
        }
    };

if (loading) {
    return (
    <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#11AB2F" />
    </View>
    );
}

if (!product) {
    return (
    <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Product not found</Text>
    </View>
    );
}

return (
    <View style={styles.container}>
    {/* Header */}
    <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
        source={require('../assets/back-arrow.png')} 
        style={styles.backIcon}
        />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
        <Image
        source={require('../assets/Cart.png')} 
        style={styles.cartIcon}
        />
        </TouchableOpacity>
    </View>

    <View style={styles.productImageContainer}>
        <Image source={{ uri: product.image }} style={styles.productImage} />
    </View>

    <View style={styles.productDetails}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productPrice}>{product.price}</Text>
    </View>

    <View style={styles.sellerContainer}>
        <View style={styles.sellerInfo}>
        <Image
        source={{ uri: product.sellerProfileImage || 'https://via.placeholder.com/40' }}
        style={styles.sellerIcon}
        />
        <Text style={styles.sellerName}>{product.seller || 'Unknown Seller'}</Text>
        </View>
        <TouchableOpacity 
        style={styles.visitShopButton} 
        onPress={() => navigation.navigate('SellerShop', { sellerId: product.sellerId })}
        >
        <Text style={styles.visitShopText}>Visit Shop</Text>
        </TouchableOpacity>
    </View>

    <TouchableOpacity 
        style={styles.addToCartButton} 
        onPress={async () => {
        await handleAddToCart();
        try {
            const cartRef = firestore().collection('Cart');
            const cartSnapshot = await cartRef.where('productId', '==', productId).get();

            if (!cartSnapshot.empty) {
            const cartDoc = cartSnapshot.docs[0];
            await cartRef.doc(cartDoc.id).update({
                quantity: cartDoc.data().quantity + 1,
            });
            } else {
            await cartRef.add({
                productId: productId,
                name: product.name,
                price: product.price,
                image: product.image,
                seller: product.seller,
                quantity: 1,
            });
            }
            Alert.alert('Success', 'Product added to cart!');
        } catch (error) {
            console.error('Error updating cart:', error);
            Alert.alert('Error', 'Failed to update cart.');
        }
        }}
    >
        <Text style={styles.addToCartText}>Add to Cart</Text>
    </TouchableOpacity>
    </View>
    )
};

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#fff',
},
header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#11AB2F',
    padding: 15,
},
backIcon: {
    width: 20,
    height: 20,
    tintColor: '#fff',
},
cartIcon: {
    width: 20,
    height: 20,
    tintColor: '#fff',
},
productImageContainer: {
    alignItems: 'center',
    marginVertical: 20,
},
productImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
},
productDetails: {
    alignItems: 'center',
    marginBottom: 20,
},
productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5D5C5C',
},
productPrice: {
    fontSize: 16,
    color: 'green',
    marginTop: 5,
},
sellerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    padding: 15,
    backgroundColor: '#F6FAF9',
    borderRadius: 10,
    marginBottom: 20,
},
sellerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
},
sellerIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
},
sellerName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#5D5C5C',
},
visitShopButton: {
    backgroundColor: '#11AB2F',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
},
visitShopText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
},
addToCartButton: {
    backgroundColor: '#11AB2F',
    paddingVertical: 15,
    marginHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
},
addToCartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
},
loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
},
errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
},
errorText: {
    fontSize: 16,
    color: 'red',
},
});

export default ProductDetails;