import React, { useEffect, useState } from "react";
import styled from "styled-components";
import client, {
  COLLECTION_ID_MESSAGES,
  DATABASE_ID,
  databases,
} from "../../appwriteConfig";
import { ID, Query } from "appwrite";
import { useSelector } from "react-redux";

const ChatSection = () => {
  const { user } = useSelector((store) => store.allData);

  const [messages, setMessages] = useState([]);
  const [messageBody, setMessageBody] = useState("");

  useEffect(() => {
    getMessages();

    const permission = client.subscribe(
      [
        `databases.${DATABASE_ID}.collections.${COLLECTION_ID_MESSAGES}.documents`,
        "files",
      ],
      (response) => {
        console.log("REAL_TIME", response);

        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.create"
          )
        ) {
          console.log("MESSAGE WAS CREATED!");
          setMessages((old) => [response.payload, ...old]);
        }

        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.delete"
          )
        ) {
          console.log("MESSAGE WAS DELETED!");

          setMessages((old) =>
            old.filter((oldItem) => oldItem.$id !== response.payload.$id)
          );
        }
      }
    );

    return () => {
      permission();
    };
  }, []);

  const getMessages = async () => {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID_MESSAGES,
      [Query.orderDesc("$createdAt"), Query.limit(100)]
    );

    console.log("response", response);
    setMessages(response.documents);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      user_id: user.$id,
      username: user.name,
      body: messageBody,
    };

    const response = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID_MESSAGES,
      ID.unique(),
      payload
    );

    console.log("Created!", response);
    setMessageBody("");
  };

  const deleteMessage = async (message_id) => {
    console.log(messages);
    await databases.deleteDocument(
      DATABASE_ID,
      COLLECTION_ID_MESSAGES,
      message_id
    );
  };

  return (
    <ChatContainer>
      <div className="main-content">
        {messages.map((message) => {
          return (
            <div className="message received" key={message.$id}>
              <span>{new Date(message.$createdAt).toLocaleString()}</span>
              <p>{message.body}</p>

              <button
                className="btn"
                onClick={() => deleteMessage(message.$id)}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
      <form id="message--form" onSubmit={handleSubmit}>
        <div className="message-input">
          <input
            className="input"
            type="text"
            placeholder="Type a message..."
            required
            maxLength={1000}
            onChange={(e) => {
              setMessageBody(e.target.value);
            }}
            value={messageBody}
          />
          <input value={"Send"} type="submit" className="send-button" />
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
  max-width: 400px;
  margin: auto;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  background: #f4f4f4;

  .main-content {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    background: #ffffff;
    border-bottom: 1px solid #ddd;

    .message {
      margin-bottom: 15px;
      padding: 12px 16px;
      border-radius: 20px;
      color: #000000; /* Black text color */
      max-width: 80%;
      display: inline-block;
      word-wrap: break-word;
      font-size: 16px;
      line-height: 1.5;

      &.received {
        background: #e9ecef;
        text-align: left;
        border: 1px solid #ddd;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      &.sent {
        background: #cce5ff;
        text-align: right;
        border: 1px solid #b8daff;
        margin-left: auto;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      p {
        margin: 0;
      }
    }
  }

  .message-input {
    display: flex;
    padding: 10px;
    border-top: 1px solid #ddd;
    background: white;

    .input {
      flex: 1;
      padding: 12px;
      border: 1px solid #ddd;
      border-radius: 20px;
      font-size: 16px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      outline: none;
    }

    .send-button {
      margin-left: 10px;
      padding: 12px 20px;
      border: none;
      background: #007bff;
      color: white;
      border-radius: 20px;
      cursor: pointer;
      font-size: 16px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

      &:hover {
        background: #0056b3;
      }
    }
  }
`;
