# Design Document: Software Experience Feature

## Overview

The Software Experience feature adds a new section to the portfolio website that showcases software tools and technologies the developer has used throughout their career. The section organizes software into two categories: "Main (Current)" for actively used tools and "Past (Retired)" for historical experience. The design prioritizes future extensibility, enabling dynamic filtering of portfolio pieces by software tags in future iterations.

### Goals

- Display software proficiency in a visually consistent manner with the existing dark void aesthetic
- Organize software by current and past usage to communicate career progression
- Establish a data structure foundation that supports future tagging and filtering capabilities
- Maintain responsive design across all viewport sizes
- Ensure accessibility and performance standards are met

### Non-Goals

- Implementing the actual filtering functionality (future work)
- Adding user authentication or personalization features
- Creating a software comparison or rating system
- Integrating with external APIs for software data

## Architecture

### Component Hierarchy

```
App.tsx
└── SoftwareExperience.tsx (new section component)
    ├── SoftwareCategory.tsx (category container)
    │   └── SoftwareCard.tsx (individual software entry)
    └── (future) FilteredPortfolio.tsx (not implemented in this phase)
```

### Navigation Integration

The Navigation component will be extended to include a "Software Experience" link positioned between "Skills" and "Contact". The navigation will use the existing scroll-spy mechanism to highlight the active section when the Software Experience section is in the viewport.

### Data Flow

```
softwareData.ts (data source)
    ↓
SoftwareExperience.tsx (section component)
    ↓
SoftwareCategory.tsx (filters by category)
    ↓
SoftwareCard.tsx (renders individual entries)
```

Future data flow (not implemented):
```
SoftwareCard onClick
    ↓
Filter portfolio pieces by software ID
    ↓
Navigate to filtered portfolio view
```

## Components and Interfaces

### SoftwareExperience Component

**Location:** `src/components/sections/SoftwareExperience.tsx`

**Responsibilities:**
- Render the section container with dark void aesthetic
- Display section header with title and description
- Organize software entries by category
- Apply scroll-triggered animations using Framer Motion
- Maintain responsive grid layout

**Props:** None (uses data from `softwareData.ts`)

**Key Features:**
- Uses `useInView` hook for scroll-triggered animations
- Implements staggered animation for category groups
- Maintains consistent styling with existing sections (Skills, Projects)
- Responsive grid: 1 column (mobile), 2 columns (tablet), 3 columns (desktop)

### SoftwareCard Component

**Location:** `src/components/ui/SoftwareCard.tsx`

**Responsibilities:**
- Display individual software entry with logo, name, version, and year
- Apply hover effects (scale, glow) consistent with SkillBadge
- Include onClick handler placeholder for future filtering
- Lazy load software logos for performance
- Provide keyboard navigation and ARIA labels

**Props:**
```typescript
interface SoftwareCardProps {
  software: SoftwareEntry;
  index: number;
  onClick?: (softwareId: string) => void; // Future filtering handler
}
```

**Styling:**
- Dark semi-transparent background with glowing purple borders
- Hover effect: subtle scale (1.05) and increased glow intensity
- Logo: centered, 64px size, with drop shadow
- Text: high contrast white/light gray for readability
- Conditional rendering: version shown only for specific software (e.g., Blender)
- Year last used: shown only for "Past (Retired)" category

## Data Models

### SoftwareEntry Interface

**Location:** `src/data/softwareData.ts`

```typescript
export type SoftwareCategory = 'main' | 'past';

export interface SoftwareEntry {
  id: string;                    // Unique identifier (kebab-case)
  name: string;                  // Display name
  category: SoftwareCategory;    // 'main' or 'past'
  icon: string;                  // Path to logo/icon (WebP format)
  version?: string;              // Optional: version number (e.g., "4.2")
  yearLastUsed?: number;         // Optional: year last used (for 'past' category)
  tags?: string[];               // Future: tags for filtering (e.g., ['3d', 'modeling'])
  portfolioIds?: string[];       // Future: IDs of portfolio pieces using this software
}
```

### Example Data Structure

```typescript
export const softwareData: SoftwareEntry[] = [
  {
    id: 'blender',
    name: 'Blender',
    category: 'main',
    icon: '/software/blender.webp',
    version: '4.2',
    tags: ['3d', 'modeling', 'animation'],
    portfolioIds: [], // Future: ['project-1', 'artwork-3']
  },
  {
    id: 'photoshop',
    name: 'Adobe Photoshop',
    category: 'main',
    icon: '/software/photoshop.webp',
    tags: ['design', 'image-editing'],
    portfolioIds: [],
  },
  {
    id: 'unity',
    name: 'Unity',
    category: 'past',
    icon: '/software/unity.webp',
    yearLastUsed: 2022,
    tags: ['game-dev', '3d'],
    portfolioIds: [],
  },
];
```

### Helper Functions

