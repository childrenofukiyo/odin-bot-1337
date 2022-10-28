# Odin bot

A simple bot that deletes webhooks and notifies using twilio SMS

## Running Locally

Make sure you have [Node.js](http://nodejs.org/), [Heroku CLI](https://cli.heroku.com/) and [Yarn](https://classic.yarnpkg.com/lang/en/docs/install) installed.

```sh
$ git clone https://github.com/childrenofukiyo/odin-bot-1337 # or clone your own fork
$ cd odin-bot-1337
$ yarn install
```

Create .env file in the root directory of the project with the following contents:

```text
TWILIO_ACCOUNT_SID = YOUR_TWILIO_ACCOUNT_SID
TWILIO_AUTH_TOKEN = YOUR_TWILIO_AUTH_TOKEN
TWILIO_PHONE_NUMBER = YOUR_TWILIO_PHONE_NUMBER
DISCORD_AUTH_TOKEN = YOUR_DISCORD_AUTH_TOKEN
```

Add allowed discord ids and notification recipients in config.js

```js
// list of allowed user ids for webhook creation/update, can be a bot id or user id
export const allowedIds: { [key: string]: boolean } = {
  '123456789123456789': true,
};

// list of people to notify, will send an SMS and a discord message
export const notifyList: { phone: string, discordId: string }[] = [
  {
    phone: '+155512345678',
    discordId: '123456789123456789',
  },
];
```

```sh
$ yarn ts-node index.ts
```

Your app should now be running on [localhost:5001](http://localhost:5000/).

## Deploying to Heroku

```sh
$ heroku create
$ heroku config:set TWILIO_ACCOUNT_SID=YOUR_TWILIO_ACCOUNT_SID TWILIO_AUTH_TOKEN=YOUR_TWILIO_AUTH_TOKEN TWILIO_PHONE_NUMBER=YOUR_TWILIO_PHONE_NUMBER DISCORD_AUTH_TOKEN=YOUR_DISCORD_AUTH_TOKEN
$ git push heroku main
$ heroku open
```

or

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## Documentation

- [How to code a discord bot in javascript](https://www.alpharithms.com/how-to-code-a-discord-bot-in-javascript-444917/)
