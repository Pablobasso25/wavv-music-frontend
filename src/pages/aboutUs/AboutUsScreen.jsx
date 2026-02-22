import React from "react";
import { Container, Row } from "react-bootstrap";
import "../aboutUs/AboutUs.css"
import TeamMember from "./TeamMember";

import logo from "../../assets/images/logo2.svg";
import TomiImg from "../../assets/images/tomi.png"
import LuhanaImg from "../../assets/images/luhana.png"
import JuanImg from "../../assets/images/juan.jpg";
import PabloImg from "../../assets/images/pablo.jpeg";

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
            github="https://github.com/Pablobasso25"
            colors={colors}
          />

          <TeamMember
            name="Tomas"
            img={TomiImg}
            text="Proactivo, resolutivo y con una visión clara para mejorar cada proyecto."
            github="https://github.com/tomasgomez18"
            colors={colors}
          />

          <TeamMember
            name="Luhana"
            img={LuhanaImg}
            text="Enfocada, detallista y con una energía que contagia al equipo."
            github="https://github.com/JLuhanaJakubowicz"
            colors={colors}
          />

          <TeamMember
            name="Juan"
            img={JuanImg}
            text="Creativo, curioso y con una energía que impulsa al grupo."
            github="https://github.com/JuanFerreyra18"
            colors={colors}
          />

        </Row>
      </Container>
    </div>
  );
};

export default AboutUs;
