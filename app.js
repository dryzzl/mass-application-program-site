'use strict';
const $ = id => document.getElementById(id);
const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[char]));
let jobs = [];
let sourceLabel = 'No report loaded';

function safeURL(value) {
  try { const url = new URL(value); return url.protocol === 'https:' && !url.username && !url.password ? url.href : null; }
  catch { return null; }
}

function validateReport(value) {
  if (!Array.isArray(value) || value.length > 5000) throw Error('Choose a report containing an array of up to 5,000 jobs.');
  for (const row of value) {
    if (!row || typeof row !== 'object' || !row.job || !row.match) throw Error('This file is not an Application Desk report. Export it with: .\\run.ps1 report');
    const {job, match} = row;
    if (!['title', 'company', 'url', 'description'].every(key => typeof job[key] === 'string')) throw Error('A job is missing its title, company, URL or description.');
    if (!safeURL(job.url)) throw Error('Every application link must use HTTPS and contain no embedded credentials.');
    if (typeof match.score !== 'number' || !Number.isFinite(match.score) || match.score < 0 || match.score > 100 || typeof match.eligible !== 'boolean') throw Error('A job has an invalid match result.');
    if (!Array.isArray(match.reasons) || !match.reasons.every(x => typeof x === 'string') || !Array.isArray(match.requirements)) throw Error('A job has invalid qualification evidence.');
    for (const req of match.requirements) {
      if (!req || typeof req.text !== 'string' || typeof req.passed !== 'boolean' || !Array.isArray(req.evidence) || !req.evidence.every(x => typeof x === 'string')) throw Error('A qualification is missing its evidence or result.');
    }
    if (typeof row.status !== 'string') throw Error('A job is missing its application status.');
  }
  return value;
}

function render() {
  const stats = [['Opportunities', jobs.length], ['Eligible matches', jobs.filter(r => r.match.eligible).length], ['Submitted', jobs.filter(r => r.status === 'submitted').length], ['Needs review', jobs.filter(r => !r.job.requirements_reviewed).length]];
  $('stats').innerHTML = stats.map(([label, count]) => `<div class="stat"><span>${label}</span><strong>${count}</strong></div>`).join('');
  $('dataset-label').textContent = sourceLabel;
  $('export-button').disabled = !jobs.length;
  $('clear-button').disabled = !jobs.length;
  const search = $('search').value.toLowerCase(), filter = $('filter').value;
  const visible = jobs.filter(r => `${r.job.title} ${r.job.company} ${r.job.location || ''}`.toLowerCase().includes(search)).filter(r => filter === 'all' || filter === 'eligible' && r.match.eligible || filter === 'review' && !r.job.requirements_reviewed || filter === 'submitted' && r.status === 'submitted' || filter === 'blocked' && ['blocked', 'uncertain', 'submitting'].includes(r.status));
  $('jobs').innerHTML = visible.map(row => {
    const job = row.job, match = row.match;
    return `<article class="job"><div class="job-top"><div><small>${escapeHTML(job.company)} · ${escapeHTML(job.location || 'Location unverified')}</small><h3>${escapeHTML(job.title)}</h3></div><span class="score">${escapeHTML(match.score)}%</span></div><div class="pills"><span class="pill">${escapeHTML(row.status)}</span><span class="pill">${escapeHTML(match.resume || 'Selected')} resume</span><span class="pill">${match.eligible ? 'Eligible' : 'Review / not eligible'}</span></div>${match.reasons.length ? `<p class="reasons">${match.reasons.map(escapeHTML).join(' · ')}</p>` : ''}${row.detail ? `<p>${escapeHTML(row.detail)}</p>` : ''}<a href="${escapeHTML(safeURL(job.url))}" target="_blank" rel="noopener noreferrer">Open application ↗</a><details><summary>Qualification evidence (${match.requirements.length})</summary>${match.requirements.map(req => `<div class="evidence"><span class="${req.passed ? 'pass' : 'fail'}">${req.passed ? 'Supported' : 'Unverified'}</span> · ${escapeHTML(req.text)}${req.mandatory ? ' [mandatory]' : ''}${req.preferred ? ' [preferred]' : ''}<p>${req.evidence.map(escapeHTML).join('<br>')}</p></div>`).join('')}</details><details><summary>Full job description</summary><pre class="description">${escapeHTML(job.description)}</pre></details></article>`;
  }).join('') || `<div class="empty"><span class="empty-symbol">◇</span><h3>${jobs.length ? 'No opportunities match this filter' : 'Your next opportunity starts here'}</h3><p>${jobs.length ? 'Try another search or switch to all opportunities.' : 'Import a report from the local app to review your matches, or explore the example jobs to see how it works.'}</p></div>`;
}

