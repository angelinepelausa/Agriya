import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Settings = ({ navigation }) => {
  const [username, setUsername] = useState('Loading...');

  useEffect(() => {
    const fetchUsername = async () => {
      const user = auth().currentUser;
      if (user) {
        try {
          const userDoc = await firestore().collection('users').doc(user.uid).get();
          if (userDoc.exists) {
            const data = userDoc.data();
            setUsername(data.username || 'No username');
          } else {
            setUsername('User not found');
          }
        } catch (err) {
          console.error('Error fetching username:', err);
          setUsername('Error loading');
        }
      } else {
        setUsername('Not logged in');
      }
    };

    fetchUsername();
  }, []);

  const handleBackPress = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const fetchUsername = async () => {
      const user = auth().currentUser;
      if (user) {
        try {
          const userDoc = await firestore().collection('users').doc(user.uid).get();
          if (userDoc.exists) {
            const data = userDoc.data();
            setUsername(data.username || 'No username');
          } else {
            setUsername('User not found');
          }
        } catch (err) {
          console.error('Error fetching username:', err);
          setUsername('Error loading');
        }
      } else {
        setUsername('Not logged in');
      }
    };

    fetchUsername();
  }, []);

  const handleLogout = () => {
    auth().signOut().then(() => navigation.replace('Login'));
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.topRectangle}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Text style={styles.backArrow}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Settings</Text>
      </View>

      {/* Settings Cards */}
      <ScrollView contentContainerStyle={styles.content}>
      <TouchableOpacity style={styles.card}>
          <Text style={styles.cardLabel}>Username</Text>
          <View style={styles.cardValueContainer}>
            <Text style={styles.cardValue}>{username}</Text>
          </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card}>
          <Text style={styles.cardLabel}>Phone Number</Text>
          <View style={styles.cardValueContainer}>
            <Text style={styles.cardValue}>Not Set</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardLabel}>My Address</Text>
          <View style={styles.cardValueContainer}>
            <Text style={styles.cardValue}>Not Set</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('ChangePassword')} // 🔐 Will add this screen next
        >
          <Text style={styles.cardLabel}>Change Password</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.saveButton} onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.navBar}>
              <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
                <Image
                  source={require('../assets/Home.png')}
                  style={styles.navImage}
                />
                <Text style={styles.navText}>Home</Text>
              </TouchableOpacity>
      
              <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Marketplace')}>
                <Image
                  source={require('../assets/Marketplace.png')}
                  style={styles.navImage}
                />
                <Text style={styles.navText}>Marketplace</Text>
              </TouchableOpacity>
      
              <TouchableOpacity style={styles.navItem}>
                <Image
                  source={require('../assets/ProfileGreen.png')}
                  style={styles.navImage}
                />
                <Text style={styles.navText}>Profile</Text>
              </TouchableOpacity>
            </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f2f2" },
  topRectangle: {
    width: '100%',
    height: '15%',
    backgroundColor: '#11AB2F',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 40,
  },
  backButton: { padding: 10 },
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
  content: { padding: 20 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardLabel: {
    color: "#444",
    fontSize: 15,
    fontWeight: "bold",
  },
  cardValue: {
    color: "#888",
    fontSize: 14,
    flexShrink: 1,
    textAlign: 'right',
  },
  saveButton: {
    backgroundColor: "#11AB2F",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: '55%',
  },
  saveText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: "#11AB2F",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
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

export default Settings;