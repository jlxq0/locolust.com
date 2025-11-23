# CLAUDE.md - AI Assistant Guide for Locolust.com

## Project Overview

**Locolust.com** is a personal travel blog by Julian Lindner, documenting journeys through countries and regions worldwide. It's built with Jekyll (a Ruby static site generator) and styled with Tailwind CSS.

- **Live Site**: https://www.locolust.com
- **Author**: Julian Lindner
- **Purpose**: Personal travel blog with articles about various destinations

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Jekyll | 4.3.3 | Static site generator |
| Ruby | 3.3.1 | Runtime environment |
| Tailwind CSS | 3.4.1 | Styling framework |
| PostCSS | 8.4.33 | CSS processing |
| Node.js | 22 | Build tools |
| GitHub Pages | - | Hosting |
| Giscus | - | Comments (GitHub Discussions-based) |

## Directory Structure

```
locolust.com/
├── _category/           # Category pages (travel regions/countries)
├── _data/               # YAML data files
│   └── menuitems.yml    # Navigation menu structure
├── _includes/           # HTML partials/components
│   ├── navbar.html      # Navigation bar
│   ├── footer.html      # Site footer
│   ├── article_summary.html  # Post preview cards
│   ├── box_newsletter.html   # Newsletter signup
│   ├── box_social.html       # Social links
│   └── ...
├── _layouts/            # Page templates
│   ├── default.html     # Base layout with sidebar
│   ├── post.html        # Blog post template
│   └── category.html    # Category listing page
├── _posts/              # Blog posts organized by year
│   ├── 2017/            # 25 posts
│   ├── 2022/            # 1 post
│   ├── 2023/            # 6 posts
│   └── 2024/            # 3 posts
├── assets/
│   ├── css/main.css     # Tailwind CSS entry point
│   └── images/          # WebP images by category
├── .github/workflows/
│   └── github-pages.yml # CI/CD deployment
└── Configuration files
    ├── _config.yml      # Jekyll configuration
    ├── Gemfile          # Ruby dependencies
    ├── package.json     # Node.js dev dependencies
    ├── tailwind.config.js
    └── postcss.config.js
```

## Development Commands

```bash
# Install dependencies
bundle install          # Ruby gems
npm install             # Node.js packages (CSS tools)

# Local development
bundle exec jekyll serve    # Start dev server at http://localhost:4000
                           # Auto-rebuilds on file changes

# Build for production
JEKYLL_ENV=production bundle exec jekyll build

# Build output goes to _site/ directory
```

## Deployment

Deployment is automated via GitHub Actions on push to `main` branch:

1. Checkout code
2. Setup Ruby 3.3 with bundler cache
3. Setup Node 22
4. Run `npm install`
5. Build site with jekyll-action-ts
6. Deploy to GitHub Pages

**No manual deployment required** - just push to `main`.

## Creating New Blog Posts

### File Naming Convention

Posts must follow Jekyll's naming convention:
```
_posts/YYYY/YYYY-MM-DD-slug-title.md
```

Example: `_posts/2024/2024-04-28-bhutan.md`

### Front Matter Template

```yaml
---
title: "Post Title Here"
slug: optional-custom-slug
categories: travel asia japan    # Space-separated: travel [region] [country]
tags: tag1 tag2 tag3            # For filtering/SEO
excerpt: "A brief summary of the post content for previews."
---
```

### Category Hierarchy

Categories follow a hierarchical structure:
- `travel` (top level)
  - `travel africa [country]`
  - `travel americas [country]`
  - `travel asia [country]`
  - `travel europe [country]`
  - `travel oceania [country]`
- `misc` (non-travel content)

### Available Countries

Defined in `_data/menuitems.yml`:
- **Africa**: Kenya
- **Americas**: USA
- **Asia**: Bhutan, Cambodia, Hong Kong, Japan, Laos, Malaysia, Myanmar, Philippines, South Korea, Taiwan, Thailand, Vietnam
- **Europe**: Austria, Romania, Hungary, Moldova, Ukraine

### Adding a New Country

1. Create category file: `_category/travel_[region]_[country].md`
2. Add to `_data/menuitems.yml` under the appropriate region
3. Add images to `assets/images/travel/[region]/[country]/`

## Styling Conventions

### Tailwind CSS Classes

- **Dark mode**: Uses class-based dark mode (`dark:` prefix)
- **Primary color**: Teal (`text-teal-500`, `dark:text-teal-400`)
- **Background**: Zinc palette (`bg-zinc-50`, `dark:bg-zinc-900`)
- **Typography**: Uses `@tailwindcss/typography` plugin for prose

### Responsive Breakpoints

```
sm:  640px   (mobile landscape)
md:  768px   (tablet)
lg:  1024px  (desktop)
xl:  1280px  (large desktop)
```

### CSS Files

- `assets/css/main.css` - Tailwind directives entry point
- `assets/css/comments.css` - Giscus comments styling

## Key Configuration

### `_config.yml`
- `permalink: /:categories/:title` - URL structure
- `paginate: 5` - Posts per page on homepage
- Plugins: jekyll-postcss, jekyll-paginate, jekyll-feed

### `tailwind.config.js`
- Content paths for purging
- Safelist for dynamic classes
- Typography plugin enabled

## External Integrations

### Comments (Giscus)
- Repository: `jlxq0/locolust.com`
- Uses GitHub Discussions
- Configured in `_layouts/post.html`

### Newsletter
- Provider: Weightless.so
- Signup form in `_includes/box_newsletter.html`

### Social Links
- Instagram
- Sleepless.sg (podcast)
- Mastodon

## Important Notes for AI Assistants

1. **Image format**: Use WebP for all images
2. **Don't modify** deployment workflow unless explicitly requested
3. **Categories must match** existing structure or be added properly
4. **Test locally** before committing significant changes
5. **Preserve front matter** format exactly when editing posts
6. **Dark mode**: Always include `dark:` variants when adding styles
7. **No trailing slashes** in URLs (Jekyll convention)

## Common Tasks

### Add a new blog post
1. Create file in `_posts/YYYY/YYYY-MM-DD-title.md`
2. Add proper front matter with categories and tags
3. Write content in Markdown
4. Add images to appropriate `assets/images/` subdirectory

### Update navigation menu
Edit `_data/menuitems.yml` - structure is region → countries

### Modify page layout
Edit files in `_layouts/` directory

### Add new partial/component
Create HTML file in `_includes/` and use `{% include filename.html %}`

### Update CSS/styling
- Modify Tailwind classes directly in HTML
- Or add custom CSS to `assets/css/main.css`
