export default {
  async add(context, obj) {
    try {
      await context.commit('add', obj)
    } catch (error) {
      throw error
    }
  },
}
