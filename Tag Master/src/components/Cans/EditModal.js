import React, { useState } from "react";
import {
  Button,
  ModalBase,
  Form,
  FieldGroup,
  InputField
} from "@livechat/design-system";
import MaterialIcon from "material-icons-react";

import "styled-components/macro";
import api from "../../utils/api";

const contentStyle = `
  margin: 15px auto;
`;

const formStyle = `
  display: grid;
  grid-template-rows: 70px auto 38px; 
  grid-gap: 15px;
  justify-items: center;
`;

const formContainer = `
  width: 189px;
  display: grid;
  grid-gap: 5px;
  grid-template:
    "content content" 38px
    "input btn" 38px
    "tags tags" auto
    / 100px 80px;
`;

const contentInputStyle = `
  margin: 0;
  grid-area: content;
`;

const tagInputStyle = `
  grid-area: input;
  > div > input {
    width: 100px !important;
  }
`;

const tagButtonStyle = `
  grid-area: btn;
  height: 36px;
  width: 50px !important;
`;

const tagsContainerStyle = `
  grid-area: tags;
  font-size: 15px;
  display: flex;
  flex-wrap: wrap;

  > span {
  margin: 5px;
  }
`;

const tagElementStyle = `
  display: flex;
  align-items: center;
`;

const deleteIconStyle = `
  cursor: pointer;
  :hover > i {
    color: #d64546;
  }
`;

export default ({
  can = { tags: [], text: "" },
  setOpen,
  update,
  setCan,
  accessToken
}) => {
  const [tags, setTags] = useState([...can.tags]);
  const [content, setContent] = useState(can.text);
  const [currentTag, setCurrentTag] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = e => {
    e.preventDefault();
    setLoading(true);
    const apiRequest = can.id
      ? api.updateCan(can.id, content, tags, accessToken)
      : api.createCan(content, tags, accessToken);
    apiRequest.then(update).then(() => {
      resetState();
      setOpen(false);
    });
  };

  const resetState = () => {
    setTags([]);
    setContent("");
    setCurrentTag("");
    setCan(undefined);
  };

  return (
    <ModalBase
      onClose={() => {
        setOpen(false);
        resetState();
      }}
    >
      <div css={contentStyle}>
        <Form
          css={formStyle}
          onSubmit={onSubmit}
          labelText={
            can.text ? "Update canned response" : "Create canned response"
          }
          helperText={"Fill fields with content and tags"}
          formFooter={
            <Button primary submit loading={loading}>
              {can.text ? "Update can" : "Add can"}
            </Button>
          }
        >
          <FieldGroup>
            <div css={formContainer}>
              <InputField
                id={"content"}
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="Content.."
                required
                css={contentInputStyle}
              />
              <InputField
                id={"tag"}
                onChange={e => setCurrentTag(e.target.value)}
                placeholder="Tag.."
                value={currentTag}
                css={tagInputStyle}
              />
              <Button
                primary
                onClick={() => {
                  if (currentTag) {
                    setTags([...tags, currentTag]);
                  }
                  setCurrentTag("");
                }}
                css={tagButtonStyle}
              >
                Add
              </Button>
              <div css={tagsContainerStyle}>
                {tags.map((tag, i) => {
                  return (
                    <span key={i} css={tagElementStyle}>
                      {tag.length >= 7 ? `${tag.substring(7)}..` : tag}
                      <span
                        css={deleteIconStyle}
                        onClick={() => {
                          setTags([...tags].filter(element => element !== tag));
                        }}
                      >
                        <MaterialIcon icon="delete_forever" />
                      </span>
                    </span>
                  );
                })}
              </div>
            </div>
          </FieldGroup>
        </Form>
      </div>
    </ModalBase>
  );
};
