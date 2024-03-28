import React, { useContext } from "react";
import { View, Image, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { CartContext } from "../CartContext";
import { AntDesign } from '@expo/vector-icons';

export function Cart({ navigation }) {
    const { items, getTotalPrice, removeItemFromCart, updateCartItemQuantity } = useContext(CartContext);

    function renderItem({ item }) {
        const handleIncrement = () => {
            updateCartItemQuantity(item.id, item.qty + 1);
        };

        const handleDecrement = () => {
            if (item.qty > 1) {
                updateCartItemQuantity(item.id, item.qty - 1);
            } else {
                removeItemFromCart(item.id);
            }
        };

        return (
            <View style={styles.cartLine}>
                <Image style={styles.image} source={{ uri: item.product.thumbnail }} />
                <View style={{ flex: 1 }}>
                    <Text style={styles.lineLeft}>{item.product.title}</Text>
                    <View style={styles.quantityContainer}>
                        <TouchableOpacity onPress={handleDecrement} style={styles.quantityButton}>
                            <AntDesign name="minus" size={20} color="black" />
                        </TouchableOpacity>
                        <Text style={styles.quantityText}>{item.qty}</Text>
                        <TouchableOpacity onPress={handleIncrement} style={styles.quantityButton}>
                            <AntDesign name="plus" size={20} color="black" />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.productTotal}>Total: ${item.totalPrice.toFixed(2)}</Text>
                </View>
                <TouchableOpacity onPress={() => removeItemFromCart(item.id)} style={styles.removeButton}>
                    <AntDesign name="close" size={20} color="black" />
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <FlatList
            style={styles.itemsList}
            contentContainerStyle={styles.itemsListContainer}
            data={items}
            renderItem={renderItem}
            keyExtractor={(item) => item.product.id}
            ListFooterComponent={() => (
                <View style={styles.cartLineTotal}>
                    <Text style={[styles.lineLeft, styles.lineTotal]}>Total</Text>
                    <Text style={styles.mainTotal}>$ {getTotalPrice().toFixed(2)}</Text>
                </View>
            )}
        />
    )
}

const styles = StyleSheet.create({
    itemsList: {
        backgroundColor: '#eeeeee'
    },
    itemsListContainer: {
        backgroundColor: '#eeeeee',
        paddingVertical: 8,
        marginHorizontal: 8
    },
    cartLine: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingVertical: 10
    },
    image: {
        width: 80,
        height: 80,
        marginRight: 10
    },
    removeButton: {
        backgroundColor: '#f8f8f8',
        padding: 8,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cartLineTotal: {
        flexDirection: 'row',
        borderTopColor: '#dddddd',
        borderTopWidth: 1,
        marginTop: 10,
        paddingHorizontal: 10,
        alignItems: 'center'
    },
    productTotal: {
        fontWeight: 'bold'
    },
    lineTotal: {
        fontWeight: 'bold'
    },
    lineLeft: {
        fontSize: 20,
        lineHeight: 30,
        color: '#333333',
        marginBottom: 5
    },
    mainTotal: {
        flex: 1,
        fontSize: 20,
        fontWeight: 'bold',
        lineHeight: 40,
        color: '#333333',
        textAlign: 'right'
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5
    },
    quantityButton: {
        backgroundColor: '#f8f8f8',
        borderRadius: 5,
        padding: 5,
        marginRight: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    quantityText: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingHorizontal: 10
    }
});

