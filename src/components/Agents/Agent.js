import React, { useState } from "react";
import { Toast } from "@livechat/design-system";
import MaterialIcon from "material-icons-react";
import AgentDetails from "./AgentDetails";
import "styled-components/macro";

const WrapperStyle = `
  .lc-toast {
    width: 100%;
    box-shadow: none;
    border: 1px solid #E4E8EC;
  }
`;

const ToastStyle = `
  cursor: pointer;
  .lc-toast__content {
    height: 100%;
    width: 100%;
    display: grid;
    grid-gap: 20px;
    grid-template: "avatar name info" / 25px auto 40px;
    align-items: center;
  }
  .lc-toast__icon {
    display: none;
  }

  :hover {
    background-color: hsl(0, 0%, 97%);
  }
`;

const AvaratStyle = (status) => `
  grid-area: avatar;
  width: 30px;
  border-radius: 20px;
  border: ${
    status === "accepting chats"
      ? "solid #4bb678 2px"
      : "solid hsl(0, 0%, 85%) 2px"
  };
`;

const NameStyle = `
  grid-area: name;
  font-size: 16px;
`;

const ArrowStyle = `
  grid-area: info;
  justify-self: end;
  width: 20px;
  margin-right: 10px;
`;

const Agent = ({ agentData = [], accessToken }) => {
  const [showDetails, setShowDetails] = useState(false);
  const { avatar, name, status, login, permission } = agentData;

  return (
    <div css={WrapperStyle}>
      <Toast
        css={ToastStyle}
        onClick={() => {
          setShowDetails(!showDetails);
        }}
      >
        <img
          src={avatar.includes("https") ? avatar : `https://${avatar}`}
          css={AvaratStyle(status)}
          alt="avatar"
        />
        <span css={NameStyle}>{name}</span>
        <span css={ArrowStyle}>
          {showDetails ? (
            <span>
              <MaterialIcon icon="expand_more" color="#424D57" />
            </span>
          ) : (
            <MaterialIcon icon="chevron_right" color="#424D57" />
          )}
        </span>
      </Toast>
      {showDetails && (
        <AgentDetails
          login={login}
          permission={permission}
          status={status}
          name={name}
          accessToken={accessToken}
        />
      )}
    </div>
  );
};

export default Agent;
