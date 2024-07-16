import { defineStore } from 'pinia';
import { ref } from 'vue';

export const carritoStore = defineStore('items', () => {
    const items = ref([])
    const total = ref(0)

    function carritoAdd(data){
        for (let i = 0; i < items.value.length; i++) {
            if (items.value[i].producto.id === data.producto.id) {
                items.value[i].cantidad += data.cantidad;
                return;
            }
        }
        items.value.push(data);
    }
    
    function carritoRemove(data) {
        for (let i = 0; i < items.value.length; i++) {
            if (items.value[i].producto.id == data.producto.id) {
                items.value[i].cantidad -= 1;
                return;
            }
        }
    }

    function carritoDelete(id) {
        for (let i = 0; items.value.length; i++) {
            if (items.value[i].producto.id === id) {
                items.value.splice(i,1);
                return
            }
        }
    }

    function updateTotal() {
        total.value = 0;
        items.value.forEach((entry) => {
            total.value += entry.producto.precio * entry.cantidad;
        });
    }

    async function updateCarrito() {
        for (let i = 0; i < items.value.length; i++) {
            let url = `${import.meta.env.VITE_API_URL}/productos/productoDetalle/${items.value[i].producto.id}`;
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                items.value[i].producto = data;
                if (data.cantidad < items.value[i].cantidad) {
                    items.value[i].cantidad = data.cantidad
                }
            }
        }
    }

    return {items, total, carritoAdd, carritoRemove, carritoDelete, updateCarrito, updateTotal}
})
