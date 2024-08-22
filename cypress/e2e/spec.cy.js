describe("chat", () => {
  it("should display a response properly", () => {
    // Mock request with fixture.
    cy.intercept("GET", "/ask?question=*", { fixture: "ask.json" }).as(
      "getAnswer",
    );

    // Type in message area.
    cy.visit("/");
    cy.get("[contenteditable]").first().focus().type("Show me the fixture");

    // Send message.
    cy.get("button.cs-button.cs-button--send").click();

    // Assert that chat displays mocked response correctly.
    cy.wait("@getAnswer").then((interception) => {
      cy.get(".cs-message.cs-message--incoming").should(
        "include.text",
        "This is a mocked answer",
      );

      // Assert documents are rendered correctly.
      cy.get('tr[data-row-key="80081c40-dcc6-7a24-15a9-5092924b2b27"]')
        .should(
          "include.html",
          '<small class="badge badge-sm bg-warning" style="margin-right: 5px;">Rating B</small>',
        )
        .should(
          "include.html",
          '<a href="https://example.com/1" target="_blank">First document</a>',
        )
        .should(
          "include.text",
          "Published 3 months ago on 23 May 2024 at 16:00",
        );
      cy.get('tr[data-row-key="56009c9f-a60f-e660-8090-2ec6ba5796c0"]')
        .should(
          "include.html",
          '<small class="badge badge-sm bg-success" style="margin-right: 5px;">Rating A</small>',
        )
        .should(
          "include.html",
          '<a href="https://example.com/2" target="_blank">Second document</a>',
        )
        .should("include.text", "2 months ago on 10 June 2024 at 17:00");

      // Assert that content toggling works.
      cy.get("td.cs-documents-cell.cs-documents-row-expand-icon-cell a")
        .eq(0)
        .click()
        .should("be.visible", "This is the content of the first document");
      cy.get("td.cs-documents-cell.cs-documents-row-expand-icon-cell a")
        .eq(1)
        .click()
        .should("be.visible", "This is the content of the first document");
    });
  });
});
