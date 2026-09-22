/// <reference types="cypress" />

import { mount } from 'cypress/react';
import App from '../../src/App';
import { BrowserRouter } from 'react-router-dom';

describe("Should render properly", () => {
  it("Should render homepage with banner and navigation", () => {
  
    cy.visit("http://localhost:5173/");
    const headerTextList = [
      "LOGO",
      "Home",
      "About us",
      "What we do",
      "Document",
      "Services",
      "FAQ",
      "Our team",
      "Contact us",
    ];

    headerTextList.forEach((text) => {
      cy.contains(text).should("exist");
    });

    cy.contains(/welcome to your new application site/i)
      .should("exist")
      .and("have.class", "em-c-hero__title");

    cy.contains(/a short description about what is your site about/i)
      .should("exist")
      .and("have.class", "em-c-hero__desc");
  });
});