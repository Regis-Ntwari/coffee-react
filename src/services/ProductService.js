const { default: Axios } = require("axios");

class ProductService{
    getAllProducts(){
        return Axios.get('http://localhost:8080/products')
    }
    addProduct(product){
        return Axios.post('http://localhost:8080/product' , product)
    }
}
export default new ProductService()