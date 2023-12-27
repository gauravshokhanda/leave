const { Api, TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const input = require("input");
const apiId = 22883596;
const apiHash = "f3936813950e59fddced529e1ee18814";

let sessionString =
  "1BQANOTEuMTA4LjU2LjIwMAG7nO3fIrO68Q2faPa9Aa3w6nWz6sOfR3KHi7QyjUaEpGW4H22op+hZnS3iWojYhGMRXvKtmKToUyxglEv3T/cpimN4tkCB+4uDBXB+k+mqlt1FnxGMby7bwVMnHKsOKg/Ae/9J8s1Jh2bIpf1yk+wWDcXaDFEQhIidesCGrQ1G/Dh8fvuKNG/8PP6BR/zcH+4K+jNtOm/nYzeaZ7wxpNWTKvQ3rMBPahXRFBh0h7stfTCRFxzT+Z6V+HsEyRQfvYdH8OWhqidqwkJNkYpxLma9Zm2Y9oymsp6lLjYpV1awizxqStdzZNfG8PkdcZn9tJrI9c3U0fQv2fq8ku4DjofE0g==";
const session = new StringSession(sessionString);
const client = new TelegramClient(session, apiId, apiHash, {});

(async function run() {
  try {
    // Check if a session string is provided, if not, perform authentication
    if (!sessionString) {
      // Authenticate user
      await client.start({
        phoneNumber: async () => await input.text("Please enter your number: "),
        password: async () => await input.text("Please enter your password: "),
        phoneCode: async () =>
          await input.text("Please enter the code you received: "),
        onError: (err) => console.log(err),
      });

      // Save the session string for future use
      sessionString = client.session.save();
      console.log("Session string:", sessionString);
    } else {
      // If a session string is provided, restore the session
      await client.connect();
    }

    // Create a channel using the channels.CreateChannel method
    const result = await client.invoke(
      new Api.channels.CreateChannel({
        title: "My very normal title",
        about: "some string here",
        megagroup: true,
        forImport: true,
        geoPoint: new Api.InputGeoPoint({
          lat: 8.24,
          long: 8.24,
          accuracyRadius: 43,
        }),
        address: "some string here",
      })
    );

    // Print the result
    console.log("Channel creation result:", result);
  } catch (error) {
    // Handle errors
    console.error("Error:", error);
  } finally {
    // Disconnect the client
    await client.disconnect();
  }
})();
