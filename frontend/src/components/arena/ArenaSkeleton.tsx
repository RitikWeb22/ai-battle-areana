const ArenaSkeleton = () => {
  return (
    <section className="arena-results arena-skeleton" aria-hidden="true">
      <article className="arena-problem">
        <span>Problem</span>
        <div className="skeleton-line skeleton-line--lg" />
      </article>

      <article className="arena-card arena-card--left">
        <div className="arena-card__meta">
          <h3>Solution 1</h3>
          <strong>--/10</strong>
        </div>
        <div className="skeleton-line skeleton-line--md" />
        <div className="skeleton-line" />
        <div className="skeleton-line" />
      </article>

      <article className="arena-card arena-card--right">
        <div className="arena-card__meta">
          <h3>Solution 2</h3>
          <strong>--/10</strong>
        </div>
        <div className="skeleton-line skeleton-line--md" />
        <div className="skeleton-line" />
        <div className="skeleton-line" />
      </article>

      <article className="arena-judge">
        <div className="arena-judge__head">
          <h3>Judge Recommendation</h3>
          <span>Evaluating...</span>
        </div>
        <div className="arena-judge__reasoning">
          <div>
            <h4>Solution 1 Reasoning</h4>
            <div className="skeleton-line" />
            <div className="skeleton-line" />
          </div>
          <div>
            <h4>Solution 2 Reasoning</h4>
            <div className="skeleton-line" />
            <div className="skeleton-line" />
          </div>
        </div>
      </article>
    </section>
  );
};

export default ArenaSkeleton;
