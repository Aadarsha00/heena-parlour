import { useQuery } from "@tanstack/react-query";
import { getAllGalleryImages } from "../../api/gallery.api";

const GalleryAll = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["galleryImages"],
    queryFn: getAllGalleryImages,
  });
  console.log("GAllery", data);

  if (isLoading) return <p>Loading gallery...</p>;
  if (isError) return <p>Error: {(error as Error).message}</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
      <h2>Gallery</h2>
    </div>
  );
};

export default GalleryAll;
