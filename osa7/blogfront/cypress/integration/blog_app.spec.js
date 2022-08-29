describe("Blog", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const user = {
      name: "Derppy",
      username: "randomderppy",
      password: "salasana",
    };
    cy.request("POST", "http://localhost:3001/api/users/", user);
    cy.visit("http://localhost:3000");
  });
  it("Login form is shown", function () {
    cy.contains("Log in").click();
    cy.contains("Login");
    cy.contains("username");
    cy.contains("password");
  });
  it("login fails with wrong password", function () {
    cy.contains("Log in").click();
    cy.get("#username").type("randomderppy");
    cy.get("#password").type("wrong");
    cy.get("#login-button").click();
    cy.contains("wrong credentials");
  });
  it("succeeds with correct credentials", function () {
    cy.contains("Log in").click();
    cy.get("#username").type("randomderppy");
    cy.get("#password").type("salasana");
    cy.get("#login-button").click();

    cy.contains("Derppy logged in");
  });
});
describe("when logged in", function () {
  beforeEach(function () {
    cy.login({ username: "randomderppy", password: "salasana" });
  });
  it("adding new blog", function () {
    cy.contains("add new blog").click();
    cy.get("#title").type("adventures in pisslow");
    cy.get("#author").type("BZI");
    cy.get("#url").type("leagueoflegends.com");
    cy.get("#likes").type("5");
    cy.get("#addBlog").click();

    cy.contains("adventures in pisslow");
    cy.contains("BZI");
  });
  it("testing like function", function () {
    cy.createBlog({
      title: "helloworld",
      author: "somebody",
      url: "google.com",
      likes: "1",
    });
    cy.contains("Like").click();

    cy.contains("2");
  });
  it("testing delete", function () {
    cy.createBlog({
      title: "helloworld",
      author: "somebody",
      url: "google.com",
      likes: "1",
    });
    cy.contains("Delete").click();
    cy.contains("OK").click();

    cy.get("html").should("not.contain", "google.com");
  });
});
