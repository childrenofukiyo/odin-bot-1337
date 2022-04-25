// must be a map of discordId -> discordId
export const allowedIds: { [key: string]: string } = {
  '123456789123456789': '123456789123456789',
};

export const notifyList: { phone: string; discordId: string }[] = [
  {
    phone: '+155512345678',
    discordId: '123456789123456789',
  },
];
