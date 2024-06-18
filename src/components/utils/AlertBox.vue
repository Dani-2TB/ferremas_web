<template>
    <div id="alert">
        <p>Alert</p>
    </div>
</template>

<script setup>
    const bsAlert = new bootstrap.Alert("#alert");
    document.getElementById("alert")
    console.log(bsAlert)
</script>
