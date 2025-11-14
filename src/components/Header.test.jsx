import {render, screen} from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import "@testing-library/jest-dom/vitest";

import { AppProvider } from '../context/AppContext';
import Header from './Header.jsx';

describe('Header Component', () => {
    it('renders the system title', () => {
        render(
            <AppProvider>
                <Header />
            </AppProvider>
        );
        expect(screen.getByText('Employee Management Dashboard')).toBeInTheDocument();
    });

    it('displays the default user name', () => {
        render(
            <AppProvider>
                <Header />
            </AppProvider>
        );
        expect(screen.getByText('Welcome, Guest')).toBeInTheDocument();
    });

});