// Direct fix to ensure content is properly updated
// Run this code snippet in the browser console to fix your content issues

// Clear out all stored content
localStorage.removeItem('siteContent');
localStorage.removeItem('editableContent');

// Set new content directly
localStorage.setItem('siteContent', JSON.stringify({
  hero_heading: 'Discipleship Reimagined Stuff 90',
  hero_subheading: 'Revolutionizing how churches connect, disciple, and grow their communities through intentional relationships.',
  hero_cta_text: 'Learn More',
  timestamp: Date.now()
}));

// Force a reload
window.location.reload();

