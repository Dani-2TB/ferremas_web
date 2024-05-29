import { defineStore } from 'pinia';
import { ref } from 'vue';

export const carritoStore = defineStore('carrito', () => {
    const carrito = ref([])
    const total = ref(0)

    function carritoAdd(data){
        for (let i = 0; i < carrito.value.length; i++) {
            if (carrito.value[i].producto.id === data.producto.id) {
                console.log("item was in list")
                carrito.value[i].cantidad += data.cantidad;
                return;
            }
        }

        console.log("pushed new item")
        carrito.value.push(data);
    }

    function updateTotal() {
        total.value = 0;
        carrito.value.forEach((entry) => {
            total.value += entry.producto.precio * entry.cantidad;
        });
    }

    return {carrito, total, carritoAdd, updateTotal}
})
