import React, { useState, useEffect } from "react";
import { TabsWrapper, TabsList, Tab } from "@livechat/design-system";
import "styled-components/macro";

import Ratings from "./Ratings";
import Times from "./Times";

import api from "../utils/api";

const mainConatinerStyle = `
  margin-left: auto;
  margin-right: auto;
  height: 100%;
  display: grid;
  grid-gap: 10px;
  padding: 5px;
  border-radius: 8px;
  max-width: 500px;
`;

const tabStyle = `
  background-color: white;
  border: solid 1px hsl(0, 0%, 90%);
`;

const App = ({ accessToken }) => {
  const [dayRating, setDayRating] = useState(null);
  const [weekRating, setWeekRating] = useState(null);
  const [monthRating, setMonthRating] = useState(null);
  const [yearRating, setYearRating] = useState(null);

  const [dayResponse, setDayResponse] = useState(null);
  const [weekResponse, setWeekResponse] = useState(null);
  const [monthResponse, setMonthResponse] = useState(null);

  const [dayChatting, setDayChatting] = useState(null);
  const [weekChatting, setWeekChatting] = useState(null);
  const [monthChatting, setMonthChatting] = useState(null);

  const [responseInterval, setResponseInterval] = useState("day");
  const [timeInterval, setTimeInterval] = useState("day");
  const [tabId, setTabId] = useState("ratings");

  const [error, setError] = useState(null);

  const fetchDayRating = () =>
    api
      .fetchRatings("day", accessToken)
      .then(response => setDayRating(response.data));

  const fetchWeekRating = () =>
    api
      .fetchRatings("week", accessToken)
      .then(response => setWeekRating(response.data));

  const fetchMonthRating = () =>
    api
      .fetchRatings("month", accessToken)
      .then(response => setMonthRating(response.data));

  const fetchYearRating = () =>
    api
      .fetchRatings("year", accessToken)
      .then(response => setYearRating(response.data));

  const fetchDayResponse = () =>
    api
      .fetchResponseTimes(0, accessToken)
      .then(response => setDayResponse(response.data));

  const fetchWeekResponse = () =>
    api
      .fetchResponseTimes(1, accessToken)
      .then(response => setWeekResponse(response.data));

  const fetchMonthResponse = () =>
    api
      .fetchResponseTimes(2, accessToken)
      .then(response => setMonthResponse(response.data));

  const fetchDayChatting = () =>
    api
      .fetchChattingTimes(0, accessToken)
      .then(response => setDayChatting(response.data));

  const fetchWeekChatting = () =>
    api
      .fetchChattingTimes(1, accessToken)
      .then(response => setWeekChatting(response.data));

  const fetchMonthChatting = () =>
    api
      .fetchChattingTimes(2, accessToken)
      .then(response => setMonthChatting(response.data));

  useEffect(() => {
    fetchDayRating();
    fetchWeekRating();
    fetchMonthRating();
    fetchYearRating();
    fetchDayResponse();
    fetchWeekResponse();
    fetchMonthResponse();
    fetchDayChatting();
    fetchWeekChatting();
    fetchMonthChatting();
  }, []);

  return (
    <div css={mainConatinerStyle}>
      <div css={tabStyle}>
        <TabsWrapper>
          <TabsList>
            <Tab
              onSelect={() => setTabId("ratings")}
              key={"ratings"}
              isSelected={"ratings" === tabId}
            >
              Ratings
            </Tab>
            <Tab
              onSelect={() => setTabId("times")}
              key={"times"}
              isSelected={"times" === tabId}
            >
              Times
            </Tab>
          </TabsList>
        </TabsWrapper>
      </div>
      {tabId === "ratings" && (
        <Ratings
          allRatings={{
            day: dayRating,
            week: weekRating,
            month: monthRating,
            year: yearRating
          }}
          time={responseInterval}
          setTime={setResponseInterval}
        />
      )}
      {tabId === "times" && (
        <Times
          allResponse={{
            day: dayResponse,
            week: weekResponse,
            month: monthResponse
          }}
          allChatting={{
            day: dayChatting,
            week: weekChatting,
            month: monthChatting
          }}
          time={timeInterval}
          setTime={setTimeInterval}
          error={error}
        />
      )}
    </div>
  );
};

export default App;
