import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Home from "./page";

vi.mock("@/components/Header", () => ({
  Header: () => <div>Header</div>,
}));
vi.mock("@/components/Hero", () => ({
  Hero: () => <div>Hero</div>,
}));
vi.mock("@/components/Features", () => ({
  Features: () => <div>Features</div>,
}));
vi.mock("@/components/ProblemAndSolution", () => ({
  ProblemAndSolution: () => <div>ProblemAndSolution</div>,
}));
vi.mock("@/components/FAQ", () => ({
  FAQ: () => <div>FAQ</div>,
}));
vi.mock("@/components/Footer", () => ({
  Footer: () => <div>Footer</div>,
}));

describe("Home page", () => {
  it("renders the landing page sections", () => {
    render(<Home />);

    expect(screen.getByText("Header")).toBeInTheDocument();
    expect(screen.getByText("Hero")).toBeInTheDocument();
    expect(screen.getByText("Features")).toBeInTheDocument();
    expect(screen.getByText("ProblemAndSolution")).toBeInTheDocument();
    expect(screen.getByText("FAQ")).toBeInTheDocument();
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });
});

