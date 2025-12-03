import React from "react";
import { Container, Row } from "react-bootstrap";
import TeamMember from "./TeamMember";

import logo from "../../assets/images/logo1.png";
import RominaImg from "../../assets/images/romina.jpg";
import AlvaroImg from "../../assets/images/alvaro.jpg";
import JuanImg from "../../assets/images/juan.jpg";
import PabloImg from "../../assets/images/pablo.jpeg";
import PatricioImg from "../../assets/images/patricio.jpg";

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
        paddingTop: "2rem",
        overflow: "hidden",
      }}
    >
      <Container className="text-center mb-3">
        <img src={logo} alt="logo" width="110" className="mb-2" />
        <h2 style={{ color: colors.textMain }}>
          Wavv Music - Somos lo que te conecta
        </h2>
        <h6 style={{ color: colors.accent, opacity: 0.9 }}>Nuestro Equipo</h6>
      </Container>

      <Container>
        <Row
          className="justify-content-start"
          style={{
            display: "flex",
            gap: "2rem",
            flexWrap: "nowrap",
            overflowX: "auto",
            paddingBottom: "1rem",
            paddingLeft: "1rem",
          }}
        >
          <TeamMember
            name="Pablo"
            img={PabloImg}
            text="Organizado, responsable y siempre dispuesto a dar una mano al equipo."
            colors={colors}
          />

          <TeamMember
            name="Alvaro"
            img={AlvaroImg}
            text="Proactivo, resolutivo y con una visión clara para mejorar cada proyecto."
            colors={colors}
          />

          <TeamMember
            name="Romina"
            img={RominaImg}
            text="Enfocada, detallista y con una energía que contagia al equipo."
            colors={colors}
          />

          <TeamMember
            name="Juan"
            img={JuanImg}
            text="Creativo, curioso y con una energía que impulsa al grupo."
            colors={colors}
          />

          <TeamMember
            name="Patricio"
            img={PatricioImg}
            text="Analítico, tranquilo y enfocado en encontrar soluciones eficientes."
            colors={colors}
          />
        </Row>
      </Container>
    </div>
  );
};

export default AboutUs;
