import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen } from "@testing-library/react";
import { render, mockUseAuth } from "./test/test-utils";
import Login from "./Login";

// Mock useNavigate
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

// Mock AuthContext
vi.mock("./Auth/AuthContext", () => ({
  useAuth: () => mockUseAuth,
}));

describe("Login Component - Minimal Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Test 1: Component renders
  it("renders the login form", () => {
    render(<Login />);

    expect(screen.getByText("Login to Your Account")).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
    expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
  });
});
