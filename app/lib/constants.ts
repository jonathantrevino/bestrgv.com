import { Coffee, Utensils } from "lucide-react";
import { ReactNode } from "react";

export const CITIES = ['McAllen', 'Edinburg', 'Pharr', 'Mission', 'San Juan']

export type City = 'Mcallen' | 'Edinburg' | 'Pharr' | 'Mission' | 'San Juan';

export const CITY_DATA: Record<City, { title: string, description: string, image_url: string, alt: string, redirect_url: string, categories: { name: string, description: string, redirect_url: string, icon: any }[] }> = {
  'Mcallen': {
    title: 'McAllen',
    description: "Founded in 1904, McAllen, Texas, is a growing city known for its mild winters, proximity to Mexico, and thriving oil and gas industry. With a low cost of living, walkable downtown, and vibrant shopping and nightlife scenes, it' s a cultural hub offering a unique blend of attractions and activities.",
    image_url: '/mcallen_convention_center_at_night.webp',
    alt: 'Night time view of McAllen Convention Center',
    redirect_url: '/discover/city/mcallen',
    categories: [
      {
        name: 'Coffee Shops',
        description: 'Find the best coffee spots in McAllen, from cozy cafés to trendy espresso bars.',
        redirect_url: '/discover/coffee-shops/mcallen',
        icon: Utensils
      }
    ]
  },

  'Edinburg': {
    title: 'Edinburg',
    description: "Founded as the county seat of Hidalgo County, Edinburg, Texas, is the second-largest city in the county and the third-largest in the Rio Grande Valley. With a population of over 100,000, it' s part of the McAllen–Edinburg–Mission metropolitan area and home to the University of Texas Rio Grande Valley's main campus.",
    image_url: '/downtown_edinburg.webp',
    alt: 'Day time view of downtown Edinburg',
    redirect_url: '/discover/city/edinburg',
    categories: [
      {
        name: 'Coffee Shops',
        description: 'Discover Edinburg’s best coffee shops, perfect for studying, socializing, or just a great cup of coffee.',
        redirect_url: '/discover/city/edinburg/coffee-shops',
        icon: Coffee
      }
    ]
  },

  'Pharr': {
    title: 'Pharr',
    description: "Pharr, Texas, is a gateway to international trade and a vibrant city in the Rio Grande Valley. Known for its rich cultural heritage, diverse dining options, and access to outdoor activities, Pharr is a great place to explore.",
    image_url: '/pharr_building_daytime.webp',
    alt: 'A scenic view of Pharr, Texas',
    redirect_url: '/discover/city/pharr',
    categories: [
      {
        name: 'Coffee Shops',
        description: 'Explore the top coffee shops in Pharr, from hidden gems to well-known favorites.',
        redirect_url: '/discover/coffee-shops/pharr',
        icon: Coffee
      }
    ]
  },

  'Mission': {
    title: 'Mission',
    description: "Mission, Texas, is a city known for its citrus industry, historic sites, and outdoor recreation. Home to the National Butterfly Center and the World Birding Center, it's an ideal destination for nature lovers and adventurers.",
    image_url: '/mission_texas_city_daytime.webp',
    alt: 'A nature-filled view of Mission, Texas',
    redirect_url: '/discover/city/mission',
    categories: [
      {
        name: 'Coffee Shops',
        description: 'Find the best coffee shops in Mission for a perfect brew and cozy atmosphere.',
        redirect_url: '/discover/coffee-shops/mission',
        icon: Coffee
      }
    ]
  },

  'San Juan': {
    title: 'San Juan',
    description: "San Juan, Texas, is best known for the historic Basilica of Our Lady of San Juan del Valle, a major pilgrimage site. With a strong sense of community and a growing dining scene, it’s a city rich in tradition and local charm.",
    image_url: '/san_juan_city_daytime.webp',
    alt: 'A view of the Basilica in San Juan, Texas',
    redirect_url: '/discover/city/san-juan',
    categories: [
      {
        name: 'Coffee Shops',
        description: 'Discover cozy coffee shops in San Juan, ideal for a relaxing cup of coffee.',
        redirect_url: '/discover/coffee-shops/san-juan',
        icon: Coffee
      }
    ]
  }

}

export const CATEGORIES = ['Coffee Shops']

export const categoryTableMap: Record<string, string> = {
  'coffee-shop': 'coffee_shops',
  another: 'another_table',
  // Add other category mappings as needed
};

