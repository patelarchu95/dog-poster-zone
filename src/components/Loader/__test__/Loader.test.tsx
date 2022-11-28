import configureStore from "redux-mock-store";
// import "jest-styled-components";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { render, screen } from "@testing-library/react";
import Loader from "..";
import { GlobalStyle, theme } from "../../../lib/theme";
import { ActionType } from "../../../types/reducer";

describe("Loader render correctly using redux mock store", () => {
    test("Loader renders correctly", () => {
        const initState = {
            breed: "all",
            subBreed: "all",
            number: "1",
            imageResults: 0,
            error: false,
        };
        const mockStore = configureStore();
        const dogStore = mockStore(initState);
    
        dogStore.clearActions();
    
        render(
            <Provider store={dogStore}>
                <GlobalStyle />
                <ThemeProvider theme={theme}>
                    <Loader />
                </ThemeProvider>
            </Provider>
        );
            
        const expectedDispatch = {
            type: ActionType.BREED,
            payload: "african",
        };
    
        const loader = screen.getByRole("Loader");
        expect(loader).toBeInTheDocument();
    
        // Dispatch the action
        dogStore.dispatch(expectedDispatch);
    
        // Test to see if the store dispatched the expected action
        const actions = dogStore.getActions();
        expect(actions).toEqual([
            {
                type: ActionType.BREED,
                payload: "african",
            },
        ]);
        expect(actions).not.toEqual([
            {
                type: ActionType.RESET,
            },
        ]);
    });
});