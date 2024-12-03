import { fetchRSSFeed, getFeedById, updateFeedLastFetch } from './fetcher';
import { parseRSSFeed } from './parser';
import { processRSSItems } from './processor';

export async function refreshRSSFeed(id: number): Promise<void> {
  try {
    // Get feed details
    const feed = await getFeedById(id);

    // Fetch and parse RSS feed
    const xmlText = await fetchRSSFeed(feed.url);
    const parsedFeed = parseRSSFeed(xmlText);

    // Process RSS items
    await processRSSItems(parsedFeed.items, feed);

    // Update last_fetch timestamp
    await updateFeedLastFetch(id);
  } catch (error) {
    console.error('Error refreshing RSS feed:', error);
    throw error;
  }
}

export * from './types';