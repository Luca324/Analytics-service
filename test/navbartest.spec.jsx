import { describe, expect, test, afterEach, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import events from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from "../src/App";
import Navbar from "../src/components/Navbar/Navbar";
import Uploader from "../src/pages/Uploader/Uploader";
import Generator from "../src/pages/Generator/Generator";
import History from "../src/pages/History/History";

// Мокаем страницы, чтобы проверить их рендеринг
vi.mock("../src/pages/Uploader/Uploader", () => ({
  default: () => <div data-testid="uploader-page">Uploader</div>,
}));

vi.mock("../src/pages/Generator/Generator", () => ({
  default: () => <div data-testid="generator-page">Generator</div>,
}));

vi.mock("../src/pages/History/History", () => ({
  default: () => <div data-testid="history-page">History</div>,
}));

// Мокаем TabStore
vi.mock("../src/store/TabStore.js", () => ({
  useTabStore: vi.fn(() => ({
    activeTab: "uploader",
    setActiveTab: vi.fn(),
  })),
}));

afterEach(cleanup);

describe("App Navigation", () => {
  test("по умолчанию рендерится Uploader", () => {
    const { queryByTestId } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(queryByTestId("uploader-page")).not.toBeNull();
    expect(queryByTestId("generator-page")).toBeNull();
    expect(queryByTestId("history-page")).toBeNull();
  });

  test("при клике на 'CSV Генератор' рендерится Generator", async () => {
    const { queryByTestId, getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    await events.click(getByText("CSV Генератор"));

    expect(queryByTestId("uploader-page")).toBeNull();
    expect(queryByTestId("generator-page")).not.toBeNull();
    expect(queryByTestId("history-page")).toBeNull();
  });

  test("при клике на 'История' рендерится History", async () => {
    const { queryByTestId, getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    await events.click(getByText("История"));

    expect(queryByTestId("uploader-page")).toBeNull();
    expect(queryByTestId("generator-page")).toBeNull();
    expect(queryByTestId("history-page")).not.toBeNull();
  });

  test("при клике на 'CSV Аналитик' рендерится Uploader", async () => {
    // Начинаем с другой страницы, чтобы проверить переход
    const { queryByTestId, getByText } = render(
      <MemoryRouter initialEntries={["/generator"]}>
        <App />
      </MemoryRouter>
    );

    await events.click(getByText("CSV Аналитик"));

    expect(queryByTestId("uploader-page")).not.toBeNull();
    expect(queryByTestId("generator-page")).toBeNull();
    expect(queryByTestId("history-page")).toBeNull();
  });
});