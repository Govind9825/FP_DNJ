import React, { useContext , useEffect} from 'react';
import notecontext from '../Context/notes/NoteContext';
import Noteitem from './Noteitem';

export default function YourNotes() {
    const context = useContext(notecontext);
    const { notes , fetchAllNotes} = context;

    useEffect(() => {
        fetchAllNotes();
        // eslint-disable-next-line
      }, []);

    return (
        <div className='container my-3'>
            <h1>Your Notes</h1>
            {notes && notes.length === 0 ? (
                <p>No notes to display</p>
            ) : (
                notes && notes.map((note) => (
                    <Noteitem note={note} />
                ))
            )}
        </div>
    );
}
