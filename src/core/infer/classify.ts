import { ProbeResult } from "./probe";

export type NodeType = "text" | "block" | "group";

export function classify(el: HTMLElement, probe: ProbeResult): NodeType {
  // Rule 1: If it contains text content that isn't empty, it's a Text Skeleton
  if (probe.textNodes.some(n => n.textContent?.trim())) return "text";

  // Rule 2: If it's inherently media (Img, Svg, Video), it's a Block Skeleton
  if (["IMG", "SVG", "VIDEO"].includes(el.tagName)) return "block";

  // Rule 3: If it holds multiple elements, it's a Group (container)
  if (probe.children.length > 1) return "group";

  // Default: Treat it as a generic Block
  return "block";
}