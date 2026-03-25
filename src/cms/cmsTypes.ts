// CMS Types for GTS Landing

export interface HeroContent {
  title: string;
  titleAccent: string;
  subtitle: string;
  chatBotGreeting: string;
}

export interface ClubFeature {
  id: string;
  icon: string; // lucide icon name
  title: string;
  description: string;
}

export interface ClubStats {
  members: string;
  vehicles: string;
  routes: string;
  support: string;
}

export interface AboutContent {
  badge: string;
  title: string;
  titleAccent: string;
  description: string;
  subdescription: string;
  stats: ClubStats;
  features: ClubFeature[];
}

export interface VehicleCategory {
  id: string;
  icon: string; // "Car" | "Ship" | "Plane"
  title: string;
  subtitle: string;
  description: string;
  stats: string;
  image: string;
  link: string; // category for experiences: "ground" | "water" | "air"
}

export interface TopOffer {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  price: string;
  originalPrice?: string;
  duration: string;
  location: string;
  capacity: string;
  rating: number;
  reviewsCount: number;
  badge?: string;
  features: string[];
  discount?: string;
}

export interface Experience {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  price: string;
  duration: string;
  capacity: string;
  location: string;
  category: string;
  isNew?: boolean;
  isPopular?: boolean;
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  experiences: string[];
  price: string;
  image: string;
  duration: string;
  badge?: string;
}

export interface PostAuthor {
  id: string;
  name: string;
  role: "team" | "guide" | "partner" | "guest";
  avatar: string;
  verified?: boolean;
}

export interface Post {
  id: string;
  type: "news" | "guide_story" | "partner" | "review" | "offer";
  authorId: string;
  title: string;
  content: string;
  image?: string;
  tags: string[];
  date: string;
  views: number;
  likes: number;
  comments: number;
}

export interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  date: string;
  text: string;
  service: string;
  verified: boolean;
}

export interface GuestStory {
  id: string;
  author: string;
  avatar: string;
  date: string;
  type: "photo" | "video";
  content: string;
  caption: string;
  likes: number;
  comments: number;
  location?: string;
  service: string;
}

export interface MembershipTier {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  icon: string;
  isPopular?: boolean;
  gradient: string;
}

export interface ContactInfo {
  phone: string;
  phoneNote: string;
  email: string;
  emailNote: string;
  address: string;
  addressNote: string;
  socialLinks: {
    instagram: string;
    facebook: string;
    youtube: string;
  };
}

export interface FooterContent {
  description: string;
  services: string[];
  contact: ContactInfo;
  copyright: string;
  membershipCTA: {
    title: string;
    description: string;
    buttonText: string;
  };
}

export interface CMSData {
  hero: HeroContent;
  about: AboutContent;
  vehicleCategories: VehicleCategory[];
  topOffers: TopOffer[];
  experiences: Experience[];
  scenarios: Scenario[];
  postAuthors: PostAuthor[];
  posts: Post[];
  reviews: Review[];
  guestStories: GuestStory[];
  membershipTiers: MembershipTier[];
  footer: FooterContent;
}
