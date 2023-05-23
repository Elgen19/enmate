import React, { useState, useEffect } from 'react';
import {Container, Row, Col, Nav, Navbar} from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';


function InmateSearch() {
    const [inmates, setInmates] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchInmates();
    }, []);

    const fetchInmates = async () => {
        try {
            const response = await axios.get('http://localhost:8080/inmates');

            if (response.status === 200) {
                setInmates(response.data);
            } else {
                console.error('Error fetching inmates:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching inmates:', error);
        }
    };

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleSearch = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.get(
                `http://localhost:8080/inmates/search?bookingNumber=${searchValue}`
            );

            if (response.status === 200) {
                setSearchResult(response.data);
                setShowModal(true);
            } else {
                console.error('Error searching inmate:', response.statusText);
            }
        } catch (error) {
            console.error('Error searching inmate:', error);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSearchResult(null);
    };

    const attributeMapping = {
        _id: 'Object ID',
        firstname: 'First Name',
        middlename: 'Middle Name',
        lastname: 'Last Name',
        sex: 'Sex',
        nationality: 'Nationality',
        marital_status: 'Marital Status',
        age: 'Age',
        street: 'Street',
        baranggay: 'Baranggay',
        city: 'City',
        province: 'Province',
        height: 'Height',
        weight: 'Weight',
        eye_color: 'Eye Color',
        hair_color: 'Hair Color',
        distinctive_features: 'Distinctive Features',
        booking_number: 'Booking Number',
        arrest_date: 'Date Arrested',
        arresting_officer: 'Arresting Officer',
        location_arrested: 'Location Arrested',
        reason_arrested: 'Reason Arrested',
        incident_details: 'Incident Details',
        holding_unit: 'Holding Unit / Station',
        cell: 'Cell and Number',
        detention_status: 'Detention Status',
        bail_amount: 'Bail Amount',
        createdAt: 'Date Created',
        updatedAt: 'Date Updated',
        __v: 'Version Key'
    };

    return (
        <Container fluid>
            <Form onSubmit={handleSearch}>
                <Row>
                    <Col>
                        <Navbar bg="dark" variant="dark" className='mb-3'>
                            <Container >
                                <Row style={{ width: '100%' }}>
                                    <Nav>
                                        <Col className='d-flex justify-content-end'>
                                            <Nav.Link href = "/"> Search Inmate </Nav.Link>
                                        </Col>

                                        <Col>
                                            <Nav.Link href = "/InmateUpdateWithDelete" > Update / Delete Record  </Nav.Link>
                                        </Col>

                                        <Col>
                                            <Nav.Link href = "/RegisterInmates"> Record Inmate </Nav.Link>
                                        </Col>

                                        <Col xs={5} >
                                            <Form.Group controlId="booking_number">
                                                <Form.Control
                                                    type="number"
                                                    placeholder="Enter Booking Number to Update / Delete / View"
                                                    style={{ width: '90%' }}
                                                    value={searchValue}
                                                    onChange={handleSearchChange}
                                                />
                                            </Form.Group>
                                        </Col>

                                        <Col>
                                            <Button variant="primary" type="submit" style={{ width: '100%' }}>
                                                Search
                                            </Button>
                                        </Col>
                                    </Nav>
                                </Row>
                            </Container>
                        </Navbar>
                    </Col>
                </Row>
            </Form>
            {/* <Form onSubmit={handleSearch}>
                <Form.Group controlId="formBasicSearch">
                    <Form.Label>Booking Number</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Booking Number"
                        value={searchValue}
                        onChange={handleSearchChange}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Search
                </Button>
            </Form> */}

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Booking Number</th>
                        <th>Full Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {inmates.map((inmate) => (
                        <tr key={inmate._id}>
                            <td>{inmate.booking_number}</td>
                            <td>{inmate.firstname} {inmate.middlename} {inmate.lastname}</td>
                            <td>
                                <Button
                                    variant="primary"
                                    onClick={() => {
                                        setSearchResult(inmate);
                                        setShowModal(true);
                                    }}
                                >
                                    View Details
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>



            {searchResult && (
                <Modal show={showModal} onHide={handleCloseModal} dialogClassName="custom-modal">
                    <Modal.Header closeButton style={{ backgroundColor: 'black', borderBottom: '1px solid #ddd' }}>
                        <Modal.Title style={{ color: 'white' }}>Inmate Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ backgroundColor: 'black' }}>
                        {Object.keys(searchResult).map((key) => (
                            <p key={key} style={{ color: 'white' }}>
                                {attributeMapping[key]}: {searchResult[key]}
                            </p>
                        ))}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal} style={{ backgroundColor: 'red', color: 'white' }}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}


        </Container>
    );
}

export default InmateSearch;

