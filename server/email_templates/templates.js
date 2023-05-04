const sendLinkTemplate = {
  template:
    "Hello ${userName}. Please use the below link for starting your session with the chatbot: http://localhost:3000/chatbotload/${conversationKey}",
  subject: "Audio Visual Chatbot Link",
};

module.exports = {
  sendLinkTemplate,
};
