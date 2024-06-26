import React from "react";
import {StyleSheet, View, Text} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ProductsList } from "./screens/ProductList.tsx"
import { ProductDetails } from "./screens/ProductDetails.tsx";
import { Cart } from "./screens/Cart.js";
import { CartProvider } from "./CartContext.js";
import { CartIcon } from "./components/CartIcon.js";

const Stack = createNativeStackNavigator();

function App(){
  return(
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Products" component={ProductsList} options={({navigation}) => ({title: 'K Store', headerRight: () => <CartIcon navigation={navigation} />})} />
          <Stack.Screen name="ProductDetails" component={ProductDetails} options={({navigation}) => ({title: 'Product', headerRight: () => <CartIcon navigation={navigation} />})} />
          <Stack.Screen name="Cart" component={Cart} options={({navigation}) => ({title: 'Cart', headerRight: () => <CartIcon navigation={navigation} />})} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  )
}

const styles = StyleSheet.create({
  Container: {
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
  }
})

export default App;
