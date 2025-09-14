import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { render, mockNavigate } from "./test/test-utils";
import Register from "./Register";

// Mock axios
vi.mock("axios");
const mockedAxios = vi.mocked(axios);

// Mock useNavigate
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("Register Component - Basic Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Test 1: Component renders
  it("renders the registration form", () => {
    render(<Register />);

    expect(screen.getByText("Register to Your Account")).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /register/i })
    ).toBeInTheDocument();
  });

  // Test 2: Form input works
  it("allows user to type in form fields", async () => {
    const user = userEvent.setup();
    render(<Register />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/^password/i);

    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password123");

    expect(emailInput).toHaveValue("test@example.com");
    expect(passwordInput).toHaveValue("password123");
  });

  // Test 3: Password mismatch validation
  it("shows error when passwords don't match", async () => {
    const user = userEvent.setup();
    render(<Register />);

    const emailInput = screen.getByLabelText(/email/i);
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/^password/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    const submitButton = screen.getByRole("button", { name: /register/i });

    // Fill form with different passwords
    await user.type(emailInput, "test@example.com");
    await user.type(usernameInput, "testuser");
    await user.type(passwordInput, "password123");
    await user.type(confirmPasswordInput, "different123");
    await user.click(submitButton);

    expect(screen.getByText("Passwords do not match.")).toBeInTheDocument();
  });
});
