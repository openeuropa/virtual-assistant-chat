/* eslint-disable no-undef */
Cypress.Commands.add(
  "assertDocument",
  ({ id, rating, score, title, url, meta }) => {
    cy.get(`div[data-document-id="${id}"] .nlux-doc-score-container`).should(
      "contain.html",
      `<b>Relevance score:</b>` +
        `<div class="nlux-doc-badge nlux-rating-${rating.toLowerCase()}">` +
        `<span class="nlux-doc-grade nlux-rating-${rating.toLowerCase()}">${rating}</span>` +
        `<span class="nlux-doc-score">${score}</span>` +
        `</div>`,
    );
    cy.get(`div[data-document-id="${id}"] h2.nlux-doc-title > a`)
      .should("contain.text", title)
      .should("have.attr", "href", url);
    cy.get(`div[data-document-id="${id}"] .nlux-doc-published`).should(
      "contain.text",
      meta,
    );
  },
);
