const dateConvert = date => {
  return `${date.slice(8, 10)}-${date.slice(5, 8)}${date.slice(0, 4)}`;
};

module.exports = { dateConvert };
