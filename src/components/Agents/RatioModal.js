import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

import Spinner from "../Spinner";
import "styled-components/macro";

const conatinerStyle = `
  display: grid;
  grid-gap: 20px;
  justify-items: center;
`;

export default ({ data }) => {
  if (!data || Object.keys(data).length === 0) {
    return <Spinner marginTop="calc(100% - 120px)" />;
  }
  const newData = Object.keys(data).map((e) => ({
    day: e,
    good: data[e].good,
    bad: data[e].bad,
    chats: data[e].chats,
  }));

  const sum = (key) => newData.reduce((a, b) => a + (b[key] || 0), 0);

  const allGood = sum("good");
  const allBad = sum("bad");
  const allChats = sum("chats");

  return (
    <div css={conatinerStyle}>
      <span>Agent Ratings</span>
      <BarChart
        width={350}
        height={250}
        data={[
          { name: "Good", number: allGood },
          { name: "Bad", number: allBad },
          { name: "Chats", number: allChats },
        ]}
        margin={{ right: 30 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="number" fill="#4384f5" />
      </BarChart>
    </div>
  );
};
