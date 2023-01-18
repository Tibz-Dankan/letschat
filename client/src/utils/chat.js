import { ChatDate } from "./chatDate";

export class Chat {
  chatArr;
  newChatArr = [];

  constructor(charArr) {
    this.chatArr = charArr;
  }

  parsedDate(dateObj) {
    if (!dateObj) return;
    return new Date(JSON.parse(dateObj).date);
  }

  organize() {
    let msgObj = {};
    let prevDay, currentDay;
    let prevDate, currentDate;

    this.chatArr.map((messageObj, index) => {
      msgObj = messageObj;
      currentDate = this.parsedDate(messageObj.date);
      prevDate = this.parsedDate(this.chatArr[index - 1]?.date);

      currentDay = new ChatDate(currentDate).day();
      prevDay = prevDate && new ChatDate(prevDate).day();

      if (currentDay !== prevDay) {
        msgObj.day = currentDay;
        this.newChatArr.push(msgObj);
      } else {
        this.newChatArr.push(msgObj);
      }
    });
    return this.newChatArr;
  }

  push(msgObj) {
    return this.chatArr.push(msgObj);
  }
}
