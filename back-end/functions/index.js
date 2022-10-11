const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const axios = require("axios");
const cheerio = require("cheerio");
const { request } = require("express");
const express = require("express");

async function getContent() {
  //INITIALIZE OBJECT
  const content = [
    { headline: "", image: "", source: "", link: "" },
    { headline: "", image: "", source: "", link: "" },
    { headline: "", image: "", source: "", link: "" },
    { headline: "", image: "", source: "", link: "" },
    { headline: "", image: "", source: "", link: "" },
  ];

  //SCIENCE CONTENT
  try {
    const siteUrl = "https://www.scientificamerican.com/";

    const { data } = await axios({
      method: "GET",
      url: siteUrl,
    });

    const $ = cheerio.load(data);
    const scienceHeaderSelector =
      "#sa_body > section.most-popular-outer.container.small-hide > div > div > div.grid__col.large-up-2-3.most-popular > div > div:nth-child(1) > article > a > div.listing-wide__inner > h3";
    const scienceImageSelector =
      "#sa_body > section.most-popular-outer.container.small-hide > div > div > div.grid__col.large-up-2-3.most-popular > div > div:nth-child(1) > article > a > div.listing-wide__thumb > picture > img";

    //UPDATE CONTENT OBJECT
    content[0].headline = $(scienceHeaderSelector).text();
    content[0].image = $(scienceImageSelector).attr("src");
    content[0].source = "Scientific America";
    content[0].link = siteUrl;
  } catch (err) {
    console.log(err);
  }
  //SPORTS CONTENT
  try {
    const siteUrl = "https://www.npr.org/sections/sports/";

    const { data } = await axios({
      method: "GET",
      url: siteUrl,
    });

    const $ = cheerio.load(data);
    const nprsportsHeaderSelector =
      "#featured > div > article:nth-child(1) > div.item-info-wrap > div > h2 > a";
    const nprsportsImageSelector =
      "#featured > div > article:nth-child(1) > div.item-image > div.imagewrap.has-source-dimensions > a > picture > img";

    //UPDATE CONTENT OBJECT
    content[1].headline = $(nprsportsHeaderSelector).text();
    content[1].image = $(nprsportsImageSelector).attr("src");
    content[1].source = "NPR";
    content[1].link = siteUrl;
  } catch (err) {
    console.log(err);
  }
  //WORLD NEWS
  try {
    const siteUrl = "https://www.npr.org/sections/news/";

    const { data } = await axios({
      method: "GET",
      url: siteUrl,
    });

    const $ = cheerio.load(data);
    const nprHeaderSelector =
      "#featured > div > article:nth-child(1) > div.item-info-wrap > div > h2 > a";
    const nprImageSelector =
      "#featured > div > article:nth-child(1) > div.item-image > div.imagewrap.has-source-dimensions > a > picture > img";

    //UPDATE CONTENT OBJECT
    content[2].headline = $(nprHeaderSelector).text();
    content[2].image = $(nprImageSelector).attr("src");
    content[2].source = "NPR";
    content[2].link = siteUrl;
  } catch (err) {
    console.log(err);
  }
  //ENTERTAINMENT NEWS
  try {
    const siteUrl = "https://www.eonline.com/ca/news/trending";

    const { data } = await axios({
      method: "GET",
      url: siteUrl,
    });

    const $ = cheerio.load(data);
    const eHeaderSelector =
      "#page > div.theme-wrap > main > div.category-landing > section > div > div.column.is-one-third-desktop.is-full-tablet.is-full-mobile > section > div.list__content > div:nth-child(1) > div.list-row__content.column > a > h3";
    const eImageSelector =
      "#page > div.theme-wrap > main > div.category-landing > section > div > div.column.is-one-third-desktop.is-full-tablet.is-full-mobile > section > div.list__content > div:nth-child(1) > div.list-row__thumb.column.is-5 > div > a > img";

    //UPDATE CONTENT OBJECT
    content[3].headline = $(eHeaderSelector).text();
    content[3].image = $(eImageSelector).attr("src");
    content[3].source = "E News";
    content[3].link = siteUrl;
  } catch (err) {
    console.log(err);
  }
  //FINANCE NEWS
  try {
    const siteUrl = "https://www.cnbc.com/finance/";

    const { data } = await axios({
      method: "GET",
      url: siteUrl,
    });

    const $ = cheerio.load(data);
    const cnbcHeaderSelector =
      "#SectionWithNativeTVE-TwoColumnImageDense-Finance-4 > div > div:nth-child(1) > div.Column-imageDenseModRight > div > div > div > div:nth-child(1) > div > a > div";
    const cnbcImageSelector =
      "#SectionWithNativeTVE-TwoColumnImageDense-Finance-4 > div > div:nth-child(1) > div.Column-imageDenseModRight > div > a > div > div > picture > img";

    //UPDATE CONTENT OBJECT
    content[4].headline = $(cnbcHeaderSelector).text();
    content[4].image = $(cnbcImageSelector).attr("src");
    content[4].source = "CNBC";
    content[4].link = siteUrl;
  } catch (err) {
    console.log(err);
  }
  return content;
}

//CREATE API
const app = express();

app.get("/", async (request, respond) => {
  try {
    const finalContent = await getContent();

    //CONVERT TO JSON
    return respond.status(200).json({
      result: finalContent,
    });
  } catch (err) {
    return respond.status(500).json({
      err: err.toString(),
    });
  }
});

//RUN EXPRESS ON FIREBASE
exports.expressApi = functions.https.onRequest(app);
