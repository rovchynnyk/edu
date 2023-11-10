import { useCallback, useState } from 'react';
import ReactModal from 'react-modal';

type PropsT = Readonly<{
  modalIsOpen: boolean;
  toggleModal: () => void;
  onAddBookmark: (bookmark: string) => void;
}>;

export const NoteModal = ({
  modalIsOpen,
  toggleModal,
  onAddBookmark,
}: PropsT) => {
  const [bookmarkNote, setBookmarkNote] = useState('');

  const handleChangeBookmarkNote = (
    ev: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setBookmarkNote(ev.target.value);
  };

  const handleAddBookmark = useCallback(() => {
    onAddBookmark(bookmarkNote);
    setBookmarkNote('');
    toggleModal();
  }, [bookmarkNote, onAddBookmark, toggleModal]);

  return (
    <ReactModal
      isOpen={modalIsOpen}
      style={{
        overlay: {
          backgroundColor: 'rgba(49, 56, 72, 0.6)',
        },
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      }}
    >
      <button className="block mb-12 text-4xl" onClick={toggleModal}>
        &#10229;
      </button>

      <textarea
        className="border-2 border-solid border-gray rounded p-8 mb-12"
        placeholder="Set your note"
        value={bookmarkNote}
        onChange={handleChangeBookmarkNote}
      />

      <button
        className="bg-orange text-white py-8 px-40 rounded-lg font-bold block"
        onClick={handleAddBookmark}
        disabled={!bookmarkNote}
      >
        Add Note
      </button>
    </ReactModal>
  );
};
