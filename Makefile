all:
	pandoc index.md -o index.html -t html5 --smart -s --css style.css --include-in-header includes.txt --email-obfuscation=references -T "Webpage of Guillaume Brunerie" -V lang:en

test:
	pandoc index.md -o index_test.html -t html5 --smart -s --css style.css --include-in-header includes.txt --email-obfuscation=references -T "Webpage of Guillaume Brunerie" -V lang:en

