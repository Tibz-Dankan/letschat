export const generateChatRoomId = (currentUserIndex, chatMateUserIndex) => {
  const areParametersNumbers =
    Number.isInteger(currentUserIndex) && Number.isInteger(chatMateUserIndex);
  if (areParametersNumbers === false) return;
  if (currentUserIndex > chatMateUserIndex) {
    return "ctR" + chatMateUserIndex + "&" + currentUserIndex + "td";
  } else {
    return "ctR" + currentUserIndex + "&" + chatMateUserIndex + "td";
  }
};
