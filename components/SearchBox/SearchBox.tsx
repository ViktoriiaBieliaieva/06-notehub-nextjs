import css from './SearchBox.module.css';

interface SearchBoxProps {
  onUpdate: (value: string) => void;
}

export default function SearchBox({ onUpdate }: SearchBoxProps) {
  return (
    <input
      onChange={e => onUpdate(e.target.value)}
      className={css.input}
      type="text"
      placeholder="Search notes"
    />
  );
}
