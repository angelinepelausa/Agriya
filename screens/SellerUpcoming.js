import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SellerUpcoming = () => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.navigate('ShopScreen');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.topRectangle}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Text style={styles.backArrow}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Order Status</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabBar}>
        <TabButton title="Upcoming" isActive onPress={() => navigation.navigate('SellerUpcoming')} />
        <TabButton title="To Ship" onPress={() => navigation.navigate('SellerShip')} />
        <TabButton title="Shipped" onPress={() => navigation.navigate('SellerShipped')} />
        <TabButton title="Cancelled" onPress={() => navigation.navigate('SellerCancelled')} />
        <TabButton title="Completed" onPress={() => navigation.navigate('SellerCompleted')} />
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.emptyText}>No Upcoming Orders.</Text>
        {/* You would display your "Upcoming" orders here */}
      </ScrollView>
    </View>
  );
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
  content: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: '#777',
    fontSize: 16,
    marginTop: 100,
  },
});

export default SellerUpcoming;