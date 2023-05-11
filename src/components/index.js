import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  TabsWrapper,
  TabsList,
  Tab,
  InputField,
} from "@livechat/design-system";
import "styled-components/macro";
import MaterialIcon from "material-icons-react";
import api from "../utils/api";
import AgentList from "./Agents/AgentsList";

const mainConatinerStyle = `
  margin-left: auto;
  margin-right: auto;
  height: 100%;
  display: grid;
  grid-template-rows: 50px 40px auto;
  grid-gap: 10px;
  padding: 5px;
  border-radius: 8px;
  max-width: 500px;
`;

const tabsStyle = `
  background-color: white;
  border: solid 1px hsl(0, 0%, 90%);
`;

const tabStyle = `
  display: flex;
  align-items: center;
`;

const labelStyle = `
  margin-left: 7px;
`;

const tabs = [
  { title: "All", icon: "supervised_user_circle" },
  { title: "Online", icon: "fiber_manual_record" },
  { title: "Offline", icon: "not_interested" },
];

const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

const App = ({ accessToken }) => {
  const [tabId, setTabId] = useState("All");
  const [agents, setAgents] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchAgents = () => {
    setLoading(true);
    api
      .fetchAgents(accessToken)
      .then((response) => setAgents(response.data))
      .finally(() => setLoading(false));
  };

  useInterval(() => {
    fetchAgents();
  }, 60000);

  useEffect(() => {
    fetchAgents();
  }, []);

  const renderTabs = () =>
    tabs.map((tab) => {
      const { title, icon } = tab;
      return (
        <Tab
          key={title}
          onSelect={() => {
            setTabId(title);
            fetchAgents();
          }}
          isSelected={title === tabId}
        >
          <div css={tabStyle}>
            <MaterialIcon icon={icon} color={"#4384F5"} />
            <span css={labelStyle}>{title}</span>
          </div>
        </Tab>
      );
    });

  const memoizedTabs = useMemo(() => renderTabs(), [tabId]);

  let filteredAgents = [];

  switch (tabId) {
    case "All":
      filteredAgents = agents;
      break;
    case "Online":
      filteredAgents = agents.filter((e) => e.status === "accepting chats");
      break;
    case "Offline":
      filteredAgents = agents.filter((e) => e.status !== "accepting chats");
      break;
    default:
      console.error(`Unexpected tabId: ${tabId}`);
  }

  if (searchValue) {
    filteredAgents = filteredAgents.filter((e) =>
      e.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  }

  return (
    <div css={mainConatinerStyle}>
      <div css={tabsStyle}>
        <TabsWrapper>
          <TabsList>{memoizedTabs}</TabsList>
        </TabsWrapper>
      </div>
      <InputField
        id="search"
        value={searchValue}
        placeholder="Search.."
        type="text"
        onChange={(e) => setSearchValue(e.target.value)}
        style={{ width: "100%", borderColor: "hsl(0, 0%, 85%)" }}
      />
      <AgentList
        agents={filteredAgents}
        loading={loading}
        accessToken={accessToken}
      />
    </div>
  );
};

export default App;
