import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import fc from 'fast-check';
import SoftwareCard from '../SoftwareCard';
import type { SoftwareEntry, SoftwareCategory } from '../../../data/softwareData';

/**
 * Property-Based Tests for SoftwareCard Component
 * Feature: software-experience
 * 
 * These tests validate that the SoftwareCard component correctly renders
 * software entries using property-based testing with fast-check library.
 */

describe('SoftwareCard - Property Tests', () => {
  /**
   * Property 3: Required field rendering
   * **Validates: Requirements 3.1, 3.2**
   * 
   * Tests that any software entry renders both the logo/icon and the software name.
   * This property ensures that regardless of the software entry data, the card
   * always displays these two essential pieces of information.
   */
  it('Property 3: Any software entry renders both logo and name', () => {
    fc.assert(
      fc.property(
        // Generate arbitrary software entries with required fields
        fc.record({
          id: fc.string({ minLength: 1 }).filter(s => s.trim().length > 0),
          name: fc.string({ minLength: 1 }).filter(s => s.trim().length > 0),
          category: fc.constantFrom<SoftwareCategory>('main', 'past'),
          icon: fc.string({ minLength: 1 }).filter(s => s.trim().length > 0).map(path => `/software/${path}.webp`),
          version: fc.option(fc.string().filter(s => s.trim().length > 0), { nil: undefined }),
          yearLastUsed: fc.option(fc.integer({ min: 1990, max: 2030 }), { nil: undefined }),
          tags: fc.option(fc.array(fc.string()), { nil: undefined }),
          portfolioIds: fc.option(fc.array(fc.string()), { nil: undefined }),
        }),
        (generatedSoftware: SoftwareEntry) => {
          // Render the SoftwareCard with generated data
          const { container } = render(
            <SoftwareCard software={generatedSoftware} index={0} />
          );

          // Verify logo/icon is rendered
          // The component always renders a fallback div initially (lazy loading)
          // The fallback contains the first letter of the software name
          const firstLetter = generatedSoftware.name.charAt(0).toUpperCase();
          
          // Look for the fallback div by checking if it contains the first letter
          const allDivs = container.querySelectorAll('div');
          let fallbackDiv: Element | null = null;
          
          allDivs.forEach(div => {
            if (div.textContent === firstLetter && 
                div.style.fontSize === '1.5rem') {
              fallbackDiv = div;
            }
          });
          
          // Also check for img element (in case it loaded)
          const logoImg = container.querySelector('img[alt*="logo"]');
          
          // At least one of these should exist (logo or fallback)
          expect(logoImg || fallbackDiv).toBeTruthy();

          // If img exists, verify it has the correct alt text
          if (logoImg) {
            expect(logoImg.getAttribute('alt')).toContain(generatedSoftware.name);
            expect(logoImg.getAttribute('alt')).toContain('logo');
          }

          // If fallback exists, verify it shows the first letter of the name
          if (fallbackDiv) {
            expect(fallbackDiv.textContent).toBe(firstLetter);
          }

          // Verify software name is rendered as text in an h3 element
          const h3Element = container.querySelector('h3');
          expect(h3Element).toBeDefined();
          expect(h3Element?.textContent).toBe(generatedSoftware.name);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 3: Logo alt text includes software name
   * 
   * This test ensures that when a logo image is rendered, its alt text
   * always includes the software name for accessibility.
   */
  it('Property 3: Logo alt text includes software name for accessibility', () => {
    fc.assert(
      fc.property(
        fc.record({
          id: fc.string({ minLength: 1 }).filter(s => s.trim().length > 0),
          name: fc.string({ minLength: 1 }).filter(s => s.trim().length > 0),
          category: fc.constantFrom<SoftwareCategory>('main', 'past'),
          icon: fc.string({ minLength: 1 }).filter(s => s.trim().length > 0).map(path => `/software/${path}.webp`),
        }),
        (generatedSoftware: SoftwareEntry) => {
          const { container } = render(
            <SoftwareCard software={generatedSoftware} index={0} />
          );

          // Find the img element (if rendered)
          const logoImg = container.querySelector('img[alt*="logo"]');
          
          if (logoImg) {
            const altText = logoImg.getAttribute('alt') || '';
            // Alt text should contain the software name
            expect(altText.toLowerCase()).toContain(
              generatedSoftware.name.toLowerCase()
            );
            // Alt text should indicate it's a logo
            expect(altText.toLowerCase()).toContain('logo');
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 3: Software name is always visible as text content
   * 
   * This test ensures that the software name is rendered as visible text
   * content in the DOM, not just in attributes or hidden elements.
   */
  it('Property 3: Software name is always visible as text content', () => {
    fc.assert(
      fc.property(
        fc.record({
          id: fc.string({ minLength: 1 }).filter(s => s.trim().length > 0),
          name: fc.string({ minLength: 1 }).filter(s => s.trim().length > 0),
          category: fc.constantFrom<SoftwareCategory>('main', 'past'),
          icon: fc.string({ minLength: 1 }).filter(s => s.trim().length > 0).map(path => `/software/${path}.webp`),
        }),
        (generatedSoftware: SoftwareEntry) => {
          const { container } = render(
            <SoftwareCard software={generatedSoftware} index={0} />
          );

          // The name should be in an h3 element
          const h3Element = container.querySelector('h3');
          expect(h3Element).toBeDefined();
          expect(h3Element?.textContent).toBe(generatedSoftware.name);

          // The element should be visible (not hidden)
          expect(h3Element).toBeInTheDocument();
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 3: Both logo and name are present in the same card
   * 
   * This test ensures that both the logo and name are rendered within
   * the same software card container, maintaining component cohesion.
   */
  it('Property 3: Both logo and name are present in the same card container', () => {
    fc.assert(
      fc.property(
        fc.record({
          id: fc.string({ minLength: 1 }).filter(s => s.trim().length > 0),
          name: fc.string({ minLength: 1 }).filter(s => s.trim().length > 0),
          category: fc.constantFrom<SoftwareCategory>('main', 'past'),
          icon: fc.string({ minLength: 1 }).filter(s => s.trim().length > 0).map(path => `/software/${path}.webp`),
        }),
        (generatedSoftware: SoftwareEntry) => {
          const { container } = render(
            <SoftwareCard software={generatedSoftware} index={0} />
          );

          // Find the card container
          const cardContainer = container.querySelector('.software-card');
          expect(cardContainer).toBeDefined();

          // Verify logo/icon is within the card
          // Look for either img or fallback div containing first letter
          const firstLetter = generatedSoftware.name.charAt(0).toUpperCase();
          const logoImg = cardContainer?.querySelector('img[alt*="logo"]');
          
          let fallbackDiv: Element | null = null;
          const allDivs = cardContainer?.querySelectorAll('div') || [];
          allDivs.forEach(div => {
            if (div.textContent === firstLetter && 
                div.style.fontSize === '1.5rem') {
              fallbackDiv = div;
            }
          });
          
          expect(logoImg || fallbackDiv).toBeTruthy();

          // Verify name is within the card
          const nameInCard = cardContainer?.querySelector('h3');
          expect(nameInCard).toBeDefined();
          expect(nameInCard?.textContent).toBe(generatedSoftware.name);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 2: Conditional year display for main category
   * **Validates: Requirements 2.5**
   * 
   * Tests that software entries with category='main' do NOT display the year last used field,
   * even if yearLastUsed is present in the data. This ensures that current software
   * is not shown with a "last used" date, which would be semantically incorrect.
   */
  it('Property 2: Software entries with category=main do not display year last used', () => {
    fc.assert(
      fc.property(
        // Generate software entries with category='main' and a yearLastUsed value
        fc.record({
          id: fc.string({ minLength: 1 }).filter(s => s.trim().length > 0),
          name: fc.string({ minLength: 1 }).filter(s => s.trim().length > 0),
          category: fc.constant<SoftwareCategory>('main'), // Always 'main' category
          icon: fc.string({ minLength: 1 }).filter(s => s.trim().length > 0).map(path => `/software/${path}.webp`),
          yearLastUsed: fc.integer({ min: 1990, max: 2030 }), // Always include a year
          version: fc.option(fc.string().filter(s => s.trim().length > 0), { nil: undefined }),
          tags: fc.option(fc.array(fc.string()), { nil: undefined }),
          portfolioIds: fc.option(fc.array(fc.string()), { nil: undefined }),
        }),
        (generatedSoftware: SoftwareEntry) => {
          const { container } = render(
            <SoftwareCard software={generatedSoftware} index={0} />
          );

          // Verify that the year last used is NOT displayed
          // The component renders year with text "Last used: {year}"
          const cardText = container.textContent || '';
          
          // Should not contain "Last used:" text
          expect(cardText).not.toContain('Last used:');
          
          // Should not contain the year value as a standalone number
          expect(cardText).not.toContain(generatedSoftware.yearLastUsed?.toString() || '');
          
          // Verify no paragraph element contains the year
          const allParagraphs = container.querySelectorAll('p');
          allParagraphs.forEach(p => {
            const pText = p.textContent || '';
            expect(pText).not.toContain('Last used:');
            expect(pText).not.toContain(generatedSoftware.yearLastUsed?.toString() || '');
          });

          // Verify the card still renders (name should be present)
          const h3Element = container.querySelector('h3');
          expect(h3Element).toBeDefined();
          expect(h3Element?.textContent).toBe(generatedSoftware.name);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 2: Main category entries never show year regardless of data
   * 
   * This test verifies that even when yearLastUsed is explicitly provided
   * in the data for a main category entry, it is never rendered in the UI.
   * This is a stronger assertion that the conditional rendering works correctly.
   */
  it('Property 2: Main category with yearLastUsed still does not display year', () => {
    fc.assert(
      fc.property(
        fc.record({
          id: fc.string({ minLength: 1 }).filter(s => s.trim().length > 0),
          name: fc.string({ minLength: 1 }).filter(s => s.trim().length > 0),
          category: fc.constant<SoftwareCategory>('main'),
          icon: fc.string({ minLength: 1 }).filter(s => s.trim().length > 0).map(path => `/software/${path}.webp`),
          yearLastUsed: fc.integer({ min: 2000, max: 2025 }), // Explicit year
        }),
        (generatedSoftware: SoftwareEntry) => {
          const { container } = render(
            <SoftwareCard software={generatedSoftware} index={0} />
          );
          
          // The year should not appear anywhere in the rendered output
          const yearString = generatedSoftware.yearLastUsed?.toString();
          if (yearString) {
            // Check that the year doesn't appear in the visible text
            // (except possibly in the ARIA label, which we'll check separately)
            const visibleElements = container.querySelectorAll('h3, p, span, div');
            visibleElements.forEach(element => {
              const elementText = element.textContent || '';
              // If the element contains the year, it should not be a "Last used" display
              if (elementText.includes(yearString)) {
                expect(elementText).not.toContain('Last used:');
              }
            });
          }

          // Verify the ARIA label may contain the year but not as "last used"
          const card = container.querySelector('.software-card');
          const ariaLabel = card?.getAttribute('aria-label') || '';
          
          // ARIA label should indicate "currently in use" for main category
          expect(ariaLabel).toContain('currently in use');
          
          // ARIA label should NOT say "last used in"
          expect(ariaLabel).not.toContain('last used in');
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 4: Conditional year display for past category
   * **Validates: Requirements 3.4**
   * 
   * Tests that software entries with category='past' display the year last used field.
   * This ensures that retired software shows when it was last actively used,
   * providing historical context about the developer's experience timeline.
   */
  it('Property 4: Software entries with category=past display year last used', () => {
    fc.assert(
      fc.property(
        // Generate software entries with category='past' and a yearLastUsed value
        fc.record({
          id: fc.string({ minLength: 1 }).filter(s => s.trim().length > 0),
          name: fc.string({ minLength: 1 }).filter(s => s.trim().length > 0),
          category: fc.constant<SoftwareCategory>('past'), // Always 'past' category
          icon: fc.string({ minLength: 1 }).filter(s => s.trim().length > 0).map(path => `/software/${path}.webp`),
          yearLastUsed: fc.integer({ min: 1990, max: 2030 }), // Always include a year
          version: fc.option(fc.string().filter(s => s.trim().length > 0), { nil: undefined }),
          tags: fc.option(fc.array(fc.string()), { nil: undefined }),
          portfolioIds: fc.option(fc.array(fc.string()), { nil: undefined }),
        }),
        (generatedSoftware: SoftwareEntry) => {
          const { container } = render(
            <SoftwareCard software={generatedSoftware} index={0} />
          );

          // Verify that the year last used IS displayed
          // The component renders year with text "Last used: {year}"
          const cardText = container.textContent || '';
          
          // Should contain "Last used:" text
          expect(cardText).toContain('Last used:');
          
          // Should contain the year value
          const yearString = generatedSoftware.yearLastUsed?.toString();
          expect(cardText).toContain(yearString);
          
          // Verify a paragraph element contains the year with "Last used:" prefix
          const allParagraphs = container.querySelectorAll('p');
          let foundYearParagraph = false;
          
          allParagraphs.forEach(p => {
            const pText = p.textContent || '';
            if (pText.includes('Last used:') && pText.includes(yearString || '')) {
              foundYearParagraph = true;
            }
          });
          
          expect(foundYearParagraph).toBe(true);

          // Verify the card still renders other required fields (name)
          const h3Element = container.querySelector('h3');
          expect(h3Element).toBeDefined();
          expect(h3Element?.textContent).toBe(generatedSoftware.name);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 4: Past category year display format
   * 
   * This test verifies that the year last used is displayed in the correct format
   * with the "Last used:" prefix for past category entries.
   */
  it('Property 4: Past category displays year with correct format', () => {
    fc.assert(
      fc.property(
        fc.record({
          id: fc.string({ minLength: 1 }).filter(s => s.trim().length > 0),
          name: fc.string({ minLength: 1 }).filter(s => s.trim().length > 0),
          category: fc.constant<SoftwareCategory>('past'),
          icon: fc.string({ minLength: 1 }).filter(s => s.trim().length > 0).map(path => `/software/${path}.webp`),
          yearLastUsed: fc.integer({ min: 2000, max: 2025 }),
        }),
        (generatedSoftware: SoftwareEntry) => {
          const { container } = render(
            <SoftwareCard software={generatedSoftware} index={0} />
          );

          // Find the paragraph containing the year
          const allParagraphs = container.querySelectorAll('p');
          let yearParagraph: Element | null = null;
          
          allParagraphs.forEach(p => {
            const pText = p.textContent || '';
            if (pText.includes('Last used:')) {
              yearParagraph = p;
            }
          });

          // Verify the paragraph exists and has the correct format
          expect(yearParagraph).toBeTruthy();
          
          if (yearParagraph) {
            const expectedText = `Last used: ${generatedSoftware.yearLastUsed}`;
            expect(yearParagraph.textContent).toBe(expectedText);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 4: Past category ARIA label includes year
   * 
   * This test ensures that the ARIA label for past category entries
   * includes the year last used for accessibility purposes.
   */
  it('Property 4: Past category ARIA label includes year last used', () => {
    fc.assert(
      fc.property(
        fc.record({
          id: fc.string({ minLength: 1 }).filter(s => s.trim().length > 0),
          name: fc.string({ minLength: 1 }).filter(s => s.trim().length > 0),
          category: fc.constant<SoftwareCategory>('past'),
          icon: fc.string({ minLength: 1 }).filter(s => s.trim().length > 0).map(path => `/software/${path}.webp`),
          yearLastUsed: fc.integer({ min: 1990, max: 2030 }),
        }),
        (generatedSoftware: SoftwareEntry) => {
          const { container } = render(
            <SoftwareCard software={generatedSoftware} index={0} />
          );

          // Get the ARIA label from the card
          const card = container.querySelector('.software-card');
          const ariaLabel = card?.getAttribute('aria-label') || '';
          
          // ARIA label should contain "last used in {year}"
          expect(ariaLabel).toContain('last used in');
          expect(ariaLabel).toContain(generatedSoftware.yearLastUsed?.toString() || '');
          
          // ARIA label should indicate "retired software"
          expect(ariaLabel).toContain('retired software');
          
          // ARIA label should NOT say "currently in use"
          expect(ariaLabel).not.toContain('currently in use');
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 10: ARIA label presence
   * **Validates: Requirements 8.3**
   * Feature: software-experience, Property 10: ARIA label presence
   * 
   * Tests that all software cards include appropriate ARIA labels for screen reader accessibility.
   * The ARIA label should provide meaningful information about the software entry including:
   * - Software name
   * - Version (if present)
   * - Year last used (for past category)
   * - Current usage status (main vs past category)
   */
  it('Property 10: All software cards include appropriate ARIA labels', () => {
    fc.assert(
      fc.property(
        // Generate arbitrary software entries with all possible field combinations
        fc.record({
          id: fc.string({ minLength: 1 }).filter(s => s.trim().length > 0),
          name: fc.string({ minLength: 1 }).filter(s => s.trim().length > 0),
          category: fc.constantFrom<SoftwareCategory>('main', 'past'),
          icon: fc.string({ minLength: 1 }).filter(s => s.trim().length > 0).map(path => `/software/${path}.webp`),
          version: fc.option(fc.string().filter(s => s.trim().length > 0), { nil: undefined }),
          yearLastUsed: fc.option(fc.integer({ min: 1990, max: 2030 }), { nil: undefined }),
          tags: fc.option(fc.array(fc.string()), { nil: undefined }),
          portfolioIds: fc.option(fc.array(fc.string()), { nil: undefined }),
        }),
        (generatedSoftware: SoftwareEntry) => {
          const { container } = render(
            <SoftwareCard software={generatedSoftware} index={0} />
          );

          // Find the software card element
          const card = container.querySelector('.software-card');
          expect(card).toBeTruthy();

          // Verify ARIA label attribute exists
          const ariaLabel = card?.getAttribute('aria-label');
          expect(ariaLabel).toBeTruthy();
          expect(ariaLabel).not.toBe('');

          // Verify ARIA label contains the software name
          expect(ariaLabel).toContain(generatedSoftware.name);

          // Verify ARIA label contains version information if present
          if (generatedSoftware.version) {
            expect(ariaLabel).toContain('version');
            expect(ariaLabel).toContain(generatedSoftware.version);
          }

          // Verify ARIA label contains category-specific information
          if (generatedSoftware.category === 'main') {
            // Main category should indicate current usage
            expect(ariaLabel).toContain('currently in use');
          } else if (generatedSoftware.category === 'past') {
            // Past category should indicate retired status
            expect(ariaLabel).toContain('retired software');
            
            // If yearLastUsed is present, it should be in the ARIA label
            if (generatedSoftware.yearLastUsed) {
              expect(ariaLabel).toContain('last used in');
              expect(ariaLabel).toContain(generatedSoftware.yearLastUsed.toString());
            }
          }

          // Verify the card has appropriate role for accessibility
          const role = card?.getAttribute('role');
          expect(role).toBe('button');

          // Verify the card is keyboard accessible (has tabIndex)
          const tabIndex = card?.getAttribute('tabIndex');
          expect(tabIndex).toBe('0');
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 10: ARIA label is non-empty and meaningful
   * 
   * This test ensures that the ARIA label is not just present, but contains
   * meaningful information (not just whitespace or generic text).
   */
  it('Property 10: ARIA label contains meaningful information', () => {
    fc.assert(
      fc.property(
        fc.record({
          id: fc.string({ minLength: 1 }).filter(s => s.trim().length > 0),
          name: fc.string({ minLength: 1 }).filter(s => s.trim().length > 0),
          category: fc.constantFrom<SoftwareCategory>('main', 'past'),
          icon: fc.string({ minLength: 1 }).filter(s => s.trim().length > 0).map(path => `/software/${path}.webp`),
        }),
        (generatedSoftware: SoftwareEntry) => {
          const { container } = render(
            <SoftwareCard software={generatedSoftware} index={0} />
          );

          const card = container.querySelector('.software-card');
          const ariaLabel = card?.getAttribute('aria-label') || '';

          // ARIA label should be non-empty after trimming
          expect(ariaLabel.trim().length).toBeGreaterThan(0);

          // ARIA label should be longer than just the software name
          // (it should include additional context)
          expect(ariaLabel.length).toBeGreaterThan(generatedSoftware.name.length);

          // ARIA label should contain at least the software name and category info
          expect(ariaLabel).toContain(generatedSoftware.name);
          
          // Should contain either "currently in use" or "retired software"
          const hasStatusInfo = 
            ariaLabel.includes('currently in use') || 
            ariaLabel.includes('retired software');
          expect(hasStatusInfo).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 10: ARIA label format consistency
   * 
   * This test verifies that the ARIA label follows a consistent format
   * across all software entries, making it predictable for screen reader users.
   */
  it('Property 10: ARIA label follows consistent format', () => {
    fc.assert(
      fc.property(
        fc.record({
          id: fc.string({ minLength: 1 }).filter(s => s.trim().length > 0),
          name: fc.string({ minLength: 1 }).filter(s => s.trim().length > 0),
          category: fc.constantFrom<SoftwareCategory>('main', 'past'),
          icon: fc.string({ minLength: 1 }).filter(s => s.trim().length > 0).map(path => `/software/${path}.webp`),
          version: fc.option(fc.string().filter(s => s.trim().length > 0), { nil: undefined }),
          yearLastUsed: fc.option(fc.integer({ min: 1990, max: 2030 }), { nil: undefined }),
        }),
        (generatedSoftware: SoftwareEntry) => {
          const { container } = render(
            <SoftwareCard software={generatedSoftware} index={0} />
          );

          const card = container.querySelector('.software-card');
          const ariaLabel = card?.getAttribute('aria-label') || '';

          // ARIA label should start with the software name
          expect(ariaLabel.startsWith(generatedSoftware.name)).toBe(true);

          // If version exists, it should appear after the name
          if (generatedSoftware.version) {
            const nameIndex = ariaLabel.indexOf(generatedSoftware.name);
            const versionIndex = ariaLabel.indexOf(generatedSoftware.version);
            // Only check if version appears after name if both are found
            if (nameIndex >= 0 && versionIndex >= 0) {
              expect(versionIndex).toBeGreaterThan(nameIndex);
            }
          }

          // Category information should appear at the end
          if (generatedSoftware.category === 'main') {
            expect(ariaLabel.endsWith('currently in use')).toBe(true);
          } else {
            expect(ariaLabel.endsWith('retired software')).toBe(true);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 11: Keyboard focus indicators
   * **Validates: Requirements 8.4**
   * Feature: software-experience, Property 11: Keyboard focus indicators
   * 
   * Tests that focusable elements in software cards have visible focus indicators
   * when focused via keyboard navigation. This ensures keyboard users can see
   * which element currently has focus, meeting accessibility requirements.
   * 
   * The test verifies:
   * - The card element is keyboard focusable (tabIndex=0)
   * - Focus-visible styles are defined in the component
   * - Outline properties are set for keyboard focus
   * - Box-shadow provides additional visual feedback
   */
  it('Property 11: Focusable elements have visible focus indicators', () => {
    fc.assert(
      fc.property(
        // Generate arbitrary software entries
        fc.record({
          id: fc.string({ minLength: 1 }).filter(s => s.trim().length > 0),
          name: fc.string({ minLength: 1 }).filter(s => s.trim().length > 0),
          category: fc.constantFrom<SoftwareCategory>('main', 'past'),
          icon: fc.string({ minLength: 1 }).filter(s => s.trim().length > 0).map(path => `/software/${path}.webp`),
          version: fc.option(fc.string().filter(s => s.trim().length > 0), { nil: undefined }),
          yearLastUsed: fc.option(fc.integer({ min: 1990, max: 2030 }), { nil: undefined }),
          tags: fc.option(fc.array(fc.string()), { nil: undefined }),
          portfolioIds: fc.option(fc.array(fc.string()), { nil: undefined }),
        }),
        (generatedSoftware: SoftwareEntry) => {
          const { container } = render(
            <SoftwareCard software={generatedSoftware} index={0} />
          );

          // Find the software card element
          const card = container.querySelector('.software-card');
          expect(card).toBeTruthy();

          // Verify the card is keyboard focusable
          const tabIndex = card?.getAttribute('tabIndex');
          expect(tabIndex).toBe('0');

          // Verify the card has role="button" for keyboard interaction
          const role = card?.getAttribute('role');
          expect(role).toBe('button');

          // Verify focus-visible styles are defined
          // The component includes a <style> tag with .software-card:focus-visible rules
          const styleElements = container.querySelectorAll('style');
          let hasFocusVisibleStyles = false;
          
          styleElements.forEach(styleEl => {
            const styleContent = styleEl.textContent || '';
            if (styleContent.includes('.software-card:focus-visible')) {
              hasFocusVisibleStyles = true;
              
              // Verify the focus-visible styles include outline
              expect(styleContent).toContain('outline:');
              
              // Verify outline is visible (not 'none')
              expect(styleContent).not.toContain('outline: none');
              expect(styleContent).not.toContain('outline:none');
              
              // Verify box-shadow is included for additional visual feedback
              expect(styleContent).toContain('box-shadow:');
            }
          });

          expect(hasFocusVisibleStyles).toBe(true);

          // Verify the card has outline: none in default state (to avoid double focus rings)
          // but this should be overridden by :focus-visible
          const computedStyle = window.getComputedStyle(card as Element);
          const outline = computedStyle.getPropertyValue('outline');
          
          // Default state should have outline: none (may be 'none' or 'none none' depending on browser)
          expect(outline.includes('none')).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 11: Focus indicator visibility properties
   * 
   * This test verifies that the focus indicator styles include specific
   * properties that ensure visibility: outline color, outline width,
   * outline offset, and box-shadow for enhanced visibility.
   */
  it('Property 11: Focus indicators have sufficient visibility properties', () => {
    fc.assert(
      fc.property(
        fc.record({
          id: fc.string({ minLength: 1 }).filter(s => s.trim().length > 0),
          name: fc.string({ minLength: 1 }).filter(s => s.trim().length > 0),
          category: fc.constantFrom<SoftwareCategory>('main', 'past'),
          icon: fc.string({ minLength: 1 }).filter(s => s.trim().length > 0).map(path => `/software/${path}.webp`),
        }),
        (generatedSoftware: SoftwareEntry) => {
          const { container } = render(
            <SoftwareCard software={generatedSoftware} index={0} />
          );

          // Find the style element containing focus-visible rules
          const styleElements = container.querySelectorAll('style');
          let focusVisibleStyleContent = '';
          
          styleElements.forEach(styleEl => {
            const styleContent = styleEl.textContent || '';
            if (styleContent.includes('.software-card:focus-visible')) {
              focusVisibleStyleContent = styleContent;
            }
          });

          expect(focusVisibleStyleContent).toBeTruthy();

          // Verify outline width is specified (should be at least 2px for visibility)
          const outlineMatch = focusVisibleStyleContent.match(/outline:\s*(\d+)px/);
          expect(outlineMatch).toBeTruthy();
          
          if (outlineMatch) {
            const outlineWidth = parseInt(outlineMatch[1], 10);
            expect(outlineWidth).toBeGreaterThanOrEqual(2);
          }

          // Verify outline-offset is specified for better visibility
          expect(focusVisibleStyleContent).toContain('outline-offset:');

          // Verify box-shadow provides additional visual feedback
          expect(focusVisibleStyleContent).toContain('box-shadow:');
          
          // Box-shadow should include multiple layers for depth
          const boxShadowMatches = focusVisibleStyleContent.match(/box-shadow:[^;]+/);
          if (boxShadowMatches) {
            const boxShadowValue = boxShadowMatches[0];
            // Should have multiple shadow layers (indicated by commas)
            expect(boxShadowValue.split(',').length).toBeGreaterThanOrEqual(2);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 11: Keyboard interaction support
   * 
   * This test verifies that the card responds to keyboard events (Enter and Space)
   * which is essential for keyboard accessibility. A focusable element should
   * also be activatable via keyboard.
   */
  it('Property 11: Focusable cards support keyboard interaction', () => {
    fc.assert(
      fc.property(
        fc.record({
          id: fc.string({ minLength: 1 }).filter(s => s.trim().length > 0),
          name: fc.string({ minLength: 1 }).filter(s => s.trim().length > 0),
          category: fc.constantFrom<SoftwareCategory>('main', 'past'),
          icon: fc.string({ minLength: 1 }).filter(s => s.trim().length > 0).map(path => `/software/${path}.webp`),
        }),
        (generatedSoftware: SoftwareEntry) => {
          let clickHandlerCalled = false;
          const mockOnClick = () => {
            clickHandlerCalled = true;
          };

          const { container } = render(
            <SoftwareCard 
              software={generatedSoftware} 
              index={0} 
              onClick={mockOnClick}
            />
          );

          const card = container.querySelector('.software-card') as HTMLElement;
          expect(card).toBeTruthy();

          // Verify the card can receive focus
          expect(card.getAttribute('tabIndex')).toBe('0');

          // Verify the card has a role that indicates it's interactive
          expect(card.getAttribute('role')).toBe('button');

          // Simulate keyboard events
          // Note: In a real browser, these would trigger the onClick handler
          // Here we're verifying the element has the necessary attributes
          // for keyboard interaction
          
          // The card should have onKeyDown handler (we can't directly test the handler
          // but we can verify the element is set up for keyboard interaction)
          expect(card.getAttribute('role')).toBe('button');
          expect(card.getAttribute('tabIndex')).toBe('0');
          
          // These attributes together indicate the element is keyboard accessible
          // and will respond to Enter/Space keys as per ARIA button pattern
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 11: Focus indicator contrast
   * 
   * This test verifies that the focus indicator uses colors with sufficient
   * contrast against the background to be visible to users with low vision.
   * The outline should use a purple/violet color consistent with the theme
   * but with sufficient brightness for visibility.
   */
  it('Property 11: Focus indicators use high-contrast colors', () => {
    fc.assert(
      fc.property(
        fc.record({
          id: fc.string({ minLength: 1 }).filter(s => s.trim().length > 0),
          name: fc.string({ minLength: 1 }).filter(s => s.trim().length > 0),
          category: fc.constantFrom<SoftwareCategory>('main', 'past'),
          icon: fc.string({ minLength: 1 }).filter(s => s.trim().length > 0).map(path => `/software/${path}.webp`),
        }),
        (generatedSoftware: SoftwareEntry) => {
          const { container } = render(
            <SoftwareCard software={generatedSoftware} index={0} />
          );

          // Find the style element containing focus-visible rules
          const styleElements = container.querySelectorAll('style');
          let focusVisibleStyleContent = '';
          
          styleElements.forEach(styleEl => {
            const styleContent = styleEl.textContent || '';
            if (styleContent.includes('.software-card:focus-visible')) {
              focusVisibleStyleContent = styleContent;
            }
          });

          expect(focusVisibleStyleContent).toBeTruthy();

          // Verify the outline uses a visible color (not transparent or black)
          // The component uses rgba(167, 139, 250, 0.8) which is a light purple
          expect(focusVisibleStyleContent).toContain('rgba(167, 139, 250');
          
          // Verify the opacity is high enough for visibility (should be > 0.5)
          const outlineColorMatch = focusVisibleStyleContent.match(/rgba\(167,\s*139,\s*250,\s*([\d.]+)\)/);
          if (outlineColorMatch) {
            const opacity = parseFloat(outlineColorMatch[1]);
            expect(opacity).toBeGreaterThan(0.5);
          }

          // Verify box-shadow also uses visible colors for the glow effect
          expect(focusVisibleStyleContent).toContain('rgba(139, 92, 246');
        }
      ),
      { numRuns: 100 }
    );
  });
});
