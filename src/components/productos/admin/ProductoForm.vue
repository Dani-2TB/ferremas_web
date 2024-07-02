<template>
<div v-if="messages.length > 0">
  <div v-for="message in messages" :key="message.text">
    <div class="alert display-flex alert-dismissible fade show" :class="message.class"
    >
      <i class="bi bi-check-circle me-3"></i><span>{{ message.text }}</span>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  </div>
</div>
<form @submit.prevent class="py-3 px-4 rounded">
  <div class="mb-3">
    <label for="nombre" class="form-label">Nombre <span class="required">*</span></label>
    <input type="text" name="nombre" class="form-control"
      v-model="form.nombre" maxlength="30" minlength="3" required
    >
  </div>
  <div class="mb-3">
    <label for="desc" class="form-label">Descripción</label>
    <textarea type="textarea" name="desc" class="form-control" rows="3"
      v-model="form.descripcion">
    </textarea>
  </div>
  <div class="mb-3">
    <label for="precio" class="form-label">Precio <span class="required">*</span></label>
    <input type="number" name="precio" class="form-control"
      v-model="form.precio" min="1" max="99999999" required>
  </div>
  <div class="mb-3">
    <label for="stock" class="form-label">Stock <span class="required">*</span></label>
    <input type="number" name="stock" class="form-control" 
      v-model="form.cantidad" min="1" max="999999" required>
  </div>
  <div class="mb-3">
    <label for="categoria">Categoría <span class="required">*</span></label>
    <select 
      name="categoria" id="categoriaSelect" class="form-select" 
      v-model="form.categoria" required placeholder="Seleccione una categoría"
    >
      <option value="" selected disabled><strong>Seleccione una categoría</strong></option>
      <option v-for="categoria in categoriaList" :key="categoria.id" :value="categoria.id">{{ categoria.nombre }}</option>
    </select>
  </div>
  <div class="mb-3">
    <label for="marca">Marca <span class="required">*</span></label>
    <select 
      name="marca" id="marcaSelect" class="form-select" 
      v-model="form.marca" required placeholder="Seleccione una marca"
    >
      <option value="" selected disabled>Seleccione una marca</option>
      <option v-for="marca in marcaList" :key="marca.id" :value="marca.id">{{ marca.nombre }}</option>
    </select>
  </div>

  <button 
    v-if="$route.meta.type === 'add'" class="btn btn-success me-2" 
    type="submit" @click="updateProducto(false)">
    Agregar
  </button>
  <button 
    v-if="$route.meta.type === 'update'" class="btn btn-primary"
    type="submit" @click="updateProducto()"
  >
    Actualizar
  </button>

</form>
</template>

<script setup>
  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';

  const marcaList = ref(Array(0));
  const categoriaList = ref(Array(0));
  const fetchOk = ref();
  const form = ref(new ProductoForm());
  const route = useRoute();
  const messages = ref(new Array(0));
  
  fetchOk.value = true;

  onMounted(() => {
    fetchData(updateCategorias, "categoriaList");
    fetchData(updateMarcas, "marcaList");

    if (route.meta.type === "update") {
      console.log("update view")
      fetchData(updateForm, `productoDetalle/${route.params.id}`)
    }
  })

  async function fetchData(processData, endpoint) {
    fetchOk.value = true;
    const url = `${import.meta.env.VITE_API_URL}/productos/${endpoint}`;

    const response = await fetch(url, {method: "GET", headers: {"Content-Type": "application/json"}});
    if (response.ok) {
      fetchOk.value = true;
      response.json()
      .then((data) => {
        processData(data);
      });
    } else { 
      fetchOk.value = false;
    }
  }

  function updateForm(data) {
    form.value.id = data.id;
    form.value.nombre = data.nombre;
    form.value.descripcion = data.descripcion;
    form.value.precio = Number(data.precio);
    form.value.cantidad = data.cantidad;
    form.value.categoria = data.categoria;
    form.value.marca = data.marca;
  }
  
  function updateCategorias(data) {
    for (let i = 0; i < data.length; i++) {
      const categoria = data[i];
      if (categoria.sub_categorias.length === 0) {
        const nuevaCategoria = new SelectItem(categoria.id, categoria.nombre);
        categoriaList.value.push(nuevaCategoria);
      }
      if (categoria.sub_categorias.length > 0) {
        updateCategorias(categoria.sub_categorias);
      }
    }
  }

  function updateMarcas(data) {
    for (let i = 0; i < data.length; i++) {
      const marca = data[i];
      const nuevaMarca = new SelectItem(marca.id, marca.nombre)
      marcaList.value.push(nuevaMarca)
    }
  }

  function SelectItem(id, nombre) {
    this.id = id
    this.nombre = nombre
  }

  function ProductoForm() {
    this.id = new Number();
    this.nombre = new String();
    this.descripcion = new String();
    this.precio = new Number();
    this.cantidad = new Number();
    this.categoria = new Number();
    this.marca = new Number();
  }

  async function updateProducto(update = true) {
    messages.value = new Array(0);

    const endpoint = update ? `productoDetalle/${form.value.id}` : 'productoList/'
    const url = `${import.meta.env.VITE_API_URL}/productos/${endpoint}`;
    const respone = await fetch(
      url,
      {
        method: update ? 'PUT' : 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(form.value)
      }
    )

    if (respone.ok) {
      if (!update) {
        form.value = new ProductoForm();
        messages.value.push({class:{'alert-success': true}, text: 'Producto agregado con éxito'})
      } else {
        messages.value.push({class: {'alert-success': true}, text: 'Producto actualizado con éxito'})
      }
    }
  }
</script>

<style>
.required {
  color: rgb(211, 12, 39);
}

form {
  background-color: rgb(240, 239, 237);
}
</style>