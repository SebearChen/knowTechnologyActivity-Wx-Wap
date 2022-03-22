export default {
    name: 'mutations',
    default: {
        setSubmitData(state, obj) {
            state.submitData = Object.assign({}, state.submitData, obj)
        }
    }
}
