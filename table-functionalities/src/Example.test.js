import { render, screen } from "@testing-library/react";

import Example from "./Example";

test("renders Example With Search and Filter link", () => {
  render(<Example />);
  const linkElement = screen.getByText(/Example With Search and Filter/i);
  expect(linkElement).toBeInTheDocument();
});
