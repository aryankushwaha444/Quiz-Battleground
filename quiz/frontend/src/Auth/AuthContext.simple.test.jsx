import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { AuthProvider, useAuth } from "./AuthContext";

// Simple test component
const TestComponent = () => {
  const { isAuthenticated, user, login, logout } = useAuth();

  return (
    <div>
      <div data-testid="status">
        {isAuthenticated ? "logged in" : "logged out"}
      </div>
      <div data-testid="user">{user ? user.email : "no user"}</div>
      <button onClick={() => login({ id: 1, email: "test@example.com" })}>
        Login
      </button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

describe("AuthContext - Simple Tests", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  // Test 1: Initial state
  it("starts with user logged out", () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId("status")).toHaveTextContent("logged out");
    expect(screen.getByTestId("user")).toHaveTextContent("no user");
  });

  // Test 2: Login works
  it("logs in user when login is called", () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    const loginButton = screen.getByText("Login");

    act(() => {
      loginButton.click();
    });

    expect(screen.getByTestId("status")).toHaveTextContent("logged in");
    expect(screen.getByTestId("user")).toHaveTextContent("test@example.com");
  });

  // Test 3: Logout works
  it("logs out user when logout is called", () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // First login
    const loginButton = screen.getByText("Login");
    act(() => {
      loginButton.click();
    });

    // Then logout
    const logoutButton = screen.getByText("Logout");
    act(() => {
      logoutButton.click();
    });

    expect(screen.getByTestId("status")).toHaveTextContent("logged out");
    expect(screen.getByTestId("user")).toHaveTextContent("no user");
  });

  // Test 4: Remembers login from localStorage
  it("remembers user from localStorage", () => {
    // Set up localStorage
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem(
      "user",
      JSON.stringify({ id: 1, email: "saved@example.com" })
    );

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId("status")).toHaveTextContent("logged in");
    expect(screen.getByTestId("user")).toHaveTextContent("saved@example.com");
  });
});
