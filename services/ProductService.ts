// ProductService.ts
export interface Product{
  id: number;
  title: string;
  price: string;
  description: string;
  thumbnail: any;
  stock: number;
  category: string;
  images: string[];
}

const BASE_URL = 'https://dummyjson.com/';

const limit = 100;

// Función para obtener todos los productos desde la API
export const GetProducts = async ():Promise<Product[]> => {
  const response = await fetch(`${BASE_URL}products?limit=${limit}`);
  const data = await response.json();
  return data.products;
};

// Función para obtener el detalle de un solo producto por su ID desde la API
export const GetProductById = async (id:number):Promise<Product> => {
  const response = await fetch(`${BASE_URL}products/${id}`);
    const data = await response.json();
    return data;
};

// Función para obtener todas las categorias desde la API
export const GetCategories = async ():Promise<Product[]> => {
  const response = await fetch(`${BASE_URL}products/categories?limit=${limit}`);
  const data = await response.json();
  return data;
};

// Función para obtener todos los productos por su categoria desde la API
export const GetProductsByCategory = async (category):Promise<Product[]> => {
  const response = await fetch(`${BASE_URL}products/category/${category}?limit=${limit}`);
    const data = await response.json();
    return data.products;
};

// Función para actualizar un atributo de un producto desde la API (en este caso es para actualizar el Stock)
export async function updateProductStock(productId, newStock) {
  try {
    const response = await fetch(`${BASE_URL}products/${productId}`, {
      method: 'PUT', // o PATCH
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        stock: newStock
      })
    });

    if (!response.ok) {
      throw new Error('Failed to update product stock');
    }

    const updatedProduct = await response.json();
    return updatedProduct;
  } catch (error) {
    console.error('Error updating product stock:', error);
    throw error;
  }
}