const demo = [
  {id:'demo-support',status:'new',job:{title:'Support Engineer — example',company:'Example Company',location:'United States · Remote',country:'US',url:'https://example.com/support',description:'Fictional demonstration, not a real vacancy. Technical support, SQL and Linux skills. Three years of IT support is mandatory.',requirements_reviewed:true},match:{score:75,eligible:false,reasons:['Mandatory experience is unverified','Below 90% match threshold'],resume:'support',requirements:[{text:'Technical support',passed:true,evidence:['Example profile: documented IT support experience.']},{text:'SQL',passed:true,evidence:['Example profile: SQL troubleshooting.']},{text:'Linux',passed:true,evidence:['Example profile: Linux administration.']},{text:'3 years of IT support',mandatory:true,passed:false,evidence:['Example profile establishes 2 years; the required minimum is not met.']}]}},
  {id:'demo-software',status:'prepared',job:{title:'Junior Python Developer — example',company:'Sample Software',location:'United States · Hybrid',country:'US',url:'https://example.com/developer',description:'Fictional demonstration, not a real vacancy. Python, SQL and REST API development skills.',requirements_reviewed:true},match:{score:100,eligible:true,reasons:[],resume:'software',requirements:[{text:'Python',passed:true,evidence:['Example profile: Python API project.']},{text:'SQL',passed:true,evidence:['Example profile: relational database project.']},{text:'REST APIs',passed:true,evidence:['Example profile: documented API endpoints.']}]}},
  {id:'demo-qa',status:'new',job:{title:'QA Analyst — example',company:'Demo Systems',location:'United States · Onsite',country:'US',url:'https://example.com/qa',description:'Fictional demonstration, not a real vacancy. Qualification mapping is not yet complete.',requirements_reviewed:false},match:{score:0,eligible:false,reasons:['Requirements need review'],resume:'software',requirements:[]}}
];

$('import-button').addEventListener('click', () => $('file-input').click());
$('file-input').addEventListener('change', async event => {
  const file = event.target.files[0]; if (!file) return;
  try {
    if (file.size > 10 * 1024 * 1024) throw Error('Choose a JSON report smaller than 10 MB.');
    const parsed = validateReport(JSON.parse(await file.text()));
    jobs = parsed; sourceLabel = `${file.name} · Imported into this tab only`;
    $('search').value = ''; $('filter').value = 'all';
    $('message').textContent = `Loaded ${jobs.length} opportunities. This file was not uploaded. Closing or refreshing this tab clears it.`;
    render();
  } catch (error) { $('message').textContent = `Import failed: ${error.message}`; }
  finally { event.target.value = ''; }
});
$('demo-button').addEventListener('click', () => {
  jobs = structuredClone(demo); sourceLabel = 'EXAMPLE DATA · Fictional jobs, not real vacancies';
  $('search').value = ''; $('filter').value = 'all';
  $('message').textContent = 'Showing fictional example jobs. No applications have been sent.'; render();
});
$('clear-button').addEventListener('click', () => {
  jobs = []; sourceLabel = 'No report loaded'; $('search').value = ''; $('filter').value = 'all'; $('message').textContent = 'Report cleared from this tab.'; render();
});
$('export-button').addEventListener('click', () => {
  const url = URL.createObjectURL(new Blob([JSON.stringify(jobs, null, 2)], {type:'application/json'}));
  const anchor = document.createElement('a'); anchor.href = url; anchor.download = 'application-desk-report.json'; anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});
$('search').addEventListener('input', render);
$('filter').addEventListener('change', render);
render();
