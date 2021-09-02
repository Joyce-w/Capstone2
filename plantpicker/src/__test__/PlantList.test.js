import { render, fireEvent, screen } from "@testing-library/react";
import {MemoryRouter} from 'react-router-dom'
import PlantList from "../Plants/PlantList";

it("renders w/o crashing", () => {
    render(<MemoryRouter><PlantList/></MemoryRouter>)
})

it("matches snapshot", function () {
    const { asFragment } = render(<MemoryRouter><PlantList /></MemoryRouter>);
    expect(asFragment()).toMatchSnapshot();
})

test("if links are on the page", () => {
    const { getByText } = render(<MemoryRouter><PlantList /></MemoryRouter>);

    let h1 = getByText("Category of Plants");
    let pothos = getByText("Pothos");

    expect(h1).toBeInTheDocument();
})
