module.exports = {
    extends: [
        'plugin:vue/vue3-recommended'
    ],
    rules: {
        'vue/no-deprecated-slot-attribute': 'off',
    },
    parser: "vue-eslint-parser",
    parserOptions: {
        parser: '@typescript-eslint/parser'
    }
}