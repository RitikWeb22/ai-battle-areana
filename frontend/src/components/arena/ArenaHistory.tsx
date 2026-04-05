import { type BattleResult } from "../../app/battle.types";

type ArenaHistoryProps = {
  history: BattleResult[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onClear: () => void;
  formatTime: (value: string) => string;
};

const ArenaHistory = ({
  history,
  selectedId,
  onSelect,
  onClear,
  formatTime,
}: ArenaHistoryProps) => {
  return (
    <aside className="arena-history">
      <div className="arena-history__header">
        <h2>History</h2>
        <button
          className="arena-history__clear"
          type="button"
          onClick={onClear}
          disabled={!history.length}
        >
          Clear
        </button>
      </div>

      <div className="arena-history__list">
        {history.length === 0 ? (
          <p className="arena-history__empty">No battles yet.</p>
        ) : (
          history.map((item) => (
            <button
              key={item.id}
              className={`arena-history__item ${
                selectedId === item.id ? "is-active" : ""
              }`}
              type="button"
              onClick={() => onSelect(item.id)}
            >
              <span className="arena-history__prompt">
                {item.payload.problem}
              </span>
              <span className="arena-history__time">
                {formatTime(item.createdAt)}
              </span>
            </button>
          ))
        )}
      </div>
    </aside>
  );
};

export default ArenaHistory;
