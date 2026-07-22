# Local Development Setup Guide

This guide explains how to download, install, and run this website locally on your computer.

## Prerequisites

Before running the project, make sure you have:

- [Node.js](https://nodejs.org/) installed (LTS version recommended)
- npm (included with Node.js)
- A terminal application:
  - Terminal (macOS/Linux)
  - Command Prompt or PowerShell (Windows)

---

# Step 1: Download the Source Code

You can download the complete source code directly from Google AI Studio.

### Option 1: Export as ZIP

1. Open the project in **Google AI Studio**.
2. Open the **Settings** menu (usually located in the top-right corner or bottom-left sidebar).
3. Select:Export to ZIP
4. Download the compressed project archive.
5. Extract the ZIP file into a folder on your computer.

Example:rachel-mobile-physio/


---

### Option 2: Export to GitHub

Alternatively, you can export the project directly to a GitHub repository:

1. Select:Export to GitHub
2. Follow the GitHub connection steps.
3. Clone the repository locally:

git clone <repository-url>

4. Navigate into the project folder:

cd rachel-mobile-physio

# Step 2: Verify Node.js Installation

Open your terminal and check whether Node.js is installed:

node -v

You should see a version number, for example:

v22.x.x

If Node.js is not installed:

Visit the official Node.js website:

https://nodejs.org/

Download and install the LTS (Long Term Support) version.
Restart your terminal after installation.

# Step 3: Install Project Dependencies

Navigate to the project directory:

cd path/to/your/project-folder

Example:

cd rachel-mobile-physio

Install all required packages:

npm install

This will download all dependencies defined in package.json.

# Step 4: Run the Website Locally

Start the local development server:

npm run dev

After the server starts, your terminal will display a local address similar to:

http://localhost:3000

Open this address in your web browser:

http://localhost:3000

The website should now be running locally.

Note: If port 3000 is already being used, the development server will automatically select another available port and display the correct URL in the terminal.

# Step 5: Create a Production Build (Optional)

When the website is ready for deployment, create an optimized production build:

npm run build

This will generate a production-ready version of the website.

The output files will typically be created in:

dist/

The contents of this folder can be deployed to hosting platforms such as:

Netlify
Vercel
GitHub Pages
Any compatible web server