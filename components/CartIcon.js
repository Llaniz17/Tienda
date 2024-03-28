import React, { useContext } from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { CartContext } from "../CartContext";
import { AntDesign } from "@expo/vector-icons";

export function CartIcon({ navigation }) {
	const { getItemsCount } = useContext(CartContext);
	return (
		<TouchableOpacity onPress={() => { navigation.navigate('Cart') }} style={styles.container}>
			<AntDesign name="shoppingcart" size={24} color="#0ed4c5">
			</AntDesign>
			<Text style={styles.text} >
				({getItemsCount()})
			</Text>
		</TouchableOpacity>

	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row'
	},
	text: {
		color: '#394ed5',
		fontWeight: 'bold',
		fontSize: 15
	}
})