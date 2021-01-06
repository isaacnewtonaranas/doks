export default {
  async add(context, obj) {
    try {
      await context.commit('add', obj)
    } catch (error) {
      throw error
    }
  },
  async delete(context, id) {
    try {
      await context.commit('delete', id)
    } catch (error) {
      throw error
    }
  },
}
