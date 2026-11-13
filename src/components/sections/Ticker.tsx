import { ticker } from "@/data/team";

export default function Ticker() {
  const list = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined}>
      {ticker.map((word) => (
        <li key={word}>{word}</li>
      ))}
    </ul>
  );

  return (
    <div className="ticker-wrap" aria-label="What we make">
      <div className="ticker">
        {list(false)}
        {list(true)}
      </div>
    </div>
  );
}
