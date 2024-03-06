function EAR(p1, p2, p3, p4, p5, p6) {
  const a = Math.abs(p2 - p6);
  const b = Math.abs(p3 - p5);
  const c = Math.abs(p1 - p4);
  return (a + b) / (2 * c);
}

function MAR(p1, p2, p3, p4, p5, p6, p7, p8) {
  let a = Math.abs(p2 - p8);
  let b = Math.abs(p3 - p7);
  let c = Math.abs(p4 - p6);
  let d = Math.abs(p1 - p5);
  return (a + b + c) / (2 * d);
}

export { EAR, MAR };