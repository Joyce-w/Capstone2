import { render, fireEvent, screen } from "@testing-library/react";
import {MemoryRouter} from 'react-router-dom'
import Plant from "../Plants/Plant";

it("renders w/o crashing", () => {
    render(<MemoryRouter><Plant/></MemoryRouter>)
})

it("matches snapshot", function () {
    const { asFragment } = render(<MemoryRouter><Plant /></MemoryRouter>);
    expect(asFragment()).toMatchSnapshot();
})

test("if static text is on the page", () => {
    const { getByText,debug } = render(<MemoryRouter><Plant /></MemoryRouter>);

    let height = getByText("Max Height");
    let notes = getByText("Additional Notes");

    expect(height).toBeInTheDocument();
    expect(notes).toBeInTheDocument();
})
