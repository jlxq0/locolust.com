# AGENTS.md

Constraints and pitfalls for Locolust.com. Everything discoverable from the tree
is deliberately absent: read `_config.yml`, `Gemfile`, `package.json`,
`.github/workflows/` and `_data/menuitems.yml` for structure, versions and
commands.

## Merging to `main` publishes nothing

GitHub Actions is **disabled** on this repository:

    $ gh api repos/jlxq0/locolust.com/actions/permissions
    {"enabled":false,"sha_pinning_required":false}

The workflows are `active` and would fire if Actions were on, so nothing in
`.github/workflows/` looks wrong. Verified by merging PR #26 to `main` at
`e318c91` on 2026-08-26 and watching for the push-triggered build: no run
appeared, and the last build of this site is `2164526` from 2025-11-23.

**The live site is the `gh-pages` branch, not `main`.** `gh-pages` is at
`c9adf7c` (2025-11-23) and `https://www.locolust.com` answers
`last-modified: Sun, 23 Nov 2025 06:15:57 GMT`, so `main` is currently ahead of
what is published. Do not report a change as shipped because it merged. Read
`gh-pages` and the live `last-modified` header.

Tracked in issue #28. Do not switch Actions back on to test something: the next
push then deploys to a live domain.

## This forge repository is a stale copy, not a mirror

    mirror: false
    updated_at: 2026-05-23

`git remote -v` has exactly one remote, `origin`, on **GitHub**. That is the
canonical one here, and it is the exception to the estate rule rather than a
mistake to correct — do not add or repoint remotes.

The divergence is already real. Forge's PR list stops at #26 and still shows #24
open; GitHub closed #24 on 2026-03-04 and has run to #32 since. Anything read
off the forge copy — dependency state, CI state, PR state, file contents — is a
snapshot from May 2026, and it gives no sign of being stale. Code matches only
because nobody has pushed since 2025-11-23.

Issues are still filed on the forge, because GitHub has issues disabled
(`hasIssuesEnabled: false`) and a tracker attached to a stale copy beats none.
Whether that stays true is with Julian.

## `npm install` rewrites the tracked `yarn.lock`

`yarn.lock` is tracked, there is no `package-lock.json`, and the workflow runs
`npm install`. npm 7+ reads `yarn.lock` as resolution guidance, so the pins do
hold — deleting `yarn.lock` and re-resolving moves `postcss` 8.4.33 → 8.5.26 and
`tailwindcss` 3.4.1 → 3.4.19. Do not assume the lockfile is decorative.

It is also not authoritative. Every `npm install` writes `yarn.lock` back:

    $ npm install && git status --porcelain
     M yarn.lock
    ?? package-lock.json

    $ git diff --stat yarn.lock
     1 file changed, 201 insertions(+), 210 deletions(-)

356 of those lines are `resolved` URLs rewritten from `registry.yarnpkg.com` to
`registry.npmjs.org`. The rest are semantic: npm collapses `braces@~3.0.2` into
`braces@^3.0.3` and drops `fill-range@^7.0.1` and `fsevents@~2.3.2`. Committing
that changes what the lockfile pins, inside a diff whose URL noise hides it.

**After any local build, `git checkout -- yarn.lock` and delete the untracked
`package-lock.json`.** Neither is gitignored. Tracked in issue #29.

## Ruby comes from mise and the system Ruby will lie to you

`.tool-versions` pins ruby 3.3.1. Without `mise install ruby@3.3.1`, `ruby -v`
answers 2.6.10 from `/System` and `bundle` fails on a missing bundler 2.5.9 —
close enough to working that a local run can appear to exercise the project
while exercising something unrelated. Not Homebrew.

Node in CI is 22 (`actions/setup-node` with `node-version: '22'`), which is not
the mise global. Match it when reasoning about resolution.

## Adding a country: the `permalink` routes it, not the filename

A country needs a file in `_category/`, an entry under its region in
`_data/menuitems.yml`, and images under
`assets/images/categories/travel/[region]/[country]/`. There is no
`assets/images/travel/` — category pages reference images through `pic1:`…`pic5:`
front matter resolved against `assets/images/`, so a Bhutan page carries
`pic1: "categories/travel/asia/bhutan/dzong"`. Miss the category file and the
menu links to a 404 that no build step catches.

`_category/travel_[region]_[country].md` is a naming convention and nothing
reads it. The route comes from `permalink:` in the front matter, and the two
have already drifted: **Ukraine's page is `_category/travel_europe_moldova
copy.md`**, a copy of the Moldova page whose filename was never changed, routing
to `/travel/europe/ukraine` from its `permalink`. Grep for the `tag:` or
`permalink:` value, never for the filename, and do not assume a file named for
one country describes that country.

The `|` entries in `_data/menuitems.yml` are **presentational dividers** for the
horizontal desktop bar, not pages. They carry `url: "#"`, they render as two
clickable rows in the mobile menu, and code that iterates the menu must not
treat them as destinations. See issue #30.

## Nothing in the build catches a category with no page

`jekyll build` will happily emit a post under a category that has no
`_category/` page and no menu entry. The result is a post that serves 200 while
the category URL above it 404s. Four categories are in that state today —
`/travel/asia/mongolia`, `/travel/asia/russia`, `/travel/europe/greenland`,
`/travel/europe/russia` — covering six published posts. Issue #31.

Before adding or recategorising a post, check its category against
`_data/menuitems.yml` and `_category/`. A green build says nothing about this.

## Known pitfalls

- **`toggleMenu()` does not update `aria-expanded`.** The button is authored
  `aria-expanded="false"` and only a class is toggled, so assistive technology
  is told the menu is closed while it is open. Issue #30.
- **The desktop flyout depends on a pseudo-element bridge.** The submenu is
  absolutely positioned, so it adds no height to its `<li>` and the 8px `mt-2`
  gap falls outside the hover target. `before:absolute before:-top-2 before:h-2`
  on the submenu spans it. Removing that class reintroduces the bug PR #20
  fixed, and it will look like an unrelated spacing tweak.
- **The mobile menu emits top-level items only.** 19 country links exist on
  desktop and 0 on mobile. Issue #30.
- **The newsletter and social boxes POST to `https://weightless.so`.** Any CSP
  added for this site must allow it in `form-action`; a form that posts nowhere
  looks identical to a form nobody used. Issue #27.
- Images are WebP.
