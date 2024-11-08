const usersDb = [
  {
    id: 1,
    name: "Yell Htut",
    username: "yellhtut",
    email: "yellhtut4@gmail.com",
    password: "admin123",
    role: "admin", // e.g., CEO, Sales Manager
    path: ["dashboard", "members"],
    permission: {
      members: {
        list: true,
        add: true,
        create: true,
        edit: true,
        update: true,
        hide_show: false,
        details: true,
        history: true,
        delete: true,
      },
    },
  },
];

module.exports = {
  usersDb,
};
