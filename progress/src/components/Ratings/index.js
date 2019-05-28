import React, { useState } from "react";
import {
  BarChart,
  Bar,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie
} from "recharts";

import { renderCustomizedLabel } from "../../utils/charts";
import { TabsWrapper, TabsList, Tab, Toast } from "@livechat/design-system";

import Spinner from "../Spinner";
import "styled-components/macro";

const timeInterval = ["day", "week", "month", "year"];
const COLORS = ["#d64646", "#4bb678"];

const containerStyle = allChats => `
  background-color: white;
  border: solid 1px hsl(0, 0%, 90%);
  ${allChats > 0 && "padding-bottom: 40px;"}
`;

const tabStyle = `
  color: 10px;
`;

const pieChartStyle = `
  display: grid;
  grid-template: "a b" 220px / 2fr 1fr;
  align-items: center;
  justify-items: center;
  border-top: solid 1px hsl(0, 0%, 90%);
`;

const lenendStyle = `
  justify-self: start;
  > div {
    width: 15px;
    height: 15px;
    border-radius: 10px;
    margin: 7px;
  }
  > span {
    font-size: 13px;
  }
`;

const goodStyle = `
  background-color: #4bb678;
`;

const badStyle = `
  background-color: #d64646;
`;

const barChartStyle = `
  width: 100%;
  height: 300px;
  margin-bottom: 40px;
  .recharts-rectangle:first {
    fill: red;
  }
`;

const lineChartStyle = ` 
  width: 100%; 
  height: 300px; 
  marginTop: 50px 
`;

export default ({ allRatings, time, setTime }) => {
  const [tabId, setTabId] = useState(time);
  const ratings = allRatings[time];

  if (!ratings) {
    return <Spinner marginTop="calc(100% - 50px)" />;
  }

  const hours = Object.keys(ratings);
  const ratingsTab = Object.values(ratings);
  const data = ratingsTab.map((rating, index) => {
    const { good, bad, chats } = rating;
    return {
      name: time === "day" ? hours[index] : hours[index].substr(5),
      good,
      bad,
      chats
    };
  });
  const allBad = data.reduce((a, b) => a + (b["bad"] || 0), 0);
  const allGood = data.reduce((a, b) => a + (b["good"] || 0), 0);
  const allChats = data.reduce((a, b) => a + (b["chats"] || 0), 0);

  return (
    <>
      <div css={containerStyle(allChats)}>
        <TabsWrapper
          css={`
            overflow-y: scroll;
          `}
        >
          <TabsList>
            {timeInterval.map((e, i) => {
              return (
                <Tab
                  key={i}
                  css={tabStyle}
                  onSelect={() => {
                    setTabId(e);
                    setTime(e);
                  }}
                  key={e}
                  isSelected={e === tabId}
                >
                  {e}
                </Tab>
              );
            })}
          </TabsList>
        </TabsWrapper>
        {allChats > 0 && (
          <div>
            <div>
              <div
                style={{
                  width: "100%",
                  height: 220
                }}
              >
                {allBad + allGood > 0 ? (
                  <div>
                    <div css={pieChartStyle}>
                      <ResponsiveContainer>
                        <PieChart width={50} height={50}>
                          <Pie
                            data={[
                              { name: "Bad", value: allBad },
                              { name: "Good", value: allGood }
                            ]}
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={70}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {data.map((entry, index) => {
                              return (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={COLORS[index % COLORS.length]}
                                />
                              );
                            })}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                      <div css={lenendStyle}>
                        <div css={goodStyle} />
                        <span>good</span>
                        <div css={badStyle} />
                        <span>bad</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>No rating</div>
                )}
              </div>
            </div>
            <div css={barChartStyle}>
              <ResponsiveContainer>
                <BarChart
                  data={[
                    { name: "Good", value: allGood },
                    { name: "Bad", value: allBad },
                    { name: "Chats", value: allChats }
                  ]}
                  margin={{ right: 40 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#4384f5" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div css={lineChartStyle}>
              <ResponsiveContainer>
                <BarChart
                  width={500}
                  height={300}
                  data={data}
                  margin={{ right: 40 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="good" fill="#4bb678" />
                  <Bar dataKey="bad" fill="#d64646" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
      {allChats <= 0 && (
        <Toast
          variant="info"
          css={`
            width: 100%;
          `}
        >
          No chats this {time}.
        </Toast>
      )}
    </>
  );
};
