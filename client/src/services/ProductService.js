import Api from '@/services/Api'

export default {
  loadProduct () {
    return Api().get('products')
  },
  deleteProduct () {
    return Api().delete('products')
  }
}
