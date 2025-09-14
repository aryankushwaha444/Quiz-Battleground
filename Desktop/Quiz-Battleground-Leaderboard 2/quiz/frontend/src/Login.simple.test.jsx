import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { render, mockNavigate, mockUseAuth } from "./test/test-utils";
import Login from "./Login";

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

// Mock AuthContext
vi.mock("./Auth/AuthContext", () => ({
  useAuth: () => mockUseAuth,
}));

describe("Login Component - Simple Tests", () => {
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

  // Test 2: Form input works
  it("allows user to type in form fields", async () => {
    const user = userEvent.setup();
    render(<Login />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password123");

    expect(emailInput).toHaveValue("test@example.com");
    expect(passwordInput).toHaveValue("password123");
  });

  // Test 3: Successful login
  it("handles successful login", async () => {
    const user = userEvent.setup();
    const mockUser = { id: 1, email: "test@example.com", username: "testuser" };

    // Mock successful API response
    mockedAxios.post.mockResolvedValueOnce({
      data: { user: mockUser },
    });

    render(<Login />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /login/i });

    // Fill and submit form
    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password123");
    await user.click(submitButton);

    // Check API was called
    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith("/api/user/login", {
        email: "test@example.com",
        password: "password123",
      });
    });

    // Check login function was called
    expect(mockUseAuth.login).toHaveBeenCalledWith(mockUser);

    // Check success message
    expect(screen.getByText(" Login successful")).toBeInTheDocument();
  });

  // Test 4: Login error
  it("shows error message when login fails", async () => {
    const user = userEvent.setup();

    // Mock API error
    mockedAxios.post.mockRejectedValueOnce({
      response: { data: { message: "Invalid credentials" } },
    });

    render(<Login />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /login/i });

    // Fill and submit form
    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "wrongpassword");
    await user.click(submitButton);

    // Check error message
    await waitFor(() => {
      expect(screen.getByText(" Invalid credentials")).toBeInTheDocument();
    });

    // Check login was not called
    expect(mockUseAuth.login).not.toHaveBeenCalled();
  });

  // Test 5: Password visibility toggle
  it("toggles password visibility", async () => {
    const user = userEvent.setup();
    render(<Login />);

    const passwordInput = screen.getByLabelText(/password/i);
    const toggleButton = screen.getByRole("button", { name: "" });

    // Initially hidden
    expect(passwordInput).toHaveAttribute("type", "password");

    // Click to show
    await user.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "text");

    // Click to hide
    await user.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "password");
  });
});
