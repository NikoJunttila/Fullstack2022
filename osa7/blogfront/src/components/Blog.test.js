import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import userEvent from "@testing-library/user-event";

test("renders content", () => {
  const blog = {
    title: "ez clapping silvers",
    author: "sineberry",
  };
  const component = render(<Blog blog={blog} />);
  expect(component.container).toHaveTextContent("ez clapping silvers");
  expect(component.container).toHaveTextContent("sineberry");
});

test("call button event handler twice", async () => {
  const blog = {
    title: "ez",
    author: "derp",
    url: "www.leagIsGarbo.com",
    likes: 5,
  };

  const mockHandler = jest.fn();

  render(<Blog blog={blog} onclick={mockHandler} />);

  const user = userEvent.setup();
  const button = screen.getByText("like");
  await user.click(button);
  await user.click(button);

  expect(mockHandler.mock.calls).toHaveLength(2);
});

test("renders title and author", async () => {
  const blog = {
    title: "ez clapping silvers",
    author: "sineberry",
    url: "idk",
    likes: 5,
  };
  const component = render(<Blog blog={blog} />);
  expect(component.container).toHaveTextContent("ez clapping silvers");
  expect(component.container).toHaveTextContent("sineberry");

  screen.debug();
});

test("renders everything if button is clicked", async () => {
  const blog = {
    title: "ez clapping silvers",
    author: "sineberry",
    url: "idk",
    likes: 5,
  };
  const component = render(<Blog blog={blog} />);
  expect(component.container).toHaveTextContent("ez clapping silvers");
  expect(component.container).toHaveTextContent("sineberry");
  expect(component.container).toHaveTextContent("idk");
  expect(component.container).toHaveTextContent("5");

  //if button clicked shows url and likes

  const user = userEvent.setup();
  const button = screen.getByText("show more");
  await user.click(button);
  screen.debug();
});
