import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Row, Container, Col, Button, Modal, Form, Table } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

import { list, create } from '../actions/ordersActions';
import { listCategories } from '../actions/categoryActions';

class Order extends Component {
    state = {
        errors: {},
        showCreateModal: false,
        showDetailModal: false,
        orderDetails: null,
        sort: { field: 'id', direction: 'desc' },

        contact_name: '',
        contact_phone: '',
        agency: '',
        company: '',
        description: '',
        deadline: '',
        category_id: '',
    }

    getData() {
        this.props.list({
            field: this.state.sort.field,
            direction: this.state.sort.direction,
        });
    }

    componentDidMount() {
        this.getData();
        this.props.listCategories({});
    }

    toggleModalDetails(show, order) {
        this.setState({ showDetailModal: show, orderDetails: order });
    }

    toggleModalCreate(show) {
        this.setState({ showCreateModal: show });
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onChangeDeadline(date) {
        this.setState({ deadline: date });
    }

    onSort(e) {
        e.preventDefault();
        const field = e.target.getAttribute('data-sort');
        const direction = e.target.getAttribute('data-sortdirection');
        if (direction === 'asc') {
            e.target.setAttribute("data-sortdirection", "desc");
        } else {
            e.target.setAttribute("data-sortdirection", "asc");
        }

        this.setState({ sort: { field: field, direction: direction } }, () => {
            this.getData();
        });
    }

    saveOrder(e) {
        e.preventDefault();

        const formData = {
            contact_name: this.state.contact_name,
            contact_phone: this.state.contact_phone,
            agency: this.state.agency,
            company: this.state.company,
            description: this.state.description,
            deadline: this.state.deadline,
            category_id: this.state.category_id
        }
        this.setState({ errors: {} });

        this.props.create(formData, (data) => {
            if (data.success) {
                this.setState({
                    contact_name: '',
                    contact_phone: '',
                    agency: '',
                    company: '',
                    description: '',
                    deadline: '',
                    category_id: '',

                    errors: {},
                    showCreateModal: false
                });
                this.getData();
            } else {
                this.setState({ errors: data.data.errors });
            }
        });
    }

    render() {
        const { orders } = this.props.orders;
        const { categories } = this.props.categories;

        const errors = this.state.errors;

        return (
            <Container>
                <Row className='mt-3 mb-3'>
                    <Col>
                        <Button className="float-end" onClick={this.toggleModalCreate.bind(this, true)}>Open New Order</Button>
                        <Modal size="lg" show={this.state.showCreateModal}>
                            <Modal.Header closeButton onClick={this.toggleModalCreate.bind(this, false)}>
                                <Modal.Title>New Order</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <Form>
                                    <Row>
                                        <Col md={4}>
                                            <Form.Group className="mb-3" controlId="contact_name">
                                                <Form.Label>Contact Name</Form.Label>
                                                <Form.Control name="contact_name" type="text" placeholder="Contact Name" className={classnames("form-control", {
                                                    "is-invalid": errors.contact_name
                                                })} value={this.state.contact_name} onChange={this.onChange.bind(this)} />
                                                <Form.Control.Feedback type="invalid">{errors.contact_name}</Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group className="mb-3" controlId="contact_phone">
                                                <Form.Label>Contact Phone</Form.Label>
                                                <Form.Control name="contact_phone" type="text" placeholder="Contact Phone" className={classnames("form-control", {
                                                    "is-invalid": errors.contact_phone
                                                })} value={this.state.contact_phone} onChange={this.onChange.bind(this)} />
                                                <Form.Control.Feedback type="invalid">{errors.contact_phone}</Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group className="mb-3" controlId="agency">
                                                <Form.Label>Real Estate Agency</Form.Label>
                                                <Form.Control name="agency" type="text" placeholder="Agency" className={classnames("form-control", {
                                                    "is-invalid": errors.agency
                                                })} value={this.state.agency} onChange={this.onChange.bind(this)} />
                                                <Form.Control.Feedback type="invalid">{errors.agency}</Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={8}>
                                            <Form.Group className="mb-3" controlId="description">
                                                <Form.Label>Order Description</Form.Label>
                                                <Form.Control name="description" as="textarea" placeholder="Description" className={classnames("form-control", {
                                                    "is-invalid": errors.description
                                                })} value={this.state.description} onChange={this.onChange.bind(this)} />
                                                <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group className="mb-3" controlId="company">
                                                <Form.Label>Company</Form.Label>
                                                <Form.Control name="company" type="text" placeholder="Company" className={classnames("form-control", {
                                                    "is-invalid": errors.company
                                                })} value={this.state.company} onChange={this.onChange.bind(this)} />
                                                <Form.Control.Feedback type="invalid">{errors.company}</Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={8}>
                                            <Form.Group className="mb-3" controlId="category_id">
                                                <Form.Label>Select the order category</Form.Label>
                                                <Form.Select name="category_id" className={classnames("form-control", {
                                                    "is-invalid": errors.category_id
                                                })} value={this.state.category_id} onChange={this.onChange.bind(this)}>
                                                    <option value="">Please select</option>
                                                    {categories && categories.map((category, index) => {
                                                        return (<option key={`category-${index}`} value={category.id}>{category.name}</option>);
                                                    })}
                                                </Form.Select>
                                                <Form.Control.Feedback type="invalid">{errors.category_id}</Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group className="mb-3" controlId="deadline">
                                                <Form.Label>Deadline</Form.Label>
                                                <DatePicker dateFormat="dd/MM/yyyy" name="deadline" className={classnames("form-control", {
                                                    "is-invalid": errors.deadline
                                                })} selected={this.state.deadline} onChange={this.onChangeDeadline.bind(this)} />
                                                <div class="text-danger" style={{ fontSize: '0.875em' }}>{errors.deadline}</div>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Form>
                            </Modal.Body>

                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.toggleModalCreate.bind(this, false)}>Close</Button>
                                <Button variant="success" onClick={this.saveOrder.bind(this)}>Save</Button>
                            </Modal.Footer>
                        </Modal>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className='table-responsive'>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        {/* eslint-disable-next-line */}
                                        <th><a href="#" className="sort-link active" onClick={this.onSort.bind(this)} data-sort="id" data-sortdirection="desc">Id</a></th>
                                        {/* eslint-disable-next-line */}
                                        <th><a href="#" className="sort-link" onClick={this.onSort.bind(this)} data-sort="category" data-sortdirection="asc">Category</a></th>
                                        {/* eslint-disable-next-line */}
                                        <th><a href="#" className="sort-link" onClick={this.onSort.bind(this)} data-sort="contact_name" data-sortdirection="asc">Contact</a></th>
                                        {/* eslint-disable-next-line */}
                                        <th><a href="#" className="sort-link" onClick={this.onSort.bind(this)} data-sort="agency" data-sortdirection="asc">Agency</a></th>
                                        {/* eslint-disable-next-line */}
                                        <th><a href="#" className="sort-link" onClick={this.onSort.bind(this)} data-sort="company" data-sortdirection="asc">Company</a></th>
                                        {/* eslint-disable-next-line */}
                                        <th><a href="#" className="sort-link" onClick={this.onSort.bind(this)} data-sort="deadline" data-sortdirection="asc">Deadline</a></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders && orders.map((order, index) => {
                                        return (
                                            <tr key={`order-row-${index}`} onClick={this.toggleModalDetails.bind(this, true, order)}>
                                                <td>{order.id}</td>
                                                <td>{order.category.name}</td>
                                                <td>{order.contact_name} {order.contact_phone}</td>
                                                <td>{order.agency}</td>
                                                <td>{order.company}</td>
                                                <td>{moment(order.deadline).format('DD/MM/YYYY')}</td>
                                            </tr>
                                        );
                                    })}
                                    {orders && Object.keys(orders).length === 0 && <tr><td colSpan={6}>No order found!</td></tr>}
                                </tbody>
                            </Table>
                        </div>
                        <Modal size="lg" show={this.state.showDetailModal}>
                            <Modal.Header closeButton onClick={this.toggleModalDetails.bind(this, false, null)}>
                                <Modal.Title>Order Details #{this.state.orderDetails && this.state.orderDetails.id}</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <Row>
                                    <Col md={4}>
                                        <div className="mb-3">
                                            <label>Contact Name</label>
                                            <h4>{this.state.orderDetails && this.state.orderDetails.contact_name}</h4>
                                        </div>
                                    </Col>
                                    <Col md={4}>
                                        <div className="mb-3">
                                            <label>Contact Phone</label>
                                            <h4>{this.state.orderDetails && this.state.orderDetails.contact_phone}</h4>
                                        </div>
                                    </Col>
                                    <Col md={4}>
                                        <div className="mb-3">
                                            <label>Real Estate Agency</label>
                                            <h4>{this.state.orderDetails && this.state.orderDetails.agency}</h4>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={8}>
                                        <div className="mb-3">
                                            <label>Order Description</label>
                                            <p style={{ whiteSpace: 'pre-wrap' }}><strong>{this.state.orderDetails && this.state.orderDetails.description}</strong></p>
                                        </div>
                                    </Col>
                                    <Col md={4}>
                                        <div className="mb-3">
                                            <label>Company</label>
                                            <h4>{this.state.orderDetails && this.state.orderDetails.company}</h4>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={8}>
                                        <div className="mb-3">
                                            <label>Category</label>
                                            <h4>{this.state.orderDetails && this.state.orderDetails.category.name}</h4>
                                        </div>
                                    </Col>
                                    <Col md={4}>
                                        <div className="mb-3">
                                            <label>Deadline</label>
                                            <h4>{this.state.orderDetails && moment(this.state.orderDetails.deadline).format('DD/MM/YYYY')}</h4>
                                        </div>
                                    </Col>
                                </Row>
                            </Modal.Body>

                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.toggleModalDetails.bind(this, false, null)}>Close</Button>
                            </Modal.Footer>
                        </Modal>
                    </Col>
                </Row>
            </Container>
        );
    }
}

Order.propTypes = {
    list: PropTypes.func.isRequired,
    create: PropTypes.func.isRequired,
    listCategories: PropTypes.func.isRequired,
    orders: PropTypes.object.isRequired,
    categories: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    orders: state.orders,
    categories: state.categories,
});

export default connect(mapStateToProps, { list, create, listCategories })(Order);