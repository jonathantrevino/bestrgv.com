import { slugify, underscoreify } from "../lib"
import { BASE_URL } from "../sitemap"

export async function fetchListing(category: string, city: string, slug: string) {
  try {
    const res = await fetch(`${BASE_URL}/api/searchListing?category=${category}&city=${city}&slug=${slug}`)
    const data = await res.json()
    if (data) {
      return data
    }
  } catch (err) {
    console.error(err)
  }

}

export const fetchListings = async (category: string | null, city: string | null, page: number) => {
  // Start with the base URL
  let url = `${BASE_URL}/api/getListings`;

  // Condition to add category to query params if it's not null
  const queryParams: string[] = [];

  if (category) {
    queryParams.push(`category=${underscoreify(category)}`);
  }

  // Condition to add city to query params if it's not null
  if (city) {
    queryParams.push(`city=${city}`);
  }

  queryParams.push(`page=${page}`);


  // If there are query params, append them to the URL
  if (queryParams.length > 0) {
    url += `?${queryParams.join('&')}`;
  }

  // Fetch the data from the server
  const res = await fetch(url);
  const data = await res.json();

  if (data) {
    return data;
  }
};



export async function fetchMapLocation(address: string) {
  try {
    const res = await fetch(`${BASE_URL}/api/getMapLocation?address=${address}`)
    const data = await res.json()

    if (data) {
      return data
    }

  } catch (err) {
    console.error(err)
  }
}
