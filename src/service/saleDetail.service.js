import { saleDetails } from "../mock-data/saleDetail.data.js";

export function getAllSaleDetails() {
    return saleDetails;
}

export function getSaleDetailById(id) {
    return saleDetails.find(d => d.id == id);
}

export function createSaleDetail(detail) {
    const exists = saleDetails.find(d => d.id == detail.id);
    if (exists) return null;
    saleDetails.push(detail);
    return detail;
}

export function updateSaleDetail(id, updatedFields) {
    const index = saleDetails.findIndex(d => d.id == id);
    if (index === -1) return null;
    saleDetails[index] = { ...saleDetails[index], ...updatedFields };
    return saleDetails[index];
}

export function deleteSaleDetail(id) {
    const index = saleDetails.findIndex(d => d.id == id);
    if (index === -1) return false;
    saleDetails.splice(index, 1);
    return true;
}
