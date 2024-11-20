const BlogUtils = {
    decodeHTMLEntities(text) {
        const textarea = document.createElement('textarea');
        textarea.innerHTML = text;
        return textarea.value;
    },
    stripHTML(html) {
        // Create a temporary div element
        const temp = document.createElement('div');
        // Set the HTML content
        temp.innerHTML = html;
        // Return just the text content
        return temp.textContent || temp.innerText || '';
    },
    getReadingTime(text) {
        // Average reading speed (words per minute)
        const wordsPerMinute = 225;
        
        // Count words by splitting on spaces and filtering out empty strings
        const words = text.trim().split(/\s+/).length;
    
        console.log("words: ", words);
        
        // Calculate reading time in minutes
        const minutes = Math.ceil(words / wordsPerMinute);
    
        console.log("minutes: ", minutes);
        
        // Format the output
        if (minutes === 1) {
            return '1 min read';
        } else {
            return `${minutes} min read`;
        }
    },
    formatViews(views) {
        if (views >= 1_000_000) {
        return (views / 1_000_000).toFixed(1) + 'm'; // For millions
        } else if (views >= 1_000) {
        return (views / 1_000).toFixed(1) + 'k'; // For thousands
        } else {
        return views.toString(); // For values below 1,000
        }
    }
}

window.blogUtils = BlogUtils;