import React from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import logo from "../assets/Logo.png";
import {
  HiLink,
  HiOutlineCog,
  HiOutlineInformationCircle,
  HiBriefcase,
} from "react-icons/hi";

function NavBar() {
  const navigate = useNavigate();

  const NavBar = styled.div`
    display: grid;
    align-content: space-between;
    border: solid;
    background-color: #101010;
    font-size: 14px;
    text-align: center;
    width: 90px;
  `;

  const Logo = styled.img`
    width: 100%;
    height: 100;
  `;

  const Tab = styled.div`
    padding: 8px;
    color: #818181;
    cursor: pointer;
    border-radius: 10px;
    border: solid #101010;
    &:hover {
      background-color: rgba(225, 225, 225, 0.1);
    }
    p {
      margin: 0px;
    }
  `;

  return (
    <NavBar>
      <div>
        <Logo src={logo} />
        <Tab onClick={() => navigate("/")}>
          <HiLink size={28} />
          <p> add </p>
        </Tab>
        <Tab onClick={() => navigate("/jobs")}>
          <HiBriefcase size={28} />
          <p> jobs </p>
        </Tab>
      </div>
      <div>
        <Tab onClick={() => navigate("/settings")}>
          <HiOutlineCog size={28} />
          <p> settings </p>
        </Tab>
        <Tab onClick={() => navigate("/about")}>
          <HiOutlineInformationCircle size={28} />
          <p> about </p>
        </Tab>
      </div>
    </NavBar>
  );
}

export default NavBar;
