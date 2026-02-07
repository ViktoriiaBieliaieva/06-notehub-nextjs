import css from './SearchBox.module.css';

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBox({ value, onChange }: SearchBoxProps) {
  return (
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
      className={css.input}
      type="text"
      placeholder="Search notes"
    />
  );
}
