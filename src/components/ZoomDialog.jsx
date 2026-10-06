import { useEffect, useRef } from 'react';

/** Full-size catalogue viewer. `item` is a category; null closes it. */
export default function ZoomDialog({ item, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    const d = ref.current;
    if (item && !d.open) d.showModal();
    if (!item && d.open) d.close();
  }, [item]);

  return (
    <dialog ref={ref} onClose={onClose} onClick={e => { if (e.target === ref.current) ref.current.close(); }}>
      {item && (
        <>
          <div className="dh">
            <h3>{item.dialogTitle}</h3>
            <button className="x" aria-label="Close" onClick={() => ref.current.close()}>✕</button>
          </div>
          <img src={item.gallery} alt={`${item.dialogTitle} catalogue`} />
        </>
      )}
    </dialog>
  );
}
