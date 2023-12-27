const path = require("path");
const MTProto = require("@mtproto/core");

const api_id = "22883596";
const api_hash = "f3936813950e59fddced529e1ee18814";

const targetPhoneNumber = "+917535821372"; // Replace with the phone number of the target user
const messageText = "Hello, this is a test message!";

// Create an instance
const mtproto = new MTProto({
  api_id,
  api_hash,
  storageOptions: {
    path: path.resolve(__dirname, "./data/1.json"),
  },
});

// Search for the target user
mtproto
  .call("contacts.search", {
    q: targetPhoneNumber,
    limit: 1,
  })
  .then((result) => {
    console.log(result, "result");
    if (result.users.length > 0) {
      const targetUserId = result.users[0].id;

      // Send a message to the target user
      mtproto
        .call("messages.sendMessage", {
          peer: {
            _: "inputPeerUser",
            user_id: targetUserId,
          },
          message: messageText,
        })
        .then((sendMessageResult) => {
          console.log("Message sent successfully:", sendMessageResult);
        })
        .catch((sendMessageError) => {
          console.error("Error sending message:", sendMessageError);
        });
    } else {
      console.log("User not found");
    }
  })
  .catch((searchError) => {
    console.error("Error searching for user:", searchError);
  });
