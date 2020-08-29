import React, { Component } from 'react'
import { Row, Col, Card, Button, Table } from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus, faMinus, faTimes, faSave} from '@fortawesome/free-solid-svg-icons'
import ProductService from '../services/ProductService'
import OrderService from '../services/OrderService'

export class Menu extends Component {

    constructor(props) {
        super(props)

        this.state = {
            products: [],
            productSelected: []
            
        }
    }

    componentDidMount() {
        this.findAllProducts();
    }
    findAllProducts() {
        ProductService.getAllProducts()
            .then((Response) => Response.data)
            .then((data) => {
                this.setState({
                    products: data
                })
            })
    }

    refreshSelectedProducts(products){
        this.setState({
            productSelected : products
        })
    }
    substractItem(product){
        const {productSelected} = this.state;
        productSelected.forEach((p) =>{
            if(p.id === product.id){
                if(p.quantity === 1){
                    const index = productSelected.indexOf(product);
                    productSelected.splice(index, 1);
                }
                else{
                    p.quantity --;
                }
            }
            this.refreshSelectedProducts(productSelected)
        })
    }

    removeItem(product){
        const {productSelected} = this.state;
        const index = productSelected.indexOf(product)
        productSelected.splice(index, 1)
        this.refreshSelectedProducts(productSelected)
    }
    firstPage = event =>{

    }
    addToSelected(product) {
        const { productSelected } = this.state
        const pro = {
            id: product.id,
            p: product,
            quantity: 1
        }
        if (productSelected.find(po => po.id === product.id)) {
            productSelected.forEach((p) => {
                if (p.p.id === product.id) {
                    p.quantity++;
                }
            })
        }
        else {
            productSelected.push(pro)

        }
        this.refreshSelectedProducts(productSelected)
    }

    saveOrder = event =>{
        OrderService.saveOrder(this.state.productSelected)
            .then((Response) => {
                if(Response.data){
                    console.log('saved');
                }
            })
    }
    render() {
        const IMAGE_SERVER = "http://localhost:8080";
        const { products, productSelected } = this.state
        return (
            <div>
                <Row>
                    <Col md={6}>
                        <Row>
                            {products.map((product) => (
                                <Col md={6} key={product.id}>
                                    <Card width={100} onClick={this.addToSelected.bind(this, product)}>
                                        <img src={IMAGE_SERVER + product.photo} width="auto" height={200} alt="product"></img>
                                        <Card.Body>
                                            {product.name}
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )
                            )}
                        </Row>
                    </Col>
                    <Col>
                        <Table>
                            <thead>
                                <tr>
                                    <th>name</th>
                                    <th>quantity</th>
                                    <th>remove item</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productSelected.length === 0 ?

                                    <tr>
                                        <td>No products selected!! Click on the product to add one</td>
                                    </tr> :
                                    productSelected.map((product) => (
                                        <tr key={product.id}>
                                            <td>
                                                <img src={IMAGE_SERVER + product.p.photo} alt='brand' width={25} height={25} className="rounded-circle"></img>
                                                {product.p.name}
                                            </td>
                                            <td>
                                                <Button variant="dark" >
                                                    <FontAwesomeIcon icon={faMinus} size="sm" onClick={this.substractItem.bind(this, product)}/>
                                                </Button>
                                                {product.quantity} selected
                                                <Button variant="dark" onClick={this.addToSelected.bind(this, product)}>
                                                    <FontAwesomeIcon icon={faPlus} size="1x"/>
                                                </Button>
                                            </td>
                                            <td>
                                                <Button variant="danger">
                                                    <FontAwesomeIcon icon={faTimes} onClick={this.removeItem.bind(this, product)}/>
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                        <Button variant="outline-dark" disabled={productSelected.length === 0 ? true : false} onClick={this.saveOrder}>
                            <FontAwesomeIcon icon={faSave}/>
                            Proceed
                        </Button>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Menu
