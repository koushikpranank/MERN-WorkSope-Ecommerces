import { Component } from "react";

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  render() {
    return (
      <div
        className="container mt-5 p-5 border rounded shadow bg-light text-center"
        style={{ maxWidth: "400px" }}
      >
        <h1 className="text-primary mb-4">Test Component</h1>
        <h3 className="display-4 fw-bold text-dark mb-4">{this.state.count}</h3>
        <div>
          <button
            className="btn btn-success btn-lg me-3 shadow-sm"
            onClick={() => this.setState({ count: this.state.count + 1 })}
          >
            Increment
          </button>
          <button
            className="btn btn-danger btn-lg shadow-sm"
            onClick={() => this.setState({ count: this.state.count - 1 })}
          >
            Decrement
          </button>
        </div>
      </div>
    );
  }
}

export default Test;
