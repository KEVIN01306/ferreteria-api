import { products } from "../mock-data/product.data.js";

export function getAllProducts() {
    return products;
}

export function getProductById(id) {
    return products.find(p => p.id == id);
}

export function createProduct(product) {
    const exists = products.find(p => p.id == product.id);
    if (exists) return null;
    products.push(product);
    return product;
}

export function updateProduct(id, updatedFields) {
    const index = products.findIndex(p => p.id == id);
    if (index === -1) return null;
    products[index] = { ...products[index], ...updatedFields };
    return products[index];
}

export function deleteProduct(id) {
    const index = products.findIndex(p => p.id == id);
    if (index === -1) return false;
    products.splice(index, 1);
    return true;
}
