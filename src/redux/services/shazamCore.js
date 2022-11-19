// fecth api from shazam Rapid
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const shazamCoreApi = createApi({
  reducerPath: "shazamCoreApi", // name of api
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam-core.p.rapidapi.com/v1",
    prepareHeaders: (headers) => {
      headers.set("X-RapidAPI-key", "d7d194e0admshe542491515a969dp172228jsn6684661478ca");

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getSongsByGenre: builder.query({ query: (genre) => `/charts/genre-world?genre_code=${genre}` }),
    getTopCharts: builder.query({ query: () => "/charts/world" }),
    getSongDetails: builder.query({ query: ({ songid }) => `/tracks/details?track_id=${songid}` }),
    getSearchTerm: builder.query({ query: (searchTerm) => `/search/multi?search_type=SONGS_ARTISTS&query=${searchTerm}` }),
    getSongRelated: builder.query({ query: ({ songid }) => `/tracks/related?track_id=${songid}` }),
    getArtistDetail: builder.query({ query: (artistsId) => `/artists/details?artist_id=${artistsId}` }),
    getSongByCountry: builder.query({ query: (countryCode) => `/charts/country?country_code=${countryCode}` }),
  }),
});

export const { useGetSearchTermQuery, useGetSongByCountryQuery, useGetArtistDetailQuery, useGetSongRelatedQuery, useGetSongsByGenreQuery, useGetSongDetailsQuery, useGetTopChartsQuery } = shazamCoreApi;
