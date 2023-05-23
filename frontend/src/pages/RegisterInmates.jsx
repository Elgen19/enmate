import React, { useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';


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
        booking_number: '',
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
    const [successAlertVisible, setSuccessAlertVisible] = useState(false);
    const [errorAlertVisible, setErrorAlertVisible] = useState(false);


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/inmates/create-inmate-record', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // Inmate record created successfully
                console.log('Inmate record created successfully');
                setSuccessAlertVisible(true);
                setErrorAlertVisible(false);
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
                    booking_number: '',
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
                console.error('Error creating inmate record:', response.statusText);
                setSuccessAlertVisible(false);
                setErrorAlertVisible(true);
            }
        } catch (error) {
            console.error('Error creating inmate record:', error);
            setSuccessAlertVisible(false);
            setErrorAlertVisible(true);
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
        <Container fluid>
            {successAlertVisible && (
                <Alert variant="success" dismissible onClose={() => setSuccessAlertVisible(false)}>
                    Inmate record created successfully.
                </Alert>
            )}
            {errorAlertVisible && (
                <Alert variant="danger" dismissible onClose={() => setErrorAlertVisible(false)}>
                    Error creating inmate record.
                </Alert>
            )}

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
                                        <Nav.Link href="/InmateUpdateWithDelete" > Update / Delete Record  </Nav.Link>
                                    </Col>

                                    <Col className='text-center'>
                                        <Nav.Link href="/RegisterInmates"> Record Inmate </Nav.Link>
                                    </Col>
                                </Nav>
                            </Row>
                        </Container>
                    </Navbar>
                </Col>
            </Row>




            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <Navbar bg="dark" variant="dark" className="mb-3">
                            <Container>
                                <Navbar.Brand href="#home">
                                    Personal Information
                                </Navbar.Brand>
                            </Container>
                        </Navbar>
                    </Col>
                </Row>


                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="firstname">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter First Name"
                                value={formData.firstname}
                                onChange={handleChange} />
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
                                onChange={handleChange} />
                        </Form.Group>
                    </Col>
                </Row>



                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="sex">
                            <Form.Label>Sex</Form.Label>
                            <Form.Select
                                value={formData.sex}
                                onChange={handleChange}
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
                                onChange={handleChange} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="marital_status">
                            <Form.Label>Marital Status</Form.Label>
                            <Form.Select
                                value={formData.marital_status}
                                onChange={handleChange}
                            >
                                <option value="">Select marital status</option>
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
                            />
                        </Form.Group>
                    </Col>

                </Row>

                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="street">
                            <Form.Label>Street</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Street Address"
                                value={formData.street}
                                onChange={handleChange}
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
                            />
                        </Form.Group>
                    </Col>
                </Row>


                <Row>
                    <Col>
                        <Navbar bg="dark" variant="dark" className='mb-3'>
                            <Container>
                                <Navbar.Brand href="#home">
                                    Physical Description
                                </Navbar.Brand>
                            </Container>
                        </Navbar>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="height">
                            <Form.Label>Height</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter Height in Centimeters"
                                value={formData.height}
                                onChange={handleChange}
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


                <Row>
                    <Col>
                        <Navbar bg="dark" variant="dark" className='mb-3'>
                            <Container>
                                <Navbar.Brand href="#home">
                                    Booking Information
                                </Navbar.Brand>
                            </Container>
                        </Navbar>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="booking_number">
                            <Form.Label>Booking Number</Form.Label>
                            <Form.Control type="number" placeholder="Enter Booking Number"
                                value={formData.booking_number}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group className="mb-3" controlId="arrest_date">
                            <Form.Label>Arrest Date</Form.Label>
                            <Form.Control type="date" placeholder="Enter Date Arrested"
                                value={formData.arrest_date}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group className="mb-3" controlId="arresting_officer">
                            <Form.Label>Arresting Officer</Form.Label>
                            <Form.Control type="text" placeholder="Enter Arresting Officer"
                                value={formData.arresting_officer}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group className="mb-3" controlId="location_arrested">
                            <Form.Label>Location Arrested</Form.Label>
                            <Form.Control type="text" placeholder="Enter Location Arrested"
                                value={formData.location_arrested}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group className="mb-3" controlId="reason_arrested">
                            <Form.Label>Reason Arrested</Form.Label>
                            <Form.Control type="text" placeholder="Enter Reason Arrested"
                                value={formData.reason_arrested}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="incident_details">
                            <Form.Label>Incident Details</Form.Label>
                            <Form.Control type="text" placeholder="Enter the narrative of the incident"
                                value={formData.incident_details}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="holding_unit">
                            <Form.Label>Holding Unit/Station</Form.Label>
                            <Form.Control type="text" placeholder="Enter Holding Unit / Station"
                                value={formData.holding_unit}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group className="mb-3" controlId="cell">
                            <Form.Label>Cell Number</Form.Label>
                            <Form.Control type="text" placeholder="Enter Cell and Number"
                                value={formData.cell}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group className="mb-3" controlId="detention_status">
                            <Form.Label>Detention Status</Form.Label>
                            <Form.Select
                                value={formData.detention_status}
                                onChange={handleChange}>
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
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
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