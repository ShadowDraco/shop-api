const GetVRoute = require("./GetVRoute");

const doGetVRoute = async () => {
  console.table(await GetVRoute());
};

doGetVRoute();
