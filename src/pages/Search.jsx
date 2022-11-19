import React from "react";
import { useSelector } from "react-redux";
import { Error, Loader, SongCard } from "../components";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";
import { useParams } from "react-router-dom";
import { useGetSearchTermQuery } from "../redux/services/shazamCore";

const Search = () => {
  const { searchTerm } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSearchTermQuery(searchTerm);

  if (isFetching) return <Loader title="Loading Top Charts" />;
  if (error && country) return <Error />;

  const songs = data?.tracks?.hits?.map((song) => song.track);

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-2xl text-white mt-4 mb-10 text-left">
        {" "}
        Showing result for <span className="font-black">{searchTerm}</span>
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {songs?.map((song, i) => (
          <SongCard key={song.key} song={song} isPlaying={isPlaying} activeSong={activeSong} data={data} i={i} />
        ))}
      </div>
    </div>
  );
};

export default Search;
