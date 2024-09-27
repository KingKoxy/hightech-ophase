# O-Phase HiGHtech

Dieses Repository enthält den Code der Website der O-Phasengruppe HiGHtech am Karlsruher Institut für Technologie.

## Grundlegendes

Jedes Jahr muss die Website angepasst werden, um die Informationen für die jeweilige O-Phase anzuzeigen.
Diese Daten werden mit dem CMS [Contentful](https://www.contentful.com/) bereitgestellt. Es müssen folgende Dinge von Hand auf Contentful geändert werden:

- Das neue Logo der O-Phase muss hochgeladen werden. Dabei muss die alte Datei ersetzt werden. Die Dateien können in Contentful unter _Assets_ gefunden werden.
- Der Wochenplan muss angepasst werden. Dazu müssen einfach neue Einträge hinzugefügt werden mit Name, Zeit und Ort und optionalerweise einem Google Maps Link.
- Ein Eintrag des neuen O-Phasen-Videos muss hochgeladen werden. Dabei muss der Titel und ein Link zum Video angegeben werden.
- Die Ansprechpartner für den Notfall müssen angegeben werden. Dabei werden alle Ansprechpartner, deren Eintrag published ist auf der Website angezeigt. Ggf. müssen alte Einträge unpublished werden.
- Unter Umständen muss das Impressum angepasst werden. Das kann leider vorerst nur über den Code direkt geschehen.

## Projektstruktur

Für die Website wurde _SvelteKit_ verwendet. Für das Styling wurde _TailwindCSS_ verwendet. Als GraphQL-Client wurde _Houdini_ verwendet.

Jede Page ist durch einen Ordner im Ordner `src/routes` repräsentiert. Die jeweilige `+page.svelte`-Datei ist die Hauptkomponente der
Seite. Weitere nur in dieser Page benötigte Komponenten werden im selben Ordner abgelegt. Allgemeine Komponenten
befinden sich im Ordner `src/lib/components`. Statische Assets werden im Ordner `src/static` abgelegt.

Um eine GraphQL-Query auf einer Seite zu verwenden. muss diese in einer Datei namens `+page.graphql` im selben Ordner wie die `+page.svelte`-Datei abgelegt werden. 
Baut man dann das Projekt erzeugt Houdini automatisch die entsprechenden Hooks, die in der Svelte-Datei verwendet werden können und zudem noch passende Types.
