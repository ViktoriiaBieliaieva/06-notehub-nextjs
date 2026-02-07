'use client';

import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import css from './NotesPage.module.css';
import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { Toaster, toast } from 'react-hot-toast';
import Pagination from '../../components/Pagination/Pagination';
import SearchBox from '../../components/SearchBox/SearchBox';
import Modal from '../../components/Modal/Modal';
import NoteForm from '../../components/NoteForm/NoteForm';
import NoteList from '../../components/NoteList/NoteList';
import Loading from '../loading';

const NotesClient = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', searchQuery, page],
    queryFn: () => fetchNotes(searchQuery, page),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const updateSearchQuery = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
    setPage(1);
  }, 300);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (isError) {
      toast.error('There was an error, please try again...');
    }
  }, [isError]);

  return (
    <div className={css.app}>
      <Toaster position="top-right" />
      <header className={css.toolbar}>
        <SearchBox
          value={inputValue}
          onChange={value => {
            setInputValue(value);
            updateSearchQuery(value);
          }}
        />
        {data && data.totalPages > 1 && (
          <Pagination totalPages={data.totalPages} setPage={setPage} page={page} />
        )}
        <button onClick={openModal} className={css.button}>
          Create note +
        </button>
        {isModalOpen && (
          <Modal onClose={closeModal}>
            <NoteForm onClose={closeModal} />
          </Modal>
        )}
      </header>
      {isLoading && <Loading />}

      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
    </div>
  );
};

export default NotesClient;
