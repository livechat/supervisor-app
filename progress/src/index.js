import React, { useState, useEffect, Fragment } from "react";
import ReactDOM from "react-dom";
import { createGlobalStyle } from "styled-components";
import AccountsSDK from "@livechat/accounts-sdk";
import "@livechat/design-system/dist/design-system.css";

import config from "./utils/config";
import App from "./components";
import Spinner from "./components/Spinner";

const GlobalStyle = createGlobalStyle`
  ::-webkit-scrollbar {
      display: none;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: Arial, Helvetica, sans-serif;
    overflow-x: hidden;
  }
`;

const useLiveChat = ({ client_id, account_url }) => {
  const [accessToken, setAccessToken] = useState(null);

  const accountsSDK = new AccountsSDK({
    client_id: client_id,
    server_url: account_url
  });

  useEffect(() => {
    const authorize = async () => {
      try {
        const authorizeData = await accountsSDK.redirect().authorizeData();

        accountsSDK.verify(authorizeData);
        const { access_token } = authorizeData;
        setAccessToken(access_token);
      } catch (error) {
        await accountsSDK.redirect().authorize();
      }
    };
    authorize();
  }, []);

  return [accessToken];
};

const AppWithAuth = () => {
  const [accessToken] = useLiveChat(config);

  if (!accessToken) {
    return <Spinner marginTop="calc(100% - 50px)" />;
  }

  return (
    <Fragment>
      <GlobalStyle />
      <App accessToken={accessToken} />
    </Fragment>
  );
};

ReactDOM.render(<AppWithAuth />, document.getElementById("root"));
