import React from "react";
import { Col, Card } from "react-bootstrap";

const TeamMember = ({ name, img, text, extra, colors, compact }) => {
  const cardWidth = compact ? "180px" : "250px";
  const imgHeight = compact ? "140px" : "220px";

  return (
    <Col
      className="d-flex justify-content-center mb-3"
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
            objectFit: "cover",
            borderTopLeftRadius: "1rem",
            borderTopRightRadius: "1rem",
            width: "100%",
          }}
        />

        <Card.Body style={{ padding: "0.8rem", textAlign: "center" }}>
          <Card.Title style={{ fontSize: "1rem" }} className="fw-bold">
            {name}
          </Card.Title>

          {!compact && (
            <>
              <Card.Text style={{ opacity: 0.9, marginTop: "0.3rem" }}>
                {text}
              </Card.Text>
              <Card.Text style={{ fontStyle: "italic", opacity: 0.8 }}>
                {extra}
              </Card.Text>
            </>
          )}
        </Card.Body>
      </Card>

      <style>{`
        .member-card:hover {
          background-color: ${colors.bgHover};
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 8px 20px rgba(0,0,0,0.4);
        }
      `}</style>
    </Col>
  );
};

export default TeamMember;
