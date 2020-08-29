import React, { Component } from 'react'
import { Card, Form, Col, Button, Table, InputGroup, FormControl } from 'react-bootstrap'
import ProductService from '../services/ProductService'
import CategoryService from '../services/CategoryService'

export class Product extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: '',
            price: '',
            file: undefined,
            catId: '',
            categories: [],
            products: []
        }
    }

    componentDidMount() {
        this.findAllProducts();
        this.findAllCategories();
    }

    findAllCategories() {
        CategoryService.getAll()
            .then((Response) => Response.data)
            .then((data) => {
                this.setState({
                    categories : data
                })
            })
    }

    findAllProducts() {
        ProductService.getAllProducts()
            .then((Response) => Response.data)
            .then((data) => {
                this.setState({
                    products : data
                })
            })
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })

    }

    handleFileChange = event => {
        this.setState({
            file: event.target.files[0]
        })
    }

    submitProduct = event => {
        const data = new FormData();
        console.log(this.state.catId);
        data.append('file', this.state.file);
        data.append('name', this.state.name);
        data.append('price', this.state.price);
        data.append('catId', this.state.catId);


        ProductService.addProduct(data)
            .then(Response => {
                console.log('saved successfully');
            })
    }
    render() {
        const IMAGE_SERVER = "http://localhost:8080";
        const { name, price, catId, products, categories } = this.state;
        return (

            <div>
                <div>
                    <Card>
                        <Form onSubmit={this.submitProduct}>
                            <Card.Header>
                                Add A product
                        </Card.Header>
                            <Card.Body>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Control size="sm" value={name} name="name" required autoComplete="off" onChange={this.handleChange} />
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.File size="sm" onChange={this.handleFileChange} name="file" />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Control size="sm" onChange={this.handleChange} value={price} name="price" />
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Control size="sm" as="select" value={catId} onChange={this.handleChange} name="catId">
                                            {categories.map((category) => (
                                                <option key={category.id} value={category.id}>{category.name}</option>
                                            ))
                                            }
                                        </Form.Control>
                                    </Form.Group>
                                </Form.Row>

                            </Card.Body>
                            <Card.Footer>
                                <Button size="sm" className={"btn-block"} variant="secondary" type="submit">
                                    Add
                            </Button>
                            </Card.Footer>
                        </Form>
                    </Card>
                </div>
                <div>
                    <Card>
                        <Card.Header>
                            Product List
                        </Card.Header>
                        <Card.Body>
                            <Table striped>
                                <thead>
                                    <tr>
                                        <th>name</th>
                                        <th>price</th>
                                        <th>category</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.length === 0 ?
                                        <tr>
                                            <td>No product available</td>
                                        </tr> :
                                        products.map((product) => (
                                            <tr key={product.id}>
                                                <th>
                                                    <img src={IMAGE_SERVER + product.photo} alt="prod" width="35" height="35" />
                                                    {product.name}
                                                </th>
                                                <th>
                                                    {product.price}
                                                </th>
                                                <th>
                                                    {product.category.name}
                                                </th>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                        </Card.Body>
                        <Card.Footer>
                            <div style={{ 'float': 'left' }}>

                            </div>
                            <div style={{ 'float': 'right' }}>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <Button></Button>
                                        <Button></Button>
                                    </InputGroup.Prepend>
                                    <FormControl />
                                    <InputGroup.Append>
                                        <Button></Button>
                                        <Button></Button>
                                    </InputGroup.Append>
                                </InputGroup>
                            </div>
                        </Card.Footer>
                    </Card>
                </div>
            </div>
        )
    }
}

export default Product
