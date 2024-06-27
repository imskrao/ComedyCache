// src/redux/jokeSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState, AppDispatch } from "./store"; // Correct import path
import axios from "axios";
import _ from "lodash";

interface Language {
  code: string;
  name: string;
}

interface JokeState {
  joke: string;
  loading: boolean;
  error: string | null;
  languages: Language[];
}

const initialState: JokeState = {
  joke: "",
  loading: false,
  error: null,
  languages: [],
};

const jokeSlice = createSlice({
  name: "joke",
  initialState,
  reducers: {
    fetchJokeStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchJokeSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.joke = action.payload;
    },
    fetchJokeFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    setLanguages(state, action: PayloadAction<Language[]>) {
      state.languages = action.payload;
      state.loading = false;
    },
    startLoader(state) {
      state.loading = true;
    },
    stopLoader(state) {
      state.loading = false;
    },
  },
});

export const {
  fetchJokeStart,
  fetchJokeSuccess,
  fetchJokeFailure,
  setLanguages,
  startLoader,
  stopLoader,
} = jokeSlice.actions;

export const fetchRandomJoke =
  (language: string, category: string): AppThunk<void> =>
    async (dispatch) => {
      try {
        dispatch(fetchJokeStart());
        const response = await axios.get(
          `https://v2.jokeapi.dev/joke/${category}?lang=${language}`
        );
        const joke =
          response.data.joke ||
          `${response.data.setup} - ${response.data.delivery}`;
        dispatch(fetchJokeSuccess(joke));
      } catch (error) {
        dispatch(fetchJokeFailure("Failed to fetch joke."));
      }
    };

export const fetchLanguages = (): AppThunk<void> => async (dispatch) => {
  try {
    dispatch(startLoader());
    const response = await axios.get("https://v2.jokeapi.dev/languages");
    debugger;

    const supportedLanguage: string[] = _.get(response, "data.jokeLanguages", []);
    const possilbleLanguage: Language[] = _.get(response, 'data.possibleLanguages', []);
    const newSupportedLanguage: Language[] = _.filter(possilbleLanguage, lang => _.includes(supportedLanguage, lang.code));

  console.log(newSupportedLanguage);

    dispatch(setLanguages(newSupportedLanguage));
  } catch (error) {
    console.error("Error fetching languages:", error);
    // You might want to dispatch an error action here as well
  }
};

export default jokeSlice.reducer;
