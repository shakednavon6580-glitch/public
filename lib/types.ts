export type UserRole = "admin" | "manager" | "viewer";

export type ProjectStatus = "draft" | "published" | "archived";

export type SectionType =
  | "hero"
  | "assignment_context"
  | "comparison"
  | "story"
  | "environmental_impact"
  | "testimonials";

export type MediaType = "source_sketch" | "image" | "video" | "thumbnail";

export type TestimonialStatus = "draft" | "approved" | "rejected";

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  overviewText?: string;
  academicContextText?: string;
  ecologicalFramingText?: string;
  status: ProjectStatus;
  publishedAt?: string;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectSection {
  id: string;
  projectId: string;
  type: SectionType;
  title?: string;
  shortText?: string;
  longText?: string;
  sustainabilityStatement?: string;
  displayOrder: number;
  isVisible: boolean;
  settings: Record<string, unknown>;
}

export interface MediaAsset {
  id: string;
  projectId: string;
  type: MediaType;
  storageKey: string;
  originalFilename: string;
  mimeType: string;
  fileSizeBytes: number;
  width?: number;
  height?: number;
  durationSeconds?: number;
  altText?: string;
  caption?: string;
  metadata: Record<string, unknown>;
  uploadedBy: string;
  createdAt: string;
}

export interface SectionMedia {
  id: string;
  sectionId: string;
  mediaAssetId: string;
  displayOrder: number;
  label?: string;
  narrativeText?: string;
  isPrimary: boolean;
}

export interface Testimonial {
  id: string;
  projectId: string;
  quoteText: string;
  authorName: string;
  authorRoleLabel?: string;
  themeTags: string[];
  status: TestimonialStatus;
  displayOrder: number;
  createdBy: string;
  approvedBy?: string;
  approvedAt?: string;
}
