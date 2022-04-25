// Setup our environment variables via dotenv
import { Client, Intents } from 'discord.js';
import { Twilio } from 'twilio';
import { notifyList, allowedIds } from './config';
import express from 'express';
import * as dotenv from 'dotenv';

dotenv.config();

const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID || '';
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN || '';
const twilioNumber = process.env.TWILIO_PHONE_NUMBER || '';
const discordAuthToken = process.env.DISCORD_AUTH_TOKEN || '';
const port = process.env.PORT || 5001;

const app = express();

app.get('/', (req, res) => {
  res.send('Odin is alive!');
});

app.listen(port, () => {
  console.log(`The application is listening on port ${port}!`);
});

const twilioClient = new Twilio(twilioAccountSid, twilioAuthToken);

// Instantiate a new client with some necessary parameters.
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_WEBHOOKS],
});
// Notify progress
client.on('ready', function (e) {
  console.log(`Logged in as ${client.user?.tag}!`);
});

(async () => {
  // Authenticate
  await client.login(discordAuthToken);
})();

client.on('webhookUpdate', function (channel) {
  (async () => {
    try {
      const webhooks = await channel.fetchWebhooks();
      for (let [, webhook] of webhooks) {
        // skip if created or updated by allowed owner
        if (allowedIds[webhook?.owner?.id ?? '']) {
          continue;
        }
        // delete webhook if not allowed
        await webhook.delete('Webhooks are not authorized');
        // notify from notify list
        notifyList.forEach((item) => {
          twilioClient.messages.create({
            body: `Webhook created by ${webhook?.owner?.username}, id: ${webhook?.owner?.id}`,
            to: item.phone, // Text this number
            from: twilioNumber, // From a valid Twilio number
          });
          client.users.fetch(item.discordId).then((user) => {
            user.send(
              `Webhook created by ${webhook?.owner?.username}, id: ${webhook?.owner?.id}`
            );
          });
        });
      }
    } catch (e) {
      console.error(e);
    }
  })();
});
