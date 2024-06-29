<template>
<form>
  <div class="mb-3">
    <label for="nombre" class="form-label">Nombre <span class="required">*</span></label>
    <input type="text" name="nombre" class="form-control"
      v-model="form.nombre" maxlength="30" minlength="3" required
    >
  </div>
  <div class="mb-3">
    <label for="desc" class="form-label">Descripción</label>
    <textarea type="textarea" name="desc" class="form-control" rows="3" v-model="form.descripcion"></textarea>
  </div>
  <div class="mb-3">
    <label for="precio" class="form-label">Precio <span class="required">*</span></label>
    <input type="number" name="precio" class="form-control"
      v-model="form.precio" min="1" max="99999999" required>
  </div>
  <div class="mb-3">
    <label for="stock" class="form-label">Stock <span class="required">*</span></label>
    <input type="number" name="stock" class="form-control" 
      v-model="form.stock" min="1" max="999999" required>
  </div>
  <div class="mb-3">
    <label for="categoria">Categoría <span class="required">*</span></label>
    <select name="categoria" id="categoriaSelect" class="form-select" v-model="form.categoria" required>
      <option value="" selected disabled><strong>Seleccione una categoría</strong></option>
      <option v-for="categoria in categoriaList" :key="categoria.id" :value="categoria.id">{{ categoria.nombre }}</option>
    </select>
  </div>
  <div class="mb-3">
    <label for="marca">Marca <span class="required">*</span></label>
    <select name="marca" id="marcaSelect" class="form-select" v-model="form.marca" required>
      <option value="" selected disabled>Seleccione una marca</option>
      <option v-for="marca in marcaList" :key="marca.id" :value="marca.id">{{ marca.nombre }}</option>
    </select>
  </div>

  <button class="btn btn-success me-2" type="submit">Agregar</button>
  <button class="btn btn-primary">Actualizar</button>

</form>
</template>

<script setup>
  import { onMounted, ref } from 'vue';
  const marcaList = ref(Array(0));
  const categoriaList = ref(Array(0));
  const fetchOk = ref();
  const form = ref({
    nombre: new String(),
    descripcion: new String(),
    precio: new Number(),
    stock: new Number(),
    categoria: new String(),
    marca: new String()
  });
  fetchOk.value = true;
  
  
  onMounted(() => {
    fetchData(updateCategorias, "categoriaList");
    fetchData(updateMarcas, "marcaList")
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
</script>

<style>
.required {
  color: rgb(211, 12, 39);
}
</style>