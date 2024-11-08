import React, { useEffect, useState } from "react";
import styled from "styled-components";



const ChatSection = () => {

  const [messages, setMessages] = useState([]);
  const [messageBody, setMessageBody] = useState("");
  
  
  return (
    <ChatContainer>
  
    <div className="main-content">
      {messages.map((message) => {
        return (
          <div
            className={`message ${message.sent ? "sent" : "received"}`}
            key={message.$id}
          >
            <span>{new Date(message.$createdAt).toLocaleString()}</span>
            <p>{message.body}</p>
  
            <button className="btn" onClick={() => deleteMessage(message.$id)}>
              Delete
            </button>
          </div>
        );
      })}
    </div>
    <form id="message--form" onSubmit={() => console.log("submit")}>
      <div className="message-input">
        <input
          className="input"
          type="text"
          placeholder="Type a message..."
          required
          maxLength={1000}
          onChange={(e) => setMessageBody(e.target.value)}
          value={messageBody}
        />
        <input value="Send" type="submit" className="send-button" />
      </div>
    </form>
  </ChatContainer>
  );
};

export default ChatSection;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  margin: auto;
  border: none;
  border-radius: 10px;
  overflow: hidden;
  background: #f9f9f9;

  .main-content {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    background: #f0f0f0;
    display: flex;
    flex-direction: column;
    gap: 10px;
    border-bottom: 2px solid #ddd;

    .message {
      padding: 14px 20px;
      border-radius: 12px;
      max-width: 90%;
      font-size: 16px;
      color: #333;
      display: inline-block;
      word-wrap: break-word;
      line-height: 1.6;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      transition: background-color 0.3s;

      &.received {
        background: #ffffff;
        text-align: left;
        border: 1px solid #ddd;
      }

      &.sent {
        background: #d1e7dd;
        text-align: right;
        margin-left: auto;
        border: 1px solid #badbcc;
      }

      p {
        margin: 0;
      }

      span {
        font-size: 12px;
        color: #999;
        display: block;
        margin-bottom: 5px;
      }

      button.btn {
        margin-top: 10px;
        font-size: 12px;
        color: #007bff;
        background: transparent;
        border: none;
        cursor: pointer;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  .message-input {
    display: flex;
    width: 100%;
    padding: 15px;
    background: #ffffff;
    border-top: 2px solid #ddd;

    .input {
      flex: 1;
      padding: 14px;
      border: 2px solid #ddd;
      border-radius: 30px;
      font-size: 16px;
      outline: none;
      box-shadow: none;
      transition: border-color 0.3s ease-in-out;

      &:focus {
        border-color: #007bff;
      }
    }

    .send-button {
      padding: 14px 20px;
      margin-left: 10px;
      border: none;
      background: #007bff;
      color: #fff;
      border-radius: 30px;
      cursor: pointer;
      font-size: 16px;
      transition: background-color 0.3s ease;

      &:hover {
        background: #0056b3;
      }
    }
  }
`;
