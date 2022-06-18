# Website for Software Engineering at Home

A self hosted toolset for making content in the Software Engineering at Home organisation more accessible to internet users via mobile, and desktop devices.

![Preview of website - site name navigation, sidebar, front page content](./screenshot.png)

## Content

Content for this website is sourced from the [software-engineering-at-home/content](https://github.com/software-engineering-at-home/content) repo.

To work with this project locally, you'll need to check out the both the `website` and `content` folders into the same directory, as per the [software-engineering-at-home/ownership](https://github.com/software-engineering-at-home/ownership) instructions.

## Project Features

- Markdown driven website
- Interactive Vue components as first class citizen
- Auto-generated sidebar based on nested folder structure
- New components can be developed anywhere in the site root; and embedded into Markdown

## Hosting

- Hosted via GitHub pages
- Deployed automatically via GitHub Actions

When setup correctly (see below); you should be able to access this site on:
- https://software-engineering-at-home.github.io/website/

## Development Support

- Hot-reloading provided by Vuepress
- Mocha test framework included
- Linting included as part of tests
- Testing on PRs via Github Actions

## How to get started

- Follow the instructions over at [software-engineering-at-home/ownership](https://github.com/software-engineering-at-home/ownership)
- Run `npm install` from the `website` directory
- Run `npm start`

You should now be able to view the site locally through your web browser.

## Licenses

See: [LICENSE.md](./LICENSE.md)

The hosted vuesite packages together:

- @fortawesome/fontawesome-svg-core
- @fortawesome/free-solid-svg-icons
- @fortawesome/vue-fontawesome
- @vuepress/plugin-register-components
- @vuepress/theme-default
- axios
- time-until
- vuepress

Whilst the build tools require:

- @connected-web/md2json
- capture-website-cli
- chai
- eslint
- eslint-plugin-html
- eslint-plugin-mocha
- eslint-plugin-vue
- mocha
- node-localstorage
- promise-path
- standard


Which come with their own terms and conditions.
