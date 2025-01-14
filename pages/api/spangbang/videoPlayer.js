import cheerio from 'cheerio';
 // Import fetch for Node.js environment
import extractUrls from "extract-urls";
import { Scrape_Video_Item } from '@/config/Scrape_Video_Item';

export default async function handler(req, res) {
    const body_object = await req.body;

    let href = body_object.href;
    if (href.includes("https://spankbang.com/")) {
        href = href.replace("https://spankbang.com/", "https://spankbang.party/");
    }

    var finalDataArray = {}
    var preloaded_video_quality = ''
    var relatedVideos = []
    var pornstar = []
    var videodetails = {}
    var noVideos = false
    var positionsArray = []

    function moveFirstNItemsToEnd(array, n) {
        // Get the first n items
        const itemsToMove = array.slice(0, n);
        // Remove the first n items from the original array
        const remainingItems = array.slice(n);
        // Concatenate the remaining items with the items to move
        return remainingItems.concat(itemsToMove);
    }

    const scrape = async (body) => {
        const $ = cheerio.load(body);
        relatedVideos = moveFirstNItemsToEnd(Scrape_Video_Item($), 8);
    }

    const scrape2 = async (url) => {
        var default_video_src = '';
        var video_qualities_available_withURL = [];
        var screenshotsArray = [];
        var video_qualities_available = [];
        var tagsArray = [];
        var categoriesArray = [];

        const response = await fetch(url);
        const body = await response.text();
        const $ = cheerio.load(body);

        await scrape(body);

        $('video source').each((i, el) => {
            const data = $(el).attr("src");
            default_video_src = data;
        });

        const cut1 = body.substring(body.indexOf('<main class="main-container">'), body.indexOf(`<main class="main-container">`) + 1000);
        const cut2 = cut1.substring(cut1.indexOf('var stream_data'), body.indexOf("mpd"));
        let video_qualities_url_array = extractUrls(cut2);

        // Remove unwanted urls from "video_qualities_url_array"
        video_qualities_url_array = video_qualities_url_array.filter(url => {
            return url.includes("https://vdownload");
        });

        // Sometimes the default_video_src is null; in that case, assign the second last URL from "video_qualities_url_array"
        if (default_video_src.length < 5) {
            default_video_src = video_qualities_url_array[video_qualities_url_array.length - 2];
        }

        // Determine which quality is set by default on Spankbang website
        if (default_video_src.includes("240p.mp4")) {
            preloaded_video_quality = "240p";
        }
        if (default_video_src.includes("320p.mp4")) {
            preloaded_video_quality = "320p";
        }
        if (default_video_src.includes("480p.mp4")) {
            preloaded_video_quality = "480p";
        }
        if (default_video_src.includes("720p.mp4")) {
            preloaded_video_quality = "720p";
        }
        if (default_video_src.includes("1080p.mp4")) {
            preloaded_video_quality = "1080p";
        }
        if (default_video_src.includes("4k.mp4")) {
            preloaded_video_quality = "4k";
        }

        // Extract available video qualities
        for (let index = 0; index < video_qualities_url_array.length; index++) {
            if (video_qualities_url_array[index].includes("vdownload")) {
                if (video_qualities_url_array[index].includes("240p.mp4")) {
                    video_qualities_available.push("240p");
                }
                if (video_qualities_url_array[index].includes("320p.mp4")) {
                    video_qualities_available.push("320p");
                }
                if (video_qualities_url_array[index].includes("480p.mp4")) {
                    video_qualities_available.push("480p");
                }
                if (video_qualities_url_array[index].includes("720p.mp4")) {
                    video_qualities_available.push("720p");
                }
                if (video_qualities_url_array[index].includes("1080p.mp4")) {
                    video_qualities_available.push("1080p");
                }
                if (video_qualities_url_array[index].includes("4k.mp4")) {
                    video_qualities_available.push("4k");
                }
            }
        }

        // This is just replacing quality query from default_video_src according to available qualities
        for (let index = 0; index < video_qualities_available.length; index++) {
            video_qualities_available_withURL.push(default_video_src.replace(preloaded_video_quality, video_qualities_available[index]));
        }

        var sreenshots = [];
        var seektime = [];
        $('.timeline div span img').each((i, el) => {
            const data = $(el).attr("data-src");
            sreenshots.push(data);
        });
        $('.timeline div strong').each((i, el) => {
            const data = $(el).text();
            seektime.push(data);
        });

        for (let index = 0; index < sreenshots.length; index++) {
            screenshotsArray.push({ url: sreenshots[index], seekTime: seektime[index] });
        }

        $('.searches a').each((i, el) => {
            const data = $(el).text();
            tagsArray.push(data);
        });
        $('.cat .ent a').each((i, el) => {
            if ($(el).attr('href').includes('/pornstar/')) {
                const data = $(el).text();
                pornstar.push(data);
            }
        });

        $('.positions-wrapper .positions li').each((index, element) => {
            const timestamp = $(element).attr('data-timestamp');
            const positionName = $(element).text().trim();
            positionsArray.push({ positionName, timestamp });
        });

        var Title = '';
        var duration = '';
        var likedPercent = '';
        var thumbnail = '';
        var views = '';
        $('.left h1').each((i, el) => {
            const data = $(el).text();
            Title = data;
        });
        $('.i-length').each((i, el) => {
            const data = $(el).text();
            duration = data;
        });
        $('.rate').each((i, el) => {
            const data = $(el).text();
            likedPercent = data;
        });
        $('.play_cover img').each((i, el) => {
            const data = $(el).attr('src');
            thumbnail = data;
        });
        $('.i-plays').each((i, el) => {
            const data = $(el).text();
            views = data.replaceAll("plays", "");
        });

        videodetails = {
            Title: Title,
            duration: duration,
            likedPercent: likedPercent,
            thumbnail: thumbnail,
            views: views,
        };

        finalDataArray = {
            default_video_src: default_video_src,
            video_qualities_available: video_qualities_available,
            video_qualities_available_withURL: video_qualities_available_withURL,
            screenshotsArray: screenshotsArray,
            tagsArray: tagsArray,
        };

    }

    try {
        await scrape2(href);
    } catch (error) {
        // console.log(error);
        noVideos = true;
        if (relatedVideos.length === 0) {  // Sometimes the related videos are not able to get scraped, so trying again in a different way to scrape
            const obj = await scrapeVideos(href);
            relatedVideos = obj.finalDataArray;
        }
    }

    let result = {
        videolink_qualities_screenshots: finalDataArray,
        preloaded_video_quality: preloaded_video_quality,
        relatedVideos: relatedVideos.length > 100 ? relatedVideos.slice(0, 100) : relatedVideos,
        pornstar: pornstar,
        video_details: videodetails,
        positionsArray: positionsArray,
        noVideos: noVideos,
    };

   
    // Sending JSON response using res object directly
    res.status(200).json(result);
}
