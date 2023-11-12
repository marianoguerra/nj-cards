import Reveal from "../deps/reveal.js";
import Markdown from "../deps/reveal-plugin-md.js";

function toDOM(v) {
  if (v === null || v === undefined) {
    return document.createTextNode("");
  } else if (v instanceof Element || v instanceof Text) {
    return v;
  } else if (v?.toDOM) {
    return v.toDOM();
  } else {
    return document.createTextNode("" + v);
  }
}

function ce(nodeName, attrs, ...childs) {
  const node = document.createElement(nodeName);

  for (const key in attrs) {
    node.setAttribute(key, attrs[key]);
  }

  for (const child of childs) {
    node.appendChild(toDOM(child));
  }

  return node;
}

function slide(...childs) {
  return ce("section", {
    className: "future",
    hidden: "",
    ariaHidden: "true",
  }, ...childs);
}

function main() {
  Reveal.initialize({
    plugins: [Markdown],
    autoAnimate: false,
    transition: "none",
    backgroundTransition: "none",
  });

  const params = new URLSearchParams(location.search),
    file = params.get("file"),
    curFile = file ??
      "intro.njc";

  if (!file) {
    params.set("file", curFile);
    let newUrl = location.protocol + "//" + location.host +
      window.location.pathname + "?" + params.toString();
    window.history.pushState({ path: newUrl }, "", newUrl);
  }

  loadFile(curFile);
}

async function loadFile(path) {
  const cards = parseCards(await (await fetch("notes/" + path)).text()),
    slides = Reveal.getSlidesElement();

  console.log(cards);
  for (const { q, a, note } of cards) {
    const card = qa(md(q), md(a), note ? md(note) : undefined);
    slides.appendChild(card.toDOM());
  }

  Reveal.sync();
  for (const plugin of Object.values(Reveal.getPlugins())) {
    plugin.convertSlides();
  }
}

class QA {
  constructor(q, a, note) {
    this.q = q;
    this.a = a;
    this.note = note;
  }

  toDOM() {
    return slide(this.q, this.a, this.note);
  }
}

class CardContent {
  constructor(value) {
    this.value = value;
  }

  toDOM() {
    return ce("section", {}, this.value);
  }
}

class CardMarkdown extends CardContent {
  toDOM() {
    return ce(
      "section",
      { "data-markdown": "" },
      ce("textarea", { "data-template": "" }, this.value),
    );
  }
}

function qa(q, a, note) {
  return new QA(q, a, note);
}

function text(v) {
  return new CardContent(v);
}

function md(v) {
  return new CardMarkdown(v);
}

function parseCard(s) {
  const [q, rest] = s.split("--\n"),
    [a, note] = rest.split("???\n");

  return { q: q.trim(), a: a.trim(), note: (note ?? "").trim() };
}

function parseCards(s) {
  const items = s.split("---\n").map((v) => v.trim()).filter((v) => !!v).map(
    (v) => parseCard(v),
  );
  return items;
}

main();