const success = (data) => {
  return {
    status: "success",
    data: data,
  };
};

const failure = (data) => {
  return {
    status: "failure",
    data: data,
  };
};

module.exports = { success, failure };
