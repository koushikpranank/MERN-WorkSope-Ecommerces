import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Button } from "react-bootstrap";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Test from "./Test";
import Home from "./pages/users/Home";
const App = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <>
      <Container className="mt-4">
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
      </Container>

      {/* <div>
        <Test />
      </div> */}
    </>
  );
};

export default App;
