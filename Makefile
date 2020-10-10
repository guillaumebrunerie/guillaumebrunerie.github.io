all:
	pandoc index.md -o index.html -t html5 -s --css style.css --include-in-header includes.txt --email-obfuscation=references --metadata pagetitle="Webpage of Guillaume Brunerie" -V lang:en
