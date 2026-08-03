import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Button } from "react-bootstrap";
import Login from "./components/Login";
import Register from "./components/Register";
import Test from "./Test";

const App = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <>
      {/* <Container className="mt-4">
        <div className="text-center mb-4">
          <Button
            variant={showLogin ? "dark" : "outline-dark"}
            onClick={() => setShowLogin(true)}
            className="me-2"
          >
            Login
          </Button>
          <Button
            variant={!showLogin ? "dark" : "outline-dark"}
            onClick={() => setShowLogin(false)}
          >
            Register
          </Button>
        </div>

        {showLogin ? <Login /> : <Register />}
      </Container> */}

      <div>
        <Test />
      </div>
    </>
  );
};

export default App;
