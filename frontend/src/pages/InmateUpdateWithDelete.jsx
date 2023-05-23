import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { Row, Col, Navbar, Form, Alert, Nav } from 'react-bootstrap';
import axios from 'axios';


function InmateUpdateAndDelete() {
    const [bookingNumber, setBookingNumber] = useState('');
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
        bail_amount: '',
    });

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:8080/inmates/search?bookingNumber=${bookingNumber}`);
            const inmateData = response.data;
            setFormData(inmateData);
            setShowAlert(false);
            alert('Retrieval Successful')

        } catch (error) {
            console.log(error);
            setShowAlert(true);
            resetForm();

        }
    };


    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const arrestDate = new Date(formData.arrest_date);
            const formattedDate = arrestDate.toISOString().split('T')[0];

            const payload = {

                firstname: formData.firstname,
                middlename: formData.middlename,
                lastname: formData.lastname,
                sex: formData.sex,
                nationality: formData.nationality,
                marital_status: formData.marital_status,
                age: formData.age,
                street: formData.street,
                baranggay: formData.baranggay,
                city: formData.city,
                province: formData.province,
                height: formData.height,
                weight: formData.weight,
                eye_color: formData.eye_color,
                hair_color: formData.hair_color,
                distinctive_features: formData.distinctive_features,
                booking_number: formData.booking_number,
                arrest_date: formattedDate,
                arresting_officer: formData.arresting_officer,
                location_arrested: formData.location_arrested,
                reason_arrested: formData.reason_arrested,
                incident_details: formData.incident_details,
                holding_unit: formData.holding_unit,
                cell: formData.cell,
                detention_status: formData.detention_status,
                bail_amount: formData.bail_amount
            };


            await axios.put(`http://localhost:8080/inmates/update-inmate-record`, payload);
            // Display success message or perform any other actions
            console.log('Update successful');
            alert('Update Successful')
            setBookingNumber('');
            resetForm();
        } catch (error) {
            console.log('something wrong: ' + error);
            alert('Cannot update form.')
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const [showAlert, setShowAlert] = useState(false);

    const resetForm = () => {
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
    };

    const deleteBooking = async (e) => {
        e.preventDefault();
        try {
            await axios.delete(`http://localhost:8080/inmates/delete?bookingNumber=${formData.booking_number}`);
            // Display success message or perform any other actions
            console.log('Delete successful');
            alert('Delete Successful');
            setBookingNumber('');
            resetForm();
        } catch (error) {
            console.log('Something went wrong: ' + error);
            alert('Cannot delete booking number.');
        }
    };

    return (
        <Container fluid>
            <Form onSubmit={handleSearch}>
                <Row>
                    <Col>
                        <Navbar bg="dark" variant="dark" className='mb-3'>
                            <Container>
                                <Row style={{ width: '100%' }}>
                                    <Nav>
                                        <Col className='d-flex justify-content-end'>
                                            <Nav.Link href="/"> Search Inmate </Nav.Link>
                                        </Col>

                                        <Col>
                                            <Nav.Link href="/InmateUpdateWithDelete" > Update / Delete Record  </Nav.Link>
                                        </Col>

                                        <Col>
                                            <Nav.Link href="/RegisterInmates"> Record Inmate </Nav.Link>
                                        </Col>


                                        <Col  xs={5}>
                                            <Form.Group controlId="booking_number">
                                                <Form.Control
                                                    type="number"
                                                    placeholder="Enter Booking Number to Update / Delete"
                                                    style={{ width: '90%' }}
                                                    value={bookingNumber} onChange={(e) => setBookingNumber(e.target.value)}
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

            {showAlert && (
                <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                    The booking number was not found or does not exist.
                </Alert>
            )}

            {Object.keys(formData).length > 0 && (
                <Form onSubmit={handleUpdate}>
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
                                    value={formData.firstname} onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="middlename">
                                <Form.Label>Middle Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Middle Name"
                                    value={formData.middlename} onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="lastname">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Last Name"
                                    value={formData.lastname} onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="sex">
                                <Form.Label>Sex</Form.Label>
                                <Form.Select
                                    value={formData.sex} onChange={handleChange}
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
                                    value={formData.nationality} onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="marital_status">
                                <Form.Label>Marital Status</Form.Label>
                                <Form.Select
                                    value={formData.marital_status} onChange={handleChange}
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
                                    value={formData.age} onChange={handleChange}
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
                                    value={formData.street} onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group className="mb-3" controlId="baranggay">
                                <Form.Label>Barangay</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Barangay"
                                    value={formData.baranggay} onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group className="mb-3" controlId="city">
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter City"
                                    value={formData.city} onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group className="mb-3" controlId="province">
                                <Form.Label>Province</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Province"
                                    value={formData.province} onChange={handleChange}
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
                                    value={formData.height} onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group className="mb-3" controlId="weight">
                                <Form.Label>Weight</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter Weight in Kilograms"
                                    value={formData.weight} onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group className="mb-3" controlId="eye_color">
                                <Form.Label>Eye Color</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Eye Color"
                                    value={formData.eye_color} onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group className="mb-3" controlId="hair_color">
                                <Form.Label>Hair Color</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Hair Color"
                                    value={formData.hair_color} onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group className="mb-3" controlId="distinctive_features">
                                <Form.Label>Distinctive Features</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Distinctive Features"
                                    value={formData.distinctive_features} onChange={handleChange}
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
                                    value={formData.booking_number} onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group className="mb-3" controlId="arrest_date">
                                <Form.Label>Arrest Date</Form.Label>
                                <Form.Control type="date" placeholder="Enter Date Arrested"
                                    value={formData.arrest_date ? formData.arrest_date.slice(0, 10) : ""}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group className="mb-3" controlId="arresting_officer">
                                <Form.Label>Arresting Officer</Form.Label>
                                <Form.Control type="text" placeholder="Enter Arresting Officer"
                                    value={formData.arresting_officer} onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group className="mb-3" controlId="location_arrested">
                                <Form.Label>Location Arrested</Form.Label>
                                <Form.Control type="text" placeholder="Enter Location Arrested"
                                    value={formData.location_arrested} onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group className="mb-3" controlId="reason_arrested">
                                <Form.Label>Reason Arrested</Form.Label>
                                <Form.Control type="text" placeholder="Enter Reason Arrested"
                                    value={formData.reason_arrested} onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="incident_details">
                                <Form.Label>Incident Details</Form.Label>
                                <Form.Control type="text" placeholder="Enter the narrative of the incident"
                                    value={formData.incident_details} onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="holding_unit">
                                <Form.Label>Holding Unit/Station</Form.Label>
                                <Form.Control type="text" placeholder="Enter Holding Unit / Station"
                                    value={formData.holding_unit} onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group className="mb-3" controlId="cell">
                                <Form.Label>Cell Number</Form.Label>
                                <Form.Control type="text" placeholder="Enter Cell and Number"
                                    value={formData.cell} onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group className="mb-3" controlId="detention_status">
                                <Form.Label>Detention Status</Form.Label>
                                <Form.Select
                                    value={formData.detention_status} onChange={handleChange}
                                >
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
                                    value={formData.bail_amount} onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>


                        <Col>
                            <Button variant="primary" type="submit" style={{ width: '100%', fontSize: '20px', fontWeight: 'bolder' }}>
                                Update
                            </Button>
                        </Col>

                        <Col>
                            <Button variant="danger" type="submit" style={{ width: '100%', fontSize: '20px', fontWeight: 'bolder' }} onClick={deleteBooking}>
                                Delete
                            </Button>
                        </Col>


                    </Row>

                </Form>
            )}
        </Container >

    );
}

export default InmateUpdateAndDelete;
