import { SkeletonNode } from "../infer/types.js";

export function renderSkeleton(node: SkeletonNode): HTMLElement {
  try {
    const el = document.createElement("div");
    el.style.boxSizing = "border-box"; // Critical for sizing

    // Default styles
    el.style.backgroundColor = "#d1d5db"; // Darker gray for better visibility
    el.style.overflow = "hidden"; // Clip children if needed

    // Apply common layout styles
    if (node.padding) el.style.padding = node.padding;
    if (node.margin) el.style.margin = node.margin;
    if (node.border) el.style.border = node.border;

    if (node.kind === "block") {
        el.style.width = `${node.width}px`;
        el.style.height = `${node.height}px`;
        el.style.borderRadius = `${node.radius || 0}px`;
        el.setAttribute("data-sk", "block");
        return el;
    }

    if (node.kind === "text") {
        el.style.width = `${node.width}px`;
        el.style.display = "flex";
        el.style.flexDirection = "column";
        
        // Add small gap for visual separation between skeleton lines
        const visualGap = 4;
        el.style.gap = `${visualGap}px`;
        el.style.backgroundColor = "transparent"; // Container is transparent
        el.setAttribute("data-sk", "text-group");

        // Calculate adjusted line height
        const totalGapHeight = visualGap * (node.lines - 1);
        const adjustedLineHeight = node.lines > 1 
            ? (node.height * node.lines - totalGapHeight) / node.lines
            : node.height;
        
        // Ensure valid line height
        const validLineHeight = isNaN(adjustedLineHeight) ? node.height : adjustedLineHeight;

        for (let i = 0; i < node.lines; i++) {
            const line = document.createElement("div");
            line.style.width = i === node.lines - 1 && node.lines > 1 ? "60%" : "100%"; // Last line short
            line.style.height = `${validLineHeight}px`; 
            line.style.backgroundColor = "#9ca3af"; // Darker line color
            line.style.borderRadius = `${node.radius || 4}px`;
            el.appendChild(line);
        }
        return el;
    }

    if (node.kind === "group") {
        el.style.width = `${node.width}px`;
        el.style.height = 'auto'; // Allow container to grow to fit children
        el.style.display = "flex";
        el.style.flexDirection = node.direction;
        el.style.gap = `${node.gap}px`;
        el.style.backgroundColor = "transparent"; // Groups are containers

        // Apply flex/grid layout properties
        if (node.justifyContent) el.style.justifyContent = node.justifyContent;
        if (node.alignItems) el.style.alignItems = node.alignItems;
        if (node.flexWrap) el.style.flexWrap = node.flexWrap;
        
        // Handle grid layouts
        if (node.gridTemplateColumns) {
            el.style.display = "grid";
            el.style.gridTemplateColumns = node.gridTemplateColumns;
        }
        if (node.gridTemplateRows) {
            el.style.gridTemplateRows = node.gridTemplateRows;
        }
        
        el.setAttribute("data-sk", "group");

        node.children.forEach(child => {
            el.appendChild(renderSkeleton(child));
        });
        return el;
    }

    return el;
  } catch (err) {
    console.error("Error rendering skeleton node:", err, node);
    const errorEl = document.createElement("div");
    errorEl.style.color = "red";
    errorEl.textContent = "Skeleton Error";
    return errorEl;
  }
}
