//adding API functionality to summarize button
document
  .getElementById("summarizeButton")
  .addEventListener("click", async function () {
    //retrieving user input for url
    const urlInput = document.getElementById("urlInput").value;
    //display summary in designated text area
    const summaryTextArea = document.getElementById("summaryText");
    //error handling to check if url is present
    if (!urlInput) {
      alert("Please enter a valid URL");
      return;
    }

    // Prepare the URL for the API call by dynamically inserting the user-provided URL
    const apiUrl = `https://article-extractor-and-summarizer.p.rapidapi.com/summarize?url=${encodeURIComponent(
      urlInput
    )}&lang=en&engine=2`;

    // Defining headers,
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "b4a601785dmshd84799f025ec1c1p1c6eb5jsnebedef5a0eb8", // Replace with your actual RapidAPI key
        "x-rapidapi-host": "article-extractor-and-summarizer.p.rapidapi.com",
      },
    };

    try {
      // Make the fetch request
      const response = await fetch(apiUrl, options);

      // Handle non-2xx responses
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Parse the response as JSON (assuming the API returns a JSON response)
      const result = await response.json();

      // Check if the API returns a summary and display it
      if (result.summary) {
        summaryTextArea.value = result.summary;
      } else {
        summaryTextArea.value =
          "Unable to summarize the content. Please check the URL.";
      }
    } catch (error) {
      console.error("Error during fetch operation:", error);
      summaryTextArea.value = "An error occurred. Please try again.";
    }
  });
