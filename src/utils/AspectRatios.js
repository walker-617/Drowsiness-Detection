function dist(p1, p2) {
  return Math.sqrt(Math.pow(p2[0]- p1[0], 2) + Math.pow(p2[1] - p1[1], 2));
}

function EAR(p1, p2, p3, p4, p5, p6) {
  const a = dist(p2 , p6);
  const b = dist(p3 , p5);
  const c = dist(p1 , p4);
  return ((a + b) / (2 * c)).toFixed(2);
}

function MAR(p1, p2, p3, p4, p5, p6, p7, p8) {
  let a = dist(p2 , p8);
  let b = dist(p3 , p7);
  let c = dist(p4 , p6);
  let d = dist(p1 , p5);
  return ((a + b + c) / (2 * d)).toFixed(2);
}

export { EAR, MAR };