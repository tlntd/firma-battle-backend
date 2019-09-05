export interface ScoreOutcome {
  readonly delta: number;
  readonly rating: number;
}

export interface Outcome {
  readonly a: ScoreOutcome;
  readonly b: ScoreOutcome;
}

export interface OutcomeResponse {
  readonly winnerScore: number;
  readonly winnerDelta: number;
  readonly loserScore: number;
  readonly loserDelta: number;
}
