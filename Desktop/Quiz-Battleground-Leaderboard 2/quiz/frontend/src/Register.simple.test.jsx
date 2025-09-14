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

describe("Register Component - Simple Tests", () => {
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

  // Test 4: Successful registration
  it("handles successful registration", async () => {
    const user = userEvent.setup();

    // Mock successful API response
    mockedAxios.post.mockResolvedValueOnce({
      data: { message: "User registered successfully" },
    });

    render(<Register />);

    const emailInput = screen.getByLabelText(/email/i);
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/^password/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    const submitButton = screen.getByRole("button", { name: /register/i });

    // Fill form with matching passwords
    await user.type(emailInput, "test@example.com");
    await user.type(usernameInput, "testuser");
    await user.type(passwordInput, "password123");
    await user.type(confirmPasswordInput, "password123");
    await user.click(submitButton);

    // Check API was called
    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith("/api/user/register", {
        email: "test@example.com",
        username: "testuser",
        password: "password123",
      });
    });

    // Check success message
    expect(
      screen.getByText("Registration successful! Redirecting to login...")
    ).toBeInTheDocument();
  });

  // Test 5: Registration error
  it("shows error message when registration fails", async () => {
    const user = userEvent.setup();

    // Mock API error
    mockedAxios.post.mockRejectedValueOnce({
      response: { data: { message: "Email already exists" } },
    });

    render(<Register />);

    const emailInput = screen.getByLabelText(/email/i);
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/^password/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    const submitButton = screen.getByRole("button", { name: /register/i });

    // Fill and submit form
    await user.type(emailInput, "test@example.com");
    await user.type(usernameInput, "testuser");
    await user.type(passwordInput, "password123");
    await user.type(confirmPasswordInput, "password123");
    await user.click(submitButton);

    // Check error message
    await waitFor(() => {
      expect(screen.getByText("Email already exists")).toBeInTheDocument();
    });
  });
});
