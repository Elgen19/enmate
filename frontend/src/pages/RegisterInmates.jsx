import React, { useState } from 'react';
import { Container, Nav, Navbar, Card } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios'


function RegisterInmates() {
    const [formData, setFormData] = useState({
        firstname: '',
        middlename: '',
        lastname: '',
        sex: '',
        nationality: '',
        marital_status: '',
        age: '',
        street: '',
        baranggay: '',
        city: '',
        province: '',
        height: '',
        weight: '',
        eye_color: '',
        hair_color: '',
        distinctive_features: '',
        inmate_ID: '',
        arrest_date: '',
        arresting_officer: '',
        location_arrested: '',
        reason_arrested: '',
        incident_details: '',
        holding_unit: '',
        cell: '',
        detention_status: '',
        bail_amount: ''
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Check if required fields are not empty
        if (formData.sex === 'Select sex' || formData.marital_status === 'Select marital status' || formData.detention_status === 'Select Detention Status') {
            alert('Please select a value for the dropdown lists.');
            return;
        }

        if (formData.inmate_ID.length !== 8) {
            alert('Booking number cannot be empty and should be 8 digits in long.');
            return;
        }


        try {
            const response = await axios.post('http://localhost:8080/inmates/create-inmate-record', formData);

            if (response.status === 200) {
                // Inmate record created successfully
                console.log('Inmate record created successfully');
                alert('Inmate recorded successfully.');

                // Reset the form
                setFormData({
                    firstname: '',
                    middlename: '',
                    lastname: '',
                    sex: '',
                    nationality: '',
                    marital_status: '',
                    age: '',
                    street: '',
                    baranggay: '',
                    city: '',
                    province: '',
                    height: '',
                    weight: '',
                    eye_color: '',
                    hair_color: '',
                    distinctive_features: '',
                    inmate_ID: '',
                    arrest_date: '',
                    arresting_officer: '',
                    location_arrested: '',
                    reason_arrested: '',
                    incident_details: '',
                    holding_unit: '',
                    cell: '',
                    detention_status: '',
                    bail_amount: ''
                });
            } else {
                // Error occurred while creating inmate record
                console.error('Error:', response.statusText);
                alert('An error occurred while creating a record. Please check to ensure that you have filled up all fields. If the problem persists, consult IT support.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('It looks like you attempted to create a record without inputs. Please complete the form before submitting. Otherwise, please contact IT support.');
        }
    };

    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [id]: value,
        }));
    };

    return (
        <Container>
            <Row>
                <Col>
                    <Navbar bg="dark" variant="dark" className='mb-3'>
                        <Container fluid>
                            <Row style={{ width: '100%' }}>
                                <Nav>
                                    <Col className='text-center'>
                                        <Nav.Link href="/"> Search Inmate </Nav.Link>
                                    </Col>

                                    <Col className='text-center'>
                                        <Nav.Link href="/InmateUpdateWithDelete" > Update / Delete  </Nav.Link>
                                    </Col>

                                    <Col className='text-center'>
                                        <Nav.Link href="/RegisterInmates"> Record Inmate </Nav.Link>
                                    </Col>

                                    <Col className='text-center'>
                                        <Nav.Link href="/AssignInmateTaskTransaction"> Duty Assignment </Nav.Link>
                                    </Col>
                                </Nav>
                            </Row>
                        </Container>
                    </Navbar>
                </Col>
            </Row>




            <Form onSubmit={handleSubmit}>
                <Card className='mt-3'>
                    <Card.Header className='bg-dark text-light'>
                        Personal Information
                    </Card.Header>

                    <Row className='mt-3 mx-3'>
                        <Col>
                            <Form.Group className="mb-3" controlId="inmate_ID">
                                <Form.Label>Inmate ID</Form.Label>
                                <Form.Control type="number" placeholder="Enter Inmate ID"
                                    value={formData.inmate_ID} onChange={handleChange} required
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="firstname">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter First Name"
                                    value={formData.firstname}
                                    onChange={handleChange} required />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="middlename">
                                <Form.Label>Middle Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Middle Name"
                                    value={formData.middlename}
                                    onChange={handleChange} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="lastname">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Last Name"
                                    value={formData.lastname}
                                    onChange={handleChange} required />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className='mt-3 mx-3'>
                        <Col>
                            <Form.Group className="mb-3" controlId="sex">
                                <Form.Label>Sex</Form.Label>
                                <Form.Select
                                    value={formData.sex}
                                    onChange={handleChange}
                                    required
                                >
                                    <option>Select sex</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="nationality">
                                <Form.Label>Nationality</Form.Label>
                                <Form.Control type="text" placeholder="Enter Nationality"
                                    value={formData.nationality}
                                    onChange={handleChange} required />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="marital_status">
                                <Form.Label>Marital Status</Form.Label>
                                <Form.Select
                                    value={formData.marital_status}
                                    onChange={handleChange}
                                    required
                                >
                                    <option>Select marital status</option>
                                    <option value="Single">Single</option>
                                    <option value="Married">Married</option>
                                    <option value="Widowed">Widowed</option>
                                    <option value="Separated">Separated</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="age">
                                <Form.Label>Age</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter Age"
                                    value={formData.age}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>

                    </Row>

                    <Row className='mt-3 mx-3'>
                        <Col>
                            <Form.Group className="mb-3" controlId="street">
                                <Form.Label>Street</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Street Address"
                                    value={formData.street}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group className="mb-3" controlId="baranggay">
                                <Form.Label>Barangay</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Barangay"
                                    value={formData.baranggay}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group className="mb-3" controlId="city">
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter City"
                                    value={formData.city}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group className="mb-3" controlId="province">
                                <Form.Label>Province</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Province"
                                    value={formData.province}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                </Card>



                <Card className='mt-3'>
                    <Card.Header className='bg-dark text-light'>
                        Physical Description
                    </Card.Header>

                    <Row className='mt-3 mx-3'>
                        <Col>
                            <Form.Group className="mb-3" controlId="height">
                                <Form.Label>Height</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter Height in Centimeters"
                                    value={formData.height}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group className="mb-3" controlId="weight">
                                <Form.Label>Weight</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter Weight in Kilograms"
                                    value={formData.weight}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group className="mb-3" controlId="eye_color">
                                <Form.Label>Eye Color</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Eye Color"
                                    value={formData.eye_color}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group className="mb-3" controlId="hair_color">
                                <Form.Label>Hair Color</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Hair Color"
                                    value={formData.hair_color}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group className="mb-3" controlId="distinctive_features">
                                <Form.Label>Distinctive Features</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Distinctive Features"
                                    value={formData.distinctive_features}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </Card>

                <Card className='mt-3'>
                    <Card.Header className='bg-dark text-light'>
                        Booking Information
                    </Card.Header>

                    <Row className='mt-3 mx-3'>
                        <Col>
                            <Form.Group className="mb-3" controlId="arrest_date">
                                <Form.Label>Arrest Date</Form.Label>
                                <Form.Control type="date" placeholder="Enter Date Arrested"
                                    value={formData.arrest_date}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group className="mb-3" controlId="arresting_officer">
                                <Form.Label>Arresting Officer</Form.Label>
                                <Form.Control type="text" placeholder="Enter Arresting Officer"
                                    value={formData.arresting_officer}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group className="mb-3" controlId="location_arrested">
                                <Form.Label>Location Arrested</Form.Label>
                                <Form.Control type="text" placeholder="Enter Location Arrested"
                                    value={formData.location_arrested}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group className="mb-3" controlId="reason_arrested">
                                <Form.Label>Reason Arrested</Form.Label>
                                <Form.Control type="text" placeholder="Enter Reason Arrested"
                                    value={formData.reason_arrested}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className='mt-3 mx-3'>
                        <Col>
                            <Form.Group className="mb-3" controlId="incident_details">
                                <Form.Label>Incident Details</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    value={formData.incident_details}
                                    onChange={handleChange}
                                    rows={4}
                                    cols={40}
                                    required
                                    style={{ resize: 'none' }}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className='mt-3 mx-3'>
                        <Col>
                            <Form.Group className="mb-3" controlId="holding_unit">
                                <Form.Label>Holding Unit/Station</Form.Label>
                                <Form.Control type="text" placeholder="Enter Holding Unit / Station"
                                    value={formData.holding_unit}
                                    onChange={handleChange} required
                                />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group className="mb-3" controlId="cell">
                                <Form.Label>Cell Number</Form.Label>
                                <Form.Control type="text" placeholder="Enter Cell and Number"
                                    value={formData.cell}
                                    onChange={handleChange} required
                                />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group className="mb-3" controlId="detention_status">
                                <Form.Label>Detention Status</Form.Label>
                                <Form.Select
                                    value={formData.detention_status}
                                    onChange={handleChange} required>
                                    <option>Select Detention Status</option>
                                    <option value="Incarcerated">Incarcerated</option>
                                    <option value="Released">Released</option>
                                    <option value="Transferred">Transferred</option>
                                    <option value="Immigration Hold">Immigration Hold</option>
                                    <option value="Hospitalized">Hospitalized</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group className="mb-3" controlId="bail_amount">
                                <Form.Label>Bail Amount</Form.Label>
                                <Form.Control type="number" placeholder="Enter Bail Amount in Philippine Peso"
                                    value={formData.bail_amount}
                                    onChange={handleChange} required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </Card>

                <Row className='mt-5'>
                    <Col>
                        <Button variant="primary" type="submit" style={{ width: '100%', fontSize: '20px', fontWeight: 'bolder' }}>
                            Record
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>


    );
}

export default RegisterInmates;