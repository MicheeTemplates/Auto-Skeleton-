export interface SkeletonBase {
    width: number;
    height: number;
    radius?: number;
}

export interface SkeletonText extends SkeletonBase {
    kind: "text";
    lines: number;
}

export interface SkeletonBlock extends SkeletonBase {
    kind: "block";
}

export interface SkeletonGroup extends SkeletonBase {
    kind: "group";
    direction: "row" | "column";
    gap: number;
    children: SkeletonNode[];
}

export type SkeletonNode = SkeletonBlock | SkeletonText | SkeletonGroup;
