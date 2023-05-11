import React from "react";
import Agent from "./Agent";
import Spinner from "../Spinner";
import "styled-components/macro";

const noResultsStyle = `
  margin: auto;
`;

const AgentList = ({ agents = [], loading, accessToken }) => {
  if (loading) {
    return <Spinner marginTop="calc(100% - 120px)" />;
  }

  if (agents.length <= 0) {
    return <div css={noResultsStyle}>No results</div>;
  }

  return agents.map((agent, i) => (
    <Agent key={i} agentData={agent} accessToken={accessToken} />
  ));
};

export default AgentList;
