import React, { useState } from "react";
import { TabsWrapper, TabsList, Tab, Toast } from "@livechat/design-system";
import ChattingModal from "./ChatingModal";
import ResponseModal from "./ResponseModal";

import Spinner from "../Spinner";
import "styled-components/macro";

const tabWithTimeInterval = ["day", "week", "month"];

export default ({ allResponse, allChatting, setTime, time, error }) => {
  const [tabId, setTabId] = useState(time);

  if (error) {
    return <Toast variant="error">Section only for enterprise clients.</Toast>;
  }

  if (!allResponse || !allChatting) {
    return <Spinner marginTop="calc(100% - 50px)" />;
  }

  const response = allResponse[time];
  const chatting = allChatting[time];

  return (
    <>
      <div
        css={`
          background-color: white;
          border: solid 1px hsl(0, 0%, 90%);
          margin-bottom: 20px;
        `}
      >
        <TabsWrapper>
          <TabsList>
            {tabWithTimeInterval.map((e, i) => {
              return (
                <Tab
                  key={i}
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
        <ChattingModal data={chatting} time={time} />
        <ResponseModal data={response} />
      </div>
    </>
  );
};
