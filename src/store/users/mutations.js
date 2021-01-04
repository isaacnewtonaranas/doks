function addZero(num) {
  return num < 10 ? '0' + num : num
}
export default {
  add(state, payload) {
    var d = new Date()
    state.data.push({
      id: state.data.length,
      name: payload.first_name + ' ' + payload.last_name,
      email: payload.email,
      status: 1,
      group: payload.group.id,
      created_on:
        addZero(d.getDate()) +
        '/' +
        addZero(d.getMonth() + 1) +
        '/' +
        d.getFullYear(),
    })
  },
}
