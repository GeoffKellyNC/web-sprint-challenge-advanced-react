import { render, fireEvent, screen } from '@testing-library/react';
import AppFunctional from './AppFunctional';
import React from 'react';

// Write your tests here
test('sanity', () => {
  expect(true).toBe(false)
})

test('move up', () => {
  const { getByText } = render(<AppFunctional />)
  const upButton = getByText('up')
  fireEvent.click(upButton)
  expect(getByText('1')).toBeInTheDocument()
})

test('move down', () => {
  const { getByText } = render(<AppFunctional />)
  const downButton = getByText('down')
  fireEvent.click(downButton)
  expect(getByText('7')).toBeInTheDocument()
})

test('coordinates show up', () => {
  render (<AppFunctional />)
  expect(screen.getByText('coordinates')).toBeInTheDocument()
})

test('coordinates change', () => {
  const { getByText } = render(<AppFunctional />)
  const upButton = getByText('up')
  fireEvent.click(upButton)
  expect(getByText('0,1')).toBeInTheDocument()
})

test('steps show up', () => {
  render (<AppFunctional />)
  expect(screen.getByText('steps')).toBeInTheDocument()
})






