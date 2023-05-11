import React, { useState, useEffect } from "react";
import { Button, ModalBase } from "@livechat/design-system";
import MaterialIcon from "material-icons-react";
import RatioModal from "./RatioModal";
import ChatingModal from "./ChatingModal";
import WorkingModal from "./WorkingModal";
import api from "../../utils/api";
import "styled-components/macro";

const containerStyle = `
  width: calc(100% - 22px);
  height: auto;
  background-color: white;
  display: grid;
  grid-template: "login login login " 30px
                 "perm perm perm" 30px 
                 "status status status" 30px 
                 "line line line" 1px 
                 "space space space" 45px 
                 "btn btn btn" 35px;
  grid-gap: 5px;
  padding: 20px 10px;
  color: hsl(0, 0%, 45%);
  border: 1px solid #E4E8EC;
  border-radius: 4px;
`;

const rowStyle = (area) => `
  grid-area: ${area};
  display: flex;
  align-items: center;
  padding-left: 5px;

  > span {
    margin-left: 10px;
    font-size: 14px;
  }
`;

const buttonStyle = (area) => `
  grid-area: ${area};
  height: 30px;
  width: 80px;
`;

const lineStyle = (area) => `
  grid-area: ${area}; 
  height: 1px;
  width: 100%;
  background-color: hsl(0, 0%, 90%);
  margin-top: 12px;
`;

const spaceStyle = (area) => `
  grid-area: ${area};
  font-size: 12px;
  line-height: 16px;
  color: #677179;
  padding-top: 25px;
`;

export default ({ login, permission, status, name, accessToken }) => {
  const [modals, setModals] = useState([false, false, false]);
  const [agentRatings, setAgentRatings] = useState({});
  const [agentAvailability, setAgentAvailability] = useState({});
  const [agentChattingTime, setAgentChattingTime] = useState({});

  const fetchAgentRatings = () =>
    api
      .fetchAgentRatings(login, accessToken)
      .then((response) => setAgentRatings(response.data))
      .catch((error) => console.log(error));

  const fetchAgentAvailability = () =>
    api
      .fetchAgentAvailability(login, accessToken)
      .then((response) => setAgentAvailability(response.data))
      .catch((error) => console.log(error));

  const fetchChattingTime = () =>
    api
      .fetchChattingTime(login, accessToken)
      .then((response) => setAgentChattingTime(response.data))
      .catch((error) => console.log(error));

  useEffect(() => {
    fetchAgentRatings();
    fetchAgentAvailability();
    fetchChattingTime();
  }, []);

  const handleModal = (i) => {
    const newModals = [...modals];
    newModals[i] = !modals[i];
    setModals(newModals);
  };

  const renderChart = (type) => {
    switch (type) {
      case "Working":
        return <WorkingModal data={agentAvailability} />;
      case "Chating":
        return <ChatingModal data={agentChattingTime} />;
      case "Ratio":
        return <RatioModal data={agentRatings} />;
      default:
        console.error(`Unexpected type: ${type}`);
    }
  };

  return (
    <div css={containerStyle}>
      <span css={rowStyle("login")}>
        <MaterialIcon icon="account_circle" />
        <span>{login}</span>
      </span>
      <span css={rowStyle("perm")}>
        <MaterialIcon icon="vpn_key" />
        <span>{permission}</span>
      </span>
      <span css={rowStyle("status")}>
        {status === "accepting chats" ? (
          <MaterialIcon icon="fiber_manual_record" color="#4bb678" />
        ) : (
          <MaterialIcon
            icon="fiber_manual_record"
            color="rgba(0, 0, 0, 0.54)"
          />
        )}
        <span>{status}</span>
      </span>
      <div css={lineStyle("line")} />
      <div css={spaceStyle("space")}>Available charts:</div>
      {["Working", "Chating", "Ratio"].map((e, i) => {
        return (
          <div
            key={i}
            css={`
              display: flex;
            `}
          >
            <Button css={buttonStyle("btn")} onClick={() => handleModal(i)}>
              {e}
            </Button>
            {modals[i] && (
              <ModalBase
                onClose={() => handleModal(i)}
                style={{ width: "600px", height: "450px" }}
              >
                <div style={{ margin: "auto" }}>{renderChart(e, name)}</div>
              </ModalBase>
            )}
          </div>
        );
      })}
    </div>
  );
};
