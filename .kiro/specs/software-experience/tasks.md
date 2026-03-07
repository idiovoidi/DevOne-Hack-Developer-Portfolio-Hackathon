# Implementation Plan: Software Experience Feature

## Overview

This plan implements a new Software Experience section for the portfolio website that showcases software tools and technologies organized by current and retired usage. The implementation follows the existing React + TypeScript architecture with Tailwind CSS styling and maintains the dark void aesthetic. The feature is designed with future extensibility for filtering portfolio pieces by software tags.

## Tasks

- [x] 1. Create data structure and TypeScript interfaces
  - Create `src/data/softwareData.ts` with SoftwareEntry interface and SoftwareCategory type
  - Define helper functions: `getSoftwareByCategory`, `getSoftwareById`, `getPortfolioBySoftwareId`
  - Add code comments explaining future tag association implementation
  - Include example software entries for Blender (with version), Photoshop, Unity (retired)
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6_

- [x] 1.1 Write property test for data structure validation
  - **Property 5: Data structure completeness**
  - **Validates: Requirements 4.1, 4.2, 4.3, 4.4**
  - Test that all software entries have required fields (id, name, category, icon)
  - Test that category values are only 'main' or 'past'
  - Test that optional fields (tags, portfolioIds) are arrays when present

- [x] 1.2 Write property test for WebP icon format
  - **Property 9: WebP icon format**
  - **Validates: Requirements 8.1**
  - Test that all icon paths reference .webp file format

- [x] 2. Create SoftwareCard UI component
  - Create `src/components/ui/SoftwareCard.tsx` with TypeScript interface for props
  - Implement logo display (64px, centered, with drop shadow)
  - Implement name, version (conditional), and year last used (conditional) display
  - Apply dark void aesthetic styling with glowing purple borders
  - Add hover effects (scale 1.05, increased glow intensity)
  - Include onClick handler placeholder with code comments for future filtering
  - Implement lazy loading for software logos
  - Add ARIA labels and keyboard navigation support
  - Add visible focus indicators
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 5.1, 5.2, 6.2, 6.3, 8.2, 8.3, 8.4_

- [x] 2.1 Write property test for required field rendering
  - **Property 3: Required field rendering**
  - **Validates: Requirements 3.1, 3.2**
  - Test that any software entry renders both logo and name

- [x] 2.2 Write property test for conditional year display (main category)
  - **Property 2: Conditional year display for main category**
  - **Validates: Requirements 2.5**
  - Test that software entries with category='main' do not display year last used

- [x] 2.3 Write property test for conditional year display (past category)
  - **Property 4: Conditional year display for past category**
  - **Validates: Requirements 3.4**
  - Test that software entries with category='past' display year last used

- [x] 2.4 Write unit tests for SoftwareCard component
  - Test logo, name, version, and year rendering
  - Test hover effects apply correctly
  - Test onClick handler placeholder exists
  - Test error handling for missing icon (fallback display)
  - Test keyboard navigation (Tab, Enter, Space)
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 8.3, 8.4_

- [x] 2.5 Write property test for ARIA label presence
  - **Property 10: ARIA label presence**
  - **Validates: Requirements 8.3**
  - Test that all software cards include appropriate ARIA labels

- [x] 2.6 Write property test for keyboard focus indicators
  - **Property 11: Keyboard focus indicators**
  - **Validates: Requirements 8.4**
  - Test that focusable elements have visible focus indicators

- [x] 3. Checkpoint - Verify component rendering
  - Ensure all tests pass, ask the user if questions arise.

- [x] 4. Create SoftwareExperience section component
  - Create `src/components/sections/SoftwareExperience.tsx`
  - Implement section container with dark void aesthetic styling
  - Add section header with title "Software Experience" and optional description
  - Implement category containers for "Main (Current)" and "Past (Retired)"
  - Render "Main (Current)" category before "Past (Retired)" category
  - Integrate SoftwareCard components with data from softwareData.ts
  - Implement scroll-triggered animations using Framer Motion and useInView hook
  - Apply staggered animation for category groups
  - Implement responsive grid layout: 1 column (mobile <768px), 2 columns (tablet 768-1024px), 3 columns (desktop ≥1024px)
  - Set maximum content width to 1280px
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 6.1, 6.2, 6.3, 6.5, 7.1, 7.2, 7.3, 7.4, 7.5_

