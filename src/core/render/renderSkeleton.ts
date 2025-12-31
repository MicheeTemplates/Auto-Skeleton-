import { SkeletonNode } from "../infer/types.js";

export function renderSkeleton(node: SkeletonNode): HTMLElement {
  const el = document.createElement("div");
  el.style.boxSizing = "border-box"; // Critical for sizing

  // Base styles for all skeletons
  el.style.backgroundColor = "#e0e0e0"; // Default gray
  el.style.overflow = "hidden"; // Clip children if needed

  if (node.kind === "block") {
    el.style.width = `${node.width}px`;
    el.style.height = `${node.height}px`;
    el.style.borderRadius = `${node.radius || 0}px`;
    el.setAttribute("data-sk", "block");
    return el;
  }

  if (node.kind === "text") {
    el.style.width = `${node.width}px`;
    // Total height = line height * lines + gaps
    // For simplicity, we'll make a container with gaps
    el.style.display = "flex";
    el.style.flexDirection = "column";
    el.style.gap = "8px"; // Spacing between lines
    el.style.backgroundColor = "transparent"; // Container is transparent
    el.setAttribute("data-sk", "text-group");

    for (let i = 0; i < node.lines; i++) {
        const line = document.createElement("div");
        line.style.width = i === node.lines - 1 && node.lines > 1 ? "60%" : "100%"; // Last line short
        line.style.height = `${node.height}px`;
        line.style.backgroundColor = "#e0e0e0";
        line.style.borderRadius = `${node.radius || 4}px`;
        el.appendChild(line);
    }
    return el;
  }

  if (node.kind === "group") {
    el.style.width = `${node.width}px`;
    el.style.height = `${node.height}px`; // Or 'auto' if we want it to grow? usually skeletons are fixed size to match original
    el.style.display = "flex";
    el.style.flexDirection = node.direction;
    el.style.gap = `${node.gap}px`;
    el.style.backgroundColor = "transparent"; // Groups are containers
    el.setAttribute("data-sk", "group");

    node.children.forEach(child => {
      el.appendChild(renderSkeleton(child));
    });
    return el;
  }

  return el;
}
