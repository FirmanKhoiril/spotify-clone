import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import { useGetSongDetailsQuery, useGetSongRelatedQuery } from "../redux/services/shazamCore";

const SongDetails = () => {
  const dispatch = useDispatch();
  const { songid } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data: songData, isFetching: isFetchingSongDetails, error } = useGetSongDetailsQuery({ songid });
  const { data, isFetching: isFetchingRelatedDetails } = useGetSongRelatedQuery({ songid });

  if (isFetchingSongDetails || isFetchingRelatedDetails) return <Loader title="Searching song details" />;

  if (error) return <Error />;

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
    // trigger ngeplay music
  };

  return (
    <div className="flex flex-col">
      <DetailsHeader artistId="" songData={songData} />
      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lyrics:</h2>
        <div className="mt-5">
          {songData?.sections[1].type === "LYRICS" ? (
            songData?.sections[1].text.map((line, i) => (
              <p key={`lyrics-${line}-${i}`} className="text-gray-300 text-base my-1">
                {line}
              </p>
            ))
          ) : (
            <p className="text-gray-300 text-base my-1">Sorry, No Lyrics Found</p>
          )}
        </div>
      </div>
      <RelatedSongs data={data} isPlaying={isPlaying} activeSong={activeSong} handlePauseClick={handlePauseClick} handlePlayClick={handlePlayClick} />
    </div>
  );
};

export default SongDetails;
