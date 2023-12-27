const { TelegramClient, Api } = require("telegram");
const { StringSession } = require("telegram/sessions");
const input = require("input");

const apiId = 22883596;
const apiHash = "f3936813950e59fddced529e1ee18814";
const stringSession = new StringSession("");

(async () => {
  console.log("Loading interactive example...");
  const client = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 5,
  });
  await client.start({
    phoneNumber: async () => await input.text("Please enter your number: "),
    password: async () => await input.text("Please enter your password: "),
    phoneCode: async () =>
      await input.text("Please enter the code you received: "),
    onError: (err) => console.log(err),
  });
  console.log("You should now be connected.");
  console.log(client.session.save());
  //   await client.sendMessage("me", { message: "Hello!" });
  const entity = await client.getEntity("testbornaapi");
  await client.invoke(
    new Api.messages.SendMessage({
      peer: entity,
      message: "Hello From nodejs",
    })
  );

  //Schedule the post for an hour later
  setTimeout(async () => {
    const entity = await client.getEntity("testbornaapi");
    const file = "./test1.jpg";
    const caption = "caption for the file";

    await client.sendFile(entity, { file, caption });
    await client.disconnect();
  }, 10000);
})();
