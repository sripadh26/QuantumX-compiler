const apiUrl = "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&wait=true";

const headers = {
  "content-type": "application/json",
  "X-RapidAPI-Key": "4dbe208229msh852d5693608d667p1367eajsn14d63fdbc19a", // Replace with your key
  "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com"
};

function encode(str) {
  return btoa(unescape(encodeURIComponent(str)));
}

async function compileCode() {
  const source_code = document.getElementById("code").value;
  const stdin = document.getElementById("input").value;
  const language_id = document.getElementById("language").value;

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      language_id,
      source_code: encode(source_code),
      stdin: encode(stdin)
    })
  });

  const result = await response.json();
  const output = atob(result.stdout || "") || atob(result.stderr || "") || "Error or No Output!";
  document.getElementById("output").textContent = output;
}
