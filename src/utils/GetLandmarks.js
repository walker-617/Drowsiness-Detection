async function get_landmarks(imageSS) {
    if (!imageSS) {
      return null;
    }
  const base64Image = imageSS.split(",")[1];
  const res = await fetch("http://127.0.0.1:5000/get_landmarks", {
    method: "POST",
    body: JSON.stringify({ image: base64Image }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
}

export { get_landmarks };
