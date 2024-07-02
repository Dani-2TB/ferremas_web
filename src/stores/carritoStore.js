import { defineStore } from 'pinia';
import { ref } from 'vue';

export const carritoStore = defineStore('items', () => {
    const items = ref([])
    const total = ref(0)

    function carritoAdd(data){
        for (let i = 0; i < items.value.length; i++) {
            if (items.value[i].producto.id === data.producto.id) {
                console.log("item was in list")
                items.value[i].cantidad += data.cantidad;
                return;
            }
        }

        console.log("pushed new item")
        items.value.push(data);
    }

    function updateTotal() {
        total.value = 0;
        items.value.forEach((entry) => {
            total.value += entry.producto.precio * entry.cantidad;
        });
    }
    return {items, total, carritoAdd, updateTotal}
})
