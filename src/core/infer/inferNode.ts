import { SkeletonNode, SkeletonGroup } from "./types.js";
import { probe } from "./probe.js";
import { classify } from "./classify.js";

export function inferNode(el: HTMLElement): SkeletonNode {
  const probeData = probe(el);
  const type = classify(el, probeData);

  if (type === "text") {
    // Infer text lines
    const lineHeight = parseFloat(probeData.styles.lineHeight) || 16;
    // Prevent zero lines if height is small but content exists
    const lines = Math.max(1, Math.round(probeData.height / lineHeight));
    return {
      kind: "text",
      width: probeData.width,
      height: lineHeight, // Height of a single line
      lines,
      radius: parseFloat(probeData.borderRadius) || 4 // Default radius for text
    };
  }

  if (type === "group") {
    // Detect flow direction based on children positions
    // Simple heuristic: if first two children are horizontally aligned, it's a row
    let direction: "row" | "column" = "column";
    if (probeData.children.length > 1) {
      const first = probeData.children[0].getBoundingClientRect();
      const second = probeData.children[1].getBoundingClientRect();
      // If vertical distance is small but horizontal is large -> row
      if (Math.abs(first.top - second.top) < Math.abs(first.left - second.left)) {
        direction = "row";
      }
    }

    return {
      kind: "group",
      width: probeData.width,
      height: probeData.height,
      direction,
      gap: probeData.gap,
      children: probeData.children.map(child => inferNode(child))
    };
  }

  // Block fallback
  return {
    kind: "block",
    width: probeData.width,
    height: probeData.height,
    radius: parseFloat(probeData.borderRadius)
  };
}
