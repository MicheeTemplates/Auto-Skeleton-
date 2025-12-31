export interface ProbeResult {
  width: number;
  height: number;
  display: string;
  borderRadius: string;
  gap: number;
  children: HTMLElement[];
  textNodes: Text[];
  styles: CSSStyleDeclaration;
  // Flex/Grid layout properties
  justifyContent?: string;
  alignItems?: string;
  flexWrap?: string;
  gridTemplateColumns?: string;
  gridTemplateRows?: string;
}

export function probe(el: HTMLElement): ProbeResult {
  // 1. Measure the exact pixel size and position
  const rect = el.getBoundingClientRect();
  

  // 2. Read the full CSS styles (display, padding, etc.)
  const styles = window.getComputedStyle(el);
  
  console.log("gap: ", styles.gap)
  return {
    width: rect.width,
    height: rect.height,
    display: styles.display,
    borderRadius: styles.borderRadius,
    gap: parseFloat(styles.gap || "0"), // Parse '10px' to 10
    children: Array.from(el.children) as HTMLElement[], // Convert HTMLCollection to Array
    // 4. Find only the actual text nodes (nodeType 3 is text)
    textNodes: Array.from(el.childNodes).filter((n): n is Text => n.nodeType === 3),
    styles,
    // Flex/Grid layout properties
    justifyContent: styles.justifyContent !== 'normal' ? styles.justifyContent : undefined,
    alignItems: styles.alignItems !== 'normal' ? styles.alignItems : undefined,
    flexWrap: styles.flexWrap !== 'nowrap' ? styles.flexWrap : undefined,
    gridTemplateColumns: styles.gridTemplateColumns !== 'none' ? styles.gridTemplateColumns : undefined,
    gridTemplateRows: styles.gridTemplateRows !== 'none' ? styles.gridTemplateRows : undefined
  };
}
