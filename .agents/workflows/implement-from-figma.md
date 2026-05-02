---
description: Implements UI components from a Figma link using shadcn as base and the project's design tokens
---

# Implement From Figma Workflow

This workflow guides the agent to inspect a Figma design, extract the minimal component structure, and implement it in code — using shadcn primitives as a base wherever possible, and falling back to scratch implementations when no fitting primitive exists. All colors and design tokens must come from `apps/frontend/src/index.css`.

## Step 1: Fetch Figma Data

Use the `mcp_figma_get_figma_data` tool with the provided Figma file key and, when a specific node is referenced, the node ID extracted from the URL (`node-id=...`).

- If the URL contains a `node-id` query param, pass it as `nodeId`.
- Start with a shallow read (no explicit `depth`) to get the top-level frame structure before going deeper.
- Identify the **root frame** that represents the component to implement.

## Step 2: Analyze the Component Structure

From the returned Figma data, map the visual hierarchy to understand:

- **Component boundaries**: Identify the smallest meaningful, reusable unit. A component is considered atomic when it cannot be split further without losing semantic meaning (e.g., a `Badge`, a `TransactionRow`, an `AmountInput`).
- **Variants and states**: Note any Figma variants (hover, active, disabled, empty) that must be reflected as props.
- **Composition**: Identify if the component is composed of smaller pieces that already exist as shadcn primitives (e.g., `Button`, `Card`, `Badge`, `Avatar`, `Separator`, `Input`, `Label`, `Select`, `Dialog`, `Tooltip`).

## Step 3: Download Required Assets

For any icons, illustrations, or images found in the Figma node:

- Use `mcp_figma_download_figma_images` to export them.
- Save SVG icons to `apps/frontend/src/assets/icons/`.
- Save illustrations/images to `apps/frontend/src/assets/images/`.
- Prefer SVG for icons and vector assets; use PNG (scale 2×) only for raster images.

## Step 4: Map Design Tokens

Before writing any code, cross-reference every color, radius, and typography value from Figma with the tokens defined in `apps/frontend/src/index.css`.

**Color mapping rules:**
- Brand greens → `--primary`, `--color-financy-brand-*`, or `--color-financy-green-*`
- Grayscale backgrounds/borders → `--color-financy-grayscale-*`
- Semantic feedback → `--color-financy-feedback-danger` / `--color-financy-feedback-success`
- Theme-aware surfaces → `--background`, `--card`, `--muted`, `--border`
- Accent colors → `--color-financy-blue-*`, `--color-financy-purple-*`, `--color-financy-pink-*`, etc.

**Never hardcode hex/rgb/oklch values directly in component files.** Always use the CSS custom property via a Tailwind utility class (e.g., `text-financy-grayscale-500`, `bg-primary`) or a CSS variable reference.

**Typography:** The project uses `Inter Variable` (`font-sans`). Use `font-heading` for headings. Do not import external fonts in components.

**Radius:** Use `--radius-sm` through `--radius-4xl` scale; map to Tailwind's `rounded-sm` → `rounded-[var(--radius-4xl)]` as appropriate.

## Step 5: Determine the Implementation Strategy

For each identified atomic component, decide:

| Condition | Strategy |
|---|---|
| A shadcn primitive covers the component's behavior exactly | **Extend** — import and style the shadcn primitive with `className` overrides or `cva` variants |
| A shadcn primitive covers *part* of the behavior | **Compose** — wrap or combine shadcn primitives |
| No shadcn primitive is a good fit | **Scratch** — build the component from scratch using only Tailwind utility classes and project tokens |

Do **not** install additional UI libraries. Do **not** create wrapper components that only rename a shadcn primitive without adding value.

## Step 6: Implement the Component

Create the component file in `apps/frontend/src/components/ui/` (for purely presentational, generic components) or `apps/frontend/src/components/` (for domain-specific components).

Follow these rules:
- **TypeScript**: Define a clear `interface Props` extending the base HTML element or shadcn primitive's own props.
- **Smallest surface area**: Expose only the props that vary across usages. Do not expose internals unnecessarily.
- **Variants via `cva`**: If the component has multiple visual states/sizes, use `cva` (class-variance-authority) for variant management — consistent with how shadcn components are built.
- **Accessibility**: Preserve all ARIA roles and attributes present in the shadcn primitive. For scratch components, add the appropriate `role`, `aria-label`, and keyboard interaction.
- **No inline styles**: Use only Tailwind classes or CSS variables. Never use `style={{ }}` for design values.
- **Dark mode**: All color choices must have a `.dark` counterpart via CSS custom properties already defined in `index.css` — no explicit `dark:` overrides needed if you use semantic tokens.

Example minimal structure:
```tsx
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const componentVariants = cva('base-classes', {
  variants: {
    variant: { default: '...', secondary: '...' },
    size: { sm: '...', md: '...', lg: '...' },
  },
  defaultVariants: { variant: 'default', size: 'md' },
})

interface ComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof componentVariants> {}

export function Component({ className, variant, size, ...props }: ComponentProps) {
  return (
    <div className={cn(componentVariants({ variant, size }), className)} {...props} />
  )
}
```

## Step 7: Verify Visual Fidelity

After implementation, invoke the `/validate-prototype` workflow targeting the component's story or the page where it appears.

Confirm:
- Colors match the Figma frame using mapped tokens.
- Spacing, typography scale, and border-radius are faithful to the design.
- All variants/states render correctly.
- No hardcoded color values exist in the component file.

If discrepancies are found, return to **Step 4** and re-map tokens, or adjust class usage accordingly.

## Step 8: Report

Summarize the work done to the user:
- The component name and file path.
- Which shadcn primitives were used (or if it was built from scratch).
- The props/variants exposed.
- Any design decisions or token mappings worth calling out.
- Any downloaded assets and where they were saved.
