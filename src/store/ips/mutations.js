export default {
  add(state, payload) {
    let new_id = state.data[state.data.length - 1]
    state.data.push({
      id: new_id ? new_id.id + 1 : 1,
      address: payload.address,
      comment: payload.comment,
    })
  },
  delete(state, payload) {
    let new_data = state.data.filter((d) => d.id != payload)
    state.data = new_data
  },
}
