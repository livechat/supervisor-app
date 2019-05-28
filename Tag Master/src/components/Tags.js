import React, { useState, Fragment } from "react";
import {
  Button,
  Toast,
  ModalBase,
  Form,
  FieldGroup,
  InputField,
  ActionModal
} from "@livechat/design-system";
import MaterialIcon from "material-icons-react";
import Spinner from "./Spinner";

import "styled-components/macro";
import api from "../utils/api";

const containerStyle = `
  display: grid;
  grid-gap: 10px;
`;

const labelStyle = `
  margin-right: 10px;
`;

const tagContainerStyle = `
  display: grid;
  grid-gap: 10px;
  overflow: hidden;
  overflow-y: scroll;
`;

const helpStyle = `
  width: 100%;
  margin: 10px 0;
  font-size: 15px;
  text-align: center;
  font-family: "Lucida Sans", sans-serif;
`;

const linkStyle = `
  text-decoration: none;
  color: #4384f5;
`;

const contentStyle = `
  margin: 15px auto;
`;

const toastStyle = `
  border: solid 1px hsl(0, 0%, 90%);
  box-shadow: none;
`;

const formStyle = `
  display: grid;
  justify-items: center;
`;

const buttonStyle = `
  margin-right: 10px 
`;

export default ({ tags, update, accessToken }) => {
  const [remove, setRemove] = useState([]);
  const [open, setOpen] = useState(false);
  const [tagToRemove, setTagToRemove] = useState(null);
  const [loading, setLoading] = useState(false);

  const [tag, setTag] = useState("");

  const onSubmit = e => {
    e.preventDefault();
    setLoading(true);
    api
      .createTag(tag, accessToken)
      .then(update)
      .then(() => {
        setOpen(false);
        setLoading(false);
        setTag("");
      });
  };

  return (
    <div css={containerStyle}>
      <Button primary onClick={() => setOpen(true)}>
        <span css={labelStyle}>
          <div
            css={`
              display: flex;
              align-items: center;
            `}
          >
            <span>Add new</span>
            <MaterialIcon icon={"add"} color="white" />
          </div>
        </span>
      </Button>
      {open && (
        <ModalBase onClose={() => setOpen(false)}>
          <div css={contentStyle}>
            <Form
              css={formStyle}
              onSubmit={onSubmit}
              labelText="Create tag"
              helperText={"Fill fields with tag name"}
              formFooter={
                <Button primary submit loading={loading}>
                  Add tag
                </Button>
              }
            >
              <FieldGroup>
                <InputField
                  id={"name"}
                  value={tag}
                  onChange={e => setTag(e.target.value)}
                  placeholder="Tag name.."
                  required
                />
              </FieldGroup>
            </Form>
          </div>
        </ModalBase>
      )}
      {tagToRemove && (
        <ActionModal
          id={"actionModal"}
          onClose={() => setTagToRemove(null)}
          heading="Danger!"
          actions={
            <Fragment>
              <Button onClick={() => setTagToRemove(null)} css={buttonStyle}>
                Wait, go back
              </Button>
              <Button
                onClick={() => {
                  setRemove([...remove, tagToRemove]);
                  setLoading(true);
                  api
                    .removeTag(tagToRemove, accessToken)
                    .then(() => update())
                    .then(() => {
                      setTagToRemove(null);
                      setLoading(false);
                    });
                }}
                destructive
                loading={loading}
              >
                Yes, delete this tag
              </Button>
            </Fragment>
          }
        >
          <div>
            You’re about to do something that cannot be undone. Are you sure you
            want to continue?
          </div>
        </ActionModal>
      )}
      <div css={tagContainerStyle}>
        {tags ? (
          tags.map((tag, i) => {
            const { name } = tag;
            return (
              <Toast
                css={toastStyle}
                key={i}
                removable
                onClose={() => {
                  setTagToRemove(name);
                }}
              >
                #{name}
              </Toast>
            );
          })
        ) : (
          <Spinner marginTop="100px" />
        )}
      </div>
      <span css={helpStyle}>
        <a
          href="https://www.livechatinc.com/kb/tagging-chats-and-tickets/"
          target="_blank"
          rel="noopener noreferrer"
          css={linkStyle}
        >
          How to use tags?
        </a>
      </span>
    </div>
  );
};
