const { default: Axios } = require("axios");

class CategoryService{

    getAll(){
        return Axios.get('http://localhost:8080/categories')
    }
    AddCategory(data){
        return Axios.post('http://localhost:8080/category', data)
    }
}
export default new CategoryService()