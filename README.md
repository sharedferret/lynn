# lynn.pet!

This is the code for lynn.pet. The entire website (so far) is a self-contained create-react-app project with no backend. There are multiple entry points (see public/) in order to generate link previews for Telegram/Discord/etc.

## How to run

Normal CRA stuff. `npm run start`, launches as [http://localhost:3000](http://localhost:3000). `npm run build` to build. `create-subdir-indexes.js` is a postbuild script that generates entry points for the 'ba', 'forecast', 'reference', and 'portals' directories.
