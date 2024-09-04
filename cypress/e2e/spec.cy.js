describe("chat", () => {
  // Fix test date.
  before(() => {
    const now = new Date(Date.parse("2024-10-01")).getTime();
    cy.clock(now, ["Date"]);
  });

  it("should display a response properly", () => {
    // Mock request with fixture.
    cy.intercept("GET", "/ask?question=*", { fixture: "ask.json" }).as(
      "getAnswer",
    );

    // Type in message area.
    cy.visit("/");
    cy.get(".nlux-comp-composer textarea").focus().type("Show me the fixture");

    // Send message.
    cy.get(".nlux-comp-composer button").click();

    // Assert that chat displays mocked response correctly.
    cy.wait("@getAnswer").then((interception) => {
      cy.get(".nlux_msg_received").should(
        "include.text",
        "This is a mocked answer",
      );

      //Assert documents are rendered correctly.
      [
        {
          id: "80081c40-dcc6-7a24-15a9-5092924b2b27",
          rating: "B",
          status: "warning",
          title: "First document",
          url: "https://example.com/1",
          meta: "Published on 23 May 2024",
        },
        {
          id: "56009c9f-a60f-e660-8090-2ec6ba5796c0",
          rating: "A",
          status: "success",
          title: "Second document",
          url: "https://example.com/2",
          meta: "Published on 10 June 2024",
        },
      ].forEach((item) => {
        cy.get(
          `div[data-document-id="${item.id}"] > .nlux-document-left`,
        ).should(
          "contain.html",
          `<small class="badge badge-sm bg-${item.status}" style="margin-right: 5px;">${item.rating}</small>`,
        );
        cy.get(`div[data-document-id="${item.id}"] > .nlux-document-right > a`)
          .should("contain.text", item.title)
          .should("have.attr", "href", item.url);
        cy.get(
          `div[data-document-id="${item.id}"] > .nlux-document-right > .nlux-document-meta`,
        ).should("contain.text", item.meta);
      });
    });
  });
});
