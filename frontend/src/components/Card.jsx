import { Col } from "react-bootstrap";
const Card = (props) => {
  return (
    <Col>
      <div className="card m-2">
        <div className="card-header">
          <img
            style={{ height: "350px", width: "350px" }}
            className="card-image"
            src={props.product.imgSrc}
            alt=""
          />
        </div>
        <div className="card-body">
          <h3>{props.product.title}</h3>
          <p>{props.product.description}</p>
        </div>
      </div>
    </Col>
  );
};

export default Card;
