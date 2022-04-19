/* Group Number: 5
 * Members: Sarah Zhang, Katie Cella, Bing Gu, Ethan Piper
 * sarah.s.zhang@vanderbilt.edu, katharine.a.cella@vanderbilt.edu, bing.q.gu@vanderbilt.edu, ethan.b.piper@vanderbilt.edu
 * Homework 03
 */

import { Col, Row, Card, Button, Modal, Form } from "react-bootstrap";
import classes from "./CarpoolItem.module.css";
import { useState } from "react";

function CarpoolItem(props) {
  const [First, setFirst] = useState("");
  const [Last, setLast] = useState("");
  const [Email, setEmail] = useState("");
  const [show, setShow] = useState(false);
  const [Code, setCode] = useState("");
  const [FirstNameVerified, setFirstNameVerified] = useState(false);
  const [EmailVerified, setEmailVerfied] = useState(false);
  const [FirstMessage, setFirstMessage] = useState(false);
  const [EmailMessage, setEmailMessage] = useState(false);
  const [Verified, setVerified] = useState(false);
  const handleClose = () => setShow(false);
  function handleShow() {
    setShow(true);
  }

  function inputValid() {
    if (FirstNameVerified && EmailVerified) {
      handleClose();
    } else if (!FirstNameVerified) {
      setFirstMessage(true);
    } else if (!EmailVerified) {
      setEmailMessage(true);
    }
  }

  async function verifyClicked() {
    //const result = await SendCode(Email, Code);
    if (Code === "000000") {
      setVerified(true);
      setShow(false);
    } else {
      setVerified(false);
      setShow(false);
    }
  }

  return (
    <div>
      <Card className={classes.cardData}>
        <Row>
          <Col style={{ textAlign: "center" }}>
            OPEN SEATS:
            <br />
            <p
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "17pt",
              }}
            >
              {4 - props.carpool_ref["students"].length}
            </p>
          </Col>
          <Col>Leaving from: {props.carpool_ref["departure"]}</Col>
          <Col>Leaving time: {props.carpool_ref["time"].substring(0, 5)}</Col>
          <Col>
            Destination:
            {props.carpool_ref["destination"]}
            {/* Students:
          <ul className={classes.list}>
            {props.carpool_ref["students"].map((student) => {
              return <li key={student}>{student}</li>;
            })}
          </ul> */}
          </Col>
          <Col style={{ paddingTop: "7px" }}>
            <Button onClick={handleShow} className={classes.buttonData}>
              JOIN
            </Button>
          </Col>
        </Row>
      </Card>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        className={classes.modal}
        centered
      >
        <Modal.Header style={{ backgroundColor: "#e8a62b" }} closeButton>
          <Modal.Title>Enter your information</Modal.Title>
        </Modal.Header>
        <Modal.Body className={classes.label}>
          {true ? (
            <Form>
              <Form.Group className="mb-3" controlId="formBasicCode">
                <Form.Label className={classes.label}>First Name:</Form.Label>
                <Form.Control
                  className={classes.input}
                  type="text"
                  required
                  maxLength="40"
                  pattern="([a-zA-Z]+)"
                  onChange={(event) => {
                    setFirst(event.target.value);
                    setFirstNameVerified(true);
                  }}
                />
                {FirstMessage ? (
                  <Form.Text className="text-muted">
                    Please fill out this field.
                  </Form.Text>
                ) : (
                  <div></div>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCode">
                <Form.Label className={classes.label}>
                  Last Name (optional):
                </Form.Label>
                <Form.Control
                  className={classes.input}
                  type="text"
                  onChange={(event) => {
                    setLast(event.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCode">
                <Form.Label className={classes.label}>
                  Vanderbilt Email:
                </Form.Label>
                <Form.Control
                  className={classes.input}
                  type="email"
                  required
                  placeholder="Enter valid Vanderbilt email"
                  pattern=".+vanderbilt.edu"
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setEmailVerfied(true);
                  }}
                />
                {EmailMessage ? (
                  <Form.Text className="text-muted">
                    Enter valid Vanderbilt email.
                  </Form.Text>
                ) : (
                  <div></div>
                )}
              </Form.Group>
            </Form>
          ) : (
            <div></div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={inputValid}
            classname={classes.joinInfo}
          >
            JOIN
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CarpoolItem;
