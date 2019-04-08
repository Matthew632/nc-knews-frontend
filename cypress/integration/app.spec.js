describe("HomeView", () => {
  it("check the top three articles are displayed", () => {
    cy.server();
    cy.route(
      "https://nc-knews-server-main.herokuapp.com/api/articles?sort_by=comment_count&order=desc&limit=3",
      {
        articles: [
          {
            article_id: 16,
            author: "weegembump",
            created_at: "2018-02-17T00:00:00.000Z",
            title: "History of FC Barcelona",
            topic: "football",
            votes: 62,
            comment_count: "19"
          },
          {
            article_id: 35,
            author: "cooljmessy",
            created_at: "2016-12-13T00:00:00.000Z",
            title: "Stone Soup",
            topic: "cooking",
            votes: 23,
            comment_count: "14"
          },
          {
            article_id: 23,
            author: "weegembump",
            created_at: "2016-11-18T00:00:00.000Z",
            title: "Sunday league football",
            topic: "football",
            votes: 4,
            comment_count: "14"
          }
        ],
        total_count: 65
      }
    );
    cy.visit("/");
    cy.get("[data-cy=topthree]").should("have.length", 3);
  });
  it("check that only 2 top articles are displayed if only 2 are passed by cypress", () => {
    cy.server();
    cy.route(
      "https://nc-knews-server-main.herokuapp.com/api/articles?sort_by=comment_count&order=desc&limit=3",
      {
        articles: [
          {
            article_id: 16,
            author: "weegembump",
            created_at: "2018-02-17T00:00:00.000Z",
            title: "History of FC Barcelona",
            topic: "football",
            votes: 62,
            comment_count: "19"
          },
          {
            article_id: 35,
            author: "cooljmessy",
            created_at: "2016-12-13T00:00:00.000Z",
            title: "Stone Soup",
            topic: "cooking",
            votes: 23,
            comment_count: "14"
          }
        ],
        total_count: 65
      }
    );
    cy.visit("/");
    cy.get("[data-cy=topthree]").should("have.length", 2);
  });
});
