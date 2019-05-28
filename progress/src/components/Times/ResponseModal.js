import React from "react";
import { Toast } from "@livechat/design-system";
import { XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from "recharts";

import "styled-components/macro";
import Spinner from "../Spinner";

export default ({ data }) => {
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
        <span>Response Time</span>
        <Toast
          variant="info"
          css={`
            width: 100%;
          `}
        >
          Only for enterprise customers.
        </Toast>
        {/* <a
          href="https://www.livechatinc.com/kb/managing-the-subscription/"
          target="_blank"
        >
          check our offer
        </a> */}
      </div>
    );
  }

  if (!data || Object.keys(data) <= 0) {
    return <Spinner marginTop="200px" />;
  }

  const chartData = Object.keys(data).map(e => ({
    name: e.length > 6 ? e.substr(5) : e,
    seconds: data[e].first_response_time.seconds
      ? data[e].first_response_time.seconds
      : 0
  }));

  return (
    <div
      css={`
        display: grid;
        padding: 30px;
        grid-gap: 20px;
        justify-items: center;
      `}
    >
      <span>Response Time</span>
      <BarChart
        width={350}
        height={250}
        data={chartData}
        margin={{ right: 40 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="seconds" fill="#4384f5" />
      </BarChart>
    </div>
  );
};
