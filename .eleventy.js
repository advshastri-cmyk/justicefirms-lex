const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
  // copy static assets
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy("CNAME");

  // readable date filter
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toFormat("LLL d, yyyy");
  });

  // posts collection
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/posts/*.md").reverse();
  });

  eleventyConfig.addGlobalData("site", {
    title: "JusticeFirms Legal Blog",
    url: "https://blog.justicefirms.com",
    description: "Authoritative articles and practical guidance on Corporate, Family, Criminal, IP, and Business Law.",
    author: {
      name: "Advocate R. Sharma"
    }
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site"
    },
    passthroughFileCopy: true,
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
};
