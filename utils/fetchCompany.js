// the api used in this file is not active anymore beause of access issues,
// but the code is kept for reference and future use if any free api is available
const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async (company, jobLink) => {
  if (process.env.CLEARBIT_API_KEY) {
    try {
      const res = await axios.get(`https://company.clearbit.com/v2/companies/find?name=${encodeURIComponent(company)}`, { headers: { Authorization: `Bearer ${process.env.CLEARBIT_API_KEY}` } });
      return res.data;
    } catch (err) { /* ignore */ }
  }
  if (jobLink) {
    try {
      const r = await axios.get(jobLink, { timeout: 8000 });
      const $ = cheerio.load(r.data);
      const desc = $('meta[name="description"]').attr('content') || $('body').text().slice(0, 1000);
      return { scrapedDescription: desc };
    } catch (err) { /* ignore */ }
  }
  return null;
};
