GitHub Repository Finder
A simple and interactive web application that allows users to discover random GitHub repositories by programming language or keyword search. It features dynamic content loading, robust error handling, and a smooth user experience.

Features
Language-based Filtering: Select from a predefined list of popular programming languages to find relevant repositories.

Keyword Search: Use the search bar to find repositories by any keyword, topic, or specific query.

Dynamic Content Loading: Repositories are fetched and displayed dynamically without full page reloads.

Loading State: A clear "Loading, please wait..." message is displayed with a 5-second delay to indicate ongoing data retrieval.

Comprehensive Error Handling:

Displays informative error messages for API failures (e.g., network issues, invalid queries, GitHub API rate limits).

Includes a "Click to retry" button to re-attempt the last search after an error.

Simulated Error Demonstration: The application is configured to intentionally trigger an error every third fetch attempt (regardless of input) to demonstrate its error handling capabilities.

Refresh Functionality: A "Refresh" button allows users to fetch another random repository based on the currently selected language or search query.

Responsive Design: Styled with basic CSS for a clean and user-friendly interface.

DOM Manipulation: Leverages pure JavaScript (DOM manipulation) to update the UI efficiently.

How It Works
The application interacts with the GitHub Search API to fetch repository data.

Language Selection / Keyword Input: Users can either choose a programming language from the dropdown or type a search query into the input field.

Search Initiation:

Selecting a language from the dropdown automatically triggers a search for repositories in that language.

Typing a keyword and clicking the "Search" button initiates a keyword-based search.

Selecting a language will clear the keyword search input, and vice-versa, ensuring only one search type is active.

Loading State: Upon initiating a search, a "Loading, please wait..." message appears for 5 seconds.

API Call: An asynchronous request is made to the GitHub Search API (/search/repositories).

Error Simulation: For demonstration purposes, every third search attempt is designed to fail, triggering the error state.

Response Handling:

Success: If successful, a random repository from the results is displayed, showing its name, description, stars, forks, and open issues. A "Refresh" button appears.

No Results: If no repositories are found for the given query, a specific message indicating this is displayed, along with a "Click to retry" button.

Error: If an API error occurs (e.g., network issue, rate limit, simulated error), an "Error fetching repositories" message is shown with details about the error, and a "Click to retry" button.

Retry/Refresh: The "Retry" button (on error/no results) and "Refresh" button (on success) will re-run the last active search query (either from the dropdown or the search input).

Technologies Used
HTML5: Structure of the web page.

CSS3: Styling and visual presentation.

JavaScript (ES6+): Core logic, DOM manipulation, asynchronous operations (Fetch API, Promises, Async/Await).

GitHub Search API: For fetching repository data.

Setup and Usage
To run this project locally:

1. Clone the repository (or download the source code):

# git clone <repository-url>
# cd github-repo-finder

2. Open index.html:
Navigate to the directory where you saved the files and open index.html in your web browser.

3. Interact with the application:

Select a programming language from the dropdown.

Type a keyword (e.g., "React", "Python", "machine learning") into the search bar and click "Search".

Observe the "Loading, please wait..." message for 5 seconds.

Try performing several searches to trigger the simulated error.

Use the "Refresh" or "Click to retry" buttons.

<img width="1680" alt="Screenshot 2025-06-27 at 4 06 55 PM" src="https://github.com/user-attachments/assets/7b65045a-95bd-49fa-a9c8-b590bb6adb9a" />

<img width="1680" alt="Screenshot 2025-06-27 at 4 06 48 PM" src="https://github.com/user-attachments/assets/34b0e8df-62a2-4de2-bea6-a558175c8870" />

<img width="1680" alt="Screenshot 2025-06-27 at 4 01 15 PM" src="https://github.com/user-attachments/assets/8e6b54ef-2330-473a-83f3-e83b57eda074" />

