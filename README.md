<a name="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<br />
<div align="center">
  <a href="https://github.com/9Mohamedismail/jobBlink">
    <img src="https://raw.githubusercontent.com/9Mohamedismail/jobBlink/main/src/assets/Logo.png" alt="JobBlink Logo" width="90" height="90">
  </a>

<h3 align="center">JobBlink</h3>

  <p align="center">
    Track your job applications in a blink — no spreadsheets, no clutter.
    <br />
    <a href="https://github.com/9Mohamedismail/jobBlink">View Demo</a>
  </p>
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About JobBlink</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#features">Features</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#credit">Credit</a></li>
  </ol>
</details>

## About JobBlink

**JobBlink** is a job application tracker that eliminates the need to manually enter job data into spreadsheets. Paste a link from Greenhouse, Workday, Lever, or Ashby, and JobBlink will auto-extract the job title, company, location, and more — saving it to your table instantly.

Whether you want to edit job details, apply custom tags, or add entries manually, JobBlink is built to make job tracking effortless.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

* ![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite\&logoColor=white)
* ![React](https://img.shields.io/badge/React-20232A?logo=react\&logoColor=61DAFB)
* ![Styled Components](https://img.shields.io/badge/Styled--Components-DB7093?logo=styled-components\&logoColor=white)
* ![Puppeteer](https://img.shields.io/badge/Puppeteer-40B5A4?logo=puppeteer\&logoColor=white)

### Features

* 🔗 Paste job links and auto-extract metadata
* 📝 Edit job details inline in a clean table
* 🏷️ Tag jobs with statuses like "applied", "interviewing", "offer"
* ✍️ Add jobs manually
* 💾 All data stored in browser — no login required
* 📤 Export job list to CSV

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Getting Started

### Prerequisites

* Node.js + npm

### Installation

bash
git clone https://github.com/9Mohamedismail/jobBlink.git
cd jobBlink
npm install
npm run dev


This will start both the frontend (Vite) and backend (Express) using concurrently.

> ⚠️ Make sure ports 5173 (frontend) and 5000 (backend) are available on your machine. If you want to use different ports, you'll need to update the CLIENT_URL in your server and vite.config.js accordingly.

Backend can also be run separately:

bash
cd server
npm install
node index.js


<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Usage

> Add demo GIFs/screenshots here to show the workflow: paste job, auto-fill, edit, tag, and export.

md
![Paste job link](screenshots/paste-link.gif)
![Edit and tag](screenshots/edit-tag.gif)


<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contributing

Contributions are welcome! Open an issue, fork the repo, and submit a PR.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## License

Distributed under the MIT License.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Credit

> UI inspired by [Cobalt](https://cobalt.tools) — full credit to their clean and minimal design approach, which greatly influenced this project. While the design is inspired, the codebase, functionality, and features are entirely original and tailored to solve a different problem — job application tracking.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN REFS -->

[contributors-shield]: https://img.shields.io/badge/contributors-1-green?style=for-the-badge
[contributors-url]: https://github.com/9Mohamedismail/jobBlink/graphs/contributors
[issues-shield]: https://img.shields.io/github/issues/9Mohamedismail/jobBlink.svg?style=for-the-badge
[issues-url]: https://github.com/9Mohamedismail/jobBlink/issues
[license-shield]: https://img.shields.io/github/license/9Mohamedismail/jobBlink.svg?style=for-the-badge
[license-url]: https://github.com/9Mohamedismail/jobBlink/blob/master/LICENSE