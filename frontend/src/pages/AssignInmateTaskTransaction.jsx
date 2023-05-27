import { Container, Nav, Navbar, Form, Button, Card } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';
import axios from 'axios';

function InmateDutiesTransaction() {
    const [formData, setFormData] = useState({
        inmate_ID: '',
        firstname: '',
        middlename: '',
        lastname: '',
        sex: '',
        age: '',
        cell: '',
        task_start_date: '',
        task_end_date: '',
        task_assigned: '',
        task_area: '',
        time_start: '',
        time_end: '',
        supervising_officer: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (
            formData.task_assigned === 'Select Task to Assign' || formData.task_area === 'Select Task Area' || formData.supervising_officer === 'Select Supervising Officer') {
            alert('Please select valid options for all dropdown fields.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/task/inmate-duties/create-duty', formData);
            console.log(response.data);
            // Handle the response as needed

            alert('Task Assignment Successful');

            setFormData({
                inmate_ID: '',
                firstname: '',
                middlename: '',
                lastname: '',
                sex: '',
                age: '',
                cell: '',
                task_start_date: '',
                task_end_date: '',
                task_assigned: '',
                task_area: '',
                time_start: '',
                time_end: '',
                supervising_officer: ''
            });
        } catch (error) {
            console.error(error);
            alert('Something is wrong. Please check to see that the inmate ID existed or the inmate is not assigned to any active task. If errors persist, consult IT support.');
            // Handle the error as needed
        }
    };

    const handleSearch = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.get('http://localhost:8080/task/search', {
                params: {
                    inmateID: formData.inmate_ID
                }
            });

            const inmateData = response.data;

            if (inmateData) {
                // Update the form data with the retrieved inmate data
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    firstname: inmateData.firstname,
                    middlename: inmateData.middlename,
                    lastname: inmateData.lastname,
                    sex: inmateData.sex,
                    age: inmateData.age,
                    cell: inmateData.cell
                }));
            } else {
                // Inmate with the entered ID not found
                // Handle the case when the inmate doesn't exist
            }
        } catch (error) {
            console.error(error);
            setFormData({
                inmate_ID: '',
                firstname: '',
                middlename: '',
                lastname: '',
                sex: '',
                age: '',
                cell: '',
                task_start_date: '',
                task_end_date: '',
                task_assigned: '',
                task_area: '',
                time_start: '',
                time_end: '',
                supervising_officer: ''
            });
            alert('Something is wrong. Please check to see that the inmate ID has existed or has no task assigned yet. If errors persist, please contact IT support.');
            // Handle the error as needed
        }
    };


    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <Navbar bg="dark" variant="dark" className="mb-3">
                            <Container fluid>
                                <Row style={{ width: '100%' }}>
                                    <Nav>
                                        <Col className="text-center">
                                            <Nav.Link href="/"> Search Inmate </Nav.Link>
                                        </Col>

                                        <Col className="text-center">
                                            <Nav.Link href="/InmateUpdateWithDelete"> Update / Delete Record </Nav.Link>
                                        </Col>

                                        <Col className="text-center">
                                            <Nav.Link href="/RegisterInmates"> Record Inmate </Nav.Link>
                                        </Col>

                                        <Col className="text-center">
                                            <Nav.Link href="/AssignInmateTaskTransaction"> Duty Assignment </Nav.Link>
                                        </Col>
                                    </Nav>
                                </Row>
                            </Container>
                        </Navbar>
                    </Col>
                </Row>

                <Row>
                    <Col xs={6}>
                        <Form.Group controlId="inmate_ID">
                            <Form.Control
                                type="number"
                                placeholder="Enter Inmate ID"
                                style={{ width: '100%' }}
                                value={formData.inmate_ID}
                                onChange={handleChange}
                                name="inmate_ID"
                            />
                        </Form.Group>
                    </Col>

                    <Col xs={2}>
                        <Button variant="primary" type="submit" style={{ width: '100%' }} onClick={handleSearch}>
                            Search
                        </Button>
                    </Col>
                </Row>

                <Card className="mt-3">
                    <Card.Header className="bg-dark text-light">Inmate Information</Card.Header>

                    <Row className="mx-3 mt-3">
                        <Col>
                            <Form.Group className="mb-3" controlId="firstname">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="First Name"
                                    value={formData.firstname}
                                    onChange={handleChange}
                                    name="firstname"
                                    disabled={true}
                                />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group className="mb-3" controlId="middlename">
                                <Form.Label>Middle Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Middle Name"
                                    value={formData.middlename}
                                    onChange={handleChange}
                                    name="middlename"
                                    disabled={true}
                                />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group className="mb-3" controlId="lastname">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Last Name"
                                    value={formData.lastname}
                                    onChange={handleChange}
                                    name="lastname"
                                    disabled={true}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mx-3">
                        <Col>
                            <Form.Group className="mb-3" controlId="sex">
                                <Form.Label>Sex</Form.Label>
                                <Form.Control
                                    value={formData.sex}
                                    onChange={handleChange}
                                    name="sex"
                                    disabled={true} />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group className="mb-3" controlId="age">
                                <Form.Label>Age</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Age"
                                    value={formData.age}
                                    onChange={handleChange}
                                    name="age"
                                    disabled={true}
                                />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group className="mb-3" controlId="cell">
                                <Form.Label>Cell Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Cell and Number"
                                    value={formData.cell}
                                    onChange={handleChange}
                                    name="cell"
                                    disabled={true}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </Card>

                <Card className="mt-3">
                    <Card.Header className="bg-dark text-light">Task Assignment</Card.Header>

                    <Row className="mx-3 mt-3">
                        <Col>
                            <Form.Group className="mb-3" controlId="task_start_date">
                                <Form.Label>Start Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    placeholder="Enter Date Task Started"
                                    value={formData.task_start_date}
                                    onChange={handleChange}
                                    name="task_start_date"
                                    required
                                />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group className="mb-3" controlId="task_end_date">
                                <Form.Label>End Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    placeholder="Enter Date Task Ended"
                                    value={formData.task_end_date}
                                    onChange={handleChange}
                                    name="task_end_date"
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mx-3">
                        <Col>
                            <Form.Group className="mb-3" controlId="task_assigned">
                                <Form.Label>Assigned Task</Form.Label>
                                <Form.Select value={formData.task_assigned} onChange={handleChange} name="task_assigned" required>
                                    <option>Select Task to Assign</option>
                                    <option value="Mopping and Sweeping the Floor">Mopping and Sweeping the Floor</option>
                                    <option value="Collecting and disposing of trash and waste.">
                                        Collecting and disposing of trash and waste.
                                    </option>
                                    <option value="Laundry duties, including washing, folding, and distributing linens.">
                                        Laundry duties, including washing, folding, and distributing linens.
                                    </option>
                                    <option value="Assisting in the preparation and serving of meals.">
                                        Assisting in the preparation and serving of meals.
                                    </option>
                                    <option value="Assisting with inventory management and restocking of food supplies.">
                                        Assisting with inventory management and restocking of food supplies.
                                    </option>
                                    <option value="Sanitizing and disinfecting shared areas and restrooms.">
                                        Sanitizing and disinfecting shared areas and restrooms.
                                    </option>
                                    <option value="Assembly line work in manufacturing or production units.">
                                        Assembly line work in manufacturing or production units.
                                    </option>
                                    <option value="Clerical work, such as filing, data entry, or document organization.">
                                        Clerical work, such as filing, data entry, or document organization.
                                    </option>
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group className="mb-3" controlId="task_area">
                                <Form.Label>Select Task Area</Form.Label>
                                <Form.Select value={formData.task_area} onChange={handleChange} name="task_area" required>
                                    <option>Select Task Area</option>
                                    <option value="Library">Library</option>
                                    <option value="Chapel">Chapel</option>
                                    <option value="Medical Bay">Medical Bay</option>
                                    <option value="Exercise Yard">Exercise Yard</option>
                                    <option value="Cell Block Alpha">Cell Block Alpha</option>
                                    <option value="Cell Block Bravo">Cell Block Bravo</option>
                                    <option value="Common Restrooms">Common Restrooms</option>
                                    <option value="Common Office">Common Office</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mx-3">
                        <Col>
                            <Form.Group className="mb-3" controlId="time_start">
                                <Form.Label>Time Start</Form.Label>
                                <Form.Control
                                    type="time"
                                    placeholder="Enter Task Start Time"
                                    value={formData.time_start}
                                    onChange={handleChange}
                                    name="time_start"
                                    required
                                />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group className="mb-3" controlId="time_end">
                                <Form.Label>Time End</Form.Label>
                                <Form.Control
                                    type="time"
                                    placeholder="Enter Task End Time"
                                    value={formData.time_end}
                                    onChange={handleChange}
                                    name="time_end"
                                    required
                                />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group className="mb-3" controlId="supervising_officer">
                                <Form.Label>Supervising Officer</Form.Label>
                                <Form.Select
                                    value={formData.supervising_officer}
                                    onChange={handleChange}
                                    name="supervising_officer"
                                    required
                                >
                                    <option>Select Supervising Officer</option>
                                    <option value="Glendel Ramirez">Glendel Ramirez</option>
                                    <option value="Marko Peletinio">Marko Peletinio</option>
                                    <option value="Maria Criselda">Maria Criselda</option>
                                    <option value="Nancy Drew">Nancy Drew</option>
                                    <option value="John Doe">John Doe</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                </Card>

                <Button variant="primary" type="submit" className="mt-3" style={{ width: '100%' }}>
                    Submit
                </Button>
            </Form>
        </Container>
    );
}

export default InmateDutiesTransaction;
