/* eslint-disable no-undef */
Cypress.Commands.add(
  "assertDocument",
  ({ id, rating, status, title, url, meta }) => {
    cy.get(`div[data-document-id="${id}"] > .nlux-document-left`).should(
      "contain.html",
      `<small class="badge badge-sm bg-${status}" style="margin-right: 5px;">${rating}</small>`,
    );
    cy.get(`div[data-document-id="${id}"] > .nlux-document-right > a`)
      .should("contain.text", title)
      .should("have.attr", "href", url);
    cy.get(
      `div[data-document-id="${id}"] > .nlux-document-right > .nlux-document-meta`,
    ).should("contain.text", meta);
  },
);
