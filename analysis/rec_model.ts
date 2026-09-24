export class Recommender {
  _weights: number[] = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 0, 2, 0,
    5, 1, 0, 3, 3, 1, 0, 3, 1, 5, 0, 3, 3, 1, 1, 0, 0, 0, 0, 5, 1, 3, 0, 0, 3,
    1, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 3, 1, 5, 1, 3, 1, 4, 5, 3,
    1, 5, 2, 5, 0, 4, 5, 5, 0, 0, 2, 1, 5, 0, 0, 0, 0, 4, 1, 5, 2, 4, 5, 0, 2,
    0, 1, 0, 4, 0, 5, 0, 4, 4, 1, 0, 2, 0, 0, 0, 3, 2, 2, 3, 5, 3, 3, 5, 2, 2,
    3, 0, 3, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
  ];
  _qweights: number[] = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.5,
    0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 1, 1, 1, 0, 0, 0, 0, 0, 0,
  ];
  _rules = [[19, 20], [18], [23, 24], [30], [23, 24, 25, 26, 28, 29]];

  _partners = ["826", "MB", "EF", "GNL"];
  _partner_requirements = [[0, 2], [0, 1], [2, 3, 4], [0]];

  wts(i: number, j: number) {
    return this._weights[i * this._partners.length + j];
  }
  qwts(i: number) {
    return this._qweights[i];
  }
  apply_rules(x: number[]) {
    return this._rules.map((rule) => rule.some((n) => x[n] === 1));
  }
  valid_partners(x: number[]) {
    const passed = this.apply_rules(x);
    return this._partner_requirements.map((requirements) =>
      requirements.every((requirement) => passed[requirement]),
    );
  }
  create_faker() {
    return Array.from({ length: this._qweights.length }, () =>
      Math.random() < 0.5 ? 0 : 1,
    );
  }
  score(x: number[]) {
    const keepers = this.valid_partners(x).map((x) => (x ? 1 : 0));
    return this._partners.map((_, j) => {
      return x.reduce(
        (acc, cur, i) => acc + cur * this.qwts(i) * this.wts(i, j) * keepers[j],
        0,
      );
    });
  }
}

const rec = new Recommender();
const faker = rec.create_faker();
const scores = rec.score(faker);
const potential_winner = scores
  .map((s, i) => [s, i])
  .reduce((acc, curr) => (acc[0] > curr[0] ? acc : curr));

const winner =
  potential_winner[0] > 0 ? rec._partners[potential_winner[1]] : "no one";

console.log(rec.apply_rules(faker));
console.log(rec.valid_partners(faker));
console.log(scores);
console.log(`${winner} wins!`);
