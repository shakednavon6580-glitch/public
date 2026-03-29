export type NarrativeSectionId =
  | 'hero'
  | 'comparison'
  | 'story'
  | 'impact'
  | 'testimonials'
  | 'takeaway'

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
  'takeaway',
]

export const anchorNavItems = [
  { id: 'hero', label: 'Observe' },
  { id: 'comparison', label: 'Compare' },
  { id: 'story', label: 'Reimagine' },
  { id: 'impact', label: 'Experience' },
  { id: 'testimonials', label: 'Validate' },
  { id: 'takeaway', label: 'Conclude' },
] as const

export const heroCopy = {
  title: 'Eco Kernelios',
  subtitle: 'From inherited concrete to a living campus ecosystem.',
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
    id: 'atrium-overview',
    title: 'Atrium Overview',
    descriptor: 'Campus Core',
    beforeAssetId: 'new-building',
    afterAssetId: 'new-building-above',
    note: 'Envelope surfaces shift from neutral massing to planted ecological infrastructure.',
  },
  {
    id: 'side-wing',
    title: 'Side Wing',
    descriptor: 'Urban Edge',
    beforeAssetId: 'new-side-building',
    afterAssetId: 'new-building',
    note: 'Facade language evolves into shaded, layered bands that reduce heat gain and soften street edges.',
  },
  {
    id: 'work-studio',
    title: 'Work Studio',
    descriptor: 'Interior Shift',
    beforeAssetId: 'new-office',
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

export const finalCopy = {
  heading: 'Final Takeaway',
  sentence:
    'Ecological architecture is not a style choice. It is a long-term learning environment for people, climate, and place.',
}

export const assetRegistry: AssetRef[] = [
  {
    id: 'kernelios-video',
    filename: 'kernelios-video.mp4',
    src: '/assets/kernelios-video.mp4',
    kind: 'video',
    alt: 'Aerial camera movement revealing the ecological redesign of the Kernelios campus.',
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
    usage: ['impact-visual', 'takeaway-surface'],
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
    id: 'original-classroom',
    filename: 'original-classrom.jpeg',
    src: '/assets/original-classrom.jpeg',
    kind: 'image',
    alt: 'Original classroom condition before ecological redesign.',
    usage: ['excluded-from-ui'],
    renderable: false,
    note: 'Excluded intentionally because the local file is unreadable in this environment (EPERM).',
  },
  {
    id: 'original-office',
    filename: 'original-office.jpeg',
    src: '/assets/original-office.jpeg',
    kind: 'image',
    alt: 'Original office condition before ecological redesign.',
    usage: ['excluded-from-ui'],
    renderable: false,
    note: 'Excluded intentionally because the local file is unreadable in this environment (EPERM).',
  },
  {
    id: 'original-side-structure',
    filename: 'original-side-structure.jpeg',
    src: '/assets/original-side-structure.jpeg',
    kind: 'image',
    alt: 'Original side-building condition before ecological redesign.',
    usage: ['excluded-from-ui'],
    renderable: false,
    note: 'Excluded intentionally because the local file is unreadable in this environment (EPERM).',
  },
  {
    id: 'original-structure',
    filename: 'original-sturcture.jpeg',
    src: '/assets/original-sturcture.jpeg',
    kind: 'image',
    alt: 'Original architectural structure used as baseline for comparison.',
    usage: ['excluded-from-ui'],
    renderable: false,
    note: 'Excluded intentionally because the local file is unreadable in this environment (EPERM).',
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
    beforeAssetId: 'lecture',
    afterAssetId: 'new-classroom',
  },
  {
    id: 'office',
    title: 'Reimagine Work',
    sentence: 'Workspaces shift toward calm natural materials that reduce stress and support deep attention.',
    beforeAssetId: 'new-building-above',
    afterAssetId: 'new-office',
  },
  {
    id: 'campus',
    title: 'Reimagine Campus Edges',
    sentence: 'Peripheral buildings become climate-active layers that reconnect architecture with landscape.',
    beforeAssetId: 'new-building',
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
