import { useDispatch, useSelector } from "react-redux";
import { Error, Loader, SongCard } from "../components";
import { genres } from "../assets/constants";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";
import { selectGenreListId } from "../redux/features/playerSlice";
import { useGetSongsByGenreQuery } from "../redux/services/shazamCore";

const Discover = () => {
  const dispatch = useDispatch();
  // dispatch for modify the state
  const { activeSong, isPlaying, genreListId } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsByGenreQuery(genreListId || "POP");
  // IS FECTHING UNTUK ketika ngefetching show menampilkan loading state

  if (isFetching) return <Loader title="Loading Song..." />;
  // ketika ngefecthing tampilkan loading
  if (error) return <Error />;
  // ketika Error
  const genreTitle = genres.find(({ value }) => value === genreListId)?.title;

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h3 className="font-bold text-2xl text-gray-50">Discover {genreTitle}</h3>
        <select onChange={(e) => dispatch(selectGenreListId(e.target.value))} value={genreListId || "pop"} className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-4">
          {genres.map((genre) => (
            <option key={genre.value} value={genre.value}>
              {genre.title}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map((song, i) => (
          <SongCard isPlaying={isPlaying} activeSong={activeSong} key={song.key} song={song} i={i} data={data} />
        ))}
      </div>
    </div>
  );
};

export default Discover;
