import { render, fireEvent, screen } from "@testing-library/react";
import {MemoryRouter} from 'react-router-dom'
import NavBar from "../NavBar";

it("renders w/o crashing", () => {
    render(<MemoryRouter><NavBar/></MemoryRouter>)
})

it("matches snapshot", function () {
    const { asFragment } = render(<MemoryRouter><NavBar /></MemoryRouter>);
    expect(asFragment()).toMatchSnapshot();
})

test("if links are on the page", () => {
    const { getByText } = render(<MemoryRouter><NavBar /></MemoryRouter>);

    let browse = getByText("Browse Plants");
    let explore = getByText("Explore");
    let logo = getByText("Plant + Pot");

    expect(browse).toBeInTheDocument();
    expect(explore).toBeInTheDocument();
    expect(logo).toBeInTheDocument();
})
