import { Coffee, Utensils } from "lucide-react";
import { ReactNode } from "react";

export const CITIES = ['McAllen', 'Edinburg', 'Pharr', 'Mission', 'San Juan']

export type City = 'Mcallen' | 'Edinburg';

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
  }

}

export const CATEGORIES = ['Coffee Shops']

export const categoryTableMap: Record<string, string> = {
  'coffee-shop': 'coffee_shops',
  another: 'another_table',
  // Add other category mappings as needed
};

