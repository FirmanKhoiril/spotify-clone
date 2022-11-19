import React from "react";
import { ArtistCard, Error, Loader, SongCard } from "../components";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";

const TopArtist = () => {
  const { data, isFetching, error } = useGetTopChartsQuery();

  if (isFetching) return <Loader title="Loading Top Artist" />;
  if (error && country) return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-2xl text-white mt-4 mb-10 text-left">Discover Top Artist</h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map((track) => (
          <ArtistCard key={track.key} track={track} />
        ))}
      </div>
    </div>
  );
};

export default TopArtist;
