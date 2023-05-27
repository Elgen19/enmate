import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { Row, Col, Navbar, Form, Nav, Card } from 'react-bootstrap';
import axios from 'axios';


function InmateUpdateAndDelete() {
    const [formDisabled, setFormDisabled] = useState(true);
    const [inmateID, setInmateID] = useState('');
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
        bail_amount: '',
    });

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:8080/inmates/search?inmateID=${inmateID}`);
            const inmateData = response.data;
            setFormData(inmateData);
            setFormDisabled(false);
            alert('Retrieval Successful')

        } catch (error) {
            console.log(error);
            resetForm();
            setFormDisabled(true);
            alert('Please enter booking number.1')
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
                inmate_ID: formData.inmate_ID,
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
            setInmateID('');
            resetForm();
            setFormDisabled(true);
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
    };

    const deleteBooking = async (e) => {
        e.preventDefault();
        try {
            await axios.delete(`http://localhost:8080/inmates/delete?inmateID=${formData.inmate_ID}`);
            // Display success message or perform any other actions
            console.log('Delete successful');
            alert('Delete Successful');
            setInmateID('');
            resetForm();
            setFormDisabled(true);
        } catch (error) {
            console.log('Something went wrong: ' + error);
            alert('Cannot delete booking number.');
        }
    };

    return (
        <Container>
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
                                            <Nav.Link href="/InmateUpdateWithDelete" > Update / Delete  </Nav.Link>
                                        </Col>

                                        <Col>
                                            <Nav.Link href="/RegisterInmates"> Record Inmate </Nav.Link>
                                        </Col>

                                        <Col className='text-center'>
                                            <Nav.Link href="/AssignInmateTaskTransaction"> Duty Assignment </Nav.Link>
                                        </Col>

                                        <Col xs={5}>
                                            <Form.Group controlId="inmate_ID">
                                                <Form.Control
                                                    type="number"
                                                    placeholder="Enter Inmate ID to Update / Delete"
                                                    style={{ width: '90%' }}
                                                    value={inmateID} onChange={(e) => setInmateID(e.target.value)}
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

            {Object.keys(formData).length > 0 && (
                <Form onSubmit={handleUpdate}>
                    <Card>
                        <Card.Header className='bg-dark text-light'>
                            Personal Information
                        </Card.Header>

                        <Row className='mt-3 mx-3'>
                            <Col>
                                <Form.Group className="mb-3" controlId="inmate_ID">
                                    <Form.Label>Inmate ID</Form.Label>
                                    <Form.Control type="number" placeholder="Enter Inmate ID"
                                        value={formData.inmate_ID} onChange={handleChange} disabled={true}
                                    />
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group className="mb-3" controlId="firstname">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter First Name"
                                        value={formData.firstname} onChange={handleChange} disabled={formDisabled} required
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="middlename">
                                    <Form.Label>Middle Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Middle Name"
                                        value={formData.middlename} onChange={handleChange} disabled={formDisabled}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="lastname">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Last Name"
                                        value={formData.lastname} onChange={handleChange} disabled={formDisabled} required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className='mt-3 mx-3'>
                            <Col>
                                <Form.Group className="mb-3" controlId="sex">
                                    <Form.Label>Sex</Form.Label>
                                    <Form.Select
                                        value={formData.sex} onChange={handleChange} disabled={formDisabled} required
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
                                        value={formData.nationality} onChange={handleChange} disabled={formDisabled} required
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="marital_status">
                                    <Form.Label>Marital Status</Form.Label>
                                    <Form.Select
                                        value={formData.marital_status} onChange={handleChange} disabled={formDisabled} required
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
                                        value={formData.age} onChange={handleChange} disabled={formDisabled} required
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
                                        value={formData.street} onChange={handleChange} disabled={formDisabled} required
                                    />
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group className="mb-3" controlId="baranggay">
                                    <Form.Label>Barangay</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Barangay"
                                        value={formData.baranggay} onChange={handleChange} disabled={formDisabled} required
                                    />
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group className="mb-3" controlId="city">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter City"
                                        value={formData.city} onChange={handleChange} disabled={formDisabled} required
                                    />
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group className="mb-3" controlId="province">
                                    <Form.Label>Province</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Province"
                                        value={formData.province} onChange={handleChange} disabled={formDisabled} required
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
                                        value={formData.height} onChange={handleChange} disabled={formDisabled} required
                                    />
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group className="mb-3" controlId="weight">
                                    <Form.Label>Weight</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Enter Weight in Kilograms"
                                        value={formData.weight} onChange={handleChange} disabled={formDisabled} required
                                    />
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group className="mb-3" controlId="eye_color">
                                    <Form.Label>Eye Color</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Eye Color"
                                        value={formData.eye_color} onChange={handleChange} disabled={formDisabled} required
                                    />
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group className="mb-3" controlId="hair_color">
                                    <Form.Label>Hair Color</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Hair Color"
                                        value={formData.hair_color} onChange={handleChange} disabled={formDisabled} required
                                    />
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group className="mb-3" controlId="distinctive_features">
                                    <Form.Label>Distinctive Features</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Distinctive Features"
                                        value={formData.distinctive_features} onChange={handleChange} disabled={formDisabled}
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
                                        value={formData.arrest_date ? formData.arrest_date.slice(0, 10) : ""}
                                        onChange={handleChange} disabled={formDisabled} required
                                    />
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group className="mb-3" controlId="arresting_officer">
                                    <Form.Label>Arresting Officer</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Arresting Officer"
                                        value={formData.arresting_officer} onChange={handleChange} disabled={formDisabled} required
                                    />
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group className="mb-3" controlId="location_arrested">
                                    <Form.Label>Location Arrested</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Location Arrested"
                                        value={formData.location_arrested} onChange={handleChange} disabled={formDisabled} required
                                    />
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group className="mb-3" controlId="reason_arrested">
                                    <Form.Label>Reason Arrested</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Reason Arrested"
                                        value={formData.reason_arrested} onChange={handleChange} disabled={formDisabled} required
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
                                        disabled={formDisabled}
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
                                        value={formData.holding_unit} onChange={handleChange} disabled={formDisabled} required
                                    />
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group className="mb-3" controlId="cell">
                                    <Form.Label>Cell Number</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Cell and Number"
                                        value={formData.cell} onChange={handleChange} disabled={formDisabled} required
                                    />
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group className="mb-3" controlId="detention_status">
                                    <Form.Label>Detention Status</Form.Label>
                                    <Form.Select
                                        value={formData.detention_status} onChange={handleChange} disabled={formDisabled} required
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
                                        value={formData.bail_amount} onChange={handleChange} disabled={formDisabled} required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>


                    </Card>

                    <Row className='mt-5'>
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
