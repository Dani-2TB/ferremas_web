import { defineStore } from 'pinia';
import { ref } from 'vue';

export const carritoStore = defineStore('items', () => {
    const items = ref([])
    const total = ref(0)

    function carritoAdd(data) {
        for (let i = 0; i < items.value.length; i++) {
            if (items.value[i].producto.id === data.producto.id) {
                items.value[i].cantidad += data.cantidad;
                this.saveCarrito()
                return;
            }
        }
        items.value.push(data);
        this.saveCarrito()
    }
    
    function carritoRemove(data) {
        for (let i = 0; i < items.value.length; i++) {
            if (items.value[i].producto.id == data.producto.id) {
                items.value[i].cantidad -= 1;
                this.saveCarrito()
                return;
            }
        }
    }

    function carritoDelete(id) {
        for (let i = 0; items.value.length; i++) {
            if (items.value[i].producto.id === id) {
                items.value.splice(i,1);
                this.saveCarrito()
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
                    this.saveCarrito()
                }
            }
        }
    }

    async function saveCarrito() {
        localStorage.setItem("carrito-items", JSON.stringify(items.value));
        console.log("carrito guardado?")
    }

    async function loadCarrito() {
        if (localStorage.getItem("carrito-items") && items.value.length === 0) {
            const stored_items = JSON.parse(localStorage.getItem("carrito-items").valueOf())
            for (let i = 0; i<stored_items.length; i++) {
                items.value.push(stored_items[i])
            }
            this.updateCarrito()
            this.updateTotal()
        }
    }

    function clearCarrito() {
        items.value = []
        total.value = 0
        this.saveCarrito()
    }

    return {
        items, 
        total, 
        carritoAdd, 
        carritoRemove, 
        carritoDelete, 
        updateCarrito,
        saveCarrito,
        loadCarrito,
        clearCarrito,
        updateTotal
    }
})
