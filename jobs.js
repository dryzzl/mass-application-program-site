// Public posting summaries only. Never add applicant profiles or resume evidence here.
'use strict';
window.curatedJobs = [
  {
    title: 'Quality Engineer (AI & Test Automation)', company: 'Cognizant', category: 'Quality Engineer',
    location: 'Dallas/Plano, TX; Charlotte/Cary, NC; Teaneck, NJ; Miami, FL · Onsite',
    url: 'https://careers.cognizant.com/us-en/jobs/46858/quality-engineer-ai-test-automation/',
    experience: '0–1 year in quality assurance or quality engineering', minimum_years: 0,
    description: 'Support automated testing of software and AI applications using Java, Python, APIs and SQL. Requires a relevant technical degree or equivalent experience, practical automation work, Agile/STLC knowledge, and exposure to CI/CD, performance testing, cloud platforms and Docker. Office assignment depends on business needs; relocation may be needed. The posting accepts applications on an ongoing basis but still mentions an August 2026 start: confirm the current intake with the employer.',
    salary: '$65,000/year', provider: 'manual'
  },
  {
    title: 'Quality Engineer I', company: 'Baxter', category: 'Quality Engineer',
    location: 'Cleveland, Mississippi · Manufacturing site',
    url: 'https://jobs.baxter.com/en/job/cleveland/quality-engineer-i/152/99124653584',
    experience: '0–1 year related experience; co-op experience accepted', minimum_years: 0,
    description: 'Entry-level manufacturing quality role supporting process and system validation, statistical studies, documentation and quality improvement. Requires a bachelor’s degree in engineering, computer science or a core science. Related co-op experience counts. Specialized manufacturing software and quality certifications are desirable. Review the employer’s physical and visual requirements before applying. Requisition 207462.',
    salary: '$76,000–$95,000/year', provider: 'manual'
  },
  {
    title: 'Software Engineer I, General', company: 'INSTALILY.AI', category: 'Software Engineer',
    location: 'New York, NY or San Francisco, CA · Onsite, 5 days/week',
    url: 'https://job-boards.greenhouse.io/instalilyai/jobs/4271757009',
    experience: '0–1 year as a software engineer', minimum_years: 0,
    description: 'Develop an enterprise AI platform and collaborate on customer deployments. Requires backend programming fluency, a modern web stack, strong problem-solving and communication, and a completed LLM-based project or integration. A related technical bachelor’s degree is listed, with demonstrated ability emphasized. Production cloud and CI/CD experience are preferred. This is an office-based role.',
    salary: '$100,000–$120,000/year', provider: 'greenhouse'
  },
  {
    title: 'OSOC Security Analyst - Cloud Pentesting', company: 'Evolve Security', category: 'Security Analyst',
    location: 'United States · Remote',
    url: 'https://apply.workable.com/evolve-security/j/862A8C87BC/apply/',
    source_url: 'https://www.indeed.com/viewjob?jk=ae39f9c79f59cb5e',
    experience: '0–1 year IT/security and penetration testing; education/labs count', minimum_years: 0,
    description: 'Help assess cloud and application vulnerabilities, validate findings, document remediation and work with clients. The employer-posted Indeed description requires Security+, cloud security fundamentals, hands-on exposure to offensive tools, command-line and scripting skills, and clear communication. Educational and lab experience can support the testing requirements. The employer application page is linked; full requirements were checked in the Indeed listing because the Workable description could not be retrieved.',
    salary: '$50,000/year', provider: 'manual'
  },
  {
    title: 'Data Analyst (Entry-Level)', company: 'Recidiviz', category: 'Data Analyst',
    location: 'United States · Remote, New York City or Oakland, CA',
    url: 'https://job-boards.greenhouse.io/recidiviz/jobs/4717510006',
    experience: '6 months practical data analysis; internships and research count', minimum_years: 0.5,
    description: 'Analyze criminal-justice datasets, support product launches and prepare visualizations. Requires practical experience cleaning and analyzing real datasets, SQL proficiency including joins and window functions, Python/Pandas familiarity, and collaborative communication. Internships, research and equivalent part-time work count toward the six-month minimum. Occasional travel to state partners, including correctional facilities, may be required. BI tools and public-sector data experience are preferred.',
    salary: '$85,000/year', provider: 'greenhouse'
  }
].map(job => ({...job, country: 'US', checked_on: '2026-10-05', description_kind: 'summary', requirements: [], requirements_reviewed: false}));
