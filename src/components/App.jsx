import SearchBar from "./SearchBar/SearchBar";
import Loader from "./Loader/Loader";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import ImageGallery from "./ImageGallery/ImageGallery";
import LoadMoreBtn from "./LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./ImageModal/ImageModal";
import { searchImages } from "../unSplashApi";

import { useState } from "react";

import ReactModal from "react-modal";

export default function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState("");
  const [more, setMore] = useState(false);
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(false);
  const [currentImage, setCurrentImage] = useState({});
  ReactModal.setAppElement("#root");

  async function getImages(filter, page) {
    if (filter.trim() === "") {
      alert("You need to enter search querry!");
      return;
    }

    setPage(page);
    setFilter(filter);
    setMore(false);

    try {
      setError(false);
      setLoading(true);
      const imageArray = await searchImages(filter, page, 12);
      if (page === 1) {
        //new search
        setImages(imageArray.results);
      } else {
        setImages([...images, ...imageArray.results]);
      }

      if (imageArray.total_pages > page) {
        setMore(true);
      }
      console.log(imageArray);
    } catch (error) {
      if (page === 1) {
        //new search
        setImages([]);
      }
      setError(true);
      console.log("error: ", error);
    } finally {
      setLoading(false);
    }
  }

  function openModal(image) {
    setCurrentImage(image);
    setModal(true);
  }

  function closeModal() {
    setModal(false);
  }

  return (
    <>
      <SearchBar onSubmit={getImages}></SearchBar>
      <ImageGallery imagesArray={images} handleClick={openModal} />
      <ImageModal image={currentImage} isOpen={modal} closeModal={closeModal} />
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {more && (
        <LoadMoreBtn onClick={getImages} filter={filter} currentPage={page} />
      )}
    </>
  );
}
