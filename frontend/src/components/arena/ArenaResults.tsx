import { type BattleResult, type Judge } from "../../app/battle.types";
import MarkdownBlock from "./MarkdownBlock";

type ArenaResultsProps = {
  result: BattleResult;
};

const winnerLabel = (judge: Judge) => {
  if (judge.solution_1_score === judge.solution_2_score) {
    return "Draw";
  }

  return judge.solution_1_score > judge.solution_2_score
    ? "Winner: Solution 1"
    : "Winner: Solution 2";
};

const ArenaResults = ({ result }: ArenaResultsProps) => {
  const { payload } = result;

  return (
    <section className="arena-results">
      <article className="arena-problem">
        <span>Problem</span>
        <h2>{payload.problem}</h2>
      </article>

      <article className="arena-card arena-card--left">
        <div className="arena-card__meta">
          <h3>Solution 1</h3>
          <strong>{payload.judge.solution_1_score}/10</strong>
        </div>
        <div className="arena-markdown">
          <MarkdownBlock content={payload.solution_1} />
        </div>
      </article>

      <article className="arena-card arena-card--right">
        <div className="arena-card__meta">
          <h3>Solution 2</h3>
          <strong>{payload.judge.solution_2_score}/10</strong>
        </div>
        <div className="arena-markdown">
          <MarkdownBlock content={payload.solution_2} />
        </div>
      </article>

      <article className="arena-judge">
        <div className="arena-judge__head">
          <h3>Judge Recommendation</h3>
          <span>{winnerLabel(payload.judge)}</span>
        </div>
        <div className="arena-judge__reasoning">
          <div>
            <h4>Solution 1 Reasoning</h4>
            <div className="arena-markdown">
              <MarkdownBlock content={payload.judge.solution_1_reasoning} />
            </div>
          </div>
          <div>
            <h4>Solution 2 Reasoning</h4>
            <div className="arena-markdown">
              <MarkdownBlock content={payload.judge.solution_2_reasoning} />
            </div>
          </div>
        </div>
      </article>
    </section>
  );
};

export default ArenaResults;
