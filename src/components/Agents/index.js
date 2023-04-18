import React, { Fragment, useState, useEffect } from "react";
import { Toast } from "@livechat/design-system";
import MaterialIcon from "material-icons-react";
import "styled-components/macro";
import Spinner from "../Spinner";
import Agent from "./Agent";

const ToastStyle = `
  height: 60px;
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

const AvaratStyle = status => `
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

const InfoButtonStyle = `
  grid-area: info;
  justify-self: end;
  width: 20px;
`;

const noResultsStyle = `
  margin: auto;
`;

export default ({ agents = [], tabId, searching, accessToken }) => {
  if (agents.length <= 0 && !searching) {
    return <Spinner marginTop="calc(100% - 120px)" />;
  }

  if (agents.length <= 0 && searching) {
    return <div css={noResultsStyle}>No results</div>;
  }

  const [infoTabs, setInfoTabs] = useState(new Array(agents.length));

  useEffect(() => {
    setInfoTabs([...infoTabs].fill(false));
  }, [tabId]);

  return agents.map((agent, i) => {
    const { avatar, name, status, login, permission } = agent;
    return (
      <Fragment>
        <Toast
          key={i}
          css={ToastStyle}
          onClick={() => {
            const newInfoTabs = [...infoTabs];
            newInfoTabs[i] = !infoTabs[i];
            setInfoTabs(newInfoTabs);
          }}
        >
          <img
            src={avatar.includes("https") ? avatar : `https://${avatar}`}
            css={AvaratStyle(status)}
          />
          <span css={NameStyle}>{name}</span>
          <span css={InfoButtonStyle}>
            <MaterialIcon icon="information" color="#4384f5" />
          </span>
        </Toast>
        {infoTabs[i] && (
          <Agent
            login={login}
            permission={permission}
            status={status}
            name={name}
            accessToken={accessToken}
          />
        )}
      </Fragment>
    );
  });
};
