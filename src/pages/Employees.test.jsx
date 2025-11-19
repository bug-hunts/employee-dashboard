import axios from "axios";
import Employees from "./Employees";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import "@testing-library/jest-dom/vitest";

// 🧩 Mock axios globally
vi.mock("axios");

beforeEach(() => {
  vi.clearAllMocks();
});

describe("Employees Component", () => {
  it("renders loading state and fetches employees", async () => {
    axios.get.mockResolvedValueOnce({ data: [] });

    render(<Employees />);
    expect(screen.getByText("Loading employees...")).toBeInTheDocument();

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalled();
    });
  });

  it("displays fetched employees", async () => {
    axios.get.mockResolvedValueOnce({
      data: [
        { id: 1, name: "John Doe", role: "Developer", department: "Engineering", status: "Active" },
        { id: 2, name: "Jane Smith", role: "Designer", department: "Design", status: "Inactive" },
      ],
    });

    render(<Employees />);

    // Wait for fetched employees to appear
    expect(await screen.findByText("John Doe")).toBeInTheDocument();
    expect(await screen.findByText("Jane Smith")).toBeInTheDocument();
  });

  it("filters employees based on search term", async () => {
    axios.get.mockResolvedValueOnce({
      data: [
        { id: 1, name: "John Doe", role: "Developer", department: "Engineering", status: "Active" },
        { id: 2, name: "Jane Smith", role: "Designer", department: "Design", status: "Inactive" },
      ],
    });

    render(<Employees />);

    const searchInput = await screen.findByPlaceholderText("Search employees...");
    await screen.findByText("John Doe");
    await screen.findByText("Jane Smith");

    await userEvent.type(searchInput, "John");

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.queryByText("Jane Smith")).not.toBeInTheDocument();
  });

  it("adds a new employee successfully", async () => {
    vi.stubGlobal("alert", vi.fn());
    vi.stubEnv("VITE_API_BASE_URL", "http://test-api/employees");

    axios.get.mockResolvedValueOnce({
      data: [
        { id: 1, name: "John Doe", role: "Developer", department: "Engineering", status: "Active" },
      ],
    });

    axios.post.mockResolvedValueOnce({
      data: {
        id: 2,
        name: "Jane Gourd",
        role: "Designer",
        department: "Design",
        status: "Active",
      },
    });

    render(<Employees />);

    // Wait for existing employees
    await screen.findByText("John Doe");

    // Open modal
    await userEvent.click(screen.getByText("+ Add Employee"));

    // Fill form
    await userEvent.type(screen.getByPlaceholderText("Employee Name"), "Jane Gourd");
    await userEvent.type(screen.getByPlaceholderText("Role / Job Title"), "Designer");
    await userEvent.type(screen.getByPlaceholderText("Department"), "Design");

    // Submit form
    await userEvent.click(screen.getByRole("button", { name: /^Add Employee$/i }));

    // Verify API call
    expect(axios.post).toHaveBeenCalledWith(
      expect.any(String),
      {
        name: "Jane Gourd",
        role: "Designer",
        department: "Design",
        status: "Active",
      }
    );

    // Verify new employee renders
    await screen.findByText("Jane Gourd");
  });

  it("deletes an employee successfully", async () => {
    vi.stubGlobal("confirm", () => true);

    axios.get.mockResolvedValueOnce({
      data: [
        { id: 1, name: "John Doe", role: "Developer", department: "Engineering", status: "Active" },
      ],
    });

    axios.delete.mockResolvedValueOnce({});

    render(<Employees />);

    await screen.findByText("John Doe");
    await userEvent.click(screen.getByRole("button", { name: /delete/i }));

    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalled();
    });
  });
});
