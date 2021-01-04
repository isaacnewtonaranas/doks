export default {
  add(context, obj) {
    try {
      context.commit('add', obj)
    } catch (error) {
      throw error
    }
  },
}
