export type NarrativeSectionId =
  | 'hero'
  | 'comparison'
  | 'story'
  | 'impact'
  | 'testimonials'

export type AssetKind = 'video' | 'image' | 'metadata'

export interface AssetRef {
  id: string
  filename: string
  src: string
  kind: AssetKind
  alt: string
  usage: string[]
  renderable: boolean
  note?: string
}

export interface StoryBlock {
  id: string
  title: string
  sentence: string
  beforeAssetId: string
  afterAssetId: string
}

export interface ImpactPoint {
  id: string
  title: string
  value: string
  sentence: string
}

export type ComparisonMode = 'interactive' | 'side-by-side'

export interface ComparisonScene {
  id: string
  title: string
  descriptor: string
  beforeAssetId: string
  afterAssetId: string
  note: string
}

export interface TestimonialItem {
  id: string
  quote: string
  author: string
  role: string
}

export const narrativeSectionOrder: NarrativeSectionId[] = [
  'hero',
  'comparison',
  'story',
  'impact',
  'testimonials',
]

export const anchorNavItems = [
  { id: 'comparison', label: 'Compare' },
  { id: 'story', label: 'Reimagine' },
  { id: 'impact', label: 'Experience' },
  { id: 'testimonials', label: 'Validate' },
] as const

export const brandCopy = {
  title: 'Eco Kernelios',
  subtitle: 'From inherited concrete to a living campus ecosystem.',
}

export const heroCopy = {
  eyebrow: 'Presentation-first ecological campus narrative',
  title: 'From inherited concrete to a living campus ecosystem.',
  subtitle:
    'A cinematic walkthrough of how comparison, reimagined space, and lived student experience reshape the Eco Kernelios story.',
}

export const comparisonCopy = {
  heading: 'SketchUp vs Render',
  framing: 'Inspect each scene to see how ecological intent transforms the same architectural idea.',
  labels: {
    before: 'Original',
    after: 'Ecological Vision',
  },
}

export const comparisonScenes: ComparisonScene[] = [
  {
    id: 'campus-overview',
    title: 'Campus Overview',
    descriptor: 'Campus Core',
    beforeAssetId: 'original-structure',
    afterAssetId: 'new-building-above',
    note: 'Envelope surfaces shift from neutral massing to planted ecological infrastructure.',
  },
  {
    id: 'side-wing',
    title: 'Side Wing',
    descriptor: 'Urban Edge',
    beforeAssetId: 'original-side-structure',
    afterAssetId: 'new-side-building',
    note: 'Facade language evolves into shaded, layered bands that reduce heat gain and soften street edges.',
  },
  {
    id: 'office-studio',
    title: 'Office Studio',
    descriptor: 'Work Environment',
    beforeAssetId: 'original-office',
    afterAssetId: 'new-office',
    note: 'Work areas shift from dense neutral interiors into calmer spaces with greenery and softer light.',
  },
  {
    id: 'classroom-shift',
    title: 'Classroom Shift',
    descriptor: 'Learning Environment',
    beforeAssetId: 'original-classroom',
    afterAssetId: 'new-classroom',
    note: 'Interiors move from rigid layouts to warmer biophilic settings with calmer material rhythm.',
  },
]

export const impactCopy = {
  heading: 'Environmental Contribution',
  intro: 'Measured design moves that reduce impact while improving daily campus life.',
}

export const testimonialCopy = {
  heading: 'Student Testimonials',
  intro: 'Quiet confidence from the people who study in the transformed spaces.',
}

export const footerCopy = {
  designer: 'Shaked Navon',
  rights: '© All rights reserved Shaked Navon 2026',
  linkedInLabel: 'LinkedIn',
  linkedInHref:
    'https://www.linkedin.com/in/shaked-navon-801053393/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BswuM4w09RJG8viIZhj8AUw%3D%3D',
}

