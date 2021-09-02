import { render, fireEvent, screen } from "@testing-library/react";
import {MemoryRouter} from 'react-router-dom'
import Home from "../Home";

it("renders w/o crashing", () => {
    render(<MemoryRouter><Home/></MemoryRouter>)
})

it("matches snapshot", function () {
    const { asFragment } = render(<MemoryRouter><Home /></MemoryRouter>);
    expect(asFragment()).toMatchSnapshot();
})

test("if links are on the page", () => {
    const { getByText } = render(<MemoryRouter><Home /></MemoryRouter>);

    let signupBtn = getByText("Signup");
    let quiz = getByText("Start Quiz");
    let header = getByText("Plant + Pot");

    expect(signupBtn).toBeInTheDocument();
    expect(quiz).toBeInTheDocument();
    expect(header).toBeInTheDocument();
})

test("redirects to correct component", async () => {
    const { getByText, getByLabelText, debug } = render(<MemoryRouter><Home /></MemoryRouter>);

    //toggle button to direct to signup page
    // let signupBtn = getByText("Signup");
    // fireEvent.click(signupBtn);
    // fireEvent.click(getByLabelText(/Signup/))
    // const inputNode = screen.getByLabelText('Email', {selector: 'input'})
    // expect(inputNode).toBeInTheDocument();
})