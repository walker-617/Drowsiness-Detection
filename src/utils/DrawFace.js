function DrawFace(res) {
  const a = res.landmarks[30][0];
  const b = res.landmarks[30][1];
  for (const i in res.landmarks) {
    const x = res.landmarks[i][0] - a + 100;
    const y = res.landmarks[i][1] - b + 100;
    const landmark = document.getElementById(`landmark${i}`);
    landmark.style.left = `${x}px`;
    landmark.style.top = `${y}px`;
  }
}

export {DrawFace};
