import { describe, expect, test, afterEach, vi } from "vitest";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import events from "@testing-library/user-event";
import { fireEvent } from "@testing-library/react";
import {
  fetchReportData,
  downloadTextAsScvFile,
} from "../src/services/generatorService";

// мокаем функции для генерации репорта и для его последующего скачивания
vi.mock("../src/services/generatorService", {
  fetchReportData: vi.fn(),
  downloadTextAsScvFile: vi.fn(),
});
import Generator from "../src/pages/Generator/Generator";

// Автоматическая очистка после каждого теста
afterEach(cleanup);

describe("Generator", () => {
  test("при рендеринге кнопка в начальном состоянии", () => {
    // arrange
    const { getByTestId } = render(<Generator />);

    // assert
    expect(getByTestId("start-gen-btn")).not.toBeNull();
  });

  test("кнопка блокируется при клике и показывает загрузку", async () => {
    //arrange
    const { queryByTestId, queryByText } = render(<Generator />);

    // act
    await events.click(queryByTestId("start-gen-btn"));

    // assert
    expect(queryByTestId("start-gen-btn")).toBeNull();
    expect(queryByText("идёт процесс генерации")).not.toBeNull();
  });

  test("после успешной генерации выводится сообщение и начинается скачивание файла", async () => {
    fetchReportData.mockResolvedValue("test,data");
    const { getByText, getByTestId } = render(<Generator />);

    await events.click(getByTestId("start-gen-btn"));

    await waitFor(() => {
      expect(getByText("файл сгенерирован!")).not.toBeNull;
      expect(downloadTextAsScvFile).toHaveBeenCalledWith("test,data");
    });
  });

  test("при ошибке генерации выводится сообщение", async () => {
    fetchReportData.mockRejectedValue(new Error("generating error"));
    const { getByTestId, queryByTestId } = render(<Generator />);

    await events.click(getByTestId("start-gen-btn"));

    expect(queryByTestId("err-msg")).not.toBeNull();
  });
});
