import { sales } from "../mock-data/sale.data.js";

export function getAllSales() {
    return sales;
}

export function getSaleById(id) {
    return sales.find(s => s.id == id);
}

export function createSale(sale) {
    const exists = sales.find(s => s.id == sale.id);
    if (exists) return null;
    sales.push(sale);
    return sale;
}

export function updateSale(id, updatedFields) {
    const index = sales.findIndex(s => s.id == id);
    if (index === -1) return null;
    sales[index] = { ...sales[index], ...updatedFields };
    return sales[index];
}

export function deleteSale(id) {
    const index = sales.findIndex(s => s.id == id);
    if (index === -1) return false;
    sales.splice(index, 1);
    return true;
}
