// Script to update the hero subheading directly in localStorage

// Get existing content
let content = localStorage.getItem('siteContent');
let contentObj = content ? JSON.parse(content) : {};

// Update the hero subheading
contentObj.hero_subheading = "Finally, there's a comprehensive tech solution that easily enables any church or ministry to build and manage one-to-one discipleship programs, regardless of audience size.";

// Save back to localStorage
localStorage.setItem('siteContent', JSON.stringify(contentObj));

// Confirm update
console.log("Hero subheading updated successfully!");
console.log("New hero subheading:", contentObj.hero_subheading);

// Force page refresh to show changes
setTimeout(() => {
  window.location.reload();
}, 1000);