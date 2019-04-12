const { dateConvert } = require("./utils");

describe("dateConvert()", () => {
  it("check date returns in dd/mm/yyyy format", () => {
    expect(dateConvert("2017-06-23", 1)).toEqual("23-06-2017");
  });
  it("check date return in dd/mm/yyyy format and removes timestamp", () => {
    expect(dateConvert("2018-02-17T00:00:00.000Z")).toEqual("17-02-2018");
  });
  it("check it also removes any extra suffixes", () => {
    expect(dateConvert("2011-12-04T00:00:00.000ZYYY123")).toEqual("04-12-2011");
  });
});
