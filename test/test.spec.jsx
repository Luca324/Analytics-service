import { describe, expect, test, afterEach, beforeEach, vi } from "vitest"
import { render, screen, cleanup, waitFor } from "@testing-library/react"
import events from "@testing-library/user-event"
import { MemoryRouter } from "react-router-dom"
import { fetchReportData, downloadTextAsScvFile } from "../src/services/generatorService"
import { aggregatedDataReader } from "../src/API/API"
import History from "../src/pages/History/History"
import Generator from "../src/pages/Generator/Generator"
import Uploader from "../src/pages/Uploader/Uploader"
import { input } from "@testing-library/user-event/dist/cjs/event/input.js"
vi.mock("../src/API/API.js", () => ({
  aggregatedDataReader: vi.fn(),
}))

const mockHistory = {
  1750601398945: {
    status: "success",
    fileName: "report1.csv",
    stats:
      '{"total_spend_galactic":15613050.5,"rows_affected":31200,"less_spent_at":236,"big_spent_at":266,"less_spent_value":29769,"big_spent_value":59499,"average_spend_galactic":500.41828525641023,"big_spent_civ":"monsters","less_spent_civ":"humans"}',
  },
}

const mockRemoveHistoryItem = vi.fn()
const mockClearHistory = vi.fn()
// Мокаем хранилище
vi.mock("../src/store/HistoryStore.js", () => ({
  useHistoryStore: vi.fn(() => ({
    history: mockHistory,
    clearHistory: vi.fn(),
    removeHistoryItem: mockRemoveHistoryItem,
    clearHistory: mockClearHistory,
  })),
}))

vi.mock("../src/store/TabStore.js", () => ({
  useTabStore: vi.fn(() => ({
    activeTab: "uploader",
    setActiveTab: vi.fn(),
  })),
}))

vi.mock("../src/services/generatorService", {
  fetchReportData: vi.fn(),
  downloadTextAsScvFile: vi.fn(),
})
// Автоматическая очистка после каждого теста
afterEach(cleanup)

describe("Generator", () => {
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

    await waitFor(() => {
      expect(queryByText("total")).toBeNull()
    })
  })
})

describe("History", () => {
  beforeEach(() => {
    // Мокаем useHistoryStore с чистым состоянием перед каждым тестом
    vi.mock("../src/store/HistoryStore", () => ({
      useHistoryStore: vi.fn(() => ({
        history: mockHistory,
        clearHistory: mockClearHistory,
        removeHistoryItem: mockRemoveHistoryItem,
      })),
    }))
  })

  afterEach(() => {
    vi.clearAllMocks() // Очищаем моки после каждого теста
  })
  test("отображает все элементы истории", () => {
    const { queryByText } = render(
      <MemoryRouter>
        <History />
      </MemoryRouter>
    )
    expect(queryByText("report1.csv")).not.toBeNull()
  })
  test("отображает кнопки управления", () => {
    const { queryByText } = render(
      <MemoryRouter>
        <History />
      </MemoryRouter>
    )
    expect(queryByText("Сгенерировать больше")).not.toBeNull()
    expect(queryByText("Очистить всё")).not.toBeNull()
  })

  test("вызывает удаление элемента при клике на корзину", async () => {
    const { queryAllByTestId } = render(
      <MemoryRouter>
        <History />
      </MemoryRouter>
    )
    const deleteButtons = queryAllByTestId("remove")

    await events.click(deleteButtons[0])
    expect(mockRemoveHistoryItem).toHaveBeenCalledWith("1750601398945")
  })

  test('вызывает очистку истории при клике на "Очистить всё"', async () => {
    const { getByText } = render(
      <MemoryRouter>
        <History />
      </MemoryRouter>
    )
    
    await events.click(getByText('Очистить всё'));
    expect(mockClearHistory).toHaveBeenCalled();
  });

   
})
