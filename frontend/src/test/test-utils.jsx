import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../Auth/AuthContext";

// Custom render function that includes providers
const AllTheProviders = ({ children }) => {
  return (
    <BrowserRouter>
      <AuthProvider>{children}</AuthProvider>
    </BrowserRouter>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// Mock axios
export const mockAxios = {
  post: vi.fn(),
  get: vi.fn(),
  put: vi.fn(),
  delete: vi.fn(),
};

// Mock useNavigate
export const mockNavigate = vi.fn();

// Mock useAuth
export const mockUseAuth = {
  isAuthenticated: false,
  user: null,
  login: vi.fn(),
  logout: vi.fn(),
};

// Re-export everything
export * from "@testing-library/react";
export { customRender as render };
