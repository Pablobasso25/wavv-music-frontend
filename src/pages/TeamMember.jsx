import React from "react";
import { Container, Row } from "react-bootstrap";
import TeamMember from "./TeamMember";
import logo from "../logo.png";
import pabloImg from "../aboutUs/pablo.jpg";
import alvaroImg from "../aboutUs/alvaro.jpg";
import rominaImg from "../aboutUs/romina.jpg";
import juanImg from "../aboutUs/juan.png";
import patricioImg from "../aboutUs/patricio.png";

const colors = {
  bgPrimary: "#111111",
  bgSecondary: "#191B1B",
  bgSoft: "#35393B",
  bgHover: "#494D4E",
  textMain: "#F5F5F5",
  accent: "#FF2E2E",
};

const AboutUs = () => {
  return (
    <div
      style={{
        backgroundColor: colors.bgPrimary,
        minHeight: "100vh",
        maxHeight: "100vh",
        overflow: "hidden",
        paddingTop: "2rem",
      }}
    >
      {}
      <Container className="text-center mb-3">
        <img src={logo} alt="logo" width="110" className="mb-2" />

        <h2 style={{ color: colors.textMain, marginBottom: "0.5rem" }}>
          Nuestro Equipo
        </h2>

        <h6 style={{ color: colors.accent, opacity: 0.9 }}>
          Wavv Music – Somos lo que te mantiene conectado.
        </h6>
      </Container>

      {}
      <Container
        style={{
          height: "60vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Row
          className="g-3 justify-content-center"
          style={{
            width: "100%",
            padding: "0 2rem",
          }}
        >
          <TeamMember name="Pablo" img={pabloImg} text="..." extra="..." colors={colors} compact />
          <TeamMember name="Alvaro" img={alvaroImg} text="..." extra="..." colors={colors} compact />
          <TeamMember name="Romina" img={rominaImg} text="..." extra="..." colors={colors} compact />
          <TeamMember name="Juan" img={juanImg} text="..." extra="..." colors={colors} compact />
          <TeamMember name="Patricio" img={patricioImg} text="..." extra="..." colors={colors} compact />
        </Row>
      </Container>
    </div>
  );
};

export default AboutUs;
