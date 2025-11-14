import axios from "axios";
import Employees from "./Employees";
import {render, screen} from '@testing-library/react';
import { it, expect } from 'vitest';
import "@testing-library/jest-dom/vitest";
vi.mock("axios");

// Mock axios methods used in Employees.jsx

it('fetch and display employees', async () => {
    axios.get.mockResolvedValueOnce({   data: [ 
        { id: 1, name: "John Doe", role: "Developer", department: "Engineering", status: "Active" }]});

    render(<Employees />);
    expect(await screen.findByText("John Doe")).toBeInTheDocument();

});