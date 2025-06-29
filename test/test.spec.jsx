import { describe, expect, test, afterEach, beforeEach, vi } from "vitest"
import { render, screen, cleanup, waitFor } from "@testing-library/react"
import events from "@testing-library/user-event"
import { fetchReportData, downloadTextAsScvFile } from "../src/services/generatorService"
import { aggregatedDataReader } from "../src/API/API"
import { useHistoryStore } from "../src/store/HistoryStore.js"
import Generator from "../src/pages/Generator/Generator"
import Uploader from "../src/pages/Uploader/Uploader"
import { input } from "@testing-library/user-event/dist/cjs/event/input.js"

// Мокаем хранилище
vi.mock("../src/store/index.js", () => ({
  useHistoryStore: vi.fn(),
}))

// Автоматическая очистка после каждого теста
afterEach(cleanup)

describe("Generator", () => {
  vi.mock("../src/services/generatorService", {
    fetchReportData: vi.fn(),
    downloadTextAsScvFile: vi.fn(),
  })

  test("при рендеринге кнопка в начальном состоянии", () => {
    // arrange
    const { getByTestId } = render(<Generator />)

    // assert
    expect(getByTestId("start-gen-btn")).not.toBeNull()
  })

  test("кнопка блокируется при клике и показывает загрузку", async () => {
    //arrange
    const { queryByTestId, queryByText } = render(<Generator />)

    // act
    await events.click(queryByTestId("start-gen-btn"))

    // assert
    expect(queryByTestId("start-gen-btn")).toBeNull()
    expect(queryByText("идёт процесс генерации")).not.toBeNull()
  })

  test("после успешной генерации выводится сообщение и начинается скачивание файла", async () => {
    fetchReportData.mockResolvedValue("test,data")
    const { getByText, getByTestId } = render(<Generator />)

    await events.click(getByTestId("start-gen-btn"))

    await waitFor(() => {
      expect(getByText("файл сгенерирован!")).not.toBeNull
      expect(downloadTextAsScvFile).toHaveBeenCalledWith("test,data")
    })
  })

  test("при ошибке генерации выводится сообщение", async () => {
    fetchReportData.mockRejectedValue(new Error("generating error"))
    const { getByTestId, queryByTestId } = render(<Generator />)

    await events.click(getByTestId("start-gen-btn"))

    expect(queryByTestId("err-msg")).not.toBeNull()
  })
})

describe("Analytics", () => {
  vi.mock("../src/API/API.js", () => ({
    aggregatedDataReader: vi.fn(),
  }))

  beforeEach(() => {
    // Настраиваем мок хранилища
    useHistoryStore.mockReturnValue({
      history: {},
      addHistoryItem: vi.fn(),
      clearHistory: vi.fn(),
    })
  })

  test("при рендеринге интерфейс в начальном состоянии", () => {
    const { queryByText } = render(<Uploader />)

    expect(queryByText("Отправить").disabled).toBe(true)
    expect(queryByText("Загрузите файл")).not.toBeNull()
  })

  test("при загрузке файла интерфейс обновляется"),
    async () => {
      const { queryByTestId } = render(<Uploader />)

      const fileName = "test.csv"
      input(queryByTestId("input-file"), {
        target: { files: [new File(["content"], fileName)] },
      })

      expect(queryByText("Отправить").disabled).toBe(false)
      expect(queryByTestId(fileName)).not.toBeNull()
    }

  test("при отправке файла отображается загрузка"),
    async () => {
      const { queryByTestId } = render(<Uploader />)

      const fileName = "test.csv"
      input(queryByTestId("input-file"), {
        target: { files: [new File(["content"], fileName)] },
      })

      await click(queryByText("Отправить"))

      expect(queryByText("Отправить")).toBeNull()
      expect(queryByTestId("loading")).not.toBeNull()
    }

    test("после успешной обработки показывает статистику", async () => {
    const mockReader = {
      read: vi
        .fn()
        .mockResolvedValueOnce({ done: false, value: new TextEncoder().encode('{"total":100}') })
        .mockResolvedValue({ done: true }),
    }
    aggregatedDataReader.mockResolvedValue(mockReader)

    const { getByTestId, getByText, queryByText } = render(<Uploader />)

    input(getByTestId("input-file"), {
      target: { files: [new File(["content"], "test.csv")] },
    })

    await events.click(getByText("Отправить"))

    screen.logTestingPlaygroundURL()

    await waitFor(() => {
      expect(queryByText("total")).toBeNull()
    })
  })

})