export const assetRegistry: AssetRef[] = [
  {
    id: 'kernelios-video',
    filename: 'kernelios-hero-drone-reveal.mp4',
    src: '/assets/kernelios-hero-drone-reveal.mp4',
    kind: 'video',
    alt: 'Cinematic drone reveal passing over the Eco Kernelios campus transformation.',
    usage: ['hero-background'],
    renderable: true,
  },
  {
    id: 'lecture',
    filename: 'lecture.png',
    src: '/assets/lecture.png',
    kind: 'image',
    alt: 'Students gathering in a green-aware lecture setting.',
    usage: ['hero-poster', 'testimonials-context'],
    renderable: true,
  },
  {
    id: 'new-building-above',
    filename: 'new-building-above.png',
    src: '/assets/new-building-above.png',
    kind: 'image',
    alt: 'Top-down ecological massing study of the redesigned campus building.',
    usage: ['impact-visual'],
    renderable: true,
  },
  {
    id: 'new-building',
    filename: 'new-building.png',
    src: '/assets/new-building.png',
    kind: 'image',
    alt: 'Ecological vision render of the primary building with planted terraces.',
    usage: ['comparison-after'],
    renderable: true,
  },
  {
    id: 'new-classroom',
    filename: 'new-classrom.png',
    src: '/assets/new-classrom.png',
    kind: 'image',
    alt: 'Biophilic classroom render with daylight and natural materials.',
    usage: ['story-after-classroom'],
    renderable: true,
  },
  {
    id: 'new-office',
    filename: 'new-office.png',
    src: '/assets/new-office.png',
    kind: 'image',
    alt: 'Sustainable office interior with integrated greenery and passive light.',
    usage: ['story-after-office'],
    renderable: true,
  },
  {
    id: 'new-side-building',
    filename: 'new-side-building.png',
    src: '/assets/new-side-building.png',
    kind: 'image',
    alt: 'Ecological side-building concept integrating native landscape buffers.',
    usage: ['story-after-side-building'],
    renderable: true,
  },
  {
    id: 'kernelios-header-logo',
    filename: 'kernelios-header-logo.png',
    src: '/assets/kernelios-header-logo.png',
    kind: 'image',
    alt: 'Kernelios header logo with brand mark and yellow ribbon.',
    usage: ['site-brand'],
    renderable: true,
  },
  {
    id: 'original-classroom',
    filename: 'original-classrom.jpeg',
    src: '/assets/original-classrom.jpeg',
    kind: 'image',
    alt: 'Original classroom condition before ecological redesign.',
    usage: ['comparison-before', 'story-before-classroom'],
    renderable: true,
  },
  {
    id: 'original-office',
    filename: 'original-office.jpeg',
    src: '/assets/original-office.jpeg',
    kind: 'image',
    alt: 'Original office condition before ecological redesign.',
    usage: ['comparison-before', 'story-before-office'],
    renderable: true,
  },
  {
    id: 'original-side-structure',
    filename: 'original-side-structure.jpeg',
    src: '/assets/original-side-structure.jpeg',
    kind: 'image',
    alt: 'Original side-building condition before ecological redesign.',
    usage: ['comparison-before', 'story-before-side-building'],
    renderable: true,
  },
  {
    id: 'original-structure',
    filename: 'original-sturcture.jpeg',
    src: '/assets/original-sturcture.jpeg',
    kind: 'image',
    alt: 'Original architectural structure used as baseline for comparison.',
    usage: ['comparison-before', 'story-before-campus'],
    renderable: true,
  },
  {
    id: 'system-ds-store',
    filename: '.DS_Store',
    src: '/assets/.DS_Store',
    kind: 'metadata',
    alt: 'macOS metadata file',
    usage: ['excluded-from-ui'],
    renderable: false,
    note: 'Excluded intentionally because it is not a web-renderable media asset.',
  },
]

export const storyBlocks: StoryBlock[] = [
  {
    id: 'classroom',
    title: 'Reimagine Learning',
    sentence: 'Classrooms evolve from sealed rooms into daylight-led ecosystems for focus and well-being.',
    beforeAssetId: 'original-classroom',
    afterAssetId: 'new-classroom',
  },
  {
    id: 'office',
    title: 'Reimagine Work',
    sentence: 'Workspaces shift toward calm natural materials that reduce stress and support deep attention.',
    beforeAssetId: 'original-office',
    afterAssetId: 'new-office',
  },
  {
    id: 'campus',
    title: 'Reimagine Campus Edges',
    sentence: 'Peripheral buildings become climate-active layers that reconnect architecture with landscape.',
    beforeAssetId: 'original-side-structure',
    afterAssetId: 'new-side-building',
  },
]

export const impactPoints: ImpactPoint[] = [
  {
    id: 'daylight',
    title: 'Daylight Access',
    value: '+34%',
    sentence: 'Expanded openings and solar-aware orientation reduce daytime lighting demand.',
  },
  {
    id: 'cooling',
    title: 'Cooling Load',
    value: '-28%',
    sentence: 'Shading depth, vegetation, and envelope tuning lower peak summer heat gain.',
  },
  {
    id: 'rainwater',
    title: 'Rainwater Reuse',
    value: '1.9M L/yr',
    sentence: 'Runoff is captured for irrigation and non-potable campus maintenance cycles.',
  },
  {
    id: 'biodiversity',
    title: 'Habitat Surface',
    value: '+2.3x',
    sentence: 'Native planting and layered groundcover increase pollinator-supporting area.',
  },
]

export const testimonials: TestimonialItem[] = [
  {
    id: 'maya',
    quote:
      'The campus feels quieter and more breathable now. Even short studio sessions feel less exhausting.',
    author: 'Maya Levin',
    role: 'Architecture Student, Year 3',
  },
  {
    id: 'idan',
    quote:
      'Comparing the old and new drawings changed how we evaluate design quality. Sustainability became measurable.',
    author: 'Idan Katz',
    role: 'Environmental Systems Student',
  },
  {
    id: 'lia',
    quote:
      'The redesign proved we can protect identity while upgrading performance. It feels both familiar and future-ready.',
    author: 'Lia Romano',
    role: 'Urban Design Graduate Researcher',
  },
]

export const renderableAssets = assetRegistry.filter((asset) => asset.renderable)

export function getAssetById(assetId: string): AssetRef {
  const match = assetRegistry.find((asset) => asset.id === assetId)

  if (!match) {
    throw new Error(`Unknown asset id: ${assetId}`)
  }

  return match
}
