import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import App from "../src/App.tsx"

test("changing wall width updates recommendation live without submit", async () => {
  const user = userEvent.setup()
  render(<App />)
  expect(screen.getByText(/Enter your wall dimensions/i)).toBeInTheDocument()
  const widthInput = document.getElementById("wall-0-width") as HTMLInputElement
  await user.type(widthInput, "12")
  const heightInput = document.getElementById("wall-0-height") as HTMLInputElement
  await user.type(heightInput, "8")
  // after typing 12x8 =96, should show 1 gallon (96/400 ceil1) with breakdown
  expect(await screen.findByText(/Buy 1 gallon/i)).toBeInTheDocument()
  expect(screen.getByText(/Gross wall area/i)).toBeInTheDocument()
})
