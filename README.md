# Application Desk — web workspace

Live site: https://dryzzl.github.io/mass-application-program-site/

This repository contains only the public, static web dashboard. GitHub Pages serves it directly from the root of `main`; no installation or build step is needed.

## Features

- Browse five public US job postings across Quality Engineer, Software Engineer, Security Analyst and Data Analyst, checked October 5, 2026. Each lists an experience minimum of no more than one year. Availability can change.
- Filter by job category and inspect experience, location, source and salary. Posting summaries are not full descriptions or verified resume matches. The Evolve description is sourced from its Indeed listing; Cognizant's older stated start date needs confirmation.
- Import and export reports produced by the local Application Desk program.
- Search jobs, filter eligibility/status, and inspect qualification evidence.
- Open LinkedIn, Indeed, and ZipRecruiter sign-in and job-search pages.
- Explore clearly labeled fictional sample jobs.

## Data handling

Imported reports are read in your browser tab. They are not uploaded, persisted, or committed to this repository. Refreshing clears a private imported report and restores the public listings in `jobs.js`. This website does not receive passwords or read provider login sessions. There are no analytics, third-party scripts, or runtime API requests. Public jobs start as **Not assessed** and are excluded from eligible matches until reviewed in the local companion.

GitHub Pages cannot run the Python program, process resumes on a server, or automatically submit applications. Those features require the local companion. Run `.\run.ps1 report` in the companion and import `data/report.json` into the website. Run `.\run.ps1 serve` before choosing **Open local app**.

The complete Python companion is maintained in the private [mass-application-program repository](https://github.com/dryzzl/mass-application-program); access to that repository is required to download it.

## Deployment

These files are exported from the companion's `site/` directory. Push updated static files to `main` here to redeploy GitHub Pages. Publish only this static directory—never personal profiles, resume PDFs, application history, credential helpers, or browser session files.
