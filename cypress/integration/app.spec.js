describe("HomeView", () => {
  it("check the top three articles are displayed", () => {
    cy.server();
    cy.route(
      "https://nc-knews-server-main.herokuapp.com/api/articles?sort_by=comment_count&order=desc&limit=3",
      "fx:top3.json"
    );
    cy.visit("/");
    cy.get("[data-cy=topthree]").should("have.length", 3);
  });
  it("check the topic menu displays its children", () => {
    cy.server();
    cy.route(
      "https://nc-knews-server-main.herokuapp.com/api/topics",
      "fx:topics.json"
    );
    cy.visit("/");
    cy.get("[data-cy=topics]").click();
    cy.get("[data-cy=topic-opt]").should("have.length", 12);
  });
  it("check selecting new topic on add article form displays new input fields", () => {
    cy.server();
    cy.route(
      "https://nc-knews-server-main.herokuapp.com/api/topics",
      "fx:topics.json"
    );
    cy.visit("/");
    cy.get("[data-cy=addTopic]").click();
    cy.get("[data-cy=newTopic]").click();
    cy.get("[data-cy=newTopicInput]").should("have.length", 2);
  });
});
describe("Articles", () => {
  it("check the articles links display on the articles page", () => {
    cy.stubAndVisitArticles({ json: "fx:articles.json" });
    cy.visit("/articles");
    cy.get("[cy-data=articleList]").should("have.length", 10);
  });
  it("check seven page options are displayed if a count of 65 is passed", () => {
    cy.stubAndVisitArticles({ json: "fx:articles.json" });
    cy.visit("/articles");
    cy.get("[cy-data=pageItem]").should("have.length", 7);
  });
  it("check only 5 articles are displayed when 5 are passed", () => {
    cy.stubAndVisitArticles({ json: "fx:5articles.json" });
    cy.visit("/articles");
    cy.get("[cy-data=articleList]").should("have.length", 5);
  });
  it("check no paginaton is shown if the total count is below 10", () => {
    cy.stubAndVisitArticles({ json: "fx:5articles.json" });
    cy.visit("/articles");
    cy.get("[cy-data=articleList]").should("have.length", 0);
  });
});
