// list of allowed user ids for webhook creation/update, can be a bot id
export const allowedIds: { [key: string]: boolean } = {
  '123456789123456789': true,
};

// list of people to notify, will send an SMS and a discord message
export const notifyList: { phone: string; discordId: string }[] = [
  {
    phone: '+155512345678',
    discordId: '123456789123456789',
  },
];
