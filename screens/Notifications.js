import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Notifications = () => {
  const navigation = useNavigation();

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
        <Text style={styles.title}>Notifications</Text>
      </View>

      {/* Notification Content */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.emptyText}>You have no notifications.</Text>
        {/* Map and display notifications here */}
      </ScrollView>

      <View style={styles.navBar}>
          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
             <Image source={require('../assets/Home.png')} style={styles.navImage} />
             <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>
      
          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Marketplace')} >
            <Image source={require('../assets/Marketplace.png')} style={styles.navImage} />
            <Text style={styles.navText}>Marketplace</Text>
          </TouchableOpacity>
      
          <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Notifications')}>
            <Image source={require('../assets/NotificationsGreen.png')} style={styles.navImage} />
            <Text style={styles.navText}>Notifications</Text>
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

export default Notifications;
