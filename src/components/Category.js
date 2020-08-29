import React, { Component } from 'react'
import { Form, Row, Col, Card, Button, Table } from 'react-bootstrap'
import CategoryService from '../services/CategoryService'

export class Category extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: '',
            categories: []
        }
    }

    componentDidMount() {
        this.findAllCategories();
    }

    findAllCategories() {
            CategoryService.getAll()
            .then(Response => Response.data)
            .then((data) =>{
                this.setState({
                    categories : data
                })
            })
            
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    submitForm = event => {
        event.preventDefault()

        const category = {
            name: this.state.name
        }

        CategoryService.AddCategory(category)
            .then(Response => {
                if (Response.data) {
                    console.log('saved successfully');
                }
            })
    }

    render() {
        const { name, categories } = this.state;
        return (
            <div>
                <Row>
                    <Col md={6}>
                        <Card>
                            <Form onSubmit={this.submitForm}>
                                <Card.Header>
                                    Add A Category
                                </Card.Header>
                                <Card.Body>

                                    <Form.Control type="text" name="name" autoComplete="off" required
                                        placeholder="category name" onChange={this.handleChange} value={name}
                                    />
                                </Card.Body>
                                <Card.Footer>
                                    <Button size="sm" variant="success" type="submit"> Add
                                </Button>
                                </Card.Footer>
                            </Form>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Header>
                                Category List
                            </Card.Header>
                            <Card.Body>
                                <Table striped>
                                    <thead>
                                        <tr>
                                            <th>id</th>
                                            <th>name</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {categories.length === 0 ?
                                            <tr>
                                                <td>NO categories available</td>
                                            </tr> :
                                            categories.map((category) => (
                                                <tr key={category.id}>
                                                    <td>{category.id}</td>
                                                    <td>{category.name}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Category
