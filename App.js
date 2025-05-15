import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from './screens/LandingScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen'; 
import ProfileScreen from './screens/ProfileScreen';
import Cart from './screens/Cart';
import ShopScreen from './screens/ShopScreen';
import AddProduct from './screens/AddProduct';
import BuyAgain from './screens/BuyAgain';
import RecentlyViewed from './screens/RecentlyViewed';
import CustomerCancelled from './screens/CustomerCancelled';
import CustomerCompleted from './screens/CustomerCompleted';
import ToPay from './screens/ToPay';
import ToShip from './screens/ToShip';
import ToReceive from './screens/ToReceive';
import Settings from './screens/Settings';
import Marketplace from './screens/Marketplace';
import Dairy from './screens/Dairy';
import FruitsandVegetables from './screens/FruitsandVegetables';
import Grains from './screens/Grains';
import MeatandPoultry from './screens/MeatandPoultry';
import ProductDetails from './screens/ProductDetails';
import SellerShop from './screens/SellerShop';
import Checkout from './screens/Checkout';
import SellerCancelled from './screens/SellerCancelled';
import SellerCompleted from './screens/SellerCompleted';
import SellerShip from './screens/SellerShip';
import SellerShipped from './screens/SellerShipped';
import SellerUpcoming from './screens/SellerUpcoming';
import Notifications from './screens/Notifications';
import MyProductsFruitsandVegetables from './screens/MyProductsFruitsandVegetables';
import MyProductsDairy from './screens/MyProductsDairy';
import MyProductsGrains from './screens/MyProductsGrains';
import MyProductsMeatandPoultry from './screens/MyProductsMeatandPoultry';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LandingScreen" component={LandingScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="ShopScreen" component={ShopScreen} />
        <Stack.Screen name="AddProduct" component={AddProduct} />
        <Stack.Screen name="BuyAgain" component={BuyAgain} />
        <Stack.Screen name="RecentlyViewed" component={RecentlyViewed} />
        <Stack.Screen name="CustomerCancelled" component={CustomerCancelled} />
        <Stack.Screen name="CustomerCompleted" component={CustomerCompleted} />
        <Stack.Screen name="ToPay" component={ToPay} />
        <Stack.Screen name="ToShip" component={ToShip} />
        <Stack.Screen name="ToReceive" component={ToReceive} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Marketplace" component={Marketplace} />
        <Stack.Screen name="Dairy" component={Dairy} />
        <Stack.Screen name="FruitsandVegetables" component={FruitsandVegetables} />
        <Stack.Screen name="Grains" component={Grains} />
        <Stack.Screen name="MeatandPoultry" component={MeatandPoultry} />
        <Stack.Screen name="ProductDetails" component={ProductDetails} />
        <Stack.Screen name="SellerShop" component={SellerShop} />
        <Stack.Screen name="Checkout" component={Checkout} />
        <Stack.Screen name="SellerCancelled" component={SellerCancelled} />
        <Stack.Screen name="SellerCompleted" component={SellerCompleted} />
        <Stack.Screen name="SellerShip" component={SellerShip} />
        <Stack.Screen name="SellerShipped" component={SellerShipped} />
        <Stack.Screen name="SellerUpcoming" component={SellerUpcoming} />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="MyProductsFruitsandVegetables" component={MyProductsFruitsandVegetables} />
        <Stack.Screen name="MyProductsDairy" component={MyProductsDairy} />
        <Stack.Screen name="MyProductsGrains" component={MyProductsGrains} />
        <Stack.Screen name="MyProductsMeatandPoultry" component={MyProductsMeatandPoultry} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