```typescript
// Get software by category
export const getSoftwareByCategory = (category: SoftwareCategory): SoftwareEntry[] => {
  return softwareData.filter(software => software.category === category);
};

// Get software by ID (for future filtering)
export const getSoftwareById = (id: string): SoftwareEntry | undefined => {
  return softwareData.find(software => software.id === id);
};

// Future: Get portfolio pieces by software ID
export const getPortfolioBySoftwareId = (softwareId: string): string[] => {
  const software = getSoftwareById(softwareId);
  return software?.portfolioIds || [];
};
```

### Future Tag Association

To implement filtering in the future, developers should:

1. **Add portfolioIds to software entries:**
   ```typescript
   {
     id: 'blender',
     portfolioIds: ['3d-character-model', 'environment-scene'],
   }
   ```

2. **Add softwareIds to portfolio entries:**
   ```typescript
   // In projects.ts or artworks.ts
   {
     id: '3d-character-model',
     softwareUsed: ['blender', 'photoshop'],
   }
   ```

3. **Implement filtering logic:**
   ```typescript
   const handleSoftwareClick = (softwareId: string) => {
     const portfolioIds = getPortfolioBySoftwareId(softwareId);
     // Filter and display portfolio pieces
     // Navigate to filtered view or highlight items
   };
   ```

## Navigation Updates

### Modified Navigation Structure

The `navLinks` array in `Navigation.tsx` will be updated to include the Software Experience link:

```typescript
const navLinks: NavLink[] = [
  { id: "home", label: "Home", href: "#home" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "art-gallery", label: "Art", href: "#art-gallery", isArtGroup: true },
  { id: "nft-gallery", label: "NFTs", href: "#nft-gallery", isArtGroup: true },
  { id: "music", label: "Music", href: "#music", isArtGroup: true },
  { id: "videos", label: "Videos", href: "#videos", isArtGroup: true },
  { id: "three-d", label: "3D", href: "#three-d", isArtGroup: true },
  { id: "skills", label: "Skills", href: "#skills" },
  { id: "software-experience", label: "Software Experience", href: "#software-experience" }, // NEW
  { id: "contact", label: "Contact", href: "#contact" },
];
```

### Responsive Behavior

- **Desktop:** Software Experience button appears between Skills and Contact with standard styling
- **Mobile:** Software Experience link appears in the mobile drawer menu in the same position
- **Active State:** Uses existing scroll-spy logic to highlight when section is in viewport


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property Reflection

After analyzing all acceptance criteria, I identified the following testable properties and performed redundancy elimination:

**Redundant Properties Identified:**
- Properties 2.2 and 2.3 (category filtering) can be combined into a single comprehensive property about category-based rendering
- Properties 3.1 and 3.2 (displaying logo and name) can be combined into a single property about required fields
- Properties 4.1, 4.2, 4.3, and 4.4 (data structure validation) can be combined into a comprehensive data structure property

**Consolidated Properties:**
The following properties provide unique validation value without redundancy:

### Property 1: Category-based rendering

*For any* software entry with a given category ('main' or 'past'), when rendered in the Software Experience section, it should appear in the corresponding category container and only in that container.

**Validates: Requirements 2.2, 2.3**

### Property 2: Conditional year display for main category

*For any* software entry with category='main', the rendered output should not display a "year last used" field.

**Validates: Requirements 2.5**

### Property 3: Required field rendering

*For any* software entry, the rendered card should display both the software logo/icon and the software name.

**Validates: Requirements 3.1, 3.2**

### Property 4: Conditional year display for past category

*For any* software entry with category='past', the rendered output should display the year last used field.

**Validates: Requirements 3.4**

### Property 5: Data structure completeness

*For any* software entry in the data file, it should have all required fields: unique id (string), category ('main' or 'past'), name (string), icon (string), and optional fields tags (string[]) and portfolioIds (string[]).

**Validates: Requirements 4.1, 4.2, 4.3, 4.4**

### Property 6: Navigation scroll behavior

*For any* navigation link click event targeting the Software Experience section, the page should scroll to position the section in the viewport.

**Validates: Requirements 1.3**

### Property 7: Active section highlighting

*For any* scroll position where the Software Experience section is in the viewport, the navigation component should apply the active state to the Software Experience button.

**Validates: Requirements 1.4**

### Property 8: WCAG AA contrast compliance

*For any* text element in the Software Experience section, the contrast ratio between text and background should meet or exceed WCAG AA standards (4.5:1 for normal text, 3:1 for large text).

**Validates: Requirements 6.4**

### Property 9: WebP icon format

*For any* software entry icon path, it should reference a .webp file format.

**Validates: Requirements 8.1**

### Property 10: ARIA label presence

*For any* software card component, it should include appropriate ARIA labels for screen reader accessibility.

**Validates: Requirements 8.3**

### Property 11: Keyboard focus indicators

