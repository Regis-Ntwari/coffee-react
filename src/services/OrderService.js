const { default: Axios } = require("axios");

class OrderService{
    saveOrder(orders){
        return Axios.post('http://localhost:8080/order' , orders)
    }
}
export default new OrderService()