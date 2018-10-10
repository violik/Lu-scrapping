import Api from '@/services/Api'

export default {
  loadProduct () {
    return Api().get('products')
  }
}
