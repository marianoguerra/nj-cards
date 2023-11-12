export function parse(s) {
  const rawLines = s.trim().split('\n'),
     lines = rawLines.map(l => l.trim().toLowerCase()).filter(l => !!l),
    nut = lines[0].slice(0, 6),
    nutExtra = lines[0].slice(6).trim(),
    barres = [],
    fingers = [];

  let title = '',
    position = nutExtra ? parseInt(nutExtra, 10) : 1,
    frets = 0;

  for (let i = 0; i < nut.length; i++) {
      const c = nut[i];
      if (c === "x" || c === "o") {
        fingers.push([6 - i, c === 'x' ? c : 0]);
      }
  }

  console.log(nut);
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].slice(0, 6);
    frets += 1;
    console.log(line);

    for (let j = 0; j < line.length; j++) {
      const c = line[j];
      if (c === "=") {
        barres.push({ fromString: 6 - j, toString: 1, fret: i });
        break;
      } else if (isFingerNumChar(c) || c.toLowerCase() === "o") {
        // finger at string 1, fret 2, with text '2'
        // [1, 2, '2'],
        fingers.push([6 - j, i, c]);
      }
    }
  }

  return {title, position, frets, barres, fingers};
}

const charCode1 = "1".charCodeAt(0),
  charCode5 = "5".charCodeAt(0);

function isFingerNumChar(c) {
  const code = c.charCodeAt(0);
  return code >= charCode1 && code <= charCode5;
}
