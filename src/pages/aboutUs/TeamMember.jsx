import React from "react";
import { Col, Card } from "react-bootstrap";
import { FaGithub } from "react-icons/fa";
import "../aboutUs/AboutUs.css";

const TeamMember = ({ name, img, text, extra, github, colors }) => {
  const cardWidth = "200px";
  const imgHeight = "200px";

  return (
    <Col
      className="d-flex flex-column align-items-center mb-3"
      style={{ minWidth: cardWidth }}
    >
      <Card
        className="shadow-sm member-card"
        style={{
          width: cardWidth,
          backgroundColor: colors.bgSecondary,
          color: colors.textMain,
          borderRadius: "1rem",
          border: `1px solid ${colors.bgSoft}`,
          transition: "all 0.3s ease",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Card.Img
          variant="top"
          src={img}
          alt={name}
          style={{
            height: imgHeight,
            width: "100%",
            objectFit: "cover",
            borderTopLeftRadius: "1rem",
            borderTopRightRadius: "1rem",
          }}
        />

        <Card.Body style={{ padding: "0.8rem", textAlign: "center" }}>
          <Card.Title style={{ fontSize: "1rem" }} className="fw-bold">
            {name}
          </Card.Title>

          <Card.Text style={{ opacity: 0.9, marginTop: "0.3rem" }}>
            {text}
          </Card.Text>

          {extra && (
            <Card.Text style={{ fontStyle: "italic", opacity: 0.8 }}>
              {extra}
            </Card.Text>
          )}
        </Card.Body>
      </Card>
      {github && (
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="social-expand-btn"
          style={{ marginTop: "0.8rem" }}
        >
          <span className="icon">
            <FaGithub size={22} />
          </span>
          <span className="text">GitHub</span>
        </a>
      )}
    </Col>
  );
};

export default TeamMember;
