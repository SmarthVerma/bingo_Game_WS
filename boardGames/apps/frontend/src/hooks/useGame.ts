import {
  PUT_VALUE_TO_BOX,
  PUT_GAME_INIT,
  MessageType,
  PUT_CHECK_MARK,
  GET_GAME
} from "@repo/games/client/bingo/messages";
import { useEffect, useState } from "react";
import { useSocket } from "./useSocket";

interface WebSocketData {
  type: MessageType;
  data: any;
}

function useGame() {
  const [gameBoard, setGameBoard] = useState<null | any>(null);
  const [checkedBoxes, setCheckedBoxes] = useState<null | any>(null);
  const [checkedLines, setCheckedLines] = useState<null | any>(null);
  const [gameId, setGameId] = useState<null | string>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [gameLoading, setGameLoading] = useState<boolean>(false);

  const socket = useSocket(); // for sending messages

  useEffect(() => {
    console.log('how many times running',)
    if (!socket) return;

    socket.onmessage = (message: MessageEvent) => {
      const parsedMessage = JSON.parse(message.data)
      console.log("m i mussing something?", parsedMessage);
      switch (parsedMessage.type as MessageType) {
        case SEND_GAMEBOARD: {
          console.log("hello in here case send landingPage");
          getMessage(SEND_GAMEBOARD, parsedMessage.data);
          break;
        }
        case SEND_CHECKBOXES: {
          console.log("he;;p");
          getMessage(SEND_CHECKBOXES, parsedMessage.data);
          break;
        }

        case PUT_GAME_INIT: {
          console.log('got message from gane.init',)
          getMessage(GAME_INIT, parsedMessage.data);
          break;
        }
      }
    };

  }, [socket]);

  const getMessage = (type: MessageType, data: any) => {
    switch (type as MessageType) {
      case SEND_GAMEBOARD: {
        console.log("hello in here case send gameboard");
        setGameBoard(data);
        break;
      }
      case SEND_CHECKBOXES: {
        setCheckedBoxes(data.checkedBoxes);
        setCheckedLines(data.checkedLines);
        break;
      }
      case GAME_INIT: {
        setGameId(data);
      }
    }
  };

  const sendMessage = (type: MessageType, value: string) => {
    if (!socket) return;
    switch (type) {
      case PUT_CHECK_MARK: {
        const sendingData: WebSocketData = {
          type,
          data: value,
        };
        socket.send(JSON.stringify(sendingData));
        break;
      }
      case PUT_VALUE_TO_BOX: {
        const sendingData: WebSocketData = {
          type,
          data: "lol",
        };
        socket.send(JSON.stringify(sendingData));
        break;
      }

      case GAME_INIT: {
        console.log("here");
        const sendingData: WebSocketData = {
          type,
          data: value,
        };
        console.log("this is data", sendingData);
        socket.send(JSON.stringify(sendingData));
      }
    }
  };

  return {
    gameBoard,
    checkedBoxes,
    checkedLines,
    gameId,
    gameLoading,
    sendMessage,
    getMessage,
  };
}

export default useGame;
