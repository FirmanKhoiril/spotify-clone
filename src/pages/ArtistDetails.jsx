import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { useGetArtistDetailQuery } from "../redux/services/shazamCore";

const ArtistDetails = () => {
  const { id: artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data: artistData, isFetching: isFetchingArtistDetails, error } = useGetArtistDetailQuery(artistId);

  if (isFetchingArtistDetails) return <Loader title="Loading Artist details" />;

  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <DetailsHeader artistId={artistId} artistData={artistData} />

      <RelatedSongs artistId={artistId} data={Object.values(artistData?.songs)} isPlaying={isPlaying} activeSong={activeSong} />
    </div>
  );
};

export default ArtistDetails;
