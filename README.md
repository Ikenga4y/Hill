# TrendNova — static website with ZIP content importer

## Included
- Five niche categories and ten starter articles
- Local SVG cover illustrations
- Search, category filters, article reading pages
- `admin.html`: imports a content-pack ZIP, previews articles and images, and exports a complete replacement website ZIP
- No paid API or backend required for the ZIP import/export workflow

## Content pack format
Create a ZIP containing `manifest.json` and an `images/` directory. `manifest.json` should look like:
```json
{
  "posts": [{
    "id": "sample-article",
    "title": "Sample title",
    "category": "Technology & AI",
    "excerpt": "A short summary",
    "body": ["Paragraph one.", "Paragraph two."],
    "image": "images/sample-cover.jpg",
    "readTime": "4 min read"
  }]
}
```
Valid category names:
- Anime & Entertainment
- Movies & Streaming
- Technology & AI
- Trending Stories
- Downloads & Resources

Supported images: JPG, PNG, WebP, SVG (GIF is accepted too).

## Hosting
Upload the extracted contents of this folder to the root of a public GitHub repository and enable GitHub Pages from `main` / root.

## How the admin works
1. Open the hosted `admin.html` page.
2. Upload a content-pack ZIP.
3. Review the article and image previews.
4. Generate `TrendNova_updated_website.zip`.
5. Extract that ZIP and upload its contents to the GitHub repository to publish the update.

**Static hosting limitation:** a browser page on GitHub Pages cannot overwrite hosted website files by itself. This admin tool builds the updated site ZIP locally in the browser. To publish updates with one click directly from the admin page would require a backend or a properly secured GitHub integration; never paste a long-lived GitHub token into public frontend code.
