const TelegramBot = require("node-telegram-bot-api");

const token = "6887377196:AAFWL-UzHome-VldIvZe8jPx6iOX-YxBBt8";

const bot = new TelegramBot(token, { polling: true });

// Store user information
const userInformation = {};

// Listen for incoming messages
bot.on("message", (message) => {
  const chat_id = message.chat.id;

  console.log(message, "message");

  // Check if the user has sent the /start command
  if (message.text === "/start") {
    // Ask for the username
    bot.sendMessage(chat_id, "Hello! Please enter your username:");
  } else {
    // Check if the user has already provided a username
    if (!userInformation[chat_id] || !userInformation[chat_id].username) {
      // Store the username in the userInformation object
      userInformation[chat_id] = { username: message.text };

      // Ask for general information
      bot.sendMessage(
        chat_id,
        `Thank you, ${message.text}! Now, please provide some general information:`
      );

      // Schedule a message after 1 minute
      setTimeout(() => {
        bot.sendMessage(
          chat_id,
          "Hey there! It's been 1 minute since you started the conversation."
        );
        bot.sendPhoto(
          chat_id,
          "https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/001/205/265/datas/original.png"
        );
      }, 10000); // 1 minute in milliseconds
    } else {
      // Handle general information or additional logic here
      bot.sendMessage(
        chat_id,
        `Thank you for the information, ${userInformation[chat_id].username}!`
      );
      // You can continue the conversation or perform other actions based on the user's response
    }
  }
});
