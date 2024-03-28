import React, { createContext, useState } from "react";
import { GetProductById } from "./services/ProductService.ts";

export const CartContext = createContext();

export function CartProvider(props) {
    const [items, setItems] = useState([]);

    async function addItemToCart(id, quantity = 1) {
        try {
            const product = await GetProductById(id);
            setItems((prevItems) => {
                const itemIndex = prevItems.findIndex((item) => item.id === id);
                if (itemIndex === -1) {
                    return [
                        ...prevItems,
                        {
                            id,
                            qty: quantity,
                            product,
                            totalPrice: parseFloat(product.price) * quantity
                        }
                    ];
                } else {
                    return prevItems.map((item, index) => {
                        if (index === itemIndex) {
                            item.qty += quantity;
                            item.totalPrice += parseFloat(product.price) * quantity;
                        }
                        return item;
                    });
                }
            });
        } catch (error) {
            console.error("Error adding item to cart:", error);
        }
    }

    function removeItemFromCart(id) {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    }

    function updateCartItemQuantity(id, newQuantity) {
        setItems((prevItems) =>
            prevItems.map((item) => {
                if (item.id === id) {
                    const productPrice = parseFloat(item.product.price);
                    item.qty = newQuantity;
                    item.totalPrice = newQuantity * productPrice;
                }
                return item;
            })
        );
    }

      

    function getItemsCount() {
        return items.reduce((sum, item) => sum + item.qty, 0);
    }

    function getTotalPrice() {
        return items.reduce((sum, item) => sum + item.totalPrice, 0);
    }

    return (
        <CartContext.Provider
            value={{
                items,
                getItemsCount,
                addItemToCart,
                removeItemFromCart,
                updateCartItemQuantity,
                getTotalPrice
            }}
        >
            {props.children}
        </CartContext.Provider>
    );
}
