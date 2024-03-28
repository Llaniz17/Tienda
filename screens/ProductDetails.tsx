import React, { useEffect, useState, useContext } from 'react';
import { Text, StyleSheet, View, Image, ScrollView, SafeAreaView, TouchableOpacity, Alert } from "react-native";
import { GetProductById, Product, updateProductStock } from '../services/ProductService';
import { CartContext } from "../CartContext.js";

export function ProductDetails({ route }) {
  const { productId } = route.params;
  const [product, setProduct] = useState<Product>();
  const [quantity, setQuantity] = useState(1); // es la cantidad del producto que se envía al carrito. NO confundir con el stock
  const [availableStock, setAvailableStock] = useState(0);

  useEffect(() => {
    const load = async () => {
      const product = await GetProductById(productId);
      setProduct(product);
      setAvailableStock(product.stock);
    };
    load();
  }, [productId]);

  const { addItemToCart } = useContext(CartContext);

  async function onAddToCart() {
    if (quantity > availableStock) {
      Alert.alert("Not Enough Stock", "There is not enough stock available.");
      return;
    }
    addItemToCart(product.id, quantity);
    Alert.alert("Product Added", `${product.title} has been added to your cart.`);

    const newStock = availableStock - quantity;
    try {
      await updateProductStock(productId, newStock);
      setAvailableStock(newStock);
    } catch (error) {
      console.error('Error updating product stock:', error);
    }
  }

  function increaseQuantity() {
    if (quantity < availableStock) {
      setQuantity(quantity + 1);
    }
  }

  function decreaseQuantity() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {product && (
        <ScrollView>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: product.thumbnail }} />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.name}>{product.title}</Text>
            <Text style={styles.price}>$ {product.price}</Text>
            <Text style={styles.price}>Stock:  {availableStock}</Text>
            <Text style={styles.description}>{product.description}</Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={decreaseQuantity}>
                <Text style={styles.quantityButton}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantity}>{quantity}</Text>
              <TouchableOpacity onPress={increaseQuantity}>
                <Text style={styles.quantityButton}>+</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.addToCartButton} onPress={onAddToCart}>
              <Text style={styles.addToCartButtonText}>Add To Cart</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  infoContainer: {
    paddingHorizontal: 20,
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    fontWeight: '400',
    color: '#787878',
    marginBottom: 20,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  quantityButton: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: '#394ed5',
    borderRadius: 5,
    marginHorizontal: 5,
    color: 'white',
  },
  quantity: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  addToCartButton: {
    backgroundColor: '#0ed4c5',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  addToCartButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});
