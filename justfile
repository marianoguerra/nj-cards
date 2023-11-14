
serve:
	deno run --allow-net --allow-read server.js

dist:
	rm -rf dist
	mkdir dist
	deno compile -o dist/nj-cards --allow-net --allow-read server.js
	cp -r index.html js deps notes dist

fetch-deps:
	mkdir -p deps
	just fetch deps/reveal.js https://raw.githubusercontent.com/hakimel/reveal.js/master/dist/reveal.esm.js
	just fetch deps/reveal-plugin-md.js https://raw.githubusercontent.com/hakimel/reveal.js/master/plugin/markdown/markdown.esm.js
	just fetch deps/reveal.css https://raw.githubusercontent.com/hakimel/reveal.js/master/dist/reveal.css
	just fetch deps/reveal-theme-white.css https://raw.githubusercontent.com/hakimel/reveal.js/master/dist/theme/white.css
	just fetch deps/svguitar.js https://raw.githubusercontent.com/omnibrain/svguitar/gh-pages/js/svguitar.es5.js
	just fetch deps/vextab.js https://cdn.jsdelivr.net/npm/vextab@3.0.6/dist/main.prod.js

fetch PATH URL:
	wget {{URL}} -O {{PATH}}

sync-tauri:
	rm -rf tauri/src/deps
	rm -rf tauri/src/js
	cp -r deps index.html js tauri/src/
