# Word River <!-- omit in toc -->

[![Server Build Status](../../actions/workflows/server.yml/badge.svg)](../../actions/workflows/server.yml)
[![Client Build Status](../../actions/workflows/client.yaml/badge.svg)](../../actions/workflows/client.yaml)
[![End to End Build Status](../../actions/workflows/e2e.yaml/badge.svg)](../../actions/workflows/e2e.yaml)

[![BCH compliance](https://bettercodehub.com/edge/badge/UMM-CSci-3601-S21/it-3-mesopotamicus?branch=main)](https://bettercodehub.com/)
[![Total alerts](https://img.shields.io/lgtm/alerts/g/UMM-CSci-3601-S21/it-3-mesopotamicus.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/UMM-CSci-3601-S21/it-3-mesopotamicus/alerts/)

- [Description](#description)
- [To-do List](#to-do-list)
- [Pamphlet](#pamphlet)
- [Development](#development)
  - [Common commands](#common-commands)
- [Deployment](#deployment)
- [Resources](#resources)
- [Contributors](#contributors)
- [Changing the name](#changing-the-name)

Word River is a tool for organizing words and their respective forms into wordlists and those wordlists into contextpacks.

Here is a selection of the features that can be used in WordRiver:


- Sign-in Feature: Users that are registered within the User database and have admin privileges have access to a variety of features
- Add ContextPack: Signed-in users can create new ContextPacks to a level to a level of detail going down to each individual word form
- Create Learner: Signed-in users can create new learner profiles and assign ContextPacks to them
- Edit ContextPacks/Wordlists: Signed-in users can edit any ContextPack/Wordlist to any extent
- Adding Wordlists: Signed-in users can add Wordlists to any currently existing ContextPack
- Export a Contextpack: Users can export a ContextPack into a JSON file

:exclamation: You should remove this sentence and the text above, and
replace them with least an elevator pitch description of your project so that
if someone comes to this repo they'll know what the project is about.

## Description

- Languages: Java, HTML, CSS, Typescript
- Testing: Karma and Cypress
- Frameworks: Javalin and Angular


## To-do List

A series of issues we wish to resolve or features we wish to implement:

- Unassign ContextPacks to Learners: Users cannot currently unassign contextpacks to learners 
- Prevent Multiple ContextPacks from being assigned to learners: Currently, Users can assign multiple of the same pack to a learner

## [Pamphlet](pamphlet.pdf)


## [Development](DEVELOPMENT.md)

Instructions on setting up the development environment and working with the code are in [the development guide](DEVELOPMENT.md).

### Common commands

From the `server` directory:
- `./gradlew run` to start the server
- `./gradlew test` to test the server

From the `client` directory:
- `ng serve` to run the client
- `ng test` to test the client
- `ng e2e` and `ng e2e --watch` to run end-to-end tests

From the `database` directory:
- `./mongoseed.sh` (or `.\mongoseed.bat` on Windows) to seed the database

## [Deployment](DEPLOYMENT.md)

Instructions on how to create a DigitalOcean Droplet and setup your project are in [the deployment guide](DEPLOYMENT.md).

## [Resources](RESOURCES.md)

Additional resources on tooling and techniques are in [the resources list](RESOURCES.md).

## Contributors

This contributors to this project can be seen [here](../../graphs/contributors).

## Changing the name

The project by default has the name "CSCI 3601 Iteration Template". There are a few places you need to change to make this the name you want:

- The title of this README.md
- [`server/src/main/java/umm3601/Server.java`](server/src/main/java/umm3601/Server.java)
  - The `appName` variable
- [`client/src/app/app.component.ts`](client/src/app/app.component.ts)
  - The `title` variable
  - Also the associated unit and E2E tests will need to be changed.
- [`client/src/app/app.component.html`](client/src/app/app.component.html)
  - The `mat-toolbar` element for the navigation drawer is just "Client" by default.
- [`client/src/index.html`](client/src/index.html)
  - The `title` element

You can go ahead and remove this section of the README once you have changed the name.
