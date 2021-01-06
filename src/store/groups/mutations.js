function addZero(num) {
  return num < 10 ? '0' + num : num
}
export default {
  add(state, payload) {
    var d = new Date()
    let new_id = state.data[state.data.length - 1]
    state.data.push({
      id: new_id ? new_id.id + 1 : 1,
      name: payload.name,
      status: 1,
      created_on:
        addZero(d.getDate()) +
        '/' +
        addZero(d.getMonth() + 1) +
        '/' +
        d.getFullYear(),
    })
  },
}
