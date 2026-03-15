import React from "react";
import { Container, Row } from "react-bootstrap";
import "../aboutUs/AboutUs.css";
import TeamMember from "./TeamMember";

import logo from "../../assets/images/logo2.svg";
import TomiImg from "../../assets/images/tomi.png";
import LuhanaImg from "../../assets/images/luhana.png";
import JuanImg from "../../assets/images/juan.jpg";
import PabloImg from "../../assets/images/pablo.jpeg";

const colors = {
  bgPrimary: "var(--bg-primary, #000000)",
  bgSecondary: "var(--bg-secondary, #1a1a1a)",
  bgSoft: "var(--bg-card, #202026)",
  bgHover: "rgba(255,255,255,0.1)",
  textMain: "var(--text-main, #f5f5f5)",
  accent: "var(--accent-red, #ff2e2e)",
};

const TEAM_MEMBERS = [
  {
    name: "Pablo",
    img: PabloImg,
    text: "Organizado, responsable y siempre dispuesto a dar una mano al equipo.",
    github: "https://github.com/Pablobasso25",
  },
  {
    name: "Tomas",
    img: TomiImg,
    text: "Proactivo, resolutivo y con una visión clara para mejorar cada proyecto.",
    github: "https://github.com/tomasgomez18",
  },
  {
    name: "Luhana",
    img: LuhanaImg,
    text: "Enfocada, detallista, atenta y con una energía que contagia al equipo.",
    github: "https://github.com/JLuhanaJakubowicz",
  },
  {
    name: "Juan",
    img: JuanImg,
    text: "Creativo, curioso, persistente y con una energía que impulsa al grupo.",
    github: "https://github.com/JuanFerreyra18",
  },
];

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
          {TEAM_MEMBERS.map((member, index) => (
            <TeamMember
              key={index}
              name={member.name}
              img={member.img}
              text={member.text}
              github={member.github}
              colors={colors}
            />
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default AboutUs;
