// Fetch the data from the data.json file in the root directory
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        // Populate the JSON-LD schema with the loaded data
        const jsonLdSchema = document.getElementById('json-ld-schema');
        const jsonData = JSON.parse(jsonLdSchema.textContent);

        // Set the creator name dynamically
        jsonData.creator.name = data.creatorName || "Your Default Name"; // Fallback to default if not provided

        // Populate the relatedLink array with the artist data
        data.friends.forEach(friend => {
            const relatedLink = {
                "@type": "WebPage",
                "name": friend.name,
                "url": friend.link,
                "description": friend.description || "No description available."
            };

            jsonData.relatedLink.push(relatedLink);
        });

        // Update the schema in the document
        jsonLdSchema.textContent = JSON.stringify(jsonData, null, 2);
    })
    .catch(error => console.error('Error loading the data.json file:', error));