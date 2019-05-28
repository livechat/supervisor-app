import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";
import { Toast } from "@livechat/design-system";
import "styled-components/macro";
import Spinner from "../Spinner";

export default ({ data, time }) => {
  if (data && data.status === 403) {
    return (
      <div
        css={`
          display: grid;
          padding: 30px;
          grid-gap: 20px;
          justify-items: center;
        `}
      >
        <span>Chatting Time</span>
        <Toast
          variant="info"
          css={`
            width: 100%;
          `}
        >
          Only for enterprise customers.
        </Toast>
      </div>
    );
  }

  if (!data) {
    return <Spinner marginTop="200px" />;
  }

  const chartData =
    time === "day"
      ? Object.keys(data).map(e => ({
          name: e,
          minutes: data[e].minutes
        }))
      : Object.keys(data).map(e => ({
          name: e.substr(5),
          hours: data[e].hours
        }));

  return (
    <div
      css={`
        display: grid;
        padding: 30px;
        grid-gap: 20px;
        justify-items: center;
        border-top: solid 1px hsl(0, 0%, 90%);
      `}
    >
      <span>Chatting Time</span>
      <AreaChart
        width={350}
        height={250}
        data={chartData}
        margin={{
          top: 10,
          right: 40,
          left: 0,
          bottom: 0
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey={time === "day" ? "minutes" : "hours"}
          stroke="rgb(67, 132, 245)"
          fill="#dbe5ff"
        />
      </AreaChart>
    </div>
  );
};
