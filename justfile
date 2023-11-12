
serve:
	deno run --allow-net --allow-read server.js


fetch-deps:
	mkdir -p deps
	just fetch deps/reveal.js https://raw.githubusercontent.com/hakimel/reveal.js/master/dist/reveal.esm.js
	just fetch deps/reveal-plugin-md.js https://raw.githubusercontent.com/hakimel/reveal.js/master/plugin/markdown/markdown.esm.js
	just fetch deps/reveal.css https://raw.githubusercontent.com/hakimel/reveal.js/master/dist/reveal.css
	just fetch deps/reveal-theme-white.css https://raw.githubusercontent.com/hakimel/reveal.js/master/dist/theme/white.css
	just fetch deps/svguitar.js https://raw.githubusercontent.com/omnibrain/svguitar/gh-pages/js/svguitar.es5.js

fetch PATH URL:
	wget {{URL}} -O {{PATH}}

