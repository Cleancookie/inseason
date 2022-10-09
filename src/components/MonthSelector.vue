<script>

export default {
    props: ['modelValue'],
    emits: ['update:modelValue'],
    methods: {
        updateMonth(event) {
            this.$emit('update:modelValue', event.target.value);
        }
    }
}

</script>

<template>
    <select name="month" id="month" v-model="modelValue" @input="updateMonth" class="text-purple-600 border-b-2 border-purple-600 bg-white">
        <option value="0">January</option>
        <option value="1">February</option>
        <option value="2">March</option>
        <option value="3">April</option>
        <option value="4">May</option>
        <option value="5">June</option>
        <option value="6">July</option>
        <option value="7">August</option>
        <option value="8">September</option>
        <option value="9">October</option>
        <option value="10">November</option>
        <option value="11">December</option>
    </select>
</template>
