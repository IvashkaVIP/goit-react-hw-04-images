import css from './App.module.css';
import React, {useEffect, useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getImages } from './Api/Api';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';
import { ServiceMessage } from './ServiceMessage/ServiceMessage';
// import toasty from 'toasty';
export const IMAGE_PER_PAGE = 12;

export const App = () => {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedImageUrl, setSelectedImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!searchQuery) return;
    apiImages(searchQuery, currentPage);
  }, [searchQuery, currentPage]);

  const handleSubmit = query => {
    if (!query) {
      // toasty.error('The request cannot be empty');
      alert('The request cannot be empty');
      return;
    }
    // this.setState({ images: [], searchQuery: query, currentPage: 1 });
    setImages([]);
    setSearchQuery(query);
    setCurrentPage(1);
  };
  const apiImages = async (query, page) => {
    let data;

    setIsLoading(true);
    try {
      data = await getImages(query, page);
    } catch (er) {
      console.log(er);
    } finally {
      setIsLoading(false);
    }
    setImages(prevIm => [...prevIm, ...data.hits]);
    setTotalPages(data.totalHits);
  };
  const handleOpenModal = evt => {
    setSelectedImageUrl(images[evt.currentTarget.id].largeImageURL);
  };
const isLoadMore = () => {
  return !(
    !searchQuery ||
    currentPage * IMAGE_PER_PAGE >= totalPages ||
    isLoading
  );
};
const handleClickLoadMore = () => setCurrentPage(prevState => (prevState + 1));
  

  
  return (
    <div className={css.App}>
      <Searchbar handleQuery={handleSubmit} />
      {isLoading && <Loader />}
      <ServiceMessage State={{ images, searchQuery, isLoading }} />
      <ImageGallery images={images} onClick={handleOpenModal} />
      {isLoadMore() && <Button onClick={handleClickLoadMore} />}
      {selectedImageUrl && (
        <Modal onClose={setSelectedImageUrl}>
          <img src={selectedImageUrl} alt="" />{' '}
        </Modal>
      )}
    </div>
  );
};
