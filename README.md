# Grain Social Portfolio Using BFF

This is web application that displays your photo galleries from
[Grain Social](https://grain.social) using the AT Protocol. This project uses
the [BFF (Backend For Frontend)](https://github.com/bigmoves/bff) framework to
create a lightweight, responsive portfolio website for showcasing your Grain
photos.

## Features

- Display photo galleries from your Grain Social account
- Responsive grid layout for photos
- Light and dark mode support
- Built with Preact and Tailwind CSS

## Prerequisites

- [Deno](https://deno.com/) - The JavaScript/TypeScript runtime

## Getting Started

### Development

Run the development server:

```bash
deno task dev
```

This will start both the server and the Tailwind CSS watcher in parallel.

- Server: `deno run -A --watch ./main.tsx`
- Tailwind:
  `deno run -A --node-modules-dir npm:@tailwindcss/cli -i ./input.css -o ./static/styles.css --watch`

### Code Generation

Generate lexicon types:

```bash
deno task codegen
```

### Adding New Lexicons

To add new lexicons to your project, you can use the
[lpm CLI](https://github.com/lexicon-community/lpm):

1. Install lpm:

```bash
deno install --global --allow-all jsr:@lpm/cli --name lpm
```

2. Add a new lexicon (replace with the desired lexicon ID):

```bash
lpm add com.example.mylexicon
```

3. The lexicon will be added to your `lexicons` directory.

4. After adding new lexicons, regenerate your TypeScript types:

```bash
deno task codegen
```

## Project Structure

```
grain-portfolio/
├── __generated__/         # Generated lexicon types
├── lexicons/              # AT Protocol lexicon definitions
├── static/                # Static assets
│   └── styles.css         # Compiled Tailwind CSS
├── main.tsx               # Main application entry point
├── deno.json              # Deno configuration
└── input.css              # Tailwind CSS input file
```

## Customization

To display your own galleries, you need to modify the REPO const in `main.tsx`:

```typescript
const REPO = "your-did-here";
```

## Technologies

- [Deno](https://deno.com/) - JavaScript/TypeScript runtime
- [BFF](https://github.com/bigmoves/bff) - Backend For Frontend framework for
  the AT Protocol
- [Preact](https://preactjs.com/) - Fast 3kB alternative to React
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [HTMX](https://htmx.org/) - High power tools for HTML

## License

This project is licensed under the terms found in the [LICENSE](./LICENSE) file.
