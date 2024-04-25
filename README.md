# forays.info

A set of tools for the Eureka and Bozja side content forays in the MMORPG Final Fantasy XIV. This is
a self-contained client-side React application with no backend. There are multiple entry points
(see `public/`) in order to generate Telegram/Discord/Twitter link previews without a backend.

## Pages

At present, the following pages are available:
* [BA Logos Action Helper/BA Loadouts](https://forays.info/ba/): Recommends a tray loadout to users
running The Baldesion Arsenal in Eureka based on their job and role in the raid.
* [BA Portal Map](https://forays.info/portals): A reference map for Baldesion Arsenal runs on the
Primal data center.
* [Eureka Logos Action Info](https://forays.info/eureka/logos): Shows information about each
logogram available in Eureka, as well as the recipes used to create the logogram, and how to
acquire the mnemes in the recipes. Uses Universalis for live market data.
* [Eureka Loadout Creator](https://forays.info/eureka/loadout): Allows users to build a custom
tray loadout, and shows how to create those logograms and how to acquire the mnemes in the recipes.
Uses Universalis for live market data.
* [Expeditionary Forecast](https://forays.info/forecast/): Shows upcoming spawn times for
weather-restricted Eureka Notorious Monsters, Eureka box farms, and Bozja Fragment farms. Also
shows a map and guide on how to farm for each item.
* [DRS Holster Helper](https://forays.info/drs/holster): Recommends a holster loadout to users
running Delubrum Reginae (Savage) in Bozja. These holster recommendations are provided by hosts
across the NA region. The tool recommends how many of each item should be acquired, and how to
acquire those items. Uses Universalis for live market data.  The tool also allows users to modify 
the recommended holster and generate a permalink to share the modified holster with others.
* [DRS Run Holster Creator](https://forays.info/createdrsholsters): Creates the JSON required to
add a new holster loadout to the site.
* [DRS Holster Creator](https://forays.info/drs/holster/c): Allows users to build a custom
holster loadout. The tool shows how to acquire the items selected. The tool also allows users to
generate a permalink to share the holster with others.
* [Bozja Lost Action Helper](https://forays.info/bozja/lostaction): Shows information about each
Lost Action available in Bozja, as well as how to acquire the Forgotten Fragments needed to unlock
the items.
* [Advanced Weather Finder](https://forays.info/weather-finder): A barebones tool for finding
upcoming weather conditions in a specific location.
* [Changelog](https://forays.info/changelog)
* Upcoming Weather: A widget accessed from the Eorzea Time section of the sidebar. Shows the
upcoming weather conditions for the next 16 Eorzea hours for all Eureka and Bozja zones.

## Local Data

The site uses Local Storage to store the user's preferred site theme (light, dark, or system), as
well as the user's preferred region for Universalis lookup calls.

## How to run

The application is packaged as a standard create-react-app application. To start the development
webserver, run `npm run start` (the application will launch on port 3000). To build, run
`npm run build`. `create-subdir-indexes.js` is a postbuild script that generates entry points for 
the 'ba', 'forecast', 'reference', and 'portals' directories. These entry points use the same
rendering code, but have different metadata in order to generate custom link previews in
external applications.


