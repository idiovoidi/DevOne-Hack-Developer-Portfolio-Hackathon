# idiovoidi - Developer Portfolio

A modern, dark-themed developer portfolio showcasing projects, skills, and digital artwork. Built for the DevOne Hackathon 2025.

## 🚀 Live Demo

[View Live Portfolio](https://yourusername.github.io/) *(Update with your actual URL)*

## ✨ Features

- **Responsive Design**: Fully responsive across all devices (mobile, tablet, desktop)
- **Dark Void Aesthetic**: Custom dark theme with cosmic/space-inspired elements
- **Smooth Animations**: Framer Motion powered scroll animations and transitions
- **Project Showcase**: Grid layout with filtering by category (Development, Games, Art, Design)
- **Embedded Demos**: Play games and interactive demos directly in the portfolio
- **Art Gallery**: Lightbox view for digital artwork with full-size images
- **Contact Form**: Functional contact form with validation
- **Performance Optimized**: Lazy loading, code splitting, and optimized assets
- **SEO Ready**: Comprehensive meta tags for search engines and social sharing

### 🎨 Custom Features

- **Cosmic Particle Background**: Canvas-based animated starfield with floating particles that create a dynamic void aesthetic
- **3D Card Tilt Effect**: Interactive parallax tilt effect on project cards that responds to mouse movement with realistic 3D perspective and glare overlay
- **Performance Controls**: Floating settings panel allowing users to toggle effects based on their device capabilities:
  - Enable/disable 3D tilt effects
  - Enable/disable particle background
  - Enable/disable scroll animations
  - Settings persist across sessions via localStorage
  - Auto-detection of low-end devices to optimize performance

## 🛠️ Tech Stack

### Core
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server

### Styling
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **CSS Custom Properties** - Theme system

### Form & Validation
- **React Hook Form** - Form handling
- **EmailJS/Formspree** - Contact form backend

### Icons & Assets
- **React Icons** - Icon library
- **WebP Images** - Optimized image format

## 📦 Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Create a \`.env\` file in the root directory (optional, for contact form):
\`\`\`env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
\`\`\`

4. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## 🏗️ Build & Deploy

### Build for Production
\`\`\`bash
npm run build
\`\`\`

### Preview Production Build
\`\`\`bash
npm run preview
\`\`\`

### Deploy to GitHub Pages
1. Update \`vite.config.ts\` with your repository name:
\`\`\`typescript
export default defineConfig({
  base: '/your-repo-name/',
  // ... rest of config
});
\`\`\`

2. Build and deploy:
\`\`\`bash
npm run build
# Push the dist folder to gh-pages branch
\`\`\`

### Deploy to Vercel/Netlify
Simply connect your GitHub repository to Vercel or Netlify. They will automatically detect the Vite configuration and deploy.

## 📝 Content Management

### Adding New Projects

1. **Add project images** to \`public/projects/\`:
   - Use descriptive kebab-case names: \`project-name-thumb.webp\`
   - Optimize images (thumbnails should be < 200KB)
   - Recommended dimensions: 800x600px

2. **Update** \`src/data/projects.ts\`:
\`\`\`typescript
{
  id: 'unique-project-id',
  title: 'Project Name',
  description: 'Brief description of what the project does',
  image: '/projects/project-thumb.webp',
  technologies: ['React', 'TypeScript', 'Tailwind'],
  liveUrl: 'https://your-demo.com',        // Optional
  githubUrl: 'https://github.com/user/repo', // Optional
  embedUrl: 'https://game-url.com',         // Optional: for embedded demos
  category: 'development',                   // 'development' | 'game' | 'art' | 'design'
  featured: true                             // Optional: highlight important projects
}
\`\`\`

### Adding New Artworks

1. **Add artwork images** to \`public/art/\`:
   - Thumbnails: \`artwork-name-thumb.webp\` (< 200KB)
   - Full-size: \`artwork-name-full.webp\` (< 500KB)
   - Recommended dimensions:
     - Thumbnails: 600x600px
     - Full-size: 1920x1920px (max)

2. **Update** \`src/data/artworks.ts\`:
\`\`\`typescript
{
  id: 'unique-art-id',
  title: 'Artwork Title',
  description: 'Optional description',
  image: '/art/artwork-thumb.webp',
  fullImage: '/art/artwork-full.webp',
  medium: 'Digital Art',
  tools: ['Photoshop', 'Blender'],
  date: '2025-01',
  category: 'Character Design'
}
\`\`\`

### Updating Skills

Edit \`src/data/skills.ts\` to add or modify your technical skills:
\`\`\`typescript
{
  name: 'Frontend',
  skills: [
    { name: 'React', category: 'frontend', icon: 'SiReact' },
    { name: 'TypeScript', category: 'frontend', icon: 'SiTypescript' },
    // Add more skills...
  ]
}
\`\`\`

### Updating Personal Information

Edit \`src/data/personal.ts\` to update your contact information and social links.

## 🖼️ Image Optimization Guide

### Image Naming Convention
- Use descriptive kebab-case names
- Projects: \`project-name-thumb.webp\`, \`project-name-full.webp\`
- Art: \`artwork-name-thumb.webp\`, \`artwork-name-full.webp\`

### Image Size Guidelines
- **Project Thumbnails**: < 200KB, 800x600px recommended
- **Art Thumbnails**: < 200KB, 600x600px recommended
- **Art Full-Size**: < 500KB, 1920x1920px max

### Converting to WebP

Using online tools:
- [Squoosh](https://squoosh.app/) - Google's image compression tool
- [CloudConvert](https://cloudconvert.com/webp-converter) - Batch conversion

Using command line (requires \`cwebp\`):
\`\`\`bash
cwebp -q 80 input.jpg -o output.webp
\`\`\`

### Optimization Tips
- Use WebP format for better compression
- Compress images before adding to the project
- Use appropriate dimensions (don't upload 4K images for thumbnails)
- Lazy loading is already implemented for all images
- Consider using placeholder SVGs during development

## 📁 Project Structure

\`\`\`
portfolio/
├── public/
│   ├── projects/          # Project screenshots and demos
│   ├── art/               # Art portfolio pieces
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── layout/        # Header, Footer, Navigation
│   │   ├── sections/      # Hero, Projects, Skills, Contact
│   │   └── ui/            # Reusable components
│   ├── data/              # Content data files
│   │   ├── projects.ts
│   │   ├── artworks.ts
│   │   ├── skills.ts
│   │   └── personal.ts
│   ├── hooks/             # Custom React hooks
│   ├── utils/             # Utility functions
│   ├── styles/            # Global styles
│   ├── App.tsx
│   └── main.tsx
├── .gitignore
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── README.md
\`\`\`

## 🎨 Customization

### Colors
Edit \`tailwind.config.js\` to customize the color scheme:
\`\`\`javascript
colors: {
  primary: '#3b82f6',
  accent: '#8b5cf6',
  background: '#0a0a0a',
  // ... more colors
}
\`\`\`

### Fonts
Update \`portfolio/index.html\` to change fonts:
\`\`\`html
<link href="https://fonts.googleapis.com/css2?family=Your+Font&display=swap" rel="stylesheet" />
\`\`\`

Then update \`tailwind.config.js\`:
\`\`\`javascript
fontFamily: {
  sans: ['Your Font', 'sans-serif'],
}
\`\`\`

## 🧪 Testing

### Manual Testing Checklist
- [ ] All navigation links work
- [ ] Contact form validates and submits
- [ ] All external links open in new tabs
- [ ] Images load with lazy loading
- [ ] Responsive on mobile, tablet, desktop
- [ ] Animations are smooth
- [ ] Lighthouse score > 80

### Run Lighthouse Audit
1. Open DevTools (F12)
2. Go to Lighthouse tab
3. Run audit for Performance, Accessibility, Best Practices, SEO

## 📊 Performance

- **Lighthouse Score**: 80+ target
- **First Contentful Paint**: < 2 seconds
- **Lazy Loading**: Implemented for all images
- **Code Splitting**: Vendor chunks separated
- **Bundle Size**: Optimized with Vite

## ♿ Accessibility

- Semantic HTML5 elements
- ARIA labels for interactive elements
- Keyboard navigation support
- High contrast ratios (WCAG AA)
- Focus indicators
- Alt text for all images
- Reduced motion support

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built for DevOne Hackathon 2025
- Design inspired by dark void/cosmic aesthetics
- Icons from React Icons
- Animations powered by Framer Motion

## 📧 Contact

- **Email**: your.email@example.com
- **GitHub**: [@yourusername](https://github.com/yourusername)
- **LinkedIn**: [Your Name](https://linkedin.com/in/yourprofile)

---

Made with ❤️ by idiovoidi
