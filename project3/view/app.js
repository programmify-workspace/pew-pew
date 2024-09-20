document.addEventListener('DOMContentLoaded', () => {
    const linkForm = document.getElementById('link-form');
    const displayShortenedLink = document.getElementById('shortenedLink');
    const getAllLinks = document.getElementById('getAllLinks');
    const displayAllLinks = document.getElementById('allLinksTable')
    

    // Fetch and display All shortenedLink
    const fetchAllLink = async () => {
        const response = await fetch('http://localhost:3000/api');
        const links = await response.json();
        links.forEach(links => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${links.fullLink}</td>
                <td><a href="http://localhost:3000/api/${links.shortenedLink}">${links.shortenedLink}</a></td>
                <td>http://localhost:3000/api/${links.shortenedLink}</td>`;
                displayAllLinks.appendChild(tr);
        });
    };

    // Add a new link
    linkForm.addEventListener('submit', async (e) => {
        const fullLink = document.getElementById('link').value.trim();
       const shortenedLink = Math.random().toString(36).replace(/[^a-z0-9]/gi,'').substr(2,10);
       
        console.log(fullLink)

        await fetch('http://localhost:3000/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ fullLink, shortenedLink })
        });

    });
    fetchAllLink();
});
fetchAllLink();