- [x] 4.1 Write property test for category-based rendering
  - **Property 1: Category-based rendering**
  - **Validates: Requirements 2.2, 2.3**
  - Test that software entries appear in correct category container
  - Test that entries only appear in their designated category

- [x] 4.2 Write unit tests for SoftwareExperience section
  - Test both category containers render
  - Test "Main (Current)" renders before "Past (Retired)"
  - Test responsive grid layout at different breakpoints
  - Test scroll-triggered animations trigger correctly
  - Test maximum content width constraint
  - _Requirements: 2.1, 2.2, 2.4, 7.1, 7.2, 7.3, 7.4_

- [x] 4.3 Write property test for WCAG AA contrast compliance
  - **Property 8: WCAG AA contrast compliance**
  - **Validates: Requirements 6.4**
  - Test text-to-background contrast ratios meet WCAG AA standards (4.5:1 for normal text, 3:1 for large text)
  - Use axe-core or similar accessibility testing tool

- [x] 5. Update Navigation component
  - Open `src/components/layout/Navigation.tsx`
  - Add "Software Experience" link to navLinks array
  - Position link between "Skills" and "Contact"
  - Set href to "#software-experience"
  - Ensure responsive behavior maintained on mobile devices
  - Verify scroll-spy logic highlights Software Experience when section is in viewport
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

- [x] 5.1 Write property test for navigation scroll behavior
  - **Property 6: Navigation scroll behavior**
  - **Validates: Requirements 1.3**
  - Test that clicking Software Experience link scrolls to section

- [x] 5.2 Write property test for active section highlighting
  - **Property 7: Active section highlighting**
  - **Validates: Requirements 1.4**
  - Test that navigation highlights Software Experience button when section is in viewport

- [x] 5.3 Write unit tests for Navigation updates
  - Test "Software Experience" button appears in navigation
  - Test button positioned between "Skills" and "Contact"
  - Test clicking button scrolls to section
  - Test active state applies when section in viewport
  - Test mobile responsive behavior maintained
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

- [x] 6. Integrate section into App.tsx
  - Open `src/App.tsx`
  - Import SoftwareExperience component
  - Add SoftwareExperience section between Skills and Contact sections
  - Ensure section has id="software-experience" for navigation anchor
  - Verify smooth scrolling behavior works correctly
  - _Requirements: 1.3_

- [x] 6.1 Write integration tests for App.tsx
  - Test SoftwareExperience section renders in correct position
  - Test section has correct id attribute
  - Test smooth scrolling from navigation works end-to-end
  - _Requirements: 1.3_

- [x] 7. Add software logo assets
  - Create `public/software/` directory
  - Add optimized WebP format logos for software entries (Blender, Photoshop, Unity, etc.)
  - Ensure logos are appropriately sized (recommend 128x128px or 256x256px)
  - Add fallback generic software icon for error handling
  - _Requirements: 3.1, 8.1_

- [x] 8. Final checkpoint - Verify complete feature
  - Run all tests (unit + property) and ensure they pass
  - Manually test responsive layout on mobile, tablet, and desktop viewports
  - Verify accessibility with keyboard navigation and screen reader
  - Check Lighthouse performance score remains ≥80
  - Verify dark void aesthetic consistency with existing sections
  - Test lazy loading of software logos
  - Ensure all requirements are met
  - Ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Property tests validate universal correctness properties from the design document
- Unit tests validate specific examples and edge cases
- The feature is designed with future extensibility for filtering portfolio pieces by software tags
- All code should maintain TypeScript type safety and follow existing project conventions
- Styling should use Tailwind CSS utility classes consistent with the dark void aesthetic
- Components should use Framer Motion for animations consistent with existing sections
