export default {
    methods: {
        replaceStr(str, index, char) {
            return str.substring(0, index) + char + str.substring(index + 1);
        }
    },
}