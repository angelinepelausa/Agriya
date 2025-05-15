import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const categories = [
    { id: '1', name: 'Fruits & Vegetables', icon: require('../assets/FruitsandVegetables.png'), screen: 'FruitsandVegetables' },
    { id: '2', name: 'MeatandPoultry', icon: require('../assets/MeatandPoultry.png'), screen: 'MeatandPoultry' },
    { id: '3', name: 'Dairy', icon: require('../assets/Dairy.png'), screen: 'Dairy' },
    { id: '4', name: 'Grains', icon: require('../assets/Grains.png'), screen: 'Grains' },
];

const FruitsandVegetables = () => {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState(null);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true); // To show loading state
    const [noProducts, setNoProducts] = useState(false); // To check if no products are fetched

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsSnapshot = await firestore()
                    .collection('products') // Firebase collection
                    .where('category', '==', 'FruitsandVegetables') // Adjust this based on the category
                    .get();

                if (productsSnapshot.empty) {
                    setNoProducts(true); // If no products are found, set the flag
                } else {
                    const fetchedProducts = productsSnapshot.docs.map(doc => {
                        const productData = doc.data();
                        return {
                            id: doc.id,
                            image: productData.image, // Ensure image URL is fetched
                            name: productData.name,
                            price: `₱${productData.price}/kg`, // Format price
                        };
                    });

                    setProducts(fetchedProducts);
                    setFilteredProducts(fetchedProducts); // Set filtered products to initial fetched products
                    setNoProducts(false); // Ensure this is reset if products are fetched
                }
            } catch (error) {
                console.error('Error fetching products:', error);
                setNoProducts(true); // Set noProducts to true in case of error
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchProducts();
    }, []); // Empty dependency array means this runs only once when the component is mounted

    const handleCategoryPress = (item) => {
        setActiveCategory(item.name);
        if (item.name === 'Fruits & Vegetables') {
            navigation.navigate('Marketplace');
        } else {
            navigation.navigate(item.screen);
        }
    };

    const handleSearch = () => {
        const query = searchQuery.trim().toLowerCase();

        if (query === '') {
            setFilteredProducts(products);
        } else {
            const filteredItems = products.filter(item =>
                item.name.toLowerCase().includes(query)
            );
            setFilteredProducts(filteredItems);
        }
    };

    const handleProductPress = (product) => {
        navigation.navigate('ProductDetails', { product });
    };

    const renderCategory = ({ item }) => (
        <TouchableOpacity
            style={styles.category}
            onPress={() => handleCategoryPress(item)}
        >
            <View
                style={[
                    styles.categoryCard,
                    activeCategory === item.name && styles.activeCategoryCard,
                ]}
            >
                <Image source={item.icon} style={styles.categoryIcon} />
                <Text
                    style={[
                        styles.categoryText,
                        activeCategory === item.name && styles.activeCategoryText,
                    ]}
                >
                    {item.name}
                </Text>
            </View>
        </TouchableOpacity>
    );

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleProductPress(item)} style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>{item.price}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.HeaderContainer}>
                <View style={styles.headerContent}>
                    <Image source={require('../assets/Agriya_white.png')} style={styles.logo} />
                    <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                        <Image source={require('../assets/Cart.png')} style={styles.cartIcon} />
                    </TouchableOpacity>
                </View>

                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search"
                        value={searchQuery}
                        onChangeText={(text) => {
                            setSearchQuery(text);
                            if (text.trim() === '') {
                                setFilteredProducts(products); // Show all if cleared
                            }
                        }}
                        onSubmitEditing={handleSearch}
                    />
                    <TouchableOpacity onPress={handleSearch}>
                        <Image source={require('../assets/search icon.png')} style={styles.searchIcon} />
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={categories}
                    renderItem={renderCategory}
                    keyExtractor={(item) => item.id}
                    horizontal
                    contentContainerStyle={styles.categories}
                    showsHorizontalScrollIndicator={false}
                />
            </View>

            <Text style={styles.sectionTitle}>Fruits and Vegetables</Text>

            {/* Show loading indicator */}
            {loading ? (
                <Text>Loading...</Text>
            ) : noProducts ? (
                <Text>No products available in this category.</Text> // Show message if no products
            ) : (
                <FlatList
                    data={filteredProducts}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    contentContainerStyle={styles.list}
                />
            )}

            <View style={styles.navBar}>
                <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
                    <Image source={require('../assets/Home.png')} style={styles.navImage} />
                    <Text style={styles.navText}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.navItem, { backgroundColor: '#E0F7FA' }]}
                    onPress={() => navigation.navigate('Marketplace')}
                >
                    <Image source={require('../assets/MarketplaceGreen.png')} style={styles.navImage} />
                    <Text style={styles.navText}>Marketplace</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem}>
                    <Image source={require('../assets/Orders.png')} style={styles.navImage} />
                    <Text style={styles.navText}>Orders</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('ProfileScreen')}>
                    <Image source={require('../assets/Profile_picture.png')} style={styles.navImage} />
                    <Text style={styles.navText}>Profile</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    HeaderContainer: {
        backgroundColor: '#11AB2F',
        alignItems: 'center',
        paddingTop: 20,
    },
    logo: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        tintColor: '#fff',
    },
    cartIcon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
        position: 'absolute',
        right: -100,
        top: -60,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },
    searchInput: {
        flex: 1,
        padding: 10,
    },
    searchIcon: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    categories: {
        marginVertical: 10,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 10,
    },
    category: {
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    categoryCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        width: 80,
        height: 80,
        alignItems: 'center',
    },
    activeCategoryCard: {
        backgroundColor: '#E0F7FA',
        borderColor: '#4caf50',
        borderWidth: 2,
    },
    activeCategoryText: {
        color: '#11AB2F',
    },
    categoryIcon: {
        width: 40,
        height: 40,
        marginBottom: 5,
    },
    categoryText: {
        fontSize: 8,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#4caf50',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        margin: 10,
    },
    list: {
        paddingHorizontal: 10,
    },
    card: {
        flex: 1,
        margin: 5,
        backgroundColor: '#fff',
        borderRadius: 5,
        elevation: 2,
        padding: 10,
        alignItems: 'center',
    },
    itemImage: {
        width: 100,
        height: 100,
        borderRadius: 5,
    },
    itemName: {
        fontSize: 14,
        fontWeight: 'bold',
        marginVertical: 5,
    },
    itemPrice: {
        fontSize: 12,
        color: 'green',
    },
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white',
        height: 74,
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
    },
    navItem: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    navImage: {
        width: 25,
        height: 25,
    },
    navText: {
        fontSize: 10,
        color: '#5D5C5C',
        marginTop: 5,
        fontWeight: '600',
    },
});

export default FruitsandVegetables;
