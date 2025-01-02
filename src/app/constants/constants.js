const usersDb = [
  {
    id: 1,
    name: "Yell Htut",
    username: "yellhtut",
    email: "yellhtut4@gmail.com",
    password: "admin123",
    role: "admin", // e.g., CEO, Sales Manager
    redirect_route: "dashboard",
    path: ["dashboard", "members"],
    refreshToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYjQxMzQ3YmQ1NGJhNDYyMjYxMDMxMDU1OWE1MWFhZDMxYmQ2MDliMjc3OGVmOTA4ZDdkOWUzMDRlNmI5MzljODU3ZTc5MzczNGQwZDhkMTQiLCJpYXQiOjE3MzUxMTQyNzYuMDY5NzQxLCJuYmYiOjE3MzUxMTQyNzYuMDY5NzQ0LCJleHAiOjE3NTA4MzkwNzUuNzQzNzIzLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.gFdWRfa-8NouEenEIvPK1QAW5z2tE31AeYdraPG03BTakffKL8F7Q_DfVUwKiSOxAB_hN2eSLJiXeROg2F8WiMvyKVz_sgeYBeR8ZIaB0GAsdagjCGoXU5Mj-7shQ1zZjdIMlVJ39_O5xZPivHnXG1fjVfxbU8V9ih4sWn1FjWE7F1hZZPlc89fDsbIgNpOaGnPBWqtLi8ekaWxDUwesZ-NL1yexWZeTgN_Rc3DfrIjxRJXkbvo_h79b-bUxPtYBcclFIl0WM70d0RhB8bQamNZkXbPWQdDmrE21GyxUK2gq1igmDP-mdhPkHeGpwxm1Q76kpOrmQgl2pLzy6HDXyxEpWoqHdl_42NoyOXEn9x-4qMyQf5c6eCHtzky-OGiAVM371K3qejeNhR00F77wXXfPPcm4loS7S8Y3zW2s4YoS6yCQ8WodQDfuE_Guc",
    permission: {
      dashboard: {
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
