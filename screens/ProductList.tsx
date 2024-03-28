import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    TextInput,
} from "react-native";
import { GetProducts, Product, GetCategories, GetProductsByCategory } from "../services/ProductService";

export function ProductsList({ navigation }) {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const loadProducts = async () => {
            try {
                let result;
                if (selectedCategory) {
                    result = await GetProductsByCategory(selectedCategory);
                } else {
                    result = await GetProducts(); // Este es para mostrar todos los productos cuando no haya ningun botón de categoría presionado
                }
                if (searchQuery.trim() !== '') {
                    result = result.filter(product =>
                        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()))
                    );
                }
                setProducts(result);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        loadProducts();

        const loadCategories = async () => {
            try {
                const result = await GetCategories();
                setCategories(result);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        loadCategories();
    }, [selectedCategory, searchQuery]);

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category === selectedCategory ? null : category);
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search product..."
                    onChangeText={handleSearch}
                    value={searchQuery}
                />
            </View>
            <Text style={styles.categoryHeader}>Categories</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScrollView}>
                {categories.map((category, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[styles.categoryButton, selectedCategory === category && styles.selectedCategory]}
                        onPress={() => handleCategoryChange(category)}
                    >
                        <Text style={[styles.categoryButtonText, selectedCategory === category && styles.selectedCategoryText]}>{category}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <FlatList
                // Se maneja la key de esta manera para poder tener dos productos en la misma fila 
                data={products}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => navigation.navigate('ProductDetails', { productId: item.id })}
                    >
                        <Image style={styles.image} source={{ uri: item.thumbnail }} />
                        <View style={styles.infoContainer}>
                            <Text style={styles.name} numberOfLines={2}>{item.title}</Text>
                            <Text style={styles.price}>$ {item.price}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.productListContainer}
                numColumns={2}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        paddingHorizontal: 16,
        paddingTop: 8,
    },
    searchContainer: {
        marginBottom: 8,
    },
    searchInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    categoryHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    categoryScrollView: {
        marginBottom: 8,
    },
    categoryButton: {
        paddingHorizontal: 16,
        backgroundColor: '#f8f8f8',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        height: 40,
        justifyContent: 'center',
        marginRight: 8,
    },
    selectedCategory: {
        backgroundColor: '#0ed4c5',
    },
    selectedCategoryText: {
        color: '#ffffff',
    },
    categoryButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
    productListContainer: {
        paddingBottom: 16,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16,
        marginHorizontal: 4,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: '48%',
    },
    image: {
        width: '100%',
        aspectRatio: 1,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    infoContainer: {
        padding: 16,
        width: '100%',
    },
    name: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'center',
    },
    price: {
        fontSize: 12,
        fontWeight: '600',
        color: 'gray',
        textAlign: 'center',
    },
});
