import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react';
import events from '@testing-library/user-event';
import { fireEvent } from '@testing-library/react';
import Generator from '../src/pages/Generator/Generator'

test('отображает описание и кнопку в начальном состоянии', () => {
  render(<Generator />);
  
  // Проверка текста
  const description = screen.queryByText('Сгенерируйте готовый csv-файл нажатием одной кнопки');
  expect(description).not.toBeNull();
  
  // Проверка кнопки
  const button = screen.queryByTestId('start-gen-btn');
  expect(button).not.toBeNull();
  expect(button?.textContent).toBe('Начать генерацию');
});
