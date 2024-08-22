describe("visit chat", () => {
  it("should visit", () => {
    // Mock request with fixture.
    cy.intercept("GET", "/ask?question=*", { fixture: "ask.json" }).as(
      "getAnswer",
    );

    // Type in message area.
    cy.visit("/");
    cy.get("[contenteditable]")
      .first() // Adjust the selector as needed
      .focus()
      .type("Your text here");

    // Send message.
    cy.get("button.cs-button.cs-button--send").click();

    // Assert that chat displays mocked response correctly.
    cy.wait("@getAnswer").then((interception) => {
      cy.get(".cs-message.cs-message--incoming").should(
        "include.text",
        "This is a mocked answer",
      );
    });
  });
});