*For any* focusable element in a software card, it should have visible focus indicators when focused via keyboard navigation.

**Validates: Requirements 8.4**

## Error Handling

### Data Validation Errors

**Missing Required Fields:**
- If a software entry lacks required fields (id, name, category, icon), log a console warning in development mode
- Render a fallback placeholder card with error message
- Continue rendering other valid entries

**Invalid Category Values:**
- If category is not 'main' or 'past', default to 'past' category
- Log a console warning with the invalid value

**Missing Icon Files:**
- Use onError handler on img elements to display fallback icon
- Fallback: generic software icon or placeholder with software name initials

### Navigation Errors

**Section Not Found:**
- If Software Experience section doesn't exist in DOM, log error and prevent scroll
- Gracefully handle missing section without breaking navigation

**Scroll Spy Errors:**
- If IntersectionObserver is not supported, fall back to scroll event listener
- Ensure navigation still functions without active highlighting

### Performance Errors

**Lazy Loading Failures:**
- If lazy loading is not supported, load images immediately
- Provide loading spinner while images load

**Animation Performance:**
- Respect `prefers-reduced-motion` media query
- Disable animations if user has motion sensitivity preferences

## Testing Strategy

### Dual Testing Approach

This feature will use both unit tests and property-based tests for comprehensive coverage:

**Unit Tests** focus on:
- Specific examples (e.g., navigation contains "Software Experience" button)
- Edge cases (e.g., Blender displays version number)
- Integration points (e.g., navigation scroll behavior)
- Error conditions (e.g., missing icon file handling)

**Property Tests** focus on:
- Universal properties across all inputs (e.g., all software entries render required fields)
- Category-based rendering correctness
- Data structure validation
- Accessibility compliance

### Property-Based Testing Configuration

**Library:** `fast-check` (JavaScript/TypeScript property-based testing library)

**Configuration:**
- Minimum 100 iterations per property test
- Each test tagged with feature name and property reference
- Tag format: `Feature: software-experience, Property {number}: {property_text}`

**Example Property Test Structure:**

```typescript
import fc from 'fast-check';

// Feature: software-experience, Property 1: Category-based rendering
describe('Software Experience - Property Tests', () => {
  it('Property 1: Software entries render in correct category container', () => {
    fc.assert(
      fc.property(
        fc.record({
          id: fc.string(),
          name: fc.string(),
          category: fc.constantFrom('main', 'past'),
          icon: fc.string(),
        }),
        (software) => {
          const { container } = render(<SoftwareExperience />);
          const categorySection = container.querySelector(
            `[data-category="${software.category}"]`
          );
          const softwareCard = categorySection?.querySelector(
            `[data-software-id="${software.id}"]`
          );
          expect(softwareCard).toBeInTheDocument();
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

### Unit Test Coverage

**Component Tests:**
- SoftwareExperience section renders both categories
- SoftwareCard displays logo, name, version (conditional), year (conditional)
- Navigation includes Software Experience link in correct position
- Hover effects apply correctly
- onClick handler placeholder exists

**Integration Tests:**
- Clicking navigation link scrolls to section
- Scroll spy highlights active section
- Responsive grid layout at different breakpoints
- Lazy loading triggers when section enters viewport

**Accessibility Tests:**
- ARIA labels present on all interactive elements
- Keyboard navigation works (Tab, Enter, Space)
- Focus indicators visible
- Contrast ratios meet WCAG AA standards

**Error Handling Tests:**
- Missing icon displays fallback
- Invalid category defaults to 'past'
- Missing required fields show error placeholder

### Testing Tools

- **Jest:** Unit test runner
- **React Testing Library:** Component testing
- **fast-check:** Property-based testing
- **axe-core:** Accessibility testing
- **jest-axe:** Accessibility assertions in Jest

### Test Organization

```
src/
├── components/
│   ├── sections/
│   │   ├── SoftwareExperience.tsx
│   │   └── __tests__/
│   │       ├── SoftwareExperience.test.tsx (unit tests)
│   │       └── SoftwareExperience.properties.test.tsx (property tests)
│   └── ui/
│       ├── SoftwareCard.tsx
│       └── __tests__/
│           ├── SoftwareCard.test.tsx (unit tests)
│           └── SoftwareCard.properties.test.tsx (property tests)
└── data/
    ├── softwareData.ts
    └── __tests__/
        └── softwareData.properties.test.tsx (data validation)
```

### Performance Testing

While not part of automated testing, manual performance validation should include:
- Lighthouse performance score remains ≥80
- First Contentful Paint impact minimal
- Lazy loading reduces initial bundle size
- Animation performance smooth (60fps)

### Continuous Integration

All tests (unit + property) should run on:
- Pre-commit hooks (fast unit tests only)
- Pull request CI pipeline (full test suite)
- Pre-deployment validation (full test suite + accessibility audit)
