
document.getElementById('pdfForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const heading = document.getElementById('heading').value;
    const content = document.getElementById('content').value;

    fetch('/generate-pdf', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ 
            heading: heading,
            content: content
        })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('downloadLink').href = data.url;
        document.getElementById('downloadSection').style.display = 'block';
    })
    .catch(error => console.error('Error:', error));
});