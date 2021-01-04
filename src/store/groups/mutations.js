function addZero(num) {
  return num < 10 ? '0' + num : num
}
export default {
  add(state, payload) {
    var d = new Date()
    state.data.push({
      id: state.data.length,
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
